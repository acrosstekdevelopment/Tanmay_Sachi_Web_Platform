import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Tanmaysaachi Mahila Empower Foundation",
    template: "%s · Tanmaysaachi",
  },
  description:
    "We work with communities, companies and government institutions to widen access to education, skills, health and livelihoods, with women's economic independence as our founding focus.",
  robots: { index: indexable, follow: indexable },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${devanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
