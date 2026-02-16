import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

/* ── Keyframes ── */

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.1); }
  66% { transform: translate(25px, -40px) scale(0.9); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, 40px) scale(1.08); }
  66% { transform: translate(-35px, -25px) scale(0.92); }
`;

const scrollUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
`;

const pulseRing = keyframes`
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.015); }
`;

/* ── Section ── */

const Section = styled.section`
  position: relative;
  padding: 72px 20px;
  background: ${theme.colors.brand.slate};
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 100px 32px;
  }

  @media (min-width: 900px) {
    padding: 120px 40px;
  }
`;

const orbBase = `
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
`;

const Orb1 = styled.div`
  ${orbBase}
  width: 500px;
  height: 500px;
  background: rgba(103, 183, 209, 0.2);
  top: 5%;
  left: 10%;
  filter: blur(250px);
  animation: ${float1} 20s ease-in-out infinite;
`;

const Orb2 = styled.div`
  ${orbBase}
  width: 400px;
  height: 400px;
  background: rgba(220, 171, 88, 0.12);
  top: 55%;
  right: 5%;
  filter: blur(220px);
  animation: ${float2} 25s ease-in-out infinite;
`;

const Orb3 = styled.div`
  ${orbBase}
  width: 350px;
  height: 350px;
  background: rgba(103, 183, 209, 0.15);
  bottom: 5%;
  left: 35%;
  filter: blur(200px);
  animation: ${float3} 22s ease-in-out infinite;
`;

const Inner = styled.div<{ $visible: boolean }>`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? '0' : '30px')});
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`;

/* ── Grid layout ── */

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "device"
    "bottom";
  gap: 40px;
  justify-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header device"
      "bottom device";
    gap: 24px 56px;
    justify-items: start;
  }
`;

const HeaderArea = styled.div`
  grid-area: header;
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
    align-self: end;
    padding-bottom: 8px;
  }
`;

const DeviceArea = styled.div`
  grid-area: device;
  width: 100%;
  max-width: 440px;

  @media (min-width: 900px) {
    max-width: 480px;
    justify-self: center;
    align-self: center;
  }
`;

const BottomArea = styled.div`
  grid-area: bottom;
  width: 100%;
  max-width: 440px;

  @media (min-width: 900px) {
    align-self: start;
    padding-top: 8px;
    max-width: none;
  }
`;

/* ── Typography ── */

const Headline = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: 700;
  font-size: 32px;
  color: white;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 14px;

  @media (min-width: 640px) {
    font-size: 36px;
    letter-spacing: -1.5px;
  }

  @media (min-width: 900px) {
    font-size: 44px;
    letter-spacing: -2px;
  }
`;

const Sub = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.55;
  max-width: 420px;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 17px;
  }

  @media (min-width: 900px) {
    max-width: none;
  }
`;

/* ── Device ── */

const DeviceWrap = styled.div`
  position: relative;
`;

const Pulse = styled.div`
  position: absolute;
  inset: -4px;
  border-radius: 22px;
  border: 1.5px solid ${theme.colors.brand.azure};
  animation: ${pulseRing} 3.5s ease-in-out infinite;
  pointer-events: none;

  @media (min-width: 640px) {
    border-radius: 26px;
  }
`;

const Frame = styled.div`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;

  @media (min-width: 640px) {
    border-radius: 24px;
  }
`;

const Bar = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BarLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  color: #4ADE80;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const LiveDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ADE80;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
`;

/* Legend */

const LegendBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 10px 16px 11px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  flex-wrap: wrap;
`;

const LegendDot = styled.span<{ $c: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p => p.$c};
  flex-shrink: 0;
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

/* ── Feed ── */

const Viewport = styled.div`
  height: 340px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);

  @media (min-width: 640px) {
    height: 380px;
  }
`;

const Track = styled.div`
  animation: ${scrollUp} 38s linear infinite;
  will-change: transform;
`;

const FeedRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.035);

  @media (min-width: 640px) {
    gap: 12px;
    padding: 13px 20px;
  }
`;

const ChannelWrap = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`;

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TextIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const RowContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const RowLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 2px;

  @media (min-width: 640px) {
    font-size: 14px;
  }
`;

const RowOutcome = styled.div<{ $c: string }>`
  font-size: 12px;
  color: ${p => p.$c};
  opacity: 0.85;
`;

const RowTime = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.18);
  white-space: nowrap;
  margin-top: 2px;

  @media (min-width: 640px) {
    font-size: 11px;
  }
`;

/* ── Capabilities ── */

const Caps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  max-width: 440px;
  margin: 0 auto;

  @media (min-width: 900px) {
    margin: 0;
    max-width: none;
  }
`;

const CapItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  @media (min-width: 640px) {
    padding: 11px 14px;
    border-radius: 10px;
  }
`;

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={theme.colors.brand.azure} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CapText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 13px;
  }
`;

const CTARow = styled.div`
  text-align: center;
  margin-top: 28px;

  @media (min-width: 900px) {
    text-align: left;
    margin-top: 32px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
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

  &:hover {
    background: #d4691f;
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    font-size: 15px;
    padding: 14px 32px;
  }
`;

/* ── Data ── */

type Channel = 'call' | 'text';
type ActionKind = 'answered' | 'order' | 'refund' | 'emergency' | 'blocked';

const COLOR: Record<ActionKind, string> = {
  answered: '#4ADE80',
  order: '#67B7D1',
  refund: '#A78BFA',
  emergency: '#DCAB58',
  blocked: '#E57373',
};

interface FeedEvent {
  ch: Channel;
  k: ActionKind;
  l: string;
  o: string;
  t: string;
}

const FEED: FeedEvent[] = [
  { ch: 'call', k: 'answered',  l: '"What time do you close?"',      o: 'Answered — open until 10pm',       t: '2:14' },
  { ch: 'call', k: 'order',     l: 'Customer placing WDF order',     o: '$47 order added to POS',           t: '2:18' },
  { ch: 'text', k: 'answered',  l: '"Is my laundry ready?"',         o: 'Auto-replied with order status',   t: '2:23' },
  { ch: 'call', k: 'emergency', l: '"There\'s water on the floor!"', o: 'Owner called immediately',         t: '2:31' },
  { ch: 'call', k: 'blocked',   l: 'Robocall — solar panels',        o: 'Blocked automatically',            t: '2:35' },
  { ch: 'text', k: 'refund',    l: '"Dryer #4 took my money"',       o: '$3.50 refund processed',           t: '2:42' },
  { ch: 'call', k: 'order',     l: 'New wash & fold customer',       o: '$62 order added to POS',           t: '2:48' },
  { ch: 'text', k: 'answered',  l: '"¿Cuáles son sus precios?"',     o: 'Replied in Spanish with pricing',  t: '2:51' },
  { ch: 'call', k: 'emergency', l: '"Card reader won\'t swipe"',     o: 'Maintenance team alerted',         t: '3:02' },
  { ch: 'call', k: 'answered',  l: '"Do you have open washers?"',    o: 'Answered — 3 available now',       t: '3:08' },
  { ch: 'text', k: 'refund',    l: '"Washer stopped mid-cycle"',     o: '$5.00 refund processed',           t: '3:15' },
  { ch: 'call', k: 'order',     l: 'Rush WDF pickup request',        o: '$38 order added to POS',           t: '3:22' },
];

const CAPABILITIES = [
  'Answers every call',
  'Replies to every text',
  'Places orders in your POS',
  'Processes refunds',
  'Escalates emergencies',
  'Speaks every language',
];

/* ── Component ── */

interface ProductShowcaseSectionProps {
  onScrollToForm?: (e: React.MouseEvent) => void;
}

export const ProductShowcaseSection = ({ onScrollToForm }: ProductShowcaseSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const doubled = [...FEED, ...FEED];

  return (
    <Section ref={ref}>
      <Orb1 />
      <Orb2 />
      <Orb3 />

      <Inner $visible={visible}>
        <Layout>
          <HeaderArea>
            <Headline>Every call. Every text. Handled.</Headline>
            <Sub>
              WorkBuddy answers calls, replies to texts, places orders
              in your POS, and processes refunds automatically.
              When something's urgent, it calls you.
            </Sub>
          </HeaderArea>

          <DeviceArea>
            <DeviceWrap>
              <Pulse />
              <Frame>
                <Bar>
                  <BarLabel>WorkBuddy Live</BarLabel>
                  <LiveBadge><LiveDot /> Live</LiveBadge>
                </Bar>
                <LegendBar>
                  <LegendItem><LegendDot $c={COLOR.answered} /> Answered</LegendItem>
                  <LegendItem><LegendDot $c={COLOR.order} /> Order</LegendItem>
                  <LegendItem><LegendDot $c={COLOR.refund} /> Refund</LegendItem>
                  <LegendItem><LegendDot $c={COLOR.emergency} /> Urgent</LegendItem>
                  <LegendItem><LegendDot $c={COLOR.blocked} /> Blocked</LegendItem>
                </LegendBar>
                <Viewport>
                  <Track>
                    {doubled.map((e, i) => (
                      <FeedRow key={i}>
                        <ChannelWrap>
                          {e.ch === 'call' ? <PhoneIcon /> : <TextIcon />}
                        </ChannelWrap>
                        <RowContent>
                          <RowLabel>{e.l}</RowLabel>
                          <RowOutcome $c={COLOR[e.k]}>{e.o}</RowOutcome>
                        </RowContent>
                        <RowTime>{e.t}</RowTime>
                      </FeedRow>
                    ))}
                  </Track>
                </Viewport>
              </Frame>
            </DeviceWrap>
          </DeviceArea>

          <BottomArea>
            <Caps>
              {CAPABILITIES.map((cap, i) => (
                <CapItem key={i}>
                  <CheckIcon />
                  <CapText>{cap}</CapText>
                </CapItem>
              ))}
            </Caps>
            {onScrollToForm && (
              <CTARow>
                <CTAButton href="#form" onClick={onScrollToForm}>
                  Try WorkBuddy Free &rarr;
                </CTAButton>
              </CTARow>
            )}
          </BottomArea>
        </Layout>
      </Inner>
    </Section>
  );
};
