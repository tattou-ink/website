import { createFileRoute } from '@tanstack/react-router';
import { localizedPathNames } from '../../i18n/lib';

const BASE_URL = 'https://tattou.ink';

const getLanguagePrefix = (language: string) => {
  if (language === 'en') return '';
  return `/${language}`;
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${Object.entries(localizedPathNames)
    .map(([pagePath, pathByLanguage]) => {
      const alternateLinks = Object.entries(pathByLanguage)
        .map(
          ([language, path]) =>
            `<xhtml:link rel="alternate" hreflang="${language}" href="${BASE_URL}${getLanguagePrefix(language)}${path}"/>`,
        )
        .join('\n    ');
      return Object.entries(pathByLanguage).map(([language, path]) => {
        return `<url>
    <loc>${BASE_URL}${getLanguagePrefix(language)}${path}</loc>
    ${alternateLinks}
  </url>`;
      });
    })
    .flat()
    .join('\n  ')}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=0, must-revalidate',
            'Netlify-CDN-Cache-Control':
              'public, s-maxage=3600, stale-while-revalidate=86400, durable',
          },
        });
      },
    },
  },
});
