import { Image } from '@/components/Image';
import { getHeroImageDimensions } from '@/lib/blogUtils';

export function BlogHero({ src, alt = '' }: { src: string; alt?: string }) {
  const { width, height } = getHeroImageDimensions(src);

  return (
    <div className="aspect-[8/3] w-full border-y-2 border-accent-highlight bg-charcoal-300 md:aspect-[18/5]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes="100vw"
        className="size-full object-cover"
      />
    </div>
  );
}
