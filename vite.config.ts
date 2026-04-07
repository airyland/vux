import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages'),
      '@vux': resolve(__dirname, './packages'),
      '@website': resolve(__dirname, './website')
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    tailwindcss()
  ],
  assetsInclude: ['**/*.md'],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: './dist/sites',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        doc: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'demo.html')
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})
