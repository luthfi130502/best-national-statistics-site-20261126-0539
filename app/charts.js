// NusaStat charts — grafik SVG digambar murni dari data, tanpa library.
// Semua fungsi mengembalikan string SVG yang siap disisipkan ke halaman.
const NS = "http://www.w3.org/2000/svg";
const PALETTE = ["#0e7c7b", "#0b2a4a", "#e8a317", "#4a90b8", "#c96a3b", "#6a9e6a", "#8a6fb8", "#b3372f", "#3d7a5c", "#d4a017"];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmtNum(v, decimals = 2) {
  return v.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Grafik garis dengan area di bawahnya, label sumbu, dan titik nilai.
export function lineChart(series, opts = {}) {
  const w = opts.width || 640, h = opts.height || 300;
  const padL = 46, padR = 14, padT = 14, padB = 30;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = series.map((d) => d.v);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (min > 0 && min / max > 0.6) min = Math.floor(min * 0.92);
  else if (min >= 0) min = Math.min(0, Math.floor(min));
  max = Math.ceil(max * 1.05);
  const x = (i) => padL + (i / (series.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const color = opts.color || "#0e7c7b";
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(" ");
  const area = `${padL},${padT + ih} ` + points + ` ${x(series.length - 1).toFixed(1)},${padT + ih}`;
  const grid = [0, 1, 2, 3, 4].map((g) => {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e6ebee" stroke-width="1"/>` +
      `<text x="${padL - 7}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5b6b7a">${fmtNum(gv, opts.decimals ?? 1)}</text>`;
  }).join("");
  const labels = series.map((d, i) =>
    `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5b6b7a">${d.year}</text>`).join("");
  const dots = series.map((d, i) =>
    `<circle cx="${x(i)}" cy="${y(d.v)}" r="3.6" fill="#fff" stroke="${color}" stroke-width="2.2"/>` +
    `<text x="${x(i)}" y="${y(d.v) - 9}" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${fmtNum(d.v, opts.decimals ?? 1)}</text>`).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || "Grafik garis")}" xmlns="${NS}">` +
    `${grid}<polygon points="${area}" fill="${color}" opacity="0.10"/>` +
    `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>` +
    `${dots}${labels}</svg>`;
}

// Grafik batang vertikal dengan nilai di atas tiap batang.
export function barChart(series, opts = {}) {
  const w = opts.width || 640, h = opts.height || 300;
  const padL = 46, padR = 10, padT = 22, padB = 30;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = series.map((d) => d.v);
  const max = Math.ceil(Math.max(...vals) * 1.08);
  const min = Math.min(0, Math.floor(Math.min(...vals) * 1.08));
  const slot = iw / series.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const grid = [0, 1, 2, 3, 4].map((g) => {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e6ebee" stroke-width="1"/>` +
      `<text x="${padL - 7}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5b6b7a">${fmtNum(gv, opts.decimals ?? 0)}</text>`;
  }).join("");
  const bars = series.map((d, i) => {
    const cx = padL + slot * i + slot / 2;
    const color = d.v < 0 ? "#b3372f" : (opts.color || PALETTE[i % PALETTE.length]);
    const top = Math.min(y(d.v), y(0)), ht = Math.abs(y(d.v) - y(0));
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(ht, 1).toFixed(1)}" rx="3" fill="${color}"/>` +
      `<text x="${cx}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#1c2733">${fmtNum(d.v, opts.decimals ?? 1)}</text>` +
      `<text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5b6b7a">${d.year ?? d.name}</text>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || "Grafik batang")}" xmlns="${NS}">${grid}${bars}</svg>`;
}

// Grafik batang horizontal dengan label nama dan nilai.
export function hbarChart(items, opts = {}) {
  const rowH = opts.rowHeight || 34;
  const w = opts.width || 640;
  const h = rowH * items.length + 16;
  const labelW = opts.labelWidth || 190;
  const padR = 56;
  const max = Math.max(...items.map((d) => d.v));
  const rows = items.map((d, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - padR) * d.v) / max;
    const color = opts.color || PALETTE[i % PALETTE.length];
    return `<text x="0" y="${y + 15}" font-size="12.5" fill="#1c2733">${esc(d.name)}</text>` +
      `<rect x="${labelW}" y="${y + 4}" width="${Math.max(bw, 2).toFixed(1)}" height="16" rx="3" fill="${color}"/>` +
      `<text x="${labelW + bw + 7}" y="${y + 17}" font-size="12" font-weight="700" fill="#1c2733">${fmtNum(d.v, opts.decimals ?? 1)}</text>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.title || "Grafik batang horizontal")}" xmlns="${NS}">${rows}</svg>`;
}

// Donat (pie) dengan legenda di samping.
export function donutChart(items, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 12, inner = r * 0.62;
  const total = items.reduce((s, d) => s + d.v, 0);
  let angle = -Math.PI / 2;
  const slices = items.map((d, i) => {
    const frac = d.v / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const color = opts.colors?.[i] || PALETTE[i % PALETTE.length];
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"/>`;
  }).join("");
  const legend = items.map((d, i) => {
    const color = opts.colors?.[i] || PALETTE[i % PALETTE.length];
    return `<div><span class="sw" style="background:${color}"></span>${esc(d.name)} — <strong>${fmtNum(d.v, 1)}%</strong></div>`;
  }).join("");
  return `<div class="donut-wrap" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.title || "Diagram donat")}" xmlns="${NS}">
      ${slices}
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#0b2a4a">${esc(opts.center || "100%")}</text>
      <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5b6b7a">${esc(opts.centerSub || "total")}</text>
    </svg>
    <div class="legend" style="flex-direction:column;gap:6px;margin-top:0">${legend}</div>
  </div>`;
}

export { PALETTE, fmtNum };
