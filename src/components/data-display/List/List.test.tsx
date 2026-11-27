import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { List, ListItem } from "./List";

describe("List", () => {
  it("renders an unordered list with disc markers by request", () => {
    render(
      <List marker="disc" aria-label="Shopping list">
        <ListItem>Apples</ListItem>
      </List>,
    );

    const list = screen.getByRole("list", { name: "Shopping list" });
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("list-disc");
    expect(screen.getByRole("listitem")).toHaveTextContent("Apples");
  });

  it("renders ordered lists and forwards native numbering attributes", () => {
    render(
      <List type="ordered" marker="decimal" start={4} reversed>
        <ListItem>Fourth</ListItem>
      </List>,
    );

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list).toHaveAttribute("start", "4");
    expect(list).toHaveAttribute("reversed");
    expect(list).toHaveClass("list-decimal");
  });

  it.each([
    ["default", ""],
    ["none", "list-none"],
    ["disc", "list-disc"],
    ["circle", "list-[circle]"],
    ["square", "list-[square]"],
    ["decimal", "list-decimal"],
    ["lower-alpha", "list-[lower-alpha]"],
    ["upper-alpha", "list-[upper-alpha]"],
    ["lower-roman", "list-[lower-roman]"],
    ["upper-roman", "list-[upper-roman]"],
  ] as const)("applies marker style %s", (marker, className) => {
    render(<List marker={marker}><ListItem>Item</ListItem></List>);
    const list = screen.getByRole("list");
    if (className) expect(list).toHaveClass(className);
    else expect(list).not.toHaveClass("list-none");
  });

  it("renders custom markers with zero-based indexes and aligned content", () => {
    const renderMarker = vi.fn((index: number) => <span>Marker {index}</span>);
    render(
      <List marker="custom" renderMarker={renderMarker}>
        <ListItem>First</ListItem>
        <p>Not a list item</p>
        <ListItem>Second<br />wrapped</ListItem>
      </List>,
    );

    expect(screen.getByRole("list")).toHaveClass("list-none");
    expect(screen.getByText("Marker 0")).toBeInTheDocument();
    expect(screen.getByText("Marker 1")).toBeInTheDocument();
    expect(renderMarker.mock.calls.map(([index]) => index)).toEqual([0, 1]);
    expect(screen.getByText(/Second.*wrapped/)).toHaveClass("min-w-0");
  });

  it("falls back to native markers when a custom renderer is missing", () => {
    render(<List marker="custom"><ListItem>Item</ListItem></List>);
    expect(screen.getByRole("list")).not.toHaveClass("list-none");
    expect(screen.getByRole("listitem")).toHaveTextContent("Item");
  });

  it("forwards list and item attributes, events, styles, and class names", () => {
    const onClick = vi.fn();
    render(
      <List
        id="example-list"
        marker="none"
        spacing="md"
        className="custom-list"
        data-testid="list"
        aria-label="Example"
      >
        <ListItem
          id="first-item"
          className="custom-item"
          data-testid="item"
          title="First item"
          onClick={onClick}
          style={{ color: "red" }}
        >
          First
        </ListItem>
      </List>,
    );

    const list = screen.getByTestId("list");
    const item = screen.getByTestId("item");
    expect(list).toHaveAttribute("id", "example-list");
    expect(list).toHaveAttribute("aria-label", "Example");
    expect(list).toHaveClass("list-none", "space-y-2", "custom-list");
    expect(item).toHaveAttribute("id", "first-item");
    expect(item).toHaveAttribute("title", "First item");
    expect(item).toHaveClass("custom-item");
    expect(item).toHaveStyle({ color: "rgb(255, 0, 0)" });
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports standalone items and nested lists", () => {
    render(
      <List>
        <ListItem>Parent<List><ListItem>Nested</ListItem></List></ListItem>
      </List>,
    );

    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    const { container } = render(<ListItem data-testid="standalone">Standalone</ListItem>);
    expect(container.querySelector("li")).toHaveTextContent("Standalone");
  });
});
