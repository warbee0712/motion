import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo/',
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [vue()],
  alias: {
    '@vueuse/motion': path.resolve(__dirname, './src/index.ts'),
  },
})
