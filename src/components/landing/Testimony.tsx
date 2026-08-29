import { useRef, useState } from 'react';

import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';

const testimonials = [
  {
    quote: m.landing_testimony_1_quote,
    name: m.landing_testimony_1_name,
    role: m.landing_testimony_1_role,
    location: m.landing_testimony_1_location,
  },
  {
    quote: m.landing_testimony_2_quote,
    name: m.landing_testimony_2_name,
    role: m.landing_testimony_2_role,
    location: m.landing_testimony_2_location,
  },
  {
    quote: m.landing_testimony_3_quote,
    name: m.landing_testimony_3_name,
    role: m.landing_testimony_3_role,
    location: m.landing_testimony_3_location,
  },
  {
    quote: m.landing_testimony_4_quote,
    name: m.landing_testimony_4_name,
    role: m.landing_testimony_4_role,
    location: m.landing_testimony_4_location,
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  location,
}: {
  quote: string;
  name: string;
  role: string;
  location: string;
}) {
  return (
    <div className="flex h-[373px] w-[302px] shrink-0 snap-start flex-col justify-between rounded border border-cream-muted p-6">
      <p className="font-body text-sm leading-[21px] text-ink">« {quote} »</p>
      <div className="flex flex-col font-body text-sm leading-[21px] text-stencil uppercase">
        <p className="font-semibold">
          {name} - {role}
        </p>
        <p>{location}</p>
      </div>
    </div>
  );
}

export function Testimony() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 1;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, testimonials.length - 1));
  }

  return (
    <section className="relative w-full overflow-hidden bg-panel py-16 lg:py-24">
      <img
        src="/images/landing/testimony/paint-tl.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 hidden w-56 lg:block"
      />
      <img
        src="/images/landing/testimony/paint-br.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 w-24 lg:w-32"
      />

      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-start gap-6 px-5 lg:px-20">
          <Eyebrow>{m.landing_testimony_eyebrow()}</Eyebrow>
          <Heading className="max-w-[635px] text-ink">
            {m.landing_testimony_title_line1()}
            <br />
            <Highlight>{m.landing_testimony_title_line2()}</Highlight>
          </Heading>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 lg:px-20"
        >
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.name()}
              quote={t.quote()}
              name={t.name()}
              role={t.role()}
              location={t.location()}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 lg:hidden">
          {testimonials.map((t, i) => (
            <span
              key={t.name()}
              className={`h-0.5 rounded-full transition-all ${
                i === activeIndex ? 'w-8 bg-stencil' : 'w-2 bg-cream-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
