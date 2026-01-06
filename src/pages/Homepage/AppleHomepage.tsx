import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { ArtOfAISection } from './sections/ArtOfAISection';
import logo from '../../assets/logo.png';
import { FiPlay, FiPause, FiCheckCircle, FiClock, FiActivity, FiX, FiMenu, FiPhoneIncoming, FiCalendar, FiUser, FiDatabase, FiSmartphone, FiCheck, FiMessageSquare, FiSend } from 'react-icons/fi';

// -----------------------------------------------------------------------------
// Shared Components
// -----------------------------------------------------------------------------

const Section = styled.section<{ $dark?: boolean; $bg?: string }>`
  position: relative;
  padding: 80px 0;
  background: ${props => props.$bg ? props.$bg : props.$dark ? theme.colors.bg.dark : theme.colors.bg.default};
  color: ${props => props.$dark ? theme.colors.text.inverse : theme.colors.text.primary};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.pagePadding};
  position: relative;
  z-index: 2;
`;

const ResponsiveGrid = styled.div<{ $gap?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.$gap || 80}px;
  }
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;


const Button = styled(motion.a)<{ $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.brand.slate};
          color: ${theme.colors.brand.white};
          &:hover { background: #243545; }
        `;
      case 'outline':
        return css`
          background: transparent;
          border: 1px solid ${theme.colors.brand.azure};
          color: ${theme.colors.brand.azure};
          &:hover { background: ${theme.colors.brand.azure}10; }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: inherit;
          padding: 8px 16px;
          &:hover { background: rgba(0,0,0,0.05); }
        `;
      default: // primary
        return css`
          background: ${theme.colors.brand.azure};
          color: ${theme.colors.brand.white};
          box-shadow: 0 4px 20px rgba(103, 183, 209, 0.4);
          &:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(103, 183, 209, 0.5);
          }
        `;
    }
  }}
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  background: ${theme.colors.brand.azure}15;
  color: ${theme.colors.brand.azure};
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
  border: 1px solid ${theme.colors.brand.azure}30;
`;

// -----------------------------------------------------------------------------
// Animations
// -----------------------------------------------------------------------------

const aurora = keyframes`
  0% { background-position: 50% 50%, 50% 50%; }
  50% { background-position: 100% 0%, 0% 100%; }
  100% { background-position: 50% 50%, 50% 50%; }
`;


const AuroraBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(103, 183, 209, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(220, 171, 88, 0.05) 0%, transparent 40%);
  filter: blur(60px);
  animation: ${aurora} 20s ease infinite;
  z-index: 0;
`;

// -----------------------------------------------------------------------------
// Live Activity Feed Component
// -----------------------------------------------------------------------------

const ActivityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  width: 320px;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 10;
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
`;

const LiveActivityFeed = () => {
  const [activities] = useState([
    { id: 1, type: 'call', text: 'Missed Call (After Hours)', sub: 'From: (617) 555-0123', icon: FiPhoneIncoming, color: '#FF5A5F' },
    { id: 2, type: 'ai', text: 'Outbound call in progress...', sub: 'Booking appointment', icon: FiActivity, color: theme.colors.brand.azure },
    { id: 3, type: 'success', text: 'Appointment Booked', sub: 'Added to calendar', icon: FiCalendar, color: '#34C759' },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: 320, height: 100 }}>
      <AnimatePresence mode="wait">
        <ActivityCard
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <ActivityIcon $color={activities[activeIndex].color}>
            {React.createElement(activities[activeIndex].icon)}
          </ActivityIcon>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: theme.colors.text.primary }}>{activities[activeIndex].text}</div>
            <div style={{ fontSize: 12, color: theme.colors.text.secondary }}>{activities[activeIndex].sub}</div>
          </div>
        </ActivityCard>
      </AnimatePresence>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Audio Player Component
// -----------------------------------------------------------------------------

const AudioPlayerWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 24px;
  box-shadow: ${theme.shadows.medium};
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
`;

const PlayButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.brand.azure};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 10px 20px rgba(103, 183, 209, 0.4);

  &:hover {
    transform: scale(1.05);
  }

  @keyframes pulse {
    0% { box-shadow: 0 10px 20px rgba(103, 183, 209, 0.4); }
    50% { box-shadow: 0 15px 30px rgba(103, 183, 209, 0.8); }
    100% { box-shadow: 0 10px 20px rgba(103, 183, 209, 0.4); }
  }
`;

const Waveform = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

const Bar = styled(motion.div)<{ $height: number }>`
  width: 3px;
  background: ${theme.colors.brand.slate};
  border-radius: 2px;
  height: ${props => props.$height}%;
`;

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayPending, setAutoplayPending] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const audioUrl = "https://setzoqzlfaxvngoswxkl.supabase.co/storage/v1/object/sign/call-recordings/f1f62abb-5cb8-4dfb-abf3-d280694182c6/2025/12/v3:sHpB-JbdE7NbrHkQwWoFRu1FoEGEsv94_7Mr0JCARraVipY-AByaAA.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZGYxNjUwOC0wZjA0LTQzNWUtOGJhYS00MmJlYTc0YTQ5OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWxsLXJlY29yZGluZ3MvZjFmNjJhYmItNWNiOC00ZGZiLWFiZjMtZDI4MDY5NDE4MmM2LzIwMjUvMTIvdjM6c0hwQi1KYmRFN05ickhrUXdXb0ZSdTFGb0VHRXN2OTRfN01yMEpDQVJyYVZpcFktQUJ5YUFBLm1wNCIsImlhdCI6MTc2NDk1NTE0NCwiZXhwIjoxNzk2NDkxMTQ0fQ.s97KXmiEQvUQYFLOEsxAmKCTehmThILkUw87vtPdRbE";

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAutoplayPending(false);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Audio failed to load or play');
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Check for autoplay URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const shouldAutoplay = urlParams.get('autoplay') === 'true';
    
    if (shouldAutoplay) {
      // Try autoplay, but handle browser restrictions gracefully
      setAutoplayPending(true);
      
      const attemptAutoplay = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          setAutoplayPending(false);
        }).catch(() => {
          // Browser blocked autoplay - this is expected behavior
          console.log('Autoplay blocked by browser policy. Click play button to start.');
        });
      };

      // Try after a short delay to ensure audio is loaded
      setTimeout(attemptAutoplay, 1000);
    }

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <AudioPlayerWrapper>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <PlayButton onClick={toggleAudio} style={{ 
        animation: autoplayPending && !isPlaying ? 'pulse 2s infinite' : 'none'
      }}>
        {isPlaying ? <FiPause /> : <FiPlay style={{ marginLeft: 4 }} />}
      </PlayButton>
      <div style={{ flex: 1, width: '100%' }}>
        <div style={{ 
          fontSize: 11, 
          fontWeight: 700, 
          color: theme.colors.brand.slate, 
          textTransform: 'uppercase', 
          marginBottom: 6,
          letterSpacing: '0.05em' 
        }}>
          Hear the AI in Action
        </div>
        <Waveform>
          {[...Array(40)].map((_, i) => (
            <Bar
              key={i}
              $height={Math.random() * 60 + 20}
              animate={isPlaying ? { 
                height: [15, Math.random() * 100, 15],
                opacity: [0.5, 1, 0.5]
              } : { height: 20, opacity: 0.3 }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
            />
          ))}
        </Waveform>
      </div>
    </AudioPlayerWrapper>
  );
};

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: scrolled ? '16px 0' : '24px 0',
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      zIndex: 100,
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? `1px solid ${theme.colors.brand.slate}10` : 'none'
    }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="WorkBuddy" style={{ height: 40 }} />
        </a>

        <div style={{ display: 'none', gap: 32, alignItems: 'center' }} className="desktop-menu">
          {['Features', 'How it Works', 'Results'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} style={{ 
              color: theme.colors.text.secondary, 
              fontWeight: 500,
              fontSize: 15
            }}>
              {item}
            </a>
          ))}
          <Button 
            data-cal-link="caleb-benedict-4rrqhq/demo"
            data-cal-namespace="demo"
            data-cal-config='{"layout":"month_view"}'
            style={{ padding: '10px 20px' }}
          >
            Book Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div style={{ display: 'block' }} className="mobile-toggle">
          <Button $variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ padding: 8 }}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.colors.brand.slate}10`,
          padding: '24px 0',
          zIndex: 99
        }}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {['Features', 'How it Works', 'Results'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    color: theme.colors.text.secondary, 
                    fontWeight: 500,
                    fontSize: 18,
                    textDecoration: 'none',
                    padding: '12px 0'
                  }}
                >
                  {item}
                </a>
              ))}
              <Button 
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ padding: '12px 20px', marginTop: 8 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Button>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};

// -----------------------------------------------------------------------------
// Inbound Automation Section
// -----------------------------------------------------------------------------

const VisualContainer = styled.div`
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 968px) {
    min-height: 450px;
    margin-top: 40px;
  }
`;

const InboundAutomation = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { 
      title: "Outbound Calls", 
      desc: "AI that sounds human. Persistent follow-up until they book or say no."
    },
    { 
      title: "SMS Sequences", 
      desc: "Smart texts that feel personal, not spammy."
    },
    { 
      title: "Email Outreach", 
      desc: "Personalized emails that actually get replies."
    },
    { 
      title: "Inbound Handling", 
      desc: "Never miss a callback. We answer 24/7."
    }
  ];

  // Auto-advance every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeFeature]);

  return (
    <Section id="features" style={{ background: '#F0F4F8', color: theme.colors.text.primary }}>
       <Container>
         <ResponsiveGrid>
           {/* Left Content */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
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
               FILL YOUR CALENDAR
             </div>
             
             <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, fontFamily: theme.typography.fontFamily.heading }}>
               Outbound automation
             </h2>
             
             <p style={{ fontSize: 16, color: theme.colors.text.secondary, marginBottom: 32, lineHeight: 1.6, maxWidth: 480 }}>
               Our AI contacts every lead within minutes—by phone, text, and email—and books qualified appointments directly on your calendar.
             </p>

             <Button 
               data-cal-link="caleb-benedict-4rrqhq/demo"
               data-cal-namespace="demo"
               data-cal-config='{"layout":"month_view"}'
               style={{ 
                 background: theme.colors.brand.gold, 
                 color: 'white', 
                 marginBottom: 56, 
                 border: 'none', 
                 boxShadow: `0 8px 25px rgba(220, 171, 88, 0.4)`, 
                 fontSize: '13px', 
                 padding: '8px 16px', 
                 minHeight: '32px',
                 width: 'fit-content' // Ensure button doesn't stretch weirdly on mobile
               }}
             >
               Book a demo
             </Button>

             <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
               {features.map((feature, idx) => (
                 <div 
                    key={idx} 
                    style={{ 
                      cursor: 'pointer', 
                      padding: '24px 0', 
                      paddingLeft: '12px', // Add left padding for the dot
                      position: 'relative',
                      borderTop: idx === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                      opacity: activeFeature === idx ? 1 : 0.4,
                      transition: 'opacity 0.4s ease'
                    }}
                    onClick={() => setActiveFeature(idx)}
                 >
                   <h3 style={{ 
                     fontSize: 24, 
                     fontWeight: 500, 
                     color: theme.colors.brand.slate,
                     marginBottom: activeFeature === idx ? 12 : 0,
                     transition: 'all 0.3s ease',
                     lineHeight: 1.1,
                     letterSpacing: '-0.03em',
                     fontFamily: theme.typography.fontFamily.heading
                   }}>
                     {feature.title}
                   </h3>
                   <AnimatePresence>
                     {activeFeature === idx && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                       >
                         <p style={{ 
                           fontSize: 16, 
                           color: theme.colors.text.secondary, 
                           lineHeight: 1.6, 
                           margin: 0
                         }}>
                           {feature.desc}
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                   
                   {/* Subtle Active Indicator Dot instead of Bar - Adjusted for mobile */}
                   {activeFeature === idx && (
                     <motion.div
                        layoutId="activeDot"
                        style={{
                          position: 'absolute',
                          left: 0, // Align with left edge
                          top: 32,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: theme.colors.brand.slate,
                        }}
                     />
                   )}
                 </div>
               ))}
             </div>
           </motion.div>

           {/* Right Visual */}
           <VisualContainer>
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeFeature}
                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                 transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                 style={{
                   width: '100%',
                   height: '100%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   perspective: '1000px',
                   background: `linear-gradient(135deg, ${theme.colors.brand.slate} 0%, ${theme.colors.brand.black} 100%)`,
                   borderRadius: 24,
                   position: 'relative',
                   overflow: 'hidden',
                   boxShadow: '0 20px 40px rgba(50, 74, 95, 0.3)'
                 }}
               >
                  {/* Feature 0: Tour Scheduling - "The Conversation" */}
                  {activeFeature === 0 && (
                     <div style={{ position: 'relative', width: 320, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                         <motion.div 
                           initial={{ opacity: 0, y: 10, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           transition={{ delay: 0.2 }}
                           style={{ alignSelf: 'flex-end', background: '#007AFF', color: 'white', padding: '10px 16px', borderRadius: '16px 16px 4px 16px', fontSize: 14, maxWidth: '80%' }}
                         >
                           Hi, this is Sarah from [Company]. Do you have 15 minutes Thursday to discuss your project?
                         </motion.div>
                         <motion.div 
                           initial={{ opacity: 0, y: 10, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           transition={{ delay: 1.2 }}
                           style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '10px 16px', borderRadius: '16px 16px 16px 4px', fontSize: 14, maxWidth: '80%' }}
                         >
                           checking... Yes, I have 2pm available.
                         </motion.div>
                         <motion.div 
                           initial={{ opacity: 0, y: 10, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           transition={{ delay: 2.2 }}
                           style={{ alignSelf: 'flex-end', background: '#007AFF', color: 'white', padding: '10px 16px', borderRadius: '16px 16px 4px 16px', fontSize: 14, maxWidth: '80%' }}
                         >
                           Perfect, book it.
                         </motion.div>
                       </div>

                       {/* Action Result */}
                       <motion.div
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 3, type: "spring" }}
                         style={{
                           background: 'rgba(255,255,255,0.9)',
                           borderRadius: 16,
                           padding: 16,
                           display: 'flex',
                           alignItems: 'center',
                           gap: 16,
                           boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                           backdropFilter: 'blur(10px)'
                         }}
                       >
                         <div style={{ width: 48, height: 48, background: '#34C759', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                           <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase' }}>OCT</span>
                           <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>24</span>
                         </div>
                         <div>
                           <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>Tour Confirmed</div>
                           <div style={{ fontSize: 13, color: '#86868b' }}>2:00 PM • 1 Bedroom</div>
                         </div>
                         <div style={{ marginLeft: 'auto', width: 24, height: 24, background: '#34C759', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <FiCheck size={14} color="white" />
                         </div>
                       </motion.div>
                     </div>
                  )}

                  {/* Feature 1: Full Store Receptionist - "The Handoff" */}
                  {activeFeature === 1 && (
                    <div style={{ position: 'relative', width: 320, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                         <motion.div 
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.2 }}
                           style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '10px 16px', borderRadius: '16px 16px 16px 4px', fontSize: 14, maxWidth: '80%' }}
                         >
                           My kitchen sink is leaking everywhere!
                         </motion.div>
                         <motion.div 
                           initial={{ opacity: 0, x: 10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 1.2 }}
                           style={{ alignSelf: 'flex-end', background: '#34C759', color: 'white', padding: '10px 16px', borderRadius: '16px 16px 4px 16px', fontSize: 14, maxWidth: '80%' }}
                         >
                           I'm alerting the maintenance team immediately.
                         </motion.div>
                       </div>

                       {/* Action Visualization */}
                       <div style={{ position: 'relative', height: 60 }}>
                         <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: '100%' }}
                           transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
                           style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }}
                         />
                         
                         {/* Flying Packet */}
                         <motion.div
                           initial={{ left: 0, opacity: 0 }}
                           animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                           transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
                           style={{ 
                             position: 'absolute', top: '50%', marginTop: -6, 
                             width: 12, height: 12, background: '#34C759', borderRadius: '50%',
                             boxShadow: '0 0 10px #34C759' 
                           }}
                         />

                         <motion.div
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           transition={{ delay: 2.6 }}
                           style={{ 
                             position: 'absolute', right: 0, top: 0, bottom: 0,
                             background: 'rgba(255,255,255,0.9)', padding: '10px 16px', borderRadius: 12,
                             display: 'flex', alignItems: 'center', gap: 10,
                             boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                             backdropFilter: 'blur(10px)'
                           }}
                         >
                           <div style={{ width: 32, height: 32, background: '#FF9500', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                             <FiActivity size={16} />
                           </div>
                           <div>
                             <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f' }}>Mike (Maintenance)</div>
                             <div style={{ fontSize: 11, color: '#FF3B30', fontWeight: 600 }}>URGENT ALERT</div>
                           </div>
                         </motion.div>
                       </div>
                    </div>
                  )}

                  {/* Feature 2: Automated Reminders - The Time Travel Loop */}
                  {activeFeature === 2 && (
                    <div style={{ position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       {/* Central Calendar Card */}
                       <motion.div
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         style={{
                           width: 140,
                           height: 140,
                           background: 'white',
                           borderRadius: 24,
                           boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           justifyContent: 'center',
                           position: 'relative',
                           zIndex: 2
                         }}
                       >
                          <div style={{ fontSize: 13, color: '#FF3B30', fontWeight: 600, textTransform: 'uppercase' }}>Tomorrow</div>
                          <div style={{ fontSize: 42, fontWeight: 700, color: '#1d1d1f', lineHeight: 1 }}>2</div>
                          <div style={{ fontSize: 13, color: '#86868b', fontWeight: 500 }}>PM</div>

                          {/* Success Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2, type: 'spring' }}
                            style={{
                              position: 'absolute',
                              bottom: -10,
                              background: '#34C759',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 600,
                              boxShadow: '0 4px 10px rgba(52, 199, 89, 0.3)'
                            }}
                          >
                            Confirmed
                          </motion.div>
                       </motion.div>

                       {/* Orbiting Message */}
                       <svg style={{ position: 'absolute', width: 300, height: 300, overflow: 'visible' }}>
                          <motion.circle 
                            cx="150" cy="150" r="100" 
                            stroke="#E5E5EA" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeDasharray="10 10"
                          />
                          <motion.path
                             d="M 250 150 A 100 100 0 1 1 250 149" // Full circle path
                             fill="none"
                             stroke={theme.colors.brand.azure}
                             strokeWidth="4"
                             strokeLinecap="round"
                             initial={{ pathLength: 0, opacity: 0 }}
                             animate={{ pathLength: 1, opacity: 1 }}
                             transition={{ duration: 2, ease: "easeInOut" }}
                          />
                       </svg>

                       {/* Floating Icons on Orbit */}
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, ease: "easeInOut" }}
                         style={{ position: 'absolute', width: 200, height: 200 }}
                       >
                          <div style={{ 
                            position: 'absolute', top: -20, left: '50%', marginLeft: -20,
                            width: 40, height: 40, background: theme.colors.brand.azure, 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', boxShadow: '0 4px 12px rgba(0,122,255,0.3)'
                          }}>
                            <FiSend size={18} />
                          </div>
                       </motion.div>
                    </div>
                  )}

                  {/* Feature 3: Dropped Call SMS - "The Rescue" */}
                  {activeFeature === 3 && (
                    <div style={{ position: 'relative', width: 320, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                       {/* Background: The Dropped Call Screen */}
                       <motion.div
                         initial={{ opacity: 1, scale: 1 }}
                         animate={{ opacity: 0.2, scale: 0.95, filter: 'blur(4px)' }}
                         transition={{ delay: 1.5, duration: 0.5 }}
                         style={{ 
                           width: 240, height: 360, 
                           background: 'rgba(255, 59, 48, 0.1)', 
                           border: '1px solid rgba(255, 59, 48, 0.3)',
                           borderRadius: 32, 
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           position: 'absolute'
                         }}
                       >
                          <div style={{ fontSize: 48, color: '#FF3B30', marginBottom: 16 }}><FiPhoneIncoming /></div>
                          <div style={{ fontSize: 18, color: '#FF3B30', fontWeight: 600 }}>Call Failed</div>
                       </motion.div>

                       {/* The SMS Rescue */}
                       <motion.div 
                         initial={{ y: 50, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 1.8, type: "spring" }}
                         style={{ 
                           width: 300, 
                           background: 'rgba(255,255,255,0.9)', 
                           backdropFilter: 'blur(20px)',
                           borderRadius: 24, 
                           padding: 20,
                           boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                           zIndex: 10,
                           border: '1px solid rgba(255,255,255,0.5)'
                         }}
                       >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                             <div style={{ 
                               width: 36, height: 36, 
                               background: 'black', 
                               borderRadius: 10, 
                               display: 'flex', alignItems: 'center', justifyContent: 'center', 
                               color: 'white' 
                             }}>
                               <FiMessageSquare size={18}/>
                             </div>
                             <div>
                               <div style={{ fontWeight: 600, fontSize: 14, color: '#1d1d1f' }}>WorkBuddy AI</div>
                               <div style={{ fontSize: 12, color: '#86868b' }}>Just now</div>
                             </div>
                          </div>
                          <div style={{ fontSize: 15, lineHeight: 1.4, color: '#1d1d1f' }}>
                            Oops, we got disconnected! No worries, I can still help you book that tour. 
                            <br/><br/>
                            <strong>Reply Y to continue via text.</strong>
                          </div>
                       </motion.div>
                    </div>
                  )}
               </motion.div>
             </AnimatePresence>
           </VisualContainer>

         </ResponsiveGrid>
       </Container>
    </Section>
  );
};

// -----------------------------------------------------------------------------
// Relationship Management Section (Inbox)
// -----------------------------------------------------------------------------

const RelationshipManagement = () => {
  return (
    <Section id="how-it-works" style={{ background: '#F0F4F8', padding: '100px 0' }}>
      <Container>
        <div style={{ marginBottom: 50 }}>
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
            PIPELINE
          </div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 48px)', 
            fontWeight: 500, 
            color: theme.colors.brand.slate,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 800,
            fontFamily: theme.typography.fontFamily.heading
          }}>
            A better way to manage leads
          </h2>
        </div>

        <ThreeColumnGrid style={{ marginBottom: 100 }}>
          {/* Column 1 */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text.tertiary, marginBottom: 16 }}>1</div>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>See every touchpoint</h3>
            <p style={{ fontSize: 16, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 32 }}>
              Every call, text, and email in one view. Know exactly where each lead stands without digging through your CRM.
            </p>
            
            {/* Visual 1: Notification List */}
            <div style={{ 
              background: 'linear-gradient(180deg, #4A5D4F 0%, #2F3E32 100%)', // Mossy green gradient like image
              borderRadius: 16,
              padding: 24,
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              {[
                { icon: FiPhoneIncoming, text: "[Follow-up] Lead waiting on...", color: "#FF5A5F" },
                { icon: FiActivity, text: "[Call] Connected with prospect", color: "#67B7D1" },
                { icon: FiSmartphone, text: "Inbound SMS: When can we meet?", color: "#DCAB58" },
                { icon: FiUser, text: "Missed Call: New inquiry", opacity: 0.5 },
                { icon: FiCalendar, text: "Appointment: 2PM Today", opacity: 0.3 }
              ].map((item, i) => (
                <div key={i} style={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: 8, 
                  padding: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  opacity: item.opacity || 1
                }}>
                  <div style={{ opacity: 0.6 }}>{React.createElement(item.icon)}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: theme.colors.text.primary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text.tertiary, marginBottom: 16 }}>2</div>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>Never drop a lead</h3>
            <p style={{ fontSize: 16, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 32 }}>
              WorkBuddy automatically follows up until they book, buy, or tell us to stop. No lead falls through the cracks.
            </p>

            {/* Visual 2: Assignee Dropdown */}
            <div style={{ 
              background: 'linear-gradient(180deg, #C49A6C 0%, #8C6A45 100%)', // Gold/Brown gradient
              borderRadius: 16,
              padding: 24,
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ width: '100%', maxWidth: 280 }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  padding: '10px 16px', 
                  borderRadius: 8, 
                  color: 'white', 
                  fontSize: 13, 
                  fontWeight: 500, 
                  marginBottom: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  Select assignee <span>▼</span>
                </div>
                <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  {[
                    { name: "Sarah", role: "Sales Rep", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80" },
                    { name: "Mike", role: "Account Mgr", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&q=80" },
                    { name: "Jessica", role: "Team Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80" },
                    { name: "David", role: "Sales Rep", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80" }
                  ].map((p, i) => (
                    <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
                      <img src={p.img} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text.primary }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: theme.colors.text.tertiary }}>{p.role}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ position: 'absolute', marginTop: -20, marginLeft: 200, cursor: 'default' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M7 10l5 5 5-5z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text.tertiary, marginBottom: 16 }}>3</div>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>Complete visibility</h3>
            <p style={{ fontSize: 16, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 32 }}>
              Full transcripts, recordings, and outcomes in one dashboard. Your team always knows what happened.
            </p>

            {/* Visual 3: Player */}
            <div style={{ 
              background: 'linear-gradient(180deg, #2C3E50 0%, #1a252f 100%)', // Dark slate/blue
              borderRadius: 16,
              padding: 24,
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ background: 'white', borderRadius: 16, padding: 20, width: '100%' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, background: '#F0F4F8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiPhoneIncoming color={theme.colors.brand.slate} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.text.primary }}>Call with Lead</div>
                    <div style={{ fontSize: 12, color: theme.colors.text.tertiary }}>1 (555) 345-6789</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <FiPlay fill="black" size={20} />
                  <div style={{ flex: 1, height: 4, background: '#eee', borderRadius: 2 }}>
                    <div style={{ width: '30%', height: '100%', background: theme.colors.brand.slate, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 11, color: theme.colors.text.tertiary, fontFamily: 'monospace' }}>0:45 / 4:32</div>
                </div>

                <div style={{ fontSize: 12, fontWeight: 600, color: theme.colors.text.secondary, marginBottom: 8 }}>Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[100, 90, 95, 60].map((w, i) => (
                    <div key={i} style={{ height: 6, width: `${w}%`, background: '#F0F4F8', borderRadius: 3 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ThreeColumnGrid>

      </Container>
    </Section>
  );
};


// -----------------------------------------------------------------------------
// Page Sections
// -----------------------------------------------------------------------------

export const LandingPage: React.FC = () => {

  return (
    <>
      <Navbar />
      
      {/* REVOLUTIONARY HERO SECTION */}
      <Section style={{ 
        paddingTop: 100, 
        paddingBottom: 100, 
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #F0F4F8 100%)`
      }}>
        {/* Animated Aurora Background */}
        <AuroraBackground />
        
        {/* Subtle Gold Accent Glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${theme.colors.brand.gold}10 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <Container style={{ width: '100%', maxWidth: 1200 }}>
          <ResponsiveGrid $gap={60}>
            {/* Left: The Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{ 
                fontSize: 'clamp(44px, 5.5vw, 72px)', 
                fontWeight: 500, 
                color: theme.colors.brand.slate,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 18,
                fontFamily: theme.typography.fontFamily.heading
              }}>
                <span style={{ color: theme.colors.brand.azure }}>AI That Books Appointments</span> <br />
                For You
              </h1>

              <p style={{ 
                fontSize: '18px', 
                color: theme.colors.text.secondary, 
                marginBottom: 24, 
                lineHeight: 1.6,
                maxWidth: 540 
              }}>
                You pay for leads. We make sure they show up. WorkBuddy follows up by phone, text, and email—until they book or tell us to stop.
              </p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Button 
                  data-cal-link="caleb-benedict-4rrqhq/demo"
                  data-cal-namespace="demo"
                  data-cal-config='{"layout":"month_view"}'
                  style={{ 
                    padding: '18px 36px', 
                    fontSize: 18,
                    background: theme.colors.brand.gold,
                    border: 'none',
                    boxShadow: `0 8px 25px rgba(220, 171, 88, 0.4)`
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 12px 30px rgba(220, 171, 88, 0.6)`
                  }}
                >
                  Book a Demo
                </Button>
              </div>
            </motion.div>

            {/* Right: The Visualization */}
            <div style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Background Glow */}
              <div style={{
                position: 'absolute',
                width: 400,
                height: 400,
                background: `radial-gradient(circle, ${theme.colors.brand.azure}20 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0
              }} />

              {/* The "Phone" Container */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  width: 340,
                  height: 600,
                  background: 'white',
                  borderRadius: 40,
                  boxShadow: '0 40px 80px -20px rgba(50, 50, 93, 0.15), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
                  border: '8px solid white',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1
                }}
              >
                {/* Phone UI Header */}
                <div style={{ padding: '24px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Live Feed</div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34C759', boxShadow: '0 0 0 4px #34C75930' }} />
                </div>

                {/* Live Activity Stream inside Phone */}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', background: '#FAFAFA' }}>
                  <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Just Now</div>
                  
                  {/* Dynamic Stream Item */}
                  <LiveActivityFeed />
                  
                  {/* Static Past Items */}
                  <div style={{ opacity: 0.6, marginTop: 100 }}>
                    <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Earlier Today</div>
                    <div style={{ background: 'white', padding: 12, borderRadius: 12, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <div style={{ width: 32, height: 32, background: theme.colors.brand.gold, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><FiCheckCircle /></div>
                      <div style={{ fontSize: 13, color: '#555' }}><strong>Lease Signed</strong> via Appfolio</div>
                    </div>
                    <div style={{ background: 'white', padding: 12, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <div style={{ width: 32, height: 32, background: theme.colors.brand.slate, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><FiActivity /></div>
                      <div style={{ fontSize: 13, color: '#555' }}><strong>Maintenance</strong> ticket logged</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements (Parallax) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', right: -40, top: 100, zIndex: 2 }}
              >
                <div style={{ background: 'white', padding: 16, borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: `2px solid ${theme.colors.brand.gold}20` }}>
                  <div style={{ fontSize: 12, color: theme.colors.text.secondary, marginBottom: 4 }}>Appointments Today</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.brand.gold }}>14</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ position: 'absolute', left: -40, bottom: 150, zIndex: 2 }}
              >
                <div style={{ background: 'white', padding: 16, borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <Player />
                </div>
              </motion.div>
            </div>
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* PROBLEM AWARENESS (NEPQ Gap) */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <ResponsiveGrid $gap={64}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, fontFamily: theme.typography.fontFamily.heading }}>
                The hidden cost of <br />
                <span style={{ color: theme.colors.text.tertiary }}>"I'll follow up tomorrow."</span>
              </h2>
              <p style={{ fontSize: 18, color: theme.colors.text.secondary, marginBottom: 32, lineHeight: 1.6 }}>
                You already paid for the leads. But your team is too busy, too slow, or too small to follow up with everyone. By the time someone calls back, they've booked with your competitor.
              </p>
              
                  <div style={{ display: 'grid', gap: 24 }}>
                    {[
                      { icon: FiClock, title: "Only 27% of leads", desc: "ever get a follow-up call." },
                      { icon: FiActivity, title: "5 minute rule", desc: "Leads are 9x more likely to convert if answered in 5 mins." },
                      { icon: FiX, title: "First to respond", desc: "wins 78% of deals." }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16 }}>
                        <div style={{ 
                          width: 48, height: 48, 
                          background: theme.colors.brand.white, 
                          borderRadius: 12, 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: theme.colors.brand.gold,
                          boxShadow: theme.shadows.soft,
                          flexShrink: 0 // Prevent shrinking on mobile
                        }}>
                          <item.icon size={24} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 16, fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>{item.title}</h4>
                          <p style={{ fontSize: 15, color: theme.colors.text.secondary }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
            </motion.div>

            <motion.div
              style={{ position: 'relative' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Abstract Visual of Missed Opportunity */}
              <div style={{ 
                background: theme.colors.brand.white, 
                padding: 40, 
                borderRadius: 32, 
                boxShadow: theme.shadows.medium,
                border: `1px solid ${theme.colors.brand.slate}10`
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 16, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>Leads That Die in Your CRM</h3>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, paddingBottom: 24, borderBottom: `1px solid ${theme.colors.brand.slate}10` }}>
                  <div style={{ flex: 1, background: theme.colors.neutral.gray300, height: '40%', borderRadius: '8px 8px 0 0', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -30, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: theme.colors.text.tertiary }}>Contacted</div>
                  </div>
                  <div style={{ flex: 1, background: `linear-gradient(to top, ${theme.colors.brand.gold}, ${theme.colors.brand.gold}80)`, height: '85%', borderRadius: '8px 8px 0 0', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: -30, left: 0, right: 0, textAlign: 'center', fontWeight: 700, color: theme.colors.brand.gold }}>Never Called</div>
                  </div>
                </div>
                
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: theme.colors.text.secondary }}>Revenue Lost to Slow Follow-Up</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: theme.colors.brand.slate }}>$12,400<span style={{ fontSize: 14, color: theme.colors.text.tertiary }}>/mo</span></span>
                </div>
              </div>
            </motion.div>
          </ResponsiveGrid>
        </Container>
      </Section>

      <InboundAutomation />

      <RelationshipManagement />

      <CaseStudiesSection id="results" />

      <ArtOfAISection />


      {/* HOW IT WORKS (The Ramp) */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <Badge style={{ background: 'white', borderColor: 'rgba(0,0,0,0.05)' }}>The Deployment</Badge>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, fontFamily: theme.typography.fontFamily.heading }}>
              Complex technology. <br />
              <span style={{ color: theme.colors.brand.azure }}>Simple onboarding.</span>
            </h2>
            <p style={{ fontSize: 18, color: theme.colors.text.secondary, maxWidth: 600, margin: '0 auto' }}>
              Forget multi-month implementations. WorkBuddy is designed to plug into your existing operations in a single afternoon.
            </p>
          </div>

          <ThreeColumnGrid style={{ position: 'relative' }}>
            {[
              { 
                step: "01", 
                title: "Connect", 
                desc: "We sync with your CRM, calendar, and lead sources to pull contacts and availability.",
                icon: FiDatabase 
              },
              { 
                step: "02", 
                title: "Train", 
                desc: "Upload your scripts, FAQs, and qualification criteria. Our AI learns your business instantly.",
                icon: FiActivity 
              },
              { 
                step: "03", 
                title: "Deploy", 
                desc: "Turn it on. WorkBuddy starts contacting your leads within minutes.",
                icon: FiPhoneIncoming 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                style={{ 
                  background: 'white', 
                  borderRadius: 24, 
                  padding: 32, 
                  position: 'relative', 
                  zIndex: 1,
                  boxShadow: theme.shadows.soft,
                  border: '1px solid rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ 
                  width: 56, height: 56, 
                  background: theme.colors.brand.slate, 
                  borderRadius: 16, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  marginBottom: 20,
                  fontSize: 24,
                  boxShadow: '0 10px 20px rgba(50, 74, 95, 0.2)'
                }}>
                  {React.createElement(item.icon)}
                </div>
                
                <div style={{ 
                  position: 'absolute', 
                  top: 24, 
                  right: 24, 
                  fontSize: 64, 
                  fontWeight: 800, 
                  color: 'rgba(0,0,0,0.03)', 
                  lineHeight: 0.8 
                }}>
                  {item.step}
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 500, color: theme.colors.brand.slate, marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: theme.typography.fontFamily.heading }}>{item.title}</h3>
                <p style={{ fontSize: 16, color: theme.colors.text.secondary, lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </ThreeColumnGrid>
        </Container>
      </Section>

      {/* FAQ / OBJECTION HANDLING */}
      <Section style={{ background: '#F0F4F8' }}>
        <Container style={{ maxWidth: 800 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 32, fontFamily: theme.typography.fontFamily.heading }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
             {[
               { q: "Will leads know it's AI?", a: "Most don't. The voice quality and latency are so good that prospects often thank the 'person' they spoke with. We aim for human-level empathy." },
               { q: "How hard is it to set up?", a: "About 10 minutes. We connect to your CRM and calendar. No hardware, no code." },
               { q: "What if someone wants to talk to a human?", a: "You can train it on your specific policies. If it gets stumped, it can gracefully take a message or escalate urgent issues to your on-call staff." }
             ].map((item, i) => (
               <details key={i} style={{ 
                 background: theme.colors.brand.white, 
                 borderRadius: 16, 
                 padding: 24, 
                 cursor: 'pointer',
                 boxShadow: theme.shadows.soft
               }}>
                 <summary style={{ fontSize: 18, fontWeight: 600, color: theme.colors.brand.slate, outline: 'none' }}>{item.q}</summary>
                 <p style={{ marginTop: 16, color: theme.colors.text.secondary, lineHeight: 1.6 }}>{item.a}</p>
               </details>
             ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA (Commitment) */}
      <Section style={{ textAlign: 'center', padding: '100px 0' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, color: theme.colors.brand.slate, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, fontFamily: theme.typography.fontFamily.heading }}>
              Stop letting leads die <br /> in your CRM.
            </h2>
            <p style={{ fontSize: 20, color: theme.colors.text.secondary, marginBottom: 32, maxWidth: 600, margin: '0 auto 48px' }}>
              Join the businesses that automated follow-up and filled their calendars.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <Button 
                data-cal-link="caleb-benedict-4rrqhq/demo"
                data-cal-namespace="demo"
                data-cal-config='{"layout":"month_view"}'
                style={{ padding: '20px 48px', fontSize: 20 }}
              >
                Book Your Demo
              </Button>
              <p style={{ fontSize: 14, color: theme.colors.text.tertiary }}>
                No credit card required. Setup takes 10 minutes.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer style={{ background: theme.colors.brand.slate, padding: '80px 0 40px', color: 'rgba(255,255,255,0.6)' }}>
        <Container>
          <ResponsiveGrid style={{ marginBottom: 80, alignItems: 'start' }}>
            <div>
              <img src={logo} alt="WorkBuddy" style={{ height: 40, marginBottom: 16 }} />
              <p style={{ maxWidth: 300, lineHeight: 1.6 }}>
                AI that books appointments for you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Navigation</span>
                <a 
                  href="#features" 
                  style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer' 
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer' 
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  How it Works
                </a>
                <a 
                  href="#results" 
                  style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer' 
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = 'white'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >
                  Results
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Get Started</span>
                <Button 
                  data-cal-link="caleb-benedict-4rrqhq/demo"
                  data-cal-namespace="demo"
                  data-cal-config='{"layout":"month_view"}'
                  style={{ 
                    padding: '12px 24px', 
                    fontSize: 14,
                    background: theme.colors.brand.azure,
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    width: 'fit-content'
                  }}
                >
                  Book Demo
                </Button>
              </div>
            </div>
          </ResponsiveGrid>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40, textAlign: 'center', fontSize: 14 }}>
            © {new Date().getFullYear()} WorkBuddy AI. All rights reserved.
          </div>
        </Container>
      </footer>
    </>
  );
};
