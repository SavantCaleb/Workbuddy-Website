import { useState, useRef, useEffect } from 'react';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

const steps = [
  { num: '01', title: 'Fill out the form below', time: '60 seconds' },
  { num: '02', title: 'Pick a time that works', time: 'Right here on the page' },
  { num: '03', title: 'We talk strategy on the call', time: '15 minutes' },
];

const whatWeCover = [
  'Where your Google Business Profile stands today (and what\'s missing)',
  'What your competitors are doing to outrank you',
  'Which quick wins would move the needle fastest',
  'Whether WorkBuddy is the right fit — and we\'ll tell you honestly if it\'s not',
];

const faqs = [
  { q: 'Is there actually a catch?', a: 'No. It\'s a 15-minute call. We\'ll look at your Google presence together and tell you what we see. If there\'s a fit, great. If not, you walk away with free advice.' },
  { q: 'Will I get a sales pitch?', a: 'You\'ll get an honest assessment. If we can help, we\'ll explain how. If we can\'t, we\'ll say so. No pressure, no follow-up sequence.' },
  { q: 'What if I\'m not sure I need help?', a: 'That\'s exactly who this call is for. We\'ll look at your Google listing together and you\'ll know in 15 minutes whether there\'s room to grow.' },
  { q: 'Do I need to prepare anything?', a: 'No. Just show up. We\'ll pull up your Google listing live on the call and walk through everything together.' },
];

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits.length > 0 ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const FreeReportPage = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', businessName: '', phone: '', city: '', goal: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Slots
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/report/slots')
      .then(r => r.json())
      .then(data => setSlots(data.slots || []))
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
  }, []);

  const slotsByDay = slots.reduce<Record<string, string[]>>((acc, iso) => {
    const d = new Date(iso);
    const key = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(iso);
    return acc;
  }, {});

  const phoneDigits = form.phone.replace(/\D/g, '');
  const canSubmit = form.name.trim() && form.businessName.trim() && form.city.trim() && phoneDigits.length >= 10 && selectedSlot;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? formatPhone(value) : value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !canSubmit) return;

    setError('');
    setSubmitting(true);

    try {
      const utmData: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(f => {
        const v = sessionStorage.getItem(f);
        if (v) utmData[f] = v;
      });

      const res = await fetch('/api/v1/report/book-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          business_name: form.businessName.trim(),
          city: form.city.trim(),
          phone: phoneDigits,
          dream_keyword: form.goal.trim() || undefined,
          booking_time: selectedSlot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }

      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
        (window as unknown as Record<string, (...args: unknown[]) => void>).gtag('event', 'conversion', {
          send_to: 'AW-17886210357/free_report',
          event_category: 'Direct Booking',
        });
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Text us directly at (860) 477-9542.');
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
            <Eyebrow className="mb-4 md:mb-6">Free strategy call</Eyebrow>
            <h1 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 md:mb-8">
              Let's talk about growing your business on Google. <br /><em className="italic text-rust">15 minutes. Free.</em>
            </h1>
            <p className="text-base md:text-xl text-ink/70 max-w-xl leading-relaxed mb-6 md:mb-8">
              Pick a time, book instantly. We'll look at your Google presence together and tell you exactly what's working, what's not, and what to fix first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={scrollToForm}
                className="btn-primary px-8 py-4 rounded-full text-base font-medium"
              >
                Book My Free Call
              </button>
              <p className="text-sm text-warmgrey self-center">No card. No obligation. Just a conversation.</p>
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
                <p className="font-display text-xl italic text-rust">Real advice. Not a sales pitch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Calendar */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-12 md:py-20" ref={formRef}>
        <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-rust text-3xl">✓</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">You're booked.</h2>
              {selectedSlot && (
                <p className="text-lg font-medium text-ink mb-2">
                  {new Date(selectedSlot).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(selectedSlot).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZone: 'America/New_York',
                  })}{' '}
                  ET
                </p>
              )}
              <p className="text-lg text-ink/70 max-w-md mx-auto leading-relaxed mb-6">
                We'll text you a reminder before the call. Talk soon.
              </p>
              <div className="bg-highlight border border-rust/20 rounded-xl p-5 max-w-sm mx-auto">
                <p className="text-sm text-ink/70">
                  <span className="font-medium text-ink">What happens next:</span> Caleb will call you at your scheduled time. No prep needed — we'll pull up your Google listing together.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 bg-rust text-paper px-5 py-2 rounded-bl-2xl">
                <span className="font-mono text-xs">100% FREE</span>
              </div>
              <Eyebrow className="mb-3 text-rust">Book your call</Eyebrow>
              <h2 className="font-display text-2xl md:text-4xl mb-2">Tell us about your business.</h2>
              <p className="text-ink/60 mb-8">Then pick a time. That's it.</p>

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
                    <label htmlFor="city" className="block text-sm font-medium text-ink mb-1.5">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="e.g. Panama City Beach"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-ink mb-1.5">What do you want help with? <span className="text-warmgrey font-normal">(optional)</span></label>
                  <input
                    id="goal"
                    name="goal"
                    type="text"
                    placeholder="e.g. more Google reviews, show up in Maps, get more calls"
                    value={form.goal}
                    onChange={handleChange}
                    className="w-full border border-softline rounded-xl px-4 py-3.5 text-base bg-paper text-ink placeholder:text-warmgrey/60 focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust/30 transition-colors"
                  />
                </div>

                {/* Slot picker */}
                <div className="pt-2">
                  <label className="block text-sm font-medium text-ink mb-1">Pick a time</label>
                  <p className="text-xs text-warmgrey mb-4">15 minutes &middot; All times Eastern</p>

                  {loadingSlots ? (
                    <div className="text-center py-8">
                      <div className="w-6 h-6 border-2 border-softline border-t-rust rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-warmgrey">Loading available times...</p>
                    </div>
                  ) : Object.keys(slotsByDay).length === 0 ? (
                    <div className="text-center py-6 bg-highlight border border-rust/20 rounded-xl">
                      <p className="text-sm text-ink/70">No times available right now. Text us at <span className="font-mono">(860) 477-9542</span> to schedule.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                      {Object.entries(slotsByDay).map(([dayLabel, daySlots]) => (
                        <div key={dayLabel}>
                          <p className="eyebrow mb-2">{dayLabel}</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {daySlots.map((iso) => {
                              const d = new Date(iso);
                              const timeStr = d.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                timeZone: 'America/New_York',
                              });
                              const isSelected = selectedSlot === iso;
                              return (
                                <button
                                  key={iso}
                                  type="button"
                                  onClick={() => { setSelectedSlot(iso); setError(''); }}
                                  className={`py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                                    isSelected
                                      ? 'border-rust bg-rust text-paper'
                                      : 'border-softline bg-paper text-ink/70 hover:border-ink/30'
                                  }`}
                                >
                                  {timeStr}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full btn-primary text-center px-8 py-5 rounded-full text-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? 'Booking...'
                    : selectedSlot
                      ? `Book My Call — ${new Date(selectedSlot).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })} at ${new Date(selectedSlot).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZone: 'America/New_York',
                        })}`
                      : 'Book My Call'}
                </button>
                <p className="text-center text-sm text-warmgrey">No card. No follow-up sequence. Just a conversation.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* What we cover on the call */}
      <section className="bg-ink text-paper py-16 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Eyebrow className="mb-4 md:mb-6 text-paper/60">What we cover on the call</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 md:mb-14">
            15 minutes of straight answers. <br /><em className="italic text-rust">Zero fluff.</em>
          </h2>
          <div className="space-y-4">
            {whatWeCover.map(item => (
              <div key={item} className="flex gap-3 items-start">
                <span className="text-rust mt-1 flex-shrink-0">✓</span>
                <p className="text-paper/85 text-lg">{item}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-paper/15 mt-12 pt-8">
            <p className="font-display text-2xl md:text-3xl italic text-paper/90 leading-tight">
              Most agencies make you sit through a 45-minute deck. We just <span className="text-rust">show you what we see.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-32">
        <Eyebrow className="mb-4 md:mb-6">FAQ</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 md:mb-14">
          Questions people ask <em className="italic">before they book.</em>
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
            Your competitors are showing up on Google. <br /><em className="italic text-rust">Are you?</em>
          </h2>
          <p className="text-base md:text-xl text-ink/70 mb-8 md:mb-10">
            15 minutes. Free. No card. Let's find out together.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-block btn-primary px-10 py-5 rounded-full text-lg font-medium"
          >
            Book My Free Call
          </button>

          <div className="mt-16 md:mt-20 pt-12 border-t border-rust/20 max-w-xl mx-auto">
            <Eyebrow className="mb-4 text-rust">P.S.</Eyebrow>
            <p className="font-display text-2xl md:text-3xl italic text-ink leading-tight mb-4">
              I'd rather spend 15 minutes helping you than send you a cold email. That's why the call is free.
            </p>
            <p className="text-sm text-warmgrey">&mdash; Caleb &middot; <span className="font-mono">(860) 477-9542</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
