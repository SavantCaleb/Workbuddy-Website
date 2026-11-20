// Company (about) and careers, in Mega's layouts. Only what's true: no board, investors or press, because we have none.
import { I } from '../parts/icons.mjs';
import { PRODUCTS, apply, close, esc } from '../parts/layout.mjs';
import { ctaPair } from '../parts/sections.mjs';
import { TOTALS } from '../data/proof.mjs';
import { readFileSync } from 'node:fs';

const LOGO = readFileSync(new URL('../parts/logo.svg', import.meta.url), 'utf8');

const company = (() => {
  const M = 'company';
  const body = `<section class="ph sec--paper"><div class="wrap co-hero">
    <div>
      <span class="eyebrow" data-r>Company</span>
      <h1 class="d1" data-r style="margin-top:14px">We do the work <span class="ac">that makes the phone ring.</span></h1>
      <p class="lede" data-r style="margin-top:20px">WorkBuddy gets local businesses found on Google Search, Google Maps and AI search, so the calls come straight to them. We’ve worked with 1,644 businesses in 49 states, from well drillers to wedding venues.</p>
      <div class="btns" data-r style="margin-top:30px">${ctaPair(M, 'hero')}</div>
    </div>
    <div class="co-card" data-r style="--d:120">
      <div class="co-card-top">${LOGO}<span class="chip chip--g">Active</span></div>
      ${PRODUCTS.slice(0, 3).map((p, i) => `<div class="co-row"><span class="ic">${I[p.icon]}</span><div><b>${p.name}</b><span>${p.line}</span></div><small>0${i + 1}</small></div>`).join('')}
      <div class="co-pill"><i></i>1,358 Google posts published for clients since March</div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>What you can expect</span><h2 class="d2" data-r>How we work, <span class="ac">in three lines.</span></h2><p class="lede" data-r>The things we decided early and won’t change.</p></div>
    <div class="vals" data-r>
      <div><div class="top"><span class="ic">${I.calendar}</span><span class="num">01</span></div><h3>We earn it every month.</h3><p>No contract and no setup fee. If we stop pulling our weight, you leave, so we don’t stop.</p></div>
      <div><div class="top"><span class="ic">${I.shield}</span><span class="num">02</span></div><h3>What’s yours stays yours.</h3><p>Your website from day one, your domain, your Google page, your number and your reviews. Leave any time and keep all of it.</p></div>
      <div><div class="top"><span class="ic">${I.chart}</span><span class="num">03</span></div><h3>Honest numbers only.</h3><p>We show you what we measured and say what we can’t. We never buy, filter or hide reviews, and nobody can sell you a spot on Google.</p></div>
    </div>
  </div></section>

  <section class="sec sec--paper"><div class="wrap founder">
    <img src="/site/caleb.webp" width="1080" height="1080" alt="Caleb Benedict, founder of WorkBuddy" loading="lazy" data-r>
    <div>
      <span class="eyebrow" data-r>The founder</span>
      <h2 class="d2" data-r style="margin-top:14px">Hi, I’m Caleb. <span class="ac">You’ll talk to me first.</span></h2>
      <p data-r>I founded WorkBuddy, and we’re based in Massachusetts. We started out answering phones for local businesses: our AI receptionist has picked up more than 41,000 calls for laundromats and other shops.</p>
      <p data-r>Today we focus on the work that makes the phone ring in the first place: the unglamorous, every-week work that gets a business found. Before you sign up, you talk to me. Once you’re on board, you get an account manager you can text any time.</p>
      <div class="btns" data-r style="margin-top:26px"><a class="btn btn--ink" href="mailto:caleb@getworkbuddy.com">Email Caleb</a><a class="btn btn--soft" href="/careers">Work with us</a></div>
    </div>
  </div></section>

  <section class="sec night"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>Where we’ve worked</span><h2 class="d2" data-r>1,644 businesses. <span class="ac">49 states.</span></h2><p class="lede" data-r>Each dot is a business we’ve worked with.</p></div>
    <div class="map" data-r><canvas data-map="lit" aria-label="Map of the businesses we've worked with"></canvas></div>
    <div class="stat-row" data-r style="margin-top:clamp(28px,4vw,48px)">${TOTALS.slice(0, 4).map((t) => `<div><b>${esc(t.v)}</b><span>${esc(t.k)}</span></div>`).join('')}</div>
  </div></section>
  ${close(M)}`;
  return { path: '/company', kind: 'company', medium: M, title: 'About WorkBuddy: we get local businesses found', desc: 'WorkBuddy, founded by Caleb Benedict and based in Massachusetts, gets local businesses found on Google Search, Google Maps and AI search. 1,644 businesses in 49 states. No contract, and what’s yours stays yours.', body,
    schema: { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About WorkBuddy', about: { '@type': 'Organization', name: 'WorkBuddy', founder: { '@type': 'Person', name: 'Caleb Benedict' }, url: 'https://getworkbuddy.com/' } } };
})();

const ROLE = {
  slug: 'client-success-manager', title: 'Client Success Manager', team: 'Client success', where: 'Remote · US business hours', type: 'Full-time',
  pay: '$1,500 base + a bonus for every client you keep, up to $2,500 a month',
  apply: '/vsl/page-one/hiring-csm',
  about: 'You’ll own every client after they sign: the kickoff call, the check-ins, and the texts that keep them winning. Our AI does the busywork. You do the parts that need a person.',
  do: ['Run the kickoff call with every new client, and get what we need from them in week one', 'Call every client on day 7, 14 and 28, then every month, so they always know what we did', 'Answer fast when they call or text, like they’re your only client', 'Catch the quiet ones before they cancel: no reply in a week, a missed call, a step stuck on the owner'],
  need: ['2+ years as a customer success or account manager', 'Hands-on local SEO for small businesses: Google Business Profiles, websites, reviews', 'Clear spoken English that US business owners understand easily on the phone', 'A laptop, a smartphone and solid internet', 'Full-time availability during US business hours, Monday to Saturday'],
};

const careers = (() => {
  const M = 'careers';
  const body = `<section class="ph sec--paper center"><div class="wrap"><div class="head">
    <span class="eyebrow" data-r>Careers</span>
    <h1 class="d1" data-r>Help local businesses <span class="ac">get found.</span></h1>
    <p class="lede" data-r>We’re a small team doing real work for real owners, every week. If you like being the person clients can count on, we’d like to meet you.</p>
    <div class="btns center" data-r><a class="btn btn--ink btn--lg" href="#open-roles">See open roles ${I.arrow}</a></div>
  </div></div></section>
  <section class="sec"><div class="wrap">
    <div class="head center"><h2 class="d2" data-r>What the work <span class="ac">looks like.</span></h2></div>
    <div class="grid g3">
      <div class="card card--paper" data-r><span class="ic">${I.people}</span><h3>Owners, not tickets</h3><p>You’ll talk to roofers, plumbers and shop owners who are out on jobs all day. Short, clear and fast wins.</p></div>
      <div class="card card--paper" data-r style="--d:100"><span class="ic">${I.spark}</span><h3>AI does the busywork</h3><p>Posts, articles and replies are drafted for you. You spend your time on the parts that need a person.</p></div>
      <div class="card card--paper" data-r style="--d:200"><span class="ic">${I.chart}</span><h3>Real results to show</h3><p>Every client has numbers you can point to: reviews, rankings and calls, measured every week.</p></div>
    </div>
  </div></section>
  <section class="sec sec--paper" id="open-roles"><div class="wrap">
    <div class="feat-head"><div><span class="eyebrow" data-r>We’re hiring</span><h2 class="d2" data-r style="margin-top:14px">Open roles.</h2></div><p data-r>1 open position · Remote</p></div>
    <ul class="roles" style="margin-top:36px"><li><a href="/careers/${ROLE.slug}" data-r><h3>${ROLE.title}</h3><span>${I.brief}${ROLE.team}</span><span>${I.pin}Remote</span>${I.arrow}</a></li></ul>
  </div></section>
  ${close(M)}`;
  return { path: '/careers', kind: 'careers', medium: M, title: 'Careers at WorkBuddy', desc: 'Join WorkBuddy and help local businesses get found on Google and AI search. Open role: Client Success Manager, remote, full-time.', body };
})();

const job = (() => {
  const M = 'job';
  const body = `<section class="ph sec--paper"><div class="wrap">
    <a class="back" href="/careers" style="margin:0 0 22px">${I.left} All roles</a>
    <div><span class="eyebrow">${ROLE.team}</span></div>
    <h1 class="d1" data-r style="margin-top:14px">${ROLE.title}</h1>
    <div class="meta"><span>${I.pin}${ROLE.where}</span><span>${I.clock}${ROLE.type}</span></div>
    <div class="btns" style="margin-top:28px"><a class="btn btn--ink btn--lg" href="${ROLE.apply}">Apply for this role ${I.arrow}</a><a class="btn btn--soft btn--lg" href="/careers#open-roles">Browse all roles</a></div>
  </div></section>
  <section class="sec"><div class="wrap job">
    <div>
      <h2>About the role</h2><p class="lede">${ROLE.about}</p>
      <h2>What you’ll do</h2><ul class="ticks">${ROLE.do.map((x) => `<li>${x}</li>`).join('')}</ul>
      <h2>What we’re looking for</h2><ul class="ticks">${ROLE.need.map((x) => `<li>${x}</li>`).join('')}</ul>
      <h2>How to apply</h2><p class="lede">Fill out a 3-minute application, record a 60-second video about something you’ve done consistently for a year or more, then email <a class="link" href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a> every day until you hear back. Following up is the job, so this is the test.</p>
    </div>
    <aside class="glance"><h3>At a glance</h3><dl>
      <div><dt>Team</dt><dd>${ROLE.team}</dd></div><div><dt>Location</dt><dd>${ROLE.where}</dd></div><div><dt>Type</dt><dd>${ROLE.type}</dd></div><div><dt>Pay</dt><dd>${ROLE.pay}</dd></div>
    </dl><a class="btn btn--ink" style="width:100%;margin-top:18px" href="${ROLE.apply}">Apply ${I.arrow}</a></aside>
  </div></section>`;
  return { path: '/careers/' + ROLE.slug, kind: 'job', medium: M, title: `${ROLE.title} (remote) | WorkBuddy careers`, desc: `${ROLE.title} at WorkBuddy: remote, full-time, US business hours. ${ROLE.pay}. For experienced account managers who know local SEO.`, body,
    schema: { '@context': 'https://schema.org', '@type': 'JobPosting', title: ROLE.title, description: ROLE.about, employmentType: 'FULL_TIME', jobLocationType: 'TELECOMMUTE', hiringOrganization: { '@type': 'Organization', name: 'WorkBuddy', sameAs: 'https://getworkbuddy.com/' }, datePosted: '2026-11-11', baseSalary: { '@type': 'MonetaryAmount', currency: 'USD', value: { '@type': 'QuantitativeValue', minValue: 1500, maxValue: 2500, unitText: 'MONTH' } } } };
})();

export default [company, careers, job];
