import type { ImgHTMLAttributes } from 'react';

type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'alt'
> & {
  src: string;
  width: number;
  height: number;
  alt?: string;
  /** True for the LCP image only: skips lazy-loading and hints the browser to fetch it first. */
  priority?: boolean;
};

// Renders an <img> with sensible loading defaults. Use `priority` on the
// single above-the-fold/LCP image per page; everything else lazy-loads.
export function Image({
  src,
  width,
  height,
  alt = '',
  priority = false,
  loading,
  fetchPriority,
  decoding,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
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
