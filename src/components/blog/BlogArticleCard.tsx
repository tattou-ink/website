import { Link } from '@tanstack/react-router';
import { getLocale } from '@/paraglide/runtime';
import { formatBlogDate, type BlogPost } from '@/lib/blogUtils';

export function BlogArticleCard({
  post,
  href,
}: {
  post: BlogPost;
  href: string;
}) {
  const locale = getLocale();

  return (
    <Link
      to={href}
      className="flex w-[80%] shrink-0 snap-start flex-col gap-3 md:w-auto md:shrink"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-300">
        <img
          src={post.heroImage}
          alt=""
          className="size-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-accent-highlight-dark px-3 py-1 font-body text-[10px] leading-none font-semibold text-ink uppercase">
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
        <p className="font-body text-sm leading-[21px] text-charcoal-700">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
