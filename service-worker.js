const CACHE_NAME = "skillrhub-pwa-v19";
const STATIC_CACHE_NAME = "skillrhub-static-v17";

const OFFLINE_FILES = [
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png"
  ,"/icons/skillrhub-mark.svg"
  ,"/icons/skillr-symbols.svg"
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

  const rebuiltCurriculumRoutes = [
    "/foundation/science/ac9sfu03-that-objects-can-be-composed-of-different-materials-and-describe/",
    "/year2/science/ac9s2u03-that-materials-can-be-changed-physically-without-changing-their/",
    "/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/"
  ];

  const isTeacherDeckPath =
    url.origin === self.location.origin &&
    (url.pathname.includes("/teacher-slides/") || url.pathname.includes("/teacher-deck/"));

  // Teacher deck pages are live resources: always prefer the network so content edits appear immediately.
  if (
    request.mode === "navigate" &&
    url.origin === self.location.origin &&
    (isTeacherDeckPath || rebuiltCurriculumRoutes.includes(url.pathname))
  ) {
    event.respondWith(fetch(request, { cache: "no-store" }).catch(() => caches.match("/offline.html")));
    return;
  }

  // Teacher deck assets (SVG/PNG/CSS/JS) must not be cache-first. Otherwise an updated
  // page shell can continue displaying old slide artwork inside the installed PWA.
  if (isTeacherDeckPath && ["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then((response) => {
          if (response && response.ok) {
            caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Live loaders, question banks and active curriculum releases must not be served stale.
  // production-question-ui.js owns read-aloud and question quality feedback controls;
  // keep it network-first so installed PWAs receive like/unlike buttons immediately.
  if (
    url.origin === self.location.origin &&
    (
      url.pathname === "/assets/unavailable-activity-paths.json" ||
      request.destination === "script" &&
      (
      url.pathname === "/pwa-register.js" ||
      url.pathname === "/assets/ac9s3u04-lesson.js" ||
      url.pathname === "/assets/ac9s3u04-render.js" ||
      url.pathname === "/assets/lower-materials-lessons.js" ||
      url.pathname === "/assets/lower-materials-render.js" ||
      url.pathname === "/share-button.js" ||
      url.pathname === "/assets/home-search.js" ||
      url.pathname === "/assets/progress-store.js" ||
      url.pathname === "/dashboard/script.js" ||
      url.pathname === "/assets/display-only.js" ||
      url.pathname === "/assets/year7-router.js" ||
      url.pathname.startsWith("/assets/year7-") ||
      url.pathname === "/quiz/assets/script.js" ||
      url.pathname === "/quiz/assets/production-question-ui.js" ||
      url.pathname === "/quiz/assets/year10-gifted-runtime.js" ||
      (
        url.pathname.startsWith("/quiz/assets/") &&
        url.pathname.endsWith("-pre-module-notes.js")
      ) ||
      url.pathname === "/quiz/assets/separate-result.js" ||
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
