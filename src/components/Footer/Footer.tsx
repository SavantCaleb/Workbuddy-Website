import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiTwitter, FiLinkedin, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { theme } from '../../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.primary.dark};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing.xl} 0 ${theme.spacing.l};
`;

const FooterContent = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.m};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled(Link)`
  display: inline-block;
  font-size: 28px;
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.m};
  text-decoration: none;

  .work {
    color: ${theme.colors.neutral.white};
  }

  .buddy {
    color: ${theme.colors.primary.yellow};
  }
`;

const CompanyDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: ${theme.spacing.m};
  font-size: 14px;
`;

const ColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: ${theme.typography.weights.semiBold};
  margin-bottom: ${theme.spacing.m};
  color: ${theme.colors.neutral.white};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: block;
  padding: 6px 0;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.yellow};
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 6px 0;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary.yellow};
  }

  svg {
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.s};
  margin-top: ${theme.spacing.m};
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.white};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary.yellow};
    color: ${theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.l};
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.s};
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.m};

  a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primary.yellow};
    }
  }
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterTop>
          <FooterColumn>
            <Logo to="/">
              <span className="work">work</span>
              <span className="buddy">buddy</span>
            </Logo>
            <CompanyDescription>
              Your AI employee that actually works. Answer every call, text, and email 24/7 
              so you can focus on growing your business.
            </CompanyDescription>
            <SocialLinks>
              <SocialLink href="https://twitter.com/workbuddy" aria-label="Twitter">
                <FiTwitter />
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/workbuddy" aria-label="LinkedIn">
                <FiLinkedin />
              </SocialLink>
              <SocialLink href="https://facebook.com/workbuddy" aria-label="Facebook">
                <FiFacebook />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Product</ColumnTitle>
            <FooterLinks>
              <li><FooterLink to="/features">Features</FooterLink></li>
              <li><FooterLink to="/pricing">Pricing</FooterLink></li>
              <li><FooterLink to="/demo">Demo</FooterLink></li>
              <li><FooterLink to="/integrations">Integrations</FooterLink></li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Solutions</ColumnTitle>
            <FooterLinks>
              <li><FooterLink to="/solutions/laundromats">Laundromats</FooterLink></li>
              <li><FooterLink to="/solutions/dry-cleaners">Dry Cleaners</FooterLink></li>
              <li><FooterLink to="/solutions/storage">Storage</FooterLink></li>
              <li><FooterLink to="/solutions/medical">Medical</FooterLink></li>
              <li><FooterLink to="/solutions">View All</FooterLink></li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLinks>
              <li><FooterLink to="/blog">Blog</FooterLink></li>
              <li><FooterLink to="/help">Help Center</FooterLink></li>
              <li><FooterLink to="/case-studies">Case Studies</FooterLink></li>
              <li><FooterLink to="/roi-calculator">ROI Calculator</FooterLink></li>
              <li><FooterLink to="/api">API Docs</FooterLink></li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Contact</ColumnTitle>
            <ContactItem href="tel:1-555-WORKBUDDY">
              <FiPhone /> 1-555-WORKBUDDY
            </ContactItem>
            <ContactItem href="mailto:hello@workbuddy.com">
              <FiMail /> hello@workbuddy.com
            </ContactItem>
            <ContactItem as="div">
              <FiMapPin /> San Diego, CA
            </ContactItem>
          </FooterColumn>
        </FooterTop>

        <FooterBottom>
          <div>© {currentYear} WorkBuddy. All rights reserved.</div>
          <LegalLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterWrapper>
  );
};