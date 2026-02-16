import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Container, Button } from './Layout';
import logo from '../../assets/logo.png';

const NavLink = styled(Link)`
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${theme.colors.brand.slate};
  }
`;

const NavDropdown = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px 0;

  &:hover > div {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: white;
  min-width: 200px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border-radius: 12px;
  padding: 8px;
  z-index: 100;
  border: 1px solid rgba(0,0,0,0.05);
  opacity: 0;
  transition: all 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 8px;
    background: transparent;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 14px;
  border-radius: 8px;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.bg.subtle};
    color: ${theme.colors.brand.azure};
  }
`;

interface NavbarProps {
  logoLink?: string;
}

export const Navbar = ({ logoLink = '/' }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: scrolled ? '16px 0' : '24px 0',
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      zIndex: 100,
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? `1px solid ${theme.colors.brand.slate}10` : 'none'
    }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={logoLink} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="WorkBuddy" style={{ height: 40 }} />
        </Link>

        <div style={{ display: 'none', gap: 32, alignItems: 'center' }} className="desktop-menu">
          
          <NavDropdown>
            <NavLink to="#">Solutions ▾</NavLink>
            <DropdownContent>
              <DropdownItem to="/">For Laundromats</DropdownItem>
              <DropdownItem to="/property-management">For Property Management</DropdownItem>
            </DropdownContent>
          </NavDropdown>

          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          <Button 
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ padding: '10px 20px' }}
          >
            Book Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div style={{ display: 'block' }} className="mobile-toggle">
          <Button $variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ padding: 8 }}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.colors.brand.slate}10`,
          padding: '24px 0',
          zIndex: 99,
          height: '100vh'
        }}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: 13, textTransform: 'uppercase', color: theme.colors.text.tertiary, fontWeight: 700, letterSpacing: '0.05em' }}>Solutions</span>
                <Link 
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}
                >
                  Laundromats
                </Link>
                <Link 
                  to="/property-management"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}
                >
                  Property Management
                </Link>
              </div>

              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}>Pricing</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}>About</Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}>FAQ</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 18, color: theme.colors.text.primary, textDecoration: 'none', fontWeight: 500 }}>Contact</Link>

              <Button 
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ padding: '16px 20px', marginTop: 8, textAlign: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Button>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};
