import raw from '@/content/content.json';

export type Lang = 'en' | 'ar';

/** A bilingual leaf in content.json. */
export type Bi = { en: string; ar: string };

/** Pick the active language off a bilingual leaf. */
export const t = (node: Bi | undefined, lang: Lang): string => (node ? node[lang] : '');

/** Pick a localised list. */
export const tList = (node: { en: string[]; ar: string[] } | undefined, lang: Lang): string[] =>
  node ? node[lang] : [];

/**
 * The single source of truth for every string on this site.
 * Pages read from here; nothing is hardcoded in a component.
 */
export const content = raw;

/** Brand accent tokens. Each character and room owns exactly one. */
export type Accent = 'teal' | 'sky' | 'berry' | 'grass' | 'sun' | 'teal-deep';

/** Tailwind-safe class maps — full class strings so the compiler can see them. */
export const accentText: Record<Accent, string> = {
  teal: 'text-teal',
  sky: 'text-sky',
  berry: 'text-berry',
  grass: 'text-grass',
  sun: 'text-[#b88c00]',
  'teal-deep': 'text-teal-deep',
};

export const accentBg: Record<Accent, string> = {
  teal: 'bg-teal',
  sky: 'bg-sky',
  berry: 'bg-berry',
  grass: 'bg-grass',
  sun: 'bg-sun',
  'teal-deep': 'bg-teal-deep',
};


