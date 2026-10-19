import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, Noto_Sans_Devanagari } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasPublishedContent } from "@/lib/i18n/content";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

// Typefaces from the Approved Design (Google Fonts, SIL Open Font Licence),
// self-hosted by next/font. Devanagari per TDD §3.
// adjustFontFallback is off so glyphs the families lack (e.g. "→") fall back
// exactly as in the mockup (system-ui / Georgia), not to a resized Arial.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-instrument-serif",
});
const interTight = Inter_Tight({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter-tight",
});
const devanagari = Noto_Sans_Devanagari({
  weight: ["400", "500", "600"],
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-devanagari",
});

// Non-production environments are never indexed (TDD §10.7, ROBOTS_MODE).
const indexable = process.env.ROBOTS_MODE === "index";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  // A locale whose content is only the English fallback is not offered to
  // search engines (TDD §5.2: alternates only for versions that truly exist).
  const index = indexable && hasLocale(routing.locales, locale) && hasPublishedContent(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: t("siteName"), template: "%s · Tanmaysaachi" },
    description: t("description"),
    robots: { index, follow: indexable },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);
  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${interTight.variable} ${devanagari.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
