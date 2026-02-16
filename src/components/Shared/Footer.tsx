import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Container, ResponsiveGrid, Button } from './Layout';
import logo from '../../assets/logo.png';

export const Footer = () => {
  return (
    <footer style={{ background: theme.colors.brand.slate, padding: '80px 0 40px', color: 'rgba(255,255,255,0.6)' }}>
      <Container>
        <ResponsiveGrid style={{ marginBottom: 80, alignItems: 'start' }}>
          <div>
            <Link to="/">
              <img src={logo} alt="WorkBuddy" style={{ height: 40, marginBottom: 16 }} />
            </Link>
            <p style={{ maxWidth: 300, lineHeight: 1.6 }}>
              AI-powered phone receptionist for laundromats and property management.
            </p>
            <p style={{ fontSize: 14, marginTop: 16 }}>
              © {new Date().getFullYear()} WorkBuddy. All rights reserved.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 40, width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Solutions</span>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Laundromats</Link>
              <Link to="/property-management" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Property Management</Link>
              <Link to="/pricing" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Pricing</Link>
              <Button
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                $variant="ghost"
                style={{ padding: 0, color: 'rgba(255,255,255,0.6)', justifyContent: 'flex-start' }}
              >
                Book Demo
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Company</span>
              <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>About</Link>
              <Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Blog</Link>
              <a href="mailto:hello@getworkbuddy.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Contact</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Resources</span>
              <Link to="/blog/ai-receptionist-for-laundromats" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>AI Receptionist Guide</Link>
              <Link to="/blog/how-to-automate-your-laundromat" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Automation Playbook</Link>
              <Link to="/blog/ai-answering-service-guide" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>AI Answering Guide</Link>
              <Link to="/blog/best-laundromat-software" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Best Software 2026</Link>
              <Link to="/blog/how-to-start-a-laundromat" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Start a Laundromat</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Legal</span>
              <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Terms of Service</Link>
            </div>

          </div>
        </ResponsiveGrid>
      </Container>
    </footer>
  );
};
