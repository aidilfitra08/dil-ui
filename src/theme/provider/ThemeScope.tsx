import { useEffect, useMemo, useRef, type ReactNode } from "react";

import type { Theme } from "../types/theme";

import { themeRegistry, type ThemeName } from "../presets";
import { applyThemeTokens } from "../utils/applyThemeTokens";

interface ThemeScopeProps {
  children: ReactNode;
  theme: ThemeName | Theme;
  mode?: "light" | "dark";
}

export function ThemeScope({
  children,
  theme,
  mode = "light",
}: ThemeScopeProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  const resolvedTheme = useMemo(() => {
    if (typeof theme === "string") {
      return themeRegistry[theme];
    }

    return theme;
  }, [theme]);

  const tokens = mode === "dark" ? resolvedTheme.dark : resolvedTheme.light;

  useEffect(() => {
    const root = scopeRef.current;

    if (!root) return;

    applyThemeTokens(root, tokens);
  }, [tokens]);

  return <div ref={scopeRef}>{children}</div>;
}
