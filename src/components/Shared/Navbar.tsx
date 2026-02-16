import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Container } from './Layout';
import logo from '../../assets/logo.png';

/* ── Apple-style nav link ── */
const NavLink = styled(Link)`
  color: ${theme.colors.text.secondary};
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  letter-spacing: -0.01em;
  opacity: 0.85;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

/* ── Solutions dropdown trigger ── */
const DropdownTrigger = styled.span`
  color: ${theme.colors.text.secondary};
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.01em;
  opacity: 0.85;
  transition: opacity 0.2s ease;
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  user-select: none;

  &:hover {
    opacity: 1;
  }
`;

const NavDropdown = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 4px 0;

  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  min-width: 220px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 6px;
  z-index: 200;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 0;
    width: 100%;
    height: 12px;
    background: transparent;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 14px;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  border-radius: 8px;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: ${theme.colors.bg.subtle};
  }
`;

/* ── CTA button (small, rounded, Apple-style) ── */
const CTAButton = styled.button`
  background: ${theme.colors.brand.slate};
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 980px;
  font-size: 13px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.body};
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
  }
`;

/* ── Mobile hamburger button ── */
const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${theme.colors.text.primary};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

/* ── Mobile menu link ── */
const MobileLink = styled(Link)`
  display: block;
  padding: 12px 0;
  font-size: 17px;
  font-weight: 400;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  letter-spacing: -0.01em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: color 0.15s ease;

  &:hover {
    color: ${theme.colors.brand.azure};
  }
`;

const MobileSectionLabel = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.colors.text.tertiary};
  font-weight: 600;
  letter-spacing: 0.06em;
  padding-top: 8px;
  padding-bottom: 4px;
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: scrolled ? '12px 0' : '18px 0',
      background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
      zIndex: 100,
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent'
    }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to={logoLink} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={logo} alt="WorkBuddy" style={{ height: 36 }} />
        </Link>

        {/* ── Desktop Navigation ── */}
        <div className="wb-desktop-nav" style={{ display: 'none', alignItems: 'center', gap: 28 }}>
          <NavDropdown>
            <DropdownTrigger>
              Solutions <FiChevronDown size={13} style={{ marginTop: 1 }} />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem to="/">For Laundromats</DropdownItem>
              <DropdownItem to="/property-management">For Property Management</DropdownItem>
            </DropdownContent>
          </NavDropdown>

          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          <CTAButton
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
          >
            Try Free
          </CTAButton>
        </div>

        {/* ── Mobile Menu Toggle ── */}
        <div className="wb-mobile-toggle" style={{ display: 'none' }}>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </MobileMenuButton>
        </div>
      </Container>

      {/* ── Mobile Menu Panel ── */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          padding: '8px 0 24px',
          zIndex: 99,
          height: '100vh',
        }}>
          <Container>
            <MobileSectionLabel>Solutions</MobileSectionLabel>
            <MobileLink to="/" onClick={() => setMobileMenuOpen(false)}>
              Laundromats
            </MobileLink>
            <MobileLink to="/property-management" onClick={() => setMobileMenuOpen(false)}>
              Property Management
            </MobileLink>

            <div style={{ height: 8 }} />

            <MobileLink to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileLink>
            <MobileLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileLink>
            <MobileLink to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</MobileLink>
            <MobileLink to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</MobileLink>
            <MobileLink to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ borderBottom: 'none' }}>Contact</MobileLink>

            <CTAButton
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: '100%', padding: '14px 20px', marginTop: 20, fontSize: 15 }}
            >
              Try Free
            </CTAButton>
          </Container>
        </div>
      )}

      {/* ── Responsive breakpoint ── */}
      <style>{`
        @media (min-width: 768px) {
          .wb-desktop-nav { display: flex !important; }
          .wb-mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .wb-desktop-nav { display: none !important; }
          .wb-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};
