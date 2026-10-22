import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasPublishedContent } from "@/lib/i18n/content";
import { routing, type Locale } from "@/i18n/routing";
import { preload } from "react-dom";
import "../fonts.css";
import "../globals.css";

// Typefaces from the Approved Design, self-hosted from public/fonts with the
// same @font-face rules Google Fonts serves the mockup (app/fonts.css). No
// build-time download, and glyphs the families lack (e.g. "→") fall back
// exactly as in the mockup. Preload the Latin files used above the fold.
const PRELOAD_FONTS = [
  "/fonts/inter-tight-normal-latin.woff2",
  "/fonts/instrument-serif-normal-latin.woff2",
];

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
  for (const href of PRELOAD_FONTS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
