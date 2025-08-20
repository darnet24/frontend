import { defineConfig } from 'astro/config';
import tailwind       from '@astrojs/tailwind';
import sitemap        from '@astrojs/sitemap';
import astroCompress  from 'astro-compress';

export default defineConfig({
  mode:   'server',                // SSR w devie
  output: 'static',                // build statyczny
  site:   'https://darnet24.pl',   // docelowy URL w prod

  integrations: [
    tailwind(),
    sitemap(),
    astroCompress(),
  ],

  server: {
    host: true,
    proxy: {
      '/api': 'https://h9kf3vfew4.darnet24.pl',
    }
  },

  vite: {
    define: {
      'import.meta.env.PUBLIC_BACKEND_URL': JSON.stringify(
        process.env.PUBLIC_BACKEND_URL || 'https://h9kf3vfew4.darnet24.pl'
      )
    }
  }
});
