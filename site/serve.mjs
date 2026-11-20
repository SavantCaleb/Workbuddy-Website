// Local preview of the static site: node site/serve.mjs [port]. /path serves public/path/index.html, like Vercel.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const pub = new URL('../public/', import.meta.url).pathname;
const port = +(process.argv[2] || 5190);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.txt': 'text/plain', '.xml': 'application/xml', '.mp4': 'video/mp4' };
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const tries = p.endsWith('/') ? [p + 'index.html'] : [p, p + '/index.html', p + '.html'];
  for (const t of tries) {
    const f = join(pub, t);
    try { if ((await stat(f)).isFile()) { res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(await readFile(f)); return; } } catch {}
  }
  res.writeHead(404, { 'content-type': 'text/plain' }); res.end('not found: ' + p);
}).listen(port, () => console.log('site preview on http://localhost:' + port));
