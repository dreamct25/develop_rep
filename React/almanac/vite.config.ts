import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@wyw-in-js/vite';
import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
import packageJson from './package.json'

const pwaIconSize = [
  16, 20, 29, 32, 40, 50, 57, 58, 60, 64,
  72, 76, 80, 87, 100, 114, 120, 128, 144,
  152, 167, 180, 192, 256, 512, 1024
]

// https://vitejs.dev/config/
export default defineConfig(env => {

  return {
    mode: env.mode,
    base: './',
    build: {
      emptyOutDir: true,
      target: ['es2019','chrome58','safari14'],
      commonjsOptions:{
        sourceMap: false,
      },
      rollupOptions: {
        output: {
          dir: 'build',
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: (file) => {
            const { name } = file

            if(name?.match(/\.html$/)) return 'index.[hash][extname]'
            if(name?.match(/\.css$/)) return 'css/index.[hash][extname]'

            return '[name].[hash][extname]';
          },
        },
      }
      
    },
    plugins: [
      react(),
      linaria({
        include: ['**/*.{ts,tsx}'],
        babelOptions: {
          presets: [
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
        }
      }),
      VitePWA({
        strategies: 'injectManifest',
        devOptions: {
          enabled: true,
          type: 'module'
        },
        srcDir: 'src',
        filename: 'ServiceWorker.ts',
        outDir: 'build',
        registerType: 'autoUpdate',
        manifest: {
          name: packageJson.productName,
          short_name: packageJson.productName,
          description: 'a simple almanac',
          display: 'standalone',
          theme_color: 'rgb(30, 30, 30)',
          background_color: 'rgb(255, 255, 255)',
          start_url: './',
          icons: pwaIconSize.map(size => ({
            src: `./pwa-icon/${size}.png`,
            sizes: `${size}x${size}`,
            type: 'image/png'
          }))
        }
      }),
      {
        name: 'afterBuild',
        closeBundle: async () => {
          console.log(`\n\x1b[1;96mProduction compile done Waiting for PWA build ...\x1b[0;37m`)
        },
      },
      {
        name: 'afterBuildPWA',
        enforce: 'post',
        closeBundle: async () => {
          console.log(`\n\x1b[1;96mPWA compile done !\x1b[0;37m`)
        },
      }
    ],
    server:{
      port: 10005,
      host: '0.0.0.0',
      open: true
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
