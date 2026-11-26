// Page renderers for AtlasStat. Each view returns an HTML string for <main>.
// All data comes from data.js; all charts from charts.js. Nothing here fetches.

import { COUNTRIES, BY_CODE, INDICATORS, WORLD, DATA_YEAR, rankOf, REGIONS } from './data.js';
import { fmtNum, fmtValue, pctChange, ordinal } from './format.js';
import { barChart, lineChart, groupedBars, sparkline, ageStack, esc } from './charts.js';

const indicatorByKey = Object.fromEntries(INDICATORS.map((i) => [i.key, i]));

export function countryLink(code, text = null) {
  const c = BY_CODE[code];
  return `<a href="#/country/${code}">${esc(text ?? c.name)}</a>`;
}

function statCard(indicator, value, code = null, extra = '') {
  const rank = code ? `<span class="rank">${ordinal(rankOf(code, indicator.key))} of ${COUNTRIES.length}</span>` : '';
  return `<div class="stat-card">
    <div class="stat-label">${esc(indicator.label)}</div>
    <div class="stat-value">${esc(fmtValue(indicator, value))}</div>
    <div class="stat-meta">${rank} ${extra}</div>
    <div class="stat-source">${esc(indicator.source)}, ${indicator.year}</div>
  </div>`;
}

function sectionHead(title, sub = '', link = '') {
  return `<div class="section-head"><div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div>${link}</div>`;
}

// ---------------------------------------------------------------- home
export function homeView() {
  const byGdp = [...COUNTRIES].sort((a, b) => b.gdp - a.gdp).slice(0, 8);
  const byPop = [...COUNTRIES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const byLife = [...COUNTRIES].sort((a, b) => b.life - a.life).slice(0, 5);
  const growth = [...COUNTRIES]
    .map((c) => ({ c, change: ((c.pop - c.popSeries[0]) / c.popSeries[0]) * 100 }))
    .sort((a, b) => b.change - a.change).slice(0, 5);
  const featured = BY_CODE.IND;

  const worldCards = [
    { label: 'World population', value: '8.05 billion', sub: `UN, ${DATA_YEAR}`, spark: [7800, 7890, 7960, 8045] },
    { label: 'World GDP', value: '$105 trillion', sub: `World Bank, ${DATA_YEAR}`, spark: [87, 90, 96, 105] },
    { label: 'Life expectancy', value: '71.4 years', sub: `UN, ${DATA_YEAR}`, spark: [70.9, 71.0, 71.2, 71.4] },
    { label: 'People online', value: '67% of the world', sub: `ITU, ${DATA_YEAR}`, spark: [59, 62, 64, 67] },
  ].map((k) => `<div class="stat-card"><div class="stat-label">${k.label}</div>
    <div class="stat-value">${k.value}</div><div class="stat-meta">${k.sub}</div>
    <div class="spark">${sparkline(k.spark)}</div></div>`).join('');

  return `
  <section class="hero">
    <p class="eyebrow">National statistics, clearly</p>
    <h1>The numbers behind<br>28 countries.</h1>
    <p class="lede">Population, economy, health, work and the climate — real figures from the
    World Bank, the UN, the IMF and the ILO, with the source and year printed next to every number.</p>
    <form class="hero-search" data-action="hero-search">
      <label for="q">Search a country</label>
      <input id="q" name="q" type="search" placeholder="Try “Japan”, “Kenya” or “Brazil”…" autocomplete="off">
      <button type="submit">Search</button>
    </form>
    <p class="hero-links">Browse <a href="#/countries">all countries</a> · <a href="#/compare">compare countries</a> · <a href="#/rankings">rankings</a></p>
  </section>

  <section class="world-strip"><h2 class="visually-hidden">The world in ${DATA_YEAR}</h2><div class="stat-grid">${worldCards}</div></section>

  <section>
    ${sectionHead('Largest economies', `Nominal GDP, US$ billion, ${DATA_YEAR} — World Bank`, '<a class="btn" href="#/rankings?i=gdp">Full ranking →</a>')}
    <div class="card chart-card">${barChart(byGdp.map((c) => ({ label: c.name, value: c.gdp, href: `#/country/${c.code}` })), { format: (v) => '$' + fmtNum(v) + 'bn' })}</div>
  </section>

  <section>
    ${sectionHead('Most populous countries', `People, millions, ${DATA_YEAR} — UN World Population Prospects`, '<a class="btn" href="#/rankings?i=pop">Full ranking →</a>')}
    <div class="card chart-card">${barChart(byPop.map((c) => ({ label: c.name, value: c.pop, href: `#/country/${c.code}` })), { format: (v) => fmtNum(v, 1) + 'm' })}</div>
  </section>

  <section class="two-col">
    <div>
      ${sectionHead('Longest lives', `Life expectancy at birth, ${DATA_YEAR} — UN`)}
      <ol class="rank-list">${byLife.map((c, i) => `<li><span class="pos">${i + 1}</span>${countryLink(c.code)}<span class="val">${c.life.toFixed(1)} years</span></li>`).join('')}</ol>
    </div>
    <div>
      ${sectionHead('Fastest-growing populations', 'Population change, 2014–2023 — UN')}
      <ol class="rank-list">${growth.map((g, i) => `<li><span class="pos">${i + 1}</span>${countryLink(g.c.code)}<span class="val">+${g.change.toFixed(1)}%</span></li>`).join('')}</ol>
    </div>
  </section>

  <section>
    ${sectionHead('Country in focus: India', 'The world’s most populous country — 1,428.6 million people in 2023')}
    <div class="card focus-card">
      <div class="focus-text">
        <p>India passed China as the world’s most populous country in 2023, and its economy —
        $3.57 trillion — is the fifth largest. Its population grew ${pctChange(BY_CODE.IND.popSeries)} over the
        last decade while life expectancy reached 67.7 years.</p>
        <p><a class="btn" href="#/country/IND">See India’s full profile →</a>
        <a class="btn ghost" href="#/compare?c=IND,CHN,USA">Compare with China and the USA →</a></p>
      </div>
      <div class="focus-chart">${lineChart(BY_CODE.IND.popSeries.map((v, i) => ({ x: String(2014 + i), y: v })), { formatY: (v) => fmtNum(v, 0) + 'm', color: '#e8a33d' })}
      <p class="chart-note">India’s population, 2014–2023, millions — UN World Population Prospects 2024</p></div>
    </div>
  </section>

  <section class="note-strip">
    <p><strong>About these figures.</strong> Every number on this site carries its source and year.
    Figures are the latest published values for ${DATA_YEAR} from the World Bank, the United Nations,
    the IMF, the ILO, the UNDP and the ITU. <a href="#/about">How the data is put together →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- countries
export function countriesView({ q = '', region = 'All', sort = 'pop' } = {}) {
  const query = q.trim().toLowerCase();
  let list = COUNTRIES.filter((c) =>
    (!query || c.name.toLowerCase().includes(query) || c.capital.toLowerCase().includes(query)) &&
    (region === 'All' || c.region === region));
  const sorts = {
    pop: (a, b) => b.pop - a.pop,
    gdp: (a, b) => b.gdp - a.gdp,
    gdppc: (a, b) => b.gdppc - a.gdppc,
    life: (a, b) => b.life - a.life,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  list = [...list].sort(sorts[sort] || sorts.pop);
  const sortBtn = (key, label) =>
    `<button class="chip${sort === key ? ' active' : ''}" data-action="sort" data-sort="${key}" aria-pressed="${sort === key}">${label}</button>`;
  const regionOptions = ['All', ...REGIONS].map((r) =>
    `<option value="${esc(r)}"${r === region ? ' selected' : ''}>${esc(r)}</option>`).join('');
  const rows = list.map((c) => `<tr>
    <td>${countryLink(c.code)}</td><td>${esc(c.region)}</td>
    <td class="num">${fmtNum(c.pop, 1)}m</td><td class="num">$${fmtNum(c.gdp)}bn</td>
    <td class="num">$${fmtNum(c.gdppc)}</td><td class="num">${c.life.toFixed(1)}</td>
    <td><button class="btn small" data-action="add-compare" data-code="${c.code}">+ Compare</button></td>
  </tr>`).join('');
  return `
  <section>
    <p class="eyebrow">Browse</p>
    <h1>All ${COUNTRIES.length} countries</h1>
    <p class="lede">Every country in the atlas, with its headline figures for ${DATA_YEAR}. Click a name for the full profile, or add countries to compare them side by side.</p>
    <div class="controls">
      <label>Search <input type="search" id="country-search" value="${esc(q)}" placeholder="Country or capital…" data-action="search-input"></label>
      <label>Region <select data-action="region-select">${regionOptions}</select></label>
    </div>
    <div class="chip-row" role="group" aria-label="Sort by">
      <span>Sort by:</span>
      ${sortBtn('pop', 'Population')} ${sortBtn('gdp', 'GDP')} ${sortBtn('gdppc', 'GDP per capita')} ${sortBtn('life', 'Life expectancy')} ${sortBtn('name', 'Name A–Z')}
    </div>
    <p class="result-count">${list.length} ${list.length === 1 ? 'country' : 'countries'}${query ? ` matching “${esc(q)}”` : ''}${region !== 'All' ? ` in ${esc(region)}` : ''}</p>
    ${list.length ? `<div class="table-wrap"><table class="data-table">
      <thead><tr><th>Country</th><th>Region</th><th class="num">Population</th><th class="num">GDP</th><th class="num">GDP per capita</th><th class="num">Life exp.</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`
      : `<p class="empty">No country matches that search. <a href="#/countries">Show all countries</a></p>`}
    <p class="source-note">Population: UN World Population Prospects 2024 · GDP: World Bank, ${DATA_YEAR} · Life expectancy: UN, ${DATA_YEAR}</p>
  </section>`;
}

// ---------------------------------------------------------------- country
export function countryView(code) {
  const c = BY_CODE[code];
  if (!c) return `<section><h1>Country not found</h1><p>No country with the code “${esc(code)}” is in the atlas. <a href="#/countries">Browse all countries</a></p></section>`;
  const cards = ['pop', 'gdp', 'gdppc', 'life', 'hdi', 'unemp']
    .map((key) => statCard(indicatorByKey[key], c[key], code)).join('');
  const tableRows = INDICATORS.map((ind) => {
    const world = WORLD[ind.key];
    const diff = ((c[ind.key] - world) / world) * 100;
    const vs = diff >= 0 ? `+${diff.toFixed(0)}%` : `${diff.toFixed(0)}%`;
    return `<tr><td>${esc(ind.label)}</td><td class="num"><strong>${esc(fmtValue(ind, c[ind.key]))}</strong> ${ind.unit}</td>
      <td class="num">${esc(fmtValue(ind, world))}</td><td class="num">${vs} vs world</td>
      <td>${esc(ind.source)}, ${ind.year}</td></tr>`;
  }).join('');
  const others = COUNTRIES.filter((x) => x.region === c.region && x.code !== code).slice(0, 4);
  return `
  <section>
    <p class="crumbs"><a href="#/countries">Countries</a> › ${esc(c.region)}</p>
    <h1>${esc(c.name)}</h1>
    <p class="lede">Capital ${esc(c.capital)} · ${esc(c.currency)} · ${esc(c.language)} · All figures for ${DATA_YEAR} unless stated.</p>
    <div class="stat-grid">${cards}</div>
    <p><button class="btn" data-action="add-compare" data-code="${c.code}">+ Add to comparison</button>
    <a class="btn ghost" href="#/compare?c=${c.code}">Compare ${esc(c.name)} →</a></p>
  </section>

  <section class="two-col">
    <div>
      ${sectionHead('Population, 2014–2023', 'Millions — UN World Population Prospects 2024')}
      <div class="card chart-card">${lineChart(c.popSeries.map((v, i) => ({ x: String(2014 + i), y: v })), { formatY: (v) => fmtNum(v, 0) + 'm' })}
      <p class="chart-note">Change over the decade: ${pctChange(c.popSeries)}</p></div>
    </div>
    <div>
      ${sectionHead('Economy, 2014–2023', 'GDP, nominal, US$ billion — World Bank')}
      <div class="card chart-card">${lineChart([2014, 2017, 2020, 2022, 2023].map((yr, i) => ({ x: String(yr), y: c.gdpSeries[i] })), { formatY: (v) => '$' + fmtNum(v) + 'bn', color: '#2f9e8f' })}
      <p class="chart-note">Change over the decade: ${pctChange(c.gdpSeries)}</p></div>
    </div>
  </section>

  <section>
    ${sectionHead('Age structure', 'Share of the population by age group, 2023 — UN')}
    <div class="card">${ageStack(c.ageMix)}
    <p class="chart-note">Median age ${c.age.toFixed(1)} years — ${c.age > 40 ? 'one of the oldest populations in the atlas' : c.age < 25 ? 'one of the youngest populations in the atlas' : 'close to the world median of 30.4 years'}.</p></div>
  </section>

  <section>
    ${sectionHead(`All indicators — ${esc(c.name)} vs the world`, 'Each figure with its source and year')}
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Indicator</th><th class="num">${esc(c.name)}</th><th class="num">World</th><th class="num">Difference</th><th>Source</th></tr></thead>
      <tbody>${tableRows}</tbody></table></div>
  </section>

  ${others.length ? `<section>
    ${sectionHead(`More in ${esc(c.region)}`, 'Other countries in the same region')}
    <div class="country-chips">${others.map((x) => `<a class="chip-link" href="#/country/${x.code}">${esc(x.name)} →</a>`).join('')}</div>
  </section>` : ''}`;
}

// ---------------------------------------------------------------- compare
export function compareView(codes = []) {
  const picked = [...new Set(codes.filter((code) => BY_CODE[code]))].slice(0, 3);
  while (picked.length < 2) {
    const fallback = ['IND', 'CHN', 'USA'].find((code) => !picked.includes(code));
    if (!fallback) break;
    picked.push(fallback);
  }
  const options = (selected) => COUNTRIES.map((c) =>
    `<option value="${c.code}"${c.code === selected ? ' selected' : ''}>${esc(c.name)}</option>`).join('');
  const selects = [0, 1, 2].map((i) => `<label>Country ${i + 1}
    <select data-action="compare-select" data-slot="${i}">${picked[i] ? options(picked[i]) : '<option value="">— pick —</option>' + options('')}</select></label>`).join('');
  const chartKeys = ['gdp', 'gdppc', 'pop', 'life', 'urban', 'internet'];
  const groups = chartKeys.map((key) => ({ label: indicatorByKey[key].label, values: picked.map((code) => BY_CODE[code][key]), format: (v) => fmtValue(indicatorByKey[key], v) }));
  const series = picked.map((code, i) => ({ label: BY_CODE[code].name, color: ['#0e7c7b', '#e8a33d', '#2f9e8f'][i] }));
  const fmtFor = (key) => (v) => fmtValue(indicatorByKey[key], v);
  const rows = INDICATORS.map((ind) => {
    const vals = picked.map((code) => BY_CODE[code][ind.key]);
    const best = ind.lowerIsBetter ? Math.min(...vals) : Math.max(...vals);
    const cells = vals.map((v) => `<td class="num${v === best ? ' best' : ''}">${esc(fmtValue(ind, v))}</td>`).join('');
    return `<tr><td>${esc(ind.label)} <span class="unit">(${esc(ind.unit)})</span></td>${cells}</tr>`;
  }).join('');
  const headCells = picked.map((code) => `<th class="num">${countryLink(code)}</th>`).join('');
  return `
  <section>
    <p class="eyebrow">Compare</p>
    <h1>Compare countries</h1>
    <p class="lede">Pick up to three countries and see them side by side. The highlighted figure in each row is the best of the three — lowest for unemployment, inflation and CO₂ per capita, highest for the rest.</p>
    <div class="controls">${selects}
      <button class="btn" data-action="compare-reset">Reset</button>
    </div>
    <p class="result-count">Comparing ${picked.map((code) => esc(BY_CODE[code].name)).join(', ')} — ${DATA_YEAR} figures</p>
  </section>
  <section>
    ${sectionHead('Head to head', 'Six headline indicators, side by side')}
    <div class="card chart-card">${groupedBars(groups, series)}</div>
    <p class="chart-note">Each row is scaled to its own largest value, so compare within a row, not across rows. Exact figures are in the table below.</p>
  </section>
  <section>
    ${sectionHead('Full comparison', 'All twelve indicators')}
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Indicator</th>${headCells}</tr></thead>
      <tbody>${rows}</tbody></table></div>
    <p class="source-note">Sources: World Bank, UN, IMF, ILO, UNDP and ITU — see <a href="#/about">About the data</a> for each indicator’s source and year.</p>
  </section>`;
}

// ---------------------------------------------------------------- rankings
export function rankingsView(indicatorKey = 'gdp') {
  const ind = indicatorByKey[indicatorKey] || indicatorByKey.gdp;
  const sorted = [...COUNTRIES].sort((a, b) => b[ind.key] - a[ind.key]);
  const top10 = sorted.slice(0, 10);
  const buttons = INDICATORS.map((i) =>
    `<button class="chip${i.key === ind.key ? ' active' : ''}" data-action="ranking-indicator" data-indicator="${i.key}" aria-pressed="${i.key === ind.key}">${esc(i.label)}</button>`).join('');
  const rows = sorted.map((c, i) => `<tr>
    <td class="num">${i + 1}</td><td>${countryLink(c.code)}</td>
    <td class="num"><strong>${esc(fmtValue(ind, c[ind.key]))}</strong></td>
    <td class="num">${esc(ind.unit)}</td>
    <td><button class="btn small" data-action="add-compare" data-code="${c.code}">+ Compare</button></td>
  </tr>`).join('');
  return `
  <section>
    <p class="eyebrow">Rankings</p>
    <h1>Rankings by ${esc(ind.label.toLowerCase())}</h1>
    <p class="lede">${esc(ind.label)} — ${esc(ind.source)}, ${ind.year}. Pick another indicator to re-rank all ${COUNTRIES.length} countries.</p>
    <div class="chip-row" role="group" aria-label="Choose indicator">${buttons}</div>
  </section>
  <section>
    ${sectionHead(`Top 10 — ${esc(ind.label)}`, `${esc(ind.source)}, ${ind.year}`)}
    <div class="card chart-card">${barChart(top10.map((c) => ({ label: c.name, value: c[ind.key], href: `#/country/${c.code}` })), { format: (v) => fmtValue(ind, v) })}</div>
  </section>
  <section>
    ${sectionHead(`All ${COUNTRIES.length} countries`, `Sorted by ${esc(ind.label.toLowerCase())}`)}
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th class="num">#</th><th>Country</th><th class="num">${esc(ind.label)}</th><th class="num">Unit</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>
  </section>`;
}

// ---------------------------------------------------------------- about
export function aboutView() {
  const rows = INDICATORS.map((ind) => `<tr><td>${esc(ind.label)}</td><td>${esc(ind.source)}</td><td class="num">${ind.year}</td></tr>`).join('');
  return `
  <section>
    <p class="eyebrow">About</p>
    <h1>About AtlasStat</h1>
    <p class="lede">AtlasStat is an independent atlas of national statistics. It is not affiliated with
    the World Bank, the United Nations, the IMF or any national statistics office, and it copies no other
    site’s design, text or images.</p>
  </section>
  <section>
    ${sectionHead('What this site does', '')}
    <div class="card prose">
      <p>AtlasStat puts the headline statistics of 28 countries — home to about 5.9 billion people, nearly
      three quarters of the world — in one place, in plain language, with a chart for every trend and a
      source and year printed next to every figure.</p>
      <ul>
        <li><strong>Dashboard</strong> — the world at a glance, the largest economies, the most populous countries, the longest lives and the fastest-growing populations.</li>
        <li><strong>Countries</strong> — browse, search and sort all 28 countries by any headline figure.</li>
        <li><strong>Country profiles</strong> — twelve indicators, population and GDP trends since 2014, age structure, and each country set against the world average.</li>
        <li><strong>Compare</strong> — up to three countries side by side, chart and table.</li>
        <li><strong>Rankings</strong> — every country ranked on any of the twelve indicators.</li>
      </ul>
    </div>
  </section>
  <section>
    ${sectionHead('Sources and years', 'One row per indicator — the same source printed next to the figure on every page')}
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Indicator</th><th>Source</th><th class="num">Year</th></tr></thead>
      <tbody>${rows}</tbody></table></div>
    <p class="source-note">Figures are the latest published values available when this site was built.
    Where a source revises its figures, the next edition of the atlas picks the revision up. Values are
    rounded for display; ranks are computed from the unrounded figures.</p>
  </section>
  <section>
    ${sectionHead('How to read the figures', '')}
    <div class="card prose">
      <p><strong>GDP</strong> is nominal, in current US dollars, so it moves with exchange rates as well as
      with real growth. <strong>GDP per capita</strong> divides that by the population. <strong>Life
      expectancy</strong> is life expectancy at birth. <strong>Unemployment</strong> is the ILO modelled
      estimate as a share of the labour force. <strong>HDI</strong> runs from 0 to 1; above 0.8 is “very
      high” human development by the UNDP’s bands. <strong>CO₂ per capita</strong> counts emissions from
      fossil fuels and industry.</p>
      <p>Population and GDP trends use the published annual figures; the population series runs 2014–2023
      and the GDP series 2014, 2017, 2020, 2022 and 2023, the years the World Bank’s series is quoted at.</p>
    </div>
  </section>`;
}

