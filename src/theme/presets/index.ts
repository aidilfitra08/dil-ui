import { glassmorphismTheme } from "./glassmorphism";
import { neoBrutalismTheme } from "./neobrutalism";
import { retroTerminalTheme } from "./retroterminal";

export const themeRegistry = {
  glassmorphism: glassmorphismTheme,
  neobrutalism: neoBrutalismTheme,
  retroterminal: retroTerminalTheme,
};

export type ThemeName = keyof typeof themeRegistry;
