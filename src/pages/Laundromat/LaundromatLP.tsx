import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, ResponsiveGrid, Button, Badge } from '../../components/Shared/Layout';
import { AuroraBackground } from '../../components/Shared/Backgrounds';
import { FiCheck, FiX, FiCheckCircle } from 'react-icons/fi';

// Override navbar position when banner is present
const NavbarOffset = createGlobalStyle`
  nav[style*="position: fixed"] {
    top: 48px !important;
  }
`;

const MigrationBanner = styled.div`
  background: #DC2626;
  padding: 14px 20px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
`;

const laundromatStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WorkBuddy for Laundromats",
  "description": "AI Receptionist built specifically for laundromats. Handles refunds, WDF orders, emergencies, and more.",
  "brand": {
    "@type": "Brand",
    "name": "WorkBuddy"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.00",
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

export const LaundromatLP = () => {
  return (
    <>
      <SEO
        title="AI Receptionist for Laundromats | WorkBuddy"
        description="Never miss a laundromat call again. WorkBuddy handles refunds, WDF orders, machine questions, and emergencies 24/7. Built by the creator of Bella AI. From $99/mo."
        canonical="/laundromats"
        structuredData={laundromatStructuredData}
      />
      <NavbarOffset />

      {/* BELLA MIGRATION BANNER - Fixed at top */}
      <MigrationBanner>
        <Container>
          <p style={{ margin: 0, fontSize: 16, color: 'white', lineHeight: 1.5 }}>
            <strong>🚨 Bella/Savants User?</strong> I'm personally migrating operators this week. Same price, zero downtime.{' '}
            Fill out the form below or text me: <strong>(203) 605-1105</strong>
          </p>
        </Container>
      </MigrationBanner>

      <Navbar />

      {/* HERO SECTION - Extra padding for fixed banner + navbar */}
      <Section style={{
        paddingTop: 168,
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
              <Badge>For Laundromat Operators</Badge>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 500,
                color: theme.colors.brand.slate,
                lineHeight: 1.1,
                marginBottom: 24,
                fontFamily: theme.typography.fontFamily.heading
              }}>
                The AI Receptionist Built by the <span style={{ color: theme.colors.brand.azure }}>Creator of Bella</span>
              </h1>
              <p style={{ fontSize: 18, color: theme.colors.text.secondary, marginBottom: 32, lineHeight: 1.7 }}>
                WorkBuddy handles refund requests, schedules wash-and-fold orders, answers machine questions, and escalates real emergencies—all without interrupting your day. Built by the creator of Bella, the AI that powered 100+ laundromat locations.
              </p>

              <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Answers in under 3 rings, 24/7/365',
                  'Bilingual English/Spanish support',
                  'Integrates with Curbside, CleanCloud, FastCard & LaundryCard'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: theme.colors.text.primary }}>
                    <FiCheckCircle color={theme.colors.brand.azure} size={20} /> {item}
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 8, fontSize: 15, color: theme.colors.text.primary }}>
                Questions? Text or call Caleb directly: <strong style={{ color: theme.colors.brand.azure }}>(203) 605-1105</strong>
              </p>

              <div style={{ marginTop: 16, display: 'flex', gap: 24, color: theme.colors.text.tertiary, fontSize: 14 }}>
                <span>✓ 30-day guarantee</span>
                <span>✓ From $99/mo</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* MIGRATION FORM */}
              <div style={{
                background: 'white',
                borderRadius: 20,
                padding: 32,
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: theme.colors.brand.slate,
                  marginBottom: 24,
                  textAlign: 'center'
                }}>
                  Get Migrated Before Feb 1
                </h3>

                <form
                  action="https://formspree.io/f/xreepdpa"
                  method="POST"
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />

                  <input
                    type="text"
                    name="business_name"
                    placeholder="Business Name"
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />

                  <select
                    name="locations"
                    required
                    defaultValue=""
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>Number of Locations</option>
                    <option value="1">1 Location</option>
                    <option value="2-3">2-3 Locations</option>
                    <option value="4+">4+ Locations</option>
                  </select>

                  <input
                    type="text"
                    name="current_price"
                    placeholder="What are you currently paying?"
                    style={{
                      padding: '14px 16px',
                      borderRadius: 10,
                      border: `1px solid ${theme.colors.brand.slate}20`,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: 17,
                      fontWeight: 600,
                      marginTop: 8,
                      background: theme.colors.brand.azure,
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#1a8cd8'}
                    onMouseOut={(e) => e.currentTarget.style.background = theme.colors.brand.azure}
                  >
                    Reserve My Spot
                  </button>
                </form>

                <p style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: theme.colors.text.secondary,
                  textAlign: 'center',
                  lineHeight: 1.5
                }}>
                  I'll personally text you within a few hours to confirm we're set up. — <strong style={{ color: theme.colors.brand.slate }}>Caleb</strong>
                </p>
              </div>
            </motion.div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* FOUNDER STORY - Moved up for Bella migration credibility */}
      <Section>
        <Container>
          <ResponsiveGrid style={{ alignItems: 'center' }}>
            <div>
              <Badge>Founder Story</Badge>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 24, lineHeight: 1.2 }}>
                Built by Someone Who's Done This Before
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: theme.colors.text.secondary, marginBottom: 20 }}>
                WorkBuddy was created by <strong style={{ color: theme.colors.brand.slate }}>Caleb Benedict</strong>, who previously built "Bella"—an AI receptionist that handled calls for <strong style={{ color: theme.colors.brand.slate }}>100+ laundromat locations</strong> across the country.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: theme.colors.text.secondary, marginBottom: 28 }}>
                Caleb spent years learning what laundromat customers actually call about. The refund requests. The "is my laundry ready?" calls at 9pm. The emergencies at 2am. He built Bella to solve these problems. Now he's taking everything he learned and making it available to you.
              </p>
              <blockquote style={{ borderLeft: `4px solid ${theme.colors.brand.azure}`, paddingLeft: 24, margin: 0, fontStyle: 'italic', fontSize: 17, color: theme.colors.brand.slate, lineHeight: 1.6 }}>
                "I've handled hundreds of thousands of laundromat calls. I know what your customers are asking before they ask it."
              </blockquote>
            </div>
            <div>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(50, 74, 95, 0.12)'
              }}>
                <iframe
                  src="https://www.youtube.com/embed/PmPujFIuZzo"
                  title="Interview with Caleb Benedict - Clean Show 2025"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p style={{
                marginTop: 12,
                fontSize: 13,
                color: theme.colors.text.tertiary,
                textAlign: 'center'
              }}>
                Interview with Caleb Benedict at Clean Show 2025 — via{' '}
                <a
                  href="https://www.youtube.com/watch?v=PmPujFIuZzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.colors.brand.azure, textDecoration: 'none' }}
                >
                  Splash Em' Out Laundry
                </a>
              </p>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* PAIN POINT SECTION */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 20, lineHeight: 1.2 }}>
              You Didn't Open a Laundromat to <br/>Answer Phones All Day
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.7 }}>
              By the time you call back, they've already driven to your competitor. Or worse—they leave a 1-star review about "no one ever answering."
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>💸</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Lost WDF Revenue</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                Every missed wash-and-fold inquiry is a $30-75 order walking out the door. Multiply that by 2-3 per day.
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>⭐</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Bad Reviews</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                "Called three times, no answer" shows up on Google and stays there forever. One missed call can cost you dozens of customers.
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>😡</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>Refund Frustrations</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                A $1.50 machine malfunction becomes a 1-star review and angry Facebook post when no one answers the phone.
              </p>
            </PainCard>

            <PainCard>
              <div style={{ fontSize: 36, marginBottom: 16 }}>🚨</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, color: theme.colors.brand.slate }}>After-Hours Emergencies</h3>
              <p style={{ fontSize: 15, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                That water leak at 2am? You find out at 8am when there's 3 inches of water on your floor and thousands in damage.
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
              An AI That Actually Speaks Laundromat
            </h2>
          </div>

          <ResponsiveGrid style={{ alignItems: 'start' }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 28, color: theme.colors.brand.slate }}>What WorkBuddy Handles</h3>
              <div>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Vend Refund Requests</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Logs machine number, amount, and customer info. Can send coupons or process small refunds automatically.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Wash & Fold Orders</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Takes complete orders with weight estimates, special instructions, and pickup/delivery preferences.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Hours, Location & Pricing</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Answers the questions that make up 60% of calls without you lifting a finger.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Emergency Escalation</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Floods, fires, and security issues get to you immediately via call, text, or both.</div>
                  </div>
                </FeatureRow>
                <FeatureRow>
                  <CheckIcon><FiCheck size={14} color={theme.colors.brand.azure} /></CheckIcon>
                  <div>
                    <div style={{ fontWeight: 600, color: theme.colors.brand.slate, marginBottom: 4 }}>Machine Status Updates</div>
                    <div style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>Tells callers about out-of-service machines and alternative options.</div>
                  </div>
                </FeatureRow>
              </div>
            </div>

            <div style={{ background: '#F8F9FA', padding: 32, borderRadius: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, color: theme.colors.brand.slate }}>Works for Every Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🪙 Coin-Op & Card-Op</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Handle hours, pricing, machine issues, and refund requests 24/7.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>👕 Wash-and-Fold</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Capture every order, quote prices, and schedule pickups automatically.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🚚 Pickup & Delivery</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Coordinate routes, confirm addresses, and manage delivery windows.</p>
                </UseCaseCard>
                <UseCaseCard>
                  <strong style={{ color: theme.colors.brand.slate }}>🏢 Multi-Location</strong>
                  <p style={{ fontSize: 14, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.5 }}>Route calls to the right location and maintain consistent service quality.</p>
                </UseCaseCard>
              </div>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* COMPARISON */}
      <Section style={{ background: '#F0F4F8' }}>
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
                  <th>Voicemail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500 }}>24/7 Availability</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Laundromat Expertise</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Flat Monthly Rate</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td><FiCheck size={20} style={{ opacity: 0.4 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Takes WDF Orders</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Handles Refund Requests</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td style={{ opacity: 0.5 }}>Basic</td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>POS Integration</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Bilingual (Eng/Span)</td>
                  <WBColumn><FiCheck size={20} /></WBColumn>
                  <td style={{ opacity: 0.5 }}>Extra cost</td>
                  <td><FiX size={20} style={{ opacity: 0.3 }} /></td>
                </tr>
              </tbody>
            </ComparisonTable>
          </div>
        </Container>
      </Section>

      {/* ROI SECTION */}
      <Section>
        <Container style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate }}>The Math on Missed Calls</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', color: theme.colors.text.tertiary, fontWeight: 700, marginBottom: 8 }}>Missed WDF Revenue</div>
              <div style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, color: '#E53935' }}>$2,700<span style={{ fontSize: 18 }}>/mo</span></div>
              <div style={{ fontSize: 14, color: theme.colors.text.secondary }}>Based on 2 missed orders/day @ $45 avg</div>
            </div>
            <div style={{ fontSize: 36, color: theme.colors.text.tertiary }}>vs</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', color: theme.colors.text.tertiary, fontWeight: 700, marginBottom: 8 }}>WorkBuddy Cost</div>
              <div style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, color: theme.colors.brand.azure }}>$99<span style={{ fontSize: 18 }}>/mo</span></div>
              <div style={{ fontSize: 14, color: theme.colors.text.secondary }}>Starting price, unlimited calls</div>
            </div>
          </div>

          <div style={{ background: theme.colors.brand.azure + '08', padding: 32, borderRadius: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 18, color: theme.colors.text.primary, lineHeight: 1.6, margin: 0 }}>
              <strong>If WorkBuddy captures just ONE additional WDF order per week</strong> that you would have missed, it pays for itself 2x over. Everything else is profit.
            </p>
          </div>
        </Container>
      </Section>

      {/* SOCIAL PROOF */}
      <Section style={{ background: '#F8F9FA' }}>
        <Container style={{ maxWidth: 800, textAlign: 'center' }}>
          <Badge>Proven Technology</Badge>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 24 }}>
            The Same Technology That Powered 100+ Locations
          </h2>
          <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.7, marginBottom: 32 }}>
            WorkBuddy is built on the same AI technology that powered Bella—the original laundromat AI receptionist that handled hundreds of thousands of calls across 100+ locations nationwide.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.azure }}>100+</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Locations Served</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.azure }}>500K+</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Calls Handled</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.azure }}>3+</div>
              <div style={{ fontSize: 14, color: theme.colors.text.tertiary }}>Years of Experience</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 800 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: 48, color: theme.colors.brand.slate }}>
            Laundromat-Specific Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: "What systems does WorkBuddy integrate with?", a: "We integrate with Curbside, CleanCloud, FastCard, and LaundryCard—allowing for order creation, status updates, and customer lookup." },
              { q: "Can it actually take wash-and-fold orders?", a: "Absolutely. WorkBuddy captures customer details, weight estimates, special instructions (like detergent preferences), and pickup/delivery times. Orders go directly to your system or as notifications." },
              { q: "How does it handle refund requests?", a: "WorkBuddy documents the machine number, amount, and customer contact info. You can set up automatic refunds for small amounts, or have all requests sent to you for review." },
              { q: "What if there's a flood at 2am?", a: "You define what constitutes an emergency during setup. For floods, fires, or security issues, WorkBuddy immediately calls/texts you and can even dispatch emergency services." },
              { q: "How much does it cost?", a: "Plans start at $99/month for single-location operators. WDF and scheduling features are included in the $199/month Growth plan. No per-call fees." }
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
            No per-minute fees. No hidden costs. Just flat-rate service.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            <div style={{ background: 'white', padding: 32, borderRadius: 20, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.text.tertiary, textTransform: 'uppercase', marginBottom: 8 }}>Starter</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.slate, marginBottom: 8 }}>$99<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ color: theme.colors.text.secondary, fontSize: 14 }}>Single location, coin-op focus</div>
            </div>
            <div style={{ background: theme.colors.brand.azure, padding: 32, borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.9, textTransform: 'uppercase', marginBottom: 8 }}>Growth</div>
              <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 8 }}>$199<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>+ WDF orders & scheduling</div>
            </div>
            <div style={{ background: 'white', padding: 32, borderRadius: 20, boxShadow: '0 4px 20px rgba(50, 74, 95, 0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.text.tertiary, textTransform: 'uppercase', marginBottom: 8 }}>Multi-Location</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.brand.slate, marginBottom: 8 }}>$299<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ color: theme.colors.text.secondary, fontSize: 14 }}>2+ locations, priority support</div>
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
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, marginBottom: 16 }}>Ready to Get Migrated?</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            30-day money-back guarantee. No contracts. Setup in 15 minutes.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'white', color: theme.colors.brand.slate }}
          >
            Fill Out the Form Above
          </Button>
          <p style={{ marginTop: 20, fontSize: 16 }}>
            Or text Caleb directly: <strong>(203) 605-1105</strong>
          </p>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
