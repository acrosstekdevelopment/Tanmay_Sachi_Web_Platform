import { defineRouting } from "next-intl/routing";

// Agreement cl. 3.2: English and Hindi as full site locales, each on its own
// URL path. "/" always goes to /en (no browser-language guessing), so the
// address a person shares is the page they saw.
export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
