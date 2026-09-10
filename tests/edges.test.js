/* Edge cases: no weather, a live feeding window, southern-hemisphere seasons,
   catch-pinned-to-GPS, and storage exhaustion. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { makeServer } = require('./serve');
const { STUB } = require('./stub');
const { TMP, SHOT } = require('./fixtures');

const PORT = 8101;
const server = makeServer();

const FULL = STUB;
// Same stub, but every weather request fails — the offline case.
const OFFLINE = FULL.replace("if (typeof url === 'string' && url.indexOf('open-meteo') !== -1) {",
  "if (typeof url === 'string' && url.indexOf('open-meteo') !== -1) { return Promise.reject(new Error('offline')); } if (false) {");

const results = [];
const check = (name, ok, extra) => results.push({ name, ok, extra });

function seedSouth(stub) {
  return stub
    .replace(/lat: 42\.9781, lon: -83\.6122/g, 'lat: -33.87, lon: 151.21')
    .replace(/latitude: 42\.9781, longitude: -83\.6122/g, 'latitude: -33.87, longitude: 151.21')
    .replace(/'Kelly Lake'/g, "'Lake Burragorang'")
    .replace(/'Burton, MI'/g, "'New South Wales'");
}

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const errors = [];
  const open = async (stub, tz) => {
    const ctx = await browser.newContext({ viewport: { width: 420, height: 900 }, timezoneId: tz || 'America/Detroit' });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    await page.addInitScript(stub);
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    return { ctx, page };
  };

  // ---- 1. Offline: no live weather at all.
  {
    const { ctx, page } = await open(OFFLINE);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.waitForTimeout(800);
    const cond = await page.textContent('#fa-dash-cond');
    check('offline: conditions say so plainly', /need a connection/i.test(cond), cond.trim().slice(0, 70));
    await page.click('[data-action="toggle-guru"]');
    await page.waitForTimeout(150);
    const tags = await page.$$eval('.fa-guru-tag', ns => ns.map(n => n.textContent));
    check('offline: no weather-derived calls invented', !tags.includes('PRESSURE') && !tags.includes('WIND') && !tags.includes('SKY'), tags.join(','));
    check('offline: timing + season + species still called', tags.includes('TIMING') && tags.includes('SEASON') && tags.includes('WHERE'), tags.join(','));
    const fine = await page.textContent('.fa-guru .fa-fineprint');
    check('offline: fineprint admits the gap', /Live weather is unavailable/.test(fine), fine.slice(0, 90));
    const score = Number(await page.textContent('.fa-guru-score strong'));
    check('offline: still produces a score', score >= 12 && score <= 97, String(score));
    await ctx.close();
  }

  // ---- 2. Southern hemisphere seasons flip.
  {
    const { ctx, page } = await open(seedSouth(FULL), 'Australia/Sydney');
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.waitForTimeout(600);
    const fine = await page.textContent('.fa-guru .fa-fineprint');
    // 10 September in NSW is spring, not the northern hemisphere's fall.
    check('southern hemisphere gets a spring season, not fall', /pre-spawn|spawn/i.test(fine) && !/fall/i.test(fine), fine.slice(0, 120));
    await ctx.close();
  }

  // ---- 3. A live feeding window, via a pinned clock.
  {
    const ctx = await browser.newContext({ viewport: { width: 420, height: 900 }, timezoneId: 'America/Detroit' });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    await page.addInitScript(FULL);
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.fa-window', { timeout: 5000 });
    // read the day's first major window, then re-open with the clock inside it
    // Resolved inside the page so the window's clock time is read in the page's
    // timezone, not the test runner's.
    const win = await page.evaluate(() => {
      const el = document.querySelector('.fa-window.major .fa-window-time');
      if (!el) return null;
      const startTxt = el.textContent.split('\u2013')[0].trim();
      const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(startTxt);
      if (!m) return null;
      const now = new Date();
      const hh = (Number(m[1]) % 12) + (/pm/i.test(m[3]) ? 12 : 0);
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, Number(m[2]) + 30).getTime();
    });
    await ctx.close();
    if (win) {
      const target = new Date(win);
      const ctx2 = await browser.newContext({ viewport: { width: 420, height: 900 }, timezoneId: 'America/Detroit' });
      const p2 = await ctx2.newPage();
      p2.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
      await p2.clock.setFixedTime(target);
      await p2.addInitScript(FULL);
      await p2.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
      await p2.waitForSelector('.fa-guru-call', { timeout: 5000 });
      const wtxt = await p2.textContent('#fa-dash-window');
      check('inside a window, the dashboard says "open now"', /open now/i.test(wtxt) && /left/.test(wtxt), wtxt.replace(/\s+/g, ' ').slice(0, 90));
      const first = await p2.textContent('.fa-guru-call');
      check('inside a window, TIMING leads the calls', /You are in a (major|minor) window right now/.test(first), first.replace(/\s+/g, ' ').slice(0, 80));
      await ctx2.close();
    } else {
      check('inside a window, the dashboard says "open now"', false, 'no major window found to test');
    }
  }

  // ---- 4. Catch → pinned to GPS, photo and all.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.click('[data-action="dash-log-catch"]');
    await page.waitForSelector('#fa-catch-species', { timeout: 4000 });
    await page.fill('#fa-catch-species', 'Walleye');
    await page.fill('[data-bind="catchDraft.weight"]', '6.4');
    await page.fill('[data-bind="catchDraft.lure"]', 'Jig and minnow');
    await page.check('#fa-catch-pin');
    await page.click('[data-action="submit-catch"]');
    await page.waitForTimeout(900);
    const pins = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
    const p = (pins['Kelly Lake'] || [])[0];
    check('catch pinned at the GPS fix', !!p && p.label === '★ Walleye' && Math.abs(p.lat - 42.9781) < 0.001, p ? p.label + ' @' + p.lat + ' ±' + p.accuracy : 'none');
    check('pin carries the catch details', !!p && /6\.4 lb/.test(p.note || '') && /Jig and minnow/.test(p.note || ''), p ? p.note : '');
    const notice = await page.textContent('#fa-view');
    check('user is told where it landed', /Pinned Walleye at 42\.97/.test(notice), (notice.match(/Pinned Walleye[^]{0,60}/) || [''])[0]);
    await ctx.close();
  }

  // ---- 5. Storage full: the photo is refused, not half-written.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.click('[data-view="today"]');
    await page.waitForTimeout(400);
    await page.click('[data-mode="satellite"]');
    await page.waitForTimeout(300);
    await page.click('.fa-maptool');
    await page.evaluate(() => window.__faMapClick({ latlng: { lat: 42.9782, lng: -83.6121 } }));
    await page.waitForTimeout(150);
    // Make every future write fail, the way a full quota does.
    await page.evaluate(() => {
      const real = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) {
        if (k === 'fishingAlmanac:mapPins' && v.indexOf('data:image') !== -1) { const e = new Error('quota'); e.name = 'QuotaExceededError'; throw e; }
        return real.call(this, k, v);
      };
    });
    await page.evaluate(() => window.__faMarkers[window.__faMarkers.length - 1].openPopup());
    await page.waitForTimeout(120);
    await page.click('.__fa-popup [data-a="photo"]');
    await page.waitForTimeout(80);
    await page.setInputFiles('#fa-pin-photo-input', SHOT);
    await page.waitForTimeout(600);
    const hint = await page.textContent('#fa-satmap-hint');
    check('storage full: told plainly, nothing lost', /storage is full/i.test(hint), hint.slice(0, 90));
    const still = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
    check('storage full: the pin itself survives without the photo', (still['Kelly Lake'] || []).length === 1 && !(still['Kelly Lake'][0].photo), JSON.stringify((still['Kelly Lake'] || []).map(x => !!x.photo)));
    await ctx.close();
  }

  await browser.close(); server.close();
  let fails = 0;
  results.forEach(r => { if (!r.ok) fails++; console.log((r.ok ? '  ok  ' : 'FAIL  ') + r.name + (r.extra ? '   [' + r.extra + ']' : '')); });
  if (errors.length) { console.log('\nJS errors:'); [...new Set(errors)].forEach(e => console.log('  ' + e)); }
  console.log('\n' + (results.length - fails) + '/' + results.length + ' checks passed, ' + new Set(errors).size + ' js errors');
  process.exit(fails || errors.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
