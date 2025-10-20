import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../../components/Button/Button';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.surface.primary};
`;

// Hero Section - Apple-style
const HeroSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl} ${theme.spacing.xxxxl};
  text-align: center;
  background: ${theme.colors.surface.primary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxxl} ${theme.spacing.l} ${theme.spacing.xxxl};
  }
`;

const Container = styled.div<{ maxWidth?: string }>`
  max-width: ${props => props.maxWidth || theme.maxWidth.content};
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.sizes.largeTitle.desktop};
  font-weight: ${theme.typography.weights.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${theme.colors.neutral.label};
  margin: 0 0 ${theme.spacing.l} 0;
  letter-spacing: -0.022em;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.largeTitle.mobile};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.sizes.title3.desktop};
  line-height: ${theme.typography.lineHeight.normal};
  color: ${theme.colors.neutral.secondary};
  margin: 0 0 ${theme.spacing.xxl} 0;
  font-weight: ${theme.typography.weights.regular};
  max-width: ${theme.maxWidth.reading};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.title3.mobile};
  }
`;

const ServiceDescription = styled.p`
  font-size: ${theme.typography.sizes.callout.desktop};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.neutral.tertiary};
  margin: 0 0 ${theme.spacing.xxxl} 0;
  font-weight: ${theme.typography.weights.regular};
  max-width: ${theme.maxWidth.reading};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${theme.spacing.xxxl};
`;

const CTAGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.l};
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.xxxl} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.m};
    
    button {
      width: 100%;
      max-width: 280px;
    }
  }
`;

// Product Visual - Apple style
const ProductVisual = styled.div`
  max-width: 980px;
  margin: ${theme.spacing.xxxxxl} auto 0;
  border-radius: ${theme.borderRadius.xxxl};
  overflow: hidden;
  background: ${theme.colors.surface.secondary};
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.secondary};
  font-size: ${theme.typography.sizes.title3.desktop};
  font-weight: ${theme.typography.weights.medium};
  box-shadow: ${theme.shadows.xl};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      ${theme.colors.primary.blue}08, 
      ${theme.colors.primary.indigo}05
    );
  }
`;

// How It Works Section - Apple card design
const HowItWorksSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.secondary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxxl} ${theme.spacing.l};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.title1.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.neutral.label};
  text-align: center;
  margin-bottom: ${theme.spacing.xxxl};
  letter-spacing: -0.022em;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.title1.mobile};
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xxl};
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.xxxl};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.large};
  }
`;

const StepNumber = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${theme.colors.primary.blue};
  color: ${theme.colors.primary.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.title3.desktop};
  margin: 0 auto ${theme.spacing.xl};
`;

const StepTitle = styled.h3`
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.m};
  letter-spacing: -0.015em;
`;

const StepDescription = styled.p`
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  font-size: ${theme.typography.sizes.body.desktop};
`;

// Pricing Section - Apple style
const PricingSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxxl} ${theme.spacing.l};
  }
`;

const PricingCard = styled.div`
  background: ${theme.colors.surface.primary};
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: ${theme.borderRadius.xxxl};
  padding: ${theme.spacing.xxxl};
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: ${theme.shadows.large};
`;

const PricingTitle = styled.h2`
  font-size: ${theme.typography.sizes.title2.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.l};
  letter-spacing: -0.022em;
`;

const Price = styled.div`
  font-size: ${theme.typography.sizes.largeTitle.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.primary.blue};
  margin: ${theme.spacing.xl} 0;
  letter-spacing: -0.025em;
`;

const PriceNote = styled.p`
  color: ${theme.colors.neutral.secondary};
  margin-bottom: ${theme.spacing.xxxl};
  font-size: ${theme.typography.sizes.callout.desktop};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.xl} 0 ${theme.spacing.xxxl};
  text-align: left;
  
  li {
    padding: ${theme.spacing.m} 0;
    color: ${theme.colors.neutral.label};
    font-size: ${theme.typography.sizes.body.desktop};
    display: flex;
    align-items: center;
    
    &:before {
      content: "✓";
      color: ${theme.colors.accent.green};
      font-weight: ${theme.typography.weights.bold};
      margin-right: ${theme.spacing.m};
      font-size: ${theme.typography.sizes.callout.desktop};
    }
  }
`;

// Final CTA Section
const FinalCTASection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.secondary};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxxl} ${theme.spacing.l};
  }
`;

const FinalCTATitle = styled.h2`
  font-size: ${theme.typography.sizes.title1.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.l};
  letter-spacing: -0.022em;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.title1.mobile};
  }
`;

const FinalCTASubtitle = styled.p`
  font-size: ${theme.typography.sizes.callout.desktop};
  color: ${theme.colors.neutral.secondary};
  margin-bottom: ${theme.spacing.xxxl};
  max-width: ${theme.maxWidth.narrow};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${theme.spacing.xxxl};
`;

export const NewHomepage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroTitle>Never Miss Another Customer</HeroTitle>
          <HeroSubtitle>
            Your AI employee answers calls 24/7 so you can focus on growing your business
          </HeroSubtitle>
          <ServiceDescription>
            Work Buddy is an AI-powered phone and SMS answering service for small businesses. 
            We handle customer inquiries, answer questions about your business, book appointments, 
            and provide 24/7 customer support on your behalf.
          </ServiceDescription>
          
          <CTAGroup>
            <Button size="large">Start Free Trial</Button>
            <Button variant="secondary" size="large">Watch Demo</Button>
          </CTAGroup>

          <ProductVisual>
            AI-Powered Customer Service in Action
          </ProductVisual>
        </Container>
      </HeroSection>

      {/* How It Works */}
      <HowItWorksSection id="how-it-works">
        <Container>
          <SectionTitle>How It Works</SectionTitle>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Sign up in 10 minutes</StepTitle>
              <StepDescription>
                Tell us about your business and customize your AI employee to match your brand and needs.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Customize your AI employee</StepTitle>
              <StepDescription>
                Train your AI to handle your specific business questions, appointments, and customer requests.
              </StepDescription>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Never miss a customer again</StepTitle>
              <StepDescription>
                Your AI handles calls and texts 24/7, so you can focus on growing your business.
              </StepDescription>
            </StepCard>
          </StepsGrid>
        </Container>
      </HowItWorksSection>

      {/* Pricing */}
      <PricingSection id="pricing">
        <Container>
          <PricingCard>
            <PricingTitle>Simple Pricing</PricingTitle>
            <Price>Starting at $199/month</Price>
            <PriceNote>Less than a part-timer. No contracts.</PriceNote>
            
            <FeaturesList>
              <li>Unlimited calls, texts, and emails</li>
              <li>24/7 customer support</li>
              <li>Setup and training included</li>
              <li>Industry-specific customization</li>
              <li>Monthly performance reports</li>
            </FeaturesList>
            
            <Button size="large" fullWidth>Start Free Trial</Button>
          </PricingCard>
        </Container>
      </PricingSection>

      {/* Final CTA */}
      <FinalCTASection>
        <Container>
          <FinalCTATitle>Ready to Get Your Evenings Back?</FinalCTATitle>
          <FinalCTASubtitle>
            Join hundreds of business owners who never miss a customer.
          </FinalCTASubtitle>
          <Button size="large">Start Free Trial</Button>
        </Container>
      </FinalCTASection>
    </PageWrapper>
  );
};