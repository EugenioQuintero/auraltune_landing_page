import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "eugenio-quintero",
    project: "auraltune-landing-page"
  })],

  build: {
    sourcemap: true
  }
})