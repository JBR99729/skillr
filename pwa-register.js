(() => {
  "use strict";

  const path = window.location.pathname;

  const matches = {
    foundationMathsPractice: /^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/practice\/?$/i.test(path),
    foundationSciencePractice: /^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/practice\/?$/i.test(path),
    foundationScienceWorksheet: /^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/worksheet\/?$/i.test(path),
    foundationScienceTopic: /^\/foundation\/science\/ac9s/i.test(path),
    foundationEnglishPractice: /^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/practice\/?$/i.test(path),
    foundationEnglishWorksheet: /^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet\/?$/i.test(path),
    foundationEnglishTopic: /^\/foundation\/english\/ac9ef/i.test(path),
    year1MathsPracticeTest: /^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/(practice|test)\/?$/i.test(path),
    year1MathsWorksheet: /^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/worksheet\/?$/i.test(path),
    year1MathsTopic: /^\/year1\/maths\/ac9m1/i.test(path),
    year1SciencePracticeTest: /^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/(practice|test)\/?$/i.test(path),
    year1ScienceWorksheet: /^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/worksheet\/?$/i.test(path),
    year1ScienceTopic: /^\/year1\/science\/ac9s1/i.test(path),
    year2MathsPracticeTest: /^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/(practice|test)\/?$/i.test(path),
    year2MathsWorksheet: /^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/worksheet\/?$/i.test(path),
    year2MathsTopic: /^\/year2\/maths\/ac9m2/i.test(path),
    year2SciencePracticeTest: /^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/(practice|test)\/?$/i.test(path),
    year2ScienceWorksheet: /^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/worksheet\/?$/i.test(path),
    year2ScienceTopic: /^\/year2\/science\/ac9s2/i.test(path),
    year2EnglishPracticeTest: /^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/(practice|test)\/?$/i.test(path),
    year2EnglishWorksheet: /^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/worksheet\/?$/i.test(path),
    year2EnglishTopic: /^\/year2\/english\/ac9e2/i.test(path)
  };

  function loadScript(src, marker) {
    return new Promise((resolve, reject) => {
      if (marker && document.querySelector(`script[data-${marker}]`)) {
        resolve();
        return;
      }
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      if (marker) script.dataset[marker] = "true";
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function loadSequence(items) {
    items.reduce((promise, item) => promise.then(() => loadScript(item[0], item[1])), Promise.resolve())
      .catch((error) => console.error("Skillr script load failed:", error));
  }

  loadScript("/assets/display-only.js?v=1", "skillrDisplayOnly");
  loadScript("/assets/foundation-topic-language.js?v=1", "skillrFoundationTopicLanguage");
  loadScript("/assets/foundation-maths-professional-ui.js?v=5", "skillrFoundationProfessionalUi");

  if (matches.foundationMathsPractice) loadScript("/assets/foundation-maths-practice-quick-read.js?v=5", "skillrFoundationMathsQuickRead");
  if (matches.foundationSciencePractice) loadScript("/assets/foundation-science-practice-quick-read.js?v=4", "skillrFoundationScienceQuickRead");
  if (matches.foundationScienceWorksheet) loadScript("/assets/foundation-science-worksheet-page.js?v=2", "skillrFoundationScienceWorksheet");
  if (matches.foundationEnglishPractice) loadScript("/assets/foundation-english-practice-quick-read.js?v=1", "skillrFoundationEnglishQuickRead");
  if (matches.foundationEnglishWorksheet) loadScript("/assets/foundation-english-worksheet-page.js?v=2", "skillrFoundationEnglishWorksheet");

  if (matches.year1MathsPracticeTest) loadScript("/assets/year1-maths-practice-quick-read.js?v=2", "skillrYear1MathsQuickRead");
  if (matches.year1MathsWorksheet) loadScript("/assets/year1-maths-worksheet-page.js?v=2", "skillrYear1MathsWorksheet");
  if (matches.year1SciencePracticeTest) loadScript("/assets/year1-science-practice-quick-read.js?v=1", "skillrYear1ScienceQuickRead");
  if (matches.year1ScienceWorksheet) loadScript("/assets/year1-science-worksheet-page.js?v=1", "skillrYear1ScienceWorksheet");

  const foundationMathsTopic = /^\/foundation\/maths\/ac9mf/i.test(path) && !document.getElementById("teaching-lesson");
  if (foundationMathsTopic && !window.SkillrFoundationMaths) {
    loadSequence([
      ["/assets/foundation-maths-data-number.js?v=1", "skillrFoundationMathsDataNumber"],
      ["/assets/foundation-maths-data-other.js?v=1", "skillrFoundationMathsDataOther"],
      ["/assets/foundation-maths-render.js?v=1", "skillrFoundationMathsRender"]
    ]);
  }

  if (matches.foundationScienceTopic) {
    loadSequence([
      ["/assets/foundation-science-data.js?v=1", "skillrFoundationScienceData"],
      ["/assets/foundation-science-render.js?v=1", "skillrFoundationScienceRender"],
      ["/assets/foundation-science-curriculum-scope.js?v=1", "skillrFoundationScienceScope"]
    ]);
  }

  if (matches.foundationEnglishTopic) {
    loadSequence([
      ["/assets/foundation-english-data.js?v=1", "skillrFoundationEnglishData"],
      ["/assets/foundation-english-render.js?v=1", "skillrFoundationEnglishRender"]
    ]);
  }

  if (matches.year1MathsTopic) {
    loadSequence([
      ["/assets/year1-maths-data.js?v=1", "skillrYear1MathsData"],
      ["/assets/year1-maths-render.js?v=1", "skillrYear1MathsRender"]
    ]);
  }

  if (matches.year1ScienceTopic) {
    loadSequence([
      ["/assets/year1-science-data.js?v=1", "skillrYear1ScienceData"],
      ["/assets/year1-science-render.js?v=1", "skillrYear1ScienceRender"]
    ]);
  }

  if (matches.year2MathsTopic) {
    loadSequence([
      ["/assets/year2-maths-data.js?v=2", "skillrYear2MathsData"],
      ["/assets/year2-maths-data-extra.js?v=1", "skillrYear2MathsDataExtra"],
      ["/assets/year2-maths-render.js?v=2", "skillrYear2MathsRender"]
    ]);
  }

  if (matches.year2MathsPracticeTest) {
    loadSequence([
      ["/assets/year2-maths-data.js?v=2", "skillrYear2MathsPracticeData"],
      ["/assets/year2-maths-data-extra.js?v=1", "skillrYear2MathsPracticeDataExtra"],
      ["/assets/year2-maths-practice-quick-read.js?v=2", "skillrYear2MathsQuickRead"]
    ]);
  }

  if (matches.year2MathsWorksheet) {
    loadSequence([
      ["/assets/year2-maths-data.js?v=2", "skillrYear2MathsWorksheetDataSource"],
      ["/assets/year2-maths-data-extra.js?v=1", "skillrYear2MathsWorksheetDataExtra"],
      ["/assets/year2-maths-worksheet-page.js?v=2", "skillrYear2MathsWorksheet"]
    ]);
  }

  if (matches.year2ScienceTopic) {
    loadSequence([
      ["/assets/year2-science-data.js?v=1", "skillrYear2ScienceData"],
      ["/assets/year2-science-render.js?v=1", "skillrYear2ScienceRender"]
    ]);
  }

  if (matches.year2SciencePracticeTest) {
    loadSequence([
      ["/assets/year2-science-data.js?v=1", "skillrYear2SciencePracticeData"],
      ["/assets/year2-science-practice-quick-read.js?v=1", "skillrYear2ScienceQuickRead"]
    ]);
  }

  if (matches.year2ScienceWorksheet) {
    loadSequence([
      ["/assets/year2-science-data.js?v=1", "skillrYear2ScienceWorksheetDataSource"],
      ["/assets/year2-science-worksheet-page.js?v=1", "skillrYear2ScienceWorksheet"]
    ]);
  }

  if (matches.year2EnglishTopic) {
    loadSequence([
      ["/assets/year2-english-data.js?v=1", "skillrYear2EnglishData"],
      ["/assets/year2-english-render.js?v=1", "skillrYear2EnglishRender"]
    ]);
  }

  if (matches.year2EnglishPracticeTest) {
    loadSequence([
      ["/assets/year2-english-data.js?v=1", "skillrYear2EnglishPracticeData"],
      ["/assets/year2-english-practice-quick-read.js?v=1", "skillrYear2EnglishQuickRead"]
    ]);
  }

  if (matches.year2EnglishWorksheet) {
    loadSequence([
      ["/assets/year2-english-data.js?v=1", "skillrYear2EnglishWorksheetDataSource"],
      ["/assets/year2-english-worksheet-page.js?v=1", "skillrYear2EnglishWorksheet"]
    ]);
  }

  loadScript("/assets/progress-store.js?v=3", "skillrProgress");

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

  window.SkillrPwa = { isStandaloneApp, isInstallAvailable: () => Boolean(deferredInstallPrompt), promptInstall };
})();