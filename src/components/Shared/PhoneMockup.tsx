import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiCreditCard, FiCheck, FiClock, FiMapPin, FiTruck } from 'react-icons/fi';
import { theme } from '../../styles/theme';

const PhoneContainer = styled(motion.div)`
  width: 300px;
  height: 600px;
  background: #000;
  border-radius: 48px;
  border: 8px solid #333;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 0 2px #1f1f1f,
    0 20px 50px -10px rgba(0,0,0,0.5);
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2c3e50 0%, #000000 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const DynamicIsland = styled.div`
  width: 100px;
  height: 28px;
  background: black;
  border-radius: 14px;
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Header = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
`;

const CallerInfo = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.brand.azure}, #64B5F6);
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
`;

const CallerName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const StatusText = styled(motion.div)`
  font-size: 15px;
  color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TranscriptArea = styled.div`
  margin-top: 40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TranscriptLine = styled(motion.p)<{ $isAI?: boolean }>`
  font-size: 17px;
  line-height: 1.4;
  color: ${props => props.$isAI ? '#fff' : 'rgba(255,255,255,0.9)'};
  margin: 0;
  font-weight: ${props => props.$isAI ? '500' : '400'};
  opacity: ${props => props.$isAI ? 1 : 0.8};
`;

const Notification = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: 16px;
  right: 16px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 16px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 20;
`;

const IconBox = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color || '#34C759'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
`;

const CallControls = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const ControlButton = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const ScenariosIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;
`;

const IndicatorDot = styled(motion.div)<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  opacity: ${props => props.$active ? 1 : 0.3};
`;

const SCENARIOS = [
  {
    customer: "Machine 7 took my quarters but didn't start.",
    ai: "I see the error on #7. Starting a refund to your card now.",
    notif: {
      title: "Refund Processed",
      subtitle: "$3.50 sent to customer",
      icon: <FiCheck />,
      color: "#34C759"
    }
  },
  {
    customer: "Is my comforter ready? Order #402.",
    ai: "Checking Curbside... Yes, it's ready for pickup.",
    notif: {
      title: "Order Status",
      subtitle: "Synced with Curbside POS",
      icon: <FiCheck />,
      color: "#007AFF"
    }
  },
  {
    customer: "Can I get a pickup tomorrow morning?",
    ai: "Sure. I have a slot at 9am. 15lbs minimum.",
    notif: {
      title: "Pickup Scheduled",
      subtitle: "Route updated for tomorrow",
      icon: <FiTruck />,
      color: "#FF9500"
    }
  },
  {
    customer: "How late are you open tonight?",
    ai: "We close at 10pm. Last wash is at 8:30pm.",
    notif: {
      title: "Info Sent",
      subtitle: "Hours & Directions via SMS",
      icon: <FiMapPin />,
      color: "#AF52DE"
    }
  }
];

export const PhoneMockup = () => {
  const [step, setStep] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      while(true) {
        // Reset
        setStep(0); // Incoming
        await new Promise(r => setTimeout(r, 2000));
        
        setStep(1); // Answered/Listening
        await new Promise(r => setTimeout(r, 1000));
        
        setStep(2); // Customer speaks
        await new Promise(r => setTimeout(r, 2500));
        
        setStep(3); // AI Processing/Speaking
        await new Promise(r => setTimeout(r, 3000));
        
        setStep(4); // Action Notification
        await new Promise(r => setTimeout(r, 4000));
        
        // Next scenario
        setStep(-1); // Transition state
        await new Promise(r => setTimeout(r, 500));
        setScenarioIndex(prev => (prev + 1) % SCENARIOS.length);
      }
    };
    sequence();
  }, []);

  const currentScenario = SCENARIOS[scenarioIndex];

  return (
    <PhoneContainer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <DynamicIsland />
      <Screen>
        <Header>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 18, height: 12, borderRadius: 2, border: '1px solid rgba(255,255,255,0.4)' }} />
          </div>
        </Header>

        <AnimatePresence mode="wait">
          {step >= 0 && (
            <motion.div
              key={scenarioIndex} // Re-render on scenario change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CallerInfo>
                <Avatar>WB</Avatar>
                <CallerName>WorkBuddy</CallerName>
                <StatusText
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {step === 0 ? "WorkBuddy is answering..." : "Call in progress"}
                </StatusText>
              </CallerInfo>

              <TranscriptArea>
                {step >= 2 && (
                  <TranscriptLine
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    "{currentScenario.customer}"
                  </TranscriptLine>
                )}
                {step >= 3 && (
                  <TranscriptLine
                    $isAI
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span style={{ color: theme.colors.brand.azure }}>WorkBuddy:</span> "{currentScenario.ai}"
                  </TranscriptLine>
                )}
              </TranscriptArea>

              <div style={{ marginTop: 'auto' }}>
                <ScenariosIndicator>
                  {SCENARIOS.map((_, i) => (
                    <IndicatorDot 
                      key={i} 
                      $active={i === scenarioIndex}
                      animate={{ scale: i === scenarioIndex ? 1.2 : 1 }} 
                    />
                  ))}
                </ScenariosIndicator>
                
                <CallControls>
                  {/* Visual only controls */}
                  <div style={{ display: 'flex', gap: 40, width: '100%', justifyContent: 'center' }}>
                    <ControlButton $color="rgba(255,255,255,0.2)">
                        <span style={{ fontSize: 12, fontWeight: 600 }}>Audio</span>
                    </ControlButton>
                    <ControlButton $color="#FF3B30">
                        <FiPhone style={{ transform: 'rotate(135deg)' }} />
                    </ControlButton>
                  </div>
                </CallControls>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <Notification
              key={`notif-${scenarioIndex}`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <IconBox $color={currentScenario.notif.color}>
                {currentScenario.notif.icon}
              </IconBox>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{currentScenario.notif.title}</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{currentScenario.notif.subtitle}</div>
              </div>
            </Notification>
          )}
        </AnimatePresence>

      </Screen>
    </PhoneContainer>
  );
};
