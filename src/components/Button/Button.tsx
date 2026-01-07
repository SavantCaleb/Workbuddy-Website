import { type FC } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

const buttonSizes = {
  small: css`
    font-size: ${theme.typography.sizes.subhead.desktop};
    padding: ${theme.spacing.s} ${theme.spacing.l};
    min-height: 36px;
  `,
  medium: css`
    font-size: ${theme.typography.sizes.body.desktop};
    padding: ${theme.spacing.m} ${theme.spacing.xl};
    min-height: 44px;
  `,
  large: css`
    font-size: ${theme.typography.sizes.callout.desktop};
    padding: ${theme.spacing.l} ${theme.spacing.xxl};
    min-height: 56px;
  `,
};

const buttonVariants = {
  primary: css`
    background: ${theme.colors.primary.azure};
    color: ${theme.colors.primary.white};
    border: none;
    font-weight: ${theme.typography.weights.semibold};

    &:hover:not(:disabled) {
      background: #5AA0B8;
      transform: translateY(-0.5px);
    }

    &:active:not(:disabled) {
      background: #4D8A9E;
      transform: translateY(0);
    }
  `,
  secondary: css`
    background: ${theme.colors.surface.secondary};
    color: ${theme.colors.neutral.label};
    border: 1px solid ${theme.colors.neutral.gray300};
    font-weight: ${theme.typography.weights.medium};

    &:hover:not(:disabled) {
      background: ${theme.colors.neutral.gray200};
      border-color: ${theme.colors.neutral.gray400};
      transform: translateY(-0.5px);
    }

    &:active:not(:disabled) {
      background: ${theme.colors.neutral.gray300};
      transform: translateY(0);
    }
  `,
  outline: css`
    background: transparent;
    color: ${theme.colors.primary.azure};
    border: 1px solid ${theme.colors.primary.azure};
    font-weight: ${theme.typography.weights.medium};

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.azure};
      color: ${theme.colors.primary.white};
      transform: translateY(-0.5px);
    }

    &:active:not(:disabled) {
      background: #5AA0B8;
      transform: translateY(0);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.neutral.secondary};
    border: none;
    font-weight: ${theme.typography.weights.regular};

    &:hover:not(:disabled) {
      color: ${theme.colors.neutral.label};
      background: ${theme.colors.surface.secondary};
    }

    &:active:not(:disabled) {
      background: ${theme.colors.neutral.gray200};
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  font-family: ${theme.typography.fontFamily.body};
  border-radius: ${theme.borderRadius.l};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  outline: none;
  position: relative;
  white-space: nowrap;
  letter-spacing: -0.01em;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary.azure};
    outline-offset: 2px;
  }

  ${props => buttonSizes[props.size || 'medium']}
  ${props => buttonVariants[props.variant || 'primary']}
  ${props => props.fullWidth && css`
    width: 100%;
    display: flex;
  `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${props => props.fullWidth && css`
      width: 100%;
    `}
  }
`;

export const Button: FC<ButtonProps> = ({ 
  as = 'button',
  href,
  ...props 
}) => {
  if (as === 'a' && href) {
    return <StyledButton as="a" href={href} {...props} />;
  }
  return <StyledButton {...props} />;
};
