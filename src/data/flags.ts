// Public-site feature flags.
//
// asciiArt: master switch for the ASCII / canvas art across the home hero
// (AsciiSignal) and the About focus cards (AsciiFocusCard + AsciiRasterScript).
// Turned OFF 2026-06-25. The art reads as rough, so it is hidden from the public
// site until it gets a revision pass. Flip back to `true` to restore it.
export const flags = {
  asciiArt: false,
} as const;
