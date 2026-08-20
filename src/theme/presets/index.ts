import { neoBrutalismTheme } from "./neobrutalism";

export const themeRegistry = {
  neobrutalism: neoBrutalismTheme,
};

export type ThemeName = keyof typeof themeRegistry;
