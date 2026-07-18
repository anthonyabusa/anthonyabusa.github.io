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
  {
    slug: 'ai-implementation-enablement',
    // ASCII motif: a launch (rocket + fins + exhaust): AI shipped to production.
    svg: `<svg ${s}><path pathLength="1" d="M12 3c3 3 4.5 7 4.5 10.5L12 17l-4.5-3.5C7.5 10 9 6 12 3z"/><circle pathLength="1" cx="12" cy="10" r="1.6"/><path pathLength="1" d="M7.5 13 5 18l3.2-1.4"/><path pathLength="1" d="M16.5 13 19 18l-3.2-1.4"/></svg>`,
    title: 'AI Implementation & Enablement',
    description: 'Bringing AI into real organizations: agent workflows, LLM tooling, data plumbing, and the adoption work that gets teams actually using it. The core of my tech enablement and AI implementation consulting.',
  },
  {
    slug: 'agent-systems-orchestration',
    // ASCII motif: one node directing three (governed agent fan-out).
    svg: `<svg ${s}><circle pathLength="1" cx="12" cy="5" r="2.2"/><circle pathLength="1" cx="5.5" cy="19" r="2.2"/><circle pathLength="1" cx="12" cy="19" r="2.2"/><circle pathLength="1" cx="18.5" cy="19" r="2.2"/><path pathLength="1" d="M11 6.8 6.4 17"/><path pathLength="1" d="M12 7.2V16.8"/><path pathLength="1" d="M13 6.8 17.6 17"/></svg>`,
    title: 'Agent Systems & Orchestration',
    description: 'Multi-agent architectures, governed autonomy, memory systems, and the operator tooling that runs a fleet of AI agents. Built on Metis and the Agent Workbench control plane.',
  },
  {
    slug: 'data-analytics-engineering',
    // ASCII motif: bar chart with a trend line (raw data to decisions).
    svg: `<svg ${s}><path pathLength="1" d="M4 20V4"/><path pathLength="1" d="M4 20h16"/><path pathLength="1" d="M8 20v-5"/><path pathLength="1" d="M12 20v-9"/><path pathLength="1" d="M16 20v-3"/><path pathLength="1" d="M6 11l4-3 4 2 5-5"/></svg>`,
    title: 'Data & Analytics Engineering',
    description: 'Data pipelines, ML signal systems, dashboards, and analysis that turns raw streams into decisions. From the Polymarket signal pipeline to editorial data viz.',
  },
  {
    slug: 'platform-systems-architecture',
    // ASCII motif: stacked isometric layers (the technical backbone).
    svg: `<svg ${s}><path pathLength="1" d="M12 3 3 8l9 5 9-5z"/><path pathLength="1" d="M3 12l9 5 9-5"/><path pathLength="1" d="M3 16l9 5 9-5"/></svg>`,
    title: 'Platform & Systems Architecture',
    description: 'The technical backbone: API integrations, platform engineering, and multi-machine infrastructure that scales across an organization.',
  },
] as const;

export type FocusArea = (typeof focusAreas)[number];
