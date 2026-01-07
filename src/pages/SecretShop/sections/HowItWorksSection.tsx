import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const Section = styled.section`
  padding: 80px 0;
  background: white;
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 36px;
  color: ${theme.colors.brand.slate};
  text-align: center;
  margin-bottom: 64px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Step = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.brand.slate};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  margin: 0 auto 24px;
  box-shadow: 0 4px 12px rgba(50, 74, 95, 0.2);
`;

const StepText = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  max-width: 240px;
  margin: 0 auto;
`;

const ConnectorLine = styled.div`
  position: absolute;
  top: 24px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: ${theme.colors.neutral.gray200};
  z-index: 1;

  @media (max-width: 968px) {
    display: none;
  }
`;

const Callout = styled.div`
  margin-top: 64px;
  text-align: center;
  padding: 16px 24px;
  background: ${theme.colors.brand.azure}10;
  border-radius: 100px;
  color: ${theme.colors.brand.slate};
  font-weight: 600;
  display: inline-block;
  
  /* Center horizontally */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

export const HowItWorksSection = () => {
  const steps = [
    "You submit the form below",
    "I submit two test leads to your business - one engaged, one ghost",
    "Over 2 weeks, I track every response (or lack thereof)",
    "You receive your scorecard and video breakdown via email"
  ];

  return (
    <Section>
      <Container>
        <Title>How It Works</Title>
        <StepsGrid>
          <ConnectorLine />
          {steps.map((text, i) => (
            <Step key={i}>
              <StepNumber>{i + 1}</StepNumber>
              <StepText>{text}</StepText>
            </Step>
          ))}
        </StepsGrid>
        <Callout>
          Results delivered within 2-3 weeks of submission
        </Callout>
      </Container>
    </Section>
  );
};
