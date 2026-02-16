import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext } from './primitives';

/* ── Graduated pricing ── */

const locationPricing: Record<number, { coinOp: number | null; pro: number | null }> = {
  1: { coinOp: 129, pro: 199 },
  2: { coinOp: 199, pro: 249 },
  3: { coinOp: 249, pro: 299 },
  4: { coinOp: 299, pro: 349 },
  5: { coinOp: 349, pro: 399 },
  6: { coinOp: 399, pro: 449 },
  7: { coinOp: 429, pro: 489 },
  8: { coinOp: 459, pro: 529 },
  9: { coinOp: 489, pro: 569 },
  10: { coinOp: null, pro: null },
};

/* ── Layout ── */

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  @media (min-width: 640px) { margin-bottom: 56px; }
`;

/* ── Location picker ── */

const LocationPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 48px;
  @media (min-width: 640px) { margin-bottom: 56px; }
`;

const PickerLabel = styled.span`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  letter-spacing: -0.2px;
`;

const PickerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const PickerBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.neutral.gray200};
  background: white;
  color: ${theme.colors.brand.slate};
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { border-color: ${theme.colors.brand.azure}; color: ${theme.colors.brand.azure}; }
  &:active { transform: scale(0.94); }
  &:disabled {
    opacity: 0.25;
    cursor: default;
    &:hover { border-color: ${theme.colors.neutral.gray200}; color: ${theme.colors.brand.slate}; }
  }
`;

const PickerValue = styled.span`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 22px;
  color: ${theme.colors.brand.slate};
  min-width: 40px;
  text-align: center;
  letter-spacing: -0.5px;
`;

/* ── Cards ── */

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 780px;
  margin: 0 auto;
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const Card = styled.div<{ $featured?: boolean }>`
  background: ${p => (p.$featured ? theme.colors.brand.azure : theme.colors.brand.slate)};
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: ${p => (p.$featured
    ? '0 12px 48px rgba(103, 183, 209, 0.2)'
    : '0 4px 24px rgba(50, 74, 95, 0.12)')};
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: ${p => (p.$featured
      ? '0 16px 56px rgba(103, 183, 209, 0.28)'
      : '0 8px 36px rgba(50, 74, 95, 0.18)')};
    transform: translateY(-2px);
  }
`;

const CardInner = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 640px) {
    padding: 40px 36px;
  }
`;

const PlanName = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.6;
  margin-bottom: 20px;
`;

const PriceRow = styled.div`
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 52px;
  letter-spacing: -2.5px;
  line-height: 1;
  @media (min-width: 640px) {
    font-size: 60px;
    letter-spacing: -3px;
  }
`;

const Period = styled.span`
  font-size: 17px;
  font-weight: 400;
  opacity: 0.5;
  letter-spacing: 0;
`;

const PlanTagline = styled.div`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.4;
  letter-spacing: -0.1px;
  margin-bottom: 32px;

  @media (min-width: 640px) {
    font-size: 16px;
    margin-bottom: 36px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 28px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Feature = styled.li`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14.5px;
  line-height: 1.4;
  letter-spacing: -0.1px;
  opacity: 0.85;
  svg { flex-shrink: 0; margin-top: 1px; }
`;


const CTAWrap = styled.div`
  margin-top: auto;
  padding-top: 32px;

  @media (min-width: 640px) {
    padding-top: 36px;
  }
`;

const CTAButton = styled.a`
  display: block;
  text-align: center;
  padding: 13px 24px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 980px;
  text-decoration: none;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.02);
  }

  &:active { transform: scale(0.98); }

  @media (min-width: 640px) {
    font-size: 15px;
    padding: 14px 28px;
  }
`;

/* ── Footer ── */

const FooterRow = styled.div`
  text-align: center;
  margin-top: 40px;
  @media (min-width: 640px) { margin-top: 48px; }
`;

const FooterNote = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  letter-spacing: -0.1px;
`;

/* ── Check icon (white, for dark bg) ── */

const CheckIcon = ({ dim }: { dim?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M4.5 9.5L7.5 12.5L13.5 5.5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={dim ? 0.4 : 0.7}
    />
  </svg>
);

/* ── Data ── */

const COIN_OP_FEATURES = [
  'Unlimited inbound calls',
  '24/7 AI answering',
  'Bilingual (English + Spanish)',
  'FAQ & hours handling',
  'Refund request logging',
  'Emergency escalation',
  'Email & SMS notifications',
];

const PRO_FEATURES = [
  'Everything in Basic, plus:',
  'WDF order intake',
  'Pickup & delivery scheduling',
  'Automatic refunds',
  'POS integrations (Curbside, CleanCloud)',
  'Card reader integrations (FasCard, LaundryCard)',
  'Priority support',
];

const FORM_URL = '#form';

/* ── Component ── */

export const PricingPreviewSection = () => {
  const [locationCount, setLocationCount] = useState(1);

  const pricing = locationPricing[locationCount] || locationPricing[10];
  const isCustom = locationCount >= 10;

  return (
    <LPSection $alt>
      <LPInner>
        <Header>
          <LPHeadline style={{ textAlign: 'center' }}>
            Simple pricing that scales with you
          </LPHeadline>
          <LPSubtext style={{ textAlign: 'center', maxWidth: 460, margin: '0 auto' }}>
            Every plan includes unlimited calls, 24/7 coverage, and bilingual support. No per-minute fees. No surprises.
          </LPSubtext>
        </Header>

        <LocationPicker>
          <PickerLabel>Locations</PickerLabel>
          <PickerControls>
            <PickerBtn
              disabled={locationCount <= 1}
              onClick={() => setLocationCount(c => Math.max(1, c - 1))}
              aria-label="Decrease"
            >
              &minus;
            </PickerBtn>
            <PickerValue>{locationCount >= 10 ? '10+' : locationCount}</PickerValue>
            <PickerBtn
              disabled={locationCount >= 10}
              onClick={() => setLocationCount(c => Math.min(10, c + 1))}
              aria-label="Increase"
            >
              +
            </PickerBtn>
          </PickerControls>
        </LocationPicker>

        <CardGrid>
          <Card>
            <CardInner>
              <PlanName>Basic</PlanName>
              <PriceRow>
                <Price>{isCustom ? 'Custom' : `$${pricing.coinOp}`}</Price>
                {!isCustom && <Period>/mo</Period>}
              </PriceRow>
              <PlanTagline>
                Your customers call around the clock. Now every one of them gets an answer. Built for self-serve laundromats.
              </PlanTagline>
              <Divider />
              <FeatureList>
                {COIN_OP_FEATURES.map((f, i) => (
                  <Feature key={i}>
                    <CheckIcon dim />
                    {f}
                  </Feature>
                ))}
              </FeatureList>
              <CTAWrap>
                <CTAButton href={FORM_URL}>Try for Free &rarr;</CTAButton>
              </CTAWrap>
            </CardInner>
          </Card>

          <Card $featured>
            <CardInner>
              <PlanName>Pro</PlanName>
              <PriceRow>
                <Price>{isCustom ? 'Custom' : `$${pricing.pro}`}</Price>
                {!isCustom && <Period>/mo</Period>}
              </PriceRow>
              <PlanTagline>
                Calls answered. Orders taken. Systems connected. Everything working together, automatically. Built for wash-and-fold and full service.
              </PlanTagline>
              <Divider />
              <FeatureList>
                {PRO_FEATURES.map((f, i) => (
                  <Feature key={i}>
                    <CheckIcon />
                    {f}
                  </Feature>
                ))}
              </FeatureList>
              <CTAWrap>
                <CTAButton href={FORM_URL}>Try for Free &rarr;</CTAButton>
              </CTAWrap>
            </CardInner>
          </Card>
        </CardGrid>

        <FooterRow>
          <FooterNote>
            30-day money-back guarantee. Pay annually, save 2 months.
          </FooterNote>
        </FooterRow>
      </LPInner>
    </LPSection>
  );
};
