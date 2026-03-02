import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline } from './primitives';

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 640px) {
    margin-bottom: 48px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQCard = styled.div`
  padding: 24px;
  background: ${theme.colors.surface.primary};
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(50, 74, 95, 0.04);

  @media (min-width: 640px) {
    border-radius: 16px;
  }
`;

const Question = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 10px;
`;

const Answer = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const LinkRow = styled.div`
  text-align: center;
  margin-top: 32px;
`;

const TextLink = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.brand.azure};
  text-decoration: none;
  letter-spacing: -0.2px;

  &:hover {
    text-decoration: underline;
  }
`;

const FAQ_ITEMS = [
  {
    q: "What systems does WorkBuddy integrate with?",
    a: "We integrate with Curbside, CleanCloud, FastCard, and LaundryCard—allowing for order creation, status updates, and customer lookup.",
  },
  {
    q: "Can it actually take wash-and-fold orders?",
    a: "Absolutely. WorkBuddy captures customer details, weight estimates, special instructions (like detergent preferences), and pickup/delivery times. Orders go directly to your system or as notifications.",
  },
  {
    q: "How does it handle refund requests?",
    a: "WorkBuddy documents the machine number, amount, and customer contact info. You can set up automatic refunds for small amounts, or have all requests sent to you for review.",
  },
  {
    q: "What if there's a flood at 2am?",
    a: "You define what constitutes an emergency during setup. For floods, fires, or security issues, WorkBuddy immediately calls/texts you and can even dispatch emergency services.",
  },
  {
    q: "How much does it cost?",
    a: "Coin Op plans start at $129/month. Full Service plans with WDF orders & scheduling start at $199/month. No per-call fees.",
  },
];

export const FAQSection = () => (
  <LPSection id="faq" aria-label="Frequently asked questions about AI phone answering for laundromats - integrations, pricing, capabilities">
    <LPInner $narrow>
      <Header>
        <LPHeadline>Questions you'd actually ask.</LPHeadline>
      </Header>

      <FAQList>
        {FAQ_ITEMS.map((item, i) => (
          <FAQCard key={i}>
            <Question>{item.q}</Question>
            <Answer>{item.a}</Answer>
          </FAQCard>
        ))}
      </FAQList>

      <LinkRow>
        <TextLink href="/faq">View All FAQs &rarr;</TextLink>
      </LinkRow>
    </LPInner>
  </LPSection>
);
