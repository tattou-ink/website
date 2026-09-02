import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';
import { cn } from '@/lib/utils';
import { ParaglideMessage } from '@inlang/paraglide-js-react';

const items = [
  m.landing_promise_item_1,
  m.landing_promise_item_2,
  m.landing_promise_item_3,
  m.landing_promise_item_4,
  m.landing_promise_item_5,
];

export function PromiseSection() {
  return (
    <section className="relative flex w-full flex-col gap-8 overflow-hidden bg-panel pb-16 lg:pt-8 lg:pb-24">
      <img
        src="/images/landing/promise/paint-tattou.png"
        alt=""
        aria-hidden
        className={cn(
          'pointer-events-none absolute',
          '-right-36 -bottom-16 w-96 rotate-[-15deg]',
          'lg:-right-92 lg:-bottom-32 lg:w-150 lg:rotate-[0deg]',
        )}
      />
      <div className="relative flex flex-col items-center gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6 px-5 lg:px-20">
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
            <ul className='list-["•"] pl-2 *:pl-4 *:marker:text-stencil'>
              {items.map((item) => (
                <li key={item()}>
                  <b>{item()}</b>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <ParaglideMessage
                message={m.landing_promise_outro}
                markup={{ b: ({ children }) => <b>{children}</b> }}
              />
            </p>
          </div>
          <p className="font-body text-sm leading-[21px] font-semibold text-stencil uppercase">
            {m.landing_promise_kicker()}
          </p>
        </div>
        <div className="relative aspect-square w-full shrink-0 max-lg:h-90 lg:w-[46%]">
          <img
            src="/images/landing/promise/photo.jpg"
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
