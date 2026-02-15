import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const StickyMobileCTAWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.brand.slate};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  padding: 10px 16px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  transform: ${props => props.$visible ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const StickyBtn = styled.button`
  background: #E8742A;
  color: white;
  font-weight: 600;
  font-size: 15px;
  font-family: ${theme.typography.fontFamily.body};
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  width: 100%;
  text-align: center;
  cursor: pointer;
  min-height: 48px;
  letter-spacing: -0.2px;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 480px) {
    width: auto;
    font-size: 16px;
  }
`;

interface StickyMobileCTAProps {
  onScrollToForm: (e: React.MouseEvent) => void;
  formInView: boolean;
}

export const StickyMobileCTA = ({ onScrollToForm, formInView }: StickyMobileCTAProps) => (
  <StickyMobileCTAWrapper $visible={!formInView}>
    <StickyBtn onClick={onScrollToForm}>
      Try WorkBuddy free &#8594;
    </StickyBtn>
  </StickyMobileCTAWrapper>
);
