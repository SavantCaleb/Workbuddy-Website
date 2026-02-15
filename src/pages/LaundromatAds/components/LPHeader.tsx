import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import logo from '../../../assets/logo.png';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 0 24px;
    height: 64px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

const HeaderCTA = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

/* Desktop: text CTA button. Mobile: arrow icon, scrolls to form. Fades out when form visible. */
const HeaderBtn = styled.a<{ $hidden?: boolean }>`
  background: #E8742A;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  font-family: ${theme.typography.fontFamily.body};
  cursor: pointer;
  transition: background 0.2s, opacity 0.3s ease, transform 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(232, 116, 42, 0.25);
  opacity: ${props => props.$hidden ? 0 : 1};
  pointer-events: ${props => props.$hidden ? 'none' : 'auto'};
  transform: ${props => props.$hidden ? 'scale(0.92)' : 'scale(1)'};

  &:hover {
    background: #D4681F;
  }

  @media (min-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }
`;

const HeaderBtnText = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
`;

const HeaderBtnIcon = styled.span`
  display: inline-flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface LPHeaderProps {
  onScrollToForm: (e: React.MouseEvent) => void;
  formInView?: boolean;
}

export const LPHeader = ({ onScrollToForm, formInView }: LPHeaderProps) => (
  <Header>
    <Logo href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
      <img src={logo} alt="WorkBuddy" style={{ height: 32 }} />
    </Logo>
    <HeaderCTA>
      <HeaderBtn
        href="#form"
        onClick={onScrollToForm}
        $hidden={formInView}
      >
        <HeaderBtnIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </HeaderBtnIcon>
        <HeaderBtnText>Try it free &#8594;</HeaderBtnText>
      </HeaderBtn>
    </HeaderCTA>
  </Header>
);
