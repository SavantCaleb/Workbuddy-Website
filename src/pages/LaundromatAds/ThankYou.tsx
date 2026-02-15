import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import { SEO } from '../../components/SEO/SEO';
import logo from '../../assets/logo.png';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleFade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  padding: 40px 24px;
  text-align: center;
`;

const LogoMark = styled.img`
  height: 36px;
  margin-bottom: 48px;
  opacity: 0;
  animation: ${scaleFade} 0.6s ease forwards;
  animation-delay: 0.1s;

  @media (min-width: 640px) {
    height: 40px;
    margin-bottom: 64px;
  }
`;

const CheckCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${theme.colors.brand.slate};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  opacity: 0;
  animation: ${scaleFade} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.3s;

  @media (min-width: 640px) {
    width: 72px;
    height: 72px;
    margin-bottom: 40px;
  }
`;

const Content = styled.div`
  max-width: 480px;
`;

const Headline = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 600;
  font-size: 32px;
  color: ${theme.colors.brand.slate};
  line-height: 1.1;
  letter-spacing: -1.2px;
  margin-bottom: 14px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease forwards;
  animation-delay: 0.5s;

  @media (min-width: 640px) {
    font-size: 40px;
    letter-spacing: -1.5px;
    margin-bottom: 18px;
  }
`;

const Sub = styled.p`
  font-size: 17px;
  color: ${theme.colors.text.secondary};
  line-height: 1.55;
  letter-spacing: -0.2px;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease forwards;
  animation-delay: 0.65s;

  @media (min-width: 640px) {
    font-size: 19px;
    margin-bottom: 48px;
  }
`;

const ContactCard = styled.div`
  background: ${theme.colors.surface.primary};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease forwards;
  animation-delay: 0.8s;

  @media (min-width: 640px) {
    padding: 32px;
    border-radius: 20px;
  }
`;

const ContactName = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-weight: 600;
  font-size: 17px;
  color: ${theme.colors.brand.slate};
  letter-spacing: -0.2px;
  margin-bottom: 4px;
`;

const ContactRole = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: 16px;
  letter-spacing: -0.1px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.brand.slate};
  text-decoration: none;
  letter-spacing: -0.2px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Fine = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  letter-spacing: -0.1px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease forwards;
  animation-delay: 0.95s;

  @media (min-width: 640px) {
    font-size: 15px;
  }
`;

export const LaundromatAdsThankYou = () => (
  <>
    <SEO
      title="You're all set | WorkBuddy"
      description="Thanks for signing up. We'll be in touch soon."
      canonical="/laundromat-ads/thank-you"
      noindex
    />
    <Page>
      <LogoMark src={logo} alt="WorkBuddy" />

      <CheckCircle>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </CheckCircle>

      <Content>
        <Headline>You're all set.</Headline>
        <Sub>
          I'll text you within a few hours to get everything up and running. Most laundromats are live within 24 hours.
        </Sub>

        <ContactCard>
          <ContactName>Caleb</ContactName>
          <ContactRole>Founder, WorkBuddy</ContactRole>
          <ContactLink href="sms:+12036051105">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            (203) 605-1105
          </ContactLink>
        </ContactCard>

        <Fine>Questions? Text me anytime.</Fine>
      </Content>
    </Page>
  </>
);
