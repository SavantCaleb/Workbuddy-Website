import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderAboutSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.about_text) return '';

  const hasPhoto = !!data.owner_photo_url;

  return `
    <section class="section section--about section--alt" id="about">
      <div class="wrap">
        <div class="about__grid${hasPhoto ? ' about__grid--has-photo' : ''}">
          ${hasPhoto ? `
            <div class="about__photo-col">
              <div class="about__photo-frame">
                <img src="${escapeHtml(data.owner_photo_url!)}" alt="${data.owner_name ? escapeHtml(data.owner_name) : 'Owner'}" loading="lazy" />
              </div>
            </div>
          ` : ''}
          <div class="about__text-col">
            <span class="section__label">Our Story</span>
            <h2>About ${escapeHtml(data.business_name)}</h2>
            <p class="about__body">${escapeHtml(data.about_text)}</p>
            ${data.owner_name ? `
              <div class="about__attribution">
                <div class="about__sig-line"></div>
                <div class="about__sig">
                  <span class="about__owner-name">${escapeHtml(data.owner_name)}</span>
                  ${data.year_established ? `<span class="about__since">Serving the community since ${data.year_established}</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </section>`;
}
