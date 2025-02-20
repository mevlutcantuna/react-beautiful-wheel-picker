import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, insertTypesEntry: true }),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "react-beautiful-wheel-picker",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: false,
    emptyOutDir: false,
  },
});
