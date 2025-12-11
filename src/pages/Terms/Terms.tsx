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
            Work Buddy Inc ("Work Buddy", "we", "us") provides AI-powered customer service
            for residential apartment communities. We handle tenant and prospect communications
            including tour scheduling, maintenance request acknowledgments, payment reminders,
            and property inquiries via voice and SMS for the apartment communities we serve.
          </Paragraph>
          <Paragraph>
            When you contact an apartment community using Work Buddy's customer service,
            you are communicating directly with Work Buddy. All SMS messages will identify
            Work Buddy as the sender and include the specific property name for context.
          </Paragraph>
          <Paragraph>
            Our service includes:
          </Paragraph>
          <List>
            <li>24/7 AI-powered call answering for apartment communities</li>
            <li>SMS message handling for tenant and prospect communications</li>
            <li>Tour scheduling and property inquiry responses</li>
            <li>Maintenance request acknowledgments</li>
            <li>Payment reminder communications</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. User Conduct</SectionTitle>
          <Paragraph>
            When communicating with Work Buddy's customer service, you agree to:
          </Paragraph>
          <List>
            <li>Provide accurate information about your inquiry or request</li>
            <li>Use the service only for legitimate rental inquiries, maintenance requests, and property communications</li>
            <li>Not attempt to interfere with or disrupt our service</li>
            <li>Respect the intellectual property rights of Work Buddy</li>
            <li>Not use the service for any unlawful purpose</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. SMS and Communication Compliance</SectionTitle>
          <Paragraph>
            Work Buddy's SMS services comply with TCPA, CAN-SPAM, and other applicable regulations.
            By using our services, you acknowledge and agree that:
          </Paragraph>
          <List>
            <li>Work Buddy obtains consent from recipients through verbal consent at property offices or inbound SMS initiation as described in our Privacy Policy</li>
            <li>Recipients can opt out by replying STOP, and Work Buddy will honor these requests</li>
            <li>Message and data rates may apply to recipients</li>
            <li>All messages will identify Work Buddy as the sender and include the property name</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Service Terms</SectionTitle>
          <Paragraph>
            Work Buddy provides customer service to apartment communities. As a tenant, resident,
            or prospective renter communicating with Work Buddy:
          </Paragraph>
          <List>
            <li>There is no charge to you for using Work Buddy's customer service</li>
            <li>Standard message and data rates from your carrier may apply</li>
            <li>Service availability depends on the apartment community's enrollment</li>
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
            Work Buddy is not liable for indirect, incidental, or consequential damages arising
            from your use of our service. Our customer service is provided as-is, and we make no
            warranties regarding the accuracy or completeness of information provided.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Service Discontinuation</SectionTitle>
          <Paragraph>
            Work Buddy reserves the right to discontinue service to any apartment community at any
            time. If service is discontinued for a property you contact, you will need to reach the
            property directly through other means.
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