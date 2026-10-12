import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true,
      exclude: ["src/examples/**"],
    }),
    tailwindcss(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
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
      ],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react/jsx-dev-runtime": "ReactJSXRuntime",
        },
      },
    },
  },
});
