import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';

export function Problem() {
  return (
    <section className="relative w-full overflow-hidden bg-panel px-5 py-16 lg:px-20 lg:py-24">
      <img
        src="/images/landing/problem/paint-stroke.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-32 w-72 rotate-[172deg] opacity-90 lg:-top-20 lg:-left-24 lg:w-[300px]"
      />
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 -right-10 hidden w-40 lg:block"
      />
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-2 -bottom-6 w-16 lg:hidden"
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-6 lg:max-w-[628px] lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{m.landing_problem_eyebrow()}</Eyebrow>
            <Heading className="text-ink">
              {m.landing_problem_title_line1()}
              <br />
              {m.landing_problem_title_line2()}
              <br />
              <Highlight>{m.landing_problem_title_line3()}</Highlight>
            </Heading>
          </div>
          <div className="flex flex-col gap-4 font-body text-base leading-[25px] text-ink lg:text-[18px] lg:leading-[24px]">
            <p>{m.landing_problem_body_1()}</p>
            <p>{m.landing_problem_body_2()}</p>
            <p>{m.landing_problem_body_3()}</p>
          </div>
          <p className="font-display text-2xl leading-[26px] font-bold text-stencil uppercase lg:text-[34px] lg:leading-[37px]">
            {m.landing_problem_highlight()}
          </p>
        </div>

        <div className="relative -mx-5 h-[298px] border-y-2 border-stencil lg:hidden">
          <img
            src="/images/landing/problem/photo.jpg"
            alt=""
            className="h-full w-full object-cover object-[30%_25%]"
          />
        </div>

        <div className="relative hidden shrink-0 lg:block">
          <div className="absolute top-4 left-4 h-[654px] w-[519px] border-2 border-stencil" />
          <div className="relative h-[654px] w-[519px] overflow-hidden border-2 border-stencil">
            <img
              src="/images/landing/problem/photo.jpg"
              alt=""
              className="h-full w-full object-cover object-[30%_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
