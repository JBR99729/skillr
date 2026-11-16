const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'artifacts/medium-seo');
fs.mkdirSync(output, {recursive: true});
const server = spawn('python3', ['-m', 'http.server', '8770', '--bind', '127.0.0.1'], {cwd: root, stdio: 'ignore'});
(async () => {
  let browser;
  try {
    for (let i = 0; i < 50; i++) {try {if ((await fetch('http://127.0.0.1:8770/')).ok) break;} catch {} await new Promise(r => setTimeout(r, 100));}
    browser = await chromium.launch({headless: true});
    const routes = ['/', '/homeschooling-australia/', '/year1/maths/ac9m1n01-numbers-to-120/'];
    for (const width of [390, 1440]) {
      const page = await browser.newPage({viewport: {width, height: 1000}, javaScriptEnabled: false});
      for (const route of routes) {
        const response = await page.goto('http://127.0.0.1:8770' + route, {waitUntil: 'domcontentloaded'});
        if (response.status() !== 200) throw Error('HTTP failure ' + route);
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Overflow ' + width + route);
        if (route.includes('/maths/')) {
          await page.locator('.resource-review summary').click();
          if (!(await page.locator('.resource-review').innerText()).includes('question-bank review recorded')) throw Error('Review record missing');
        }
        if (route.includes('homeschooling')) {
          await page.locator('#learning-planner').scrollIntoViewIfNeeded();
          await page.screenshot({path: path.join(output, 'planner-' + width + '.png'), fullPage: true});
        }
        console.log(JSON.stringify({route, width, passed: true}));
      }
      await page.close();
    }
    // Read a public text endpoint only: no learner session or answer event.
    const publicCheck = await browser.newPage();
    try {
      const response = await publicCheck.goto('https://app.skillrhub.com/robots.txt', {waitUntil: 'domcontentloaded', timeout: 30000});
      fs.writeFileSync(path.join(output, 'app-crawl-diagnostic.json'), JSON.stringify({url: response.url(), httpStatus: response.status(), body: (await publicCheck.locator('body').innerText()).slice(0, 2500), limitation: 'Ordinary Chrome request; not a verified Googlebot or Search Console URL Inspection result.'}, null, 2));
    } catch (error) {
      fs.writeFileSync(path.join(output, 'app-crawl-diagnostic.json'), JSON.stringify({error: String(error), verified: false}, null, 2));
    }
    await publicCheck.close();
  } finally {if (browser) await browser.close(); server.kill();}
})().catch(error => {console.error(error); process.exitCode = 1;});
