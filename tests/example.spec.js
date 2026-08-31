const { test, expect } = require("@playwright/test");

const baseURL = "http://localhost:8000";

test.describe("Skillr smoke tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto(baseURL + "/");
    await expect(page).toHaveTitle(/SkillrHub|Skillr/i);
    await expect(page.locator("body")).toContainText(/Dashboard|Foundation|Year/i);
  });

  test("dashboard loads", async ({ page }) => {
    await page.goto(baseURL + "/dashboard/");
    await expect(page.locator("body")).toContainText(/Dashboard/i);
    await expect(page.locator("body")).toContainText(/Progress|learning|backup|Save My Progress/i);
  });

  test("Year 7 test page loads", async ({ page }) => {
    await page.goto(baseURL + "/quiz/year-7/math/ac9m7a02/test/");
    await expect(page.locator("#startButton")).toBeVisible();
    await expect(page.locator("#questionCount")).toBeVisible();
  });

  test("Year 7 practice page loads", async ({ page }) => {
    await page.goto(baseURL + "/quiz/year-7/math/ac9m7a02/practice/");
    await expect(page.locator("#startButton")).toBeVisible();
    await expect(page.locator("#questionCount")).toBeVisible();
  });

  test("daily drill page loads", async ({ page }) => {
    await page.goto(baseURL + "/quiz/year-7/daily-drills/");
    await expect(page.locator("body")).toContainText(/Daily|Drill|Start/i);
  });
});