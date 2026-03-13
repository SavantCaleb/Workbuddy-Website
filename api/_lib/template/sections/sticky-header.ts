import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderStickyHeader(data: BusinessData, cta: CTAConfig): string {
  const ctaHref = cta.primaryAction === 'url' && data.primary_cta_url
    ? escapeHtml(data.primary_cta_url)
    : cta.primaryAction === 'form'
      ? '#contact'
      : data.phone
        ? `tel:${escapeHtml(data.phone)}`
        : '#contact';

  const navLinks: Array<{ id: string; label: string }> = [];
  if (data.services?.length) navLinks.push({ id: 'services', label: 'Services' });
  if (data.about_text) navLinks.push({ id: 'about', label: 'About' });
  if (data.cached_reviews?.length) navLinks.push({ id: 'reviews', label: 'Reviews' });
  if (data.gallery_photos?.length) navLinks.push({ id: 'gallery', label: 'Gallery' });
  if (data.hours && Object.keys(data.hours).length > 0) navLinks.push({ id: 'hours', label: 'Hours' });
  navLinks.push({ id: 'contact', label: 'Contact' });

  return `
    <header class="sticky-header" id="sticky-header">
      <div class="sticky-header-inner">
        <a href="#" class="sticky-header-brand">
          ${data.logo_url ? `<img class="sticky-logo" src="${escapeHtml(data.logo_url)}" alt="${escapeHtml(data.business_name)}" />` : ''}
          <span class="sticky-name">${escapeHtml(data.business_name)}</span>
        </a>
        <nav class="sticky-nav" id="sticky-nav" aria-label="Main navigation">
          ${navLinks.map(l => `<a href="#${l.id}" class="nav-link">${l.label}</a>`).join('')}
        </nav>
        <div class="sticky-header-actions">
          ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" class="sticky-phone" data-track="call">${escapeHtml(data.phone)}</a>` : ''}
          <a href="${ctaHref}" class="btn btn-primary btn-sm"${cta.primaryAction === 'url' ? ' target="_blank" rel="noopener"' : ''} data-track="cta">${escapeHtml(cta.primaryText)}</a>
          <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-inner">
          ${navLinks.map(l => `<a href="#${l.id}" class="mobile-menu-link">${l.label}</a>`).join('')}
          ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" class="btn btn-outline btn-block" data-track="call">${escapeHtml(data.phone)}</a>` : ''}
          <a href="${ctaHref}" class="btn btn-primary btn-block" data-track="cta">${escapeHtml(cta.primaryText)}</a>
        </div>
      </div>
    </header>`;
}
