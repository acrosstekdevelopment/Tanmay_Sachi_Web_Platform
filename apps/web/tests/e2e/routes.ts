// Every public page ported from the Approved Design (TDD Appendix A, rows
// marked "Approved design"), without the locale prefix. Keep in sync when
// pages are added.
export const PAGES = [
  "/",
  "/work",
  "/work/womens-economic-independence",
  "/projects",
  "/projects/featured",
  "/schemes",
  "/knowledge",
  "/knowledge/writing-a-project-report-a-bank-will-accept",
  "/partner",
  "/accountability",
  "/about",
  "/give",
  "/contact",
  "/ask",
] as const;

export const LOCALES = ["en", "hi"] as const;

/** "/en", "/en/work", … "/hi/ask": every page in both locales. */
export const ROUTES = LOCALES.flatMap((locale) => PAGES.map((page) => `/${locale}${page === "/" ? "" : page}`));

// Device floor widths (Agreement cl. 3.1) plus one desktop width.
export const WIDTHS = [360, 375, 414, 1280] as const;
