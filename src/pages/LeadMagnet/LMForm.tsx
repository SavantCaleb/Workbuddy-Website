import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import { useGooglePlacesAutocomplete } from '../LaundromatAds/hooks/useGooglePlacesAutocomplete';
import type { LeadMagnetConfig } from './types';

// ─── Brand tokens ─────────────────────────────────────────────────────────
const c = {
  white: '#FFFFFF',
  text: theme.colors.text.primary,
  textSecondary: theme.colors.text.secondary,
  textTertiary: theme.colors.text.tertiary,
  azure: theme.colors.brand.azure,
  azureLight: 'rgba(103, 183, 209, 0.1)',
  slate: theme.colors.brand.slate,
  orange: '#E8742A',
  red: '#DC2626',
  border: theme.colors.neutral.gray200,
  gray100: '#F1F5F9',
  amber: '#92400E',
  amberBg: '#FFFBEB',
  amberBorder: '#FDE68A',
};

const body = theme.typography.fontFamily.body;
const heading = theme.typography.fontFamily.heading;

// ─── Keyframes ────────────────────────────────────────────────────────────
const checkPop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ─── Styled Components ────────────────────────────────────────────────────
const FormCard = styled.div`
  background: ${c.white};
  border: 1px solid ${c.border};
  border-radius: 14px;
  padding: 24px 20px 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  @media (min-width: 640px) {
    padding: 28px 24px 24px;
  }
`;

const FormLabel_ = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${c.azure};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
  font-family: ${body};
`;

const FormHeadline = styled.div`
  font-family: ${heading};
  font-weight: 700;
  font-size: 18px;
  color: ${c.slate};
  margin-bottom: 20px;
  line-height: 1.3;
`;

const FormGroup = styled.div`
  margin-bottom: 14px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${c.text};
  margin-bottom: 5px;
  font-family: ${body};
`;

const OptionalTag = styled.span`
  font-weight: 400;
  color: ${c.textTertiary};
  font-size: 13px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  min-height: 48px;
  border: 1px solid ${c.border};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${body};
  color: ${c.text};
  background: ${c.white};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: ${c.textTertiary};
  }

  &:focus {
    border-color: ${c.azure};
    box-shadow: 0 0 0 3px rgba(103, 183, 209, 0.15);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  min-height: 48px;
  border: 1px solid ${c.border};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${body};
  color: ${c.text};
  background: ${c.white};
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238B9AAB' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;

  &:focus {
    border-color: ${c.azure};
    box-shadow: 0 0 0 3px rgba(103, 183, 209, 0.15);
  }
`;

const SubmitButton = styled.button<{ $submitting: boolean }>`
  width: 100%;
  padding: 14px 24px;
  min-height: 52px;
  background: ${c.orange};
  color: white;
  font-family: ${body};
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: ${(p) => (p.$submitting ? 'wait' : 'pointer')};
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(232, 116, 42, 0.3);
  opacity: ${(p) => (p.$submitting ? 0.7 : 1)};
  margin-top: 6px;

  &:hover:not(:disabled) {
    background: #D4681F;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(232, 116, 42, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const BelowCta = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${c.textTertiary};
  margin-top: 10px;
  font-family: ${body};
`;

const TrustBadges = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${c.textTertiary};
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${c.border};
  letter-spacing: 0.02em;
  font-family: ${body};
`;

const ScarcityBox = styled.div`
  margin-top: 16px;
  background: ${c.amberBg};
  border: 1px solid ${c.amberBorder};
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.5;
  color: ${c.amber};
  font-family: ${body};
`;

const ScarcityIcon = styled.span`
  font-size: 16px;
  flex-shrink: 0;
  line-height: 1;
`;

// ─── Autocomplete dropdown ────────────────────────────────────────────────
const AutocompleteDropdown = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 50;
  background: ${c.white};
  border: 1px solid ${c.border};
  border-top: none;
  border-radius: 0 0 10px 10px;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const AutocompleteItem = styled.button`
  width: 100%;
  padding: 10px 14px;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid ${c.border};
  cursor: pointer;
  font-family: ${body};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${c.gray100};
  }
`;

const AutocompleteMain = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${c.slate};
`;

const AutocompleteSub = styled.span`
  font-size: 12px;
  color: ${c.textTertiary};
  margin-top: 1px;
`;

// ─── Success State ────────────────────────────────────────────────────────
const SuccessWrapper = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SuccessCheck = styled.div`
  width: 64px;
  height: 64px;
  background: ${c.azureLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: ${checkPop} 0.5s ease-out;
`;

const SuccessHeadline = styled.h3`
  font-family: ${heading};
  font-weight: 700;
  font-size: 24px;
  color: ${c.slate};
  margin-bottom: 12px;
`;

const SuccessMessage = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${c.textSecondary};
  margin-bottom: 24px;
  font-family: ${body};
`;

const SuccessSteps = styled.ol`
  text-align: left;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SuccessStep = styled.li`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.5;
  color: ${c.text};
  font-family: ${body};
`;

const StepNum = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: ${c.azureLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${c.azure};
`;

const ErrorMsg = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14px;
  color: ${c.red};
  margin-bottom: 14px;
  font-family: ${body};
`;

// ─── Component ────────────────────────────────────────────────────────────
interface LMFormProps {
  config: LeadMagnetConfig;
  submitted: boolean;
  onSubmitted: () => void;
}

export function LMForm({ config, submitted, onSubmitted }: LMFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    laundromatName: '',
    laundromatAddress: '',
    placeId: '',
    email: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Google Places autocomplete
  const {
    inputRef: laundromatInputRef,
    suggestions,
    showDropdown,
    dropdownRef,
    selectSuggestion,
    handleDropdownWheel,
  } = useGooglePlacesAutocomplete({
    onSelect: (place) => {
      setFormData((prev) => ({
        ...prev,
        laundromatName: place.name,
        laundromatAddress: place.address,
        placeId: place.placeId,
      }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLaundromatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      laundromatName: e.target.value,
      laundromatAddress: '',
      placeId: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.name.trim() || !formData.laundromatName.trim() || !formData.phone.trim()) {
      setError('Please fill in your name, laundromat, and phone number.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const utmData: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((field) => {
        const val = sessionStorage.getItem(field);
        if (val) utmData[field] = val;
      });

      const payload = {
        ...formData,
        ...utmData,
        lead_magnet: config.pageId,
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
      };

      const res = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      // Fire Meta Pixel Lead event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: config.pixel.contentName,
          content_category: config.pixel.contentCategory,
        });
      }

      // Fire Google Ads conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-17886210357/lead_magnet',
          event_category: config.pixel.contentCategory,
        });
      }

      onSubmitted();
    } catch {
      setError('Something went wrong. Please try again or email caleb@getworkbuddy.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <FormCard>
        <SuccessWrapper>
          <SuccessCheck>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14L11.5 19.5L22 8.5" stroke={c.azure} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SuccessCheck>
          <SuccessHeadline>{config.success.headline}</SuccessHeadline>
          <SuccessMessage>{config.success.message}</SuccessMessage>
          <SuccessSteps>
            {config.success.steps.map((step, i) => (
              <SuccessStep key={i}>
                <StepNum>{i + 1}</StepNum>
                <span>{step}</span>
              </SuccessStep>
            ))}
          </SuccessSteps>
        </SuccessWrapper>
      </FormCard>
    );
  }

  return (
    <>
      <FormCard>
        <FormLabel_>{config.form.greenLabel}</FormLabel_>
        <FormHeadline>{config.form.headline}</FormHeadline>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <form onSubmit={handleSubmit}>
          {/* Laundromat — Google Places autocomplete */}
          <FormGroup>
            <Label htmlFor="laundromat">Laundromat</Label>
            <FormInput
              ref={laundromatInputRef}
              id="laundromat"
              name="laundromatName"
              type="text"
              placeholder="Search for your laundromat..."
              value={formData.laundromatName}
              onChange={handleLaundromatChange}
              autoComplete="off"
              required
              style={showDropdown ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : undefined}
            />
            {showDropdown && suggestions.length > 0 && (
              <AutocompleteDropdown ref={dropdownRef} onWheel={handleDropdownWheel}>
                {suggestions.map((s) => (
                  <AutocompleteItem key={s.placeId} type="button" onClick={() => selectSuggestion(s)}>
                    <AutocompleteMain>{s.mainText}</AutocompleteMain>
                    <AutocompleteSub>{s.secondaryText}</AutocompleteSub>
                  </AutocompleteItem>
                ))}
              </AutocompleteDropdown>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <FormInput
              id="name"
              name="name"
              type="text"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <FormInput
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {/* Extra fields from config (audit page: monthly spend, agency name) */}
          {config.form.extraFields.map((field) => (
            <FormGroup key={field.name}>
              <Label htmlFor={field.name}>
                {field.label}
                {field.optional && <OptionalTag> (optional)</OptionalTag>}
              </Label>
              {field.type === 'select' ? (
                <FormSelect
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              ) : (
                <FormInput
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </FormGroup>
          ))}

          <SubmitButton type="submit" $submitting={submitting} disabled={submitting}>
            {submitting ? 'Submitting...' : config.form.ctaText}
          </SubmitButton>
        </form>

        <BelowCta>{config.form.belowCta}</BelowCta>
        <TrustBadges>{config.form.trustBadges}</TrustBadges>
      </FormCard>

      <ScarcityBox>
        <ScarcityIcon>⏳</ScarcityIcon>
        <span>{config.form.scarcityCallout}</span>
      </ScarcityBox>
    </>
  );
}
