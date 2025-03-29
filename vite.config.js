import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'https://ansho.pythonanywhere.com',
    },
  },
  build: {
    proxy: {
      '/api': {
        target: "https://ansho.pythonanywhere.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      }
    }
  }
})
