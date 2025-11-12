import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path';
import fs from 'fs';
import { StrictMode } from 'react';

const base = {
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeDimensions', active: true },
            { name: 'convertColors', params: { currentColor: false } },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['tempevents.local', 'photography-class.tempevents.local'],
  }
}

export default defineConfig(({ mode, command }) => {
  if (command === 'serve') {
    if (mode === 'website') {
      return {
        ...base,
        server: {
          ...base.server,
          port: 5174,
        },
      }
    }
    return base;
  }

  if (mode === 'website') {
    return {
      ...base,
      build: {
        outDir: 'dist/website',
        emptyOutDir: true,
        rollupOptions: {
          input: path.resolve(__dirname, 'website.html'),
          output: { manualChunks: undefined },
        },
      },
    }
  }

  return {
    ...base,
    build: {
      outDir: 'dist/cms',
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
      },
    },
  }
})