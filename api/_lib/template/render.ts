import type { BusinessData, SectionRenderer } from './types.js';
import { escapeHtml } from './utils.js';
import { getBusinessCategory } from './config/industry-map.js';
import { getCTAConfig } from './config/cta-config.js';
import { getSectionOrder, type SectionName } from './config/section-order.js';
import { buildJsonLd, buildFaqJsonLd, buildMetaTags } from './seo.js';
import { getStyles } from './styles.js';
import { getScripts } from './scripts.js';

// Section renderers
import { renderStickyHeader } from './sections/sticky-header.js';
import { renderHeroSection } from './sections/hero.js';
import { renderSocialProofBar } from './sections/social-proof-bar.js';
import { renderServicesSection } from './sections/services.js';
import { renderAboutSection } from './sections/about.js';
import { renderTrustSignals } from './sections/trust-signals.js';
import { renderGallerySection } from './sections/gallery.js';
import { renderReviewsSection } from './sections/reviews.js';
import { renderFaqSection } from './sections/faq.js';
import { renderHoursSection } from './sections/hours.js';
import { renderLocationSection } from './sections/location.js';
import { renderContactSection } from './sections/contact.js';
import { renderFooter } from './sections/footer.js';

const SECTION_RENDERERS: Record<SectionName, SectionRenderer> = {
  'sticky-header': renderStickyHeader,
  'hero': renderHeroSection,
  'social-proof-bar': renderSocialProofBar,
  'services': renderServicesSection,
  'about': renderAboutSection,
  'trust-signals': renderTrustSignals,
  'gallery': renderGallerySection,
  'reviews': renderReviewsSection,
  'faq': renderFaqSection,
  'hours': renderHoursSection,
  'location': renderLocationSection,
  'contact': renderContactSection,
  'footer': renderFooter,
};

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />`;

export function renderBusinessPage(data: BusinessData): string {
  const canonicalUrl = `https://getworkbuddy.com/s/${data.slug}`;
  const category = getBusinessCategory(data.industry);
  const cta = getCTAConfig(category, data);
  const sectionOrder = getSectionOrder(category);

  const metaTags = buildMetaTags(data, canonicalUrl);
  const jsonLd = buildJsonLd(data, canonicalUrl);
  const faqJsonLd = buildFaqJsonLd(data);

  // Render sections in order
  const sectionHtml = sectionOrder
    .map(name => {
      const renderer = SECTION_RENDERERS[name];
      return renderer(data, cta);
    })
    .filter(html => html.length > 0)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaTags}
  ${FONT_LINK}
  <script type="application/ld+json">${jsonLd}</script>
  ${faqJsonLd ? `<script type="application/ld+json">${faqJsonLd}</script>` : ''}
  <style>${getStyles()}</style>
</head>
<body>
  ${sectionHtml}
  <script>${getScripts(data, cta)}</script>
</body>
</html>`;
}

export function renderPausedPage(businessName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(businessName)}</title>
  <meta name="robots" content="noindex" />
  ${FONT_LINK}
  <style>${getStyles()}</style>
</head>
<body>
  <div class="paused-page">
    <h1>${escapeHtml(businessName)}</h1>
    <p>This page is currently inactive.</p>
  </div>
</body>
</html>`;
}

export function renderNotFound(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found</title>
  <meta name="robots" content="noindex" />
  ${FONT_LINK}
  <style>${getStyles()}</style>
</head>
<body>
  <div class="not-found">
    <h1>404</h1>
    <p>This page doesn&rsquo;t exist.</p>
    <a href="https://getworkbuddy.com">Go to WorkBuddy</a>
  </div>
</body>
</html>`;
}
