import { m } from '@/paraglide/messages';

export function Ticker() {
  const text = m.landing_ticker_text();
  return (
    <div className="relative flex h-12 w-full items-center overflow-hidden bg-stencil">
      <div className="animate-marquee flex w-max shrink-0 items-center whitespace-nowrap">
        <span className="px-3 font-body text-sm leading-[21px] font-semibold text-cream uppercase">
          {text}
        </span>
        <span
          aria-hidden
          className="px-3 font-body text-sm leading-[21px] font-semibold text-cream uppercase"
        >
          {text}
        </span>
      </div>
    </div>
  );
}
