import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${theme.typography.fontFamily.body};
    background-color: ${theme.colors.bg.default};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
    overflow-x: hidden;
  }

  /* Lenis recommended styles */
  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.heading};
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.weights.semibold};
    letter-spacing: ${theme.typography.tracking.tight};
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::selection {
    background: ${theme.colors.brand.azure}40; /* 40% opacity */
    color: ${theme.colors.brand.black};
  }
`;


