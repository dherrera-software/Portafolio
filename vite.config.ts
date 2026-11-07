import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages despliega el sitio bajo /Portafolio/ (project page).
  // En local se usa './' para que pnpm dev / preview funcionen sin ajustes.
  base: process.env.BASE_PATH || './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
