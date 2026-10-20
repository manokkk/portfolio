import { useState, useEffect, useCallback } from 'react';

/**
 * Lightweight browser router hook supporting path routing, query params, and history state
 */
export function useRouter() {
  const [locationState, setLocationState] = useState(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      return {
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      };
    }
    return { path: '/', search: '', hash: '' };
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setLocationState({
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    
    // Support hash jump if on the exact same path
    if (to.startsWith('#')) {
      const el = document.getElementById(to.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', `${window.location.pathname}${to}`);
      setLocationState({
        path: window.location.pathname,
        search: window.location.search,
        hash: to
      });
      return;
    }

    const currentFull = `${window.location.pathname}${window.location.search}`;
    if (to !== currentFull) {
      window.history.pushState(null, '', to);
      const url = new URL(to, window.location.origin);
      setLocationState({
        path: url.pathname,
        search: url.search,
        hash: url.hash
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Parse query params helper
  const getQueryParam = useCallback((param) => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(locationState.search);
    return params.get(param);
  }, [locationState.search]);

  return { 
    currentPath: locationState.path, 
    currentSearch: locationState.search,
    getQueryParam,
    navigate 
  };
}
