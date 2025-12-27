export const theme = {
  colors: {
    brand: {
      azure: '#67B7D1',      // Azure Blue - PANTONE 7702 C
      slate: '#324A5F',      // Deep Slate Blue - PANTONE 5405 C
      gold: '#DCAB58',       // Warm Honey Gold - PANTONE 7408 C
      black: '#111111',      // Black (17/17/17)
      white: '#FFFFFF',      // White (255/255/255)
    },
    primary: {
      azure: '#67B7D1',
      white: '#FFFFFF',
    },
    surface: {
      primary: '#F8F9FA',
      secondary: '#FFFFFF',
    },
    neutral: {
      label: '#324A5F',
      secondary: '#677888',
      tertiary: '#8B9AAB',
      gray200: '#E2E8F0',
      gray300: '#CBD5E0',
      gray400: '#A0AEC0',
    },
    bg: {
      default: '#FFFFFF',
      subtle: '#F8F9FA',     // Softer neutral background
      dark: '#324A5F',       // Using brand slate for dark sections
      card: '#FFFFFF',
    },
    text: {
      primary: '#324A5F',    // Using brand slate for primary text
      secondary: '#677888',  // Muted version of slate
      tertiary: '#8B9AAB',   // Even lighter slate
      inverse: '#FFFFFF',
      inverseSecondary: 'rgba(255, 255, 255, 0.8)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #67B7D1 0%, #324A5F 100%)',
      secondary: 'linear-gradient(135deg, #DCAB58 0%, #67B7D1 100%)',
      glow: 'radial-gradient(circle at 50% 50%, rgba(103, 183, 209, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
      goldGlow: 'radial-gradient(circle at 50% 50%, rgba(220, 171, 88, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
      darkGlow: 'radial-gradient(circle at 50% 50%, rgba(103, 183, 209, 0.1) 0%, rgba(50, 74, 95, 0) 70%)',
    }
  },
  typography: {
    fontFamily: {
      heading: "'Forma DJR Deck', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      caption: { desktop: '12px', mobile: '10px' },
      footnote: { desktop: '13px', mobile: '12px' },
      subhead: { desktop: '15px', mobile: '14px' },
      body: { desktop: '17px', mobile: '16px' },
      callout: { desktop: '16px', mobile: '15px' },
      headline: { desktop: '22px', mobile: '20px' },
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
    },
    tracking: {
      tight: '-0.02em',
      tighter: '-0.04em',
      normal: '0',
      wide: '0.02em',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    s: '8px',
    md: '16px',
    m: '16px',
    lg: '24px',
    l: '24px',
    xl: '32px',
    '2xl': '48px',
    xxl: '48px',
    xxxl: '64px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    mobile: '768px',
  },
  layout: {
    maxWidth: '1280px',     // Wider for comprehensive tech feel
    pagePadding: '24px',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
    medium: '0 12px 40px rgba(50, 74, 95, 0.08)',
    glow: '0 0 40px rgba(103, 183, 209, 0.3)',
  },
  transitions: {
    smooth: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    fast: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    default: '0.2s ease',
    normal: '0.2s ease',
  },
  borderRadius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    l: '12px',
    xl: '16px',
  },
  blur: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  maxWidth: {
    content: '1280px',
  }
} as const;
