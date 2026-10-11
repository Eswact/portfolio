import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://erensaribay.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: {
    // Inline all CSS: no render-blocking stylesheet requests.
    inlineStylesheets: 'always',
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },
  // Self-hosted subsets (latin + Turkish). Schibsted Grotesk is limited to wght 400–700.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-schibsted',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/SchibstedGrotesk-var.woff2'],
            weight: '400 700',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      fallbacks: ['monospace'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/JetBrainsMono-400.woff2'], weight: '400', style: 'normal', display: 'swap' },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', tr: 'tr-TR' } },
    }),
  ],
});
