import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { Button } from "./Button";
import { IconButton } from "./IconButton";

it("exposes icon-only names and supports keyboard activation while skipping disabled actions", async () => {
  const user = userEvent.setup();
  const add = vi.fn();
  const next = vi.fn();
  render(
    <>
      <Button disabled>Unavailable</Button>
      <IconButton aria-label="Add item" icon={<span aria-hidden="true">+</span>} onClick={add} />
      <Button onClick={next}>Next</Button>
    </>,
  );

  expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  await user.tab();
  const iconButton = screen.getByRole("button", { name: "Add item" });
  expect(iconButton).toHaveFocus();
  expect(iconButton).toHaveClass(
    "text-(length:--dil-font-md)",
    "text-[color:var(--dil-color-primary-foreground,var(--dil-color-text,currentColor))]",
  );
  await user.keyboard("[Space]");
  expect(add).toHaveBeenCalledOnce();
  await user.tab();
  expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
  await user.keyboard("[Enter]");
  expect(next).toHaveBeenCalledOnce();
});
