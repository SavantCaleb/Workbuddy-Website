export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  optional?: boolean;
}

export interface BeforeAfterItem {
  label: string;
  value: string;
}

export interface ComparisonCard {
  title: string;
  borderColor: string;
  bgColor: string;
  items: string[];
  highlight?: boolean;
}

export interface LeadMagnetConfig {
  pageId: 'free-makeover' | 'free-audit';
  formspreeId: string;

  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };

  hero: {
    badge: string;
    headline: string;
    highlightText: string;
    highlightColor: string;
    headlineSuffix: string;
    subHeadline: string;
    socialProof: {
      starsText: string;
      scarcityText: string;
      scarcityNumber: string;
    };
  };

  beforeAfter: {
    before: {
      title: string;
      tintColor: string;
      items: BeforeAfterItem[];
      progressValue: number;
      progressLabel: string;
    };
    after: {
      title: string;
      tintColor: string;
      items: BeforeAfterItem[];
      progressValue: number;
      progressLabel: string;
    };
    footnote: string;
  };

  benefits: {
    header: string;
    items: { title: string; description: string }[];
  };

  howItWorks: {
    steps: { title: string; time: string }[];
  };

  form: {
    greenLabel: string;
    headline: string;
    ctaText: string;
    belowCta: string;
    trustBadges: string;
    scarcityCallout: string;
    extraFields: FormFieldConfig[];
  };

  pixel: {
    contentName: string;
    contentCategory: string;
  };

  success: {
    headline: string;
    message: string;
    steps: string[];
  };

  whyFree: {
    question: string;
    answer: string;
  };

  comparison: {
    header: string;
    sub: string;
    cards: ComparisonCard[];
    isTable?: boolean;
    tableData?: {
      headers: string[];
      rows: { feature: string; values: string[] }[];
    };
  };

  faq: {
    items: { question: string; answer: string }[];
  };

  finalCta: {
    headline: string;
    sub: string;
    ctaText: string;
    belowCta: string;
  };
}
