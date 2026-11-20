import { I } from '../parts/icons.mjs';
import { VIS } from '../parts/vis.mjs';
import { PRODUCTS, apply, close, esc } from '../parts/layout.mjs';
import { GROUPS } from '../data/trades.mjs';
import { INDUSTRIES } from '../data/industries.mjs';
const fmtK = (n) => (n >= 1e6 ? (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + 'M' : Math.round(n / 1000) + 'K');
import { BOARD, STORIES, WEEK } from '../data/proof.mjs';
import { storyVis, boardChart } from '../parts/proofvis.mjs';
import { reviewsBand } from '../parts/sections.mjs';

const M = 'homepage';

const hero = `<section class="hero" aria-labelledby="hero-h">
  <div class="wrap">
    <h1 class="d1" id="hero-h" data-r>Be the one <span class="ac">they call.</span></h1>
    <p class="lede" data-r style="--d:100">We put your business on page one of Google, Google Maps and AI search, so the people in your town call you first. Done for you, every week.</p>
    <div class="hero-four" data-r style="--d:180">
      <p class="hero-four-t">Four things, working as one.</p>
      ${PRODUCTS.map((p) => `<p><b>${p.name}:</b> ${p.line}</p>`).join('')}
    </div>
    <div class="btns" data-r style="--d:260">
      <a class="btn btn--ink btn--lg" href="${apply(M + '_hero')}" data-track="apply_hero">See if you qualify ${I.arrow}</a>
      <a class="btn btn--soft btn--lg" href="/pricing">See pricing</a>
    </div>
    <p class="hero-trust" data-r style="--d:320"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>1,644 local businesses in 49 states have worked with us</p>
  </div>
  <div class="board" data-r style="--d:200">
    <div class="board-top">
      <div>
        <div class="board-k">${esc(BOARD.k)} <span class="board-live">Real client</span></div>
        <div class="board-big" data-count="${BOARD.big}" data-from="${BOARD.from}">${BOARD.from}</div>
        <div class="board-sub"><span class="chip chip--g">${esc(BOARD.chip)}</span>${esc(BOARD.sub)}</div>
      </div>
      <div class="board-side">${BOARD.side.map((s) => `<div><small>${esc(s.k)}</small><b>${esc(s.v)}</b><em>${esc(s.em)}</em></div>`).join('')}</div>
    </div>
    <div class="board-chart">${boardChart(BOARD)}</div>
    <p class="fine" style="margin-top:14px">${esc(BOARD.note)}</p>
  </div>
  <div class="found">
    <p>Where we get you found</p>
    <ul>
      <li>${I.search}Google Search</li><li>${I.pin}Google Maps</li><li>${I.spark}ChatGPT</li><li>${I.spark}Gemini</li><li>${I.spark}Claude</li><li>${I.spark}Perplexity</li>
    </ul>
  </div>
</section>`;

const say = `<section class="say" aria-label="What we do">
  <div class="wrap"><p data-say="work|phone">Most marketing gets you a report. We do the work: your Google page, your website, your reviews and the articles that rank, every single week, while you're out on jobs. You just answer the phone.</p></div>
</section>`;

const svcCard = (p, i) => {
  const ticks = {
    'google-maps': ['Profile fully built out', 'New posts every week', 'Every review answered within a day', 'Review requests after every job'],
    seo: ['A page for every service and town', 'A new article every week', 'Set up for ChatGPT, Gemini and Google AI', 'Rankings tracked every week'],
    website: ['Fast and mobile-ready', 'A page for every service you offer', 'Edit it yourself or text us', 'Yours from day one'],
    leads: ['Website leads texted back in seconds', 'A local business number', 'An assistant for missed calls', 'Every call and lead in one place'],
  }[p.key];
  const h = { 'google-maps': 'Win the map', seo: 'Get named, everywhere', website: 'A site built to rank', leads: 'Never lose a lead' }[p.key];
  return `<div class="svc-card" id="svc-${p.key}">
    <div class="svc-card-top"><span class="k">${p.name}</span><span class="n">0${i + 1}</span></div>
    <div class="svc-vis">${VIS[p.key]()}</div>
    <h3>${h}</h3>
    <ul class="ticks">${ticks.map((t) => `<li>${t}</li>`).join('')}</ul>
  </div>`;
};

const svc = `<section class="sec" id="products" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="head center">
      <span class="eyebrow" data-r>What you get</span>
      <h2 class="d2" id="svc-h" data-r>Four things, <span class="ac">one plan.</span></h2>
      <p class="lede" data-r style="--d:100">Everything it takes to get found on Google and AI search, done for you, for $297 a month.</p>
      <div class="btns" data-r style="--d:160"><a class="btn btn--ink" href="/pricing">See what's included</a></div>
    </div>
    <div class="svc" data-svc>
      <div>
        <p class="svc-k">Your next customers are searching right now</p>
        <ul class="svc-list">
          ${PRODUCTS.map((p, i) => `<li class="svc-item">
            <button type="button" class="svc-btn" aria-expanded="false" aria-controls="svc-${p.key}"><span class="svc-n">0${i + 1}</span><span class="svc-t">${p.name}</span>${I.arrow}</button>
            <div class="svc-body"><div><p>${p.line}</p><a class="link" href="${p.path}">Explore ${p.name} ${I.arrow}</a></div></div>
          </li>`).join('')}
        </ul>
        <div class="svc-foot"><span>Four services. One connected plan.</span><span>No contract</span></div>
      </div>
      <div class="svc-stage">${PRODUCTS.map(svcCard).join('')}</div>
    </div>
  </div>
</section>`;

const industries = `<section class="night sec" id="industries" aria-labelledby="ind-h">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow" data-r>Industries</span>
      <h2 class="d2" id="ind-h" data-r>Built for the businesses <span class="ac">that keep towns running.</span></h2>
      <p class="lede" data-r style="--d:100">Each dot is a business we've worked with, from a well driller in Michigan to a fence company in Nebraska.</p>
    </div>
    <div class="map" data-r><canvas data-map="lit" aria-label="Map of 1,644 businesses we've worked with across 49 states"></canvas></div>
    <div class="stat-row" data-r style="margin-top:clamp(28px,4vw,48px)">
      <div><b data-count="1644">0</b><span>businesses we've worked with</span></div>
      <div><b data-count="49">0</b><span>states</span></div>
      <div><b data-count="87">0</b><span>kinds of local business</span></div>
      <div><b>$297</b><span>a month, no contract</span></div>
    </div>
    <div class="inds" data-tabs style="margin-top:clamp(56px,7vw,96px)">
      <div class="inds-tabs" role="tablist" aria-label="Industries">
        ${GROUPS.map((g) => `<button type="button" class="inds-tab" role="tab" aria-controls="ind-${g.key}" id="tab-${g.key}">${g.name}<small>${g.trades.length}</small></button>`).join('')}
      </div>
      <div>
        ${GROUPS.map((g) => `<div class="inds-panel" role="tabpanel" id="ind-${g.key}" aria-labelledby="tab-${g.key}">
          <div class="ind-card">
            <div class="ind-card-body">
              <div><div class="ind-card-n">${g.trades.length}</div><p>kinds of ${g.name.toLowerCase()} business we've worked with</p></div>
              <div><h3>${g.blurb}</h3><ul>${g.trades.slice(0, 12).map((t) => `<li><span>${t}</span></li>`).join('')}${g.trades.length > 12 ? `<li><span>+${g.trades.length - 12} more</span></li>` : ''}</ul></div>
            </div>
            <div class="ind-card-art"><div class="ind-q"><small>What their customers search</small>${INDUSTRIES.filter((x) => x.group === g.key).slice(0, 4).map((x) => `<a href="/industries/${x.slug}">${I.search}<span>${x.kw}</span><b>${fmtK(x.vol)}/mo</b></a>`).join('')}</div></div>
          </div>
        </div>`).join('')}
        <p style="margin-top:22px"><a class="link" href="/industries">See every industry ${I.arrow}</a></p>
      </div>
    </div>
  </div>
</section>`;

const stories = `<section class="sec sec--paper" id="stories" aria-labelledby="st-h">
  <div class="wrap">
    <div class="head center">
      <span class="eyebrow" data-r>Customer stories</span>
      <h2 class="d2" id="st-h" data-r>Real businesses. <span class="ac">Real results.</span></h2>
      <p class="lede" data-r style="--d:100">Measured by us, from Google itself. Names are left out to protect our clients.</p>
    </div>
  </div>
  <div class="stories" data-carousel>
    <div class="stories-track">
      ${STORIES.slice(0, 6).map((s) => `<article class="story">
        <div class="story-body">
          <div><div class="story-n">${esc(s.n)}</div><p class="story-what">${esc(s.what)}</p><p class="story-line">${esc(s.line)}</p></div>
          <div><p class="story-who">${I[s.icon || 'pin']}${esc(s.who)}</p><a class="btn btn--ink btn--sm" style="margin-top:16px" href="/customers/${s.slug}">Read the story ${I.arrow}</a></div>
        </div>
        <div class="story-vis">${storyVis(s)}</div>
      </article>`).join('')}
    </div>
    <div class="dots-nav"><button type="button" class="arrow" data-prev aria-label="Previous story">${I.left}</button><span class="d"></span><button type="button" class="arrow" data-next aria-label="Next story">${I.right}</button></div>
  </div>
</section>`;

const wall = reviewsBand('outcomes');

const console_ = `<section class="sec" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow" data-r>Watch the work</span>
      <h2 class="d2" id="work-h" data-r>One plan. Four jobs. <span class="ac">Always shipping.</span></h2>
      <p class="lede" data-r style="--d:100">${esc(WEEK.lede)}</p>
    </div>
    <div class="console" data-r>
      <div class="console-bar"><i></i><i></i><i></i><b>WorkBuddy · ${esc(WEEK.account)}</b></div>
      <div class="console-in"><span>Get me more calls from Google. Every week.</span><kbd>ENTER</kbd></div>
      <div class="console-lanes">${WEEK.lanes.map((l) => `<div class="lane"><b>${esc(l.k)}</b><span>${esc(l.v)}</span></div>`).join('')}</div>
      <div class="console-feed" data-feed>${WEEK.rows.map((r) => `<div class="feed-row"><span class="ic ${r.tone || ''}">${I[r.icon]}</span><div>${esc(r.t)}<small>${esc(r.s)}</small></div><time>${esc(r.time)}</time></div>`).join('')}</div>
    </div>
    <div class="console-stats">${WEEK.stats.map((s) => `<div data-r><b data-count="${s.v.replace(/,/g, '')}">${esc(s.v)}</b><span>${esc(s.k)}</span></div>`).join('')}</div>
    <p class="fine" style="margin-top:14px">${esc(WEEK.note)}</p>
  </div>
</section>`;

export default [{
  path: '/',
  kind: 'homepage',
  medium: M,
  title: 'WorkBuddy | Get found on Google, Google Maps and AI search',
  desc: 'WorkBuddy puts local businesses on page one of Google Search, Google Maps and AI search, so the calls come straight to you. Your website, your Google page, reviews and local SEO, done for you. $297 a month, no contract.',
  schema: { '@context': 'https://schema.org', '@type': 'Organization', name: 'WorkBuddy', url: 'https://getworkbuddy.com/', logo: 'https://getworkbuddy.com/favicon.png', founder: { '@type': 'Person', name: 'Caleb Benedict' }, email: 'caleb@getworkbuddy.com' },
  body: [hero, say, svc, industries, stories, wall, console_, close(M)].join('\n'),
}];
