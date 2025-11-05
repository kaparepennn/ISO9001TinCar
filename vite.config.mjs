import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ Cambia SOLO si tu repositorio tiene otro nombre exacto
const repoName = "ISO9001TinCar";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
