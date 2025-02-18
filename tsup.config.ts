import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "lib/LoadMore.tsx",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  dts: true,
  outDir: "./",
})
