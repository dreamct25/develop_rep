import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:9806,
    host: '0.0.0.0'
  },
  build:{
    assetsDir: 'static',
    commonjsOptions:{
      sourceMap: false,
    },
    rollupOptions: {
      output: {
        dir: 'build',
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        sourcemap: false
      },
    }
  },
  base:'/color_converter/',
  plugins: [react()]
})
