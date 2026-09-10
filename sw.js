/* Fishing Almanac service worker.
   - App shell is cached so the app opens offline (everything but live map tiles).
   - Map tiles are fetched network-first and cached opportunistically, so water
     you have already looked at stays visible offline; new tiles need a signal. */
var SHELL = 'fa-shell-v4';
var TILES = 'fa-tiles-v1';
var SHELL_FILES = [
  './', './index.html', './app.js', './style.css', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) {
    // Best-effort: don't fail the install if one CDN file hiccups.
    return Promise.allSettled(SHELL_FILES.map(function (f) { return c.add(f); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== SHELL && k !== TILES; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var url = e.request.url;
  if (e.request.method !== 'GET') return;

  // Map/label tiles: network-first, fall back to cache, keep a rolling cache.
  if (/arcgisonline\.com|tile\.openstreetmap\.org/.test(url)) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(TILES).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }

  // App shell + everything else: cache-first, then network.
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        if (res && res.status === 200 && (url.indexOf('cdnjs') !== -1 || url.indexOf(self.location.origin) === 0)) {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
