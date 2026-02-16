import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext, SectionCTARow, SectionCTALink } from './primitives';

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 48px;

  @media (min-width: 640px) {
    margin-bottom: 60px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(50, 74, 95, 0.04);

  @media (min-width: 640px) {
    padding: 32px;
    border-radius: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

interface PainPointSectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const PainPointSection = ({ onScrollToForm }: PainPointSectionProps) => (
  <LPSection $alt>
    <LPInner>
      <Header>
        <LPHeadline>Every Missed Call Has Consequences</LPHeadline>
        <LPSubtext>
          Your laundromat shouldn't fail silently. Here's what's at stake when no one answers.
        </LPSubtext>
      </Header>

      <CardGrid>
        <Card>
          <CardTitle>Silent Emergencies</CardTitle>
          <CardText>
            You don't miss emergencies because you're lazy. You miss them because you're asleep. That 2am flood? You find out at 8am with thousands in damage.
          </CardText>
        </Card>

        <Card>
          <CardTitle>Your Best Customers</CardTitle>
          <CardText>
            The calls you miss aren't random—they're your best customers. Wash-dry-fold (WDF) orders, commercial accounts, the ones worth $30-75 each.
          </CardText>
        </Card>

        <Card>
          <CardTitle>Permanent Review Damage</CardTitle>
          <CardText>
            Reviews don't punish bad laundromats. They punish <em>unreachable</em> ones. "Called three times, no answer" stays on Google forever.
          </CardText>
        </Card>

        <Card>
          <CardTitle>Small Issues Go Public</CardTitle>
          <CardText>
            A $1.50 refund request becomes a 1-star review and angry Facebook post. Small issues turn into public problems when no one answers.
          </CardText>
        </Card>
      </CardGrid>

      {onScrollToForm && (
        <SectionCTARow>
          <SectionCTALink href="#form" onClick={onScrollToForm}>
            Stop missing calls &rarr;
          </SectionCTALink>
        </SectionCTARow>
      )}
    </LPInner>
  </LPSection>
);
