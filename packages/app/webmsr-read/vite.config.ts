import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/library.js.coffee.2nd/app/webmsr-read/' : '/'),
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../../lib/elpusk')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
