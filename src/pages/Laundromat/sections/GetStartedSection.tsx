import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext } from './primitives';

const DURATION = 5000;

/* ── Keyframes ── */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

/* ── Section chrome ── */

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;

  @media (min-width: 640px) {
    margin-bottom: 56px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: start;
  }
`;

/* ── Accordion (left column) ── */

const AccordionCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccItem = styled.div<{ $active: boolean }>`
  padding: 16px 0 16px 20px;
  border-left: 3px solid ${p => (p.$active ? theme.colors.brand.azure : theme.colors.neutral.gray200)};
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    background: ${p => (p.$active ? 'transparent' : 'rgba(103, 183, 209, 0.03)')};
  }

  @media (min-width: 640px) {
    padding: 20px 0 20px 24px;
  }
`;

const AccHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const AccNum = styled.span<{ $active: boolean }>`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 20px;
  color: ${p => (p.$active ? theme.colors.brand.azure : theme.colors.text.tertiary)};
  transition: color 0.3s;
  flex-shrink: 0;
  width: 28px;

  @media (min-width: 640px) {
    font-size: 22px;
  }
`;

const AccTitle = styled.span<{ $active: boolean }>`
  font-size: 15px;
  font-weight: ${p => (p.$active ? 600 : 500)};
  color: ${p => (p.$active ? theme.colors.brand.slate : theme.colors.text.secondary)};
  transition: color 0.3s;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

/* ── Accordion expand / collapse ── */

const AccExpandable = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${p => (p.$open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const AccExpandInner = styled.div`
  overflow: hidden;
`;

const AccBody = styled.div`
  padding: 10px 0 4px 42px;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;

  @media (min-width: 640px) {
    font-size: 15px;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileIntegrations = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0 2px 42px;

  @media (min-width: 900px) {
    display: none;
  }
`;

/* ── Progress bar ── */

const BarTrack = styled.div`
  height: 2px;
  background: ${theme.colors.neutral.gray200};
  border-radius: 2px;
  margin: 14px 0 0 42px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background: ${theme.colors.brand.azure};
  border-radius: 2px;
  animation: ${fillBar} ${DURATION}ms linear forwards;
`;

/* ── Content panel (right column, desktop only) ── */

const ContentCol = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: flex;
    align-items: center;
    min-height: 280px;
    position: relative;
  }
`;

const ContentPanel = styled.div`
  position: relative;
  width: 100%;
  animation: ${fadeUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Watermark = styled.div`
  position: absolute;
  top: -28px;
  right: -8px;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 160px;
  color: ${theme.colors.brand.azure};
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
  letter-spacing: -8px;
`;

const ContentTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.brand.slate};
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    font-size: 32px;
    letter-spacing: -1.2px;
  }
`;

const ContentDesc = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.65;

  @media (min-width: 640px) {
    font-size: 17px;
  }
`;

const DesktopIntegrations = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const IntBadge = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  background: rgba(103, 183, 209, 0.1);
  color: ${theme.colors.brand.azure};
  border-radius: 6px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 13px;
  }
`;

/* ── CTA ── */

const CTARow = styled.div`
  text-align: center;
  margin-top: 48px;

  @media (min-width: 640px) {
    margin-top: 56px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 13px 28px;
  background: #E8742A;
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 980px;
  text-decoration: none;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #d4691f;
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    font-size: 15px;
    padding: 14px 32px;
  }
`;

/* ── Data ── */

const INTEGRATIONS = ['Curbside', 'CleanCloud', 'CCI', 'FastCard', 'LaundryCard'];

interface StepData {
  num: string;
  title: string;
  desc: string;
  integrations?: boolean;
}

const STEPS: StepData[] = [
  {
    num: '1',
    title: 'We learn your business',
    desc: 'We review your website, talk with you or send an onboarding form, and learn everything \u2014 hours, pricing, machines, wash-and-fold rates, refund policies, emergency procedures.',
  },
  {
    num: '2',
    title: 'We build your AI',
    desc: 'We train a custom AI receptionist on your specific laundromat. It knows your business as well as your best employee \u2014 because we taught it everything you told us.',
  },
  {
    num: '3',
    title: 'We connect your systems',
    desc: 'WorkBuddy plugs into your existing tools to place orders, look up customers, and process refunds automatically.',
    integrations: true,
  },
  {
    num: '4',
    title: 'You test, we refine, you go live',
    desc: "Call your own number and try every scenario. We tweak until it\u2019s perfect. When you\u2019re ready, forward your calls \u2014 that\u2019s it.",
  },
];

/* ── Component ── */

interface GetStartedSectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const GetStartedSection = ({ onScrollToForm }: GetStartedSectionProps) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(prev => (prev + 1) % STEPS.length);
    }, DURATION);
    return () => clearTimeout(timer);
  }, [active]);

  const step = STEPS[active];

  return (
    <LPSection $alt>
      <LPInner>
        <Header>
          <LPHeadline style={{ textAlign: 'center' }}>How it works</LPHeadline>
          <LPSubtext style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            We handle everything. Most owners are live within 48 hours.
          </LPSubtext>
        </Header>

        <Layout>
          <AccordionCol>
            {STEPS.map((s, i) => (
              <AccItem key={i} $active={i === active} onClick={() => setActive(i)}>
                <AccHeader>
                  <AccNum $active={i === active}>{s.num}</AccNum>
                  <AccTitle $active={i === active}>{s.title}</AccTitle>
                </AccHeader>
                <AccExpandable $open={i === active}>
                  <AccExpandInner>
                    <AccBody>{s.desc}</AccBody>
                    {s.integrations && (
                      <MobileIntegrations>
                        {INTEGRATIONS.map(name => (
                          <IntBadge key={name}>{name}</IntBadge>
                        ))}
                      </MobileIntegrations>
                    )}
                    <BarTrack>
                      {i === active && <BarFill key={active} />}
                    </BarTrack>
                  </AccExpandInner>
                </AccExpandable>
              </AccItem>
            ))}
          </AccordionCol>

          <ContentCol>
            <ContentPanel key={active}>
              <Watermark>0{step.num}</Watermark>
              <ContentTitle>{step.title}</ContentTitle>
              <ContentDesc>{step.desc}</ContentDesc>
              {step.integrations && (
                <DesktopIntegrations>
                  {INTEGRATIONS.map(name => (
                    <IntBadge key={name}>{name}</IntBadge>
                  ))}
                </DesktopIntegrations>
              )}
            </ContentPanel>
          </ContentCol>
        </Layout>

        {onScrollToForm && (
          <CTARow>
            <CTAButton href="#form" onClick={onScrollToForm}>
              Get Started &rarr;
            </CTAButton>
          </CTARow>
        )}
      </LPInner>
    </LPSection>
  );
};
