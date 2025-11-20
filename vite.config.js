import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
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
    // VERY IMPORTANT:::this domain must be mapped to 127.0.0.1 in your hosts file, also be sure to update this domain in .env
    host: 'tempevents.local',
    port: 5173,
    strictPort: true,
    allowedHosts: ['test.tempevents.local']
    // the dev server now runs on 'tempevents.local:5173' with this config
  },
})
