import type { ImgHTMLAttributes } from 'react';

import {
  IMAGE_CDN_WIDTHS,
  netlifyImageSrcSet,
  netlifyImageUrl,
} from '@/lib/netlifyImage';

type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'alt'
> & {
  src: string;
  width: number;
  height: number;
  alt?: string;
  /** Widths to generate via the Netlify Image CDN. */
  widths?: readonly number[];
  /** True for the LCP image only: skips lazy-loading and hints the browser to fetch it first. */
  priority?: boolean;
};

// Renders an <img> served through Netlify's Image CDN, with a responsive
// srcset and sensible loading defaults. Use `priority` on the single
// above-the-fold/LCP image per page; everything else lazy-loads.
export function Image({
  src,
  width,
  height,
  alt = '',
  widths = IMAGE_CDN_WIDTHS,
  sizes = '100vw',
  priority = false,
  loading,
  fetchPriority,
  decoding,
  ...props
}: ImageProps) {
  // Never ask the CDN to upscale past the source image's native resolution.
  const cappedWidths = Array.from(
    new Set([...widths.filter((candidate) => candidate < width), width]),
  );
  const fallbackWidth = cappedWidths[cappedWidths.length - 1] ?? width;

  return (
    <img
      src={netlifyImageUrl(src, fallbackWidth)}
      srcSet={netlifyImageSrcSet(src, cappedWidths)}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
      decoding={decoding ?? (priority ? 'sync' : 'async')}
      {...props}
    />
  );
}
