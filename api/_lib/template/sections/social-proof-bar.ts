import type { BusinessData, CTAConfig } from '../types.js';
import { renderStars } from '../utils.js';

export function renderSocialProofBar(data: BusinessData, _cta: CTAConfig): string {
  const pills: string[] = [];

  if (data.cached_rating && data.cached_review_count) {
    pills.push(`<div class="proof__item">
      <div class="proof__stars">${renderStars(data.cached_rating)}</div>
      <div class="proof__label"><strong>${data.cached_rating.toFixed(1)}</strong> (${data.cached_review_count} reviews)</div>
    </div>`);
  }

  if (data.year_established) {
    const years = new Date().getFullYear() - data.year_established;
    pills.push(`<div class="proof__item">
      <div class="proof__number">${years}+</div>
      <div class="proof__label">Years in Business</div>
    </div>`);
  }

  if (data.customers_served) {
    const formatted = data.customers_served >= 1000
      ? `${Math.floor(data.customers_served / 1000)}k+`
      : `${data.customers_served}+`;
    pills.push(`<div class="proof__item">
      <div class="proof__number">${formatted}</div>
      <div class="proof__label">Customers Served</div>
    </div>`);
  }

  if (data.certifications && data.certifications.length > 0) {
    pills.push(`<div class="proof__item proof__item--cert">
      <div class="proof__icon">&#10003;</div>
      <div class="proof__label">${data.certifications[0]}</div>
    </div>`);
  }

  if (data.is_emergency_service) {
    pills.push(`<div class="proof__item proof__item--emergency">
      <div class="proof__icon">&#9679;</div>
      <div class="proof__label">24/7 Emergency Service</div>
    </div>`);
  }

  if (pills.length === 0) return '';

  return `
    <div class="proof-bar">
      <div class="wrap">
        <div class="proof-bar__inner">
          ${pills.join('')}
        </div>
      </div>
    </div>`;
}
