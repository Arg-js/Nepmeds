import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    checker({ eslint: { lintCommand: "eslint src" }, overlay: false }),
  ],
  resolve: {
    alias: {
      src: path.resolve("src/"),
      "@nepMeds": path.resolve("src"),
      "@nepMeds/icons": path.resolve("src/components/common/icons"),
      "@nepMeds/assets": path.resolve("src/assets"),
      "@nepMeds/hooks": path.resolve("src/hooks"),
      "@nepMeds/components": path.resolve("src/components"),
      "@nepMeds/pages": path.resolve("src/pages"),
      "@nepMeds/providers": path.resolve("src/providers"),
      "@nepMeds/routes": path.resolve("src/routes"),
      "@nepMeds/service": path.resolve("src/service"),
      "@nepMeds/theme": path.resolve("src/theme"),
      "@nepMeds/translations": path.resolve("src/translations"),
      "@nepMeds/types": path.resolve("src/types"),
      "@nepMeds/utils": path.resolve("src/utils"),
    },
  },
});
