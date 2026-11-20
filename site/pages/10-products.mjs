// The four product pages (Mega's agent pages): /google-maps, /seo, /website, /leads.
import { I } from '../parts/icons.mjs';
import { VIS } from '../parts/vis.mjs';
import { PRODUCTS, close, esc } from '../parts/layout.mjs';
import { PLATFORMS, reviewsBand, feats, steps3, HOW, faq, faqSchema, vs, ctaPair } from '../parts/sections.mjs';
import { WORK, RESULTS, COST } from '../data/proof.mjs';
import { INDUSTRIES } from '../data/industries.mjs';

const P = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));

const DATA = {
  'google-maps': {
    title: 'Google Business Profile management for local businesses | WorkBuddy',
    desc: 'We build out your Google Business Profile, post to it every week, answer every review and send review requests after every job, so you show up at the top of Google Maps. $297 a month, no contract.',
    h1: ['Win the map', 'in your town.'],
    lede: 'Your Google page is the first thing people see when they search for what you do. We build it out, post to it every week, answer every review and ask your happy customers for more.',
    act: [['Posts', 'Posted a project photo with your service area', '12m'], ['Reviews', 'Replied to a new 5-star review', '1h'], ['Profile', 'Added 3 services and set holiday hours', '3h']],
    strip: [['Weekly', 'new posts on your Google page'], ['Within a day', 'every review answered'], ['Every job', 'ends with a review request'], ['Yours', 'the profile stays in your name']],
    costH: ['People pick from the top three.', 'Everyone else waits.'],
    costP: 'When someone needs you, Google shows three businesses on the map. A half-built profile with old reviews doesn’t make the cut, however good your work is.',
    featH: ['Your Google page,', 'run for you.'],
    featP: 'Everything a profile needs to rank and win the call, done every week.',
    feats: [
      { icon: 'pin', t: 'Full profile build-out', d: 'Categories, services, service area, hours, description and photos, all set up the way Google reads them.' },
      { icon: 'doc', t: 'A new post every week', d: 'Project photos, offers and updates, so your page looks alive and keeps earning attention.' },
      { icon: 'reply', t: 'Every review answered', d: 'Thoughtful replies to every review, good or bad, normally within 24 hours.' },
      { icon: 'star', t: 'Review requests', d: 'Share your customers with us and requests go out after every job. More reviews, more trust, a higher spot.' },
      { icon: 'shield', t: 'Honest reviews only', d: 'Every customer can leave a review. We never filter, hide or pay for reviews.' },
      { icon: 'link', t: 'Listings that match', d: 'Accurate listings on Yelp, Apple Maps, Bing Maps, the BBB and other major directories.' },
      { icon: 'search', t: 'Local keyword research', d: 'We find what people in your town actually type, and what the businesses above you are doing.' },
      { icon: 'chart', t: 'Results in your dashboard', d: 'See your reviews and progress any time, and get a monthly report on where you rank.' },
      { icon: 'chat', t: 'An account manager you can text', d: 'New photos, new hours, a new service? Text us and it’s done.' },
    ],
    vsNo: ['A profile set up once and never touched', 'Reviews sitting unanswered for months', 'No new reviews unless someone remembers to ask', 'Your listings say different things on every site'],
    vsYes: ['Built out completely, and kept current', 'Every review answered, normally within a day', 'Review requests after every job, automatically', 'The same name, number and hours everywhere'],
    faq: [
      { q: 'Do I keep my Google Business Profile?', a: ['Yes. You stay the owner; we’re only added as a manager. If you leave, it stays exactly where it is, with every review and post.'] },
      { q: 'Can you get me reviews?', a: ['We send review requests to the customers you share with us after each job, so happy customers actually leave one. We never buy, filter or hide reviews.'] },
      { q: 'I don’t have a Google Business Profile yet.', a: ['That’s fine. We set one up with you and walk you through Google’s verification.'] },
    ],
  },
  seo: {
    title: 'Local SEO and AI search for local businesses | WorkBuddy',
    desc: 'We get your business on page one of Google Search and named by ChatGPT, Gemini, Claude, Perplexity and Google’s AI answers: local keyword research, a page for every service and a new article every week. $297 a month.',
    h1: ['Page one on Google,', 'and named by AI.'],
    lede: 'People search Google, and more and more of them ask ChatGPT or Google’s AI who to hire. We research your town, build the pages, publish a new article every week and set you up so AI tools can find and recommend you.',
    act: [['Content', 'Published “What a water heater replacement costs in your town”', '2m'], ['Pages', 'Added a page for drain cleaning in your service area', '40m'], ['AI search', 'Updated your listings so AI tools describe you right', '2h']],
    strip: [['Weekly', 'a new article targeting local searches'], ['Every service', 'gets its own page'], ['6 AI tools', 'set up to find and recommend you'], ['Monthly', 'a report on where you rank']],
    plat: true,
    costH: ['Your customers are searching.', 'Someone else is showing up.'],
    costP: 'If your website is one page and your business isn’t described anywhere AI tools look, Google and ChatGPT have nothing to go on, so they send the call to someone else.',
    featH: ['Everything it takes', 'to rank, done for you.'],
    featP: 'Search engine and AI search work, every week, without you writing a word.',
    feats: [
      { icon: 'search', t: 'Local keyword research', d: 'What people in your town type, and what the businesses above you rank for.' },
      { icon: 'site', t: 'A page for every service', d: 'So when someone searches for one specific thing you do, there’s a page that answers exactly that.' },
      { icon: 'doc', t: 'A new article every week', d: 'Useful local articles that answer real questions and keep your site getting stronger.' },
      { icon: 'check', t: 'Every page optimized', d: 'Titles, headings, speed and structure set up the way search engines read them.' },
      { icon: 'spark', t: 'AI search setup', d: 'Set up so ChatGPT, Gemini, Claude, Perplexity, Grok and Google’s AI answers can find and recommend you.' },
      { icon: 'link', t: 'Directory listings', d: 'Accurate listings on Yelp, Apple Maps, Bing Maps, the BBB and other major directories, which AI tools read too.' },
      { icon: 'pin', t: 'Google Maps, in step', d: 'Your Google page and your website say the same thing, so both rank higher together.' },
      { icon: 'chart', t: 'Rankings tracked', d: 'We watch where you rank and send a monthly report, so you see progress in plain numbers.' },
      { icon: 'chat', t: 'Your account manager', d: 'Questions, ideas, a new service to push? Text us any time.' },
    ],
    vertical: true,
    vsNo: ['A one-page site Google can’t place', 'No articles, so nothing new to rank', 'AI tools don’t know you exist, or get you wrong', 'You find out you dropped when the phone goes quiet'],
    vsYes: ['A page for every service and town you serve', 'A new local article every single week', 'Set up so AI tools can find and recommend you', 'Rankings tracked, with a report every month'],
    faq: [
      { q: 'How long until I rank?', a: ['Rankings build week by week. Some of our clients moved up within two or three weeks; how fast depends on your town, your trade and your competition.'] },
      { q: 'What is AI search, and why does it matter?', a: ['People now ask ChatGPT, Gemini and Google’s AI who to hire. Those tools repeat what the web says about you: your site, your Google page, your listings and your reviews. We set all of that up so they can find and recommend you by name.'] },
      { q: 'Do I have to write anything?', a: ['No. We write the pages and the weekly articles. If you want to add your own touch, text us or edit from your dashboard.'] },
      { q: 'Can you guarantee a #1 spot?', a: ['No one honest can. Google decides. What we promise is the work that earns the spot, done every week, and a clear report on where you stand.'] },
    ],
  },
  website: {
    title: 'Websites built to rank, for local businesses | WorkBuddy',
    desc: 'A fast, mobile-ready website with a page for every service you offer, a lead form and hosting, built to rank on Google. Yours from day one. $297 a month with everything else included.',
    h1: ['A website', 'built to rank.'],
    lede: 'Google looks at how well your website matches what people in your town search for. We build or rebuild yours so it’s fast, works great on a phone, and has a page for every service you offer. Then we keep adding to it.',
    act: [['Build', 'Launched a page for each of your 8 services', '5m'], ['Leads', 'Connected the quote form to instant text replies', '1h'], ['Content', 'Published this week’s local article', '1d']],
    strip: [['Every service', 'its own page'], ['Mobile-first', 'fast on any phone'], ['Day one', 'the website is yours']],
    costH: ['A one-page site', 'gives Google nothing.'],
    costP: 'An old site, or no site at all, tells Google almost nothing about what you do and where. It also makes the people who do find you wonder if you’re still in business.',
    featH: ['Built for Google,', 'and for your customers.'],
    featP: 'A site that ranks, turns visits into calls, and keeps getting stronger.',
    feats: [
      { icon: 'site', t: 'Built or rebuilt to rank', d: 'Structured around the searches that matter in your town.' },
      { icon: 'phone', t: 'Mobile-ready and fast', d: 'Most of your customers find you on a phone. It loads fast and the call button is always right there.' },
      { icon: 'doc', t: 'A page for every service', d: 'One page per service, so each one can rank on its own.' },
      { icon: 'chat', t: 'A lead form that texts back', d: 'Every website lead gets an instant text reply, so they don’t call the next company.' },
      { icon: 'globe', t: 'Hosting included', d: 'No separate hosting bill, no plugins to update.' },
      { icon: 'clock', t: 'No downtime', d: 'Your current site stays up until the new one is ready.' },
      { icon: 'wrench', t: 'Change it any time', d: 'Text us and we’ll make the change, or edit it yourself from your dashboard.' },
      { icon: 'shield', t: 'Yours from day one', d: 'The website is yours, and your domain is registered in your name. If you leave, we move it wherever you want at no cost.' },
      { icon: 'spark', t: 'A new article every week', d: 'Fresh local content that keeps the site growing and ranking.' },
    ],
    vsNo: ['One page, or a site from years ago', 'No page for most of the services you offer', 'Leads sit in an inbox nobody checks', 'Changes mean chasing a web guy'],
    vsYes: ['A fast, modern site built to rank', 'A page for every service you offer', 'Every lead texted back in seconds', 'Text us, or edit it yourself, any time'],
    faq: [
      { q: 'What if I already have a website?', a: ['We rebuild it to rank, and your current site stays up until the new one is ready.'] },
      { q: 'Who owns the website?', a: ['You do, from day one. Your domain is registered in your name. If you leave, at any time, we move the website wherever you want at no cost.'] },
      { q: 'Can I change things myself?', a: ['Yes. Edit it from your dashboard, or just text us and we’ll make the change.'] },
    ],
  },
  leads: {
    title: 'Instant lead replies and a missed-call assistant | WorkBuddy',
    desc: 'Every website lead texted back in seconds, a local business phone number and an answering assistant for the calls you miss, so a lead never goes to the next company. Included in the $297 plan.',
    h1: ['Never lose', 'another lead.'],
    lede: 'Getting found only pays if you catch the call. Every website lead gets a text back in seconds, in your business’s name, and an assistant picks up the calls you miss and takes down who called and what they need.',
    act: [['Lead', 'Texted Dana back 5 seconds after her quote request', '2m'], ['Missed call', 'Answered at 9:47 PM, took name and address', '14h'], ['Review', 'Sent a review request after Tuesday’s job', '1d']],
    strip: [['Seconds', 'to text back every website lead'], ['A local number', 'for your business'], ['After hours', 'missed calls answered'], ['Every lead', 'in one place']],
    costH: ['They call the next guy', 'when you don’t answer.'],
    costP: 'People who search for a local business usually contact more than one. If your form sits in an inbox or your phone goes to voicemail, the job goes to whoever answers first.',
    featH: ['Every lead caught,', 'every time.'],
    featP: 'So the calls your Google page and website bring in actually turn into jobs.',
    feats: [
      { icon: 'chat', t: 'Instant text replies', d: 'Every new website lead gets a text back in seconds, in your business’s name.' },
      { icon: 'phone', t: 'A business phone number', d: 'A local number for your business, on your website and your Google page.' },
      { icon: 'clock', t: 'An assistant for missed calls', d: 'When you can’t pick up, it answers, takes down who called and what they need, and passes it to you.' },
      { icon: 'star', t: 'Review requests', d: 'After the job, your customers get a request to leave a review.' },
      { icon: 'chart', t: 'Every lead in one place', d: 'Calls, texts and form leads in your dashboard, so nothing slips.' },
      { icon: 'people', t: 'A real person to text', d: 'Your account manager is a text away for anything you need.' },
    ],
    vsNo: ['Form leads sit for hours, then go cold', 'After-hours calls go to voicemail', 'You find out about a lead after they hired someone', 'No idea which calls came from Google'],
    vsYes: ['Every lead texted back in seconds', 'Missed calls answered and written down', 'Name, number and need, sent to you', 'Every call and lead in your dashboard'],
    faq: [
      { q: 'Does the assistant replace me?', a: ['No. It only picks up the calls you miss, takes down who called and what they need, and hands it to you to call back.'] },
      { q: 'Is it my number?', a: ['You get a local business number that goes on your website and Google page, and your calls come straight to you.'] },
    ],
  },
};

function build(key) {
  const p = P[key], d = DATA[key], M = 'product_' + key.replace(/-/g, '_');
  const w = WORK[key], r = RESULTS[key], c = COST[key];
  const hero = `<section class="pcard-sec"><div class="wrap"><div class="pcard">
    <div class="pcard-top">
      <div>
        <span class="eyebrow" data-r>${p.name}</span>
        <h1 class="d1" data-r>${d.h1[0]} <span class="ac">${d.h1[1]}</span></h1>
        <p class="lede" data-r style="--d:100">${d.lede}</p>
        <div class="btns" data-r style="--d:180">${ctaPair(M, 'hero')}</div>
      </div>
      <div class="act" data-r style="--d:140">
        <div class="act-bar"><i></i><i></i><i></i><span>WorkBuddy · your account</span></div>
        <div class="act-in">
          <div class="act-h"><div><small>Watch the work</small><b>${p.name}</b></div><span class="board-live">Live</span></div>
          ${d.act.map(([k, t, time], i) => `<div class="act-row"><span class="n">${i + 1}</span><div><small>${k}</small>${t}</div><time>${time}</time></div>`).join('')}
        </div>
      </div>
    </div>
    ${d.plat ? `<div class="pcard-plat">${PLATFORMS.map(([ic, n]) => `<span>${I[ic]}${n}</span>`).join('')}</div>` : ''}
    <div class="pcard-stats" style="--n:${d.strip.length}">${d.strip.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
  </div></div></section>`;

  const cost = `<section class="sec--tight"><div class="wrap"><div class="dcard">
    <div><span class="eyebrow" data-r>The cost of doing nothing</span><h2 class="d2" data-r>${d.costH[0]} <span class="ac">${d.costH[1]}</span></h2><p class="lede" data-r>${d.costP}</p></div>
    <div class="tiles">${c.map((t, i) => `<div class="st-tile" data-r style="--d:${i * 90}"><b>${esc(t.v)}</b><span>${esc(t.k)}${t.src ? `<small>${esc(t.src)}</small>` : ''}</span></div>`).join('')}</div>
  </div></div></section>`;

  const features = `<section class="sec sec--paper"><div class="wrap">
    <div class="feat-head"><div><span class="eyebrow" data-r>${p.name}, done for you</span><h2 class="d2" data-r style="margin-top:14px">${d.featH[0]} <span class="ac">${d.featH[1]}</span></h2></div><p data-r>${d.featP}</p></div>
    <div class="grid g3" style="margin-top:clamp(36px,5vw,64px)">${feats(d.feats)}</div>
  </div></section>`;

  const vertical = d.vertical ? `<section class="sec"><div class="wrap">
    <div class="head"><span class="eyebrow" data-r>By industry</span><h2 class="d2" data-r>Local SEO for the work <span class="ac">you want more of.</span></h2><p class="lede" data-r>Every trade gets searched differently. A roofer needs storm-damage pages; a chiropractor needs a page for each kind of pain. We build around the searches in your trade and your town.</p></div>
    <div class="grid g4">${['roofing', 'plumbing', 'auto-repair', 'chiropractic'].map((s) => INDUSTRIES.find((x) => x.slug === s)).map((x) => `<a class="card" href="/industries/${x.slug}" data-r><span class="ic">${I[x.icon]}</span><h3>${x.name}</h3><p>“${x.kw}” is searched about ${x.vol.toLocaleString('en-US')} times a month in the US.</p><span class="link more">SEO for ${x.many} ${I.arrow}</span></a>`).join('')}</div>
    <p style="margin-top:24px"><a class="link" href="/industries">See all industries ${I.arrow}</a></p>
  </div></section>` : '';

  const work = `<section class="sec--tight"><div class="wrap"><div class="dwork">
    <div class="dwork-head"><div><span class="eyebrow" data-r>Watch the work</span><h2 class="d2" data-r>Real work, shipped <span class="ac">every week.</span></h2></div><p data-r>${esc(w.lede)}</p></div>
    <div class="dwin" data-r>
      <div class="dwin-bar"><i></i><i></i><i></i><span>WorkBuddy · ${esc(w.account)}</span><em>Live</em></div>
      <div class="dwin-body">
        <div class="dwin-rows"><h4>Recent activity</h4>${w.rows.map((x) => `<div class="drow"><time>${esc(x.time)}</time><div><b>${esc(x.type)}</b>${esc(x.t)}</div><span class="tag">${esc(x.tag)}</span></div>`).join('')}</div>
        <div class="dwin-stats">${w.stats.map((s) => `<div><b>${esc(s.v)}</b><span>${esc(s.k)}</span></div>`).join('')}</div>
      </div>
    </div>
    <p class="fine" style="margin-top:14px;color:var(--on-night-soft)">${esc(w.note)}</p>
  </div></div></section>`;

  const how = `<section class="sec"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>How it works</span><h2 class="d2" data-r>Three steps <span class="ac">to page one.</span></h2></div>
    ${steps3(HOW)}
  </div></section>`;

  const results = `<section class="sec--tight"><div class="wrap"><div class="rband">
    <span class="eyebrow" data-r>${esc(r.eyebrow)}</span>
    <h2 class="d2" data-r>${esc(r.h)}</h2>
    <div class="rband-row" data-r>${r.stats.map((s) => `<div><b>${esc(s.v)}</b><span>${esc(s.k)}</span></div>`).join('')}</div>
    ${r.note ? `<p class="fine" style="margin-top:16px;color:rgba(255,255,255,.7)">${esc(r.note)}</p>` : ''}
  </div></div></section>`;

  const compare = `<section class="sec"><div class="wrap">
    <div class="head center"><span class="eyebrow" data-r>The difference</span><h2 class="d2" data-r>Same business, <span class="ac">found.</span></h2></div>
    ${vs('WorkBuddy', d.vsNo, d.vsYes)}
  </div></section>`;

  const plat = d.plat ? `<section class="sec sec--paper plat-cta"><div class="wrap">
    <h2 class="d2" data-r>Found everywhere <span class="ac">people look.</span></h2>
    <ul>${PLATFORMS.map(([ic, n]) => `<li>${I[ic]}${n}</li>`).join('')}</ul>
    <div class="btns">${ctaPair(M, 'platforms')}</div>
  </div></section>` : '';

  const faqs = `<section class="sec"><div class="wrap faq2">
    <div><span class="eyebrow" data-r>Questions, answered</span><h2 class="d2" data-r>What owners ask <span class="ac">about ${p.name}.</span></h2><p class="lede" data-r>Anything else, ask Caleb on your call.</p><div class="btns" data-r>${ctaPair(M, 'faq')}</div></div>
    ${faq(d.faq)}
  </div></section>`;

  return {
    path: p.path, kind: 'product', medium: M, title: d.title, desc: d.desc,
    schema: faqSchema(d.faq),
    body: [hero, cost, features, vertical, work, how, results, compare, reviewsBand(), plat, faqs, close(M)].join('\n'),
  };
}

export default PRODUCTS.map((p) => build(p.key));
