import { ParaglideMessage } from '@inlang/paraglide-js-react';
import { m } from '@/paraglide/messages';

import { Eyebrow, Heading, Highlight } from './ui';
import { cn } from '@/lib/utils';

export function Problem() {
  return (
    <section className="relative w-full overflow-hidden bg-panel px-5 py-16 lg:px-20 lg:py-24">
      <img
        src="/images/landing/problem/paint-stroke.png"
        alt=""
        aria-hidden
        className={cn(
          'pointer-events-none absolute',
          '-top-8 -right-36 w-72 rotate-[45deg]',
          'lg:-top-8 lg:-right-64 lg:w-96',
        )}
      />
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className={cn(
          'pointer-events-none absolute hidden lg:block',
          'bottom-0 -left-16 w-40',
        )}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-6 lg:max-w-[680px] lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow theme="light">{m.landing_problem_eyebrow()}</Eyebrow>
            <Heading className="text-ink">
              {m.landing_problem_title_line1()}
              <br />
              {m.landing_problem_title_line2()}
              <br />
              <Highlight>{m.landing_problem_title_line3()}</Highlight>
            </Heading>
          </div>
          <div className="flex flex-col gap-4 font-body text-base leading-[25px] text-ink lg:text-[18px] lg:leading-[24px]">
            <p>
              <ParaglideMessage
                message={m.landing_problem_body_1}
                markup={{
                  b: ({ children }) => <b>{children}</b>,
                  br: () => <br />,
                }}
              />
            </p>
            <p>
              <i>{m.landing_problem_body_2()}</i>
            </p>
            <ul className='list-["•"] pl-2 *:pl-4 *:marker:text-stencil'>
              <ParaglideMessage
                message={m.landing_problem_body_3}
                markup={{
                  li: ({ children }) => (
                    <li>
                      <b>{children}</b>
                    </li>
                  ),
                }}
              />
            </ul>
            <p>
              <ParaglideMessage
                message={m.landing_problem_body_4}
                markup={{
                  b: ({ children }) => <b>{children}</b>,
                  br: () => <br />,
                }}
              />
            </p>
          </div>
          <p className="font-display text-2xl leading-[26px] font-bold text-stencil uppercase lg:text-[34px] lg:leading-[37px]">
            {m.landing_problem_highlight()}
          </p>
        </div>

        <div className="relative -mx-5 h-75 overflow-hidden border-y-2 border-stencil md:h-100 lg:hidden">
          <img
            src="/images/landing/problem/photo.jpg"
            alt=""
            className="h-full w-full -translate-x-20 translate-y-10 scale-150 object-cover object-[60%_0%]"
          />
        </div>
        <div className="relative hidden shrink-0 lg:block">
          <div className="absolute top-4 left-4 h-[654px] w-[519px] border-2 border-stencil" />
          <div className="relative h-[654px] w-[519px] overflow-hidden border-2 border-stencil">
            <img
              src="/images/landing/problem/photo.jpg"
              alt=""
              className="h-full w-full object-cover object-[80%_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
