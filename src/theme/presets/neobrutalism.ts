import type { Theme } from "../types/theme";

export const neoBrutalismTheme: Theme = {
  name: "neobrutalism",

  light: {
    colors: {
      primary: "#FFD600",
      secondary: "#FF4D4D",

      background: "#FFFFFF",
      surface: "#FFFFFF",

      text: "#000000",
      border: "#000000",

      success: "#00C853",
      warning: "#FFAB00",
      danger: "#D50000",
    },

    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
    },

    radius: {
      xs: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
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
      fontFamily: "Arial Black, Arial, sans-serif",
      fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
      fontWeights: {
        regular: "400",
        medium: "500",
        semibold: "700",
        bold: "900",
      },
    },
  },

  dark: {
    colors: {
      primary: "#FFD600",
      secondary: "#FF4D4D",

      background: "#111111",
      surface: "#222222",

      text: "#FFFFFF",
      border: "#FFFFFF",

      success: "#00E676",
      warning: "#FFD740",
      danger: "#FF5252",
    },

    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
    },

    radius: {
      xs: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
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
      fontFamily: "Arial Black, Arial, sans-serif",
      fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
      fontWeights: {
        regular: "400",
        medium: "500",
        semibold: "700",
        bold: "900",
      },
    },
  },
};
