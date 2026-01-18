import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

export const Section = styled.section<{ $dark?: boolean; $bg?: string }>`
  position: relative;
  padding: 80px 0;
  background: ${props => props.$bg ? props.$bg : props.$dark ? theme.colors.bg.dark : theme.colors.bg.default};
  color: ${props => props.$dark ? theme.colors.text.inverse : theme.colors.text.primary};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  position: relative;
  z-index: 2;
`;

export const ResponsiveGrid = styled.div<{ $gap?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.$gap || 80}px;
  }
`;

export const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

export const Button = styled(motion.a)<{ $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.brand.slate};
          color: ${theme.colors.brand.white};
          &:hover { background: #243545; }
        `;
      case 'outline':
        return css`
          background: transparent;
          border: 1px solid ${theme.colors.brand.azure};
          color: ${theme.colors.brand.azure};
          &:hover { background: ${theme.colors.brand.azure}10; }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: inherit;
          padding: 8px 16px;
          &:hover { background: rgba(0,0,0,0.05); }
        `;
      default: // primary
        return css`
          background: ${theme.colors.brand.azure};
          color: ${theme.colors.brand.white};
          box-shadow: 0 4px 20px rgba(103, 183, 209, 0.4);
          &:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(103, 183, 209, 0.5);
          }
        `;
    }
  }}
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  background: ${theme.colors.brand.azure}15;
  color: ${theme.colors.brand.azure};
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
  border: 1px solid ${theme.colors.brand.azure}30;
`;
