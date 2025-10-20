import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.surface.primary};
  padding: ${theme.spacing.xxxl} ${theme.spacing.xl} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.neutral.gray200};
`;

const FooterContent = styled.div`
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
  text-align: center;
`;

const CompanyInfo = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

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

const ContactLine = styled.p`
  color: ${theme.colors.neutral.secondary};
  font-size: ${theme.typography.sizes.subhead.desktop};
  margin: ${theme.spacing.xs} 0;
  
  a {
    color: ${theme.colors.primary.blue};
    text-decoration: none;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SMSCompliance = styled.div`
  background: ${theme.colors.surface.secondary};
  border-radius: ${theme.borderRadius.l};
  padding: ${theme.spacing.l};
  margin: ${theme.spacing.xl} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  p {
    color: ${theme.colors.neutral.secondary};
    font-size: ${theme.typography.sizes.footnote.desktop};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.l};
  margin-bottom: ${theme.spacing.l};

  a {
    color: ${theme.colors.neutral.secondary};
    text-decoration: none;
    font-size: ${theme.typography.sizes.footnote.desktop};
    transition: all ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.neutral.label};
    }
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.neutral.tertiary};
  font-size: ${theme.typography.sizes.caption.desktop};
  margin: 0;
`;

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <CompanyInfo>
          <Logo to="/">
            <span className="work">work</span>
            <span className="buddy">buddy</span>
          </Logo>
          <ContactLine>2329 Long Hill Road, Guilford, CT 06437</ContactLine>
          <ContactLine>
            <a href="mailto:caleb@getworkbuddy.com">caleb@getworkbuddy.com</a> • 
            <a href="tel:+12036051105"> (203) 605-1105</a>
          </ContactLine>
        </CompanyInfo>
        
        <SMSCompliance>
          <p>
            <strong>SMS Compliance:</strong> By providing your phone number, you consent to receive SMS messages from businesses using Work Buddy. 
            Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.
          </p>
        </SMSCompliance>

        <LegalLinks>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </LegalLinks>
        
        <Copyright>© {currentYear} Work Buddy. All rights reserved.</Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};