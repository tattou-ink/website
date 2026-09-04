import { m } from '@/paraglide/messages';
import { SmartCtaButton } from '@/components/SmartCtaButton';

import { SECTION_IDS } from './anchors';
import { Highlight } from './ui';

export function CtaFinal() {
  return (
    <section
      id={SECTION_IDS.join}
      className="w-full bg-ink px-5 pb-12 lg:px-20 lg:pb-24"
    >
      <div className="flex flex-col gap-8 border-y border-cream-muted/30 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <h2 className="font-display text-[40px] leading-[40px] font-black text-cream uppercase lg:text-[48px] lg:leading-[50px]">
          <span className="inline-block">{m.landing_hero_title_line1()}</span>{' '}
          <span className="inline-block">
            <Highlight tone="brand">{m.landing_hero_title_line2()}</Highlight>
          </span>
        </h2>
        <SmartCtaButton label={m.landing_cta_cta()} className="shrink-0" />
      </div>
    </section>
  );
}
