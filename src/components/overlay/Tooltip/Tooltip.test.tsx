import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip, TooltipContent, TooltipTrigger } from "./index";

describe("Tooltip", () => {
  it("opens on focus and closes on blur", async () => {
    const user = userEvent.setup({ document });
    render(
      <Tooltip>
        <TooltipTrigger>Help</TooltipTrigger>
        <TooltipContent>Helpful text</TooltipContent>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful text");
    await user.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
