import { type FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../../components/Button/Button';

const HomepageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary.blue} 0%, ${theme.colors.primary.black} 100%);
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.m};
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.m};
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 36px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.m};
  justify-content: center;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Homepage: FC = () => {
  return (
    <HomepageWrapper>
      <HeroSection>
        <Container>
          <HeroTitle>
            Your AI Employee That Actually Works
          </HeroTitle>
          <HeroSubtitle>
            Answer every call, text, and email 24/7 so you can focus on growing your business.
            WorkBuddy never sleeps, never takes breaks, and always delivers.
          </HeroSubtitle>
          <CTAButtons>
            <Button size="large">Start Free Trial</Button>
            <Button variant="outline" size="large">Watch Demo</Button>
          </CTAButtons>
        </Container>
      </HeroSection>
    </HomepageWrapper>
  );
};