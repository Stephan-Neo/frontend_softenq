import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import environments from './src/config/environments';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: environments.baseApiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
