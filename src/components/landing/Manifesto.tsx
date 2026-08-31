import { m } from '@/paraglide/messages';

import { Eyebrow, Highlight } from './ui';

export function Manifesto() {
  return (
    <section className="w-full bg-ink px-5 py-16 lg:px-20 lg:py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:w-[411px] lg:shrink-0">
          <Eyebrow>{m.landing_manifesto_eyebrow()}</Eyebrow>
          <h2 className="font-display text-[32px] leading-[34px] font-black text-cream uppercase lg:text-[48px] lg:leading-[50px]">
            <Highlight tone="brand">{m.landing_manifesto_title()}</Highlight>
          </h2>
        </div>

        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-4 font-body text-base leading-[25px] text-cream lg:text-[18px] lg:leading-[24px]">
            <p>{m.landing_manifesto_body_1()}</p>
            <p>{m.landing_manifesto_body_2()}</p>
          </div>
          <p className="text-xl text-cream lg:text-2xl">
            <span className="font-script">
              {m.landing_manifesto_baseline_prefix()}{' '}
            </span>
            <span className="font-script text-stencil">
              {m.landing_manifesto_baseline()}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
