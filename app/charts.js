// SVG charts for AtlasStat, drawn by hand — no chart library, no network.
// Every chart is a string of SVG returned to the view that asked for it, so the
// site's first load stays small and every chart works offline.

import { fmtNum, fmtShort } from './format.js';

const INK = '#12263f';
const MUTED = '#5d6f83';
const TEAL = '#0e7c7b';
const AMBER = '#e8a33d';
const GRID = '#dfe6ec';

// Escape text that goes into an SVG label.
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Horizontal bar chart: rows of { label, value, href?, highlight? }.
// `format` turns a value into its label text. Bars are links when href is set.
export function barChart(rows, { format = (v) => fmtNum(v), max = null, height = 26, gap = 8, color = TEAL, highlightColor = AMBER } = {}) {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  const labelW = Math.max(...rows.map((r) => r.label.length)) * 7 + 8;
  const w = 640;
  const valueW = 74;
  const barX = labelW;
  const barW = w - barX - valueW;
  let y = 0;
  const parts = rows.map((r) => {
    const bw = Math.max(2, (r.value / top) * barW);
    const fill = r.highlight ? highlightColor : color;
    const label = `<text x="${barX - 8}" y="${y + height / 2 + 4}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.label)}</text>`;
    const bar = `<rect x="${barX}" y="${y + 4}" width="${bw.toFixed(1)}" height="${height - 8}" rx="3" fill="${fill}"/>`;
    const val = `<text x="${barX + bw + 8}" y="${y + height / 2 + 4}" font-size="12" font-weight="600" fill="${INK}">${esc(format(r.value))}</text>`;
    const inner = label + bar + val;
    const wrapped = r.href
      ? `<a href="${esc(r.href)}" tabindex="0">${inner}<title>${esc(r.label)}: ${esc(format(r.value))}</title></a>`
      : inner;
    const row = `<g>${wrapped}</g>`;
    y += height + gap;
    return row;
  });
  return `<svg viewBox="0 0 ${w} ${y - gap}" role="img" aria-label="Bar chart" style="width:100%;height:auto;display:block">${parts.join('')}</svg>`;
}

// Line chart over a series of { x, y } points with labelled axes.
export function lineChart(points, { formatY = (v) => fmtNum(v), color = TEAL, yTicks = 4, height = 220 } = {}) {
  const w = 640;
  const padL = 56, padR = 14, padT = 14, padB = 28;
  const ys = points.map((p) => p.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  min -= span * 0.08;
  max += span * 0.08;
  const x = (i) => padL + (i / (points.length - 1)) * (w - padL - padR);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (height - padT - padB);
  const grid = [];
  for (let i = 0; i <= yTicks; i++) {
    const v = min + ((max - min) * i) / yTicks;
    const gy = y(v);
    grid.push(`<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}"/>`);
    grid.push(`<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(formatY(v))}</text>`);
  }
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.y).toFixed(1)}`).join(' ');
  const area = `${d} L${x(points.length - 1).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;
  const dots = points.map((p, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(p.y).toFixed(1)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${esc(p.x)}: ${esc(formatY(p.y))}</title></circle>`).join('');
  const xLabels = points.map((p, i) =>
    `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.x)}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Line chart" style="width:100%;height:auto;display:block">${grid.join('')}<path d="${area}" fill="${color}" opacity="0.08"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${xLabels}</svg>`;
}

// Grouped bars: one group per indicator, one bar per country.
// Each row is scaled to its own largest value (indicators live on different
// scales), and each group formats its values with its own function.
// groups: [{ label, values: [v1, v2, ...], format }], series: [{ label, color }].
export function groupedBars(groups, series, { format = (v) => fmtNum(v) } = {}) {
  const w = 640;
  const padL = 150, padR = 10, padT = 26, padB = 30;
  const rowH = 34;
  const height = padT + groups.length * rowH + padB;
  const valueW = 86;
  const slotW = (w - padL - padR - valueW) / series.length;
  const legend = series.map((s, i) =>
    `<rect x="${padL + i * 150}" y="6" width="12" height="12" rx="3" fill="${s.color}"/><text x="${padL + i * 150 + 18}" y="16" font-size="12" fill="${INK}">${esc(s.label)}</text>`).join('');
  const rows = groups.map((g, gi) => {
    const y = padT + gi * rowH;
    const groupMax = Math.max(...g.values);
    const fmt = g.format || format;
    const bars = g.values.map((v, si) => {
      const bw = Math.max(3, (v / groupMax) * (slotW - 8));
      const bx = padL + si * slotW;
      return `<rect x="${bx.toFixed(1)}" y="${y + 4}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${series[si].color}"><title>${esc(g.label)} — ${esc(series[si].label)}: ${esc(fmt(v))}</title></rect>`
        + (si === g.values.length - 1
          ? `<text x="${(bx + bw + 6).toFixed(1)}" y="${y + 19}" font-size="11" fill="${MUTED}">${esc(fmt(v))}</text>` : '');
    }).join('');
    return `<text x="${padL - 8}" y="${y + 19}" text-anchor="end" font-size="12" fill="${INK}">${esc(g.label)}</text>${bars}`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Comparison chart" style="width:100%;height:auto;display:block">${legend}${rows}</svg>`;
}

// Small sparkline for a series of numbers, used on the dashboard cards.
export function sparkline(values, { color = TEAL, width = 120, height = 36 } = {}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => (i / (values.length - 1)) * width;
  const y = (v) => 3 + (1 - (v - min) / span) * (height - 6);
  const d = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Trend" style="display:block"><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${x(values.length - 1).toFixed(1)}" cy="${y(values[values.length - 1]).toFixed(1)}" r="3" fill="${color}"/></svg>`;
}

// Stacked age-structure bar: shares [0-14, 15-64, 65+] with a legend.
export function ageStack(shares) {
  const colors = ['#2f9e8f', '#0e7c7b', '#e8a33d'];
  const labels = ['Aged 0–14', 'Aged 15–64', 'Aged 65+'];
  const w = 640;
  let x = 0;
  const segs = shares.map((s, i) => {
    const segW = (s / 100) * w;
    const rect = `<rect x="${x.toFixed(1)}" y="0" width="${segW.toFixed(1)}" height="26" fill="${colors[i]}" rx="${i === 0 ? '4 0 0 4' : i === 2 ? '0 4 4 0' : '0'}"><title>${labels[i]}: ${s}%</title></rect>`;
    const text = segW > 44 ? `<text x="${(x + segW / 2).toFixed(1)}" y="18" text-anchor="middle" font-size="12" font-weight="600" fill="#fff">${s}%</text>` : '';
    x += segW;
    return rect + text;
  }).join('');
  const legend = labels.map((l, i) =>
    `<span class="legend-item"><span class="swatch" style="background:${colors[i]}"></span>${l}</span>`).join('');
  return `<div class="age-stack"><svg viewBox="0 0 ${w} 26" role="img" aria-label="Age structure" style="width:100%;height:auto;display:block">${segs}</svg><div class="legend">${legend}</div></div>`;
}

export { fmtShort };
