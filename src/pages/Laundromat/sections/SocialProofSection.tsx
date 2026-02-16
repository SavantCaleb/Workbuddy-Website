import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext, SectionCTARow, SectionCTALink } from './primitives';

const Content = styled.div`
  text-align: center;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
  margin-top: 32px;
`;

const StatBlock = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 48px;
  color: ${theme.colors.brand.slate};
  line-height: 1;
  letter-spacing: -2px;

  @media (min-width: 640px) {
    font-size: 56px;
    letter-spacing: -2.5px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  margin-top: 6px;
`;

interface SocialProofSectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const SocialProofSection = ({ onScrollToForm }: SocialProofSectionProps) => (
  <LPSection $alt>
    <LPInner $narrow>
      <Content>
        <LPHeadline style={{ textAlign: 'center' }}>
          The Same Technology That Powered 100+ Locations
        </LPHeadline>
        <LPSubtext style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          WorkBuddy is built on the same AI technology that powered Bella—the original laundromat AI receptionist that handled hundreds of thousands of calls across 100+ locations nationwide.
        </LPSubtext>

        <StatsRow>
          <StatBlock>
            <StatNumber>100+</StatNumber>
            <StatLabel>Locations Served</StatLabel>
          </StatBlock>
          <StatBlock>
            <StatNumber>75K+</StatNumber>
            <StatLabel>Calls Handled</StatLabel>
          </StatBlock>
          <StatBlock>
            <StatNumber>3+</StatNumber>
            <StatLabel>Years in Production</StatLabel>
          </StatBlock>
        </StatsRow>

        {onScrollToForm && (
          <SectionCTARow>
            <SectionCTALink href="#form" onClick={onScrollToForm}>
              Get started &rarr;
            </SectionCTALink>
          </SectionCTARow>
        )}
      </Content>
    </LPInner>
  </LPSection>
);
