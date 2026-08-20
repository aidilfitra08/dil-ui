import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";

import type { Theme, ThemeMode } from "../types/theme";

import { themeRegistry, type ThemeName } from "../presets";
import { applyThemeTokens } from "../utils/applyThemeTokens";

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeName | Theme;
  mode?: ThemeMode;
}

export function ThemeProvider({
  children,
  theme = "neobrutalism",
  mode = "system",
}: ThemeProviderProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [currentMode, setCurrentMode] = useState<ThemeMode>(mode);

  const [systemMode, setSystemMode] = useState<"light" | "dark">("light");

  const resolvedTheme = useMemo(() => {
    if (typeof theme === "string") {
      return themeRegistry[theme];
    }

    return theme;
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateMode = () => {
      setSystemMode(mediaQuery.matches ? "dark" : "light");
    };

    updateMode();

    mediaQuery.addEventListener("change", updateMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
    };
  }, []);

  const resolvedMode = currentMode === "system" ? systemMode : currentMode;

  const tokens =
    resolvedMode === "dark" ? resolvedTheme.dark : resolvedTheme.light;

  useEffect(() => {
    const root = scopeRef.current;

    if (!root) return;

    applyThemeTokens(root, tokens);
  }, [tokens]);

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        mode: currentMode,
        resolvedMode,
        tokens,
        setMode: setCurrentMode,
      }}
    >
      <div ref={scopeRef}>{children}</div>
    </ThemeContext.Provider>
  );
}
