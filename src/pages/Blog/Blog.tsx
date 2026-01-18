import React from 'react';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container, Badge } from '../../components/Shared/Layout';

export const Blog = () => {
  return (
    <>
      <SEO
        title="Blog | WorkBuddy Resources"
        description="Insights, guides, and news for laundromat operators and property managers."
        canonical="/blog"
      />
      <Navbar />

      <Section style={{ paddingTop: 120, minHeight: '60vh' }}>
        <Container style={{ textAlign: 'center' }}>
          <Badge>Resources</Badge>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, color: theme.colors.brand.slate, fontFamily: theme.typography.fontFamily.heading, marginBottom: 24 }}>
            WorkBuddy Blog
          </h1>
          <p style={{ fontSize: 20, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto 60px' }}>
            Coming soon. Deep dives into automation, customer service, and scaling your business.
          </p>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
