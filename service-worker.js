// Bump this version string any time you redeploy updated files —
// that's what tells returning visitors' browsers to fetch the new
// versions instead of continuing to serve the cached ones.
const CACHE_VERSION = "v2";
const CACHE_NAME = `hots-talent-calculator-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./heroes/abathur.png",
  "./heroes/alarak.png",
  "./heroes/alexstrasza.png",
  "./heroes/ana.png",
  "./heroes/anduin.png",
  "./heroes/anubarak.png",
  "./heroes/artanis.png",
  "./heroes/arthas.png",
  "./heroes/auriel.png",
  "./heroes/azmodan.png",
  "./heroes/blaze.png",
  "./heroes/brightwing.png",
  "./heroes/cassia.png",
  "./heroes/chen.png",
  "./heroes/chogall.png",
  "./heroes/chromie.png",
  "./heroes/deathwing.png",
  "./heroes/deckard.png",
  "./heroes/dehaka.png",
  "./heroes/diablo.png",
  "./heroes/dva.png",
  "./heroes/etc.png",
  "./heroes/falstad.png",
  "./heroes/fenix.png",
  "./heroes/gall.png",
  "./heroes/garrosh.png",
  "./heroes/gazlowe.png",
  "./heroes/genji.png",
  "./heroes/greymane.png",
  "./heroes/guldan.png",
  "./heroes/hanzo.png",
  "./heroes/hogger.png",
  "./heroes/illidan.png",
  "./heroes/imperius.png",
  "./heroes/jaina.png",
  "./heroes/johanna.png",
  "./heroes/junkrat.png",
  "./heroes/kaelthas.png",
  "./heroes/kelthuzad.png",
  "./heroes/kerrigan.png",
  "./heroes/kharazim.png",
  "./heroes/leoric.png",
  "./heroes/lili.png",
  "./heroes/liming.png",
  "./heroes/lostvikings.png",
  "./heroes/ltmorales.png",
  "./heroes/lucio.png",
  "./heroes/lunara.png",
  "./heroes/maiev.png",
  "./heroes/malfurion.png",
  "./heroes/malganis.png",
  "./heroes/malthael.png",
  "./heroes/medivh.png",
  "./heroes/mei.png",
  "./heroes/mephisto.png",
  "./heroes/muradin.png",
  "./heroes/murky.png",
  "./heroes/nazeebo.png",
  "./heroes/nova.png",
  "./heroes/orphea.png",
  "./heroes/probius.png",
  "./heroes/qhira.png",
  "./heroes/ragnaros.png",
  "./heroes/raynor.png",
  "./heroes/rehgar.png",
  "./heroes/rexxar.png",
  "./heroes/samuro.png",
  "./heroes/sgthammer.png",
  "./heroes/sonya.png",
  "./heroes/stitches.png",
  "./heroes/stukov.png",
  "./heroes/sylvanas.png",
  "./heroes/tassadar.png",
  "./heroes/thebutcher.png",
  "./heroes/thrall.png",
  "./heroes/tracer.png",
  "./heroes/tychus.png",
  "./heroes/tyrael.png",
  "./heroes/tyrande.png",
  "./heroes/uther.png",
  "./heroes/valeera.png",
  "./heroes/valla.png",
  "./heroes/varian.png",
  "./heroes/whitemane.png",
  "./heroes/xul.png",
  "./heroes/yrel.png",
  "./heroes/zagara.png",
  "./heroes/zarya.png",
  "./heroes/zeratul.png",
  "./heroes/zuljin.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Cache-first for everything in the app shell, so the installed app opens
// instantly and works offline. Anything not already cached falls back to
// the network, and network responses are cached for next time.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
