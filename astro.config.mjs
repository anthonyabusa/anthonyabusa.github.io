// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anthonyabusa.com',
  redirects: {
    '/blog/three-days-of-sunlight': '/blog/three-days-of-sun',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
