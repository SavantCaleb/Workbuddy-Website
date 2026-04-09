import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { HeroSection } from '../LaundromatAds/components/HeroSection';
import type { HeroSectionHandle } from '../LaundromatAds/components/HeroSection';
import { ClientScrollStrip } from '../LaundromatAds/components/ClientScrollStrip';
import { ValueSection } from '../LaundromatAds/components/ValueSection';
import { BottomCTA } from '../LaundromatAds/components/BottomCTA';
import { LPFooter } from '../LaundromatAds/components/LPFooter';
import { StickyMobileCTA } from '../LaundromatAds/components/StickyMobileCTA';

import { ProductShowcaseSection } from './sections/ProductShowcaseSection';
import { GetStartedSection } from './sections/GetStartedSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FounderStorySection } from './sections/FounderStorySection';
import { ROISection } from './sections/ROISection';
import { PricingPreviewSection } from './sections/PricingPreviewSection';
import { FAQSection } from './sections/FAQSection';
import { NotForYouSection } from './sections/NotForYouSection';

const DesktopScrollStrip = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WorkBuddy",
  "url": "https://getworkbuddy.com",
  "logo": "https://getworkbuddy.com/favicon.png",
  "description": "WorkBuddy is the leading AI receptionist and virtual phone answering service built specifically for laundromats and dry cleaners. Our AI-powered phone automation handles refunds, wash-and-fold orders, machine questions, and emergencies 24/7 in 20+ languages including Spanish, Chinese, Korean, and Arabic.",
  "founder": {
    "@type": "Person",
    "name": "Caleb Benedict"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-860-477-9542",
      "contactType": "sales",
      "email": "hello@getworkbuddy.com",
      "availableLanguage": ["English", "Spanish", "Chinese", "Korean", "Arabic", "French", "Portuguese", "Vietnamese", "Hindi", "Tagalog"],
      "areaServed": ["US"],
      "contactOption": "HearingImpairedSupported"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-860-477-9542",
      "contactType": "customer service",
      "email": "hello@getworkbuddy.com",
      "availableLanguage": ["English", "Spanish"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  ],
  "sameAs": ["https://www.linkedin.com/company/getworkbuddy"],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "knowsAbout": [
    "AI phone answering for laundromats",
    "Virtual receptionist for laundromats",
    "Laundromat phone automation",
    "Multilingual laundromat phone service",
    "AI customer service for laundromats",
    "Automated laundromat customer service",
    "AI phone service for dry cleaners",
    "Laundromat management software",
    "Laundry business automation"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WorkBuddy",
  "url": "https://getworkbuddy.com",
  "description": "WorkBuddy provides AI receptionist and automated phone answering service for laundromats, dry cleaners, and laundry businesses. 24/7 phone coverage, multilingual support, and smart laundry automation software.",
  "publisher": {
    "@type": "Organization",
    "name": "WorkBuddy",
    "url": "https://getworkbuddy.com"
  }
};

const laundromatStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WorkBuddy AI Receptionist for Laundromats",
  "description": "AI-powered phone answering service and virtual receptionist built specifically for laundromats and dry cleaners. Handles refund requests, wash-and-fold order intake, machine status questions, emergency escalation, and customer service inquiries 24/7. Supports 20+ languages including Spanish, Chinese, Korean, and Arabic. Integrates with FasCard, Curbside, LaundryCard, and other laundromat payment systems.",
  "brand": {
    "@type": "Brand",
    "name": "WorkBuddy"
  },
  "category": "AI Receptionist Software",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "129.00",
    "highPrice": "529.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "offerCount": "2"
  },
  "image": "https://getworkbuddy.com/og-image.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Maria G." },
      "reviewBody": "We added WorkBuddy three months ago and our wash-and-fold orders went up 35%. The biggest change? Customers can text us now — half our new orders come through text messages. My customers have no idea it's not a real person.",
      "datePublished": "2026-01-15"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "James T." },
      "reviewBody": "I got a call from WorkBuddy at 3am because a pipe burst. By the time I got to the store, a customer had already followed WorkBuddy's instructions to shut off the water. That one call saved me $15,000 in damage easily.",
      "datePublished": "2026-01-20"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Diana R." },
      "reviewBody": "I used to spend my entire day on the phone. Machine questions, hours, refund requests — the same calls over and over. Now I check my dashboard once a day and only deal with the things that actually need me. I got my weekends back.",
      "datePublished": "2026-02-01"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Ray S." },
      "reviewBody": "We were losing 30+ calls a week to voicemail and I had no idea. People would call, get no answer, and just Google the next place. WorkBuddy showed me the logs and I couldn't believe it. Now every single call gets answered, our wash-and-fold bookings are up 40% in two months, and I'm not glued to my phone anymore.",
      "datePublished": "2026-01-10"
    }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Languages Supported", "value": "20+" },
    { "@type": "PropertyValue", "name": "Availability", "value": "24/7/365" },
    { "@type": "PropertyValue", "name": "Setup Time", "value": "15 minutes" },
    { "@type": "PropertyValue", "name": "Call Volume", "value": "Unlimited" }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Phone Answering Service for Laundromats",
  "alternateName": [
    "AI Receptionist for Laundromats",
    "Virtual Receptionist for Laundromats",
    "Automated Phone System for Laundromats",
    "AI Customer Service for Laundromats",
    "Laundromat Phone Automation",
    "AI Answering Service for Laundromats",
    "Voice AI for Laundromat Business",
    "Multilingual Laundromat Phone Service",
    "24/7 Phone Service for Laundromats",
    "AI Phone Service for Dry Cleaners"
  ],
  "description": "WorkBuddy is the best AI phone answering system for laundromats and dry cleaners. Our affordable AI receptionist provides 24/7 phone coverage, multilingual customer service in 20+ languages (Spanish, Chinese, Korean, Arabic), automated laundromat customer service, missed calls solution, after-hours phone service, and integrations with FasCard, Curbside, and LaundryCard payment systems. Reduce laundromat labor costs and increase revenue with AI automation.",
  "provider": {
    "@type": "Organization",
    "name": "WorkBuddy",
    "url": "https://getworkbuddy.com"
  },
  "serviceType": "AI Phone Answering Service",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "State", "name": "California" },
    { "@type": "State", "name": "Texas" },
    { "@type": "State", "name": "Florida" },
    { "@type": "City", "name": "Los Angeles" },
    { "@type": "City", "name": "New York" },
    { "@type": "City", "name": "Miami" },
    { "@type": "City", "name": "Houston" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Receptionist Plans for Laundromats",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Coin Op - AI Receptionist for Laundromats",
        "description": "24/7 AI phone answering for coin-op laundromats. Bilingual English/Spanish support, refund request logging, FAQ handling, unlimited inbound calls, after-hours coverage, and weekend phone coverage.",
        "price": "129.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Full Service - AI Receptionist for Laundromats",
        "description": "Complete AI phone automation for full-service laundromats and dry cleaners. Includes wash-and-fold order intake, pickup/delivery scheduling, SMS notifications, Curbside and CleanCloud integrations, FasCard phone integration, LaundryCard phone automation, and priority support.",
        "price": "199.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceType": "Phone",
    "availableLanguage": ["English", "Spanish", "Chinese", "Korean", "Arabic", "French", "Portuguese", "Vietnamese", "Hindi", "Tagalog", "Russian", "Japanese", "German", "Italian", "Polish", "Thai", "Urdu", "Bengali", "Haitian Creole", "Swahili"]
  },
  "termsOfService": "https://getworkbuddy.com/terms",
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WorkBuddy - Laundromat Management Software",
  "alternateName": [
    "WorkBuddy AI Laundromat Assistant",
    "Smart Laundry System",
    "Laundry Automation Software",
    "Laundromat AI Assistant",
    "Automated Laundromat Receptionist"
  ],
  "description": "AI-powered laundromat management software and phone automation platform. WorkBuddy is the intelligent phone system for laundromats that provides conversational AI, voice AI assistant capabilities, AI call handling, automated appointment scheduling, AI order taking, and cloud-based phone system functionality. The modern laundromat phone solution for reducing missed calls, improving customer satisfaction, and cutting operating costs.",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AI Phone Answering Service",
  "operatingSystem": "Cloud-based",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "129.00",
    "highPrice": "529.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "AI phone answering for laundromats",
    "24/7 automated phone system",
    "Multilingual support in 20+ languages",
    "Spanish speaking laundromat service",
    "Bilingual AI receptionist",
    "Wash-and-fold order intake",
    "Refund request processing",
    "Emergency escalation",
    "FasCard phone integration",
    "Curbside laundromat AI integration",
    "LaundryCard phone automation",
    "Cloud-based laundromat phone system",
    "VoIP laundromat system",
    "AI call handling for laundromats",
    "Automated appointment scheduling",
    "Laundromat booking automation",
    "AI order taking",
    "Virtual call center for laundromats",
    "Communication automation",
    "Mobile laundry app phone integration"
  ],
  "screenshot": "https://getworkbuddy.com/og-image.png",
  "url": "https://getworkbuddy.com"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://getworkbuddy.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Receptionist for Laundromats",
      "item": "https://getworkbuddy.com/"
    }
  ]
};

const faqSchemaHome = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best AI phone answering service for laundromats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WorkBuddy is the leading AI phone answering service built specifically for laundromats. Starting at $129/mo with unlimited calls, 24/7 coverage, multilingual support in 20+ languages, and integrations with FasCard, Curbside, and LaundryCard payment systems."
      }
    },
    {
      "@type": "Question",
      "name": "How much does an AI receptionist for laundromats cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WorkBuddy's AI receptionist for laundromats starts at $129/mo for coin-op locations and $199/mo for full-service laundromats. All plans include unlimited calls, 24/7 coverage, and bilingual English/Spanish support. No per-minute charges or hidden fees."
      }
    },
    {
      "@type": "Question",
      "name": "Does WorkBuddy support multiple languages for laundromat customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, WorkBuddy supports 20+ languages including Spanish, Chinese, Korean, Arabic, Vietnamese, Hindi, Tagalog, and more. This makes it ideal for laundromats in diverse communities like Los Angeles, New York, Miami, and Houston."
      }
    },
    {
      "@type": "Question",
      "name": "Can WorkBuddy integrate with my laundromat payment system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, WorkBuddy integrates with popular laundromat payment systems including FasCard, Curbside Laundries, LaundryCard, CleanCloud, and Cents POS. This allows seamless order taking, status updates, and payment system phone integration."
      }
    },
    {
      "@type": "Question",
      "name": "How does AI phone answering compare to human answering services for laundromats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI phone answering services like WorkBuddy offer significant advantages over human answering services for laundromats: 24/7 availability with no missed calls, consistent multilingual support, lower cost ($129/mo vs $500+/mo for human services), instant response times, and industry-specific knowledge about refunds, WDF orders, and machine issues."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up AI Phone Answering for Your Laundromat",
  "description": "Get your laundromat AI receptionist live in 48 hours. WorkBuddy handles the entire setup process for automated phone answering, from learning your business to connecting your systems.",
  "totalTime": "PT48H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "129"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "We learn your business",
      "text": "We review your website, talk with you or send an onboarding form, and learn everything — hours, pricing, machines, wash-and-fold rates, refund policies, emergency procedures.",
      "url": "https://getworkbuddy.com/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "We build your AI receptionist",
      "text": "We train a custom AI receptionist on your specific laundromat. It knows your business as well as your best employee — because we taught it everything you told us.",
      "url": "https://getworkbuddy.com/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "We connect your systems",
      "text": "WorkBuddy plugs into your existing tools like Curbside, CleanCloud, FasCard, and LaundryCard to place orders, look up customers, and process refunds automatically.",
      "url": "https://getworkbuddy.com/#how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "You test, we refine, you go live",
      "text": "Call your own number and try every scenario. We tweak until it's perfect. When you're ready, forward your calls — that's it. Most owners are live within 48 hours.",
      "url": "https://getworkbuddy.com/#how-it-works"
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AI Receptionist for Laundromats | WorkBuddy",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "#hero [aria-label]", "#features [aria-label]", "#pricing [aria-label]"]
  },
  "mainEntity": {
    "@type": "Service",
    "name": "WorkBuddy AI Receptionist for Laundromats",
    "description": "WorkBuddy is an AI-powered phone answering service for laundromats and dry cleaners that handles calls 24/7 in 20+ languages, takes wash-and-fold orders, processes refund requests, and integrates with FasCard, Curbside, and LaundryCard. From $129/mo with unlimited calls."
  }
};

export const LaundromatLP = () => {
  const location = useLocation();
  const heroRef = useRef<HeroSectionHandle>(null);
  const bottomCtaRef = useRef<HTMLElement>(null);
  const [formInView, setFormInView] = useState(true);

  // UTM tracking
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'];
    utmFields.forEach(field => {
      const value = params.get(field);
      if (value) sessionStorage.setItem(field, value);
    });
  }, [location]);

  // Track form + bottom CTA visibility for sticky bar
  useEffect(() => {
    const visibleElements = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleElements.add(entry.target);
          } else {
            visibleElements.delete(entry.target);
          }
        });
        setFormInView(visibleElements.size > 0);
      },
      { threshold: 0 }
    );

    const formEl = document.getElementById('form-submit');
    if (formEl) observer.observe(formEl);
    if (bottomCtaRef.current) observer.observe(bottomCtaRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToForm = useCallback((e: React.MouseEvent) => {
    heroRef.current?.scrollToForm(e);
  }, []);

  return (
    <>
      <SEO
        title="AI Receptionist for Laundromats | 24/7 Phone Answering"
        description="AI receptionist for laundromats & dry cleaners. 24/7 phone answering, multilingual support in 20+ languages, automated refunds, WDF orders & missed calls solution. From $129/mo."
        canonical="/"
        keywords="AI phone answering for laundromats, AI receptionist for laundromats, virtual receptionist laundromat, 24/7 phone service laundromat, automated phone system laundromat, AI customer service laundromat, voice AI for laundromat business, laundromat phone automation, AI answering service laundromat, multilingual laundromat phone service, Spanish speaking laundromat service, bilingual AI receptionist laundromat, after hours laundromat phone service, laundromat missed calls solution, never miss calls laundromat, AI automation laundromat, automated laundromat customer service, smart laundry system, laundry automation software, AI laundry business, laundromat AI assistant, automated laundromat receptionist, AI employee for laundromat, laundromat management software, laundry business automation, laundromat customer service automation, AI phone service for dry cleaners, virtual receptionist dry cleaner, 24/7 dry cleaner phone coverage, automated dry cleaner phone system, best AI phone system for laundromats, AI phone answering service cost, affordable AI receptionist laundromat, laundromat phone service pricing, AI vs human answering service laundromat, FasCard phone integration, Curbside laundromat AI integration, LaundryCard phone automation, laundromat payment system phone integration"
        structuredData={[laundromatStructuredData, organizationSchema, websiteSchema, serviceSchema, softwareSchema, breadcrumbSchema, faqSchemaHome, howToSchema, speakableSchema]}
      />

      <Navbar />
      <main itemScope itemType="https://schema.org/Service">
      <meta itemProp="name" content="WorkBuddy AI Receptionist for Laundromats" />
      <meta itemProp="description" content="AI-powered phone answering service for laundromats and dry cleaners. 24/7 coverage, multilingual support, automated refunds and WDF orders." />
      <meta itemProp="serviceType" content="AI Phone Answering Service" />

      <HeroSection
        ref={heroRef}
        formspreeId="xreepdpa"
        thankYouPath="/laundromats/thank-you"
      />
      <DesktopScrollStrip>
        <ClientScrollStrip />
      </DesktopScrollStrip>

      {/* What it does + proof (from ads page) */}
      <ValueSection />

      {/* Deep product showcase with animated call feed */}
      <ProductShowcaseSection onScrollToForm={scrollToForm} />

      {/* How easy it is to start */}
      <GetStartedSection onScrollToForm={scrollToForm} />

      {/* Other owners love it */}
      <TestimonialsSection />

      {/* The person behind it */}
      <FounderStorySection />

      {/* It's worth the money */}
      <ROISection onScrollToForm={scrollToForm} />

      {/* Final qualifier */}
      <NotForYouSection onScrollToForm={scrollToForm} />

      {/* What it costs */}
      <PricingPreviewSection />

      {/* Remaining concerns */}
      <FAQSection />

      <BottomCTA ref={bottomCtaRef} onScrollToForm={scrollToForm} />
      </main>
      <LPFooter />
      <StickyMobileCTA onScrollToForm={scrollToForm} formInView={formInView} />
    </>
  );
};
