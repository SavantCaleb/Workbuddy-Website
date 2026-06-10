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
    quote: "I absolutely love living here! The property is beautiful and always well-maintained. The clubhouse is amazing\u2014it really feels like a resort with the pool, fitness center, and other great amenities that make it easy to relax and enjoy life. The staff is incredible\u2014always professional, responsive, and genuinely friendly. The maintenance team deserves a special mention\u2014they\u2019re quick, efficient, and always do a great job. The community vibe is welcoming and warm, and it\u2019s been so easy to feel at home here. Plus, it\u2019s a fantastic place for dogs! There\u2019s plenty of green space and dog-friendly areas, which makes it perfect for pet owners. I couldn\u2019t be happier calling this place home!",
    name: "Jasmine V.",
    detail: "Resident",
  },
  {
    quote: "Long time resident (moved in upon completion of initial construction 5 yrs ago). Just want to thank maintenance staff for their hard work during & following the worst snow storm in many years. They have been out almost round the clock plowing & cleaning up snow and I want to recognize their hard work under these difficult conditions.",
    name: "Janice S.",
    detail: "Resident",
  },
  {
    quote: "Dog friendly, great size modern apartments with pool and fitness room as well as clubhouse with a pool table! Beautiful well manicured landscaping. Staff response is timely and professional. Mostly, great friendly people reside here.",
    name: "Donna D.",
    detail: "Resident",
  },
];

export const TestimonialsSection = () => (
  <LPSection id="testimonials" aria-label="Resident reviews">
    <LPInner>
      <Header>
        <LPHeadline style={{ textAlign: 'center' }}>
          What residents are saying
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
