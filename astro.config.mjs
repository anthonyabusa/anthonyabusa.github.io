// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// #439 ascii-lab settings capture. configureServer only exists on the DEV
// server, so this middleware is dev/preview-only by construction: the static
// production build has no /api routes and never includes this code. The lab
// page auto-POSTs its tune JSON here; the reviewing agent reads
// .ascii-tune/latest.json off the preview host once tuning is done, so no
// settings ever need to be pasted back by hand.
const asciiTuneCapture = () => ({
  name: 'ascii-tune-capture',
  configureServer(server) {
    const dir = path.resolve('.ascii-tune');
    server.middlewares.use('/api/ascii-tune', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (c) => { body += c; });
        req.on('end', () => {
          try {
            const stamped = { savedAt: new Date().toISOString(), tune: JSON.parse(body) };
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, 'latest.json'), JSON.stringify(stamped, null, 2));
            fs.appendFileSync(path.join(dir, 'history.jsonl'), JSON.stringify(stamped) + '\n');
            res.setHeader('content-type', 'application/json');
            res.end('{"ok":true}');
          } catch {
            res.statusCode = 400;
            res.end('{"ok":false}');
          }
        });
        return;
      }
      if (req.method === 'GET') {
        const f = path.join(dir, 'latest.json');
        res.setHeader('content-type', 'application/json');
        res.end(fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : 'null');
        return;
      }
      res.statusCode = 405;
      res.end();
    });
  },
});

export default defineConfig({
  site: 'https://anthonyabusa.com',
  redirects: {
    '/blog/three-days-of-sunlight': '/blog/three-days-of-sun',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss(), asciiTuneCapture()],
  },
});
