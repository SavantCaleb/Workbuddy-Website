import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../../styles/theme';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import woodlandsImage from '../../../assets/woodlands.jpg';

const Section = styled.section`
  padding: 80px 0;
  background: #F0F4F8;
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 500;
  color: ${theme.colors.brand.slate};
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  font-family: ${theme.typography.fontFamily.heading};
`;

const FeaturedCard = styled(motion.div)`
  background: ${theme.colors.bg.default};
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 24px;
  min-height: 400px;
  box-shadow: ${theme.shadows.soft};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const VideoSide = styled.div`
  position: relative;
  background: #000;
  overflow: hidden;
  aspect-ratio: 1.5; /* 1080/720 = 1.5 */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ContentSide = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #FFFFFF;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.brand.slate};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled.div``;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: ${theme.typography.weights.medium};
  font-family: ${theme.typography.fontFamily.heading};
  color: ${theme.colors.brand.slate};
  line-height: 1;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${theme.colors.text.secondary};
  line-height: 1.4;
`;

const Quote = styled.blockquote`
  font-size: 20px;
  line-height: 1.4;
  color: ${theme.colors.brand.slate};
  margin: 0 0 24px 0;
  font-family: ${theme.typography.fontFamily.heading};
`;

const Author = styled.div`
  font-size: 14px;
  
  strong {
    display: block;
    font-weight: 700;
    color: ${theme.colors.brand.slate};
    margin-bottom: 4px;
  }
  
  span {
    color: ${theme.colors.text.secondary};
  }
`;

// New Unified Grid Layout
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px; // Creates the border effect
  background: rgba(0,0,0,0.05); // Border color
  border: 1px solid rgba(0,0,0,0.05); // Outer border
  border-radius: 24px; // Rounded corners for the whole block
  overflow: hidden; // Clips children to border radius

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled(motion.div)<{ $bgColor?: string }>`
  background: ${props => props.$bgColor || '#FFFFFF'};
  padding: 32px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8F9FA;
  }
`;

// const LogoItem = styled(GridItem)`
//   align-items: flex-start;
//   justify-content: space-between;
//   background: #FFFFFF;
//   
//   &:hover {
//     background: #F8F9FA;
//   }
// `;

const ArrowIcon = styled(FiArrowRight)`
  align-self: flex-end;
  font-size: 20px;
  color: ${theme.colors.brand.slate};
  opacity: 0.5;
`;

const StatItemCard = styled(GridItem)`
  justify-content: flex-end;
`;

// const QuoteItemCard = styled(GridItem)`
//   justify-content: space-between;
// `;

interface CaseStudiesSectionProps {
  id?: string;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ id }) => {
  return (
    <Section id={id}>
      <Container>
        <Header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ 
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: theme.colors.text.tertiary,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                background: theme.colors.text.tertiary,
                borderRadius: '50%'
              }} />
              RESULTS
            </div>
            <Title>How businesses fill their calendars <br />with WorkBuddy</Title>
          </motion.div>
        </Header>

        {/* Featured Case Study */}
        <FeaturedCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VideoSide>
            <img src={woodlandsImage} alt="The Woodlands Aerial View" loading="lazy" />
            <PlayButton>
              <FiPlay size={20} fill="black" stroke="none" />
            </PlayButton>
          </VideoSide>
          <ContentSide>
            <Logo>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>
              THE WOODLANDS
            </Logo>
            
            <StatsGrid>
              <StatItem>
                <StatValue>$1.2 Mil</StatValue>
                <StatLabel>lease revenue generated</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>56 Hrs</StatValue>
                <StatLabel>of time saved per week</StatLabel>
              </StatItem>
            </StatsGrid>

            <Quote>
              "WorkBuddy handles our entire follow-up process. Our team just shows up to appointments that are already booked."
            </Quote>

            <Author>
              <strong>Linda Montanez</strong>
              <span>Property Manager, The Woodlands</span>
            </Author>
          </ContentSide>
        </FeaturedCard>

        {/* Combined Company + Stat Cards */}
        <BentoGrid>
          {[
            { name: "Healthcare Plus", stat: "9k", label: "appointments booked" },
            { name: "Legal Partners", stat: "$30k", label: "additional revenue" },
            { name: "Consulting Pro", stat: "43", label: "hrs saved per week" },
            { name: "Service Group", stat: "100%", label: "staff satisfaction" }
          ].map((company, i) => (
            <StatItemCard
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ minHeight: '160px', padding: '24px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'auto',
                width: '100%'
              }}>
                <div style={{ 
                  fontWeight: 800, 
                  color: theme.colors.brand.slate, 
                  fontSize: 18, 
                  textTransform: 'uppercase'
                }}>
                  {company.name}
                </div>
                <ArrowIcon />
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <StatValue style={{ fontSize: 36 }}>{company.stat}</StatValue>
                <StatLabel>{company.label}</StatLabel>
              </div>
            </StatItemCard>
          ))}
        </BentoGrid>

      </Container>
    </Section>
  );
};
