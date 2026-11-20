// Industries index and one page per industry (Mega's programmatic industry pages), with real Google search data.
import { I } from '../parts/icons.mjs';
import { VIS } from '../parts/vis.mjs';
import { close, esc } from '../parts/layout.mjs';
import { tile, HOW, ctaPair } from '../parts/sections.mjs';
import { GROUPS } from '../data/trades.mjs';
import { INDUSTRIES, VOL_SOURCE } from '../data/industries.mjs';
import { WALL, AUDIT, STORIES } from '../data/proof.mjs';

const n = (x) => x.toLocaleString('en-US');
const money = (x) => '$' + (x >= 10 ? Math.round(x) : x.toFixed(2));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const index = (() => {
  const M = 'industries';
  const rows = GROUPS.map((g) => {
    const pages = INDUSTRIES.filter((x) => x.group === g.key);
    const others = g.trades.filter((t) => !pages.some((x) => x.name === t));
    const vol = pages.reduce((a, x) => a + x.vol, 0);
    return `<div class="ind-row" data-r>
      <div><span class="ind-ic">${I[g.icon]}</span><h2>${g.name}</h2><p>${g.blurb}</p>
        <div class="mini"><div><b>${g.trades.length}</b><span>kinds we’ve worked with</span></div><div><b>${(vol / 1e6).toFixed(1)}M</b><span>“near me” searches a month, below</span></div></div></div>
      <div><ul class="ind-links">${pages.map((x) => `<li><a href="/industries/${x.slug}">${x.name}<small>${n(x.vol)}/mo</small></a></li>`).join('')}</ul>
        ${others.length ? `<p class="ind-also">Also: ${others.join(', ')}.</p>` : ''}</div>
    </div>`;
  }).join('');
  return {
    path: '/industries', kind: 'industries', medium: M,
    title: 'Industries we serve: local SEO for every kind of local business | WorkBuddy',
    desc: 'WorkBuddy has worked with 1,644 businesses in 87 kinds of local business, from roofers and plumbers to chiropractors, auto shops and laundromats. See how we get yours found on Google and AI search.',
    body: `<section class="ph sec--paper center"><div class="wrap"><div class="head">
      <span class="eyebrow" data-r>Industries</span>
      <h1 class="d1" data-r>Built for every kind <span class="ac">of local business.</span></h1>
      <p class="lede" data-r style="--d:100">We’ve worked with 1,644 businesses in 87 kinds of work. Pick yours to see what your customers search for, and what we do about it.</p>
      <div class="btns center" data-r style="--d:160">${ctaPair(M, 'hero')}</div>
    </div></div></section>
    <section class="sec"><div class="wrap"><div class="ind-rows">${rows}</div>
    <p class="fine" style="margin-top:40px">Monthly searches: ${VOL_SOURCE}, for “[trade] near me”.</p></div></section>
    ${close(M)}`,
  };
})();

function industry(x) {
  const M = 'industry_' + x.slug.replace(/-/g, '_');
  const related = STORIES.filter((s) => s.cat === x.group);
  const tiles = [...related.map((s) => WALL.tiles.find((t) => t.who === s.short && t.meta === s.where)).filter(Boolean), ...WALL.tiles.filter((t) => !related.some((s) => t.who === s.short && t.meta === s.where))].slice(0, 8);
  const body = `<section class="ph sec--paper center"><div class="wrap"><div class="head">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/industries">Industries</a><span aria-hidden="true">/</span><span>${x.name}</span></nav>
    <h1 class="d1" data-r>Local SEO for ${x.many} <span class="ac">that brings the calls.</span></h1>
    <p class="lede" data-r style="--d:100">People search “${x.kw}” about ${n(x.vol)} times a month in the US. We put ${x.many} on page one of Google, Google Maps and AI search, so those calls come to you. Done for you, every week, for $297 a month.</p>
    <div class="btns center" data-r style="--d:160">${ctaPair(M, 'hero')}</div>
  </div></div></section>

  <section class="sec"><div class="wrap pain">
    <div><span class="eyebrow" data-r>Sound familiar?</span>
      <h2 class="d2" data-r>Great work doesn’t <span class="ac">rank on its own.</span></h2>
      <ul class="xs">${x.pains.map((p) => `<li data-r>${p}</li>`).join('')}</ul></div>
    <div class="withcard" data-r>
      <h3>The numbers for ${x.many}</h3>
      <div><b>${n(x.vol)}</b><span>searches a month for “${x.kw}”<small>${VOL_SOURCE}</small></span></div>
      <div><b>${money(x.cpc)}</b><span>what advertisers pay for one click on that search<small>${VOL_SOURCE}</small></span></div>
      <div><b>${AUDIT.ai.v}</b><span>of businesses we audited weren’t named by any AI assistant<small>${AUDIT.ai.src}</small></span></div>
    </div>
  </div></section>

  <section class="sec sec--paper"><div class="wrap split">
    <div><span class="eyebrow" data-r>Done for you</span>
      <h2 class="d2" data-r style="margin-top:14px">You run the jobs. <span class="ac">We get you found.</span></h2>
      <p class="lede" data-r style="margin-top:18px">We build out your Google page, rebuild your website with a page for every service, and publish a new local article every week. When someone asks ChatGPT or Google’s AI “${x.ai}”, we want your name in the answer.</p>
      <p data-r style="margin-top:16px;color:var(--soft)">Pages we’d build for ${x.many}:</p>
      <div class="svc-pages" data-r>${x.services.map((s) => `<span>${s}</span>`).join('')}</div></div>
    <div class="chipcard" data-r>${VIS['google-maps'](x.kw)}<span class="wk">${I.clock}Working every week</span></div>
  </div></section>

  <section class="sec"><div class="wrap">
    <span class="eyebrow" data-r>How it works</span>
    <h2 class="d2" data-r style="margin-top:14px">Three steps <span class="ac">to page one.</span></h2>
    <div class="nums3">${HOW.map((h, i) => `<div data-r style="--d:${i * 100}"><b>${i + 1}</b><h3>${h.t}</h3><p>${h.d}</p></div>`).join('')}</div>
  </div></section>

  <section class="sec sec--paper"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>${esc(WALL.eyebrow)}</span><h2 class="d2" data-r>${WALL.h}</h2><p class="lede" data-r>${esc(WALL.lede)}</p></div>
    <div class="tilegrid">${tiles.map(tile).join('')}</div>
    <p style="margin-top:26px;text-align:center"><a class="link" href="/customers">Read the customer stories ${I.arrow}</a></p>
  </div></section>
  ${close(M, { h1: `Be the ${x.one}`, h2: 'they call first.' })}`;
  return {
    path: '/industries/' + x.slug, kind: 'industry', medium: M,
    title: `${x.name} marketing: local SEO for ${x.many} | WorkBuddy`,
    desc: `Local SEO for ${x.many}: more calls from Google. We manage your Google Business Profile, build a website that ranks and get you named by AI search. “${x.kw}” is searched about ${n(x.vol)} times a month. $297 a month, no contract.`,
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: `Local SEO for ${x.many}`, provider: { '@type': 'Organization', name: 'WorkBuddy', url: 'https://getworkbuddy.com/' }, areaServed: 'US', offers: { '@type': 'Offer', price: '297', priceCurrency: 'USD' } },
    body,
  };
}

export default [index, ...INDUSTRIES.map(industry)];
