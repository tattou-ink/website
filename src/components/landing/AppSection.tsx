import { useState } from 'react';

import { m } from '@/paraglide/messages';

import { SECTION_IDS } from './anchors';
import { Eyebrow, Heading, Highlight } from './ui';

type Feature = {
  label: string;
  title?: string;
  body?: string;
  screenshot?: { desktop: string; mobile: string };
};

const features: Feature[] = [
  {
    label: m.landing_app_feature_1_label(),
    title: m.landing_app_feature_1_title(),
    body: m.landing_app_feature_1_body(),
    screenshot: {
      desktop: '/images/landing/app/calendar.png',
      mobile: '/images/landing/app/calendar.png',
    },
  },
  {
    label: m.landing_app_feature_2_label(),
    title: m.landing_app_feature_2_title(),
    body: m.landing_app_feature_2_body(),
    screenshot: {
      desktop: '/images/landing/app/session.png',
      mobile: '/images/landing/app/session.png',
    },
  },
  {
    label: m.landing_app_feature_3_label(),
    title: m.landing_app_feature_3_title(),
    body: m.landing_app_feature_3_body(),
    screenshot: {
      desktop: '/images/landing/app/flashbook.png',
      mobile: '/images/landing/app/flashbook.png',
    },
  },
  {
    label: m.landing_app_feature_4_label(),
    title: m.landing_app_feature_4_title(),
    body: m.landing_app_feature_4_body(),
    screenshot: {
      desktop: '/images/landing/app/session.png', // TODO: Replace with form builder screenshot.
      mobile: '/images/landing/app/session.png', // TODO: Replace with form builder screenshot.
    },
  },
  {
    label: m.landing_app_feature_5_label(),
    title: m.landing_app_feature_5_title(),
    body: m.landing_app_feature_5_body(),
    screenshot: {
      desktop: '/images/landing/app/flashbook-configuration.png',
      mobile: '/images/landing/app/flashbook-configuration.png',
    },
  },
  { label: m.landing_app_feature_6_label() },
  { label: m.landing_app_feature_7_label() },
];

export function AppSection() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const expandedFeature = features[expandedIndex];

  return (
    <section
      id={SECTION_IDS.app}
      className="w-full bg-ink px-5 py-16 lg:px-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[628px_1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{m.landing_app_eyebrow()}</Eyebrow>
            <Heading className="text-cream">
              <Highlight tone="brand">{m.landing_app_title_line1()}</Highlight>
              <br />
              {m.landing_app_title_line2()}
            </Heading>
            <p className="font-body text-base leading-[24px] text-cream lg:text-[18px]">
              {m.landing_app_body()}
            </p>
          </div>

          <div className="flex w-full flex-col border-t border-cream-muted/30">
            {features.map((feature, i) => {
              const isExpanded = i === expandedIndex;
              const isInteractive = Boolean(feature.title);
              return (
                <div
                  key={feature.label}
                  className="border-b border-cream-muted/30"
                >
                  <button
                    type="button"
                    disabled={!isInteractive}
                    onClick={() => setExpandedIndex(i)}
                    className="flex w-full items-center justify-between py-4 text-left font-body text-sm leading-[21px] font-medium text-stencil uppercase disabled:cursor-default"
                  >
                    {feature.label}
                    {isInteractive ? (
                      <span aria-hidden>{isExpanded ? '−' : '+'}</span>
                    ) : (
                      <span aria-hidden className="text-cream-muted">
                        +
                      </span>
                    )}
                  </button>
                  {isExpanded && feature.title ? (
                    <div className="flex flex-col gap-2 pb-6">
                      <h3 className="font-display text-xl leading-tight font-black text-cream uppercase lg:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm leading-[21px] text-cream">
                        {feature.body}
                      </p>
                      {feature.screenshot ? (
                        <img
                          src={feature.screenshot.mobile}
                          alt=""
                          className="mt-4 w-full lg:hidden"
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {expandedFeature.screenshot ? (
          <img
            src={expandedFeature.screenshot.desktop}
            alt=""
            className="hidden w-full max-w-[318px] justify-self-end lg:block"
          />
        ) : null}
      </div>
    </section>
  );
}
