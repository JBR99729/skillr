const CACHE_NAME = "skillrhub-pwa-v12";
const STATIC_CACHE_NAME = "skillrhub-static-v10";

const OFFLINE_FILES = [
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        OFFLINE_FILES.map(async (file) => {
          try {
            await cache.add(file);
          } catch (error) {
            // Do not fail install if a non-critical file is unavailable.
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.delete(STATIC_CACHE_NAME).then(() =>
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.destination === "manifest" || url.pathname.endsWith("/manifest.webmanifest")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/manifest.webmanifest")))
    );
    return;
  }

  // Teacher slides are live-display resources: always require the network and never serve a cached slide page.
  if (request.mode === "navigate" && url.origin === self.location.origin && url.pathname.includes("/teacher-slides/")) {
    event.respondWith(fetch(request, { cache: "no-store" }).catch(() => caches.match("/offline.html")));
    return;
  }

  // Live loaders, question banks and active curriculum releases must not be served stale.
  if (
    url.origin === self.location.origin &&
    request.destination === "script" &&
    (
      url.pathname === "/pwa-register.js" ||
      url.pathname === "/share-button.js" ||
      url.pathname === "/assets/display-only.js" ||
      url.pathname === "/assets/year7-router.js" ||
      url.pathname.startsWith("/assets/year7-") ||
      url.pathname === "/quiz/assets/script.js" ||
      url.pathname === "/assets/qa-complete-badges.js" ||
      url.pathname === "/assets/foundation-maths-practice-quick-read.js" ||
      url.pathname === "/quiz/assets/foundation-maths-rebuild.js" ||
      url.pathname === "/quiz/assets/daily-drills/foundation-rebuild-extensions.js" ||
      url.pathname === "/quiz/assets/daily-drills/science-master-questions.js" ||
      url.pathname === "/quiz/assets/daily-drills/year1-maths-n01-n03-extensions.js" ||
      url.pathname === "/quiz/assets/daily-drills/year1-maths-n04-n06-extensions.js" ||
      url.pathname === "/quiz/assets/daily-drills/year1-maths-remaining-extensions.js" ||
      url.pathname === "/assets/qa-complete-ribbon.js" ||
      url.pathname.endsWith("/questions.js")
    )
  ) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then((response) => {
          if (response && response.ok) caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  if (url.origin === self.location.origin && ["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/offline.html")));
  }
});
