import { Link } from '@tanstack/react-router';
import { m } from '@/paraglide/messages';
import { cn } from '@/lib/utils';

function getPaginationRange(
  current: number,
  total: number,
): Array<number | 'ellipsis'> {
  const range: Array<number | 'ellipsis'> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) range.push('ellipsis');
  for (let page = left; page <= right; page++) range.push(page);
  if (right < total - 1) range.push('ellipsis');
  if (total > 1) range.push(total);

  return range;
}

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages);
  const linkClass = 'px-1 font-body text-sm text-ink hover:opacity-70';

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-3 font-body text-sm text-ink"
    >
      {currentPage > 1 ? (
        <Link
          to="/blog"
          search={{ page: currentPage - 1 }}
          aria-label={m.blog_pagination_previous()}
          className={linkClass}
        >
          ←
        </Link>
      ) : (
        <span aria-hidden className="px-1 text-charcoal-400">
          ←
        </span>
      )}

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-charcoal-500">
            ···
          </span>
        ) : (
          <Link
            key={page}
            to="/blog"
            search={{ page }}
            className={cn(
              linkClass,
              page === currentPage && 'font-bold text-accent-highlight underline',
            )}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          to="/blog"
          search={{ page: currentPage + 1 }}
          aria-label={m.blog_pagination_next()}
          className={linkClass}
        >
          →
        </Link>
      ) : (
        <span aria-hidden className="px-1 text-charcoal-400">
          →
        </span>
      )}
    </nav>
  );
}
