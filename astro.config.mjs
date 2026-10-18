import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://siddhivinayakdesigners.in',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/blog/ghansoli-2bhk-3bhk-interior-cost-guide'),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      }
    })
  ]
});

