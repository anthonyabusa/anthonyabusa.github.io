// Per-type case-study section headers (Ant 2026-07-20: the old
// "What needed to change / How I built the system / What exists now" framing
// read like a wrecking ball and did not fit non-system work like the
// photojournalism exhibit). Each project.type selects a neutral three-part
// label set; the same word renders as the small uppercase eyebrow and the h2.
// Order is always [context, approach, outcome] -> challenge, approach, outcomes.
export const DEFAULT_CASE_HEADERS = ['Context', 'Approach', 'Outcome'] as const;

const caseHeadersByType: Record<string, readonly [string, string, string]> = {
  creative: ['Intent', 'Process', 'The work'],
  venture: ['Context', 'Approach', 'Outcome'],
  program: ['Context', 'Approach', 'Outcome'],
  infrastructure: ['Context', 'Approach', 'Outcome'],
  'open-source': ['Context', 'Approach', 'Outcome'],
  site: ['Context', 'Approach', 'Outcome'],
};

export function caseHeadersFor(type?: string): readonly [string, string, string] {
  return (type && caseHeadersByType[type]) || DEFAULT_CASE_HEADERS;
}
