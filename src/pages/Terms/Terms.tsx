import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.surface.primary};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: ${theme.maxWidth.reading};
  margin: 0 auto;
  padding: ${theme.spacing.xxxxl} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxxl} ${theme.spacing.l};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.title1.desktop};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.xl};
  letter-spacing: -0.022em;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.title1.mobile};
  }
`;

const LastUpdated = styled.p`
  color: ${theme.colors.neutral.secondary};
  font-size: ${theme.typography.sizes.subhead.desktop};
  margin-bottom: ${theme.spacing.xxxl};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xxxl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.title3.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  margin-bottom: ${theme.spacing.l};
  letter-spacing: -0.015em;
`;

const Paragraph = styled.p`
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.l};
  font-size: ${theme.typography.sizes.body.desktop};
`;

const List = styled.ul`
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.l};
  padding-left: ${theme.spacing.l};
  
  li {
    margin-bottom: ${theme.spacing.s};
  }
`;

const ContactInfo = styled.div`
  background: ${theme.colors.surface.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxxl};
  
  h3 {
    font-size: ${theme.typography.sizes.headline.desktop};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.neutral.label};
    margin-bottom: ${theme.spacing.m};
  }
  
  p {
    color: ${theme.colors.neutral.secondary};
    margin-bottom: ${theme.spacing.s};
  }
  
  a {
    color: ${theme.colors.primary.blue};
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Terms: React.FC = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>Terms of Service</Title>
        <LastUpdated>Last updated: {new Date().toLocaleDateString()}</LastUpdated>

        <Section>
          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <Paragraph>
            By accessing and using Work Buddy's AI-powered phone and SMS answering service, you 
            agree to be bound by these Terms of Service and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using our service.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Description of Service</SectionTitle>
          <Paragraph>
            Work Buddy provides an AI-powered phone and SMS answering service for small businesses. 
            Our service includes:
          </Paragraph>
          <List>
            <li>24/7 AI-powered call answering and routing</li>
            <li>SMS message handling and responses</li>
            <li>Customer inquiry management</li>
            <li>Appointment scheduling assistance</li>
            <li>Business-specific customization and training</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. User Responsibilities</SectionTitle>
          <Paragraph>
            As a user of Work Buddy, you agree to:
          </Paragraph>
          <List>
            <li>Provide accurate and complete information about your business</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the service only for lawful business purposes</li>
            <li>Comply with all applicable telecommunications regulations</li>
            <li>Not attempt to interfere with or disrupt our service</li>
            <li>Respect the intellectual property rights of Work Buddy</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. SMS and Communication Compliance</SectionTitle>
          <Paragraph>
            By using our SMS services, you acknowledge and agree that:
          </Paragraph>
          <List>
            <li>You have obtained proper consent from recipients for SMS communications</li>
            <li>You will comply with TCPA, CAN-SPAM, and other applicable regulations</li>
            <li>Recipients can opt out by replying STOP, and you will honor these requests</li>
            <li>Message and data rates may apply to recipients</li>
            <li>You are responsible for the content and compliance of your business communications</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Payment Terms</SectionTitle>
          <Paragraph>
            Work Buddy operates on a subscription basis starting at $199/month. Payment terms include:
          </Paragraph>
          <List>
            <li>Monthly billing in advance</li>
            <li>No long-term contracts required</li>
            <li>Automatic renewal unless cancelled</li>
            <li>30-day notice required for cancellation</li>
            <li>Refunds at our discretion for unused service periods</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Service Availability</SectionTitle>
          <Paragraph>
            While we strive for 99.9% uptime, Work Buddy does not guarantee uninterrupted service. 
            We are not liable for any business losses due to service interruptions, though we will 
            work diligently to resolve any issues promptly.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Data and Privacy</SectionTitle>
          <Paragraph>
            Your privacy is important to us. Our collection and use of personal information is 
            governed by our Privacy Policy. By using our service, you consent to the collection 
            and use of information as outlined in our Privacy Policy.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Intellectual Property</SectionTitle>
          <Paragraph>
            Work Buddy and its AI technology are proprietary to our company. You may not copy, 
            modify, distribute, or reverse engineer any part of our service without explicit 
            written permission.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Limitation of Liability</SectionTitle>
          <Paragraph>
            Work Buddy's liability is limited to the amount you have paid for our service in the 
            preceding 12 months. We are not liable for indirect, incidental, or consequential 
            damages arising from your use of our service.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Termination</SectionTitle>
          <Paragraph>
            Either party may terminate this agreement with 30 days' notice. Work Buddy reserves 
            the right to suspend or terminate service immediately for violation of these terms or 
            non-payment.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. Governing Law</SectionTitle>
          <Paragraph>
            These terms are governed by the laws of the State of Connecticut. Any disputes will be 
            resolved in the courts of Connecticut.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>12. Changes to Terms</SectionTitle>
          <Paragraph>
            We reserve the right to modify these terms at any time. We will notify users of 
            material changes via email or through our service. Continued use after changes 
            constitutes acceptance of the new terms.
          </Paragraph>
        </Section>

        <ContactInfo>
          <h3>Contact Us</h3>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <p>Email: <a href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a></p>
          <p>Address: 2329 Long Hill Road, Guilford, CT 06437</p>
          <p>Phone: <a href="tel:+12036051105">+1 (203) 605-1105</a></p>
        </ContactInfo>
      </Container>
    </PageWrapper>
  );
};