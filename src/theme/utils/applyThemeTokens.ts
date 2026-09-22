import type { ThemeTokens } from "../types/theme";

export function applyThemeTokens(element: HTMLElement, tokens: ThemeTokens) {
  Object.entries(tokens.colors).forEach(([key, value]) => {
    element.style.setProperty(`--dil-color-${key}`, value);
  });

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    element.style.setProperty(`--dil-spacing-${key}`, value);
  });

  Object.entries(tokens.radius).forEach(([key, value]) => {
    element.style.setProperty(`--dil-radius-${key}`, value);
  });

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    element.style.setProperty(`--dil-shadow-${key}`, value);
  });

  Object.entries(tokens.effects).forEach(([key, value]) => {
    element.style.setProperty(`--dil-effect-${key}`, value);
  });

  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    element.style.setProperty(`--dil-font-${key}`, value);
  });

  element.style.setProperty("--dil-font-family", tokens.typography.fontFamily);

  Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
    element.style.setProperty(`--dil-font-weight-${key}`, value);
  });
}
