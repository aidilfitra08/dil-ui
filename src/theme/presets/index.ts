import { glassmorphismTheme } from "./glassmorphism";
import { neoBrutalismTheme } from "./neobrutalism";

export const themeRegistry = {
  glassmorphism: glassmorphismTheme,
  neobrutalism: neoBrutalismTheme,
};

export type ThemeName = keyof typeof themeRegistry;
