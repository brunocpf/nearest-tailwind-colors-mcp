import { defineConfig } from "vite";
import path from "path";
import { builtinModules } from "node:module";

const external = [
  /^@modelcontextprotocol\/sdk/,
  "nearest-tailwind-colors",
  "zod",
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
];

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    outDir: "dist",
    target: "node20",
    rollupOptions: {
      external,
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
