/**
 * Pre-render script for WorkBuddy website.
 *
 * After `vite build` produces the SPA in dist/, this script:
 *   1. Starts a local static server serving dist/
 *   2. Uses Chrome's --dump-dom headless mode to render each route
 *   3. Captures the fully-rendered HTML (with meta tags, structured data, content)
 *   4. Writes it back to dist/ so Vercel serves it as static HTML
 *   5. Generates 404.html from an unknown route
 *   6. Generates og-image.png via Chrome screenshot
 */

import { execSync, execFileSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 45678;

// ── Find Chrome executable ────────────────────────────────────────────
async function findChrome() {
  // Explicit env var
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  // macOS
  const macPaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ];
  for (const p of macPaths) {
    if (fs.existsSync(p)) return p;
  }

  // Linux
  const linuxNames = ['google-chrome-stable', 'google-chrome', 'chromium-browser', 'chromium'];
  for (const name of linuxNames) {
    try {
      const p = execSync(`which ${name}`, { encoding: 'utf-8' }).trim();
      if (p) return p;
    } catch { /* not found */ }
  }

  // Puppeteer's bundled Chrome (fallback)
  try {
    const puppeteer = await import('puppeteer');
    return puppeteer.executablePath();
  } catch { /* not available */ }

  throw new Error('Chrome not found. Set CHROME_PATH environment variable.');
}

// ── All routes to pre-render ──────────────────────────────────────────
const routes = [
  '/',
  '/pricing',
  '/about',
  '/blog',
  '/faq',
  '/contact',
  '/demo',
  '/property-management',
  '/bella',
  '/privacy',
  '/terms',
  // Blog articles
  '/blog/ai-receptionist-for-laundromats',
  '/blog/how-to-automate-your-laundromat',
  '/blog/laundromat-phone-solutions',
  '/blog/manage-laundromat-remotely',
  '/blog/reduce-laundromat-costs',
  '/blog/ai-answering-service-guide',
  '/blog/virtual-receptionist-comparison',
  '/blog/missed-call-text-back',
  '/blog/smart-laundromat-technology',
  '/blog/after-hours-answering-service',
  '/blog/best-laundromat-software',
  '/blog/laundromat-pos-systems',
  '/blog/is-owning-a-laundromat-profitable',
  '/blog/how-to-run-a-laundromat',
  '/blog/cashless-laundromat-guide',
  '/blog/how-to-start-a-laundromat',
  '/blog/laundromat-marketing-guide',
  '/blog/wash-and-fold-service-guide',
  '/blog/laundromat-branding-guide',
  '/blog/laundromat-equipment-guide',
  '/blog/buying-a-laundromat',
  '/blog/laundromat-financing',
  '/blog/laundromat-design-ideas',
  '/blog/laundromat-insurance-guide',
];

// ── MIME type map ─────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.mp4':  'video/mp4',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

// ── Simple static file server (SPA fallback to index.html) ───────────
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      let filePath = path.join(DIST, url.pathname);

      // If path has no extension, try index.html variants, then SPA fallback
      if (!path.extname(filePath)) {
        if (fs.existsSync(path.join(filePath, 'index.html'))) {
          filePath = path.join(filePath, 'index.html');
        } else if (fs.existsSync(filePath + '.html')) {
          filePath = filePath + '.html';
        } else {
          filePath = path.join(DIST, 'index.html');
        }
      }

      try {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        const content = fs.readFileSync(path.join(DIST, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

// ── Render a page using Chrome's --dump-dom ───────────────────────────
function renderPage(chromePath, url) {
  try {
    const html = execFileSync(chromePath, [
      '--headless=new',
      '--dump-dom',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--virtual-time-budget=8000',  // Give React 8s of virtual time to render
      '--run-all-compositor-stages-before-draw',
      url,
    ], {
      encoding: 'utf-8',
      timeout: 45000,
      maxBuffer: 10 * 1024 * 1024, // 10MB
    });
    return html;
  } catch (err) {
    console.error(`    Error rendering: ${err.message?.slice(0, 200)}`);
    return null;
  }
}

// ── Pre-render a single route ─────────────────────────────────────────
function prerenderRoute(chromePath, route) {
  const url = `http://localhost:${PORT}${route}`;
  const html = renderPage(chromePath, url);

  if (!html) {
    console.log(`  ✗ ${route} (render failed)`);
    return;
  }

  // Write the file
  const outPath = route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);

  // Quick validation: check if the HTML contains rendered content
  const hasTitle = html.includes('<title>') && !html.includes('<title></title>');
  const hasContent = html.includes('<h1') || html.includes('<main');
  const marker = hasTitle && hasContent ? '✓' : '⚠';

  console.log(`  ${marker} ${route}`);
}

// ── Generate OG Image ─────────────────────────────────────────────────
function generateOGImage(chromePath) {
  const ogImagePath = path.join(DIST, 'og-image.png');
  const ogHTML = `data:text/html,${encodeURIComponent(`<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  background: linear-gradient(135deg, #324A5F 0%, #1a2e3f 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: white; text-align: center; padding: 60px 80px;
}
.logo { font-size: 48px; font-weight: 800; letter-spacing: -1px; margin-bottom: 24px; color: #67B7D1; }
.tagline { font-size: 52px; font-weight: 700; line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 28px; max-width: 900px; }
.sub { font-size: 24px; opacity: 0.7; max-width: 700px; line-height: 1.5; }
.badge { position: absolute; bottom: 40px; font-size: 18px; opacity: 0.5; }
</style></head><body>
<div class="logo">WorkBuddy</div>
<div class="tagline">AI Receptionist for Laundromats</div>
<div class="sub">Never miss a call. Never lose a customer. From $129/mo.</div>
<div class="badge">getworkbuddy.com</div>
</body></html>`)}`;

  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--screenshot=${ogImagePath}`,
      '--window-size=1200,630',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      ogHTML,
    ], { timeout: 30000 });
    console.log('  ✓ og-image.png');
  } catch (err) {
    console.error(`  ✗ og-image.png: ${err.message?.slice(0, 200)}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔍 Pre-rendering WorkBuddy pages...\n');

  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const chromePath = await findChrome();
  console.log(`  Chrome: ${chromePath}\n`);

  const server = await startServer();
  console.log(`  Server: http://localhost:${PORT}\n`);

  // Pre-render all routes
  for (const route of routes) {
    prerenderRoute(chromePath, route);
  }

  // Generate 404 page
  console.log('\n📄 Generating 404.html...');
  const html404 = renderPage(chromePath, `http://localhost:${PORT}/this-page-does-not-exist-404`);
  if (html404) {
    fs.writeFileSync(path.join(DIST, '404.html'), html404);
    console.log('  ✓ 404.html');
  }

  // Generate OG image
  console.log('\n🖼  Generating og-image.png...');
  generateOGImage(chromePath);

  server.close();
  console.log('\n✅ Pre-rendering complete!\n');
}

main().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
