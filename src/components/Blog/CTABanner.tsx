import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../Shared/Layout';
import type { CTAType } from '../../content/types';

const Banner = styled.div`
  background: linear-gradient(135deg, ${theme.colors.brand.slate} 0%, #3d5a72 100%);
  border-radius: 16px;
  padding: 40px 32px;
  margin: 48px 0;
  text-align: center;
  color: white;
`;

const BannerTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: white;
`;

const BannerText = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ctaConfig: Record<CTAType, { title: string; text: string; buttonText: string; href?: string; calLink?: boolean }> = {
  demo: {
    title: 'See WorkBuddy in Action',
    text: 'Book a free 15-minute demo and see how AI can handle your laundromat calls 24/7.',
    buttonText: 'Book a Free Demo',
    calLink: true,
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
      {config.calLink ? (
        <Button
          data-cal-link="caleb-benedict-4rrqhq/demo"
          data-cal-namespace="demo"
          data-cal-config='{"layout":"month_view"}'
          style={{ background: 'white', color: theme.colors.brand.slate }}
        >
          {config.buttonText}
        </Button>
      ) : (
        <Button
          as={Link}
          to={config.href!}
          style={{ background: 'white', color: theme.colors.brand.slate }}
        >
          {config.buttonText}
        </Button>
      )}
    </Banner>
  );
};
