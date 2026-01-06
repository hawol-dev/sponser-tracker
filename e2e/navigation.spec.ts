import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should display landing page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Sponsor Tracker/);
  });

  test("should navigate to login page directly", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("should display legal pages", async ({ page }) => {
    // Terms page
    await page.goto("/terms");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Privacy page
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Refund page
    await page.goto("/refund");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should have footer links on landing page", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer links exist
    await expect(page.getByRole("link", { name: /이용약관/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /개인정보/ })).toBeVisible();
  });

  test("should return 404 for unknown routes", async ({ page }) => {
    const response = await page.goto("/unknown-page-that-does-not-exist");

    // Next.js returns 200 for 404 pages in dev, but the content shows not found
    await expect(page.getByText(/404|찾을 수 없|Not Found/i)).toBeVisible();
  });
});
