export const theme = {
  colors: {
    primary: {
      blue: '#007AFF',      // Apple Blue
      indigo: '#5856D6',    // Apple Indigo  
      black: '#1D1D1F',     // Apple Black
      white: '#FFFFFF',
    },
    accent: {
      orange: '#FF9500',    // Apple Orange
      green: '#30D158',     // Apple Green
      red: '#FF3B30',       // Apple Red
      purple: '#AF52DE',    // Apple Purple
    },
    neutral: {
      white: '#FFFFFF',
      gray100: '#F2F2F7',   // Apple Light Gray
      gray200: '#E5E5EA',   // Apple Medium Light Gray
      gray300: '#D1D1D6',   // Apple Medium Gray
      gray400: '#C7C7CC',   // Apple Medium Dark Gray
      gray500: '#AEAEB2',   // Apple Dark Gray
      gray600: '#8E8E93',   // Apple Very Dark Gray
      black: '#000000',
      label: '#1D1D1F',     // Primary text
      secondary: '#3C3C43',  // Secondary text
      tertiary: '#48484A',   // Tertiary text
    },
    surface: {
      primary: '#FFFFFF',
      secondary: '#F2F2F7',
      tertiary: '#FFFFFF',
      elevated: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
    sizes: {
      largeTitle: {
        desktop: '68px',     // Apple Large Title
        mobile: '48px',
      },
      title1: {
        desktop: '48px',     // Apple Title 1
        mobile: '32px',
      },
      title2: {
        desktop: '40px',     // Apple Title 2
        mobile: '28px',
      },
      title3: {
        desktop: '32px',     // Apple Title 3
        mobile: '24px',
      },
      headline: {
        desktop: '24px',     // Apple Headline
        mobile: '21px',
      },
      body: {
        desktop: '17px',     // Apple Body
        mobile: '17px',
      },
      callout: {
        desktop: '19px',     // Apple Callout
        mobile: '19px',
      },
      subhead: {
        desktop: '15px',     // Apple Subhead
        mobile: '15px',
      },
      footnote: {
        desktop: '13px',     // Apple Footnote
        mobile: '13px',
      },
      caption: {
        desktop: '12px',     // Apple Caption
        mobile: '12px',
      },
    },
    weights: {
      ultraLight: 100,
      thin: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
      black: 900,
    },
    lineHeight: {
      tight: 1.08333,      // Apple tight
      normal: 1.23529,     // Apple normal 
      relaxed: 1.38095,    // Apple relaxed
    },
  },
  spacing: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
    xxxxl: '80px',
    xxxxxl: '120px',
  },
  breakpoints: {
    mobile: '767px',
    tablet: '1023px',
    desktop: '1024px',
    large: '1440px',
  },
  borderRadius: {
    xs: '4px',
    s: '6px',
    m: '8px',
    l: '12px',
    xl: '16px',
    xxl: '20px',
    xxxl: '24px',
    pill: '999px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    xl: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
  },
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  maxWidth: {
    content: '1120px',     // Apple-style max width
    reading: '672px',      // Optimal reading width
    narrow: '512px',       // Narrow content
  },
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',      // Apple fast
    normal: '0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',     // Apple normal
    slow: '0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',       // Apple slow
    spring: '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring
  },
} as const;

export type Theme = typeof theme;