import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline } from './primitives';

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 640px) {
    margin-bottom: 48px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }
`;

const Card = styled.div`
  background: ${theme.colors.surface.primary};
  padding: 28px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    padding: 32px 28px;
    border-radius: 20px;
  }
`;

const Quote = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  flex: 1;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const Author = styled.div`
  border-top: 1px solid ${theme.colors.neutral.gray200};
  padding-top: 16px;
`;

const AuthorName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 2px;
`;

const AuthorDetail = styled.div`
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
`;

const TESTIMONIALS = [
  {
    quote: "We added WorkBuddy three months ago and our wash-and-fold orders went up 35%. The biggest change? Customers can text us now \u2014 half our new orders come through text messages. My customers have no idea it\u2019s not a real person.",
    name: "Maria G.",
    detail: "Owner, 2 locations \u2014 Houston",
  },
  {
    quote: "I got a call from WorkBuddy at 3am because a pipe burst. By the time I got to the store, a customer had already followed WorkBuddy\u2019s instructions to shut off the water. That one call saved me $15,000 in damage easily.",
    name: "James T.",
    detail: "Owner, 1 location \u2014 Chicago",
  },
  {
    quote: "I used to spend my entire day on the phone. Machine questions, hours, refund requests \u2014 the same calls over and over. Now I check my dashboard once a day and only deal with the things that actually need me. I got my weekends back.",
    name: "Diana R.",
    detail: "Owner, 4 locations \u2014 Phoenix",
  },
];

export const TestimonialsSection = () => (
  <LPSection id="testimonials" aria-label="Laundromat owner reviews of WorkBuddy AI receptionist - customer testimonials">
    <LPInner>
      <Header>
        <LPHeadline style={{ textAlign: 'center' }}>
          What owners are saying
        </LPHeadline>
      </Header>

      <Grid>
        {TESTIMONIALS.map((t, i) => (
          <Card key={i}>
            <Quote>&ldquo;{t.quote}&rdquo;</Quote>
            <Author>
              <AuthorName>{t.name}</AuthorName>
              <AuthorDetail>{t.detail}</AuthorDetail>
            </Author>
          </Card>
        ))}
      </Grid>
    </LPInner>
  </LPSection>
);
