import { defineConfig, loadEnv, UserConfig  } from 'vite'
import { fileURLToPath, URL } from 'url'
import pug from 'vite-plugin-pug'
import babel from '@rollup/plugin-babel';
import vue from '@vitejs/plugin-vue'
// import fs from 'fs'
import { VitePWA } from 'vite-plugin-pwa'
import packageJson from './package.json'

// 設定建構資料匣名稱
const productionOutputDirName = 'build'

const pwaIconSize = [
  16, 20, 29, 32, 40, 50, 57, 58, 60, 64,
  72, 76, 80, 87, 100, 114, 120, 128, 144,
  152, 167, 180, 192, 256, 512, 1024
]

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode!, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      pug(),
      babel({
        babelHelpers: 'bundled',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelrc: true
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
          })),
          orientation: 'portrait'
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
      },
      // {
      //   name: 'afterBuild',
      //   closeBundle: () => {
      //     if(process.env.VITE_APP_ENV === 'production'){

      //       if (fs.existsSync(`./${productionOutputDirName}`)) {
      //         console.log(`\n\x1b[1;96mProduction Compile Done !\x1b[0;37m\n`)
      //       }
      //     }
      //   }
      // }
    ],
    base:'./',
    mode: process.env.VITE_APP_ENV,
    build: {
      target: ['es2019','chrome58','safari14'],
      assetsDir: 'static',
      commonjsOptions:{
        sourceMap: false,
      },
      rollupOptions: {
        output: {
          dir: productionOutputDirName,
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
    server:{
      port: 9300,
      host: '0.0.0.0',
      open: true
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
