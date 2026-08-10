import styled from 'styled-components';
import { theme } from '../../styles/theme';
import type { CTAType } from '../../content/types';

const Banner = styled.div`
  background: ${theme.colors.brand.slate};
  border-radius: 16px;
  padding: 48px 32px;
  margin: 48px 0;
  text-align: center;
  color: white;

  @media (min-width: 640px) {
    padding: 64px 40px;
  }
`;

const BannerTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.5px;

  @media (min-width: 640px) {
    font-size: 32px;
  }
`;

const BannerText = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 28px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 18px;
    margin-bottom: 36px;
  }
`;

const CTABtn = styled.a`
  display: inline-block;
  background: #E8742A;
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  font-family: ${theme.typography.fontFamily.body};
  cursor: pointer;
  transition: background 0.2s, transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  text-decoration: none;
  text-align: center;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    padding: 20px 52px;
    border-radius: 14px;
    font-size: 18px;
  }

  &:hover {
    background: #D4681F;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Fine = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 16px;
  letter-spacing: -0.1px;
`;

const ctaConfig: Record<CTAType, { title: string; text: string; buttonText: string; href: string; fine?: string }> = {
  demo: {
    title: 'Every call answered. Starting tomorrow.',
    text: 'We handle setup. You just keep running your business.',
    buttonText: 'Get Started \u2192',
    href: '/#form',
    fine: '$129/mo. Cancel anytime.',
  },
  pricing: {
    title: 'Simple, Transparent Pricing',
    text: 'Starting at $129/mo for unlimited calls. No hidden fees, no per-minute charges.',
    buttonText: 'View Pricing',
    href: '/pricing',
  },
  contact: {
    title: 'Have Questions?',
    text: 'Our team is here to help you find the right solution for your laundromat.',
    buttonText: 'Contact Us',
    href: '/contact',
  },
};

interface CTABannerProps {
  type?: CTAType;
}

export const CTABanner = ({ type = 'demo' }: CTABannerProps) => {
  const config = ctaConfig[type];

  return (
    <Banner>
      <BannerTitle>{config.title}</BannerTitle>
      <BannerText>{config.text}</BannerText>
      <CTABtn href={config.href}>{config.buttonText}</CTABtn>
      {config.fine && <Fine>{config.fine}</Fine>}
    </Banner>
  );
};
