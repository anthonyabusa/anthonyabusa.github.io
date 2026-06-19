export const focusAreas = [
  {
    slug: 'strategy',
    icon: '/->',
    title: 'Strategy',
    description: 'Market design, positioning, growth logic, stakeholder alignment, and the choices that determine where effort should go.',
  },
  {
    slug: 'operations',
    icon: '[::]',
    title: 'Operations',
    description: 'Operating models, workflows, execution rhythms, logistics, metrics, and the routines that make ambitious ideas actually run.',
  },
  {
    slug: 'product-program-leadership',
    icon: '{<>}',
    title: 'Product & Program Leadership',
    description: 'Turning messy ideas into scoped releases, roadmaps, feedback loops, dashboards, and repeatable delivery.',
  },
  {
    slug: 'ai-automation',
    icon: '>*_',
    title: 'AI & Automation',
    description: 'Designing agent workflows, memory systems, analytics, and automations that reduce operational drag.',
  },
  {
    slug: 'marketplace-venture-building',
    icon: '<=>',
    title: 'Marketplace & Venture Building',
    description: 'Hands-on venture work building local food marketplace infrastructure, producer operations, grants, and growth systems.',
  },
] as const;

export type FocusArea = (typeof focusAreas)[number];
