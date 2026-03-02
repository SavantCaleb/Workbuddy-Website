import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { QUALIFYING_OPTIONS } from '../constants';
import { useGooglePlacesAutocomplete } from '../hooks/useGooglePlacesAutocomplete';
import { ClientScrollStrip } from './ClientScrollStrip';

// --- Keyframes ---
const pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

// --- Styled Components ---

const HeroSectionWrapper = styled.section`
  padding: 80px 20px 48px;
  background: linear-gradient(180deg, ${theme.colors.surface.primary} 0%, white 100%);

  @media (min-width: 640px) {
    padding: 112px 32px 64px;
  }

  @media (min-width: 900px) {
    padding: 128px 40px 80px;
  }
`;

/*
 * Mobile: flex column with order-based reordering (text → form → audio).
 * Desktop (>=900px): 2-column grid with explicit grid placement.
 */
const HeroInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: stretch;

  @media (min-width: 640px) {
    gap: 40px;
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: auto 1fr;
    gap: 44px 64px;
    align-items: start;
  }
`;

/* Badge + Headline + Subhead — always first */
const HeroContent = styled.div`
  order: 1;

  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 1;
    order: unset;
  }
`;

/* Form — fourth on mobile (after scroll strip), right column on desktop */
const FormColumn = styled.div`
  order: 4;

  @media (min-width: 900px) {
    grid-column: 2;
    grid-row: 1 / 3;
    order: unset;
  }
`;

/* Audio player — second on mobile, below text on desktop */
const AudioColumn = styled.div`
  order: 2;

  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 2;
    order: unset;
  }
`;

/* Client scroll strip — mobile only, between audio and form */
const MobileScrollStripSlot = styled.div`
  order: 3;
  margin: 0 -20px;

  @media (min-width: 640px) {
    margin: 0 -32px;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

/* Guarantee — fifth on mobile (below form), below audio on desktop */
const GuaranteeColumn = styled.div`
  order: 5;

  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 3;
    order: unset;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    font-size: 13px;
    margin-bottom: 24px;
  }
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${theme.colors.brand.azure};
  border-radius: 50%;
  animation: ${pulseDot} 2s infinite;
  display: inline-block;
`;

const HeroHeadline = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 36px;
  line-height: 1.05;
  color: ${theme.colors.brand.slate};
  margin-bottom: 16px;
  letter-spacing: -1px;

  @media (min-width: 480px) {
    font-size: 44px;
    letter-spacing: -1.5px;
    margin-bottom: 22px;
  }

  @media (min-width: 900px) {
    font-size: clamp(48px, 5vw, 60px);
    margin-bottom: 28px;
    letter-spacing: -2px;
  }
`;

const HeroSub = styled.p`
  font-size: 17px;
  line-height: 1.5;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0;
  max-width: 500px;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 19px;
    line-height: 1.5;
  }
`;

const HeroSubCloser = styled.p`
  font-size: 17px;
  line-height: 1.5;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  margin-top: 10px;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 19px;
  }
`;

// Audio Demo Player
const DemoPlayer = styled.div`
  background: ${theme.colors.brand.slate};
  border-radius: 14px;
  padding: 22px 20px;

  @media (min-width: 640px) {
    border-radius: 20px;
    padding: 36px 32px;
  }
`;

const DemoHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;

  @media (min-width: 640px) {
    margin-bottom: 8px;
  }
`;

const DemoTitle = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const DemoTimestamp = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: -0.1px;
  font-variant-numeric: tabular-nums;
`;

const DemoMeta = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 16px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    margin-bottom: 22px;
  }
`;

const DemoAside = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 14px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 13px;
    margin-top: 24px;
  }
`;

const DemoPlayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (min-width: 640px) {
    gap: 16px;
  }
`;

const DemoPlayBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.2s;
  flex-shrink: 0;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 0.22);
  }

  @media (min-width: 640px) {
    width: 52px;
    height: 52px;
  }
`;

const PlayIcon = styled.svg<{ $visible: boolean }>`
  position: absolute;
  fill: white;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.6)'};
  transition: opacity 0.15s ease, transform 0.15s ease;
  margin-left: 2px;

  @media (min-width: 640px) {
    margin-left: 3px;
  }
`;

const PauseIcon = styled.svg<{ $visible: boolean }>`
  position: absolute;
  fill: white;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.6)'};
  transition: opacity 0.15s ease, transform 0.15s ease;
`;

const DemoWaveform = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2.5px;
  height: 40px;
  min-width: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (min-width: 640px) {
    gap: 3px;
    height: 44px;
  }
`;

const DemoBar = styled.div<{ $height: number; $played?: boolean }>`
  flex: 1;
  background: ${props => props.$played ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.12)'};
  border-radius: 99px;
  min-width: 2px;
  height: ${props => props.$height}%;
  transition: background 0.3s ease;

  @media (min-width: 640px) {
    min-width: 3px;
  }
`;

const DemoTime = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  min-width: 72px;
  text-align: right;
  letter-spacing: 0.2px;
`;

const DemoTranscript = styled.div`
  margin-top: 16px;
  padding-top: 0;
`;

const TranscriptToggle = styled.button<{ $open: boolean }>`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  font-weight: 400;
  font-family: ${theme.typography.fontFamily.body};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: rgba(255, 255, 255, 0.4);
  }

  svg {
    transition: transform 0.2s;
    transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0)'};
    width: 12px;
    height: 12px;
  }
`;

const TranscriptBody = styled.div<{ $open: boolean }>`
  display: ${props => props.$open ? 'block' : 'none'};
  margin-top: 14px;
`;

const TranscriptLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.5;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const TranscriptSpeaker = styled.span<{ $type: 'ai' | 'caller' }>`
  font-weight: 600;
  flex-shrink: 0;
  font-size: 12px;
  color: ${props => props.$type === 'ai' ? theme.colors.brand.azure : theme.colors.brand.gold};

  @media (min-width: 480px) {
    min-width: 70px;
    font-size: 13px;
  }
`;

const TranscriptText = styled.span`
  color: ${theme.colors.neutral.gray300};
`;

const DemoResult = styled.div`
  margin-top: 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`;

const TranscriptCollapseRow = styled.div`
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

// Form Card
const FormCard = styled.div`
  background: white;
  border: 1px solid ${theme.colors.neutral.gray200};
  border-radius: 14px;
  padding: 24px 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  @media (min-width: 640px) {
    border-radius: 20px;
    padding: 36px 32px;
  }
`;

const FormHeadline = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-weight: 600;
  font-size: 17px;
  color: ${theme.colors.brand.slate};
  margin-bottom: 4px;
  line-height: 1.35;
  letter-spacing: -0.2px;

  @media (min-width: 640px) {
    font-size: 19px;
  }
`;

const FormSub = styled.p`
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: 22px;
  line-height: 1.45;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    margin-bottom: 28px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 14px;
  position: relative;

  @media (min-width: 640px) {
    margin-bottom: 18px;
  }
`;

const AutocompleteDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-top: none;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  z-index: 10000;
  max-height: 260px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
`;

const AutocompleteItem = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  border-top: 1px solid ${theme.colors.neutral.gray200};
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:first-child {
    border-top: none;
  }

  &:hover {
    background: ${theme.colors.surface.primary};
  }
`;

const AutocompleteMainText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
`;

const AutocompleteSecondaryText = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  margin-top: 2px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${theme.typography.fontFamily.body};
  color: ${theme.colors.text.primary};
  transition: border-color 0.2s, box-shadow 0.2s;
  background: ${theme.colors.surface.primary};
  min-height: 48px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.azure};
    box-shadow: 0 0 0 3px rgba(103, 183, 209, 0.15);
    background: white;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${theme.typography.fontFamily.body};
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface.primary};
  min-height: 48px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  /* Hide on mobile — replaced by custom dropdown */
  @media (max-width: 767px) {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.azure};
    box-shadow: 0 0 0 3px rgba(103, 183, 209, 0.15);
  }
`;

const CustomSelectTrigger = styled.div<{ $open: boolean; $hasValue: boolean }>`
  display: none;
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${props => props.$open ? theme.colors.brand.azure : theme.colors.neutral.gray200};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${theme.typography.fontFamily.body};
  color: ${props => props.$hasValue ? theme.colors.text.primary : theme.colors.neutral.gray400};
  background: ${props => props.$open ? 'white' : theme.colors.surface.primary};
  min-height: 48px;
  cursor: pointer;
  position: relative;
  box-shadow: ${props => props.$open ? `0 0 0 3px rgba(103, 183, 209, 0.15)` : 'none'};
  transition: border-color 0.2s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;

  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%) ${props => props.$open ? 'rotate(180deg)' : 'rotate(0)'};
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    transition: transform 0.2s;
  }

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
  }
`;

const CustomSelectDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  z-index: 10000;
  overflow: hidden;
`;

const CustomSelectOption = styled.div<{ $selected: boolean }>`
  padding: 16px 18px;
  font-size: 18px;
  font-family: ${theme.typography.fontFamily.body};
  color: ${props => props.$selected ? theme.colors.brand.azure : theme.colors.text.primary};
  font-weight: ${props => props.$selected ? 500 : 400};
  cursor: pointer;
  min-height: 56px;
  display: flex;
  align-items: center;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: ${theme.colors.surface.primary};
  }

  & + & {
    border-top: 1px solid ${theme.colors.neutral.gray200};
  }
`;

const FormSubmit = styled.button`
  width: 100%;
  padding: 14px;
  background: #E8742A;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  font-family: ${theme.typography.fontFamily.body};
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 4px;
  box-shadow: 0 4px 15px rgba(232, 116, 42, 0.3);
  min-height: 48px;

  &:hover {
    background: #D4681F;
    box-shadow: 0 6px 20px rgba(232, 116, 42, 0.4);
  }

  &:active {
    transform: scale(0.985);
  }
`;

const FormPriceAnchor = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  margin-top: 14px;
  line-height: 1.5;
`;

const FormFine = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.neutral.gray400};
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FormUrgency = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.brand.azure};
  font-weight: 600;
  margin-top: 8px;
`;

const FormFinePrint = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  margin-top: 14px;
  line-height: 1.5;
  letter-spacing: -0.1px;
`;

const GuaranteeBox = styled.div`
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid ${theme.colors.neutral.gray200};
  display: flex;
  gap: 10px;
  align-items: flex-start;

  @media (min-width: 640px) {
    margin-top: 24px;
    padding-top: 22px;
    gap: 12px;
  }
`;

const GuaranteeIcon = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.gray400};
  margin-top: 1px;
`;

const GuaranteeTitle = styled.div`
  font-family: ${theme.typography.fontFamily.body};
  font-weight: 600;
  font-size: 13px;
  color: ${theme.colors.text.primary};
  margin-bottom: 2px;
  letter-spacing: -0.1px;
`;

const GuaranteeText = styled.div`
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  line-height: 1.45;
  letter-spacing: -0.1px;
`;

// --- Exposed ref handle ---
export interface HeroSectionHandle {
  scrollToForm: (e: React.MouseEvent) => void;
  getFormElement: () => HTMLDivElement | null;
}

interface HeroSectionProps {
  formspreeId?: string;
  thankYouPath?: string;
}

// --- Component ---
export const HeroSection = forwardRef<HeroSectionHandle, HeroSectionProps>(
  ({ formspreeId = 'xvzbaywz', thankYouPath = '/laundromat-ads/thank-you' }, ref) => {
  const navigate = useNavigate();
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [customSelectOpen, setCustomSelectOpen] = useState(false);
  const customSelectRef = useRef<HTMLDivElement>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    laundromatName: '',
    laundromatAddress: '',
    placeId: '',
    painPoint: '',
  });
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(sessionStorage.getItem('utm_source') && { utm_source: sessionStorage.getItem('utm_source') }),
          ...(sessionStorage.getItem('utm_medium') && { utm_medium: sessionStorage.getItem('utm_medium') }),
          ...(sessionStorage.getItem('utm_campaign') && { utm_campaign: sessionStorage.getItem('utm_campaign') }),
          ...(sessionStorage.getItem('utm_term') && { utm_term: sessionStorage.getItem('utm_term') }),
          ...(sessionStorage.getItem('gclid') && { gclid: sessionStorage.getItem('gclid') }),
          ...(sessionStorage.getItem('ad_variant') && { ad_variant: sessionStorage.getItem('ad_variant') }),
        }),
      });
      navigate(thankYouPath);
    } catch {
      navigate(thankYouPath);
    }
  };

  const {
    inputRef: laundroMatInputRef,
    suggestions,
    showDropdown,
    dropdownRef,
    selectSuggestion,
    handleDropdownWheel,
  } = useGooglePlacesAutocomplete({
    onSelect: (place) => {
      setFormData(prev => ({
        ...prev,
        laundromatName: place.name,
        laundromatAddress: place.address,
        placeId: place.placeId,
      }));
    },
  });

  // Audio playback state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const bars: number[] = [];
    for (let i = 0; i < 50; i++) {
      const p = i / 50;
      const base = Math.sin(p * Math.PI) * 0.6 + 0.2;
      const noise = (Math.random() - 0.5) * 0.3;
      const speech = Math.sin(i * 0.8) * 0.15;
      const h = Math.max(0.1, Math.min(1, base + noise + speech));
      bars.push(h * 100);
    }
    setWaveformBars(bars);
  }, []);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/caller_audio.mp4');
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(1);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Progress sync via requestAnimationFrame
  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused && audio.duration) {
      setProgress(audio.currentTime / audio.duration);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    // If at end, restart
    if (audio.ended || progress >= 1) {
      audio.currentTime = 0;
      setProgress(0);
    }

    audio.play();
    setIsPlaying(true);
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [isPlaying, progress, updateProgress]);

  // Seek when clicking on waveform
  const handleWaveformClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));

    audio.currentTime = pct * duration;
    setProgress(pct);

    // If not playing, start playback
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration, updateProgress]);

  // Close custom select on outside tap
  useEffect(() => {
    if (!customSelectOpen) return;
    const handleTap = (e: MouseEvent) => {
      if (customSelectRef.current && !customSelectRef.current.contains(e.target as Node)) {
        setCustomSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleTap);
    return () => document.removeEventListener('mousedown', handleTap);
  }, [customSelectOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const elapsed = Math.floor(progress * duration);
  const playedBarCount = Math.floor(progress * waveformBars.length);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus first empty field after scroll
    setTimeout(() => {
      if (!formRef.current) return;
      const inputs = formRef.current.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
      for (const input of inputs) {
        if (!input.value) {
          input.focus();
          break;
        }
      }
    }, 600);
  };

  useImperativeHandle(ref, () => ({
    scrollToForm,
    getFormElement: () => formRef.current,
  }));

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // Skip weekends: if Saturday, jump to Monday; if Sunday, jump to Monday
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <HeroSectionWrapper id="hero" aria-label="AI receptionist for laundromats - stop missing calls, stop losing customers, 24/7 phone answering from $129/mo">
        <HeroInner>
          {/* Text content — always first */}
          <HeroContent>
            <HeroBadge>
              <BadgeDot />
              AI made for laundromats
            </HeroBadge>

            <HeroHeadline>
              Stop missing calls.<br />Stop losing customers.
            </HeroHeadline>

            <HeroSub>
              An AI that takes orders, processes refunds, texts customers, speaks every language, and picks up every call. So you don't have to.
            </HeroSub>
          </HeroContent>

          {/* Scroll strip — mobile only, between audio and form */}
          <MobileScrollStripSlot>
            <ClientScrollStrip />
          </MobileScrollStripSlot>

          {/* Form + Guarantee — after scroll strip on mobile, right column on desktop */}
          <FormColumn>
            <FormCard ref={formRef} id="form">
              <FormHeadline>Try it free for 14 days.</FormHeadline>
              <FormSub>Get started below. You'll be live in less than 24 hours.</FormSub>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="laundromat">Laundromat</FormLabel>
                  <FormInput
                    ref={laundroMatInputRef}
                    type="text"
                    id="laundromat"
                    name="laundromatName"
                    placeholder="Search by name or address"
                    value={formData.laundromatName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {showDropdown && suggestions.length > 0 && (
                    <AutocompleteDropdown ref={dropdownRef} onWheel={handleDropdownWheel}>
                      {suggestions.map((s) => (
                        <AutocompleteItem key={s.placeId} onMouseDown={() => selectSuggestion(s)}>
                          <AutocompleteMainText>{s.mainText}</AutocompleteMainText>
                          <AutocompleteSecondaryText>{s.secondaryText}</AutocompleteSecondaryText>
                        </AutocompleteItem>
                      ))}
                    </AutocompleteDropdown>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="fname">Name</FormLabel>
                  <FormInput type="text" id="fname" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <FormInput type="tel" id="phone" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} required />
                </FormGroup>
                <FormGroup ref={customSelectRef}>
                  <FormLabel htmlFor="painPoint">Biggest challenge</FormLabel>
                  {/* Desktop: native select */}
                  <FormSelect id="painPoint" name="painPoint" value={formData.painPoint} onChange={handleChange}>
                    {QUALIFYING_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </FormSelect>
                  {/* Mobile: custom dropdown with large text */}
                  <CustomSelectTrigger
                    $open={customSelectOpen}
                    $hasValue={!!formData.painPoint}
                    onClick={() => setCustomSelectOpen(!customSelectOpen)}
                  >
                    {QUALIFYING_OPTIONS.find(o => o.value === formData.painPoint)?.label || 'Select'}
                  </CustomSelectTrigger>
                  {customSelectOpen && (
                    <CustomSelectDropdown>
                      {QUALIFYING_OPTIONS.filter(o => o.value !== '').map(opt => (
                        <CustomSelectOption
                          key={opt.value}
                          $selected={formData.painPoint === opt.value}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, painPoint: opt.value }));
                            setCustomSelectOpen(false);
                          }}
                        >
                          {opt.label}
                        </CustomSelectOption>
                      ))}
                    </CustomSelectDropdown>
                  )}
                </FormGroup>
                <FormSubmit id="form-submit" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting\u2026' : 'Try WorkBuddy free \u2192'}
                </FormSubmit>
              </form>

              <GuaranteeBox>
                <GuaranteeIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </GuaranteeIcon>
                <div>
                  <GuaranteeTitle>The 3-Customer Guarantee</GuaranteeTitle>
                  <GuaranteeText>We guarantee you'll get 3 new customers in your first 14 days — or it's free until you do.</GuaranteeText>
                </div>
              </GuaranteeBox>
            </FormCard>
          </FormColumn>

          {/* Audio player — third on mobile, second column-row on desktop */}
          <AudioColumn>
            <DemoPlayer>
              <DemoHeader>
                <DemoTitle>Real customer call</DemoTitle>
                <DemoTimestamp>Feb 5 &middot; 7:35 PM</DemoTimestamp>
              </DemoHeader>
              <DemoMeta>Most callers think they're talking to your front desk staff.</DemoMeta>

              <DemoPlayRow>
                <DemoPlayBtn aria-label={isPlaying ? 'Pause demo' : 'Play demo'} onClick={togglePlay}>
                  <PlayIcon $visible={!isPlaying} width="18" height="18" viewBox="0 0 24 24">
                    <polygon points="6,3 20,12 6,21" />
                  </PlayIcon>
                  <PauseIcon $visible={isPlaying} width="18" height="18" viewBox="0 0 24 24">
                    <rect x="5" y="3" width="4" height="18" rx="1" />
                    <rect x="15" y="3" width="4" height="18" rx="1" />
                  </PauseIcon>
                </DemoPlayBtn>
                <DemoWaveform onClick={handleWaveformClick}>
                  {waveformBars.map((h, i) => (
                    <DemoBar key={i} $height={h} $played={i < playedBarCount} />
                  ))}
                </DemoWaveform>
                <DemoTime>{formatTime(elapsed)} / {formatTime(Math.floor(duration))}</DemoTime>
              </DemoPlayRow>


              <DemoTranscript>
                <TranscriptToggle $open={transcriptOpen} onClick={() => setTranscriptOpen(!transcriptOpen)}>
                  {transcriptOpen ? 'Hide transcript' : 'View transcript'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </TranscriptToggle>
                <TranscriptBody $open={transcriptOpen}>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>Hey Ryan, welcome back to Friendly City Laundry at Tampa! How can I help you today?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="caller">Caller</TranscriptSpeaker>
                    <TranscriptText>What time do you guys close tonight?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>Our self-service laundry is open until 11pm every day, with the last wash starting at 10pm.</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="caller">Caller</TranscriptSpeaker>
                    <TranscriptText>What's the largest washer you guys have?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>We've got an 80-pound washer — that's the biggest one — and it costs $10.25 per load. Perfect if you've got big stuff like comforters or rugs.</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="caller">Caller</TranscriptSpeaker>
                    <TranscriptText>Perfect. And do you guys handle wash dry fold?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>For Tampa, wash dry fold service is coming soon starting March 1st. When it launches, it'll be $2.25 per pound, and you get 50% off your first order. Want me to keep you posted when it's live?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="caller">Caller</TranscriptSpeaker>
                    <TranscriptText>How about commercial laundry? You guys do commercial laundry?</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>We do offer commercial laundry starting March 1st with that same 50% off first order. I can take your company name, contact info, and how many pickups you'd expect each week if you want someone to reach out.</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="caller">Caller</TranscriptSpeaker>
                    <TranscriptText>That's okay. I'll call back March 1st.</TranscriptText>
                  </TranscriptLine>
                  <TranscriptLine>
                    <TranscriptSpeaker $type="ai">WorkBuddy</TranscriptSpeaker>
                    <TranscriptText>Sounds good! If you need anything else when you call back, just let me know. Have a great night!</TranscriptText>
                  </TranscriptLine>
                  <DemoResult>Six questions. Zero hold time. The owner never picked up.</DemoResult>

                  {/* Bottom collapse control */}
                  <TranscriptCollapseRow>
                    <TranscriptToggle $open={true} onClick={() => setTranscriptOpen(false)}>
                      Hide transcript
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </TranscriptToggle>
                  </TranscriptCollapseRow>
                </TranscriptBody>
              </DemoTranscript>
            </DemoPlayer>
          </AudioColumn>
        </HeroInner>
      </HeroSectionWrapper>
    </>
  );
});

HeroSection.displayName = 'HeroSection';
export type { HeroSectionProps };
