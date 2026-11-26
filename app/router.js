// Hash routing for AtlasStat. Routes:
//   #/                       home dashboard
//   #/countries?q=&region=&sort=   browse all countries
//   #/country/IND            one country profile
//   #/compare?c=IND,CHN,USA compare up to three countries
//   #/rankings?i=gdp        rankings on one indicator
//   #/about                  about the data

import { BY_CODE } from './data.js';
import { homeView, countriesView, countryView, compareView, rankingsView, aboutView } from './views.js';

export function parseRoute() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const [path, queryString] = raw.split('?');
  return { parts: path.split('/').filter(Boolean), params: new URLSearchParams(queryString || '') };
}

function setActiveNav(page) {
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === `#/${page}` || (page === '' && href === '#/'));
    a.removeAttribute('aria-current');
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
  });
}

export function render() {
  const { parts, params } = parseRoute();
  const [page, arg] = parts;
  const app = document.getElementById('app');
  let html;
  let title = 'AtlasStat — National Statistics, Clearly';
  if (!page) {
    html = homeView();
  } else if (page === 'countries') {
    html = countriesView({
      q: params.get('q') || '',
      region: params.get('region') || 'All',
      sort: params.get('sort') || 'pop',
    });
    title = 'All countries — AtlasStat';
  } else if (page === 'country' && arg) {
    html = countryView(arg.toUpperCase());
    const c = BY_CODE[arg.toUpperCase()];
    if (c) title = `${c.name} — AtlasStat`;
  } else if (page === 'compare') {
    html = compareView((params.get('c') || '').split(',').filter(Boolean));
    title = 'Compare countries — AtlasStat';
  } else if (page === 'rankings') {
    const key = params.get('i') || 'gdp';
    html = rankingsView(key);
    title = 'Rankings — AtlasStat';
  } else if (page === 'about') {
    html = aboutView();
    title = 'About AtlasStat';
  } else {
    html = `<section><h1>Page not found</h1><p>That page is not in the atlas. <a href="#/">Back to the dashboard</a></p></section>`;
    title = 'Not found — AtlasStat';
  }
  app.innerHTML = html;
  document.title = title;
  setActiveNav(page || '');
  window.scrollTo(0, 0);
}

// Rebuild the hash for the countries page from its current controls.
export function countriesHash({ q, region, sort }) {
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (region && region !== 'All') p.set('region', region);
  if (sort && sort !== 'pop') p.set('sort', sort);
  const qs = p.toString();
  return '#/countries' + (qs ? '?' + qs : '');
}
