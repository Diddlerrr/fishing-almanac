(function () {
  'use strict';

  /* ============================== DATA ============================== */

  var EXAMPLES = ["Kelly Lake, Burton MI", "Mott Lake, Flint MI", "Lake Callis, Davison MI", "Lake Erie"];

  var LOCAL_REPORTS = {
    "kelly lake": {
      waterBody: "Kelly Lake", location: "Burton, Michigan", coords: { lat: 42.9633, lon: -83.6169 },
      species: [
        { name: "Northern Pike", meta: "Ambush predator", description: "Active around weeds and roaming baitfish.", structure: "weed edges and outside turns" },
        { name: "Largemouth Bass", meta: "Cover oriented", description: "Targets shade, grass, and shallow cover.", structure: "pads, docks, and weed pockets" },
        { name: "Bluegill", meta: "Reliable action", description: "Small presentations produce steady bites.", structure: "shallow cover and drop edges" }
      ],
      lures: [
        { name: "White spinnerbait", meta: "Search bait", description: "Keep it moving above the weeds." },
        { name: "Black-blue chatterbait", meta: "Low visibility", description: "Use a steady retrieve with brief pauses." },
        { name: "Hollow-body frog", meta: "Topwater", description: "Walk it across pads and surface grass." }
      ],
      bestTimes: { peaks: [{ label: "Dawn", start: "5:30 AM", end: "8:00 AM" }, { label: "Dusk", start: "6:30 PM", end: "8:30 PM" }], seasonalNote: "Fish shade and deeper weed edges during bright midday periods." },
      techniques: [{ name: "Fan cast", description: "Cover water in slices before changing locations." }, { name: "Tick the weeds", description: "Contact grass, then snap the lure free." }, { name: "Pause beside cover", description: "Brief pauses trigger fish near ambush points." }],
      gear: [{ name: "7' medium-heavy rod", note: "Controls pike and grass fish" }, { name: "30 lb braid", note: "Add a leader around pike" }],
      hotspots: [{ name: "North weed flat", access: "Shore", tip: "Wind-blown edge holds baitfish and predators." }, { name: "Public boat launch cove", access: "Boat", tip: "Shade and dock pilings concentrate panfish." }],
      quickTips: ["Retie after every pike.", "Keep spinnerbaits above weeds.", "Work wind-blown banks first.", "Use a leader around pike."],
      regulationsNote: "Check current Michigan fishing rules and license requirements before fishing."
    },
    "mott lake": {
      waterBody: "Mott Lake", location: "Genesee County, Michigan", coords: { lat: 43.0725, lon: -83.6108 },
      species: [
        { name: "Largemouth Bass", meta: "Shallow cover", description: "Fish wood, grass, and protected shoreline pockets.", structure: "laydowns, weed edges, and coves" },
        { name: "Walleye", meta: "Low-light feeder", description: "Slow presentations work near depth changes.", structure: "points, channels, and drop-offs" },
        { name: "Northern Pike", meta: "Aggressive", description: "Moving baits shine around healthy vegetation.", structure: "weed lines and creek influence" }
      ],
      lures: [
        { name: "Paddle-tail swimbait", meta: "Versatile", description: "Swim slowly along weed edges." },
        { name: "Chartreuse spinnerbait", meta: "Stained water", description: "Use vibration near wood and grass." },
        { name: "Jig and minnow", meta: "Deeper water", description: "Work slowly along bottom transitions." }
      ],
      bestTimes: { peaks: [{ label: "Morning", start: "6:00 AM", end: "9:00 AM" }, { label: "Evening", start: "5:30 PM", end: "8:30 PM" }], seasonalNote: "Wind and current can concentrate bait near points and narrows." },
      techniques: [{ name: "Parallel the bank", description: "Keep your lure in productive depth longer." }, { name: "Work transitions", description: "Focus where grass, rock, and soft bottom meet." }],
      gear: [{ name: "6'10\" medium spinning rod", note: "Handles finesse and swimbaits" }],
      hotspots: [{ name: "Narrows near the channel", access: "Boat", tip: "Current funnels bait through here on wind days." }],
      quickTips: ["Start on the windward side.", "Slow down after cold fronts.", "Watch for bait near narrows."],
      regulationsNote: "Check current Michigan fishing rules and license requirements before fishing."
    },
    "lake callis": {
      waterBody: "Lake Callis", location: "Davison, Michigan", coords: { lat: 43.0330, lon: -83.5150 },
      species: [
        { name: "Largemouth Bass", meta: "Primary target", description: "Fish shade and edges around available cover.", structure: "weed edges and shoreline breaks" },
        { name: "Bluegill", meta: "Panfish", description: "Small baits work around shallow cover.", structure: "vegetation and gradual drops" }
      ],
      lures: [
        { name: "Weightless stick worm", meta: "Finesse", description: "Let it fall naturally beside cover." },
        { name: "White spinnerbait", meta: "Search bait", description: "Retrieve steadily through open lanes." },
        { name: "Small paddle-tail", meta: "Natural profile", description: "Swim slowly along the first drop." }
      ],
      bestTimes: { peaks: [{ label: "Dawn", start: "5:45 AM", end: "8:15 AM" }, { label: "Dusk", start: "6:00 PM", end: "8:15 PM" }], seasonalNote: "Use subtle presentations when the water is clear or pressured." },
      techniques: [{ name: "Cast past the target", description: "Bring the lure naturally into the strike zone." }, { name: "Count it down", description: "Repeat the depth where bites occur." }],
      gear: [{ name: "6'6\" medium spinning rod", note: "Easy shore casting" }],
      hotspots: [{ name: "Park shoreline path", access: "Shore", tip: "Easy walk-and-cast access along shaded edges." }],
      quickTips: ["Respect posted access restrictions.", "Fish early before activity increases.", "Make long casts in clear water."],
      regulationsNote: "Check current park rules and Michigan fishing regulations before fishing."
    }
  };

  function localReportFor(place) {
    var query = String(place).toLowerCase();
    var keys = Object.keys(LOCAL_REPORTS);
    for (var i = 0; i < keys.length; i++) {
      if (query.indexOf(keys[i]) !== -1) return JSON.parse(JSON.stringify(LOCAL_REPORTS[keys[i]]));
    }
    return null;
  }

  function genericReport(place) {
    return {
      waterBody: String(place).trim(), location: "Local waters",
      species: [{ name: "Local gamefish", meta: "Scout first", description: "Look for bait, cover, current, and depth changes.", structure: "weed edges, points, shade, and drop-offs" }],
      lures: [
        { name: "Paddle-tail swimbait", meta: "Search bait", description: "Cover water with a steady retrieve." },
        { name: "Soft-plastic worm", meta: "Finesse", description: "Slow down around promising cover." },
        { name: "Spinnerbait", meta: "Wind and stain", description: "Use vibration in low visibility." }
      ],
      bestTimes: { peaks: [{ label: "Dawn", start: "6:00 AM", end: "8:30 AM" }, { label: "Dusk", start: "6:00 PM", end: "8:30 PM" }], seasonalNote: "Adjust depth and speed to water temperature and activity." },
      techniques: [{ name: "Search, then slow down", description: "Cover water first; thoroughly fish productive areas." }, { name: "Match conditions", description: "Natural colors in clear water; vibration in stain." }],
      gear: [{ name: "Medium spinning combo", note: "Versatile freshwater setup" }, { name: "8-12 lb line", note: "Increase around cover or pike" }],
      hotspots: [],
      quickTips: ["Check access before leaving.", "Fish wind-blown cover first.", "Change retrieve speed before lures.", "Verify local regulations."],
      regulationsNote: "General starter plan: verify species, access, and current local regulations."
    };
  }

  var RESPONSE_SHAPE = '{\n' +
    '  "waterBody": "string, the proper name",\n' +
    '  "location": "string, state/region/country",\n' +
    '  "coords": { "lat": number, "lon": number },\n' +
    '  "species": [ { "name": "string", "meta": "short tag, 2-3 words", "description": "one short sentence", "structure": "short phrase, where to find it e.g. \'weed edges, 8-15 ft\'" } ],\n' +
    '  "lures": [ { "name": "string, specific lure or bait type", "meta": "short tag, 2-3 words", "description": "one short sentence" } ],\n' +
    '  "bestTimes": {\n' +
    '    "peaks": [ { "label": "e.g. Dawn or Dusk", "start": "5:30 AM", "end": "7:30 AM" } ],\n' +
    '    "seasonalNote": "one short sentence"\n' +
    '  },\n' +
    '  "techniques": [ { "name": "string", "description": "one short sentence" } ],\n' +
    '  "gear": [ { "name": "short gear spec, e.g. 6\'6\\" medium spinning rod", "note": "short phrase why" } ],\n' +
    '  "hotspots": [ { "name": "short place-type description on this water, e.g. \'weedy north cove\' or \'bridge pilings\'", "access": "Boat" or "Shore" or "Both", "tip": "one short sentence on why this spot fishes well" } ],\n' +
    '  "quickTips": [ "one short practical tip, under 12 words" ],\n' +
    '  "regulationsNote": "one short generic sentence reminding to check current local license/limit rules"\n' +
    '}';

  var RESPONSE_RULES = "\"coords\" must be your best estimate of the water's centre in decimal degrees (negative for west/south) — the app computes sun and moon times from it, so approximate is fine but the hemisphere and region must be right; omit \"coords\" entirely if you don't know where this water is. Limit to at most 3 species, 3 lures, 2 time peaks, 3 techniques, 2 gear items, 3 hotspots, 4 quickTips — no more. Every description/structure/note/tip must be under 16 words. Be terse; this must fit in a small token budget. Base this on your general knowledge of this water and its region — you do not have live web search right now, so do not claim to have looked anything up, and avoid citing specific current-year regulations, stocking numbers, or event dates you cannot verify. Return ONLY the raw JSON object, no markdown fences, no preamble, no trailing commentary after the closing brace.";

  function buildPrompt(place) {
    return "You are a knowledgeable, experienced fishing guide. For the body of water \"" + place + "\", respond with ONLY a raw JSON object matching exactly this shape:\n\n" + RESPONSE_SHAPE + "\n\n" + RESPONSE_RULES;
  }

  function buildRetryPrompt(place) {
    return buildPrompt(place) + "\n\nIMPORTANT: Your previous attempt was too long or malformed. Be much more brief this time — 2 species, 2 lures, 1 technique, 1 gear item, 2 hotspots, 2 quickTips, and every text field under 8 words.";
  }

  /* ============================== ASTRONOMY ============================== */

  /* Sun and moon math — all computed locally from a date and coordinates; no
     network, no service, no API key. Standard astronomical formulae (Meeus).
     Verified against an independent reference: sun events land within a few
     seconds, moon rise/set within a couple of minutes, which is far finer than
     fishing timing needs. */

  var RAD = Math.PI / 180;
  var DAY_MS = 86400000;
  var J1970 = 2440588;
  var J2000 = 2451545;

  function toJulian(date) { return date.valueOf() / DAY_MS - 0.5 + J1970; }
  function fromJulian(j) { return new Date((j + 0.5 - J1970) * DAY_MS); }
  function toDays(date) { return toJulian(date) - J2000; }

  /* Earth's rotation runs slightly behind uniform time; the ephemeris expects
     terrestrial time, so events shift by ~70 seconds without this. */
  function deltaTSeconds(d) {
    var y = 2000 + d / 365.2425;
    var t;
    if (y >= 2005 && y < 2050) { t = y - 2000; return 62.92 + t * (0.32217 + t * 0.005589); }
    if (y >= 1986 && y < 2005) { t = y - 2000; return 63.86 + t * (0.3345 + t * (-0.060374 + t * 0.0017275)); }
    if (y >= 2050) { t = (y - 1820) / 100; return -20 + 32 * t * t - 0.5628 * (2150 - y); }
    t = y - 1900; return -2.79 + t * (1.494119 + t * (-0.0598939 + t * (0.0061966 - t * 0.000197)));
  }
  function toDaysTT(d) { return d + deltaTSeconds(d) / 86400; }

  function obliquity(t) { return RAD * (23.4392911 - t * (0.0130042 + t * (0.00000016 - t * 0.000000504))); }
  function rightAscension(l, b, e) { return Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l)); }
  function declination(l, b, e) { return Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l)); }
  /* Greenwich mean sidereal time (IAU constants — the older 280.16/360.9856235
     pair drifts by half a degree, about two minutes of clock time, by the 2020s). */
  function siderealTime(d, lw) { return RAD * (280.46061837 + 360.98564736629 * d) - lw; }
  function altitudeOf(H, phi, dec) { return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)); }
  function wrapPi(a) { return a - 2 * Math.PI * Math.round(a / (2 * Math.PI)); }

  /* Refraction lifts a body near the horizon by about half a degree. */
  function astroRefraction(h) {
    if (h < 0) h = 0;
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
  }

  function sunCoords(dTT) {
    var t = dTT / 36525;
    var L0 = RAD * (280.46646 + t * (36000.76983 + t * 0.0003032));
    var M = RAD * (357.52911 + t * (35999.05029 - 0.0001537 * t));
    var C = RAD * ((1.914602 - t * (0.004817 + 0.000014 * t)) * Math.sin(M)
      + (0.019993 - 0.000101 * t) * Math.sin(2 * M)
      + 0.000289 * Math.sin(3 * M));
    var L = L0 + C;
    var e = obliquity(t);
    return { ra: rightAscension(L, 0, e), dec: declination(L, 0, e), L: L, M: M };
  }

  var J0 = 0.0009;

  /* Solar noon, refined by iteration rather than approximated. */
  function solarTransit(dt, lw) {
    for (var i = 0; i < 3; i++) {
      var H = wrapPi(siderealTime(dt, lw) - sunCoords(toDaysTT(dt)).ra);
      dt -= H / (2 * Math.PI);
    }
    return dt;
  }

  /* Rise/set for a given horizon angle, refined the same way — this is what keeps
     high-latitude and near-solstice results honest. */
  function getSetJ(h0, dt, sign, lw, phi, dec) {
    var cosH0 = (Math.sin(h0) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
    if (cosH0 < -1 || cosH0 > 1) return NaN;
    var d = dt + sign * Math.acos(cosH0) / (2 * Math.PI);
    for (var i = 0; i < 2; i++) {
      var c = sunCoords(toDaysTT(d));
      var H = wrapPi(siderealTime(d, lw) - c.ra);
      var h = altitudeOf(H, phi, c.dec);
      var sinH = Math.cos(phi) * Math.cos(c.dec) * Math.sin(H);
      if (Math.abs(sinH) < 1e-6) break;
      d += (h - h0) / (2 * Math.PI * sinH);
    }
    return d;
  }

  /* Sunrise, sunset and civil twilight. Null where the sun never reaches that
     angle (polar summer or winter). */
  function getSunTimes(date, lat, lon) {
    var lw = RAD * -lon, phi = RAD * lat;
    var dt = solarTransit(Math.round(toDays(date) - J0 - lw / (2 * Math.PI)) + J0 + lw / (2 * Math.PI), lw);
    var dec = sunCoords(toDaysTT(dt)).dec;

    function pair(angleDeg) {
      var h0 = angleDeg * RAD;
      var jrise = getSetJ(h0, dt, -1, lw, phi, dec);
      var jset = getSetJ(h0, dt, 1, lw, phi, dec);
      return {
        rise: isNaN(jrise) ? null : fromJulian(jrise + J2000),
        set: isNaN(jset) ? null : fromJulian(jset + J2000)
      };
    }

    var official = pair(-0.833);
    var civil = pair(-6);
    return {
      sunrise: official.rise, sunset: official.set,
      dawn: civil.rise, dusk: civil.set,
      solarNoon: fromJulian(dt + J2000)
    };
  }

  /* Moon position — Meeus's abbreviated series. The evection and variation terms
     matter most after the main elliptic term; without them rise times drift by
     several minutes. */
  function moonCoords(dTT) {
    var t = dTT / 36525;
    var Lp = RAD * (218.316 + 13.176396 * dTT);
    var D = RAD * (297.8502 + 445267.1115 * t);
    var M = RAD * (357.5291 + 35999.0503 * t);
    var Mp = RAD * (134.963 + 13.064993 * dTT);
    var F = RAD * (93.272 + 13.229350 * dTT);

    var l = Lp + RAD * (
      6.289 * Math.sin(Mp)
      + 1.274 * Math.sin(2 * D - Mp)   // evection
      + 0.658 * Math.sin(2 * D)        // variation
      + 0.214 * Math.sin(2 * Mp)
      - 0.186 * Math.sin(M)            // annual equation
      - 0.114 * Math.sin(2 * F)
      + 0.059 * Math.sin(2 * D - 2 * Mp)
      + 0.057 * Math.sin(2 * D - M - Mp)
      + 0.053 * Math.sin(2 * D + Mp)
    );
    var b = RAD * (
      5.128 * Math.sin(F)
      + 0.281 * Math.sin(Mp + F)
      - 0.278 * Math.sin(F - Mp)
      - 0.173 * Math.sin(F - 2 * D)
    );
    var dist = 385001 - 20905 * Math.cos(Mp) - 3699 * Math.cos(2 * D - Mp) - 2956 * Math.cos(2 * D);
    var e = obliquity(t);
    return { ra: rightAscension(l, b, e), dec: declination(l, b, e), dist: dist };
  }

  /* Moon altitude in radians, refraction included. */
  function moonAltitude(date, lat, lon) {
    var lw = RAD * -lon, phi = RAD * lat, d = toDays(date);
    var c = moonCoords(toDaysTT(d));
    var H = siderealTime(d, lw) - c.ra;
    var h = altitudeOf(H, phi, c.dec);
    return h + astroRefraction(h);
  }

  /* Illuminated fraction (0 new, 1 full) and where we are in the cycle. */
  function getMoonIllumination(date) {
    var d = toDaysTT(toDays(date));
    var s = sunCoords(d);
    var m = moonCoords(d);
    var sdist = 149598000;
    var phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
    var inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));
    var angle = Math.atan2(
      Math.cos(s.dec) * Math.sin(s.ra - m.ra),
      Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra)
    );
    return {
      fraction: (1 + Math.cos(inc)) / 2,
      phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI
    };
  }

  /* One pass over the local day gives everything a solunar table needs: moonrise,
     moonset, and the moon's overhead (transit) and underfoot points. */
  function scanMoonDay(date, lat, lon) {
    var start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    var stepMs = 5 * 60000;
    var steps = Math.round(DAY_MS / stepMs);
    var horizon = 0.133 * RAD;

    var rise = null, set = null;
    var peak = null, peakAlt = -Infinity;
    var trough = null, troughAlt = Infinity;
    var prevTime = start, prevAlt = moonAltitude(start, lat, lon);

    for (var i = 1; i <= steps; i++) {
      var t = new Date(start.getTime() + i * stepMs);
      var alt = moonAltitude(t, lat, lon);
      if (alt > peakAlt) { peakAlt = alt; peak = t; }
      if (alt < troughAlt) { troughAlt = alt; trough = t; }
      if (!rise && prevAlt <= horizon && alt > horizon) rise = refineCrossing(prevTime, t, horizon, lat, lon);
      if (!set && prevAlt > horizon && alt <= horizon) set = refineCrossing(prevTime, t, horizon, lat, lon);
      prevTime = t; prevAlt = alt;
    }

    // A peak or trough pinned to the very edge of the scan belongs to the
    // neighbouring day, not this one.
    var edgeMs = 6 * 60000;
    if (peak && (peak - start < edgeMs || start.getTime() + DAY_MS - peak < edgeMs)) peak = null;
    if (trough && (trough - start < edgeMs || start.getTime() + DAY_MS - trough < edgeMs)) trough = null;

    return { rise: rise, set: set, overhead: peak, underfoot: trough, overheadAlt: peakAlt };
  }

  /* Bisect the five-minute bracket down to the second. */
  function refineCrossing(t1, t2, target, lat, lon) {
    var lo = t1.getTime(), hi = t2.getTime();
    var loAlt = moonAltitude(new Date(lo), lat, lon) - target;
    for (var i = 0; i < 20 && hi - lo > 1000; i++) {
      var mid = (lo + hi) / 2;
      var midAlt = moonAltitude(new Date(mid), lat, lon) - target;
      if ((loAlt < 0) === (midAlt < 0)) { lo = mid; loAlt = midAlt; } else { hi = mid; }
    }
    return new Date(Math.round((lo + hi) / 2));
  }

  /* ---- Solunar periods ----------------------------------------------------
     Solunar tables are an old angling convention, not physics: feeding is taken
     to pick up when the moon is overhead or underfoot (the two "major" periods,
     about two hours each) and, less strongly, at moonrise and moonset (the
     "minor" periods, about an hour). We compute the astronomy exactly and label
     the fishing inference for what it is. */

  function windowAround(center, minutes) {
    if (!center) return null;
    var half = minutes * 30000; // minutes/2, in ms
    return { start: new Date(center.getTime() - half), end: new Date(center.getTime() + half), center: center };
  }

  function getSolunar(date, lat, lon) {
    var sun = getSunTimes(date, lat, lon);
    var moon = scanMoonDay(date, lat, lon);
    var illum = getMoonIllumination(date);

    var majors = [];
    var overhead = windowAround(moon.overhead, 120);
    var underfoot = windowAround(moon.underfoot, 120);
    if (overhead) majors.push(Object.assign({ label: 'Moon overhead' }, overhead));
    if (underfoot) majors.push(Object.assign({ label: 'Moon underfoot' }, underfoot));

    var minors = [];
    var rise = windowAround(moon.rise, 60);
    var set = windowAround(moon.set, 60);
    if (rise) minors.push(Object.assign({ label: 'Moonrise' }, rise));
    if (set) minors.push(Object.assign({ label: 'Moonset' }, set));

    majors.sort(function (a, b) { return a.center - b.center; });
    minors.sort(function (a, b) { return a.center - b.center; });

    return {
      sun: sun, moon: moon, illumination: illum,
      majors: majors, minors: minors,
      rating: rateDay(sun, majors, minors, illum)
    };
  }

  /* A transparent 0-4 score: the moon's pull is strongest at new and full, and a
     period that lands in low light counts for more than one at midday. */
  function rateDay(sun, majors, minors, illum) {
    var phaseStrength = Math.abs(2 * illum.fraction - 1); // 1 at new/full, 0 at the quarters
    var lowLightHits = 0;
    var windows = majors.concat(minors);
    [sun.sunrise, sun.sunset].forEach(function (edge) {
      if (!edge) return;
      windows.forEach(function (w) {
        var gapMin = Math.abs(w.center - edge) / 60000;
        if (gapMin <= 90) lowLightHits++;
      });
    });

    var score = 1 + phaseStrength * 1.6 + Math.min(lowLightHits, 2) * 0.7;
    var stars = Math.max(1, Math.min(4, Math.round(score)));
    var labels = { 1: 'Slow', 2: 'Fair', 3: 'Good', 4: 'Prime' };
    var why;
    if (phaseStrength > 0.75 && lowLightHits > 0) why = 'Strong moon phase and a feeding window near low light.';
    else if (phaseStrength > 0.75) why = 'Strong moon phase, though the windows fall away from dawn and dusk.';
    else if (lowLightHits > 0) why = 'A feeding window lines up with low light, which usually matters more than phase.';
    else why = 'Quarter moon with windows away from dawn and dusk — fish structure and cover instead of the clock.';

    return { stars: stars, label: labels[stars], why: why, phaseStrength: phaseStrength, lowLightHits: lowLightHits };
  }

  /* ============================== HELPERS ============================== */

  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function makeId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function speciesKeyFor(name) {
    return (name || '').trim().toLowerCase();
  }

  /* Units. Catches, records and depths are STORED canonically in imperial
     (pounds, inches, feet) so a lake's leaderboard compares like with like no
     matter which unit each angler enters in; these helpers convert only for
     display and input. Metric is what makes the app feel native outside the US. */
  function isMetric() { return state.units === 'metric'; }
  function weightUnit() { return isMetric() ? 'kg' : 'lb'; }
  function lengthUnit() { return isMetric() ? 'cm' : 'in'; }
  function depthUnit() { return isMetric() ? 'm' : 'ft'; }

  function round1(n) { return Math.round(n * 10) / 10; }
  function trimTo(n, dec) { return parseFloat(n.toFixed(dec)); } // drops trailing zeros
  // canonical (imperial) -> clean display number in the current system
  function dispWeight(lb) { return lb == null ? null : trimTo(isMetric() ? lb * 0.453592 : lb, 2); }
  function dispLength(inch) { return inch == null ? null : trimTo(isMetric() ? inch * 2.54 : inch, 1); }
  function dispDepth(ft) { return ft == null ? null : trimTo(isMetric() ? ft * 0.3048 : ft, 1); }
  // entered number in the current system -> canonical (imperial) for storage
  function toCanonWeight(n) { return isMetric() ? n / 0.453592 : n; }
  function toCanonLength(n) { return isMetric() ? n / 2.54 : n; }
  function toCanonDepth(n) { return isMetric() ? n / 0.3048 : n; }

  function fmtWeight(lb) { return lb == null ? '' : dispWeight(lb) + ' ' + weightUnit(); }
  function fmtLength(inch) { return inch == null ? '' : dispLength(inch) + ' ' + lengthUnit(); }
  function fmtDepth(ft) { return ft == null ? '' : dispDepth(ft) + ' ' + depthUnit(); }

  function parseTimeToPct(str) {
    var m = String(str).match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
    if (!m) return null;
    var h = parseInt(m[1], 10);
    var min = m[2] ? parseInt(m[2], 10) : 0;
    var ap = m[3] ? m[3].toUpperCase() : null;
    if (ap === 'PM' && h !== 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    return ((h + min / 60) / 24) * 100;
  }

  /* Phase name and illumination, from the same computed astronomy the day
     planner uses, so every screen agrees. */
  function getMoonPhase(date) {
    var illum = getMoonIllumination(date);
    var phase = describeMoonPhase(illum);
    return {
      name: phase.name, icon: phase.icon, note: phase.note,
      illumination: Math.round(illum.fraction * 100)
    };
  }

  function resizeImageFile(file, maxDim, quality) {
    maxDim = maxDim || 480; quality = quality || 0.7;
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error("Couldn't read that photo.")); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error("Couldn't read that photo.")); };
        img.onload = function () {
          var width = img.width, height = img.height;
          if (width > height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
          else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
          var canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function isHeic(file) {
    return /heic|heif/i.test(file.type || '') || /\.hei[cf]$/i.test(file.name || '');
  }

  /* ============================== STORAGE ============================== */

  var LS_PREFIX = 'fishingAlmanac:';
  function lsGet(key, fallback) {
    try {
      var raw = window.localStorage.getItem(LS_PREFIX + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try {
      window.localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false; // quota full, or storage blocked in this browser
    }
  }

  var db = null;
  var sampleFn = null;
  var downloadsFn = null;
  // Real-map module state (populated imperatively so Leaflet survives re-renders).
  var leafletMap = null;
  var mapCurrentTool = null;
  var capabilitiesReady = Promise.resolve();
  var searchController = null;
  var loadingTimer = null;

  /* ============================== STATE ============================== */

  var savedLast = lsGet('lastReport', null);

  var state = {
    view: 'home',
    query: savedLast && savedLast.query ? savedLast.query : '',
    loading: false,
    locating: false,
    gpsAccuracy: null,
    searchStartedAt: 0,
    error: null,
    notice: null,
    data: savedLast && savedLast.data ? savedLast.data : null,
    moonPhase: null,

    favorites: lsGet('favorites', []),

    profile: lsGet('profile', { name: 'Angler', avatar: null }),
    showProfileEditor: false,
    profileDraft: null,
    profileError: null,

    units: lsGet('units', 'imperial'),
    waterType: lsGet('waterType', 'lake'),
    waterSpecies: lsGet('waterSpecies', null),
    mapMode: 'guide',
    mapPins: lsGet('mapPins', {}),
    coordOverrides: lsGet('coordOverrides', {}),
    showCoordEditor: false,
    coordDraft: { lat: '', lon: '' },
    coordError: null,
    expandedTripId: null,
    guruExpanded: false,
    nearbyWaters: [],
    nearbyStatus: 'idle',
    nearbyError: null,
    nearbyFrom: null,
    waterTemps: lsGet('waterTemps', {}),
    showWaterTemp: false,
    waterTempDraft: '',
    waterTempError: null,
    backupMessage: null,
    backupError: null,
    showTrophyRoom: false,
    myCatches: lsGet('catches', []),
    leaderboard: lsGet('leaderboard', {}),

    gear: lsGet('gear', []),
    gearDraft: { name: '', type: 'Lure', detail: '' },

    trips: lsGet('trips', []),
    activeTrip: lsGet('activeTrip', null),
    tripTick: Date.now(),
    showTripCatch: false,
    tripCatchDraft: { species: '', weight: '' },
    tripNote: '',
    endSummary: null,

    privateSpots: lsGet('spots', []),
    spotDraft: { name: '', access: 'Shore', depth: '', bottom: 'Unknown', vegetation: '', snag: 'Low', direction: '' },

    showCatchForm: false,
    catchDraft: { species: '', weight: '', length: '', lure: '', depth: '', isPrivate: true, photo: null, pinToMap: false },
    catchSubmitting: false,
    catchError: null,
    catchSuccess: null
  };

  /* ============================== DERIVED ============================== */

  var solunarCache = { key: null, value: null };

  /* Coordinates come from the report — the guide's estimate, or ours for the
     built-in waters. Anything malformed is treated as absent. */
  function validCoords(c) {
    if (!c || typeof c !== 'object') return null;
    var lat = Number(c.lat), lon = Number(c.lon);
    if (!isFinite(lat) || !isFinite(lon)) return null;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    if (lat === 0 && lon === 0) return null; // null island is a placeholder, not a lake
    return { lat: lat, lon: lon };
  }

  /* A location you set by hand always wins over the report's estimate, so the
     sun and moon times can be made exact for the spot you actually fish. */
  function coordsFor(report) {
    if (!report) return null;
    var override = state.coordOverrides[report.waterBody];
    return validCoords(override) || validCoords(report.coords);
  }

  function coordsAreManual(report) {
    return !!(report && validCoords(state.coordOverrides[report.waterBody]));
  }

  function saveCoordOverride(waterBody, lat, lon) {
    var c = validCoords({ lat: lat, lon: lon });
    if (!c) return false;
    state.coordOverrides[waterBody] = c;
    lsSet('coordOverrides', state.coordOverrides);
    solunarCache = { key: null, value: null };
    return true;
  }

  function clearCoordOverride(waterBody) {
    delete state.coordOverrides[waterBody];
    lsSet('coordOverrides', state.coordOverrides);
    solunarCache = { key: null, value: null };
  }

  /* The day's sun, moon and solunar windows for the current report, cached per
     water per day — the moon scan runs a few hundred position calculations. */
  function solunarForReport() {
    var c = coordsFor(state.data);
    if (!c) return null;
    var now = new Date();
    var key = c.lat.toFixed(3) + ',' + c.lon.toFixed(3) + '@' + now.toDateString();
    if (solunarCache.key === key) return solunarCache.value;
    var value = null;
    try {
      value = getSolunar(now, c.lat, c.lon);
      value.coords = c;
    } catch (e) {
      value = null;
    }
    solunarCache = { key: key, value: value };
    return value;
  }

  function isFavorited() {
    return !!(state.data && state.favorites.some(function (f) { return f.waterBody === state.data.waterBody; }));
  }
  function isNotFound() {
    var d = state.data;
    return !!(d && (!d.species || d.species.length === 0) && (!d.lures || d.lures.length === 0) && (!d.techniques || d.techniques.length === 0));
  }
  function ownedLures() { return state.gear.filter(function (g) { return g.type === 'Lure'; }); }
  function tiedOnLure() {
    var found = state.gear.find(function (g) { return g.tiedOn; });
    return found ? found.name : null;
  }
  function catchesHere() {
    if (!state.data) return [];
    return state.myCatches.filter(function (c) { return c.waterBody === state.data.waterBody; });
  }
  function recommendation() {
    var lures = ownedLures();
    var suggested = state.gear.find(function (g) { return g.tiedOn; }) ||
      lures.find(function (g) { return /spinner|chatter/i.test(g.name); }) || lures[0];
    if (!suggested) return null;
    var name = suggested.name;
    var retrieve = /frog/i.test(name) ? "Walk it slowly; pause in openings" : /worm|jig/i.test(name) ? "Slow hops with five-second pauses" : "Medium retrieve just above cover";
    var here = catchesHere();
    var confidence = here.some(function (c) { return c.lure && c.lure.toLowerCase() === name.toLowerCase(); }) ? "High" : state.data ? "Medium" : "Experimental";
    return { lure: name, target: "Shade, cover, and the first depth break", retrieve: retrieve, confidence: confidence };
  }
  function tripElapsedSec() {
    if (!state.activeTrip) return 0;
    var t = state.activeTrip;
    var end = t.pausedAt || state.tripTick;
    return Math.max(0, Math.floor((end - t.startedAt - (t.pausedMs || 0)) / 1000));
  }
  function totalTripCatches() { return state.trips.reduce(function (sum, t) { return sum + (t.catches || 0); }, 0); }
  function productiveTrips() { return state.trips.filter(function (t) { return (t.catches || 0) > 0; }).length; }
  function catchTripRate() { return state.trips.length ? Math.round((productiveTrips() / state.trips.length) * 100) : 0; }
  function lurePerformance() {
    var events = [];
    state.trips.forEach(function (t) { (t.events || []).forEach(function (e) { if (e.type === 'catch' || e.type === 'miss') events.push(e); }); });
    var byLure = {};
    events.forEach(function (e) {
      var lure = e.lure || 'Unknown lure';
      if (!byLure[lure]) byLure[lure] = { lure: lure, catches: 0, misses: 0 };
      if (e.type === 'catch') byLure[lure].catches += 1; else byLure[lure].misses += 1;
    });
    return Object.keys(byLure).map(function (k) {
      var row = byLure[k];
      var attempts = row.catches + row.misses;
      row.attempts = attempts;
      row.conversion = attempts ? Math.round((row.catches / attempts) * 100) : 0;
      return row;
    }).sort(function (a, b) { return b.conversion - a.conversion || b.attempts - a.attempts; });
  }

  /* ============================== ACTIONS ============================== */

  // Sampling can think for up to a minute before the first words arrive, so the
  // spinner counts up rather than sitting silent.
  function startLoadingTicker() {
    stopLoadingTicker();
    loadingTimer = setInterval(function () {
      var el = document.getElementById('fa-loading-elapsed');
      if (!el || !state.searchStartedAt) return;
      var secs = Math.round((Date.now() - state.searchStartedAt) / 1000);
      el.textContent = secs < 5 ? '' : secs + 's — a full report usually takes 10–40 seconds';
    }, 1000);
  }
  function stopLoadingTicker() {
    if (loadingTimer) { clearInterval(loadingTimer); loadingTimer = null; }
  }

  function noticeForSampleError(e) {
    var code = e && e.code;
    if (code === 'not_granted') return "AI report generation isn't enabled for this view — showing a general starter plan instead.";
    if (code === 'rate_limited') return "Too many requests right now — showing a general starter plan. Try again shortly for an AI-written one.";
    if (code === 'sampling_disabled' || code === 'not_declared' || code === 'capability_disabled' || code === 'capability_removed') return "AI-generated reports aren't available right now — showing a general starter plan.";
    if (code === 'session_expired') return "You'll need to sign in again for an AI-written report — showing a general starter plan for now.";
    return "Couldn't reach the AI guide just now — showing a general starter plan. Verify species, access, and regulations locally.";
  }

  function fetchReport(place, signal) {
    return sampleFn.json(buildPrompt(place), { modelTier: 'default', cache: true, signal: signal }).catch(function (e) {
      if (e && e.code === 'invalid_json') {
        return sampleFn.json(buildRetryPrompt(place), { modelTier: 'default', cache: false, signal: signal });
      }
      throw e;
    });
  }

  // A report needs at least a name and one useful list to be worth showing.
  function looksLikeReport(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    var hasContent = ['species', 'lures', 'techniques', 'quickTips'].some(function (key) {
      return Array.isArray(value[key]) && value[key].length > 0;
    });
    return typeof value.waterBody === 'string' && value.waterBody.trim() !== '' && hasContent;
  }

  function cancelSearch() {
    if (searchController) searchController.abort();
  }

  /* GPS. navigator.geolocation may be missing, blocked by the embedding frame,
     denied by the viewer, or simply slow — every branch resolves to a clear
     on-screen message rather than a silent hang. Nothing leaves the device:
     the fix reads coordinates and computes locally. */
  /* The accuracy fix. A phone's first fix is usually a coarse cell/wifi estimate
     (hundreds of metres); the GPS chip then tightens it to a few metres over a
     few seconds. So instead of taking whatever getCurrentPosition returns first,
     we watch, keep the tightest fix seen, stop early once it's good enough, and
     always force a fresh reading (maximumAge: 0). */
  function watchBestFix(onFix, onFail) {
    var best = null;      // {lat, lon, accuracy}
    var settled = false;
    var watchId = null;
    var overallTimer = null;
    var stableTimer = null;
    var GOOD_ENOUGH_M = 20;   // stop as soon as we're this tight
    var STABLE_MS = 3500;     // ...or once accuracy stops improving for this long
    var HARD_MS = 13000;      // absolute ceiling, in case no fix ever arrives

    function cleanup() {
      if (watchId != null && navigator.geolocation.clearWatch) navigator.geolocation.clearWatch(watchId);
      clearTimeout(overallTimer); clearTimeout(stableTimer);
    }
    function finish() {
      if (settled) return;
      settled = true;
      cleanup();
      if (best) onFix(best.lat, best.lon, best.accuracy);
      else onFail({ code: 3 });
    }
    function fail(err) {
      if (settled) return;
      // A permission denial is terminal; a transient error while we already hold
      // a fix shouldn't throw the good one away.
      if (best && err && err.code !== 1) { finish(); return; }
      settled = true; cleanup(); onFail(err);
    }

    try {
      watchId = navigator.geolocation.watchPosition(function (pos) {
        var a = typeof pos.coords.accuracy === 'number' ? pos.coords.accuracy : 9999;
        var improved = !best || a < best.accuracy - 1; // ignore sub-metre jitter
        if (!best || a < best.accuracy) best = { lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: a };
        if (best.accuracy <= GOOD_ENOUGH_M) { finish(); return; }
        // Reset the "stopped improving" countdown each time the fix genuinely tightens.
        if (improved || !stableTimer) { clearTimeout(stableTimer); stableTimer = setTimeout(finish, STABLE_MS); }
      }, fail, { enableHighAccuracy: true, timeout: HARD_MS, maximumAge: 0 });
    } catch (e) {
      onFail({ code: 2 });
      return;
    }
    overallTimer = setTimeout(finish, HARD_MS);
  }

  function gpsErrorMessage(err) {
    if (err && err.code === 1) return "Location permission was denied. Allow location for this page in your browser, or enter coordinates by hand with “Set location”.";
    if (err && err.code === 3) return "GPS couldn’t get a fix in time. Step into the open and try again, or enter coordinates by hand with “Set location”.";
    return "Couldn’t reach GPS here — it may be blocked in this embedded view. Open the app in its own browser tab, or enter coordinates by hand with “Set location”.";
  }

  /* A GPS fix becomes a lightweight "where you are" report, so the solunar
     planner runs for your exact spot without naming a water. */
  function applyCurrentLocation(lat, lon, accuracyM) {
    var c = validCoords({ lat: lat, lon: lon });
    if (!c) { state.error = "That GPS reading didn’t look valid. Try again."; return; }

    var report = genericReport('My location');
    report.waterBody = 'My location';
    report.location = c.lat.toFixed(4) + ', ' + c.lon.toFixed(4);
    report.coords = { lat: c.lat, lon: c.lon };
    report.isCurrentLocation = true;

    // A fresh fix always wins for the live-location report — clear any stale
    // hand-set override so coordsFor() doesn't mask it.
    if (state.coordOverrides['My location']) {
      delete state.coordOverrides['My location'];
      lsSet('coordOverrides', state.coordOverrides);
    }
    state.gpsAccuracy = (typeof accuracyM === 'number' && isFinite(accuracyM)) ? Math.round(accuracyM) : null;
    solunarCache = { key: null, value: null };
    state.data = report;
    state.query = '';
    state.showCoordEditor = false;
    state.notice = "Showing the sun, moon and feeding windows for your current position" +
      (state.gpsAccuracy != null ? " (GPS accuracy ±" + state.gpsAccuracy + " m)" : "") +
      ". Name a lake to save a full plan for it.";
    lsSet('lastReport', { data: report, query: '' });
  }

  /* Fill the coordinate editor's fields from GPS, so an angler can peg a named
     water to where they are standing on its bank. */
  function locateIntoEditor() {
    if (!('geolocation' in navigator)) {
      state.coordError = "GPS isn’t available here — type the coordinates instead.";
      render();
      return;
    }
    state.coordError = null;
    state.coordDraft = { lat: state.coordDraft.lat, lon: state.coordDraft.lon, locating: true };
    render();
    watchBestFix(function (lat, lon) {
      state.coordDraft = { lat: lat.toFixed(5), lon: lon.toFixed(5), locating: false };
      render();
    }, function (err) {
      state.coordDraft = Object.assign({}, state.coordDraft, { locating: false });
      state.coordError = err && err.code === 1 ? "Location permission was denied — enter the coordinates by hand." : "Couldn’t get a GPS fix — enter the coordinates by hand.";
      render();
    });
  }

  /* A cross-platform maps handoff: real tiles can't load inside the sandbox, so
     the honest "on a map" is the viewer's own map app, opened in a new tab. */
  function mapsUrl(c) {
    return 'https://www.google.com/maps/search/?api=1&query=' + c.lat + ',' + c.lon;
  }

  function runSearch(place) {
    var target = (place != null ? place : state.query).trim();
    if (!target) return Promise.resolve();
    if (state.loading) return Promise.resolve();

    state.loading = true; state.error = null; state.notice = null; state.data = null;
    state.searchStartedAt = Date.now();
    render();
    startLoadingTicker();

    var usedStarter = false;

    // A built-in lake is answered from local data at once — no reason to wait on
    // the capability probe (which can take up to ~10s to resolve when Claude
    // isn't available). Only a lookup that might use Claude waits for it.
    var builtIn = localReportFor(target);
    var startChain = builtIn
      ? Promise.resolve(builtIn)
      : capabilitiesReady.then(function () {
      var parsed = localReportFor(target);
      if (parsed) return parsed;
      if (!sampleFn) {
        usedStarter = true;
        state.notice = "Showing a general starter plan for " + target + ". Set its location below for exact sun, moon and solunar times, and verify local species and regulations.";
        return genericReport(target);
      }
      searchController = new AbortController();
      return fetchReport(target, searchController.signal).catch(function (e) {
        // A deliberate stop is not a failure — let it fall through untouched
        // rather than answering with a plan the angler didn't wait for.
        if (e && e.code === 'cancelled') throw e;
        usedStarter = true;
        state.notice = noticeForSampleError(e);
        return genericReport(target);
      });
    });

    return startChain.then(function (result) {
      if (!looksLikeReport(result)) {
        if (!usedStarter) {
          usedStarter = true;
          state.notice = "That answer came back incomplete — showing a general starter plan instead. Try again, or use a shorter place name.";
        }
        result = genericReport(target);
      }
      state.data = result;
      state.query = result.waterBody || target;
      if (usedStarter && !state.notice) state.notice = "Showing a dependable starter plan. Verify local species, access, and regulations before fishing.";
      lsSet('lastReport', { data: result, query: state.query });
    }).catch(function (e) {
      if (e && e.code === 'cancelled') {
        state.notice = 'Search stopped.';
      } else {
        state.error = (e && e.message) || "Something went wrong casting that request. Try again.";
      }
    }).then(function () {
      searchController = null;
      state.loading = false;
      stopLoadingTicker();
      render();
    });
  }

  function toggleFavorite() {
    if (!state.data) return;
    var exists = state.favorites.some(function (f) { return f.waterBody === state.data.waterBody; });
    state.favorites = exists
      ? state.favorites.filter(function (f) { return f.waterBody !== state.data.waterBody; })
      : state.favorites.concat([{ waterBody: state.data.waterBody, location: state.data.location, report: state.data }]);
    lsSet('favorites', state.favorites);
    render();
  }

  function loadFavorite(waterBody) {
    var fav = state.favorites.find(function (f) { return f.waterBody === waterBody; });
    if (!fav) return;
    state.error = null; state.notice = null;
    state.data = fav.report; state.query = fav.waterBody || '';
    state.view = 'today';
    render();
  }

  function removeFavorite(waterBody) {
    state.favorites = state.favorites.filter(function (f) { return f.waterBody !== waterBody; });
    lsSet('favorites', state.favorites);
    render();
  }

  function clearReport() {
    state.data = null; state.query = ''; state.error = null; state.notice = null;
    lsSet('lastReport', null);
    render();
  }

  function openProfileEditor() {
    state.profileDraft = { name: state.profile.name, avatar: state.profile.avatar };
    state.profileError = null;
    state.showProfileEditor = true;
    render();
  }

  function saveProfile() {
    var cleaned = { name: (state.profileDraft.name || 'Angler').trim() || 'Angler', avatar: state.profileDraft.avatar };
    state.profile = cleaned;
    lsSet('profile', cleaned);
    state.showProfileEditor = false;
    render();
  }

  function handleAvatarPick(file) {
    if (!file) return;
    state.profileError = null;
    if (isHeic(file)) {
      state.profileError = "That's a HEIC photo, which most browsers can't preview here. Try a JPG or PNG instead.";
      render();
      return;
    }
    resizeImageFile(file, 200, 0.8).then(function (dataUrl) {
      state.profileDraft.avatar = dataUrl;
      render();
    }).catch(function () {
      state.profileError = "Couldn't use that photo — try a different one (JPG or PNG works best).";
      render();
    });
  }

  function addGear() {
    if (!state.gearDraft.name.trim()) return;
    var added = { id: makeId(), name: state.gearDraft.name.trim(), type: state.gearDraft.type, detail: state.gearDraft.detail.trim(), tiedOn: state.gearDraft.type === 'Lure' };
    if (added.type === 'Lure') {
      state.gear = state.gear.map(function (g) { return Object.assign({}, g, { tiedOn: false }); }).concat([added]);
    } else {
      state.gear = state.gear.concat([added]);
    }
    lsSet('gear', state.gear);
    if (state.activeTrip && added.type === 'Lure') changeTripLure(added.name);
    state.gearDraft = { name: '', type: 'Lure', detail: '' };
    render();
  }

  function selectGear(id) {
    var item = state.gear.find(function (g) { return g.id === id; });
    if (!item) return;
    var makeTiedOn = !item.tiedOn;
    state.gear = state.gear.map(function (g) { return Object.assign({}, g, { tiedOn: g.id === id ? makeTiedOn : false }); });
    lsSet('gear', state.gear);
    if (state.activeTrip && makeTiedOn) changeTripLure(item.name);
    render();
  }

  function removeGear(id) {
    state.gear = state.gear.filter(function (g) { return g.id !== id; });
    lsSet('gear', state.gear);
    render();
  }

  function persistActiveTrip() { lsSet('activeTrip', state.activeTrip); }

  function beginTrip() {
    // Never discard a session already being recorded.
    if (state.activeTrip) {
      state.view = 'trip';
      render();
      return;
    }
    var trip = {
      id: makeId(),
      waterBody: (state.data && state.data.waterBody) || 'Unspecified water',
      startedAt: Date.now(), endedAt: null,
      casts: 0, misses: 0, catches: 0,
      lure: tiedOnLure() || (ownedLures()[0] && ownedLures()[0].name) || 'Not selected',
      moon: state.moonPhase ? state.moonPhase.name : null,
      events: []
    };
    state.tripTick = Date.now();
    state.activeTrip = trip;
    persistActiveTrip();
    state.view = 'trip';
    render();
  }

  function updateTrip(changes) {
    state.activeTrip = Object.assign({}, state.activeTrip, changes);
    persistActiveTrip();
  }

  function recordTripEvent(type, details) {
    if (!state.activeTrip) return;
    var event = Object.assign({ id: makeId(), type: type, at: Date.now(), lure: state.activeTrip.lure, moon: state.moonPhase ? state.moonPhase.name : null }, details || {});
    updateTrip({
      events: (state.activeTrip.events || []).concat([event]),
      catches: state.activeTrip.catches + (type === 'catch' ? 1 : 0),
      misses: state.activeTrip.misses + (type === 'miss' ? 1 : 0),
      casts: state.activeTrip.casts + (type === 'cast' ? 10 : 0)
    });
    render();
  }

  function confirmTripCatch() {
    var w = parseFloat(state.tripCatchDraft.weight);
    recordTripEvent('catch', { species: state.tripCatchDraft.species.trim() || 'Unspecified fish', weight: w ? round1(toCanonWeight(w) * 100) / 100 : null });
    state.tripCatchDraft = { species: '', weight: '' };
    state.showTripCatch = false;
    render();
  }

  function saveTripNote() {
    if (!state.tripNote.trim()) return;
    recordTripEvent('note', { note: state.tripNote.trim() });
    state.tripNote = '';
  }

  function toggleTripPause() {
    if (!state.activeTrip) return;
    if (state.activeTrip.pausedAt) {
      updateTrip({ pausedMs: (state.activeTrip.pausedMs || 0) + (Date.now() - state.activeTrip.pausedAt), pausedAt: null });
    } else {
      updateTrip({ pausedAt: Date.now() });
    }
    render();
  }

  function changeTripLure(name) {
    if (!state.activeTrip) return;
    var event = { id: makeId(), type: 'lure-change', at: Date.now(), lure: name };
    updateTrip({ lure: name, events: (state.activeTrip.events || []).concat([event]) });
  }

  function undoTripEvent() {
    if (!state.activeTrip || !state.activeTrip.events || !state.activeTrip.events.length) return;
    var events = state.activeTrip.events.slice();
    var removed = events.pop();
    updateTrip({
      events: events,
      catches: Math.max(0, state.activeTrip.catches - (removed.type === 'catch' ? 1 : 0)),
      misses: Math.max(0, state.activeTrip.misses - (removed.type === 'miss' ? 1 : 0)),
      casts: Math.max(0, state.activeTrip.casts - (removed.type === 'cast' ? 10 : 0))
    });
    render();
  }

  function finishTrip() {
    if (!state.activeTrip) return;
    var t = state.activeTrip;
    var endedAt = Date.now();
    var pausedMs = (t.pausedMs || 0) + (t.pausedAt ? endedAt - t.pausedAt : 0);
    var catchEvents = (t.events || []).filter(function (e) { return e.type === 'catch'; });
    var hourCounts = {};
    catchEvents.forEach(function (e) { var h = new Date(e.at).getHours(); hourCounts[h] = (hourCounts[h] || 0) + 1; });
    var bestHour = null, bestCount = -1;
    Object.keys(hourCounts).forEach(function (h) { if (hourCounts[h] > bestCount) { bestCount = hourCounts[h]; bestHour = h; } });
    var finished = Object.assign({}, t, { endedAt: endedAt, pausedAt: null, pausedMs: pausedMs, durationMs: endedAt - t.startedAt - pausedMs, bestHour: bestHour, zeroCatch: t.catches === 0 });
    state.trips = [finished].concat(state.trips).slice(0, 60);
    lsSet('trips', state.trips);
    state.activeTrip = null;
    lsSet('activeTrip', null);
    state.endSummary = finished;
    render();
  }

  function savePrivateSpot() {
    if (!state.spotDraft.name.trim()) return;
    var spot = Object.assign({}, state.spotDraft, {
      id: makeId(),
      name: state.spotDraft.name.trim(),
      depth: parseFloat(state.spotDraft.depth) ? round1(toCanonDepth(parseFloat(state.spotDraft.depth))) : null,
      waterBody: (state.data && state.data.waterBody) || 'Unspecified water',
      bestLure: tiedOnLure() || (state.activeTrip && state.activeTrip.lure) || null,
      createdAt: Date.now()
    });
    state.privateSpots = [spot].concat(state.privateSpots);
    lsSet('spots', state.privateSpots);
    state.spotDraft = { name: '', access: 'Shore', depth: '', bottom: 'Unknown', vegetation: '', snag: 'Low', direction: '' };
    render();
  }

  function removePrivateSpot(id) {
    state.privateSpots = state.privateSpots.filter(function (s) { return s.id !== id; });
    lsSet('spots', state.privateSpots);
    render();
  }

  var LOGBOOK_KEYS = ['profile', 'gear', 'trips', 'activeTrip', 'catches', 'favorites', 'spots',
    'mapPins', 'coordOverrides', 'waterTemps', 'units', 'waterType'];

  function buildLogbook() {
    return {
      format: 'fishing-almanac-logbook',
      version: 1,
      exportedAt: new Date().toISOString(),
      profile: state.profile,
      gear: state.gear,
      trips: state.trips,
      activeTrip: state.activeTrip,
      catches: state.myCatches,
      favorites: state.favorites,
      spots: state.privateSpots,
      // Map pins carry the photos and the exact coordinates — the most
      // irreplaceable thing in here, and the part the first version left out.
      mapPins: state.mapPins,
      coordOverrides: state.coordOverrides,
      waterTemps: state.waterTemps,
      units: state.units,
      waterType: state.waterType
    };
  }

  function countMapPins() {
    return Object.keys(state.mapPins || {}).reduce(function (n, k) { return n + (state.mapPins[k] || []).length; }, 0);
  }

  function exportLogbook() {
    state.backupMessage = null; state.backupError = null;
    var stamp = new Date().toISOString().slice(0, 10);
    saveTextFile('fishing-almanac-logbook-' + stamp + '.json', JSON.stringify(buildLogbook(), null, 2), 'application/json')
      .then(function () {
        state.backupMessage = 'Logbook saved — ' + state.myCatches.length + ' catches, ' + state.trips.length +
          ' trips, ' + countMapPins() + ' map pins with their photos and coordinates.';
        render();
      })
      .catch(function (e) {
        if (e && e.code === 'declined') { state.backupMessage = null; render(); return; }
        state.backupError = e && e.code === 'rate_limited'
          ? 'A save prompt is already open — finish that one first.'
          : 'That download didn’t go through. Try again in a moment.';
        render();
      });
  }

  function importLogbook(file) {
    state.backupMessage = null; state.backupError = null;
    var reader = new FileReader();
    reader.onerror = function () { state.backupError = 'Couldn’t read that file.'; render(); };
    reader.onload = function () {
      var parsed;
      try { parsed = JSON.parse(reader.result); } catch (e) { parsed = null; }
      if (!parsed || parsed.format !== 'fishing-almanac-logbook') {
        state.backupError = 'That doesn’t look like a Fishing Almanac logbook file.';
        render();
        return;
      }
      if (Array.isArray(parsed.gear)) { state.gear = parsed.gear; lsSet('gear', state.gear); }
      if (Array.isArray(parsed.trips)) { state.trips = parsed.trips; lsSet('trips', state.trips); }
      if (Array.isArray(parsed.catches)) { state.myCatches = parsed.catches; lsSet('catches', state.myCatches); }
      if (Array.isArray(parsed.favorites)) { state.favorites = parsed.favorites; lsSet('favorites', state.favorites); }
      if (Array.isArray(parsed.spots)) { state.privateSpots = parsed.spots; lsSet('spots', state.privateSpots); }
      if (parsed.profile && typeof parsed.profile === 'object') {
        state.profile = { name: parsed.profile.name || 'Angler', avatar: parsed.profile.avatar || null };
        lsSet('profile', state.profile);
      }
      if (parsed.activeTrip && typeof parsed.activeTrip === 'object') {
        state.activeTrip = parsed.activeTrip;
        lsSet('activeTrip', state.activeTrip);
      }
      if (parsed.mapPins && typeof parsed.mapPins === 'object') {
        state.mapPins = parsed.mapPins;
        // Strip the live-marker field older builds wrote onto pins; it can't be
        // stored and would break every save from here on.
        Object.keys(state.mapPins).forEach(function (k) {
          (state.mapPins[k] || []).forEach(function (pin) { delete pin._marker; });
        });
        saveMapPins();
      }
      if (parsed.coordOverrides && typeof parsed.coordOverrides === 'object') {
        state.coordOverrides = parsed.coordOverrides;
        lsSet('coordOverrides', state.coordOverrides);
      }
      if (parsed.waterTemps && typeof parsed.waterTemps === 'object') {
        state.waterTemps = parsed.waterTemps;
        lsSet('waterTemps', state.waterTemps);
      }
      if (parsed.units === 'metric' || parsed.units === 'imperial') { state.units = parsed.units; lsSet('units', state.units); }
      if (parsed.waterType === 'river' || parsed.waterType === 'lake') { state.waterType = parsed.waterType; lsSet('waterType', state.waterType); }
      solunarCache = { key: null, value: null };
      weekCache = { key: null, rows: null };
      state.backupMessage = 'Logbook restored — ' + state.myCatches.length + ' catches, ' + state.trips.length +
        ' trips, ' + state.gear.length + ' gear items, ' + countMapPins() + ' map pins.';
      render();
    };
    reader.readAsText(file);
  }

  function handleCatchPhotoPick(file) {
    if (!file) return;
    state.catchError = null;
    if (isHeic(file)) {
      state.catchError = "That's a HEIC photo, which most browsers can't preview here. Try a JPG or PNG instead.";
      render();
      return;
    }
    resizeImageFile(file, 420, 0.65).then(function (dataUrl) {
      state.catchDraft.photo = dataUrl;
      render();
    }).catch(function () {
      state.catchError = "Couldn't use that photo — try a different one (JPG or PNG works best).";
      render();
    });
  }

  function submitCatch() {
    state.catchError = null;
    var wantsPin = !!state.catchDraft.pinToMap;
    var species = (state.catchDraft.species || '').trim();
    var weightIn = parseFloat(state.catchDraft.weight);
    var lengthIn = parseFloat(state.catchDraft.length);
    var depthIn = parseFloat(state.catchDraft.depth);
    if (!species) { state.catchError = 'Add a species name.'; render(); return; }
    if (!weightIn && !lengthIn) { state.catchError = 'Add a weight or a length.'; render(); return; }

    // Store canonically (imperial) so the shared leaderboard always compares fairly.
    var weight = weightIn ? round1(toCanonWeight(weightIn) * 100) / 100 : null;
    var length = lengthIn ? round1(toCanonLength(lengthIn) * 10) / 10 : null;

    state.catchSubmitting = true; render();

    // The real conditions at the moment of the catch — this is what makes the
    // Patterns view meaningful over time.
    var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
    var entry = {
      id: makeId(), species: species,
      weight: weight || null, length: length || null,
      lure: (state.catchDraft.lure || '').trim() || null,
      depth: depthIn ? round1(toCanonDepth(depthIn)) : null,
      isPrivate: state.catchDraft.isPrivate !== false,
      moon: state.moonPhase ? state.moonPhase.name : null,
      pressureTrend: w ? w.trend : null,
      tempC: w ? w.tempC : null,
      windKmh: w ? w.windKmh : null,
      sky: w ? w.sky : null,
      photo: state.catchDraft.photo,
      anglerName: state.profile.name || 'Angler',
      avatar: state.profile.avatar || null,
      waterBody: state.data ? state.data.waterBody : null,
      date: new Date().toISOString()
    };

    // Keep a long history so the pattern panel has something to work with, but
    // only the newest dozen keep their photos — images are the only thing here
    // big enough to fill a browser's storage.
    state.myCatches = [entry].concat(state.myCatches).slice(0, 40);
    state.myCatches.forEach(function (c, i) { if (i >= 12) c.photo = null; });
    var storedLocally = lsSet('catches', state.myCatches);
    if (!storedLocally && entry.photo) {
      // Photos are the only thing big enough to fill the browser's quota — drop
      // this one's image rather than lose the catch.
      entry.photo = null;
      storedLocally = lsSet('catches', state.myCatches);
    }

    var key = speciesKeyFor(species);
    var rankValue = weight || length;
    var finish = function (becameRecord) {
      state.catchSuccess = entry.isPrivate ? 'Private catch saved to your trophy room.' : (becameRecord ? ('New record for ' + species + '! 🏆') : 'Catch logged to your trophy room.');
      if (!storedLocally) state.catchSuccess += " This browser's storage is full, so it won't be here after a reload.";
      state.catchDraft = { species: '', weight: '', length: '', lure: '', depth: '', isPrivate: true, photo: null, pinToMap: false };
      state.showCatchForm = false;
      state.catchSubmitting = false;
      render();
      if (wantsPin && entry.waterBody) pinCatchToMap(entry);
    };

    if (entry.isPrivate) { finish(false); return; }

    if (db) {
      var ref = db.collection('leaderboard').doc(key);
      ref.get().then(function (snap) {
        var existing = snap.exists ? snap.data() : null;
        var existingValue = existing ? (existing.weight || existing.length || 0) : -1;
        var becameRecord = rankValue > existingValue;
        if (becameRecord) {
          var record = function (row) {
            return ref.set(row).then(function () {
              state.leaderboard = Object.assign({}, state.leaderboard);
              state.leaderboard[key] = row;
              finish(true);
            });
          };
          // A large photo is the one thing that can push a record over the
          // store's per-document limit — keep the record, drop the image.
          return record(entry).catch(function (e) {
            if (!entry.photo || !e || e.code !== 'invalid_argument') throw e;
            return record(Object.assign({}, entry, { photo: null }));
          });
        }
        finish(false);
      }).catch(function () {
        state.catchSuccess = "Catch saved to your trophy room (shared leaderboard update didn't go through — try again later).";
        state.catchDraft = { species: '', weight: '', length: '', lure: '', depth: '', isPrivate: true, photo: null, pinToMap: false };
        state.showCatchForm = false;
        state.catchSubmitting = false;
        render();
      });
    } else {
      var current = lsGet('leaderboard', {});
      var existingL = current[key];
      var existingValueL = existingL ? (existingL.weight || existingL.length || 0) : -1;
      var becameRecordL = rankValue > existingValueL;
      if (becameRecordL) { current[key] = entry; lsSet('leaderboard', current); state.leaderboard = current; }
      finish(becameRecordL);
    }
  }

  /* ============================== RENDER ============================== */

  var root = document.getElementById('app');

  function render() {
    root.innerHTML = renderApp();
    initSatMapIfNeeded();
    if ((state.view === 'today' || state.view === 'home' || state.view === 'trip') && state.data && !state.loading) fetchWeatherIfNeeded();
  }

  function renderApp() {
    return (
      '<div class="fa-wrap">' +
      renderTopbar() +
      renderNav() +
      '<div id="fa-view">' + renderView() + '</div>' +
      '</div>' +
      '<input type="file" id="fa-pin-photo-input" accept="image/*" style="display:none">' +
      renderModals()
    );
  }

  function renderTopbar() {
    var avatarHtml = state.profile.avatar
      ? '<img src="' + state.profile.avatar + '" alt="">'
      : esc((state.profile.name || 'A')[0].toUpperCase());
    return (
      '<div class="fa-topbar">' +
      '<button class="fa-trophy-btn" data-action="open-trophy">🏆 My Trophy Room</button>' +
      '<button class="fa-profile-btn" data-action="open-profile"><span class="fa-avatar">' + avatarHtml + '</span>' + esc(state.profile.name || 'Angler') + '</button>' +
      '</div>'
    );
  }

  var NAV_ITEMS = [['home', 'Home'], ['today', 'Report'], ['trip', 'Live Trip'], ['gear', 'Gear'], ['waters', 'My Waters'], ['patterns', 'Patterns']];

  function renderNav() {
    return '<nav class="fa-nav" aria-label="Primary">' + NAV_ITEMS.map(function (item) {
      return '<button data-action="set-view" data-view="' + item[0] + '" class="' + (state.view === item[0] ? 'active' : '') + '">' + esc(item[1]) + '</button>';
    }).join('') + '</nav>';
  }

  function renderView() {
    if (state.view === 'home') return renderHome();
    if (state.view === 'trip') return renderTrip();
    if (state.view === 'gear') return renderGear();
    if (state.view === 'waters') return renderWaters();
    if (state.view === 'patterns') return renderPatterns();
    return renderToday();
  }

  /* ---- Today ---- */

  function renderToday() {
    var html = '';
    html += '<div class="fa-eyebrow">Water &amp; Tackle Almanac</div>';
    html += '<h1 class="fa-title">Fish any water,<br><em>fish it right.</em></h1>';
    html += '<p class="fa-sub">Name a lake, river, bay, or reservoir. Get the species that live there, the lures that work, the hours worth showing up for, and the technique to tie it together.</p>';
    html += '<div class="fa-adapt-note">Sunrise, sunset, moonrise, moonset and the solunar feeding windows are computed exactly, on your device, for any water you give a location to. The three example lakes carry detailed local plans; other waters get a general starter plan you can build on.</div>';

    html += renderSearchBar();

    html += '<div class="fa-examples-label">Built-in example waters</div>';
    html += '<div class="fa-examples">' + EXAMPLES.map(function (ex) {
      return '<button class="fa-chip" data-action="run-example" data-place="' + esc(ex) + '">' + esc(ex) + '</button>';
    }).join('') + '</div>';
    html += '<div class="fa-locate-hint">“Near me” reads your device’s GPS to compute the sun, moon and feeding times for exactly where you are. Nothing is sent anywhere — it stays on your device.</div>';

    if (state.favorites.length > 0) {
      html += '<div class="fa-favorites">' + state.favorites.map(function (f) {
        return '<div class="fa-fav-chip" data-action="load-favorite" data-water="' + esc(f.waterBody) + '">★ ' + esc(f.waterBody) +
          '<button class="fa-fav-remove" data-action="remove-favorite" data-water="' + esc(f.waterBody) + '" title="Remove">×</button></div>';
      }).join('') + '</div>';
    }

    if (state.error) html += '<div class="fa-error">' + esc(state.error) + '</div>';
    if (state.notice) html += '<div class="fa-notice">' + esc(state.notice) + '</div>';

    if (state.locating) {
      html += '<div class="fa-loading"><div class="fa-hook"></div><div>locking onto GPS…</div>' +
        '<div class="fa-loading-elapsed">holding a few seconds for the tightest fix</div></div>';
    } else if (state.loading) {
      html += '<div class="fa-loading"><div class="fa-hook"></div><div>reading the water…</div>' +
        '<div id="fa-loading-elapsed" class="fa-loading-elapsed"></div>' +
        '<button class="fa-chip" data-action="cancel-search">Stop</button></div>';
    } else if (!state.data && !state.error) {
      html += '<div class="fa-empty">— your report will show up here —</div>';
    }

    if (state.data && !state.loading) html += renderReportCard();

    html += renderLeaderboard();
    return html;
  }

  function renderReportCard() {
    var d = state.data;
    var fav = isFavorited();
    var html = '<div class="fa-card">';
    html += '<div class="fa-card-header">';
    html += '<div style="display:flex;align-items:center;gap:10px">';
    html += '<button class="fa-star-btn' + (fav ? ' active' : '') + '" data-action="toggle-favorite" title="' + (fav ? 'Remove from saved waters' : 'Save this water') + '">' +
      '<svg viewBox="0 0 24 24" fill="' + (fav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15 9 22 9.5 16.5 14.5 18 22 12 18 6 22 7.5 14.5 2 9.5 9 9" stroke-linejoin="round"/></svg></button>';
    html += '<div class="fa-card-title">' + esc(d.waterBody) + '</div>';
    html += '</div>';
    html += '<div style="display:flex;align-items:flex-end;gap:14px">';
    if (d.location) html += '<div class="fa-card-loc">' + esc(d.location) + '</div>';
    html += '<button class="fa-clear-btn" data-action="clear-report">Clear</button>';
    html += '</div></div>';

    html += '<div class="fa-section" style="padding-top:16px;padding-bottom:16px"><div class="fa-primary-row">' +
      '<button class="fa-btn" data-action="begin-trip">' + (state.activeTrip ? '● Trip in progress — open it' : '▶ Start Live Trip here') + '</button>' +
      '<button class="fa-btn-secondary" data-action="toggle-favorite">' + (fav ? '★ Water saved' : '☆ Star this water') + '</button>' +
      '</div></div>';

    if (isNotFound()) {
      html += '<div class="fa-not-found"><div class="fa-not-found-title">No details pinned down for this one</div>' +
        '<div class="fa-not-found-desc">Try searching by name instead — even an approximate one, like the nearest town or park, can help narrow it down.</div></div>';
    } else {
      if (Array.isArray(d.species) && d.species.length) {
        html += '<div class="fa-section"><div class="fa-section-label">What’s swimming here</div><div class="fa-grid">' +
          d.species.map(function (s) {
            return '<div class="fa-fish-card"><div class="fa-fish-name">' + esc(s.name) + '</div>' +
              (s.meta ? '<div class="fa-fish-meta">' + esc(s.meta) + '</div>' : '') +
              '<div class="fa-fish-desc">' + esc(s.description) + '</div>' +
              (s.structure ? '<div class="fa-fish-structure"><strong>Find them:</strong> ' + esc(s.structure) + '</div>' : '') + '</div>';
          }).join('') + '</div></div>';
      }

      html += renderDayPlanner(d);

      if (coordsFor(d)) {
        html += '<div class="fa-section"><div class="fa-section-label">Conditions &amp; bite — right now</div><div id="fa-weather"></div>' +
          '<div id="fa-watertemp">' + renderWaterTempRow() + '</div></div>';
      }

      html += renderGuruSection();

      if (Array.isArray(d.lures) && d.lures.length) {
        html += '<div class="fa-section"><div class="fa-section-label">Tackle box picks</div><div class="fa-grid">' +
          d.lures.map(function (l) {
            return '<div class="fa-lure-card"><div class="fa-lure-name">' + esc(l.name) + '</div>' +
              (l.meta ? '<div class="fa-fish-meta">' + esc(l.meta) + '</div>' : '') +
              '<div class="fa-lure-desc">' + esc(l.description) + '</div></div>';
          }).join('') + '</div></div>';
      }

      if (Array.isArray(d.techniques) && d.techniques.length) {
        html += '<div class="fa-section"><div class="fa-section-label">Technique</div><div class="fa-tech-list">' +
          d.techniques.map(function (t, i) {
            return '<div class="fa-tech-item"><div class="fa-tech-mark">' + String.fromCharCode(97 + i) + '.</div><div>' +
              '<div class="fa-tech-name">' + esc(t.name) + '</div><div class="fa-tech-desc">' + esc(t.description) + '</div></div></div>';
          }).join('') + '</div></div>';
      }

      html += renderWaterMap(d);

      if (Array.isArray(d.hotspots) && d.hotspots.length) {
        html += '<div class="fa-section"><div class="fa-section-label">Named spots on this water</div><div class="fa-hotspot-list">' +
          d.hotspots.map(function (h) {
            return '<div class="fa-hotspot-item"><div class="fa-hotspot-tag' + (h.access === 'Shore' ? ' shore' : '') + '">' + esc(h.access || 'Both') + '</div><div>' +
              '<div class="fa-hotspot-name">' + esc(h.name) + '</div>' + (h.tip ? '<div class="fa-hotspot-tip">' + esc(h.tip) + '</div>' : '') + '</div></div>';
          }).join('') + '</div></div>';
      }

      if (Array.isArray(d.quickTips) && d.quickTips.length) {
        html += '<div class="fa-section"><div class="fa-section-label">Quick tips for this water</div><ul class="fa-quicktips-list">' +
          d.quickTips.map(function (tip) { return '<li>' + esc(tip) + '</li>'; }).join('') + '</ul></div>';
      }

      if (Array.isArray(d.gear) && d.gear.length) {
        html += '<div class="fa-section"><div class="fa-section-label">Gear box</div><div class="fa-gear-list">' +
          d.gear.map(function (g) {
            return '<div class="fa-gear-item"><div class="fa-gear-name">' + esc(g.name) + '</div>' + (g.note ? '<div class="fa-gear-note">' + esc(g.note) + '</div>' : '') + '</div>';
          }).join('') + '</div></div>';
      }
    }

    html += renderCatchSection(d);

    if (d.regulationsNote) html += '<div class="fa-regs-note">' + esc(d.regulationsNote) + '</div>';

    html += '</div>';
    return html;
  }

  function fmtClock(date) {
    if (!date) return '—';
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  function pctOfDay(date, dayStart) {
    return Math.max(0, Math.min(100, ((date - dayStart) / 86400000) * 100));
  }

  /* The day's timing, drawn from the real sun and moon rather than a guess:
     day/night bands from computed twilight, solunar windows on top. */
  function renderDayPlanner(d) {
    var sol = solunarForReport();
    var html = '<div class="fa-section"><div class="fa-section-label">Best time to be on the water</div>';

    if (!sol) {
      // No coordinates for this water — fall back to the guide's own peaks.
      html += '<div class="fa-timeline fa-timeline-generic">';
      ((d.bestTimes && d.bestTimes.peaks) || []).forEach(function (p) {
        var startPct = parseTimeToPct(p.start), endPct = parseTimeToPct(p.end);
        if (startPct == null || endPct == null) return;
        var left = Math.min(startPct, endPct);
        var width = Math.max(Math.abs(endPct - startPct), 3);
        html += '<div class="fa-peak" style="left:' + left + '%;width:' + width + '%"><div class="fa-peak-label">' + esc(p.label) + '</div></div>';
      });
      html += '</div><div class="fa-timeline-marks"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div>';
      if (d.bestTimes && d.bestTimes.seasonalNote) html += '<div class="fa-seasonal-note">' + esc(d.bestTimes.seasonalNote) + '</div>';
      if (state.moonPhase) html += renderMoonRow(state.moonPhase.icon, state.moonPhase.name, state.moonPhase.illumination, state.moonPhase.note);
      html += renderCoordEditor(d, 'Set this water’s location to get exact sunrise, sunset, moonrise, moonset and solunar windows.');
      return html + '</div>';
    }

    var now = new Date();
    var dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    var sun = sol.sun;

    // Build the background from the actual twilight boundaries.
    var stops = [];
    function stop(color, pct) { stops.push(color + ' ' + pct.toFixed(2) + '%'); }
    var night = '#16233a', twilight = '#d97a3d', day = '#bfe3f0';
    if (sun.dawn && sun.sunrise && sun.sunset && sun.dusk) {
      var dawnP = pctOfDay(sun.dawn, dayStart), riseP = pctOfDay(sun.sunrise, dayStart);
      var setP = pctOfDay(sun.sunset, dayStart), duskP = pctOfDay(sun.dusk, dayStart);
      // Twilight itself is only a few percent of the day; letting the warm band
      // run a little past sunrise and before sunset keeps it readable without
      // moving any of the marked times.
      var glow = Math.max(riseP - dawnP, 1.4);
      stop(night, 0); stop(night, Math.max(dawnP - glow * 0.4, 0));
      stop(twilight, riseP); stop(day, Math.min(riseP + glow, 100));
      stop(day, Math.max(setP - glow, 0)); stop(twilight, setP);
      stop(night, Math.min(duskP + glow * 0.4, 100)); stop(night, 100);
    } else {
      // Polar day or night: one continuous band.
      var allDay = sun.sunrise && !sun.sunset;
      stop(allDay ? day : night, 0); stop(allDay ? day : night, 100);
    }

    html += '<div class="fa-timeline" style="background:linear-gradient(90deg,' + stops.join(',') + ')">';

    sol.majors.forEach(function (w) {
      var left = pctOfDay(w.start, dayStart), right = pctOfDay(w.end, dayStart);
      html += '<div class="fa-peak fa-peak-major" style="left:' + left + '%;width:' + Math.max(right - left, 2) + '%">' +
        '<div class="fa-peak-label">' + esc(w.label) + '</div></div>';
    });
    sol.minors.forEach(function (w) {
      var left = pctOfDay(w.start, dayStart), right = pctOfDay(w.end, dayStart);
      html += '<div class="fa-peak fa-peak-minor" style="left:' + left + '%;width:' + Math.max(right - left, 1.5) + '%"></div>';
    });
    html += '<div class="fa-now-marker" style="left:' + pctOfDay(now, dayStart) + '%"><span>now</span></div>';
    html += '</div><div class="fa-timeline-marks"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div>';

    html += '<div class="fa-legend">' +
      '<span><i class="fa-swatch fa-swatch-major"></i>Major window (moon overhead / underfoot)</span>' +
      '<span><i class="fa-swatch fa-swatch-minor"></i>Minor (moonrise / moonset)</span>' +
      '</div>';

    // The day's rating and the windows themselves.
    var stars = '';
    for (var i = 1; i <= 4; i++) stars += '<span class="fa-star' + (i <= sol.rating.stars ? ' on' : '') + '">●</span>';
    html += '<div class="fa-rating-row"><div class="fa-rating-stars">' + stars + '</div>' +
      '<div><div class="fa-rating-label">' + esc(sol.rating.label) + ' solunar day</div>' +
      '<div class="fa-rating-why">' + esc(sol.rating.why) + '</div></div></div>';

    html += '<div class="fa-window-grid">';
    sol.majors.concat(sol.minors).sort(function (a, b) { return a.center - b.center; }).forEach(function (w) {
      var isMajor = sol.majors.indexOf(w) !== -1;
      var live = now >= w.start && now <= w.end;
      var passed = now > w.end;
      html += '<div class="fa-window' + (isMajor ? ' major' : '') + (live ? ' live' : '') + (passed ? ' passed' : '') + '">' +
        '<div class="fa-window-kind">' + (isMajor ? 'Major' : 'Minor') + (live ? ' · now' : '') + '</div>' +
        '<div class="fa-window-time">' + fmtClock(w.start) + ' – ' + fmtClock(w.end) + '</div>' +
        '<div class="fa-window-label">' + esc(w.label) + '</div></div>';
    });
    html += '</div>';

    html += '<div class="fa-suntimes">' +
      '<span><strong>Sunrise</strong> ' + fmtClock(sun.sunrise) + '</span>' +
      '<span><strong>Sunset</strong> ' + fmtClock(sun.sunset) + '</span>' +
      '<span><strong>Moonrise</strong> ' + fmtClock(sol.moon.rise) + '</span>' +
      '<span><strong>Moonset</strong> ' + fmtClock(sol.moon.set) + '</span>' +
      '</div>';

    html += '<div class="fa-map-row">' +
      '<a class="fa-map-link" href="' + mapsUrl(sol.coords) + '" target="_blank" rel="noopener noreferrer">📍 Open in Maps ↗</a>' +
      (d.isCurrentLocation && state.gpsAccuracy != null ? '<span class="fa-map-acc">GPS accuracy ±' + state.gpsAccuracy + ' m</span>' : '') +
      '</div>';

    if (d.bestTimes && d.bestTimes.seasonalNote) {
      html += '<div class="fa-seasonal-note"><strong>The guide’s take:</strong> ' + esc(d.bestTimes.seasonalNote) + '</div>';
    }

    var phase = describeMoonPhase(sol.illumination);
    html += renderMoonRow(phase.icon, phase.name, Math.round(sol.illumination.fraction * 100), phase.note);

    var source = d.isCurrentLocation ? 'your GPS position' : coordsAreManual(d) ? 'the location you set' : 'the report’s estimate of this water’s centre';
    html += '<div class="fa-fineprint">Times computed on your device for ' + sol.coords.lat.toFixed(3) + ', ' + sol.coords.lon.toFixed(3) + ' — ' +
      source + ', in your device’s timezone. Solunar windows are an angling convention, not a forecast.</div>';
    html += renderCoordEditor(d, null);

    return html + '</div>';
  }

  /* Set or correct where this water actually is. Coordinates drive every time
     on this panel, so a hand-set location makes them exact. */
  function renderCoordEditor(d, prompt) {
    var manual = coordsAreManual(d);
    var has = !!coordsFor(d);

    if (!state.showCoordEditor) {
      var label = has ? (manual ? 'Change location' : 'Correct this location') : 'Set location';
      return '<div class="fa-coord-row">' +
        (prompt ? '<span class="fa-coord-prompt">' + esc(prompt) + '</span>' : '') +
        '<button class="fa-toggle-btn on-light" data-action="open-coords">' + esc(label) + '</button>' +
        (manual ? ' <button class="fa-danger-link" data-action="clear-coords">Use the report’s estimate</button>' : '') +
        '</div>';
    }

    var locating = !!state.coordDraft.locating;
    return '<div class="fa-coord-editor">' +
      '<div class="fa-section-label" style="margin-bottom:10px">Location for ' + esc(d.waterBody) + '</div>' +
      '<button class="fa-toggle-btn on-light" data-action="locate-into-editor"' + (locating ? ' disabled' : '') + ' style="margin-bottom:12px">' +
      (locating ? 'Getting GPS…' : '📍 Use my GPS position') + '</button>' +
      '<div class="fa-catch-row">' +
      '<div class="fa-field"><label>Latitude</label><input type="number" step="0.0001" id="fa-coord-lat" data-bind="coordDraft.lat" value="' + esc(state.coordDraft.lat) + '" placeholder="42.9633"></div>' +
      '<div class="fa-field"><label>Longitude</label><input type="number" step="0.0001" id="fa-coord-lon" data-bind="coordDraft.lon" value="' + esc(state.coordDraft.lon) + '" placeholder="-83.6169"></div>' +
      '</div>' +
      (state.coordError ? '<div class="fa-error" style="margin-bottom:12px">' + esc(state.coordError) + '</div>' : '') +
      '<div class="fa-primary-row" style="margin-top:0"><button class="fa-btn" data-action="save-coords">Save location</button>' +
      '<button class="fa-btn-secondary" data-action="close-coords">Cancel</button></div>' +
      '<div class="fa-fineprint">Use my GPS fills these from where you are now. Or type decimal degrees — negative for west and south; any map app gives them when you long-press a spot. Within a few miles is close enough.</div>' +
      '</div>';
  }

  function renderMoonRow(icon, name, illumPct, note) {
    return '<div class="fa-moon-row"><div class="fa-moon-icon">' + icon + '</div><div>' +
      '<div class="fa-moon-name">' + esc(name) + ' <span class="fa-moon-illum">· ' + illumPct + '% lit</span></div>' +
      '<div class="fa-moon-note">' + esc(note) + '</div></div></div>';
  }

  /* Name the phase from the computed illumination and where we are in the
     cycle, so the label always agrees with the times above it. */
  function describeMoonPhase(illum) {
    var p = illum.phase; // 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter
    var table = [
      { max: 0.033, name: 'New Moon', icon: '●', note: 'Low light; fish often feed more by scent and vibration than sight.' },
      { max: 0.216, name: 'Waxing Crescent', icon: '🌒', note: 'Building activity as moonlight increases.' },
      { max: 0.284, name: 'First Quarter', icon: '🌓', note: 'Moderate solunar pull; a solid all-around window.' },
      { max: 0.466, name: 'Waxing Gibbous', icon: '🌔', note: 'Bright nights can push feeding into early morning and dusk.' },
      { max: 0.534, name: 'Full Moon', icon: '🌕', note: 'Strong solunar pull; many species feed heavily around moonrise and moonset.' },
      { max: 0.716, name: 'Waning Gibbous', icon: '🌖', note: 'Still active; the night bite can be productive.' },
      { max: 0.784, name: 'Last Quarter', icon: '🌗', note: 'Moderate activity, steady daytime bite.' },
      { max: 0.966, name: 'Waning Crescent', icon: '🌘', note: 'Darker nights often shift feeding toward dawn and dusk.' },
      { max: 1.01, name: 'New Moon', icon: '●', note: 'Low light; fish often feed more by scent and vibration than sight.' }
    ];
    for (var i = 0; i < table.length; i++) if (p <= table[i].max) return table[i];
    return table[0];
  }

  /* ============================== WEATHER & BITE ==============================
     Live conditions from Open-Meteo (free, keyless). Barometric pressure and its
     trend are the biggest weather lever on the bite, so this is real signal, not
     filler. Needs a network — offline or in a sandbox it degrades to a clear
     "unavailable" note. Fetched in canonical metric (°C, km/h, hPa) and converted
     for display. */
  var WEATHER_CODES = {
    0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain', 67: 'Freezing rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
    85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };

  function dispTemp(c) { return c == null ? null : Math.round(isMetric() ? c : c * 9 / 5 + 32); }
  function tempUnit() { return isMetric() ? '°C' : '°F'; }
  function dispWind(kmh) { return kmh == null ? null : Math.round(isMetric() ? kmh : kmh * 0.621371); }
  function windUnit() { return isMetric() ? 'km/h' : 'mph'; }

  function biteLabel(score) { return score >= 78 ? 'Prime' : score >= 63 ? 'Good' : score >= 48 ? 'Fair' : 'Slow'; }

  var weatherCache = { key: null, status: 'idle', data: null };

  function weatherKeyFor(c) {
    var now = new Date();
    return c.lat.toFixed(3) + ',' + c.lon.toFixed(3) + '@' + now.toISOString().slice(0, 13); // per hour
  }

  /* Kick off a weather fetch for the current report if we don't have fresh data.
     Called from render(); updates the DOM in place when it resolves so it never
     blocks the page. */
  function fetchWeatherIfNeeded() {
    var c = coordsFor(state.data);
    if (!c) return;
    var key = weatherKeyFor(c);
    if (weatherCache.key === key && (weatherCache.status === 'ok' || weatherCache.status === 'loading')) {
      paintWeather();
      return;
    }
    weatherCache = { key: key, status: 'loading', data: null };
    paintWeather();

    var moon = state.moonPhase;
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + c.lat + '&longitude=' + c.lon +
      '&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,surface_pressure,cloud_cover,precipitation' +
      '&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,weather_code,precipitation' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant' +
      '&past_days=7&forecast_days=7&timezone=auto';

    var ctl = new AbortController();
    var timer = setTimeout(function () { ctl.abort(); }, 12000);
    fetch(url, { signal: ctl.signal }).then(function (r) {
      if (!r.ok) throw new Error('weather ' + r.status);
      return r.json();
    }).then(function (j) {
      clearTimeout(timer);
      if (weatherCache.key !== key) return; // superseded
      weatherCache = { key: key, status: 'ok', data: parseWeather(j, moon) };
      paintWeather();
    }).catch(function () {
      clearTimeout(timer);
      if (weatherCache.key !== key) return;
      weatherCache = { key: key, status: 'error', data: null };
      paintWeather();
    });
  }

  function parseWeather(j, moon) {
    var cur = j.current || {};
    var out = {
      tempC: cur.temperature_2m,
      windKmh: cur.wind_speed_10m,
      windDir: cur.wind_direction_10m,
      pressure: cur.surface_pressure != null ? Math.round(cur.surface_pressure) : null,
      cloud: cur.cloud_cover,
      sky: WEATHER_CODES[cur.weather_code] || '—',
      trend: 'steady',
      hourly: []
    };
    var h = j.hourly;
    if (h && h.time && h.time.length) {
      // pressure trend over the last ~3h around now
      var now = Date.now();
      var iNow = h.time.findIndex(function (t) { return new Date(t).getTime() >= now - 1800000; });
      if (iNow < 0) iNow = 0;
      var pNow = h.surface_pressure[iNow];
      var pBefore = h.surface_pressure[Math.max(0, iNow - 3)];
      if (pNow != null && pBefore != null) {
        var d = pNow - pBefore;
        out.trend = d < -0.8 ? 'falling' : d > 0.8 ? 'rising' : 'steady';
        out.trendDelta = Math.round(d * 10) / 10;
      }
      // Rain in the last 12 hours: what colours a river and turns on the inflows.
      if (h.precipitation) {
        var rain = 0;
        for (var ri = Math.max(0, iNow - 12); ri < iNow; ri++) rain += h.precipitation[ri] || 0;
        out.rain12h = Math.round(rain * 100) / 100;
      }
      // next 12 hourly bite scores
      // Per-day pressure change, for the week-ahead scores.
      var pressureByDay = {};
      h.time.forEach(function (t, i) {
        var d = t.slice(0, 10);
        if (h.surface_pressure[i] == null) return;
        if (!pressureByDay[d]) pressureByDay[d] = [];
        pressureByDay[d].push(h.surface_pressure[i]);
      });
      out.pressureByDay = pressureByDay;
      out.hourly = h.time.slice(iNow, iNow + 12).map(function (t, k) {
        var i = iNow + k;
        var pDelta = (h.surface_pressure[i] || 1013) - (h.surface_pressure[Math.max(0, i - 3)] || h.surface_pressure[i] || 1013);
        var windMph = (h.wind_speed_10m[i] || 0) * 0.621371;
        var clouds = h.cloud_cover[i] || 0;
        var hr = new Date(t).getHours();
        var lowLight = (hr >= 5 && hr <= 8) || (hr >= 17 && hr <= 21);
        var score = 44 + (lowLight ? 22 : 0) + Math.min(clouds, 80) * 0.12;
        score += pDelta < -1 ? 12 : pDelta < 1 ? 7 : pDelta > 4 ? -10 : 0;
        score += windMph >= 4 && windMph <= 14 ? 8 : windMph > 22 ? -12 : 0;
        score += moon && (moon.name === 'Full Moon' || moon.name === 'New Moon') ? 5 : 0;
        score = Math.max(20, Math.min(95, Math.round(score)));
        return { time: t, score: score, label: biteLabel(score), tempC: h.temperature_2m[i], windKmh: h.wind_speed_10m[i], clouds: Math.round(clouds), pDelta: Math.round(pDelta * 10) / 10 };
      });
    }

    // The daily rollup: a week back (for the water-temperature estimate) and a
    // week forward (for "which day should I go").
    var dd = j.daily;
    if (dd && dd.time && dd.time.length) {
      out.daily = dd.time.map(function (date, i) {
        var series = out.pressureByDay ? out.pressureByDay[date] : null;
        return {
          date: date,
          code: dd.weather_code ? dd.weather_code[i] : null,
          tmax: dd.temperature_2m_max ? dd.temperature_2m_max[i] : null,
          tmin: dd.temperature_2m_min ? dd.temperature_2m_min[i] : null,
          tmean: dd.temperature_2m_mean ? dd.temperature_2m_mean[i] : null,
          rain: dd.precipitation_sum ? dd.precipitation_sum[i] : null,
          pop: dd.precipitation_probability_max ? dd.precipitation_probability_max[i] : null,
          windMax: dd.wind_speed_10m_max ? dd.wind_speed_10m_max[i] : null,
          windDir: dd.wind_direction_10m_dominant ? dd.wind_direction_10m_dominant[i] : null,
          dp: (series && series.length > 3) ? Math.round((series[series.length - 1] - series[0]) * 10) / 10 : null
        };
      });
      // past_days=7 puts today at index 7; fall back to matching the date if the
      // water's timezone has already rolled over and ours hasn't.
      var todayIso = new Date().toISOString().slice(0, 10);
      var todayIdx = -1;
      for (var di = 0; di < out.daily.length; di++) { if (out.daily[di].date === todayIso) { todayIdx = di; break; } }
      if (todayIdx < 0) todayIdx = Math.min(7, out.daily.length - 1);
      out.todayIdx = todayIdx;
      out.waterC = estimateWaterTempC(out.daily, todayIdx);
      out.waterTrend = waterTrend(out.daily, todayIdx);
    }
    return out;
  }

  var TREND_NOTE = {
    falling: 'Falling pressure — often the best window; fish feed ahead of a front.',
    rising: 'Rising pressure after a front — bite can be tough; slow down and downsize.',
    steady: 'Steady pressure — a dependable, no-surprises bite.'
  };

  function paintWeatherPanel() {
    var host = document.getElementById('fa-weather');
    if (!host) return;
    var s = weatherCache.status;
    if (s === 'loading') { host.innerHTML = '<div class="fa-weather-loading">reading the sky…</div>'; return; }
    if (s === 'error' || !weatherCache.data) {
      host.innerHTML = '<div class="fa-fineprint">Live weather needs a connection — unavailable right now. The solunar windows above are computed on your device and still apply.</div>';
      return;
    }
    var w = weatherCache.data;
    var html = '<div class="fa-conditions-grid">' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + dispTemp(w.tempC) + '°</div><div class="fa-cond-label">air ' + tempUnit() + '</div></div>' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + dispWind(w.windKmh) + '</div><div class="fa-cond-label">wind ' + windUnit() + '</div></div>' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + (w.pressure || '—') + '</div><div class="fa-cond-label">hPa</div></div>' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + (w.cloud != null ? w.cloud + '%' : '—') + '</div><div class="fa-cond-label">' + esc(w.sky) + '</div></div>' +
      '</div>';
    html += '<div class="fa-trend fa-trend-' + w.trend + '"><strong>' + w.trend.charAt(0).toUpperCase() + w.trend.slice(1) + ' pressure</strong>' +
      (w.trendDelta != null ? ' (' + (w.trendDelta >= 0 ? '+' : '') + w.trendDelta + ' hPa/3h)' : '') + ' — ' + TREND_NOTE[w.trend] + '</div>';

    if (w.hourly.length) {
      html += '<div class="fa-section-label" style="margin:18px 0 10px">Hourly bite forecast</div>';
      html += '<div class="fa-forecast">' + w.hourly.map(function (hr) {
        var hot = hr.score >= 63;
        return '<div class="fa-hour' + (hot ? ' hot' : '') + '"><div class="fa-hour-time">' + new Date(hr.time).toLocaleTimeString([], { hour: 'numeric' }) + '</div>' +
          '<div class="fa-hour-score' + (hot ? ' hot' : '') + '">' + hr.score + '</div>' +
          '<div class="fa-hour-label">' + hr.label + '</div>' +
          '<div class="fa-scorebar"><span style="width:' + hr.score + '%"></span></div></div>';
      }).join('') + '</div>';
      html += '<div class="fa-fineprint">Score blends pressure trend, wind, cloud, low light and moon phase. Decision support, not a guarantee.</div>';
    }
    host.innerHTML = html;
  }

  /* Live weather landing repaints every region that depends on it: the
     conditions panel on the report, the guide's calls, and the dashboard. */
  function paintWeather() {
    paintWeatherPanel();
    var wt = document.getElementById('fa-watertemp');
    if (wt && !state.showWaterTemp) wt.innerHTML = renderWaterTempRow();
    if (state.view === 'home') paintDashboard();
    else paintGuru();
  }

  /* ============================== THE GURU ==============================
     A guide reads three clocks at once: the calendar (what the fish are doing
     this month), the sky (what today's weather is doing to them), and the day
     (when the feeding windows land). This engine reads the same three from
     numbers the app already has — solunar windows computed on the device, live
     pressure, wind, cloud, rain and temperature from the forecast, the water
     type, the species you're after, and your own catch log — and turns them
     into the handful of calls a guide would actually say out loud.

     Every call carries its reasoning. A tip you understand transfers to the next
     lake; a tip you don't is a superstition. Where the data can't support a
     call, no call is made — there are no filler tips here. */

  /* ---- Season. Fish run on water temperature, not the calendar, but the
     calendar plus latitude is a good proxy and it's what we can compute
     offline. Flipped for the southern hemisphere, shifted about a day per
     degree of latitude, and set aside entirely in the tropics where the wet
     and dry seasons matter more than any of this. ---- */
  function seasonFor(date, lat) {
    if (Math.abs(lat) < 23.5) return 'tropical';
    var start = new Date(date.getFullYear(), 0, 0);
    var doy = Math.floor((date - start) / 86400000);
    var d = lat < 0 ? ((doy + 182) % 365) || 365 : doy;   // flip hemispheres
    d -= Math.round((Math.abs(lat) - 42) * 1.1);          // later the farther poleward
    if (d < 1) d += 365;
    if (d > 365) d -= 365;
    if (d <= 59) return 'winter';        // through Feb
    if (d <= 105) return 'prespawn';     // through mid-Apr
    if (d <= 152) return 'spawn';        // through May
    if (d <= 181) return 'postspawn';    // through Jun
    if (d <= 244) return 'summer';       // through Aug
    if (d <= 288) return 'fall';         // through mid-Oct
    if (d <= 334) return 'latefall';     // through Nov
    return 'winter';
  }

  // Five playbook buckets — the seasons that fish the same way share one.
  var SEASON_BUCKET = {
    winter: 'cold', prespawn: 'spring', spawn: 'spring', postspawn: 'postspawn',
    summer: 'summer', fall: 'fall', latefall: 'cold', tropical: 'summer'
  };

  var SEASON_CALL = {
    winter: {
      label: 'Winter · cold water',
      title: 'Cold water shrinks everything — the strike zone most of all',
      body: 'A fish in 38°F water will not move three feet for a meal it would have chased thirty in July. Go smaller, slower and more vertical, fish the deepest structure near the main basin, and give every bait a pause longer than feels reasonable. Most cold-water bites are pressure on the line, not a thump.'
    },
    prespawn: {
      label: 'Pre-spawn',
      title: 'Find the warmest water in the system and you find the fish',
      body: 'Pre-spawn is the year\'s best big-fish window. Fish stage on the first drop outside the shallow bays they will spawn in and push up onto the flats on any warm, sunny afternoon. Start on north and northwest shores and dark-bottom bays — they take the most sun and warm days ahead of the rest of the water. Two degrees is enough to matter.'
    },
    spawn: {
      label: 'Spawn',
      title: 'Fish are shallow, visible, and worth leaving alone once you\'ve found them',
      body: 'Spawning fish sit on hard bottom in a few feet of water and are easy to catch and easy to ruin. Fish the staging areas and the first break instead of the beds themselves where you can, keep any fish you do catch off the bed brief, and check the regulations — many waters are closed or catch-and-release for exactly this reason.'
    },
    postspawn: {
      label: 'Post-spawn',
      title: 'The hardest two weeks of the year — fish the first deep structure',
      body: 'Recovering fish suspend, sulk and eat little. Don\'t keep grinding the shallows they just left: work the first significant depth change outside the spawning area, slow everything down, and downsize. This is when a finesse presentation quietly outfishes everything else in the boat.'
    },
    summer: {
      label: 'Summer',
      title: 'Summer sorts fish by comfort: shade, depth, current, oxygen',
      body: 'Fish the first and last hours hard, and spend the bright middle of the day finding structure rather than fighting for bites on it. Anywhere cool, moving or shaded — the deep weed edge, a main-lake point, an inflow, the shady side of every dock — beats the open flat that was full of fish in May.'
    },
    fall: {
      label: 'Fall',
      title: 'Fall is about bait, not spots',
      body: 'Cooling water pulls baitfish into creeks, coves and onto main-lake points, and every predator follows. Find the bait — birds working, flickers on the surface, clouds on the sonar — and stop looking at your favorite spots. Cover water fast with a moving bait until you make contact, then slow down and work it.'
    },
    latefall: {
      label: 'Late fall',
      title: 'Fewer bites, bigger fish, and the biggest baits of the year',
      body: 'As water drops through the 40s, the small fish quit and the largest ones feed hard on the biggest meal available. Steep breaks near deep water, slow presentations, and a bait that looks like too much. This is the least crowded and most rewarded month on most waters.'
    },
    tropical: {
      label: 'Warm-water year',
      title: 'Rain and water level matter more than the month here',
      body: 'Near the tropics the calendar barely moves the fish; rainfall does. Rising, coloring water pushes fish to the banks and the newly flooded edges and turns the bite on; falling, clearing water pulls them back to the deepest holes and makes them spooky. Fish the first and last light regardless.'
    }
  };

  /* ---- Per-species playbooks. Five buckets each, written from general angling
     knowledge — patterns that hold across most of the range, not a survey of
     your particular water. ---- */
  var SPECIES_PLAY = {
    General: {
      cold: 'Cold water: smaller, slower, deeper and more vertical than feels right. Fish the deepest structure near the main basin and expect the bite to feel like nothing at all.',
      spring: 'Warming water is the whole story. The warmest corner of the system — shallow dark-bottom bays, the back of a protected cove, a north shore in the afternoon sun — holds the most active fish.',
      postspawn: 'Transition. Fish the first deep structure outside where they spawned, slow down, and downsize before you change spots.',
      summer: 'Shade, depth, current and oxygen. Fish the edges of the day hard; use the bright middle to find structure for tomorrow.',
      fall: 'Follow the bait into the creeks and onto the points. Cover water with a moving bait until you contact fish, then work the school.'
    },
    Walleye: {
      core: 'Walleye hate light more than they love structure. The low-light hours beat the good spots — a mediocre place at dusk out-produces a great one at noon.',
      cold: 'Cold-water walleye barely move. Vertical-jig a minnow right on their nose over the deepest break, and set the hook on weight, not a tap.',
      spring: 'They stack below the first barrier they can\'t pass — a dam, rapids or river mouth — and feed on shallow rock and gravel after dark. A jig-and-minnow, or a shallow stickbait cast into 3–8 ft at night, is the whole program.',
      postspawn: 'Scattered and sulky for a week or two, then set up on the first break outside the spawning area. A slip-bobber or lindy rig with a leech beats a crankbait right now.',
      summer: 'Deep edge by day — 25–35 ft on clear lakes, much less on stained — sliding up onto wind-blown points and shallow flats at dusk. Troll or drift the break in daylight; cast the shallows in the last hour and after dark.',
      fall: 'Big-fish season. Walleye follow bait to steep breaks and main-lake points and feed hardest in the afternoon. Go up in size: a 4–5 in swimbait or a large stickbait pulled slowly.'
    },
    Largemouth: {
      core: 'Largemouth are an ambush fish: they want something at their back. Every cast should end up against, under or through cover, not near it.',
      cold: 'They pull tight to the steepest cover and hardly move. A jig or a blade bait worked vertically with long pauses; bites come as weight, not a thump.',
      spring: 'Stage on the first drop outside the spawning pockets and push shallow on warm sunny afternoons. Work north and northwest banks first. A lipless crankbait to find them, a jig to catch them.',
      postspawn: 'Females suspend off the beds and around the first deep cover while males guard fry in the shallows. A slow-rolled swimbait over the fry, or a wacky-rigged stick bait dropped into shade.',
      summer: 'Two populations: shallow fish buried in the thickest mats and deep fish on main-lake ledges. Punch the mats early and late; drag a jig or deep crankbait on the structure through the middle of the day.',
      fall: 'They chase in fall. A squarebill, spinnerbait or swim jig covering water beats a slow bait. Where shad flicker, cast — the bass are underneath.'
    },
    Smallmouth: {
      core: 'Smallmouth live where crayfish live: hard bottom, rock and current. Find the rock and you have found the fish, on almost any water in their range.',
      cold: 'They stack in wintering holes — the deepest hard bottom near the main basin — in tight schools. Find one and you find fifty. A blade bait or hair jig, barely moving.',
      spring: 'Staging on rock and gravel in 8–15 ft next to spawning flats. A suspending jerkbait with pauses long enough to feel silly (count to ten) is the best cold-water smallmouth bait there is.',
      postspawn: 'Guarding fry near the beds, then out to the first deep rock. Topwater at first and last light for the aggressive ones, a drop-shot for the rest.',
      summer: 'Main-lake rock piles, reefs and current, often 20–35 ft in clear water. Tube, Ned rig, drop-shot — and don\'t be afraid to go deeper than feels right.',
      fall: 'They herd bait on points and reefs and feed in short violent bursts. Blade baits and jerkbaits, with a topwater ready for when they push bait to the surface.'
    },
    Pike: {
      core: 'Use a steel or heavy fluorocarbon leader. A pike will cut straight mono, and losing that fish is entirely avoidable.',
      cold: 'Slow but still eating big. A dead smelt or sucker on a quick-strike rig, on a shallow flat next to deep water. Movement is optional; size is not.',
      spring: 'Pike spawn first, in the shallowest, warmest, marshiest bays, and stay there feeding for weeks after. Fish the backs of dark-bottom bays in 2–6 ft with a spinnerbait or a suspending jerkbait.',
      postspawn: 'Off the spawning bays and onto the first weed edge outside them. Cast parallel to the weed line, not into it.',
      summer: 'Summer splits them: small pike stay in the weeds, big ones go deep and cool. For a big one in August, fish the deep weed edge, a main-lake bar or below the thermocline — with a bait too large for the hammer-handles.',
      fall: 'The best big-pike window of the year. They gorge on the largest bait in the lake before winter. Big soft swimbaits, big spoons, or dead-bait along steep breaks.'
    },
    Musky: {
      core: 'Musky are a numbers game measured in hours, not casts. Figure-eight at the boat on every single cast — a large share of musky eat in the last three feet.',
      cold: 'Deep and slow. Big soft plastics worked painfully slowly on steep breaks, or a sucker under a float. Cold hands, few bites, and the biggest fish of the year.',
      spring: 'Early-season musky hold in the warmest shallow water in the lake, often the same bays the pike used. Downsize — a 5-inch bait beats a 12-inch one in cold water — and fish it slow.',
      postspawn: 'Recovering and neutral. Bucktails over shallow weed flats at a moderate clip; keep moving until one shows itself, then work that spot properly.',
      summer: 'Weed edges, points and bars, feeding in short windows tied to the moon and low light. Burn a bucktail through the bright hours to trigger reaction strikes, and slow down at dusk.',
      fall: 'The famous fall bite. As water falls through the 50s they move to steep structure and eat the biggest thing they can find — big rubber, glide baits, live suckers. This is when the giants come.'
    },
    Panfish: {
      core: 'Small is the whole trick. A 1/32 oz jig with a scrap of worm out-fishes anything bigger on nine days out of ten, and light line matters more than it does for any other fish here.',
      cold: 'Just off the bottom in the deepest basin holes. A tungsten jig, a tiny plastic or a waxworm, and 2 lb line rather than 6.',
      spring: 'Bluegill and sunfish bed in colonies on shallow hard bottom once the water reaches the mid-60s — in clear water the round craters are visible from shore. A tiny jig or a worm under a float, and nearly every cast is a bite.',
      postspawn: 'Off the beds and onto the weed edge, suspended. A small jig fished 2–4 ft down along the outside grass line.',
      summer: 'Suspended off deep weed edges and around docks; perch stay on the bottom over sand and gravel. Fish vertically once you find the depth — they hold in a narrow band.',
      fall: 'Schooled hard and tight on the deep edge. When you find one you are on a hundred — mark the spot before you cast again.'
    },
    Crappie: {
      core: 'Crappie feed upward and almost never down. Whatever depth they are holding at, keep every bait just above it — a foot too deep is the difference between a limit and nothing.',
      cold: 'Stacked in the deepest brush and standing timber, barely moving. Vertical, tiny and slow, presented just above them.',
      spring: 'The best crappie fishing of the year: into 2–6 ft of brush, laydowns and shallow bays as water hits the low 60s. A small jig under a float, held dead still over any wood you can find.',
      postspawn: 'Back to the first brush pile or bridge piling in 8–15 ft, suspended. Find the exact depth and stay on it.',
      summer: 'Suspended over open water and around deep brush and bridges — and they feed better under a light at night than they do at noon. Long-line jigs or troll small cranks until you find the depth.',
      fall: 'Chasing shad into the creeks and anywhere in the water column. Cover water with a small swimbait until you contact a school.'
    },
    LakeTrout: {
      core: 'Lake trout are a temperature fish before they are a structure fish. Find water colder than about 52°F and you have narrowed the lake to the part that can hold them.',
      cold: 'Under the ice they roam. Jig a white tube or a big spoon aggressively off the bottom over deep structure — the aggressive fish come to the noise.',
      spring: 'Right after ice-out they are shallow, sometimes in 10 ft, and catchable from shore. Cast spoons and stickbaits on rocky points before the surface warms past the mid-40s.',
      postspawn: 'As the surface warms they slide out and down. Follow the 50°F line and troll the first steep break off the main basin.',
      summer: 'Below the thermocline, often 60–120 ft. Downriggers, lead core or a heavy vertical jig over the deepest structure. There is no shortcut — you have to get down to them.',
      fall: 'They spawn on shallow rocky reefs and cobble and become reachable again. In most places they are protected while doing it, so read the regulations before you go.'
    },
    StreamTrout: {
      core: 'Trout face upstream and hold where they get the most food for the least effort. Put the bait upstream and let the current bring it to them — a natural drift beats any retrieve.',
      cold: 'They sit in the slowest, deepest water and eat almost nothing. Drift a small nymph or egg pattern right along the bottom of the deepest pool and expect a very soft take.',
      spring: 'Runoff colors the water and pushes trout to the edges and slack where they can hold without fighting current. Fish the seams and inside bends with something they can find — bright, dark or vibrating.',
      postspawn: 'As flows settle they move back into the runs and the heads of pools. Match a hatch if you can see one; if not, a small nymph drifted dead along the bottom takes fish every day of the year.',
      summer: 'They need cold, oxygenated water: riffles, springs, shade and the mouths of cold tributaries. Above about 68°F, fish early or fish somewhere colder — trout released from warm water often don\'t survive.',
      fall: 'Aggressive and territorial ahead of spawning. Streamers swung across and down provoke the biggest fish of the year — and watch for closed water, since many streams protect spawning fish in fall.'
    },
    Catfish: {
      core: 'Catfish hunt by scent on a current. Anchor upstream or up-wind of the hole and let the smell drift down to them, rather than dropping bait on their heads.',
      cold: 'Piled into the deepest hole in the system, barely moving. Put the bait on the bottom, right on their nose, and wait. Slow bite, big fish.',
      spring: 'Feeding heavily on flats next to deep holes as the water climbs through the 60s. Cut bait on the bottom, best in the last hour of light and after dark.',
      postspawn: 'Spawning cats move into holes, undercut banks and any cavity they can get into, and stop eating while guarding. Fish the flats and channel edges around them instead.',
      summer: 'Prime time. Channel cats roam flats and creek mouths at night; flatheads sit in log jams and deep holes and want live bait, not cut. Fish after dark and fish the current.',
      fall: 'Feeding hard on the biggest bait available and schooling in the deeper holes. Larger cut bait at the head and tail of the hole.'
    }
  };

  /* ---- Light. Not "morning and evening" but the actual computed twilight
     boundaries for this spot, so it's right at every latitude and season. ---- */
  function lightPhase(now, sun) {
    var t = now.getTime();
    var g = function (x) { return x ? x.getTime() : null; };
    var dawn = g(sun.dawn), rise = g(sun.sunrise), set = g(sun.sunset), dusk = g(sun.dusk), noon = g(sun.solarNoon);
    var H = 3600000;
    if (rise == null || set == null) {
      return { key: 'polar', label: sun.sunrise ? 'continuous daylight' : 'continuous darkness', bonus: 0 };
    }
    if (dawn != null && t >= dawn && t < rise) return { key: 'predawn', label: 'first light', bonus: 16 };
    if (t >= rise && t < rise + 1.25 * H) return { key: 'goldenAM', label: 'the golden hour after sunrise', bonus: 14 };
    if (t >= rise + 1.25 * H && noon != null && t < noon - 1.5 * H) return { key: 'morning', label: 'mid-morning', bonus: 3 };
    if (noon != null && t >= noon - 1.5 * H && t < noon + 1.5 * H) return { key: 'midday', label: 'the bright middle of the day', bonus: -7 };
    if (t >= set - 1.5 * H && t < set) return { key: 'goldenPM', label: 'the last hours of light', bonus: 15 };
    if (dusk != null && t >= set && t < dusk) return { key: 'dusk', label: 'dusk', bonus: 16 };
    if (t < rise || (dusk != null && t >= dusk)) return { key: 'night', label: 'after dark', bonus: 6 };
    return { key: 'afternoon', label: 'the afternoon', bonus: 2 };
  }

  var LIGHT_CALL = {
    predawn: { title: 'First light is an appointment, not a preference', body: 'The half hour before sunrise is the single most productive block on most waters. Fish are shallow, they can see well enough to hunt, and nothing can see them. Be on your best spot now — not driving to it.' },
    goldenAM: { title: 'The window is open — fish shallow while it lasts', body: 'Fish hold on the flats and against cover while the light stays low. Roughly 45 minutes after sunrise most of them slide back to the first drop. Topwater, moving baits, and speed: cover the shallow water before it empties.' },
    morning: { title: 'Fish the transition, not the shallows', body: 'The shallow bite is winding down. Work the first depth change out from where they fed at dawn — the weed edge, the lip of the flat, the drop off the point — and slow down a step from what worked at sunrise.' },
    midday: { title: 'Shade and depth — those are the two answers', body: 'Bright overhead sun pushes fish to the shaded side of docks, laydowns and weed walls, and out to the first serious break. Pitch into shade rather than casting past it, and use the bright hours to find structure worth returning to at dusk.' },
    afternoon: { title: 'Rebuild toward the evening window', body: 'The afternoon is the quietest stretch of most days. Use it to work deeper structure and to position yourself so you are standing on your best spot before the light goes — the last hour is worth more than the four before it.' },
    goldenPM: { title: 'The evening window is opening — go to your best water now', body: 'As the sun drops, fish move up and out of cover and hunt in the open. This is the highest-percentage hour of the afternoon on almost any water. Start shallow and work out, not the other way round.' },
    dusk: { title: 'Prime time. Do not leave', body: 'The half hour after sunset regularly out-produces the whole afternoon. Walleye, catfish, big bass and musky all feed in it. Fish the shallow flats next to deep water, and stay until you genuinely cannot see your line.' },
    night: { title: 'After dark is a real pattern, not a consolation prize', body: 'Walleye, catfish, crappie under a light, and big bass all feed at night. Fish shallow flats and points adjacent to deep water, use dark or noisy baits, and move slowly and quietly — sound carries and fish are close.' },
    polar: { title: 'The sun is not setting the schedule here', body: 'At this latitude and date the usual dawn and dusk logic does not apply. Fall back on the solunar windows below, on wind and cloud, and on the coldest, most oxygenated water you can find.' }
  };

  /* ---- Wind. Compass helpers so we can name the shore the wind is stacking
     food against — the most reliably useful, least-used piece of information
     on a lake. ---- */
  var COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  function compassOf(deg) {
    if (deg == null || !isFinite(deg)) return null;
    return COMPASS[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16];
  }

  function windCall(w, river) {
    if (!w || w.windKmh == null) return null;
    var mph = w.windKmh * 0.621371;
    var from = compassOf(w.windDir);
    var into = compassOf(w.windDir == null ? null : (w.windDir + 180) % 360);
    var where = (from && into) ? ' Today it is out of the ' + from + ', so the ' + into + ' shore, and every point on that side, is the windward bank.' : '';
    if (mph < 2) {
      return { tag: 'WIND', w: 62, title: 'Dead calm — the hardest condition to beat', body: 'Glass water and no chop means fish can see line, boat, shadow and everything wrong with your presentation. Go lighter, cast farther, use natural colours, and put your effort into the first and last hour of light where the low light does the work the wind is not doing.' };
    }
    if (mph <= 16) {
      return { tag: 'WIND', w: 74, title: 'Usable wind — fish the bank it is blowing into', body: 'A chop is a gift. Wind stacks plankton against the downwind shore, baitfish follow the plankton, and predators follow the bait; the broken surface also hides you completely.' + where + ' Set up so you are casting with the wind if you can — you will cast farther and feel more.' };
    }
    if (mph <= 24) {
      return { tag: 'WIND', w: 68, title: 'Strong wind — pick your side of the lake carefully', body: 'This is enough wind to fish well and enough to make boat control the limiting factor. The windward points and the mud line where the waves stir the bottom will hold the most active fish in the lake right now; the protected side is where you fish if you can\'t hold position on them.' + where };
    }
    return { tag: 'SAFETY', w: 96, title: 'Too much wind to fish this safely in a small boat', body: 'Above about 25 mph, boat control and waves stop being an inconvenience and start being the risk. Fish the lee shore, fish from the bank, or go another day.' + (river ? ' On moving water, high wind plus current is worse than either alone.' : ' The wind-blown points will still be there tomorrow.') };
  }

  function pressureCall(w) {
    if (!w) return null;
    var delta = w.trendDelta != null ? (w.trendDelta >= 0 ? '+' : '') + w.trendDelta + ' hPa over 3h' : null;
    if (w.trend === 'falling') {
      return { tag: 'PRESSURE', w: 90, title: 'Falling pressure — this is the day to move fast and fish big', body: 'Fish feed hard ahead of a front and, more importantly, they chase' + (delta ? ' (' + delta + ')' : '') + '. Use bigger, louder, faster baits, fish higher in the water column, and cover water instead of grinding one spot. The window usually closes when the rain actually arrives, so use it now rather than later.' };
    }
    if (w.trend === 'rising') {
      return { tag: 'PRESSURE', w: 88, title: 'Post-front, rising pressure — tight to cover and slow', body: 'This is the classic bluebird day after a front' + (delta ? ' (' + delta + ')' : '') + '. Fish pull into the thickest cover they can find and will not move for a bait. Downsize, slow down to the point of boredom, and put the bait inside the cover — pitch it in rather than casting past it. Expect to work for every bite and to fish deeper than you did yesterday.' };
    }
    return { tag: 'PRESSURE', w: 60, title: 'Steady pressure — location beats presentation today', body: 'No weather bonus and no weather penalty' + (delta ? ' (' + delta + ')' : '') + '. Days like this reward the angler who finds the right structure over the one with the clever bait. Fish the percentages: the best spots, at the best times, with what normally works here.' };
  }

  function skyCall(w) {
    if (!w) return null;
    if (/Thunder/i.test(w.sky)) {
      return { tag: 'SAFETY', w: 99, title: 'Thunderstorms — a graphite rod is a lightning rod', body: 'Get off the water and away from the shore about thirty minutes before it reaches you, and stay off for thirty after the last thunder. Fish often feed hard in the hour before a storm, and that hour is still not worth it.' };
    }
    if (/rain|drizzle|shower/i.test(w.sky)) {
      return { tag: 'SKY', w: 76, title: 'Rain on the water is an advantage, not a problem', body: 'Rain breaks up the surface, dulls the light, washes food in, and turns on every creek mouth, culvert and inflow on the water. Fish the inflows and the stained edge where dirty water meets clean, and keep moving baits in the water — fish are looking up and out.' };
    }
    if (w.cloud != null && w.cloud >= 65) {
      return { tag: 'SKY', w: 70, title: 'Overcast keeps fish roaming — cover water', body: 'Under heavy cloud fish do not need cover to feel safe, so they use the whole flat instead of hugging a stump. That makes this a moving-bait day: spinnerbait, swimbait, crankbait, chatterbait. Fan-cast open water you would normally run past.' };
    }
    if (w.cloud != null && w.cloud <= 20) {
      return { tag: 'SKY', w: 58, title: 'Clear and bright — everything tightens up', body: 'Bright sun makes fish hold hard against cover and drop deeper, and it makes them see your line. Fish shade lines deliberately, go lighter and more natural, and put your best hours at the two ends of the day.' };
    }
    return null;
  }

  function tempCall(w) {
    if (!w || w.tempC == null) return null;
    var f = w.tempC * 9 / 5 + 32;
    var note = ' (that\'s air temperature — water lags it by days to weeks, and the water is what the fish feel.)';
    if (f < 40) return { tag: 'TEMP', w: 66, title: 'Cold-water rules apply', body: 'At this air temperature the water is cold enough that fish metabolism has dropped right off. Small baits, long pauses, vertical presentations, and the deepest structure you can reach.' + note };
    if (f < 55) return { tag: 'TEMP', w: 60, title: 'Cool water — the jerkbait and jig window', body: 'This is the range where a suspending jerkbait with very long pauses, a slow-rolled blade, or a jig dragged on the bottom out-fishes everything faster. Fish still eat well here; they just will not chase far.' + note };
    if (f < 72) return { tag: 'TEMP', w: 52, title: 'The comfortable band — fish are willing', body: 'This is the range where fish are most catchable on the widest variety of presentations. Fish your confidence baits, cover water, and let the fish tell you how fast they want it.' + note };
    if (f < 86) return { tag: 'TEMP', w: 56, title: 'Warm — fish early, late, and where the water moves', body: 'Warm water holds less oxygen and pushes fish toward current, springs, inflows, deep water and shade. The middle of the day gets progressively worse; the first and last hours get better.' + note };
    return { tag: 'TEMP', w: 72, title: 'Hot — oxygen is the limiting factor now', body: 'In this heat the fish are in the coolest, most oxygenated water available: below the thermocline, in current, at inflows and springs, or under heavy shade. Fish at night if you can. Handle and release fish fast — warm-water release mortality is real.' + note };
  }

  function rainCall(w, river) {
    if (!w || w.rain12h == null || w.rain12h < 1) return null;
    var mm = Math.round(w.rain12h * 10) / 10;
    var amount = isMetric() ? mm + ' mm' : (Math.round(mm / 25.4 * 100) / 100) + ' in';
    if (river) {
      return { tag: 'WATER', w: 84, title: amount + ' of rain in the last 12 hours — expect the river to rise and colour', body: 'Rising, stained water pushes fish out of the main current and onto the banks, into the slack behind every obstruction, and up into the newly flooded edges. Fish closer to shore than you would normally, use something they can find by vibration or silhouette, and check the gauge before you wade — the level you see is not the level in an hour.' };
    }
    return { tag: 'WATER', w: 74, title: amount + ' of rain in the last 12 hours — fish the inflows', body: 'Runoff turns on every creek mouth, culvert and ditch on the lake: it brings food, oxygen and colour, and predators set up on the mud line where the dirty water meets the clean. That seam is the single best piece of water on the lake right now.' };
  }

  function moonCall(sol, light) {
    if (!sol) return null;
    var pct = Math.round(sol.illumination.fraction * 100);
    var strong = sol.rating.phaseStrength > 0.72;
    if (!strong) return null;
    if (pct > 60) {
      return { tag: 'MOON', w: 54, title: 'Bright moon — expect the night bite to take a share of the day bite', body: 'At ' + pct + '% illumination fish feed well after dark, which often means a slower start at sunrise and a later, stronger evening. If you can fish the night, do; if you can\'t, put your effort into the last hours of light rather than the first.' };
    }
    return { tag: 'MOON', w: 50, title: 'Dark moon — daylight low-light windows carry more weight', body: 'At ' + pct + '% illumination there is little night feeding, so dawn and dusk do more of the work and fish rely more on vibration and scent than sight. Noisy baits, dark silhouettes, and slower presentations after the sun goes.' };
  }

  /* ---- Windows. Which solunar period is live, or how far off the next one is.
     A guide's whole day is built around being in the right place before one of
     these opens, rather than reacting once it has. ---- */
  function windowStatus(sol, now) {
    if (!sol) return null;
    var all = sol.majors.map(function (m) { return { w: m, major: true }; })
      .concat(sol.minors.map(function (m) { return { w: m, major: false }; }))
      .sort(function (a, b) { return a.w.center - b.w.center; });
    var t = now.getTime();
    var live = null, next = null;
    all.forEach(function (e) {
      if (t >= e.w.start.getTime() && t <= e.w.end.getTime()) { if (!live) live = e; }
      else if (e.w.start.getTime() > t && !next) next = e;
    });
    if (live) return { live: true, major: live.major, w: live.w, minsLeft: Math.round((live.w.end - t) / 60000) };
    if (next) return { live: false, major: next.major, w: next.w, minsAway: Math.round((next.w.start - t) / 60000) };
    return { live: false, none: true };
  }

  function fmtMins(m) {
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), mm = m % 60;
    return h + 'h' + (mm ? ' ' + mm + 'm' : '');
  }

  function windowCall(ws) {
    if (!ws) return null;
    if (ws.none) {
      return { tag: 'TIMING', w: 64, title: 'No solunar window left today', body: 'Both the majors and minors have passed. That does not mean the fish are done — it means the clock is no longer helping you, so fall back on light, wind and structure and fish the best water you have.' };
    }
    if (ws.live) {
      return {
        tag: 'TIMING', w: 95,
        title: 'You are in a ' + (ws.major ? 'major' : 'minor') + ' window right now — ' + fmtMins(ws.minsLeft) + ' left',
        body: (ws.major ? 'Moon ' + ws.w.label.toLowerCase().replace('moon ', '') + ', the stronger of the two daily peaks. ' : ws.w.label + ', a shorter secondary peak. ') +
          'Spend it on the single best piece of structure you have, worked thoroughly — not running between spots. If you were going to change baits or move, do it after ' + fmtClock(ws.w.end) + ', not now.'
      };
    }
    var soon = ws.minsAway <= 45;
    return {
      tag: 'TIMING', w: soon ? 92 : 80,
      title: 'Next window: ' + ws.w.label.toLowerCase() + ' in ' + fmtMins(ws.minsAway) + ' (' + fmtClock(ws.w.start) + '–' + fmtClock(ws.w.end) + ')',
      body: (soon ? 'That is close enough to plan around: be standing on your best spot before it opens rather than moving toward it. ' : 'Work your way toward your best water so you are set up on it when it opens. ') +
        'Guides do not fish the window — they are already in position for it. The ' + (ws.major ? 'major' : 'minor') + ' windows are worth about ' + (ws.major ? 'two hours' : 'an hour') + ', and the first twenty minutes are usually the best of it.'
    };
  }

  /* ---- Where to start: the top-priority structures for this species on this
     water type, straight from the same table the read-the-water diagram draws. ---- */
  function structureCall(spKey, river) {
    var table = river ? RIVER_SPECIES_SPOTS : SPECIES_SPOTS;
    var spots = river ? RIVER_SPOTS : WATER_SPOTS;
    var set = table[spKey] || table.General;
    if (!set) return null;
    var prime = [];
    set.notes.forEach(function (n, i) { if (n.tier === 3 && spots[i]) prime.push({ name: spots[i].name, why: n.why }); });
    if (!prime.length) {
      set.notes.forEach(function (n, i) { if (n.tier === 2 && spots[i] && prime.length < 2) prime.push({ name: spots[i].name, why: n.why }); });
    }
    if (!prime.length) return null;
    return {
      tag: 'WHERE', w: 78,
      title: 'Start here: ' + prime.map(function (p) { return p.name; }).join(', '),
      body: prime.map(function (p) { return p.name + ' — ' + p.why; }).join(' ') +
        ' Work these before anything else on the water; if two of them touch each other, that intersection is the first cast of the day.'
    };
  }

  /* ---- What to tie on, chosen from the gear the angler actually owns, matched
     to the conditions. Falls back to the report's own lure list. ---- */
  function tackleCall(w, light, river) {
    var want, why;
    var fast = w && (w.trend === 'falling' || (w.cloud != null && w.cloud >= 65) || (w.windKmh != null && w.windKmh * 0.621371 >= 6));
    var slow = w && w.trend === 'rising';
    var lowLight = light && (light.key === 'predawn' || light.key === 'goldenAM' || light.key === 'goldenPM' || light.key === 'dusk');

    if (lowLight && !slow) { want = /topwater|popper|walk|frog|buzz|prop|spook/i; why = 'Low light is the only time a fish will commit to something on the surface, and a surface strike sorts the aggressive fish out of the school immediately.'; }
    else if (slow) { want = /jig|ned|drop.?shot|worm|senko|stick|tube|craw|finesse|live|minnow|leech|nightcrawler/i; why = 'Post-front fish will not chase, so the bait has to arrive slowly, land in the cover, and stay there long enough to be worth eating.'; }
    else if (fast) { want = /spinner|chatter|crank|swimbait|blade|jerk|lipless|rattle|spoon|bucktail/i; why = 'Active fish and reduced visibility both favour a bait that puts out vibration and covers water — you are looking for the willing fish, not convincing an unwilling one.'; }
    else { want = /jig|crank|spinner|swimbait|worm|jerk/i; why = 'Nothing in the conditions is pushing hard either way, so fish a bait you have confidence in and let the fish set the pace.'; }

    var mine = ownedLures().filter(function (g) { return want.test(g.name) || want.test(g.detail || ''); });
    var fromReport = (state.data && Array.isArray(state.data.lures) ? state.data.lures : []).filter(function (l) { return want.test(l.name); });
    var pick = mine.length ? mine.map(function (g) { return g.name; }) : fromReport.map(function (l) { return l.name; });
    if (!pick.length) return null;
    return {
      tag: 'TIE ON', w: 82,
      title: (mine.length ? 'From your gear locker: ' : 'From this water\'s list: ') + pick.slice(0, 3).join(', '),
      body: why + (river ? ' On moving water, cast up and across and let it come back with the current rather than dragging it against the flow.' : '')
    };
  }

  /* ---- Your own log. The most valuable advice in the app, because it is the
     only part drawn from what has actually happened to you on this water. ---- */
  function logCall() {
    var here = catchesHere();
    if (here.length < 3) return null;
    var byLure = {}, byTrend = {}, byBand = {};
    here.forEach(function (c) {
      if (c.lure) byLure[c.lure] = (byLure[c.lure] || 0) + 1;
      if (c.pressureTrend) byTrend[c.pressureTrend] = (byTrend[c.pressureTrend] || 0) + 1;
      var h = new Date(c.date).getHours();
      var band = h < 9 ? 'early morning' : h < 15 ? 'the middle of the day' : h < 20 ? 'the evening' : 'after dark';
      byBand[band] = (byBand[band] || 0) + 1;
    });
    var top = function (o) {
      var best = null;
      Object.keys(o).forEach(function (k) { if (!best || o[k] > o[best]) best = k; });
      return best ? { key: best, n: o[best] } : null;
    };
    var lure = top(byLure), trend = top(byTrend), band = top(byBand);
    var bits = [];
    if (lure && lure.n >= 2) bits.push(lure.n + ' of your ' + here.length + ' fish here came on ' + lure.key);
    if (band && band.n >= 2) bits.push(band.n + ' of them in ' + band.key);
    if (trend && trend.n >= 2) bits.push(trend.n + ' on ' + trend.key + ' pressure');
    if (!bits.length) return null;
    return {
      tag: 'YOUR LOG', w: 86,
      title: 'What has actually worked for you on this water',
      body: bits.join(', ') + '. That is a small sample, so treat it as a starting point rather than a law — but it beats general advice, and it gets better every fish you log.'
    };
  }

  function riverCall(river) {
    if (!river) return null;
    return {
      tag: 'CURRENT', w: 79,
      title: 'Current does the job wind does on a lake — read the seams',
      body: 'Fish face upstream and hold in slow water beside fast water, so they spend nothing and eat everything the current delivers. Every boulder, bridge piling, log jam, inside bend and eddy line is a fish holding at low cost. Cast upstream of where you think one is and let the bait arrive naturally — a bait dragged against the current looks wrong to everything in the river.'
    };
  }

  /* ---- The right-now score. Same inputs as the hourly bite forecast, plus the
     solunar window and the light phase, so the number on the dashboard and the
     advice under it can never disagree. ---- */
  function nowScore(sol, ws, w, light) {
    var s = 46;
    if (sol) s += (sol.rating.stars - 2) * 5;
    if (ws && ws.live) s += ws.major ? 15 : 9;
    else if (ws && !ws.none && ws.minsAway <= 45) s += ws.major ? 8 : 5;
    if (light) s += light.bonus;
    if (w) {
      s += w.trend === 'falling' ? 10 : w.trend === 'rising' ? -9 : 2;
      var mph = w.windKmh != null ? w.windKmh * 0.621371 : null;
      if (mph != null) s += (mph >= 4 && mph <= 16) ? 8 : mph > 24 ? -13 : mph < 2 ? -4 : 2;
      if (w.cloud != null) s += (w.cloud >= 40 && w.cloud <= 92) ? 5 : 0;
      if (/thunder/i.test(w.sky)) s -= 8;
      if (/rain|drizzle|shower/i.test(w.sky)) s += 4;
    }
    return Math.max(12, Math.min(97, Math.round(s)));
  }

  function verdictFor(score) {
    if (score >= 78) return { label: 'Prime — go now', tier: 'prime' };
    if (score >= 63) return { label: 'Good — worth the trip', tier: 'good' };
    if (score >= 48) return { label: 'Fair — fish the windows', tier: 'fair' };
    return { label: 'Slow — earn it', tier: 'slow' };
  }

  /* The brief itself: everything above, assembled, prioritised and trimmed. */
  function guruBrief() {
    var d = state.data;
    if (!d) return null;
    var now = new Date();
    var sol = solunarForReport();
    var c = coordsFor(d);
    var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
    var river = state.waterType === 'river';
    var spKey = activeSpeciesKey(d);
    var ws = windowStatus(sol, now);
    var light = sol ? lightPhase(now, sol.sun) : null;
    var calendarSeason = c ? seasonFor(now, c.lat) : null;
    // Water temperature says how far into a season we are; the calendar says
    // which half of the year it is. Together they beat either alone.
    var season = refineSeason(calendarSeason, waterTempC());
    var bucket = season ? SEASON_BUCKET[season] : null;
    var play = SPECIES_PLAY[spKey] || SPECIES_PLAY.General;
    var speciesLabel = ((river ? RIVER_SPECIES_SPOTS : SPECIES_SPOTS)[spKey] || {}).label || 'Any species';

    var calls = [];
    var push = function (call) { if (call) calls.push(call); };

    push(skyCall(w));                 // safety first, by weight
    push(windCall(w, river));
    push(windowCall(ws));
    push(pressureCall(w));
    push(logCall());
    push(rainCall(w, river));
    push(tackleCall(w, light, river));
    push(riverCall(river));
    push(structureCall(spKey, river));

    if (light && LIGHT_CALL[light.key]) {
      push({ tag: 'LIGHT', w: 75 + Math.max(0, light.bonus) / 2, title: LIGHT_CALL[light.key].title, body: LIGHT_CALL[light.key].body });
    }
    if (season && SEASON_CALL[season]) {
      push({ tag: 'SEASON', w: 72, title: SEASON_CALL[season].title, body: SEASON_CALL[season].body });
    }
    if (bucket && play[bucket]) {
      push({ tag: speciesLabel.toUpperCase(), w: 87, title: (SEASON_CALL[season] ? SEASON_CALL[season].label : 'Right now') + ' — ' + speciesLabel.toLowerCase(), body: play[bucket] });
    }
    if (play.core) {
      push({ tag: 'FUNDAMENTALS', w: 64, title: 'The one thing to get right with ' + speciesLabel.toLowerCase(), body: play.core });
    }
    push(waterTempCall(spKey, speciesLabel));
    push(tempCall(w));
    push(moonCall(sol, light));

    calls.sort(function (a, b) { return b.w - a.w; });

    var score = nowScore(sol, ws, w, light);
    var verdict = verdictFor(score);

    // One sentence naming the two or three things actually driving the number.
    var drivers = [];
    if (ws && ws.live) drivers.push('a ' + (ws.major ? 'major' : 'minor') + ' feeding window is open');
    else if (ws && !ws.none && ws.minsAway <= 90) drivers.push('a window opens in ' + fmtMins(ws.minsAway));
    if (w && w.trend !== 'steady') drivers.push(w.trend + ' pressure');
    if (light && light.bonus >= 12) drivers.push('you are in ' + light.label);
    else if (light && light.bonus <= -5) drivers.push('it is ' + light.label);
    if (w && w.windKmh != null) {
      var mph = w.windKmh * 0.621371;
      if (mph > 24) drivers.push('too much wind');
      else if (mph >= 4 && mph <= 16) drivers.push('a workable chop');
      else if (mph < 2) drivers.push('flat calm');
    }
    if (!drivers.length && sol) drivers.push('a ' + sol.rating.label.toLowerCase() + ' solunar day');
    var headline = drivers.length
      ? drivers.slice(0, 3).join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'
      : 'Not enough live data to call it — fish the windows and the structure.';
    headline = headline.charAt(0).toUpperCase() + headline.slice(1);

    var basis = [];
    if (sol) basis.push('sun and moon computed on this device for ' + sol.coords.lat.toFixed(3) + ', ' + sol.coords.lon.toFixed(3));
    if (w) basis.push('live weather'); else basis.push('no live weather right now');
    if (season) {
      basis.push(SEASON_CALL[season].label.toLowerCase() +
        (waterTempC() != null ? ' by water temperature' : ' for this latitude') +
        (season !== calendarSeason && calendarSeason ? ' (the calendar alone would say ' + SEASON_CALL[calendarSeason].label.toLowerCase() + ')' : ''));
    }
    basis.push(river ? 'river/stream mode' : 'lake mode');
    basis.push(speciesLabel.toLowerCase());

    return {
      score: score, verdict: verdict, headline: headline, calls: calls,
      basis: basis.join(' · '), speciesLabel: speciesLabel,
      season: season, seasonLabel: season ? SEASON_CALL[season].label : null,
      windowStatus: ws, light: light, hasWeather: !!w
    };
  }

  /* ---- The guru, rendered. Same markup on the dashboard and inside the report
     so the two can never drift apart. ---- */
  function guruHtml(compact) {
    var b = guruBrief();
    if (!b) return '';
    var shown = (compact && !state.guruExpanded) ? b.calls.slice(0, 3) : b.calls;
    var html = '<div class="fa-guru">';
    html += '<div class="fa-guru-head">' +
      '<div class="fa-guru-score" data-tier="' + b.verdict.tier + '"><strong>' + b.score + '</strong><span>right now</span></div>' +
      '<div class="fa-guru-verdictwrap"><div class="fa-guru-verdict">' + esc(b.verdict.label) + '</div>' +
      '<div class="fa-guru-headline">' + esc(b.headline) + '</div></div></div>';
    html += '<div class="fa-guru-calls">' + shown.map(function (call) {
      return '<div class="fa-guru-call' + (call.tag === 'SAFETY' ? ' safety' : '') + '">' +
        '<div class="fa-guru-tag">' + esc(call.tag) + '</div>' +
        '<div class="fa-guru-title">' + esc(call.title) + '</div>' +
        '<div class="fa-guru-body">' + esc(call.body) + '</div></div>';
    }).join('') + '</div>';
    if (compact && b.calls.length > 3) {
      html += '<button class="fa-toggle-btn on-light" data-action="toggle-guru">' +
        (state.guruExpanded ? 'Show fewer' : 'Show all ' + b.calls.length + ' calls') + '</button>';
    }
    html += '<div class="fa-fineprint">Read from ' + esc(b.basis) + '.' +
      (b.hasWeather ? '' : ' Live weather is unavailable, so the pressure, wind and sky calls are missing — the timing, season and species calls still stand.') +
      ' General angling knowledge applied to today\'s actual numbers, not a survey of this particular water.</div>';
    html += '</div>';
    return html;
  }

  function renderGuruSection() {
    return '<div class="fa-section"><div class="fa-section-label">The guide\u2019s call \u2014 right now</div><div id="fa-guru">' + guruHtml(true) + '</div></div>';
  }

  function paintGuru() {
    var host = document.getElementById('fa-guru');
    if (host) host.innerHTML = guruHtml(true);
  }

  /* ============================== FILES OUT ==============================
     The artifact build had a downloads capability; a hosted PWA doesn't, and
     doesn't need one — a Blob and an anchor is the whole mechanism. Without
     this the backup button was hidden in the PWA and there was no way to get
     your logbook off the device at all. */
  function saveTextFile(filename, text, mime) {
    if (downloadsFn) {
      return downloadsFn.save({ filename: filename, data: text })
        .then(function () { return true; });
    }
    return new Promise(function (resolve, reject) {
      try {
        var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 4000);
        resolve(true);
      } catch (e) { reject(e); }
    });
  }

  /* Every pin you have dropped, as GPX — the format every chartplotter, handheld
     GPS and mapping app reads. This is how your spots get onto the boat's unit
     instead of living only in a phone browser. */
  function pinsToGpx() {
    var when = new Date().toISOString();
    var out = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<gpx version="1.1" creator="Fishing Almanac" xmlns="http://www.topografix.com/GPX/1/1">\n' +
      '  <metadata><name>Fishing Almanac spots</name><time>' + when + '</time></metadata>\n';
    var count = 0;
    Object.keys(state.mapPins || {}).forEach(function (water) {
      (state.mapPins[water] || []).forEach(function (pin) {
        if (typeof pin.lat !== 'number' || typeof pin.lon !== 'number') return;
        count++;
        var name = pin.label.replace(/^★\s*/, '') + ' — ' + water;
        var desc = [pin.note || '', pin.accuracy != null ? 'GPS ±' + pin.accuracy + ' m' : '']
          .filter(Boolean).join(' · ');
        out += '  <wpt lat="' + pin.lat.toFixed(6) + '" lon="' + pin.lon.toFixed(6) + '">\n' +
          '    <name>' + escXml(name) + '</name>\n' +
          (desc ? '    <desc>' + escXml(desc) + '</desc>\n' : '') +
          (pin.at ? '    <time>' + escXml(pin.at) + '</time>\n' : '') +
          '    <sym>' + (pin.kind === 'catch' ? 'Fishing Hot Spot Facility' : 'Flag, Blue') + '</sym>\n' +
          '  </wpt>\n';
      });
    });
    return { xml: out + '</gpx>\n', count: count };
  }

  function escXml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
  }

  function exportPinsGpx() {
    state.backupMessage = null; state.backupError = null;
    var built = pinsToGpx();
    if (!built.count) {
      state.backupError = 'No map pins to export yet — drop some on a water’s satellite map first.';
      render();
      return;
    }
    saveTextFile('fishing-almanac-spots-' + new Date().toISOString().slice(0, 10) + '.gpx', built.xml, 'application/gpx+xml')
      .then(function () {
        state.backupMessage = built.count + ' spot' + (built.count === 1 ? '' : 's') + ' exported as GPX — open it on a chartplotter, handheld GPS, Google Earth or any mapping app.';
        render();
      })
      .catch(function () { state.backupError = 'That download didn’t go through. Try again.'; render(); });
  }

  /* ============================== SHARING ==============================
     A spot or a day, sent to whoever you fish with. Uses the phone's own share
     sheet where there is one and falls back to the clipboard, so it works on a
     desktop browser too. */
  function shareOrCopy(title, text, done) {
    var finish = function (msg) { state.notice = msg; render(); };
    if (navigator.share) {
      navigator.share({ title: title, text: text }).then(function () {
        finish(done || 'Shared.');
      }).catch(function (e) {
        if (e && e.name === 'AbortError') return;      // they changed their mind
        copyToClipboard(text, finish);
      });
      return;
    }
    copyToClipboard(text, finish);
  }

  function copyToClipboard(text, finish) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function () { finish('Copied to the clipboard — paste it wherever you like.'); })
        .catch(function () { finish('Couldn’t copy that automatically. ' + text); });
      return;
    }
    finish(text);
  }

  function sharePin(pin) {
    var water = waterKey();
    var text = pin.label.replace(/^★\s*/, '') + ' — ' + water + '\n' +
      pin.lat.toFixed(5) + ', ' + pin.lon.toFixed(5) + '\n' +
      (pin.note ? pin.note + '\n' : '') +
      'https://www.google.com/maps/search/?api=1&query=' + pin.lat.toFixed(5) + ',' + pin.lon.toFixed(5);
    shareOrCopy('Fishing spot: ' + water, text, 'Spot shared.');
  }

  /* The day, in the form you'd text to someone: where, how good, when the
     windows are, and the two or three things that matter today. */
  function shareTheDay() {
    var b = guruBrief();
    if (!b || !state.data) return;
    var sol = solunarForReport();
    var lines = [state.data.waterBody + ' — ' + new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })];
    lines.push(b.verdict.label + ' (' + b.score + '/100). ' + b.headline);
    if (sol) {
      lines.push('');
      lines.push('Sunrise ' + fmtClock(sol.sun.sunrise) + ' · Sunset ' + fmtClock(sol.sun.sunset));
      sol.majors.concat(sol.minors).sort(function (a, x) { return a.center - x.center; }).forEach(function (win) {
        var major = sol.majors.indexOf(win) !== -1;
        lines.push((major ? 'MAJOR ' : 'minor ') + fmtClock(win.start) + '–' + fmtClock(win.end) + '  ' + win.label);
      });
    }
    lines.push('');
    b.calls.slice(0, 3).forEach(function (call) { lines.push('• ' + call.title); });
    lines.push('');
    lines.push('— Fishing Almanac');
    shareOrCopy(state.data.waterBody + ' — today', lines.join('\n'), 'Today’s plan shared.');
  }

  /* ============================== WATER TEMPERATURE ==============================
     Water temperature, not the calendar, is what actually moves fish — it sets
     the spawn, the metabolism and the depth. Nobody publishes lake surface
     temperature for arbitrary small waters, so this estimates it from the recent
     air temperature the forecast already gives us: water follows air with a lag
     of days, so an exponentially weighted mean of recent daily means gets close
     enough to be useful, and badly wrong in a few cases (very deep lakes, spring
     creeks, anything under ice).

     Which is exactly why you can overwrite it. If you have a gauge on the boat,
     type the real number and everything downstream uses that instead. */
  function estimateWaterTempC(daily, todayIdx) {
    if (!daily || !daily.length) return null;
    var means = [];
    for (var i = Math.max(0, todayIdx - 7); i <= todayIdx && i < daily.length; i++) {
      var m = daily[i].tmean;
      if (m == null && daily[i].tmax != null && daily[i].tmin != null) m = (daily[i].tmax + daily[i].tmin) / 2;
      if (m != null) means.push(m);
    }
    if (!means.length) return null;
    var sum = 0, weight = 0;
    means.forEach(function (m, i) {
      var w = Math.pow(0.8, means.length - 1 - i);   // most recent day counts most
      sum += m * w; weight += w;
    });
    var t = sum / weight;
    // Water can't chase air below freezing: an ice-covered lake sits just above
    // 0°C no matter how cold the air is, so the low end is compressed, not clipped.
    if (t < 4) t = 4 - (4 - Math.max(t, -25)) * 0.13;
    return Math.round(t * 10) / 10;
  }

  // Rising or falling water is often worth more than the number itself.
  function waterTrend(daily, todayIdx) {
    if (!daily || todayIdx < 5) return null;
    var mean = function (a, b) {
      var s = 0, n = 0;
      for (var i = a; i <= b && i < daily.length; i++) {
        var m = daily[i].tmean != null ? daily[i].tmean
          : (daily[i].tmax != null && daily[i].tmin != null ? (daily[i].tmax + daily[i].tmin) / 2 : null);
        if (m != null) { s += m; n++; }
      }
      return n ? s / n : null;
    };
    var recent = mean(todayIdx - 2, todayIdx), before = mean(todayIdx - 6, todayIdx - 3);
    if (recent == null || before == null) return null;
    var d = recent - before;
    return d > 1.2 ? 'warming' : d < -1.2 ? 'cooling' : 'steady';
  }

  function waterTempKey() { return waterKey() + '@' + new Date().toDateString(); }

  /* Your own reading wins, for the day you took it. */
  function measuredWaterTempC() {
    var row = (state.waterTemps || {})[waterKey()];
    if (!row || row.c == null) return null;
    var ageDays = (Date.now() - new Date(row.at).getTime()) / 86400000;
    if (ageDays > 3) return null;              // a four-day-old reading isn't today's water
    return row.c;
  }

  function waterTempC() {
    var mine = measuredWaterTempC();
    if (mine != null) return mine;
    var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
    return w && w.waterC != null ? w.waterC : null;
  }

  function waterTempSource() { return measuredWaterTempC() != null ? 'measured' : 'estimated'; }

  function dispWaterTemp() {
    var c = waterTempC();
    if (c == null) return null;
    return Math.round(isMetric() ? c : c * 9 / 5 + 32);
  }

  function saveWaterTemp() {
    var raw = parseFloat(state.waterTempDraft);
    if (!isFinite(raw)) { state.waterTempError = 'Type the temperature you measured.'; render(); return; }
    var c = isMetric() ? raw : (raw - 32) * 5 / 9;
    if (c < -2 || c > 45) { state.waterTempError = 'That’s outside anything a fishable water reaches. Check the number.'; render(); return; }
    state.waterTemps[waterKey()] = { c: Math.round(c * 10) / 10, at: new Date().toISOString() };
    lsSet('waterTemps', state.waterTemps);
    state.waterTempError = null;
    state.showWaterTemp = false;
    weekCache = { key: null, rows: null };
    render();
  }

  function clearWaterTemp() {
    delete state.waterTemps[waterKey()];
    lsSet('waterTemps', state.waterTemps);
    state.showWaterTemp = false;
    state.waterTempError = null;
    render();
  }

  function renderWaterTempRow() {
    var c = waterTempC();
    if (c == null && !state.showWaterTemp) return '';
    var measured = waterTempSource() === 'measured';
    if (!state.showWaterTemp) {
      var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
      var trend = (!measured && w) ? w.waterTrend : null;
      return '<div class="fa-watertemp">' +
        '<div><span class="fa-watertemp-value">' + dispWaterTemp() + '°' + tempUnit().replace('°', '') + '</span> water · ' +
        '<span class="fa-watertemp-src' + (measured ? ' measured' : '') + '">' + (measured ? 'your reading' : 'estimated from recent air temperature') + '</span>' +
        (trend && trend !== 'steady' ? ' · ' + trend : '') + '</div>' +
        '<button class="fa-toggle-btn on-light" data-action="open-water-temp">' + (measured ? 'Change' : 'Set actual') + '</button>' +
        '</div>';
    }
    return '<div class="fa-coord-editor">' +
      '<div class="fa-section-label" style="margin-bottom:10px">Water temperature at ' + esc(waterKey()) + '</div>' +
      '<div class="fa-field"><label>Surface temperature (' + tempUnit() + ')</label>' +
      '<input type="number" step="0.1" id="fa-watertemp-input" data-bind="waterTempDraft" value="' + esc(state.waterTempDraft) + '" placeholder="' + (isMetric() ? '14.5' : '58') + '"></div>' +
      (state.waterTempError ? '<div class="fa-error" style="margin-bottom:12px">' + esc(state.waterTempError) + '</div>' : '') +
      '<div class="fa-primary-row" style="margin-top:0"><button class="fa-btn" data-action="save-water-temp">Save reading</button>' +
      (measured ? '<button class="fa-btn-secondary" data-action="clear-water-temp">Go back to the estimate</button>' : '') +
      '<button class="fa-btn-secondary" data-action="close-water-temp">Cancel</button></div>' +
      '<div class="fa-fineprint">A real reading beats the estimate by a long way — it sets which season the advice below assumes, and the spawn windows are only a few degrees wide. Kept for three days, then the estimate takes over again.</div>' +
      '</div>';
  }

  /* Water temperature tells you how far into a season you are; the calendar
     tells you which half of the year you're in. Neither alone is enough — 12°C
     happens twice a year — so they're combined rather than one overriding. */
  function refineSeason(calendarSeason, waterC) {
    if (waterC == null || calendarSeason === 'tropical') return calendarSeason;
    var warming = ['winter', 'prespawn', 'spawn', 'postspawn', 'summer'].indexOf(calendarSeason) !== -1;
    if (warming) {
      if (waterC < 7) return 'winter';
      if (waterC < 13) return 'prespawn';
      if (waterC < 18) return 'spawn';
      if (waterC < 21) return 'postspawn';
      return 'summer';
    }
    if (waterC >= 21) return 'summer';
    if (waterC >= 13) return 'fall';
    if (waterC >= 7) return 'latefall';
    return 'winter';
  }

  /* Spawning and comfort bands, in °F because that's how every angling source
     quotes them. General figures across each species' range — a Florida
     largemouth and a Minnesota one don't read the same thermometer. */
  var SPECIES_TEMP = {
    Walleye: { spawn: [42, 50], note: 'Walleye spawn on gravel and rubble in this band, usually at night.' },
    Largemouth: { spawn: [62, 68], note: 'Largemouth bed on hard bottom in the shallows through this band.' },
    Smallmouth: { spawn: [59, 65], note: 'Smallmouth bed on gravel and rock in this band.' },
    Pike: { spawn: [40, 52], note: 'Pike spawn earliest of all, in the shallowest marshy bays.' },
    Musky: { spawn: [49, 59], note: 'Musky spawn in shallow protected bays in this band.' },
    Panfish: { spawn: [67, 75], note: 'Bluegill and sunfish bed in visible colonies through this band.' },
    Crappie: { spawn: [58, 65], note: 'Crappie move into shallow brush and wood to spawn in this band.' },
    LakeTrout: { spawn: [48, 52], note: 'Lake trout spawn in autumn on shallow rock as water falls through this band.' },
    StreamTrout: { spawn: [44, 52], note: 'Brown and brook trout spawn in autumn in this band; rainbows in spring.' },
    Catfish: { spawn: [70, 80], note: 'Catfish spawn in cavities, holes and undercuts through this band.' },
    General: null
  };

  function waterTempCall(spKey, speciesLabel) {
    var c = waterTempC();
    if (c == null) return null;
    var f = Math.round(c * 9 / 5 + 32);
    var shown = dispWaterTemp() + '°' + tempUnit().replace('°', '');
    var measured = waterTempSource() === 'measured';
    var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
    var trend = (!measured && w) ? w.waterTrend : null;

    var body = measured
      ? 'That’s your own reading, so everything above is built on it.'
      : 'That’s an estimate from the last week of air temperature, not a measurement — water lags air by days, and a deep lake, a spring creek or anything under ice will be well off it. If you have a gauge, set the real number; the advice changes with it.';
    if (trend && trend !== 'steady') {
      body += ' The trend is ' + trend + ', which usually matters more than the number: ' +
        (trend === 'warming'
          ? 'a few days of warming pushes fish shallower and makes them chase.'
          : 'a sharp cooling shuts the shallow bite down before the deep one.');
    }

    var band = SPECIES_TEMP[spKey];
    if (band) {
      var lo = band.spawn[0], hi = band.spawn[1];
      if (f >= lo && f <= hi) {
        body = speciesLabel + ' spawn between ' + lo + ' and ' + hi + '°F and the water is in that band right now — ' +
          band.note + ' Fish are shallow and findable, and in many places protected: check the regulations before you keep one. ' + body;
      } else if (f < lo && f >= lo - 8) {
        body = 'At ' + (lo - f) + '°F below the ' + lo + '–' + hi + '°F ' + speciesLabel.toLowerCase() +
          ' spawn band, they are staging — on the first drop outside the spawning flats, feeding hard, and this is the best big-fish window of the year. ' + body;
      } else if (f > hi && f <= hi + 8) {
        body = 'Just past the ' + lo + '–' + hi + '°F ' + speciesLabel.toLowerCase() +
          ' spawn band: post-spawn, the toughest fortnight of the year. Fish the first deep structure outside the beds and slow everything down. ' + body;
      }
    }

    return {
      tag: 'WATER TEMP', w: measured ? 91 : 77,
      title: shown + ' water' + (trend && trend !== 'steady' ? ', ' + trend : '') + (measured ? '' : ' (estimated)'),
      body: body
    };
  }

  /* ============================== THE WEEK AHEAD ==============================
     The question a dashboard should answer before any other: which day this week
     is worth taking off. Solunar rating comes from the device's own astronomy for
     each date; the weather half comes from the seven-day forecast. */
  var weekCache = { key: null, rows: null };

  function isoLocal(d) {
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function dayScore(sol, wx) {
    var s = 46;
    if (sol) s += (sol.rating.stars - 2) * 7;
    if (wx) {
      if (wx.dp != null) s += wx.dp < -2.5 ? 12 : wx.dp < -0.5 ? 7 : wx.dp > 4 ? -9 : 1;
      if (wx.windMax != null) {
        var mph = wx.windMax * 0.621371;
        s += (mph >= 5 && mph <= 18) ? 7 : mph > 28 ? -14 : mph < 3 ? -3 : 2;
      }
      if (wx.pop != null) s += wx.pop >= 80 ? -4 : wx.pop >= 30 ? 4 : 0;
      if ([95, 96, 99].indexOf(wx.code) !== -1) s -= 10;
    }
    return Math.max(12, Math.min(97, Math.round(s)));
  }

  function weekOutlook() {
    var c = coordsFor(state.data);
    if (!c) return null;
    var w = (weatherCache.status === 'ok' && weatherCache.data) ? weatherCache.data : null;
    var key = c.lat.toFixed(3) + ',' + c.lon.toFixed(3) + '@' + new Date().toDateString() +
      '/' + (w ? weatherCache.key : 'none') + '/' + state.units + '/' + (waterTempC() == null ? '-' : waterTempC());
    if (weekCache.key === key) return weekCache.rows;

    var rows = [];
    var noon = new Date();
    noon.setHours(12, 0, 0, 0);
    for (var i = 0; i < 7; i++) {
      var day = new Date(noon.getTime() + i * 86400000);
      var sol = null;
      try { sol = getSolunar(day, c.lat, c.lon); } catch (e) { sol = null; }
      var iso = isoLocal(day);
      var wx = null;
      if (w && w.daily) {
        for (var k = 0; k < w.daily.length; k++) { if (w.daily[k].date === iso) { wx = w.daily[k]; break; } }
      }
      rows.push({ date: day, iso: iso, sol: sol, wx: wx, score: dayScore(sol, wx) });
    }
    var best = 0;
    rows.forEach(function (r, i) { if (r.score > rows[best].score) best = i; });
    rows[best].best = true;
    weekCache = { key: key, rows: rows };
    return rows;
  }

  function renderWeekPanel() {
    var rows = weekOutlook();
    if (!rows) return '';
    var haveWeather = rows.some(function (r) { return !!r.wx; });
    var best = null;
    rows.forEach(function (r) { if (r.best) best = r; });

    var html = '<div class="fa-panel"><div class="fa-section-label">The week ahead</div>';
    if (best) {
      var when = best.iso === isoLocal(new Date()) ? 'Today' : best.date.toLocaleDateString([], { weekday: 'long' });
      var bits = [];
      if (best.sol) bits.push(best.sol.rating.label.toLowerCase() + ' solunar day');
      if (best.wx && best.wx.windMax != null) bits.push('wind to ' + dispWind(best.wx.windMax) + ' ' + windUnit());
      if (best.wx && best.wx.pop != null) bits.push(best.wx.pop + '% chance of rain');
      if (best.wx && best.wx.dp != null && best.wx.dp < -1) bits.push('pressure falling ' + Math.abs(best.wx.dp) + ' hPa');
      html += '<div class="fa-week-verdict"><strong>' + esc(when) + '</strong> looks like the best day of the next seven' +
        (bits.length ? ' — ' + esc(bits.join(', ')) : '') + '. The row below is day, score, solunar rating, high and wind\u00a0·\u00a0rain.</div>';
    }
    html += '<div class="fa-week">' + rows.map(function (r) {
      var tier = r.score >= 78 ? 'prime' : r.score >= 63 ? 'good' : r.score >= 48 ? 'fair' : 'slow';
      var dots = '';
      if (r.sol) for (var i = 1; i <= 4; i++) dots += '<span class="fa-star' + (i <= r.sol.rating.stars ? ' on' : '') + '">●</span>';
      return '<div class="fa-weekday' + (r.best ? ' best' : '') + '">' +
        '<div class="fa-weekday-name">' + esc(r.date.toLocaleDateString([], { weekday: 'short' })) + '</div>' +
        '<div class="fa-weekday-score" data-tier="' + tier + '">' + r.score + '</div>' +
        '<div class="fa-weekday-dots">' + dots + '</div>' +
        (r.wx ? '<div class="fa-weekday-wx">' + (r.wx.tmax != null ? dispTemp(r.wx.tmax) + '°' : '—') +
          '<span>' + [r.wx.windMax != null ? dispWind(r.wx.windMax) : null,
                      r.wx.pop != null ? r.wx.pop + '%' : null].filter(Boolean).join(' · ') + '</span></div>' : '') +
        '</div>';
    }).join('') + '</div>';
    html += '<div class="fa-fineprint">The dots are the solunar rating, computed on this device for each date. The number blends that with the forecast’s pressure change, wind and rain chance' +
      (haveWeather ? '' : ' — but the forecast half is missing right now, so today it is solunar only') +
      '. Weather more than three days out is a guess, and the number inherits that.</div>';
    return html + '</div>';
  }

  /* ============================== WHAT YOUR LOG SAYS ==============================
     Every catch records the conditions it happened in, so with enough of them
     the app can stop giving general advice and start giving yours. Sample sizes
     are printed next to every claim, because with nine fish the honest word is
     "so far", not "your pattern". */
  function personalPatterns() {
    var rows = state.myCatches || [];
    if (rows.length < 4) return null;
    var tally = function (pick) {
      var counts = {};
      rows.forEach(function (r) {
        var k = pick(r);
        if (k == null || k === '') return;
        counts[k] = (counts[k] || 0) + 1;
      });
      var out = Object.keys(counts).map(function (k) { return { key: k, n: counts[k] }; });
      out.sort(function (a, b) { return b.n - a.n; });
      return out;
    };
    var hourBand = function (r) {
      var h = new Date(r.date).getHours();
      return h < 9 ? 'Early morning' : h < 15 ? 'Middle of the day' : h < 20 ? 'Evening' : 'After dark';
    };
    var biggest = null;
    rows.forEach(function (r) {
      var v = r.weight || 0;
      if (v && (!biggest || v > biggest.weight)) biggest = r;
    });
    return {
      total: rows.length,
      lures: tally(function (r) { return r.lure; }),
      trends: tally(function (r) { return r.pressureTrend ? r.pressureTrend.charAt(0).toUpperCase() + r.pressureTrend.slice(1) : null; }),
      bands: tally(hourBand),
      moons: tally(function (r) { return r.moon; }),
      species: tally(function (r) { return r.species; }),
      waters: tally(function (r) { return r.waterBody; }),
      biggest: biggest
    };
  }

  function renderPatternRow(label, list, total, suffix) {
    if (!list || !list.length) return '';
    var top = list[0];
    var pct = Math.round((top.n / total) * 100);
    return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(top.key) + '</div>' +
      '<div class="fa-list-sub">' + esc(label) + (suffix ? ' ' + esc(suffix) : '') + '</div></div>' +
      '<div style="text-align:right"><strong>' + top.n + '/' + total + '</strong>' +
      '<div class="fa-confidence">' + pct + '%</div></div></div>';
  }

  function renderPersonalPanel() {
    var p = personalPatterns();
    if (!p) {
      return '<div class="fa-panel"><div class="fa-section-label">What your log says</div>' +
        '<div class="fa-empty-panel">Log four catches and this panel starts telling you your own patterns instead of general ones — which pressure trend, which hours and which lure actually produce for you.</div></div>';
    }
    var html = '<div class="fa-panel"><div class="fa-section-label">What your log says · ' + p.total + ' catches</div><div class="fa-list">';
    html += renderPatternRow('most productive lure', p.lures, p.total);
    html += renderPatternRow('most productive hours', p.bands, p.total);
    html += renderPatternRow('most productive pressure trend', p.trends, p.total);
    html += renderPatternRow('most productive moon phase', p.moons, p.total);
    html += renderPatternRow('most caught species', p.species, p.total);
    html += renderPatternRow('most productive water', p.waters, p.total);
    html += '</div>';
    if (p.biggest) {
      var bits = [fmtWeight(p.biggest.weight)];
      if (p.biggest.lure) bits.push('on ' + p.biggest.lure);
      if (p.biggest.pressureTrend) bits.push(p.biggest.pressureTrend + ' pressure');
      if (p.biggest.moon) bits.push(p.biggest.moon);
      html += '<div class="fa-insight" style="margin-top:14px"><strong>Your biggest so far:</strong> ' +
        esc(p.biggest.species) + ' — ' + esc(bits.join(', ')) + '.</div>';
    }
    html += '<div class="fa-fineprint">' + (p.total < 12
      ? 'This is a small sample — read it as a hint, not a rule. It gets sharper with every fish you log, and the zero-catch trips matter as much as the good ones.'
      : 'Every one of these is drawn from conditions recorded automatically at the moment you logged the fish. It is the only advice in this app that is specifically about you.') + '</div>';
    return html + '</div>';
  }

  /* ============================== NEAREST WATER ==============================
     On launch the app asks the device where it is and then asks OpenStreetMap
     what water is around that point, so the first thing on screen is the lake or
     river you are actually standing near rather than a list of places.

     Overpass is the public OSM query service: keyless, free, and the only source
     that can answer "what named water is within N km of here". It needs a
     connection, so every path below has a working fallback — a failed lookup
     falls back to a plan for your exact position, which is computed on the
     device and needs nothing.

     Honesty note, reflected in the copy shown to the angler: the sun, moon and
     solunar maths never leave the device, but naming the water near you does
     send an approximate position to OpenStreetMap. That is the trade, and it is
     stated rather than buried. */

  var OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.osm.ch/api/interpreter'
  ];

  function haversineKm(aLat, aLon, bLat, bLon) {
    var R = 6371;
    var dLat = (bLat - aLat) * RAD, dLon = (bLon - aLon) * RAD;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(aLat * RAD) * Math.cos(bLat * RAD) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function fmtDistance(km) {
    if (isMetric()) return km < 1 ? Math.round(km * 1000) + ' m' : (km < 10 ? km.toFixed(1) : Math.round(km)) + ' km';
    var mi = km * 0.621371;
    return mi < 0.2 ? Math.round(mi * 5280) + ' ft' : (mi < 10 ? mi.toFixed(1) : Math.round(mi)) + ' mi';
  }

  // Moving water and standing water fish completely differently, so the mode is
  // set from what OSM says this feature actually is.
  function classifyWater(tags) {
    var w = String(tags.water || '').toLowerCase();
    var ww = String(tags.waterway || '').toLowerCase();
    if (/river|stream|canal|brook|creek|ditch/.test(ww) || /river|stream|canal|creek/.test(w)) return 'river';
    return 'lake';
  }

  function waterKindLabel(tags) {
    var w = String(tags.water || '').toLowerCase();
    var ww = String(tags.waterway || '').toLowerCase();
    if (ww === 'river' || w === 'river') return 'River';
    if (ww === 'stream' || w === 'stream') return 'Stream';
    if (ww === 'canal' || w === 'canal') return 'Canal';
    if (w === 'reservoir' || tags.landuse === 'reservoir') return 'Reservoir';
    if (w === 'pond') return 'Pond';
    if (w === 'lagoon') return 'Lagoon';
    if (w === 'oxbow') return 'Oxbow';
    if (tags.natural === 'bay') return 'Bay';
    return 'Lake';
  }

  /* Two radii in one round-trip. Overpass's "around" filters on the feature's
     real geometry, but "out center" only gives its centroid — and the centroid
     of a big lake can be miles from the bank you are standing on, which would
     rank a farm pond above the lake at your feet. So the query asks twice: once
     within a stone's throw and once wide. Anything that comes back in both sets
     appears twice in the output, and that duplicate is the signal that the water
     is literally at your feet. */
  var ADJACENT_M = 400;

  function overpassSet(around) {
    return 'way["natural"="water"]["name"]' + around + ';' +
      'relation["natural"="water"]["name"]' + around + ';' +
      'way["natural"="bay"]["name"]' + around + ';' +
      'way["waterway"~"^(river|stream|canal)$"]["name"]' + around + ';' +
      'relation["waterway"~"^(river|riverbank)$"]["name"]' + around + ';';
  }

  function overpassQuery(lat, lon, radius) {
    var at = ',' + lat.toFixed(5) + ',' + lon.toFixed(5) + ')';
    return '[out:json][timeout:25];' +
      '(' + overpassSet('(around:' + ADJACENT_M + at) + ')->.near;' +
      '(' + overpassSet('(around:' + radius + at) + ')->.wide;' +
      '.near out tags center 40;' +
      '.wide out tags center 80;';
  }

  function postOverpass(endpoint, query, signal) {
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
      signal: signal
    }).then(function (r) {
      if (!r.ok) throw new Error('overpass ' + r.status);
      return r.json();
    });
  }

  // The plainest query the service could possibly answer, kept as a safety net
  // behind the two-set one above.
  function overpassSimpleQuery(lat, lon, radius) {
    var at = '(around:' + radius + ',' + lat.toFixed(5) + ',' + lon.toFixed(5) + ')';
    return '[out:json][timeout:25];(' + overpassSet(at) + ');out tags center 80;';
  }

  /* Try each mirror in turn — one being busy is the normal failure mode for a
     free public service, not a reason to give up. If every mirror rejects the
     richer query, fall back to the simple one before giving up on the feature. */
  function fetchNearbyWaters(lat, lon, radius) {
    var runAll = function (query) {
      var attempt = function (i) {
        if (i >= OVERPASS_ENDPOINTS.length) return Promise.reject(new Error('no endpoint answered'));
        var ctl = new AbortController();
        var timer = setTimeout(function () { ctl.abort(); }, 14000);
        return postOverpass(OVERPASS_ENDPOINTS[i], query, ctl.signal)
          .then(function (json) { clearTimeout(timer); return json; })
          .catch(function () { clearTimeout(timer); return attempt(i + 1); });
      };
      return attempt(0);
    };
    return runAll(overpassQuery(lat, lon, radius))
      .catch(function () { return runAll(overpassSimpleQuery(lat, lon, radius)); })
      .then(function (json) { return rankWaters(json, lat, lon); });
  }

  /* One row per named water, nearest first. OSM splits big lakes and long rivers
     across many ways, so the same name comes back repeatedly — keep the closest
     piece of each and drop the rest. */
  function rankWaters(json, lat, lon) {
    var elements = (json && json.elements) ? json.elements : [];
    // An element echoed by both output sets is inside the tight radius.
    var seen = {};
    elements.forEach(function (el) {
      var id = el.type + '/' + el.id;
      seen[id] = (seen[id] || 0) + 1;
    });

    var byName = {};
    elements.forEach(function (el) {
      var tags = el.tags || {};
      var name = (tags.name || '').trim();
      if (!name) return;
      var c = el.center || (el.lat != null ? { lat: el.lat, lon: el.lon } : null);
      if (!c || c.lat == null || c.lon == null) return;
      var adjacent = seen[el.type + '/' + el.id] > 1;
      var km = haversineKm(lat, lon, c.lat, c.lon);
      var row = byName[name];
      if (!row) {
        byName[name] = { name: name, lat: c.lat, lon: c.lon, km: km, adjacent: adjacent,
          type: classifyWater(tags), kind: waterKindLabel(tags) };
        return;
      }
      row.adjacent = row.adjacent || adjacent;
      // Keep the piece whose centre is nearest, so the map opens on the part of
      // the water you are actually beside.
      if (km < row.km) { row.km = km; row.lat = c.lat; row.lon = c.lon; row.kind = waterKindLabel(tags); row.type = classifyWater(tags); }
    });

    return Object.keys(byName).map(function (k) { return byName[k]; })
      .sort(function (a, b) {
        if (a.adjacent !== b.adjacent) return a.adjacent ? -1 : 1;  // at your feet wins
        return a.km - b.km;
      });
  }

  // What to say about how far a water is. For anything you are standing on, the
  // centroid distance would be a lie, so it isn't quoted.
  function distanceNote(row) {
    return row.adjacent ? 'right where you are' : 'about ' + fmtDistance(row.km) + ' away';
  }

  /* Open one of the nearby waters as the current report: its own name, its own
     centre for the map and the solunar maths, and the right water mode. */
  function loadNearbyWater(row) {
    state.waterType = row.type;
    lsSet('waterType', state.waterType);
    state.waterSpecies = null;
    lsSet('waterSpecies', null);
    saveCoordOverride(row.name, row.lat, row.lon);
    state.mapMode = 'guide';
    state.view = 'home';
    runSearch(row.name).then(function () {
      if (!state.data) return;
      if (!state.data.location || state.data.location === 'Local waters') {
        state.data.location = row.kind + ' · ' + distanceNote(row);
        lsSet('lastReport', { data: state.data, query: state.query });
      }
      var caveat = state.notice;   // runSearch may have explained a starter plan
      state.notice = 'Nearest water to you: ' + row.name + ' (' + row.kind.toLowerCase() + ', ' +
        distanceNote(row) + '). Sun, moon and feeding windows are computed for it exactly.' +
        (caveat ? ' ' + caveat : '');
      render();
    });
  }

  /* The launch sequence: GPS first, then the water around it. Runs once per
     session unless the angler asks again with "Near me". */
  function findNearestWater(opts) {
    opts = opts || {};
    if (state.locating || state.loading) return;
    if (!('geolocation' in navigator)) {
      state.nearbyStatus = 'error';
      if (!opts.quiet) state.error = 'This device or browser doesn’t offer GPS here. Type a water’s name instead.';
      render();
      return;
    }
    state.locating = true;
    state.nearbyStatus = 'gps';
    state.nearbyError = null;
    state.error = null;
    render();

    watchBestFix(function (lat, lon, accuracy) {
      state.gpsAccuracy = Math.round(accuracy);
      state.nearbyStatus = 'looking';
      render();
      // Close first; if there's genuinely nothing nearby, widen once.
      fetchNearbyWaters(lat, lon, 8000).then(function (rows) {
        return rows.length ? rows : fetchNearbyWaters(lat, lon, 30000);
      }).then(function (rows) {
        state.locating = false;
        state.nearbyWaters = rows.slice(0, 10);
        state.nearbyFrom = { lat: lat, lon: lon };
        state.nearbyStatus = 'done';
        if (!rows.length) {
          applyCurrentLocation(lat, lon, accuracy);
          state.notice = 'No named lake or river within ' + fmtDistance(30) +
            ' of you — this is the plan for your exact position. Search by name if you know the water.';
          render();
          return;
        }
        // With a water already open, don't yank it away — offer the switch.
        if (opts.keepCurrent && state.data) { render(); return; }
        loadNearbyWater(rows[0]);
      }).catch(function () {
        state.locating = false;
        state.nearbyStatus = 'error';
        state.nearbyError = 'Couldn’t reach the map service to name the water near you.';
        if (!state.data) {
          applyCurrentLocation(lat, lon, accuracy);
          state.notice = 'Couldn’t reach the map service to name the water near you, so this is the plan for your exact position — sun, moon and feeding windows are computed on this device and are exact. Search by name for a full report.';
        }
        render();
      });
    }, function (err) {
      state.locating = false;
      state.nearbyStatus = 'error';
      state.nearbyError = gpsErrorMessage(err);
      if (!opts.quiet) state.error = gpsErrorMessage(err);
      render();
    });
  }

  /* The "water near you" list on the dashboard. Shown once the lookup has
     answered, so switching to the next lake over is one tap. */
  function renderNearbyPanel() {
    if (state.nearbyStatus === 'gps' || state.nearbyStatus === 'looking') {
      return '<div class="fa-panel"><div class="fa-section-label">Water near you</div>' +
        '<div class="fa-loading" style="padding:18px 0"><div class="fa-hook"></div>' +
        '<div>' + (state.nearbyStatus === 'gps' ? 'locking onto GPS…' : 'finding the water around you…') + '</div>' +
        '<div class="fa-loading-elapsed">' + (state.nearbyStatus === 'gps'
          ? 'holding a few seconds for the tightest fix'
          : 'asking OpenStreetMap what’s within ' + fmtDistance(8)) + '</div></div></div>';
    }
    var rows = state.nearbyWaters || [];
    if (!rows.length) {
      if (state.nearbyStatus !== 'error') return '';
      return '<div class="fa-panel"><div class="fa-section-label">Water near you</div>' +
        '<div class="fa-empty-panel">' + esc(state.nearbyError || 'Couldn’t look that up.') + '</div>' +
        '<div class="fa-primary-row" style="margin-top:0"><button class="fa-btn-secondary" data-action="find-nearest">Try again</button></div></div>';
    }
    var current = state.data ? state.data.waterBody : null;
    return '<div class="fa-panel"><div class="fa-section-label">Water near you · ' + rows.length + '</div><div class="fa-list">' +
      rows.map(function (row, i) {
        var open = row.name === current;
        return '<div class="fa-list-row"><div><div class="fa-list-main">' + (i === 0 ? '◎ ' : '') + esc(row.name) + '</div>' +
          '<div class="fa-list-sub">' + esc(row.kind) + ' · ' + esc(distanceNote(row)) + (i === 0 ? ' · nearest' : '') + '</div></div>' +
          (open ? '<span class="fa-confidence">Open</span>'
                : '<button class="fa-btn-secondary" data-action="open-nearby" data-idx="' + i + '">Open</button>') + '</div>';
      }).join('') + '</div>' +
      '<div class="fa-primary-row" style="margin-top:12px"><button class="fa-btn-secondary" data-action="find-nearest">↻ Refresh from GPS</button></div>' +
      '<div class="fa-fineprint">Found by asking OpenStreetMap what water lies near your position. \u201cRight where you are\u201d means the water itself is within ' + fmtDistance(ADJACENT_M / 1000) + ' of you; anything farther is measured to the middle of that water, so a large lake can read farther away than its nearest bank. Sun, moon and solunar times are computed on this device and never leave it; naming the water near you is the one step that sends an approximate position out.</div>' +
      '</div>';
  }

  /* ============================== HOME DASHBOARD ==============================
     The one screen to open when you wake up: is today worth it, when is the next
     window, what are the conditions doing, and what would a guide tell you to do
     about it. Everything on it is live — nothing here is a static tile. */

  function greetingFor(now, sol) {
    var h = now.getHours();
    if (sol && sol.sun) {
      var t = now.getTime();
      if (sol.sun.dawn && sol.sun.sunrise && t >= sol.sun.dawn.getTime() && t < sol.sun.sunrise.getTime()) return 'You’re up before the sun';
      if (sol.sun.sunset && sol.sun.dusk && t >= sol.sun.sunset.getTime() && t < sol.sun.dusk.getTime()) return 'Last of the light';
    }
    if (h < 5) return 'Early start';
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    if (h < 21) return 'Good evening';
    return 'Late one';
  }

  /* The countdown block. Rebuilt every second by the clock in init(), so it
     ticks down rather than going stale the moment the page renders. */
  function dashWindowHtml() {
    var sol = solunarForReport();
    if (!sol) return '<div class="fa-dash-wtitle">Set this water’s location</div>' +
      '<div class="fa-dash-wsub">Sun, moon and feeding windows need a position. Use “Near me” or “Set location” on the full report.</div>';
    var ws = windowStatus(sol, new Date());
    if (!ws || ws.none) {
      return '<div class="fa-dash-wtitle">No window left today</div>' +
        '<div class="fa-dash-wsub">Majors and minors have passed. Fish light and structure — and tomorrow’s first window comes around at dawn.</div>';
    }
    if (ws.live) {
      return '<div class="fa-dash-wkicker">' + (ws.major ? 'Major window · open now' : 'Minor window · open now') + '</div>' +
        '<div class="fa-dash-wtitle live">' + fmtMins(ws.minsLeft) + ' left</div>' +
        '<div class="fa-dash-wsub">' + esc(ws.w.label) + ' · until ' + fmtClock(ws.w.end) + '. Be on your best spot, not driving to it.</div>';
    }
    return '<div class="fa-dash-wkicker">Next ' + (ws.major ? 'major' : 'minor') + ' window</div>' +
      '<div class="fa-dash-wtitle">in ' + fmtMins(ws.minsAway) + '</div>' +
      '<div class="fa-dash-wsub">' + esc(ws.w.label) + ' · ' + fmtClock(ws.w.start) + '–' + fmtClock(ws.w.end) + '</div>';
  }

  function dashCondHtml() {
    if (!coordsFor(state.data)) return '<div class="fa-dash-nocond">Set this water\u2019s location and live conditions appear here.</div>';
    if (weatherCache.status === 'loading' || weatherCache.status === 'idle') return '<div class="fa-weather-loading">reading the sky\u2026</div>';
    var w = (weatherCache.status === 'ok') ? weatherCache.data : null;
    if (!w) return '<div class="fa-dash-nocond">Live conditions need a connection \u2014 the timing above is computed on this device and still applies.</div>';
    var arrow = w.trend === 'falling' ? '↓' : w.trend === 'rising' ? '↑' : '→';
    var dir = compassOf(w.windDir);
    return '<div class="fa-dash-cells">' +
      '<div class="fa-dash-cell"><strong>' + dispTemp(w.tempC) + '°</strong><span>air ' + tempUnit() + '</span></div>' +
      '<div class="fa-dash-cell"><strong>' + dispWind(w.windKmh) + (dir ? ' <em>' + dir + '</em>' : '') + '</strong><span>wind ' + windUnit() + '</span></div>' +
      '<div class="fa-dash-cell"><strong>' + arrow + ' ' + (w.pressure || '—') + '</strong><span>' + esc(w.trend) + ' hPa</span></div>' +
      '<div class="fa-dash-cell"><strong>' + (w.cloud != null ? w.cloud + '%' : '—') + '</strong><span>' + esc(w.sky) + '</span></div>' +
      (dispWaterTemp() != null ? '<div class="fa-dash-cell wide"><strong>' + dispWaterTemp() + '°</strong><span>water ' + tempUnit() +
        ' · ' + (waterTempSource() === 'measured' ? 'your reading' : 'estimated') + '</span></div>' : '') +
      '</div>';
  }

  function renderSearchBar() {
    var busy = state.loading || state.locating;
    var html = '<div class="fa-searchbar">';
    html += '<button class="fa-locate-btn" data-action="locate-me"' + (busy ? ' disabled' : '') + ' title="Use my current location">' +
      '<svg class="fa-locate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke-linecap="round"/></svg>' +
      (state.locating ? 'Locating…' : 'Near me') + '</button>';
    html += '<input class="fa-input" id="fa-query-input" data-bind="query" placeholder="e.g. Lake Tahoe, CA" value="' + esc(state.query) + '"' + (busy ? ' disabled' : '') + '>';
    html += '<button class="fa-btn" data-action="run-search"' + (busy ? ' disabled' : '') + '>' + (state.loading ? 'Casting…' : 'Get the report') + '</button>';
    html += '</div>';
    return html;
  }

  // Every map pin that carries a photo, newest first, across all waters.
  function pinnedPhotos() {
    var out = [];
    Object.keys(state.mapPins || {}).forEach(function (water) {
      (state.mapPins[water] || []).forEach(function (p) {
        if (p.photo) out.push({ water: water, pin: p });
      });
    });
    return out.sort(function (a, b) { return (b.pin.at || 0) > (a.pin.at || 0) ? 1 : -1; });
  }

  function renderHome() {
    var now = new Date();
    var d = state.data;
    var sol = d ? solunarForReport() : null;
    var html = '<div>';
    html += '<div class="fa-eyebrow">' + esc(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>';
    html += '<h1 class="fa-page-title">' + esc(greetingFor(now, sol)) + ', ' + esc((state.profile.name || 'Angler').split(' ')[0]) + '</h1>';

    if (!d) {
      html += '<p class="fa-page-copy">Name the water you\u2019re fishing and this becomes your dashboard: the day\u2019s rating, the next feeding window counting down, live conditions, and what a guide would tell you to do about all three.</p>';
      html += renderNearbyPanel();
      if (state.error) html += '<div class="fa-error">' + esc(state.error) + '</div>';
      if (state.loading) html += '<div class="fa-loading"><div class="fa-hook"></div><div>reading the water\u2026</div></div>';
      html += '<div class="fa-panel"><div class="fa-section-label">Or name the water</div>' + renderSearchBar() +
        '<div class="fa-fineprint">Any lake, river, bay or reservoir, anywhere in the world. Sun, moon and feeding times are computed on this device for whatever you give it a position for.</div></div>';
      if (state.favorites.length) {
        html += '<div class="fa-panel"><div class="fa-section-label">Your saved waters</div><div class="fa-list">' +
          state.favorites.map(function (f) {
            return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(f.waterBody) + '</div>' +
              '<div class="fa-list-sub">' + esc(f.location || 'Saved') + '</div></div>' +
              '<button class="fa-btn-secondary" data-action="load-favorite" data-water="' + esc(f.waterBody) + '">Open</button></div>';
          }).join('') + '</div></div>';
      }
      if (state.nearbyStatus === 'done' || state.nearbyStatus === 'error' || state.nearbyStatus === 'idle')
      html += '<div class="fa-panel"><div class="fa-section-label">What lands on this screen</div><div class="fa-list">' +
        [['\u23f1', 'The next feeding window, counting down', 'Sun, moon and solunar majors and minors, computed on this device for the exact spot \u2014 works with no signal.'],
         ['\ud83c\udf24', 'Live conditions and what they mean', 'Barometric trend, wind and its direction, cloud and temperature \u2014 read as advice, not just numbers.'],
         ['\ud83c\udfa3', 'A guide\u2019s calls for right now', 'Season, light, pressure, wind, water type and species, turned into what to do in the next hour.'],
         ['\ud83d\udccd', 'Your spots and photos on the real water', 'Drop pins on satellite imagery and file catch photos at the exact coordinates they came from.']]
        .map(function (row) {
          return '<div class="fa-list-row"><div><div class="fa-list-main">' + row[0] + ' ' + esc(row[1]) + '</div>' +
            '<div class="fa-list-sub">' + esc(row[2]) + '</div></div></div>';
        }).join('') + '</div></div>';
      return html + '</div>';
    }

    if (state.error) html += '<div class="fa-error">' + esc(state.error) + '</div>';
    if (state.notice) html += '<div class="fa-notice">' + esc(state.notice) + '</div>';

    // ---- Hero: where, when, and what the sky is doing.
    html += '<div class="fa-panel fa-dash-hero">';
    html += '<div class="fa-dash-water"><div><div class="fa-dash-name">' + esc(d.waterBody) + '</div>' +
      '<div class="fa-dash-loc">' + esc(d.location || (state.waterType === 'river' ? 'River / stream mode' : 'Lake mode')) + '</div></div>' +
      '<div class="fa-dash-actions"><button class="fa-toggle-btn" data-action="share-day" title="Send today\u2019s plan to someone">\u21ea Share</button>' +
      '<button class="fa-toggle-btn" data-action="set-view" data-view="today">Full report \u2192</button></div></div>';
    html += '<div class="fa-dash-window" id="fa-dash-window">' + dashWindowHtml() + '</div>';
    html += '<div id="fa-dash-cond">' + dashCondHtml() + '</div>';
    html += '<div class="fa-action-grid" style="margin-top:16px">' +
      '<button class="fa-action" data-action="begin-trip"><strong>' + (state.activeTrip ? '● Open live trip' : '▶ Start a trip') + '</strong><span>' + (state.activeTrip ? 'Already running' : 'Clock, catches, notes') + '</span></button>' +
      '<button class="fa-action" data-action="dash-log-catch"><strong>📸 Log a catch</strong><span>Conditions captured</span></button>' +
      '<button class="fa-action" data-action="dash-open-map"><strong>🛰 Satellite map</strong><span>Drop pins &amp; photos</span></button>' +
      '<button class="fa-action" data-action="clear-report"><strong>🔎 Different water</strong><span>New report</span></button>' +
      '</div>';
    html += '</div>';

    // ---- The guide's call.
    html += '<div class="fa-panel"><div class="fa-section-label">The guide’s call — right now</div>' +
      '<div id="fa-guru">' + guruHtml(true) + '</div></div>';

    // ---- Which day this week is worth taking off.
    html += renderWeekPanel();

    // ---- The day itself.
    if (sol) {
      var stars = '';
      for (var i = 1; i <= 4; i++) stars += '<span class="fa-star' + (i <= sol.rating.stars ? ' on' : '') + '">●</span>';
      html += '<div class="fa-panel"><div class="fa-section-label">The day</div>';
      html += '<div class="fa-rating-row"><div class="fa-rating-stars">' + stars + '</div>' +
        '<div><div class="fa-rating-label">' + esc(sol.rating.label) + ' solunar day</div>' +
        '<div class="fa-rating-why">' + esc(sol.rating.why) + '</div></div></div>';
      html += '<div class="fa-suntimes">' +
        '<span><strong>Sunrise</strong> ' + fmtClock(sol.sun.sunrise) + '</span>' +
        '<span><strong>Sunset</strong> ' + fmtClock(sol.sun.sunset) + '</span>' +
        '<span><strong>Moonrise</strong> ' + fmtClock(sol.moon.rise) + '</span>' +
        '<span><strong>Moonset</strong> ' + fmtClock(sol.moon.set) + '</span></div>';
      html += '<div class="fa-window-grid">';
      sol.majors.concat(sol.minors).sort(function (a, b) { return a.center - b.center; }).forEach(function (win) {
        var isMajor = sol.majors.indexOf(win) !== -1;
        var live = now >= win.start && now <= win.end;
        var passed = now > win.end;
        html += '<div class="fa-window' + (isMajor ? ' major' : '') + (live ? ' live' : '') + (passed ? ' passed' : '') + '">' +
          '<div class="fa-window-kind">' + (isMajor ? 'Major' : 'Minor') + (live ? ' · now' : '') + '</div>' +
          '<div class="fa-window-time">' + fmtClock(win.start) + ' – ' + fmtClock(win.end) + '</div>' +
          '<div class="fa-window-label">' + esc(win.label) + '</div></div>';
      });
      html += '</div></div>';
    }

    // ---- Somewhere else nearby, once the day you're on is covered.
    html += renderNearbyPanel();

    // ---- Photos pinned to their exact spot.
    var photos = pinnedPhotos();
    if (photos.length) {
      html += '<div class="fa-panel"><div class="fa-section-label">Pinned to the spot · ' + photos.length + '</div>' +
        '<div class="fa-pinstrip">' + photos.slice(0, 8).map(function (row) {
          return '<button class="fa-pinshot" data-action="open-spots-map" data-water="' + esc(row.water) + '" title="Open ' + esc(row.water) + ' on the map">' +
            '<img src="' + row.pin.photo + '" alt="">' +
            '<span class="fa-pinshot-label">' + esc(row.pin.label) + '</span>' +
            '<span class="fa-pinshot-sub">' + esc(row.water) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="fa-fineprint">Every one of these sits on the exact coordinates where you dropped it. Tap to open that water on the satellite map.</div></div>';
    }

    // ---- Recent catches.
    if (state.myCatches.length) {
      html += '<div class="fa-panel"><div class="fa-section-label">Latest from the log</div><div class="fa-list">' +
        state.myCatches.slice(0, 3).map(function (ct) {
          var meta = [];
          if (ct.weight) meta.push(fmtWeight(ct.weight));
          if (ct.length) meta.push(fmtLength(ct.length));
          if (ct.lure) meta.push(ct.lure);
          return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(ct.species) + '</div>' +
            '<div class="fa-list-sub">' + esc(meta.join(' · ') || 'logged') + ' · ' + esc(ct.waterBody || '') + '</div></div>' +
            '<div class="fa-list-sub">' + esc(new Date(ct.date).toLocaleDateString()) + '</div></div>';
        }).join('') + '</div>' +
        '<div class="fa-primary-row"><button class="fa-btn-secondary" data-action="open-trophy">🏆 Trophy room</button>' +
        '<button class="fa-btn-secondary" data-action="set-view" data-view="patterns">See my patterns</button></div></div>';
    }

    return html + '</div>';
  }

  /* Weather arrives after the first paint, so the dashboard's live regions get
     refreshed in place rather than re-rendering the page under the user. */
  function paintDashboard() {
    var cond = document.getElementById('fa-dash-cond');
    if (cond) cond.innerHTML = dashCondHtml();
    var win = document.getElementById('fa-dash-window');
    if (win) win.innerHTML = dashWindowHtml();
    paintGuru();
  }

  /* An illustrated "read the water" schematic: the structure types that hold
     fish on almost any lake, drawn as one figure so a cold reader can see WHERE
     to start rather than parse it from prose. It's a generic illustration, not a
     survey of the specific water — stated plainly in the caption. The card is
     always parchment, so the palette literals below read in both app themes. */
  // Structure names + access are fixed; the "why" and priority tier change per
  // species below, because a point is a highway to a musky and a formality to a bass.
  var WATER_SPOTS = [
    { n: 1, name: 'Points', access: 'Both' },
    { n: 2, name: 'Weed edge', access: 'Both' },
    { n: 3, name: 'Drop-off', access: 'Boat' },
    { n: 4, name: 'Inlet / creek mouth', access: 'Both' },
    { n: 5, name: 'Cove / bay', access: 'Both' },
    { n: 6, name: 'Docks & cover', access: 'Shore' }
  ];

  // Per species, one entry per structure above (same order): tier + why.
  // tier: 3 = prime, 2 = good, 1 = situational. Written from general angling knowledge.
  var SPECIES_SPOTS = {
    General: {
      label: 'Any species',
      notes: [
        { tier: 2, why: 'Land that juts in — fish patrol both sides. Cast parallel to the edge.' },
        { tier: 2, why: 'The line where weeds meet open water is an ambush lane. Work it slowly.' },
        { tier: 2, why: 'Where a shallow flat breaks to deep water; fish stage on the lip.' },
        { tier: 2, why: 'Current carries food and oxygen, and runs cooler in summer.' },
        { tier: 2, why: 'Warms first in spring and traps baitfish when wind pushes in.' },
        { tier: 2, why: 'Shade and hard structure hold fish tight — pitch right to it.' }
      ]
    },
    Walleye: {
      label: 'Walleye',
      notes: [
        { tier: 3, why: 'Wind-blown points at dawn and dusk; work the tip and both breaks.' },
        { tier: 2, why: 'Evening bite along the deep outside weed line.' },
        { tier: 3, why: 'The classic walleye break — they stage deep, slide up at dusk.' },
        { tier: 3, why: 'Current and stained water stack walleye below inflows.' },
        { tier: 2, why: 'Low-light and spring; warmer bays hold pre-spawn fish and bait.' },
        { tier: 1, why: 'A little low-light shade, but walleye favor open structure.' }
      ]
    },
    Largemouth: {
      label: 'Largemouth',
      notes: [
        { tier: 2, why: 'Secondary points into coves hold staging largemouth.' },
        { tier: 3, why: 'Largemouth live on the grass line — flip and punch the edge.' },
        { tier: 2, why: 'The first break off a flat holds fish in heat and cold.' },
        { tier: 2, why: 'Fresh current and cover pull largemouth into the mouth.' },
        { tier: 3, why: 'Shallow, warm, cover-filled backs of coves — prime largemouth water.' },
        { tier: 3, why: 'Shade and pilings; skip baits tight underneath.' }
      ]
    },
    Smallmouth: {
      label: 'Smallmouth',
      notes: [
        { tier: 3, why: 'Rocky main-lake points are smallmouth magnets — fan-cast the tip.' },
        { tier: 1, why: 'Smallmouth prefer rock; fish weeds only where they meet gravel.' },
        { tier: 3, why: 'Smallmouth hold on rocky breaks and offshore humps.' },
        { tier: 2, why: 'Current and crayfish-rich rock draw smallmouth, especially in rivers.' },
        { tier: 2, why: 'Rocky coves in spring — they spawn on gravel flats.' },
        { tier: 2, why: 'Docks over rock or deep water hold roaming smallmouth.' }
      ]
    },
    Pike: {
      label: 'Pike',
      notes: [
        { tier: 2, why: 'Weedy points are ambush corners for cruising pike.' },
        { tier: 3, why: 'The number-one pike spot — hold in and along the cabbage.' },
        { tier: 2, why: 'Big summer pike patrol the deep weed break.' },
        { tier: 2, why: 'Cooler, oxygenated water and baitfish draw summer pike.' },
        { tier: 3, why: 'First weedy bays warm early and load up with spring pike.' },
        { tier: 1, why: 'Some cover, but pike prefer open weed flats.' }
      ]
    },
    Musky: {
      label: 'Musky',
      notes: [
        { tier: 3, why: 'Main-lake points and their bars are classic musky spots.' },
        { tier: 3, why: 'The deep outside weed edge is the musky highway.' },
        { tier: 3, why: 'Main-lake breaks and humps — cast or troll the edge.' },
        { tier: 1, why: 'Less key than main-lake structure; current can gather bait.' },
        { tier: 2, why: 'Big bays hold late-fall bait and following fish.' },
        { tier: 1, why: 'Incidental cover, rarely a primary musky target.' }
      ]
    },
    Panfish: {
      label: 'Panfish',
      notes: [
        { tier: 2, why: 'Weedy points hold roaming bluegill; fish the inside edge.' },
        { tier: 3, why: 'Bluegill live in and along the weeds — work pockets and edges.' },
        { tier: 2, why: 'Bigger fish slide to the first break in summer heat and winter.' },
        { tier: 1, why: 'Some food, but panfish favor calmer cover than current.' },
        { tier: 3, why: 'Warm, weedy bays are bluegill headquarters — beds in spring.' },
        { tier: 3, why: 'Shade and posts hold bluegill all summer — dunk baits tight.' }
      ]
    },
    LakeTrout: {
      label: 'Lake Trout',
      notes: [
        { tier: 2, why: 'Deep rocky points and their offshore tips hold lakers.' },
        { tier: 1, why: 'Not a weed fish — lakers live in cold, open water.' },
        { tier: 3, why: 'Steep breaks to the main basin — lakers ride the deep edge.' },
        { tier: 1, why: 'Minor; lakers relate to deep cold water, not inflows.' },
        { tier: 1, why: 'Only in the cold-water window right after ice-out.' },
        { tier: 1, why: 'Rarely relevant — lakers roam deep, open water.' }
      ]
    },
    StreamTrout: {
      label: 'Stream Trout',
      notes: [
        { tier: 2, why: 'Points near inflowing current hold cruising stockers.' },
        { tier: 1, why: 'Only where weeds hold cool, oxygenated water.' },
        { tier: 2, why: 'Deep breaks give summer refuge as the shallows warm.' },
        { tier: 3, why: 'Cold, oxygenated stream mouths are the prime trout spot.' },
        { tier: 2, why: 'Spring-fed, shaded bays stay cool and hold stockers.' },
        { tier: 1, why: 'A little shade, but trout favor moving, cooler water.' }
      ]
    },
    Catfish: {
      label: 'Catfish',
      notes: [
        { tier: 2, why: 'Points into deeper water are night-feeding lanes.' },
        { tier: 1, why: 'Cats skirt weeds but hold on the bottom nearby.' },
        { tier: 3, why: 'Deep holes and breaks hold catfish through the day.' },
        { tier: 3, why: 'Current and washed-in food make inflows prime cat spots.' },
        { tier: 2, why: 'Muddy, warm bays hold feeding cats after dark.' },
        { tier: 2, why: 'Wood, riprap and shade near deep water hold cats.' }
      ]
    },
    Crappie: {
      label: 'Crappie',
      notes: [
        { tier: 2, why: 'Crappie stage on points moving to and from spawning bays.' },
        { tier: 2, why: 'Suspend along the weed line, best at first and last light.' },
        { tier: 3, why: 'Crappie hang on brushy breaks — count baits down to them.' },
        { tier: 1, why: 'Some current draws bait, but crappie prefer still cover.' },
        { tier: 3, why: 'Spring crappie pour into warm, brushy bays to spawn.' },
        { tier: 3, why: 'Shade and brush under docks stack crappie — shoot baits under.' }
      ]
    }
  };
  var SPECIES_ORDER = ['General', 'Walleye', 'Largemouth', 'Smallmouth', 'Pike', 'Musky', 'Panfish', 'Crappie', 'LakeTrout', 'StreamTrout', 'Catfish'];

  // Match a report's listed species to one of the sets when the user hasn't chosen.
  // Specific/distinctive names first so a multi-species report picks sensibly.
  function autoSpeciesKey(d) {
    var names = (d && Array.isArray(d.species) ? d.species : []).map(function (s) { return (s.name || '').toLowerCase(); }).join(' ');
    if (/walleye|sauger/.test(names)) return 'Walleye';
    if (/musk|muskie|musky/.test(names)) return 'Musky';
    if (/pike/.test(names)) return 'Pike';
    if (/crappie/.test(names)) return 'Crappie';
    if (/catfish|bullhead|channel cat|flathead|blue cat/.test(names)) return 'Catfish';
    if (/lake trout|laker|mackinaw|togue/.test(names)) return 'LakeTrout';
    if (/trout|char|kokanee|salmon|steelhead/.test(names)) return 'StreamTrout';
    if (/smallmouth|smallie|bronzeback/.test(names)) return 'Smallmouth';
    if (/bass/.test(names)) return 'Largemouth';
    if (/bluegill|sunfish|panfish|perch|redear|pumpkinseed/.test(names)) return 'Panfish';
    return 'General';
  }

  // ---- River / stream vocabulary. Moving water reads completely differently:
  // fish relate to current, not cover-in-still-water, so it gets its own six
  // structures and its own per-species priorities. Lake trout are dropped — they
  // are a deep coldwater lake fish, not a river species.
  var RIVER_SPOTS = [
    { n: 1, name: 'Outside bend / cut bank', access: 'Both' },
    { n: 2, name: 'Riffle', access: 'Shore' },
    { n: 3, name: 'Pool', access: 'Both' },
    { n: 4, name: 'Current seam', access: 'Both' },
    { n: 5, name: 'Eddy / slack water', access: 'Both' },
    { n: 6, name: 'Wood & rock', access: 'Shore' }
  ];
  var RIVER_SPECIES_SPOTS = {
    General: { label: 'Any species', notes: [
      { tier: 3, why: 'Current carves the outside deep — fish hold along the cut bank.' },
      { tier: 2, why: 'Fast, oxygenated water; fish the head and tail-out at feeding time.' },
      { tier: 2, why: 'Deep slow water rests fish through heat and bright midday.' },
      { tier: 3, why: 'The line between fast and slow water — fish sit slow, feed fast.' },
      { tier: 2, why: 'Slack water behind obstructions lets fish rest and ambush.' },
      { tier: 2, why: 'Anything breaking current holds a fish tight to it.' }
    ]},
    Walleye: { label: 'Walleye', notes: [
      { tier: 2, why: 'Deeper outside bends hold walleye off the main current.' },
      { tier: 2, why: 'Walleye feed in riffle tail-outs at dawn and dusk.' },
      { tier: 3, why: 'Deep pools and holes are daytime walleye refuges.' },
      { tier: 3, why: 'Walleye stack on seams below current breaks and wing dams.' },
      { tier: 2, why: 'Slack eddies below structure hold resting walleye.' },
      { tier: 2, why: 'Rock and wood on the bottom edge concentrate fish.' }
    ]},
    Largemouth: { label: 'Largemouth', notes: [
      { tier: 2, why: 'Deeper outside bends with wood hold largemouth.' },
      { tier: 1, why: 'Too much current — largemouth avoid fast water.' },
      { tier: 2, why: 'Slow deep pools hold largemouth, especially with cover.' },
      { tier: 2, why: 'They sit on the slow side of a seam near cover.' },
      { tier: 3, why: 'Slack backwaters and eddies are prime largemouth water.' },
      { tier: 3, why: 'Laydowns and logjams in slow water — flip tight.' }
    ]},
    Smallmouth: { label: 'Smallmouth', notes: [
      { tier: 3, why: 'Rocky outside bends with current are smallmouth strongholds.' },
      { tier: 3, why: 'Smallmouth feed hard in and below riffles on crayfish and bait.' },
      { tier: 2, why: 'They drop to pools to rest, then push back to current to feed.' },
      { tier: 3, why: 'Seams beside fast water are the number-one smallmouth spot.' },
      { tier: 2, why: 'Eddies behind boulders hold ambush-ready smallmouth.' },
      { tier: 3, why: 'Boulders and rock breaks in current hold fish tight.' }
    ]},
    Pike: { label: 'Pike', notes: [
      { tier: 2, why: 'Deeper bends with slack edges hold river pike.' },
      { tier: 1, why: 'Pike avoid heavy current; skip the fast riffles.' },
      { tier: 2, why: 'Slow pools with weed or wood hold pike.' },
      { tier: 2, why: 'Pike hang on the slow side, darting out to ambush.' },
      { tier: 3, why: 'Weedy backwater eddies are prime river-pike water.' },
      { tier: 3, why: 'Ambush from wood and slack-water cover.' }
    ]},
    Musky: { label: 'Musky', notes: [
      { tier: 3, why: 'Deep outside bends are prime big-river musky lies.' },
      { tier: 1, why: 'Fast riffles aren’t musky water — fish the edges.' },
      { tier: 2, why: 'Deep pools hold musky between feeds.' },
      { tier: 3, why: 'Musky ambush from major current seams and breaks.' },
      { tier: 2, why: 'Big eddies behind structure hold following fish.' },
      { tier: 3, why: 'Logjams and boulders in current — the classic river-musky spot.' }
    ]},
    Panfish: { label: 'Panfish', notes: [
      { tier: 1, why: 'Too much current on the main bend for panfish.' },
      { tier: 1, why: 'Panfish avoid fast water; fish the slow margins.' },
      { tier: 2, why: 'Slow pool edges hold bluegill and sunfish.' },
      { tier: 2, why: 'They tuck on the slow side of gentle seams.' },
      { tier: 3, why: 'Slack eddies and backwaters are panfish comfort zones.' },
      { tier: 3, why: 'Wood in slow water stacks bluegill — dunk tight.' }
    ]},
    Crappie: { label: 'Crappie', notes: [
      { tier: 1, why: 'Main current is too strong; crappie seek slack.' },
      { tier: 1, why: 'Not crappie water — they hold out of the flow.' },
      { tier: 3, why: 'Deep slow pools with wood are prime river crappie spots.' },
      { tier: 2, why: 'They suspend on the slow edge of soft seams.' },
      { tier: 3, why: 'Slack eddies and backwaters gather crappie schools.' },
      { tier: 3, why: 'Brush and laydowns in slow water — shoot baits under.' }
    ]},
    StreamTrout: { label: 'Stream Trout', notes: [
      { tier: 3, why: 'Undercut outside banks are classic trout lies — deep and shaded.' },
      { tier: 3, why: 'Trout feed in riffles and their tail-outs on drifting insects.' },
      { tier: 3, why: 'Deep pools hold the biggest trout, especially midday and heat.' },
      { tier: 3, why: 'Trout hold on seams, letting current bring food to them.' },
      { tier: 2, why: 'Soft eddies behind rocks give trout a rest from the flow.' },
      { tier: 2, why: 'Boulders and logjams break current and shelter trout.' }
    ]},
    Catfish: { label: 'Catfish', notes: [
      { tier: 3, why: 'Deep outside bends and holes are prime catfish lies.' },
      { tier: 1, why: 'Cats feed below riffles but hold in the deeper water.' },
      { tier: 3, why: 'Deep pools and scour holes hold catfish through the day.' },
      { tier: 2, why: 'Cats sit in slack beside current, waiting for washed-down food.' },
      { tier: 2, why: 'Eddies collect food and hold feeding cats.' },
      { tier: 3, why: 'Logjams and rock in deep water are catfish magnets.' }
    ]}
  };
  var RIVER_SPECIES_ORDER = ['General', 'Walleye', 'Largemouth', 'Smallmouth', 'Pike', 'Musky', 'Panfish', 'Crappie', 'StreamTrout', 'Catfish'];

  function activeSpeciesKey(d) {
    var chosen = (state.waterSpecies && SPECIES_SPOTS[state.waterSpecies]) ? state.waterSpecies : autoSpeciesKey(d);
    // Lake trout aren't a river fish; fall back to the river trout set there.
    if (state.waterType === 'river' && chosen === 'LakeTrout') chosen = 'StreamTrout';
    return chosen;
  }

  function tierColor(tier) {
    return tier >= 3 ? '#C9803E' : tier === 2 ? '#5C7A5E' : '#b9ab8e';
  }
  function tierLabel(tier) {
    return tier >= 3 ? 'Prime' : tier === 2 ? 'Good' : 'Situational';
  }

  function renderWaterMap(d) {
    var river = state.waterType === 'river';
    var spots = river ? RIVER_SPOTS : WATER_SPOTS;
    var sets = river ? RIVER_SPECIES_SPOTS : SPECIES_SPOTS;
    var order = river ? RIVER_SPECIES_ORDER : SPECIES_ORDER;
    var speciesKey = activeSpeciesKey(d);
    if (!sets[speciesKey]) speciesKey = 'General';
    var notes = sets[speciesKey].notes;
    var showTiers = speciesKey !== 'General';
    var pinColor = function (i) { return showTiers ? tierColor(notes[i].tier) : '#C9803E'; };

    var typeToggle = '<div class="fa-watertype">' +
      '<button class="' + (river ? '' : 'active') + '" data-action="set-water-type" data-type="lake">Lake</button>' +
      '<button class="' + (river ? 'active' : '') + '" data-action="set-water-type" data-type="river">River / stream</button>' +
      '</div>';

    var selector = '<div class="fa-species-select">' + order.map(function (key) {
      return '<button class="fa-species-chip' + (key === speciesKey ? ' active' : '') + '" data-action="set-water-species" data-species="' + key + '">' + esc(sets[key].label) + '</button>';
    }).join('') + '</div>';

    var svg = river ? riverSvg(pinColor) : lakeSvg(pinColor);

    var legend = '<div class="fa-spot-legend">' + spots.map(function (s, i) {
      var note = notes[i];
      var tierBadge = showTiers ? '<span class="fa-spot-tier tier' + note.tier + '">' + tierLabel(note.tier) + '</span>' : '';
      return '<div class="fa-spot-item' + (showTiers && note.tier >= 3 ? ' prime' : '') + '"><span class="fa-spot-num" style="background:' + pinColor(i) + '">' + s.n + '</span>' +
        '<div><div class="fa-spot-name">' + esc(s.name) + tierBadge +
        ' <span class="fa-spot-access' + (s.access === 'Shore' ? ' shore' : s.access === 'Boat' ? ' boat' : '') + '">' + esc(s.access) + '</span></div>' +
        '<div class="fa-spot-why">' + esc(note.why) + '</div></div></div>';
    }).join('') + '</div>';

    var forWhom = speciesKey === 'General' ? '' : ' for ' + esc(sets[speciesKey].label.toLowerCase());
    var tierKey = showTiers ? '<div class="fa-tier-key"><span><i class="fa-tier-dot" style="background:#C9803E"></i>Prime</span><span><i class="fa-tier-dot" style="background:#5C7A5E"></i>Good</span><span><i class="fa-tier-dot" style="background:#b9ab8e"></i>Situational</span></div>' : '';
    var label = river ? 'Read the water — river &amp; stream' : 'Read the water — where fish hold';

    var modeToggle = '<div class="fa-watertype fa-mapmode">' +
      '<button class="' + (state.mapMode === 'satellite' ? '' : 'active') + '" data-action="set-map-mode" data-mode="guide">Guide</button>' +
      '<button class="' + (state.mapMode === 'satellite' ? 'active' : '') + '" data-action="set-map-mode" data-mode="satellite">Satellite map</button>' +
      '</div>';

    // Satellite mode: the actual body of water, with pins the angler drops on it.
    if (state.mapMode === 'satellite') {
      // The lake/river toggle stays reachable here too: it decides which set of
      // structures the pin palette below offers.
      return '<div class="fa-section"><div class="fa-section-label">' + label + '</div>' +
        modeToggle + typeToggle +
        '<div id="fa-satmap-tools" class="fa-satmap-tools"></div>' +
        '<div id="fa-satmap" class="fa-satmap"></div>' +
        '<div id="fa-satmap-hint" class="fa-fineprint"></div>' +
        '</div>';
    }

    return '<div class="fa-section"><div class="fa-section-label">' + label + '</div>' +
      modeToggle + typeToggle + selector +
      '<figure class="fa-watermap"><div class="fa-watermap-svg">' + svg + '</div>' +
      '<figcaption class="fa-fineprint">Filled amber marks the prime structure' + forWhom + ' — a general illustration, not a survey of ' + esc(d.waterBody) + '. On arrival, match these to what you can actually see and reach.</figcaption>' +
      '</figure>' + tierKey + legend + '</div>';
  }

  function lakeSvg(pinColor) {
    return '<svg viewBox="0 0 640 380" role="img" aria-label="Schematic of a lake showing six productive fishing structures: points, weed edges, drop-offs, an inlet, a cove, and docks." style="width:100%;height:auto;display:block">' +
      '<defs><linearGradient id="fa-water-grad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#3f7d8c"/><stop offset="0.55" stop-color="#1f5566"/><stop offset="1" stop-color="#123a48"/>' +
      '</linearGradient></defs>' +
      '<rect x="0" y="0" width="640" height="380" fill="#e7dcc6"/>' +
      '<path d="M150,54 C260,30 400,34 486,72 C566,106 598,180 560,250 C542,286 500,300 470,300 ' +
        'L300,300 C240,300 150,296 108,240 C78,200 70,150 84,110 C96,78 120,62 150,54 Z" fill="url(#fa-water-grad)" stroke="#0f2e2c" stroke-width="2"/>' +
      '<path d="M150,54 C260,30 400,34 486,72 C566,106 598,180 560,250 C542,286 500,300 470,300 ' +
        'L300,300 C240,300 150,296 108,240 C78,200 70,150 84,110 C96,78 120,62 150,54 Z" fill="none" stroke="#bfe3f0" stroke-width="6" stroke-opacity="0.28"/>' +
      '<path d="M326,301 C336,244 424,244 434,301 Z" fill="#e7dcc6" stroke="#0f2e2c" stroke-width="2"/>' +
      '<path d="M150,86 C250,66 360,70 452,102" fill="none" stroke="#5C7A5E" stroke-width="3.5" stroke-dasharray="2 7" stroke-linecap="round"/>' +
      '<path d="M486,120 C540,160 540,220 500,262" fill="none" stroke="#0f2e2c" stroke-width="2.5" stroke-dasharray="9 6" stroke-opacity="0.7"/>' +
      '<path d="M150,54 C140,32 128,20 110,14" fill="none" stroke="#3f7d8c" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M150,54 C140,32 128,20 110,14" fill="none" stroke="#bfe3f0" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="150" y="286" width="7" height="26" rx="2" fill="#8a6a3f"/>' +
      '<rect x="176" y="288" width="7" height="24" rx="2" fill="#8a6a3f"/>' +
      spotPin(380, 280, 1, pinColor(0)) + spotPin(300, 92, 2, pinColor(1)) + spotPin(516, 190, 3, pinColor(2)) +
      spotPin(138, 40, 4, pinColor(3)) + spotPin(120, 200, 5, pinColor(4)) + spotPin(150, 268, 6, pinColor(5)) +
      '</svg>';
  }

  /* A river flowing left→right with a bend: the current digs the outside bank
     deep (1), runs shallow over a riffle (2) into a slow pool (3), with a seam
     where fast meets slow (4), an eddy behind a boulder (5), and a logjam (6). */
  function riverSvg(pinColor) {
    return '<svg viewBox="0 0 640 360" role="img" aria-label="Schematic of a river showing six holding spots: outside bend, riffle, pool, current seam, eddy, and wood and rock." style="width:100%;height:auto;display:block">' +
      '<defs><linearGradient id="fa-river-grad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#4a8494"/><stop offset="1" stop-color="#1f5566"/>' +
      '</linearGradient></defs>' +
      '<rect x="0" y="0" width="640" height="360" fill="#e7dcc6"/>' +
      // river channel: top bank curves down in the middle, bottom bank bulges lower = deep outside bend
      '<path d="M0,96 C150,96 210,120 330,122 C450,124 500,98 640,104 L640,250 C520,250 500,306 380,306 C250,306 150,258 0,256 Z" ' +
        'fill="url(#fa-river-grad)" stroke="#0f2e2c" stroke-width="2"/>' +
      // pool — a deeper, darker basin on the right-centre
      '<ellipse cx="410" cy="205" rx="120" ry="70" fill="#123a48" fill-opacity="0.55"/>' +
      // riffle — stippled lighter fast water on the left
      '<g stroke="#bfe3f0" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.7">' +
        '<path d="M70,150 l14,-7 M70,175 l14,-7 M70,200 l14,-7 M105,140 l14,-7 M105,165 l14,-7 M105,190 l14,-7 M105,215 l14,-7 M140,150 l14,-7 M140,175 l14,-7 M140,200 l14,-7" fill="none"/>' +
      '</g>' +
      // current seam — dashed line between fast (upper) and slow (lower/pool)
      '<path d="M175,150 C260,168 330,172 452,168" fill="none" stroke="#0f2e2c" stroke-width="2.5" stroke-dasharray="10 6" stroke-opacity="0.65"/>' +
      // boulder + eddy swirl behind it (downstream)
      '<circle cx="342" cy="150" r="12" fill="#8b8577" stroke="#0f2e2c" stroke-width="1.6"/>' +
      '<path d="M360,150 C380,150 384,170 366,172 C352,173 350,160 360,158" fill="none" stroke="#bfe3f0" stroke-width="2.2" stroke-opacity="0.8"/>' +
      // logjam on the lower bank
      '<g stroke="#8a6a3f" stroke-width="6" stroke-linecap="round">' +
        '<line x1="486" y1="270" x2="536" y2="252"/><line x1="492" y1="284" x2="548" y2="272"/><line x1="500" y1="262" x2="540" y2="288"/>' +
      '</g>' +
      // flow direction
      '<g stroke="#0f2e2c" stroke-width="2" stroke-opacity="0.45" fill="none" stroke-linecap="round">' +
        '<path d="M232,120 l16,6 l-16,6"/><path d="M300,110 l16,6 l-16,6"/><path d="M566,150 l16,6 l-16,6"/>' +
      '</g>' +
      '<text x="18" y="30" font-family="IBM Plex Mono, monospace" font-size="12" fill="#5C7A5E" letter-spacing="1">FLOW →</text>' +
      // numbered markers
      spotPin(430, 286, 1, pinColor(0)) + spotPin(108, 176, 2, pinColor(1)) + spotPin(410, 214, 3, pinColor(2)) +
      spotPin(300, 168, 4, pinColor(3)) + spotPin(372, 150, 5, pinColor(4)) + spotPin(512, 270, 6, pinColor(5)) +
      '</svg>';
  }

  function spotPin(x, y, n, color) {
    return '<g>' +
      '<circle cx="' + x + '" cy="' + y + '" r="14" fill="' + color + '" stroke="#241505" stroke-width="2"/>' +
      '<text x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" font-weight="700" fill="#241505">' + n + '</text>' +
      '</g>';
  }

  /* ============================== REAL SATELLITE MAP ==============================
     The actual body of water (Esri World Imagery satellite tiles, no key needed),
     with habitat and catch pins the angler drops on the true shoreline. Built
     imperatively so the Leaflet instance survives the app's full re-renders.
     Tiles need a real host — inside a locked sandbox they simply won't load, and
     the hint explains that rather than pretending. */

  function waterKey() {
    return (state.data && state.data.waterBody) ? state.data.waterBody : '_none';
  }
  function pinsForWater() {
    var k = waterKey();
    if (!state.mapPins[k]) state.mapPins[k] = [];
    return state.mapPins[k];
  }
  function saveMapPins() { return lsSet('mapPins', state.mapPins); }

  // The drop palette: the current water-type's structures, plus a catch marker.
  function mapPinTools() {
    var river = state.waterType === 'river';
    var spots = river ? RIVER_SPOTS : WATER_SPOTS;
    var tools = spots.map(function (s) { return { key: 'h' + s.n, label: s.name, color: '#C9803E', kind: 'habitat' }; });
    tools.push({ key: 'catch', label: '★ Catch spot', color: '#e0a458', kind: 'catch' });
    return tools;
  }

  function initSatMapIfNeeded() {
    var container = document.getElementById('fa-satmap');
    if (!container) {
      // Left the map view entirely — tear the Leaflet instance down.
      mapCurrentTool = null;
      if (leafletMap) { try { leafletMap.remove(); } catch (e) {} leafletMap = null; }
      return;
    }
    var hint = document.getElementById('fa-satmap-hint');
    var toolsEl = document.getElementById('fa-satmap-tools');

    if (typeof window.L === 'undefined') {
      container.innerHTML = '<div class="fa-map-blocked">The map library didn’t load. Open this app over the internet (not offline) and reload.</div>';
      if (hint) hint.textContent = '';
      return;
    }

    var c = coordsFor(state.data);
    if (!c) {
      container.innerHTML = '<div class="fa-map-blocked">Set this water’s location first (use “Near me” or “Set location” on the Guide) so the map knows where to center.</div>';
      if (toolsEl) toolsEl.innerHTML = '';
      if (hint) hint.textContent = '';
      return;
    }

    // Build the pin toolbar imperatively (its own listeners; stays out of render()).
    if (toolsEl) {
      mapCurrentTool = null;
      toolsEl.innerHTML = '';
      var tools = mapPinTools();
      tools.forEach(function (t) {
        var b = document.createElement('button');
        b.className = 'fa-maptool';
        b.textContent = t.label;
        b.style.borderColor = t.color;
        b.onclick = function () {
          if (mapCurrentTool && mapCurrentTool.key === t.key) { mapCurrentTool = null; }
          else { mapCurrentTool = t; }
          Array.prototype.forEach.call(toolsEl.children, function (child) { child.classList.remove('active'); });
          if (mapCurrentTool) { b.classList.add('active'); b.style.background = t.color; }
          else { b.style.background = ''; }
          updateMapHint();
        };
        toolsEl.appendChild(b);
      });
      var gps = document.createElement('button');
      gps.className = 'fa-maptool fa-maptool-gps';
      gps.textContent = '📍 My position';
      gps.onclick = mapLocateMe;
      toolsEl.appendChild(gps);
      var here = document.createElement('button');
      here.className = 'fa-maptool fa-maptool-gps';
      here.textContent = '★ Pin me here';
      here.onclick = mapPinMeHere;
      toolsEl.appendChild(here);
      var off = document.createElement('button');
      off.className = 'fa-maptool fa-maptool-gps';
      off.textContent = '⤓ Save area offline';
      off.onclick = saveMapAreaOffline;
      toolsEl.appendChild(off);
    }

    // (Re)create the Leaflet map — after a re-render the container is fresh.
    if (leafletMap && leafletMap._fa_container !== container) { try { leafletMap.remove(); } catch (e) {} leafletMap = null; }
    if (!leafletMap) {
      leafletMap = window.L.map(container, { zoomControl: true, attributionControl: true }).setView([c.lat, c.lon], 15);
      leafletMap._fa_container = container;
      window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, attribution: 'Imagery © Esri, Maxar, Earthstar Geographics'
      }).addTo(leafletMap);
      // faint place labels over the imagery
      window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, opacity: 0.9
      }).addTo(leafletMap);
      leafletMap.on('click', function (e) {
        if (!mapCurrentTool) return;
        addMapPin(e.latlng.lat, e.latlng.lng, mapCurrentTool);
      });
      // A tile that never loads (blocked host) → tell the truth.
      var errs = 0;
      leafletMap.eachLayer(function (layer) {
        if (layer.on) layer.on('tileerror', function () { errs++; if (errs === 4) updateMapHint(true); });
      });
      renderMapPins();
    }
    // Leaflet sizes to the container; if it was hidden at init, nudge it.
    setTimeout(function () { if (leafletMap) leafletMap.invalidateSize(); }, 60);
    updateMapHint();
  }

  function updateMapHint(blocked) {
    var hint = document.getElementById('fa-satmap-hint');
    if (!hint) return;
    if (blocked) {
      hint.textContent = 'Satellite tiles aren’t loading here — this view needs the app opened over the internet on its own (not inside a sandboxed frame).';
      return;
    }
    hint.textContent = mapCurrentTool
      ? 'Tap the map to drop a “' + mapCurrentTool.label + '” pin exactly where you see it on the water. Tap a pin to remove it.'
      : 'Pick a habitat or catch pin above, then tap the real water to mark it. Pins are saved on this device for ' + waterKey() + '.';
  }

  function pinColorFor(tool) { return tool.kind === 'catch' ? '#e0a458' : '#C9803E'; }

  /* Leaflet markers are live objects with a reference back to the map, so they
     can never be stored on the pin itself — JSON.stringify would hit a circular
     reference and every save after the first would silently fail. They live in
     their own registry, keyed by pin id. */
  var pinMarkers = {};
  var pendingPhotoPinId = null;
  var mapHintTimer = null;

  function addMapPin(lat, lon, tool) {
    var pin = { id: makeId(), kind: tool.kind, label: tool.label, lat: lat, lon: lon, at: new Date().toISOString() };
    pinsForWater().push(pin);
    saveMapPins();
    if (leafletMap) leafletMap.addLayer(buildMarker(pin));
    updateMapHint();
    return pin;
  }

  function pinById(id) {
    return pinsForWater().find(function (p) { return p.id === id; });
  }

  function buildMarker(pin) {
    var isCatch = pin.kind === 'catch';
    // The glyph inside the pin is drawn by CSS (::after un-rotates it); putting
    // one in the markup as well would render a second, sideways copy.
    var html = '<div class="fa-mappin ' + (isCatch ? 'catch' : 'habitat') + (pin.photo ? ' has-photo' : '') + '"></div>';
    var icon = window.L.divIcon({ className: 'fa-mappin-wrap', html: html, iconSize: [22, 22], iconAnchor: [11, 11] });
    var m = window.L.marker([pin.lat, pin.lon], { icon: icon });
    m.bindPopup(pinPopupHtml(pin), { minWidth: 200, maxWidth: 240 });
    m.on('popupopen', function (e) { wirePinPopup(e.popup, pin); });
    pinMarkers[pin.id] = m;
    return m;
  }

  /* The popup is the pin's whole record: what it is, the photo taken there, a
     note in your own words, and the coordinates it actually sits on. */
  function pinPopupHtml(pin) {
    var when = pin.at ? new Date(pin.at) : null;
    return '<div class="fa-pinpop">' +
      '<div class="fa-pinpop-title">' + escHtml(pin.label) + '</div>' +
      (pin.photo ? '<img class="fa-pinpop-photo" src="' + pin.photo + '" alt="">' : '') +
      '<input class="fa-pinpop-note" maxlength="140" placeholder="note — depth, bottom, what worked" value="' + escHtml(pin.note || '') + '">' +
      '<div class="fa-pinpop-row">' +
      '<button class="fa-pinpop-btn" data-a="photo">' + (pin.photo ? '↻ Replace photo' : '📷 Add photo') + '</button>' +
      '<button class="fa-pinpop-btn" data-a="share">⇪ Share</button>' +
      (pin.photo ? '<button class="fa-pinpop-btn" data-a="unphoto">Remove photo</button>' : '') +
      '<button class="fa-pinpop-btn danger" data-a="del">Delete pin</button>' +
      '</div>' +
      '<div class="fa-pinpop-coords">' + pin.lat.toFixed(5) + ', ' + pin.lon.toFixed(5) +
      (pin.accuracy != null ? ' · ±' + pin.accuracy + ' m' : '') +
      (when ? ' · ' + when.toLocaleDateString() : '') + '</div>' +
      '</div>';
  }

  function wirePinPopup(popup, pin) {
    var node = popup._contentNode;
    if (!node) return;
    var note = node.querySelector('.fa-pinpop-note');
    if (note) {
      note.oninput = function () { pin.note = note.value.slice(0, 140); saveMapPins(); };
      // Leaflet stops map drags on the popup, but not key events — keep typing local.
      note.onkeydown = function (ev) { ev.stopPropagation(); };
    }
    Array.prototype.forEach.call(node.querySelectorAll('.fa-pinpop-btn'), function (btn) {
      btn.onclick = function () {
        var a = btn.getAttribute('data-a');
        if (a === 'del') { removeMapPin(pin.id); if (leafletMap) leafletMap.closePopup(); }
        else if (a === 'photo') pickPinPhoto(pin.id);
        else if (a === 'share') sharePin(pin);
        else if (a === 'unphoto') { pin.photo = null; saveMapPins(); refreshMarker(pin); }
      };
    });
  }

  function escHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Rebuild one marker in place after its photo or note changed, and reopen its
     popup so the change is visible without hunting for the pin again. */
  function refreshMarker(pin) {
    if (!leafletMap) return;
    var old = pinMarkers[pin.id];
    if (old) leafletMap.removeLayer(old);
    delete pinMarkers[pin.id];
    var next = buildMarker(pin);
    leafletMap.addLayer(next);
    next.openPopup();
  }

  function pickPinPhoto(id) {
    pendingPhotoPinId = id;
    var input = document.getElementById('fa-pin-photo-input');
    if (!input) return;
    input.value = '';
    input.click();
  }

  /* Photos are stored on the pin itself, at the pin's exact coordinates, so a
     picture of a fish is filed at the square metre of water it came out of.
     They are the only thing in this app big enough to fill a browser's storage,
     so a failed save is reverted rather than left half-applied. */
  function handlePinPhotoPick(file) {
    var id = pendingPhotoPinId;
    pendingPhotoPinId = null;
    if (!file || !id) return;
    var pin = pinById(id);
    if (!pin) return;
    if (isHeic(file)) {
      flashMapHint('That’s a HEIC photo, which most browsers can’t read here. A JPG or PNG works.');
      return;
    }
    flashMapHint('Adding the photo…', 20000);
    resizeImageFile(file, 360, 0.55).then(function (dataUrl) {
      var previous = pin.photo || null;
      pin.photo = dataUrl;
      if (!saveMapPins()) {
        pin.photo = previous;
        saveMapPins();
        flashMapHint('This browser’s storage is full. Remove a photo from another pin and try again.');
        return;
      }
      refreshMarker(pin);
      flashMapHint('Photo pinned to that exact spot — ' + pin.lat.toFixed(5) + ', ' + pin.lon.toFixed(5) + '.');
    }).catch(function () {
      flashMapHint('Couldn’t use that photo — try a different one (JPG or PNG works best).');
    });
  }

  function renderMapPins() {
    pinMarkers = {};
    pinsForWater().forEach(function (pin) {
      delete pin._marker; // legacy field from an earlier build
      if (leafletMap) leafletMap.addLayer(buildMarker(pin));
    });
  }

  function removeMapPin(id) {
    var arr = pinsForWater();
    var idx = arr.findIndex(function (p) { return p.id === id; });
    if (idx === -1) return;
    if (pinMarkers[id] && leafletMap) leafletMap.removeLayer(pinMarkers[id]);
    delete pinMarkers[id];
    arr.splice(idx, 1);
    saveMapPins();
    updateMapHint();
  }

  /* A temporary message in the map's hint line, which then goes back to telling
     you what the selected tool does. */
  function flashMapHint(msg, ms) {
    var hint = document.getElementById('fa-satmap-hint');
    if (!hint) return;
    hint.textContent = msg;
    if (mapHintTimer) clearTimeout(mapHintTimer);
    mapHintTimer = setTimeout(function () { mapHintTimer = null; updateMapHint(); }, ms || 6000);
  }

  /* Drop a catch pin on your actual GPS position rather than where you guessed
     on the imagery — then open it so the photo button is one tap away. */
  function mapPinMeHere() {
    flashMapHint('Holding a few seconds for the tightest GPS fix…', 20000);
    watchBestFix(function (lat, lon, accuracy) {
      var pin = addMapPin(lat, lon, { key: 'catch', kind: 'catch', label: '★ Catch spot' });
      pin.accuracy = Math.round(accuracy);
      saveMapPins();
      if (leafletMap) {
        leafletMap.setView([lat, lon], Math.max(leafletMap.getZoom(), 17));
        refreshMarker(pin);
      }
      flashMapHint('Pinned where you’re standing (±' + Math.round(accuracy) + ' m). Add a photo to it from the popup.', 9000);
    }, function (err) {
      flashMapHint(gpsErrorMessage(err), 9000);
    });
  }

  /* Log a catch, then drop it — photo and all — on the coordinates you caught it
     at. Only ever fired from the checkbox on the catch form, because a catch
     logged from the sofa would otherwise be pinned to the sofa. */
  function pinCatchToMap(entry) {
    state.notice = 'Getting a GPS fix to pin that catch…';
    render();
    watchBestFix(function (lat, lon, accuracy) {
      var water = entry.waterBody;
      if (!state.mapPins[water]) state.mapPins[water] = [];
      var bits = [];
      if (entry.weight) bits.push(fmtWeight(entry.weight));
      if (entry.length) bits.push(fmtLength(entry.length));
      if (entry.lure) bits.push('on ' + entry.lure);
      var pin = {
        id: makeId(), kind: 'catch', label: '★ ' + entry.species,
        lat: lat, lon: lon, note: bits.join(' · '), photo: entry.photo || null,
        at: entry.date, accuracy: Math.round(accuracy), catchId: entry.id
      };
      state.mapPins[water].push(pin);
      var saved = saveMapPins();
      if (!saved && pin.photo) { pin.photo = null; saved = saveMapPins(); }
      state.error = null;
      state.notice = 'Pinned ' + entry.species + ' at ' + lat.toFixed(5) + ', ' + lon.toFixed(5) +
        ' (±' + Math.round(accuracy) + ' m)' + (pin.photo ? ' with its photo.' : '.') +
        (saved ? '' : ' Storage is full, so this pin won’t survive a reload.');
      render();
    }, function (err) {
      state.notice = null;
      state.error = 'Catch saved, but the pin didn’t land: ' + gpsErrorMessage(err);
      render();
    });
  }

  /* Reopen a water on the satellite map straight from its saved pins — works
     even if the water isn't a saved favorite, by centering on the pins. */
  function openSpotsMap(waterBody) {
    var pins = state.mapPins[waterBody] || [];
    var fav = state.favorites.find(function (f) { return f.waterBody === waterBody; });
    if (fav) {
      state.data = fav.report;
    } else {
      var lat = 0, lon = 0;
      pins.forEach(function (p) { lat += p.lat; lon += p.lon; });
      var n = pins.length || 1;
      var rep = genericReport(waterBody);
      rep.waterBody = waterBody;
      rep.location = 'Saved spots';
      rep.coords = { lat: lat / n, lon: lon / n };
      state.data = rep;
      lsSet('lastReport', { data: rep, query: waterBody });
    }
    state.query = waterBody;
    state.mapMode = 'satellite';
    state.view = 'today';
    solunarCache = { key: null, value: null };
    render();
  }

  function clearWaterPins(waterBody) {
    delete state.mapPins[waterBody];
    saveMapPins();
    render();
  }

  /* Pre-fetch the tiles currently in view (this zoom and one deeper) so the SW
     caches them and the water stays visible offline. Capped so it can't hammer
     the tile server. */
  function saveMapAreaOffline() {
    if (!leafletMap) return;
    var hint = document.getElementById('fa-satmap-hint');
    var b = leafletMap.getBounds();
    var z0 = Math.round(leafletMap.getZoom());
    var urls = [];
    function lon2x(lon, z) { return Math.floor((lon + 180) / 360 * Math.pow(2, z)); }
    function lat2y(lat, z) { var r = lat * Math.PI / 180; return Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * Math.pow(2, z)); }
    var layers = ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/',
                  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/'];
    for (var z = z0; z <= Math.min(z0 + 1, 18) && urls.length < 400; z++) {
      var xMin = lon2x(b.getWest(), z), xMax = lon2x(b.getEast(), z);
      var yMin = lat2y(b.getNorth(), z), yMax = lat2y(b.getSouth(), z);
      for (var x = xMin; x <= xMax && urls.length < 400; x++)
        for (var y = yMin; y <= yMax && urls.length < 400; y++)
          layers.forEach(function (base) { urls.push(base + z + '/' + y + '/' + x); });
    }
    if (hint) hint.textContent = 'Saving ' + urls.length + ' map tiles for offline…';
    var done = 0;
    Promise.all(urls.map(function (u) {
      return fetch(u, { mode: 'no-cors' }).then(function () { done++; }).catch(function () {});
    })).then(function () {
      if (hint) hint.textContent = 'Saved this area offline (' + done + ' tiles). It’ll show even without signal at this zoom.';
    });
  }

  function mapLocateMe() {
    var hint = document.getElementById('fa-satmap-hint');
    if (hint) hint.textContent = 'Getting your GPS position…';
    watchBestFix(function (lat, lon, acc) {
      if (!leafletMap) return;
      leafletMap.setView([lat, lon], 16);
      if (leafletMap._fa_youMarker) leafletMap.removeLayer(leafletMap._fa_youMarker);
      var icon = window.L.divIcon({ className: 'fa-mappin-wrap', html: '<div class="fa-mappin you"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
      leafletMap._fa_youMarker = window.L.marker([lat, lon], { icon: icon }).addTo(leafletMap);
      if (hint) hint.textContent = 'Centered on your position' + (acc != null ? ' (±' + Math.round(acc) + ' m)' : '') + '. Pick a pin and mark the water around you.';
    }, function (err) {
      if (hint) hint.textContent = gpsErrorMessage(err);
    });
  }

  function renderCatchSection(d) {
    var html = '<div class="fa-section"><div class="fa-section-label">Your catch</div>';
    if (!state.showCatchForm) {
      if (state.catchSuccess) html += '<div class="fa-notice fa-notice-inline">' + esc(state.catchSuccess) + '</div>';
      html += '<button class="fa-catch-toggle" data-action="open-catch-form">📸 Log a catch from ' + esc(d.waterBody) + '</button>';
    } else {
      var cd = state.catchDraft;
      html += '<div class="fa-catch-form">';
      html += '<div class="fa-private-note"><span>🌙</span><span><strong>Moon phase captured automatically</strong><br>' + esc(state.moonPhase ? state.moonPhase.name : 'Calculating…') + ' — locked to this catch.</span></div>';
      html += '<div class="fa-field"><label>Species</label><input type="text" id="fa-catch-species" data-bind="catchDraft.species" value="' + esc(cd.species) + '" placeholder="e.g. Largemouth Bass" list="fa-species-list">';
      html += '<datalist id="fa-species-list">' + (d.species || []).map(function (s) { return '<option value="' + esc(s.name) + '">'; }).join('') + '</datalist></div>';
      html += '<div class="fa-catch-row">' +
        '<div class="fa-field"><label>Weight (' + weightUnit() + ')</label><input type="number" step="0.01" data-bind="catchDraft.weight" value="' + esc(cd.weight) + '" placeholder="' + (isMetric() ? 'e.g. 1.9' : 'e.g. 4.2') + '"></div>' +
        '<div class="fa-field"><label>Length (' + lengthUnit() + ')</label><input type="number" step="0.1" data-bind="catchDraft.length" value="' + esc(cd.length) + '" placeholder="' + (isMetric() ? 'e.g. 48' : 'e.g. 19') + '"></div></div>';
      html += '<div class="fa-catch-row">' +
        '<div class="fa-field"><label>Lure used</label><input type="text" data-bind="catchDraft.lure" value="' + esc(cd.lure) + '" placeholder="White spinnerbait"></div>' +
        '<div class="fa-field"><label>Depth (' + depthUnit() + ')</label><input type="number" step="0.5" data-bind="catchDraft.depth" value="' + esc(cd.depth) + '" placeholder="' + (isMetric() ? '2' : '6') + '"></div></div>';
      html += '<div class="fa-field">' + (cd.photo
        ? '<img class="fa-photo-preview" src="' + cd.photo + '" alt=""><button class="fa-danger-link" data-action="clear-catch-photo" style="margin-top:6px">Remove photo</button>'
        : '<div class="fa-photo-drop" data-action="pick-catch-photo">📷 Tap to add a photo (optional)</div>') +
        '<input type="file" id="fa-catch-photo-input" accept="image/*" style="display:none">' + '</div>';
      html += '<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(35,32,27,.75)"><input type="checkbox" id="fa-catch-private" ' + (cd.isPrivate ? 'checked' : '') + '> Keep this catch private (won’t appear on the shared leaderboard)</label>';
      html += '<label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:rgba(35,32,27,.75);margin-top:9px"><input type="checkbox" id="fa-catch-pin" ' + (cd.pinToMap ? 'checked' : '') + ' style="margin-top:3px"> <span>📍 Pin this catch — and its photo — to the map where I’m standing right now<br><span style="font-size:11.5px;color:rgba(35,32,27,.5)">Uses GPS, so only tick it if you’re at the spot.</span></span></label>';
      if (state.catchError) html += '<div class="fa-error">' + esc(state.catchError) + '</div>';
      if (state.catchSuccess) html += '<div class="fa-notice">' + esc(state.catchSuccess) + '</div>';
      html += '<div class="fa-catch-submit-row"><button class="fa-btn" data-action="submit-catch"' + (state.catchSubmitting ? ' disabled' : '') + '>' + (state.catchSubmitting ? 'Saving…' : 'Save catch') + '</button>' +
        '<button class="fa-btn-secondary" data-action="close-catch-form">Cancel</button></div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderLeaderboard() {
    var entries = Object.keys(state.leaderboard)
      .map(function (k) { return state.leaderboard[k]; })
      .filter(function (entry) { return entry && entry.species; })
      .sort(function (a, b) { return String(a.species).localeCompare(String(b.species)); });
    var html = '<div class="fa-leaderboard-section"><div class="fa-leaderboard-header"><div class="fa-section-label" style="color:var(--amber)">🏆 Biggest catch, by species</div></div>';
    if (!entries.length) {
      html += '<div class="fa-lb-empty">No catches logged yet across any water — be the first.</div>';
    } else {
      html += '<div class="fa-leaderboard-grid">' + entries.map(function (entry) {
        var avatarHtml = entry.avatar ? '<img src="' + entry.avatar + '" alt="">' : esc((entry.anglerName || 'A')[0] ? (entry.anglerName || 'A')[0].toUpperCase() : 'A');
        return '<div class="fa-lb-card">' + (entry.photo ? '<img src="' + entry.photo + '" alt="' + esc(entry.species) + '" class="fa-lb-photo">' : '') +
          '<div class="fa-lb-body"><div class="fa-lb-species">' + esc(entry.species) + '</div>' +
          '<div class="fa-lb-measure">' + (entry.weight ? esc(fmtWeight(entry.weight)) : esc(fmtLength(entry.length))) + '</div>' +
          '<div class="fa-lb-angler"><span class="fa-avatar" style="width:18px;height:18px;font-size:9px">' + avatarHtml + '</span>' + esc(entry.anglerName) + '</div>' +
          (entry.waterBody ? '<div class="fa-lb-water">' + esc(entry.waterBody) + '</div>' : '') + '</div></div>';
      }).join('') + '</div>';
    }
    html += '</div>';
    return html;
  }

  /* ---- Trip ---- */

  function renderTrip() {
    var html = '<div><div class="fa-eyebrow">Private on-water intelligence</div><h1 class="fa-page-title">Live Trip Mode</h1>' +
      '<p class="fa-page-copy">Record the whole session—including quiet time—so your patterns become real.</p>';

    if (!state.activeTrip) {
      html += '<div class="fa-panel fa-trip-hero"><div class="fa-eyebrow" style="margin-bottom:6px">Ready at ' + esc((state.data && state.data.waterBody) || 'your next water') + '</div>' +
        '<div class="fa-page-title" style="font-size:24px;margin:4px 0">Start collecting the data nobody else owns.</div>' +
        '<div class="fa-page-copy" style="margin-bottom:0">Moon phase, lure changes, catches, misses, and zero-catch time stay on this device.</div>' +
        '<div class="fa-primary-row"><button class="fa-btn" data-action="begin-trip">▶ Start Fishing</button><button class="fa-toggle-btn" data-action="set-view" data-view="gear">Set up gear first</button></div></div>';
    } else {
      var t = state.activeTrip;
      var sec = tripElapsedSec();
      var hh = Math.floor(sec / 3600), mm = Math.floor((sec % 3600) / 60), ss = sec % 60;
      var lures = ownedLures();
      var rec = recommendation();

      html += '<div class="fa-panel fa-trip-hero"><div class="fa-eyebrow" style="margin-bottom:6px">' + (t.pausedAt ? 'Paused' : 'Live') + ' · ' + esc(t.waterBody) + '</div>' +
        '<div class="fa-trip-clock" id="fa-trip-clock">' + hh + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0') + '</div>' +
        '<div class="fa-stat-row"><div class="fa-stat"><strong>' + t.catches + '</strong><span>Catches</span></div><div class="fa-stat"><strong>' + t.misses + '</strong><span>Misses</span></div><div class="fa-stat"><strong>' + t.casts + '</strong><span>Casts logged</span></div></div>';

      if (lures.length > 0) {
        html += '<div class="fa-field"><label style="color:rgba(237,228,211,.55)">Tied on now</label><select id="fa-trip-lure-select">' +
          (t.lure === 'Not selected' ? '<option>Not selected</option>' : '') +
          lures.map(function (g) { return '<option' + (g.name === t.lure ? ' selected' : '') + '>' + esc(g.name) + '</option>'; }).join('') + '</select></div>';
      }

      html += '<div class="fa-command"><strong>Do this now:</strong><br>' + (rec ? esc(rec.retrieve) + '. Target ' + esc(rec.target.toLowerCase()) + '.' : 'Add your tackle to Gear Locker for a personalized recommendation.') + '</div>';

      html += '<div class="fa-action-grid">' +
        '<button class="fa-btn" data-action="open-trip-catch"' + (t.pausedAt ? ' disabled' : '') + '>+ Catch</button>' +
        '<button class="fa-action" data-action="trip-event" data-type="miss"' + (t.pausedAt ? ' disabled' : '') + '><strong>+ Missed strike</strong><span>Records lure and moon phase</span></button>' +
        '<button class="fa-action" data-action="trip-event" data-type="cast"' + (t.pausedAt ? ' disabled' : '') + '><strong>+ 10 casts</strong><span>Track presentation exposure</span></button>' +
        '<button class="fa-action" data-action="toggle-pause"><strong>' + (t.pausedAt ? '▶ Resume' : 'Ⅱ Pause') + '</strong><span>Pause elapsed fishing time</span></button>' +
        '<button class="fa-action" data-action="undo-trip-event"' + (!(t.events && t.events.length) ? ' disabled' : '') + '><strong>↶ Undo last</strong><span>' + ((t.events && t.events.length) || 0) + ' timestamped events</span></button>' +
        '</div>';

      var noteCount = (t.events || []).filter(function (e) { return e.type === 'note'; }).length;
      html += '<div style="margin-top:12px"><textarea class="fa-note-input" id="fa-trip-note" data-bind="tripNote" placeholder="Water clarity, vegetation, snag, casting direction…">' + esc(state.tripNote) + '</textarea>' +
        '<div class="fa-note-row"><button class="fa-toggle-btn" data-action="save-trip-note">Save note</button>' +
        '<span class="fa-note-count">' + (noteCount ? noteCount + (noteCount === 1 ? ' note saved' : ' notes saved') + ' this trip' : 'Notes are timestamped with the lure you had on') + '</span></div></div>';

      html += '<div class="fa-primary-row"><button class="fa-toggle-btn" data-action="finish-trip">End and save trip</button></div></div>';

      // The guide's calls belong here most of all: this is the screen that is
      // open while you are standing in the water.
      if (state.data) {
        html += '<div class="fa-panel"><div class="fa-section-label">The guide\u2019s call \u2014 right now</div>' +
          '<div id="fa-guru">' + guruHtml(true) + '</div></div>';
      }

      if (rec) {
        html += '<div class="fa-panel"><div class="fa-section-label">What should I throw?</div><h3 style="margin:0 0 6px">' + esc(rec.lure) + '</h3>' +
          '<div class="fa-list-sub">' + esc(rec.target) + ' · ' + esc(rec.retrieve) + '</div><div style="margin-top:10px"><span class="fa-confidence">' + esc(rec.confidence) + ' confidence</span></div></div>';
      }
    }
    html += '</div>';
    return html;
  }

  /* ---- Gear ---- */

  function renderGear() {
    var g = state.gearDraft;
    var html = '<div><div class="fa-eyebrow">Personal tackle inventory</div><h1 class="fa-page-title">Gear Locker</h1>' +
      '<p class="fa-page-copy">Recommendations only use equipment you actually own.</p>';
    html += '<div class="fa-panel"><div class="fa-catch-row">' +
      '<div class="fa-field"><label>Gear name</label><input id="fa-gear-name" data-bind="gearDraft.name" value="' + esc(g.name) + '" placeholder="White 3/8 oz spinnerbait"></div>' +
      '<div class="fa-field"><label>Type</label><select id="fa-gear-type" data-bind="gearDraft.type">' +
      ['Lure', 'Rod', 'Reel', 'Line', 'Leader'].map(function (opt) { return '<option' + (opt === g.type ? ' selected' : '') + '>' + opt + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="fa-field"><label>Color, weight, or setup</label><input id="fa-gear-detail" data-bind="gearDraft.detail" value="' + esc(g.detail) + '" placeholder="White/red eye · 3/8 oz"></div>' +
      '<button class="fa-btn" data-action="add-gear">Add to locker</button></div>';

    html += '<div class="fa-panel"><div class="fa-section-label">Your equipment · ' + state.gear.length + '</div>';
    if (state.gear.length) {
      html += '<div class="fa-list">' + state.gear.map(function (item) {
        return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(item.name) + '</div><div class="fa-list-sub">' + esc(item.type) + (item.detail ? ' · ' + esc(item.detail) : '') + '</div></div><div>' +
          '<button class="fa-toggle-btn on-light' + (item.tiedOn ? ' active' : '') + '" data-action="select-gear" data-id="' + item.id + '">' + (item.tiedOn ? 'Tied on' : 'Use now') + '</button> ' +
          '<button class="fa-danger-link" data-action="remove-gear" data-id="' + item.id + '">Remove</button></div></div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Add your first lure so Trip Mode can make a real recommendation.</div>';
    }
    html += '</div></div>';
    return html;
  }

  /* ---- Waters ---- */

  function renderWaters() {
    var s = state.spotDraft;
    var html = '<div><div class="fa-eyebrow">Your private fishing memory</div><h1 class="fa-page-title">My Waters</h1>' +
      '<p class="fa-page-copy">Saved waters and private spot notes, kept on this device.</p>';

    html += '<div class="fa-panel"><div class="fa-section-label">Saved waters · ' + state.favorites.length + '</div>';
    if (state.favorites.length) {
      html += '<div class="fa-list">' + state.favorites.map(function (water) {
        var n = state.myCatches.filter(function (c) { return c.waterBody === water.waterBody; }).length;
        return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(water.waterBody) + '</div><div class="fa-list-sub">' + esc(water.location || 'Location saved') + ' · ' + n + ' catches</div></div>' +
          '<button class="fa-btn-secondary" data-action="load-favorite" data-water="' + esc(water.waterBody) + '">Open</button></div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Star a water from Today to build your private lakebook.</div>';
    }
    html += '</div>';

    html += '<div class="fa-panel"><div class="fa-section-label">Save a private spot</div>' +
      '<div class="fa-catch-row"><div class="fa-field"><label>Spot name</label><input id="fa-spot-name" data-bind="spotDraft.name" value="' + esc(s.name) + '" placeholder="North weed point"></div>' +
      '<div class="fa-field"><label>Access</label><select id="fa-spot-access" data-bind="spotDraft.access">' + ['Shore', 'Boat', 'Kayak'].map(function (o) { return '<option' + (o === s.access ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="fa-catch-row"><div class="fa-field"><label>Depth (' + depthUnit() + ')</label><input type="number" step="0.5" id="fa-spot-depth" data-bind="spotDraft.depth" value="' + esc(s.depth) + '" placeholder="' + (isMetric() ? '2' : '6') + '"></div>' +
      '<div class="fa-field"><label>Bottom</label><select id="fa-spot-bottom" data-bind="spotDraft.bottom">' + ['Unknown', 'Rock', 'Sand', 'Muck', 'Gravel', 'Mixed'].map(function (o) { return '<option' + (o === s.bottom ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="fa-catch-row"><div class="fa-field"><label>Vegetation</label><input id="fa-spot-veg" data-bind="spotDraft.vegetation" value="' + esc(s.vegetation) + '" placeholder="Pads, milfoil, sparse grass"></div>' +
      '<div class="fa-field"><label>Snag risk</label><select id="fa-spot-snag" data-bind="spotDraft.snag">' + ['Low', 'Medium', 'High'].map(function (o) { return '<option' + (o === s.snag ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="fa-field"><label>Productive casting direction</label><input id="fa-spot-direction" data-bind="spotDraft.direction" value="' + esc(s.direction) + '" placeholder="Cast northwest, retrieve along edge"></div>' +
      '<button class="fa-btn" data-action="save-spot">📍 Save private spot</button></div>';

    html += '<div class="fa-panel"><div class="fa-section-label">Private spots · ' + state.privateSpots.length + '</div>';
    if (state.privateSpots.length) {
      html += '<div class="fa-list">' + state.privateSpots.map(function (spot) {
        return '<div class="fa-list-row fa-spot-card"><div><div class="fa-list-main">' + esc(spot.name) + '</div>' +
          '<div class="fa-list-sub">' + esc(spot.waterBody) + ' · ' + esc(spot.access) + (spot.depth ? ' · ' + esc(fmtDepth(spot.depth)) : '') + ' · ' + esc(spot.bottom) + (spot.vegetation ? ' · ' + esc(spot.vegetation) : '') + '</div>' +
          '<div class="fa-fresh">PRIVATE · saved ' + new Date(spot.createdAt).toLocaleDateString() + '</div></div>' +
          '<button class="fa-danger-link" data-action="remove-spot" data-id="' + spot.id + '">Remove</button></div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Save exact structure, access, depth and casting direction, kept only on this device.</div>';
    }
    html += '</div>';

    // Marked map spots — every pin dropped on the satellite map, by water.
    var mapWaters = Object.keys(state.mapPins).filter(function (k) { return k !== '_none' && state.mapPins[k] && state.mapPins[k].length; });
    html += '<div class="fa-panel"><div class="fa-section-label">Marked spots on the map · ' + mapWaters.reduce(function (n, k) { return n + state.mapPins[k].length; }, 0) + '</div>';
    if (mapWaters.length) {
      html += '<div class="fa-list">' + mapWaters.map(function (k) {
        var pins = state.mapPins[k];
        var catches = pins.filter(function (p) { return p.kind === 'catch'; }).length;
        var habitat = pins.length - catches;
        var parts = [];
        var shots = pins.filter(function (p) { return !!p.photo; }).length;
        if (habitat) parts.push(habitat + ' habitat');
        if (catches) parts.push(catches + ' catch');
        if (shots) parts.push(shots + ' photo' + (shots === 1 ? '' : 's'));
        return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(k) + '</div>' +
          '<div class="fa-list-sub">' + parts.join(' · ') + ' pin' + (pins.length === 1 ? '' : 's') + '</div></div>' +
          '<div><button class="fa-btn-secondary" data-action="open-spots-map" data-water="' + esc(k) + '">Open map</button> ' +
          '<button class="fa-danger-link" data-action="clear-water-pins" data-water="' + esc(k) + '">Clear</button></div></div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Drop pins on the satellite map (any water’s report → Read the water → Satellite map) and they collect here.</div>';
    }
    html += '</div>';

    html += '<div class="fa-panel"><div class="fa-section-label">Logbook backup</div>' +
      '<p class="fa-tech-desc" style="margin-bottom:14px">Your gear, trips, catches, waters and spots live in this browser. Save a copy you can keep, or restore one here.</p>' +
      '<div class="fa-primary-row" style="margin-top:0">' +
      '<button class="fa-btn" data-action="export-logbook">↓ Download my logbook</button>' +
      '<button class="fa-btn-secondary" data-action="pick-import">↑ Restore from a file</button>' +
      '<button class="fa-btn-secondary" data-action="export-gpx">↓ Spots as GPX</button>' +
      '<input type="file" id="fa-import-input" accept="application/json,.json" style="display:none">' +
      '</div>' +
      (state.backupMessage ? '<div class="fa-notice" style="margin-top:14px">' + esc(state.backupMessage) + '</div>' : '') +
      (state.backupError ? '<div class="fa-error" style="margin-top:14px">' + esc(state.backupError) + '</div>' : '') +
      '<div class="fa-fineprint">Restoring replaces what is on this device. The logbook is plain JSON and holds everything — ' +
      state.myCatches.length + ' catches, ' + state.trips.length + ' trips, ' + state.gear.length + ' gear items and ' +
      countMapPins() + ' map pins with their photos and coordinates. GPX holds the pins only, in the format chartplotters, handheld GPS units and mapping apps read.</div>' +
      '</div>';

    html += '</div>';
    return html;
  }

  /* ---- Patterns ---- */

  function renderPatterns() {
    var trips = state.trips;
    var lp = lurePerformance();
    var html = '<div><div class="fa-eyebrow">Evidence from your own trips</div><h1 class="fa-page-title">Personal Patterns</h1>' +
      '<p class="fa-page-copy">Insights strengthen as you record successful and zero-catch trips.</p>';

    html += '<div class="fa-panel"><div class="fa-stat-row" style="color:var(--ink)">' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + trips.length + '</div><div class="fa-cond-label">Trips</div></div>' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + totalTripCatches() + '</div><div class="fa-cond-label">Trip catches</div></div>' +
      '<div class="fa-cond-item"><div class="fa-cond-value">' + catchTripRate() + '%</div><div class="fa-cond-label">Productive trips</div></div></div>';
    if (trips.length < 3) {
      html += '<div class="fa-insight"><strong>Experimental:</strong> Complete at least three trips—including zero-catch outings—to unlock defensible pattern comparisons.</div>';
    } else {
      html += '<div class="fa-insight"><strong>Growing evidence:</strong> ' + productiveTrips() + ' of ' + trips.length + ' trips produced catches. Keep logging lure changes and misses to isolate what actually works.</div>';
    }
    html += '</div>';

    html += renderPersonalPanel();

    html += '<div class="fa-panel"><div class="fa-section-label">Trip history</div>';
    if (trips.length) {
      html += '<div class="fa-list">' + trips.map(function (trip) {
        var open = state.expandedTripId === trip.id;
        var when = trip.startedAt ? new Date(trip.startedAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '';
        var row = '<div class="fa-trip-entry' + (open ? ' open' : '') + '">' +
          '<button class="fa-trip-head" data-action="toggle-trip" data-id="' + trip.id + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          '<span class="fa-trip-head-main"><span class="fa-list-main">' + esc(trip.waterBody) + '</span>' +
          '<span class="fa-list-sub">' + (when ? esc(when) + ' · ' : '') + trip.catches + ' catches · ' + trip.misses + ' misses · ' + esc(trip.lure) + (trip.zeroCatch ? ' · zero-catch trip' : '') + '</span></span>' +
          '<span class="fa-trip-head-right"><span class="fa-confidence">' + (trip.zeroCatch ? 'Baseline' : 'Signal') + '</span>' +
          '<span class="fa-caret">' + (open ? '▲' : '▼') + '</span></span></button>';
        if (open) row += renderTripDetail(trip);
        return row + '</div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Your first completed trip becomes the baseline.</div>';
    }
    html += '</div>';

    html += '<div class="fa-panel"><div class="fa-section-label">Lure strike conversion</div>';
    if (lp.length) {
      html += '<div class="fa-list">' + lp.map(function (row) {
        return '<div class="fa-list-row"><div><div class="fa-list-main">' + esc(row.lure) + '</div><div class="fa-list-sub">' + row.catches + ' catches from ' + row.attempts + ' recorded strikes</div></div>' +
          '<div style="text-align:right"><strong>' + row.conversion + '%</strong><div class="fa-confidence">' + (row.attempts >= 5 ? 'Growing' : 'Early') + '</div></div></div>';
      }).join('') + '</div>';
    } else {
      html += '<div class="fa-empty-panel">Record catches and missed strikes with a selected lure to reveal early patterns.</div>';
    }
    html += '</div></div>';
    return html;
  }

  /* Everything recorded during a trip, in order — this is where the notes you
     typed on the water are read back. */
  function renderTripDetail(trip) {
    var events = (trip.events || []).slice().sort(function (a, b) { return a.at - b.at; });
    var html = '<div class="fa-trip-detail">';

    var mins = trip.durationMs ? Math.max(1, Math.round(trip.durationMs / 60000)) : null;
    var bits = [];
    if (mins) bits.push(mins + ' min fished');
    if (trip.casts) bits.push(trip.casts + ' casts logged');
    if (trip.moon) bits.push(trip.moon);
    if (bits.length) html += '<div class="fa-trip-meta">' + esc(bits.join(' · ')) + '</div>';

    if (!events.length) {
      html += '<div class="fa-trip-empty">No events were recorded on this trip — the elapsed time is still a useful baseline.</div>';
      return html + '</div>';
    }

    html += '<ol class="fa-timeline-list">' + events.map(function (e) {
      var time = new Date(e.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      var kind = e.type, text = '', cls = '';
      if (kind === 'catch') {
        cls = 'catch';
        text = 'Caught ' + (e.species || 'a fish') + (e.weight ? ' · ' + fmtWeight(e.weight) : '') + (e.lure ? ' on ' + e.lure : '');
      } else if (kind === 'miss') {
        cls = 'miss';
        text = 'Missed a strike' + (e.lure ? ' on ' + e.lure : '');
      } else if (kind === 'cast') {
        text = '10 casts' + (e.lure ? ' with ' + e.lure : '');
      } else if (kind === 'lure-change') {
        cls = 'lure';
        text = 'Switched to ' + (e.lure || 'another lure');
      } else if (kind === 'note') {
        cls = 'note';
        text = e.note || '';
      } else {
        text = kind;
      }
      return '<li class="fa-event ' + cls + '"><span class="fa-event-time">' + esc(time) + '</span>' +
        '<span class="fa-event-text">' + esc(text) + '</span></li>';
    }).join('') + '</ol>';

    return html + '</div>';
  }

  /* ---- Modals ---- */

  function renderModals() {
    var html = '';

    if (state.showTripCatch && state.activeTrip) {
      var tc = state.tripCatchDraft;
      html += '<div class="fa-overlay" data-action="close-trip-catch"><div class="fa-modal" data-stop>' +
        '<div class="fa-modal-header"><div class="fa-modal-title">Log catch</div><button class="fa-modal-close" data-action="close-trip-catch">×</button></div>' +
        '<div class="fa-modal-body"><div class="fa-private-note"><span>📍</span><span><strong>' + esc(state.activeTrip.lure) + '</strong><br>Time and moon phase attach automatically.</span></div>' +
        '<div class="fa-field"><label>Species</label><input id="fa-trip-catch-species" data-bind="tripCatchDraft.species" value="' + esc(tc.species) + '" placeholder="Largemouth bass"></div>' +
        '<div class="fa-field"><label>Weight in ' + (isMetric() ? 'kilograms' : 'pounds') + ' (optional)</label><input type="number" step="0.01" id="fa-trip-catch-weight" data-bind="tripCatchDraft.weight" value="' + esc(tc.weight) + '" placeholder="' + (isMetric() ? '1.9' : '4.2') + '"></div>' +
        '<div class="fa-modal-actions"><button class="fa-btn-secondary" data-action="close-trip-catch">Cancel</button><button class="fa-btn" data-action="confirm-trip-catch">Save catch</button></div>' +
        '</div></div></div>';
    }

    if (state.endSummary) {
      var es = state.endSummary;
      var gearUsed = Array.from(new Set((es.events || []).map(function (e) { return e.lure; }).filter(Boolean))).join(', ') || es.lure;
      html += '<div class="fa-overlay"><div class="fa-modal" data-stop>' +
        '<div class="fa-modal-header"><div class="fa-modal-title">Trip saved to Patterns</div><button class="fa-modal-close" data-action="close-end-summary">×</button></div>' +
        '<div class="fa-modal-body"><div class="fa-summary-hero"><div class="fa-summary-number">' + es.catches + '</div><div class="fa-summary-label">catches at ' + esc(es.waterBody) + '</div></div>' +
        '<div class="fa-conditions-grid"><div class="fa-cond-item"><div class="fa-cond-value">' + Math.max(1, Math.round(es.durationMs / 60000)) + '</div><div class="fa-cond-label">Minutes fished</div></div>' +
        '<div class="fa-cond-item"><div class="fa-cond-value">' + es.misses + '</div><div class="fa-cond-label">Misses</div></div>' +
        '<div class="fa-cond-item"><div class="fa-cond-value">' + es.casts + '</div><div class="fa-cond-label">Casts logged</div></div></div>' +
        '<div class="fa-insight"><strong>' + (es.zeroCatch ? 'Valuable baseline saved.' : 'Signal saved.') + '</strong> ' +
        (es.bestHour != null ? 'Your best hour began around ' + new Date(2000, 0, 1, Number(es.bestHour)).toLocaleTimeString([], { hour: 'numeric' }) + '.' : 'No best hour yet.') +
        ' Gear used: ' + esc(gearUsed) + '.</div>' +
        '<div class="fa-modal-actions"><button class="fa-btn" data-action="view-patterns-from-summary">View Patterns</button></div></div></div></div>';
    }

    if (state.showProfileEditor) {
      var pd = state.profileDraft;
      html += '<div class="fa-overlay" data-action="close-profile"><div class="fa-modal" data-stop>' +
        '<div class="fa-modal-header"><div class="fa-modal-title">Your profile</div><button class="fa-modal-close" data-action="close-profile">×</button></div>' +
        '<div class="fa-modal-body"><div class="fa-field"><label>Avatar</label><div class="fa-avatar-picker">' +
        '<div class="fa-avatar-big" data-action="pick-avatar">' + (pd.avatar ? '<img src="' + pd.avatar + '" alt="">' : esc((pd.name || 'A')[0].toUpperCase())) + '</div>' +
        '<button class="fa-upload-btn" data-action="pick-avatar">Choose photo</button>' +
        '<input type="file" id="fa-avatar-input" accept="image/*" style="display:none"></div>' +
        (state.profileError ? '<div class="fa-error" style="margin-top:12px">' + esc(state.profileError) + '</div>' : '') + '</div>' +
        '<div class="fa-field"><label>Display name</label><input type="text" id="fa-profile-name" data-bind="profileDraft.name" value="' + esc(pd.name) + '" placeholder="e.g. Riverbend Randy"></div>' +
        '<div style="font-size:12px;color:rgba(35,32,27,0.5);margin-bottom:16px">This name and photo appear next to any catch you log on the shared leaderboard.</div>' +
        '<div class="fa-field"><label>Units</label><div class="fa-unit-toggle">' +
        '<button class="fa-unit-opt' + (state.units !== 'metric' ? ' active' : '') + '" data-action="set-units" data-units="imperial">Imperial · lb / in / ft</button>' +
        '<button class="fa-unit-opt' + (state.units === 'metric' ? ' active' : '') + '" data-action="set-units" data-units="metric">Metric · kg / cm / m</button>' +
        '</div></div>' +
        '<div class="fa-modal-actions"><button class="fa-btn-secondary" data-action="close-profile">Cancel</button><button class="fa-btn" data-action="save-profile">Save</button></div>' +
        '</div></div></div>';
    }

    if (state.showTrophyRoom) {
      html += '<div class="fa-overlay" data-action="close-trophy"><div class="fa-modal" style="max-width:720px" data-stop>' +
        '<div class="fa-modal-header"><div class="fa-modal-title">🏆 My Trophy Room</div><button class="fa-modal-close" data-action="close-trophy">×</button></div>' +
        '<div class="fa-modal-body">';
      if (!state.myCatches.length) {
        html += '<div class="fa-trophy-empty">No catches logged yet. Log one from any water’s report to start your collection.</div>';
      } else {
        html += '<div class="fa-trophy-grid">' + state.myCatches.map(function (c) {
          var key = speciesKeyFor(c.species);
          var lb = state.leaderboard[key];
          var isRecord = lb && lb.id === c.id;
          return '<div class="fa-trophy-card">' + (c.photo ? '<img src="' + c.photo + '" alt="' + esc(c.species) + '" class="fa-trophy-photo">' : '') +
            '<div class="fa-trophy-body"><div class="fa-trophy-species">' + esc(c.species) + '</div>' +
            '<div class="fa-trophy-meta">' + (c.weight ? fmtWeight(c.weight) : '') + (c.weight && c.length ? ' · ' : '') + (c.length ? fmtLength(c.length) : '') + '</div>' +
            (c.waterBody ? '<div class="fa-trophy-meta">' + esc(c.waterBody) + '</div>' : '') +
            (function () {
              var cond = [];
              if (c.moon) cond.push(c.moon);
              if (c.pressureTrend) cond.push(c.pressureTrend + ' pressure');
              if (c.tempC != null) cond.push(dispTemp(c.tempC) + tempUnit());
              return cond.length ? '<div class="fa-trophy-cond">' + esc(cond.join(' · ')) + '</div>' : '';
            })() +
            (isRecord ? '<div class="fa-record-badge" style="margin-top:6px">🏆 Current record</div>' : '') + '</div></div>';
        }).join('') + '</div>';
      if (state.myCatches.length > 12) {
        html += '<div class="fa-trophy-meta" style="margin-top:14px;text-align:center">Your last ' + state.myCatches.length +
          ' catches. The newest twelve keep their photos; older ones keep everything except the image, so your storage stays free for new ones.</div>';
      }
      }
      html += '</div></div></div>';
    }

    return html;
  }

  /* ============================== EVENTS ============================== */

  function getPath(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    return cur[parts[parts.length - 1]];
  }
  function setPath(obj, path, value) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    cur[parts[parts.length - 1]] = value;
  }

  root.addEventListener('input', function (e) {
    var el = e.target;
    var bind = el.getAttribute('data-bind');
    if (!bind) return;
    if (el.type === 'checkbox') return; // handled on change
    setPath(state, bind, el.value);
  });

  root.addEventListener('change', function (e) {
    var el = e.target;
    var bind = el.getAttribute('data-bind');
    if (bind) {
      setPath(state, bind, el.type === 'checkbox' ? el.checked : el.value);
    }
    if (el.id === 'fa-trip-lure-select') {
      changeTripLure(el.value);
      render();
      return;
    }
    if (el.id === 'fa-catch-private') {
      state.catchDraft.isPrivate = el.checked;
      return;
    }
    if (el.id === 'fa-catch-pin') {
      state.catchDraft.pinToMap = el.checked;
      return;
    }
    if (el.id === 'fa-pin-photo-input') {
      var pinFile = el.files && el.files[0];
      el.value = '';
      handlePinPhotoPick(pinFile);
      return;
    }
    if (el.id === 'fa-import-input') {
      var lf = el.files && el.files[0];
      el.value = '';
      if (lf) importLogbook(lf);
      return;
    }
    if (el.id === 'fa-catch-photo-input' || el.id === 'fa-avatar-input') {
      var file = el.files && el.files[0];
      if (el.id === 'fa-catch-photo-input') handleCatchPhotoPick(file);
      else handleAvatarPick(file);
    }
  });

  root.addEventListener('keydown', function (e) {
    if (e.target && e.target.id === 'fa-query-input' && e.key === 'Enter') {
      runSearch();
    }
    if (e.target && e.target.id === 'fa-trip-catch-species' && e.key === 'Enter') {
      confirmTripCatch();
    }
  });

  // Escape closes whatever is on top.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (state.showTripCatch) { state.showTripCatch = false; render(); return; }
    if (state.endSummary) { state.endSummary = null; render(); return; }
    if (state.showProfileEditor) { state.showProfileEditor = false; render(); return; }
    if (state.showTrophyRoom) { state.showTrophyRoom = false; render(); return; }
  });

  root.addEventListener('click', function (e) {
    // close overlay when clicking the backdrop (not the modal itself)
    var overlay = e.target.closest ? e.target.closest('.fa-overlay') : null;
    if (overlay && e.target === overlay) {
      var act = overlay.getAttribute('data-action');
      if (act) dispatch(act, overlay, e);
      return;
    }
    var actionEl = e.target.closest ? e.target.closest('[data-action]') : null;
    if (!actionEl) return;
    dispatch(actionEl.getAttribute('data-action'), actionEl, e);
  });

  function dispatch(action, el) {
    switch (action) {
      case 'set-view':
        state.view = el.getAttribute('data-view');
        render();
        break;
      case 'run-search':
        runSearch();
        break;
      case 'cancel-search':
        cancelSearch();
        break;
      case 'locate-me':
        findNearestWater();
        break;
      case 'find-nearest':
        findNearestWater();
        break;
      case 'open-nearby':
        var nb = (state.nearbyWaters || [])[Number(el.getAttribute('data-idx'))];
        if (nb) loadNearbyWater(nb);
        break;
      case 'locate-into-editor':
        locateIntoEditor();
        break;
      case 'set-water-species':
        state.waterSpecies = el.getAttribute('data-species');
        lsSet('waterSpecies', state.waterSpecies);
        render();
        break;
      case 'set-units':
        state.units = el.getAttribute('data-units') === 'metric' ? 'metric' : 'imperial';
        lsSet('units', state.units);
        render();
        break;
      case 'set-water-type':
        state.waterType = el.getAttribute('data-type') === 'river' ? 'river' : 'lake';
        lsSet('waterType', state.waterType);
        render();
        break;
      case 'set-map-mode':
        var mode = el.getAttribute('data-mode') === 'satellite' ? 'satellite' : 'guide';
        if (mode !== 'satellite' && leafletMap) { try { leafletMap.remove(); } catch (e) {} leafletMap = null; }
        state.mapMode = mode;
        render();
        break;
      case 'open-spots-map':
        openSpotsMap(el.getAttribute('data-water'));
        break;
      case 'toggle-guru':
        state.guruExpanded = !state.guruExpanded;
        paintGuru();
        break;
      case 'dash-log-catch':
        state.view = 'today';
        state.showCatchForm = true;
        state.catchSuccess = null;
        state.catchError = null;
        if (!state.catchDraft.species && state.data && state.data.species && state.data.species[0]) state.catchDraft.species = state.data.species[0].name;
        render();
        var formEl = document.querySelector('.fa-catch-form');
        if (formEl && formEl.scrollIntoView) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'dash-open-map':
        state.view = 'today';
        state.mapMode = 'satellite';
        render();
        var mapEl = document.getElementById('fa-satmap');
        if (mapEl && mapEl.scrollIntoView) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      case 'clear-water-pins':
        clearWaterPins(el.getAttribute('data-water'));
        break;
      case 'run-example':
        state.query = el.getAttribute('data-place');
        runSearch(state.query);
        break;
      case 'load-favorite':
        loadFavorite(el.getAttribute('data-water'));
        break;
      case 'remove-favorite':
        removeFavorite(el.getAttribute('data-water'));
        break;
      case 'toggle-favorite':
        toggleFavorite();
        break;
      case 'clear-report':
        clearReport();
        break;
      case 'begin-trip':
        beginTrip();
        break;
      case 'open-catch-form':
        state.showCatchForm = true; state.catchSuccess = null; state.catchError = null;
        if (!state.catchDraft.species && state.data && state.data.species && state.data.species[0]) state.catchDraft.species = state.data.species[0].name;
        render();
        break;
      case 'close-catch-form':
        state.showCatchForm = false;
        render();
        break;
      case 'pick-catch-photo':
        var pinput = document.getElementById('fa-catch-photo-input');
        if (pinput) pinput.click();
        break;
      case 'clear-catch-photo':
        state.catchDraft.photo = null;
        render();
        break;
      case 'submit-catch':
        submitCatch();
        break;
      case 'open-profile':
        openProfileEditor();
        break;
      case 'close-profile':
        state.showProfileEditor = false;
        render();
        break;
      case 'pick-avatar':
        var ainput = document.getElementById('fa-avatar-input');
        if (ainput) ainput.click();
        break;
      case 'save-profile':
        saveProfile();
        break;
      case 'open-trophy':
        state.showTrophyRoom = true;
        render();
        break;
      case 'close-trophy':
        state.showTrophyRoom = false;
        render();
        break;
      case 'add-gear':
        addGear();
        break;
      case 'select-gear':
        selectGear(el.getAttribute('data-id'));
        break;
      case 'remove-gear':
        removeGear(el.getAttribute('data-id'));
        break;
      case 'open-trip-catch':
        state.showTripCatch = true;
        render();
        break;
      case 'close-trip-catch':
        state.showTripCatch = false;
        render();
        break;
      case 'confirm-trip-catch':
        confirmTripCatch();
        break;
      case 'trip-event':
        recordTripEvent(el.getAttribute('data-type'));
        break;
      case 'toggle-pause':
        toggleTripPause();
        break;
      case 'undo-trip-event':
        undoTripEvent();
        break;
      case 'save-trip-note':
        saveTripNote();
        render();
        break;
      case 'finish-trip':
        finishTrip();
        break;
      case 'close-end-summary':
        state.endSummary = null;
        render();
        break;
      case 'view-patterns-from-summary':
        state.endSummary = null;
        state.view = 'patterns';
        render();
        break;
      case 'save-spot':
        savePrivateSpot();
        break;
      case 'open-coords':
        var existing = coordsFor(state.data);
        state.coordDraft = existing ? { lat: String(existing.lat), lon: String(existing.lon) } : { lat: '', lon: '' };
        state.coordError = null;
        state.showCoordEditor = true;
        render();
        break;
      case 'close-coords':
        state.showCoordEditor = false;
        state.coordError = null;
        render();
        break;
      case 'save-coords':
        if (!state.data) break;
        if (saveCoordOverride(state.data.waterBody, state.coordDraft.lat, state.coordDraft.lon)) {
          state.showCoordEditor = false;
          state.coordError = null;
        } else {
          state.coordError = 'Latitude runs -90 to 90 and longitude -180 to 180. Check the two numbers.';
        }
        render();
        break;
      case 'clear-coords':
        if (state.data) clearCoordOverride(state.data.waterBody);
        render();
        break;
      case 'toggle-trip':
        var tripId = el.getAttribute('data-id');
        state.expandedTripId = state.expandedTripId === tripId ? null : tripId;
        render();
        break;
      case 'export-logbook':
        exportLogbook();
        break;
      case 'export-gpx':
        exportPinsGpx();
        break;
      case 'share-day':
        shareTheDay();
        break;
      case 'open-water-temp':
        var known = waterTempC();
        state.waterTempDraft = known == null ? '' : String(dispWaterTemp());
        state.waterTempError = null;
        state.showWaterTemp = true;
        render();
        break;
      case 'close-water-temp':
        state.showWaterTemp = false;
        state.waterTempError = null;
        render();
        break;
      case 'save-water-temp':
        saveWaterTemp();
        break;
      case 'clear-water-temp':
        clearWaterTemp();
        break;
      case 'pick-import':
        var importInput = document.getElementById('fa-import-input');
        if (importInput) importInput.click();
        break;
      case 'remove-spot':
        removePrivateSpot(el.getAttribute('data-id'));
        break;
      default:
        break;
    }
  }

  /* ============================== INIT ============================== */

  // The shared leaderboard lives in the artifact's store so records carry across
  // browsers and viewers; without it, the local copy stands in.
  function loadLeaderboard() {
    if (!db) return Promise.resolve();
    return db.collection('leaderboard').get().then(function (snap) {
      var map = {};
      snap.docs.forEach(function (doc) {
        var row = doc.data();
        if (row && row.species) map[doc.id] = row;
      });
      // Keep any local-only records the store hasn't seen yet.
      Object.keys(state.leaderboard).forEach(function (key) {
        var mine = state.leaderboard[key];
        var theirs = map[key];
        var mineValue = mine ? (mine.weight || mine.length || 0) : -1;
        var theirsValue = theirs ? (theirs.weight || theirs.length || 0) : -1;
        if (mineValue > theirsValue) map[key] = mine;
      });
      state.leaderboard = map;
      if (state.view === 'today' || state.showTrophyRoom) render();
    }).catch(function () { /* keep the local copy */ });
  }

  function init() {
    capabilitiesReady = (window.claude && typeof window.claude.use === 'function')
      ? Promise.all([
        window.claude.use('db').catch(function () { return null; }),
        window.claude.use('sample').catch(function () { return null; }),
        window.claude.use('downloads').catch(function () { return null; })
      ]).then(function (results) {
        db = results[0];
        sampleFn = results[1];
        downloadsFn = results[2];
        if (downloadsFn && state.view === 'waters') render();
        return loadLeaderboard();
      }).catch(function () { /* stay in local-only mode */ })
      : Promise.resolve();

    // Render immediately from local data so the page is never blank while
    // capabilities resolve (which can take up to ~10s). Nothing visible depends
    // on them, so there is no second render to interrupt typing.
    state.moonPhase = getMoonPhase(new Date());
    render();

    // Open on the water you are actually near. With nothing loaded that becomes
    // the report; with a water already open it just offers the switch, so a
    // saved water is never yanked away on launch.
    findNearestWater({ quiet: !!state.data, keepCurrent: !!state.data });

    var tick = 0;
    setInterval(function () {
      // The dashboard's next-window countdown, kept honest without re-rendering
      // the page under the reader. Minutes-granular, so every 15s is plenty.
      tick++;
      if (tick % 15 === 0 && state.view === 'home' && state.data) {
        var winEl = document.getElementById('fa-dash-window');
        if (winEl) winEl.innerHTML = dashWindowHtml();
      }
      if (state.activeTrip) {
        state.tripTick = Date.now();
        var clockEl = document.getElementById('fa-trip-clock');
        if (clockEl) {
          var sec = tripElapsedSec();
          var hh = Math.floor(sec / 3600), mm = Math.floor((sec % 3600) / 60), ss = sec % 60;
          clockEl.textContent = hh + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
        }
      }
    }, 1000);
  }

  init();
})();
