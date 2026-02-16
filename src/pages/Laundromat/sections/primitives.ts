import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const LPSection = styled.section<{ $alt?: boolean }>`
  padding: 56px 20px;
  background: ${props => props.$alt ? theme.colors.surface.primary : 'white'};

  @media (min-width: 640px) {
    padding: 80px 32px;
  }

  @media (min-width: 900px) {
    padding: 100px 40px;
  }
`;

export const LPInner = styled.div<{ $narrow?: boolean }>`
  max-width: ${props => props.$narrow ? '800px' : '1100px'};
  margin: 0 auto;
`;

export const LPHeadline = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 32px;
  color: ${theme.colors.brand.slate};
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 14px;

  @media (min-width: 640px) {
    font-size: 40px;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }

  @media (min-width: 900px) {
    font-size: 48px;
    letter-spacing: -2px;
  }
`;

export const LPSubtext = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 17px;
    line-height: 1.55;
  }
`;

export const LPGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;

  @media (min-width: 640px) {
    gap: 48px;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }
`;

export const SectionCTARow = styled.div`
  text-align: center;
  margin-top: 40px;

  @media (min-width: 640px) {
    margin-top: 48px;
  }
`;

export const SectionCTALink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.brand.azure};
  text-decoration: none;
  letter-spacing: -0.2px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;
