// Each area carries a bespoke 24x24 stroke micro-SVG (fill none, currentColor,
// 2px round strokes) that redraws its original ASCII motif (noted per icon)
// in the same visual language as the site's inline arrow/CTA SVGs. Rendered
// via set:html inside the .ascii-icon chip system (pill + hero sizes); sizing
// comes from `.ascii-icon svg` in global.css. pathLength="1" normalizes every
// shape so the hover draw-on animation runs uniformly across the set.
const s =
  'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

export const focusAreas = [
  {
    slug: 'strategy',
    // ASCII motif: /-> (a forked path where one branch gets the arrow).
    svg: `<svg ${s}><path pathLength="1" d="M12 20v-6"/><path pathLength="1" d="M12 14 6 8"/><path pathLength="1" d="M12 14 19 7"/><path pathLength="1" d="M14 7h5v5"/></svg>`,
    title: 'Strategy',
    description: 'Market design, positioning, growth logic, stakeholder alignment, and the choices that determine where effort should go.',
  },
  {
    slug: 'operations',
    // ASCII motif: [::] (a framed 2x2 module grid).
    svg: `<svg ${s}><rect pathLength="1" x="4" y="4" width="16" height="16" rx="3"/><circle pathLength="1" cx="9.5" cy="9.5" r="1"/><circle pathLength="1" cx="14.5" cy="9.5" r="1"/><circle pathLength="1" cx="9.5" cy="14.5" r="1"/><circle pathLength="1" cx="14.5" cy="14.5" r="1"/></svg>`,
    title: 'Operations',
    description: 'Operating models, workflows, execution rhythms, logistics, metrics, and the routines that make ambitious ideas actually run.',
  },
  {
    slug: 'product-program-leadership',
    // ASCII motif: {<>} (angle brackets embracing a core mark).
    svg: `<svg ${s}><path pathLength="1" d="M8 7l-5 5 5 5"/><path pathLength="1" d="M16 7l5 5-5 5"/><path pathLength="1" d="M12 9.5 14.5 12 12 14.5 9.5 12z"/></svg>`,
    title: 'Product & Program Leadership',
    description: 'Turning messy ideas into scoped releases, roadmaps, feedback loops, dashboards, and repeatable delivery.',
  },
  {
    slug: 'ai-automation',
    // ASCII motif: >*_ (a prompt cursor with a spark).
    svg: `<svg ${s}><path pathLength="1" d="M4 7l6 5-6 5"/><path pathLength="1" d="M13 19h7"/><path pathLength="1" d="M17 4v6"/><path pathLength="1" d="M14.4 5.5l5.2 3"/><path pathLength="1" d="M14.4 8.5l5.2-3"/></svg>`,
    title: 'AI & Automation',
    description: 'Designing agent workflows, memory systems, analytics, and automations that reduce operational drag.',
  },
  {
    slug: 'marketplace-venture-building',
    // ASCII motif: <=> (bidirectional exchange arrows).
    svg: `<svg ${s}><path pathLength="1" d="M4 8h16"/><path pathLength="1" d="M16 4l4 4-4 4"/><path pathLength="1" d="M20 16H4"/><path pathLength="1" d="M8 12l-4 4 4 4"/></svg>`,
    title: 'Marketplace & Venture Building',
    description: 'Hands-on venture work building local food marketplace infrastructure, producer operations, grants, and growth systems.',
  },
] as const;

export type FocusArea = (typeof focusAreas)[number];
