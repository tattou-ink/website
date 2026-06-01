// i18n/lib.ts
import type { Locale } from '@/paraglide/runtime';
import type { FileRoutesByTo } from '../src/routeTree.gen';

type RoutePath = keyof FileRoutesByTo;

const excludedPaths = ['admin', 'docs', 'api'] as const;

type PublicRoutePath = Exclude<
  RoutePath,
  `${string}${(typeof excludedPaths)[number]}${string}`
>;

type TranslatedPathname = {
  pattern: string;
  localized: Array<[Locale, string]>;
};

function toUrlPattern(path: string) {
  return (
    path
      // catch-all
      .replace(/\/\$$/, '/:path(.*)?')
      // optional parameters: {-$param}
      .replace(/\{-\$([a-zA-Z0-9_]+)\}/g, ':$1?')
      // named parameters: $param
      .replace(/\$([a-zA-Z0-9_]+)/g, ':$1')
      // remove trailing slash
      .replace(/\/+$/, '')
  );
}

function createTranslatedPathnames(
  input: Record<PublicRoutePath, Record<Locale, string>>,
): TranslatedPathname[] {
  return Object.entries(input).map(([pattern, locales]) => ({
    pattern: toUrlPattern(pattern),
    localized: Object.entries(locales).map(
      ([locale, path]) =>
        [locale as Locale, `/${locale}${toUrlPattern(path)}`] satisfies [
          Locale,
          string,
        ],
    ),
  }));
}

export const localizedPathNames = {
  '/': { en: '/', fr: '/' },
  '/privacy-policy': {
    en: '/privacy-policy',
    fr: '/politique-de-confidentialite',
  },
};

export const translatedPathnames =
  createTranslatedPathnames(localizedPathNames);
