// Builds the static marketing site into public/: node site/build.mjs
// Each module in site/pages exports an array of pages: { path, title, desc, kind, medium, body, schema?, noindex? }.
// It also points vercel.json at the generated pages and rewrites sitemap.xml.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { page, ORIGIN } from './parts/layout.mjs';

const root = new URL('../', import.meta.url);
const pub = new URL('public/', root);
const v = createHash('sha1').update(readFileSync(new URL('site/wb.css', pub)) + readFileSync(new URL('site/wb.js', pub))).digest('hex').slice(0, 8);

const pages = [];
for (const f of readdirSync(new URL('pages/', import.meta.url)).filter((f) => f.endsWith('.mjs')).sort()) {
  const mod = await import(new URL('pages/' + f, import.meta.url));
  pages.push(...mod.default);
}
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error('duplicate path ' + p.path);
  seen.add(p.path);
  const html = page({ ...p, v });
  if (/TODO/.test(html)) throw new Error('placeholder text left on ' + p.path);
  const file = p.path === '/' ? new URL('index.html', pub) : new URL(p.path.slice(1) + '/index.html', pub);
  mkdirSync(new URL('.', file), { recursive: true });
  writeFileSync(file, html);
}
console.log('built', pages.length, 'pages, assets v' + v);

// vercel.json: our pages win over the old React routes and the API rewrites (/customers/:token stays for real tokens).
const vj = JSON.parse(readFileSync(new URL('vercel.json', root), 'utf8'));
const ours = pages.filter((p) => p.path !== '/').map((p) => p.path);
vj.redirects = vj.redirects.filter((r) => !ours.includes(r.source));
vj.rewrites = vj.rewrites.filter((r) => !(ours.includes(r.source) && r.destination === '/app.html') && !r.__site);
vj.rewrites = vj.rewrites.filter((r) => !(r.destination || '').match(/^\/[a-z0-9/-]+\/index\.html$/));
vj.rewrites.unshift(...ours.map((s) => ({ source: s, destination: s + '/index.html' })));
// Old paths that now have a home on the new site.
const moved = { '/about': '/company', '/faq': '/pricing#questions' };
vj.redirects = vj.redirects.map((r) => (moved[r.source] ? { ...r, destination: moved[r.source] } : r));
vj.rewrites = vj.rewrites.filter((r) => !(moved[r.source] && r.destination === '/app.html'));
// One route per line, like the hand-written file, so diffs stay readable.
const line = (o) => JSON.stringify(o).replace(/","/g, '", "').replace(/":/g, '": ').replace(/^\{/, '{ ').replace(/\}$/, ' }').replace(/\[\{/g, '[{ ').replace(/\}\]/g, ' }]');
const out = Object.entries(vj).map(([k, val]) => {
  if (Array.isArray(val) && k !== 'headers') return `  "${k}": [\n${val.map((o) => '    ' + line(o)).join(',\n')}\n  ]`;
  return `  "${k}": ${JSON.stringify(val, null, 2).replace(/\n/g, '\n  ')}`;
}).join(',\n');
writeFileSync(new URL('vercel.json', root), '{\n' + out + '\n}\n');

// sitemap.xml: every indexable static page, plus any blog URLs the old sitemap listed.
const old = readFileSync(new URL('sitemap.xml', pub), 'utf8');
const blog = [...old.matchAll(/<loc>([^<]+\/blog[^<]*)<\/loc>/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);
const urls = [...pages.filter((p) => !p.noindex).map((p) => ORIGIN + (p.path === '/' ? '/' : p.path)), ...blog.filter((u) => !pages.some((p) => ORIGIN + p.path === u))];
writeFileSync(new URL('sitemap.xml', pub), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log('sitemap', urls.length, 'urls');
