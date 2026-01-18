import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, ResponsiveGrid, Button, Badge } from '../../components/Shared/Layout';
import { AuroraBackground } from '../../components/Shared/Backgrounds';
import { FiCheck, FiX, FiCheckCircle } from 'react-icons/fi';

const pmStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WorkBuddy for Property Management",
  "description": "AI Receptionist for property managers. Handles leasing calls, maintenance triage, tour scheduling, and tenant support.",
  "brand": {
    "@type": "Brand",
    "name": "WorkBuddy"
  },
  "offers": {
    "@type": "Offer",
    "price": "299.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};

const PainCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(50, 74, 95, 0.04);
  border: 1px solid ${theme.colors.brand.slate}08;
`;

const UseCaseCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.brand.slate}10;
`;

const FeatureRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.brand.slate}08;

  &:last-child {
    border-bottom: none;
  }
`;

const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.colors.brand.azure}15;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(50, 74, 95, 0.06);
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(50, 74, 95, 0.06);

  thead tr {
    background: ${theme.colors.brand.slate};
    color: white;
  }

  th, td {
    padding: 18px 20px;
    text-align: center;
  }

  th:first-child, td:first-child {
    text-align: left;
  }

  tbody tr {
    border-bottom: 1px solid ${theme.colors.brand.slate}10;
  }

  tbody tr:last-child {
    border-bottom: none;
  }
`;

const WBColumn = styled.td`
  background: ${theme.colors.brand.azure}08;
  color: ${theme.colors.brand.azure};
  font-weight: 600;
`;

const IntegrationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  box-shadow: 0 2px 8px rgba(50, 74, 95, 0.06);
`;

export const PropertyManagementLP = () => {
  return (
    <>
      <SEO
        title="AI Receptionist for Property Management | WorkBuddy"
        description="Capture every leasing lead, triage maintenance calls, and give tenants 24/7 support. AI receptionist built for property managers. Integrates with AppFolio, Buildium. From $299/mo."
        canonical="/property-management"
        structuredData={pmStructuredData}
      />
      <Navbar />

      {/* HERO SECTION */}
      <Section style={{
        paddingTop: 120,
        paddingBottom: 100,
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%)`
      }}>
        <AuroraBackground />
        <Container>
          <ResponsiveGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge>For Property Managers</Badge>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 500,
                color: theme.colors.brand.slate,
                lineHeight: 1.1,
                marginBottom: 24,
                fontFamily: theme.typography.fontFamily.heading
              }}>
                The AI Receptionist Property Managers <span style={{ color: theme.colors.brand.azure }}>Actually Need</span>
              </h1>
              <p style={{ fontSize: 18, color: theme.colors.text.secondary, marginBottom: 32, lineHeight: 1.7 }}>
                WorkBuddy answers leasing inquiries, triages maintenance requests, schedules property tours, and gives tenants 24/7 support—so you can manage more doors without hiring more staff.
              </p>

              <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Captures every leasing lead, day or night',
                  'Smart maintenance triage (emergency vs. routine)',
                  'Integrates with AppFolio, Buildium, Yardi'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: theme.colors.text.primary }}>
                    <FiCheckCircle color={theme.colors.brand.azure} size={20} /> {item}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button
                  data-cal-link="caleb-benedict-4rrqhq/demo"
                  data-cal-namespace="demo"
                  data-cal-config='{"layout":"month_view"}'
                >
                  Get Your Free Demo
                </Button>
                <Button href="/pricing" $variant="ghost">View Pricing →</Button>
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 24, color: theme.colors.text.tertiary, fontSize: 14 }}>
                <span>✓ 30-day guarantee</span>
                <span>✓ From $299/mo</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                background: 'white',
                borderRadius: 20,
                padding: 28,
                boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, background: '#34C759', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>
                    📅
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate }}>Leasing Tour Booked</div>
                    <div style={{ fontSize: 12, color: theme.colors.text.tertiary }}>2 min ago</div>
                  </div>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: theme.colors.text.primary }}>
                  "Scheduled tour for 2BR unit at Oak Park Apartments. Tomorrow at 2 PM. Prospect: Sarah Johnson, budget $1,800/mo, move-in date: Feb 1."
                </div>
              </div>

              {/* Second notification */}
              <div style={{
                background: 'white',
                borderRadius: 16,
                padding: 20,
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                position: 'absolute',
                bottom: -40,
                right: -20,
                width: '80%',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: theme.colors.brand.azure, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16 }}>
                    🔧
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: theme.colors.brand.slate }}>Maintenance Triaged</div>
                    <div style={{ fontSize: 12, color: theme.colors.text.secondary }}>Non-urgent: Garbage disposal • Unit 4B</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* PAIN POINT SECTION */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 20, lineHeight: 1.2 }}>
              49% of Leasing Calls Go Unanswered. <br/>Every One Is Money Lost.
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.7 }}>
              By the time someone calls back, that prospect has already toured your competitor's property and signed a lease.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>💸</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Lost Leasing Revenue</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                A missed leasing call is a potential $12k-24k/year resident lost. One missed call could cost more than a year of WorkBuddy.
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>🔧</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Maintenance Chaos</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Tenants call at 11pm with "emergencies" that aren't. You dispatch at $200/call only to find a tripped circuit breaker.
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>😫</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Staff Burnout</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Your team is answering the same questions over and over: "When is rent due?" "What's the late fee?" "How do I pay?"
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>📉</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Inconsistent Service</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Your reputation suffers when service quality varies by who answers. One bad interaction can cost you a renewal.
              </p>
            </PainCard>
          </div>
        </Container>
      </Section>

      {/* SOLUTION / USE CASES */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Badge>Purpose-Built Features</Badge>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: theme.colors.brand.slate }}>
              An AI That Understands Property Management
            </h2>
          </div>

          <ResponsiveGrid style={{ alignItems: 'start' }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 28, color: theme.colors.brand.slate }}>What WorkBuddy Handles</h3>
              <div>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Leasing Inquiries</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Qualifies leads, captures budget/move-in date/unit preferences, and can schedule tours on your calendar.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Maintenance Triage</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Asks the right questions to distinguish true emergencies from routine requests. Reduces after-hours dispatch costs.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Tour Scheduling</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Books showings directly on your calendar, sends confirmation texts, and can reschedule if needed.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Tenant Support</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Answers common questions about rent, policies, and amenities 24/7.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Work Order Creation</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Creates maintenance tickets directly in your PMS with all relevant details.</div>
                  </div>
                </FeatureRow>
              </div>
            </div>

            <div style={{ background: '#F8F9FA', padding: 32, borderRadius: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, color: theme.colors.brand.slate }}>Works for Every Portfolio Size</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🏠 Small Portfolio (1-50 doors)</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Never miss a leasing call while you're doing showings or handling maintenance.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🏢 Mid-Size (50-200 doors)</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Reduce call volume to your team by 60%+ while improving response times.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🏙️ Large Portfolio (200-500+ doors)</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Standardize service quality across properties with consistent, professional responses.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🔧 Mixed-Use / Commercial</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Handle inquiries from residential and commercial tenants with different protocols.</p>
                </UseCaseCard>
              </div>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* INTEGRATIONS */}
      <Section style={{ background: '#F8F9FA' }}>
        <Container style={{ maxWidth: 900, textAlign: 'center' }}>
          <Badge>Seamless Integrations</Badge>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
            Works With Your Existing Software
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: 40, fontSize: 17 }}>
            WorkBuddy integrates with the property management tools you already use
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <IntegrationBadge>AppFolio</IntegrationBadge>
            <IntegrationBadge>Buildium</IntegrationBadge>
            <IntegrationBadge>Yardi</IntegrationBadge>
            <IntegrationBadge>RentManager</IntegrationBadge>
            <IntegrationBadge>Google Calendar</IntegrationBadge>
            <IntegrationBadge>Outlook</IntegrationBadge>
          </div>

          <p style={{ marginTop: 32, color: theme.colors.text.tertiary, fontSize: 14 }}>
            Don't see your software? Contact us about custom integrations.
          </p>
        </Container>
      </Section>

      {/* COMPARISON */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate }}>WorkBuddy vs. The Alternatives</h2>
            <p style={{ color: theme.colors.text.secondary, marginTop: 12 }}>See how we stack up against traditional solutions</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <ComparisonTable>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Feature</th>
                  <th style={{ background: theme.colors.brand.azure }}>WorkBuddy</th>
                  <th>Answering Service</th>
                  <th>In-House Staff</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500 }}>24/7 Availability</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>PM Industry Expertise</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Maintenance Triage</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td style={{ opacity: 0.5 }}>Basic</td>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Tour Scheduling</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td style={{ opacity: 0.5 }}>Basic</td>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>PMS Integration</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td style={{ opacity: 0.5 }}>Manual</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Cost per 100 doors</td>
                  <WBColumn>~$299/mo</WBColumn>
                  <td style={{ opacity: 0.6 }}>$500+/mo</td>
                  <td style={{ opacity: 0.6 }}>$4,000+/mo</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Fair Housing Consistency</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td style={{ opacity: 0.5 }}>Varies</td>
                  <td style={{ opacity: 0.5 }}>Varies</td>
                </tr>
              </tbody>
            </ComparisonTable>
          </div>
        </Container>
      </Section>

      {/* ROI SECTION */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate }}>The Numbers Speak for Themselves</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', color: theme.colors.text.tertiary, fontWeight: 700, marginBottom: 8 }}>Lost Leasing Revenue</div>
              <div style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, color: '#E53935' }}>$7,000<span style={{ fontSize: 18 }}>/mo</span></div>
              <div style={{ fontSize: 14, color: theme.colors.text.secondary }}>Based on 1 missed lease/month @ $1,400 rent</div>
            </div>
            <div style={{ fontSize: 36, color: theme.colors.text.tertiary }}>vs</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', color: theme.colors.text.tertiary, fontWeight: 700, marginBottom: 8 }}>WorkBuddy Cost</div>
              <div style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, color: theme.colors.brand.azure }}>$299<span style={{ fontSize: 18 }}>/mo</span></div>
              <div style={{ fontSize: 14, color: theme.colors.text.secondary }}>Up to 100 doors, unlimited calls</div>
            </div>
          </div>

          <div style={{ background: 'white', padding: 32, borderRadius: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 18, color: theme.colors.text.primary, lineHeight: 1.6, margin: 0 }}>
              <strong>If WorkBuddy helps you sign just ONE additional lease per month</strong> that would have been lost to a missed call, it pays for itself 5x over. Plus reduced after-hours dispatch costs.
            </p>
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Badge>Customer Stories</Badge>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate }}>
              Trusted by Property Managers
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <TestimonialCard>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, fontSize: 16 }}>
                "We were losing leasing calls to voicemail every weekend. WorkBuddy captured 12 leads in the first month that we would have missed. Signed 3 of them."
              </p>
              <div style={{ fontWeight: 600, color: theme.colors.brand.slate }}>Jennifer R.</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Property Manager, 180 units, Florida</div>
            </TestimonialCard>

            <TestimonialCard>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, fontSize: 16 }}>
                "The maintenance triage alone saved us thousands. No more $200 emergency calls for tripped breakers. WorkBuddy knows what's actually urgent."
              </p>
              <div style={{ fontWeight: 600, color: theme.colors.brand.slate }}>Michael T.</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Regional Manager, 400+ units, Texas</div>
            </TestimonialCard>

            <TestimonialCard>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, fontSize: 16 }}>
                "Fair Housing compliance was always a concern with our answering service. With WorkBuddy, every caller gets the same consistent, professional response."
              </p>
              <div style={{ fontWeight: 600, color: theme.colors.brand.slate }}>Lisa K.</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Owner/Operator, 75 units, California</div>
            </TestimonialCard>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 800 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: 48, color: theme.colors.brand.slate }}>
            Property Management Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: "Does it integrate with AppFolio/Buildium?", a: "Yes! WorkBuddy integrates with major PM software including AppFolio, Buildium, Yardi, and RentManager. Leads, work orders, and messages sync automatically." },
              { q: "How does maintenance triage work?", a: "WorkBuddy asks key questions: Is there active water damage? Is anyone in danger? Is the unit uninhabitable? Based on answers, it categorizes requests as emergency (immediate escalation) or routine (next business day)." },
              { q: "Can it actually schedule property tours?", a: "Yes. WorkBuddy integrates with your calendar to book showings in available time slots. It collects prospect info, sends confirmations, and adds appointments automatically." },
              { q: "Is this Fair Housing compliant?", a: "Consistency is key to Fair Housing compliance. WorkBuddy provides the same professional responses to all callers—no human bias, no inconsistent information." },
              { q: "How much does it cost?", a: "Plans start at $299/month for up to 100 doors. The Professional plan at $499/month includes tour scheduling and PMS integrations. Enterprise pricing available for 500+ doors." }
            ].map((item, i) => (
              <div key={i} style={{ padding: 24, background: 'white', borderRadius: 14, boxShadow: '0 2px 12px rgba(50, 74, 95, 0.04)' }}>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>{item.q}</h4>
                <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6, fontSize: 15 }}>{item.a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button href="/faq" $variant="ghost">View All FAQs →</Button>
          </div>
        </Container>
      </Section>

      {/* PRICING PREVIEW */}
      <Section>
        <Container style={{ maxWidth: 900, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: 40, fontSize: 18 }}>
            No per-minute fees. No hidden costs. Scale as you grow.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            <div style={{ background: 'white', padding: 32, borderRadius: 20, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.text.tertiary, textTransform: 'uppercase', marginBottom: 8 }}>Starter</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.slate, marginBottom: 8 }}>$299<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ color: theme.colors.text.secondary, fontSize: 14 }}>Up to 100 doors</div>
            </div>
            <div style={{ background: theme.colors.brand.azure, padding: 32, borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.9, textTransform: 'uppercase', marginBottom: 8 }}>Professional</div>
              <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 8 }}>$499<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Up to 500 doors + integrations</div>
            </div>
            <div style={{ background: 'white', padding: 32, borderRadius: 20, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.text.tertiary, textTransform: 'uppercase', marginBottom: 8 }}>Enterprise</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.slate, marginBottom: 8 }}>Custom</div>
              <div style={{ color: theme.colors.text.secondary, fontSize: 14 }}>500+ doors, dedicated support</div>
            </div>
          </div>

          <Button href="/pricing" $variant="outline" style={{ marginTop: 32 }}>
            View Full Pricing Details
          </Button>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section style={{ padding: '80px 0', textAlign: 'center', background: theme.colors.brand.slate, color: 'white' }}>
        <Container>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, marginBottom: 16 }}>Capture Every Lead. Triage Every Call.</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            30-day money-back guarantee. No contracts. Setup in 15 minutes.
          </p>
          <Button
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ background: 'white', color: theme.colors.brand.slate }}
          >
            Schedule Your Free Demo
          </Button>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
