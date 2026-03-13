import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml, buildAddress } from '../utils.js';

export function renderLocationSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.latitude || !data.longitude) return '';
  const address = buildAddress(data);
  return `
    <section class="section section--location section--alt" id="location">
      <div class="wrap">
        <div class="location__layout">
          <div class="location__info">
            <span class="section__label">Find Us</span>
            <h2>Our Location</h2>
            ${address ? `<p class="location__address">${escapeHtml(address)}</p>` : ''}
            <a href="https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}" target="_blank" rel="noopener" class="btn btn-outline">Get Directions &rarr;</a>
          </div>
          <div class="location__map">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${data.latitude},${data.longitude}&zoom=15"
              width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" title="Map"></iframe>
          </div>
        </div>
      </div>
    </section>`;
}
