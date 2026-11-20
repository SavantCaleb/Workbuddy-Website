// Small product mockups ("Your Business" stands in for the owner's name). They show what we do, not client results.
import { I } from './icons.mjs';

export const VIS = {
  'google-maps': (q = 'roofer near me') => `<div class="ui">
  <div class="ui-search">${I.search}<span>${q}</span></div>
  <div class="ui-panel ui">
    <div class="ui-row"><span class="ui-pin you">A</span><div><div class="ui-name">Your Business</div><div class="ui-meta"><span class="ui-stars">★★★★★</span> 4.9 · 128 reviews · Open now</div></div><span class="chip chip--g" style="margin-left:auto">Top spot</span></div>
    <div class="ui-row"><span class="ui-pin">B</span><div><div class="ui-name" style="color:var(--soft)">The other guy</div><div class="ui-meta">★ 4.1 · 22 reviews</div></div></div>
    <div class="ui-row"><span class="ui-pin">C</span><div><div class="ui-name" style="color:var(--soft)">Another company</div><div class="ui-meta">★ 3.8 · 9 reviews</div></div></div>
  </div>
  <div class="bub bub--in"><small>New review · ★★★★★</small>Showed up the same day and fixed it right. Fair price too.</div>
  <div class="bub bub--out"><small>Your reply · posted for you</small>Thanks so much! Glad we could get it fixed the same day.</div>
</div>`,
  seo: (q = 'Who’s the best fence company in Lincoln?') => `<div class="ui-ai">
  <div class="q">${q}</div>
  <div class="a">Owners in Lincoln point to <mark>Your Business</mark>: 4.9 stars, fast quotes, and installs across the city. They also have a page for each fence type, with prices.</div>
  <div class="ui-tags"><span>ChatGPT</span><span>Google AI</span><span>Gemini</span><span>Claude</span><span>Perplexity</span></div>
  <div class="ui-panel"><small>google.com · page one</small><b style="color:var(--azure-ink)">Fence Installation in Lincoln, NE | Your Business</b><div class="ui-meta" style="margin-top:3px">Wood, vinyl and chain link fences, installed in about a week. Free quotes.</div></div>
</div>`,
  website: () => `<div class="ui-site">
  <div class="ui-site-bar"><i></i><i></i><i></i><span>yourbusiness.com</span></div>
  <div class="ui-site-body">
    <div class="l h"></div><div class="l" style="width:88%"></div><div class="l" style="width:64%"></div>
    <div class="btns"><span>Call now</span><span>Free quote</span></div>
    <div class="ui-site-grid"><div>Repairs</div><div>Installs</div><div>Inspections</div><div>Emergency</div><div>Commercial</div><div>Service area</div></div>
  </div>
</div>`,
  leads: () => `<div class="ui">
  <div class="ui-panel"><small>New lead from yourbusiness.com · 2:14 PM</small><b>Dana R.</b> · Needs a quote for a leaking water heater</div>
  <div class="bub bub--out"><small>Texted back in 5 seconds</small>Hi Dana, thanks for reaching out to Your Business! What’s the address, and when’s a good time for a quote?</div>
  <div class="bub bub--in">Tomorrow morning works. 14 Elm St.</div>
  <div class="ui-panel ui-row" style="justify-content:space-between"><span><small>Missed call · 9:47 PM</small>Answered by your assistant</span><span class="chip chip--g">Name + number taken</span></div>
</div>`,
};
