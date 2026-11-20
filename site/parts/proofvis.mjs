// Drawings of real client results: map-rank grids, before/after bars and a line chart for the hero board.
import { esc } from './layout.mjs';

const rk = (r) => (r == null || r > 20 ? 5 : r <= 3 ? 1 : r <= 6 ? 2 : r <= 10 ? 3 : 4);
export function gridMap(cells, label) {
  const n = cells.length;
  return `<figure style="display:grid;gap:10px;justify-items:center;margin:0">
    <div class="grid-map"><div class="cells" style="grid-template-columns:repeat(${n},1fr)">${cells.flat().map((r) => `<span class="rk${rk(r)}">${r == null || r > 20 ? '20+' : r}</span>`).join('')}</div></div>
    ${label ? `<figcaption class="fine">${esc(label)}</figcaption>` : ''}
  </figure>`;
}

function bars(v) {
  const max = Math.max(v.before.value, v.after.value) || 1;
  const col = (x, to) => `<div style="display:grid;justify-items:center;gap:8px;align-content:end;height:100%">
    <b style="font-size:28px;letter-spacing:-.04em;${to ? 'color:var(--azure-ink)' : 'color:var(--soft)'}">${esc(x.show || x.value)}</b>
    <span style="width:64px;height:${Math.max(6, (180 * x.value) / max)}px;border-radius:14px;background:${to ? 'var(--azure-ink)' : 'var(--mist)'}"></span>
    <span class="fine" style="text-align:center;max-width:120px">${esc(x.label)}</span></div>`;
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;height:280px;align-items:end;width:100%;max-width:340px">${col(v.before)}${col(v.after, 1)}</div>`;
}

export function storyVis(s) {
  if (s.vis === 'grid') return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%">${gridMap(s.grid.before, s.grid.beforeLabel)}${gridMap(s.grid.after, s.grid.afterLabel)}</div>`;
  if (s.vis === 'bars') return bars(s.bars);
  if (s.vis === 'dots') return `<div class="vis-dots"><div class="line">${s.dots.days.map(() => '<span></span>').join('')}</div><div class="lbls"><span>${esc(s.dots.days[0])}</span><span>${esc(s.dots.days[s.dots.days.length - 1])}</span></div><p class="fine">${esc(s.dots.label)}</p></div>`;
  if (s.vis === 'stats') return `<div class="vis-stats">${s.statsVis.map((x) => `<div><b>${esc(x.v)}</b><span>${esc(x.k)}</span></div>`).join('')}</div>`;
  if (s.vis === 'line') return `<div style="width:100%;height:260px">${lineSvg(s.series, { invert: s.invert })}</div>`;
  return '';
}

function lineSvg(series, { invert = false, area = true } = {}) {
  const W = 1000, H = 260, pad = 6;
  const min = Math.min(...series), max = Math.max(...series);
  const y = (v) => { const t = (v - min) / ((max - min) || 1); return pad + (invert ? t : 1 - t) * (H - 2 * pad); };
  const x = (i) => pad + (i * (W - 2 * pad)) / Math.max(1, series.length - 1);
  const pts = series.map((v, i) => [x(i), y(v)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2; d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`; }
  const last = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#68B7CE" stop-opacity=".32"/><stop offset="1" stop-color="#68B7CE" stop-opacity="0"/></linearGradient></defs>
    ${[0.25, 0.5, 0.75].map((f) => `<line x1="0" x2="${W}" y1="${f * H}" y2="${f * H}" stroke="rgba(16,26,33,.07)" stroke-dasharray="4 6" vector-effect="non-scaling-stroke"/>`).join('')}
    ${area ? `<path d="${d} L${last[0]},${H} L${pts[0][0]},${H} Z" fill="url(#bg)"/>` : ''}
    <path data-draw d="${d}" fill="none" stroke="#1E6C8A" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"/>
  </svg>`;
}

export function boardChart(b) {
  return `${lineSvg(b.series, { invert: b.invert })}
  <div style="display:flex;justify-content:space-between;margin-top:8px" class="fine"><span>${esc(b.labels[0])}</span><span>${esc(b.labels[1])}</span></div>`;
}
