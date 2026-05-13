import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://ai-mock-interview-73qo.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
