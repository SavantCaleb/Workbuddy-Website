import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderServicesSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.services || data.services.length === 0) return '';

  const prices = data.service_prices || {};
  const showAll = data.services.length > 8;
  const visible = showAll ? data.services.slice(0, 8) : data.services;
  const hidden = showAll ? data.services.slice(8) : [];

  function renderCard(s: string, index: number, extraClass?: string): string {
    const price = prices[s];
    return `<div class="svc-card${extraClass ? ' ' + extraClass : ''}" style="animation-delay: ${index * 0.05}s">
          <div class="svc-card__body">
            <span class="svc-card__name">${escapeHtml(s)}</span>
            ${price ? `<span class="svc-card__price">${escapeHtml(price)}</span>` : ''}
          </div>
          <div class="svc-card__arrow">&rsaquo;</div>
        </div>`;
  }

  return `
    <section class="section section--services" id="services">
      <div class="wrap">
        <div class="section__header">
          <span class="section__label">What We Offer</span>
          <h2>Our Services</h2>
        </div>
        <div class="svc-grid">
          ${visible.map((s, i) => renderCard(s, i)).join('\n          ')}
          ${hidden.map((s, i) => renderCard(s, i + 8, 'svc-hidden')).join('\n          ')}
        </div>
        ${showAll ? `<div class="section__actions"><button class="btn btn-outline" onclick="this.closest('.section--services').querySelector('.svc-grid').classList.add('svc-expanded');this.parentElement.remove()">View All ${data.services.length} Services</button></div>` : ''}
      </div>
    </section>`;
}
