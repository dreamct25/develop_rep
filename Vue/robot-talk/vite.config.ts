import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import pug from 'vite-plugin-pug'
import { fileURLToPath } from 'url'
// import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    pug(),
    vue()
  ],
  base: './',
  build: {
    minify: true,
    cssMinify: true,
    target: ['es2019','chrome58','safari14'],
    sourcemap: false,
    rollupOptions: {
      output: {
        dir: 'build',
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (file) => {
          const { name } = file
          if(name?.match(/\.html$/)) return '[name].[hash][extname]'
          if(name?.match(/\.css$/)) return 'css/[name].[hash][extname]'

          return 'media/[name].[hash][extname]';
        },
      }
    }
  },
  server:{
    port: 9600,
    host: '0.0.0.0',
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
