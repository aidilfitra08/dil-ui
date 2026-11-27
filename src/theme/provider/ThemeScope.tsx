import type { ReactNode } from "react";

import type { Theme } from "../types/theme";
import type { ThemeName } from "../presets";
import { ThemeProvider } from "./ThemeProvider";

interface ThemeScopeProps {
  children: ReactNode;
  theme: ThemeName | Theme;
  mode?: "light" | "dark";
}

export function ThemeScope({ children, theme, mode = "light" }: ThemeScopeProps) {
  return <ThemeProvider theme={theme} mode={mode}>{children}</ThemeProvider>;
}
