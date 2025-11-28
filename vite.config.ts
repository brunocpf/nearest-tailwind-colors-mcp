import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    target: "node18",
    rollupOptions: {
      input: "src/index.ts",
      output: {
        entryFileNames: "index.js",
        format: "esm",
      },
      external: ["@modelcontextprotocol/sdk", "nearest-tailwind-colors", "zod"],
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".js"],
  },
});
