import { Link } from '@tanstack/react-router';
import { getLocale } from '@/paraglide/runtime';
import { cn } from '@/lib/utils';
import { formatBlogDate } from '@/lib/blogUtils';
import type { BlogPost } from '@/lib/blogUtils';

export function BlogArticleCard({
  post,
  href,
  className = 'flex w-[80%] shrink-0 snap-start flex-col gap-3 md:w-auto md:shrink',
}: {
  post: BlogPost;
  href: string;
  className?: string;
}) {
  const locale = getLocale();

  return (
    <Link to={href} className={cn('flex flex-col gap-3 transition-all hover:scale-102', className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-300 border-2 border-accent-highlight">
        <img src={post.heroImage} alt="" className="size-full object-cover" />
        <span className="absolute top-3 left-3 rounded-xs bg-accent-highlight px-2 py-1 font-body text-[10px] leading-none text-cream uppercase">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-body text-[11px] leading-[15px] font-medium text-accent-highlight uppercase">
          {formatBlogDate(post.published, locale)}
        </p>
        <h3 className="font-display text-base leading-tight font-black text-ink uppercase">
          {post.title}
        </h3>
        <p className="font-body text-xs leading-[17px] text-charcoal-700">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
