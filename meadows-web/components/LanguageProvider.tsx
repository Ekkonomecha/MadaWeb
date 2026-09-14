'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import type { Lang } from '@/lib/content';

const STORAGE_KEY = 'meadows-lang';

/*
 * The chosen language lives in localStorage, and the components read it through
 * useSyncExternalStore. Keeping one source of truth avoids mirroring it into
 * React state and then syncing the two inside an effect, which causes cascading
 * renders and is what react-hooks/set-state-in-effect warns about.
 *
 * Server and first client render both report English, so hydration matches; React
 * re-renders with the stored value immediately afterwards.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other tabs of the site in step.
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function readStored(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  } catch {
    // Private mode or blocked storage — English is a fine default.
    return 'en';
  }
}

function readServer(): Lang {
  return 'en';
}

function writeStored(next: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore — the language still applies for this page view */
  }
  listeners.forEach((notify) => notify());
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  isAr: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStored, readServer);

  // Mirror the choice onto <html> for direction, font selection and screen readers.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: writeStored, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
