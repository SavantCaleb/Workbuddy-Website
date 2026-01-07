import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 0;
  background: ${theme.colors.bg.subtle};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 36px;
  color: ${theme.colors.brand.slate};
  text-align: center;
  margin-bottom: 48px;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.soft};
`;

const Question = styled.button`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  font-family: ${theme.typography.fontFamily.body};

  &:hover {
    background: #fcfcfc;
  }
`;

const Answer = styled(motion.div)`
  padding: 0 24px 24px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is this really free?",
      a: "Yes. No credit card. No hidden upsell. You get a real audit of your funnel."
    },
    {
      q: "Why are you doing this for free?",
      a: "I built WorkBuddy to solve these exact problems. This is how I show you the problem exists in your business. If you want help fixing it, we can talk. If not, you still walk away with valuable insights."
    },
    {
      q: "How long does it take?",
      a: "The full audit takes about 2 weeks because I test your follow-up sequences over time. You'll receive your results via email when it's complete."
    },
    {
      q: "What if my business doesn't have a website form?",
      a: "If you generate leads through calls only, this audit may not be the right fit. The secret shop works best for businesses that receive leads through web forms, listing sites, or ad landing pages."
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Frequently Asked Questions</Title>
        {faqs.map((faq, i) => (
          <FAQItem key={i}>
            <Question onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              {faq.q}
              {openIndex === i ? <FiMinus color={theme.colors.brand.azure} /> : <FiPlus color={theme.colors.brand.azure} />}
            </Question>
            <AnimatePresence>
              {openIndex === i && (
                <Answer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {faq.a}
                </Answer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </Container>
    </Section>
  );
};
