import type { BusinessData, CTAConfig } from '../types.js';
import { escapeHtml, renderStars } from '../utils.js';

function getInitials(name: string): string {
  return name.split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

export function renderReviewsSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.cached_reviews || data.cached_reviews.length === 0) return '';
  const reviews = data.cached_reviews.slice(0, 5);

  return `
    <section class="section section--reviews section--alt" id="reviews">
      <div class="wrap">
        <div class="section__header section__header--center">
          <span class="section__label">Testimonials</span>
          <h2>What Our Customers Say</h2>
          ${data.cached_rating && data.cached_review_count ? `
            <div class="reviews__aggregate">
              <span class="reviews__big-rating">${data.cached_rating.toFixed(1)}</span>
              <div class="reviews__aggregate-detail">
                <div class="reviews__aggregate-stars">${renderStars(data.cached_rating)}</div>
                <span class="reviews__aggregate-count">Based on ${data.cached_review_count} reviews</span>
              </div>
            </div>
          ` : ''}
        </div>
        <div class="reviews-grid">
          ${reviews.map(r => `
            <div class="review-card">
              <div class="review-card__quote">&ldquo;</div>
              <p class="review-card__text">${escapeHtml(r.text)}</p>
              <div class="review-card__footer">
                <div class="review-card__avatar">${getInitials(r.author)}</div>
                <div class="review-card__meta">
                  <span class="review-card__author">${escapeHtml(r.author)}</span>
                  <div class="review-card__stars">${renderStars(r.rating)}</div>
                </div>
                ${r.relative_time ? `<span class="review-card__time">${escapeHtml(r.relative_time)}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        ${data.google_place_id ? `<div class="section__actions"><a href="https://search.google.com/local/reviews?placeid=${escapeHtml(data.google_place_id)}" target="_blank" rel="noopener" class="btn btn-outline">See All Reviews on Google &rarr;</a></div>` : ''}
      </div>
    </section>`;
}
