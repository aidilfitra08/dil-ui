import { describe, expect, it } from "vitest";

import { themeRegistry } from "../presets";
import { getThemeStyles } from "./getThemeStyles";

const filled = ["primary", "secondary", "success", "warning", "danger", "info", "muted"] as const;
const modes = ["light", "dark"] as const;

function luminance(hex: string) {
  expect(hex).toMatch(/^#[\da-f]{6}$/i);
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const [r, g, b] = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

describe("theme foreground contrast", () => {
  for (const theme of Object.values(themeRegistry)) {
    for (const mode of modes) {
      it(`${theme.name} ${mode} reaches 4.5:1 on every filled tone`, () => {
        const tokens = theme[mode];
        const style = getThemeStyles(tokens) as Record<string, string>;
        for (const tone of filled) {
          const foreground = style[`--dil-color-${tone}-foreground`] ?? tokens.colors.text;
          const [dark, light] = [luminance(foreground), luminance(tokens.colors[tone])].sort((a, b) => a - b);
          expect((light + 0.05) / (dark + 0.05), tone).toBeGreaterThanOrEqual(4.5);
        }
      });
    }
  }

  it("sets foreground variables from a legacy theme's text to prevent inheritance from an outer theme", () => {
    const tokens = { ...themeRegistry.neobrutalism.light };
    Reflect.deleteProperty(tokens, "foregrounds");
    tokens.colors = { ...tokens.colors, text: "#283646" };
    const style = getThemeStyles(tokens) as Record<string, string>;
    for (const tone of filled) expect(style[`--dil-color-${tone}-foreground`]).toBe("#283646");
  });

  it("uses explicit custom foregrounds only for the tones supplied", () => {
    const tokens = {
      ...themeRegistry.neobrutalism.light,
      colors: { ...themeRegistry.neobrutalism.light.colors, text: "#283646" },
      foregrounds: { primary: "#123456" },
    };
    const style = getThemeStyles(tokens) as Record<string, string>;
    expect(style["--dil-color-primary-foreground"]).toBe("#123456");
    expect(style["--dil-color-secondary-foreground"]).toBe("#283646");
  });
});
