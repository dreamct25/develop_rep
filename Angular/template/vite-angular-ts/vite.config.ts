import { defineConfig } from 'vite'
import { angular } from '@nitedani/vite-plugin-angular/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [angular()],
  server:{
    port: 9998,
    host: '0.0.0.0',
    open: true,
  },
  build:{
    assetsDir:'./js'
  }
})
