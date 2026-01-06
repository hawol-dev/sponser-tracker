import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login page with form", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveTitle(/Sponsor Tracker/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("should display signup page with form", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("should navigate from login to signup", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("link", { name: /회원가입/ }).click();

    await expect(page).toHaveURL(/signup/);
  });

  test("should navigate from signup to login", async ({ page }) => {
    await page.goto("/signup");

    await page.getByRole("link", { name: /로그인/ }).click();

    await expect(page).toHaveURL(/login/);
  });

  test("should show validation error for empty email", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: /로그인/ }).click();

    // Browser native validation should prevent submission
    const emailInput = page.getByLabel(/이메일/);
    await expect(emailInput).toHaveAttribute("required", "");
  });

  test("should redirect unauthenticated users from dashboard", async ({ page }) => {
    await page.goto("/dashboard");

    // Should redirect to login
    await expect(page).toHaveURL(/login/);
  });

  test("should redirect unauthenticated users from deals", async ({ page }) => {
    await page.goto("/deals");

    await expect(page).toHaveURL(/login/);
  });

  test("should redirect unauthenticated users from brands", async ({ page }) => {
    await page.goto("/brands");

    await expect(page).toHaveURL(/login/);
  });
});
