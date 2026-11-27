import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeProvider, ThemeScope, themeRegistry } from "../../theme";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

const overlays = [
  ["Dialog", (container?: HTMLElement, trigger = true) => (
    <Dialog open>
      {trigger && <DialogTrigger>Open settings</DialogTrigger>}
      <DialogContent container={container}>
        <DialogTitle>Theme settings</DialogTitle>
        <DialogDescription>Configure the theme</DialogDescription>
        <span data-testid="overlay">Dialog content</span>
      </DialogContent>
    </Dialog>
  )],
  ["Popover", (container?: HTMLElement) => (
    <Popover open>
      <PopoverTrigger>Open details</PopoverTrigger>
      <PopoverContent container={container}><span data-testid="overlay">Popover content</span></PopoverContent>
    </Popover>
  )],
  ["Tooltip", (container?: HTMLElement) => (
    <Tooltip open>
      <TooltipTrigger>Show help</TooltipTrigger>
      <TooltipContent container={container}><span data-testid="overlay">Tooltip content</span></TooltipContent>
    </Tooltip>
  )],
] as const;

const surface = themeRegistry.retroterminal.dark.colors.surface;

function expectInnerTheme(overlay: HTMLElement) {
  expect(overlay.closest("[data-dil-theme]")).toHaveStyle({ "--dil-color-surface": surface });
}

describe("overlay theme boundaries", () => {
  it.each(overlays)("%s mounts inside the nearest nested theme", async (_name, content) => {
    render(
      <ThemeProvider theme="neobrutalism" mode="light">
        <ThemeScope theme="retroterminal" mode="dark">
          <span data-testid="scope-anchor" />
          {content()}
        </ThemeScope>
      </ThemeProvider>,
    );
    const scope = screen.getByTestId("scope-anchor").closest("[data-dil-theme]");
    const overlay = await screen.findByTestId("overlay");
    expect(scope).toContainElement(overlay);
    expectInnerTheme(overlay);
  });

  it.each(overlays)("%s keeps source tokens at a custom target under another theme", async (_name, content) => {
    const { rerender } = render(
      <ThemeProvider theme="glassmorphism" mode="light"><div data-testid="target" /></ThemeProvider>,
    );
    const container = screen.getByTestId("target");
    rerender(
      <ThemeProvider theme="glassmorphism" mode="light">
        <div data-testid="target" />
        <ThemeScope theme="retroterminal" mode="dark">{content(container)}</ThemeScope>
      </ThemeProvider>,
    );
    const overlay = await screen.findByTestId("overlay");
    expect(container).toContainElement(overlay);
    expectInnerTheme(overlay);
    expect(container.closest("[data-dil-theme]")).toHaveStyle({
      "--dil-color-surface": themeRegistry.glassmorphism.light.colors.surface,
    });
  });

  it("uses the nearest React theme for a dialog without a trigger", async () => {
    render(
      <ThemeProvider theme="neobrutalism" mode="light">
        <ThemeScope theme="retroterminal" mode="dark">
          <span data-testid="scope-anchor" />
          {overlays[0][1](undefined, false)}
        </ThemeScope>
      </ThemeProvider>,
    );
    const overlay = await screen.findByTestId("overlay");
    expect(screen.getByTestId("scope-anchor").closest("[data-dil-theme]")).toContainElement(overlay);
  });
});
