import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type {
  AccordionMultipleProps,
  AccordionSingleProps,
} from "./Accordion.types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";
import { ThemeProvider } from "../../../theme";

type ExampleProps =
  | Omit<AccordionSingleProps, "children">
  | Omit<AccordionMultipleProps, "children">;

function Example(props: ExampleProps = { type: "single" }) {
  const configuration = props;
  const content = (
    <>
      <AccordionItem value="first">
        <AccordionTrigger>First question</AccordionTrigger>
        <AccordionContent>First answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionTrigger>Second question</AccordionTrigger>
        <AccordionContent>Second answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>Disabled question</AccordionTrigger>
        <AccordionContent>Disabled answer</AccordionContent>
      </AccordionItem>
    </>
  );
  if (configuration.type === "multiple") {
    return <Accordion {...configuration}>{content}</Accordion>;
  }
  return <Accordion {...configuration}>{content}</Accordion>;
}

describe("Accordion", () => {
  it("opens a single item and enforces non-collapsible behavior", async () => {
    const user = userEvent.setup();
    render(<Example type="single" />);
    await user.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Second question" }));
    expect(screen.queryByRole("region", { name: "First question" })).not.toBeInTheDocument();
    expect(screen.getByText("Second answer")).toBeVisible();
  });

  it("supports collapsible, multiple and default-expanded items", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <Example type="single" collapsible defaultValue="first" />,
    );
    await user.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer").closest('[role="region"]')).toHaveAttribute("aria-hidden", "true");

    unmount();
    render(<Example type="multiple" defaultValue={["first"]} />);
    await user.click(screen.getByRole("button", { name: "Second question" }));
    expect(screen.getByText("First answer")).toBeVisible();
    expect(screen.getByText("Second answer")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer").closest('[role="region"]')).toHaveAttribute("aria-hidden", "true");
  });

  it("supports controlled state and reports value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example type="single" value="first" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Second question" }));
    expect(onValueChange).toHaveBeenCalledWith("second");
    expect(screen.getByText("First answer")).toBeVisible();
  });

  it("provides accessible relationships, disabled semantics and native attributes", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Accordion type="single" collapsible aria-label="FAQs" data-testid="faq">
        <AccordionItem value="faq" className="custom-item">
          <AccordionTrigger className="custom-trigger" onClick={onClick}>
            Question
          </AccordionTrigger>
          <AccordionContent className="custom-content">Answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const root = screen.getByTestId("faq");
    const trigger = within(root).getByRole("button", { name: "Question" });
    const content = root.querySelector(`#${trigger.getAttribute("aria-controls")}`);
    expect(root).toHaveAttribute("aria-label", "FAQs");
    expect(root.querySelector(".custom-item")).toBeInTheDocument();
    expect(trigger).toHaveClass("custom-trigger");
    expect(content).toHaveClass("custom-content");
    expect(content).toHaveAttribute("aria-labelledby", trigger.id);
    await user.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(content).toBeVisible();
  });

  it("navigates enabled triggers by keyboard", () => {
    render(<Example type="multiple" />);
    const first = screen.getByRole("button", { name: "First question" });
    const second = screen.getByRole("button", { name: "Second question" });
    const disabled = screen.getByRole("button", { name: "Disabled question" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(second).toHaveFocus();
    fireEvent.keyDown(second, { key: "ArrowDown" });
    expect(disabled).not.toHaveFocus();
    fireEvent.keyDown(second, { key: "Home" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "End" });
    expect(second).toHaveFocus();
  });

  it("renders with and without a ThemeProvider", () => {
    render(
      <Accordion type="single" collapsible defaultValue="standalone">
        <AccordionItem value="standalone">
          <AccordionTrigger>Standalone question</AccordionTrigger>
          <AccordionContent>Standalone answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Standalone answer")).toBeVisible();
    render(
      <ThemeProvider mode="dark">
        <Accordion type="single" defaultValue="themed">
          <AccordionItem value="themed">
            <AccordionTrigger>Themed question</AccordionTrigger>
            <AccordionContent>Themed answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );
    expect(screen.getByText("Themed answer")).toBeVisible();
  });

  it("keeps collapsed content hidden and disabled triggers inert", async () => {
    const user = userEvent.setup();
    render(<Example type="single" collapsible />);
    const disabled = screen.getByRole("button", { name: "Disabled question" });
    expect(disabled).toBeDisabled();
    expect(screen.getByText("Disabled answer").closest('[role="region"]')).toHaveAttribute("aria-hidden", "true");
    await user.click(disabled);
    expect(screen.queryByRole("region", { name: "Disabled question" })).not.toBeInTheDocument();
  });
});
