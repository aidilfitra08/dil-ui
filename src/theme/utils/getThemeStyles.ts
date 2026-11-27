import type { CSSProperties } from "react";
import { filledTones, type ThemeTokens } from "../types/theme";

export function getThemeStyles(tokens: ThemeTokens): CSSProperties {
  const style: CSSProperties & Record<`--dil-${string}`, string> = {
    "--dil-font-family": tokens.typography.fontFamily,
  };
  const groups = {
    color: tokens.colors,
    spacing: tokens.spacing,
    radius: tokens.radius,
    shadow: tokens.shadows,
    effect: tokens.effects,
    font: tokens.typography.fontSizes,
    "font-weight": tokens.typography.fontWeights,
  };

  for (const [group, values] of Object.entries(groups)) {
    for (const [name, value] of Object.entries(values)) {
      style[`--dil-${group}-${name}`] = value;
    }
  }
  for (const tone of filledTones) {
    style[`--dil-color-${tone}-foreground`] = tokens.foregrounds?.[tone] ?? tokens.colors.text;
  }

  return style;
}
