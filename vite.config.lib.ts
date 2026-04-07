import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VuxResolver } from './packages/resolvers'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages'),
      '@vux': resolve(__dirname, './packages')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VuxResolver()]
    })
  ],
  build: {
    outDir: './dist',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'Vux',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `vux.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})
