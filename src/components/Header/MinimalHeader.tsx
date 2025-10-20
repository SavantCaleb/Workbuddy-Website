import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Button } from '../Button/Button';
import { WaitingListModal } from '../WaitingListModal/WaitingListModal';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(${theme.blur.lg});
  -webkit-backdrop-filter: blur(${theme.blur.lg});
  transition: all ${theme.transitions.normal};
`;

const HeaderContainer = styled.div`
  max-width: ${theme.maxWidth.content};
  margin: 0 auto;
  padding: ${theme.spacing.m} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.m} ${theme.spacing.l};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${theme.typography.sizes.headline.desktop};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.neutral.label};
  text-decoration: none;
  transition: all ${theme.transitions.fast};
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

const CTAWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.l};
`;

export const MinimalHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <span className="work">work</span>
          <span className="buddy">buddy</span>
        </Logo>

        <CTAWrapper>
          <Button size="medium" onClick={openModal}>Join List</Button>
        </CTAWrapper>
      </HeaderContainer>
      
      <WaitingListModal isOpen={isModalOpen} onClose={closeModal} />
    </HeaderWrapper>
  );
};