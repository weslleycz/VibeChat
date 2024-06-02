import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from 'dotenv';

// https://vitejs.dev/config/
dotenv.config();
export default defineConfig({
  plugins: [react(), legacy(), VitePWA({ registerType: "autoUpdate" })],
  define: {
    'process.env': process.env
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
