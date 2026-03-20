'use client';

import { useSyncExternalStore } from 'react';

const queries = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

function createMediaQueryStore(query: string) {
  return {
    subscribe: (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    getSnapshot: () => window.matchMedia(query).matches,
    getServerSnapshot: () => false,
  };
}

const mobileStore = createMediaQueryStore(queries.mobile);
const tabletStore = createMediaQueryStore(queries.tablet);
const desktopStore = createMediaQueryStore(queries.desktop);

export function useResponsive() {
  const isMobile = useSyncExternalStore(
    mobileStore.subscribe,
    mobileStore.getSnapshot,
    mobileStore.getServerSnapshot,
  );
  const isTablet = useSyncExternalStore(
    tabletStore.subscribe,
    tabletStore.getSnapshot,
    tabletStore.getServerSnapshot,
  );
  const isDesktop = useSyncExternalStore(
    desktopStore.subscribe,
    desktopStore.getSnapshot,
    desktopStore.getServerSnapshot,
  );

  return { isMobile, isTablet, isDesktop };
}
