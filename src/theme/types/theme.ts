export type ThemeMode = "light" | "dark" | "system";

export type SizeScale = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;

    background: string;
    surface: string;

    text: string;
    border: string;

    success: string;
    warning: string;
    danger: string;
  };

  spacing: Record<SizeScale, string>;

  radius: Record<SizeScale, string>;

  shadows: Record<SizeScale, string>;

  typography: Record<SizeScale, string>;
}

export interface Theme {
  name: string;

  light: ThemeTokens;

  dark: ThemeTokens;
}
