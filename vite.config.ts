import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Usa el nombre exacto de tu repositorio con barras al inicio y final
  base: '/Portafolio/', 
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})