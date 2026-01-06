import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { theme } from '../../../styles/theme';
// import { FiDatabase, FiCalendar, FiUser, FiSettings, FiCheck, FiPhone } from 'react-icons/fi';

const Section = styled.section`
  position: relative;
  background: #324A5F; // Deep slate blue background
  height: 300vh; // Height for scroll distance
  margin-top: -1px; // Fix potential sub-pixel gap
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const ContentGrid = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 60px;
  height: 100%;
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1.2fr 0.8fr;
    gap: 40px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 80px 24px;
    height: auto;
  }
`;

// --- LEFT COLUMN ---

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 60px 0;
`;

const Tag = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:before {
    content: '';
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }
`;

const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 48px;
  max-width: 340px;
`;

const InsightBox = styled.div`
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 32px;
  max-width: 320px;
`;

const InsightText = styled(motion.p)`
  font-size: 18px;
  line-height: 1.5;
  color: #FFFFFF;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.heading};
`;

// --- RIGHT COLUMN ---

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
  height: 100%;
  padding-left: 20px;
  border-left: 1px solid rgba(0,0,0,0.05);

  @media (max-width: 1024px) {
    border-left: none;
    padding-left: 0;
    flex-direction: row;
    gap: 24px;
    padding-bottom: 40px;
  }
`;

const StepItem = styled.div<{ $isActive: boolean }>`
  opacity: ${props => props.$isActive ? 1 : 0.4};
  transition: opacity 0.5s ease;
  cursor: pointer;
`;

const StepNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${theme.typography.fontFamily.heading};

  span {
    background: #67B7D1;
    color: #324A5F;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
  }
`;


const StepDesc = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 280px;
`;


// --- CENTER COLUMN (VISUALS) ---

const CenterColumn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VisualCard = styled(motion.div)`
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Step 1 Visuals
const SettingCard = styled.div`
  background: #F0F4F8; // Light blue background to match site
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #324A5F;
`;

const VoicePlayer = styled.div`
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.08);
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Waveform = styled.div`
  flex: 1;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 2px;
  
  div {
    width: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const PlayBtn = styled.button`
  background: #67B7D1;
  color: #324A5F;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap; // Prevent text wrapping on mobile
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const OptionTag = styled.div<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  background: ${props => props.$active ? '#FFFFFF' : 'rgba(255,255,255,0.5)'};
  color: #324A5F;
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'};
`;

// Step 2 Visuals (Flow)
// const Node = styled.div<{ $type?: 'trigger' | 'action' | 'logic' }>`
//   background: #F0F4F8;
//   padding: 12px 16px;
//   border-radius: 12px;
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   box-shadow: 0 4px 20px rgba(0,0,0,0.08);
//   font-size: 14px;
//   font-weight: 600;
//   color: #324A5F;
//   width: fit-content;
//   position: relative;
//   z-index: 2;

//   svg {
//     color: ${props => props.$type === 'trigger' ? '#67B7D1' : props.$type === 'logic' ? '#DCAB58' : '#67B7D1'};
//   }
// `;

const ConversationContainer = styled.div`
  background: #F0F4F8;
  border-radius: 24px;
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ConversationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(50, 74, 95, 0.08);
  margin-bottom: 20px;
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #67B7D1;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .call-info {
    font-size: 14px;
    font-weight: 500;
    color: #324A5F;
    font-family: ${theme.typography.fontFamily.heading};
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const Message = styled.div<{ $isUser?: boolean }>`
  display: flex;
  margin-bottom: 16px;
  
  .bubble {
    background: ${props => props.$isUser ? '#324A5F' : 'rgba(255, 255, 255, 0.9)'};
    color: ${props => props.$isUser ? '#FFFFFF' : '#324A5F'};
    padding: 14px 18px;
    border-radius: ${props => props.$isUser ? '20px 20px 6px 20px' : '20px 20px 20px 6px'};
    font-size: 15px;
    line-height: 1.4;
    font-weight: 400;
    max-width: 280px;
    margin-left: ${props => props.$isUser ? 'auto' : '0'};
    margin-right: ${props => props.$isUser ? '0' : 'auto'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px 20px 20px 6px;
  max-width: fit-content;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .dots {
    display: flex;
    gap: 4px;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    background: #67B7D1;
    border-radius: 50%;
    animation: typing 1.5s infinite;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }
`;

// Step 3 Visuals (Tailor) - Apple-style sophisticated animation
const AdaptationContainer = styled.div`
  background: #F5F5F7;
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 640px;
  height: 580px;
  margin: 0 auto;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const BuildingsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  position: relative;
  padding: 0 40px;
  width: 100%;
`;

const Building = styled(motion.div)<{ $isActive: boolean; $height: number }>`
  width: 64px;
  height: ${props => props.$height}px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(180deg, #5CA4E8 0%, #1A4E7A 100%)' 
    : '#D1D1D6'};
  border-radius: 8px 8px 0 0;
  position: relative;
  cursor: pointer;
  
  /* Reflection/Shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%);
    border-radius: 8px 8px 0 0;
  }

  /* Active glow */
  box-shadow: ${props => props.$isActive ? '0 0 20px rgba(92, 164, 232, 0.4)' : 'none'};
`;

const DetailsCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 20;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  h3 {
    font-size: 17px;
    font-weight: 600;
    color: #1D1D1F;
    margin: 0;
    letter-spacing: -0.01em;
  }

  span {
    font-size: 11px;
    font-weight: 600;
    color: #86868B;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 24px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 11px;
    font-weight: 600;
    color: #86868B;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  div {
    font-size: 14px;
    font-weight: 500;
    color: #1D1D1F;
  }
`;



export const ArtOfAISection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);
  const [activeBuildingIndex, setActiveBuildingIndex] = useState(0);

  // Update active step based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.33) setActiveStep(0);
      else if (latest < 0.66) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [scrollYProgress]);

  // Sophisticated building analysis cycle
  useEffect(() => {
    if (activeStep === 2) {
      const interval = setInterval(() => {
        setActiveBuildingIndex((prev) => (prev + 1) % 4);
      }, 3500); // Longer intervals for Apple-style pacing
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  // Building data with property-specific configurations
  const buildings = [
    { 
      name: "Metro Downtown", 
      height: 140, 
      width: 60,
      details: {
        tours: "Book 7 days out",
        maintenance: "Emergency only (24/7)",
        pricing: "Quote over phone",
        hours: "24/7 availability"
      }
    },
    { 
      name: "Highland Park", 
      height: 110, 
      width: 60,
      details: {
        tours: "Weekdays only",
        maintenance: "Auto-dispatch all",
        pricing: "Schedule in-person",
        hours: "Business hours"
      }
    },
    { 
      name: "Westside Complex", 
      height: 160, 
      width: 60,
      details: {
        tours: "Virtual + in-person",
        maintenance: "Tenant portal first",
        pricing: "Instant quotes",
        hours: "Extended hours"
      }
    },
    { 
      name: "Riverside Plaza", 
      height: 125, 
      width: 60,
      details: {
        tours: "Same-day booking",
        maintenance: "Direct dispatch",
        pricing: "Manager approval",
        hours: "Standard schedule"
      }
    }
  ];

  const insights = [
    "Residents engage when AI feels human, not robotic.",
    "Connected to your calendar, not just your knowledge base.",
    "Configuration, not just training. Every property is unique."
  ];

  return (
    <Section ref={containerRef}>
      <StickyContainer>
        <ContentGrid>
          {/* LEFT COLUMN - Sticky Info */}
          <LeftColumn>
            <Tag>How it works</Tag>
            <Title>Your AI, trained on your business</Title>
            <Description>
              WorkBuddy builds AI agents customized to your industry, your scripts, and your qualification criteria. Leads convert when AI feels human, not robotic.
            </Description>

            <InsightBox>
              <AnimatePresence mode="wait">
                <InsightText
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {insights[activeStep]}
                </InsightText>
              </AnimatePresence>
            </InsightBox>
          </LeftColumn>

          {/* CENTER COLUMN - Dynamic Visuals */}
          <CenterColumn>
             <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <VisualCard
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SettingCard>
                      <Label>Select voice persona</Label>
                      <VoicePlayer>
                        <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>Bella Professional, warm</div>
                          <Waveform>
                             {[...Array(12)].map((_, i) => (
                               <motion.div 
                                 key={i} 
                                 animate={{ height: [8, 16, 8] }} 
                                 transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                               />
                             ))}
                          </Waveform>
                        </div>
                        <PlayBtn>Listen</PlayBtn>
                      </VoicePlayer>
                    </SettingCard>

                    <SettingCard>
                      <Label>Select tone and personality</Label>
                      <TagGroup>
                        <OptionTag $active>Professional</OptionTag>
                        <OptionTag>Casual</OptionTag>
                        <OptionTag>Energetic</OptionTag>
                        <OptionTag $active>Helpful</OptionTag>
                        <OptionTag>Concise</OptionTag>
                      </TagGroup>
                    </SettingCard>

                    <SettingCard>
                      <Label>Customize your greeting</Label>
                      <div style={{ background: 'white', padding: 16, borderRadius: 12, fontSize: 14, fontStyle: 'italic', color: '#677888', border: '1px solid rgba(0,0,0,0.08)' }}>
                        "Hi, this is Sarah calling from [Company]. I'm following up on your inquiry—do you have a few minutes?"
                      </div>
                    </SettingCard>
                  </VisualCard>
                )}

                {activeStep === 1 && (
                  <VisualCard
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ConversationContainer>
                      <ConversationHeader>
                        <div className="status-dot" />
                        <span className="call-info">Incoming call • Answered in 0.3s</span>
                      </ConversationHeader>
                      
                      <Message $isUser={true}>
                        <div className="bubble">
                          Hi, I'm looking for a 2-bedroom apartment. Do you have anything available?
                        </div>
                      </Message>
                      
                      <Message>
                        <div className="bubble">
                          I'd be happy to help! I can see we have several 2-bedroom units available. What's your preferred move-in date?
                        </div>
                      </Message>
                      
                      <Message $isUser={true}>
                        <div className="bubble">
                          Ideally next month. Can I schedule a tour?
                        </div>
                      </Message>
                      
                      <TypingIndicator>
                        <div className="dots">
                          <div className="dot" />
                          <div className="dot" />
                          <div className="dot" />
                        </div>
                      </TypingIndicator>
                    </ConversationContainer>
                  </VisualCard>
                )}

                {activeStep === 2 && (
                  <VisualCard
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AdaptationContainer>
                      <BuildingsContainer>
                        {buildings.map((building, index) => (
                          <Building
                            key={index}
                            $height={building.height}
                            $isActive={activeBuildingIndex === index}
                            layout
                          />
                        ))}
                      </BuildingsContainer>
                      
                      <AnimatePresence mode="wait">
                        <DetailsCard
                          key={activeBuildingIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardHeader>
                            <h3>{buildings[activeBuildingIndex]?.name} Configuration</h3>
                            <span>Active</span>
                          </CardHeader>
                          
                          <InfoGrid>
                            <InfoItem>
                              <label>Tours</label>
                              <div>{buildings[activeBuildingIndex]?.details.tours}</div>
                            </InfoItem>
                            <InfoItem>
                              <label>Maintenance</label>
                              <div>{buildings[activeBuildingIndex]?.details.maintenance}</div>
                            </InfoItem>
                            <InfoItem>
                              <label>Pricing</label>
                              <div>{buildings[activeBuildingIndex]?.details.pricing}</div>
                            </InfoItem>
                            <InfoItem>
                              <label>Hours</label>
                              <div>{buildings[activeBuildingIndex]?.details.hours}</div>
                            </InfoItem>
                          </InfoGrid>
                        </DetailsCard>
                      </AnimatePresence>
                    </AdaptationContainer>
                  </VisualCard>
                )}
             </AnimatePresence>
          </CenterColumn>

          {/* RIGHT COLUMN - Navigation */}
          <RightColumn>
            <StepItem $isActive={activeStep === 0} onClick={() => window.scrollTo({ top: containerRef.current?.offsetTop, behavior: 'smooth' })}>
              <StepNumber><span>1</span> Adoption</StepNumber>
              <StepDesc>
                AI agents that leads actually want to talk to—with natural voices and zero latency.
              </StepDesc>
            </StepItem>

            <StepItem $isActive={activeStep === 1} onClick={() => window.scrollTo({ top: (containerRef.current?.offsetTop || 0) + window.innerHeight, behavior: 'smooth' })}>
              <StepNumber><span>2</span> Resolution</StepNumber>
              <StepDesc>
                Connects to your CRM, calendar, and lead sources. Books directly into your system.
              </StepDesc>
            </StepItem>

            <StepItem $isActive={activeStep === 2} onClick={() => window.scrollTo({ top: (containerRef.current?.offsetTop || 0) + (window.innerHeight * 2), behavior: 'smooth' })}>
              <StepNumber><span>3</span> Tailor</StepNumber>
              <StepDesc>
                Tailored to your scripts and sales process. Like cloning your best rep.
              </StepDesc>
            </StepItem>
          </RightColumn>
        </ContentGrid>
      </StickyContainer>
    </Section>
  );
};
