import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss({
      optimize: { minify: true }
    })
  ],
  base: './',
  build: {
    minify: true,
    target: ['es2019','chrome58','safari14'],
    assetsDir: 'static',
    commonjsOptions:{
      sourceMap: false,
    },
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

          return 'media/[name].[hash][extname]';
        },
      }
    }
  },
  server: {
    port: 10988,
    host: '0.0.0.0'
  }
})
