import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
    ],
    base: env.VITE_FRONTEND_BASE,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://dev.10pm.studio/dawes/cms/api/query',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // '^/artists/.*': {
        //   target: 'https://dawesandco.com/artists',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/artists/, ''),
        // }
      }
    },
  }
})
