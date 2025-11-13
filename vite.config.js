import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import fs from 'fs'

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
    {
      name: 'website-rewrite',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/sites/')) {
            const htmlPath = path.resolve(__dirname, 'website.html')

            try {
              let html = fs.readFileSync(htmlPath, 'utf-8')
              html = await server.transformIndexHtml(req.url, html)

              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')
              res.end(html)
              return
            } catch (err) {
              return next(err)
            }
          }
          next()
        })
      },
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        cms: path.resolve(__dirname, 'index.html'),
        website: path.resolve(__dirname, 'website.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['tempevents.local'],
  },
})
