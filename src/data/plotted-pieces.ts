// The gallery registry. Each entry is one visualization - a self-contained
// story with its own page at /pieces/<slug>. The index renders cards from this
// list in order; the piece page reads its own entry for the byline/source block.

export interface Piece {
  slug: string;
  title: string;
  dek: string; // one-line story hook shown on the card + as the piece standfirst
  kicker: string; // small category label
  accent: string; // CSS var used as the piece's signature hue
  source: { name: string; url: string; license: string };
  published: string; // ISO date
  tags: string[];
  status?: 'live' | 'soon';
}

export const pieces: Piece[] = [
  {
    slug: 'the-price-of-sunlight',
    title: 'The Price of Sunlight',
    dek: 'In one generation the cost of solar electricity fell more than 99 percent. It is now the cheapest power humanity has ever built, and still falling.',
    kicker: 'Energy · Global · 1976–2024',
    accent: 'var(--accent-3)',
    source: {
      name: 'IRENA · IEA · BloombergNEF · Ember · Our World in Data',
      url: 'https://ourworldindata.org/grapher/solar-pv-prices',
      license: 'Public data',
    },
    published: '2026-07-21',
    tags: ['Time series', 'Energy', 'Progress'],
    status: 'live',
  },
  {
    slug: 'who-gets-the-growth',
    title: 'Who Gets the Growth?',
    dek: 'Aggregate output has grown without interruption for seventy years. Its distribution has not kept pace.',
    kicker: 'Inequality · US · 1948–2025',
    accent: 'var(--accent-2)',
    source: {
      name: 'EPI · World Inequality Database · FRED · Piketty-Saez-Zucman',
      url: 'https://wid.world/country/usa/',
      license: 'Public data',
    },
    published: '2026-07-20',
    tags: ['Time series', 'Economics', 'Inequality'],
    status: 'live',
  },
  {
    slug: 'a-lengthening-life',
    title: 'A Lengthening Life',
    dek: 'For most of human history a newborn could expect about three decades. In two centuries the world more than doubled that, unevenly and against real setbacks.',
    kicker: 'Health · 1770–2021',
    accent: 'var(--accent)',
    source: {
      name: 'Our World in Data: Life Expectancy',
      url: 'https://ourworldindata.org/life-expectancy',
      license: 'CC BY 4.0',
    },
    published: '2026-07-03',
    tags: ['Time series', 'Global', 'Health'],
    status: 'live',
  },
];
