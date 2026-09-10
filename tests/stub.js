/* The browser-side stub every suite installs before the app boots.
   The sandbox these were written in has no outbound network, so Leaflet, the
   Esri tile server, Open-Meteo, Overpass and the GPS are all faked here. Every
   line below the fakes is the real app. */
const STUB = `
(function () {
  /* ---- fake Leaflet ---- */
  window.__faMarkers = [];
  window.__faMapClick = null;
  function Popup(html) { this._html = html; this._contentNode = null; }
  function Marker(latlng, opts) {
    this._latlng = latlng; this._opts = opts; this._popup = null; this._handlers = {};
  }
  Marker.prototype.bindPopup = function (html) { this._popup = new Popup(html); return this; };
  Marker.prototype.on = function (ev, fn) { (this._handlers[ev] = this._handlers[ev] || []).push(fn); return this; };
  Marker.prototype.openPopup = function () {
    if (!this._popup) return this;
    var node = document.createElement('div');
    node.className = '__fa-popup';
    node.innerHTML = this._popup._html;
    document.body.appendChild(node);
    if (this._popup._contentNode && this._popup._contentNode.parentNode) this._popup._contentNode.parentNode.removeChild(this._popup._contentNode);
    this._popup._contentNode = node;
    (this._handlers['popupopen'] || []).forEach(function (fn) { fn({ popup: this._popup }); }.bind(this));
    window.__faOpenPopupNode = node;
    return this;
  };
  function Map(container, opts) {
    this._container = container; this._layers = []; this._handlers = {}; this._zoom = 15;
    container.setAttribute('data-fa-map', '1');
  }
  Map.prototype.setView = function (c, z) { this._center = c; if (z != null) this._zoom = z; return this; };
  Map.prototype.on = function (ev, fn) { (this._handlers[ev] = this._handlers[ev] || []).push(fn); if (ev === 'click') window.__faMapClick = fn; return this; };
  Map.prototype.addLayer = function (l) { this._layers.push(l); if (l instanceof Marker) window.__faMarkers.push(l); return this; };
  Map.prototype.removeLayer = function (l) {
    var i = this._layers.indexOf(l); if (i >= 0) this._layers.splice(i, 1);
    var j = window.__faMarkers.indexOf(l); if (j >= 0) window.__faMarkers.splice(j, 1);
    return this;
  };
  Map.prototype.eachLayer = function (fn) { this._layers.slice().forEach(fn); return this; };
  Map.prototype.invalidateSize = function () { return this; };
  Map.prototype.remove = function () { this._layers = []; return this; };
  Map.prototype.getZoom = function () { return this._zoom; };
  Map.prototype.closePopup = function () { return this; };
  Map.prototype.getBounds = function () { return { getWest: function () { return -83.7; }, getEast: function () { return -83.5; }, getNorth: function () { return 43.0; }, getSouth: function () { return 42.9; } }; };
  window.L = {
    map: function (c, o) { return new Map(c, o); },
    tileLayer: function () { return { addTo: function () { return this; }, on: function () { return this; } }; },
    divIcon: function (o) { return o; },
    marker: function (ll, o) { return new Marker(ll, o); }
  };

  /* ---- fake Open-Meteo ---- */
  var realFetch = window.fetch;
  window.__faWeatherCalls = [];
  window.__faOverpassCalls = [];
  window.__faOverpassFail = false;
  window.fetch = function (url, opts) {
    if (typeof url === 'string' && url.indexOf('overpass') !== -1) {
      window.__faOverpassCalls.push((opts && opts.body) || '');
      if (window.__faOverpassFail) return Promise.reject(new Error('overpass down'));
      return Promise.resolve({ ok: true, status: 200, json: function () {
        // Mirrors Overpass's two output sets: id 2 (a big river whose CENTRE is
        // far away but whose bank you are standing on) is echoed by both, which
        // is how the app learns it is at your feet.
        return Promise.resolve({ elements: [
          { type: 'way', id: 2, center: { lat: 42.9600, lon: -83.6900 }, tags: { name: 'Flint River', waterway: 'river' } },
          { type: 'way', id: 1, center: { lat: 42.9790, lon: -83.6140 }, tags: { name: 'Kelly Lake', natural: 'water', water: 'lake' } },
          { type: 'way', id: 3, center: { lat: 42.9805, lon: -83.6155 }, tags: { name: 'Kelly Lake', natural: 'water' } },
          { type: 'way', id: 2, center: { lat: 42.9600, lon: -83.6900 }, tags: { name: 'Flint River', waterway: 'river' } },
          { type: 'way', id: 4, center: { lat: 42.9900, lon: -83.5900 }, tags: { name: 'Holloway Reservoir', natural: 'water', water: 'reservoir' } },
          { type: 'way', id: 5, center: { lat: 42.9700, lon: -83.6000 }, tags: { natural: 'water' } }
        ] });
      } });
    }
    if (typeof url === 'string' && url.indexOf('open-meteo') !== -1) {
      window.__faWeatherCalls.push(url);
      var now = Date.now();
      var times = [], temp = [], wind = [], dir = [], press = [], cloud = [], code = [], precip = [];
      for (var i = -14; i < 34; i++) {
        times.push(new Date(now + i * 3600000).toISOString().slice(0, 16));
        temp.push(18 + (i % 5)); wind.push(14 + (i % 4)); dir.push(225);
        press.push(1015 - Math.max(0, i) * 0.6); cloud.push(70); code.push(3); precip.push(i < 0 && i > -8 ? 0.4 : 0);
      }
      // Seven days back and seven forward, mirroring past_days=7&forecast_days=7.
      var iso = function (d) { var p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };
      var dTime = [], dCode = [], dMax = [], dMin = [], dMean = [], dRain = [], dPop = [], dWind = [], dWdir = [];
      for (var k = -7; k <= 6; k++) {
        var day = new Date(); day.setHours(12, 0, 0, 0); day = new Date(day.getTime() + k * 86400000);
        dTime.push(iso(day));
        dCode.push(k === 3 ? 95 : 3);
        dMax.push(21 + (k % 3)); dMin.push(11 + (k % 3)); dMean.push(16 + (k % 3));
        dRain.push(k === 3 ? 8 : 0.5);
        dPop.push(k === 3 ? 90 : k === 1 ? 40 : 10);
        dWind.push(k === 2 ? 46 : 14 + (k % 5));
        dWdir.push(225);
      }
      return Promise.resolve({
        ok: true, status: 200,
        json: function () {
          return Promise.resolve({
            current: { temperature_2m: 19.4, wind_speed_10m: 15.2, wind_direction_10m: 225, weather_code: 3, surface_pressure: 1009, cloud_cover: 72, precipitation: 0 },
            hourly: { time: times, temperature_2m: temp, wind_speed_10m: wind, wind_direction_10m: dir, surface_pressure: press, cloud_cover: cloud, weather_code: code, precipitation: precip },
            daily: { time: dTime, weather_code: dCode, temperature_2m_max: dMax, temperature_2m_min: dMin, temperature_2m_mean: dMean, precipitation_sum: dRain, precipitation_probability_max: dPop, wind_speed_10m_max: dWind, wind_direction_10m_dominant: dWdir }
          });
        }
      });
    }
    return realFetch.apply(window, arguments);
  };

  /* ---- fake GPS ---- */
  window.__faGpsCalls = 0;
  navigator.geolocation.watchPosition = function (ok) {
    window.__faGpsCalls++;
    var id = setTimeout(function () {
      ok({ coords: { latitude: 42.9781, longitude: -83.6122, accuracy: 8 }, timestamp: Date.now() });
    }, 30);
    return id;
  };
  navigator.geolocation.clearWatch = function (id) { clearTimeout(id); };
  navigator.geolocation.getCurrentPosition = function (ok) {
    setTimeout(function () { ok({ coords: { latitude: 42.9781, longitude: -83.6122, accuracy: 8 }, timestamp: Date.now() }); }, 30);
  };

  /* ---- seed a report so the dashboard has a water ---- */
  var report = {
    waterBody: 'Kelly Lake', location: 'Burton, MI',
    coords: { lat: 42.9781, lon: -83.6122 },
    species: [{ name: 'Walleye', meta: 'Primary', description: 'Deep structure at dusk.', structure: 'Points and breaks' },
              { name: 'Largemouth Bass', meta: 'Common', description: 'Weed edges.', structure: 'Weed line' }],
    lures: [{ name: 'Jig and minnow', meta: 'Bottom', description: 'Vertical.' },
            { name: 'Spinnerbait', meta: 'Cover water', description: 'Windy banks.' },
            { name: 'Suspending jerkbait', meta: 'Cold water', description: 'Long pauses.' }],
    techniques: [{ name: 'Drift the break', description: 'Follow the contour.' }],
    hotspots: [{ name: 'North point', access: 'Both', tip: 'Dawn.' }],
    quickTips: ['Fish the last hour.'],
    gear: [{ name: 'Medium spinning', note: '6-10 lb' }],
    bestTimes: { peaks: [{ label: 'Dawn', start: '5:30 AM', end: '7:30 AM' }], seasonalNote: 'Fall bite is building.' },
    regulationsNote: 'Check local regs.'
  };
  try {
    localStorage.setItem('fishingAlmanac:lastReport', JSON.stringify({ data: report, query: 'Kelly Lake, Burton MI' }));
    localStorage.setItem('fishingAlmanac:gear', JSON.stringify([
      { id: 'g1', name: 'White spinnerbait', type: 'Lure', detail: '3/8 oz', tiedOn: false },
      { id: 'g2', name: 'Ned rig', type: 'Lure', detail: 'green pumpkin', tiedOn: false }
    ]));
  } catch (e) {}
})();
`;

module.exports = { STUB };
