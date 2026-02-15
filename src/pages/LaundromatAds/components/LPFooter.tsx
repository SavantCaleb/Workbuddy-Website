import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const PageFooter = styled.footer`
  padding: 28px 20px 90px;
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.neutral.gray400};
  letter-spacing: 0px;

  @media (min-width: 640px) {
    padding: 44px 32px 100px;
    font-size: 13px;
  }

  @media (min-width: 769px) {
    padding: 44px 32px;
  }
`;

const FooterLinks = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px 0;

  a {
    color: ${theme.colors.neutral.gray400};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${theme.colors.text.secondary};
    }
  }

  @media (min-width: 640px) {
    margin-bottom: 20px;
  }
`;

const FooterSeparator = styled.span`
  color: ${theme.colors.neutral.gray200};
  margin: 0 10px;
  font-size: 11px;
  user-select: none;

  @media (min-width: 640px) {
    margin: 0 14px;
  }
`;

const FooterCopy = styled.p`
  color: ${theme.colors.neutral.gray300};
  margin: 0;
`;

export const LPFooter = () => (
  <PageFooter>
    <FooterLinks>
      <a href="#">Privacy</a>
      <FooterSeparator>|</FooterSeparator>
      <a href="#">Terms</a>
      <FooterSeparator>|</FooterSeparator>
      <a href="#">Contact</a>
    </FooterLinks>
    <FooterCopy>Copyright &copy; 2026 WorkBuddy Inc.</FooterCopy>
  </PageFooter>
);
