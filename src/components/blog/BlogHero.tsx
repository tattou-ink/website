export function BlogHero({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <div className="aspect-[8/3] w-full border-y-2 border-accent-highlight bg-charcoal-300 md:aspect-[18/5]">
      <img src={src} alt={alt} className="size-full object-cover" />
    </div>
  );
}
