import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, SectionCTALink } from './primitives';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
  font-size: 15px;
  color: ${theme.colors.text.secondary};

  @media (min-width: 640px) {
    font-size: 16px;
    border-radius: 14px;
  }
`;

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.neutral.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Closer = styled.p`
  text-align: center;
  margin-top: 32px;
  font-size: 15px;
  color: ${theme.colors.text.tertiary};
`;

const ITEMS = [
  "You personally enjoy answering every customer call",
  "You're rarely away from your store",
  "You get fewer than 5 calls a week",
  "A missed call doesn't cost you sleep or money",
];

interface NotForYouSectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const NotForYouSection = ({ onScrollToForm }: NotForYouSectionProps) => (
  <LPSection $alt id="is-it-right-for-you" aria-label="Is AI phone answering right for your laundromat - laundromat staffing solution and missed calls solution">
    <LPInner>
      <Container>
        <LPHeadline style={{ textAlign: 'center', marginBottom: 32 }}>
          WorkBuddy isn't for everyone.
        </LPHeadline>

        <ItemList>
          {ITEMS.map((item, i) => (
            <Item key={i}>
              <XIcon />
              {item}
            </Item>
          ))}
        </ItemList>

        <Closer>
          But if missed calls cost you money, sleep, or reputation —{' '}
          {onScrollToForm ? (
            <SectionCTALink href="#form" onClick={onScrollToForm} style={{ display: 'inline' }}>
              let's fix that &rarr;
            </SectionCTALink>
          ) : (
            "we should talk."
          )}
        </Closer>
      </Container>
    </LPInner>
  </LPSection>
);
