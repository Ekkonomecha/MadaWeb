import type { Metadata } from 'next';
import { Poppins, Caveat, Almarai } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SmoothScroll from '@/components/SmoothScroll';
import Shell from '@/components/Shell';
import LoadingScreen from '@/components/LoadingScreen';
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
      <head>
        {/*
          A reload should open the page at the top, not wherever the last visit
          left it. Browsers restore the old offset after load, which lands you
          mid-page behind a loading panel and leaves Lenis disagreeing with the
          document about where it is. Inline and in the head so it is set before
          the browser gets the chance.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)window.scrollTo(0,0)}catch(e){}",
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <SmoothScroll>
            <LoadingScreen />
            <Shell>{children}</Shell>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
