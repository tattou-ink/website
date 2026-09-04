import { AppSection } from '@/components/landing/AppSection';
import { Benefit1 } from '@/components/landing/Benefit1';
import { Benefit2 } from '@/components/landing/Benefit2';
import { Benefit3 } from '@/components/landing/Benefit3';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { Footer } from '@/components/Footer';
import { Header, Hero } from '@/components/landing/Hero';
import { Manifesto } from '@/components/landing/Manifesto';
import { Pricing } from '@/components/landing/Pricing';
import { Problem } from '@/components/landing/Problem';
import { PromiseSection } from '@/components/landing/Promise';
// import { Testimony } from '@/components/landing/Testimony';
import { Ticker } from '@/components/landing/Ticker';
import { useActiveSectionHash } from '@/components/landing/useActiveSectionHash';
import { m } from '@/paraglide/messages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  head: () => {
    const title = m.major_any_newt_fry();
    const description = m.wise_this_panther_race();
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    };
  },
});

function App() {
  useActiveSectionHash();

  return (
    <main>
      <Header />
      <Hero />
      <Ticker />
      <Problem />
      <PromiseSection />
      <Benefit1 />
      <Benefit2 />
      <Benefit3 />
      {/* <Testimony /> */}
      <AppSection />
      <Pricing />
      <Manifesto />
      <CtaFinal />
      <Footer mergeWithPreviousDarkSection={true} theme='dark' />
    </main>
  );
}
