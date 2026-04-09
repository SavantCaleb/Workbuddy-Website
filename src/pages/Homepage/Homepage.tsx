import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, ResponsiveGrid, Button, Badge } from '../../components/Shared/Layout';
import { AuroraBackground } from '../../components/Shared/Backgrounds';
import { FiCheckCircle, FiClock, FiActivity, FiX, FiCheck, FiPlay, FiPause, FiPhoneIncoming, FiCalendar, FiUser, FiSmartphone } from 'react-icons/fi';
import { useIsMobile } from '../../hooks/useIsMobile';
import styled, { css } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Reusing the ActivityFeed and Player from the original file for the Hero section, as they are complex and specific.
// I will keep them local to this file or move to a specific component file if they get too large.

const ActivityCard = styled(motion.div)<{ $isMobile?: boolean }>`
  background: ${props => props.$isMobile 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'rgba(255, 255, 255, 0.9)'};
  ${props => !props.$isMobile && css`backdrop-filter: blur(12px);`}
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  width: 320px;
  position: absolute;
  ${props => props.$isMobile && css`
    will-change: transform;
    transform: translateZ(0);
  `}
  border: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 10;
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
`;

const LiveActivityFeed = () => {
  const isMobile = useIsMobile();
  const [activities] = React.useState([
    { id: 1, type: 'call', text: 'Missed Call (After Hours)', sub: 'From: (617) 555-0123', icon: FiPhoneIncoming, color: '#FF5A5F' },
    { id: 2, type: 'ai', text: 'Outbound call in progress...', sub: 'Booking appointment', icon: FiActivity, color: theme.colors.brand.azure },
    { id: 3, type: 'success', text: 'Appointment Booked', sub: 'Added to calendar', icon: FiCalendar, color: '#34C759' },
  ]);

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: 320, height: 100 }}>
      <AnimatePresence mode="wait">
        <ActivityCard
          $isMobile={isMobile}
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: isMobile ? 0.2 : 0.4,
            ease: isMobile ? "easeOut" : "easeInOut"
          }}
        >
          <ActivityIcon $color={activities[activeIndex].color}>
            {React.createElement(activities[activeIndex].icon)}
          </ActivityIcon>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: theme.colors.text.primary }}>{activities[activeIndex].text}</div>
            <div style={{ fontSize: 12, color: theme.colors.text.secondary }}>{activities[activeIndex].sub}</div>
          </div>
        </ActivityCard>
      </AnimatePresence>
    </div>
  );
};

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://getworkbuddy.com/#organization",
      "name": "WorkBuddy",
      "url": "https://getworkbuddy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://getworkbuddy.com/favicon.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "",
        "contactType": "customer service",
        "email": "hello@getworkbuddy.com",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://getworkbuddy.com/#website",
      "url": "https://getworkbuddy.com",
      "name": "WorkBuddy | AI Receptionist",
      "publisher": {
        "@id": "https://getworkbuddy.com/#organization"
      }
    }
  ]
};

export const Homepage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <SEO
        title="WorkBuddy | AI Receptionist for Laundromats & Property Management"
        description="AI-powered phone receptionist that answers 24/7, handles FAQs, books appointments, and escalates emergencies. Built for laundromats and property managers."
        structuredData={homepageStructuredData}
      />
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <Section style={{ 
        paddingTop: 100, 
        paddingBottom: 100, 
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%)`
      }}>
        <AuroraBackground />
        
        <Container style={{ width: '100%', maxWidth: 1200 }}>
          <ResponsiveGrid $gap={60}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{ 
                fontSize: 'clamp(44px, 5.5vw, 72px)', 
                fontWeight: 500, 
                color: theme.colors.brand.slate,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 18,
                fontFamily: theme.typography.fontFamily.heading
              }}>
                Your AI Receptionist That <span style={{ color: theme.colors.brand.azure }}>Never Misses a Call</span>
              </h1>

              <p style={{ 
                fontSize: '18px', 
                color: theme.colors.text.secondary, 
                marginBottom: 24, 
                lineHeight: 1.6,
                maxWidth: 540 
              }}>
                WorkBuddy answers every call, books appointments, handles FAQs, and escalates emergencies—24/7, in English and Spanish. Built by operators, for operators.
              </p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button 
                  data-cal-link="caleb-benedict-4rrqhq/demo"
                  data-cal-namespace="demo"
                  data-cal-config='{"layout":"month_view"}'
                  style={{ 
                    padding: '18px 36px', 
                    fontSize: 18,
                    background: theme.colors.brand.azure,
                    border: 'none',
                    boxShadow: `0 8px 25px rgba(103, 183, 209, 0.4)`
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 12px 30px rgba(103, 183, 209, 0.6)`
                  }}
                >
                  Get Your Free Demo
                </Button>
                <Button 
                  href="/pricing"
                  $variant="ghost"
                  style={{ fontSize: 18 }}
                >
                  See Pricing →
                </Button>
              </div>
              
              <div style={{ marginTop: 32, display: 'flex', gap: 24, fontSize: 14, color: theme.colors.text.secondary }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                   <FiCheckCircle color={theme.colors.brand.azure} /> Answers in &lt; 3 rings
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                   <FiCheckCircle color={theme.colors.brand.azure} /> 90% automation rate
                 </div>
              </div>

            </motion.div>

            {/* Right: The Visualization (Reusing the Phone/Live Feed concept but updated context) */}
            <div style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute',
                width: 400,
                height: 400,
                background: `radial-gradient(circle, ${theme.colors.brand.azure}20 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0
              }} />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  width: 340,
                  height: 600,
                  background: 'white',
                  borderRadius: 40,
                  boxShadow: '0 40px 80px -20px rgba(50, 50, 93, 0.15), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
                  border: '8px solid white',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1
                }}
              >
                {/* Phone UI Header */}
                <div style={{ padding: '24px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Live Dashboard</div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34C759', boxShadow: '0 0 0 4px #34C75930' }} />
                </div>

                {/* Live Activity Stream inside Phone */}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', background: '#FAFAFA' }}>
                  <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Just Now</div>
                  
                  <LiveActivityFeed />
                  
                  <div style={{ opacity: 0.6, marginTop: 100 }}>
                    <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Earlier Today</div>
                    <div style={{ background: 'white', padding: 12, borderRadius: 12, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <div style={{ width: 32, height: 32, background: theme.colors.brand.azure, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><FiCheckCircle /></div>
                      <div style={{ fontSize: 13, color: '#555' }}><strong>Refund Request</strong> handled</div>
                    </div>
                    <div style={{ background: 'white', padding: 12, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <div style={{ width: 32, height: 32, background: theme.colors.brand.slate, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><FiActivity /></div>
                      <div style={{ fontSize: 13, color: '#555' }}><strong>Leasing Inquiry</strong> booked tour</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* 2. SOCIAL PROOF BAR */}
      <Section style={{ padding: '40px 0', borderBottom: '1px solid #eee' }}>
        <Container style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 24 }}>
            Trusted by operators managing 100+ locations
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
             {/* Stats Placeholder */}
             <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.brand.slate }}>100,000+</div>
                <div style={{ fontSize: 13, color: theme.colors.text.secondary }}>Calls Answered</div>
             </div>
             <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.brand.slate }}>99.9%</div>
                <div style={{ fontSize: 13, color: theme.colors.text.secondary }}>Uptime</div>
             </div>
             <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.brand.slate }}>4.9/5</div>
                <div style={{ fontSize: 13, color: theme.colors.text.secondary }}>Customer Rating</div>
             </div>
          </div>
        </Container>
      </Section>

      {/* 3. PROBLEM SECTION */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
              Every Missed Call Costs You Money
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.6 }}>
              Your phone rings while you're helping a customer, fixing a machine, or showing a property. By the time you call back, they've moved on to a competitor.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { title: "Missed Opportunities", desc: "67% of callers hang up on voicemail without leaving a message.", icon: FiX },
              { title: "Lost Revenue", desc: "Every missed call is a potential order or lease walking out the door.", icon: FiActivity },
              { title: "Burnout", desc: "Working nights and weekends just to return calls isn't sustainable.", icon: FiClock }
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', padding: 32, borderRadius: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 48, height: 48, background: theme.colors.brand.azure + '15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.brand.azure, marginBottom: 20 }}>
                  <item.icon size={24} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>{item.title}</h3>
                <p style={{ color: theme.colors.text.secondary, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. VERTICAL SELECTOR (Moved up for better flow) */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Badge>Built for Your Industry</Badge>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading }}>
              Specialized solutions, not generic bots
            </h2>
          </div>

          <ResponsiveGrid>
            {/* Laundromat Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ 
                background: 'white', 
                border: `1px solid ${theme.colors.brand.slate}20`, 
                borderRadius: 32, 
                padding: 40, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 20 }}>🧺</div>
              <h3 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16, color: theme.colors.brand.slate }}>For Laundromats</h3>
              <p style={{ fontSize: 16, color: theme.colors.text.secondary, marginBottom: 32, lineHeight: 1.6, flex: 1 }}>
                Handle refund requests, WDF orders, machine status questions, and pickup scheduling—without interrupting your workflow.
              </p>
              <ul style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Vend refund processing', 'Wash & Fold order taking', 'Machine troubleshooting', 'Pickup & Delivery scheduling'].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: theme.colors.text.primary }}>
                    <FiCheck color={theme.colors.brand.azure} /> {feat}
                  </li>
                ))}
              </ul>
              <Button href="/laundromats" $variant="outline" style={{ width: '100%' }}>Explore Laundromat Features</Button>
            </motion.div>

            {/* Property Management Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ 
                background: theme.colors.brand.slate, 
                color: 'white',
                borderRadius: 32, 
                padding: 40, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 40px rgba(44, 62, 80, 0.3)'
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 20 }}>🏢</div>
              <h3 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>For Property Managers</h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 32, lineHeight: 1.6, flex: 1 }}>
                Capture every leasing lead, triage maintenance calls, and give tenants 24/7 support—without hiring more staff.
              </p>
              <ul style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Leasing lead capture', 'Maintenance triage', 'Tour scheduling', 'AppFolio/Buildium integration'].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'white' }}>
                    <FiCheck color="#34C759" /> {feat}
                  </li>
                ))}
              </ul>
              <Button href="/property-management" style={{ width: '100%', background: 'white', color: theme.colors.brand.slate }}>Explore PM Features</Button>
            </motion.div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* 4. SOLUTION / FEATURES */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading }}>
              Everything You Need. Nothing You Don't.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { title: "24/7 Call Answering", desc: "Never miss another call—day, night, weekends, or holidays." },
              { title: "Industry-Specific AI", desc: "Trained on your specific terminology, not a generic model." },
              { title: "Appointment Scheduling", desc: "Books appointments and tours directly on your calendar." },
              { title: "Bilingual Support", desc: "Fluent English and Spanish to serve your entire community." },
              { title: "Smart Escalation", desc: "Knows the difference between a routine question and a real emergency." },
              { title: "Seamless Integrations", desc: "Connects with Cents, AppFolio, Buildium, Google Calendar, and more." },
            ].map((feature, i) => (
              <div key={i} style={{ background: 'white', padding: 24, borderRadius: 16 }}>
                 <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: theme.colors.brand.slate }}>{feature.title}</h4>
                 <p style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. HOW IT WORKS */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Badge>Simple Setup</Badge>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading }}>
              Live in 24 Hours
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40, counterReset: 'step' }}>
            {[
              { title: "Connect Your Phone", desc: "Forward your business line to WorkBuddy, or get a new number." },
              { title: "Customize Your AI", desc: "Tell WorkBuddy about your business, services, pricing, and policies." },
              { title: "Go Live", desc: "Start answering calls immediately. Review transcripts from your dashboard." },
              { title: "Optimize Over Time", desc: "WorkBuddy learns from every call. The more it handles, the smarter it gets." }
            ].map((step, i) => (
              <div key={i} style={{ position: 'relative', paddingLeft: 20 }}>
                 <div style={{ 
                   fontSize: 64, fontWeight: 900, color: 'rgba(0,0,0,0.05)', 
                   position: 'absolute', top: -20, left: 0, lineHeight: 1 
                 }}>
                   {i + 1}
                 </div>
                 <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate, position: 'relative' }}>{step.title}</h3>
                 <p style={{ color: theme.colors.text.secondary, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. PRICING PREVIEW */}
      <Section style={{ background: theme.colors.brand.slate, color: 'white' }}>
        <Container>
           <ResponsiveGrid>
             <div>
               <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
                 Simple, Transparent Pricing
               </h2>
               <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 32, lineHeight: 1.6 }}>
                 No hidden fees. No per-minute charges. One flat monthly rate.
               </p>
               <Button href="/pricing" style={{ background: 'white', color: theme.colors.brand.slate }}>See Full Pricing</Button>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: 40, borderRadius: 24, backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                   <div>
                     <div style={{ fontSize: 18, fontWeight: 600 }}>Laundromats</div>
                     <div style={{ fontSize: 14, opacity: 0.7 }}>Starting at</div>
                   </div>
                   <div style={{ fontSize: 32, fontWeight: 700 }}>$99<span style={{ fontSize: 16 }}>/mo</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                     <div style={{ fontSize: 18, fontWeight: 600 }}>Property Management</div>
                     <div style={{ fontSize: 14, opacity: 0.7 }}>Starting at</div>
                   </div>
                   <div style={{ fontSize: 32, fontWeight: 700 }}>$499<span style={{ fontSize: 16 }}>/mo</span></div>
                </div>
             </div>
           </ResponsiveGrid>
        </Container>
      </Section>

      {/* 11. FINAL CTA */}
      <Section style={{ padding: '100px 0', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            Stop Missing Calls. Start Closing More Business.
          </h2>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Every call you miss is money walking out the door. WorkBuddy makes sure that never happens again.
          </p>
          <Button 
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ padding: '20px 48px', fontSize: 20 }}
          >
            Schedule Your Free Demo
          </Button>
          <div style={{ marginTop: 24, fontSize: 14, color: theme.colors.text.tertiary }}>
            Or call us: (860) 477-9542 (Yes, WorkBuddy answers this line too.)
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
