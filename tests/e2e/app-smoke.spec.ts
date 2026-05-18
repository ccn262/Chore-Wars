import { expect, test } from "@playwright/test";

test.describe("public routes", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Chore Wars" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  });

  test("sign-in page loads", async ({ page }) => {
    await page.goto("/auth/sign-in");

    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create an account" })).toBeVisible();
  });

  test("sign-up page loads", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await expect(page.getByRole("heading", { name: "Create account" })).toBeVisible();
    await expect(page.getByRole("link", { name: "I already have an account" })).toBeVisible();
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");

    await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
    await expect(page.getByText("We do not sell personal data.")).toBeVisible();
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");

    await expect(page.getByRole("heading", { name: "Terms of use" })).toBeVisible();
    await expect(
      page.getByText("Final legal review is still required before submission or wider release."),
    ).toBeVisible();
  });

  test("support page loads", async ({ page }) => {
    await page.goto("/support");

    await expect(page.getByRole("heading", { name: "Support" })).toBeVisible();
    await expect(
      page.getByText("A simple placeholder support page for production-readiness testing."),
    ).toBeVisible();
  });

  test("account deletion page loads", async ({ page }) => {
    await page.goto("/account-deletion");

    await expect(page.getByRole("heading", { name: "Account deletion" })).toBeVisible();
    await expect(page.getByText("Self-service deletion is planned for later.")).toBeVisible();
  });
});

test.describe("protected routes", () => {
  for (const path of ["/home", "/settings", "/chores", "/leaderboard"] as const) {
    test(`${path} redirects unauthenticated users to sign in`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(/\/auth\/sign-in(?:\?|$)/);
      await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    });
  }
});

test.describe("invite routes", () => {
  test("/invite/undefined shows a friendly invalid invite state", async ({ page }) => {
    await page.goto("/invite/undefined");

    await expect(page.getByText(/This invite is not available/i)).toBeVisible();
    await expect(page.getByText(/Ask the household owner for a fresh invite/i)).toBeVisible();
  });

  test("invalid invite tokens stay on the invite page without crashing", async ({ page }) => {
    await page.goto("/invite/not-a-real-token");

    await expect(page.getByRole("heading", { name: "Join household" })).toBeVisible();
    await expect(page.getByText(/Sign in first/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create account" })).toBeVisible();
  });
});
