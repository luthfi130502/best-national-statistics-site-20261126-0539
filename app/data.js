// NusaStat data — angka resmi Indonesia, dibulatkan untuk keterbacaan.
// Sumber utama: Badan Pusat Statistik (BPS) — Statistik Indonesia 2025,
// Berita Resmi Statistik 2024/2025; Bank Indonesia; Kementerian ESDM;
// World Bank World Development Indicators 2024. Tahun tercantum di tiap angka.
export const META = {
  country: "Indonesia",
  updated: "Januari 2025",
  sources: [
    "Badan Pusat Statistik (BPS) — Statistik Indonesia 2025",
    "BPS — Berita Resmi Statistik, 2024–2025",
    "Bank Indonesia — Statistik Ekonomi dan Keuangan Indonesia, 2024",
    "Kementerian ESDM — Handbook of Energy & Economic Statistics of Indonesia 2024",
    "World Bank — World Development Indicators, 2024",
  ],
};

// Indikator utama (KPI beranda)
export const KPIS = [
  { id: "pop", label: "Penduduk", value: "281,6", unit: "juta jiwa", delta: "+0,97% per tahun", dir: "up", src: "BPS, pertengahan 2024" },
  { id: "gdp", label: "PDB (harga berlaku)", value: "22.139", unit: "triliun rupiah", delta: "+5,03% riil (2024)", dir: "up", src: "BPS, 2024" },
  { id: "gdppc", label: "PDB per kapita", value: "4.960", unit: "dolar AS", delta: "Rp78,6 juta", dir: "up", src: "BPS, 2024" },
  { id: "infl", label: "Inflasi (Des ke Des)", value: "1,57", unit: "%", delta: "dalam sasaran 2,5±1%", dir: "up", src: "BPS, Des 2024" },
  { id: "unemp", label: "Tingkat pengangguran", value: "4,91", unit: "%", delta: "turun dari 5,32% (Agu 2023)", dir: "down", good: true, src: "BPS, Agu 2024" },
  { id: "poor", label: "Penduduk miskin", value: "8,57", unit: "%", delta: "24,06 juta jiwa", dir: "down", good: true, src: "BPS, Sep 2024" },
];

// Pertumbuhan ekonomi 2015–2024 (% y-on-y)
export const GDP_GROWTH = [
  { year: 2015, v: 4.88 }, { year: 2016, v: 5.03 }, { year: 2017, v: 5.07 },
  { year: 2018, v: 5.17 }, { year: 2019, v: 5.02 }, { year: 2020, v: -2.07 },
  { year: 2021, v: 3.70 }, { year: 2022, v: 5.31 }, { year: 2023, v: 5.05 },
  { year: 2024, v: 5.03 },
];

// Penduduk 2015–2024 (juta jiwa, pertengahan tahun)
export const POPULATION = [
  { year: 2015, v: 255.6 }, { year: 2016, v: 258.7 }, { year: 2017, v: 261.9 },
  { year: 2018, v: 265.0 }, { year: 2019, v: 268.1 }, { year: 2020, v: 271.1 },
  { year: 2021, v: 273.9 }, { year: 2022, v: 275.8 }, { year: 2023, v: 278.7 },
  { year: 2024, v: 281.6 },
];

// Inflasi 2015–2024 (% Des ke Des)
export const INFLATION = [
  { year: 2015, v: 3.35 }, { year: 2016, v: 3.02 }, { year: 2017, v: 3.61 },
  { year: 2018, v: 3.13 }, { year: 2019, v: 2.72 }, { year: 2020, v: 1.68 },
  { year: 2021, v: 1.87 }, { year: 2022, v: 5.51 }, { year: 2023, v: 2.61 },
  { year: 2024, v: 1.57 },
];

// Struktur PDB menurut lapangan usaha 2024 (%)
export const GDP_SECTORS = [
  { name: "Industri pengolahan", v: 18.67 },
  { name: "Perdagangan", v: 12.86 },
  { name: "Pertanian, kehutanan, perikanan", v: 12.50 },
  { name: "Konstruksi", v: 9.91 },
  { name: "Pertambangan & penggalian", v: 8.46 },
  { name: "Transportasi & pergudangan", v: 5.94 },
  { name: "Informasi & komunikasi", v: 4.16 },
  { name: "Jasa keuangan & asuransi", v: 4.05 },
  { name: "Jasa lainnya", v: 23.45 },
];

// Struktur penduduk menurut kelompok umur 2024 (%)
export const AGE_GROUPS = [
  { group: "0–14 tahun", v: 24.5 },
  { group: "15–24 tahun", v: 16.9 },
  { group: "25–39 tahun", v: 24.1 },
  { group: "40–54 tahun", v: 18.8 },
  { group: "55–64 tahun", v: 8.9 },
  { group: "65+ tahun", v: 6.8 },
];

// 10 provinsi berpenduduk terbanyak, pertengahan 2024 (juta jiwa)
export const PROVINCES = [
  { name: "Jawa Barat", pop: 50.35, capital: "Bandung", area: 35378 },
  { name: "Jawa Timur", pop: 41.81, capital: "Surabaya", area: 47922 },
  { name: "Jawa Tengah", pop: 38.32, capital: "Semarang", area: 32801 },
  { name: "Sumatera Utara", pop: 15.59, capital: "Medan", area: 72981 },
  { name: "Banten", pop: 12.43, capital: "Serang", area: 9161 },
  { name: "DKI Jakarta", pop: 10.56, capital: "Jakarta", area: 664 },
  { name: "Sulawesi Selatan", pop: 9.46, capital: "Makassar", area: 46717 },
  { name: "Lampung", pop: 9.42, capital: "Bandar Lampung", area: 34624 },
  { name: "Sumatera Selatan", pop: 8.84, capital: "Palembang", area: 91592 },
  { name: "Riau", pop: 6.91, capital: "Pekanbaru", area: 87024 },
  { name: "Sumatera Barat", pop: 5.74, capital: "Padang", area: 42013 },
  { name: "Nusa Tenggara Timur", pop: 5.66, capital: "Kupang", area: 47014 },
  { name: "Kalimantan Barat", pop: 5.61, capital: "Pontianak", area: 147307 },
  { name: "Aceh", pop: 5.56, capital: "Banda Aceh", area: 57957 },
  { name: "Kalimantan Timur", pop: 3.99, capital: "Samarinda", area: 127347 },
];

// Perdagangan luar negeri 2024 (miliar dolar AS)
export const TRADE = {
  exports: 264.70, imports: 233.66, surplus: 31.04,
  exportSeries: [
    { year: 2019, v: 167.7 }, { year: 2020, v: 163.2 }, { year: 2021, v: 231.6 },
    { year: 2022, v: 291.9 }, { year: 2023, v: 258.8 }, { year: 2024, v: 264.7 },
  ],
  importSeries: [
    { year: 2019, v: 171.3 }, { year: 2020, v: 141.6 }, { year: 2021, v: 196.2 },
    { year: 2022, v: 237.4 }, { year: 2023, v: 221.9 }, { year: 2024, v: 233.7 },
  ],
  topExports: [
    { name: "Batu bara", v: 30.5 },
    { name: "Besi dan baja", v: 27.8 },
    { name: "Minyak kelapa sawit (CPO)", v: 20.3 },
    { name: "Nikel dan barang daripadanya", v: 7.9 },
    { name: "Tembaga dan konsentrat", v: 7.1 },
    { name: "Karet dan barang dari karet", v: 6.8 },
    { name: "Mesin & peralatan listrik", v: 6.4 },
    { name: "Kendaraan bermotor", v: 5.9 },
  ],
  topPartners: [
    { name: "Tiongkok", v: 62.4 },
    { name: "Amerika Serikat", v: 26.3 },
    { name: "Jepang", v: 20.8 },
    { name: "India", v: 19.8 },
    { name: "Singapura", v: 14.9 },
    { name: "Malaysia", v: 12.6 },
  ],
};

// Pendidikan (2024, kecuali disebut lain)
export const EDUCATION = {
  literacy: 96.0, // % penduduk 15+ melek huruf, 2023
  meanSchooling: 9.05, // tahun
  expectedSchooling: 13.21, // tahun
  schoolParticipation: [
    { level: "SD / sederajat (7–12 thn)", v: 99.8 },
    { level: "SMP / sederajat (13–15 thn)", v: 95.9 },
    { level: "SMA / sederajat (16–18 thn)", v: 71.7 },
    { level: "Perguruan tinggi (19–23 thn)", v: 31.6 },
  ],
  spending: 3.5, // % PDB belanja pemerintah untuk pendidikan, 2023 (World Bank)
};

// Kesehatan (2024, kecuali disebut lain)
export const HEALTH = {
  lifeExpectancy: 74.0, // tahun
  infantMortality: 15.9, // per 1.000 kelahiran hidup, 2023
  stunting: 19.8, // % balita, SSGI 2024
  healthSpending: 3.4, // % PDB, 2022 (World Bank)
  doctorsPer10k: 7.4, // dokter per 10.000 penduduk, 2023
  immunization: 94.6, // % imunisasi dasar lengkap, 2023
};

// Energi (2024)
export const ENERGY = {
  electrification: 99.45, // % rumah tangga berlistrik
  perCapitaKwh: 1285, // kWh per kapita
  mix: [
    { name: "Batu bara", v: 40.5 },
    { name: "Minyak bumi", v: 30.4 },
    { name: "Gas alam", v: 15.5 },
    { name: "Energi terbarukan", v: 13.6 },
  ],
  renewables: [
    { name: "Panas bumi", v: 2.6 },
    { name: "Air (hidro)", v: 7.1 },
    { name: "Bioenergi", v: 3.2 },
    { name: "Surya & angin", v: 0.7 },
  ],
};

// Rilis terbaru (jadwal publikasi BPS)
export const RELEASES = [
  { date: "05 Feb 2025", title: "Pertumbuhan Ekonomi Indonesia Triwulan IV-2024: 5,02% (y-on-y); sepanjang 2024 tumbuh 5,03%." },
  { date: "03 Feb 2025", title: "Inflasi Januari 2025 sebesar 0,76% (m-to-m); inflasi tahunan 0,76% (y-on-y)." },
  { date: "15 Jan 2025", title: "Ekspor Desember 2024 mencapai US$23,46 miliar; neraca perdagangan surplus US$4,77 miliar." },
  { date: "05 Nov 2024", title: "Tingkat Pengangguran Terbuka Agustus 2024 sebesar 4,91%, turun 0,41 poin dari Agustus 2023." },
  { date: "15 Okt 2024", title: "Profil Kemiskinan September 2024: 8,57% penduduk miskin, terendah sepanjang sejarah." },
  { date: "01 Okt 2024", title: "Hasil Survei Status Gizi Indonesia 2024: prevalensi stunting turun menjadi 19,8%." },
];

// Tabel indikator lengkap untuk halaman /data
export const INDICATORS = [
  { ind: "Jumlah penduduk", val: "281,6 juta jiwa", year: 2024, cat: "Penduduk", src: "BPS" },
  { ind: "Laju pertumbuhan penduduk", val: "0,97% per tahun", year: 2024, cat: "Penduduk", src: "BPS" },
  { ind: "Kepadatan penduduk", val: "147 jiwa/km²", year: 2024, cat: "Penduduk", src: "BPS" },
  { ind: "Rasio ketergantungan", val: "46,0", year: 2024, cat: "Penduduk", src: "BPS" },
  { ind: "Penduduk usia produktif (15–64 thn)", val: "68,6%", year: 2024, cat: "Penduduk", src: "BPS" },
  { ind: "PDB harga berlaku", val: "Rp22.139 triliun", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "PDB harga konstan 2010", val: "Rp13.588 triliun", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Pertumbuhan ekonomi", val: "5,03%", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "PDB per kapita", val: "US$4.960", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Inflasi (Des ke Des)", val: "1,57%", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Tingkat pengangguran terbuka", val: "4,91%", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Tingkat kemiskinan", val: "8,57%", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Gini ratio", val: "0,381", year: 2024, cat: "Ekonomi", src: "BPS" },
  { ind: "Nilai ekspor", val: "US$264,70 miliar", year: 2024, cat: "Perdagangan", src: "BPS" },
  { ind: "Nilai impor", val: "US$233,66 miliar", year: 2024, cat: "Perdagangan", src: "BPS" },
  { ind: "Neraca perdagangan", val: "Surplus US$31,04 miliar", year: 2024, cat: "Perdagangan", src: "BPS" },
  { ind: "Cadangan devisa", val: "US$155,7 miliar", year: 2024, cat: "Perdagangan", src: "Bank Indonesia" },
  { ind: "Angka melek huruf (15+)", val: "96,0%", year: 2023, cat: "Pendidikan", src: "BPS" },
  { ind: "Rata-rata lama sekolah", val: "9,05 tahun", year: 2024, cat: "Pendidikan", src: "BPS" },
  { ind: "Harapan lama sekolah", val: "13,21 tahun", year: 2024, cat: "Pendidikan", src: "BPS" },
  { ind: "Indeks Pembangunan Manusia", val: "75,02", year: 2024, cat: "Pendidikan", src: "BPS" },
  { ind: "Angka harapan hidup", val: "74,0 tahun", year: 2024, cat: "Kesehatan", src: "BPS" },
  { ind: "Angka kematian bayi", val: "15,9 per 1.000", year: 2023, cat: "Kesehatan", src: "BPS" },
  { ind: "Prevalensi stunting balita", val: "19,8%", year: 2024, cat: "Kesehatan", src: "Kemenkes (SSGI)" },
  { ind: "Rasio elektrifikasi", val: "99,45%", year: 2024, cat: "Energi", src: "Kementerian ESDM" },
  { ind: "Konsumsi listrik per kapita", val: "1.285 kWh", year: 2024, cat: "Energi", src: "Kementerian ESDM" },
  { ind: "Porsi energi terbarukan (bauran primer)", val: "13,6%", year: 2024, cat: "Energi", src: "Kementerian ESDM" },
  { ind: "Emisi CO₂ per kapita", val: "2,2 ton", year: 2023, cat: "Energi", src: "World Bank" },
];
