const { test, expect } = require("@playwright/test");

test("homepage search finds a topic and its published activities", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SkillrHub/i);
  await page.getByRole("searchbox", { name: "Search by topic or code" }).fill("AC9M1N01");
  await expect(page.getByRole("link", { name: "Numbers to 120 · free topic guide" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Free practice", exact: true }))
    .toHaveAttribute("href", "https://app.skillrhub.com/?try=1&skill=AC9M1N01");
  await expect(page.getByRole("link", { name: "Assessment", exact: true }))
    .toHaveAttribute("href", "https://app.skillrhub.com/?assessment=AC9M1N01");
});

test("topic content and its practice link work without JavaScript", async ({ browser, baseURL }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, baseURL });
  try {
    await page.goto("/foundation/maths/ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Numbers to 20/i);
    await expect(page.getByRole("link", { name: "Practice on app ↗", exact: true }))
      .toHaveAttribute("href", "https://app.skillrhub.com/?try=1&skill=AC9MFN01");
  } finally {
    await page.close();
  }
});

for (const [activity, query] of [
  ["practice", "login=1&skill=AC9M7A02"],
  ["test", "assessment=AC9M7A02"],
]) {
  test(`legacy Year 7 ${activity} preserves its app destination`, async ({ page }) => {
    const destination = `https://app.skillrhub.com/?${query}`;
    await page.route("https://app.skillrhub.com/**", route => route.fulfill({ body: "App handoff" }));
    await page.goto(`/quiz/year-7/math/ac9m7a02/${activity}/`);
    await expect(page).toHaveURL(destination);
  });
}
