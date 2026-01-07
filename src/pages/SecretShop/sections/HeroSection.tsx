import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../../styles/theme';
import { Button } from '../../../components/Button/Button';

// Animations
const aurora = keyframes`
  0% { background-position: 50% 50%, 50% 50%; }
  50% { background-position: 100% 0%, 0% 100%; }
  100% { background-position: 50% 50%, 50% 50%; }
`;

const AuroraBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(103, 183, 209, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(220, 171, 88, 0.05) 0%, transparent 40%);
  filter: blur(60px);
  animation: ${aurora} 20s ease infinite;
  z-index: 0;
`;

const Section = styled.section`
  padding: 140px 0 100px;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 80vh;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 120px 0 60px;
    min-height: auto;
  }
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  position: relative;
  z-index: 2;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const PreHeadline = styled.div`
  font-size: ${theme.typography.sizes.subhead.desktop};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.brand.azure};
  margin-bottom: 24px;
  display: inline-block;
  padding: 8px 16px;
  background: rgba(103, 183, 209, 0.1);
  border-radius: 100px;
  border: 1px solid ${theme.colors.brand.azure}30;
`;

const Headline = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(40px, 6vw, 72px);
  color: ${theme.colors.brand.slate};
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;

  span {
    color: ${theme.colors.brand.azure};
  }
`;

const Subheadline = styled.p`
  font-size: clamp(18px, 2vw, 22px);
  color: ${theme.colors.text.primary};
  line-height: 1.5;
  margin-bottom: 32px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeroSection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section>
      <AuroraBackground />
      {/* Subtle Gold Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: 200,
        height: 200,
        background: `radial-gradient(circle, ${theme.colors.brand.gold}10 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <Container>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PreHeadline>Busted Business Series</PreHeadline>
            <Headline>
              Find Your <br/>
              <span>Million-Dollar Mistake</span>
            </Headline>
            <Subheadline>
              I'll secret shop your business and show you exactly where your lead funnel is leaking money.
            </Subheadline>
            <Description>
              Most businesses lose 40-60% of their leads before anyone picks up the phone. I'll submit test leads to your business, track what happens, and send you a custom scorecard showing where the money's going.
            </Description>
            <ButtonGroup>
              <Button 
                size="large" 
                onClick={scrollToForm}
                style={{
                    background: theme.colors.brand.gold,
                    boxShadow: '0 8px 25px rgba(220, 171, 88, 0.4)',
                    border: 'none',
                    fontSize: '18px',
                    padding: '18px 36px'
                }}
              >
                Get Your Free Funnel Audit
              </Button>
            </ButtonGroup>
          </motion.div>
        </ContentWrapper>
      </Container>
    </Section>
  );
};
