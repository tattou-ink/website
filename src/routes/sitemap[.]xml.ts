import { createFileRoute } from '@tanstack/react-router';
import { localizedPathNames } from '../../i18n/lib';
import { listProSlugsForSitemap } from '@/api/proProfile';
import { getLanguagePrefix, supportedLanguages } from '@/lib/languageUtils';

const BASE_URL = 'https://tattou.ink';

const getSitemapUrlItemsForPath = ({
  path,
  lastmod,
  subdomain,
}: {
  path: string;
  lastmod?: string;
  subdomain: string;
}) => {
  const alternateLinks = supportedLanguages
    .map((supportedLanguage) => {
      return `<xhtml:link rel="alternate" hreflang="${supportedLanguage.value}" href="https://${subdomain}.tattou.ink${getLanguagePrefix(supportedLanguage.value)}${path}"/>`;
    })
    .join('\n  ');
  return supportedLanguages
    .map((language) => {
      return `<url>
  <loc>${`https://${subdomain}.tattou.ink${getLanguagePrefix(language.value)}${path}`}</loc>
  ${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''}
  ${alternateLinks}
</url>`;
    })
    .join('\n  ');
};

const sitemapTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  __CONTENT__
</urlset>`;

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const proSlugsToReference = await listProSlugsForSitemap();
        let content = Object.entries(localizedPathNames)
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
          .join('\n  ');

        for (const proSlug of proSlugsToReference) {
          content += getSitemapUrlItemsForPath({
            path: '',
            subdomain: proSlug,
          });
        }

        return new Response(sitemapTemplate.replace('__CONTENT__', content), {
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
