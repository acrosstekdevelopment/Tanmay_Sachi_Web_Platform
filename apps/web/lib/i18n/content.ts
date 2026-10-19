import type { Locale } from "@/i18n/routing";

/**
 * Whether page content is published in a locale (TDD §5.2: each record has
 * its own language publication state). No Hindi copy has been supplied yet,
 * so every page is English-only and /hi shows the English page with a visible
 * notice. In pass 2 this becomes the per-record status from the database.
 */
export function hasPublishedContent(locale: Locale): boolean {
  return locale === "en";
}
