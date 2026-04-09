import { useState, useRef } from 'react';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

const FORMSPREE_ID = 'mzdkqobq';

const steps = [
  { num: '01', title: 'You fill this out', time: '60 seconds' },
  { num: '02', title: 'We grade your Google, your website, and your competitors', time: 'We do this' },
  { num: '03', title: 'You get a full report by text', time: 'Within the hour' },
];

const included = [
  'Google Business Profile grade (how complete and optimized it actually is)',
  'Local SEO snapshot (what you rank for and what you don\'t)',
  'Review analysis (response rate, sentiment, what\'s hurting you)',
  'Competitor comparison (how the top 3 in your area stack up against you)',
  'AI visibility check (what ChatGPT, Perplexity, and Gemini say about you)',
  'Website audit (speed, mobile, SEO basics)',
];

const faqs = [
  { q: 'Is there actually a catch?', a: 'No. We do the report because it\'s the fastest way to show you what we do. If you like what you see, you can sign up for $99/month. If you don\'t, you keep the report and we part friends.' },
  { q: 'How long does it take?', a: 'You fill out the form in about 60 seconds. We send you the report within an hour, usually faster. You\'ll get it by text.' },
  { q: 'Do I need to give you access to anything?', a: 'No. We work with publicly available information — your Google listing, your website, your reviews. You don\'t need to give us any passwords or logins.' },
  { q: 'What if I already have a website?', a: 'That\'s fine. We\'ll grade the one you have and tell you honestly whether it\'s helping or hurting. If it\'s good, we\'ll say so.' },
  { q: 'Will someone try to call me?', a: 'No. We text. That\'s it. No phone calls, no sales pitch, no follow-up sequence. You\'ll hear from Caleb by text with your report.' },
];

export const FreeReportPage = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', businessName: '', phone: '', cityState: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.name.trim() || !form.businessName.trim() || !form.phone.trim() || !form.cityState.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const utmData: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(f => {
        const v = sessionStorage.getItem(f);
        if (v) utmData[f] = v;
      });

      const payload = {
        name: form.name,
        businessName: form.businessName,
        phone: form.phone,
        cityState: form.cityState,
        ...utmData,
        lead_magnet: 'free-report',
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
      };

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
        (window as unknown as Record<string, (...args: unknown[]) => void>).gtag('event', 'conversion', {
          send_to: 'AW-17886210357/free_report',
          event_category: 'Free Report',
        });
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Text us directly at (860) 477-9542 and we\'ll get your report started.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-4 md:mb-6">Free report</Eyebrow>
            <h1 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 md:mb-8">
              See exactly where you stand on Google. <br /><em className="italic text-rust">Free. 60 seconds.</em>
            </h1>
            <p className="text-base md:text-xl text-ink/70 max-w-xl leading-relaxed mb-6 md:mb-8">
              We'll grade your Google Business Profile, check your local SEO, analyze your reviews, compare you to your top competitors, and test what AI search engines say about you. You'll have the full report within the hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={scrollToForm}
                className="btn-primary px-8 py-4 rounded-full text-base font-medium"
              >
                Get My Free Report
              </button>
              <p className="text-sm text-warmgrey self-center">No card. No call. No obligation.</p>
            </div>
          </div>

          {/* Steps card */}
          <div className="lg:col-span-5">
            <div className="bg-ink text-paper rounded-2xl p-6 md:p-8">
              <Eyebrow className="text-paper/50 mb-4">How it works</Eyebrow>
              <div className="space-y-5">
                {steps.map(step => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <span className="font-mono text-rust text-sm mt-0.5">{step.num}</span>
                    <div className="flex-1">
                      <p className="font-medium text-paper mb-0.5">{step.title}</p>
                      <p className="text-sm text-paper/50">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-paper/15 mt-6 pt-5">
                <p className="font-display text-xl italic text-rust">That's it. No call. No meeting. Just the report.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-12 md:py-20" ref={formRef}>
        <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-rust text-3xl">✓</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">You're in.</h2>
              <p className="text-lg text-ink/70 max-w-md mx-auto leading-relaxed mb-6">
                Caleb will text you your report within the hour. Check your phone.
              </p>
              <div className="bg-highlight border border-rust/20 rounded-xl p-5 max-w-sm mx-auto">
                <p className="text-sm text-ink/70">
                  <span className="font-medium text-ink">What happens next:</span> We grade your Google, your site, and your competitors. Then we text you the full report. No calls. No emails. Just the report.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 bg-rust text-paper px-5 py-2 rounded-bl-2xl">
                <span className="font-mono text-xs">100% FREE</span>
              </div>
              <Eyebrow className="mb-3 text-rust">Get your report</Eyebrow>
              <h2 className="font-display text-2xl md:text-4xl mb-2">Tell us about your business.</h2>
              <p className="text-ink/60 mb-8">60 seconds. That's all we need.</p>

              {error && (
                <div className="bg-rust/10 border border-rust/30 rounded-xl px-4 py-3 mb-6">
                  <p className="text-sm text-rust">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-ink mb-1.5">Business Name</label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="e.g. Panama City Beach Lawn"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                    className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="cityState" className="block text-sm font-medium text-ink mb-1.5">City & State</label>
                    <input
                      id="cityState"
                      name="cityState"
                      type="text"
                      placeholder="e.g. Panama City Beach, FL"
                      value={form.cityState}
                      onChange={handleChange}
                      required
                      className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary text-center px-8 py-5 rounded-full text-lg font-medium disabled:opacity-60 disabled:cursor-wait"
                >
                  {submitting ? 'Sending...' : 'Get My Free Report'}
                </button>
                <p className="text-center text-sm text-warmgrey">We'll text you the report. No card. No call. No follow-up sequence.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* What's in the report */}
      <section className="bg-ink text-paper py-16 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Eyebrow className="mb-4 md:mb-6 text-paper/60">What's in the report</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 md:mb-14">
            Everything you need to know about where you stand. <br /><em className="italic text-rust">Nothing you don't.</em>
          </h2>
          <div className="space-y-4">
            {included.map(item => (
              <div key={item} className="flex gap-3 items-start">
                <span className="text-rust mt-1 flex-shrink-0">✓</span>
                <p className="text-paper/85 text-lg">{item}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-paper/15 mt-12 pt-8">
            <p className="font-display text-2xl md:text-3xl italic text-paper/90 leading-tight">
              Most agencies charge $200+ for this. We give it to you <span className="text-rust">free</span> because we'd rather show you than tell you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <Eyebrow className="mb-4 md:mb-6">FAQ</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 md:mb-14">
          Questions people ask <em className="italic">before they fill it out.</em>
        </h2>
        <div className="space-y-8 md:space-y-10">
          {faqs.map(faq => (
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
            Your competitors already know where they stand. <br /><em className="italic text-rust">Do you?</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 mb-8 md:mb-10">
            60 seconds. Free. No card. You'll have the report within the hour.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-block btn-primary px-10 py-5 rounded-full text-lg font-medium"
          >
            Get My Free Report
          </button>

          <div className="mt-16 md:mt-20 pt-12 border-t border-rust/20 max-w-xl mx-auto">
            <Eyebrow className="mb-4 text-rust">P.S.</Eyebrow>
            <p className="font-display text-2xl md:text-3xl italic text-ink leading-tight mb-4">
              This is the same report we run for every customer before they sign up. If it doesn't convince you, nothing will. And that's fine.
            </p>
            <p className="text-sm text-warmgrey">&mdash; Caleb &middot; <span className="font-mono">(860) 477-9542</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
