import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@wyw-in-js/vite';
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig(env => {

  return {
    mode: env.mode,
    base: './',
    build: {
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
      {
        name: 'afterBuild',
        closeBundle: () => {
          console.log(`\n\x1b[1;96mProduction Compile Done !\x1b[0;37m\n`)
        }
      },
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
