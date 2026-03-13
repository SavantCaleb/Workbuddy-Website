import type { BusinessData, CTAConfig } from '../types.js';

export function renderHoursSection(data: BusinessData, _cta: CTAConfig): string {
  if (!data.hours || Object.keys(data.hours).length === 0) return '';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const rows = days
    .filter(day => day.toLowerCase() in (data.hours || {}))
    .map(day => {
      const h = data.hours![day.toLowerCase()];
      const timeStr = h ? `${h.open} \u2013 ${h.close}` : 'Closed';
      const closedClass = !h ? ' hours-row--closed' : '';
      return `<div class="hours-row${closedClass}" data-day="${day.toLowerCase()}">
              <span class="hours-row__day">${day}</span>
              <span class="hours-row__sep"></span>
              <span class="hours-row__time">${timeStr}</span>
              <span class="hours-row__badge"></span>
            </div>`;
    })
    .join('\n            ');

  if (!rows) return '';

  return `
    <section class="section section--hours" id="hours">
      <div class="wrap">
        <div class="hours__layout">
          <div class="hours__text">
            <span class="section__label">Visit Us</span>
            <h2>Business Hours</h2>
            ${data.phone ? `<p class="hours__cta">Questions? Call <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
          </div>
          <div class="hours__card">
            ${rows}
          </div>
        </div>
      </div>
    </section>`;
}
