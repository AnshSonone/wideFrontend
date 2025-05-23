import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// export default defineConfig(({mode}) => {
//   const env = loadEnv(mode, process.cwd())

//   return {
//     plugins: [
//       react(),
//       tailwindcss(),
//     ],

//     server: {
//       proxy: {
//         '/api': {
//           target: 'https://anshO.pythonanywhere.com',
//           changeOrigin: true,
//           secure: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         }
//       }
//     }
//   }
// })

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
