import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import wyw from '@wyw-in-js/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),wyw({ 
    include: ['**/*.{ts,tsx}'],
    babelOptions: {
      presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@wyw-in-js/babel-preset'
      ],
    }
  })],
  base: '',
  build: {
    emptyOutDir: true,
    assetsDir: '',
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        sourcemap: false,
        assetFileNames: (file) => {

          const { name } = file
          if(name?.match(/\.html$/)) return `[name].[hash][extname]`
          if(name?.match(/\.css$/)) return `css/[name].[hash][extname]`

          return `static/[name].[hash][extname]`;
        },
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
