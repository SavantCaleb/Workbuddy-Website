import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { LPSection, LPInner, LPHeadline, LPSubtext } from './primitives';

/* ── Animated number hook ── */

const useAnimatedValue = (target: number, duration = 400) => {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const start = prevRef.current;
    prevRef.current = target;
    const t0 = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setDisplay(Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return display;
};

/* ── Keyframes ── */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const revealIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ── */

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  @media (min-width: 640px) { margin-bottom: 56px; }
`;

const CalcLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

/* ── Quiz card ── */

const QuizCard = styled.div`
  background: ${theme.colors.surface.primary};
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) { padding: 36px; }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.text.tertiary};
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  &:hover { color: ${theme.colors.brand.azure}; }
`;

const StepCount = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.tertiary};
`;

const StepBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const QuestionText = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.brand.slate};
  text-align: center;
  margin: 0 0 24px;
  line-height: 1.35;
  max-width: 280px;
  @media (min-width: 640px) { font-size: 18px; }
`;

const NextBtn = styled.button`
  background: none;
  border: none;
  margin-top: 24px;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.brand.azure};
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
  &:disabled { opacity: 0.2; cursor: default; }
`;

const MultiSelectHint = styled.div`
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: 16px;
`;

/* ── Completed state (left card) ── */

const CompletedBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const CompletedTitle = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 22px;
  color: ${theme.colors.brand.slate};
  letter-spacing: -0.5px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const CompletedSub = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: 20px;
`;

const StartOverBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.brand.azure};
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

/* ── Stepper ── */

const StepperRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const StepperBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  background: white;
  color: ${theme.colors.brand.slate};
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover {
    border-color: ${theme.colors.brand.azure};
    color: ${theme.colors.brand.azure};
  }
  &:active { transform: scale(0.95); }
`;

const StepperValue = styled.div<{ $empty?: boolean }>`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 32px;
  color: ${p => (p.$empty ? theme.colors.text.tertiary : theme.colors.brand.slate)};
  min-width: 100px;
  text-align: center;
  letter-spacing: -1px;
  span {
    font-size: 14px;
    font-weight: 400;
    color: ${theme.colors.text.tertiary};
    letter-spacing: 0;
  }
`;

/* ── Segmented control ── */

const SegmentedControl = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 4px;
  border: 1px solid ${theme.colors.neutral.gray200};
  width: 100%;
  max-width: 320px;
`;

const Segment = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${p => (p.$active ? theme.colors.brand.azure : 'transparent')};
  color: ${p => (p.$active ? 'white' : theme.colors.text.secondary)};
  &:hover { color: ${p => (p.$active ? 'white' : theme.colors.brand.slate)}; }
  @media (min-width: 640px) { font-size: 14px; padding: 11px 16px; }
`;

/* ── Chips (multi-select) ── */

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 980px;
  border: 1.5px solid ${p => (p.$active ? theme.colors.brand.azure : theme.colors.neutral.gray200)};
  background: ${p => (p.$active ? 'rgba(103, 183, 209, 0.1)' : 'white')};
  color: ${p => (p.$active ? theme.colors.brand.azure : theme.colors.text.secondary)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: ${theme.colors.brand.azure}; }
  @media (min-width: 640px) { font-size: 15px; padding: 10px 22px; }
`;

/* ── Slider ── */

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 300px;
`;

const SliderDisplay = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 36px;
  color: ${theme.colors.brand.slate};
  text-align: center;
  letter-spacing: -1.5px;
  margin-bottom: 20px;
  span {
    font-size: 16px;
    font-weight: 400;
    color: ${theme.colors.text.tertiary};
    letter-spacing: 0;
  }
`;

const SliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${theme.colors.neutral.gray200};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colors.brand.azure};
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(50, 74, 95, 0.2);
    cursor: pointer;
    transition: transform 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colors.brand.azure};
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(50, 74, 95, 0.2);
    cursor: pointer;
  }
`;

const SliderRange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
`;

/* ── Results card ── */

const ResultsCard = styled.div`
  background: ${theme.colors.brand.slate};
  border-radius: 20px;
  padding: 28px;
  color: white;
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) { padding: 36px; }
`;

/* Locked */

const LockedContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
`;

const ProgressTrack = styled.div`
  width: 100%;
  max-width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 28px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${p => p.$progress * 100}%;
  background: ${theme.colors.brand.azure};
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const LockedTitle = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
`;

const LockedCount = styled.div`
  font-size: 14px;
  opacity: 0.5;
  margin-bottom: 16px;
`;

const LockedText = styled.div`
  font-size: 14px;
  opacity: 0.4;
  line-height: 1.5;
  max-width: 220px;
`;

/* Revealed */

const RevealedContent = styled.div`
  animation: ${revealIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ResultTopLabel = styled.div`
  font-size: 12px;
  opacity: 0.5;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.6px;
  margin-bottom: 8px;
`;

const ResultBigNumber = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 44px;
  letter-spacing: -2px;
  line-height: 1;
  @media (min-width: 640px) { font-size: 52px; letter-spacing: -2.5px; }
`;

const ResultSuffix = styled.span`
  font-size: 18px;
  font-weight: 400;
  opacity: 0.45;
`;

const ResultCaption = styled.div`
  font-size: 13px;
  opacity: 0.45;
  margin-top: 6px;
`;

const ResultDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 24px 0;
`;

const BreakdownLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.6px;
  opacity: 0.4;
  margin-bottom: 14px;
`;

const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  & + & { margin-top: 10px; }
`;

const LineLabel = styled.span`
  font-size: 14px;
  opacity: 0.6;
`;

const LineValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.8;
`;

const SavingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SavingsLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const SavingsValue = styled.span`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 24px;
  color: #4ADE80;
  letter-spacing: -0.5px;
`;

const ROIBadge = styled.div`
  display: inline-flex;
  margin-top: 20px;
  padding: 7px 16px;
  background: rgba(74, 222, 128, 0.12);
  border-radius: 980px;
  font-size: 13px;
  font-weight: 600;
  color: #4ADE80;
  letter-spacing: -0.2px;
`;

const Insight = styled.p`
  font-size: 13px;
  opacity: 0.4;
  margin-top: 20px;
  line-height: 1.5;
`;

const ResultCTAButton = styled.a`
  display: block;
  text-align: center;
  margin-top: 24px;
  padding: 13px 28px;
  background: #E8742A;
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 980px;
  text-decoration: none;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  &:hover { background: #d4691f; transform: scale(1.04); }
  &:active { transform: scale(0.98); }
  @media (min-width: 640px) { font-size: 15px; padding: 14px 32px; }
`;

const HonestBadge = styled.div`
  display: inline-flex;
  margin-top: 20px;
  padding: 7px 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 980px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.2px;
`;

/* ── Text input ── */

const InputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const DollarPrefix = styled.span`
  position: absolute;
  left: 16px;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.brand.slate};
  letter-spacing: -1px;
  pointer-events: none;
`;

const TextInput = styled.input`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.brand.slate};
  letter-spacing: -1px;
  text-align: left;
  padding: 12px 16px 12px 32px;
  width: 140px;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-radius: 12px;
  background: white;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.brand.azure};
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0;
  }

  /* Hide spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

/* ── Constants ── */

const SERVICE_OPTIONS = [
  { key: 'selfserve', label: 'Self-Serve Laundry' },
  { key: 'wdf', label: 'Wash Dry Fold' },
  { key: 'pickup', label: 'Pickup & Delivery' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'drycleaning', label: 'Dry Cleaning' },
  { key: 'other', label: 'Other' },
];

const ORDER_SERVICE_KEYS = ['wdf', 'pickup', 'commercial', 'drycleaning'];

const LOST_CUSTOMER_RATES = [
  { label: 'Most call back', value: 0.25 },
  { label: 'Some do, some don\u2019t', value: 0.5 },
  { label: 'Most go elsewhere', value: 0.75 },
];
const AFTER_HOURS_VALUE: Record<string, number> = { rarely: 75, sometimes: 200, often: 400 };

/* Graduated pricing from the pricing page */
const COIN_OP_PRICING = [0, 129, 199, 249, 299, 349, 399, 429, 459, 489];
const FULL_SVC_PRICING = [0, 199, 249, 299, 349, 399, 449, 489, 529, 569];

const getGraduatedPrice = (locations: number, isFullService: boolean): number => {
  const table = isFullService ? FULL_SVC_PRICING : COIN_OP_PRICING;
  if (locations >= table.length) return table[table.length - 1]; // cap at 9-location price for 10+
  return table[locations];
};

/* ── Component ── */

interface ROISectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const ROISection = ({ onScrollToForm }: ROISectionProps) => {
  const [locations, setLocations] = useState<number | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [callsPerDay, setCallsPerDay] = useState(8);
  const [missPercent, setMissPercent] = useState(50);
  const [avgOrderInput, setAvgOrderInput] = useState('');
  const [lostRate, setLostRate] = useState<number | null>(null);
  const [afterHours, setAfterHours] = useState<string | null>(null);
  const [hasAnsweringService, setHasAnsweringService] = useState<boolean | null>(null);

  const [step, setStep] = useState(0);
  const advanceTimer = useRef<number>(undefined);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const hasOrderServices = useMemo(
    () => services.some(s => ORDER_SERVICE_KEYS.includes(s)),
    [services],
  );

  /* ── Steps ── */

  const stepKeys = useMemo(() => {
    const arr = ['locations', 'services', 'callsPerDay', 'missRate'];
    if (hasOrderServices) arr.push('avgOrder', 'lostRate');
    arr.push('afterHours', 'hasAnsweringService');
    return arr;
  }, [hasOrderServices]);

  const totalSteps = stepKeys.length;
  const isComplete = step >= totalSteps;
  const progress = totalSteps > 0 ? Math.min(step / totalSteps, 1) : 0;
  const currentKey = stepKeys[step];

  const advance = useCallback(() => setStep(s => s + 1), []);

  const advanceAfterDelay = useCallback(() => {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => setStep(s => s + 1), 350);
  }, []);

  const toggleService = (key: string) => {
    setServices(prev =>
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key],
    );
  };

  /* Auto-scroll to results on completion */
  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);
    }
  }, [isComplete]);

  /* ── Reset ── */

  const reset = () => {
    setLocations(null);
    setServices([]);
    setCallsPerDay(8);
    setMissPercent(50);
    setAvgOrderInput('');
    setLostRate(null);
    setAfterHours(null);
    setHasAnsweringService(null);
    setStep(0);
  };

  /* ── Results ── */

  const avgOrder = avgOrderInput ? parseInt(avgOrderInput, 10) : null;

  const results = useMemo(() => {
    if (!isComplete || locations === null || services.length === 0 || afterHours === null || hasAnsweringService === null) return null;

    const missRate = missPercent / 100;
    const missedPerMonth = Math.round(callsPerDay * missRate * 30);
    const lostPerLoc = hasOrderServices
      ? Math.round(missedPerMonth * (lostRate ?? 0.5) * (avgOrder ?? 30))
      : Math.round(missedPerMonth * 10);

    const ahVal = AFTER_HOURS_VALUE[afterHours] ?? 200;
    const svcSave = hasAnsweringService ? 300 : 0;

    const lostRevenue = lostPerLoc * locations;
    const ahTotal = ahVal * locations;
    const svcTotal = svcSave * locations;
    const totalOpp = lostRevenue + ahTotal + svcTotal;
    const wbCost = getGraduatedPrice(locations, hasOrderServices);

    return {
      missedPerMonth: missedPerMonth * locations,
      lostRevenue, ahTotal, svcTotal, totalOpp,
      wbCost,
      netSavings: totalOpp - wbCost,
      roi: wbCost > 0 ? Math.max(1, Math.round(totalOpp / wbCost)) : 1,
    };
  }, [isComplete, locations, services, callsPerDay, missPercent, avgOrder, lostRate, afterHours, hasAnsweringService, hasOrderServices]);

  const animTotal = useAnimatedValue(results?.totalOpp ?? 0);
  const animSavings = useAnimatedValue(Math.max(0, results?.netSavings ?? 0));

  /* ── Render current step control ── */

  const renderControl = () => {
    switch (currentKey) {
      case 'locations':
        return (
          <>
            <QuestionText>How many locations do you operate?</QuestionText>
            <StepperRow>
              <StepperBtn onClick={() => setLocations(p => (p === null ? 1 : Math.max(1, p - 1)))} aria-label="Decrease">&minus;</StepperBtn>
              <StepperValue $empty={locations === null}>
                {locations ?? '\u2014'} <span>{locations === 1 ? 'location' : 'locations'}</span>
              </StepperValue>
              <StepperBtn onClick={() => setLocations(p => (p === null ? 1 : Math.min(10, p + 1)))} aria-label="Increase">+</StepperBtn>
            </StepperRow>
            <NextBtn disabled={locations === null} onClick={advance}>Next &rarr;</NextBtn>
          </>
        );

      case 'services':
        return (
          <>
            <QuestionText>What services do you offer?</QuestionText>
            <MultiSelectHint>Select all that apply</MultiSelectHint>
            <ChipRow>
              {SERVICE_OPTIONS.map(s => (
                <Chip key={s.key} $active={services.includes(s.key)} onClick={() => toggleService(s.key)}>
                  {s.label}
                </Chip>
              ))}
            </ChipRow>
            <NextBtn disabled={services.length === 0} onClick={advance}>Next &rarr;</NextBtn>
          </>
        );

      case 'callsPerDay':
        return (
          <>
            <QuestionText>
              How many calls {locations !== null && locations > 1 ? 'does each location get' : 'do you get'} per day?
            </QuestionText>
            <SliderWrapper>
              <SliderDisplay>
                {callsPerDay >= 30 ? '30+' : callsPerDay} <span>calls/day</span>
              </SliderDisplay>
              <SliderInput
                type="range"
                min={1}
                max={30}
                value={callsPerDay}
                onChange={e => setCallsPerDay(Number(e.target.value))}
              />
              <SliderRange>
                <span>1</span>
                <span>30+</span>
              </SliderRange>
            </SliderWrapper>
            <NextBtn onClick={advance}>Next &rarr;</NextBtn>
          </>
        );

      case 'missRate':
        return (
          <>
            <QuestionText>What percentage of your calls go unanswered?</QuestionText>
            <SliderWrapper>
              <SliderDisplay>
                {missPercent}<span>%</span>
              </SliderDisplay>
              <SliderInput
                type="range"
                min={5}
                max={95}
                step={5}
                value={missPercent}
                onChange={e => setMissPercent(Number(e.target.value))}
              />
              <SliderRange>
                <span>5%</span>
                <span>95%</span>
              </SliderRange>
            </SliderWrapper>
            <NextBtn onClick={advance}>Next &rarr;</NextBtn>
          </>
        );

      case 'avgOrder':
        return (
          <>
            <QuestionText>What&rsquo;s your average order value?</QuestionText>
            <InputWrapper>
              <DollarPrefix>$</DollarPrefix>
              <TextInput
                type="number"
                inputMode="numeric"
                placeholder="e.g. 30"
                value={avgOrderInput}
                onChange={e => {
                  const v = e.target.value;
                  if (v === '' || /^\d{0,4}$/.test(v)) setAvgOrderInput(v);
                }}
                autoFocus
              />
            </InputWrapper>
            <NextBtn disabled={!avgOrderInput || parseInt(avgOrderInput, 10) <= 0} onClick={advance}>Next &rarr;</NextBtn>
          </>
        );

      case 'lostRate':
        return (
          <>
            <QuestionText>When you miss a call, do those customers call back?</QuestionText>
            <ChipRow>
              {LOST_CUSTOMER_RATES.map(r => (
                <Chip key={r.value} $active={lostRate === r.value} onClick={() => { setLostRate(r.value); advanceAfterDelay(); }}>{r.label}</Chip>
              ))}
            </ChipRow>
          </>
        );

      case 'afterHours':
        return (
          <>
            <QuestionText>Do you get calls after hours that nobody picks up?</QuestionText>
            <SegmentedControl>
              <Segment $active={afterHours === 'rarely'} onClick={() => { setAfterHours('rarely'); advanceAfterDelay(); }}>Rarely</Segment>
              <Segment $active={afterHours === 'sometimes'} onClick={() => { setAfterHours('sometimes'); advanceAfterDelay(); }}>Sometimes</Segment>
              <Segment $active={afterHours === 'often'} onClick={() => { setAfterHours('often'); advanceAfterDelay(); }}>Often</Segment>
            </SegmentedControl>
          </>
        );

      case 'hasAnsweringService':
        return (
          <>
            <QuestionText>Are you paying for an answering service that still can&rsquo;t do the job?</QuestionText>
            <SegmentedControl>
              <Segment $active={hasAnsweringService === false} onClick={() => { setHasAnsweringService(false); advanceAfterDelay(); }}>No</Segment>
              <Segment $active={hasAnsweringService === true} onClick={() => { setHasAnsweringService(true); advanceAfterDelay(); }}>Yes</Segment>
            </SegmentedControl>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <LPSection id="roi-calculator" aria-label="Laundromat ROI calculator - cost savings from AI phone answering, reduce labor costs, increase revenue">
      <LPInner>
        <Header>
          <LPHeadline style={{ textAlign: 'center' }}>
            What Are Missed Calls Costing You?
          </LPHeadline>
          <LPSubtext style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            Answer a few quick questions. Every number comes directly from your inputs.
          </LPSubtext>
        </Header>

        <CalcLayout>
          {/* ── Quiz ── */}
          <QuizCard>
            {isComplete ? (
              <CompletedBody>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="rgba(103,183,209,0.12)" />
                  <path d="M11 18.5L15.5 23L25 13" stroke={theme.colors.brand.azure} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <CompletedTitle>All done</CompletedTitle>
                <CompletedSub>Your personalized report is ready.</CompletedSub>
                <StartOverBtn onClick={reset}>Start over</StartOverBtn>
              </CompletedBody>
            ) : (
              <>
                <CardHeader>
                  {step > 0 ? (
                    <BackBtn onClick={() => setStep(s => s - 1)}>&larr; Back</BackBtn>
                  ) : (
                    <span />
                  )}
                  <StepCount>{step + 1} of {totalSteps}</StepCount>
                </CardHeader>
                <StepBody key={step}>
                  {renderControl()}
                </StepBody>
              </>
            )}
          </QuizCard>

          {/* ── Results ── */}
          <ResultsCard ref={resultsRef}>
            {isComplete && results ? (
              <RevealedContent>
                <ResultTopLabel>You&rsquo;re Leaving on the Table</ResultTopLabel>
                <ResultBigNumber>
                  ${animTotal.toLocaleString()}<ResultSuffix>/mo</ResultSuffix>
                </ResultBigNumber>
                <ResultCaption>
                  from {results.missedPerMonth.toLocaleString()} missed calls per month
                  {locations !== null && locations > 1 ? ` across ${locations} locations` : ''}
                </ResultCaption>

                <ResultDivider />
                <BreakdownLabel>Breakdown</BreakdownLabel>

                <LineItem>
                  <LineLabel>{hasOrderServices ? 'Lost orders from missed calls' : 'Lost customers from missed calls'}</LineLabel>
                  <LineValue>${results.lostRevenue.toLocaleString()}</LineValue>
                </LineItem>
                <LineItem>
                  <LineLabel>After-hours coverage</LineLabel>
                  <LineValue>${results.ahTotal.toLocaleString()}</LineValue>
                </LineItem>
                {results.svcTotal > 0 && (
                  <LineItem>
                    <LineLabel>Answering service savings</LineLabel>
                    <LineValue>${results.svcTotal.toLocaleString()}</LineValue>
                  </LineItem>
                )}

                <ResultDivider />

                <LineItem>
                  <LineLabel>WorkBuddy ({locations} {locations === 1 ? 'location' : 'locations'})</LineLabel>
                  <LineValue>${results.wbCost}/mo</LineValue>
                </LineItem>

                <SavingsRow>
                  <SavingsLabel>Net monthly impact</SavingsLabel>
                  <SavingsValue>+${animSavings.toLocaleString()}/mo</SavingsValue>
                </SavingsRow>

                {results.roi >= 3 ? (
                  <>
                    <ROIBadge>{results.roi}x return on investment</ROIBadge>
                    <Insight>
                      {hasOrderServices
                        ? 'Every missed call is a customer who went somewhere else. One extra order per week pays for WorkBuddy.'
                        : 'Every unanswered call is a customer you never hear from again. One prevented emergency covers a full year.'}
                    </Insight>
                    {onScrollToForm && (
                      <ResultCTAButton href="#form" onClick={onScrollToForm}>
                        Get Started &rarr;
                      </ResultCTAButton>
                    )}
                  </>
                ) : results.roi >= 2 ? (
                  <>
                    <ROIBadge>{results.roi}x return on investment</ROIBadge>
                    <Insight>
                      The math works, but it&rsquo;s close. If you&rsquo;re losing even a few more calls than you think, the ROI gets much stronger.
                    </Insight>
                    {onScrollToForm && (
                      <ResultCTAButton href="#form" onClick={onScrollToForm}>
                        Get Started &rarr;
                      </ResultCTAButton>
                    )}
                  </>
                ) : (
                  <>
                    <HonestBadge>Honestly? The math is tight.</HonestBadge>
                    <Insight>
                      Based on your numbers, WorkBuddy might not be the right investment right now. We&rsquo;d rather be upfront than sell you something that doesn&rsquo;t make sense. If your call volume grows or you add services, come back and run this again.
                    </Insight>
                  </>
                )}
              </RevealedContent>
            ) : (
              <LockedContent>
                <ProgressTrack>
                  <ProgressFill $progress={progress} />
                </ProgressTrack>
                <LockedTitle>Your Results</LockedTitle>
                <LockedCount>{step} of {totalSteps}</LockedCount>
                <LockedText>Answer every question to see your personalized report.</LockedText>
              </LockedContent>
            )}
          </ResultsCard>
        </CalcLayout>
      </LPInner>
    </LPSection>
  );
};
