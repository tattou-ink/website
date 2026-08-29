import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';

const items = [
  m.landing_promise_item_1,
  m.landing_promise_item_2,
  m.landing_promise_item_3,
  m.landing_promise_item_4,
  m.landing_promise_item_5,
];

export function PromiseSection() {
  return (
    <section className="relative w-full overflow-hidden bg-panel px-5 py-16 lg:px-20 lg:py-24">
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-24 hidden w-32 rotate-180 lg:block"
      />
      <img
        src="/images/landing/problem/paint-stroke.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-0 w-20 -rotate-90 lg:hidden"
      />

      <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="relative aspect-square w-full shrink-0 lg:w-[46%]">
          <img
            src="/images/landing/promise/photo.jpg"
            alt=""
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{m.landing_promise_eyebrow()}</Eyebrow>
            <Heading className="text-ink">
              {m.landing_promise_title_line1()}
              <br />
              {m.landing_promise_title_line2()}{' '}
              <Highlight>{m.landing_promise_title_highlight()}</Highlight>
            </Heading>
          </div>
          <div className="flex flex-col gap-1 font-body text-base leading-[25px] text-ink lg:text-[18px] lg:leading-[24px]">
            <p className="mb-3">{m.landing_promise_intro()}</p>
            <ul>
              {items.map((item) => (
                <li key={item()}>• {item()}</li>
              ))}
            </ul>
            <p className="mt-3">{m.landing_promise_outro()}</p>
          </div>
          <p className="font-body text-sm leading-[21px] font-semibold text-stencil uppercase">
            {m.landing_promise_kicker()}
          </p>
        </div>
      </div>
    </section>
  );
}
