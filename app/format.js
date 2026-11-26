// Number formatting for AtlasStat: every figure on the site goes through here
// so units, decimals and thousands separators stay consistent.

export function fmtNum(n, decimals = 0) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Short form for axis labels: 1,428.6 -> "1.43B", 27,720 -> "27.7T".
export function fmtShort(n) {
  const abs = Math.abs(n);
  if (abs >= 1e12) return (n / 1e12).toFixed(2).replace(/\.?0+$/, '') + 'T';
  if (abs >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (abs >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (abs >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

// Format one indicator value the way its card shows it, e.g. "1,428.6m".
export function fmtValue(indicator, value) {
  const d = indicator.decimals;
  switch (indicator.format) {
    case 'millions': return fmtNum(value, d) + 'm';
    case 'billions': return '$' + fmtNum(value, d) + 'bn';
    case 'dollars': return '$' + fmtNum(value, d);
    case 'percent': return fmtNum(value, d) + '%';
    default: return fmtNum(value, d);
  }
}

// "+1.4%" change between the first and last point of a series.
export function pctChange(series) {
  const first = series[0];
  const last = series[series.length - 1];
  const pct = ((last - first) / first) * 100;
  return (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%';
}

// Ordinal: 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 11 -> "11th".
export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
