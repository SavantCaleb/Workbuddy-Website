import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Button, Badge } from '../../components/Shared/Layout';
import { FiCheck, FiPhone } from 'react-icons/fi';

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

const bellaStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WorkBuddy - Bella Migration",
  "description": "Migrate from Bella to WorkBuddy. Same technology, same pricing, zero downtime. Built by the creator of Bella.",
  "brand": {
    "@type": "Brand",
    "name": "WorkBuddy"
  }
};

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 18px;
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
`;

const CheckIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${theme.colors.brand.azure};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const BellaLP = () => {
  return (
    <>
      <SEO
        title="Bella Migration"
        description="Bella shutting down? Migrate to WorkBuddy - built by the creator of Bella. Same pricing, all your training data migrated, live before February 1st."
        canonical="/bella"
        structuredData={bellaStructuredData}
      />

      <NavbarOffset />

      {/* URGENT BANNER */}
      <MigrationBanner>
        <Container>
          <p style={{ margin: 0, fontSize: 16, color: 'white', lineHeight: 1.5 }}>
            <strong>Bella is shutting down.</strong> I built it. Now I'll migrate you to WorkBuddy — same technology, better platform.
          </p>
        </Container>
      </MigrationBanner>

      <Navbar logoLink="/laundromats" />
      <main>

      {/* HERO SECTION */}
      <Section style={{
        paddingTop: 148,
        paddingBottom: 80,
        background: `linear-gradient(180deg, #ffffff 0%, #F0F4F8 100%)`,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container style={{ maxWidth: 800, textAlign: 'center' }}>
          <Badge style={{ marginBottom: 24 }}>For Bella/Savants Users</Badge>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 500,
            color: theme.colors.brand.slate,
            lineHeight: 1.15,
            marginBottom: 24,
            fontFamily: theme.typography.fontFamily.heading
          }}>
            Bella Shutting Down?<br />
            <span style={{ color: theme.colors.brand.azure }}>I Built It. Now I'll Migrate You.</span>
          </h1>

          <p style={{
            fontSize: 20,
            color: theme.colors.text.secondary,
            marginBottom: 40,
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto 40px'
          }}>
            I'm <strong style={{ color: theme.colors.brand.slate }}>Caleb</strong> — I created Bella from scratch.
            WorkBuddy is the same technology on an independent, better platform.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginBottom: 48
          }}>
            <CheckItem>
              <CheckIcon><FiCheck size={16} color="white" /></CheckIcon>
              Same pricing you had with Bella
            </CheckItem>
            <CheckItem>
              <CheckIcon><FiCheck size={16} color="white" /></CheckIcon>
              All your training data migrated
            </CheckItem>
            <CheckItem>
              <CheckIcon><FiCheck size={16} color="white" /></CheckIcon>
              Live before February 1st
            </CheckItem>
            <CheckItem>
              <CheckIcon><FiCheck size={16} color="white" /></CheckIcon>
              Personal onboarding from me
            </CheckItem>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <Button
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
              style={{ fontSize: 18, padding: '16px 32px' }}
            >
              Book Migration Call
            </Button>

            <p style={{ fontSize: 14, color: theme.colors.text.tertiary }}>
              I'm personally handling every migration this week.
            </p>
          </div>

          <div style={{
            marginTop: 48,
            padding: 24,
            background: 'white',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(50, 74, 95, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <FiPhone size={20} color={theme.colors.brand.azure} />
              <span style={{ fontSize: 18, color: theme.colors.text.primary }}>
                Or text me directly: <strong style={{ color: theme.colors.brand.azure }}>(860) 477-9542</strong>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHY WORKBUDDY */}
      <Section style={{ background: '#F8F9FA' }}>
        <Container style={{ maxWidth: 800 }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(24px, 4vw, 36px)',
            marginBottom: 48,
            color: theme.colors.brand.slate
          }}>
            Why WorkBuddy?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
              background: 'white',
              padding: 28,
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(50, 74, 95, 0.04)'
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Same Technology, Independent Platform
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontSize: 16 }}>
                WorkBuddy runs on the exact same AI technology I built for Bella. Same voice, same capabilities, same reliability — but on my own platform that I control. No corporate shutdowns.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: 28,
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(50, 74, 95, 0.04)'
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Your Data Comes With You
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontSize: 16 }}>
                I'm personally migrating all your training data, custom instructions, and business rules. Your WorkBuddy will know your business just like Bella did — from day one.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: 28,
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(50, 74, 95, 0.04)'
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: theme.colors.brand.slate }}>
                Zero Downtime Transition
              </h3>
              <p style={{ color: theme.colors.text.secondary, lineHeight: 1.7, fontSize: 16 }}>
                We'll set everything up in parallel, test it thoroughly, then switch over. Your customers won't notice anything except maybe better service.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section style={{ padding: '80px 0', textAlign: 'center', background: theme.colors.brand.slate, color: 'white' }}>
        <Container>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 500, marginBottom: 16 }}>
            Don't Wait Until the Last Minute
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            I'm handling migrations personally, but slots are filling up fast. Get set up this week.
          </p>
          <Button
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ background: 'white', color: theme.colors.brand.slate, fontSize: 18, padding: '16px 32px' }}
          >
            Book Migration Call
          </Button>
          <p style={{ marginTop: 24, fontSize: 16 }}>
            Or text me: <strong>(860) 477-9542</strong>
          </p>
        </Container>
      </Section>
      </main>

      <Footer />
    </>
  );
};
