import { useEffect } from 'react';

import { useRouter } from '@tanstack/react-router';

import { SECTION_IDS } from './anchors';

const TRACKED_IDS = Object.values(SECTION_IDS);

/**
 * Keeps the URL hash in sync with whichever tracked section is currently
 * centered in the viewport, without triggering a scroll jump.
 *
 * Uses the router's `navigate` (rather than raw `history.replaceState`)
 * because TanStack Router patches `history` for scroll restoration: a
 * direct `replaceState` call gets picked up as a location change and the
 * router resets scroll to the top of the new "page".
 */
export function useActiveSectionHash() {
  const router = useRouter();

  useEffect(() => {
    const sections = TRACKED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (sections.length === 0) return;

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }
        const activeId = TRACKED_IDS.find((id) => visibleIds.has(id));
        if (activeId && window.location.hash !== `#${activeId}`) {
          router.navigate({
            to: '.',
            hash: activeId,
            replace: true,
            resetScroll: false,
            hashScrollIntoView: false,
          });
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, [router]);
}
