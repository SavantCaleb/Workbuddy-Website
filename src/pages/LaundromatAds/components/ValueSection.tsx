import styled from 'styled-components';
import { theme } from '../../../styles/theme';

// --- Layout ---

const Section = styled.section`
  padding: 56px 20px;

  @media (min-width: 640px) {
    padding: 80px 32px;
  }

  @media (min-width: 900px) {
    padding: 100px 40px;
  }
`;

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;

  @media (min-width: 640px) {
    gap: 48px;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }
`;

// --- Left Column ---

const SectionHeadline = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 32px;
  color: ${theme.colors.brand.slate};
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 14px;

  @media (min-width: 640px) {
    font-size: 40px;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }

  @media (min-width: 900px) {
    font-size: 48px;
    letter-spacing: -2px;
  }
`;

const SectionSub = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  letter-spacing: -0.2px;
  margin-bottom: 32px;

  @media (min-width: 640px) {
    font-size: 17px;
    line-height: 1.55;
    margin-bottom: 48px;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (min-width: 640px) {
    gap: 36px;
  }
`;

const Feature = styled.div``;

const FeatureTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.body};
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.brand.slate};
  margin-bottom: 5px;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 17px;
    margin-bottom: 8px;
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

// --- Right Column (Proof) ---

const ProofZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  background: ${theme.colors.surface.primary};
  border-radius: 14px;
  padding: 24px;

  @media (min-width: 640px) {
    padding: 40px;
    border-radius: 24px;
  }
`;

const StatBlock = styled.div`
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${theme.colors.neutral.gray200};

  @media (min-width: 640px) {
    padding-bottom: 32px;
    margin-bottom: 32px;
  }
`;

const StatNumber = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 56px;
  color: ${theme.colors.brand.slate};
  line-height: 1;
  letter-spacing: -2.5px;

  @media (min-width: 640px) {
    font-size: 64px;
    letter-spacing: -3px;
  }
`;

const StatLabel = styled.div`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  margin-top: 8px;
  line-height: 1.5;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const StatContext = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  margin-top: 6px;

  @media (min-width: 640px) {
    font-size: 15px;
  }
`;

const TestimonialBlock = styled.blockquote`
  margin: 0;
  padding: 0;
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    margin-bottom: 32px;
  }
`;

const TestimonialQuote = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.primary};
  line-height: 1.55;
  margin-bottom: 10px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 14px;
  }
`;

const TestimonialAuthor = styled.div`
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  letter-spacing: -0.1px;

  strong {
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }
`;

// --- Component ---

export const ValueSection = () => (
  <Section>
    <SectionInner>
      {/* Left: Copy + Features */}
      <div>
        <SectionHeadline>
          Your front desk,<br />fully automated.
        </SectionHeadline>

        <SectionSub>
          Everything your best employee does — without the call-outs, the hold times, or the forgotten wash-and-fold rates.
        </SectionSub>

        <FeatureList>
          <Feature>
            <FeatureTitle>Every call answered</FeatureTitle>
            <FeatureDesc>
              6am, 11pm, Christmas Day. No voicemail, no missed revenue. Your customers always reach someone who knows your business.
            </FeatureDesc>
          </Feature>

          <Feature>
            <FeatureTitle>Trained on your laundromat</FeatureTitle>
            <FeatureDesc>
              Your hours, pricing, machine types, wash-and-fold rates, refund policy. All learned in one 15-minute call. Updated anytime.
            </FeatureDesc>
          </Feature>

          <Feature>
            <FeatureTitle>Books and processes automatically</FeatureTitle>
            <FeatureDesc>
              Takes wash-and-fold orders, schedules drop-offs, processes refunds through your card reader. You get a text summary.
            </FeatureDesc>
          </Feature>

          <Feature>
            <FeatureTitle>Speaks every language</FeatureTitle>
            <FeatureDesc>
              Your neighborhood changes. Your phone system keeps up. WorkBuddy handles calls in any language your customers speak.
            </FeatureDesc>
          </Feature>
        </FeatureList>
      </div>

      {/* Right: Proof */}
      <ProofZone>
        <StatBlock>
          <StatNumber>0</StatNumber>
          <StatLabel>calls going to voicemail.</StatLabel>
          <StatContext>Ray used to lose 30+ a week. Now every one gets answered.</StatContext>
        </StatBlock>

        <TestimonialBlock>
          <TestimonialQuote>
            "We were losing 30+ calls a week to voicemail and I had no idea. People would call, get no answer, and just Google the next place. WorkBuddy showed me the logs and I couldn't believe it. Now every single call gets answered, our wash-and-fold bookings are up 40% in two months, and I'm not glued to my phone anymore. My only regret is not doing it sooner."
          </TestimonialQuote>
          <TestimonialAuthor>
            <strong>Ray S.</strong> — Owner, 3 locations, Tampa
          </TestimonialAuthor>
        </TestimonialBlock>
      </ProofZone>
    </SectionInner>
  </Section>
);
