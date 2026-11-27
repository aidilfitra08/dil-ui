export type ThemeMode = "light" | "dark" | "system";

export type SizeScale = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  muted: string;
  info: string;
  paper: string;
  ink: string;
  terminal: string;
  overlay: string;
}

export interface ThemeEffects {
  scanline: string;
  grid: string;
  glow: string;
  paperTexture: string;
}

export const filledTones = ["primary", "secondary", "success", "warning", "danger", "info", "muted"] as const;
export type FilledTone = (typeof filledTones)[number];

export interface ThemeTokens {
  /** Text and icon colors for the corresponding solid fills. */
  foregrounds?: Partial<Record<FilledTone, string>>;
  colors: ThemeColors;

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

  effects: ThemeEffects;
}

export interface Theme {
  name: string;

  light: ThemeTokens;

  dark: ThemeTokens;
}
