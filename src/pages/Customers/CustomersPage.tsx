import { Link } from 'react-router-dom';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

const industries = [
  'Painting', 'Cleaning', 'Lawn Care', 'HVAC', 'Plumbing', 'Roofing',
  'Handyman', 'Auto Detailing', 'Flooring', 'Pressure Washing', 'Pest Control', 'Tree Service',
  'Landscaping', 'Notary', 'Photography', 'Real Estate', 'Contractors', 'Electricians',
  'Mechanics', 'Concrete', 'Tile', 'Masonry',
];

export const CustomersPage = () => {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-12 md:pt-20 md:pb-20">
        <Eyebrow className="mb-4 md:mb-6">Real customers &middot; Real money &middot; Real names</Eyebrow>
        <h1 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-8 max-w-4xl">
          Their phones started ringing. <br /><em className="italic text-rust">Here's how.</em>
        </h1>
        <p className="text-base md:text-xl text-ink/70 max-w-3xl leading-relaxed">
          We're newer than the agencies that charge five times more. So we're not going to pretend we have a thousand case studies. We have these. They're real. The names are real. The texts are word for word. The results are what they say they are.
        </p>
      </section>

      {/* ── Shannon ── */}
      <section className="border-t border-softline py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rust to-rustdark flex items-center justify-center mb-6 relative">
                <span className="font-display text-[6rem] md:text-[10rem] text-paper italic leading-none">S</span>
              </div>
              <p className="font-display text-3xl mb-1">Shannon S.</p>
              <p className="text-warmgrey mb-4">Lightning Pro Cleaning &middot; Wilmington, NC</p>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight text-rust border border-rust/30">CLEANING</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight text-rust border border-rust/30">SOLO OPERATOR</span>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div>
                <Eyebrow className="mb-3">The setup</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Cleaning business owner. Solo operator. Word of mouth and Facebook for years. Knew her Google page existed but had never really touched it. Top competitor in her area had 60+ reviews. She had 4.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What we did</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Built her a website in 24 hours. Optimized her Google page. Started running the AI visibility play.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What happened</Eyebrow>
                <p className="font-display text-3xl italic leading-tight text-rust">She got a lead during her free trial. Before she'd paid a dollar.</p>
              </div>
              <div className="bg-highlight border border-rust/30 rounded-2xl p-5 md:p-8">
                <Eyebrow className="mb-4">Her actual texts to us, unedited</Eyebrow>
                <div className="space-y-3 text-ink/85">
                  {[
                    '"I got a lead but is it real?"',
                    '"It\'s from work buddy but I haven\'t even paid so how is that possible"',
                    '"Yes ! I\'m headed there now! That\'s crazy"',
                    '"It was actually a commercial Clean which is awesome"',
                    '"So what do we do moving forward"',
                  ].map((msg, i) => (
                    <p key={i} className="bg-paper rounded-2xl rounded-bl-sm p-4 max-w-md">{msg}</p>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-rust pl-6">
                <Eyebrow className="mb-2">The takeaway</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Shannon's free trial paid for itself in under a week. The lead was for a recurring commercial cleaning contract. At standard pricing for her area, that one contract is worth thousands of dollars per month. <em className="text-ink font-medium not-italic">She landed it.</em></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trey ── */}
      <section className="border-t border-softline py-12 md:py-20 bg-ink text-paper relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-paper/20 to-paper/5 flex items-center justify-center mb-6 border border-paper/10">
                <span className="font-display text-[6rem] md:text-[10rem] text-paper italic leading-none">T</span>
              </div>
              <p className="font-display text-3xl mb-1">Trey S.</p>
              <p className="text-paper/60 mb-4">Panama City Beach Lawn &middot; FL</p>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-paper/10 text-paper border border-paper/20">LAWN CARE</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-paper/10 text-paper border border-paper/20">32-MINUTE CLOSE</span>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div>
                <Eyebrow className="mb-3 text-paper/60">The setup</Eyebrow>
                <p className="text-lg text-paper/80 leading-relaxed">Lawn and irrigation guy in a beach town. The kind of business that should be drowning in calls in season. He wasn't. His top competitor had 153 Google reviews. He had zero.</p>
              </div>
              <div>
                <Eyebrow className="mb-3 text-paper/60">What we did</Eyebrow>
                <p className="text-lg text-paper/80 leading-relaxed">Sent him his free report at 11:18 PM. He opened it the next morning. He asked one question: <em>"Cost?"</em></p>
              </div>
              <div>
                <Eyebrow className="mb-3 text-paper/60">What happened</Eyebrow>
                <p className="font-display text-3xl italic leading-tight text-rust">We told him the price. He said one word: "Deal." Total time from his first reply: 32 minutes.</p>
              </div>
              <div className="bg-paper/5 border border-paper/10 rounded-2xl p-5 md:p-8">
                <Eyebrow className="mb-4 text-paper/60">His exact texts</Eyebrow>
                <div className="space-y-3">
                  <p className="bg-paper/10 rounded-2xl rounded-bl-sm p-4 max-w-md text-paper">"Yes" <span className="text-paper/50 text-sm">(when asked if the report surprised him)</span></p>
                  <p className="bg-paper/10 rounded-2xl rounded-bl-sm p-4 max-w-md text-paper">"Cost?"</p>
                  <p className="bg-rust rounded-2xl rounded-bl-sm p-4 max-w-md text-paper font-display text-3xl italic">"Deal"</p>
                </div>
              </div>
              <div className="border-l-2 border-rust pl-6">
                <Eyebrow className="mb-2 text-paper/60">The takeaway</Eyebrow>
                <p className="text-lg text-paper/80 leading-relaxed">Sometimes a business owner already knows what's wrong. They just need someone to actually do something about it. Trey didn't need a sales pitch. He needed a fix.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Alex ── */}
      <section className="border-t border-softline py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-warmgrey to-ink flex items-center justify-center mb-6 relative">
                <span className="font-display text-[6rem] md:text-[10rem] text-paper italic leading-none">A</span>
              </div>
              <p className="font-display text-3xl mb-1">Alex C.</p>
              <p className="text-warmgrey mb-4">Calianese Painting &middot; Bayonne, NJ</p>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight text-rust border border-rust/30">PAINTING</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-highlight text-rust border border-rust/30">70-MILE RADIUS</span>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div>
                <Eyebrow className="mb-3">The setup</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Painter and epoxy guy serving the entire New York metro. Worked across Manhattan, Brooklyn, Staten Island, Queens, plus parts of New Jersey. A 70-mile service area. Worried we wouldn't be able to optimize for that wide of a footprint.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What we did</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Confirmed we could cover all of it. Built him a site in a few hours. Picked his domain name (he asked us to). Got his Google page connected the same day.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What happened</Eyebrow>
                <p className="font-display text-3xl italic leading-tight text-rust">Total time from his first reply to a paying customer: 1 hour, 39 minutes.</p>
              </div>
              <div className="bg-highlight border border-rust/30 rounded-2xl p-5 md:p-8">
                <Eyebrow className="mb-4">His exact texts</Eyebrow>
                <div className="space-y-3 text-ink/85">
                  <p className="bg-paper rounded-2xl rounded-bl-sm p-4 max-w-md">"Sure, could I add other counties as we go and what are your packages?"</p>
                  <p className="bg-paper rounded-2xl rounded-bl-sm p-4 max-w-md">"Yes" <span className="text-warmgrey text-sm">(when sent the link)</span></p>
                  <p className="bg-paper rounded-2xl rounded-bl-sm p-4 max-w-md">"All paid"</p>
                  <p className="bg-paper rounded-2xl rounded-bl-sm p-4 max-w-md italic">"Which ever you think this is your specialty not mine"</p>
                </div>
              </div>
              <div className="border-l-2 border-rust pl-6">
                <Eyebrow className="mb-2">The takeaway</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Wide service areas are not a problem. We optimize for where you actually work, not where your office address happens to be.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Joseph ── */}
      <section className="border-t border-softline py-12 md:py-20 bg-highlight relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-ink to-warmgrey flex items-center justify-center mb-6 border border-rust/20">
                <span className="font-display text-[6rem] md:text-[10rem] text-paper italic leading-none">J</span>
              </div>
              <p className="font-display text-3xl mb-1">Joseph R.</p>
              <p className="text-warmgrey mb-4">Levelpro Floor Solutions &middot; UT</p>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-paper text-rust border border-rust/30">FLOORING</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-paper text-rust border border-rust/30">56 PHOTOS SENT</span>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div>
                <Eyebrow className="mb-3">The setup</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Flooring contractor. Did beautiful work. Self-leveling, hardwood, LVP, the whole stack. Had basically no online presence. Zero Google reviews. No website.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What we did</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">Built his site. Optimized his Google page. Asked him to send us photos of his work for the gallery.</p>
              </div>
              <div>
                <Eyebrow className="mb-3">What happened</Eyebrow>
                <p className="font-display text-3xl italic leading-tight text-rust">He sent us 56 photos. Unprompted. He just kept sending them. We put every single one on his site.</p>
              </div>
              <div className="bg-paper border border-rust/30 rounded-2xl p-5 md:p-8">
                <Eyebrow className="mb-4">His exact texts</Eyebrow>
                <div className="space-y-3 text-ink/85">
                  <p className="bg-highlight rounded-2xl rounded-bl-sm p-4 max-w-md">"I would like to picture to match the description. And maybe a slide show or a gallery"</p>
                  <p className="bg-highlight rounded-2xl rounded-bl-sm p-4 max-w-md">"To show my work"</p>
                  <p className="bg-highlight rounded-2xl rounded-bl-sm p-4 max-w-md text-warmgrey italic">[56 photos of completed projects, sent over the next hour]</p>
                </div>
              </div>
              <div className="border-l-2 border-rust pl-6">
                <Eyebrow className="mb-2">The takeaway</Eyebrow>
                <p className="text-lg text-ink/80 leading-relaxed">The customers who already do great work just need somewhere to show it. We give them the canvas. They bring the paint.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="bg-ink text-paper py-14 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Eyebrow className="mb-4 md:mb-6 text-paper/60">By the numbers</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-6xl leading-[1.1] mb-12">
            Every customer above is on the <em className="italic text-rust">first page of Google</em> for what they do, in the area they serve. That's not optional. <br /><em className="italic text-rust">That's the deal.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { num: '100%', label: 'on the 30-day guarantee' },
              { num: '22', label: 'industries served' },
              { num: '$0', label: 'refunds paid out, ever' },
            ].map((stat) => (
              <div key={stat.label} className="border border-paper/20 rounded-2xl p-6">
                <p className="font-display text-4xl md:text-5xl mb-2">{stat.num}</p>
                <p className="text-sm text-paper/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <Eyebrow className="mb-4 md:mb-6">Who we work with</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10 md:mb-16 max-w-3xl">
          We work mostly with these kinds of <em className="italic">businesses.</em>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {industries.map((ind) => (
            <div key={ind} className="border border-softline rounded-2xl p-4 text-center hover:border-ink transition-colors text-sm">
              {ind}
            </div>
          ))}
        </div>
        <p className="text-center text-ink/60 mt-12 text-lg">
          If you don't see your trade on this list, we still might be able to help. <em className="italic">Run the report and we'll tell you straight.</em>
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-highlight border-y border-rust/20 py-16 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Eyebrow className="mb-4 md:mb-6 text-rust">A few spots open this month</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] mb-8">
            Want to be on this page <br /><em className="italic text-rust">in 30 days?</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 mb-10">
            We're a small team. We only take on a handful of new businesses each month so we can do the work right. Book a free call. If we're a fit, we get to work.
          </p>
          <Link
            to="/free-report"
            className="inline-block btn-primary px-10 py-5 rounded-full text-lg font-medium"
          >
            Book a Free Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};
