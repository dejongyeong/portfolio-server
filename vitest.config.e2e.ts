import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    alias: {
      "@/*": "/src/*",
      "@test/*": "/test/*",
    },
  },
  plugins: [swc.vite()],
  resolve: {
    alias: {
      // ensure vitest correctly resolves typescript path aliases
      "@/*": "/src/*",
      "@test/*": "/test/*",
    },
  },
});
