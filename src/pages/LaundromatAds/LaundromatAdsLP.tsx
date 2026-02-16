import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SEO } from '../../components/SEO/SEO';
import { LPHeader } from './components/LPHeader';
import { HeroSection } from './components/HeroSection';
import type { HeroSectionHandle } from './components/HeroSection';
import { ClientScrollStrip } from './components/ClientScrollStrip';
import { ValueSection } from './components/ValueSection';
import { BottomCTA } from './components/BottomCTA';
import { LPFooter } from './components/LPFooter';
import { StickyMobileCTA } from './components/StickyMobileCTA';

const DesktopScrollStrip = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`;

export const LaundromatAdsLP = () => {
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

    // Track the submit button, not the form card — so sticky CTA shows
    // when form is visible but submit button is still below the fold
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
        title="Your Laundromat's Phone, Handled"
        description="WorkBuddy picks up your laundromat's phone — 24/7, in your voice, with your prices and hours — so you don't have to."
        canonical="/laundromat-ads"
        noindex={true}
      />

      <LPHeader onScrollToForm={scrollToForm} formInView={formInView} />
      <HeroSection ref={heroRef} />
      <DesktopScrollStrip>
        <ClientScrollStrip />
      </DesktopScrollStrip>
      <ValueSection />
      <BottomCTA ref={bottomCtaRef} onScrollToForm={scrollToForm} />
      <LPFooter />
      <StickyMobileCTA onScrollToForm={scrollToForm} formInView={formInView} />
    </>
  );
};
