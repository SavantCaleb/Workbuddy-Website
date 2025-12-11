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

export const Privacy: React.FC = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last updated: {new Date().toLocaleDateString()}</LastUpdated>

        <Section>
          <SectionTitle>1. Information We Collect</SectionTitle>
          <Paragraph>
            Work Buddy collects information you provide directly to us when you create an account, 
            use our services, or contact us for support. This may include:
          </Paragraph>
          <List>
            <li>Your name, email address, and phone number</li>
            <li>Business information and preferences</li>
            <li>Call logs, text messages, and communication data processed by our AI</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Technical information about your device and usage</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <Paragraph>
            We use the information we collect to:
          </Paragraph>
          <List>
            <li>Provide, maintain, and improve our AI answering service</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Train and improve our AI models to better serve apartment community residents</li>
            <li>Comply with legal obligations and protect our rights</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Information Sharing</SectionTitle>
          <Paragraph>
            We do not sell, trade, or otherwise transfer your personal information to third parties except:
          </Paragraph>
          <List>
            <li>With your explicit consent</li>
            <li>To trusted service providers who assist in operating our service</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or acquisition</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Data Security</SectionTitle>
          <Paragraph>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction. All 
            communications are encrypted, and we regularly review our security practices.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. SMS and Communication Data</SectionTitle>
          <Paragraph>
            As an AI-powered phone and SMS customer service, we process communications for
            apartment communities we serve. We handle this data with strict confidentiality
            and use it only to provide our services and improve our AI capabilities.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. SMS Messaging Services</SectionTitle>
          <Paragraph>
            Work Buddy Inc provides AI-powered customer service for residential apartment
            communities via SMS. When you contact an apartment community that uses Work Buddy's
            customer service:
          </Paragraph>
          <List>
            <li>You consent to receive text messages from Work Buddy regarding your rental inquiry, apartment, maintenance, and account</li>
            <li>All messages will be sent from Work Buddy and identify the specific property</li>
            <li>Message frequency varies based on your interactions</li>
            <li>Message and data rates may apply</li>
            <li>Reply STOP to any message to opt out</li>
            <li>Reply HELP for assistance</li>
          </List>
          <Paragraph>
            Your mobile information will not be sold, shared, or transferred to third parties
            for promotional or marketing purposes. Consent is not a condition of purchase.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Your Rights</SectionTitle>
          <Paragraph>
            You have the right to:
          </Paragraph>
          <List>
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Object to processing of your personal information</li>
            <li>File a complaint with relevant data protection authorities</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>8. Data Retention</SectionTitle>
          <Paragraph>
            We retain your information for as long as necessary to provide our services and 
            comply with legal obligations. Communication data may be retained for up to 7 years 
            for business and legal purposes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Changes to This Policy</SectionTitle>
          <Paragraph>
            We may update this privacy policy from time to time. We will notify you of any 
            material changes by posting the new policy on this page and updating the "Last 
            updated" date.
          </Paragraph>
        </Section>

        <ContactInfo>
          <h3>Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <p>Email: <a href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a></p>
          <p>Address: 2329 Long Hill Road, Guilford, CT 06437</p>
          <p>Phone: <a href="tel:+12036051105">+1 (203) 605-1105</a></p>
        </ContactInfo>
      </Container>
    </PageWrapper>
  );
};