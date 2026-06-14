export const focusAreas = [
  {
    slug: 'strategy-operations',
    icon: '↗',
    title: 'Strategy & Operations',
    description: 'Market design, GTM planning, operating models, and execution rhythms for teams that need traction, not theater.',
  },
  {
    slug: 'product-program-leadership',
    icon: '◈',
    title: 'Product & Program Leadership',
    description: 'Turning messy ideas into scoped releases, roadmaps, feedback loops, dashboards, and repeatable delivery.',
  },
  {
    slug: 'ai-automation',
    icon: '✦',
    title: 'AI & Automation',
    description: 'Designing agent workflows, memory systems, analytics, and automations that reduce operational drag.',
  },
  {
    slug: 'marketplace-venture-building',
    icon: '◎',
    title: 'Marketplace & Venture Building',
    description: 'Hands-on venture work building local food marketplace infrastructure, producer operations, grants, and growth systems.',
  },
] as const;

export type FocusArea = (typeof focusAreas)[number];
