import viteglgl from 'vite-plugin-glsl';
import esbuildglsl from 'esbuild-plugin-glsl';
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    open: true,
    port: 8080
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildglsl()]
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [
    viteglgl()
  ], 
  test: {
    timeout: 10000, // Increase timeout globally to 10 seconds
  },
})