import { Link } from 'react-router-dom';
import { Nav } from '../../components/NewLayout/Nav';
import { Footer } from '../../components/NewLayout/Footer';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

export const AboutPage = () => {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-6">About WorkBuddy</Eyebrow>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8">
              We built this because the people who actually run the place <em className="italic text-rust">deserve better</em> than what they're getting.
            </h1>
            <p className="text-xl text-ink/75 max-w-2xl leading-relaxed">
              Plumbers. Painters. Cleaners. The folks who do the real work. The ones who keep the lights on in their towns. They've been getting fleeced by marketing companies for 20 years. We're trying to end that.
            </p>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="aspect-square bg-highlight border border-softline rounded-3xl flex items-center justify-center">
              <p className="font-display text-[10rem] italic text-rust leading-none">w</p>
            </div>
          </div>
        </div>
      </section>

      {/* The thing nobody says */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20 border-t border-softline">
        <Eyebrow className="mb-6">01 / The thing nobody says out loud</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl leading-tight mb-12">
          Here's the thing nobody in marketing wants to <em className="italic">say out loud.</em>
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          <p>Most marketing agencies make their money on confusion.</p>
          <p>They use words you don't understand. They send you reports with numbers that don't mean anything. They charge you $500, $1,000, $2,000 a month and they hope you don't ask too many questions about what you're actually getting.</p>
          <p>We've talked to hundreds of business owners who paid an agency for a year and got nothing. Not even a website that worked.</p>
          <p>A roofer in Wareham who hasn't seen a lead from his "marketing partner" in 8 months. A counselor in Florida who watched her ranking drop while she was paying $800 a month to "stay competitive." A construction guy in Arkansas who said, and I'm quoting him here, <em className="text-ink font-medium not-italic">"I'm just needing to show up. I just started."</em></p>
          <p>That last one stuck with us. Because that's the whole problem in one sentence. He just wanted to show up. And nobody was helping him do it.</p>
          <p className="font-display text-3xl italic text-rust">So we built WorkBuddy.</p>
        </div>
      </section>

      {/* Why $99 */}
      <section className="bg-ink text-paper py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Eyebrow className="mb-6 text-paper/60">02 / Why $99</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-12">
            A real marketing company at <em className="italic">a fraction of the price.</em>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-paper/85">
            <p>What you get from WorkBuddy is the same thing the $1,000-a-month agencies sell. A custom website. A managed Google Business Profile. Review management. Local SEO. Real strategy, real execution, real results.</p>
            <p className="font-display text-3xl italic text-rust">You just pay $99 instead of $999.</p>
            <p>The only reason that's possible is because we use modern tools. The same AI tools your competitors use to schedule meetings and write emails, we use to grade Google profiles, draft blog posts, write review replies, and find the gaps in your local SEO. Work that used to take an agency 10 hours a week takes us 30 minutes.</p>
            <p className="text-rust font-medium">We're not cutting corners. We're cutting the labor cost. There's a difference.</p>
            <p>A real human still reviews every account. A real human still does the strategy. A real human still answers your texts. That human is usually me, Caleb. I read every account that comes through and I write back personally when you have a question.</p>
            <p>The agencies that charge $1,000 a month hate that we do this for $99. That's how I know we're doing something right.</p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <Eyebrow className="mb-6">03 / What we believe</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl leading-tight mb-16">
          A few things we believe, <em className="italic">in case it helps you decide.</em>
        </h2>
        <div className="space-y-12">
          {[
            { title: 'Marketing should pay for itself in the first month.', desc: "If it doesn't, something is broken. Don't let anyone tell you otherwise." },
            { title: 'The business owner is smarter than the marketer.', desc: "You know your trade. We know online. The deal is, we don't pretend to know your trade and you don't have to pretend to understand SEO." },
            { title: 'AI is a tool, not a threat.', desc: "The agencies who are scared of AI are the ones charging you $1,000 a month for work AI can do in an hour. We're on the other side of that." },
            { title: 'You should never be locked into anything.', desc: "Contracts are how bad companies trap good customers. We don't do contracts." },
            { title: "If your phone isn't ringing, nothing else matters.", desc: "We don't measure success in clicks or impressions or any of the other words that mean nothing. We measure it in calls." },
          ].map((belief) => (
            <div key={belief.title} className="border-l-2 border-rust pl-8">
              <h3 className="font-display text-3xl mb-3">{belief.title}</h3>
              <p className="text-ink/70 leading-relaxed">{belief.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-highlight border-y border-rust/20 py-32 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-8">
              The best way to know if we're for real is to <em className="italic">let us prove it.</em> Free.
            </h2>
            <p className="text-xl text-ink/70 mb-10">Get the report. See what we see. Decide from there.</p>
            <Link
              to="/free-report"
              className="inline-block btn-primary px-10 py-5 rounded-full text-lg font-medium"
            >
              Get My Free Report
            </Link>
          </div>

          <div className="border-t border-rust/20 pt-12 max-w-2xl mx-auto">
            <Eyebrow className="mb-4 text-rust">A note from me</Eyebrow>
            <div className="space-y-4 text-lg text-ink/85 leading-relaxed">
              <p>If you got this far, thanks for reading. I'm a real guy in Massachusetts who built this because I watched too many good business owners get fleeced by agencies that didn't deliver.</p>
              <p>If WorkBuddy isn't a fit for you, that's fine. Tell a friend who might need it. If it is a fit, the report is the easiest way to start. No card. No call. I'll text you when it's ready.</p>
            </div>
            <p className="text-sm text-warmgrey mt-6">&mdash; Caleb Benedict, founder &middot; <span className="font-mono">(203) 605-1105</span></p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
