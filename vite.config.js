// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'; // Node's path module

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'removeViewBox', active: false }, // keep viewBox (important for scaling)
            { name: 'removeDimensions', active: true }, // remove width/height, allow CSS sizing
            {
              name: 'convertColors',
              params: { currentColor: false }, // replace fixed colors with "currentColor"
            },
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
  // *for dev mode only*
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["event.local", "photography-class.event.local"] // add this in sytem hosts file as well
  }
})
