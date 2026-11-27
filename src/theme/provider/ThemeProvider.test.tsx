import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { useTheme } from "../../hooks/useTheme";
import { useThemeTokens } from "../hooks";
import { themeRegistry } from "../presets";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeScope } from "./ThemeScope";

function ThemeReading() {
  const { theme, resolvedMode } = useTheme();
  const { colors } = useThemeTokens();
  return <output>{[theme.name, resolvedMode, colors.surface].join(" ")}</output>;
}

function scopesFrom(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return Array.from(template.content.querySelectorAll<HTMLElement>("[data-dil-theme]"));
}

describe("theme rendering", () => {
  it("renders light and dark tokens for every preset in the server HTML", () => {
    for (const theme of Object.values(themeRegistry)) {
      for (const mode of ["light", "dark"] as const) {
        const [wrapper] = scopesFrom(renderToString(
          <ThemeProvider theme={theme} mode={mode}><ThemeReading /></ThemeProvider>,
        ));
        expect(wrapper.style.getPropertyValue("--dil-color-surface")).toBe(theme[mode].colors.surface);
        expect(wrapper.style.getPropertyValue("--dil-radius-md")).toBe(theme[mode].radius.md);
        expect(wrapper.style.getPropertyValue("--dil-font-family")).toBe(theme[mode].typography.fontFamily);
      }
    }
  });

  it("provides nested ThemeScope tokens to markup and both theme hooks", () => {
    const outer = themeRegistry.neobrutalism;
    const inner = themeRegistry.retroterminal;
    const [outerScope, innerScope] = scopesFrom(renderToString(
      <ThemeProvider theme={outer} mode="light">
        <ThemeReading />
        <ThemeScope theme={inner} mode="dark"><ThemeReading /></ThemeScope>
      </ThemeProvider>,
    ));

    expect(outerScope.style.getPropertyValue("--dil-color-surface")).toBe(outer.light.colors.surface);
    expect(innerScope.style.getPropertyValue("--dil-color-surface")).toBe(inner.dark.colors.surface);
    expect(innerScope.textContent).toBe([inner.name, "dark", inner.dark.colors.surface].join(" "));
  });

  it("hydrates the light system default and follows browser preference changes", () => {
    const preference = Object.assign(new EventTarget(), { matches: true });
    const matchMedia = vi.spyOn(window, "matchMedia").mockReturnValue(preference as MediaQueryList);
    const container = document.createElement("div");
    const onRecoverableError = vi.fn();
    const theme = themeRegistry.glassmorphism;
    const view = <ThemeProvider theme={theme} mode="system"><ThemeReading /></ThemeProvider>;

    try {
      container.innerHTML = renderToString(view);
      expect(container.firstElementChild).toHaveStyle({ "--dil-color-surface": theme.light.colors.surface });
      document.body.append(container);
      const hydrated = render(view, { container, hydrate: true, onRecoverableError });
      expect(screen.getByRole("status")).toHaveTextContent("dark");

      act(() => {
        preference.matches = false;
        preference.dispatchEvent(new Event("change"));
      });

      expect(container.firstElementChild).toHaveStyle({ "--dil-color-surface": theme.light.colors.surface });
      expect(screen.getByRole("status")).toHaveTextContent("light");
      expect(onRecoverableError).not.toHaveBeenCalled();
      hydrated.unmount();
    } finally {
      container.remove();
      matchMedia.mockRestore();
    }
  });
});
