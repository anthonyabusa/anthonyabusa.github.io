// Public-site feature flags.
//
// asciiArt: master switch for the ASCII / canvas art across the home hero
// (AsciiHeroRaster: monogram source) and the About focus cards (AsciiFocusCard
// + AsciiRasterScript, nine areas). Turned OFF 2026-06-25 for a revision pass;
// turned back ON 2026-07-18 after the #439 raster rebuild (shared engine,
// per-icon brightness normalization, hover-reveal cards, hero raster treatment).
// workWithMe: the /work-with-me consulting landing (AI implementation &
// enablement offer). OFF until Ant signs off on the copy: the page still builds
// but carries a noindex tag and gets no nav link, so it's reachable by direct
// URL for review yet undiscoverable and unindexed. Flip to true to launch it.
export const flags = {
  asciiArt: true,
  workWithMe: false,
} as const;
