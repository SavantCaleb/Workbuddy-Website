import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderFaqSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.faqs || data.faqs.length === 0) return '';

  return `
    <section class="section section--faq" id="faq">
      <div class="wrap">
        <div class="section__header section__header--center">
          <span class="section__label">Common Questions</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="faq-list">
          ${data.faqs.map((faq, i) => `
            <details class="faq-item">
              <summary>
                <span class="faq-item__num">${String(i + 1).padStart(2, '0')}</span>
                <span class="faq-item__q">${escapeHtml(faq.question)}</span>
                <span class="faq-item__toggle"></span>
              </summary>
              <div class="faq-item__answer">
                <p>${escapeHtml(faq.answer)}</p>
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    </section>`;
}
