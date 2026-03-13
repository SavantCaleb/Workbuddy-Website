interface BusinessData {
  id: string;
  slug: string;
  business_name: string;
  tagline?: string;
  phone?: string;
  email?: string;
  website_url?: string;
  industry?: string;
  business_type?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  latitude?: number;
  longitude?: number;
  services?: string[];
  hours?: Record<string, { open: string; close: string } | null>;
  google_place_id?: string;
  cached_reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    time?: string;
    relative_time?: string;
  }>;
  cached_rating?: number;
  cached_review_count?: number;
  cached_photos?: string[];
  logo_url?: string;
  photos?: string[];
  meta_title?: string;
  meta_description?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75 ? 1 : 0;
  const empty = 5 - full - half;
  const fullExtra = rating - full >= 0.75 ? 1 : 0;
  const actualFull = full + fullExtra;
  const actualHalf = fullExtra ? 0 : half;
  const actualEmpty = 5 - actualFull - actualHalf;

  let html = '';
  for (let i = 0; i < actualFull; i++) html += '<span class="star full">★</span>';
  for (let i = 0; i < actualHalf; i++) html += '<span class="star half">★</span>';
  for (let i = 0; i < actualEmpty; i++) html += '<span class="star empty">☆</span>';
  return html;
}

function buildAddress(data: BusinessData): string | null {
  const parts = [data.address_street, data.address_city, data.address_state, data.address_zip].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : null;
}

function buildJsonLd(data: BusinessData, canonicalUrl: string): string {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': data.business_type || 'LocalBusiness',
    name: data.business_name,
    url: canonicalUrl,
  };

  if (data.phone) ld.telephone = data.phone;
  if (data.email) ld.email = data.email;
  if (data.website_url) ld.sameAs = data.website_url;
  if (data.tagline) ld.description = data.tagline;
  if (data.logo_url) ld.image = data.logo_url;

  const address = buildAddress(data);
  if (address) {
    ld.address = {
      '@type': 'PostalAddress',
      ...(data.address_street && { streetAddress: data.address_street }),
      ...(data.address_city && { addressLocality: data.address_city }),
      ...(data.address_state && { addressRegion: data.address_state }),
      ...(data.address_zip && { postalCode: data.address_zip }),
      addressCountry: 'US',
    };
  }

  if (data.latitude && data.longitude) {
    ld.geo = {
      '@type': 'GeoCoordinates',
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  if (data.cached_rating && data.cached_review_count) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.cached_rating,
      reviewCount: data.cached_review_count,
    };
  }

  return JSON.stringify(ld);
}

function renderHeroSection(data: BusinessData): string {
  const address = buildAddress(data);
  const hasRating = data.cached_rating && data.cached_review_count;

  return `
    <section class="hero">
      ${data.logo_url ? `<img class="hero-logo" src="${escapeHtml(data.logo_url)}" alt="${escapeHtml(data.business_name)} logo" />` : ''}
      <h1>${escapeHtml(data.business_name)}</h1>
      ${data.tagline ? `<p class="tagline">${escapeHtml(data.tagline)}</p>` : ''}
      ${hasRating ? `
        <div class="rating">
          ${renderStars(data.cached_rating!)}
          <span class="rating-text">${data.cached_rating!.toFixed(1)} (${data.cached_review_count} reviews)</span>
        </div>
      ` : ''}
      ${address ? `<p class="address">${escapeHtml(address)}</p>` : ''}
      <div class="hero-actions">
        ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" class="btn btn-primary" data-track="call">${escapeHtml(data.phone)}</a>` : ''}
        ${address && data.latitude && data.longitude ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}" target="_blank" rel="noopener" class="btn btn-secondary">Get Directions</a>` : ''}
      </div>
    </section>`;
}

function renderServicesSection(data: BusinessData): string {
  if (!data.services || data.services.length === 0) return '';
  return `
    <section class="services" id="services">
      <h2>Services</h2>
      <ul class="services-list">
        ${data.services.map(s => `<li>${escapeHtml(s)}</li>`).join('\n        ')}
      </ul>
    </section>`;
}

function renderHoursSection(data: BusinessData): string {
  if (!data.hours || Object.keys(data.hours).length === 0) return '';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const rows = days
    .filter(day => day.toLowerCase() in (data.hours || {}))
    .map(day => {
      const h = data.hours![day.toLowerCase()];
      const timeStr = h ? `${h.open} – ${h.close}` : 'Closed';
      return `<tr data-day="${day.toLowerCase()}"><td>${day}</td><td>${timeStr}</td><td class="open-indicator"></td></tr>`;
    })
    .join('\n          ');

  if (!rows) return '';

  return `
    <section class="hours" id="hours">
      <h2>Hours</h2>
      <table class="hours-table">
        <tbody>
          ${rows}
        </tbody>
      </table>
    </section>`;
}

function renderLocationSection(data: BusinessData): string {
  if (!data.latitude || !data.longitude) return '';
  const address = buildAddress(data);
  return `
    <section class="location" id="location">
      <h2>Location</h2>
      ${address ? `<p class="location-address">${escapeHtml(address)}</p>` : ''}
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${data.latitude},${data.longitude}&zoom=15"
          width="100%" height="300" style="border:0;" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade" title="Map"></iframe>
      </div>
    </section>`;
}

function renderReviewsSection(data: BusinessData): string {
  if (!data.cached_reviews || data.cached_reviews.length === 0) return '';
  const reviews = data.cached_reviews.slice(0, 5);
  return `
    <section class="reviews" id="reviews">
      <h2>Reviews</h2>
      <div class="reviews-grid">
        ${reviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <span class="review-author">${escapeHtml(r.author)}</span>
              <span class="review-stars">${renderStars(r.rating)}</span>
            </div>
            <p class="review-text">${escapeHtml(r.text)}</p>
            ${r.relative_time ? `<span class="review-time">${escapeHtml(r.relative_time)}</span>` : ''}
          </div>
        `).join('')}
      </div>
      ${data.google_place_id ? `<a href="https://search.google.com/local/reviews?placeid=${escapeHtml(data.google_place_id)}" target="_blank" rel="noopener" class="see-all-link">See all reviews on Google →</a>` : ''}
    </section>`;
}

function renderContactSection(data: BusinessData): string {
  return `
    <section class="contact" id="contact">
      <h2>Contact Us</h2>
      <form id="contact-form" class="contact-form">
        <input type="hidden" name="slug" value="${escapeHtml(data.slug)}" />
        <div class="form-group">
          <label for="visitor_name">Name *</label>
          <input type="text" id="visitor_name" name="visitor_name" required placeholder="Your name" />
        </div>
        <div class="form-group">
          <label for="visitor_phone">Phone</label>
          <input type="tel" id="visitor_phone" name="visitor_phone" placeholder="Your phone number" />
        </div>
        <div class="form-group">
          <label for="visitor_message">Message</label>
          <textarea id="visitor_message" name="visitor_message" rows="4" placeholder="How can we help?"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
        <div id="form-status" class="form-status" aria-live="polite"></div>
      </form>
    </section>`;
}

function renderFooter(): string {
  return `
    <footer class="page-footer">
      <p>Powered by <a href="https://getworkbuddy.com" target="_blank" rel="noopener">WorkBuddy</a> — Get your business online for $29/mo</p>
    </footer>`;
}

function getStyles(): string {
  return `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #324A5F;
      background: #FFFFFF;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }

    h1, h2, h3 {
      font-family: 'Forma DJR Deck', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 8px; }
    h2 { font-size: 1.75rem; font-weight: 600; margin-bottom: 16px; color: #324A5F; }

    a { color: #67B7D1; text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Hero */
    .hero {
      text-align: center;
      padding: 48px 0 32px;
    }
    .hero-logo {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      object-fit: cover;
      margin-bottom: 16px;
    }
    .tagline {
      font-size: 1.25rem;
      color: #677888;
      margin-bottom: 12px;
    }
    .address {
      color: #677888;
      margin-bottom: 16px;
    }
    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .star.full { color: #DCAB58; }
    .star.half { color: #DCAB58; opacity: 0.6; }
    .star.empty { color: #ccc; }
    .rating-text { color: #677888; font-size: 0.95rem; }

    .hero-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .btn-primary {
      background: #67B7D1;
      color: #FFFFFF;
    }
    .btn-primary:hover {
      background: #5aa8c2;
      text-decoration: none;
    }
    .btn-secondary {
      background: #F8F9FA;
      color: #324A5F;
      border: 1px solid #e2e6ea;
    }
    .btn-secondary:hover {
      background: #e9ecef;
      text-decoration: none;
    }

    /* Sections */
    section {
      padding: 32px 0;
      border-top: 1px solid #F0F2F4;
    }
    .hero { border-top: none; }

    /* Services */
    .services-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 12px;
    }
    .services-list li {
      padding: 12px 16px;
      background: #F8F9FA;
      border-radius: 8px;
      font-size: 0.95rem;
    }

    /* Hours */
    .hours-table {
      width: 100%;
      max-width: 500px;
      border-collapse: collapse;
    }
    .hours-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #F0F2F4;
      font-size: 0.95rem;
    }
    .hours-table tr:last-child td { border-bottom: none; }
    .open-indicator {
      width: 80px;
      text-align: right;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .open-indicator.open { color: #28a745; }
    .open-indicator.closed { color: #677888; }

    /* Location */
    .map-container {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      margin-top: 12px;
    }
    .map-container iframe { display: block; }
    .location-address { color: #677888; margin-bottom: 8px; }

    /* Reviews */
    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .review-card {
      background: #F8F9FA;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .review-author { font-weight: 600; }
    .review-text {
      font-size: 0.95rem;
      color: #677888;
      line-height: 1.5;
    }
    .review-time { font-size: 0.8rem; color: #999; margin-top: 8px; display: block; }
    .see-all-link { display: inline-block; margin-top: 16px; font-weight: 500; }

    /* Contact Form */
    .contact-form {
      max-width: 500px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 4px;
      font-size: 0.95rem;
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #e2e6ea;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      color: #324A5F;
      transition: border-color 0.2s ease;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #67B7D1;
      box-shadow: 0 0 0 3px rgba(103, 183, 209, 0.15);
    }
    .form-status {
      margin-top: 12px;
      font-size: 0.95rem;
    }
    .form-status.success { color: #28a745; }
    .form-status.error { color: #dc3545; }

    /* Footer */
    .page-footer {
      text-align: center;
      padding: 32px 0;
      border-top: 1px solid #F0F2F4;
      color: #999;
      font-size: 0.85rem;
    }
    .page-footer a { color: #67B7D1; }

    /* Paused Page */
    .paused-page {
      text-align: center;
      padding: 120px 24px;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .paused-page h1 { font-size: 1.5rem; color: #677888; font-weight: 500; }
    .paused-page p { color: #999; margin-top: 8px; }

    /* 404 */
    .not-found {
      text-align: center;
      padding: 120px 24px;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .not-found h1 { font-size: 4rem; color: #e2e6ea; }
    .not-found p { color: #677888; margin-top: 8px; }

    /* Mobile */
    @media (max-width: 768px) {
      h1 { font-size: 1.75rem; }
      h2 { font-size: 1.35rem; }
      .hero { padding: 32px 0 24px; }
      .hero-actions { flex-direction: column; align-items: center; }
      .btn { width: 100%; max-width: 320px; justify-content: center; }
      .services-list { grid-template-columns: 1fr; }
      .reviews-grid { grid-template-columns: 1fr; }
      .hours-table { max-width: 100%; }
    }
  `;
}

function getScript(slug: string): string {
  return `
    (function() {
      // Page view tracking
      try {
        navigator.sendBeacon('/api/track', JSON.stringify({ slug: '${slug}' }));
      } catch(e) {}

      // Contact form
      var form = document.getElementById('contact-form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var status = document.getElementById('form-status');
          var btn = form.querySelector('button[type="submit"]');
          btn.disabled = true;
          btn.textContent = 'Sending...';
          status.textContent = '';
          status.className = 'form-status';

          var data = {
            slug: '${slug}',
            visitor_name: form.visitor_name.value,
            visitor_phone: form.visitor_phone.value,
            visitor_message: form.visitor_message.value
          };

          fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              status.textContent = 'Message sent! We\\'ll be in touch soon.';
              status.className = 'form-status success';
              form.reset();
            } else {
              status.textContent = res.error || 'Something went wrong. Please try again.';
              status.className = 'form-status error';
            }
          })
          .catch(function() {
            status.textContent = 'Something went wrong. Please try again.';
            status.className = 'form-status error';
          })
          .finally(function() {
            btn.disabled = false;
            btn.textContent = 'Send Message';
          });
        });
      }

      // Click-to-call tracking
      document.querySelectorAll('[data-track="call"]').forEach(function(el) {
        el.addEventListener('click', function() {
          try {
            navigator.sendBeacon('/api/track', JSON.stringify({ slug: '${slug}', event: 'call_click' }));
          } catch(e) {}
        });
      });

      // Open Now indicator
      try {
        var rows = document.querySelectorAll('.hours-table tr[data-day]');
        if (rows.length) {
          var now = new Date();
          var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
          var today = days[now.getDay()];
          rows.forEach(function(row) {
            var indicator = row.querySelector('.open-indicator');
            if (!indicator) return;
            if (row.getAttribute('data-day') === today) {
              var cells = row.querySelectorAll('td');
              var timeText = cells[1] ? cells[1].textContent.trim() : '';
              if (timeText !== 'Closed') {
                indicator.textContent = 'Today';
                indicator.className = 'open-indicator open';
              } else {
                indicator.textContent = 'Closed';
                indicator.className = 'open-indicator closed';
              }
            }
          });
        }
      } catch(e) {}
    })();
  `;
}

export function renderBusinessPage(data: BusinessData): string {
  const canonicalUrl = `https://getworkbuddy.com/s/${data.slug}`;
  const title = data.meta_title || `${data.business_name}${data.address_city ? ` in ${data.address_city}` : ''}`;
  const description = data.meta_description || data.tagline || `Contact ${data.business_name}${data.address_city ? ` in ${data.address_city}, ${data.address_state || ''}`.trim() : ''}. Call today!`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  ${data.logo_url ? `<meta property="og:image" content="${escapeHtml(data.logo_url)}" />` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${buildJsonLd(data, canonicalUrl)}</script>
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    ${renderHeroSection(data)}
    ${renderServicesSection(data)}
    ${renderHoursSection(data)}
    ${renderLocationSection(data)}
    ${renderReviewsSection(data)}
    ${renderContactSection(data)}
    ${renderFooter()}
  </div>
  <script>${getScript(data.slug)}</script>
</body>
</html>`;
}

export function renderPausedPage(businessName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(businessName)}</title>
  <meta name="robots" content="noindex" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="paused-page">
      <h1>${escapeHtml(businessName)}</h1>
      <p>This page is currently inactive.</p>
    </div>
    ${renderFooter()}
  </div>
</body>
</html>`;
}

export function renderNotFound(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found</title>
  <meta name="robots" content="noindex" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <a href="https://getworkbuddy.com" style="margin-top:16px;">Go to WorkBuddy</a>
    </div>
  </div>
</body>
</html>`;
}
