// NusaStat main — router hash + semua kontrol interaktif halaman.
import { VIEWS } from "./views.js";
import { GDP_GROWTH, TRADE, INDICATORS } from "./data.js";
import { lineChart } from "./charts.js";

const app = document.getElementById("app");

function route() {
  const hash = location.hash.replace(/^#\/?/, "") || "home";
  const key = VIEWS[hash] ? hash : "home";
  app.innerHTML = VIEWS[key]();
  document.querySelectorAll(".mainnav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === key);
  });
  wirePage(key);
  window.scrollTo(0, 0);
}

function wirePage(key) {
  if (key === "home") wireHome();
  if (key === "penduduk") wireProvinces();
  if (key === "perdagangan") wireTrade();
  if (key === "data") wireDataTable();
}

// Beranda: rentang tahun grafik pertumbuhan.
function wireHome() {
  const sel = document.getElementById("growth-range");
  const box = document.getElementById("growth-chart");
  if (!sel || !box) return;
  sel.addEventListener("change", () => {
    const n = parseInt(sel.value, 10);
    const slice = GDP_GROWTH.slice(-n);
    box.innerHTML = lineChart(slice, { title: "Pertumbuhan ekonomi Indonesia", decimals: 2 });
  });
}

// Penduduk: saring tabel provinsi saat mengetik.
function wireProvinces() {
  const input = document.getElementById("prov-search");
  const empty = document.getElementById("prov-empty");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll("#prov-table tbody tr").forEach((tr) => {
      const hit = !q || tr.dataset.prov.includes(q);
      tr.style.display = hit ? "" : "none";
      if (hit) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  });
}

// Perdagangan: saklar seri ekspor/impor — digambar ulang dari data.
function wireTrade() {
  const box = document.getElementById("trade-chart");
  const bBoth = document.getElementById("trade-both");
  const bExp = document.getElementById("trade-exp");
  const bImp = document.getElementById("trade-imp");
  if (!box || !bBoth) return;
  const buttons = [bBoth, bExp, bImp];
  function draw(mode) {
    const w = 640, h = 300;
    const padL = 46, padR = 14, padT = 18, padB = 30;
    const iw = w - padL - padR, ih = h - padT - padB;
    const series = mode === "exp" ? [TRADE.exportSeries]
      : mode === "imp" ? [TRADE.importSeries]
      : [TRADE.exportSeries, TRADE.importSeries];
    const colors = mode === "imp" ? ["#0b2a4a"] : ["#0e7c7b", "#0b2a4a"];
    const all = series.flat().map((d) => d.v);
    const min = Math.floor(Math.min(...all) * 0.9);
    const max = Math.ceil(Math.max(...all) * 1.05);
    const x = (i) => padL + (i / (TRADE.exportSeries.length - 1)) * iw;
    const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
    let svg = `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Ekspor dan impor Indonesia" xmlns="http://www.w3.org/2000/svg">`;
    [0, 1, 2, 3, 4].forEach((g) => {
      const gv = min + ((max - min) * g) / 4;
      const gy = y(gv);
      svg += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e6ebee"/>` +
        `<text x="${padL - 7}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5b6b7a">${gv}</text>`;
    });
    series.forEach((s, si) => {
      const pts = s.map((d, i) => `${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(" ");
      svg += `<polyline points="${pts}" fill="none" stroke="${colors[si]}" stroke-width="2.6" stroke-linejoin="round"/>`;
      s.forEach((d, i) => {
        // Saat dua seri tampil, label ekspor di atas titik dan impor di bawah titik
        // supaya label tahun yang nilainya berdekatan tidak bertumpuk.
        const ly = mode === "both" ? (si === 0 ? y(d.v) - 9 : y(d.v) + 18) : y(d.v) - 9;
        svg += `<circle cx="${x(i)}" cy="${y(d.v)}" r="3.6" fill="#fff" stroke="${colors[si]}" stroke-width="2.2"/>` +
          `<text x="${x(i)}" y="${ly}" text-anchor="middle" font-size="11" font-weight="700" fill="${colors[si]}">${d.v}</text>`;
      });
    });
    TRADE.exportSeries.forEach((d, i) => {
      svg += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5b6b7a">${d.year}</text>`;
    });
    svg += `</svg>`;
    const names = mode === "both" ? ["Ekspor", "Impor"] : mode === "exp" ? ["Ekspor"] : ["Impor"];
    box.innerHTML = svg + `<p class="legend">` + names.map((n, i) =>
      `<span><span class="sw" style="background:${colors[i]}"></span>${n} (miliar dolar AS)</span>`).join("") + `</p>`;
    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    ({ both: bBoth, exp: bExp, imp: bImp })[mode].setAttribute("aria-pressed", "true");
  }
  bBoth.addEventListener("click", () => draw("both"));
  bExp.addEventListener("click", () => draw("exp"));
  bImp.addEventListener("click", () => draw("imp"));
  draw("both");
}

// Tabel data: cari, saring kategori, urutkan kolom, unduh CSV.
function wireDataTable() {
  const search = document.getElementById("data-search");
  const cat = document.getElementById("data-cat");
  const body = document.getElementById("data-body");
  const count = document.getElementById("data-count");
  const empty = document.getElementById("data-empty");
  const csvBtn = document.getElementById("data-csv");
  if (!body) return;
  let sortKey = "ind", sortDir = 1;

  function render() {
    const q = (search.value || "").trim().toLowerCase();
    const c = cat.value;
    let rows = INDICATORS.filter((r) =>
      (!c || r.cat === c) &&
      (!q || (r.ind + " " + r.val + " " + r.cat + " " + r.src).toLowerCase().includes(q)));
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sortDir;
      return String(av).localeCompare(String(bv), "id") * sortDir;
    });
    body.innerHTML = rows.map((r) =>
      `<tr><td>${r.ind}</td><td>${r.val}</td><td class="num">${r.year}</td><td>${r.cat}</td><td>${r.src}</td></tr>`).join("");
    count.textContent = `Menampilkan ${rows.length} dari ${INDICATORS.length} indikator.`;
    empty.hidden = rows.length !== 0;
  }

  search.addEventListener("input", render);
  cat.addEventListener("change", render);
  document.querySelectorAll("#data-table th button[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.sort;
      if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; }
      render();
    });
  });
  csvBtn.addEventListener("click", () => {
    const lines = ["Indikator;Nilai;Tahun;Kategori;Sumber"];
    INDICATORS.forEach((r) => lines.push([r.ind, r.val, r.year, r.cat, r.src].join(";")));
    const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "nusastat-indikator-indonesia.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  render();
}

window.addEventListener("hashchange", route);
route();
