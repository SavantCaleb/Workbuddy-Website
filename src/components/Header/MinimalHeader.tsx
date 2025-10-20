import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(${theme.blur.lg});
  -webkit-backdrop-filter: blur(${theme.blur.lg});
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  transition: all ${theme.transitions.normal};
`;

const HeaderContainer = styled.div`
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
  padding: ${theme.spacing.m} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.m} ${theme.spacing.l};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  letter-spacing: -0.015em;

  .work {
    color: ${theme.colors.neutral.label};
  }

  .buddy {
    color: ${theme.colors.primary.blue};
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.neutral.secondary};
  text-decoration: none;
  font-weight: ${theme.typography.weights.regular};
  font-size: ${theme.typography.sizes.body.desktop};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  letter-spacing: -0.01em;

  &:hover {
    color: ${theme.colors.neutral.label};
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.l};

  @media (max-width: ${theme.breakpoints.mobile}) {
    .secondary-link {
      display: none;
    }
  }
`;

const SecondaryLink = styled.a`
  color: ${theme.colors.neutral.secondary};
  text-decoration: none;
  font-weight: ${theme.typography.weights.regular};
  font-size: ${theme.typography.sizes.body.desktop};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  letter-spacing: -0.01em;

  &:hover {
    color: ${theme.colors.neutral.label};
  }
`;

export const MinimalHeader: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <span className="work">work</span>
          <span className="buddy">buddy</span>
        </Logo>

        <Nav>
          <NavLink onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </NavLink>
          <NavLink onClick={() => scrollToSection('pricing')}>
            Pricing
          </NavLink>
          <NavLink href="mailto:caleb@getworkbuddy.com">
            Contact
          </NavLink>
        </Nav>

        <CTAWrapper>
          <SecondaryLink 
            className="secondary-link"
            onClick={() => scrollToSection('demo')}
          >
            Watch Demo
          </SecondaryLink>
          <Button size="medium">Try Free</Button>
        </CTAWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};