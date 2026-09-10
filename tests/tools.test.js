/* Water temperature, the week ahead, personal patterns, GPX, backup, sharing. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { makeServer } = require('./serve');
const { STUB } = require('./stub');
const { TMP, SHOT } = require('./fixtures');

const PORT = 8104;
const server = makeServer();

const FULL = STUB;
const results = []; const check = (n, ok, extra) => results.push({ name: n, ok, extra });

// A log with enough catches to have patterns in it.
const WITH_LOG = FULL.replace("  } catch (e) {}\n})();", `
    var lures = ['White spinnerbait', 'White spinnerbait', 'White spinnerbait', 'Ned rig', 'Jig'];
    var trends = ['falling', 'falling', 'falling', 'rising', 'steady'];
    var hrs = [6, 7, 19, 13, 6];
    var log = [];
    for (var ci = 0; ci < 5; ci++) {
      var when = new Date(); when.setDate(when.getDate() - ci); when.setHours(hrs[ci], 0, 0, 0);
      log.push({ id: 'c' + ci, species: ci === 4 ? 'Pike' : 'Walleye', weight: 3 + ci, length: null,
        lure: lures[ci], depth: null, isPrivate: true, moon: 'Waxing Gibbous',
        pressureTrend: trends[ci], tempC: 14, windKmh: 12, sky: 'Overcast', photo: null,
        anglerName: 'Angler', waterBody: 'Kelly Lake', date: when.toISOString() });
    }
    localStorage.setItem('fishingAlmanac:catches', JSON.stringify(log));
  } catch (e) {}
})();`);

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const errors = [];
  const open = async (stub) => {
    const ctx = await browser.newContext({
      viewport: { width: 420, height: 900 }, timezoneId: 'America/Detroit',
      acceptDownloads: true, permissions: ['clipboard-read', 'clipboard-write']
    });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    await page.addInitScript(stub);
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    return { ctx, page };
  };

  // ---- 1. Water temperature: estimated, then overridden.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.waitForTimeout(700);
    const cells = await page.$$eval('.fa-dash-cell', ns => ns.map(n => n.textContent.replace(/\s+/g, ' ').trim()));
    const water = cells.find(c => /water/.test(c));
    check('water temperature is estimated and labelled as such', !!water && /estimated/.test(water), water || 'missing');

    await page.click('[data-view="today"]');
    await page.waitForTimeout(600);
    check('the report offers a real reading', await page.$('[data-action="open-water-temp"]') !== null);
    await page.click('[data-action="open-water-temp"]');
    await page.waitForTimeout(250);
    await page.fill('#fa-watertemp-input', '47');
    await page.click('[data-action="save-water-temp"]');
    await page.waitForTimeout(600);
    const row = await page.textContent('#fa-watertemp');
    check('your reading replaces the estimate', /47°F/.test(row) && /your reading/.test(row), row.replace(/\s+/g, ' ').slice(0, 80));

    await page.click('[data-action="toggle-guru"]');
    await page.waitForTimeout(200);
    const calls = await page.$$eval('.fa-guru-call', ns => ns.map(n => n.textContent.replace(/\s+/g, ' ')));
    const wt = calls.find(c => /WATER TEMP/.test(c));
    check('47°F puts walleye on the spawn band', !!wt && /42 and 50°F and the water is in that band/.test(wt), (wt || '').slice(20, 130));
    const fine = await page.textContent('.fa-guru .fa-fineprint');
    check('the season is now read from water, not the calendar', /by water temperature/.test(fine), fine.slice(0, 130));

    // a saved reading survives a reload
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:waterTemps') || '{}'));
    check('the reading is kept', !!stored['Kelly Lake'] && Math.abs(stored['Kelly Lake'].c - 8.3) < 0.3, JSON.stringify(stored));
    await ctx.close();
  }

  // ---- 2. The week ahead.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-weekday', { timeout: 6000 });
    const days = await page.$$eval('.fa-weekday', ns => ns.map(n => n.textContent.replace(/\s+/g, ' ').trim()));
    check('seven days, each scored', days.length === 7 && days.every(d => /\d{2}/.test(d)), days[0]);
    const best = await page.$$eval('.fa-weekday.best', ns => ns.length);
    check('exactly one day is called the best', best === 1, String(best));
    const verdict = await page.textContent('.fa-week-verdict');
    check('it names the day in a sentence', /looks like the best day of the next seven/.test(verdict), verdict.replace(/\s+/g, ' ').slice(0, 90));
    // the mock puts a thunderstorm on day +3 and a gale on day +2; neither should win
    const scores = await page.$$eval('.fa-weekday-score', ns => ns.map(n => Number(n.textContent)));
    check('the gale day is marked down', scores[2] < Math.max.apply(null, scores), 'day+2=' + scores[2] + ' max=' + Math.max.apply(null, scores));
    check('the thunderstorm day is marked down', scores[3] < Math.max.apply(null, scores), 'day+3=' + scores[3]);
    await ctx.close();
  }

  // ---- 3. Personal patterns from the catch log.
  {
    const { ctx, page } = await open(WITH_LOG);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.click('[data-view="patterns"]');
    await page.waitForTimeout(500);
    const panel = await page.textContent('#fa-view');
    check('the log panel appears with a sample size', /What your log says · 5 catches/.test(panel), (panel.match(/What your log says[^]{0,26}/) || [''])[0]);
    check('it names the lure that actually produced', /White spinnerbait/.test(panel), 'named');
    check('it names the pressure that actually produced', /Falling[^]{0,40}most productive pressure trend/.test(panel), (panel.match(/Falling[^]{0,45}/) || [''])[0]);
    check('it flags the small sample honestly', /small sample/.test(panel), 'flagged');
    check('it reports the biggest fish with its conditions', /Your biggest so far:[^]*Pike/.test(panel), (panel.match(/Your biggest so far:[^]{0,70}/) || [''])[0]);

    // and the guru uses the same log
    await page.click('[data-view="home"]');
    await page.waitForTimeout(500);
    await page.click('[data-action="toggle-guru"]');
    await page.waitForTimeout(200);
    const tags = await page.$$eval('.fa-guru-tag', ns => ns.map(n => n.textContent));
    check('the guide cites your log too', tags.includes('YOUR LOG'), tags.join(','));
    await ctx.close();
  }

  // ---- 4. GPX export of your pins.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.click('[data-view="today"]');
    await page.waitForTimeout(400);
    await page.click('[data-mode="satellite"]');
    await page.waitForTimeout(300);
    await page.click('.fa-maptool');
    await page.evaluate(() => window.__faMapClick({ latlng: { lat: 42.9782, lng: -83.6121 } }));
    await page.waitForTimeout(120);
    await page.evaluate(() => window.__faMarkers[window.__faMarkers.length - 1].openPopup());
    await page.waitForTimeout(120);
    await page.fill('.__fa-popup .fa-pinpop-note', '8 ft gravel bar');
    await page.waitForTimeout(150);
    await page.evaluate(() => { document.querySelectorAll('.__fa-popup').forEach(n => n.remove()); });

    await page.click('[data-view="waters"]');
    await page.waitForTimeout(400);
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('[data-action="export-gpx"]')
    ]);
    const gpxPath = path.join(TMP, 'spots.gpx');
    await download.saveAs(gpxPath);
    const gpx = fs.readFileSync(gpxPath, 'utf8');
    check('GPX downloads with the right name', /\.gpx$/.test(download.suggestedFilename()), download.suggestedFilename());
    check('GPX is well-formed and holds the waypoint', /<gpx version="1\.1"/.test(gpx) && /<wpt lat="42\.978200" lon="-83\.612100">/.test(gpx), (gpx.match(/<wpt[^>]*>/) || [''])[0]);
    check('GPX carries the note and the water name', /Points — Kelly Lake/.test(gpx) && /8 ft gravel bar/.test(gpx), 'carried');
    await ctx.close();
  }

  // ---- 5. The logbook backup finally includes the pins and photos.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.click('[data-view="today"]');
    await page.waitForTimeout(400);
    await page.click('[data-mode="satellite"]');
    await page.waitForTimeout(300);
    await page.click('.fa-maptool');
    await page.evaluate(() => window.__faMapClick({ latlng: { lat: 42.9782, lng: -83.6121 } }));
    await page.waitForTimeout(120);
    await page.evaluate(() => window.__faMarkers[window.__faMarkers.length - 1].openPopup());
    await page.waitForTimeout(120);
    await page.click('.__fa-popup [data-a="photo"]');
    await page.setInputFiles('#fa-pin-photo-input', SHOT);
    await page.waitForTimeout(600);
    await page.evaluate(() => { document.querySelectorAll('.__fa-popup').forEach(n => n.remove()); });

    await page.click('[data-view="waters"]');
    await page.waitForTimeout(400);
    check('the download button is there at all (it was hidden in the PWA)', await page.$('[data-action="export-logbook"]') !== null);
    const [dl] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.click('[data-action="export-logbook"]')
    ]);
    const bookPath = path.join(TMP, 'logbook.json');
    await dl.saveAs(bookPath);
    const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    const pins = (book.mapPins || {})['Kelly Lake'] || [];
    check('the backup contains the map pins', pins.length === 1 && pins[0].lat === 42.9782, JSON.stringify(pins.map(x => x.lat)));
    check('the backup contains the pin photo', /^data:image\/jpeg/.test(pins[0] && pins[0].photo || ''), pins[0] && pins[0].photo ? 'present' : 'MISSING');
    check('the backup contains hand-set coordinates and units', 'coordOverrides' in book && 'units' in book && 'waterTemps' in book, Object.keys(book).join(','));
    const msg = await page.textContent('#fa-view');
    check('it says what was saved', /1 map pins with their photos/.test(msg), (msg.match(/Logbook saved[^]{0,80}/) || [''])[0]);

    // restore it into a clean device and check the pin comes back
    await ctx.close();
    const { ctx: ctx2, page: p2 } = await open(FULL);
    await p2.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await p2.click('[data-view="waters"]');
    await p2.waitForTimeout(400);
    await p2.setInputFiles('#fa-import-input', bookPath);
    await p2.waitForTimeout(700);
    const restored = await p2.evaluate(() => JSON.parse(localStorage.getItem('fishingAlmanac:mapPins') || '{}'));
    check('restoring brings the pins and photos back', ((restored['Kelly Lake'] || [])[0] || {}).photo != null, JSON.stringify(Object.keys(restored)));
    await ctx2.close();
  }

  // ---- 6. Sharing.
  {
    const { ctx, page } = await open(FULL);
    await page.waitForSelector('.fa-guru-call', { timeout: 5000 });
    await page.evaluate(() => { delete navigator.share; });   // desktop path: clipboard
    await page.click('[data-action="share-day"]');
    await page.waitForTimeout(600);
    const text = await page.evaluate(() => navigator.clipboard.readText());
    check('sharing the day copies a readable plan', /Kelly Lake —/.test(text) && /MAJOR /.test(text) && /Fishing Almanac/.test(text), text.split('\n').slice(0, 2).join(' / '));
    check('the shared plan carries the guide\'s top calls', text.split('\n').filter(l => l.indexOf('• ') === 0).length === 3, String(text.split('\n').filter(l => l.indexOf('• ') === 0).length));
    await ctx.close();
  }

  await browser.close(); server.close();
  let fails = 0;
  results.forEach(r => { if (!r.ok) fails++; console.log((r.ok ? '  ok  ' : 'FAIL  ') + r.name + (r.extra ? '   [' + r.extra + ']' : '')); });
  if (errors.length) { console.log('\nJS errors:'); [...new Set(errors)].forEach(e => console.log('  ' + e)); }
  console.log('\n' + (results.length - fails) + '/' + results.length + ' checks passed, ' + new Set(errors).size + ' js errors');
  process.exit(fails || errors.length ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
