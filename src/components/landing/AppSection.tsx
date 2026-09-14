import { useState } from 'react';

import { m } from '@/paraglide/messages';
import { Accordion } from 'radix-ui';

import { Image } from '@/components/Image';
import { SECTION_IDS } from './anchors';
import { Eyebrow, Heading, Highlight } from './ui';
import { cn } from '@/lib/utils';

type Feature = {
  label: string;
  title?: string;
  body?: string;
  screenshot?: {
    desktop: string;
    mobile: string;
    width: number;
    height: number;
  };
};

const theme: 'dark' | 'light' = 'light';

// Mobile only: cards pile up on scroll. Each card sticks a few pixels lower
// than the previous one so the stack underneath stays visible.
const MOBILE_CARD_TOP = 72; // clears the fixed header
const MOBILE_CARD_STEP = 6;

export function AppSection() {
  const features: Feature[] = [
    {
      label: m.landing_app_feature_1_label(),
      title: m.landing_app_feature_1_title(),
      body: m.landing_app_feature_1_body(),
      screenshot: {
        desktop: '/images/landing/app/calendar.png',
        mobile: '/images/landing/app/calendar.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_2_label(),
      title: m.landing_app_feature_2_title(),
      body: m.landing_app_feature_2_body(),
      screenshot: {
        desktop: '/images/landing/app/session.png',
        mobile: '/images/landing/app/session.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_3_label(),
      title: m.landing_app_feature_3_title(),
      body: m.landing_app_feature_3_body(),
      screenshot: {
        desktop: '/images/landing/app/flashbook.png',
        mobile: '/images/landing/app/flashbook.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_4_label(),
      title: m.landing_app_feature_4_title(),
      body: m.landing_app_feature_4_body(),
      screenshot: {
        desktop: '/images/landing/app/forms.png',
        mobile: '/images/landing/app/forms.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_5_label(),
      title: m.landing_app_feature_5_title(),
      body: m.landing_app_feature_5_body(),
      screenshot: {
        desktop: '/images/landing/app/flashbook-configuration.png',
        mobile: '/images/landing/app/flashbook-configuration.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_6_label(),
      title: m.landing_app_feature_6_title(),
      body: m.landing_app_feature_6_body(),
      screenshot: {
        desktop: '/images/landing/app/studios.png',
        mobile: '/images/landing/app/studios.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_7_label(),
      title: m.landing_app_feature_7_title(),
      body: m.landing_app_feature_7_body(),
      screenshot: {
        desktop: '/images/landing/app/chat.png',
        mobile: '/images/landing/app/chat.png',
        width: 1206,
        height: 2622,
      },
    },
    {
      label: m.landing_app_feature_8_label(),
      title: m.landing_app_feature_8_title(),
      body: m.landing_app_feature_8_body(),
      screenshot: {
        desktop: '/images/landing/app/website.png',
        mobile: '/images/landing/app/website.png',
        width: 1179,
        height: 2556,
      },
    },
  ];
  const [expandedIndex, setExpandedIndex] = useState(0);
  const expandedFeature = features[expandedIndex];

  return (
    <section
      id={SECTION_IDS.app}
      className={cn(
        'relative',
        'scroll-mt-16',
        'w-full px-5 py-16 lg:px-20 lg:py-24',
        theme === 'dark' ? 'bg-ink' : 'bg-panel',
      )}
    >
      {theme === 'light' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <Image
            src="/images/landing/paint-stroke.webp"
            width={674}
            height={370}
            alt=""
            aria-hidden
            sizes="288px"
            className={cn(
              'pointer-events-none absolute',
              '-top-8 -right-24 w-72 rotate-[60deg]',
              'lg:-top-8 lg:-right-32 lg:w-72',
            )}
          />{' '}
        </div>
      )}
      <div className="grid gap-12 md:grid-cols-[500px_1fr] md:items-start md:gap-16 lg:grid-cols-[628px_1fr]">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow theme={theme}>{m.landing_app_eyebrow()}</Eyebrow>
            <Heading
              className={cn(theme === 'dark' ? 'text-cream' : 'text-ink')}
            >
              <Highlight tone={theme === 'dark' ? 'brand' : 'light'}>
                {m.landing_app_title_line1()}
              </Highlight>
              <br />
              {m.landing_app_title_line2()}
            </Heading>
            <p
              className={cn(
                'font-body text-base leading-[24px] text-cream lg:text-[18px]',
                theme === 'dark' ? 'text-cream' : 'text-charcoal-700',
              )}
            >
              {m.landing_app_body()}
            </p>
          </div>

          <Accordion.Root
            type="single"
            value={String(expandedIndex)}
            onValueChange={(value) => {
              if (value) setExpandedIndex(Number(value));
            }}
            className="hidden w-full flex-col md:flex"
          >
            {features.map((feature, i) => {
              const isExpanded = i === expandedIndex;
              const isInteractive = Boolean(feature.title);
              return (
                <Accordion.Item
                  key={feature.label}
                  value={String(i)}
                  disabled={!isInteractive}
                  className={cn(
                    'border-t',
                    'transition-[border]',
                    isExpanded
                      ? theme === 'dark'
                        ? 'border-accent-highlight-dark'
                        : 'border-accent-highlight'
                      : theme === 'dark'
                        ? 'border-charcoal-700 hover:border-stencil-200'
                        : 'border-charcoal-300 hover:border-stencil-300',
                  )}
                >
                  <Accordion.Header className="group">
                    <Accordion.Trigger
                      className={cn(
                        'transition-all',
                        'flex w-full items-center justify-between pt-4 text-left font-body text-sm leading-[21px] font-medium uppercase disabled:cursor-default',
                        isExpanded ? 'pb-2' : 'pb-4',
                        isExpanded
                          ? theme === 'dark'
                            ? 'text-accent-highlight-dark'
                            : 'text-accent-highlight'
                          : theme === 'dark'
                            ? 'text-cream group-hover:text-stencil-200'
                            : 'text-charcoal-700 group-hover:text-stencil-600',
                      )}
                    >
                      {feature.label}
                      {isInteractive ? (
                        <span aria-hidden>{isExpanded ? '−' : '+'}</span>
                      ) : (
                        <span aria-hidden className="text-cream-muted">
                          +
                        </span>
                      )}
                    </Accordion.Trigger>
                  </Accordion.Header>
                  {isInteractive ? (
                    <Accordion.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
                      <div className="flex flex-col gap-2 pb-6">
                        <h3
                          className={cn(
                            'font-display text-xl leading-tight font-black uppercase lg:text-2xl',
                            theme === 'dark' ? 'text-cream' : '',
                          )}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={cn(
                            'font-body text-sm leading-[21px]',
                            theme === 'dark'
                              ? 'text-cream'
                              : 'text-charcoal-700',
                          )}
                        >
                          {feature.body}
                        </p>
                      </div>
                    </Accordion.Content>
                  ) : null}
                </Accordion.Item>
              );
            })}
          </Accordion.Root>

          <ol className="w-full md:hidden">
            {features.map((feature, i) => {
              if (!feature.title) return null;
              return (
                <li
                  key={feature.label}
                  className={cn('sticky')}
                  style={{
                    top: MOBILE_CARD_TOP + i * MOBILE_CARD_STEP,
                    zIndex: i + 1,
                  }}
                >
                  <article
                    className={cn(
                      'flex h-[calc(100svh-9.5rem)] max-h-[680px] min-h-[380px] flex-col overflow-hidden',
                      'rounded shadow-[0_-6px_20px_rgba(28,25,23,0.10)]',
                      theme === 'dark' ? 'bg-ink' : 'bg-[#faf8f6]',
                      i === features.length - 1 ? 'pb-4' : 'pb-2',
                    )}
                  >
                    <div className="flex flex-col gap-2 p-5">
                      <p
                        className={cn(
                          'font-body text-sm leading-[21px] font-medium uppercase',
                          theme === 'dark'
                            ? 'text-accent-highlight-dark'
                            : 'text-accent-highlight',
                        )}
                      >
                        {feature.label}
                      </p>
                      <h3
                        className={cn(
                          'font-display text-xl leading-tight font-black uppercase',
                          theme === 'dark' ? 'text-cream' : 'text-ink',
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          'font-body text-sm leading-[21px]',
                          theme === 'dark' ? 'text-cream' : 'text-charcoal-700',
                        )}
                      >
                        {feature.body}
                      </p>
                    </div>
                    {feature.screenshot ? (
                      <div className="flex min-h-0 flex-1 justify-center px-5 pb-5">
                        <Image
                          src={feature.screenshot.mobile}
                          sizes="318px"
                          width={feature.screenshot.width}
                          height={feature.screenshot.height}
                          className="h-full w-auto max-w-full border-2 border-stencil object-contain"
                        />
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
            {/* Holds the finished pile on screen for a beat before the page
                scrolls on to the next section. */}
            <li aria-hidden className="h-[10svh]" />
          </ol>
        </div>

        {expandedFeature && expandedFeature.screenshot ? (
          <div className="mt-20 hidden min-w-[220px] shrink-0 justify-center md:flex">
            <div className="relative w-full max-w-[318px] border-2 border-stencil">
              <div className="absolute top-4 left-4 aspect-[201/437] w-full border-2 border-stencil" />
              <div className="aspect-[201/437] w-full overflow-hidden">
                <div
                  className="flex w-full flex-col transition-transform duration-500 ease-out"
                  style={{
                    height: `${features.length * 100}%`,
                    transform: `translateY(-${(100 / features.length) * expandedIndex}%)`,
                  }}
                >
                  {features.map((feature) => (
                    <div
                      key={feature.label}
                      className="w-full shrink-0"
                      style={{ height: `${100 / features.length}%` }}
                    >
                      {feature.screenshot ? (
                        <Image
                          src={feature.screenshot.desktop}
                          width={feature.screenshot.width}
                          height={feature.screenshot.height}
                          sizes="318px"
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
