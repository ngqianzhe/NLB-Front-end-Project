// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://openweb.nlb.gov.sg',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1/Library'), 
      },
    },
  },
});