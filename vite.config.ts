import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "node:path";
import { scopeLibraryStyles } from "./scripts/scope-library-styles.ts";

const libraryStyles = scopeLibraryStyles(resolve(import.meta.dirname, "src/index.css"));

export default defineConfig(({ mode }) => mode === "showcase" ? {
  base: "./",
  plugins: [react(), tailwindcss(), libraryStyles],
  build: { outDir: "dist-showcase" },
} : {
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true,
      exclude: [
        "src/App.tsx",
        "src/main.tsx",
        "src/test-setup.ts",
        "src/examples/**",
        "src/**/*.test.*",
        "src/**/*.stories.*",
      ],
    }),
    tailwindcss(),
    libraryStyles,
  ],

  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "DilUI",
      fileName: "index",
      cssFileName: "index",

      formats: ["es", "umd"],
    },

    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react/compiler-runtime",
        "recharts",
      ],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react/jsx-dev-runtime": "ReactJSXRuntime",
          recharts: "Recharts",
        },
      },
    },
  },
});
