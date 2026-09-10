/* Playwright harness for the PWA. The sandbox has no external network, so
   Leaflet, the tile server and Open-Meteo are all stubbed; everything else is
   the real app. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { makeServer } = require('./serve');
const { STUB } = require('./stub');
const { TMP, SHOT } = require('./fixtures');

const PORT = 8099;
const server = makeServer();

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 420, height: 900 } });
  const errors = [];
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/favicon|net::ERR|Failed to load resource|manifest/i.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  await page.addInitScript(STUB);
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);

  const results = [];
  const check = (name, ok, extra) => { results.push({ name, ok, extra }); };

  // 1. Home is the default view and shows the water.
  const navLabels = await page.$$eval('.fa-nav button', bs => bs.map(b => b.textContent.trim()));
  check('nav has 6 items starting with Home', navLabels.length === 6 && navLabels[0] === 'Home', navLabels.join('|'));
  check('dashboard shows the water', (await page.textContent('.fa-dash-name')) === 'Kelly Lake');

  // 2. Countdown / window block.
  const winTxt = await page.textContent('#fa-dash-window');
  check('next-window block has content', winTxt.trim().length > 20, winTxt.replace(/\s+/g, ' ').slice(0, 90));

  // 3. Weather arrives and fills the conditions cells + guru.
  await page.waitForSelector('.fa-dash-cell', { timeout: 4000 });
  const cells = await page.$$eval('.fa-dash-cell', ns => ns.map(n => n.textContent.replace(/\s+/g, ' ').trim()));
  check('conditions cells populate', cells.length === 5 && /SW/.test(cells[1]) && /water/.test(cells[4]), cells.join(' / '));

  // 4. Guru.
  await page.waitForSelector('.fa-guru-call', { timeout: 4000 });
  const score = await page.textContent('.fa-guru-score strong');
  const verdict = await page.textContent('.fa-guru-verdict');
  const headline = await page.textContent('.fa-guru-headline');
  check('guru score is a number 12-97', Number(score) >= 12 && Number(score) <= 97, score + ' — ' + verdict);
  check('guru headline reads as a sentence', /\.$/.test(headline.trim()), headline);
  const shown = await page.$$eval('.fa-guru-call', ns => ns.length);
  check('guru shows 3 calls collapsed', shown === 3, String(shown));
  const toggle = await page.$('[data-action="toggle-guru"]');
  check('guru has a show-all toggle', !!toggle, toggle ? await toggle.textContent() : '');
  if (toggle) {
    await page.click('[data-action="toggle-guru"]');
    await page.waitForTimeout(120);
    const all = await page.$$eval('.fa-guru-call', ns => ns.length);
    check('expanding shows every call', all > 3, String(all));
    const tags = await page.$$eval('.fa-guru-tag', ns => ns.map(n => n.textContent));
    check('pressure + wind + timing calls present', tags.includes('PRESSURE') && tags.includes('WIND') && tags.includes('TIMING'), tags.join(','));
    const bodies = await page.$$eval('.fa-guru-body', ns => ns.map(n => n.textContent.length));
    check('every call has a real body', bodies.every(l => l > 80), Math.min(...bodies) + '..' + Math.max(...bodies));
    await page.click('[data-action="toggle-guru"]');
  }

  // 5. Report view has its own guru section.
  await page.click('[data-view="today"]');
  await page.waitForTimeout(500);
  check('report view renders the report card', await page.$('.fa-card-title') !== null);
  check('report view has the guide section', (await page.textContent('#fa-view')).includes('The guide’s call'));

  // 6. Satellite map + pins.
  await page.click('[data-mode="satellite"]');
  await page.waitForTimeout(300);
  const tools = await page.$$eval('.fa-maptool', ns => ns.map(n => n.textContent.trim()));
  check('map toolbar has the pin-me-here tool', tools.some(t => /Pin me here/.test(t)), tools.join('|'));
  await page.click('.fa-maptool'); // select the first habitat tool
  // drop two pins through the map click handler
  await page.evaluate(() => { window.__faMapClick({ latlng: { lat: 42.9782, lng: -83.6121 } }); });
  await page.waitForTimeout(80);
  await page.evaluate(() => { window.__faMapClick({ latlng: { lat: 42.9790, lng: -83.6100 } }); });
  await page.waitForTimeout(120);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
  const kelly = stored['Kelly Lake'] || [];
  check('BOTH pins persist to storage (circular-ref fix)', kelly.length === 2, JSON.stringify(kelly.map(p => p.label)));

  // 7. Pin photo.
  await page.evaluate(() => { window.__faMarkers[window.__faMarkers.length - 1].openPopup(); });
  await page.waitForTimeout(100);
  const popTxt = await page.textContent('.__fa-popup');
  const hasNote = await page.$('.__fa-popup .fa-pinpop-note') !== null;
  check('pin popup offers a photo + note + coords', /Add photo/.test(popTxt) && hasNote && /42\.97/.test(popTxt), popTxt.replace(/\s+/g, ' ').slice(0, 100));

  await page.click('.__fa-popup [data-a="photo"]');
  await page.waitForTimeout(80);
  await page.setInputFiles('#fa-pin-photo-input', SHOT);
  await page.waitForTimeout(500);
  const stored2 = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
  const withPhoto = (stored2['Kelly Lake'] || []).filter(p => p.photo);
  check('photo saved onto the pin at its coordinates', withPhoto.length === 1 && /^data:image\/jpeg/.test(withPhoto[0].photo || ''), withPhoto.length ? withPhoto[0].lat + ',' + withPhoto[0].lon : 'none');
  const hint = await page.textContent('#fa-satmap-hint');
  check('map hint confirms the pinned photo', /Photo pinned/.test(hint), hint.slice(0, 80));

  // 8. Note typing persists.
  await page.evaluate(() => { window.__faMarkers[window.__faMarkers.length - 1].openPopup(); });
  await page.waitForTimeout(100);
  await page.fill('.__fa-popup .fa-pinpop-note', '8 ft, gravel, two walleye');
  await page.waitForTimeout(150);
  const stored3 = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
  check('pin note persists', (stored3['Kelly Lake'] || []).some(p => p.note === '8 ft, gravel, two walleye'));

  // 9. Dashboard photo strip.
  await page.click('[data-view="home"]');
  await page.waitForTimeout(400);
  check('dashboard shows the pinned photo strip', await page.$('.fa-pinshot') !== null);

  // 10. Catch form's pin checkbox.
  await page.click('[data-action="dash-log-catch"]');
  await page.waitForTimeout(400);
  check('catch form offers pin-to-map', await page.$('#fa-catch-pin') !== null);

  // 11. Quick action: satellite map from the dashboard.
  await page.click('[data-view="home"]');
  await page.waitForTimeout(300);
  await page.click('[data-action="dash-open-map"]');
  await page.waitForTimeout(400);
  check('dashboard opens the satellite map', await page.$('#fa-satmap') !== null);

  // 12. River mode changes the guru's calls.
  await page.click('[data-type="river"]');
  await page.waitForTimeout(500);
  await page.click('[data-view="home"]');
  await page.waitForTimeout(500);
  const t2 = await page.$('[data-action="toggle-guru"]');
  if (t2) { await t2.click(); await page.waitForTimeout(150); }
  const riverTags = await page.$$eval('.fa-guru-tag', ns => ns.map(n => n.textContent));
  check('river mode adds a CURRENT call', riverTags.includes('CURRENT'), riverTags.join(','));
  const riverBody = await page.$$eval('.fa-guru-call', ns => ns.map(n => n.textContent).join(' '));
  check('river rain call mentions rising water', /rise and colour|river to rise/i.test(riverBody), /river/i.test(riverBody) ? 'river text present' : 'missing');

  await ctx.close();
  await browser.close();
  server.close();

  let fails = 0;
  results.forEach(r => { if (!r.ok) fails++; console.log((r.ok ? '  ok  ' : 'FAIL  ') + r.name + (r.extra ? '   [' + r.extra + ']' : '')); });
  if (errors.length) { console.log('\nJS errors:'); errors.forEach(e => console.log('  ' + e)); }
  console.log('\n' + (results.length - fails) + '/' + results.length + ' checks passed, ' + errors.length + ' js errors');
  process.exit(fails || errors.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
