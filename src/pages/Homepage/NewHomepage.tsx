import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { MinimalFooter } from '../../components/Footer/MinimalFooter';
import { Section, Container, ResponsiveGrid, Badge, Button } from '../../components/Shared/Layout';
import { AuroraBackground } from '../../components/Shared/Backgrounds';

// Simple header with logo only - no navigation
const SimpleHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px 24px;
`;

const HeaderContainer = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 22px;
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.brand.slate};
  text-decoration: none;
  letter-spacing: -0.015em;

  .buddy {
    color: ${theme.colors.brand.azure};
  }
`;

// Card Components matching LaundromatLP patterns
const DemoCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${theme.colors.gradients.primary};
  }
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(50, 74, 95, 0.06);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(50, 74, 95, 0.1);
  }
`;

const UseCaseCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.brand.slate}10;
  box-shadow: 0 4px 16px rgba(50, 74, 95, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(50, 74, 95, 0.08);
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.brand.azure};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.weights.semibold};
  font-size: 20px;
  margin: 0 auto 16px;
`;

const ServiceCard = styled.div`
  background: white;
  border: 2px solid ${theme.colors.brand.azure};
  border-radius: 20px;
  padding: 48px 40px;
  box-shadow: 0 8px 32px rgba(50, 74, 95, 0.08);
  max-width: 500px;
  margin: 0 auto;
`;

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const NewHomepage: React.FC = () => {
  return (
    <>
      <SimpleHeader>
        <HeaderContainer>
          <Logo to="/">
            <span>work</span>
            <span className="buddy">buddy</span>
          </Logo>
        </HeaderContainer>
      </SimpleHeader>

      {/* HERO SECTION */}
      <Section style={{
        paddingTop: 120,
        paddingBottom: 80,
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%)'
      }}>
        <AuroraBackground />
        <Container>
          <ResponsiveGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge>24/7 AI Customer Care</Badge>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 500,
                color: theme.colors.brand.slate,
                lineHeight: 1.1,
                marginBottom: 24,
                fontFamily: theme.typography.fontFamily.heading
              }}>
                It's <span style={{ color: theme.colors.brand.azure }}>11 PM</span>. Your phone is ringing.
              </h1>
              <p style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                color: theme.colors.text.secondary,
                marginBottom: 32,
                lineHeight: 1.4,
                fontWeight: 400
              }}>
                We'll take that call.
              </p>
              <p style={{
                fontSize: 17,
                color: theme.colors.text.secondary,
                marginBottom: 32,
                lineHeight: 1.7
              }}>
                24/7 support for renters and residents across Connecticut.
              </p>

              <Button
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ marginBottom: 16 }}
              >
                Schedule Demo
              </Button>

              <p style={{ marginTop: 24, fontSize: 15, color: theme.colors.text.secondary }}>
                Questions? Call us now:{' '}
                <a href="tel:+12036051105" style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none' }}>
                  (203) 605-1105
                </a>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <DemoCard>
                <p style={{
                  fontSize: 48,
                  color: theme.colors.brand.azure,
                  lineHeight: 1,
                  marginBottom: 16
                }}>"</p>
                <p style={{
                  fontSize: 17,
                  color: theme.colors.text.secondary,
                  lineHeight: 1.7,
                  fontStyle: 'italic'
                }}>
                  Hi, this is Work Buddy! I'd be happy to help with information about available units. We have a lovely 2-bedroom available for $2,700 per month. Would you like to schedule a viewing?
                </p>
                <div style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: `1px solid ${theme.colors.brand.slate}10`
                }}>
                  <p style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: theme.colors.brand.slate,
                    marginBottom: 4
                  }}>
                    AI-Powered Customer Care
                  </p>
                </div>
              </DemoCard>
            </motion.div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* TESTIMONIALS SECTION */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Badge>What Customers Say</Badge>
          </div>
          <TestimonialGrid>
            <TestimonialCard>
              <p style={{
                fontSize: 17,
                color: theme.colors.text.secondary,
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: 24
              }}>
                "I called about an apartment at 10pm and got all my questions answered immediately. Scheduled a tour for the next day!"
              </p>
              <p style={{ fontWeight: 600, color: theme.colors.brand.slate }}>— Tenant, Hartford</p>
            </TestimonialCard>

            <TestimonialCard>
              <p style={{
                fontSize: 17,
                color: theme.colors.text.secondary,
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: 24
              }}>
                "Reported a maintenance issue over text and got confirmation within seconds. They actually followed up the next morning."
              </p>
              <p style={{ fontWeight: 600, color: theme.colors.brand.slate }}>— Resident, New Haven</p>
            </TestimonialCard>

            <TestimonialCard>
              <p style={{
                fontSize: 17,
                color: theme.colors.text.secondary,
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: 24
              }}>
                "Finally someone who responds after hours. No more waiting until Monday to get answers."
              </p>
              <p style={{ fontWeight: 600, color: theme.colors.brand.slate }}>— Prospective Tenant, CT</p>
            </TestimonialCard>
          </TestimonialGrid>
        </Container>
      </Section>

      {/* USE CASES SECTION */}
      <Section $bg="#F0F4F8">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Badge>What We Handle</Badge>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              color: theme.colors.brand.slate,
              lineHeight: 1.2,
              fontFamily: theme.typography.fontFamily.heading
            }}>
              24/7 Customer Care
            </h2>
          </div>
          <UseCaseGrid>
            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                Tour Scheduling
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy answers your questions about available units and schedules property viewings instantly.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                Maintenance Requests
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy logs and acknowledges your repair requests 24/7, ensuring you always feel heard.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                Payment Reminders
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy sends you payment reminders and answers your billing questions professionally.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                Tenant Inquiries
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy helps you with lease terms, renewals, and move-in/move-out procedures.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                Prospect Communication
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy responds to you instantly with unit availability, pricing, and amenity information.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <h3 style={{
                fontSize: 19,
                fontWeight: 600,
                color: theme.colors.brand.slate,
                marginBottom: 8
              }}>
                After-Hours Support
              </h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Work Buddy handles your urgent calls outside business hours and escalates critical issues immediately.
              </p>
            </UseCaseCard>
          </UseCaseGrid>
        </Container>
      </Section>

      {/* STEPS SECTION */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Badge>How It Works</Badge>
          </div>
          <StepsGrid>
            <div style={{ textAlign: 'center' }}>
              <StepNumber>1</StepNumber>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Call or text Work Buddy
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <StepNumber>2</StepNumber>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Get an instant response
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <StepNumber>3</StepNumber>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Get help any time, day or night
              </p>
            </div>
          </StepsGrid>
          <p style={{
            textAlign: 'center',
            fontSize: 17,
            color: theme.colors.brand.slate,
            fontWeight: 500,
            marginTop: 48
          }}>
            Always available. Always helpful.
          </p>
        </Container>
      </Section>

      {/* SERVICE CARD SECTION */}
      <Section $bg="#F0F4F8">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Badge>Our Promise</Badge>
          </div>
          <ServiceCard>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: theme.colors.brand.slate,
              textAlign: 'center',
              marginBottom: 32,
              fontFamily: theme.typography.fontFamily.heading
            }}>
              24/7 Service
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Instant response to calls and texts',
                'Tour scheduling any time',
                'Maintenance request handling',
                'Professional, friendly service'
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  fontSize: 17,
                  color: theme.colors.brand.slate
                }}>
                  <span style={{ color: theme.colors.brand.azure, fontSize: 22, fontWeight: 700 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${theme.colors.brand.slate}15`
            }}>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 8 }}>
                Real help when you need it.
              </p>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                No waiting until business hours.
              </p>
            </div>
          </ServiceCard>
        </Container>
      </Section>

      {/* TRUST SECTION */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <Badge>Why Us</Badge>
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.8, marginBottom: 16 }}>
                Available 24/7, 365 days a year.
              </p>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.8, marginBottom: 16 }}>
                Friendly, professional responses every time.
              </p>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.8 }}>
                Real help from Work Buddy.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, marginBottom: 12 }}>
                Questions? Call us now:
              </p>
              <a
                href="tel:+12036051105"
                style={{
                  fontSize: 20,
                  color: theme.colors.brand.azure,
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                (203) 605-1105
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA SECTION - Dark */}
      <Section $dark>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 32,
              fontFamily: theme.typography.fontFamily.heading
            }}>
              Ready to sleep through the night?
            </h2>
            <Button
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
              style={{ marginBottom: 16 }}
            >
              Schedule Demo
            </Button>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 16 }}>
              Free consultation. No commitment.
            </p>
          </div>
        </Container>
      </Section>

      <MinimalFooter />
    </>
  );
};
