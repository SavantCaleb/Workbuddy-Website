import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Badge, Button } from '../../components/Shared/Layout';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will my callers know they're talking to AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WorkBuddy sounds natural and professional. Many callers don't realize they're speaking with AI. We focus on solving their problem quickly rather than making them feel like they're navigating a phone tree."
      }
    },
    {
      "@type": "Question",
      "name": "What if the caller asks something WorkBuddy doesn't know?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WorkBuddy is trained on your specific business information. For questions outside its knowledge, it will politely offer to take a message or transfer to a human when available."
      }
    },
    {
      "@type": "Question",
      "name": "How do emergencies and escalations work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You define what constitutes an emergency for your business. WorkBuddy can immediately transfer urgent calls, send SMS alerts to your team, or follow any escalation protocol you set up."
      }
    },
    {
      "@type": "Question",
      "name": "How hard is it to set up? Do I need special equipment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Setup takes about 15 minutes. No special equipment needed. We simply forward your existing phone number to WorkBuddy, or we can provide you with a new number."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a free trial or contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer a 30-day money-back guarantee. No long-term contracts required. Pay month-to-month and cancel anytime with 30 days notice."
      }
    }
  ]
};

const FAQCategory = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.brand.azure};
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${theme.colors.brand.azure}20;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid ${theme.colors.brand.slate}12;

  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.brand.azure};
  }

  svg {
    flex-shrink: 0;
    margin-left: 16px;
    color: ${props => props.$isOpen ? theme.colors.brand.azure : theme.colors.text.tertiary};
    transition: color 0.2s ease;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding-bottom: ${props => props.$isOpen ? '20px' : '0'};

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.7;
    font-size: 15px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? theme.colors.brand.azure : theme.colors.brand.slate + '08'};
  color: ${props => props.$active ? 'white' : theme.colors.text.secondary};

  &:hover {
    background: ${props => props.$active ? theme.colors.brand.azure : theme.colors.brand.slate + '15'};
  }
`;

const generalFAQs = [
  {
    question: "Will my callers know they're talking to AI?",
    answer: "WorkBuddy sounds natural and conversational. Many callers don't realize they're speaking with AI until we tell them. We focus on solving their problem quickly and professionally, not on sounding robotic or making them navigate phone trees."
  },
  {
    question: "What if the caller asks something WorkBuddy doesn't know?",
    answer: "WorkBuddy is trained on your specific business information during onboarding. For questions outside its knowledge base, it will politely offer to take a message or transfer to a human when available. You can customize how it handles these situations."
  },
  {
    question: "How do emergencies and escalations work?",
    answer: "You define what constitutes an emergency for your business during setup. WorkBuddy can immediately transfer urgent calls to your mobile, send SMS/email alerts to your team, or follow any custom escalation protocol you configure."
  },
  {
    question: "How hard is it to set up? Do I need special equipment?",
    answer: "Setup takes about 15 minutes. No special equipment, software, or technical knowledge needed. We simply forward your existing phone number to WorkBuddy, or we can provide you with a dedicated number. Our team handles the technical setup."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. We offer a 30-day money-back guarantee so you can try WorkBuddy risk-free. After that, you pay month-to-month and can cancel anytime with 30 days notice."
  },
  {
    question: "Can WorkBuddy handle multiple languages?",
    answer: "Yes! WorkBuddy supports bilingual service in English and Spanish. It can detect the caller's language preference and respond accordingly, or you can set a default language for your business."
  },
  {
    question: "What happens during power outages or internet issues?",
    answer: "WorkBuddy runs on enterprise-grade cloud infrastructure with 99.9% uptime. Your calls are handled even if your local business has connectivity issues. We have redundant systems across multiple data centers."
  },
  {
    question: "Can I customize how WorkBuddy answers calls?",
    answer: "Absolutely. You control the greeting, the information provided, escalation rules, business hours behavior, and how WorkBuddy represents your business. We work with you during onboarding to get it exactly right."
  },
  {
    question: "How do I see call logs and transcripts?",
    answer: "You get access to a dashboard with complete call logs, transcripts, and analytics. See exactly what callers asked, how WorkBuddy handled each call, call duration, and outcomes. Export data anytime."
  }
];

const laundromatFAQs = [
  {
    question: "Does WorkBuddy integrate with Cents POS?",
    answer: "Yes! We integrate with Cents, allowing WorkBuddy to create orders, check order status, and provide customers with accurate information about their laundry. We also work with Laundroworks and other popular laundromat POS systems."
  },
  {
    question: "Can it actually take wash-and-fold orders?",
    answer: "Yes. WorkBuddy captures customer details, weight estimates, special instructions, and pickup preferences. Orders can be sent directly to your POS or as a notification for your staff to process."
  },
  {
    question: "How does it handle refund requests?",
    answer: "WorkBuddy documents the machine number, amount, customer contact info, and what happened. This information is sent to you for processing. You can also set up automatic refund rules for small amounts."
  },
  {
    question: "What if a machine is flooding or there's an emergency?",
    answer: "You define what constitutes an emergency during setup (floods, fires, security issues, etc.). WorkBuddy will immediately text/call you and can dispatch emergency services if configured to do so."
  },
  {
    question: "Does it know about my specific machines and services?",
    answer: "Yes. During onboarding, we train WorkBuddy on your specific location: machine types, pricing, services offered, hours, policies, and anything else customers might ask about."
  }
];

const pmFAQs = [
  {
    question: "Does it integrate with AppFolio/Buildium?",
    answer: "Yes! WorkBuddy integrates with major property management software including AppFolio, Buildium, Yardi, and RentManager. Work orders, lead information, and messages sync automatically to your system."
  },
  {
    question: "How does maintenance triage work?",
    answer: "WorkBuddy asks key questions to determine urgency: Is there active water damage? Is anyone in danger? Is the unit uninhabitable? Based on answers, it categorizes as emergency (immediate escalation) or routine (next business day). You customize the criteria."
  },
  {
    question: "Can it actually schedule property tours?",
    answer: "Yes. WorkBuddy integrates with your calendar to book showings in available time slots. It collects prospect information, sends confirmation texts/emails, and adds the appointment to your schedule automatically."
  },
  {
    question: "Is this Fair Housing compliant?",
    answer: "Yes. Consistency is actually key to Fair Housing compliance. WorkBuddy provides the same professional, consistent responses to all callers regardless of who they are. No human bias, no inconsistent information."
  },
  {
    question: "What about after-hours emergencies?",
    answer: "You define emergency criteria and escalation paths. WorkBuddy can route true emergencies (flooding, no heat in winter, lockouts) to on-call staff or emergency services while logging non-urgent issues for the next business day."
  },
  {
    question: "How many properties/doors can it handle?",
    answer: "WorkBuddy scales with your portfolio. Our Starter plan covers up to 100 doors, Professional handles up to 500 doors, and Enterprise plans support unlimited doors with custom configurations per property."
  }
];

const pricingFAQs = [
  {
    question: "Are there any hidden fees?",
    answer: "No. The price you see is the price you pay. No setup fees, no per-minute charges, no overage fees, no surprise bills. Unlimited calls means unlimited calls."
  },
  {
    question: "What does 'unlimited calls' actually mean?",
    answer: "Exactly what it sounds like. We don't count minutes or cap call volume. Whether you get 10 calls a month or 1,000, the price is the same. No gotchas."
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes! Pay annually and save 2 months (17% discount). Contact us for annual billing options and we'll set it up."
  },
  {
    question: "Can I change plans later?",
    answer: "Absolutely. Upgrade or downgrade anytime. If you upgrade, the change takes effect immediately with prorated billing. Downgrades take effect at the next billing cycle."
  },
  {
    question: "What's the 30-day guarantee?",
    answer: "Try WorkBuddy completely risk-free. If it doesn't work for your business within the first 30 days, we'll refund every penny. No questions asked, no hoops to jump through."
  }
];

type FAQTab = 'general' | 'laundromat' | 'pm' | 'pricing';

export const FAQ = () => {
  const [activeTab, setActiveTab] = useState<FAQTab>('general');
  const [openIndex, setOpenIndex] = useState<number>(0);

  const getFAQs = () => {
    switch (activeTab) {
      case 'laundromat': return laundromatFAQs;
      case 'pm': return pmFAQs;
      case 'pricing': return pricingFAQs;
      default: return generalFAQs;
    }
  };

  const faqs = getFAQs();

  return (
    <>
      <SEO
        title="FAQ: AI Phone Answering for Laundromats"
        description="Answers to common questions about WorkBuddy's AI phone answering service for laundromats and property managers. Setup, pricing, features, and more."
        canonical="/faq"
        keywords="laundromat customer service, AI phone answering FAQ, laundromat answering service questions, WorkBuddy FAQ"
        structuredData={[faqStructuredData, {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://getworkbuddy.com" },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://getworkbuddy.com/faq" }
          ]
        }]}
      />
      <Navbar />

      <Section style={{ paddingTop: 120 }}>
        <Container style={{ maxWidth: 900, textAlign: 'center' }}>
          <Badge>Support</Badge>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto 40px' }}>
            Everything you need to know about WorkBuddy. Can't find your answer? Our team is happy to help.
          </p>

          <TabContainer>
            <Tab $active={activeTab === 'general'} onClick={() => { setActiveTab('general'); setOpenIndex(0); }}>
              General
            </Tab>
            <Tab $active={activeTab === 'laundromat'} onClick={() => { setActiveTab('laundromat'); setOpenIndex(0); }}>
              Laundromats
            </Tab>
            <Tab $active={activeTab === 'pm'} onClick={() => { setActiveTab('pm'); setOpenIndex(0); }}>
              Property Management
            </Tab>
            <Tab $active={activeTab === 'pricing'} onClick={() => { setActiveTab('pricing'); setOpenIndex(0); }}>
              Pricing
            </Tab>
          </TabContainer>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container style={{ maxWidth: 800 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '8px 32px', boxShadow: '0 4px 20px rgba(50, 74, 95, 0.06)' }}>
            {faqs.map((item, index) => (
              <FAQItem key={index}>
                <FAQQuestion
                  $isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  {item.question}
                  {openIndex === index ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </FAQQuestion>
                <FAQAnswer $isOpen={openIndex === index}>
                  <p>{item.answer}</p>
                </FAQAnswer>
              </FAQItem>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ background: '#F8F9FA' }}>
        <Container style={{ maxWidth: 700, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 16 }}>
            Still have questions?
          </h2>
          <p style={{ color: theme.colors.text.secondary, marginBottom: 32, fontSize: 17 }}>
            Our team is here to help. Schedule a demo or reach out directly—we typically respond within a few hours.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
            >
              Book a Demo
            </Button>
            <Button
              href="/contact"
              $variant="outline"
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>

      <Section style={{ background: theme.colors.brand.slate, color: 'white', textAlign: 'center' }}>
        <Container>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Ready to try WorkBuddy?</h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            30-day money-back guarantee. No contracts. Cancel anytime.
          </p>
          <Button
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ background: 'white', color: theme.colors.brand.slate }}
          >
            Start Your Free Trial
          </Button>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
