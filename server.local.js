import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import vhost from "vhost";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cmsRoot = path.join(__dirname, "dist", "cms");
const siteRoot = path.join(__dirname, "dist", "website");

const serveSpa = (root, fallback) => {
  const app = express();
  app.use(express.static(root, { index: false }));
  // Use a catch-all middleware (no path pattern)
  app.use((_req, res) => res.sendFile(path.join(root, fallback)));
  return app;
};

const cmsApp = serveSpa(cmsRoot, "index.html");
const viewerApp = serveSpa(siteRoot, "website.html");

const app = express();
app.use(vhost("tempevents.local", cmsApp));
app.use(vhost("*.tempevents.local", viewerApp));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`CMS:    http://tempevents.local:${PORT}`);
  console.log(`Viewer: http://photography-class.tempevents.local:${PORT}`);
});