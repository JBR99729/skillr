const { test, expect } = require('@playwright/test');

const base = process.env.SKILLR_TEST_URL || 'http://localhost:8000';
const results = '#site-search-list > li';

test.beforeEach(async ({ page }) => {
  // Local build only; don't send website test traffic to analytics or third parties.
  await page.route(/^https?:\/\//, route =>
    route.request().url().startsWith(base + '/') ? route.continue() : route.abort());
});

test('ranks direct fraction topics, clearly separates actions and expands remaining results by keyboard', async ({ page }) => {
  await page.goto(base + '/?q=fractions&year=4');
  const rows = page.locator(results);
  await expect(rows.first()).toContainText(/Count and locate fractions|Equivalent fractions and decimals/);
  await expect(rows.nth(1)).toContainText(/Count and locate fractions|Equivalent fractions and decimals/);
  const fractions = rows.filter({ has: page.getByRole('heading', { name: 'Equivalent fractions and decimals' }) });
  await expect(fractions.getByRole('link', { name: /^Practise online:/ })).toHaveAttribute('href', 'https://app.skillrhub.com/?try=1&skill=AC9M4N03');
  const guide = fractions.getByRole('link', { name: /^Read the guide:/ });
  await expect(guide).toHaveAttribute('href', '/year4/maths/ac9m4n03-find-equivalent-representations-of-fractions-using-related/');
  await expect(fractions.getByRole('link', { name: /^Printable (?:worksheets|bundle) \(TpT, paid\):/ })).toBeVisible();
  await expect(rows).toHaveCount(8);
  const showAll = page.getByRole('button', { name: /Show all \d+ results/ });
  const count = Number((await showAll.innerText()).match(/\d+/)[0]);
  await showAll.focus();
  await page.keyboard.press('Enter');
  await expect(rows).toHaveCount(count);
  await expect(rows.nth(8).getByRole('heading')).toBeFocused();
  await expect(page.getByRole('status')).toHaveText(count + ' matching topics.');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('searchbox')).toBeFocused();
  await expect(page.locator('#site-search-results')).toBeHidden();
});

test('browse narrows year and subject, and search handles empty filters and no results', async ({ page }) => {
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Enter a topic or choose a year or subject.');
  await page.getByLabel('Year level').selectOption('4');
  await page.getByLabel('Subject', { exact: true }).selectOption('science');
  await expect(page.locator(results).first()).toContainText('Year 4 · Science');
  const input = page.getByRole('searchbox');
  await input.fill('unfindabletopicxyz');
  await expect(page.getByRole('status')).toHaveText('No matching topics. Try fewer words or a curriculum code.');
  await expect(page.getByRole('button', { name: /Show all/ })).toBeHidden();
  const browse = page.getByRole('navigation', { name: 'Browse by year and subject' });
  await browse.getByText('English', { exact: true }).click();
  await expect(browse.getByRole('link', { name: 'Year 4 English' })).toHaveAttribute('href', '/learn/?year=4&subject=english');
  await browse.getByText('Science', { exact: true }).click();
  await expect(browse.getByRole('link', { name: 'Foundation Science' })).toHaveAttribute('href', '/learn/?year=0&subject=science');
});

test('does not wait for optional paid catalogue and keeps the verified practice link on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/data/print-and-go-products.json*', async route => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(base + '/?q=AC9M4N03');
    const practice = page.getByRole('link', { name: /^Practise online:/ });
    await expect(practice).toHaveAttribute('href', 'https://app.skillrhub.com/?try=1&skill=AC9M4N03');
    await expect(page.getByRole('status')).toHaveText('1 matching topic.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  } finally {
    release();
  }
});

test('browse has native no-JS links and keeps the five-question guest sample unchanged', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(base + '/');
    await expect(page.getByRole('link', { name: 'Try 5 sample questions' })).toHaveAttribute('href', 'https://app.skillrhub.com/?try=1&skill=AC9M3M04&starter=5');
    const browse = page.getByRole('navigation', { name: 'Browse by year and subject' });
    await browse.getByText('Science', { exact: true }).click();
    await expect(browse.getByRole('link', { name: 'Year 4 Science' })).toBeVisible();
    await expect(browse.getByRole('link', { name: 'Year 4 Science' })).toHaveAttribute('href', '/learn/?year=4&subject=science');
  } finally {
    await context.close();
  }
});
