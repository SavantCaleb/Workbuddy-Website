import type { LeadMagnetConfig } from './types';

export const makeoverConfig: LeadMagnetConfig = {
  pageId: 'free-makeover',
  formspreeId: 'xbdzdazk',

  seo: {
    title: 'Free Google Makeover for Laundromats | WorkBuddy',
    description:
      "We'll completely optimize your Google Business Profile, respond to every review, and show you how you compare to competitors — done today, for free.",
    canonicalPath: '/free-makeover',
  },

  hero: {
    badge: 'FOR LAUNDROMAT OWNERS',
    headline: 'Your Google Page — ',
    highlightText: 'Fixed Today.',
    highlightColor: '#67B7D1',
    headlineSuffix: ' Free.',
    subHeadline:
      "We'll completely optimize your Google listing, respond to every unanswered review, and show you how you compare to competitors. Done in a few hours. Your time: <strong>2 minutes</strong>.",
    socialProof: {
      starsText: 'Avg 34%→96% profile completeness',
      scarcityText: 'Only <strong>%n spots left</strong> this month',
      scarcityNumber: '7',
    },
  },

  beforeAfter: {
    before: {
      title: 'Before',
      tintColor: '#DC2626',
      items: [
        { label: 'Photos', value: '2' },
        { label: 'Description', value: 'None' },
        { label: 'Q&As', value: '0' },
        { label: 'Review Responses', value: '0' },
        { label: 'Categories', value: '1' },
        { label: 'Services Listed', value: 'None' },
      ],
      progressValue: 34,
      progressLabel: '34% profile complete',
    },
    after: {
      title: 'After Today',
      tintColor: '#67B7D1',
      items: [
        { label: 'Photos', value: '14+' },
        { label: 'Description', value: 'Keyword-optimized' },
        { label: 'Q&As', value: '10' },
        { label: 'Review Responses', value: 'All responded' },
        { label: 'Categories', value: '5' },
        { label: 'Services Listed', value: 'Full services' },
      ],
      progressValue: 96,
      progressLabel: '96% profile complete',
    },
    footnote: 'Real results from a laundromat in our pilot program',
  },

  benefits: {
    header: 'What you get (free):',
    items: [
      {
        title: 'Full Google Business Profile optimization',
        description:
          'Photos, description, categories, Q&A, services — everything rewritten and optimized by our team.',
      },
      {
        title: 'Every unanswered review responded to',
        description:
          'Most laundromats have 10-30 reviews sitting with zero responses. We draft and post professional replies to every single one.',
      },
      {
        title: 'AI visibility report',
        description:
          'We test what ChatGPT, Claude, and Perplexity say when someone asks for a laundromat in your city. The results will surprise you.',
      },
      {
        title: 'Before/after competitor comparison report',
        description:
          'See exactly how you stack up against the top 3 laundromats in your area.',
      },
      {
        title: 'Your total time commitment: ~2 minutes',
        description:
          'Fill out this form. Add us to your Google listing. Done.',
      },
      {
        title: 'Zero cost. Zero obligation. No credit card.',
        description:
          "This is not a trial. There's nothing to cancel. We do the work for free to show you what's possible.",
      },
    ],
  },

  howItWorks: {
    steps: [
      { title: 'You fill out this form', time: '2 min' },
      { title: 'Add us as a Google listing manager', time: '30 sec' },
      { title: 'We do everything else', time: '0 min from you' },
      { title: '✓ Done by tonight', time: 'A few hours' },
    ],
  },

  form: {
    greenLabel: 'Free Google Makeover',
    headline: 'Get your listing fully optimized — done today',
    ctaText: 'Get My Free Google Makeover →',
    belowCta: 'No credit card. No customer data needed. Done today.',
    trustBadges: 'Done Same Day · 10 Spots/Month · 100% Free',
    scarcityCallout:
      "Limited to 10 laundromats per month. Each makeover requires hands-on work from our team. We can't automate quality.",
    extraFields: [],
  },

  pixel: {
    contentName: 'Free Google Makeover Signup',
    contentCategory: 'Lead Magnet A',
  },

  success: {
    headline: "You're In!",
    message:
      "We'll start your Google makeover today. Check your text messages for next steps on adding us as a manager to your listing.",
    steps: [
      'We text you instructions to add us as a GBP manager (30 seconds)',
      'We optimize your entire Google listing within a few hours',
      'Every unanswered review gets a professional response',
      'You get a full results report + competitor comparison',
    ],
  },

  whyFree: {
    question: "'Why would you do this for free?'",
    answer:
      "Because we want to show you what real marketing looks like — not what agencies tell you it looks like. We run an AI marketing platform for laundromats. The best way for you to understand what we do is to experience it. Once you see your own results, everything else makes sense. No pitch needed.",
  },

  comparison: {
    header: 'Your competitor is already doing this.',
    sub: "Here's what the laundromat down the street looks like vs. the average owner who hasn't touched their Google page.",
    cards: [
      {
        title: 'Your Competitor',
        borderColor: '#DC2626',
        bgColor: '#FEF2F2',
        items: ['147 reviews', '4.7★ rating', '45 photos', 'Running Google Ads'],
      },
      {
        title: 'Average Laundromat',
        borderColor: '#D1D5DB',
        bgColor: '#F9FAFB',
        items: ['12 reviews', '3.8★ rating', '2 photos', 'No ads, no strategy'],
      },
      {
        title: 'You After Today',
        borderColor: '#67B7D1',
        bgColor: 'rgba(103, 183, 209, 0.08)',
        items: ['23 reviews (same)', '3.8★ (same)', '14+ photos', '96% optimized + all reviews responded'],
        highlight: true,
      },
    ],
  },

  faq: {
    items: [
      {
        question: "Is this really free? What's the catch?",
        answer:
          "There is no catch. We're building an AI marketing platform for laundromats. The best way for you to see what we can do is to experience it firsthand. We do the work for free — if you love the results and want to continue, we offer an ongoing service for $500/mo. If not, you keep everything we built. Nothing to cancel, no credit card required.",
      },
      {
        question: 'What do I have to do?',
        answer:
          "About 2.5 minutes of total work. Fill out this form (2 min) and add us as a manager on your Google Business listing (30 sec). That's it. We handle everything else.",
      },
      {
        question: 'How fast is it done?',
        answer:
          'Same day. Once you give us access, we typically have everything done within a few hours.',
      },
      {
        question: 'Do you need access to my customer data?',
        answer:
          "No. We only need manager access to your Google Business Profile. We don't ask for customer phone numbers, POS access, or any private business data.",
      },
      {
        question: 'What happens after the makeover?',
        answer:
          "You keep everything — the optimized listing, the review responses, the competitor report. It's all yours. If you want us to continue managing your Google presence and growing your visibility, we offer an ongoing service for $500/mo. If not, no hard feelings. You walk away with a better Google page than you started with.",
      },
    ],
  },

  finalCta: {
    headline: 'Your Google page is either helping you or hurting you.',
    sub: "Every day your listing sits unoptimized, your competitor gets further ahead. Let us fix it — for free.",
    ctaText: 'Get My Free Google Makeover →',
    belowCta: 'Only 10 spots per month. No credit card required.',
  },
};

export const auditConfig: LeadMagnetConfig = {
  pageId: 'free-audit',
  formspreeId: 'xvgkjqwz', // TODO: Replace with actual Formspree form ID

  seo: {
    title: 'Free Marketing Audit for Laundromats | WorkBuddy',
    description:
      "Is your marketing agency worth $2,000/mo? We'll audit your laundromat's entire marketing presence for free. See what's working and where you're losing money.",
    canonicalPath: '/free-audit',
  },

  hero: {
    badge: 'FOR LAUNDROMAT OWNERS PAYING FOR MARKETING',
    headline: 'Is Your Marketing Agency Worth ',
    highlightText: '$2,000/mo',
    highlightColor: '#DC2626',
    headlineSuffix: '?',
    subHeadline:
      "We'll audit your laundromat's entire marketing presence for free. You'll see exactly what your agency is doing, what they're not, and where you're losing money.",
    socialProof: {
      starsText: 'Avg 37% wasted ad spend found',
      scarcityText: 'Only <strong>%n audits available</strong> this month',
      scarcityNumber: '5',
    },
  },

  beforeAfter: {
    before: {
      title: "What You're Paying",
      tintColor: '#DC2626',
      items: [
        { label: 'Cost', value: '$2,000/mo agency' },
        { label: 'Reports', value: 'PDFs with vanity metrics' },
        { label: 'ROI Proof', value: 'None' },
      ],
      progressValue: 30,
      progressLabel: 'ROI visibility',
    },
    after: {
      title: 'What You Could Get',
      tintColor: '#67B7D1',
      items: [
        { label: 'Cost', value: '$500–1,000/mo all-in' },
        { label: 'Reports', value: 'Real data, proven results' },
        { label: 'ROI Proof', value: 'Foot traffic + conversions' },
      ],
      progressValue: 95,
      progressLabel: 'ROI visibility',
    },
    footnote: 'Based on average agency vs. WorkBuddy client comparison',
  },

  benefits: {
    header: 'What you get (free):',
    items: [
      {
        title: 'Full marketing audit across Google, Ads, Reviews, Social',
        description:
          "We analyze everything your agency touches and show you what's actually working.",
      },
      {
        title: 'AI visibility report — how you appear in ChatGPT, Claude, Perplexity',
        description:
          "This is something no agency is doing yet. You'll be surprised.",
      },
      {
        title: 'Head-to-head competitor comparison on 15 dimensions',
        description:
          "See exactly where you're winning, losing, and being ignored.",
      },
      {
        title: 'We fix the #1 gap for free',
        description:
          'Whatever the biggest problem is, we fix it during the audit at no cost.',
      },
      {
        title: 'Honest assessment — no sales pitch',
        description:
          "If your agency is doing a great job, we'll tell you. We'd rather earn your trust than waste your time.",
      },
    ],
  },

  howItWorks: {
    steps: [
      { title: 'You fill out this form', time: '2 min' },
      { title: 'We analyze your marketing presence', time: '24-48 hours' },
      { title: 'You get a full audit report', time: 'Free' },
      { title: 'We fix the #1 problem', time: 'Also free' },
    ],
  },

  form: {
    greenLabel: 'Free Marketing Audit',
    headline: 'See what your agency is actually doing for your money',
    ctaText: 'Get My Free Marketing Audit →',
    belowCta: 'No credit card. No obligation. Audit delivered within 48 hours.',
    trustBadges: 'Built for Laundromats · 100% Free · No Strings Attached',
    scarcityCallout:
      'Limited to 5 audits per month. Each audit requires detailed manual analysis from our team.',
    extraFields: [
      {
        name: 'monthlySpend',
        label: 'Current monthly marketing spend (approximate)',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select...' },
          { value: '$0', label: '$0' },
          { value: '$500-1,000', label: '$500–$1,000' },
          { value: '$1,000-2,000', label: '$1,000–$2,000' },
          { value: '$2,000-3,000', label: '$2,000–$3,000' },
          { value: '$3,000+', label: '$3,000+' },
        ],
      },
      {
        name: 'agencyName',
        label: 'Current marketing agency name',
        type: 'text',
        placeholder: 'Agency name',
        required: false,
        optional: true,
      },
    ],
  },

  pixel: {
    contentName: 'Free Marketing Audit Signup',
    contentCategory: 'Lead Magnet B',
  },

  success: {
    headline: "You're In!",
    message:
      "We'll start your marketing audit within 48 hours. Check your email for a detailed report and your free fix.",
    steps: [
      'We analyze your Google, Ads, Reviews, and Social presence (24-48 hours)',
      'You receive a full audit report with competitor comparisons',
      'We identify and fix the #1 gap in your marketing — for free',
      "You decide if you want to continue with WorkBuddy or keep the audit and walk away",
    ],
  },

  whyFree: {
    question: "'Why would you do this for free?'",
    answer:
      "Because the best way to show you we're better than your agency is to let you see it side by side. We'll audit your current marketing and fix the biggest gap — for free. If you see the difference and want to switch, we're here. If not, you walk away with a free audit and a free fix. Either way, you win.",
  },

  comparison: {
    header: 'What agencies charge vs. what we charge.',
    sub: "Here's the math. Same work, fraction of the cost.",
    cards: [],
    isTable: true,
    tableData: {
      headers: ['', 'Typical Agency', 'WorkBuddy'],
      rows: [
        { feature: 'Monthly Cost', values: ['$2,000–3,000/mo', '$500–1,000/mo'] },
        { feature: 'Google Ads Management', values: ['Extra cost', 'Included'] },
        { feature: 'Google Business Profile', values: ['Basic setup', 'Full optimization'] },
        { feature: 'Review Management', values: ['Manual / limited', 'AI-automated'] },
        { feature: 'Social Media', values: ['Extra cost', 'Included'] },
        { feature: 'Reporting', values: ['Monthly PDF', 'Real-time dashboard'] },
        { feature: 'AI Optimization', values: ['❌', '✅'] },
        { feature: 'Foot Traffic Tracking', values: ['❌', '✅'] },
      ],
    },
  },

  faq: {
    items: [
      {
        question: 'Is this really free?',
        answer:
          "Yes. We know you're probably skeptical — agencies have a way of making promises and not delivering. This audit is 100% free. We do it because the best way to earn your trust is to show you real results, not make promises. If the audit reveals opportunities, we'll explain how we can help. If your agency is doing a great job, we'll tell you that too.",
      },
      {
        question: 'Will my current agency know?',
        answer:
          "No. This is between you and us. We analyze publicly available data — your Google listing, ads, reviews, website. Your agency won't be notified in any way.",
      },
      {
        question: 'What if my agency is doing a good job?',
        answer:
          "Then we'll tell you. And you'll have a detailed audit confirming it — which is valuable in itself. Not every agency is bad. If yours is good, you'll have data to back that up.",
      },
      {
        question: 'What happens after the audit?',
        answer:
          "You get a full report plus one free fix. If you want us to take over your marketing for $500–1,000/mo, we can get started in 48 hours. If not, the audit and fix are yours to keep. No pressure, no follow-up calls.",
      },
      {
        question: 'How is WorkBuddy different from a normal agency?',
        answer:
          "We use AI to do everything agencies charge humans to do. Same work, fraction of the cost, with better data. And we prove results with actual foot traffic and conversion data — not PDFs with vanity metrics.",
      },
    ],
  },

  finalCta: {
    headline: "You deserve to know what you're paying for.",
    sub: "If your agency is great, you'll have proof. If they're not, you'll have a plan. Either way, you win.",
    ctaText: 'Get My Free Marketing Audit →',
    belowCta: 'Only 5 audits per month. No credit card required.',
  },
};
