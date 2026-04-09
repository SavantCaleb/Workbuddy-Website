import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

/* ─── Logo Ticker ─── */
const LogoTicker = () => (
  <section className="border-y border-softline py-8 overflow-hidden">
    <p className="text-center eyebrow mb-6">Trusted by local businesses across the country</p>
    <div className="flex gap-16 ticker whitespace-nowrap">
      {['Lightning Pro Cleaning', 'Panama City Beach Lawn', 'Calianese Painting', 'Levelpro Floor Solutions', 'Devine Detailing', 'JDS Recycling', 'Prrfect Glo Cleaning',
        'Lightning Pro Cleaning', 'Panama City Beach Lawn', 'Calianese Painting', 'Levelpro Floor Solutions'].map((name, i) => (
        <span key={i} className="flex items-center gap-16">
          <span className="font-display text-2xl text-warmgrey italic">{name}</span>
          <span className="font-display text-2xl text-warmgrey">&middot;</span>
        </span>
      ))}
    </div>
  </section>
);

/* ─── Hero Showcase: animated product demo reel ─── */
const SCENE_DURATION = 7000;
const SCENES = [
  { label: 'Website', short: 'Website', key: 'site' },
  { label: 'Google Page', short: 'Google', key: 'gbp' },
  { label: 'Reviews', short: 'Reviews', key: 'reviews' },
  { label: 'Content', short: 'Content', key: 'content' },
  { label: 'AI Search', short: 'AI Search', key: 'ai' },
] as const;

const FADE_OUT = 350;
const FADE_IN_DELAY = 100; // brief pause between out and in

const HeroShowcase = () => {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const timerRef = useRef(0);

  const transition = useCallback((next: number) => {
    setPhase('out');
    setTimeout(() => {
      setActive(next);
      setDisplayed(next);
      setTick(t => t + 1);
      setTimeout(() => setPhase('in'), FADE_IN_DELAY);
    }, FADE_OUT);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      transition((active + 1) % SCENES.length);
    }, SCENE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [active, transition]);

  const handleClick = useCallback((to: number) => {
    if (to === active) return;
    clearTimeout(timerRef.current);
    transition(to);
  }, [active, transition]);

  const scenes = [SceneWebsite, SceneGoogle, SceneReviews, SceneContent, SceneAI];
  const ActiveScene = scenes[displayed];

  return (
    <div>
      {/* Progress tabs — Instagram-stories style */}
      <div className="flex gap-1.5 mb-5">
        {SCENES.map((s, i) => (
          <button key={s.key} onClick={() => handleClick(i)} className="flex-1 text-left group">
            <p className={`text-[10px] font-mono uppercase tracking-wider mb-1.5 transition-colors duration-300 ${i === active ? 'text-ink' : 'text-warmgrey/60'}`}>
              <span className="hidden md:inline">{s.label}</span><span className="md:hidden">{s.short}</span>
            </p>
            <div className="h-[3px] bg-softline rounded-full overflow-hidden">
              {i < active && <div className="h-full w-full bg-ink rounded-full" />}
              {i === active && <div key={tick} className="h-full bg-rust rounded-full showcase-bar" style={{ animationDuration: `${SCENE_DURATION}ms` }} />}
            </div>
          </button>
        ))}
      </div>

      {/* Scene container */}
      <div className="bg-paper border border-softline rounded-2xl overflow-hidden relative h-[380px] md:h-[420px]">
        <div key={tick} className={phase === 'in' ? 'scene-fade-in h-full' : 'scene-fade-out h-full'}>
          <ActiveScene />
        </div>
      </div>
    </div>
  );
};

/* ── Scene 1: Website being built ── */
const SceneWebsite = () => (
  <div className="h-full flex flex-col">
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-4 py-2 bg-softline/50 border-b border-softline">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-rust/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-warmgrey/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-warmgrey/40" />
      </div>
      <div className="flex-1 bg-paper rounded-md px-3 py-1">
        <p className="text-[10px] text-warmgrey truncate">panamacitybeachlawn.com</p>
      </div>
    </div>
    {/* Site content assembling */}
    <div className="flex-1 flex flex-col p-5 overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between mb-5 scene-el" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-ink rounded" />
          <div className="w-20 h-2.5 bg-ink rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-2 bg-warmgrey/30 rounded" />
          <div className="w-10 h-2 bg-warmgrey/30 rounded" />
          <div className="w-16 h-5 bg-rust rounded-full" />
        </div>
      </div>
      {/* Hero area */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-2.5">
          <div className="scene-el" style={{ animationDelay: '1.0s' }}>
            <div className="w-24 h-1.5 bg-warmgrey/30 rounded mb-2.5" />
            <div className="space-y-1.5">
              <div className="w-full h-3.5 bg-ink rounded" />
              <div className="w-4/5 h-3.5 bg-ink rounded" />
            </div>
          </div>
          <div className="scene-el" style={{ animationDelay: '1.7s' }}>
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-warmgrey/25 rounded" />
              <div className="w-3/4 h-1.5 bg-warmgrey/25 rounded" />
            </div>
          </div>
          <div className="scene-el" style={{ animationDelay: '2.4s' }}>
            <div className="w-28 h-7 bg-rust rounded-full mt-1 flex items-center justify-center">
              <span className="text-[8px] text-paper font-medium">Get a Free Quote</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 scene-el" style={{ animationDelay: '1.8s' }}>
          <div className="aspect-square bg-gradient-to-br from-rust/15 to-ink/10 rounded-xl border border-softline flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8A857B" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </div>
        </div>
      </div>
      {/* Services row */}
      <div className="flex gap-2 mt-4 scene-el" style={{ animationDelay: '3.2s' }}>
        {['Mowing', 'Irrigation', 'Landscaping'].map(s => (
          <div key={s} className="flex-1 border border-softline rounded-lg py-2 px-2 text-center">
            <div className="w-5 h-5 bg-highlight rounded mx-auto mb-1" />
            <p className="text-[8px] text-ink">{s}</p>
          </div>
        ))}
      </div>
      {/* Published badge */}
      <div className="scene-el mt-auto flex justify-center" style={{ animationDelay: '4.4s' }}>
        <div className="bg-ink text-paper px-4 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="text-[9px]">✓</span>
          <span className="text-[10px] font-medium">Site live in 24 hours</span>
        </div>
      </div>
    </div>
  </div>
);

/* ── Scene 2: Google Business Profile optimization ── */
const SceneGoogle = () => (
  <div className="h-full p-3.5 md:p-5 flex flex-col">
    {/* Profile header */}
    <div className="scene-el" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-start gap-3 md:gap-3.5 mb-3 md:mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rust to-rustdark rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="font-display text-lg md:text-xl italic text-paper">P</span>
        </div>
        <div>
          <p className="font-display text-base md:text-lg leading-tight">Panama City Beach Lawn</p>
          <p className="text-[10px] md:text-[11px] text-warmgrey mt-0.5">Lawn care service · Panama City Beach, FL</p>
          <div className="flex items-center gap-1 mt-0.5 md:mt-1">
            <span className="text-rust text-[10px] md:text-[11px]">★★★★★</span>
            <span className="text-[9px] md:text-[10px] text-warmgrey">4.9 (47 reviews)</span>
            <span className="text-[9px] md:text-[10px] text-green-600 ml-1">● Open</span>
          </div>
        </div>
      </div>
    </div>
    {/* Optimization score */}
    <div className="scene-el bg-ink rounded-2xl p-3 md:p-4 mb-3 md:mb-4" style={{ animationDelay: '1.1s' }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] md:text-[10px] font-mono text-paper/60 uppercase tracking-wider">Profile Score</p>
        <p className="font-display text-xl md:text-2xl text-paper"><span className="showcase-count" /></p>
      </div>
      <div className="h-1.5 bg-paper/15 rounded-full overflow-hidden">
        <div className="h-full bg-rust rounded-full showcase-fill" />
      </div>
      <p className="text-[9px] md:text-[10px] text-paper/50 mt-1.5 md:mt-2">Optimized from 38% → all 42 fields complete</p>
    </div>
    {/* Completed items */}
    <div className="space-y-1.5 md:space-y-2.5 flex-1">
      {[
        ['Business description rewritten', '1.8s'],
        ['Service areas expanded to 12 towns', '2.3s'],
        ['Photos uploaded (16 new)', '2.8s'],
        ['Hours, categories, attributes updated', '3.3s'],
      ].map(([text, delay]) => (
        <div key={text} className="scene-el flex items-center gap-2" style={{ animationDelay: delay }}>
          <span className="text-rust text-xs">✓</span>
          <span className="text-[10px] md:text-[11px] text-ink/80">{text}</span>
        </div>
      ))}
    </div>
    {/* Badge */}
    <div className="scene-el flex justify-center mt-auto" style={{ animationDelay: '4.2s' }}>
      <div className="bg-rust text-paper px-3 md:px-4 py-1.5 rounded-full">
        <span className="text-[9px] md:text-[10px] font-medium">Profile at 100% — ranking boost active</span>
      </div>
    </div>
  </div>
);

/* ── Scene 3: Review management ── */
const SceneReviews = () => (
  <div className="h-full px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-5 flex flex-col">
    <div className="scene-el flex items-center justify-between mb-2 md:mb-3" style={{ animationDelay: '0.4s' }}>
      <p className="text-[9px] md:text-[10px] font-mono text-warmgrey uppercase tracking-wider">This week's reviews</p>
      <div className="bg-highlight border border-rust/20 rounded-full px-2 py-0.5 md:px-2.5">
        <span className="text-[9px] md:text-[10px] text-rust font-medium">+8 new</span>
      </div>
    </div>
    {/* Review 1 */}
    <div className="scene-el border border-softline rounded-xl p-2.5 md:p-3 mb-1" style={{ animationDelay: '0.9s' }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-ink rounded-full flex items-center justify-center">
          <span className="text-[8px] md:text-[9px] text-paper font-semibold">S</span>
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-medium text-ink leading-none">Sarah M.</p>
          <span className="text-rust text-[9px]">★★★★★</span>
        </div>
        <span className="text-[9px] text-warmgrey ml-auto">2 days ago</span>
      </div>
      <p className="text-[9px] md:text-[10px] text-ink/80 leading-relaxed">"Best lawn service we've ever used. On time, professional, our yard looks incredible."</p>
    </div>
    {/* Reply sliding in */}
    <div className="scene-el ml-4 md:ml-5 bg-highlight border border-rust/20 rounded-xl rounded-tl-sm px-2.5 py-2 md:px-3 md:py-2.5 mb-2 md:mb-2.5" style={{ animationDelay: '2.1s' }}>
      <p className="text-[8px] text-rust font-mono uppercase tracking-wider mb-0.5">Replied · 1hr 42min</p>
      <p className="text-[9px] md:text-[10px] text-ink/80 leading-relaxed">"Thank you Sarah! We appreciate you trusting us with your lawn. See you next month! — Trey"</p>
    </div>
    {/* Review 2 */}
    <div className="scene-el border border-softline rounded-xl p-2.5 md:p-3 mb-1" style={{ animationDelay: '3.2s' }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-rust rounded-full flex items-center justify-center">
          <span className="text-[8px] md:text-[9px] text-paper font-semibold">J</span>
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-medium text-ink leading-none">James R.</p>
          <span className="text-rust text-[9px]">★★★★★</span>
        </div>
        <span className="text-[9px] text-warmgrey ml-auto">4 days ago</span>
      </div>
      <p className="text-[9px] md:text-[10px] text-ink/80 leading-relaxed">"Trey's crew transformed our backyard. Irrigation system works perfectly now."</p>
    </div>
    {/* Reply 2 */}
    <div className="scene-el ml-4 md:ml-5 bg-highlight border border-rust/20 rounded-xl rounded-tl-sm px-2.5 py-2 md:px-3 md:py-2.5" style={{ animationDelay: '4.6s' }}>
      <p className="text-[8px] text-rust font-mono uppercase tracking-wider mb-0.5">Replied · 54min</p>
      <p className="text-[9px] md:text-[10px] text-ink/80 leading-relaxed">"Appreciate it James! That irrigation zone was a fun project. Enjoy it!"</p>
    </div>
  </div>
);

/* ── Scene 4: Blog posts & Google posts ── */
const SceneContent = () => (
  <div className="h-full px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-5 flex flex-col">
    <div className="scene-el" style={{ animationDelay: '0.4s' }}>
      <p className="text-[9px] md:text-[10px] font-mono text-warmgrey uppercase tracking-wider mb-2 md:mb-3">Published this week</p>
    </div>
    {/* Blog post */}
    <div className="scene-el border border-softline rounded-xl overflow-hidden mb-2 md:mb-2.5" style={{ animationDelay: '1.0s' }}>
      <div className="h-14 md:h-20 bg-gradient-to-br from-ink/5 to-rust/10 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A857B" strokeWidth="1.5" className="md:w-6 md:h-6"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      </div>
      <div className="p-2.5 md:p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[8px] font-mono text-rust bg-highlight px-1.5 py-0.5 rounded">BLOG POST</span>
          <span className="text-[8px] md:text-[9px] text-warmgrey">Published 3hrs ago</span>
        </div>
        <p className="text-[10px] md:text-[11px] font-medium text-ink leading-snug">Spring Lawn Care Tips for Panama City Beach Homeowners</p>
        <p className="text-[8px] md:text-[9px] text-warmgrey mt-0.5">850 words · SEO-optimized for 4 local keywords</p>
      </div>
    </div>
    {/* Google post */}
    <div className="scene-el border border-softline rounded-xl p-2.5 md:p-3 mb-2 md:mb-2.5" style={{ animationDelay: '2.4s' }}>
      <div className="flex items-center gap-2 mb-1 md:mb-1.5">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-rust rounded flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="2" className="md:w-2.5 md:h-2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <span className="text-[8px] font-mono text-rust bg-highlight px-1.5 py-0.5 rounded">GOOGLE POST</span>
        <span className="text-[8px] md:text-[9px] text-warmgrey">Posted today</span>
      </div>
      <p className="text-[9px] md:text-[10px] text-ink/80 leading-relaxed">"Now booking May lawn and irrigation installs. Spring special — free first mow with any new service plan. Call or message us!"</p>
    </div>
    {/* Weekly stats */}
    <div className="scene-el mt-auto flex gap-2 md:gap-2.5" style={{ animationDelay: '3.8s' }}>
      {[['4', 'Blog posts\nthis month'], ['12', 'Google posts\nthis month'], ['2.4K', 'Search\nimpressions']].map(([n, l]) => (
        <div key={l} className="flex-1 bg-ink rounded-xl p-2 md:p-2.5 text-center">
          <p className="font-display text-base md:text-lg text-paper">{n}</p>
          <p className="text-[7px] text-paper/50 whitespace-pre-line leading-tight mt-0.5">{l}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ── Scene 5: AI search visibility ── */
const SceneAI = () => (
  <div className="h-full px-3 pt-3 pb-4 md:px-4 md:pt-4 md:pb-5 flex flex-col">
    {/* Chat prompt */}
    <div className="scene-el" style={{ animationDelay: '0.4s' }}>
      <div className="bg-softline/60 rounded-2xl rounded-br-sm p-2.5 md:p-3.5 mb-2 md:mb-3 max-w-[90%] ml-auto">
        <p className="text-[10px] md:text-[11px] text-ink leading-relaxed">"What's the best lawn care service in Panama City Beach?"</p>
      </div>
    </div>
    {/* AI response */}
    <div className="scene-el" style={{ animationDelay: '1.4s' }}>
      <div className="flex items-start gap-2 md:gap-2.5 mb-2 md:mb-3">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-ink rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="2" className="md:w-3 md:h-3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] text-ink/70 leading-relaxed">Based on reviews, local reputation, and service quality, I'd recommend:</p>
        </div>
      </div>
    </div>
    {/* #1 Result — highlighted */}
    <div className="scene-el" style={{ animationDelay: '2.6s' }}>
      <div className="border-2 border-rust bg-highlight rounded-xl p-2.5 md:p-3.5 mb-2 md:mb-2.5 relative">
        <div className="absolute -top-2.5 left-3 md:left-4 bg-rust text-paper px-2 py-0.5 rounded text-[8px] font-mono">#1 RECOMMENDED</div>
        <p className="font-display text-base md:text-lg text-ink mt-1">Panama City Beach Lawn</p>
        <p className="text-rust text-[9px] md:text-[10px] mt-0.5">★★★★★ 4.9 · panamacitybeachlawn.com</p>
        <p className="text-[9px] md:text-[10px] text-ink/70 mt-1 leading-relaxed">"Professional, reliable service with excellent reviews. They offer mowing, irrigation installation, and full landscaping."</p>
      </div>
    </div>
    {/* Other results (dimmed) */}
    <div className="scene-el space-y-1 md:space-y-1.5" style={{ animationDelay: '3.8s' }}>
      {['Green Horizons Landscaping', 'Bay County Lawn Pros'].map((n, i) => (
        <div key={n} className="flex items-center gap-2 md:gap-3 px-2.5 md:px-3.5 py-1 md:py-1.5 border border-softline rounded-lg opacity-40">
          <span className="text-[9px] md:text-[10px] text-warmgrey font-mono">#{i + 2}</span>
          <span className="text-[10px] md:text-[11px] text-ink/60">{n}</span>
        </div>
      ))}
    </div>
    {/* Platforms */}
    <div className="scene-el mt-auto flex items-center justify-center gap-1.5 md:gap-2" style={{ animationDelay: '5.0s' }}>
      <span className="text-[8px] md:text-[9px] text-warmgrey">Showing on</span>
      {['ChatGPT', 'Perplexity', 'Gemini'].map(p => (
        <span key={p} className="text-[8px] md:text-[9px] font-mono bg-ink text-paper px-1.5 md:px-2 py-0.5 rounded">{p}</span>
      ))}
    </div>
  </div>
);

export const HomePage = () => {
  return (
    <main>
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 md:pt-20 md:pb-32 grain">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 md:mb-6 fade-up stagger-1">Online marketing, off your plate.</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-4 fade-up stagger-2">
              We make your phone <em className="italic text-rust">ring.</em>
            </h1>
            <p className="font-display text-xl md:text-3xl italic text-warmgrey mb-6 md:mb-8 fade-up stagger-2">
              Then we stay out of your hair.
            </p>
            <p className="text-base md:text-xl text-ink/75 max-w-xl leading-relaxed mb-8 md:mb-10 fade-up stagger-3">
              We do your website. We run your Google page. We reply to every review. You just answer the phone when it starts ringing.
            </p>
            <div className="fade-up stagger-4 inline-block text-center">
              <Link to="/free-report" className="btn-primary px-8 py-4 rounded-full text-base font-medium inline-block">
                Run My Free Report
              </Link>
              <p className="text-xs text-warmgrey mt-3">No card. No call. Just the report.</p>
            </div>
          </div>

          {/* Hero showcase — cycles through animated product demos */}
          <div className="lg:col-span-5 fade-up stagger-3">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <LogoTicker />

      {/* ═══ THE QUIET SHIFT ═══ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <p className="eyebrow mb-4 md:mb-6">02 / The shift</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12">
          Your phone is quieter than it used to be. <em className="italic text-warmgrey">Here's why.</em>
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-ink/80 max-w-3xl">
          <p>You used to know how customers found you. Word of mouth. The phone book in the early days. Then Google. Maybe a few flyers, a truck wrap, a referral from a buddy.</p>
          <p>Then your phone got a little quieter. Not all at once. Just... quieter. Fewer cold calls. More tire-kickers. Fewer people who already knew your name when they called.</p>
          <p className="text-ink font-medium">Here's what happened.</p>
          <p>The way people find you has changed. They don't call five painters anymore. They Google "best painter near me" and they call whoever's at the top. They ask ChatGPT. They check Yelp. They look at reviews.</p>
          <p className="text-ink font-medium">Whoever shows up first gets the call. Whoever doesn't, doesn't.</p>
          <p>Your competitors are showing up. You're not. That's the entire reason your phone is quieter. It's not the economy. It's not bad luck. It's that the customers who used to find you can't find you anymore, and they're calling someone else instead.</p>
        </div>

        {/* Evolution illustration */}
        <div className="mt-10 md:mt-16 flex items-center justify-between max-w-2xl">
          <div className="text-center">
            <div className="w-14 h-14 md:w-20 md:h-20 border border-softline rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 bg-paper">
              <svg width="24" height="24" viewBox="0 0 24 24" className="md:w-9 md:h-9" fill="none" stroke="#8A857B" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-warmgrey">PHONE BOOK</p>
            <p className="font-mono text-[10px] md:text-xs text-warmgrey">1990s</p>
          </div>
          <div className="flex-1 h-px bg-softline mx-2 md:mx-4"></div>
          <div className="text-center">
            <div className="w-14 h-14 md:w-20 md:h-20 border border-softline rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 bg-paper">
              <svg width="24" height="24" viewBox="0 0 24 24" className="md:w-9 md:h-9" fill="none" stroke="#8A857B" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-warmgrey">GOOGLE</p>
            <p className="font-mono text-[10px] md:text-xs text-warmgrey">2010s</p>
          </div>
          <div className="flex-1 h-px bg-softline mx-2 md:mx-4"></div>
          <div className="text-center">
            <div className="w-14 h-14 md:w-20 md:h-20 border-2 border-rust rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 bg-highlight">
              <svg width="24" height="24" viewBox="0 0 24 24" className="md:w-9 md:h-9" fill="none" stroke="#E2552C" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-rust font-medium">GOOGLE + AI</p>
            <p className="font-mono text-[10px] md:text-xs text-rust font-medium">NOW</p>
          </div>
        </div>

        <div className="mt-16">
          <Link to="/free-report" className="inline-flex items-center gap-2 text-ink border-b-2 border-rust pb-1 hover:text-rust transition-colors">
            <span className="text-base font-medium">Show me where I stand</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ═══ THE QUIET MATH ═══ */}
      <section className="bg-ink text-paper py-16 md:py-32 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 md:mb-6 text-paper/60">03 / The math</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-10 md:mb-16">
            Let's do the quiet math on what being invisible <em className="italic">actually costs.</em>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="space-y-6 text-lg leading-relaxed text-paper/80">
              <p>A roofer in Wareham, Massachusetts has 30 reviews. His top competitor has 196.</p>
              <p>That sounds like a small gap. It's not.</p>
              <p>In a town that size, the top three Google results get something like 75 percent of all the phone calls. He's not in the top three. He's somewhere on page two, where almost nobody scrolls.</p>
              <p>If his average roof job is $8,000, and there are even 20 people a month searching for a roofer in his area, he's losing roughly 12 of those calls to the guy with more reviews. At his close rate, that's three to four jobs a month walking out the door.</p>
              <p className="text-paper font-medium font-display text-2xl italic">Three jobs a month. Around $24,000 in lost revenue. Every month.</p>
              <p>While he's standing on a roof in the rain wondering why his pipeline is dry.</p>
              <p>He didn't know any of this until we showed him.</p>
              <p>The thing is, his competitor isn't actually better at roofing. His competitor just has a Google page that works. <span className="text-rust">That's the entire difference.</span></p>
            </div>
            {/* Math card */}
            <div className="bg-paper text-ink rounded-3xl p-6 md:p-10 border border-paper/10">
              <p className="eyebrow mb-6">Wareham, MA · Roofing</p>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-softline pb-4">
                  <span className="text-sm text-warmgrey">Your reviews</span>
                  <span className="font-display text-4xl">30</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-softline pb-4">
                  <span className="text-sm text-warmgrey">Their reviews</span>
                  <span className="font-display text-4xl text-rust">196</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-softline pb-4">
                  <span className="text-sm text-warmgrey">Top 3 capture</span>
                  <span className="font-display text-4xl">75%</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-softline pb-4">
                  <span className="text-sm text-warmgrey">Avg job value</span>
                  <span className="font-display text-4xl">$8K</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-softline pb-4">
                  <span className="text-sm text-warmgrey">Jobs lost / mo</span>
                  <span className="font-display text-4xl">3–4</span>
                </div>
                <div className="bg-highlight border border-rust rounded-2xl p-6 mt-6">
                  <p className="text-xs eyebrow mb-2 text-rust">Walking out the door</p>
                  <p className="font-display text-5xl text-rust">$24,000</p>
                  <p className="text-sm text-warmgrey mt-1">per month, every month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <Link to="/free-report" className="btn-secondary border-paper text-paper hover:bg-paper hover:text-ink px-8 py-4 rounded-full text-base font-medium">
              Run My Free Report →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <div className="max-w-3xl mb-12 md:mb-20">
          <p className="eyebrow mb-4 md:mb-6">04 / What we do</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-4 md:mb-6">
            Three things. <br className="hidden md:block" /><em className="italic text-warmgrey">One outcome: your phone ringing.</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 leading-relaxed">There's no dashboard to log into. No course to take. No hour-long onboarding call. We manage all three of these for you, every week. You just answer the calls when they come in.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Website */}
          <div className="bg-paper border border-softline rounded-3xl p-6 md:p-8 hover:border-ink transition-colors">
            <div className="aspect-[4/3] bg-highlight rounded-2xl mb-6 overflow-hidden border border-softline relative">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#FAF8F4"/>
                <rect x="0" y="0" width="400" height="28" fill="#E8E4DC"/>
                <circle cx="14" cy="14" r="4" fill="#E2552C"/><circle cx="28" cy="14" r="4" fill="#FFC107"/><circle cx="42" cy="14" r="4" fill="#4CAF50"/>
                <rect x="60" y="8" width="280" height="14" rx="3" fill="#FAF8F4"/>
                <rect x="20" y="44" width="60" height="10" rx="2" fill="#0F0F0E"/>
                <rect x="280" y="44" width="100" height="20" rx="10" fill="#0F0F0E"/>
                <text x="20" y="110" fontFamily="Instrument Serif" fontSize="32" fill="#0F0F0E">Calianese</text>
                <text x="20" y="140" fontFamily="Instrument Serif" fontSize="32" fill="#0F0F0E">Painting</text>
                <rect x="20" y="160" width="200" height="6" rx="1" fill="#8A857B"/>
                <rect x="20" y="172" width="160" height="6" rx="1" fill="#8A857B"/>
                <rect x="20" y="195" width="100" height="28" rx="14" fill="#E2552C"/>
                <rect x="240" y="80" width="140" height="140" rx="8" fill="url(#grad1)"/>
                <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E2552C" stopOpacity="0.2"/><stop offset="100%" stopColor="#0F0F0E" stopOpacity="0.1"/></linearGradient></defs>
              </svg>
            </div>
            <p className="font-mono text-xs text-rust mb-3">01 · WEBSITE MANAGEMENT</p>
            <h3 className="font-display text-3xl mb-4">We build and run your website.</h3>
            <p className="text-ink/70 leading-relaxed mb-4">Custom site built for your business in 24 hours. Then we keep it ranking. Weekly blog posts. Local SEO for the towns you actually serve. Speed and security. The whole thing optimized for the searches your customers are actually doing.</p>
            <div className="flex flex-wrap gap-2">
              {['CUSTOM SITE', 'WEEKLY BLOGS', 'LOCAL SEO'].map(t => <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-highlight text-rust border border-rust/20">{t}</span>)}
            </div>
          </div>

          {/* Card 2: GMB */}
          <div className="bg-paper border border-softline rounded-3xl p-6 md:p-8 hover:border-ink transition-colors">
            <div className="aspect-[4/3] bg-highlight rounded-2xl mb-6 overflow-hidden border border-softline relative">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#FAF8F4"/>
                <rect x="40" y="30" width="320" height="240" rx="12" fill="#FAF8F4" stroke="#E8E4DC"/>
                <rect x="40" y="30" width="320" height="80" rx="12" fill="#0F0F0E"/>
                <text x="60" y="65" fontFamily="Instrument Serif" fontSize="22" fill="#FAF8F4">Lightning Pro Cleaning</text>
                <text x="60" y="88" fontFamily="Geist" fontSize="11" fill="#FAF8F4" opacity="0.6">Wilmington, NC · Open now</text>
                <circle cx="320" cy="70" r="20" fill="none" stroke="#E2552C" strokeWidth="3"/>
                <text x="320" y="76" textAnchor="middle" fontFamily="Geist" fontSize="13" fontWeight="600" fill="#FAF8F4">100</text>
                <text x="60" y="135" fontFamily="Geist" fontSize="14" fill="#0F0F0E">★★★★★ 4.9 (62)</text>
                <rect x="60" y="150" width="60" height="22" rx="11" fill="#0F0F0E"/>
                <text x="90" y="165" textAnchor="middle" fontFamily="Geist" fontSize="9" fill="#FAF8F4">Call</text>
                <rect x="130" y="150" width="80" height="22" rx="11" fill="none" stroke="#0F0F0E"/>
                <text x="170" y="165" textAnchor="middle" fontFamily="Geist" fontSize="9" fill="#0F0F0E">Directions</text>
                <rect x="220" y="150" width="80" height="22" rx="11" fill="none" stroke="#0F0F0E"/>
                <text x="260" y="165" textAnchor="middle" fontFamily="Geist" fontSize="9" fill="#0F0F0E">Website</text>
                <rect x="60" y="190" width="280" height="60" rx="6" fill="#FFF1E8"/>
                <text x="72" y="208" fontFamily="Geist" fontSize="9" fill="#8A857B">LATEST POST · 2 days ago</text>
                <text x="72" y="228" fontFamily="Geist" fontSize="11" fill="#0F0F0E">Booking April commercial cleans now</text>
                <text x="72" y="242" fontFamily="Geist" fontSize="11" fill="#0F0F0E">→ get on the calendar this week</text>
              </svg>
            </div>
            <p className="font-mono text-xs text-rust mb-3">02 · GMB MANAGEMENT</p>
            <h3 className="font-display text-3xl mb-4">We run your Google Business Profile.</h3>
            <p className="text-ink/70 leading-relaxed mb-4">Most local business pages are sitting at 40 to 60 percent optimized. We get yours to 100. Then we post to it every single week so Google knows you're alive. Photos. Updates. Offers. The signals Google needs to push you up the rankings, sent automatically.</p>
            <div className="flex flex-wrap gap-2">
              {['FULL OPTIMIZATION', 'WEEKLY POSTS', 'PHOTO UPDATES'].map(t => <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-highlight text-rust border border-rust/20">{t}</span>)}
            </div>
          </div>

          {/* Card 3: Reviews */}
          <div className="bg-paper border border-softline rounded-3xl p-6 md:p-8 hover:border-ink transition-colors">
            <div className="aspect-[4/3] bg-highlight rounded-2xl mb-6 overflow-hidden border border-softline relative">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#FAF8F4"/>
                <rect x="20" y="20" width="360" height="80" rx="10" fill="#FAF8F4" stroke="#E8E4DC"/>
                <circle cx="42" cy="42" r="14" fill="#E2552C"/>
                <text x="42" y="46" textAnchor="middle" fontFamily="Geist" fontSize="11" fontWeight="600" fill="#FAF8F4">M</text>
                <text x="68" y="40" fontFamily="Geist" fontSize="11" fontWeight="500" fill="#0F0F0E">Maria K.</text>
                <text x="68" y="54" fontFamily="Geist" fontSize="9" fill="#8A857B">★★★★★ · 2 days ago</text>
                <text x="20" y="78" fontFamily="Geist" fontSize="10" fill="#0F0F0E">Best painters we've ever hired. Showed up on</text>
                <text x="20" y="92" fontFamily="Geist" fontSize="10" fill="#0F0F0E">time, finished early, perfect work.</text>
                <rect x="40" y="110" width="340" height="44" rx="8" fill="#FFF1E8" stroke="#E2552C" strokeWidth="1"/>
                <text x="52" y="126" fontFamily="Geist" fontSize="8" fill="#E2552C" fontWeight="600">REPLIED · 2hr later</text>
                <text x="52" y="140" fontFamily="Geist" fontSize="9" fill="#0F0F0E">Thank you Maria! Was a pleasure working</text>
                <text x="52" y="151" fontFamily="Geist" fontSize="9" fill="#0F0F0E">with you. — Alex</text>
                <rect x="20" y="170" width="360" height="50" rx="10" fill="#FAF8F4" stroke="#E8E4DC"/>
                <circle cx="42" cy="195" r="14" fill="#0F0F0E"/>
                <text x="42" y="199" textAnchor="middle" fontFamily="Geist" fontSize="11" fontWeight="600" fill="#FAF8F4">J</text>
                <text x="68" y="192" fontFamily="Geist" fontSize="11" fontWeight="500" fill="#0F0F0E">James R.</text>
                <text x="68" y="206" fontFamily="Geist" fontSize="9" fill="#8A857B">★★★★★ · 5 days ago</text>
                <rect x="20" y="235" width="360" height="40" rx="10" fill="#FFF1E8" stroke="#E2552C" strokeWidth="1.5"/>
                <text x="32" y="252" fontFamily="Geist" fontSize="9" fill="#E2552C" fontWeight="600">REVIEW REQUEST SENT · 12 customers this week</text>
                <text x="32" y="266" fontFamily="Geist" fontSize="9" fill="#0F0F0E">→ 8 new 5-star reviews coming in</text>
              </svg>
            </div>
            <p className="font-mono text-xs text-rust mb-3">03 · REVIEW MANAGEMENT</p>
            <h3 className="font-display text-3xl mb-4">We get you reviews and reply to all of them.</h3>
            <p className="text-ink/70 leading-relaxed mb-4">Every customer you finish a job for gets a request to leave a review. Every review you receive gets a personalized reply within 24 hours. This is the single biggest factor in whether Google decides to show you above your competitors.</p>
            <div className="flex flex-wrap gap-2">
              {['REVIEW REQUESTS', '24HR REPLIES', 'ALL PLATFORMS'].map(t => <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-highlight text-rust border border-rust/20">{t}</span>)}
            </div>
          </div>
        </div>

        {/* AI bonus */}
        <div className="mt-16 max-w-3xl mx-auto bg-ink text-paper rounded-3xl p-8 grain relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-rust rounded-2xl flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2 text-rust">Bonus you get for free</p>
              <h3 className="font-display text-2xl md:text-3xl leading-tight mb-3">All three of these also get you recommended by ChatGPT, Perplexity, and Gemini.</h3>
              <p className="text-paper/70 leading-relaxed">When your website, GMB, and reviews are dialed in, the AI tools start picking you up automatically. Most marketing companies haven't figured this out yet. We bake it into everything we do.</p>
            </div>
          </div>
        </div>

        <p className="text-center text-ink/60 mt-16 text-lg max-w-2xl mx-auto">
          That's the whole product. No upsells. No tiers. <Link to="/pricing" className="text-rust underline">$99 a month, cancel anytime, first page of Google in 30 days or it's free.</Link>
        </p>
      </section>

      {/* ═══ THE GUARANTEE ═══ */}
      <section className="bg-rust text-paper py-16 md:py-32 grain relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow mb-4 md:mb-6 text-paper/70">The promise</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl leading-[0.95] mb-8 md:mb-10">
            First page of Google <br /><em className="italic">in 30 days.</em>
            <br/>Or you don't pay.
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-paper/85 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
            We get you ranked on the first page of Google for a real search someone would actually do for your business, in the area you serve, within 30 days. If we don't, you get a full refund and you keep the website, the Google work, and everything else we built.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[{ n: '30', l: 'days to page one' }, { n: '$0', l: 'if we miss' }, { n: '100%', l: 'yours either way' }].map(i => (
              <div key={i.l} className="bg-paper/10 border border-paper/20 rounded-2xl p-6">
                <p className="font-display text-5xl mb-2">{i.n}</p>
                <p className="text-sm text-paper/70">{i.l}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto mb-12 border-t border-b border-paper/20 py-8">
            <p className="font-display text-2xl md:text-3xl italic text-paper leading-tight">
              For the record: we've never paid out a refund. Not because we hide behind fine print. Because we've never missed.
            </p>
            <p className="text-sm text-paper/60 mt-4">— Caleb, founder</p>
          </div>
          <Link to="/free-report" className="bg-paper text-ink hover:bg-ink hover:text-paper transition-all px-10 py-5 rounded-full text-lg font-medium inline-block">
            Get My Free Report
          </Link>
        </div>
      </section>

      {/* ═══ THE FREE REPORT ═══ */}
      <section className="bg-paper border-y border-softline py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2 flex justify-center">
              <div className="phone-shadow">
                <svg viewBox="0 0 320 640" className="w-72 md:w-80">
                  <rect x="2" y="2" width="316" height="636" rx="42" fill="#0F0F0E"/>
                  <rect x="10" y="10" width="300" height="620" rx="36" fill="#FAF8F4"/>
                  <rect x="120" y="22" width="80" height="22" rx="11" fill="#0F0F0E"/>
                  <text x="30" y="80" fontFamily="JetBrains Mono" fontSize="9" fill="#8A857B">YOUR FREE REPORT</text>
                  <text x="30" y="108" fontFamily="Instrument Serif" fontSize="22" fill="#0F0F0E">Calianese Painting</text>
                  <text x="30" y="124" fontFamily="Geist" fontSize="10" fill="#8A857B">Bayonne, NJ · Generated 2 min ago</text>
                  <line x1="30" y1="138" x2="290" y2="138" stroke="#E8E4DC"/>
                  <text x="30" y="162" fontFamily="Geist" fontSize="9" fill="#8A857B">GOOGLE PAGE SCORE</text>
                  <text x="30" y="200" fontFamily="Instrument Serif" fontSize="40" fill="#E2552C">47</text>
                  <text x="80" y="195" fontFamily="Geist" fontSize="13" fill="#8A857B">/ 100</text>
                  <rect x="30" y="210" width="260" height="6" rx="3" fill="#E8E4DC"/>
                  <rect x="30" y="210" width="120" height="6" rx="3" fill="#E2552C"/>
                  <text x="30" y="244" fontFamily="Geist" fontSize="9" fill="#8A857B">AI VISIBILITY</text>
                  <text x="30" y="276" fontFamily="Instrument Serif" fontSize="32" fill="#0F0F0E">0</text>
                  <text x="60" y="270" fontFamily="Geist" fontSize="13" fill="#8A857B">/ 5 platforms</text>
                  <rect x="30" y="290" width="260" height="80" rx="10" fill="#FFF1E8" stroke="#E2552C"/>
                  <text x="42" y="310" fontFamily="Geist" fontSize="9" fill="#8A857B">CHATGPT IS RECOMMENDING</text>
                  <text x="42" y="332" fontFamily="Instrument Serif" fontSize="16" fill="#0F0F0E">Bayonne Pro Painting</text>
                  <text x="42" y="350" fontFamily="Geist" fontSize="10" fill="#8A857B">412 reviews · vs your 19</text>
                  <text x="42" y="362" fontFamily="Geist" fontSize="10" fill="#E2552C">they're getting your customers →</text>
                  <text x="30" y="394" fontFamily="Geist" fontSize="9" fill="#8A857B">WHAT WE'D FIX</text>
                  <text x="30" y="414" fontFamily="Geist" fontSize="11" fill="#0F0F0E">✓ Optimize GBP to 100%</text>
                  <text x="30" y="430" fontFamily="Geist" fontSize="11" fill="#0F0F0E">✓ Build SEO site (24 hrs)</text>
                  <text x="30" y="446" fontFamily="Geist" fontSize="11" fill="#0F0F0E">✓ Get on ChatGPT in 7 days</text>
                  <text x="30" y="462" fontFamily="Geist" fontSize="11" fill="#0F0F0E">✓ Close the review gap</text>
                  <text x="30" y="478" fontFamily="Geist" fontSize="11" fill="#0F0F0E">✓ Cover all 5 boroughs + NJ</text>
                  <rect x="30" y="510" width="260" height="44" rx="22" fill="#0F0F0E"/>
                  <text x="160" y="538" textAnchor="middle" fontFamily="Geist" fontSize="12" fontWeight="500" fill="#FAF8F4">Build my site (free 7 days)</text>
                  <text x="160" y="580" textAnchor="middle" fontFamily="Geist" fontSize="9" fill="#8A857B">no card · cancel anytime</text>
                </svg>
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <p className="eyebrow mb-6">05 / The free report</p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 md:mb-8">
                Before you decide anything, <em className="italic text-rust">see the report.</em>
              </h2>
              <p className="text-base md:text-xl text-ink/70 leading-relaxed mb-6 md:mb-8">This is the thing we're known for. It's free, it takes 60 seconds to start, and you'll have it in your hands in under an hour.</p>
              <div className="space-y-4 text-base text-ink/75 leading-relaxed">
                <p>You give us your business name and where you work. We do the rest.</p>
                <p>We pull your Google page and grade it (most score under 60). We stack your reviews against your top competitor. We literally <em>ask ChatGPT</em> who the best in your area is and we screenshot the answer. We check Perplexity. We check Gemini.</p>
                <p>Then we send you everything. One link. Two minutes to read.</p>
                <p>And if you read the report and decide to walk away? <em className="text-ink font-medium not-italic">Fine.</em> The report is yours. We're not going to chase you.</p>
              </div>
              <Link to="/free-report" className="btn-primary mt-10 px-8 py-4 rounded-full text-base font-medium inline-block">Get My Free Report</Link>
              <p className="text-sm text-warmgrey mt-3">We text it to you in under an hour.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW PAYING WORKS ═══ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <p className="eyebrow mb-4 md:mb-6">06 / How paying works</p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 md:mb-12">
          Here's something we should probably <em className="italic">explain.</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-6 text-lg leading-relaxed text-ink/75">
            <p>Most marketing companies make you pay first and then build something. You hand over $500 a month. You wait 90 days. You hope it works. If it doesn't, you've already spent $1,500 and you've got nothing to show for it.</p>
            <p className="text-ink font-medium font-display text-3xl italic">We don't do that.</p>
            <p>We build your website first. We optimize your Google page first. We start the AI work first. You watch all of it happen.</p>
            <p>Then, if you like what you see, you keep going. If you don't, you walk away and you keep everything we built.</p>
            <p>We can do this because we use AI for the heavy lifting (yes, the same AI tools that are recommending your competitor right now). That's how we charge $99 a month for what other agencies charge $500 to $2,000 a month for. A real human is on every account.</p>
            <p className="text-rust">If you've been burned by a marketing company before, this is the part where you stop being scared.</p>
          </div>
          <div className="space-y-4">
            <div className="border border-softline rounded-2xl p-6 bg-paper">
              <p className="eyebrow mb-3 text-warmgrey">Other agencies</p>
              <div className="space-y-3 text-sm text-warmgrey">
                <p>1. You pay first ($500–$2,000/mo)</p>
                <p>2. You sign a 12-month contract</p>
                <p>3. They start working (maybe)</p>
                <p>4. You wait 90 days</p>
                <p>5. You hope it works</p>
              </div>
            </div>
            <div className="border-2 border-rust rounded-2xl p-6 bg-highlight">
              <p className="eyebrow mb-3 text-rust">WorkBuddy</p>
              <div className="space-y-3 text-sm text-ink">
                <p>1. We build it first (24 hours)</p>
                <p>2. You see the website + Google work</p>
                <p>3. You decide if you like it</p>
                <p>4. $99/mo, no contract</p>
                <p>5. Cancel anytime, keep everything</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section className="bg-ink text-paper py-16 md:py-32 grain">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 md:mb-6 text-paper/60">07 / Who this is for</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10 md:mb-16">
            This isn't for everyone. <em className="italic text-paper/60">Here's how to know.</em>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="font-display text-3xl mb-8 text-rust">This is probably a fit if:</h3>
              <ul className="space-y-6 text-lg leading-relaxed text-paper/85">
                <li className="flex gap-4"><span className="text-rust mt-1">→</span><span>You run a local service business. Painting, cleaning, lawn care, plumbing, HVAC, roofing, handyman, that kind of thing.</span></li>
                <li className="flex gap-4"><span className="text-rust mt-1">→</span><span>You get most of your customers from word of mouth right now, and you can feel the ceiling.</span></li>
                <li className="flex gap-4"><span className="text-rust mt-1">→</span><span>You know your Google page exists somewhere but you haven't really touched it in a year. Maybe more.</span></li>
                <li className="flex gap-4"><span className="text-rust mt-1">→</span><span>You've thought about doing the marketing thing yourself, but every time you sit down to figure it out, something on the job site needs you.</span></li>
                <li className="flex gap-4"><span className="text-rust mt-1">→</span><span>You want this <em>handled.</em> Not coached. Handled.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-3xl mb-8 text-paper/50">This probably isn't a fit if:</h3>
              <ul className="space-y-6 text-lg leading-relaxed text-paper/60">
                <li className="flex gap-4"><span className="mt-1">×</span><span>You're booked six months out and you genuinely don't want any more customers. We've talked to people in this exact situation. Save your money.</span></li>
                <li className="flex gap-4"><span className="mt-1">×</span><span>You don't trust the internet. We can't fix that with a website. That's a worldview thing.</span></li>
                <li className="flex gap-4"><span className="mt-1">×</span><span>You're a marketing agency yourself. You'll get more out of building your own version of this than buying ours.</span></li>
                <li className="flex gap-4"><span className="mt-1">×</span><span>You want hourly check-ins and weekly strategy meetings. We don't do those.</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-12 border-t border-paper/15 max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-4 text-rust">A note on capacity</p>
            <p className="font-display text-2xl md:text-3xl italic text-paper leading-tight mb-3">
              We're a small team. We only take on a handful of new businesses each month so we can actually do the work right.
            </p>
            <p className="text-paper/60 text-base">Right now, we have a few spots open.</p>
          </div>
        </div>
      </section>

      {/* ═══ PROOF ═══ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <div className="max-w-3xl mb-12 md:mb-20">
          <p className="eyebrow mb-4 md:mb-6">08 / Proof</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-4 md:mb-6">
            Real businesses. Real customers. <br /><em className="italic text-rust">Real money in the bank.</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 leading-relaxed">We're newer than the agencies that charge five times more, and we're picky about who we work with. Here's what's happened for some of the people who said yes.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-paper border-2 border-rust rounded-3xl p-6 md:p-8 hover:border-ink transition-colors relative">
            <div className="absolute -top-3 left-8 bg-rust text-paper px-3 py-1 rounded-full text-xs font-mono">PAID FOR ITSELF IN WEEK 1</div>
            <div className="flex items-center gap-4 mb-6 mt-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rust to-rustdark flex items-center justify-center text-paper font-display text-2xl">S</div>
              <div><p className="font-medium">Shannon S.</p><p className="text-sm text-warmgrey">Lightning Pro Cleaning · NC</p></div>
            </div>
            <blockquote className="font-display text-2xl leading-tight italic mb-6">"I got a lead but is it real? Yes, I'm headed there now. It was actually a commercial Clean which is awesome."</blockquote>
            <div className="bg-highlight border border-rust/30 rounded-xl p-4">
              <p className="text-xs eyebrow mb-1 text-rust">Result</p>
              <p className="text-sm text-ink">Landed a recurring commercial cleaning contract during her free trial. Before she'd paid a dollar.</p>
            </div>
          </div>
          <div className="bg-paper border border-softline rounded-3xl p-6 md:p-8 hover:border-ink transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ink to-warmgrey flex items-center justify-center text-paper font-display text-2xl">T</div>
              <div><p className="font-medium">Trey S.</p><p className="text-sm text-warmgrey">PCB Lawn &amp; Irrigation · FL</p></div>
            </div>
            <blockquote className="font-display text-4xl md:text-6xl leading-none italic mb-6 text-rust">"Deal."</blockquote>
            <div className="bg-highlight border border-rust/30 rounded-xl p-4">
              <p className="text-xs eyebrow mb-1 text-rust">Result</p>
              <p className="text-sm text-ink">One word. Sent 32 minutes after he saw his report.</p>
            </div>
          </div>
          <div className="bg-paper border border-softline rounded-3xl p-6 md:p-8 hover:border-ink transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-warmgrey to-ink flex items-center justify-center text-paper font-display text-2xl">A</div>
              <div><p className="font-medium">Alex C.</p><p className="text-sm text-warmgrey">Calianese Painting · NJ</p></div>
            </div>
            <blockquote className="font-display text-2xl leading-tight italic mb-6">"Which ever you think this is your specialty not mine."</blockquote>
            <div className="bg-highlight border border-rust/30 rounded-xl p-4">
              <p className="text-xs eyebrow mb-1 text-rust">Result</p>
              <p className="text-sm text-ink">Trusted us to pick his domain. He paid the same day. 1hr 39min total.</p>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link to="/customers" className="inline-flex items-center gap-2 text-ink border-b-2 border-rust pb-1 hover:text-rust transition-colors">
            <span className="text-base font-medium">See all customer stories</span><span>→</span>
          </Link>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-highlight border-y border-rust/20 py-16 md:py-32 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow mb-4 md:mb-6 text-rust">09 / Decide</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] mb-6 md:mb-8">
            Right now, your customers are calling someone else. <em className="italic">Let's fix that.</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
            Start with the free report. It shows you exactly where you stand and exactly what we'd do about it. No card. No call. No "let's hop on a discovery call." Just the truth.
          </p>
          <Link to="/free-report" className="btn-primary px-10 py-5 rounded-full text-lg font-medium inline-block">Get My Free Report</Link>
          <p className="text-sm text-warmgrey mt-6">First page of Google in 30 days, guaranteed.</p>

          <div className="mt-20 pt-12 border-t border-rust/20 max-w-xl mx-auto">
            <p className="eyebrow mb-4 text-rust">P.S.</p>
            <p className="font-display text-2xl md:text-3xl italic text-ink leading-tight mb-4">
              If you read this whole page and you're still on the fence, just text me. I'm a real person.
            </p>
            <p className="text-sm text-warmgrey">— Caleb · <span className="font-mono">(860) 477-9542</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
