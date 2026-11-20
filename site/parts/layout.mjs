// The frame every static page shares: head (tracking gate, fonts, SEO), nav, footer, dock.
import { readFileSync } from 'node:fs';
import { I } from './icons.mjs';

const here = new URL('.', import.meta.url);
const LOGO = readFileSync(new URL('logo.svg', here), 'utf8').replace('<svg', '<svg role="img" aria-label="WorkBuddy"');
const POSTHOG = readFileSync(new URL('posthog-loader.js', here), 'utf8').trim();
const LOGO_NIGHT = LOGO.replace(/fill:#2f3e46/gi, 'fill:#F1F5F7');
export const ORIGIN = 'https://getworkbuddy.com';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const apply = (medium) => `/apply?utm_source=website&amp;utm_medium=${medium}`;

export const PRODUCTS = [
  { key: 'google-maps', path: '/google-maps', name: 'Google Maps', icon: 'pin', line: 'Your Google Business Profile, built out and run every week, with reviews on autopilot.' },
  { key: 'seo', path: '/seo', name: 'Search & AI', icon: 'spark', line: 'Rank on Google Search, and get named when people ask ChatGPT or Google’s AI.' },
  { key: 'website', path: '/website', name: 'Website', icon: 'site', line: 'A fast site with a page for every service you offer, built to rank. Yours from day one.' },
  { key: 'leads', path: '/leads', name: 'Calls & leads', icon: 'chat', line: 'Every lead texted back in seconds, and an assistant for the calls you miss.' },
];

function head(p) {
  const url = ORIGIN + (p.path === '/' ? '/' : p.path);
  const title = p.title;
  const ld = p.schema ? `<script type="application/ld+json">${JSON.stringify(p.schema)}</script>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WorkBuddy">
<meta property="og:title" content="${esc(p.ogTitle || title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/og-home.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap">
<link rel="stylesheet" href="/site/wb.css?v=${p.v}">
${ld}
<script>
document.documentElement.classList.add("js");
if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("rm");
// Tracking runs only on the real site: local copies, Vercel previews and ?wb_test=1 visits stay out of PostHog, Google Ads, RB2B and the Meta pixel.
window.WB_LIVE = /^(www\\.)?getworkbuddy\\.com$/.test(location.hostname) && !/[?&]wb_test=1(&|$)/.test(location.search);
if (window.WB_LIVE) {
${POSTHOG}
posthog.init('phc_e0A64xYOCQZAQdGXQ1aBnFMopZDvUHVtsciGPFjgr2U',{api_host:'https://us.i.posthog.com',capture_pageview:true,capture_pageleave:true,persistence:'localStorage+cookie'});
posthog.register({ funnel: 'website', page_kind: '${p.kind}', page_version: 'v4' });
var gs = document.createElement("script"); gs.async = true; gs.src = "https://www.googletagmanager.com/gtag/js?id=AW-17886210357"; document.head.appendChild(gs);
window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", "AW-17886210357");
!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.head.appendChild(s);}("QOQRJH9QK162");
}
</script>
</head>`;
}

function nav(p) {
  const cur = (href) => (p.path === href || (href !== '/' && p.path.startsWith(href + '/')) ? ' aria-current="page"' : '');
  const prods = PRODUCTS.map((x) => `<a class="nav-prod" href="${x.path}"><span class="ic">${I[x.icon]}</span><b>${x.name}</b><span>${x.line}</span></a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <div class="nav-bar">
    <a class="nav-logo" href="/" aria-label="WorkBuddy home">${LOGO}</a>
    <ul class="nav-links">
      <li><button type="button" data-menu aria-expanded="false" aria-controls="nav-menu">Products ${I.chev}</button></li>
      <li><a href="/customers"${cur('/customers')}>Customers</a></li>
      <li><a href="/industries"${cur('/industries')}>Industries</a></li>
      <li><a href="/company"${cur('/company')}>Company</a></li>
      <li><a href="/pricing"${cur('/pricing')}>Pricing</a></li>
    </ul>
    <div class="nav-right">
      <a class="btn btn--ink" href="${apply(p.medium + '_nav')}" data-track="apply_nav">See if you qualify</a>
      <button type="button" class="nav-burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
    </div>
    <div class="nav-menu" id="nav-menu">
      <div class="nav-menu-grid">
        <div class="nav-prods">${prods}</div>
        <a class="nav-feature" href="/pricing">
          <div><b>One plan. $297 a month.</b><p style="margin-top:8px">All four, done for you. No contract, no setup fee, cancel any month.</p></div>
          <span class="link">See pricing ${I.arrow}</span>
        </a>
      </div>
    </div>
  </div>
  <div class="nav-sheet">
    <div class="nav-prods">${prods}</div>
    <div class="nav-sheet-links">
      <a href="/customers">Customers</a><a href="/industries">Industries</a><a href="/company">Company</a><a href="/pricing">Pricing</a>
    </div>
  </div>
</header>`;
}

function footer(p) {
  const col = (h, links) => `<div><h4>${h}</h4><ul>${links.map(([t, href]) => `<li><a href="${href}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="ft">
  <div class="wrap ft-top">
    <div class="ft-brand">
      <a href="/" aria-label="WorkBuddy home">${LOGO_NIGHT}</a>
      <p>We get local businesses found on Google Search, Google Maps and AI search, so the calls come straight to them.</p>
      <a class="mail" href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a>
    </div>
    ${col('Product', [...PRODUCTS.map((x) => [x.name, x.path]), ['Pricing', '/pricing']])}
    ${col('Company', [['About', '/company'], ['Customers', '/customers'], ['Industries', '/industries'], ['Careers', '/careers'], ['Blog', '/blog']])}
    ${col('Get started', [['See if you qualify', apply(p.medium + '_footer')], ['Email Caleb', 'mailto:caleb@getworkbuddy.com']])}
  </div>
  <div class="ft-art" aria-hidden="true"><div class="map"><canvas data-map="foot"></canvas></div></div>
  <div class="wrap ft-legal">
    <span>&copy; 2026 WorkBuddy Inc. Each dot is a business we've worked with.</span>
    <nav aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
  </div>
</footer>
<div class="dock"><a class="btn btn--ink" href="${apply(p.medium + '_dock')}" data-track="apply_dock">See if you qualify</a></div>
<script src="/site/wb.js?v=${p.v}" defer></script>`;
}

export function page(p) {
  return `${head(p)}
<body>
${nav(p)}
<main id="main">
${p.body}
</main>
${footer(p)}
</body>
</html>
`;
}

// The closing call to action most pages end on (Mega's "You built it" band).
export function close(medium, { h1 = 'You built the business.', h2 = 'We get it found.', lede = 'We plug into the business you already run and get to work: your Google page, your website, your reviews and AI search. Every week.' } = {}) {
  return `<section class="close" aria-labelledby="close-${medium}">
  <div class="wrap">
    <h2 class="d1" id="close-${medium}" data-r>${h1}<span class="ac">${h2}</span></h2>
    <p class="lede" data-r style="--d:120">${lede}</p>
    <div class="btns" data-r style="--d:200">
      <a class="btn btn--ink btn--lg" href="${apply(medium + '_close')}" data-track="apply_close">See if you qualify ${I.arrow}</a>
      <a class="btn btn--soft btn--lg" href="/pricing">See pricing</a>
    </div>
    <p class="fine" style="margin-top:18px">$297 a month. No contract, no setup fee. Cancel any month.</p>
  </div>
</section>`;
}
