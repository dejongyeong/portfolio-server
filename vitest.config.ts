import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    alias: {
      "@/*": "/src/*",
      "@test/*": "/test/*",
    },
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  resolve: {
    alias: {
      // ensure vitest correctly resolves typescript path aliases
      "@/*": "/src/*",
      "@test/*": "/test/*",
    },
  },
});
