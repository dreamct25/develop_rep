import { defineConfig, type ViteDevServer } from 'vite'
import pug from 'vite-plugin-pug'
import { fileURLToPath, URL } from 'url'

// const env = process.env.NODE_ENV!.trim() === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  plugins: [
    pug()
  ],
  server:{
    port: 29998,
    host: '0.0.0.0',
    open: true,
  },
  base: './',
  build: {
    minify: true,
    target: ['es2019','chrome58','safari14'],
    sourcemap: false,
    rollupOptions: {
      output: {
        dir: 'build',
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        sourcemap: false,
        assetFileNames: (file) => {
          const { name } = file
          if(name?.match(/\.html$/)) return '[name].[hash][extname]'
          if(name?.match(/\.css$/)) return 'css/[name].[hash][extname]'

          return '[name].[hash][extname]';
        },
      }
    }
  }
})
