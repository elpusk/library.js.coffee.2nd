import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for line 13: Define __dirname for ESM environment
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Configured for deployment at https://elpusk.github.io/library.js.coffee.2nd/app/webmapper/
  base: process.env.VITE_BASE_PATH || '/library.js.coffee.2nd/app/webmapper/',
  resolve: {
    alias: {
      // Points to the library in the parent directory structure
      '@lib': path.resolve(__dirname, '../../lib/elpusk')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});