import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'
import { fileURLToPath, URL } from 'url'

const env = process.env.NODE_ENV!.trim() === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    mainFields: ['module'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  plugins: [
    angular()
  ],
  server:{
    port: 9998,
    host: '0.0.0.0',
    open: true,
  },
  base: './',
  mode: process.env.NODE_ENV!.trim(),
  build: {
    minify: !env,
    cssMinify: !env,
    target: ['es2019','chrome58','safari14'],
    sourcemap: env,
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
  }
})
