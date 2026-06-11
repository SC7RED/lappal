import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // p5 and tone are large libraries needed up front; splitting buys nothing.
    chunkSizeWarningLimit: 1600,
  },
})
