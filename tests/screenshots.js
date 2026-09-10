/* Regenerates the images in docs/screenshots. Same stub as the test suites, so
   what you see is the real app with fake weather, GPS and map tiles. */
const { chromium } = require('playwright');
const path = require('path');
const { makeServer } = require('./serve');
const { STUB } = require('./stub');

const PORT = 8110;
const OUT = path.join(__dirname, '..', 'docs', 'screenshots');
const server = makeServer();

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({
    viewport: { width: 420, height: 900 }, deviceScaleFactor: 2, timezoneId: 'America/Detroit'
  });
  const page = await ctx.newPage();
  await page.addInitScript(STUB);
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.fa-guru-call', { timeout: 8000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, 'home.png'), fullPage: true });

  await page.click('[data-action="toggle-guru"]');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, 'guru.png'), fullPage: true });

  await page.click('[data-view="today"]');
  await page.waitForTimeout(700);
  const guru = await page.$('#fa-guru');
  if (guru) await guru.screenshot({ path: path.join(OUT, 'report-guru.png') });

  await page.click('[data-view="waters"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'waters.png'), fullPage: true });

  await browser.close();
  server.close();
  console.log('screenshots written to docs/screenshots');
})().catch(e => { console.error(e); server.close(); process.exit(1); });
