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
  "description": "AI-powered phone receptionist for laundromats and property management.",
  "founder": {
    "@type": "Person",
    "name": "Caleb Benedict"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-203-605-1105",
    "contactType": "sales",
    "email": "hello@getworkbuddy.com"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WorkBuddy",
  "url": "https://getworkbuddy.com",
  "description": "AI-powered phone receptionist for laundromats and property management."
};

const laundromatStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WorkBuddy for Laundromats",
  "description": "AI Receptionist built specifically for laundromats. Handles refunds, WDF orders, emergencies, and more.",
  "brand": {
    "@type": "Brand",
    "name": "WorkBuddy"
  },
  "offers": {
    "@type": "Offer",
    "price": "129.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
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
        title="AI Receptionist for Laundromats - Never Miss a Call"
        description="Never miss a laundromat call again. WorkBuddy handles refunds, WDF orders, machine questions, and emergencies 24/7. Built by the creator of Bella AI. From $129/mo."
        canonical="/"
        keywords="laundromat AI, AI receptionist, laundromat phone, laundromat answering service, AI phone answering, laundromat automation"
        structuredData={[laundromatStructuredData, organizationSchema, websiteSchema]}
      />

      <Navbar />
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
      <LPFooter />
      <StickyMobileCTA onScrollToForm={scrollToForm} formInView={formInView} />
    </>
  );
};
