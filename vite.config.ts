import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [
      '.wasm',
      '.mjs',
      '.js',
      '.jsx',
      '.vue', // 👈 note this entry
      '.json',
      '.ce.vue'
    ],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
