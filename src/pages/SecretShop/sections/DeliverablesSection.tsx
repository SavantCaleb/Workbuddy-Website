import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { FiLayout, FiVideo, FiDollarSign } from 'react-icons/fi';

const Section = styled.section`
  padding: 80px 0;
  background: ${theme.colors.bg.subtle};
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.sizes.headline.desktop};
  color: ${theme.colors.brand.slate};
  font-size: 36px;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.soft};
  transition: transform 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: ${theme.colors.brand.azure}15;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.brand.azure};
  font-size: 28px;
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  margin-bottom: 12px;
  font-family: ${theme.typography.fontFamily.heading};
`;

const CardText = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

export const DeliverablesSection = () => {
  const items = [
    {
      icon: FiLayout,
      title: "Busted Business Funnel Scorecard",
      desc: "Your business rated across 5 categories, 25 points total. Speed to Lead, First Conversation, Appointment Confirmation, No-Show Recovery, and Ghost Lead Follow-up."
    },
    {
      icon: FiVideo,
      title: "Custom Video Walkthrough",
      desc: "A personalized Loom video showing exactly what happened when I submitted leads to your business. Screen recordings, timestamps, the whole investigation."
    },
    {
      icon: FiDollarSign,
      title: "Revenue Leak Calculation",
      desc: "Based on your lead volume and industry benchmarks, I'll calculate how much money your funnel issues are costing you annually."
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader>
          <Title>Here's What You'll Receive</Title>
        </SectionHeader>
        <Grid>
          {items.map((item, index) => (
            <Card key={index}>
              <IconWrapper>{<item.icon />}</IconWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.desc}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
