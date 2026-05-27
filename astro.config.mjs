import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import storyblok from '@storyblok/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    storyblok({
      accessToken: import.meta.env.STORYBLOK_TOKEN,
      components: {
        page: 'storyblok/Page',
      },
      apiOptions: {
        region: 'eu',
      },
    }),
  ],
  output: 'static',
  site: 'https://milele-mit-herz.de',
});
