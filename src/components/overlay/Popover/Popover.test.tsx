import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Popover, PopoverContent, PopoverTrigger } from "./index";
import { describe, expect, it } from "vitest";

describe("Popover", () => {
  it("opens from its trigger and closes with Escape", async () => {
    const user = userEvent.setup({ document });
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-state", "open");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
