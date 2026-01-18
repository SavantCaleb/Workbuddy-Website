import styled, { keyframes } from 'styled-components';

const aurora = keyframes`
  0% { background-position: 50% 50%, 50% 50%; }
  50% { background-position: 100% 0%, 0% 100%; }
  100% { background-position: 50% 50%, 50% 50%; }
`;

export const AuroraBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(103, 183, 209, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(220, 171, 88, 0.05) 0%, transparent 40%);
  filter: blur(60px);
  animation: ${aurora} 20s ease infinite;
  z-index: 0;
`;
