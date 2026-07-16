// App storefront data (/apps): the public, human-facing catalog of things you
// can actually use. This is the consumer surface. GitHub is demoted to a
// secondary "view source" link (sourceUrl), never the primary call to action.
//
// status:
//   'live'    web app you can open and use right now (usually a subdomain)
//   'desktop' installable app; primary link is a product / download page
//   'soon'    announced, not yet open; renders a muted "coming soon" state

export type AppStatus = 'live' | 'desktop' | 'soon';

export interface AppEntry {
  name: string;
  tagline: string;
  description: string;
  status: AppStatus;
  icon: string; // short monospace glyph, matches the site's ASCII-icon system
  useUrl?: string; // the usable destination: live app, product page, or download
  useLabel?: string; // call-to-action override; sensible default per status
  sourceUrl?: string; // optional stripped/sanitized public repo ("view source")
  tags: string[];
}

export const apps: AppEntry[] = [
  {
    name: 'Navore Market',
    tagline: 'Local food, made easy to buy',
    description:
      'A marketplace connecting neighborhood food producers with the people who want to buy from them. Browse, order, and support local growers in one place.',
    status: 'live',
    icon: '<=>',
    useUrl: 'https://navoremarket.com',
    useLabel: 'Open Navore',
    tags: ['Marketplace', 'Local food', 'Venture'],
  },
  {
    name: 'Going On',
    tagline: "What's going on near you",
    description:
      'A local-events recommender. Pick your city and your vibe, get a weekly lineup of things to do tuned to your taste, thumbs-tune it, and get an AI plan for your weekend.',
    status: 'live',
    icon: '[o]',
    useUrl: 'https://goingon.anthonyabusa.com',
    useLabel: 'Open Going On',
    tags: ['Events', 'Recommender', 'AI'],
  },
  {
    name: 'Agent Workbench',
    tagline: 'Run a team of AI agents from one desk',
    description:
      'A control room for AI coding agents. Spawn Claude, Codex, and more as real terminals, watch what each one does, and steer the next move by voice or click, without losing the thread.',
    status: 'desktop',
    icon: '>_',
    useUrl: '/projects/agent-workbench',
    useLabel: 'See the app',
    sourceUrl: 'https://github.com/anthonyabusa/agent-workbench',
    tags: ['AI', 'Desktop app', 'Open source'],
  },
  {
    name: 'Metis Framework',
    tagline: 'Run AI agents as a governed workforce',
    description:
      'The portable core of the Metis operating system: protocols, skills, hooks, and governance machinery for running AI agents as a multi-session, memory-backed workforce. Source-available, consumed via git subtree.',
    status: 'live',
    icon: '/\\',
    useUrl: 'https://github.com/Busa-Legacies/metis-framework',
    useLabel: 'View on GitHub',
    sourceUrl: 'https://github.com/Busa-Legacies/metis-framework',
    tags: ['AI', 'Framework', 'Open source'],
  },
  {
    name: 'Aux',
    tagline: 'Tell it a vibe, get a real DJ set',
    description:
      'Describe a mood, an artist, or a moment and get back a continuous, beat-matched mix, not a playlist with hard cuts. Aux sequences and blends real tracks the way a DJ would, weaving stems and matching key and energy so every transition lands.',
    status: 'soon',
    icon: '|||',
    tags: ['Music', 'AI', 'Audio'],
  },
  // ── Add an app: copy a block above. Set status:'soon' to tease one early. ──
  // {
  //   name: 'Your next app',
  //   tagline: '...',
  //   description: '...',
  //   status: 'soon',
  //   icon: '[>]',
  //   tags: ['...'],
  // },
];
