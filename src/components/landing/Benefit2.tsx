import { m } from '@/paraglide/messages';

import { CompareColumn, Eyebrow, Heading, Highlight } from './ui';

const beforeItems = [
  m.landing_benefit2_before_1(),
  m.landing_benefit2_before_2(),
  m.landing_benefit2_before_3(),
  m.landing_benefit2_before_4(),
];

const afterItems = [
  m.landing_benefit2_after_1(),
  m.landing_benefit2_after_2(),
  m.landing_benefit2_after_3(),
  m.landing_benefit2_after_4(),
];

export function Benefit2() {
  return (
    <section className="relative w-full overflow-hidden bg-panel px-5 py-16 lg:px-20 lg:py-24">
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 hidden w-40 lg:block"
      />
      <img
        src="/images/landing/problem/paint-stroke.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-24 hidden w-72 rotate-180 lg:block"
      />
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 right-8 w-12 lg:hidden"
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-6 lg:max-w-[628px] lg:gap-6">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{m.landing_benefit2_eyebrow()}</Eyebrow>
            <Heading className="text-ink">
              {m.landing_benefit2_title_line1()}
              <br />
              <Highlight>{m.landing_benefit2_title_line2()}</Highlight>
            </Heading>
          </div>
          <div className="flex flex-col gap-1 font-body text-base leading-[25px] text-ink lg:text-[18px] lg:leading-[24px]">
            <p>{m.landing_benefit2_body_1()}</p>
            <p>{m.landing_benefit2_body_2()}</p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <CompareColumn
              variant="before"
              tone="light"
              label={m.landing_benefit2_before_label()}
              items={beforeItems}
            />
            <CompareColumn
              variant="after"
              tone="light"
              label={m.landing_benefit2_after_label()}
              items={afterItems}
            />
          </div>

          <div className="flex flex-col gap-2 font-body text-sm leading-[21px] text-taupe">
            <p className="uppercase">{m.landing_benefit2_caption_title()}</p>
            <p>{m.landing_benefit2_caption_body()}</p>
            <p className="uppercase">{m.landing_benefit2_caption_footer()}</p>
          </div>
        </div>

        <div className="relative -mx-5 h-[298px] border-y-2 border-stencil lg:hidden">
          <img
            src="/images/landing/benefit2/photo.jpg"
            alt=""
            className="h-full w-full object-cover object-[70%_20%]"
          />
        </div>

        <div className="relative hidden shrink-0 lg:block">
          <div className="absolute top-4 left-4 h-[654px] w-[519px] border-2 border-stencil" />
          <div className="relative h-[654px] w-[519px] overflow-hidden border-2 border-stencil">
            <img
              src="/images/landing/benefit2/photo.jpg"
              alt=""
              className="h-full w-full object-cover object-[70%_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
