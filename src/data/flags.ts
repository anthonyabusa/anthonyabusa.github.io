// Public-site feature flags.
//
// asciiArt: master switch for the ASCII / canvas art across the home hero
// (AsciiHeroRaster: monogram source) and the About focus cards (AsciiFocusCard
// + AsciiRasterScript, nine areas). Turned OFF 2026-06-25 for a revision pass;
// turned back ON 2026-07-18 after the #439 raster rebuild (shared engine,
// per-icon brightness normalization, hover-reveal cards, hero raster treatment).
export const flags = {
  asciiArt: true,
} as const;
