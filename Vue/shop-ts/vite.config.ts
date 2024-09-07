import { UserConfig, defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'url'
import pug from 'vite-plugin-pug'
import vue from '@vitejs/plugin-vue'
import babel from '@rollup/plugin-babel';
import fs from 'fs'

const productionOutputDirName = 'build'

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode!, process.cwd()) }

  return defineConfig({
    
    plugins: [
      pug(),
      vue(),
      babel({
        babelHelpers: 'bundled',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelrc: true
      }),
      {
        name: 'afterBuild',
        closeBundle: () => {
          if(process.env.VITE_APP_ENV === 'production'){

            if (fs.existsSync(`./${productionOutputDirName}`)) {

              console.log(`\n\x1b[1;96mProduction Compile Done !\x1b[0;37m\n`)
            }
          }
        }
      }
    ],
    ...process.env.VITE_APP_ENV === 'production' ? { base:'/fashion_shop' } : {},
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
}
