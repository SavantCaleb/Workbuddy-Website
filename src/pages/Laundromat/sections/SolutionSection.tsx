import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext, LPGrid } from './primitives';

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;

  @media (min-width: 640px) {
    margin-bottom: 60px;
  }
`;

const UseCaseStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UseCaseCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(50, 74, 95, 0.06);

  @media (min-width: 640px) {
    border-radius: 20px;
  }
`;

const UseCaseTitle = styled.h3`
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 12px;
`;

const UseCaseText = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;

  strong {
    color: ${theme.colors.brand.azure};
  }
`;

const ProofZone = styled.div`
  background: ${theme.colors.surface.primary};
  padding: 28px;
  border-radius: 16px;

  @media (min-width: 640px) {
    padding: 36px;
    border-radius: 24px;
  }
`;

const ProofTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 24px;
`;

const OpStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OpCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 14px;
`;

const OpLabel = styled.strong`
  display: block;
  color: ${theme.colors.brand.slate};
  margin-bottom: 8px;
  font-size: 15px;
`;

const OpText = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

export const SolutionSection = () => (
  <LPSection>
    <LPInner>
      <Header>
        <LPHeadline>What Happens When Someone Calls Your Laundromat</LPHeadline>
        <LPSubtext>Three tiers of call handling — automatic, revenue-generating, and urgent.</LPSubtext>
      </Header>

      <LPGrid>
        <UseCaseStack>
          <UseCaseCard>
            <UseCaseTitle>If It's Routine</UseCaseTitle>
            <UseCaseText>
              <strong>WorkBuddy resolves it instantly.</strong> Hours, pricing, machine status, directions—the questions that make up 60% of calls get answered without bothering you.
            </UseCaseText>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseTitle>If It's Revenue</UseCaseTitle>
            <UseCaseText>
              <strong>WorkBuddy captures it.</strong> WDF orders, commercial inquiries, pickup scheduling—the high-value calls get taken properly, not lost to voicemail.
            </UseCaseText>
          </UseCaseCard>

          <UseCaseCard>
            <UseCaseTitle>If It's Serious</UseCaseTitle>
            <UseCaseText>
              <strong>You're notified immediately.</strong> Floods, fires, break-ins, equipment failures—real emergencies reach you via call, text, or both. No delay.
            </UseCaseText>
          </UseCaseCard>
        </UseCaseStack>

        <ProofZone>
          <ProofTitle>Built For How You Operate</ProofTitle>
          <OpStack>
            <OpCard>
              <OpLabel>Unattended / Card-Op</OpLabel>
              <OpText>24/7 coverage for stores where you can't always be there. Emergencies never go unnoticed.</OpText>
            </OpCard>
            <OpCard>
              <OpLabel>Wash-and-Fold</OpLabel>
              <OpText>Never miss a WDF order again. Every inquiry captured, every pickup scheduled.</OpText>
            </OpCard>
            <OpCard>
              <OpLabel>Pickup & Delivery</OpLabel>
              <OpText>Coordinate routes, confirm addresses, and keep customers informed automatically.</OpText>
            </OpCard>
            <OpCard>
              <OpLabel>Multi-Location</OpLabel>
              <OpText>Consistent service quality across all your stores. One system, no gaps.</OpText>
            </OpCard>
          </OpStack>
        </ProofZone>
      </LPGrid>
    </LPInner>
  </LPSection>
);
