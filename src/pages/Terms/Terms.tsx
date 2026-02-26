import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';

const PageWrapper = styled.main`
  min-height: 100vh;
  background: ${theme.colors.bg.default};
  padding-top: 100px;
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: 24px;
  letter-spacing: ${theme.typography.tracking.tight};
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const LastUpdated = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 15px;
  margin-bottom: 64px;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
  letter-spacing: ${theme.typography.tracking.tight};
`;

const Paragraph = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 17px;
`;

const List = styled.ul`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 24px;
  padding-left: 24px;
  font-size: 17px;
  
  li {
    margin-bottom: 8px;
  }
`;

const ContactInfo = styled.div`
  background: ${theme.colors.bg.subtle};
  border-radius: 24px;
  padding: 32px;
  margin-top: 64px;
  margin-bottom: 64px;
  
  h3 {
    font-size: 20px;
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: 16px;
  }
  
  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: 8px;
    font-size: 15px;
  }
  
  a {
    color: ${theme.colors.brand.azure};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Terms: React.FC = () => {
  return (
    <PageWrapper>
      <SEO
        title="Terms of Service"
        description="WorkBuddy's Terms of Service outlines the rules and guidelines for using our AI-powered receptionist and appointment booking service."
        canonical="/terms"
      />
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
            Work Buddy Inc ("Work Buddy", "we", "us") provides AI-powered customer care
            for renters and residents. We handle your communications including tour
            scheduling, maintenance requests, payment reminders, and rental inquiries
            via voice and SMS.
          </Paragraph>
          <Paragraph>
            When you contact Work Buddy, you are communicating directly with our customer
            care team. All SMS messages will clearly identify Work Buddy as the sender.
          </Paragraph>
          <Paragraph>
            Our service includes:
          </Paragraph>
          <List>
            <li>24/7 AI-powered call and text support</li>
            <li>Tour scheduling and rental inquiry responses</li>
            <li>Maintenance request handling</li>
            <li>Payment reminders and billing support</li>
            <li>Account and lease information assistance</li>
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
            <li>Work Buddy obtains your consent through verbal consent during service interactions or when you initiate contact via SMS</li>
            <li>You can opt out by replying STOP, and Work Buddy will honor your request</li>
            <li>Message and data rates may apply</li>
            <li>All messages will clearly identify Work Buddy as the sender</li>
            <li>Your mobile information will not be sold or shared with third parties for promotional or marketing purposes</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Service Terms</SectionTitle>
          <Paragraph>
            Work Buddy provides customer care directly to you. As a Work Buddy customer:
          </Paragraph>
          <List>
            <li>There is no charge to you for using Work Buddy's customer care service</li>
            <li>Standard message and data rates from your carrier may apply</li>
            <li>Service availability is 24/7, 365 days a year</li>
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
            Work Buddy reserves the right to modify or discontinue service at any time
            with reasonable notice. If service changes affect you, we will notify you
            through available contact methods.
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
