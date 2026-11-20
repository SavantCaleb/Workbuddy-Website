// Sections shared by product, industry and customer pages.
import { I } from './icons.mjs';
import { apply, esc } from './layout.mjs';
import { WALL } from '../data/proof.mjs';

export const PLATFORMS = [['search', 'Google Search'], ['pin', 'Google Maps'], ['spark', 'ChatGPT'], ['spark', 'Gemini'], ['spark', 'Claude'], ['spark', 'Perplexity']];

export const reviewsBand = (id = 'reviews') => `<section class="sec sec--azure" id="${id}" aria-labelledby="${id}-h" style="overflow:hidden">
  <div class="wrap"><div class="head center">
    <span class="eyebrow" data-r>${esc(WALL.eyebrow)}</span>
    <h2 class="d2" id="${id}-h" data-r>${WALL.h}</h2>
    <p class="lede" data-r style="--d:100">${esc(WALL.lede)}</p>
  </div></div>
  <div class="wall">${[0, 1].map((r) => `<div class="wall-row${r ? ' rev' : ''}" style="--t:${r ? 74 : 64}s">${WALL.tiles.filter((_, i) => i % 2 === r).map(tile).join('')}</div>`).join('')}</div>
</section>`;
export const tile = (t) => `<figure class="tile"><p class="tile-t">${esc(t.t)}</p><figcaption class="tile-who"><i>${I[t.icon] || I.chart}</i>${esc(t.who)}<span>${esc(t.meta)}</span></figcaption></figure>`;

export const feats = (items, { start = 0 } = {}) => items.map((f, i) => `<article class="feat" data-r style="--d:${(i % 3) * 80}">
  <div class="feat-top"><span class="ic">${I[f.icon] || I.check}</span><span class="num">${String(start + i + 1).padStart(2, '0')}</span></div>
  <div><h3>${f.t}</h3><p>${f.d}</p></div>
</article>`).join('');

export const steps3 = (steps) => `<div class="steps3">${steps.map((s, i) => `<article class="feat" data-r style="--d:${i * 100}">
  <div class="feat-top"><span class="ic">0${i + 1}</span></div>
  <div><h3>${s.t}</h3><p>${s.d}</p></div>
</article>`).join('')}</div>`;

export const HOW = [
  { t: 'See where you stand', d: 'Apply, and on a short call Caleb pulls up where you rank right now in your town, so you see your starting line before you pay anything.' },
  { t: 'We build it out', d: 'Your Google page, website, listings and AI search setup, done within one to two weeks of getting access. Your current site stays up until the new one is ready.' },
  { t: 'We keep working, every week', d: 'New posts, new pages and articles, every review answered. You see it all in your dashboard and can text your account manager any time.' },
];

export const faq = (items) => `<div class="faq">${items.map((q) => `<details><summary>${q.q}</summary><div class="a">${q.a.map((p) => `<p>${p}</p>`).join('')}</div></details>`).join('')}</div>`;

export const faqSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((q) => ({ '@type': 'Question', name: q.q.replace(/<[^>]+>/g, ''), acceptedAnswer: { '@type': 'Answer', text: q.a.join(' ').replace(/<[^>]+>/g, '') } })) });

export const vs = (name, no, yes) => `<div class="vs">
  <div class="vs-card vs-no" data-r><h3>Without ${name}</h3><ul>${no.map((x) => `<li>${x}</li>`).join('')}</ul></div>
  <div class="vs-card vs-yes" data-r style="--d:100"><h3>With WorkBuddy</h3><ul>${yes.map((x) => `<li>${x}</li>`).join('')}</ul></div>
</div>`;

export const ctaPair = (medium, where) => `<a class="btn btn--ink btn--lg" href="${apply(medium + '_' + where)}" data-track="apply_${where}">See if you qualify ${I.arrow}</a><a class="btn btn--soft btn--lg" href="/pricing">See pricing</a>`;
