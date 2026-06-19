import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import pugPlugin from 'vite-plugin-pug';

// https://vite.dev/config/
export default () => {

  return  defineConfig({
    base: './',
    plugins: [
        pugPlugin()
    ],
    build: {
      minify: true,
      target: ['es2019','chrome58','safari14'],
      commonjsOptions: {
        sourceMap: false
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
      port: 10173,
      host: '0.0.0.0',
      watch: {
        usePolling: true
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    }
  })
}
