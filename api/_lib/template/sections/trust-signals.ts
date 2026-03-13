import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderTrustSignals(data: BusinessData, _cta: CTAConfig): string {
  const badges: string[] = [];

  if (data.certifications && data.certifications.length > 0) {
    for (const cert of data.certifications) {
      badges.push(`<div class="trust-card">
        <div class="trust-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
        <span class="trust-card__text">${escapeHtml(cert)}</span>
      </div>`);
    }
  }

  if (data.license_number) {
    badges.push(`<div class="trust-card">
      <div class="trust-card__icon trust-card__icon--shield"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div>
      <span class="trust-card__text">License #${escapeHtml(data.license_number)}</span>
    </div>`);
  }

  if (data.insurance_verified) {
    badges.push(`<div class="trust-card">
      <div class="trust-card__icon trust-card__icon--shield"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div>
      <span class="trust-card__text">Insurance Verified</span>
    </div>`);
  }

  if (badges.length === 0) return '';

  return `
    <section class="section section--trust" id="trust">
      <div class="wrap">
        <div class="section__header section__header--center">
          <span class="section__label">Your Guarantee</span>
          <h2>Why Choose Us</h2>
        </div>
        <div class="trust-grid">
          ${badges.join('\n          ')}
        </div>
      </div>
    </section>`;
}
