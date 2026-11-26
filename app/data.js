// AtlasStat data — national statistics for 28 countries.
// Figures are the published values for 2023 unless a series says otherwise.
// Sources: World Bank World Development Indicators, UN World Population
// Prospects 2024, IMF World Economic Outlook, UNDP Human Development Report,
// ILO modelled estimates, ITU. Every indicator below names its source and year
// so the site can print it next to each figure.

export const DATA_YEAR = 2023;

// Indicator definitions: key, label, unit, source, year, and how to format it.
// `higher` is only used for the "better / worse" tint on comparison bars.
export const INDICATORS = [
  { key: 'pop',    label: 'Population',        unit: 'million',   source: 'UN World Population Prospects 2024', year: 2023, format: 'millions', decimals: 1 },
  { key: 'gdp',    label: 'GDP, nominal',      unit: 'US$ billion', source: 'World Bank, World Development Indicators', year: 2023, format: 'billions', decimals: 0 },
  { key: 'gdppc',  label: 'GDP per capita',    unit: 'US$',       source: 'World Bank, World Development Indicators', year: 2023, format: 'dollars', decimals: 0 },
  { key: 'life',   label: 'Life expectancy',   unit: 'years',     source: 'UN World Population Prospects 2024', year: 2023, format: 'plain', decimals: 1 },
  { key: 'age',    label: 'Median age',        unit: 'years',     source: 'UN World Population Prospects 2024', year: 2024, format: 'plain', decimals: 1 },
  { key: 'urban',  label: 'Urban population',  unit: '% of total', source: 'World Bank, World Development Indicators', year: 2023, format: 'percent', decimals: 0 },
  { key: 'unemp',  label: 'Unemployment',      unit: '% of labour force', source: 'ILO modelled estimates', year: 2023, format: 'percent', decimals: 1, lowerIsBetter: true },
  { key: 'infl',   label: 'Inflation, consumer prices', unit: '% per year', source: 'IMF World Economic Outlook', year: 2023, format: 'percent', decimals: 1, lowerIsBetter: true },
  { key: 'hdi',    label: 'Human Development Index', unit: '0–1', source: 'UNDP Human Development Report 2023/24', year: 2022, format: 'plain', decimals: 3 },
  { key: 'internet', label: 'People using the internet', unit: '% of population', source: 'ITU World Telecommunication/ICT Indicators', year: 2023, format: 'percent', decimals: 0 },
  { key: 'co2',    label: 'CO2 emissions per capita', unit: 'tonnes', source: 'Global Carbon Budget / Our World in Data', year: 2022, format: 'plain', decimals: 1, lowerIsBetter: true },
  { key: 'fert',   label: 'Fertility rate',    unit: 'births per woman', source: 'UN World Population Prospects 2024', year: 2023, format: 'plain', decimals: 1 },
];

export const WORLD = {
  pop: 8045, gdp: 105000, gdppc: 13100, life: 71.4, age: 30.4, urban: 57,
  unemp: 5.1, infl: 6.6, hdi: 0.739, internet: 67, co2: 4.7, fert: 2.2,
};

// Population 2014-2023, millions (UN World Population Prospects 2024).
// GDP 2014 / 2017 / 2020 / 2022 / 2023, US$ billion (World Bank).
// ageMix is the share of the population aged 0-14 / 15-64 / 65+ in 2023 (UN).
export const COUNTRIES = [
  { code: 'IND', name: 'India', region: 'South Asia', capital: 'New Delhi', currency: 'Indian rupee (INR)', language: 'Hindi, English',
    pop: 1428.6, gdp: 3568, gdppc: 2500, life: 67.7, age: 28.2, urban: 36, unemp: 4.8, infl: 5.4, hdi: 0.644, internet: 52, co2: 1.9, fert: 2.0,
    popSeries: [1295, 1309.8, 1324.7, 1339.5, 1354.4, 1369.2, 1384.1, 1398.9, 1413.8, 1428.6],
    gdpSeries: [2040, 2650, 2670, 3350, 3568], ageMix: [25, 68, 7] },
  { code: 'CHN', name: 'China', region: 'East Asia', capital: 'Beijing', currency: 'Chinese yuan (CNY)', language: 'Mandarin Chinese',
    pop: 1411.8, gdp: 17794, gdppc: 12600, life: 78.2, age: 39.0, urban: 64, unemp: 5.2, infl: 0.2, hdi: 0.788, internet: 77, co2: 8.0, fert: 1.0,
    popSeries: [1365, 1370.2, 1375.4, 1380.6, 1385.8, 1391, 1396.2, 1401.4, 1406.6, 1411.8],
    gdpSeries: [10480, 12310, 14690, 17960, 17794], ageMix: [17, 68, 15] },
  { code: 'USA', name: 'United States', region: 'North America', capital: 'Washington, D.C.', currency: 'US dollar (USD)', language: 'English',
    pop: 334.9, gdp: 27720, gdppc: 82700, life: 78.4, age: 38.5, urban: 83, unemp: 3.6, infl: 4.1, hdi: 0.927, internet: 92, co2: 14.3, fert: 1.6,
    popSeries: [319, 320.8, 322.5, 324.3, 326.1, 327.8, 329.6, 331.4, 333.1, 334.9],
    gdpSeries: [17520, 19610, 21320, 25740, 27720], ageMix: [18, 65, 17] },
  { code: 'IDN', name: 'Indonesia', region: 'South-East Asia', capital: 'Jakarta', currency: 'Indonesian rupiah (IDR)', language: 'Indonesian',
    pop: 277.5, gdp: 1371, gdppc: 4940, life: 67.6, age: 29.8, urban: 58, unemp: 3.5, infl: 3.7, hdi: 0.713, internet: 67, co2: 2.3, fert: 2.1,
    popSeries: [253, 255.7, 258.4, 261.2, 263.9, 266.6, 269.3, 272.1, 274.8, 277.5],
    gdpSeries: [890, 1020, 1060, 1320, 1371], ageMix: [24, 68, 8] },
  { code: 'PAK', name: 'Pakistan', region: 'South Asia', capital: 'Islamabad', currency: 'Pakistani rupee (PKR)', language: 'Urdu, English',
    pop: 240.5, gdp: 338, gdppc: 1400, life: 66.1, age: 22.5, urban: 37, unemp: 5.5, infl: 30.8, hdi: 0.544, internet: 36, co2: 0.9, fert: 3.3,
    popSeries: [197, 201.8, 206.7, 211.5, 216.3, 221.2, 226, 230.8, 235.7, 240.5],
    gdpSeries: [260, 340, 300, 380, 338], ageMix: [34, 62, 4] },
  { code: 'NGA', name: 'Nigeria', region: 'West Africa', capital: 'Abuja', currency: 'Nigerian naira (NGN)', language: 'English',
    pop: 223.8, gdp: 363, gdppc: 1630, life: 52.6, age: 18.1, urban: 54, unemp: 5.0, infl: 24.7, hdi: 0.548, internet: 42, co2: 0.6, fert: 5.0,
    popSeries: [177, 182.2, 187.4, 192.6, 197.8, 203, 208.2, 213.4, 218.6, 223.8],
    gdpSeries: [570, 380, 430, 480, 363], ageMix: [43, 54, 3] },
  { code: 'BRA', name: 'Brazil', region: 'South America', capital: 'Brasilia', currency: 'Brazilian real (BRL)', language: 'Portuguese',
    pop: 216.4, gdp: 2174, gdppc: 10000, life: 75.9, age: 33.6, urban: 87, unemp: 8.0, infl: 4.6, hdi: 0.760, internet: 81, co2: 2.2, fert: 1.6,
    popSeries: [204, 205.4, 206.8, 208.1, 209.5, 210.9, 212.3, 213.6, 215, 216.4],
    gdpSeries: [2460, 2060, 1450, 1920, 2174], ageMix: [20, 69, 11] },
  { code: 'BGD', name: 'Bangladesh', region: 'South Asia', capital: 'Dhaka', currency: 'Bangladeshi taka (BDT)', language: 'Bengali',
    pop: 172.9, gdp: 437, gdppc: 2550, life: 73.8, age: 27.6, urban: 40, unemp: 4.5, infl: 9.0, hdi: 0.670, internet: 45, co2: 0.6, fert: 1.9,
    popSeries: [156, 157.9, 159.8, 161.6, 163.5, 165.4, 167.3, 169.1, 171, 172.9],
    gdpSeries: [210, 300, 370, 420, 437], ageMix: [26, 68, 6] },
  { code: 'RUS', name: 'Russia', region: 'Eastern Europe', capital: 'Moscow', currency: 'Russian ruble (RUB)', language: 'Russian',
    pop: 144.4, gdp: 2021, gdppc: 14000, life: 72.8, age: 40.3, urban: 75, unemp: 3.2, infl: 5.9, hdi: 0.821, internet: 92, co2: 11.4, fert: 1.4,
    popSeries: [144, 144, 144.1, 144.1, 144.2, 144.2, 144.3, 144.3, 144.4, 144.4],
    gdpSeries: [2060, 1570, 1490, 2240, 2021], ageMix: [17, 66, 17] },
  { code: 'MEX', name: 'Mexico', region: 'North America', capital: 'Mexico City', currency: 'Mexican peso (MXN)', language: 'Spanish',
    pop: 129.7, gdp: 1794, gdppc: 13800, life: 75.4, age: 29.6, urban: 81, unemp: 2.8, infl: 5.5, hdi: 0.781, internet: 81, co2: 3.7, fert: 1.8,
    popSeries: [121, 122, 122.9, 123.9, 124.9, 125.8, 126.8, 127.8, 128.7, 129.7],
    gdpSeries: [1320, 1160, 1100, 1420, 1794], ageMix: [24, 66, 10] },
  { code: 'JPN', name: 'Japan', region: 'East Asia', capital: 'Tokyo', currency: 'Japanese yen (JPY)', language: 'Japanese',
    pop: 124.6, gdp: 4204, gdppc: 33700, life: 84.0, age: 49.5, urban: 92, unemp: 2.6, infl: 3.3, hdi: 0.920, internet: 93, co2: 8.6, fert: 1.2,
    popSeries: [127.3, 127, 126.7, 126.4, 126.1, 125.8, 125.5, 125.2, 124.9, 124.6],
    gdpSeries: [4900, 4930, 5040, 4260, 4204], ageMix: [12, 59, 29] },
  { code: 'ETH', name: 'Ethiopia', region: 'East Africa', capital: 'Addis Ababa', currency: 'Ethiopian birr (ETB)', language: 'Amharic',
    pop: 126.5, gdp: 164, gdppc: 1290, life: 65.0, age: 19.5, urban: 22, unemp: 3.6, infl: 30.2, hdi: 0.492, internet: 25, co2: 0.1, fert: 3.9,
    popSeries: [100, 102.9, 105.9, 108.8, 111.8, 114.7, 117.7, 120.6, 123.6, 126.5],
    gdpSeries: [60, 80, 110, 130, 164], ageMix: [38, 59, 3] },
  { code: 'PHL', name: 'Philippines', region: 'South-East Asia', capital: 'Manila', currency: 'Philippine peso (PHP)', language: 'Filipino, English',
    pop: 117.3, gdp: 437, gdppc: 3720, life: 72.2, age: 25.3, urban: 47, unemp: 4.3, infl: 6.0, hdi: 0.710, internet: 74, co2: 1.3, fert: 2.5,
    popSeries: [100, 101.9, 103.8, 105.8, 107.7, 109.6, 111.5, 113.5, 115.4, 117.3],
    gdpSeries: [290, 330, 360, 400, 437], ageMix: [29, 65, 6] },
  { code: 'EGY', name: 'Egypt', region: 'North Africa', capital: 'Cairo', currency: 'Egyptian pound (EGP)', language: 'Arabic',
    pop: 112.7, gdp: 396, gdppc: 3500, life: 69.5, age: 24.6, urban: 43, unemp: 7.2, infl: 24.4, hdi: 0.728, internet: 72, co2: 2.3, fert: 2.7,
    popSeries: [93, 95.2, 97.4, 99.6, 101.8, 103.9, 106.1, 108.3, 110.5, 112.7],
    gdpSeries: [310, 240, 370, 410, 396], ageMix: [33, 62, 5] },
  { code: 'VNM', name: 'Vietnam', region: 'South-East Asia', capital: 'Hanoi', currency: 'Vietnamese dong (VND)', language: 'Vietnamese',
    pop: 98.9, gdp: 430, gdppc: 4340, life: 74.6, age: 32.5, urban: 39, unemp: 2.3, infl: 3.3, hdi: 0.726, internet: 79, co2: 2.8, fert: 1.9,
    popSeries: [91, 91.9, 92.8, 93.6, 94.5, 95.4, 96.3, 97.1, 98, 98.9],
    gdpSeries: [230, 280, 350, 410, 430], ageMix: [23, 69, 8] },
  { code: 'COD', name: 'DR Congo', region: 'Central Africa', capital: 'Kinshasa', currency: 'Congolese franc (CDF)', language: 'French',
    pop: 102.3, gdp: 66, gdppc: 660, life: 61.7, age: 16.6, urban: 46, unemp: 4.5, infl: 19.9, hdi: 0.479, internet: 27, co2: 0.0, fert: 5.6,
    popSeries: [76, 78.9, 81.8, 84.8, 87.7, 90.6, 93.5, 96.5, 99.4, 102.3],
    gdpSeries: [40, 40, 50, 60, 66], ageMix: [46, 51, 3] },
  { code: 'DEU', name: 'Germany', region: 'Western Europe', capital: 'Berlin', currency: 'Euro (EUR)', language: 'German',
    pop: 84.7, gdp: 4456, gdppc: 52600, life: 80.7, age: 45.7, urban: 77, unemp: 3.0, infl: 6.0, hdi: 0.950, internet: 92, co2: 7.6, fert: 1.4,
    popSeries: [81, 81.4, 81.8, 82.2, 82.6, 83.1, 83.5, 83.9, 84.3, 84.7],
    gdpSeries: [3890, 3720, 3890, 4120, 4456], ageMix: [14, 64, 22] },
  { code: 'GBR', name: 'United Kingdom', region: 'Northern Europe', capital: 'London', currency: 'Pound sterling (GBP)', language: 'English',
    pop: 67.7, gdp: 3340, gdppc: 49200, life: 78.6, age: 40.3, urban: 84, unemp: 4.1, infl: 7.3, hdi: 0.940, internet: 97, co2: 5.2, fert: 1.6,
    popSeries: [65.1, 65.4, 65.7, 66, 66.3, 66.5, 66.8, 67.1, 67.4, 67.7],
    gdpSeries: [3080, 2700, 2710, 3110, 3340], ageMix: [18, 64, 18] },
  { code: 'FRA', name: 'France', region: 'Western Europe', capital: 'Paris', currency: 'Euro (EUR)', language: 'French',
    pop: 68.2, gdp: 3030, gdppc: 44300, life: 82.5, age: 42.3, urban: 81, unemp: 7.3, infl: 5.7, hdi: 0.910, internet: 93, co2: 4.6, fert: 1.7,
    popSeries: [66.2, 66.4, 66.6, 66.9, 67.1, 67.3, 67.5, 67.8, 68, 68.2],
    gdpSeries: [2860, 2600, 2640, 2830, 3030], ageMix: [18, 62, 20] },
  { code: 'ITA', name: 'Italy', region: 'Southern Europe', capital: 'Rome', currency: 'Euro (EUR)', language: 'Italian',
    pop: 58.8, gdp: 2265, gdppc: 38500, life: 83.1, age: 48.4, urban: 71, unemp: 7.7, infl: 5.9, hdi: 0.915, internet: 91, co2: 5.5, fert: 1.2,
    popSeries: [60.8, 60.6, 60.4, 60.1, 59.9, 59.7, 59.5, 59.2, 59, 58.8],
    gdpSeries: [2160, 1950, 1890, 2050, 2265], ageMix: [13, 64, 23] },
  { code: 'KOR', name: 'South Korea', region: 'East Asia', capital: 'Seoul', currency: 'South Korean won (KRW)', language: 'Korean',
    pop: 51.7, gdp: 1713, gdppc: 33100, life: 83.4, age: 44.6, urban: 81, unemp: 2.7, infl: 3.6, hdi: 0.929, internet: 97, co2: 11.7, fert: 0.7,
    popSeries: [50.4, 50.5, 50.7, 50.8, 51, 51.1, 51.3, 51.4, 51.6, 51.7],
    gdpSeries: [1480, 1620, 1640, 1680, 1713], ageMix: [12, 70, 18] },
  { code: 'CAN', name: 'Canada', region: 'North America', capital: 'Ottawa', currency: 'Canadian dollar (CAD)', language: 'English, French',
    pop: 39.9, gdp: 2140, gdppc: 53700, life: 81.8, age: 41.6, urban: 82, unemp: 5.4, infl: 3.9, hdi: 0.935, internet: 93, co2: 14.9, fert: 1.3,
    popSeries: [35.4, 35.9, 36.4, 36.9, 37.4, 37.9, 38.4, 38.9, 39.4, 39.9],
    gdpSeries: [1810, 1650, 1650, 2140, 2140], ageMix: [16, 66, 18] },
  { code: 'AUS', name: 'Australia', region: 'Oceania', capital: 'Canberra', currency: 'Australian dollar (AUD)', language: 'English',
    pop: 26.5, gdp: 1724, gdppc: 65000, life: 83.3, age: 37.9, urban: 86, unemp: 3.7, infl: 5.6, hdi: 0.946, internet: 94, co2: 15.4, fert: 1.6,
    popSeries: [23.5, 23.8, 24.2, 24.5, 24.8, 25.2, 25.5, 25.8, 26.2, 26.5],
    gdpSeries: [1470, 1330, 1400, 1680, 1724], ageMix: [18, 64, 18] },
  { code: 'KEN', name: 'Kenya', region: 'East Africa', capital: 'Nairobi', currency: 'Kenyan shilling (KES)', language: 'Swahili, English',
    pop: 55.1, gdp: 108, gdppc: 2000, life: 62.7, age: 20.1, urban: 29, unemp: 5.7, infl: 7.7, hdi: 0.601, internet: 40, co2: 0.3, fert: 3.1,
    popSeries: [45.4, 46.5, 47.6, 48.6, 49.7, 50.8, 51.9, 52.9, 54, 55.1],
    gdpSeries: [70, 80, 100, 110, 108], ageMix: [37, 60, 3] },
  { code: 'ARG', name: 'Argentina', region: 'South America', capital: 'Buenos Aires', currency: 'Argentine peso (ARS)', language: 'Spanish',
    pop: 45.8, gdp: 641, gdppc: 14000, life: 77.7, age: 32.4, urban: 92, unemp: 6.1, infl: 133.5, hdi: 0.849, internet: 90, co2: 4.0, fert: 1.9,
    popSeries: [43, 43.3, 43.6, 43.9, 44.2, 44.6, 44.9, 45.2, 45.5, 45.8],
    gdpSeries: [530, 640, 390, 630, 641], ageMix: [22, 65, 13] },
  { code: 'SAU', name: 'Saudi Arabia', region: 'Western Asia', capital: 'Riyadh', currency: 'Saudi riyal (SAR)', language: 'Arabic',
    pop: 36.9, gdp: 1068, gdppc: 28900, life: 76.0, age: 32.3, urban: 84, unemp: 3.4, infl: 2.3, hdi: 0.875, internet: 98, co2: 17.0, fert: 2.4,
    popSeries: [30.4, 31.1, 31.8, 32.6, 33.3, 34, 34.7, 35.5, 36.2, 36.9],
    gdpSeries: [760, 690, 700, 1100, 1068], ageMix: [22, 75, 3] },
  { code: 'TUR', name: 'Turkey', region: 'Western Asia', capital: 'Ankara', currency: 'Turkish lira (TRY)', language: 'Turkish',
    pop: 85.3, gdp: 1118, gdppc: 13100, life: 76.5, age: 33.8, urban: 77, unemp: 9.4, infl: 53.9, hdi: 0.855, internet: 87, co2: 5.0, fert: 1.5,
    popSeries: [77.5, 78.4, 79.2, 80.1, 81, 81.8, 82.7, 83.6, 84.4, 85.3],
    gdpSeries: [930, 860, 720, 910, 1118], ageMix: [22, 68, 10] },
  { code: 'ZAF', name: 'South Africa', region: 'Southern Africa', capital: 'Pretoria', currency: 'South African rand (ZAR)', language: 'Zulu, Xhosa, Afrikaans, English',
    pop: 60.4, gdp: 380, gdppc: 6200, life: 64.9, age: 28.0, urban: 68, unemp: 32.1, infl: 5.9, hdi: 0.717, internet: 72, co2: 7.8, fert: 2.2,
    popSeries: [54.1, 54.8, 55.5, 56.2, 56.9, 57.6, 58.3, 59, 59.7, 60.4],
    gdpSeries: [380, 350, 300, 410, 380], ageMix: [27, 66, 7] },
];

// Lookups the views use.
export const BY_CODE = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));
export const REGIONS = [...new Set(COUNTRIES.map((c) => c.region))].sort();

// Rank of a country on one indicator (1 = best value: largest, or smallest where
// the indicator says lower is better). Ties share the rank.
export function rankOf(code, key) {
  const ind = INDICATORS.find((i) => i.key === key);
  const sorted = [...COUNTRIES].sort((a, b) =>
    ind && ind.lowerIsBetter ? a[key] - b[key] : b[key] - a[key]);
  return sorted.findIndex((c) => c.code === code) + 1;
}

