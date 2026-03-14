import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml, renderStars, buildAddress, extractPhotoUrl } from '../utils.js';

export function renderHeroSection(data: BusinessData, cta: CTAConfig): string {
  const address = buildAddress(data);
  const rating = data.cached_rating ? Number(data.cached_rating) : null;
  const hasRating = rating && data.cached_review_count;
  const bgImage = data.gallery_photos?.[0]?.url || extractPhotoUrl(data.cached_photos?.[0]);

  const ctaHref = cta.primaryAction === 'url' && data.primary_cta_url
    ? escapeHtml(data.primary_cta_url)
    : cta.primaryAction === 'form'
      ? '#contact'
      : data.phone
        ? `tel:${escapeHtml(data.phone)}`
        : '#contact';

  return `
    <section class="hero${bgImage ? ' hero--has-bg' : ''}"${bgImage ? ` style="--hero-bg: url('${escapeHtml(bgImage)}')"` : ''}>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        ${data.logo_url ? `<img class="hero__logo" src="${escapeHtml(data.logo_url)}" alt="${escapeHtml(data.business_name)} logo" />` : ''}
        <h1 class="hero__title">${escapeHtml(data.business_name)}</h1>
        ${data.tagline ? `<p class="hero__tagline">${escapeHtml(data.tagline)}</p>` : ''}
        ${hasRating ? `
          <div class="hero__rating">
            <div class="hero__stars">${renderStars(rating!)}</div>
            <span class="hero__rating-text">${rating!.toFixed(1)} &middot; ${data.cached_review_count} reviews</span>
          </div>
        ` : ''}
        ${address ? `<p class="hero__address">${escapeHtml(address)}</p>` : ''}
        <div class="hero__actions">
          <a href="${ctaHref}" class="btn btn-primary btn-lg"${cta.primaryAction === 'url' ? ' target="_blank" rel="noopener"' : ''} data-track="cta">${escapeHtml(cta.primaryText)}</a>
          ${address && data.latitude && data.longitude
            ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}" target="_blank" rel="noopener" class="btn btn-ghost">Get Directions</a>`
            : `<a href="#contact" class="btn btn-ghost">Learn More</a>`}
        </div>
      </div>
      <div class="hero__fade"></div>
    </section>`;
}
