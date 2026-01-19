import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Button, Badge } from '../../components/Shared/Layout';
import { FiCheck, FiHelpCircle } from 'react-icons/fi';

const pricingStructuredData = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "price": "129.00",
  "priceCurrency": "USD",
  "description": "Starting price for Laundromat plan"
};

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 60px;
  background: ${theme.colors.brand.slate}10;
  padding: 6px;
  border-radius: 12px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? theme.colors.brand.slate : theme.colors.text.secondary};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'};

  &:hover {
    color: ${theme.colors.brand.slate};
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

const PricingCard = styled.div<{ $featured?: boolean }>`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.$featured ? '0 20px 50px rgba(50, 74, 95, 0.15)' : theme.shadows.medium};
  border: ${props => props.$featured ? `2px solid ${theme.colors.brand.azure}` : 'none'};
  position: relative;
`;

const PricingHeader = styled.div<{ $featured?: boolean; $enterprise?: boolean }>`
  padding: 32px;
  background: ${props => props.$featured ? theme.colors.brand.azure : props.$enterprise ? '#F8F9FA' : theme.colors.brand.slate};
  color: ${props => props.$enterprise ? theme.colors.brand.slate : 'white'};
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  color: ${theme.colors.brand.azure};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FeatureItem = styled.li`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: ${theme.colors.text.primary};
  font-size: 15px;
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const FAQItem = styled.div`
  h4 {
    font-size: 17px;
    margin-bottom: 8px;
    color: ${theme.colors.brand.slate};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    font-size: 15px;
  }
`;

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'laundromat' | 'pm'>('laundromat');

  const laundromatPlans = [
    {
      name: 'Coin Op',
      price: 'From $129',
      period: '/mo',
      description: 'Answers every call, 24/7',
      features: [
        'Unlimited inbound calls',
        '24/7 answering',
        'Bilingual (English/Spanish)',
        'Basic FAQ handling',
        'Refund request logging',
        'Email notifications'
      ]
    },
    {
      name: 'Full Service',
      price: 'From $199',
      period: '/mo',
      description: '+ WDF orders & scheduling',
      featured: true,
      features: [
        'Everything in Coin Op, plus:',
        'WDF order intake',
        'Pickup/delivery scheduling',
        'SMS notifications',
        'Integrations (Curbside, CleanCloud, etc.)',
        'Priority support'
      ]
    }
  ];

  const pmPlans = [
    {
      name: 'Starter',
      price: '$299',
      period: '/mo',
      description: 'Up to 100 doors',
      features: [
        'Unlimited inbound calls',
        'Leasing lead capture',
        'Maintenance triage',
        'Tenant FAQ handling',
        'Email + SMS notifications',
        'Basic reporting'
      ]
    },
    {
      name: 'Professional',
      price: '$499',
      period: '/mo',
      description: 'Up to 500 doors',
      featured: true,
      features: [
        'Everything in Starter, plus:',
        'Tour scheduling',
        'AppFolio/Buildium integration',
        'Work order creation',
        'Advanced reporting',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: '500+ doors',
      enterprise: true,
      features: [
        'Everything in Professional, plus:',
        'Yardi/RentManager integration',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantees',
        'White-label options'
      ]
    }
  ];

  const plans = activeTab === 'laundromat' ? laundromatPlans : pmPlans;

  return (
    <>
      <SEO
        title="Pricing | WorkBuddy AI Receptionist"
        description="Simple, transparent pricing. Laundromats from $129/mo. Property management from $299/mo. No hidden fees, no per-minute charges."
        canonical="/pricing"
        structuredData={pricingStructuredData}
      />
      <Navbar />

      <Section style={{ paddingTop: 120, textAlign: 'center' }}>
        <Container>
          <Badge>Simple Pricing</Badge>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            One Flat Rate. <span style={{ color: theme.colors.brand.azure }}>Unlimited Calls.</span>
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto 40px' }}>
            No per-minute charges. No hidden fees. No surprises. Just reliable service at a price you can count on.
          </p>

          <TabContainer>
            <Tab $active={activeTab === 'laundromat'} onClick={() => setActiveTab('laundromat')}>
              Laundromats
            </Tab>
            <Tab $active={activeTab === 'pm'} onClick={() => setActiveTab('pm')}>
              Property Management
            </Tab>
          </TabContainer>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <PricingGrid>
            {plans.map((plan, i) => (
              <PricingCard key={i} $featured={plan.featured}>
                {plan.featured && <PopularBadge>Most Popular</PopularBadge>}
                <PricingHeader $featured={plan.featured} $enterprise={(plan as any).enterprise}>
                  <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: (plan as any).enterprise ? theme.colors.brand.slate : 'white' }}>{plan.name}</h3>
                  <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 4 }}>
                    {plan.price}<span style={{ fontSize: 16, fontWeight: 400 }}>{plan.period}</span>
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.9 }}>{plan.description}</div>
                </PricingHeader>
                <div style={{ padding: 32 }}>
                  <FeatureList>
                    {plan.features.map((feature, j) => (
                      <FeatureItem key={j}>
                        <FiCheck color={theme.colors.brand.azure} size={18} />
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeatureList>
                  <Button
                    data-cal-link="caleb-benedict-4rrqhq/demo"
                    data-cal-namespace="demo"
                    data-cal-config='{"layout":"month_view"}'
                    $variant={(plan as any).enterprise ? 'outline' : 'primary'}
                    style={{ width: '100%', marginTop: 32, background: (plan as any).enterprise ? undefined : !plan.featured ? theme.colors.brand.slate : undefined }}
                  >
                    {(plan as any).enterprise ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </div>
              </PricingCard>
            ))}
          </PricingGrid>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: theme.colors.text.secondary }}>
              All plans include a <strong>30-day money-back guarantee</strong>. Pay annually and save 2 months.
            </p>
          </div>
        </Container>
      </Section>

      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 900 }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 500, marginBottom: 16, color: theme.colors.brand.slate }}>
            Common Questions
          </h2>
          <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: 48 }}>
            Everything you need to know about our pricing
          </p>

          <FAQGrid>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> Are there any hidden fees?</h4>
              <p>No. The price you see is the price you pay. No setup fees, no per-minute charges, no surprise bills.</p>
            </FAQItem>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> What does "unlimited calls" mean?</h4>
              <p>Exactly what it sounds like. We don't count calls or charge by the minute. Handle as many calls as your business needs.</p>
            </FAQItem>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> Is there a contract?</h4>
              <p>No long-term contracts required. Month-to-month billing. Cancel anytime with 30 days notice.</p>
            </FAQItem>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> Do you offer annual discounts?</h4>
              <p>Yes! Pay annually and get 2 months free (17% savings). Contact us for annual billing options.</p>
            </FAQItem>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> Can I change plans later?</h4>
              <p>Absolutely. Upgrade or downgrade anytime. Changes take effect on your next billing cycle.</p>
            </FAQItem>
            <FAQItem>
              <h4><FiHelpCircle size={18} color={theme.colors.brand.azure} /> What if I have multiple locations?</h4>
              <p>We offer volume discounts for multi-location operators. Contact us to discuss your specific needs.</p>
            </FAQItem>
          </FAQGrid>
        </Container>
      </Section>

      <Section>
        <Container style={{ maxWidth: 700, textAlign: 'center' }}>
          <div style={{ padding: 48, background: theme.colors.brand.slate + '08', borderRadius: 20 }}>
            <h3 style={{ fontSize: 28, fontWeight: 500, marginBottom: 16, color: theme.colors.brand.slate }}>
              30-Day Money-Back Guarantee
            </h3>
            <p style={{ fontSize: 17, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 24 }}>
              Try WorkBuddy completely risk-free. If it doesn't work for your business within the first 30 days, we'll refund every penny. No questions asked, no hoops to jump through.
            </p>
            <Button
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
            >
              Start Your Free Trial
            </Button>
          </div>
        </Container>
      </Section>

      <Section style={{ background: theme.colors.brand.slate, color: 'white', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Not sure which plan is right for you?</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Book a quick call and we'll help you find the perfect fit for your business.
          </p>
          <Button
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ background: 'white', color: theme.colors.brand.slate }}
          >
            Talk to Our Team
          </Button>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
