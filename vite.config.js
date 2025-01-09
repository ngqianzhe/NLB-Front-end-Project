// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/Library': {
        target: 'https://openweb.nlb.gov.sg',
        changeOrigin: true,
      },
    },
  },
});