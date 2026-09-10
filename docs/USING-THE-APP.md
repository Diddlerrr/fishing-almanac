# Fishing Almanac — installable phone app

This is the full app as an installable **PWA** (Progressive Web App). Once it's
on the web, you and your friends open the link and tap **Add to Home Screen** —
it becomes a real full-screen app with its own icon, works offline, uses real
GPS, and shows **real satellite maps** of any water with pins you drop yourself.

No app store, no developer account, no Mac needed.

## What happens when you open it

It finds where you are, then finds the water around you. The nearest named lake
or river becomes your report automatically — no typing, no list of places to
pick from. Everything else on the Home screen is about that water, right now.

If you already had a water open, it stays open; the nearby list just appears
underneath so switching is one tap.

## What's inside

- **Home dashboard** — the day's rating, the next feeding window counting down,
  live conditions, and the guide's calls, all for the water you're on.
- **The guide's call** — a real advice engine. It reads the season for your
  latitude, the light phase from computed twilight, barometric trend, wind speed
  *and direction*, cloud, rain in the last 12 hours, temperature, the solunar
  window, lake vs river, your species, your gear locker and your own catch log,
  and turns them into prioritised calls with the reasoning behind each one.
- **Water near you** — the nearest named lakes, rivers and reservoirs, sorted so
  the water you're actually standing on comes first.
- **Solunar day planner** — sunrise/sunset, moonrise/moonset, major and minor
  feeding windows and a day rating, all computed on the device (works offline,
  worldwide, at any latitude).
- **Live weather + bite forecast** — temperature, wind, barometric pressure and
  its trend, plus an hourly bite score (needs a connection).
- **Real satellite map** — the actual body of water, with habitat and catch pins
  you drop on the true shoreline; **Save area offline** before you lose signal.
- **Photos pinned to the exact spot** — attach a photo to any pin, or tick one
  box when logging a catch and it's filed at the GPS coordinates you caught it
  at. They collect on the dashboard and in My Waters.
- **The week ahead** — all seven days scored and the best one named, blending the
  device's own solunar rating for each date with the forecast's pressure change,
  wind and rain. The answer to "which day should I take off".
- **Water temperature** — estimated from the past week of air temperature, and
  overwritable with your own reading. It is what actually sets the season: at
  47°F the app knows walleye are on the spawn band, not that it's "autumn".
- **Read-the-water guide** — habitat diagrams tailored to 11 species across lake
  and river/stream modes.
- **Live Trip mode, Gear locker, Catch log & trophy room** — every catch records
  the real conditions (moon, pressure trend, temp, wind, sky) at that moment.
- **What your log says** — once you have a few catches, the Patterns page stops
  giving general advice and starts giving yours: which lure, which hours, which
  pressure trend and which moon phase actually produce for you, with the sample
  size printed next to every claim.
- **Share** — send today's plan, or a single spot with its coordinates, straight
  to whoever you fish with.
- **Metric or imperial** units, a **logbook backup** (export/restore — including
  every map pin, photo and coordinate), and **GPX export** so your spots load
  onto a chartplotter, a handheld GPS, Google Earth or any mapping app.

## What leaves your device, and what doesn't

- Sun, moon, twilight and solunar windows are computed **on the device**. They
  work with no signal, anywhere in the world, and no position is sent for them.
- Naming the water near you asks **OpenStreetMap** (Overpass) what water is
  around your position — that one step sends an approximate position out.
- Live weather asks **Open-Meteo** for the water's coordinates.
- Satellite imagery is **Esri World Imagery** (no key required, free for this use).
- Your catches, trips, gear, notes, pins and photos stay in the browser on your
  own device. They are never uploaded anywhere.

## Files

- `index.html` — the app shell (loads everything)
- `app.js`, `style.css` — the app
- `sw.js` — service worker (offline support)
- `manifest.webmanifest` — makes it installable
- icons (`icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`, `favicon.png`)

Everything is static. It just needs to be served over **HTTPS** — GPS and the
satellite tiles both refuse to work otherwise, and a PWA can't be installed from
a local file.

## Put it online (free, ~1 minute)

Pick whichever is easiest for you. All are free and need no credit card.

**Easiest on a phone — tiiny.host**

1. Zip these files (the `fishing-almanac-app.zip` you were given already is one).
2. Go to https://tiiny.host, choose the zip, pick a name, upload.
3. You get a link like `https://your-name.tiiny.site` — that's the app.

**Easiest on a computer — Netlify Drop**

1. Go to https://app.netlify.com/drop
2. Drag the whole **folder** (not the zip) onto the page.
3. You get a link like `https://random-name.netlify.app` — that's the app.
   (A free Netlify account lets you rename it and keep it.)

**GitHub Pages** (if you use GitHub)

1. New repo → upload all these files.
2. Settings → Pages → deploy from `main` / root.
3. Your link is `https://youruser.github.io/reponame/`.

Whatever you choose, the **link you get is the app** — send it to your friends
(Canada included; everything works worldwide).

## Install it on a phone

**Android (Chrome):** open the link → menu (⋮) → **Add to Home screen** → Install.
It lands as an app icon and opens full-screen.

**iPhone (Safari):** open the link → Share button → **Add to Home Screen** → Add.
(Must be Safari — iOS only installs PWAs from Safari.)

The first launch asks for location permission. Allow it and the app opens on the
water nearest you; decline and everything still works, you just type the name.

Once installed it runs offline for everything except loading *new* satellite
tiles and *new* live weather; water you've already looked at stays cached.

## Using the real map

On any water's report, the "Read the water" section has a **Guide / Satellite
map** toggle. Switch to Satellite map, then:

- Tap **My position** to centre on your GPS.
- Pick a habitat pin (points, weed edge, etc.) or **★ Catch spot**, then tap the
  real water to mark the exact spot.
- Tap **★ Pin me here** to drop a pin on your actual GPS position rather than
  where you guessed on the imagery.
- Tap any pin to open it: add a photo, write a note, or delete it. The photo is
  stored against that pin's exact coordinates.
- Tap **Save area offline** to cache the tiles in view so the water still shows
  without signal (at that zoom).
- Pins are saved on the device, per water, and collect under **My Waters →
  Marked spots on the map** and on the dashboard's photo strip.

The map centres on the water's location. For a water that didn't come with
coordinates, set one first (the Guide view's **Near me** or **Set location**).

## Getting your spots off the phone

**My Waters → Logbook backup** has three buttons:

- **Download my logbook** — one JSON file with everything: catches, trips, gear,
  saved waters, private spots, hand-set coordinates, units, and every map pin
  with its photo and exact coordinates. Restore it on any device.
- **Restore from a file** — replaces what is on this device with that file.
- **Spots as GPX** — your map pins in the format every chartplotter, handheld
  GPS unit and mapping app reads. This is how the spots you marked on your phone
  get onto the unit on the boat.

## Notes

- The habitat guide and the guide's calls are general angling knowledge applied
  to today's actual numbers — not a survey of your particular water. The **map
  pins are yours**: real spots on real water. That's the part no dataset gives you.
- Photos are the only thing large enough to fill a browser's storage. If it
  fills, the app says so plainly and keeps the pin rather than losing it.
