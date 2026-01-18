import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Badge, Button } from '../../components/Shared/Layout';
import { FiMail, FiPhone, FiMessageSquare, FiClock, FiMapPin } from 'react-icons/fi';

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "WorkBuddy",
    "email": "hello@getworkbuddy.com",
    "telephone": "+1-203-605-1105",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Connecticut",
      "addressCountry": "US"
    }
  }
};

const ContactCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 4px 24px rgba(50, 74, 95, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${theme.colors.brand.slate}08;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(50, 74, 95, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: ${theme.colors.brand.azure}10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  svg {
    color: ${theme.colors.brand.azure};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 60px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us | WorkBuddy"
        description="Get in touch with WorkBuddy. We're here to answer your questions about our AI receptionist service for laundromats and property managers."
        canonical="/contact"
        structuredData={contactStructuredData}
      />
      <Navbar />

      <Section style={{ paddingTop: 120 }}>
        <Container style={{ maxWidth: 1000, textAlign: 'center' }}>
          <Badge>Get in Touch</Badge>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            We'd Love to Hear From You
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto' }}>
            Have questions about WorkBuddy? Want to see it in action? Reach out through any of the channels below.
          </p>

          <ContactGrid>
            <ContactCard>
              <IconWrapper>
                <FiMail size={32} />
              </IconWrapper>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>Email Us</h3>
              <p style={{ color: theme.colors.text.secondary, marginBottom: 20, lineHeight: 1.6, fontSize: 15 }}>
                For general inquiries, support questions, or partnership opportunities
              </p>
              <a
                href="mailto:hello@getworkbuddy.com"
                style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none', fontSize: 17 }}
              >
                hello@getworkbuddy.com
              </a>
            </ContactCard>

            <ContactCard>
              <IconWrapper>
                <FiPhone size={32} />
              </IconWrapper>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>Call Us</h3>
              <p style={{ color: theme.colors.text.secondary, marginBottom: 20, lineHeight: 1.6, fontSize: 15 }}>
                Talk to a real human on our team. We're happy to answer any questions.
              </p>
              <a
                href="tel:2036051105"
                style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none', fontSize: 17 }}
              >
                (203) 605-1105
              </a>
            </ContactCard>

            <ContactCard>
              <IconWrapper>
                <FiMessageSquare size={32} />
              </IconWrapper>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>Book a Demo</h3>
              <p style={{ color: theme.colors.text.secondary, marginBottom: 20, lineHeight: 1.6, fontSize: 15 }}>
                See WorkBuddy in action with a personalized demo for your business
              </p>
              <Button
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ padding: '12px 28px' }}
              >
                Schedule Demo
              </Button>
            </ContactCard>
          </ContactGrid>
        </Container>
      </Section>

      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 20 }}>
                Quick Response Times
              </h2>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, marginBottom: 28, fontSize: 16 }}>
                We know your time is valuable. That's why we aim to respond to all inquiries within a few hours during business days. For urgent matters, give us a call.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: theme.colors.text.secondary }}>
                  <FiClock size={20} color={theme.colors.brand.azure} />
                  <span>Monday - Friday, 9am - 6pm EST</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: theme.colors.text.secondary }}>
                  <FiMapPin size={20} color={theme.colors.brand.azure} />
                  <span>Based in Connecticut, USA</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: 32, borderRadius: 20, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.04)' }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: theme.colors.brand.slate }}>
                Enterprise & Multi-Location
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
                Managing multiple laundromat locations or a large property portfolio? Our enterprise team can create a custom solution with volume pricing, dedicated support, and specialized integrations.
              </p>
              <a
                href="mailto:sales@getworkbuddy.com"
                style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <FiMail size={18} />
                sales@getworkbuddy.com
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container style={{ maxWidth: 700, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
            Common Questions
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: 32, fontSize: 16 }}>
            Looking for quick answers? Check our FAQ page for detailed information about WorkBuddy.
          </p>
          <Button
            href="/faq"
            $variant="outline"
          >
            View FAQ
          </Button>
        </Container>
      </Section>

      <Section style={{ background: theme.colors.brand.slate, color: 'white', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: 36, marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Join hundreds of businesses using WorkBuddy to never miss another call.
          </p>
          <Button
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ background: 'white', color: theme.colors.brand.slate }}
          >
            Book Your Free Demo
          </Button>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
