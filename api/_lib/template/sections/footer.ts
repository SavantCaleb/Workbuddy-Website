import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml, summarizeHours } from '../utils.js';

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook', instagram: 'Instagram', twitter: 'Twitter',
  linkedin: 'LinkedIn', youtube: 'YouTube', tiktok: 'TikTok',
  yelp: 'Yelp', google: 'Google', pinterest: 'Pinterest', nextdoor: 'Nextdoor',
};

export function renderFooter(data: BusinessData, _cta: CTAConfig): string {
  const hasSocial = data.social_links && Object.keys(data.social_links).length > 0;
  const hasCities = data.service_area_cities && data.service_area_cities.length > 0;
  const hoursSummary = data.hours ? summarizeHours(data.hours) : null;

  const quickLinks = [
    data.services?.length ? { id: 'services', label: 'Services' } : null,
    data.about_text ? { id: 'about', label: 'About' } : null,
    data.cached_reviews?.length ? { id: 'reviews', label: 'Reviews' } : null,
    data.gallery_photos?.length ? { id: 'gallery', label: 'Gallery' } : null,
    data.hours && Object.keys(data.hours).length > 0 ? { id: 'hours', label: 'Hours' } : null,
    { id: 'contact', label: 'Contact' },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  return `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div class="footer__brand">
            ${data.logo_url ? `<img class="footer__logo" src="${escapeHtml(data.logo_url)}" alt="${escapeHtml(data.business_name)}" />` : ''}
            <h3 class="footer__name">${escapeHtml(data.business_name)}</h3>
            ${data.tagline ? `<p class="footer__tagline">${escapeHtml(data.tagline)}</p>` : ''}
            ${hasSocial ? `
              <div class="footer__social">
                ${Object.entries(data.social_links!).map(([platform, url]) => {
                  const label = SOCIAL_LABELS[platform] || platform;
                  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="footer__social-link" aria-label="${escapeHtml(label)}">${escapeHtml(label)}</a>`;
                }).join('')}
              </div>
            ` : ''}
          </div>
          <div class="footer__col">
            <h4 class="footer__heading">Quick Links</h4>
            <ul class="footer__links">
              ${quickLinks.map(s => `<li><a href="#${s.id}">${s.label}</a></li>`).join('')}
            </ul>
          </div>
          <div class="footer__col">
            <h4 class="footer__heading">Contact</h4>
            ${data.phone ? `<p class="footer__detail"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
            ${data.email ? `<p class="footer__detail"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>` : ''}
            ${hoursSummary ? `<p class="footer__detail">${escapeHtml(hoursSummary)}</p>` : ''}
          </div>
          ${hasCities ? `
            <div class="footer__col">
              <h4 class="footer__heading">Service Area</h4>
              <p class="footer__detail">${data.service_area_cities!.map(c => escapeHtml(c)).join(' &bull; ')}</p>
            </div>
          ` : ''}
        </div>
        <div class="footer__bottom">
          <span>&copy; ${new Date().getFullYear()} ${escapeHtml(data.business_name)}. All rights reserved.</span>
          <div class="footer__legal">
            <a href="https://getworkbuddy.com/privacy" target="_blank" rel="noopener">Privacy</a>
            <a href="https://getworkbuddy.com/terms" target="_blank" rel="noopener">Terms</a>
            <span class="footer__powered">Powered by <a href="https://getworkbuddy.com" target="_blank" rel="noopener">WorkBuddy</a></span>
          </div>
        </div>
      </div>
    </footer>`;
}
