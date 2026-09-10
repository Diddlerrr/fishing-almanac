/* The launch sequence: GPS first, then the nearest named water. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { makeServer } = require('./serve');
const { STUB } = require('./stub');
const { TMP, SHOT } = require('./fixtures');

const PORT = 8103;
const server = makeServer();

const FULL = STUB;
// A first-run device: nothing saved at all.
const COLD = FULL.replace(/localStorage\.setItem\('fishingAlmanac:lastReport'[\s\S]*?\);\n/, '');
const results = []; const check = (n, ok, extra) => results.push({ name: n, ok, extra });

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const errors = [];
  const open = async (stub, extra) => {
    const ctx = await browser.newContext({ viewport: { width: 420, height: 900 }, timezoneId: 'America/Detroit', ...(extra || {}) });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    await page.addInitScript(stub);
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    return { ctx, page };
  };

  // ---- 1. First run: GPS then the nearest water, no example chips.
  {
    const { ctx, page } = await open(COLD);
    await page.waitForTimeout(2200);
    const name = await page.$('.fa-dash-name');
    check('the water at your feet wins over a nearer centroid', !!name && (await name.textContent()) === 'Flint River', name ? await name.textContent() : 'none');
    const view = await page.textContent('#fa-view');
    check('it says which water, and does not fake a distance', /Nearest water to you: Flint River \(river, right where you are\)/.test(view), (view.match(/Nearest water to you:[^]{0,70}/) || [''])[0]);
    check('no example-water chips on the home screen', (await page.$$('.fa-chip')).length === 0, String((await page.$$('.fa-chip')).length));
    check('nothing on home reads like a search history', !/Mott Lake|Lake Callis|Lake Erie/.test(view), 'clean');
    await page.click('[data-action="clear-report"]');
    await page.waitForTimeout(400);
    const q = await page.$('#fa-query-input');
    check('"Different water" gets you back to a search box', !!q && (await page.textContent('#fa-view')).includes('Or name the water'), q ? 'present' : 'missing');
    await ctx.close();
  }

  // ---- 2. The nearby list: deduped, sorted, typed.
  {
    const { ctx, page } = await open(COLD);
    await page.waitForTimeout(2200);
    const rows = await page.$$eval('.fa-panel .fa-list-row .fa-list-main', ns => ns.map(n => n.textContent.trim()));
    const subs = await page.$$eval('.fa-panel .fa-list-row .fa-list-sub', ns => ns.map(n => n.textContent.trim()));
    check('nearest first, one row per named water', rows[0] === '◎ Flint River' && rows.filter(r => /Kelly Lake/.test(r)).length === 1, rows.join(' | '));
    check('unnamed water is dropped', rows.length === 3, rows.join(' | '));
    check('the row you are standing on says so', /^River · right where you are/.test(subs[0]), subs.join(' | '));
    check('farther rows give kind and an approximate distance', subs.slice(1).every(x => /^(Lake|River|Reservoir) · about [\d.]+ (mi|ft|km|m) away/.test(x)), subs.join(' | '));

    check('the reservoir is named as one', subs.some(x => /^Reservoir · /.test(x)), subs.join(' | '));

    // switching to the river flips the app into river mode
    const mode0 = await page.evaluate(() => localStorage.getItem('fishingAlmanac:waterType'));
    check('river mode is set from the OSM tags', mode0 === '"river"', String(mode0));
    const idx = rows.findIndex(r => /Kelly Lake/.test(r));
    await page.click(`[data-action="open-nearby"][data-idx="${idx}"]`);
    await page.waitForTimeout(900);
    check('switching to the lake switches the mode back', (await page.textContent('.fa-dash-name')) === 'Kelly Lake' &&
      (await page.evaluate(() => localStorage.getItem('fishingAlmanac:waterType'))) === '"lake"', await page.textContent('.fa-dash-name'));
    await ctx.close();
  }

  // ---- 3. A saved water is not yanked away on launch.
  {
    const { ctx, page } = await open(FULL.replace(/lat: 42\.9781, lon: -83\.6122/, 'lat: 44.5000, lon: -84.0000'));
    await page.waitForTimeout(2200);
    check('the water you had open stays open', (await page.textContent('.fa-dash-name')) === 'Kelly Lake', await page.textContent('.fa-dash-name'));
    const view = await page.textContent('#fa-view');
    check('but nearby water is offered underneath', /Water near you/.test(view), 'offered');
    await ctx.close();
  }

  // ---- 4. Overpass down: falls back to the on-device plan, says so.
  {
    const { ctx, page } = await open(COLD.replace('window.__faOverpassFail = false;', 'window.__faOverpassFail = true;'));
    await page.waitForTimeout(2500);
    const view = await page.textContent('#fa-view');
    check('map service down: still gives a usable plan', /My location/.test(view), (view.match(/My location/) || [''])[0]);
    check('map service down: says what happened', /Couldn’t reach the map service/.test(view), (view.match(/Couldn’t reach[^]{0,60}/) || [''])[0]);
    check('map service down: on-device times still promised', /computed on this device and are exact/.test(view), 'stated');
    await ctx.close();
  }

  // ---- 5. GPS denied: no crash, clear message, search still available.
  {
    const denied = COLD.replace(
      /navigator\.geolocation\.watchPosition = function \(ok\) \{[\s\S]*?\n  \};/,
      'navigator.geolocation.watchPosition = function (ok, fail) { setTimeout(function () { fail({ code: 1, message: "denied" }); }, 20); return 1; };'
    );
    const { ctx, page } = await open(denied);
    await page.waitForTimeout(1500);
    const view = await page.textContent('#fa-view');
    check('GPS denied: explains and offers the search box', /location permission|Location permission|denied|blocked/i.test(view) && await page.$('#fa-query-input') !== null,
      (view.match(/[^.]*permission[^.]*\./i) || [''])[0].slice(0, 90));
    await ctx.close();
  }

  // ---- 6. The privacy trade is stated, not buried.
  {
    const { ctx, page } = await open(COLD);
    await page.waitForTimeout(2200);
    const view = await page.textContent('#fa-view');
    check('says plainly that naming the water sends a position out', /naming the water near you is the one step that sends an approximate position out/.test(view), 'stated');
    await ctx.close();
  }

  await browser.close(); server.close();
  let fails = 0;
  results.forEach(r => { if (!r.ok) fails++; console.log((r.ok ? '  ok  ' : 'FAIL  ') + r.name + (r.extra ? '   [' + r.extra + ']' : '')); });
  if (errors.length) { console.log('\nJS errors:'); [...new Set(errors)].forEach(e => console.log('  ' + e)); }
  console.log('\n' + (results.length - fails) + '/' + results.length + ' checks passed, ' + new Set(errors).size + ' js errors');
  process.exit(fails || errors.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
