// Period life expectancy at birth, in years. Decadal, rounded.
//
// Sources: Our World in Data - "Life Expectancy" (ourworldindata.org/life-expectancy),
// which compiles UN World Population Prospects (1950–) and, for the pre-1950
// world estimate, Riley (2005), "Estimates of Regional and Global Life
// Expectancy, 1800–2001". Values are rounded to one decimal and are best-estimate
// figures, not precise measurements - treat the shape, not the digits, as the story.
// License: CC BY 4.0.

export interface YearValue {
  year: number;
  value: number;
}

// The world as a whole.
export const world: YearValue[] = [
  { year: 1800, value: 28.5 },
  { year: 1850, value: 29.3 },
  { year: 1880, value: 30.7 },
  { year: 1900, value: 32.0 },
  { year: 1913, value: 34.1 },
  { year: 1918, value: 27.5 }, // influenza pandemic
  { year: 1920, value: 34.0 },
  { year: 1930, value: 36.0 },
  { year: 1940, value: 39.0 },
  { year: 1950, value: 46.5 },
  { year: 1960, value: 50.9 },
  { year: 1970, value: 56.8 },
  { year: 1980, value: 61.9 },
  { year: 1990, value: 64.4 },
  { year: 2000, value: 66.5 },
  { year: 2010, value: 70.1 },
  { year: 2019, value: 72.8 },
  { year: 2021, value: 71.0 }, // COVID-19
];

// Two contrasting national paths, to show how uneven the gain was.
export const countries: { name: string; accent: string; series: YearValue[] }[] = [
  {
    name: 'United Kingdom',
    accent: 'var(--accent-2)',
    series: [
      { year: 1800, value: 38.5 },
      { year: 1850, value: 40.0 },
      { year: 1900, value: 46.3 },
      { year: 1950, value: 68.7 },
      { year: 1980, value: 73.7 },
      { year: 2000, value: 77.7 },
      { year: 2021, value: 80.4 },
    ],
  },
  {
    name: 'South Korea',
    accent: 'var(--accent-4)',
    series: [
      { year: 1800, value: 26.0 },
      { year: 1900, value: 26.0 },
      { year: 1950, value: 37.6 },
      { year: 1970, value: 62.3 },
      { year: 1990, value: 71.3 },
      { year: 2000, value: 76.0 },
      { year: 2021, value: 83.7 },
    ],
  },
];

// Moments worth naming on the world line.
export interface Annotation {
  year: number;
  value: number;
  label: string;
  dir: 'up' | 'down';
}
export const annotations: Annotation[] = [
  { year: 1918, value: 27.5, label: 'The 1918 influenza pandemic erases a century of gains in a single year.', dir: 'down' },
  { year: 1950, value: 46.5, label: 'After 1950, antibiotics, vaccines and clean water lift the whole world at once.', dir: 'up' },
  { year: 2021, value: 71.0, label: 'COVID-19 bends the line down for the first time in a generation.', dir: 'down' },
];
