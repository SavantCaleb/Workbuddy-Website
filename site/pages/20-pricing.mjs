// Pricing: Mega's three-card layout, holding our one plan.
import { I } from '../parts/icons.mjs';
import { apply, close } from '../parts/layout.mjs';
import { faq, faqSchema } from '../parts/sections.mjs';
import { FAQ } from '../data/faq.mjs';

const M = 'pricing';
const ticks = (xs) => `<ul class="ticks">${xs.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const body = `<section class="ph sec--paper center" style="padding-bottom:clamp(40px,5vw,64px)"><div class="wrap"><div class="head">
  <span class="eyebrow" data-r>Pricing</span>
  <h1 class="d1" data-r>One plan. <span class="ac">Everything included.</span></h1>
  <p class="lede" data-r style="--d:100">$297 a month for all of it, done for you. No contract, no setup fee, no add-ons. Cancel any month.</p>
</div></div></section>
<section class="sec--paper" style="padding-bottom:clamp(80px,10vw,130px)"><div class="wrap"><div class="pcards">
  <article class="pc" data-r>
    <span class="pc-k">Plan · what we do</span>
    <div class="pc-name">All four, done for you.</div>
    <p>The work that gets you found and turns searches into calls, every week.</p>
    <div class="pc-box"><h4>Your growth team</h4>${ticks(['Google Maps: profile built out, weekly posts, every review answered', 'Search & AI: keyword research, a page per service, a new article every week', 'Website: rebuilt to rank, hosting included', 'Calls & leads: instant text replies, a business number, a missed-call assistant', 'Review requests after every job', 'Listings on Yelp, Apple Maps, Bing Maps and the BBB'])}</div>
    <a class="btn btn--soft" href="${apply(M + '_card1')}" data-track="apply_card1">See if you qualify ${I.arrow}</a>
  </article>
  <article class="pc" data-r style="--d:100">
    <span class="pc-k">Plan · what’s yours</span>
    <div class="pc-name">You own it all.</div>
    <p>If it’s not working, you leave and keep everything we built.</p>
    <div class="pc-box"><h4>Stays in your name</h4>${ticks(['Your website, from day one', 'Your domain, registered in your name', 'Your Google Business Profile (we’re only added as a manager)', 'Your phone number and your reviews', 'If you leave, we move the website wherever you want at no cost'])}</div>
    <a class="btn btn--soft" href="${apply(M + '_card2')}" data-track="apply_card2">See if you qualify ${I.arrow}</a>
  </article>
  <article class="pc pc--hi" data-r style="--d:200">
    <span class="pc-pill">Everything included</span>
    <span class="pc-k">The plan</span>
    <div class="pc-name">$297 <small>a month</small></div>
    <p>One price for everything here. You talk to Caleb first, and he shows you where you rank before you pay anything.</p>
    <div class="pc-box"><h4>The terms</h4>${ticks(['No contract: cancel any month, by text or email', 'No setup fee, no hidden fees, no add-ons', 'Built out within one to two weeks of access', 'A dedicated account manager you can text', 'A dashboard for your results and billing'])}</div>
    <a class="btn btn--ink" href="${apply(M + '_plan')}" data-track="apply_plan">See if you qualify ${I.arrow}</a>
  </article>
</div>
<p class="fine center" style="margin-top:22px">Paid ads (Google or Meta) aren’t included. Taxes, if any apply, are extra.</p>
</div></section>
<section class="sec" id="questions"><div class="wrap faq2">
  <div><span class="eyebrow" data-r>Questions, answered</span><h2 class="d2" data-r>What owners ask <span class="ac">before they sign up.</span></h2><p class="lede" data-r>Anything else, ask Caleb on your call, or email <a class="link" href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a>.</p></div>
  ${faq(FAQ)}
</div></section>
${close(M)}`;

export default [{ path: '/pricing', kind: 'pricing', medium: M, title: 'Pricing: $297 a month, everything included | WorkBuddy', desc: 'One plan: $297 a month for your Google page, website, local SEO, AI search, reviews and lead replies, done for you. No contract, no setup fee, cancel any month. You own your website from day one.', schema: faqSchema(FAQ), body }];
