import { expect, test } from "@playwright/test";

// Bilingual framework (Agreement cl. 3.2, TDD §5.2).
test.describe("locale routing", () => {
  test("/ and unprefixed addresses go to English", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await page.goto("/work");
    await expect(page).toHaveURL(/\/en\/work$/);
  });

  test("unknown addresses show the 404 page inside the site", async ({ page }) => {
    const res = await page.goto("/en/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("We couldn't find that page.");
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("English pages", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("are English, show no fallback notice and offer Hindi", async ({ page }) => {
    await page.goto("/en/work");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".langnote")).toHaveCount(0);
    const pill = page.locator(".webhead a.lang");
    await expect(pill).toHaveText("हिंदी");
    await expect(pill).toHaveAttribute("lang", "hi");
    await pill.click();
    await expect(page).toHaveURL(/\/hi\/work$/);
  });
});

test.describe("Hindi pages without Hindi content", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("show English with a visible notice, marked as English", async ({ page }) => {
    await page.goto("/hi/work");
    await expect(page.locator("html")).toHaveAttribute("lang", "hi");
    await expect(page.locator("#app")).toHaveAttribute("lang", "en");
    await expect(page.locator(".langnote")).toContainText("not yet available in Hindi");
    await expect(page.locator("h1")).toHaveText("Access, capability, independence.");
  });

  test("are not offered to search engines", async ({ page }) => {
    await page.goto("/hi/work");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("keep navigation in Hindi and switch back to English", async ({ page }) => {
    await page.goto("/hi/work");
    await expect(page.locator(".webnav").getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/hi/projects");
    const pill = page.locator(".webhead a.lang");
    await expect(pill).toHaveText("English");
    await pill.click();
    await expect(page).toHaveURL(/\/en\/work$/);
  });

  test("the notice links to the same page in English", async ({ page }) => {
    await page.goto("/hi/schemes");
    await page.locator(".langnote a").click();
    await expect(page).toHaveURL(/\/en\/schemes$/);
  });
});

test.describe("mobile switch", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("shows the short language names", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator(".mtop a.lang")).toHaveText("हिं");
    await page.goto("/hi");
    await expect(page.locator(".mtop a.lang")).toHaveText("EN");
  });
});
