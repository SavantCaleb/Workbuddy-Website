import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.surface.secondary};
  padding: ${theme.spacing.xxxxl} ${theme.spacing.xl} ${theme.spacing.xxxl};
  border-top: 1px solid ${theme.colors.neutral.gray200};
`;

const FooterContent = styled.div`
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${theme.spacing.xxxl};
  margin-bottom: ${theme.spacing.xxxl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xxl};
    text-align: center;
  }
`;

const CompanySection = styled.div``;

const Logo = styled(Link)`
  display: inline-block;
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.semibold};
  margin-bottom: ${theme.spacing.l};
  text-decoration: none;
  color: ${theme.colors.neutral.label};
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

const CompanyDescription = styled.p`
  color: ${theme.colors.neutral.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.l};
  font-size: ${theme.typography.sizes.body.desktop};
`;

const ContactInfo = styled.div`
  margin-bottom: ${theme.spacing.l};
  
  p {
    color: ${theme.colors.neutral.tertiary};
    font-size: ${theme.typography.sizes.subhead.desktop};
    margin: ${theme.spacing.xs} 0;
    line-height: ${theme.typography.lineHeight.normal};
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-size: ${theme.typography.sizes.body.desktop};
  font-weight: ${theme.typography.weights.semibold};
  margin-bottom: ${theme.spacing.l};
  color: ${theme.colors.neutral.label};
  letter-spacing: -0.01em;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.a`
  color: ${theme.colors.neutral.secondary};
  text-decoration: none;
  display: block;
  padding: ${theme.spacing.xs} 0;
  font-size: ${theme.typography.sizes.subhead.desktop};
  transition: all ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.neutral.label};
  }
`;

const SMSCompliance = styled.div`
  background: ${theme.colors.neutral.gray100};
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.l};
  margin: ${theme.spacing.xxl} 0;
  
  h5 {
    font-size: ${theme.typography.sizes.subhead.desktop};
    font-weight: ${theme.typography.weights.semibold};
    color: ${theme.colors.neutral.label};
    margin-bottom: ${theme.spacing.s};
  }
  
  p {
    color: ${theme.colors.neutral.secondary};
    font-size: ${theme.typography.sizes.subhead.desktop};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`;

const FooterBottom = styled.div`
  padding-top: ${theme.spacing.l};
  border-top: 1px solid ${theme.colors.neutral.gray200};
  color: ${theme.colors.neutral.tertiary};
  font-size: ${theme.typography.sizes.footnote.desktop};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.m};
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.l};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }

  a {
    color: ${theme.colors.neutral.tertiary};
    text-decoration: none;
    transition: all ${theme.transitions.fast};
    font-size: ${theme.typography.sizes.footnote.desktop};

    &:hover {
      color: ${theme.colors.neutral.secondary};
    }
  }
`;

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FooterWrapper id="support">
      <FooterContent>
        <FooterTop>
          <CompanySection>
            <Logo to="/">
              <span className="work">work</span>
              <span className="buddy">buddy</span>
            </Logo>
            <CompanyDescription>
              Work Buddy is an AI-powered phone and SMS answering service for small businesses. 
              We help you never miss another customer.
            </CompanyDescription>
            <ContactInfo>
              <p>Business Address: 2329 Long Hill Road, Guilford, CT 06437</p>
              <p>Email: caleb@getworkbuddy.com</p>
              <p>Phone: +1 (203) 605-1105</p>
            </ContactInfo>
          </CompanySection>
          
          <FooterColumn>
            <ColumnTitle>Product</ColumnTitle>
            <FooterLinks>
              <li>
                <FooterLink onClick={() => scrollToSection('how-it-works')}>
                  How It Works
                </FooterLink>
              </li>
              <li>
                <FooterLink onClick={() => scrollToSection('pricing')}>
                  Pricing
                </FooterLink>
              </li>
              <li>
                <FooterLink href="mailto:caleb@getworkbuddy.com">
                  Contact
                </FooterLink>
              </li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Company</ColumnTitle>
            <FooterLinks>
              <li>
                <FooterLink href="/about">
                  About
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">
                  Blog
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">
                  Careers
                </FooterLink>
              </li>
            </FooterLinks>
          </FooterColumn>
        </FooterTop>
        
        <SMSCompliance>
          <h5>SMS Compliance</h5>
          <p>
            By providing your phone number, you consent to receive SMS messages from businesses using Work Buddy. 
            Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.
          </p>
        </SMSCompliance>

        <FooterBottom>
          <div>© {currentYear} Work Buddy. All rights reserved.</div>
          <LegalLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterWrapper>
  );
};