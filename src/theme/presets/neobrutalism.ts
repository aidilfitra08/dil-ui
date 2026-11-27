import type { Theme } from "../types/theme";

export const neoBrutalismTheme: Theme = {
  name: "neobrutalism",

  light: {
    colors: {
      primary: "#FFE600",
      secondary: "#FF6584",

      background: "#FFFDF8",
      surface: "#FFFFFF",

      text: "#000000",
      border: "#000000",

      success: "#52FF00",
      warning: "#FFE600",
      danger: "#FF6584",
      muted: "#4B4731",
      info: "#00F0FF",
      paper: "#FFFDF8",
      ink: "#121212",
      terminal: "#52FF00",
      overlay: "rgba(255, 253, 248, 0.9)",
    },

    foregrounds: {
      primary: "#000000",
      secondary: "#000000",
      success: "#000000",
      warning: "#000000",
      danger: "#000000",
      info: "#000000",
      muted: "#FFFFFF",
    },
    spacing: {
      xs: "6px",
      sm: "12px",
      md: "20px",
      lg: "32px",
      xl: "48px",
      "2xl": "64px",
    },

    radius: {
      xs: "0px",
      sm: "2px",
      md: "2px",
      lg: "2px",
      xl: "8px",
      "2xl": "12px",
    },

    shadows: {
      xs: "1px 1px 0 #000",
      sm: "2px 2px 0 #000",
      md: "4px 4px 0 #000",
      lg: "6px 6px 0 #000",
      xl: "8px 8px 0 #000",
      "2xl": "10px 10px 0 #000",
    },

    typography: {
      fontFamily: "Lexend, Arial Black, Arial, sans-serif",
      fontSizes: {
        xs: "10px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      fontWeights: {
        regular: "400",
        medium: "500",
        semibold: "700",
        bold: "900",
      },
    },
    effects: {
      scanline: "rgba(0, 0, 0, 0.02)",
      grid: "rgba(0, 0, 0, 0.06)",
      glow: "rgba(255, 230, 0, 0.25)",
      paperTexture: "none",
    },
  },

  dark: {
    colors: {
      primary: "#FFE600",
      secondary: "#FF6584",

      background: "#121212",
      surface: "#222222",

      text: "#FFFFFF",
      border: "#FFFFFF",

      success: "#52FF00",
      warning: "#FFE600",
      danger: "#FF6584",
      muted: "#B3B3B3",
      info: "#00F0FF",
      paper: "#222222",
      ink: "#000000",
      terminal: "#52FF00",
      overlay: "rgba(18, 18, 18, 0.9)",
    },

    foregrounds: {
      primary: "#000000",
      secondary: "#000000",
      success: "#000000",
      warning: "#000000",
      danger: "#000000",
      info: "#000000",
      muted: "#000000",
    },
    spacing: {
      xs: "6px",
      sm: "12px",
      md: "20px",
      lg: "32px",
      xl: "48px",
      "2xl": "64px",
    },

    radius: {
      xs: "0px",
      sm: "2px",
      md: "2px",
      lg: "2px",
      xl: "8px",
      "2xl": "12px",
    },

    shadows: {
      xs: "1px 1px 0 #FFF",
      sm: "2px 2px 0 #FFF",
      md: "4px 4px 0 #FFF",
      lg: "6px 6px 0 #FFF",
      xl: "8px 8px 0 #FFF",
      "2xl": "10px 10px 0 #FFF",
    },

    typography: {
      fontFamily: "Lexend, Arial Black, Arial, sans-serif",
      fontSizes: {
        xs: "10px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      fontWeights: {
        regular: "400",
        medium: "500",
        semibold: "700",
        bold: "900",
      },
    },
    effects: {
      scanline: "rgba(255, 255, 255, 0.02)",
      grid: "rgba(255, 255, 255, 0.08)",
      glow: "rgba(255, 230, 0, 0.3)",
      paperTexture: "none",
    },
  },
};
