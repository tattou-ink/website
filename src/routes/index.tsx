import { AppSection } from '@/components/landing/AppSection';
import { Benefit1 } from '@/components/landing/Benefit1';
import { Benefit2 } from '@/components/landing/Benefit2';
import { Benefit3 } from '@/components/landing/Benefit3';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { Footer } from '@/components/Footer';
import { Header, Hero } from '@/components/landing/Hero';
import type { NavLink } from '@/components/landing/Hero';
import { Manifesto } from '@/components/landing/Manifesto';
import { Pricing } from '@/components/landing/Pricing';
import { Problem } from '@/components/landing/Problem';
import { PromiseSection } from '@/components/landing/Promise';
// import { Testimony } from '@/components/landing/Testimony';
import { Ticker } from '@/components/landing/Ticker';
import { useActiveSectionHash } from '@/components/landing/useActiveSectionHash';
import { m } from '@/paraglide/messages';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getLandingNavLinks } from '@/lib/navUtils';
import { getLocale } from '@/paraglide/runtime';
import {
  getOrganizationNode,
  getWebsiteNode,
  jsonLdScript,
} from '@/lib/structuredData';
import { listSubscriptionPlans } from '@/api/subscriptionPlan';

export const Route = createFileRoute('/')({
  component: App,
  head: () => {
    const title = m.major_any_newt_fry();
    const description = m.wise_this_panther_race();
    const locale = getLocale();
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      // No manual <link rel="preload"> needed here: React's SSR renderer
      // automatically emits one for any <img> that isn't loading="lazy"
      // (see Hero's fetchPriority="high" image), matching its real srcset.
      scripts: [jsonLdScript([getOrganizationNode(), getWebsiteNode(locale)])],
    };
  },
  loader: async () => {
    const defaultSubscriptionPlans = await listSubscriptionPlans({
      currency: 'USD',
    });

    return { defaultSubscriptionPlans };
  },
});

function App() {
  useActiveSectionHash();

  const { defaultSubscriptionPlans } = Route.useLoaderData();

  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    setNavLinks(getLandingNavLinks());
  }, []);

  return (
    <main>
      <Header navLinks={navLinks} />
      <Hero />
      <Ticker />
      <Problem />
      <PromiseSection />
      <Benefit1 />
      <Benefit2 />
      <Benefit3 />
      {/* <Testimony /> */}
      <AppSection />
      <Pricing defaultSubscriptionPlans={defaultSubscriptionPlans} />
      <Manifesto />
      <CtaFinal />
      <Footer mergeWithPreviousDarkSection={true} theme="dark" />
    </main>
  );
}
