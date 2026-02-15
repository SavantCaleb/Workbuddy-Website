import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { CLIENT_LOGOS } from '../constants';

const scroll = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const StripOuter = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.surface.primary}cc;
  padding: 18px 0;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    padding: 28px 0;
  }
`;

const StripLabel = styled.div`
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.text.tertiary};
  letter-spacing: -0.1px;
  padding: 0 20px 12px;
  white-space: nowrap;

  @media (min-width: 640px) {
    font-size: 13px;
    padding: 0 28px 0 32px;
  }

  @media (min-width: 900px) {
    padding-left: 40px;
    padding-right: 36px;
  }

  @media (min-width: 1180px) {
    padding-left: calc((100vw - 1100px) / 2);
  }
`;

const StripScroller = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  min-width: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    left: 0;
    width: 20px;
    background: linear-gradient(to right, ${theme.colors.surface.primary}cc, transparent);
  }

  &::after {
    right: 0;
    width: 40px;
    background: linear-gradient(to left, ${theme.colors.surface.primary}cc, transparent);
  }

  @media (min-width: 640px) {
    &::before {
      width: 24px;
    }
    &::after {
      width: 60px;
    }
  }

  @media (min-width: 1180px) {
    &::after {
      width: calc((100vw - 1100px) / 2 + 20px);
    }
  }
`;

const StripTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 150s linear infinite;
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const StripSet = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const StripLogo = styled.img`
  flex-shrink: 0;
  height: 36px;
  width: auto;
  margin: 0 22px;
  opacity: 1;
  filter: grayscale(100%) brightness(0.4) sepia(1) hue-rotate(176deg) saturate(5);
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;

  @media (min-width: 640px) {
    height: 42px;
    margin: 0 40px;
  }
`;

const LOGO_SIZES: Record<string, number> = {
  'Super Wash 27': 60,
  'Anytime Laundry': 72,
  'Fresh and Clean Laundry': 52,
  'Rinse & Roll Laundry': 28,
  'Turbo Laundry': 30,
  'Long Island Laundry Company': 30,
};

const renderLogos = () =>
  CLIENT_LOGOS.map((client, i) => (
    <StripLogo
      key={i}
      src={client.logo}
      alt={client.name}
      loading="lazy"
      style={LOGO_SIZES[client.name] ? { height: LOGO_SIZES[client.name] } : undefined}
    />
  ));

export const ClientScrollStrip = () => (
  <StripOuter>
    <StripLabel>Trusted by laundromats nationwide</StripLabel>
    <StripScroller>
      <StripTrack>
        <StripSet>{renderLogos()}</StripSet>
        <StripSet aria-hidden="true">{renderLogos()}</StripSet>
      </StripTrack>
    </StripScroller>
  </StripOuter>
);
