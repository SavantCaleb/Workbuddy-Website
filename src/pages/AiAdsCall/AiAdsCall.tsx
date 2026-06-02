import { useEffect, useState, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { SEO } from '../../components/SEO/SEO';

const META_PIXEL_ID = '1763378975020525';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

/* ── Analyzing overlay ── */

const ANALYZING_STEPS = [
  { label: 'Checking market availability...', duration: 1400 },
  { label: 'Scanning active clients in your area...', duration: 1600 },
  { label: 'Verifying open slots...', duration: 1200 },
];

const RESULT_TEXT = 'Good news — your market is open!';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div<{ $exiting: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  animation: ${({ $exiting }) => ($exiting ? fadeOut : fadeIn)} ${({ $exiting }) => ($exiting ? '0.5s' : '0.3s')} ease forwards;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid #e5e7eb;
  border-top-color: #1a1a2e;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 40px;
`;

const CheckMark = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  animation: ${scaleIn} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 360px;
  width: 100%;
`;

const StepRow = styled.div<{ $state: 'pending' | 'active' | 'done' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: ${({ $state }) =>
    $state === 'done' ? '#1a1a2e' : $state === 'active' ? '#1a1a2e' : '#c0c4cc'};
  transition: color 0.3s;

  @media (min-width: 640px) {
    font-size: 17px;
  }
`;

const Dot = styled.div<{ $state: 'pending' | 'active' | 'done' }>`
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
  background: ${({ $state }) =>
    $state === 'done' ? '#22c55e' : $state === 'active' ? '#1a1a2e' : '#d1d5db'};
  transition: background 0.3s;
  animation: ${({ $state }) => ($state === 'active' ? pulse : 'none')} 1s ease-in-out infinite;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #22c55e;
  margin-top: 16px;
  animation: ${slideUp} 0.4s ease forwards;

  @media (min-width: 640px) {
    font-size: 17px;
  }
`;

const ResultDot = styled.div`
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
  background: #22c55e;
`;

/* ── Main page ── */

const contentFadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 48px 24px 0;
  animation: ${contentFadeIn} 0.6s ease forwards;
`;


const TopMessage = styled.p`
  font-size: 17px;
  color: #6b7280;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 12px;
  padding: 0 16px;

  @media (min-width: 640px) {
    font-size: 22px;
    white-space: nowrap;
  }
`;

const Heading = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  letter-spacing: -0.8px;
  line-height: 1.2;
  margin-bottom: 40px;
  padding: 0 16px;

  @media (min-width: 640px) {
    font-size: 42px;
    letter-spacing: -1.2px;
    white-space: nowrap;
  }
`;

const FreeUnderline = styled.span`
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const CalContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  flex: 1;
  min-height: 600px;
`;

export const AiAdsCall = () => {
  const [analyzing, setAnalyzing] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stepsFinished, setStepsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const calLoaded = useRef(false);
  const pixelLoaded = useRef(false);

  // Initialize Meta Pixel
  useEffect(() => {
    if (pixelLoaded.current) return;
    pixelLoaded.current = true;

    const f = window;
    const b = document;
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement('script');
    t.async = true;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    s.parentNode!.insertBefore(t, s);

    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }, []);

  // Send server-side CAPI event
  const sendCAPIEvent = useCallback((eventName: string, eventData: Record<string, any> = {}) => {
    fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1] || '',
        fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1] || '',
        ...eventData,
      }),
    }).catch(() => {});
  }, []);

  // Run through the analyzing steps
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let step = 0;

    const advance = () => {
      step++;
      if (step < ANALYZING_STEPS.length) {
        setActiveStep(step);
        timeout = setTimeout(advance, ANALYZING_STEPS[step].duration);
      } else {
        // All scanning steps done — mark them green, pause, then reveal result
        setStepsFinished(true);
        timeout = setTimeout(() => {
          setShowResult(true);
          // After showing result, fade out overlay
          timeout = setTimeout(() => {
            setExiting(true);
            timeout = setTimeout(() => setAnalyzing(false), 500);
          }, 1200);
        }, 600);
      }
    };

    timeout = setTimeout(advance, ANALYZING_STEPS[0].duration);
    return () => clearTimeout(timeout);
  }, []);

  // Load Cal.com embed immediately so it's ready when overlay lifts
  useEffect(() => {
    if (calLoaded.current) return;
    calLoaded.current = true;

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          (api as any).q = (api as any).q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = (window as any).Cal;
    Cal('init', 'local-biz-strategy-session', { origin: 'https://app.cal.com' });

    Cal.ns['local-biz-strategy-session']('inline', {
      elementOrSelector: '#my-cal-inline-local-biz-strategy-session',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'workbuddycaleb/local-biz-strategy-session',
    });

    Cal.ns['local-biz-strategy-session']('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    // Listen for successful booking
    Cal.ns['local-biz-strategy-session']('on', {
      action: 'bookingSuccessful',
      callback: () => {
        // Client-side pixel event
        if (window.fbq) {
          window.fbq('track', 'Schedule', {
            content_name: 'Local Biz Strategy Session',
            content_category: 'ai-ads-call',
          });
        }
        // Server-side CAPI event
        sendCAPIEvent('Schedule', {
          content_name: 'Local Biz Strategy Session',
          content_category: 'ai-ads-call',
        });
      },
    });
  }, [sendCAPIEvent]);

  const getStepState = (i: number): 'pending' | 'active' | 'done' => {
    if (stepsFinished) return 'done';
    if (i < activeStep) return 'done';
    if (i === activeStep) return 'active';
    return 'pending';
  };

  return (
    <>
      <SEO
        title="Schedule Your Strategy Call | WorkBuddy"
        description="Book a free strategy call with WorkBuddy."
        canonical="/ai-ads-call"
        noindex
      />

      {analyzing && (
        <Overlay $exiting={exiting}>
          {showResult ? (
            <CheckMark>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </CheckMark>
          ) : (
            <Spinner />
          )}
          <StepList>
            {ANALYZING_STEPS.map((s, i) => (
              <StepRow key={i} $state={getStepState(i)}>
                <Dot $state={getStepState(i)} />
                {s.label}
              </StepRow>
            ))}
            {showResult && (
              <ResultRow>
                <ResultDot />
                {RESULT_TEXT}
              </ResultRow>
            )}
          </StepList>
        </Overlay>
      )}

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <Page>
        <TopMessage>
          Thanks! The system determined we don't work with anyone in your area!
        </TopMessage>
        <Heading>
          Step 2/2 - Schedule Your <FreeUnderline>Free</FreeUnderline> Strategy Call
        </Heading>
        <CalContainer>
          <div
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            id="my-cal-inline-local-biz-strategy-session"
          />
        </CalContainer>
      </Page>
    </>
  );
};
