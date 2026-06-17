import { defineConfig, type UserConfig, loadEnv } from 'vite'
import wyw from '@wyw-in-js/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

const env = process.env.VITE_APP_ENV === 'development'

// https://vite.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode!, process.cwd()) }

  return  defineConfig({
    base: './',
    plugins: [
      react(),
      wyw({
        include: ['**/*.{ts,tsx}'],
        exclude: ['node_modules'],
        babelOptions: {
          presets: [
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-transform-class-properties'
          ]
        },
      })
    ],
    build: {
      minify: !env,
      target: ['es2019','chrome58','safari14'],
      commonjsOptions: {
        sourceMap: env
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
      port: 15173,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    }
  })
}
