(() => {
  "use strict";

  const path = window.location.pathname;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        if (existing.dataset.skillrLoaded === "true") { resolve(); return; }
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load", () => { script.dataset.skillrLoaded = "true"; resolve(); }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function loadSequence(items) {
    items.reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve())
      .catch((error) => console.error("Skillr script load failed:", error));
  }

  loadScript("/assets/display-only.js?v=1");
  loadScript("/assets/foundation-topic-language.js?v=1");
  loadScript("/assets/foundation-maths-professional-ui.js?v=5");

  const routes = [
    [/^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/practice\/?$/i, ["/assets/foundation-maths-practice-quick-read.js?v=5"]],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/practice\/?$/i, ["/assets/foundation-science-practice-quick-read.js?v=4"]],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/worksheet\/?$/i, ["/assets/foundation-science-worksheet-page.js?v=2"]],
    [/^\/foundation\/science\/ac9s/i, ["/assets/foundation-science-data.js?v=1","/assets/foundation-science-render.js?v=1","/assets/foundation-science-curriculum-scope.js?v=1"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/practice\/?$/i, ["/assets/foundation-english-practice-quick-read.js?v=1"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet\/?$/i, ["/assets/foundation-english-worksheet-page.js?v=2"]],
    [/^\/foundation\/english\/ac9ef/i, ["/assets/foundation-english-data.js?v=1","/assets/foundation-english-render.js?v=1"]],

    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year1-maths-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/worksheet\/?$/i, ["/assets/year1-maths-worksheet-page.js?v=2"]],
    [/^\/year1\/maths\/ac9m1/i, ["/assets/year1-maths-data.js?v=1","/assets/year1-maths-render.js?v=1"]],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year1-science-practice-quick-read.js?v=1"]],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/worksheet\/?$/i, ["/assets/year1-science-worksheet-page.js?v=1"]],
    [/^\/year1\/science\/ac9s1/i, ["/assets/year1-science-data.js?v=1","/assets/year1-science-render.js?v=1"]],

    [/^\/year2\/maths\/ac9m2/i, ["/assets/year2-maths-data.js?v=2","/assets/year2-maths-data-extra.js?v=1","/assets/year2-maths-render.js?v=2"]],
    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year2-maths-data.js?v=2","/assets/year2-maths-data-extra.js?v=1","/assets/year2-maths-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/worksheet\/?$/i, ["/assets/year2-maths-data.js?v=2","/assets/year2-maths-data-extra.js?v=1","/assets/year2-maths-worksheet-page.js?v=2"]],
    [/^\/year2\/science\/ac9s2/i, ["/assets/year2-science-data.js?v=1","/assets/year2-science-render.js?v=1"]],
    [/^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year2-science-data.js?v=1","/assets/year2-science-practice-quick-read.js?v=1"]],
    [/^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/worksheet\/?$/i, ["/assets/year2-science-data.js?v=1","/assets/year2-science-worksheet-page.js?v=1"]],
    [/^\/year2\/english\/ac9e2/i, ["/assets/year2-english-data.js?v=1","/assets/year2-english-render.js?v=1"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year2-english-data.js?v=1","/assets/year2-english-practice-quick-read.js?v=1"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/worksheet\/?$/i, ["/assets/year2-english-data.js?v=1","/assets/year2-english-worksheet-page.js?v=1"]],

    [/^\/year3\/maths\/ac9m3/i, ["/assets/year3-maths-data-base.js?v=1","/assets/year3-maths-data-n1.js?v=1","/assets/year3-maths-data-n2.js?v=1","/assets/year3-maths-data-n3.js?v=1","/assets/year3-maths-data-a.js?v=1","/assets/year3-maths-data-m1.js?v=1","/assets/year3-maths-data-m2.js?v=1","/assets/year3-maths-data-sp.js?v=1","/assets/year3-maths-data-st.js?v=1","/assets/year3-maths-data-p.js?v=1","/assets/year3-maths-render.js?v=1"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/(practice|test)\/?$/i, ["/assets/year3-maths-data-base.js?v=1","/assets/year3-maths-data-n1.js?v=1","/assets/year3-maths-data-n2.js?v=1","/assets/year3-maths-data-n3.js?v=1","/assets/year3-maths-data-a.js?v=1","/assets/year3-maths-data-m1.js?v=1","/assets/year3-maths-data-m2.js?v=1","/assets/year3-maths-data-sp.js?v=1","/assets/year3-maths-data-st.js?v=1","/assets/year3-maths-data-p.js?v=1","/assets/year3-maths-practice-quick-read.js?v=1"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/worksheet\/?$/i, ["/assets/year3-maths-data-base.js?v=1","/assets/year3-maths-data-n1.js?v=1","/assets/year3-maths-data-n2.js?v=1","/assets/year3-maths-data-n3.js?v=1","/assets/year3-maths-data-a.js?v=1","/assets/year3-maths-data-m1.js?v=1","/assets/year3-maths-data-m2.js?v=1","/assets/year3-maths-data-sp.js?v=1","/assets/year3-maths-data-st.js?v=1","/assets/year3-maths-data-p.js?v=1","/assets/year3-maths-worksheet-page.js?v=1"]]
  ];

  const foundationMathsTopic = /^\/foundation\/maths\/ac9mf/i.test(path) && !document.getElementById("teaching-lesson");
  if (foundationMathsTopic && !window.SkillrFoundationMaths) {
    loadSequence(["/assets/foundation-maths-data-number.js?v=1","/assets/foundation-maths-data-other.js?v=1","/assets/foundation-maths-render.js?v=1"]);
  }

  for (const [pattern, scripts] of routes) {
    if (pattern.test(path)) { loadSequence(scripts); break; }
  }

  loadScript("/assets/progress-store.js?v=3");

  let deferredInstallPrompt = null;
  const ACCEPTED_AT_KEY = "skillrPwaAcceptedAt";

  function isStandaloneApp() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function setAccepted() {
    try { window.localStorage.setItem(ACCEPTED_AT_KEY, String(Date.now())); } catch {}
  }

  async function promptInstall() {
    if (isStandaloneApp()) return { outcome: "installed" };
    if (!deferredInstallPrompt) return { outcome: "unavailable" };
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice?.outcome === "accepted") setAccepted();
    return choice || { outcome: "dismissed" };
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch((error) => console.error("Skillr Education service worker registration failed:", error));
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    window.dispatchEvent(new CustomEvent("skillr:install-ready"));
  });

  window.addEventListener("appinstalled", () => {
    setAccepted();
    deferredInstallPrompt = null;
    window.dispatchEvent(new CustomEvent("skillr:installed"));
  });

  window.SkillrPwa = {
    isStandaloneApp,
    isInstallAvailable: () => Boolean(deferredInstallPrompt),
    promptInstall
  };
})();