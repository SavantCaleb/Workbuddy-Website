import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Badge } from '../../components/Shared/Layout';
import { FiCheck, FiClock, FiShield, FiHeadphones, FiZap, FiUsers } from 'react-icons/fi';

const demoStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Book a Demo | WorkBuddy",
  "description": "Schedule a free demo of WorkBuddy's AI receptionist service for laundromats and property management."
};

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.colors.brand.slate}08;

  &:last-child {
    border-bottom: none;
  }
`;

const IconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${theme.colors.brand.azure}10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: ${theme.colors.brand.azure};
  }
`;

const CalendarWrapper = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(50, 74, 95, 0.1);
  overflow: hidden;
  min-height: 650px;
  border: 1px solid ${theme.colors.brand.slate}08;

  @media (max-width: 768px) {
    min-height: 550px;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${theme.colors.brand.azure}08;
  border-radius: 8px;
  font-size: 14px;
  color: ${theme.colors.text.secondary};

  svg {
    color: ${theme.colors.brand.azure};
  }
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const Demo = () => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.Cal) {
        // @ts-ignore
        window.Cal('init', { origin: 'https://cal.com' });
        // @ts-ignore
        window.Cal('inline', {
          elementOrSelector: '#cal-embed',
          calLink: 'caleb-benedict-4rrqhq/demo',
          layout: 'month_view'
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Free Demo: See AI Handle Your Laundromat Calls"
        description="Schedule a free 15-minute demo of WorkBuddy. See how our AI receptionist can transform your phone operations for laundromats or property management."
        canonical="/demo"
        keywords="laundromat demo, AI receptionist demo, book demo WorkBuddy, laundromat AI demo"
        structuredData={[demoStructuredData, {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://getworkbuddy.com" },
            { "@type": "ListItem", "position": 2, "name": "Demo", "item": "https://getworkbuddy.com/demo" }
          ]
        }]}
      />
      <Navbar />

      <Section style={{ paddingTop: 120 }}>
        <Container>
          <DemoGrid>
            {/* Left Column - Info */}
            <div>
              <Badge>Free Demo</Badge>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 20, lineHeight: 1.2 }}>
                See WorkBuddy Handle Calls for <span style={{ color: theme.colors.brand.azure }}>Your Business</span>
              </h1>
              <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.7, marginBottom: 32 }}>
                Book a quick 15-minute call with our team. We'll show you exactly how WorkBuddy handles calls for laundromats or property management companies—with a live demo customized to your industry.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <TrustBadge>
                  <FiClock size={16} />
                  15 minutes
                </TrustBadge>
                <TrustBadge>
                  <FiShield size={16} />
                  No obligation
                </TrustBadge>
                <TrustBadge>
                  <FiUsers size={16} />
                  Talk to a human
                </TrustBadge>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.text.tertiary, marginBottom: 16 }}>
                  What You'll Learn
                </h3>

                <BenefitItem>
                  <IconCircle>
                    <FiHeadphones size={20} />
                  </IconCircle>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>
                      Live Demo Call
                    </h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: 14, lineHeight: 1.6 }}>
                      Hear WorkBuddy answer a sample call for your business type—see exactly how it sounds and what it can do
                    </p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <IconCircle>
                    <FiZap size={20} />
                  </IconCircle>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>
                      Custom Setup Plan
                    </h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: 14, lineHeight: 1.6 }}>
                      Get a tailored onboarding plan based on your specific business needs and call volume
                    </p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <IconCircle>
                    <FiCheck size={20} />
                  </IconCircle>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>
                      ROI Analysis
                    </h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: 14, lineHeight: 1.6 }}>
                      See how much time and money you could save based on your current call handling
                    </p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <IconCircle>
                    <FiShield size={20} />
                  </IconCircle>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>
                      30-Day Guarantee Details
                    </h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: 14, lineHeight: 1.6 }}>
                      Learn about our risk-free trial and what makes it truly no-obligation
                    </p>
                  </div>
                </BenefitItem>
              </div>

              <div style={{ padding: 24, background: theme.colors.brand.slate + '06', borderRadius: 12, border: `1px solid ${theme.colors.brand.slate}10` }}>
                <p style={{ color: theme.colors.text.secondary, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: theme.colors.brand.slate }}>No sales pressure.</strong> This is a friendly conversation to see if WorkBuddy is right for your business. If it's not a fit, we'll tell you.
                </p>
              </div>
            </div>

            {/* Right Column - Calendar */}
            <CalendarWrapper>
              <div id="cal-embed" style={{ width: '100%', height: '100%', minHeight: 650 }} />
            </CalendarWrapper>
          </DemoGrid>
        </Container>
      </Section>

      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 12 }}>
              What Our Customers Say After Their Demo
            </h2>
            <p style={{ color: theme.colors.text.secondary }}>
              Real feedback from real business owners
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ background: 'white', padding: 28, borderRadius: 16, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.04)' }}>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                "The demo call was so helpful. I could immediately see how this would save us hours every week on phone calls."
              </p>
              <div style={{ fontWeight: 600, color: theme.colors.brand.slate, fontSize: 14 }}>
                — Laundromat Owner, Texas
              </div>
            </div>

            <div style={{ background: 'white', padding: 28, borderRadius: 16, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.04)' }}>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                "No pressure at all. They showed me exactly what it does and let me decide. I signed up the same day."
              </p>
              <div style={{ fontWeight: 600, color: theme.colors.brand.slate, fontSize: 14 }}>
                — Property Manager, Florida
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section style={{ background: 'white' }}>
        <Container style={{ maxWidth: 700, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
            Prefer to Talk Now?
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: 24, lineHeight: 1.6 }}>
            If you'd rather skip the scheduling and talk to someone right away, give us a call or send us an email.
          </p>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@getworkbuddy.com" style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none', fontSize: 16 }}>
              hello@getworkbuddy.com
            </a>
            <a href="tel:2036051105" style={{ color: theme.colors.brand.azure, fontWeight: 600, textDecoration: 'none', fontSize: 16 }}>
              (203) 605-1105
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
