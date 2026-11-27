// NusaStat views — per halaman, me-render HTML dari data.js + grafik dari charts.js.
import { KPIS, GDP_GROWTH, POPULATION, INFLATION, GDP_SECTORS, AGE_GROUPS,
  PROVINCES, TRADE, EDUCATION, HEALTH, ENERGY, RELEASES, INDICATORS, META } from "./data.js";
import { lineChart, barChart, hbarChart, donutChart } from "./charts.js";

function kpiCards(list) {
  return `<div class="kpis">` + list.map((k) => {
    const tone = k.good === undefined ? (k.dir === "up" ? "up" : "down") : (k.good ? "up" : "down");
    return `
    <div class="kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-value">${k.value} <span class="k-unit">${k.unit}</span></div>
      <div class="k-delta ${tone}">${k.dir === "up" ? "▲" : "▼"} ${k.delta}</div>
      <div class="k-src">Sumber: ${k.src}</div>
    </div>`;}).join("") + `</div>`;
}

function pageHead(eyebrow, title, lede) {
  return `<div class="page-head"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lede">${lede}</p></div>`;
}

function card(title, sub, inner, src) {
  return `<section class="card"><h2>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ""}${inner}${src ? `<p class="src">Sumber: ${src}</p>` : ""}</section>`;
}

function releaseList() {
  return `<ul class="release-list">` + RELEASES.map((r) =>
    `<li><span class="date">${r.date}</span><span>${r.title}</span></li>`).join("") + `</ul>`;
}

function toc(links) {
  return `<nav class="toc" aria-label="Isi halaman">` + links.map((l) =>
    `<a href="${l.href}">${l.label}</a>`).join("") + `</nav>`;
}

export function viewHome() {
  return `
  <section class="hero">
    <h1>Statistik Indonesia, <em>terbuka untuk semua.</em></h1>
    <p>Angka resmi tentang penduduk, ekonomi, perdagangan, pendidikan, kesehatan, dan energi —
       lengkap dengan sumber dan tahunnya, dalam grafik yang bisa dibaca sekilas.</p>
    <div class="hero-meta">
      <span class="pill">281,6 juta penduduk (2024)</span>
      <span class="pill">PDB Rp22.139 triliun</span>
      <span class="pill">Tumbuh 5,03% pada 2024</span>
      <span class="pill">38 provinsi</span>
    </div>
  </section>
  ${kpiCards(KPIS)}
  <div class="grid-2wide stack">
    <div>
      ${card("Pertumbuhan ekonomi 2015–2024", "PDB tumbuh di atas 5% dalam tiga tahun terakhir; kontraksi 2020 adalah dampak pandemi.",
        `<div class="controls">
          <label for="growth-range">Rentang tahun:</label>
          <select id="growth-range">
            <option value="10" selected>2015–2024 (10 tahun)</option>
            <option value="5">2020–2024 (5 tahun)</option>
            <option value="3">2022–2024 (3 tahun)</option>
          </select>
        </div>
        <div id="growth-chart">${lineChart(GDP_GROWTH, { title: "Pertumbuhan ekonomi Indonesia", decimals: 2 })}</div>
        <p class="legend"><span><span class="sw" style="background:#0e7c7b"></span>Pertumbuhan PDB (% y-on-y)</span></p>`,
        "BPS, Berita Resmi Statistik 2024–2025.")}
      ${card("Penduduk 2015–2024", "Jumlah penduduk naik rata-rata 2,6 juta jiwa per tahun.",
        lineChart(POPULATION, { title: "Jumlah penduduk Indonesia", color: "#0b2a4a", decimals: 1 }),
        "BPS, proyeksi penduduk pertengahan tahun.")}
    </div>
    <div>
      ${card("Rilis terbaru", "Jadwal publikasi resmi — apa yang baru dirilis.",
        releaseList())}
      ${card("Jelajahi berdasarkan tema", "Semua angka di situs ini berasal dari publikasi resmi.",
        `<div class="link-grid" style="grid-template-columns:1fr 1fr">
          <a class="link-card" href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, inflasi, pengangguran</span></a>
          <a class="link-card" href="#/penduduk"><strong>Penduduk</strong><span>38 provinsi, kelompok umur</span></a>
          <a class="link-card" href="#/perdagangan"><strong>Perdagangan</strong><span>Ekspor, impor, mitra dagang</span></a>
          <a class="link-card" href="#/pendidikan"><strong>Pendidikan</strong><span>Melek huruf, lama sekolah</span></a>
          <a class="link-card" href="#/kesehatan"><strong>Kesehatan</strong><span>Harapan hidup, stunting</span></a>
          <a class="link-card" href="#/energi"><strong>Energi</strong><span>Listrik, bauran energi</span></a>
        </div>`)}
      <div class="callout"><strong>Catatan untuk pembaca:</strong> semua angka dibulatkan ke satu desimal
        agar mudah dibaca. Angka rinci tersedia di halaman <a href="#/data">Tabel Data</a>.</div>
    </div>
  </div>
  <p class="updated">Terakhir diperbarui: ${META.updated} &middot; Sumber: BPS, Bank Indonesia, Kementerian ESDM, World Bank.</p>`;
}

export function viewEkonomi() {
  return `
  ${pageHead("Ekonomi", "Ekonomi Indonesia 2024", "PDB Rp22.139 triliun, tumbuh 5,03% — didorong konsumsi rumah tangga, investasi, dan ekspor. Inflasi tetap rendah di 1,57%.")}
  ${kpiCards([
    { label: "PDB harga berlaku", value: "22.139", unit: "triliun rupiah", delta: "+5,03% riil", dir: "up", src: "BPS, 2024" },
    { label: "Inflasi", value: "1,57", unit: "%", delta: "sasaran 2,5±1%", dir: "up", src: "BPS, Des 2024" },
    { label: "Pengangguran", value: "4,91", unit: "%", delta: "terendah sejak 2019", dir: "down", good: true, src: "BPS, Agu 2024" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Pertumbuhan PDB 2015–2024", "Persen per tahun (y-on-y).",
        lineChart(GDP_GROWTH, { title: "Pertumbuhan PDB", decimals: 2 }),
        "BPS, 2024.")}
      ${card("Inflasi 2015–2024", "Persen, Desember ke Desember. Puncak 2022 dipicu penyesuaian harga BBM bersubsidi.",
        barChart(INFLATION, { title: "Inflasi tahunan", color: "#e8a317", decimals: 2 }),
        "BPS, 2024.")}
    </div>
    <div>
      ${card("Struktur PDB menurut lapangan usaha", "Persen terhadap PDB 2024. Industri pengolahan tetap penyumbang terbesar.",
        donutChart(GDP_SECTORS, { title: "Struktur PDB", center: "100%", centerSub: "PDB 2024" }),
        "BPS, 2024.")}
      ${card("Tiga pendorong utama 2024", "",
        `<table class="data"><thead><tr><th>Komponen</th><th class="num">Tumbuh</th><th class="num">Kontribusi thd PDB</th></tr></thead>
        <tbody>
        <tr><td>Konsumsi rumah tangga</td><td class="num">4,94%</td><td class="num">54,0%</td></tr>
        <tr><td>Pembentukan modal tetap bruto</td><td class="num">4,61%</td><td class="num">29,5%</td></tr>
        <tr><td>Ekspor barang dan jasa</td><td class="num">6,51%</td><td class="num">22,4%</td></tr>
        <tr><td>Konsumsi pemerintah</td><td class="num">1,75%</td><td class="num">7,7%</td></tr>
        </tbody></table>`,
        "BPS, 2024.")}
    </div>
  </div>`;
}

export function viewPenduduk() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
  ${pageHead("Penduduk", "Penduduk Indonesia: 281,6 juta jiwa", "Jawa masih rumah bagi 55% penduduk. Bonus demografi: 68,6% penduduk berusia produktif pada 2024.")}
  ${kpiCards([
    { label: "Jumlah penduduk", value: "281,6", unit: "juta jiwa", delta: "+0,97% per tahun", dir: "up", src: "BPS, pertengahan 2024" },
    { label: "Usia produktif (15–64)", value: "68,6", unit: "%", delta: "bonus demografi", dir: "up", src: "BPS, 2024" },
    { label: "Kepadatan", value: "147", unit: "jiwa/km²", delta: "DKI Jakarta: 15.900/km²", dir: "up", src: "BPS, 2024" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Jumlah penduduk 2015–2024", "Juta jiwa, pertengahan tahun.",
        lineChart(POPULATION, { title: "Jumlah penduduk", color: "#0b2a4a", decimals: 1 }),
        "BPS, proyeksi penduduk.")}
      ${card("Struktur umur 2024", "Persen penduduk menurut kelompok umur — piramida yang masih lebar di bawah.",
        hbarChart(AGE_GROUPS.map((g) => ({ name: g.group, v: g.v })), { title: "Struktur umur", decimals: 1 }),
        "BPS, 2024.")}
    </div>
    <div>
      ${card("Provinsi berpenduduk terbanyak", "Juta jiwa, pertengahan 2024. Ketik untuk menyaring daftar.",
        `<div class="controls">
          <label for="prov-search">Cari provinsi:</label>
          <input type="search" id="prov-search" placeholder="mis. Jawa, Sumatera…" autocomplete="off">
        </div>
        <div id="prov-table">
        <table class="data"><thead><tr><th>#</th><th>Provinsi</th><th class="num">Penduduk (juta)</th><th class="num">Kepadatan (/km²)</th></tr></thead>
        <tbody>
        ${top10.map((p, i) => `<tr data-prov="${p.name.toLowerCase()}"><td><span class="rank">${i + 1}</span></td><td>${p.name}<br><span class="muted small">Ibu kota: ${p.capital}</span></td><td class="num">${p.pop.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</td><td class="num">${Math.round((p.pop * 1e6) / p.area).toLocaleString("id-ID")}</td></tr>`).join("")}
        </tbody></table>
        <p class="no-results" id="prov-empty" hidden>Tidak ada provinsi yang cocok — coba kata kunci lain.</p>
        </div>`,
        "BPS, 2024; luas wilayah dari BPS.")}
      <div class="callout"><strong>Tahukah Anda?</strong> Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, dan Jawa Tengah —
        menampung 130,5 juta jiwa, lebih banyak dari gabungan seluruh Sumatera.</div>
    </div>
  </div>`;
}

export function viewPerdagangan() {
  return `
  ${pageHead("Perdagangan", "Perdagangan luar negeri 2024", "Ekspor US$264,7 miliar, impor US$233,7 miliar — surplus US$31,0 miliar, tahun kelima berturut-turut surplus.")}
  ${kpiCards([
    { label: "Ekspor", value: "264,7", unit: "miliar dolar AS", delta: "+2,3% dari 2023", dir: "up", src: "BPS, 2024" },
    { label: "Impor", value: "233,7", unit: "miliar dolar AS", delta: "+5,3% dari 2023", dir: "up", src: "BPS, 2024" },
    { label: "Surplus dagang", value: "31,0", unit: "miliar dolar AS", delta: "surplus 5 tahun beruntun", dir: "up", src: "BPS, 2024" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Ekspor vs impor 2019–2024", "Miliar dolar AS. Ekspor melonjak 2021–2022 mengikuti harga komoditas dunia.",
        `<div class="controls"><div class="seg" role="group" aria-label="Pilih seri">
          <button type="button" id="trade-both" aria-pressed="true">Keduanya</button>
          <button type="button" id="trade-exp" aria-pressed="false">Ekspor saja</button>
          <button type="button" id="trade-imp" aria-pressed="false">Impor saja</button>
        </div></div>
        <div id="trade-chart"></div>`,
        "BPS, 2024.")}
      ${card("Mitra dagang terbesar", "Nilai ekspor menurut negara tujuan, miliar dolar AS, 2024.",
        hbarChart(TRADE.topPartners, { title: "Mitra dagang", color: "#0b2a4a", decimals: 1 }),
        "BPS, 2024.")}
    </div>
    <div>
      ${card("Komoditas ekspor utama", "Miliar dolar AS, 2024. Batu bara, besi-baja, dan sawit adalah tiga besar.",
        hbarChart(TRADE.topExports, { title: "Komoditas ekspor", decimals: 1 }),
        "BPS, 2024 (angka dibulatkan).")}
      ${card("Cadangan devisa", "Posisi akhir 2024: US$155,7 miliar — setara 6,7 bulan impor dan pembayaran utang luar negeri pemerintah.",
        `<p style="font-size:15px">Bank Indonesia menjaga cadangan devisa di atas standar kecukupan internasional
        (3 bulan impor). Pada akhir 2024 cadangan mencapai <strong>US$155,7 miliar</strong>, naik dari US$146,4 miliar setahun sebelumnya.</p>
        <p class="small muted">Nilai tukar rata-rata 2024: Rp15.847 per dolar AS. Suku bunga acuan BI-Rate akhir 2024: 6,00%.</p>`,
        "Bank Indonesia, 2024.")}
    </div>
  </div>`;
}

export function viewPendidikan() {
  return `
  ${pageHead("Pendidikan", "Pendidikan Indonesia", "Melek huruf 96,0% dan rata-rata lama sekolah 9,05 tahun — tantangan kini ada di jenjang menengah atas dan perguruan tinggi.")}
  ${kpiCards([
    { label: "Melek huruf (15+)", value: "96,0", unit: "%", delta: "BPS, 2023", dir: "up", src: "BPS" },
    { label: "Rata-rata lama sekolah", value: "9,05", unit: "tahun", delta: "setara kelas 3 SMP", dir: "up", src: "BPS, 2024" },
    { label: "Harapan lama sekolah", value: "13,21", unit: "tahun", delta: "setara semester awal kuliah", dir: "up", src: "BPS, 2024" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Partisipasi sekolah menurut jenjang", "Angka partisipasi murni (%), 2024. Jurang terbesar ada di SMA dan perguruan tinggi.",
        hbarChart(EDUCATION.schoolParticipation.map((s) => ({ name: s.level, v: s.v })), { title: "Partisipasi sekolah", color: "#0e7c7b", decimals: 1 }),
        "BPS, 2024.")}
      ${card("Indeks Pembangunan Manusia", "IPM 2024 mencapai 75,02 — kategori tinggi. Komponen pendidikan menyumbang lewat rata-rata dan harapan lama sekolah.",
        `<p style="font-size:15px">IPM naik 0,63 poin dari 74,39 pada 2023. Tiga komponennya: umur panjang dan hidup sehat,
        pengetahuan (pendidikan), dan standar hidup layak. Seluruh provinsi kini berstatus IPM tinggi atau sedang.</p>`,
        "BPS, 2024.")}
    </div>
    <div>
      ${card("Pendidikan dalam angka", "",
        `<table class="data"><thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Tahun</th></tr></thead>
        <tbody>
        <tr><td>Sekolah (SD–SMA) </td><td class="num">≈ 275 ribu unit</td><td>2023</td></tr>
        <tr><td>Guru</td><td class="num">≈ 3,4 juta</td><td>2023</td></tr>
        <tr><td>Siswa</td><td class="num">≈ 56 juta</td><td>2023</td></tr>
        <tr><td>Perguruan tinggi</td><td class="num">4.400+ unit</td><td>2023</td></tr>
        <tr><td>Mahasiswa aktif</td><td class="num">≈ 9,9 juta</td><td>2023</td></tr>
        <tr><td>Belanja pendidikan pemerintah</td><td class="num">3,5% PDB</td><td>2023</td></tr>
        </tbody></table>`,
        "BPS & Kemendikbudristek; World Bank.")}
      <div class="callout"><strong>Perlu diketahui:</strong> 1 dari 4 anak usia SMA tidak bersekolah.
        Program Indonesia Pintar dan sekolah gratis menargetkan jurang ini.</div>
    </div>
  </div>`;
}

export function viewKesehatan() {
  return `
  ${pageHead("Kesehatan", "Kesehatan Indonesia", "Harapan hidup 74,0 tahun dan stunting turun ke 19,8% — namun angka kematian bayi dan kesenjangan antarprovinsi masih jadi pekerjaan rumah.")}
  ${kpiCards([
    { label: "Angka harapan hidup", value: "74,0", unit: "tahun", delta: "naik dari 71,3 (2015)", dir: "up", src: "BPS, 2024" },
    { label: "Stunting balita", value: "19,8", unit: "%", delta: "turun dari 21,5% (2023)", dir: "down", good: true, src: "Kemenkes, SSGI 2024" },
    { label: "Kematian bayi", value: "15,9", unit: "per 1.000 lahir hidup", delta: "BPS, 2023", dir: "down", good: true, src: "BPS" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Harapan hidup 2015–2024", "Tahun. Pulih dan melampaui level pra-pandemi sejak 2023.",
        lineChart([
          { year: 2015, v: 71.3 }, { year: 2016, v: 71.6 }, { year: 2017, v: 71.9 },
          { year: 2018, v: 72.2 }, { year: 2019, v: 72.6 }, { year: 2020, v: 72.1 },
          { year: 2021, v: 71.7 }, { year: 2022, v: 72.8 }, { year: 2023, v: 73.6 },
          { year: 2024, v: 74.0 },
        ], { title: "Angka harapan hidup", color: "#0e7c7b", decimals: 1 }),
        "BPS, 2024.")}
      ${card("Stunting balita", "Persen, Survei Status Gizi Indonesia. Target nasional: 14% pada 2024 belum tercapai.",
        barChart([
          { year: 2019, v: 27.7 }, { year: 2021, v: 24.4 }, { year: 2022, v: 21.6 },
          { year: 2023, v: 21.5 }, { year: 2024, v: 19.8 },
        ], { title: "Prevalensi stunting", color: "#c96a3b", decimals: 1 }),
        "Kemenkes, SSGI.")}
    </div>
    <div>
      ${card("Sistem kesehatan dalam angka", "",
        `<table class="data"><thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Tahun</th></tr></thead>
        <tbody>
        <tr><td>Dokter per 10.000 penduduk</td><td class="num">7,4</td><td>2023</td></tr>
        <tr><td>Imunisasi dasar lengkap</td><td class="num">94,6%</td><td>2023</td></tr>
        <tr><td>Persalinan oleh tenaga kesehatan</td><td class="num">95,2%</td><td>2023</td></tr>
        <tr><td>Peserta JKN (BPJS Kesehatan)</td><td class="num">≈ 277 juta</td><td>2024</td></tr>
        <tr><td>Belanja kesehatan</td><td class="num">3,4% PDB</td><td>2022</td></tr>
        <tr><td>Rumah sakit</td><td class="num">≈ 3.100 unit</td><td>2023</td></tr>
        </tbody></table>`,
        "BPS, Kemenkes, BPJS Kesehatan; World Bank.")}
      <div class="callout"><strong>JKN adalah program jaminan kesehatan terbesar di dunia</strong> berdasarkan jumlah peserta —
        mencakup lebih dari 98% penduduk Indonesia.</div>
    </div>
  </div>`;
}

export function viewEnergi() {
  return `
  ${pageHead("Energi", "Energi Indonesia", "99,45% rumah tangga sudah berlistrik. Batu bara masih dominan dalam bauran energi, sementara panas bumi dan hidro memimpin energi terbarukan.")}
  ${kpiCards([
    { label: "Rasio elektrifikasi", value: "99,45", unit: "%", delta: "hampir merata nasional", dir: "up", src: "Kementerian ESDM, 2024" },
    { label: "Konsumsi listrik/kapita", value: "1.285", unit: "kWh", delta: "naik dari 1.220 (2023)", dir: "up", src: "Kementerian ESDM, 2024" },
    { label: "Energi terbarukan", value: "13,6", unit: "% bauran primer", delta: "target 23% pada 2025", dir: "up", src: "Kementerian ESDM, 2024" },
  ])}
  <div class="grid-2 stack">
    <div>
      ${card("Bauran energi primer 2024", "Persen. Batu bara dan minyak bumi masih memasok 71% kebutuhan energi.",
        donutChart(ENERGY.mix, { title: "Bauran energi primer", center: "100%", centerSub: "energi primer" }),
        "Kementerian ESDM, 2024.")}
      ${card("Rincian energi terbarukan", "Persen terhadap total bauran primer. Hidro dan bioenergi paling besar.",
        hbarChart(ENERGY.renewables, { title: "Energi terbarukan", color: "#3d7a5c", decimals: 1 }),
        "Kementerian ESDM, 2024.")}
    </div>
    <div>
      ${card("Kelistrikan dalam angka", "",
        `<table class="data"><thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Tahun</th></tr></thead>
        <tbody>
        <tr><td>Kapasitas pembangkit terpasang</td><td class="num">≈ 100 GW</td><td>2024</td></tr>
        <tr><td>Produksi listrik</td><td class="num">≈ 360 TWh</td><td>2024</td></tr>
        <tr><td>Kapasitas panas bumi</td><td class="num">2,6 GW</td><td>2024</td></tr>
        <tr><td>Kapasitas PLTS terpasang</td><td class="num">≈ 0,7 GW</td><td>2024</td></tr>
        <tr><td>Produksi batu bara</td><td class="num">≈ 800 juta ton</td><td>2024</td></tr>
        <tr><td>Lifting minyak bumi</td><td class="num">≈ 580 ribu bph</td><td>2024</td></tr>
        </tbody></table>`,
        "Kementerian ESDM, 2024.")}
      <div class="callout"><strong>Indonesia produsen panas bumi terbesar kedua dunia</strong> —
        cadangan panas buminya sekitar 40% dari total cadangan dunia.</div>
    </div>
  </div>`;
}

export function viewData() {
  const cats = [...new Set(INDICATORS.map((r) => r.cat))];
  return `
  ${pageHead("Tabel Data", "Semua indikator dalam satu tabel", "Cari, saring berdasarkan kategori, dan urutkan. Unduh sebagai CSV untuk diolah sendiri.")}
  <div class="card">
    <div class="controls">
      <label for="data-search">Cari indikator:</label>
      <input type="search" id="data-search" placeholder="mis. PDB, stunting, ekspor…" autocomplete="off">
      <label for="data-cat">Kategori:</label>
      <select id="data-cat">
        <option value="">Semua kategori</option>
        ${cats.map((c) => `<option value="${c}">${c}</option>`).join("")}
      </select>
      <button type="button" class="btn" id="data-csv">Unduh CSV</button>
    </div>
    <p class="small muted" id="data-count"></p>
    <div style="overflow-x:auto">
    <table class="data" id="data-table">
      <thead><tr>
        <th><button type="button" data-sort="ind">Indikator ↕</button></th>
        <th><button type="button" data-sort="val">Nilai ↕</button></th>
        <th><button type="button" data-sort="year">Tahun ↕</button></th>
        <th><button type="button" data-sort="cat">Kategori ↕</button></th>
        <th>Sumber</th>
      </tr></thead>
      <tbody id="data-body"></tbody>
    </table>
    </div>
    <p class="no-results" id="data-empty" hidden>Tidak ada indikator yang cocok — ubah kata kunci atau kategori.</p>
    <p class="src">Sumber: BPS, Bank Indonesia, Kementerian ESDM, Kemenkes, World Bank — lihat halaman Tentang untuk daftar lengkap.</p>
  </div>`;
}

export function viewTentang() {
  return `
  ${pageHead("Tentang", "Tentang NusaStat & sumber data", "NusaStat adalah portal statistik nasional Indonesia yang independen — bukan situs resmi BPS. Angka diambil dari publikasi resmi dan ditulis ulang dengan sumber dan tahun yang jelas.")}
  ${card("Sumber data", "Setiap angka di situs ini merujuk ke salah satu publikasi berikut.",
    `<ul>${META.sources.map((s) => `<li>${s}</li>`).join("")}</ul>
     <p class="small muted">Angka dibulatkan ke satu desimal agar mudah dibaca. Bila ada selisih kecil dengan publikasi asli,
     itu karena pembulatan — bukan perubahan isi. Data terakhir diperbarui ${META.updated}.</p>`)}
  ${card("Metodologi", "",
    `<ul>
      <li><strong>Pertumbuhan ekonomi</strong> memakai PDB harga konstan 2010, tahun ke tahun (y-on-y).</li>
      <li><strong>Inflasi</strong> memakai IHK, Desember ke Desember.</li>
      <li><strong>Kemiskinan</strong> memakai garis kemiskinan BPS per Maret dan September.</li>
      <li><strong>Stunting</strong> memakai Survei Status Gizi Indonesia (SSGI) Kementerian Kesehatan.</li>
      <li><strong>Bauran energi</strong> memakai Handbook of Energy &amp; Economic Statistics of Indonesia, Kementerian ESDM.</li>
    </ul>`)}
  ${card("Cara mengutip", "",
    `<p>Contoh kutipan: “Penduduk Indonesia pertengahan 2024 sebanyak 281,6 juta jiwa (BPS, 2024), dikutip dari NusaStat, diakses November 2026.”</p>
     <p class="small muted">NusaStat tidak berafiliasi dengan Badan Pusat Statistik atau instansi pemerintah mana pun.</p>`)}`;
}

export const VIEWS = {
  home: viewHome, ekonomi: viewEkonomi, penduduk: viewPenduduk,
  perdagangan: viewPerdagangan, pendidikan: viewPendidikan, kesehatan: viewKesehatan,
  energi: viewEnergi, data: viewData, tentang: viewTentang,
};
