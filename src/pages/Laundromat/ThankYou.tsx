import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import { Navbar } from '../../components/Shared/Navbar';
import { Footer } from '../../components/Shared/Footer';
import { Section, Container } from '../../components/Shared/Layout';

export const ThankYou = () => {
  return (
    <>
      <SEO
        title="Thank You | WorkBuddy"
        description="Thanks for reaching out. We'll be in touch soon."
        canonical="/laundromats/thank-you"
        noindex={true}
      />
      <Navbar logoLink="/laundromats" />

      <Section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%)`
      }}>
        <Container style={{ maxWidth: 600, textAlign: 'center' }}>
          <div style={{
            fontSize: 64,
            marginBottom: 24
          }}>
            🎉
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 500,
            color: theme.colors.brand.slate,
            marginBottom: 24,
            lineHeight: 1.2
          }}>
            Thanks!
          </h1>
          <p style={{
            fontSize: 20,
            color: theme.colors.text.secondary,
            lineHeight: 1.7,
            marginBottom: 32
          }}>
            I'll text you within a few hours to get you set up.
          </p>
          <p style={{
            fontSize: 18,
            color: theme.colors.brand.slate,
            fontWeight: 600
          }}>
            — Caleb
          </p>
          <p style={{
            marginTop: 48,
            fontSize: 15,
            color: theme.colors.text.tertiary
          }}>
            Questions? Text me directly: <strong style={{ color: theme.colors.brand.azure }}>(203) 605-1105</strong>
          </p>
        </Container>
      </Section>

      <Footer />
    </>
  );
};
