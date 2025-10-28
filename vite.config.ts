/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      enabled: true,
      reporter: ['text'],
    },
  },
  server: {
    host: '0.0.0.0',
    // Enable polling and explicit HMR options to make live reload work reliably
    // when running inside Docker on Windows (bind mounts). Polling avoids
    // missed file change events and HMR host ensures the browser can connect
    // back to the dev server's websocket.
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
