import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";
import { ThemeHostContext } from "./ThemeHostContext";
import type { Theme, ThemeMode } from "../types/theme";
import { themeRegistry, type ThemeName } from "../presets";
import { getThemeStyles } from "../utils/getThemeStyles";

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeName | Theme;
  mode?: ThemeMode;
}

const darkPreference = "(prefers-color-scheme: dark)";
const lightSnapshot = () => "light" as const;

function getSystemMode() {
  return window.matchMedia?.(darkPreference)?.matches ? "dark" : "light";
}

function subscribeToSystemMode(onChange: () => void) {
  const preference = window.matchMedia?.(darkPreference);
  preference?.addEventListener("change", onChange);
  return () => preference?.removeEventListener("change", onChange);
}

const subscribeToNothing = () => () => {};

export function ThemeProvider({
  children,
  theme = "neobrutalism",
  mode = "system",
}: ThemeProviderProps) {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState({ prop: mode, current: mode });
  if (selection.prop !== mode) setSelection({ prop: mode, current: mode });
  const currentMode = selection.prop === mode ? selection.current : mode;
  const systemMode = useSyncExternalStore(
    currentMode === "system" ? subscribeToSystemMode : subscribeToNothing,
    currentMode === "system" ? getSystemMode : lightSnapshot,
    lightSnapshot,
  );

  const resolvedTheme = typeof theme === "string" ? themeRegistry[theme] : theme;
  const resolvedMode = currentMode === "system" ? systemMode : currentMode;
  const tokens = resolvedTheme[resolvedMode];
  const style = useMemo(() => getThemeStyles(tokens), [tokens]);

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        mode: currentMode,
        resolvedMode,
        tokens,
        setMode: (nextMode) => setSelection({ prop: mode, current: nextMode }),
      }}
    >
      <ThemeHostContext.Provider value={host}>
        <div ref={setHost} data-dil-theme style={style}>
          {children}
        </div>
      </ThemeHostContext.Provider>
    </ThemeContext.Provider>
  );
}
