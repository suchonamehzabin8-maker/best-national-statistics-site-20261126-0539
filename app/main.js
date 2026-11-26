// AtlasStat bootstrap: render on load and on every hash change, and wire up
// every control by delegation so a re-render never loses its handlers.

import { render, parseRoute, countriesHash } from './router.js';

function currentCountriesState() {
  const { params } = parseRoute();
  return {
    q: params.get('q') || '',
    region: params.get('region') || 'All',
    sort: params.get('sort') || 'pop',
  };
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

document.addEventListener('DOMContentLoaded', () => {
  render();

  window.addEventListener('hashchange', () => {
    render();
    // After a re-render triggered by typing, put the caret back in the search box.
    const q = document.getElementById('country-search');
    if (q && document.activeElement !== q && window.__atlasFocusSearch) {
      q.focus();
      q.setSelectionRange(q.value.length, q.value.length);
      window.__atlasFocusSearch = false;
    }
  });

  // All clicks on controls with a data-action attribute.
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    if (action === 'sort') {
      event.preventDefault();
      const state = currentCountriesState();
      state.sort = el.dataset.sort;
      go(countriesHash(state));
    }

    if (action === 'ranking-indicator') {
      event.preventDefault();
      go('#/rankings?i=' + encodeURIComponent(el.dataset.indicator));
    }

    if (action === 'add-compare') {
      event.preventDefault();
      const code = el.dataset.code;
      const { parts, params } = parseRoute();
      let codes = parts[0] === 'compare'
        ? (params.get('c') || '').split(',').filter(Boolean)
        : [];
      if (!codes.includes(code)) {
        if (codes.length >= 3) codes[2] = code;
        else codes.push(code);
      }
      go('#/compare?c=' + codes.join(','));
    }

    if (action === 'compare-reset') {
      event.preventDefault();
      go('#/compare');
    }
  });

  // Selects and search inputs.
  document.addEventListener('change', (event) => {
    const el = event.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'region-select') {
      const state = currentCountriesState();
      state.region = el.value;
      go(countriesHash(state));
    }
    if (el.dataset.action === 'compare-select') {
      const codes = [...document.querySelectorAll('[data-action="compare-select"]')]
        .map((s) => s.value).filter(Boolean).slice(0, 3);
      go('#/compare?c=' + codes.join(','));
    }
  });

  const onSearchInput = debounce((el) => {
    const state = currentCountriesState();
    state.q = el.value;
    window.__atlasFocusSearch = true;
    go(countriesHash(state));
  }, 300);

  document.addEventListener('input', (event) => {
    const el = event.target.closest('[data-action="search-input"]');
    if (el) onSearchInput(el);
  });

  // Hero search form: jump to the countries page with the query.
  document.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-action="hero-search"]');
    if (!form) return;
    event.preventDefault();
    const q = form.querySelector('input').value.trim();
    go(countriesHash({ q, region: 'All', sort: 'pop' }));
  });
});
