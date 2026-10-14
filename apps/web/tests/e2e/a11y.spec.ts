import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

// WCAG 2.1 AA: zero critical or serious axe violations (TDD §5.6, §14.2).
// `.ph` placeholders are excluded from the contrast rule only: they are the
// Approved Design's deliberately faint "to be filled" marks and are replaced
// by real content in normal text colours before launch.
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

for (const vp of VIEWPORTS) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    for (const route of ROUTES) {
      test(`${route} has no serious accessibility violations`, async ({ page }) => {
        await page.goto(route);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const isPlaceholder = (html: string) => /class="[^"]*\bph\b/.test(html);
        const serious = results.violations
          .filter((v) => v.impact === "critical" || v.impact === "serious")
          .map((v) => ({
            ...v,
            nodes: v.id === "color-contrast" ? v.nodes.filter((n) => !isPlaceholder(n.html)) : v.nodes,
          }))
          .filter((v) => v.nodes.length > 0)
          .map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.html.slice(0, 120)).slice(0, 5),
          }));
        expect(serious).toEqual([]);
      });
    }
  });
}
