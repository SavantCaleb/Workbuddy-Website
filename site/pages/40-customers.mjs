// Customers index and one case study per real story (names hidden).
import { I } from '../parts/icons.mjs';
import { close, esc } from '../parts/layout.mjs';
import { ctaPair } from '../parts/sections.mjs';
import { storyVis } from '../parts/proofvis.mjs';
import { STORIES, TOTALS, AUDIT } from '../data/proof.mjs';
import { GROUPS } from '../data/trades.mjs';

const CAT = { home: 'Home services', auto: 'Auto & transport', health: 'Health & beauty', pro: 'Money & real estate', more: 'Events, pets & more' };
const POS = [['6%', '18%', '-7deg'], ['15%', '58%', '5deg'], ['78%', '14%', '6deg'], ['84%', '54%', '-5deg'], ['-2%', '70%', '4deg'], ['70%', '76%', '-4deg'], ['30%', '82%', '-3deg']];

const csCard = (s, i, feature) => `<a class="cs-card${feature ? ' cs-feature' : ''}" href="/customers/${s.slug}" data-r style="--d:${(i % 2) * 100}">
  <div class="vis"><div class="chips"><span class="chip">${esc(s.where)}</span><span class="chip chip--g">Measured</span></div>${storyVis(s)}</div>
  <div class="tx">
    <div class="top"><span>${CAT[s.cat]}</span><span>${String(i + 1).padStart(2, '0')}</span></div>
    <h3>${esc(s.who)}</h3>
    <div><div class="n">${esc(s.n)}</div><small>${esc(s.what)}</small></div>
    <p>${esc(s.line)}</p>
    <span class="link">Read the full story ${I.arrow}</span>
  </div>
</a>`;

const index = (() => {
  const M = 'customers';
  const pols = STORIES.map((s, i) => `<a class="pol" href="/customers/${s.slug}" style="left:${POS[i][0]};top:${POS[i][1]};--rot:${POS[i][2]}"><span class="pol-vis"><b>${esc(s.n)}</b></span><p>${esc(s.short)}${I.arrow}</p></a>`).join('');
  const outcomes = [
    ...STORIES.map((s) => ({ cat: CAT[s.cat], badge: s.n, cap: s.what, h: `${s.short}, ${s.where}` })),
    ...TOTALS.map((t) => ({ cat: 'All clients', badge: t.v, cap: t.meta, h: cap1(t.k) })),
  ];
  const groupsTiles = GROUPS.map((g) => ({ g, n: g.trades.length }));
  const body = `<section class="collage" aria-labelledby="cu-h">
    ${pols}
    <div class="head"><span class="eyebrow" data-r>Customers</span><h1 class="d1" id="cu-h" data-r>Real businesses. <span class="ac">Real results.</span></h1></div>
  </section>

  <section class="sec--tight"><div class="wrap intro">
    <div><h2 class="d3" data-r>Measured by us, <span class="ac" style="display:inline">from Google itself.</span></h2>
      <p class="lede" data-r style="margin-top:16px">Every story here is a real client, with real numbers from Google and our own records. We leave the names out to protect them, and we tell you what we couldn’t measure.</p>
      <div class="btns" data-r style="margin-top:26px"><a class="btn btn--ink" href="#stories">Explore the stories</a><a class="btn btn--soft" href="#outcomes">See every outcome</a></div></div>
    <div class="rule"></div>
    <div data-r><div class="big" data-count="1644">1,644</div><p class="lede" style="margin-top:12px">businesses we’ve worked with, in 49 states</p></div>
  </div></section>

  <section class="sec sec--paper" id="stories"><div class="wrap">
    <div class="feat-head"><div><span class="eyebrow" data-r>Customer stories</span><h2 class="d2" data-r style="margin-top:14px">Five stories, <span class="ac">fully unpacked.</span></h2></div><p data-r>What they started with, what we did first, and what changed, with the fine print.</p></div>
    <div class="cs" style="margin-top:clamp(36px,5vw,64px)">
      ${csCard(STORIES[0], 0, true)}
      <div class="cs-grid">${STORIES.slice(1, 5).map((s, i) => csCard(s, i + 1)).join('')}</div>
    </div>
  </div></section>

  <section class="sec" id="outcomes"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>Outcomes</span><h2 class="d2" data-r>A wall of <span class="ac">real outcomes.</span></h2><p class="lede" data-r>From our records and Google’s, through November 20, 2026.</p></div>
    <div class="oc">${outcomes.map((o, i) => `<div class="oc-t" data-r style="--d:${(i % 3) * 80}"><span class="cat">${esc(o.cat)}</span><span class="badge"><b>${esc(o.badge)}</b><span>${esc(o.cap)}</span></span><h3>${esc(o.h)}</h3><span class="bar"></span></div>`).join('')}</div>
  </div></section>

  <section class="sec sec--azure" style="overflow:hidden"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>What our audits show</span><h2 class="d2" data-r>1,419 free audits. <span class="ac">Here’s what we found.</span></h2><p class="lede" data-r>Owners who asked us for a free report, March to November 2026.</p></div>
    <div class="rband-row" data-r style="grid-template-columns:repeat(3,1fr)">${[AUDIT.ai, AUDIT.reviews, AUDIT.gaps].map((a) => `<div><b>${esc(a.v)}</b><span>${esc(a.k)}</span><span class="fine" style="color:rgba(255,255,255,.65)">${esc(a.src)}</span></div>`).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="feat-head"><div><span class="eyebrow" data-r>Industries</span><h2 class="d2" data-r style="margin-top:14px">Built for <span class="ac">your world.</span></h2></div><div><p data-r>87 kinds of local business, from well drillers to wedding venues. Whatever your trade, there’s a good chance we’ve done it before.</p><a class="btn btn--ink" style="margin-top:18px" href="/industries">Explore every industry</a></div></div>
    <div class="bento" style="margin-top:clamp(36px,5vw,64px)">
      <a class="big" href="/industries" data-r><span class="k">ALL INDUSTRIES</span><div><b data-count="1644">1,644</b><h3 style="margin-top:10px">Businesses in 49 states</h3><p>Each dot is one we’ve worked with.</p></div><div class="map"><canvas data-map="foot"></canvas></div></a>
      ${groupsTiles.map(({ g, n }, i) => `<a href="/industries" class="${i === 4 ? 'wide' : ''}" data-r><span class="k">0${i + 1}</span><div><b>${n}</b><h3>${g.name}</h3><p>${g.blurb}</p></div></a>`).join('')}
    </div>
  </div></section>
  ${close(M, { h1: 'Bring us your town.', h2: 'We’ll show you where you rank.', lede: 'On a short call, Caleb pulls up where you rank right now, so you see your starting line before you pay anything.' })}`;
  return { path: '/customers', kind: 'customers', medium: M, title: 'Customer stories: real results, names hidden | WorkBuddy', desc: 'Real local businesses, real numbers from Google and our own records: Google Maps rankings, reviews, website quote requests and calls answered. Names hidden to protect our clients.', body };
})();

function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function story(s, i) {
  const M = 'story_' + s.slug.replace(/-/g, '_');
  const others = STORIES.filter((x) => x !== s).slice(0, 2);
  const body = `<section class="ph sec--paper"><div class="wrap cs-hero">
    <div>
      <span class="eyebrow" data-r>Customer story · ${String(i + 1).padStart(2, '0')}</span>
      <h1 class="d1" data-r style="margin-top:14px">${esc(s.short)}, <span class="ac">${esc(s.where)}.</span></h1>
      <p class="lede" data-r>${esc(s.n)} ${esc(s.what)}. ${esc(s.line)}</p>
      <div class="chips2" data-r>${s.products.map((p) => `<span>${esc(p)}</span>`).join('')}<span>${esc(s.window)}</span></div>
      <a class="back" href="/customers">${I.left} All customers</a>
    </div>
    <div class="cs-photo" data-r style="--d:120"><div class="inner">${storyVis(s)}</div><div class="bar"><div><b>${esc(CAT[s.cat])}</b><span>${esc(s.where)} · name hidden</span></div><i>${I[s.icon] || I.pin}</i></div></div>
  </div></section>

  <section class="sec sec--paper" style="padding-top:0"><div class="wrap">
    <span class="eyebrow" data-r>The change</span><h2 class="d2" data-r style="margin-top:14px">Where they started, <span class="ac">and where they got to.</span></h2>
    <div class="tri" style="margin-top:clamp(32px,4vw,52px)">
      <div data-r><span class="lab"><span>Starting point</span><span>01</span></span><p>${esc(s.start)}</p></div>
      <div data-r style="--d:100"><span class="lab"><span>First move</span><span>02</span></span><p>${esc(s.move)}</p></div>
      <div class="out" data-r style="--d:200"><span class="lab"><span>Measured outcome</span><span>03</span></span><div><b>${esc(s.n)}</b><p style="margin-top:10px">${esc(s.what)}, ${esc(s.window)}.</p></div></div>
    </div>
  </div></section>

  <section class="sec night"><div class="wrap">
    <span class="eyebrow" data-r>By the numbers</span>
    <div class="glass4" style="margin-top:26px">${s.stats.map((x, j) => `<div data-r style="--d:${j * 80}"><b>${esc(x.v)}</b><span>${esc(x.k)}</span></div>`).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap split split--top">
    <div><span class="eyebrow" data-r>The fine print</span><h2 class="d3" data-r style="margin-top:14px">What we can, and can’t, <span class="ac" style="display:inline">say about it.</span></h2>
      <ul class="xs">${[s.caveat, 'The business’s name is left out on purpose. The numbers come from Google and our own records, checked on November 20, 2026.'].map((c) => `<li data-r>${esc(c)}</li>`).join('')}</ul></div>
    <aside class="glance" data-r><h3>At a glance</h3><dl>
      <div><dt>Industry</dt><dd>${esc(CAT[s.cat])}</dd></div><div><dt>Market</dt><dd>${esc(s.where)}</dd></div>
      <div><dt>What we did</dt><dd>${esc(s.products.join(', '))}</dd></div><div><dt>Result</dt><dd>${esc(s.n)} ${esc(s.what)}</dd></div><div><dt>When</dt><dd>${esc(s.window)}</dd></div>
    </dl></aside>
  </div></section>

  <section class="sec sec--paper"><div class="wrap">
    <span class="eyebrow" data-r>The work</span><h2 class="d2" data-r style="margin-top:14px">How the work <span class="ac">unfolded.</span></h2>
    <div class="unfold" style="margin-top:clamp(32px,4vw,52px)">${s.steps.map((t, j) => `<div data-r style="--d:${j * 80}"><b>0${j + 1}</b><p>${esc(t)}</p></div>`).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="feat-head"><div><span class="eyebrow" data-r>Keep reading</span><h2 class="d2" data-r style="margin-top:14px">More <span class="ac">customer stories.</span></h2></div><a class="link" href="/customers">All customers ${I.arrow}</a></div>
    <div class="cs-grid" style="margin-top:clamp(28px,4vw,48px)">${others.map((o) => csCard(o, STORIES.indexOf(o))).join('')}</div>
  </div></section>
  ${close(M)}`;
  return { path: '/customers/' + s.slug, kind: 'story', medium: M, title: `${s.short}, ${s.where}: ${s.n} ${s.what} | WorkBuddy`, desc: `${s.who}: ${s.n} ${s.what} (${s.window}). ${s.line}`, body };
}

export default [index, ...STORIES.map(story)];
