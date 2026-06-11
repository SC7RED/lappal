import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // p5 is a single large library loaded up front; splitting it buys nothing.
    chunkSizeWarningLimit: 1400,
  },
})
