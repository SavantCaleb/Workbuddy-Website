import type { BusinessData } from './types.js';

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75 ? 1 : 0;
  const empty = 5 - full - half;
  const fullExtra = rating - full >= 0.75 ? 1 : 0;
  const actualFull = full + fullExtra;
  const actualHalf = fullExtra ? 0 : half;
  const actualEmpty = 5 - actualFull - actualHalf;

  let html = '';
  for (let i = 0; i < actualFull; i++) html += '<span class="star full">&#9733;</span>';
  for (let i = 0; i < actualHalf; i++) html += '<span class="star half">&#9733;</span>';
  for (let i = 0; i < actualEmpty; i++) html += '<span class="star empty">&#9734;</span>';
  return html;
}

export function buildAddress(data: BusinessData): string | null {
  const parts = [data.address_street, data.address_city, data.address_state, data.address_zip].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : null;
}

export function summarizeHours(hours: Record<string, { open: string; close: string } | null>): string | null {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const weekdays = days.slice(0, 5);
  const weekend = days.slice(5);

  const weekdayHours = weekdays.map(d => hours[d]).filter(Boolean);
  const weekendHours = weekend.map(d => hours[d]).filter(Boolean);

  if (weekdayHours.length === 0 && weekendHours.length === 0) return null;

  const allSameWeekday = weekdayHours.length === 5 &&
    weekdayHours.every(h => h && h.open === weekdayHours[0]!.open && h.close === weekdayHours[0]!.close);
  const allSameWeekend = weekendHours.length === 2 &&
    weekendHours.every(h => h && h.open === weekendHours[0]!.open && h.close === weekendHours[0]!.close);

  if (allSameWeekday && allSameWeekend) {
    const wd = weekdayHours[0]!;
    const we = weekendHours[0]!;
    if (wd.open === we.open && wd.close === we.close) {
      return `Open daily ${wd.open}\u2013${wd.close}`;
    }
    return `Mon\u2013Fri ${wd.open}\u2013${wd.close}, Sat\u2013Sun ${we.open}\u2013${we.close}`;
  }

  if (allSameWeekday) {
    const wd = weekdayHours[0]!;
    return `Mon\u2013Fri ${wd.open}\u2013${wd.close}`;
  }

  return null;
}
