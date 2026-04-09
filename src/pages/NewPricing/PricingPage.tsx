import { Link } from 'react-router-dom';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

const faqs = [
  { q: 'Is there really nothing else?', a: "There's really nothing else. We don't have a \"pro\" tier or a \"growth\" tier. The $99 plan is the plan. If you ever see a marketing company with three pricing tiers, ask yourself what they're keeping out of the cheapest one." },
  { q: 'Why so cheap?', a: 'Because we use modern tools that let our small team do work that used to take a full agency staff. We\'re not cutting corners. We\'re cutting the labor cost.' },
  { q: 'Who do I actually talk to if I have a problem?', a: "Caleb. He's the founder and he reads every account that comes through. He answers texts personally, usually within an hour during business hours. No call centers. No offshore teams. If WorkBuddy ever gets too big for Caleb to do this, we'll hire help and tell you exactly who you're talking to." },
  { q: 'What if I cancel?', a: "Cancel any time, no questions, no exit interview, no cancellation fee. The website stays yours. The Google work stays in place. The domain transfers to you. We're not going to take any of it back." },
  { q: 'What if I have a website already?', a: "We can either rebuild it or work with what you've got. Most of the time, we end up rebuilding it because the existing site isn't doing the SEO work. Your call." },
  { q: 'Do you do contracts?', a: 'No. Contracts are how bad companies trap good customers. We earn the next month every month.' },
  { q: 'Is there a setup fee?', a: 'No.' },
  { q: 'Do you charge extra for the domain?', a: 'No. Domain included.' },
  { q: "What if I don't have a Google Business Profile yet?", a: "We'll set one up for you. This happens a lot. Don't worry about it." },
  { q: 'Do you handle paid ads?', a: "No. WorkBuddy is all organic. Google ads are a different game and a different cost. If you want to run ads, you can, but we're not the ones running them." },
  { q: 'Can I see what I\'m getting before I pay?', a: "Yes. That's the whole point of the free report. You see exactly where you stand, you see exactly what we'd build, and you only move forward if you actually want to." },
  { q: 'Who owns the website if I cancel?', a: "You do. Always. We don't hold it hostage. Domain transfers to your name within 48 hours of cancellation, free." },
];

const features = [
  ['Custom website built for your business', '(yours forever, even if you cancel)'],
  ['Domain name included', ''],
  ['Google Business Profile setup and optimization, taken from wherever it is now to 100 percent', ''],
  ['Weekly Google posts written and published for you', ''],
  ['Reviews replied to within 24 hours, every single one', ''],
  ['AI visibility work so ChatGPT, Perplexity, and Gemini start recommending you', ''],
  ['Local SEO for the towns you actually serve, not just the city your business is registered in', ''],
  ['Monthly progress updates by text', '(not email, because you don\'t read those)'],
  ['Real human support over text, every day of the week', ''],
];

export const PricingPage = () => {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
        <Eyebrow className="mb-4 md:mb-6">Pricing</Eyebrow>
        <h1 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 md:mb-8 max-w-4xl mx-auto">
          One price. Everything included. <br /><em className="italic text-rust">No contract.</em>
        </h1>
        <p className="text-base md:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed">
          We don't do tiers, upsells, or "premium add-ons." There's one plan. It includes everything we make. You can cancel any time and you keep what we built.
        </p>
      </section>

      {/* Plan card */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
        <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rust text-paper px-6 py-2 rounded-bl-3xl">
            <span className="font-mono text-xs">THE WHOLE PRODUCT</span>
          </div>
          <h2 className="font-display text-4xl mb-2">WorkBuddy</h2>
          <p className="text-warmgrey mb-6 md:mb-8">No tiers. No upsells. No setup fee.</p>
          <div className="flex items-baseline mb-2">
            <span className="font-display text-6xl md:text-8xl">$99</span>
            <span className="text-warmgrey text-base md:text-xl ml-3">/ month</span>
          </div>
          <p className="text-ink/70 mb-8 md:mb-10">Cancel any time. No contract.</p>

          <div className="space-y-4 mb-8 md:mb-10">
            {features.map(([feature, note], i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-rust mt-1">✓</span>
                <span>
                  {feature}
                  {note && <span className="text-warmgrey"> {note}</span>}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/free-report"
            className="block w-full btn-primary text-center px-8 py-5 rounded-full text-lg font-medium"
          >
            Get Started
          </Link>
          <p className="text-center text-sm text-warmgrey mt-4">You'll see the website and Google work first. Then you decide.</p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-ink text-paper py-16 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Eyebrow className="mb-4 md:mb-6 text-paper/60">The guarantee</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] mb-6 md:mb-8">
            You'll be on the first page of Google in 30 days. <em className="italic text-rust">Or you don't pay.</em>
          </h2>
          <div className="space-y-6 text-lg text-paper/80 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12">
            <p>That's the deal.</p>
            <p>If you're not on the first page of Google for a real search someone would actually do for your business, in the area you serve, within 30 days of us starting, you get a full refund. Plus we give you back the website and the Google work anyway.</p>
            <p className="font-display text-2xl italic text-rust">This isn't the kind of guarantee where we hide behind fine print. It's binary. You're on page one or you're not. If you're not, you win.</p>
          </div>

          <div className="max-w-2xl mx-auto border-t border-b border-paper/20 p-6 md:p-8">
            <p className="font-display text-2xl md:text-3xl italic text-paper leading-tight">
              For the record: we've never paid out a refund. Not because we hide behind fine print. Because we've never missed.
            </p>
            <p className="text-sm text-paper/60 mt-4">&mdash; Caleb, founder</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <Eyebrow className="mb-4 md:mb-6">FAQ</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10 md:mb-16">
          Quick answers to the things people ask <em className="italic">before they sign up.</em>
        </h2>
        <div className="space-y-8 md:space-y-12">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-display text-2xl mb-3">{faq.q}</h3>
              <p className="text-ink/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-highlight border-y border-rust/20 py-16 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 md:mb-8">
            The best way to figure out if it's worth $99 is to <em className="italic">see the report first.</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 mb-8 md:mb-10">Free. 60 seconds. No card needed. We do all the work. You'll have it within the hour.</p>
          <Link
            to="/free-report"
            className="inline-block btn-primary px-10 py-5 rounded-full text-lg font-medium"
          >
            Get My Free Report
          </Link>

          <div className="mt-20 pt-12 border-t border-rust/20 max-w-xl mx-auto">
            <Eyebrow className="mb-4 text-rust">P.S.</Eyebrow>
            <p className="font-display text-2xl md:text-3xl italic text-ink leading-tight mb-4">
              $99 is what we charge. The report is what we give. If you're still on the fence after both, just text me.
            </p>
            <p className="text-sm text-warmgrey">&mdash; Caleb &middot; <span className="font-mono">(860) 477-9542</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
