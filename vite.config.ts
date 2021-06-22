import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import MarkDown from 'vite-plugin-md'

const resolve = path.resolve;
// TODO: 按需加载样式
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './packages') },
      { find: '@vux', replacement: resolve(__dirname, './packages') },
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `@import "./website/assets/styles/variables.scss";`
      }
    }
  },
  plugins: [
    MarkDown(),
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ],
  build: {
    outDir: './dist/sites',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        doc: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'demo.html')
      }
    }
  }
});
