import { m } from '@/paraglide/messages';

import { SECTION_IDS } from './anchors';
import { CtaButton, Eyebrow, Heading, Highlight } from './ui';
import { cn } from '@/lib/utils';

const featureColumns = [
  [
    m.landing_pricing_feature_1(),
    m.landing_pricing_feature_2(),
    m.landing_pricing_feature_3(),
    m.landing_pricing_feature_4(),
  ],
  [
    m.landing_pricing_feature_5(),
    m.landing_pricing_feature_6(),
    m.landing_pricing_feature_7(),
  ],
];

function PriceCard({
  name,
  note,
  price,
  badge,
  highlighted = false,
  disabled = false,
}: {
  name: string;
  note: string;
  price: string;
  badge?: string;
  highlighted?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full min-w-60 flex-col items-start gap-8 rounded border p-8 ${
        highlighted ? 'border-stencil' : 'border-cream-muted'
      }`}
    >
      {badge ? (
        <span className="absolute -top-3 left-8 border border-stencil bg-panel px-2 py-0.5 font-body text-[11px] leading-[15px] font-medium text-stencil uppercase">
          {badge}
        </span>
      ) : null}
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-display text-2xl leading-tight font-black text-ink uppercase">
          {name}
        </h3>
        <p className="font-body text-sm text-taupe">{note}</p>
        <p className="font-display text-[28px] leading-tight font-black text-ink uppercase">
          {price}
        </p>
      </div>
      <CtaButton
        disabled={disabled}
        href={`#${SECTION_IDS.join}`}
        variant="dark"
      >
        {disabled
          ? m.landing_pricing_disabled_label()
          : m.landing_pricing_cta()}
      </CtaButton>
    </div>
  );
}

const isAppSectionDark: boolean = false as const;

export function Pricing() {
  return (
    <section
      id={SECTION_IDS.pricing}
      className={cn(
        'relative w-full bg-panel px-5 py-16 lg:px-20 lg:py-24 overflow-x-clip',
        isAppSectionDark && 'overflow-hidden',
        !isAppSectionDark &&
          'before:content-[" "] before:absolute before:top-0 before:right-5 before:left-5 lg:before:right-20 lg:before:left-20 before:block before:border-b-10 lg:before:border-b before:border-b-accent-highlight',
      )}
    >
      <img
        src="/images/landing/problem/paint-blob.png"
        alt=""
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-16 hidden w-48 rotate-90 lg:block',
          isAppSectionDark ? '-top-8' : '-top-24',
        )}
      />
      <img
        src="/images/landing/pricing/paint-bl.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-20"
      />

      <div className="relative flex flex-col gap-12">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow theme="light">{m.landing_pricing_eyebrow()}</Eyebrow>
          <Heading className="text-ink">
            <Highlight>{m.landing_pricing_title_highlight()}</Highlight>{' '}
            {m.landing_pricing_title_rest()}
          </Heading>
          <p className="max-w-2xl font-body text-base text-ink lg:text-[18px]">
            {m.landing_pricing_body()}
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid w-full grid-cols-1 gap-8 pt-3 sm:grid-cols-2 lg:w-auto lg:shrink-0">
            <PriceCard
              name={m.landing_pricing_monthly_name()}
              note={m.landing_pricing_monthly_note()}
              price={m.landing_pricing_monthly_price()}
              badge={m.landing_pricing_monthly_badge()}
              highlighted
            />
            <PriceCard
              name={m.landing_pricing_yearly_name()}
              note={m.landing_pricing_yearly_note()}
              price={m.landing_pricing_yearly_price()}
              disabled
            />
          </div>

          <div className="flex flex-col gap-6 lg:max-w-[600px]">
            <p className="font-body text-base leading-[24px] font-semibold text-ink lg:text-[18px]">
              {m.landing_pricing_features_intro()}{' '}
              <span className="text-stencil">
                {m.landing_pricing_features_highlight()}
              </span>
            </p>
            <div className="border-t border-cream-muted" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {featureColumns.map((column, i) => (
                <ul
                  key={i}
                  className={`flex list-["•"] flex-col gap-2 pl-2 *:pl-4`}
                >
                  {column.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm leading-[21px] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
