import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';
import logo from '../../assets/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  position: relative;
  z-index: 2;
`;

export const MainNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isSecretShop = location.pathname === '/secret-shop';

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
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="WorkBuddy" style={{ height: 40 }} />
        </a>

        {!isSecretShop && (
          <div style={{ display: 'none', gap: 32, alignItems: 'center' }} className="desktop-menu">
            {['Features', 'How it Works', 'Results'].map(item => (
              <a key={item} href={`/#${item.toLowerCase().replace(/\s/g, '-')}`} style={{ 
                color: theme.colors.text.secondary, 
                fontWeight: 500,
                fontSize: 15,
                textDecoration: 'none'
              }}>
                {item}
              </a>
            ))}
            <Button 
              data-cal-link="caleb-benedict-4rrqhq/demo"
              data-cal-namespace="demo"
              data-cal-config='{"layout":"month_view"}'
              style={{ padding: '10px 20px' }}
            >
              Book Demo
            </Button>
          </div>
        )}

        {/* Mobile Menu Toggle - Only show if not on secret shop */}
        {!isSecretShop && (
          <div style={{ display: 'block' }} className="mobile-toggle">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: theme.colors.neutral.label }}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        )}
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isSecretShop && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.colors.brand.slate}10`,
          padding: '24px 0',
          zIndex: 99
        }}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {['Features', 'How it Works', 'Results'].map(item => (
                <a 
                  key={item} 
                  href={`/#${item.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    color: theme.colors.text.secondary, 
                    fontWeight: 500,
                    fontSize: 18,
                    textDecoration: 'none',
                    padding: '12px 0'
                  }}
                >
                  {item}
                </a>
              ))}
              <Button 
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ padding: '12px 20px', marginTop: 8 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Button>
            </div>
          </Container>
        </div>
      )}
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};
