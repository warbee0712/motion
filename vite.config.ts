import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo/',
  plugins: [vue()],
  alias: {
    '@lib': path.resolve(__dirname, './src'),
  },
})
