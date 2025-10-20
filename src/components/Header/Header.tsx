import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';

const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.98)' : theme.colors.neutral.white};
  box-shadow: ${props => props.$scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.3s ease;
`;

const HeaderContainer = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing.s} ${theme.spacing.m};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.primary.dark};
  text-decoration: none;

  .work {
    color: ${theme.colors.primary.dark};
  }

  .buddy {
    color: ${theme.colors.primary.yellow};
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.l};

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${theme.colors.neutral.white};
    flex-direction: column;
    padding: ${theme.spacing.m};
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-120%)'};
    transition: transform 0.3s ease;
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${theme.colors.primary.dark};
  text-decoration: none;
  font-weight: ${theme.typography.weights.regular};
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${theme.spacing.xs} 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.blue};
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.neutral.white};
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.s};
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: static;
    box-shadow: none;
    padding: ${theme.spacing.xs} 0;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: ${theme.spacing.xs} ${theme.spacing.s};
  color: ${theme.colors.primary.dark};
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.secondary.cream};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.s};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    flex-direction: column;

    button, a {
      width: 100%;
    }
  }
`;

const LoginLink = styled(Link)`
  color: ${theme.colors.primary.dark};
  text-decoration: none;
  font-weight: ${theme.typography.weights.regular};
  padding: ${theme.spacing.xs} ${theme.spacing.s};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.blue};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.primary.dark};
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <HeaderContainer>
        <Logo to="/">
          <span className="work">work</span>
          <span className="buddy">buddy</span>
        </Logo>

        <Nav isOpen={isMenuOpen}>
          <NavItem 
            onMouseEnter={() => setDropdownOpen('features')}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <NavLink to="/features" onClick={() => toggleDropdown('features')}>
              Features <FiChevronDown />
            </NavLink>
            <DropdownMenu isOpen={dropdownOpen === 'features'}>
              <DropdownLink to="/features/call-routing">Call Routing & Answering</DropdownLink>
              <DropdownLink to="/features/voicemail">Voicemail Transcription</DropdownLink>
              <DropdownLink to="/features/scheduling">Appointment Scheduling</DropdownLink>
              <DropdownLink to="/features/crm">CRM Integration</DropdownLink>
              <DropdownLink to="/features/after-hours">After-Hours Coverage</DropdownLink>
              <DropdownLink to="/features/analytics">Analytics & Reporting</DropdownLink>
            </DropdownMenu>
          </NavItem>

          <NavItem 
            onMouseEnter={() => setDropdownOpen('solutions')}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <NavLink to="/solutions" onClick={() => toggleDropdown('solutions')}>
              Solutions <FiChevronDown />
            </NavLink>
            <DropdownMenu isOpen={dropdownOpen === 'solutions'}>
              <DropdownLink to="/solutions/laundromats">Laundromats</DropdownLink>
              <DropdownLink to="/solutions/dry-cleaners">Dry Cleaners</DropdownLink>
              <DropdownLink to="/solutions/storage">Storage Facilities</DropdownLink>
              <DropdownLink to="/solutions/medical">Medical Practices</DropdownLink>
              <DropdownLink to="/solutions/legal">Legal Firms</DropdownLink>
              <DropdownLink to="/solutions/professional">Professional Services</DropdownLink>
            </DropdownMenu>
          </NavItem>

          <NavLink to="/pricing">Pricing</NavLink>

          <NavItem 
            onMouseEnter={() => setDropdownOpen('resources')}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <NavLink to="/resources" onClick={() => toggleDropdown('resources')}>
              Resources <FiChevronDown />
            </NavLink>
            <DropdownMenu isOpen={dropdownOpen === 'resources'}>
              <DropdownLink to="/blog">Blog</DropdownLink>
              <DropdownLink to="/help">Help Center</DropdownLink>
              <DropdownLink to="/case-studies">Case Studies</DropdownLink>
              <DropdownLink to="/roi-calculator">ROI Calculator</DropdownLink>
              <DropdownLink to="/demo">Demo</DropdownLink>
            </DropdownMenu>
          </NavItem>

          <AuthButtons>
            <LoginLink to="/login">Login</LoginLink>
            <Button size="small">Start Free Trial</Button>
          </AuthButtons>
        </Nav>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </HeaderContainer>
    </HeaderWrapper>
  );
};