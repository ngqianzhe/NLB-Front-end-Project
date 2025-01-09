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
  define: {
    'process.env.VITE_NLB_API_KEY': JSON.stringify('<P}o$s$v.|X4~w#*4/+8GxrIJd_I5Wtt'),
    'process.env.VITE_NLB_APP_CODE': JSON.stringify('DEV-NgQianZhe')
  }
});