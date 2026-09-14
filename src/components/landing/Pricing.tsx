import { m } from '@/paraglide/messages';

import { Image } from '@/components/Image';
import { SECTION_IDS } from './anchors';
import { CtaButton, Eyebrow, Heading, Highlight, Select } from './ui';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import type { Currency } from '@/lib/currencyUtils';
import { AVAILABLE_CURRENCIES } from '@/lib/currencyUtils';
import { listSubscriptionPlans } from '@/api/subscriptionPlan';
import type { SubscriptionPlan } from '@/api/subscriptionPlan';
import { getLocale } from '@/paraglide/runtime';

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

// TODO: If using true here, make sure the stains and borders work as expected.
const isAppSectionDark: boolean = false as const;

export function Pricing({
  defaultSubscriptionPlans,
}: {
  defaultSubscriptionPlans: SubscriptionPlan[];
}) {
  const defaultCurrency: Currency = useMemo(() => {
    const firstSubscriptionPlan = defaultSubscriptionPlans[0];
    return firstSubscriptionPlan ? firstSubscriptionPlan.currency : 'USD';
  }, []);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >(defaultSubscriptionPlans);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );

  useEffect(() => {
    const fetchCurrencies = async () => {
      const subscriptionPlansWithGuessedCurrency = await listSubscriptionPlans(
        {},
      );

      const firstSubscriptionPlanWithGuessedCurrency =
        subscriptionPlansWithGuessedCurrency[0];
      if (firstSubscriptionPlanWithGuessedCurrency) {
        setSelectedCurrency(firstSubscriptionPlanWithGuessedCurrency.currency);
      }
      setSubscriptionPlans(subscriptionPlansWithGuessedCurrency);
    };
    fetchCurrencies();
  }, []);

  const currencyToDisplay = selectedCurrency || defaultCurrency;

  const handleCurrencyChange = async (currency: Currency) => {
    setSelectedCurrency(currency);
    const subscriptionPlansForCurrency = await listSubscriptionPlans({
      currency,
    });
    setSubscriptionPlans(subscriptionPlansForCurrency);
  };

  const monthlySubscription = subscriptionPlans.find(
    (_plan) => _plan.period === 'month',
  );
  const yearlySubscription = subscriptionPlans.find(
    (_plan) => _plan.period === 'year',
  );

  const formatPrice = new Intl.NumberFormat([getLocale()], {
    currency: currencyToDisplay,
    style: 'currency',
    currencyDisplay: 'symbol',
  });

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

  return (
    <section
      id={SECTION_IDS.pricing}
      className={cn(
        'scroll-mt-16',
        'relative w-full bg-panel max-lg:pt-2.5',
        isAppSectionDark && 'overflow-hidden',
        !isAppSectionDark &&
          'before:content-[" "] before:absolute before:top-0 before:right-0 before:left-0 before:block before:border-b-10 before:border-b-accent-highlight lg:before:right-20 lg:before:left-20 lg:before:border-b',
      )}
    >
      <div className="relative overflow-x-clip px-5 py-16 max-lg:overflow-clip lg:px-20 lg:py-24">
        <Image
          src="/images/landing/paint-blob.webp"
          width={372}
          height={374}
          alt=""
          aria-hidden
          sizes="192px"
          className={cn(
            'pointer-events-none absolute -right-16 w-48 rotate-90 lg:block',
            isAppSectionDark ? '-top-8' : '-top-24',
          )}
        />
        <Image
          src="/images/landing/paint-stroke-small.webp"
          width={80}
          height={43}
          alt=""
          aria-hidden
          sizes="80px"
          className="pointer-events-none absolute -right-3 bottom-0 w-20 rotate-180"
        />

        <div className="relative flex flex-col gap-6 md:gap-12">
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
            <div className="flex w-full flex-2 flex-col lg:flex-col-reverse gap-2 xl:flex-1">
              <Select
                className="mt-4 self-end lg:self-start"
                value={currencyToDisplay}
                onValueChange={(currency) =>
                  handleCurrencyChange(currency as Currency)
                }
                options={AVAILABLE_CURRENCIES.map((_currency) => ({
                  value: _currency.value,
                  label: `${_currency.label} - ${_currency.symbol}`,
                }))}
              />
              <div className="grid w-full grid-cols-1 gap-8 pt-3 sm:grid-cols-2 lg:w-auto lg:shrink-0">
                <PriceCard
                  name={m.landing_pricing_monthly_name()}
                  note={m.landing_pricing_monthly_note()}
                  price={m.landing_pricing_monthly_price({
                    pricePerMonth: monthlySubscription
                      ? formatPrice.format(monthlySubscription.price / 100)
                      : '-',
                  })}
                  badge={m.landing_pricing_monthly_badge()}
                  highlighted
                />
                <PriceCard
                  name={m.landing_pricing_yearly_name()}
                  note={m.landing_pricing_yearly_note()}
                  price={m.landing_pricing_yearly_price({
                    pricePerYear: yearlySubscription
                      ? formatPrice.format(yearlySubscription.price / 100)
                      : '-',
                  })}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6 lg:max-w-[600px]">
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
                    className={`flex list-["•"] flex-col gap-2 pl-2 *:pl-4 *:marker:text-stencil`}
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
      </div>
    </section>
  );
}
