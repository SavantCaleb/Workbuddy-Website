import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml } from '../utils.js';

export function renderGallerySection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.gallery_photos || data.gallery_photos.length === 0) return '';

  return `
    <section class="section section--gallery" id="gallery">
      <div class="wrap">
        <div class="section__header section__header--center">
          <span class="section__label">See Our Work</span>
          <h2>Gallery</h2>
        </div>
        <div class="gallery-scroll">
          ${data.gallery_photos.map((photo, i) => `
            <div class="gallery-card" onclick="openLightbox(${i})" role="button" tabindex="0" aria-label="View photo ${i + 1}">
              <img src="${escapeHtml(photo.url)}" alt="${photo.alt ? escapeHtml(photo.alt) : `${escapeHtml(data.business_name)} photo ${i + 1}`}" loading="lazy" />
              <div class="gallery-card__overlay">
                ${photo.caption ? `<span class="gallery-card__caption">${escapeHtml(photo.caption)}</span>` : ''}
                <span class="gallery-card__zoom">&#x2922;</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <div class="lightbox" id="lightbox" onclick="closeLightbox(event)">
      <button class="lightbox__close" aria-label="Close">&times;</button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous" onclick="navigateLightbox(-1)">&lsaquo;</button>
      <img class="lightbox__img" id="lightbox-img" src="" alt="" />
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next" onclick="navigateLightbox(1)">&rsaquo;</button>
    </div>`;
}
