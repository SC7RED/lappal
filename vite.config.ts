import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both at the domain root (lappal.vercel.app)
  // and proxied under a sub path (dennis.delenyan.com/lappal/).
  base: './',
  plugins: [react()],
  build: {
    // p5 and tone are large libraries needed up front; splitting buys nothing.
    chunkSizeWarningLimit: 1600,
  },
})
