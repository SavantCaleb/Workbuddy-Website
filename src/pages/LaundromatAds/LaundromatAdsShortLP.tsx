import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../../components/SEO/SEO';
import { LPHeader } from './components/LPHeader';
import { HeroSection } from './components/HeroSection';
import type { HeroSectionHandle } from './components/HeroSection';
import { LPFooter } from './components/LPFooter';
import { StickyMobileCTA } from './components/StickyMobileCTA';

export const LaundromatAdsShortLP = () => {
  const location = useLocation();
  const heroRef = useRef<HeroSectionHandle>(null);
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

  // Track submit button visibility for sticky CTA
  useEffect(() => {
    const submitBtn = document.getElementById('form-submit');
    if (!submitBtn) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(submitBtn);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = useCallback((e: React.MouseEvent) => {
    heroRef.current?.scrollToForm(e);
  }, []);

  return (
    <>
      <SEO
        title="Your Laundromat's Phone, Handled"
        description="WorkBuddy picks up your laundromat's phone — 24/7, in your voice, with your prices and hours — so you don't have to."
        canonical="/laundromat-ads-short"
        noindex
      />

      <LPHeader onScrollToForm={scrollToForm} formInView={formInView} />
      <HeroSection ref={heroRef} />
      <LPFooter />
      <StickyMobileCTA onScrollToForm={scrollToForm} formInView={formInView} />
    </>
  );
};
