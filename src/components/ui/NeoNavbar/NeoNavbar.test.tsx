import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { NeoNavbar } from "./NeoNavbar";

it("hides the inactive drawer, focuses it when opened, and restores focus on Escape", async () => {
  const user = userEvent.setup();
  render(<NeoNavbar items={[{ href: "#projects", label: "Projects" }]} />);

  const toggle = screen.getByRole("button", { name: "Open navigation menu" });
  const drawer = document.getElementById(toggle.getAttribute("aria-controls")!)!;
  expect(drawer).toHaveAttribute("inert");
  expect(within(drawer).queryByRole("link")).not.toBeInTheDocument();

  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(drawer).not.toHaveAttribute("inert");
  expect(within(drawer).getByRole("button", { name: "Close navigation menu" })).toHaveFocus();

  await user.keyboard("[Escape]");
  expect(toggle).toHaveFocus();
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(drawer).toHaveAttribute("inert");
});

it("preserves anchor navigation and notifies the caller when a drawer item is selected", async () => {
  const user = userEvent.setup();
  const select = vi.fn();
  render(
    <NeoNavbar items={[{ href: "#projects", label: "Projects", active: true, onClick: select }]} />,
  );

  const toggle = screen.getByRole("button", { name: "Open navigation menu" });
  await user.click(toggle);
  const drawer = document.getElementById(toggle.getAttribute("aria-controls")!)!;
  const projects = within(drawer).getByRole("link", { name: "Projects" });
  expect(projects).toHaveAttribute("href", "#projects");
  expect(projects).toHaveAttribute("aria-current", "location");
  await user.click(projects);
  expect(select).toHaveBeenCalledOnce();
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});
