// Every public route ported from the Approved Design (TDD Appendix A, rows
// marked "Approved design"). Keep in sync when routes are added.
export const ROUTES = [
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

// Device floor widths (Agreement cl. 3.1) plus one desktop width.
export const WIDTHS = [360, 375, 414, 1280] as const;
