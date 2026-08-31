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

  typography: {
    fontFamily: string;
    fontSizes: Record<SizeScale, string>;
    fontWeights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

export interface Theme {
  name: string;

  light: ThemeTokens;

  dark: ThemeTokens;
}
