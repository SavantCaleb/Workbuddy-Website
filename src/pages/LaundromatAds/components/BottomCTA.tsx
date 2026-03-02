import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const CTASection = styled.section`
  padding: 64px 20px;
  background: ${theme.colors.brand.slate};
  text-align: center;

  @media (min-width: 640px) {
    padding: 100px 32px;
  }

  @media (min-width: 900px) {
    padding: 120px 40px;
  }
`;

const CTAInner = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const CTAHeadline = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 600;
  font-size: 32px;
  color: white;
  line-height: 1.05;
  letter-spacing: -1px;
  margin-bottom: 14px;

  @media (min-width: 640px) {
    font-size: 40px;
    letter-spacing: -1.5px;
    margin-bottom: 22px;
  }

  @media (min-width: 900px) {
    font-size: 48px;
    letter-spacing: -2px;
    margin-bottom: 24px;
  }
`;

const CTASub = styled.p`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  line-height: 1.5;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 19px;
    margin-bottom: 52px;
    letter-spacing: -0.3px;
  }

  @media (min-width: 900px) {
    font-size: 21px;
    margin-bottom: 56px;
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
  -webkit-tap-highlight-color: transparent;

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

const CTAFine = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 20px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 14px;
    margin-top: 32px;
  }
`;

interface BottomCTAProps {
  onScrollToForm: (e: React.MouseEvent) => void;
}

export const BottomCTA = forwardRef<HTMLElement, BottomCTAProps>(({ onScrollToForm }, ref) => (
  <CTASection ref={ref} id="get-started" aria-label="Try WorkBuddy AI receptionist free for 14 days - no credit card needed">
    <CTAInner>
      <CTAHeadline>Try WorkBuddy free for 14 days.</CTAHeadline>
      <CTASub>We handle setup. You just keep running your business.</CTASub>
      <CTABtn href="#form" onClick={onScrollToForm}>Try WorkBuddy free &#8594;</CTABtn>
      <CTAFine>No credit card needed.</CTAFine>
    </CTAInner>
  </CTASection>
));

BottomCTA.displayName = 'BottomCTA';
