import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import path from "path"; // Node.js 기본 모듈인 path 호출
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      // '@'를 호출시 'src' 폴더의 절대 경로로 연결
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
