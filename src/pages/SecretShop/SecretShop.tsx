import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { MainNavbar } from '../../components/Header/MainNavbar';
import { SEO } from '../../components/SEO/SEO';
import { Button } from '../../components/Button/Button';
import { supabase } from '../../lib/supabase';
import { FiLayout, FiVideo, FiDollarSign, FiCheck, FiLoader, FiChevronDown } from 'react-icons/fi';
import logo from '../../assets/logo.png';

// -----------------------------------------------------------------------------
// Shared Layouts & Animations (from AppleHomepage)
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
  pointer-events: none;
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

/* Unused styled component removed */

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 24px;
    background: rgba(255, 255, 255, 0.85); // More opaque on mobile for readability
    border-radius: 20px;
  }
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
// The "Request Station" Form Component
// -----------------------------------------------------------------------------

const FormInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid ${props => props.$error ? '#FF3B30' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  font-size: 16px;
  color: ${theme.colors.text.primary};
  transition: all 0.2s ease;
  font-family: ${theme.typography.fontFamily.body};

  &:focus {
    outline: none;
    background: white;
    border-color: ${props => props.$error ? '#FF3B30' : theme.colors.brand.azure};
    box-shadow: ${props => props.$error ? '0 0 0 4px rgba(255, 59, 48, 0.1)' : `0 0 0 4px ${theme.colors.brand.azure}10`};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px; // Prevent zoom on iOS
    padding: 14px;
  }
`;

// Custom Select Component
const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.button<{ $isOpen: boolean; $error?: boolean; $hasValue: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${props => props.$isOpen ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  border: 1px solid ${props => props.$error ? '#FF3B30' : props.$isOpen ? theme.colors.brand.azure : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  font-size: 16px;
  color: ${props => props.$hasValue ? theme.colors.text.primary : theme.colors.neutral.gray400}; // Placeholder color logic
  text-align: left;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily.body};
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.$isOpen 
    ? `0 0 0 4px ${theme.colors.brand.azure}10` 
    : props.$error 
      ? '0 0 0 4px rgba(255, 59, 48, 0.1)' 
      : 'none'};

  /* Remove default webkit tap highlight which appears on mobile */
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
    border-radius: 12px;
    box-shadow: 0 0 0 4px ${theme.colors.brand.azure}10;
  }

  &:active {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
    padding: 14px;
  }
`;

const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  padding: 8px;
  z-index: 50;
  list-style: none;
  max-height: 320px;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 3px;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  margin-top: 12px;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled(motion.div)<{ $checked: boolean; $error?: boolean }>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  background: ${props => props.$checked ? theme.colors.brand.azure : 'rgba(255, 255, 255, 0.5)'};
  border: 1px solid ${props => props.$error ? '#FF3B30' : props.$checked ? theme.colors.brand.azure : 'rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 2px;

  ${CheckboxWrapper}:hover & {
    border-color: ${theme.colors.brand.azure};
  }
`;

const LegalText = styled.div`
  font-size: 11px;
  line-height: 1.5;
  color: ${theme.colors.text.tertiary};
  
  a {
    color: ${theme.colors.text.secondary};
    text-decoration: underline;
    text-decoration-color: ${theme.colors.text.tertiary};
    &:hover {
      color: ${theme.colors.brand.azure};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 9px;
    line-height: 1.4;
  }
`;

const OptionItem = styled.li<{ $isSelected: boolean }>`
  padding: 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  color: ${props => props.$isSelected ? theme.colors.brand.azure : theme.colors.text.primary};
  background: ${props => props.$isSelected ? `${theme.colors.brand.azure}10` : 'transparent'};
  font-weight: ${props => props.$isSelected ? 500 : 400};
  transition: all 0.1s ease;

  &:hover {
    background: ${props => props.$isSelected ? `${theme.colors.brand.azure}15` : 'rgba(0,0,0,0.03)'};
    border-radius: 8px; /* Ensure hover state is rounded */
  }
`;

/* Removed unused label prop */
interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, error, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        $isOpen={isOpen}
        $error={error}
        $hasValue={!!value}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FiChevronDown size={18} color={theme.colors.neutral.tertiary} />
        </motion.div>
      </SelectTrigger>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {label && (
              <li style={{ 
                padding: '8px 12px', 
                fontSize: 11, 
                fontWeight: 600, 
                color: theme.colors.text.tertiary, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                pointerEvents: 'none'
              }}>
                {label}
              </li>
            )}
            {options.map(option => (
              <OptionItem 
                key={option} 
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                $isSelected={value === option}
              >
                {option}
              </OptionItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
};

const RequestStation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website_url: '',
    industry: '',
    industry_other: '',
    monthly_lead_volume: '',
    sms_consent: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

  const isFormValid = formData.name && 
    formData.email && 
    formData.phone && 
    formData.website_url && 
    formData.industry && 
    (formData.industry !== 'Other' || formData.industry_other) &&
    formData.monthly_lead_volume &&
    formData.sms_consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedToSubmit(true);
    
    if (!isFormValid) {
        return;
    }

    setStatus('submitting');
    
    try {
      // isFormValid already checked above, but keep assertion for TS safety if needed or redundant check
      if (!isFormValid) throw new Error('Please fill all fields');
      
      // Submit to 'workbuddy_leads' table
      const { error } = await supabase.from('workbuddy_leads').insert([{ 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website_url: formData.website_url,
        industry: formData.industry === 'Other' ? `Other: ${formData.industry_other}` : formData.industry,
        monthly_lead_volume: formData.monthly_lead_volume,
        sms_consent: formData.sms_consent,
        status: 'queued'
      }]);
      
      if (error) throw error;
      
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error submitting form');
    }
  };

  if (status === 'success') {
    return (
      <GlassCard 
        layout
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 400 }}
      >
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 
          }}
          style={{ 
            width: 80, 
            height: 80, 
            background: 'linear-gradient(135deg, #34C759 0%, #30B753 100%)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: 32, 
            color: 'white',
            boxShadow: '0 10px 30px rgba(52, 199, 89, 0.3)'
          }}
        >
          <FiCheck size={40} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ 
            fontSize: 28, 
            fontWeight: 600, 
            marginBottom: 16, 
            fontFamily: theme.typography.fontFamily.heading,
            color: theme.colors.brand.slate,
            letterSpacing: '-0.02em'
          }}>
            Audit In Progress
          </h3>
          <p style={{ 
            color: theme.colors.text.secondary, 
            maxWidth: 320, 
            lineHeight: 1.6, 
            fontSize: 16,
            margin: '0 auto' 
          }}>
            Your request has been queued. We'll start the investigation and send your video breakdown within 48 hours.
          </p>
        </motion.div>
      </GlassCard>
    );
  }

  return (
    <GlassCard id="audit-form" layout transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 24, fontWeight: 500, fontFamily: theme.typography.fontFamily.heading, marginBottom: 8 }}>Request Access</h3>
        <p style={{ fontSize: 14, color: theme.colors.text.secondary }}>Limited daily slots available.</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <style>{`
          @media (max-width: 768px) {
            .mobile-stack {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
        `}</style>
        <FormInput 
          placeholder="Full Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          $error={hasTriedToSubmit && !formData.name}
        />
        <FormInput 
          placeholder="Work Email" 
          type="email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          $error={hasTriedToSubmit && !formData.email}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="mobile-stack">
          <FormInput 
            placeholder="Phone" 
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            $error={hasTriedToSubmit && !formData.phone}
          />
          <FormInput 
            placeholder="Website URL" 
            type="text"
            value={formData.website_url}
            onChange={e => setFormData({...formData, website_url: e.target.value})}
            $error={hasTriedToSubmit && !formData.website_url}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="mobile-stack">
          <CustomSelect
            label="Industry"
            placeholder="Select Industry"
            value={formData.industry}
            options={[
              "Real Estate",
              "Property Management",
              "Solar",
              "Home Services",
              "Other"
            ]}
            onChange={value => setFormData({...formData, industry: value, industry_other: value !== 'Other' ? '' : formData.industry_other})}
            error={hasTriedToSubmit && !formData.industry}
          />
          {formData.industry === 'Other' && (
            <div style={{ gridColumn: '1 / -1' }}>
              <FormInput
                placeholder="Please specify industry"
                value={formData.industry_other}
                onChange={e => setFormData({...formData, industry_other: e.target.value})}
                $error={hasTriedToSubmit && !formData.industry_other}
              />
            </div>
          )}
          <CustomSelect
            label="Monthly Lead Volume"
            placeholder="Monthly Leads"
            value={formData.monthly_lead_volume}
            options={[
              "Under 10",
              "10-50",
              "50-100",
              "100+"
            ]}
            onChange={value => setFormData({...formData, monthly_lead_volume: value})}
            error={hasTriedToSubmit && !formData.monthly_lead_volume}
          />
        </div>

        <CheckboxWrapper>
          <HiddenCheckbox 
            type="checkbox"
            checked={formData.sms_consent}
            onChange={e => setFormData({...formData, sms_consent: e.target.checked})}
          />
          <StyledCheckbox $checked={formData.sms_consent} $error={hasTriedToSubmit && !formData.sms_consent}>
            {formData.sms_consent && <FiCheck size={14} color="white" strokeWidth={3} />}
          </StyledCheckbox>
          <LegalText>
            By checking this box, you agree to receive SMS messages from Work Buddy regarding customer care. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. We do not share your information with third parties. View our <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms of Service</a>.
          </LegalText>
        </CheckboxWrapper>

        {status === 'error' && <p style={{ color: '#FF3B30', fontSize: 13 }}>{errorMessage}</p>}
        {hasTriedToSubmit && !isFormValid && (
            <p style={{ color: '#FF3B30', fontSize: 13, textAlign: 'center', margin: 0 }}>
                Please complete all fields to continue.
            </p>
        )}

        <Button 
          type="submit" 
          style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? <FiLoader className="animate-spin" /> : 'Start Audit'}
        </Button>
      </form>
    </GlassCard>
  );
};

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

export const SecretShop: React.FC = () => {
  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <SEO
        title="Free Business Audit"
        description="Get a free secret shop audit of your business. We'll call your business as a lead, grade your response, and show you exactly where you're losing money."
        canonical="/secret-shop"
      />
      <MainNavbar />
      
      {/* Continuous Aurora Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <AuroraBackground />
      </div>

      <Container style={{ paddingTop: 180, paddingBottom: 320 }} className="secret-shop-container">
        <ResponsiveGrid $gap={60} style={{ alignItems: 'start' }}>
          
          <style>{`
            @media (max-width: 768px) {
              .secret-shop-container {
                padding-top: 100px !important;
                padding-bottom: 120px !important;
              }
              .hero-headline {
                font-size: 48px !important;
                line-height: 1 !important;
              }
              .hero-description {
                font-size: 16px !important;
                line-height: 1.5 !important;
                margin-bottom: 24px !important;
              }
              .desktop-only { display: none !important; }
              .mobile-only { display: block !important; }
            }
            @media (min-width: 769px) {
              .mobile-only { display: none !important; }
            }
          `}</style>

          {/* Left Column: The Pitch (Sticky) */}
          <div style={{ position: 'sticky', top: 120 }} className="hero-column">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>Busted Business Series</Badge>
              <h1 className="hero-headline" style={{ 
                fontSize: 'clamp(40px, 5vw, 64px)', 
                fontWeight: 600, 
                lineHeight: 1.05, 
                letterSpacing: '-0.03em', 
                marginBottom: 24, 
                fontFamily: theme.typography.fontFamily.heading,
                color: theme.colors.brand.slate
              }}>
                Find your <br />
                <span style={{ color: theme.colors.brand.azure }}>million-dollar mistake.</span>
              </h1>
              <p className="hero-description" style={{ fontSize: 18, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: 40, maxWidth: 500 }}>
                Most businesses lose 40-60% of their leads before anyone picks up the phone. We'll secret shop your business and prove exactly where your funnel is leaking money.
              </p>
              
              {/* Feature Highlights (Mini Bento) */}
              <div className="desktop-only">
                <h4 style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.colors.text.tertiary, marginBottom: 20 }}>What You'll Receive</h4>
                <div style={{ display: 'grid', gap: 16 }}>
                  {[
                    { icon: FiLayout, text: "Custom Scorecard" },
                    { icon: FiVideo, text: "Video Walkthrough" },
                    { icon: FiDollarSign, text: "Revenue Leak Calculation" }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.5)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.brand.slate }}>
                        <item.icon />
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 500, color: theme.colors.brand.slate }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Request Station */}
          <motion.div 
            className="form-column"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RequestStation />
            <div className="mobile-only" style={{ marginTop: 40 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.colors.text.tertiary, marginBottom: 20 }}>What You'll Receive</h4>
                <div style={{ display: 'grid', gap: 16 }}>
                  {[
                    { icon: FiLayout, text: "Custom Scorecard" },
                    { icon: FiVideo, text: "Video Walkthrough" },
                    { icon: FiDollarSign, text: "Revenue Leak Calculation" }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.5)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.brand.slate }}>
                        <item.icon />
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 500, color: theme.colors.brand.slate }}>{item.text}</span>
                    </div>
                  ))}
                </div>
            </div>
          </motion.div>

        </ResponsiveGrid>
      </Container>

      <footer style={{ 
        padding: '40px 24px 60px', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 24,
          opacity: 0.6 
        }}>
          {/* Minimal Logo/Brand Mark */}
          <div style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            color: theme.colors.brand.slate, 
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <img src={logo} alt="WorkBuddy" style={{ height: 24, width: 'auto' }} />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: 24, 
            fontSize: 13, 
            color: theme.colors.text.tertiary 
          }}>
            <span>© {new Date().getFullYear()} WorkBuddy AI</span>
            <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
