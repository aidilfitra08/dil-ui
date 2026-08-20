import { createContext } from "react";

import type { Theme, ThemeMode, ThemeTokens } from "../types/theme";

export interface ThemeContextValue {
  theme: Theme;

  mode: ThemeMode;

  resolvedMode: "light" | "dark";

  tokens: ThemeTokens;

  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
