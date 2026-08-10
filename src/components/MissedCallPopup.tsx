import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const POPUP_DELAY = 30000;
const LS_KEY = 'wb_popup_seen';
const SS_KEY = 'wb_form_submitted';

/* ── Animations ── */

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

/* ── Styled Components ── */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  animation: ${fadeIn} 200ms ease-out;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 10001;
  width: calc(100% - 32px);
  max-width: 480px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${theme.colors.neutral.gray200};
  padding: 36px 28px;
  animation: ${scaleUp} 200ms cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 640px) {
    padding: 44px 36px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.surface.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.tertiary};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${theme.colors.neutral.gray200};
    color: ${theme.colors.text.primary};
  }
`;

const Headline = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 24px;
  color: ${theme.colors.brand.slate};
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 12px;

  @media (min-width: 640px) {
    font-size: 28px;
    letter-spacing: -1px;
  }
`;

const Body = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 24px;
  letter-spacing: -0.1px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${theme.colors.neutral.gray200};
  border-radius: 10px;
  font-size: 16px;
  font-family: ${theme.typography.fontFamily.body};
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface.primary};
  min-height: 48px;
  transition: border-color 0.2s, box-shadow 0.2s;

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

const SubmitBtn = styled.button`
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
  margin-top: 14px;
  box-shadow: 0 4px 15px rgba(232, 116, 42, 0.3);
  min-height: 48px;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    background: #D4681F;
    box-shadow: 0 6px 20px rgba(232, 116, 42, 0.4);
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Fine = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
  margin-top: 12px;
  letter-spacing: -0.1px;
`;

const SuccessMsg = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const SuccessHeadline = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 22px;
  color: ${theme.colors.brand.slate};
  margin-bottom: 10px;
`;

const SuccessBody = styled.p`
  font-size: 15px;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

/* ── Component ── */

interface MissedCallPopupProps {
  formspreeId?: string;
}

export const MissedCallPopup = ({ formspreeId = 'xvzbaywz' }: MissedCallPopupProps) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open logic
  useEffect(() => {
    if (localStorage.getItem(LS_KEY)) return;

    const timer = setTimeout(() => {
      // Don't show if already submitted this session
      if (sessionStorage.getItem(SS_KEY)) return;
      // Don't show if already seen
      if (localStorage.getItem(LS_KEY)) return;

      // Don't show if hero form is in viewport
      const heroForm = document.getElementById('form');
      if (heroForm) {
        const rect = heroForm.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) return;
      }

      // Don't show on narrow screens that are actively scrolling
      if (window.innerWidth < 480) {
        // We skip if under 480px and user has scrolled recently
        // Use a simple heuristic: check if a scroll happened in the last 2s
        let recentScroll = false;
        const onScroll = () => { recentScroll = true; };
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(() => {
          window.removeEventListener('scroll', onScroll);
          if (recentScroll) return;
          showPopup();
        }, 2000);
        return;
      }

      showPopup();
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const showPopup = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setOpen(true);
    localStorage.setItem(LS_KEY, '1');
  };

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the input after open
    setTimeout(() => inputRef.current?.focus(), 50);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;
    const modal = modalRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    previousFocusRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          phone,
          source: 'popup_30s',
          ...(sessionStorage.getItem('utm_source') && { utm_source: sessionStorage.getItem('utm_source') }),
          ...(sessionStorage.getItem('utm_medium') && { utm_medium: sessionStorage.getItem('utm_medium') }),
          ...(sessionStorage.getItem('utm_campaign') && { utm_campaign: sessionStorage.getItem('utm_campaign') }),
          ...(sessionStorage.getItem('gclid') && { gclid: sessionStorage.getItem('gclid') }),
        }),
      });
      sessionStorage.setItem(SS_KEY, '1');
      setSuccess(true);
    } catch {
      sessionStorage.setItem(SS_KEY, '1');
      setSuccess(true);
    }
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={close} />
      <Modal ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="popup-headline">
        <CloseBtn onClick={close} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </CloseBtn>

        {success ? (
          <SuccessMsg>
            <SuccessHeadline>We're on it.</SuccessHeadline>
            <SuccessBody>
              You'll hear from us within 24 hours with your call log and a plan to stop missing revenue.
            </SuccessBody>
          </SuccessMsg>
        ) : (
          <>
            <Headline id="popup-headline">How many calls are you missing?</Headline>
            <Body>
              Most owners guess two or three a week. It's usually closer to twenty. WorkBuddy answers every one and shows you the log.
            </Body>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="popup-phone">Phone number</Label>
              <Input
                ref={inputRef}
                type="tel"
                id="popup-phone"
                name="phone"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <SubmitBtn type="submit" disabled={submitting}>
                {submitting ? 'Submitting\u2026' : 'Show me my missed calls \u2192'}
              </SubmitBtn>
            </form>
            <Fine>Live in under 24 hours. Cancel anytime.</Fine>
          </>
        )}
      </Modal>
    </>
  );
};
