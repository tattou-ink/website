// Builds URLs for Netlify's built-in Image CDN (https://docs.netlify.com/image-cdn/overview/).
// Only local raster images can be optimized this way; SVGs and remote URLs are passed through.
export const IMAGE_CDN_WIDTHS = [400, 800, 1200] as const;

type NetlifyImageOptions = {
  quality?: number;
  format?: 'avif' | 'webp' | 'auto';
};

export function isNetlifyOptimizable(src: string) {
  return /\.(jpe?g|png|webp)$/i.test(src) && src.startsWith('/');
}

export function netlifyImageUrl(
  src: string,
  width: number,
  { quality = 80, format = 'avif' }: NetlifyImageOptions = {},
) {
  if (!isNetlifyOptimizable(src)) return src;
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    fm: format,
    q: String(quality),
  });
  return `/.netlify/images?${params.toString()}`;
}

export function netlifyImageSrcSet(
  src: string,
  widths: readonly number[] = IMAGE_CDN_WIDTHS,
  options?: NetlifyImageOptions,
) {
  if (!isNetlifyOptimizable(src)) return undefined;
  return widths
    .map((width) => `${netlifyImageUrl(src, width, options)} ${width}w`)
    .join(', ');
}
