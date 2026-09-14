import type { Metadata } from 'next';
import { Poppins, Caveat, Almarai } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Shell from '@/components/Shell';
import { content } from '@/lib/content';

/*
 * Self-hosted through next/font: the files are served from this origin, so there
 * is no extra connection to Google before text can paint. Parents research
 * nurseries on phones, and the brief counts a slow site as a quality signal.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins-src',
  display: 'swap',
});

/** The annotation voice — margin notes in a human hand. */
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-hand-src',
  display: 'swap',
});

/** Arabic. Deliberately not Mada's Tajawal. */
const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-arabic-src',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${content.global.siteName.en} — ${content.global.siteTagline.en}`,
    template: `%s — ${content.global.siteName.en}`,
  },
  description: content.global.siteDescription.en,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${poppins.variable} ${caveat.variable} ${almarai.variable}`}
    >
      <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <Shell>{children}</Shell>
        </LanguageProvider>
      </body>
    </html>
  );
}
