import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { translatedPathnames } from './i18n/lib';
import contentCollections from '@content-collections/vite';
import { cloudflare } from '@cloudflare/vite-plugin';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      outputStructure: 'message-modules',
      cookieName: 'PARAGLIDE_LOCALE',
      strategy: ['url', 'baseLocale'],
      urlPatterns: translatedPathnames,
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    contentCollections(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
  ],
});

export default config;
