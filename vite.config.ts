import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3356,
    host: true,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'midnight-sdk': [
            '@midnight-ntwrk/dapp-connector-api',
            '@midnight-ntwrk/midnight-js-fetch-zk-config-provider',
            '@midnight-ntwrk/midnight-js-http-client-proof-provider',
            '@midnight-ntwrk/midnight-js-indexer-public-data-provider',
            '@midnight-ntwrk/midnight-js-level-private-state-provider',
            '@midnight-ntwrk/midnight-js-network-id',
          ],
          'mesh-sdk': ['@meshsdk/react', '@meshsdk/core'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['@midnight-ntwrk'],
  },
  worker: {
    format: 'es',
  },
});

