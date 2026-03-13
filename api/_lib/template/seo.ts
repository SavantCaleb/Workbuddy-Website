import type { BusinessData } from './types.js';
import { escapeHtml, buildAddress } from './utils.js';

export function buildJsonLd(data: BusinessData, canonicalUrl: string): string {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': data.business_type || 'LocalBusiness',
    name: data.business_name,
    url: canonicalUrl,
  };

  if (data.phone) ld.telephone = data.phone;
  if (data.email) ld.email = data.email;
  if (data.website_url) ld.sameAs = data.website_url;
  if (data.tagline) ld.description = data.tagline;
  if (data.logo_url) ld.image = data.logo_url;
  if (data.year_established) ld.foundingDate = String(data.year_established);

  const address = buildAddress(data);
  if (address) {
    ld.address = {
      '@type': 'PostalAddress',
      ...(data.address_street && { streetAddress: data.address_street }),
      ...(data.address_city && { addressLocality: data.address_city }),
      ...(data.address_state && { addressRegion: data.address_state }),
      ...(data.address_zip && { postalCode: data.address_zip }),
      addressCountry: 'US',
    };
  }

  if (data.latitude && data.longitude) {
    ld.geo = {
      '@type': 'GeoCoordinates',
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  if (data.cached_rating && data.cached_review_count) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.cached_rating,
      reviewCount: data.cached_review_count,
    };
  }

  // Opening hours specification
  if (data.hours && Object.keys(data.hours).length > 0) {
    const dayMap: Record<string, string> = {
      monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
      thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
    };
    const specs = Object.entries(data.hours)
      .filter(([, v]) => v !== null)
      .map(([day, v]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[day] || day,
        opens: v!.open,
        closes: v!.close,
      }));
    if (specs.length > 0) ld.openingHoursSpecification = specs;
  }

  return JSON.stringify(ld);
}

export function buildFaqJsonLd(data: BusinessData): string | null {
  if (!data.faqs || data.faqs.length === 0) return null;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(faqLd);
}

export function buildMetaTags(data: BusinessData, canonicalUrl: string): string {
  const title = data.meta_title || `${data.business_name}${data.address_city ? ` in ${data.address_city}` : ''}`;
  const description = data.meta_description || data.tagline || `Contact ${data.business_name}${data.address_city ? ` in ${data.address_city}, ${data.address_state || ''}`.trim() : ''}. Call today!`;

  const ogImage = data.logo_url || data.gallery_photos?.[0]?.url || data.cached_photos?.[0] || '';

  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}" />` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${ogImage ? `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />` : ''}
  ${data.address_state ? `<meta name="geo.region" content="US-${escapeHtml(data.address_state)}" />` : ''}
  ${data.address_city ? `<meta name="geo.placename" content="${escapeHtml(data.address_city)}" />` : ''}`;
}
