import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';

export function Benefit3() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="flex flex-col lg:flex-row-reverse lg:items-center">
        <div className="flex flex-col items-start gap-8 px-5 py-16 lg:w-[46%] lg:px-20 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{m.landing_benefit3_eyebrow()}</Eyebrow>
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
          <p className="font-display text-2xl leading-[26px] font-bold text-stencil uppercase lg:text-[34px] lg:leading-[37px]">
            {m.landing_benefit3_highlight()}
          </p>
        </div>

        <div className="relative aspect-[402/758] w-full lg:aspect-[708/822] lg:w-[54%]">
          <img
            src="/images/landing/benefit3/mobile.jpg"
            alt=""
            className="size-full object-cover lg:hidden"
          />
          <div className="relative hidden size-full lg:block">
            <img
              src="/images/landing/benefit3/photo-desktop.jpg"
              alt=""
              className="size-full object-cover"
            />
            <img
              src="/images/landing/benefit3/iphone.png"
              alt=""
              className="absolute top-[11.7%] left-[26.7%] w-[42.7%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
