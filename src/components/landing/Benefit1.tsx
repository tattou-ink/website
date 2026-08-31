import { m } from '@/paraglide/messages';

import { SECTION_IDS } from './anchors';
import {
  CompareColumn,
  CompareColumns,
  Eyebrow,
  Heading,
  Highlight,
} from './ui';

const beforeItems = [
  m.landing_benefit1_before_1(),
  m.landing_benefit1_before_2(),
  m.landing_benefit1_before_3(),
  m.landing_benefit1_before_4(),
];

const afterItems = [
  m.landing_benefit1_after_1(),
  m.landing_benefit1_after_2(),
  m.landing_benefit1_after_3(),
  m.landing_benefit1_after_4(),
];

export function Benefit1() {
  return (
    <section
      id={SECTION_IDS.features}
      className="w-full bg-ink px-5 py-16 lg:px-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[898px] flex-col items-start gap-8 lg:items-center">
        <div className="flex flex-col items-start gap-6 lg:items-center lg:text-center">
          <Eyebrow>{m.landing_benefit1_eyebrow()}</Eyebrow>
          <Heading className="text-cream">
            <Highlight tone="brand">
              {m.landing_benefit1_title_line1()}
              <br />
              {m.landing_benefit1_title_line2()}
            </Highlight>
          </Heading>
          <p className="font-body text-base leading-[24px] text-cream lg:max-w-[714px] lg:text-[18px]">
            {m.landing_benefit1_body()}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-center">
          <CompareColumns
            before={{
              label: m.landing_benefit1_before_label(),
              items: beforeItems,
            }}
            after={{
              label: m.landing_benefit1_after_label(),
              items: afterItems,
            }}
          />
        </div>

        <div className="flex flex-col gap-1 font-body text-sm leading-[21px] text-stencil lg:items-center lg:text-center">
          <p className="uppercase">{m.landing_benefit1_kicker_title()}</p>
          <p>
            {m.landing_benefit1_kicker_line1()}
            <br />
            {m.landing_benefit1_kicker_line2()}
          </p>
        </div>
      </div>
    </section>
  );
}
