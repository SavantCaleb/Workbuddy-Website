import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../../components/Button/Button';
import { WaitingListModal } from '../../components/WaitingListModal/WaitingListModal';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.surface.primary};
`;

// Section 1: The Emotional Hook
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.xl};
  position: relative;
`;

const EmotionalStatement = styled.h1`
  font-size: clamp(32px, 6vw, 68px);
  font-weight: ${theme.typography.weights.regular};
  color: ${theme.colors.neutral.label};
  line-height: ${theme.typography.lineHeight.tight};
  letter-spacing: -0.025em;
  margin-bottom: ${theme.spacing.xxxxxl};
  max-width: 800px;
  
  strong {
    font-weight: ${theme.typography.weights.semibold};
  }
`;

const PauseSpace = styled.div`
  height: ${theme.spacing.xxxxxl};
`;

const SolutionStatement = styled.h2`
  font-size: clamp(24px, 4vw, 48px);
  font-weight: ${theme.typography.weights.light};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  letter-spacing: -0.020em;
  margin-bottom: ${theme.spacing.xxxxl};
`;

const PrimaryCTA = styled(Button)`
  font-size: ${theme.typography.sizes.callout.desktop};
  padding: ${theme.spacing.l} ${theme.spacing.xxxl};
  min-height: 56px;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.large};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

// Section 2: The Product Truth
const ProductSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.secondary};
  text-align: center;
`;

const Container = styled.div`
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
`;

const DemoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xxxxl};
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.xxxl};
  padding: ${theme.spacing.xxxl};
  box-shadow: ${theme.shadows.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary.blue}, ${theme.colors.primary.indigo});
  }
`;

const DemoText = styled.div`
  font-size: ${theme.typography.sizes.callout.desktop};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  font-style: italic;
  margin-bottom: ${theme.spacing.xl};
  
  &::before {
    content: '"';
    font-size: 48px;
    color: ${theme.colors.primary.blue};
    line-height: 1;
    position: absolute;
    top: ${theme.spacing.l};
    left: ${theme.spacing.l};
  }
`;

const PricingIntro = styled.div`
  text-align: center;
`;

const StartingPrice = styled.div`
  font-size: ${theme.typography.sizes.title1.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.s};
  letter-spacing: -0.025em;
`;

const PriceSubtext = styled.p`
  font-size: ${theme.typography.sizes.body.desktop};
  color: ${theme.colors.neutral.secondary};
  margin: 0;
`;

// Section 3: The Social Mirror
const SocialSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.xxxl};
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: ${theme.borderRadius.xxxl};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.large};
    border-color: ${theme.colors.primary.blue};
  }
`;

const CustomerQuote = styled.blockquote`
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.regular};
  color: ${theme.colors.neutral.label};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing.l};
  font-style: normal;
  letter-spacing: -0.015em;
`;

const CustomerAttribution = styled.cite`
  font-size: ${theme.typography.sizes.subhead.desktop};
  color: ${theme.colors.neutral.secondary};
  font-style: normal;
  font-weight: ${theme.typography.weights.medium};
`;

// Section: Property Management Use Cases
const PropertySection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.secondary};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.title2.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.xxxl};
  letter-spacing: -0.020em;
`;

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
`;

const UseCaseItem = styled.div`
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.xxl};
  text-align: left;
  border: 1px solid ${theme.colors.neutral.gray200};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const UseCaseTitle = styled.h3`
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.s};
`;

const UseCaseDescription = styled.p`
  font-size: ${theme.typography.sizes.body.desktop};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

// Section 4: The Elegant Simplicity
const StepsSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  text-align: center;
`;


const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xxl};
  max-width: 900px;
  margin: 0 auto ${theme.spacing.xxxl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const StepItem = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.primary.blue};
  color: ${theme.colors.primary.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.headline.desktop};
  margin: 0 auto ${theme.spacing.l};
`;

const StepDescription = styled.p`
  font-size: ${theme.typography.sizes.body.desktop};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const SetupTime = styled.p`
  font-size: ${theme.typography.sizes.callout.desktop};
  color: ${theme.colors.neutral.label};
  font-weight: ${theme.typography.weights.medium};
  margin: 0;
`;

// Section 5: The Confident Economics
const EconomicsSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.primary};
  text-align: center;
`;

const PricingCard = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: ${theme.colors.surface.primary};
  border: 2px solid ${theme.colors.primary.blue};
  border-radius: ${theme.borderRadius.xxxl};
  padding: ${theme.spacing.xxxxl} ${theme.spacing.xxxl};
  box-shadow: ${theme.shadows.xl};
`;

const MainPrice = styled.div`
  font-size: ${theme.typography.sizes.largeTitle.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.l};
  letter-spacing: -0.030em;
`;

const IncludedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.xl} 0;
  text-align: left;
  
  li {
    padding: ${theme.spacing.s} 0;
    color: ${theme.colors.neutral.label};
    font-size: ${theme.typography.sizes.body.desktop};
    display: flex;
    align-items: center;
    
    &:before {
      content: "•";
      color: ${theme.colors.primary.blue};
      font-weight: ${theme.typography.weights.bold};
      margin-right: ${theme.spacing.m};
      font-size: ${theme.typography.sizes.headline.desktop};
    }
  }
`;

const ValueProposition = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.neutral.gray200};
  
  p {
    font-size: ${theme.typography.sizes.body.desktop};
    color: ${theme.colors.neutral.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin-bottom: ${theme.spacing.s};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// Section 6: The Trust Builder
const TrustSection = styled.section`
  padding: ${theme.spacing.xxxxl} ${theme.spacing.xl};
  background: ${theme.colors.surface.secondary};
  text-align: center;
`;

const TrustPoints = styled.div`
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xxxl};
`;

const TrustPoint = styled.p`
  font-size: ${theme.typography.sizes.callout.desktop};
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.l};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactPrompt = styled.div`
  margin-top: ${theme.spacing.xxxl};
  
  p {
    font-size: ${theme.typography.sizes.body.desktop};
    color: ${theme.colors.neutral.secondary};
    margin-bottom: ${theme.spacing.m};
  }
  
  a {
    font-size: ${theme.typography.sizes.callout.desktop};
    color: ${theme.colors.primary.blue};
    font-weight: ${theme.typography.weights.medium};
    text-decoration: none;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

// Section 7: The Final Moment
const FinalSection = styled.section`
  padding: ${theme.spacing.xxxxxl} ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.blue}08, 
    ${theme.colors.primary.indigo}05
  );
  text-align: center;
`;

const FinalQuestion = styled.h2`
  font-size: ${theme.typography.sizes.title2.desktop};
  font-weight: ${theme.typography.weights.regular};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.xxxl};
  letter-spacing: -0.020em;
`;

const FinalCTA = styled(Button)`
  font-size: ${theme.typography.sizes.callout.desktop};
  padding: ${theme.spacing.l} ${theme.spacing.xxxxl};
  min-height: 64px;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  margin-bottom: ${theme.spacing.l};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const NoCard = styled.p`
  font-size: ${theme.typography.sizes.subhead.desktop};
  color: ${theme.colors.neutral.secondary};
  margin: 0;
`;

export const NewHomepage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PageWrapper>
      {/* Section 1: The Emotional Hook */}
      <HeroSection>
        <EmotionalStatement>
          It's <strong>11 PM</strong>. Your phone is ringing.
        </EmotionalStatement>

        <PauseSpace />

        <SolutionStatement>
          We'll take that call.
        </SolutionStatement>

        <PrimaryCTA size="large" onClick={openModal}>
          Join Waiting List
        </PrimaryCTA>
      </HeroSection>

      {/* Section 2: The Product Truth */}
      <ProductSection>
        <Container>
          <DemoContainer>
            <DemoText>
              Hi, thanks for calling The Woodlands! I'd be happy to help you with information about our available units. We have a lovely 2-bedroom at 3 Evergreen Drive available for $2,700 per
              month. Would you like to schedule a viewing this week?
            </DemoText>
          </DemoContainer>

          <PricingIntro>
            <StartingPrice>Starting at $199/month</StartingPrice>
            <PriceSubtext>No contracts. Cancel anytime.</PriceSubtext>
          </PricingIntro>
        </Container>
      </ProductSection>

      {/* Section 3: The Social Mirror */}
      <SocialSection>
        <Container>
          <TestimonialGrid>
            <TestimonialCard>
              <CustomerQuote>
                "Managing 50 units used to mean missing calls at all hours. Now tenants get instant responses."
              </CustomerQuote>
              <CustomerAttribution>
                — Property Manager, Connecticut
              </CustomerAttribution>
            </TestimonialCard>

            <TestimonialCard>
              <CustomerQuote>
                "Tenant calls at 2am used to wake me up. Now they get immediate help and I get my sleep."
              </CustomerQuote>
              <CustomerAttribution>
                — Apartment Owner, New Haven
              </CustomerAttribution>
            </TestimonialCard>

            <TestimonialCard>
              <CustomerQuote>
                "Our vacancy rate dropped because prospects get instant responses about available units."
              </CustomerQuote>
              <CustomerAttribution>
                — Property Management Company, CT
              </CustomerAttribution>
            </TestimonialCard>
          </TestimonialGrid>
        </Container>
      </SocialSection>

      {/* Section: Property Management Use Cases */}
      <PropertySection>
        <Container>
          <SectionTitle>For Property Managers</SectionTitle>
          <UseCaseGrid>
            <UseCaseItem>
              <UseCaseTitle>Prospective Tenant Inquiries</UseCaseTitle>
              <UseCaseDescription>
                Answer questions about available units, pricing, amenities, and schedule property viewings instantly.
              </UseCaseDescription>
            </UseCaseItem>
            <UseCaseItem>
              <UseCaseTitle>Maintenance Requests</UseCaseTitle>
              <UseCaseDescription>
                Log and acknowledge repair requests 24/7, ensuring tenants always feel heard.
              </UseCaseDescription>
            </UseCaseItem>
            <UseCaseItem>
              <UseCaseTitle>Payment Reminders</UseCaseTitle>
              <UseCaseDescription>
                Send automated payment notifications and answer billing questions professionally.
              </UseCaseDescription>
            </UseCaseItem>
            <UseCaseItem>
              <UseCaseTitle>Lease Information</UseCaseTitle>
              <UseCaseDescription>
                Provide details about lease terms, renewals, and move-in/move-out procedures.
              </UseCaseDescription>
            </UseCaseItem>
            <UseCaseItem>
              <UseCaseTitle>Property Viewings</UseCaseTitle>
              <UseCaseDescription>
                Schedule and confirm showing appointments with prospective tenants automatically.
              </UseCaseDescription>
            </UseCaseItem>
            <UseCaseItem>
              <UseCaseTitle>Emergency Response</UseCaseTitle>
              <UseCaseDescription>
                Handle urgent calls outside business hours and escalate critical issues immediately.
              </UseCaseDescription>
            </UseCaseItem>
          </UseCaseGrid>
        </Container>
      </PropertySection>

      {/* Section 4: The Elegant Simplicity */}
      <StepsSection>
        <Container>
          <StepsGrid>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepDescription>Connect your phone number</StepDescription>
            </StepItem>
            <StepItem>
              <StepNumber>2</StepNumber>
              <StepDescription>We learn your business</StepDescription>
            </StepItem>
            <StepItem>
              <StepNumber>3</StepNumber>
              <StepDescription>Never miss another customer</StepDescription>
            </StepItem>
          </StepsGrid>

          <SetupTime>Setup takes 10 minutes.</SetupTime>
        </Container>
      </StepsSection>

      {/* Section 5: The Confident Economics */}
      <EconomicsSection>
        <Container>
          <PricingCard>
            <MainPrice>$199/month</MainPrice>

            <IncludedList>
              <li>24/7 answering</li>
              <li>SMS handling</li>
              <li>Appointment booking</li>
              <li>Your business personality</li>
            </IncludedList>

            <ValueProposition>
              <p>Less than hiring part-time help.</p>
              <p>More reliable than hoping you hear the phone.</p>
            </ValueProposition>
          </PricingCard>
        </Container>
      </EconomicsSection>

      {/* Section 6: The Trust Builder */}
      <TrustSection>
        <Container>
          <TrustPoints>
            <TrustPoint>Works with your existing phone system.</TrustPoint>
            <TrustPoint>Your customers never know it's AI.</TrustPoint>
            <TrustPoint>Start free. Cancel anytime.</TrustPoint>
          </TrustPoints>

          <ContactPrompt>
            <p>Questions? Call us now:</p>
            <a href="tel:+12036051105">(203) 605-1105</a>
          </ContactPrompt>
        </Container>
      </TrustSection>

      {/* Section 7: The Final Moment */}
      <FinalSection>
        <Container>
          <FinalQuestion>Ready to sleep through the night?</FinalQuestion>

          <FinalCTA size="large" onClick={openModal}>Join Waiting List</FinalCTA>

          <NoCard>No credit card required.</NoCard>
        </Container>
      </FinalSection>

      <WaitingListModal isOpen={isModalOpen} onClose={closeModal} />
    </PageWrapper>
  );
};