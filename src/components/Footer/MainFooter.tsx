import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';
import logo from '../../assets/logo.png';

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  position: relative;
  z-index: 2;
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
`;

export const MainFooter = () => {
  return (
    <footer style={{ background: theme.colors.brand.slate, padding: '80px 0 40px', color: 'rgba(255,255,255,0.6)' }}>
      <Container>
        <ResponsiveGrid style={{ marginBottom: 80, alignItems: 'start' }}>
          <div>
            <img src={logo} alt="WorkBuddy" loading="lazy" style={{ height: 40, marginBottom: 16 }} />
            <p style={{ maxWidth: 300, lineHeight: 1.6 }}>
              AI that books appointments for you.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Navigation</span>
              <a 
                href="/#features" 
                style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer' 
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
              >
                Features
              </a>
              <a 
                href="/#how-it-works" 
                style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer' 
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
              >
                How it Works
              </a>
              <a 
                href="/#results" 
                style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer' 
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
              >
                Results
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Get Started</span>
              <Button 
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ 
                  padding: '12px 24px', 
                  fontSize: 14,
                  background: theme.colors.brand.azure,
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  width: 'fit-content'
                }}
              >
                Book Demo
              </Button>
            </div>
          </div>
        </ResponsiveGrid>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40, textAlign: 'center', fontSize: 14 }}>
          © {new Date().getFullYear()} WorkBuddy AI. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};
