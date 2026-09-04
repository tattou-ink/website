import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';

export function Benefit3() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="flex flex-col md:flex-row-reverse md:items-center">
        <div className="flex flex-col items-start gap-8 px-5 py-16 md:w-[60%] lg:w-[46%] md:px-20 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow theme="dark">{m.landing_benefit3_eyebrow()}</Eyebrow>
            <Heading className="text-cream uppercase">
              {m.landing_benefit3_title_line1()}
              <br />
              {m.landing_benefit3_title_line2()}
              <br />
              <Highlight tone="brand">
                {m.landing_benefit3_title_line3()}
              </Highlight>
            </Heading>
            <p className="font-body text-base leading-[25px] text-cream lg:text-[18px] lg:leading-[24px]">
              {m.landing_benefit3_body()}
            </p>
          </div>
          <p className="font-display text-2xl leading-[26px] font-bold text-accent-highlight-dark uppercase lg:text-[34px] lg:leading-[37px]">
            {m.landing_benefit3_highlight()}
          </p>
        </div>

        <div className="relative aspect-[402/900] w-full lg:block lg:aspect-[708/822] md:w-[40%] lg:w-[54%]">
          <img
            src="/images/landing/benefit3/photo-desktop.jpg"
            alt=""
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stencil-dark to-transparent to-10% lg:bg-linear-to-l lg:to-20%" />
          <img
            src="/images/landing/benefit3/profile-with-frame.png"
            alt=""
            className="absolute top-1/2 left-1/2 w-[80%] max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform lg:top-[11.7%] lg:left-[26.7%] lg:w-[42.7%]"
          />
        </div>
      </div>
    </section>
  );
}
