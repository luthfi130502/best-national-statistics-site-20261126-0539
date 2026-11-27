# NusaStat — Portal Statistik Nasional Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/luthfi130502/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/luthfi130502/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entry for the [best national statistics site bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539) on make.fun.

**NusaStat** is a national statistics portal for Indonesia, built as plain static files
that run offline in a browser — desktop and phone — with no network requests and no
external libraries. Every chart is hand-drawn SVG from the site's own data.

## What it covers

- **Beranda** — hero, six headline indicators (population, GDP, GDP per capita,
  inflation, unemployment, poverty), GDP-growth chart with a working year-range
  selector, population chart, latest official releases, theme links.
- **Ekonomi** — GDP growth 2015–2024, inflation, GDP by sector (donut), growth drivers.
- **Penduduk** — population trend, age structure, top-10 provinces table with a
  working live search and density figures.
- **Perdagangan** — exports vs imports 2019–2024 with a working series toggle
  (both / exports only / imports only), top export commodities, top trade partners.
- **Pendidikan** — literacy, mean/expected years of schooling, participation by level.
- **Kesehatan** — life expectancy, stunting trend, health-system figures.
- **Energi** — electrification, energy mix donut, renewables breakdown.
- **Tabel Data** — all 28 indicators in one searchable, filterable, sortable table
  with a working CSV download (generated client-side).
- **Tentang** — full source list and methodology.

Figures are official Indonesian statistics (BPS, Bank Indonesia, Ministry of Energy
and Mineral Resources, Ministry of Health, World Bank), each labelled with its source
and year. See the Tentang page for the complete list.

## Layout

- `app/index.html` — page shell, header nav, footer
- `app/style.css` — all styling (responsive, phone layout included)
- `app/data.js` — every figure, with source and year
- `app/charts.js` — hand-rolled SVG chart builders (line, bar, horizontal bar, donut)
- `app/views.js` — one renderer per page/route
- `app/main.js` — hash router and all interactive controls
- `screenshots/` — 4 real renders of the running site (desktop home, economy, trade, phone home)
- `main.ts` — hand-in program: copies `app/` + `screenshots/` to `/output` and writes
  `dossier.json` via `vendor/makefun-frontend.ts`
- `vendor/makefun-frontend.ts` — the kit's dossier library, copied unchanged

## Run it locally

```sh
cd app && python3 -m http.server 8123
# open http://localhost:8123/ — try #/ekonomi, #/penduduk, #/data
```

## License

MIT — see `LICENSE`.
