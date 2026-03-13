import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import type { LeadMagnetConfig } from './types';
import { LMForm } from './LMForm';
import { ClientScrollStrip } from '../LaundromatAds/components/ClientScrollStrip';
import logo from '../../assets/logo.png';

// ─── Keyframes ────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

// ─── Page wrapper ─────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  background: white;
  font-family: ${theme.typography.fontFamily.body};
  color: ${theme.colors.text.primary};
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
`;

// ─── Nav ──────────────────────────────────────────────────────────────────
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  @media (min-width: 768px) {
    height: 64px;
    padding: 0 24px;
  }
`;

const NavInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

const LogoImg = styled.img`
  height: 32px;
  width: auto;
`;

const NavTagline = styled.span`
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  font-weight: 500;
  letter-spacing: -0.1px;
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

// ─── Hero — single column, centered (Hormozi Layout #3) ─────────────────
const HeroSection = styled.section`
  padding: 80px 20px 48px;
  background: linear-gradient(180deg, ${theme.colors.surface.primary} 0%, white 100%);

  @media (min-width: 640px) {
    padding: 100px 32px 56px;
  }
`;

const HeroInner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
`;

// ─── Badge ────────────────────────────────────────────────────────────────
const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    font-size: 13px;
    margin-bottom: 28px;
  }
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${theme.colors.brand.azure};
  border-radius: 50%;
  animation: ${pulseDot} 2s infinite;
  display: inline-block;
`;

// ─── Headline ─────────────────────────────────────────────────────────────
const Headline = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 36px;
  line-height: 1.08;
  color: ${theme.colors.brand.slate};
  margin-bottom: 16px;
  letter-spacing: -1px;

  @media (min-width: 480px) {
    font-size: 44px;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }

  @media (min-width: 640px) {
    font-size: 52px;
    letter-spacing: -2px;
    margin-bottom: 24px;
  }
`;

const HighlightSpan = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
`;

const SubHeadline = styled.p`
  font-size: 17px;
  line-height: 1.55;
  color: ${theme.colors.text.secondary};
  margin-bottom: 28px;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 19px;
    margin-bottom: 36px;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-weight: 600;
  }
`;

// ─── Before / After — the "value visual" ─────────────────────────────────
const BACard = styled.div`
  background: white;
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
  text-align: left;

  @media (min-width: 640px) {
    border-radius: 20px;
    margin-bottom: 40px;
  }
`;

const BAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BAHalf = styled.div`
  padding: 20px;

  @media (min-width: 480px) {
    padding: 24px;
    &:first-child {
      border-right: 1px solid ${theme.colors.neutral.gray200};
    }
  }

  @media (min-width: 640px) {
    padding: 28px;
  }

  & + & {
    border-top: 1px solid ${theme.colors.neutral.gray200};

    @media (min-width: 480px) {
      border-top: none;
    }
  }
`;

const BATitle = styled.div<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(p) => p.$color};
  margin-bottom: 14px;
`;

const BAItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 13px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 14px;
  }
`;

const BALabel = styled.span`
  color: ${theme.colors.text.tertiary};
`;

const BAValue = styled.span`
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const ProgressOuter = styled.div`
  width: 100%;
  height: 5px;
  background: ${theme.colors.surface.primary};
  border-radius: 3px;
  margin-top: 14px;
  overflow: hidden;
`;

const ProgressInner = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${(p) => p.$width}%;
  background: ${(p) => p.$color};
  border-radius: 3px;
  transition: width 1s ease;
`;

const BAProgressLabel = styled.div`
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  margin-top: 6px;
  font-weight: 500;
`;

const BAFootnote = styled.div`
  padding: 10px 24px;
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  background: ${theme.colors.surface.primary};
  letter-spacing: -0.1px;
`;

// ─── Form wrapper (centered in flow) ─────────────────────────────────────
const FormWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto 32px;

  @media (min-width: 640px) {
    margin-bottom: 40px;
  }
`;

// ─── Benefit bullets below form ──────────────────────────────────────────
const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  max-width: 480px;
  margin: 0 auto;
`;

const BulletItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 0;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  letter-spacing: -0.1px;
  line-height: 1.45;

  @media (min-width: 640px) {
    font-size: 15px;
    padding: 10px 0;
  }
`;

const BulletCheck = styled.span`
  flex-shrink: 0;
  color: ${theme.colors.brand.azure};
  font-size: 16px;
  margin-top: 1px;
`;

// ─── Social proof bar ────────────────────────────────────────────────────
const SocialProofBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 20px;
  align-items: center;
  margin-top: 24px;

  @media (min-width: 640px) {
    margin-top: 32px;
  }
`;

const ProofItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  letter-spacing: -0.1px;

  strong {
    color: ${theme.colors.text.secondary};
    font-weight: 600;
  }
`;

const Stars = styled.span`
  color: ${theme.colors.brand.gold};
  font-size: 14px;
`;

const PulseDot = styled.span`
  width: 7px;
  height: 7px;
  background: ${theme.colors.brand.azure};
  border-radius: 50%;
  display: inline-block;
  animation: ${pulseDot} 2s infinite;
`;

// ─── Content sections ────────────────────────────────────────────────────
const ContentArea = styled.section`
  padding: 56px 20px;

  @media (min-width: 640px) {
    padding: 80px 32px;
  }

  @media (min-width: 900px) {
    padding: 100px 40px;
  }
`;

const ContentInner = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const SectionLabel = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.brand.slate};
  line-height: 1.12;
  letter-spacing: -0.8px;
  margin-bottom: 14px;

  @media (min-width: 640px) {
    font-size: 36px;
    letter-spacing: -1.2px;
    margin-bottom: 18px;
  }
`;

const SectionSub = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.55;
  letter-spacing: -0.2px;
  margin-bottom: 32px;
  max-width: 600px;

  @media (min-width: 640px) {
    font-size: 17px;
    margin-bottom: 40px;
  }
`;

// ─── Full benefits section (below fold) ──────────────────────────────────
const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (min-width: 640px) {
    gap: 28px;
  }
`;

const Feature = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 2px;
`;

const FeatureTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.brand.slate};
  margin-bottom: 4px;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 17px;
    margin-bottom: 6px;
  }
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.55;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 15px;
    line-height: 1.6;
  }
`;

// ─── Steps ───────────────────────────────────────────────────────────────
const StepsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 640px) {
    padding: 20px 0;
  }
`;

const StepNumber = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: ${theme.colors.surface.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: ${theme.colors.brand.slate};
`;

const StepContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const StepTitle = styled.span`
  font-weight: 500;
  font-size: 15px;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const StepTime = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.brand.azure};
  white-space: nowrap;
`;

// ─── Why Free — dark slate section ───────────────────────────────────────
const WhyFreeSection = styled.section`
  background: ${theme.colors.brand.slate};
  padding: 64px 20px;

  @media (min-width: 640px) {
    padding: 80px 32px;
  }
`;

const WhyFreeInner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const WhyFreeQ = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 26px;
  color: white;
  margin-bottom: 20px;
  font-style: italic;
  letter-spacing: -0.5px;

  @media (min-width: 640px) {
    font-size: 34px;
    letter-spacing: -1px;
    margin-bottom: 24px;
  }
`;

const WhyFreeA = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 17px;
  }
`;

// ─── Comparison cards ────────────────────────────────────────────────────
const CompGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`;

const CompCard = styled.div<{ $borderColor: string; $bgColor: string; $highlight?: boolean }>`
  background: ${(p) => p.$bgColor};
  border: 1.5px solid ${(p) => p.$borderColor};
  border-radius: 14px;
  padding: 24px 20px;
  text-align: center;
  ${(p) => p.$highlight && `box-shadow: 0 8px 30px rgba(103, 183, 209, 0.15);`}

  @media (min-width: 640px) {
    border-radius: 16px;
    padding: 28px 20px;
  }
`;

const CompCardTitle = styled.div<{ $color: string }>`
  font-weight: 700;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CompCardItem = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.primary};
  padding: 7px 0;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  letter-spacing: -0.1px;

  &:last-child {
    border-bottom: none;
  }
`;

// ─── Table comparison (audit) ────────────────────────────────────────────
const CompTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: white;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${theme.colors.neutral.gray200};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  @media (min-width: 640px) {
    font-size: 15px;
    border-radius: 16px;
  }
`;

const CompTh = styled.th<{ $isLast?: boolean }>`
  padding: 14px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${(p) => (p.$isLast ? 'rgba(103, 183, 209, 0.08)' : theme.colors.surface.primary)};
  color: ${(p) => (p.$isLast ? theme.colors.brand.azure : theme.colors.text.tertiary)};
  border-bottom: 1px solid ${theme.colors.neutral.gray200};

  @media (min-width: 640px) {
    padding: 16px 20px;
    font-size: 12px;
  }
`;

const CompTd = styled.td<{ $isLast?: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  color: ${(p) => (p.$isLast ? theme.colors.brand.azure : theme.colors.text.primary)};
  font-weight: ${(p) => (p.$isLast ? 600 : 400)};
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    padding: 14px 20px;
  }
`;

const CompTdFeature = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    padding: 14px 20px;
  }
`;

// ─── FAQ ─────────────────────────────────────────────────────────────────
const FAQList = styled.div`
  background: white;
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  @media (min-width: 640px) {
    border-radius: 16px;
  }
`;

const FAQItemWrap = styled.div`
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  &:last-child { border-bottom: none; }
`;

const FAQButton = styled.button<{ $open: boolean }>`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: ${theme.typography.fontFamily.body};
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.2px;
  transition: background 0.15s;

  &:hover { background: ${theme.colors.surface.primary}; }

  @media (min-width: 640px) {
    padding: 20px 24px;
    font-size: 16px;
  }
`;

const FAQChevron = styled.span<{ $open: boolean }>`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  transition: transform 0.2s;
  transform: rotate(${(p) => (p.$open ? '180deg' : '0deg')});
  flex-shrink: 0;
`;

const FAQBody = styled.div<{ $open: boolean }>`
  max-height: ${(p) => (p.$open ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FAQText = styled.div`
  padding: 0 20px 18px;
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    padding: 0 24px 22px;
  }
`;

// ─── Final CTA ───────────────────────────────────────────────────────────
const FinalCTA = styled.section`
  background: ${theme.colors.surface.primary};
  padding: 56px 20px;
  text-align: center;

  @media (min-width: 640px) {
    padding: 80px 32px;
  }
`;

const CTAButton = styled.button`
  background: #E8742A;
  color: white;
  font-family: ${theme.typography.fontFamily.body};
  font-weight: 700;
  font-size: 16px;
  padding: 14px 32px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(232, 116, 42, 0.3);
  min-height: 48px;

  &:hover {
    background: #D4681F;
    box-shadow: 0 6px 20px rgba(232, 116, 42, 0.4);
  }

  &:active {
    transform: scale(0.985);
  }
`;

// ─── Footer ──────────────────────────────────────────────────────────────
const FooterSection = styled.footer`
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid ${theme.colors.neutral.gray200};
`;

// ─── FAQ Component ───────────────────────────────────────────────────────
function FAQAccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <FAQItemWrap>
      <FAQButton $open={open} onClick={() => setOpen(!open)}>
        {q}
        <FAQChevron $open={open}>▼</FAQChevron>
      </FAQButton>
      <FAQBody $open={open}>
        <FAQText>{a}</FAQText>
      </FAQBody>
    </FAQItemWrap>
  );
}

// ─── Main Page — Hormozi Layout #3 ───────────────────────────────────────
export function LeadMagnetPage({ config }: { config: LeadMagnetConfig }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((f) => {
      const v = params.get(f);
      if (v) sessionStorage.setItem(f, v);
    });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmitted = () => setSubmitted(true);

  // Pick first 3 benefits for the bullet points below the form
  const heroBullets = config.benefits.items.slice(0, 3);

  return (
    <PageWrapper>
      <Helmet>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <link rel="canonical" href={`https://getworkbuddy.com${config.seo.canonicalPath}`} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        <meta property="og:url" content={`https://getworkbuddy.com${config.seo.canonicalPath}`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── Nav ── */}
      <Nav>
        <NavInner>
          <LogoLink onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <LogoImg src={logo} alt="WorkBuddy" />
          </LogoLink>
          <NavTagline>AI Marketing for Laundromats</NavTagline>
        </NavInner>
      </Nav>

      {/* ── Hero: Layout #3 — single column, centered ── */}
      {/* Badge → Headline → Sub-head → Value visual → Form → Bullets */}
      <HeroSection>
        <HeroInner>
          {/* 1. ATTN AVATAR */}
          <HeroBadge>
            <BadgeDot />
            {config.hero.badge}
          </HeroBadge>

          {/* 2. Headline */}
          <Headline>
            {config.hero.headline}
            <HighlightSpan $color={config.hero.highlightColor}>{config.hero.highlightText}</HighlightSpan>
            {config.hero.headlineSuffix}
          </Headline>

          {/* 3. Sub-head */}
          <SubHeadline dangerouslySetInnerHTML={{ __html: config.hero.subHeadline }} />

          {/* 4. Value visual — Before/After card */}
          <BACard>
            <BAGrid>
              <BAHalf>
                <BATitle $color={config.beforeAfter.before.tintColor}>{config.beforeAfter.before.title}</BATitle>
                {config.beforeAfter.before.items.map((item, i) => (
                  <BAItemRow key={i}><BALabel>{item.label}</BALabel><BAValue>{item.value}</BAValue></BAItemRow>
                ))}
                <ProgressOuter>
                  <ProgressInner $width={config.beforeAfter.before.progressValue} $color={config.beforeAfter.before.tintColor} />
                </ProgressOuter>
                <BAProgressLabel>{config.beforeAfter.before.progressLabel}</BAProgressLabel>
              </BAHalf>
              <BAHalf>
                <BATitle $color={config.beforeAfter.after.tintColor}>{config.beforeAfter.after.title}</BATitle>
                {config.beforeAfter.after.items.map((item, i) => (
                  <BAItemRow key={i}><BALabel>{item.label}</BALabel><BAValue>{item.value}</BAValue></BAItemRow>
                ))}
                <ProgressOuter>
                  <ProgressInner $width={config.beforeAfter.after.progressValue} $color={config.beforeAfter.after.tintColor} />
                </ProgressOuter>
                <BAProgressLabel>{config.beforeAfter.after.progressLabel}</BAProgressLabel>
              </BAHalf>
            </BAGrid>
            <BAFootnote>{config.beforeAfter.footnote}</BAFootnote>
          </BACard>

          {/* 5 & 6. Form (email + submit) */}
          <FormWrapper ref={formRef}>
            <LMForm config={config} submitted={submitted} onSubmitted={handleSubmitted} />
          </FormWrapper>

          {/* 7. Bullet points below form */}
          <BulletList>
            {heroBullets.map((item, i) => (
              <BulletItem key={i}>
                <BulletCheck>✓</BulletCheck>
                <span><strong style={{ color: theme.colors.text.primary }}>{item.title}</strong> — {item.description}</span>
              </BulletItem>
            ))}
          </BulletList>

          {/* Social proof */}
          <SocialProofBar>
            <ProofItem>
              <Stars>★★★★★</Stars>
              {config.hero.socialProof.starsText}
            </ProofItem>
            <ProofItem>
              <PulseDot />
              <span dangerouslySetInnerHTML={{
                __html: config.hero.socialProof.scarcityText.replace(
                  '%n',
                  `<strong style="color:#DC2626">${config.hero.socialProof.scarcityNumber}</strong>`
                ),
              }} />
            </ProofItem>
          </SocialProofBar>
        </HeroInner>
      </HeroSection>

      {/* ── Client scroll strip ── */}
      <ClientScrollStrip />

      {/* ── Benefits (full list) ── */}
      <ContentArea>
        <ContentInner>
          <SectionLabel>{config.benefits.header}</SectionLabel>
          <SectionSub />
          <FeatureList>
            {config.benefits.items.map((item, i) => (
              <Feature key={i}>
                <FeatureIcon>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="11" fill="rgba(103,183,209,0.12)" />
                    <path d="M6.5 11L9.5 14L15.5 8" stroke={theme.colors.brand.azure} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </FeatureIcon>
                <div>
                  <FeatureTitle>{item.title}</FeatureTitle>
                  <FeatureDesc>{item.description}</FeatureDesc>
                </div>
              </Feature>
            ))}
          </FeatureList>
        </ContentInner>
      </ContentArea>

      {/* ── How it works ── */}
      <ContentArea style={{ background: theme.colors.surface.primary }}>
        <ContentInner>
          <SectionLabel>How it works</SectionLabel>
          <SectionSub>Your total time: about 2.5 minutes.</SectionSub>
          <StepsList>
            {config.howItWorks.steps.map((step, i) => (
              <StepItem key={i}>
                <StepNumber>{i + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepTime>{step.time}</StepTime>
                </StepContent>
              </StepItem>
            ))}
          </StepsList>
        </ContentInner>
      </ContentArea>

      {/* ── Why Free ── */}
      <WhyFreeSection>
        <WhyFreeInner>
          <WhyFreeQ>{config.whyFree.question}</WhyFreeQ>
          <WhyFreeA>{config.whyFree.answer}</WhyFreeA>
        </WhyFreeInner>
      </WhyFreeSection>

      {/* ── Comparison ── */}
      <ContentArea>
        <ContentInner>
          <SectionLabel>{config.comparison.header}</SectionLabel>
          <SectionSub>{config.comparison.sub}</SectionSub>

          {config.comparison.isTable && config.comparison.tableData ? (
            <div style={{ overflowX: 'auto' }}>
              <CompTable>
                <thead>
                  <tr>
                    {config.comparison.tableData.headers.map((h, i) => (
                      <CompTh key={i} $isLast={i === config.comparison.tableData!.headers.length - 1}>{h}</CompTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.comparison.tableData.rows.map((row, i) => (
                    <tr key={i}>
                      <CompTdFeature>{row.feature}</CompTdFeature>
                      {row.values.map((v, j) => (
                        <CompTd key={j} $isLast={j === row.values.length - 1}>{v}</CompTd>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </CompTable>
            </div>
          ) : (
            <CompGrid>
              {config.comparison.cards.map((card, i) => (
                <CompCard key={i} $borderColor={card.borderColor} $bgColor={card.bgColor} $highlight={card.highlight}>
                  <CompCardTitle $color={card.borderColor}>{card.title}</CompCardTitle>
                  {card.items.map((item, j) => (
                    <CompCardItem key={j}>{item}</CompCardItem>
                  ))}
                </CompCard>
              ))}
            </CompGrid>
          )}
        </ContentInner>
      </ContentArea>

      {/* ── FAQ ── */}
      <ContentArea style={{ background: theme.colors.surface.primary }}>
        <ContentInner>
          <SectionLabel>Common questions</SectionLabel>
          <SectionSub />
          <FAQList>
            {config.faq.items.map((item, i) => (
              <FAQAccordionItem key={i} q={item.question} a={item.answer} />
            ))}
          </FAQList>
        </ContentInner>
      </ContentArea>

      {/* ── Final CTA ── */}
      <FinalCTA>
        <ContentInner style={{ textAlign: 'center' }}>
          <SectionLabel style={{ marginBottom: 16 }}>{config.finalCta.headline}</SectionLabel>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: theme.colors.text.secondary,
            marginBottom: 32, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', letterSpacing: '-0.2px',
          }}>
            {config.finalCta.sub}
          </p>
          <CTAButton onClick={scrollToForm}>{config.finalCta.ctaText}</CTAButton>
          <p style={{ fontSize: 13, color: theme.colors.text.tertiary, marginTop: 14 }}>
            {config.finalCta.belowCta}
          </p>
        </ContentInner>
      </FinalCTA>

      {/* ── Footer ── */}
      <FooterSection>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <LogoImg src={logo} alt="WorkBuddy" style={{ height: 28 }} />
        </div>
        <p style={{ fontSize: 14, color: theme.colors.text.tertiary, marginBottom: 4 }}>AI Marketing for Laundromats</p>
        <p style={{ fontSize: 13, color: theme.colors.neutral.gray400 }}>getworkbuddy.com · caleb@getworkbuddy.com</p>
      </FooterSection>
    </PageWrapper>
  );
}
