import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, ResponsiveGrid, Badge, Button } from '../../components/Shared/Layout';
import { FiTarget, FiUsers, FiShield, FiHeart } from 'react-icons/fi';

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "WorkBuddy",
    "founder": {
      "@type": "Person",
      "name": "Caleb Benedict"
    },
    "description": "AI receptionist service built specifically for laundromats and property management companies."
  }
};

const ValueCard = styled.div`
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(50, 74, 95, 0.06);
  border: 1px solid ${theme.colors.brand.slate}08;
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${theme.colors.brand.azure}12;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    color: ${theme.colors.brand.azure};
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 32px;
`;

const MissionSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

export const About = () => {
  return (
    <>
      <SEO
        title="About WorkBuddy | Built by Operators, for Operators"
        description="WorkBuddy was created by Caleb Benedict, who built AI for 100+ laundromat locations. Learn our story and mission."
        canonical="/about"
        keywords="WorkBuddy about, Caleb Benedict, laundromat AI company, WorkBuddy founder"
        structuredData={[aboutStructuredData, {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://getworkbuddy.com" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://getworkbuddy.com/about" }
          ]
        }]}
      />
      <Navbar />
      <main>

      {/* Mission Hero */}
      <Section style={{ paddingTop: 120 }}>
        <Container style={{ maxWidth: 900, textAlign: 'center' }}>
          <Badge>Our Mission</Badge>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            We Believe Every Business Deserves <span style={{ color: theme.colors.brand.azure }}>Professional Phone Service</span>
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
            Large companies have call centers. Small businesses have you, scrambling to answer your phone while trying to run your business. We think that's unfair. WorkBuddy gives laundromats and property managers enterprise-level phone service at a price they can actually afford.
          </p>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, background: theme.colors.brand.slate, borderRadius: 24, padding: '20px 0' }}>
            <StatCard>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white', marginBottom: 8 }}>100+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>Laundromat Locations Powered</div>
            </StatCard>
            <StatCard style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white', marginBottom: 8 }}>500K+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>Calls Handled</div>
            </StatCard>
            <StatCard>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white', marginBottom: 8 }}>24/7</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>Always Available</div>
            </StatCard>
          </div>
        </Container>
      </Section>

      {/* Founder Story */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <ResponsiveGrid>
            <div>
              <Badge>Founder Story</Badge>
              <h2 style={{ fontSize: 36, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 24, lineHeight: 1.2 }}>
                Built by Someone Who's Been There
              </h2>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, marginBottom: 20, lineHeight: 1.7 }}>
                WorkBuddy was created by <strong style={{ color: theme.colors.brand.slate }}>Caleb Benedict</strong>, who knows the laundromat and property management industries from the inside.
              </p>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, marginBottom: 20, lineHeight: 1.7 }}>
                Caleb previously built "Bella," an AI receptionist that powered phone operations for <strong style={{ color: theme.colors.brand.slate }}>over 100 laundromat locations</strong>. He spent years learning exactly what customers call about, what questions trip up generic answering services, and what it takes to handle calls at scale.
              </p>
              <p style={{ fontSize: 17, color: theme.colors.text.secondary, marginBottom: 28, lineHeight: 1.7 }}>
                Through hundreds of thousands of calls, he discovered that laundromats and property management companies share similar challenges: high call volumes, repetitive questions, and the need for 24/7 availability. WorkBuddy is the solution he wished existed when he started.
              </p>
              <blockquote style={{
                borderLeft: `4px solid ${theme.colors.brand.azure}`,
                paddingLeft: 24,
                margin: 0,
                fontStyle: 'italic',
                fontSize: 18,
                color: theme.colors.brand.slate,
                lineHeight: 1.6
              }}>
                "I've handled hundreds of thousands of calls for laundromats. I know exactly what your customers ask, how they ask it, and what good service looks like. WorkBuddy is everything I learned, packaged into a service anyone can use."
                <div style={{ marginTop: 12, fontStyle: 'normal', fontWeight: 600, fontSize: 14, color: theme.colors.text.secondary }}>
                  — Caleb Benedict, Founder
                </div>
              </blockquote>
            </div>
            <div style={{
              height: 500,
              background: 'linear-gradient(135deg, #e8eef5 0%, #d4dde8 100%)',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Abstract placeholder design */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200,
                height: 200,
                background: theme.colors.brand.azure + '20',
                borderRadius: '50%'
              }} />
              <span style={{ color: theme.colors.text.tertiary, zIndex: 1, fontSize: 15 }}>Founder Photo</span>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* Company Values */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <Badge>What We Stand For</Badge>
            <h2 style={{ fontSize: 36, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
              Our Values
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary }}>
              These principles guide everything we do at WorkBuddy
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <ValueCard>
              <IconWrapper>
                <FiTarget size={26} />
              </IconWrapper>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Customer Success First
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                We only succeed when you succeed. Our job isn't to answer calls—it's to help you capture more revenue, save time, and deliver better service to your customers.
              </p>
            </ValueCard>

            <ValueCard>
              <IconWrapper>
                <FiShield size={26} />
              </IconWrapper>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Radical Transparency
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                No hidden fees. No confusing contracts. No surprises. We tell you exactly what WorkBuddy can and can't do before you sign up. That's why we offer a 30-day guarantee.
              </p>
            </ValueCard>

            <ValueCard>
              <IconWrapper>
                <FiUsers size={26} />
              </IconWrapper>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Industry Expertise
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                We'd rather be the best AI receptionist for laundromats and property management than a mediocre solution for everyone. Deep knowledge beats broad coverage.
              </p>
            </ValueCard>

            <ValueCard>
              <IconWrapper>
                <FiHeart size={26} />
              </IconWrapper>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Small Business Advocacy
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                We believe small businesses are the backbone of the economy. They deserve tools that were previously only available to enterprises with massive budgets.
              </p>
            </ValueCard>
          </div>
        </Container>
      </Section>

      {/* Why These Industries */}
      <Section style={{ background: '#F8F9FA' }}>
        <Container style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
              Why Laundromats & Property Management?
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.7 }}>
              These industries share unique challenges that generic solutions can't solve
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            <div style={{ background: 'white', padding: 28, borderRadius: 16, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32 }}>🧺</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>Laundromats</h3>
                <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                  Customers call about refunds, machine issues, hours, WDF orders, and pickup schedules. Generic answering services don't know what a "vend refund" is or how to take a wash-and-fold order. WorkBuddy does.
                </p>
              </div>
            </div>

            <div style={{ background: 'white', padding: 28, borderRadius: 16, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32 }}>🏢</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>Property Management</h3>
                <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>
                  Prospects call about available units. Tenants call about maintenance—sometimes at 2am. You need someone who can distinguish a real emergency from "my lightbulb is out." WorkBuddy handles the triage intelligently.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section style={{ background: theme.colors.brand.slate, color: 'white', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: 36, marginBottom: 16 }}>Want to See WorkBuddy in Action?</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Schedule a demo and see exactly how we can help your business.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
              style={{ background: 'white', color: theme.colors.brand.slate }}
            >
              Book a Demo
            </Button>
            <Button
              href="/contact"
              $variant="outline"
              style={{ borderColor: 'white', color: 'white' }}
            >
              Contact Us
            </Button>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', fontSize: 15 }}>
            <a href="mailto:hello@getworkbuddy.com" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>hello@getworkbuddy.com</a>
            <a href="tel:2036051105" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>(203) 605-1105</a>
          </div>
        </Container>
      </Section>
      </main>

      <Footer />
    </>
  );
};
