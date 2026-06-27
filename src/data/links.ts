// Bio-link hub data (/links): the page social bios (Instagram, etc.) point at.
// Edit THIS file to add / reorder / rename links; the page renders from it.
//
// Progressive disclosure: this hub is the thin entry point. Each item below
// opens into a deeper page or app. Keep the list short; concise beats complete.

export interface HubLink {
  label: string;
  sublabel?: string;
  href: string;
  icon: string; // short monospace glyph, matches the site's ASCII-icon system
  external?: boolean;
}

// The primary stack: the "where do you want to go" funnel.
export const hubLinks: HubLink[] = [
  {
    label: 'The full site',
    sublabel: 'The whole portfolio and story',
    href: '/',
    icon: '~/',
  },
  {
    label: 'Projects & apps',
    sublabel: 'Ventures, AI systems & open source',
    href: '/projects',
    icon: '{ }',
  },
  {
    label: 'Agent Workbench',
    sublabel: 'Multi-agent operator app · open source',
    href: 'https://github.com/anthonyabusa/agent-workbench',
    icon: '>_',
    external: true,
  },
  {
    label: 'Writing',
    sublabel: 'Essays on building systems in public',
    href: '/blog',
    icon: 'Aa',
  },
  {
    label: 'Get in touch',
    sublabel: 'Start a conversation',
    href: '/contact',
    icon: '@>',
  },
  // ── Easy add-ons (uncomment + fill once you have a public URL) ──────────────
  // {
  //   label: 'Navore Market',
  //   sublabel: 'Local food marketplace I run strategy & ops for',
  //   href: 'https://navore.market',   // ← confirm the real URL
  //   icon: '<=>',
  //   external: true,
  // },
];

export interface SocialLink {
  label: string;
  href: string;
  svg: string;
}

// Cross-platform socials. Someone who found you on Instagram may be hunting for
// your LinkedIn / GitHub / etc. Only items with a real href render; fill a
// handle into the stubs below to switch them on.
export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/anthonyabusa',
    svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/anthonyabusa',
    svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/lifeofabusa',
    svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:anthonyabusa@gmail.com',
    svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  // ── Stubs: paste your handle into the URL to switch each on (not set up yet) ──
  // {
  //   label: 'TikTok',
  //   href: 'https://tiktok.com/@YOUR_HANDLE',
  //   svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.78a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V7.97a5.77 5.77 0 0 0-.78-.05A5.79 5.79 0 1 0 15.34 13.7V8.3a7.45 7.45 0 0 0 4.35 1.4V6.5a4.28 4.28 0 0 1-3.09-.68z"/></svg>`,
  // },
  // {
  //   label: 'X',
  //   href: 'https://x.com/YOUR_HANDLE',
  //   svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.683l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  // },
  // {
  //   label: 'YouTube',
  //   href: 'https://youtube.com/@YOUR_HANDLE',
  //   svg: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12z"/></svg>`,
  // },
];
