import { expect, test } from "@playwright/test";
import { ROUTES, WIDTHS } from "./routes";

// No horizontal scroll at any width from 360px (BUILD_GUIDE §4, PRD A8), one
// H1 per page (TDD §5.6), and the right chrome for the breakpoint.
for (const width of WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route} has no horizontal scroll and one h1`, async ({ page }) => {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        const [scrollWidth, innerWidth] = await page.evaluate(() => [
          document.documentElement.scrollWidth,
          window.innerWidth,
        ]);
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
        // overflow-x:clip hides overflow from scrollWidth, so also look for any
        // visible element running past the viewport, outside scroll containers
        // (carousels, chip strips) and overflow:hidden boxes.
        const overflowing = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const clipped = (el: Element) => {
            for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
              if (getComputedStyle(p).overflowX !== "visible") return true;
            }
            return false;
          };
          return [...document.querySelectorAll("main *, header *, footer *, nav *")]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && r.right > vw + 1 && !clipped(el);
            })
            .map((el) => `${el.tagName.toLowerCase()}.${el.className}: ${(el.textContent ?? "").trim().slice(0, 40)}`)
            .slice(0, 5);
        });
        expect(overflowing).toEqual([]);
        await expect(page.locator("h1")).toHaveCount(1);
      });
    }

    test("shows the chrome for this breakpoint", async ({ page }) => {
      await page.goto("/en");
      const web = width >= 820;
      await expect(page.locator(".webhead")).toBeVisible({ visible: web });
      await expect(page.locator(".mhead")).toBeVisible({ visible: !web });
      await expect(page.locator(".tabbar")).toBeVisible({ visible: !web });
    });
  });
}

test.describe("mobile interactions", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("drawer opens from the burger and closes on scrim and link tap", async ({ page }) => {
    await page.goto("/en");
    const drawer = page.locator("#drawer");
    await page.locator("#burger").click();
    await expect(drawer).toHaveClass(/open/);
    await drawer.click({ position: { x: 10, y: 10 } });
    await expect(drawer).not.toHaveClass(/open/);
    await page.locator("#burger").click();
    await drawer.getByRole("link", { name: "Knowledge base" }).click();
    await expect(page).toHaveURL(/\/knowledge$/);
    await expect(drawer).not.toHaveClass(/open/);
  });

  test("tab bar marks the current tab", async ({ page }) => {
    await page.goto("/en/schemes");
    await expect(page.locator(".tabbar a.on")).toHaveText(/Schemes/);
  });
});

test.describe("page interactions", () => {
  test("home ask chip fills the box and shows the illustrative answer", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#answer")).toBeHidden();
    await page.getByRole("button", { name: "CSR programmes in skilling" }).click();
    await expect(page.locator("#askq")).toHaveValue("CSR programmes in skilling");
    await expect(page.locator("#answer")).toBeVisible();
    await expect(page.locator(".ansnote")).toHaveText(/Illustrative response/);
  });

  test("give amount updates the Funds line", async ({ page }) => {
    await page.goto("/en/give");
    await expect(page.locator("#what2")).toContainText("digital skills training support for one woman");
    await page.getByRole("button", { name: "₹10,000" }).click();
    await expect(page.locator("#what2")).toContainText("a full training batch of twelve");
    await expect(page.getByRole("button", { name: "₹10,000" })).toHaveAttribute("aria-pressed", "true");
  });

  test("filter chips are single-select", async ({ page }) => {
    await page.goto("/en/schemes");
    const group = page.getByRole("group", { name: "Filter schemes" });
    await group.getByRole("button", { name: "Open now" }).click();
    await expect(group.locator('[aria-pressed="true"]')).toHaveText("Open now");
    await expect(group.locator('[aria-pressed="true"]')).toHaveCount(1);
  });
});
