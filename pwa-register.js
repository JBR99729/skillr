(() => {
  "use strict";

  const path = window.location.pathname;

  fetch("/assets/unavailable-activity-paths.json")
    .then((response) => response.ok ? response.json() : { paths: [] })
    .then(({ paths = [] }) => {
      const unavailable = paths.map((value) => new URL(value, window.location.origin).pathname);
      const removeUnavailableLinks = (root = document) => {
        root.querySelectorAll?.("a[href]").forEach((link) => {
          const target = new URL(link.href, window.location.origin);
          if (target.origin === window.location.origin && unavailable.some((prefix) => target.pathname.startsWith(prefix))) {
            link.remove();
          }
        });
      };
      removeUnavailableLinks();
      new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) removeUnavailableLinks(node);
        }));
      }).observe(document.documentElement, { childList: true, subtree: true });
    })
    .catch(() => {});

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
    return items.reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve())
      .catch((error) => console.error("Skillr script load failed:", error));
  }

  loadScript("/assets/display-only.js?v=1");
  loadScript("/assets/foundation-topic-language.js?v=1");
  loadScript("/assets/foundation-maths-professional-ui.js?v=5");
  loadSequence([
    "/assets/skillr-svg-runtime.js?v=2",
    "/assets/skillr-concept-svg.js?v=2",
    "/assets/curriculum-cluster-core.js?v=1",
    "/assets/curriculum-strand-coverage.js?v=2",
    "/assets/curriculum-visual-layer.js?v=2",
    "/assets/teacher-slide-clusters.js?v=1",
    "/assets/multi-strand-worksheet-pack.js?v=1",
    "/assets/qa-complete-ribbon.js?v=3"
  ]);

  const foundationMathsData = [
    "/assets/foundation-maths-data-number.js?v=2",
    "/assets/foundation-maths-data-other.js?v=2",
    "/assets/foundation-ac9mfn02-visual-elaborations.js?v=20260813",
    "/assets/foundation-maths-elaborations-n03-n05.js?v=20260813-4"
    ,"/assets/foundation-maths-elaborations-n06-a01-m01.js?v=20260813-4"
    ,"/assets/foundation-maths-elaborations-m02-sp01-sp02.js?v=20260813-4"
  ];
  const foundationScienceData = ["/assets/foundation-science-data.js?v=2"];
  const foundationEnglishData = ["/assets/foundation-english-data.js?v=2"];
  const foundationEnglishTopicModules = [
    "/assets/foundation-english-topic-module-la-v2.js?v=20260814-foundation-english-topic2",
    "/assets/foundation-english-topic-module-le-ly1-v2.js?v=20260814-foundation-english-topic2",
    "/assets/foundation-english-topic-module-ly2-v2.js?v=20260814-foundation-english-topic2",
    "/assets/foundation-english-topic-module-core-v2.js?v=20260814-foundation-english-topic2",
    "/assets/foundation-english-classroom-v2.js?v=20260814-foundation-english-topic2"
  ];
  const foundationEnglishWorksheetModules = [
    "/quiz/assets/foundation-english-topic-module-la-data-v2.js?v=20260814-foundation-english-topic2",
    "/quiz/assets/foundation-english-topic-module-le-ly1-data-v2.js?v=20260814-foundation-english-topic2",
    "/quiz/assets/foundation-english-topic-module-ly2-data-v2.js?v=20260814-foundation-english-topic2",
    "/quiz/assets/foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2"
  ];

  const year1MathsData = ["/assets/year1-maths-data.js?v=2"];
  const year1ScienceData = ["/assets/year1-science-data.js?v=2"];
  const year1EnglishData = ["/assets/year1-english-data.js?v=2"];

  const year2MathsData = ["/assets/year2-maths-data.js?v=3", "/assets/year2-maths-data-extra.js?v=2"];
  const year2ScienceData = ["/assets/year2-science-data.js?v=2"];
  const year2EnglishData = ["/assets/year2-english-data.js?v=2"];

  const year3MathsData = [
    "/assets/year3-maths-data-base.js?v=2",
    "/assets/year3-maths-data-n1.js?v=2",
    "/assets/year3-maths-data-n2.js?v=2",
    "/assets/year3-maths-data-n3.js?v=2",
    "/assets/year3-maths-data-a.js?v=2",
    "/assets/year3-maths-data-m1.js?v=2",
    "/assets/year3-maths-data-m2.js?v=2",
    "/assets/year3-maths-data-sp.js?v=2",
    "/assets/year3-maths-data-st.js?v=2",
    "/assets/year3-maths-data-p.js?v=2"
  ];
  const year3ScienceData = ["/assets/year3-subject-data-base.js?v=2", "/assets/year3-science-data.js?v=2"];
  const year3EnglishData = [
    "/assets/year3-subject-data-base.js?v=2",
    "/assets/year3-english-data-la1.js?v=2",
    "/assets/year3-english-data-la2.js?v=2",
    "/assets/year3-english-data-la3a.js?v=2",
    "/assets/year3-english-data-la3b.js?v=2",
    "/assets/year3-english-data-le.js?v=2",
    "/assets/year3-english-data-ly1.js?v=2",
    "/assets/year3-english-data-ly2.js?v=2"
  ];

  const year4MathsData = [
    "/assets/year4-maths-data-base.js?v=5",
    "/assets/year4-maths-data-n1.js?v=5",
    "/assets/year4-maths-data-n2.js?v=5",
    "/assets/year4-maths-data-n3.js?v=5",
    "/assets/year4-maths-data-a.js?v=5",
    "/assets/year4-maths-data-m1.js?v=5",
    "/assets/year4-maths-data-m2.js?v=5",
    "/assets/year4-maths-data-sp.js?v=5",
    "/assets/year4-maths-data-st.js?v=5",
    "/assets/year4-maths-data-p.js?v=5"
  ];
  const year4ScienceData = ["/assets/year4-subject-data-base.js?v=1", "/assets/year4-science-data.js?v=1", "/assets/year4-science-topic-modules.js?v=2"];
  const year4EnglishData = [
    "/assets/year4-subject-data-base.js?v=1",
    "/assets/year4-english-data-la1.js?v=1",
    "/assets/year4-english-data-la2.js?v=1",
    "/assets/year4-english-data-le.js?v=1",
    "/assets/year4-english-data-ly1.js?v=1",
    "/assets/year4-english-data-ly2.js?v=1"
  ];

  const routes = [
    [/^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/(practice|test)\/?$/i, [...foundationMathsData, "/assets/foundation-maths-practice-quick-read.js?v=7"]],
    [/^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/worksheet\/?$/i, foundationMathsData],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/(practice|test)\/?$/i, [...foundationScienceData, "/assets/foundation-science-practice-quick-read.js?v=5"]],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/worksheet\/?$/i, [...foundationScienceData, "/assets/foundation-science-worksheet-page.js?v=20260814-topic-practice-split2"]],
    [/^\/foundation\/science\/ac9s/i, [...foundationScienceData, "/assets/foundation-science-render.js?v=2", "/assets/foundation-science-curriculum-scope.js?v=2"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/(practice|test)\/?$/i, [...foundationEnglishData, "/assets/foundation-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet(?:\/topic-practice-[12])?\/?$/i, [...foundationEnglishData, ...foundationEnglishWorksheetModules, "/assets/foundation-english-worksheet-page.js?v=20260814-foundation-english-topic2", "/assets/foundation-english-topic-practice-compat.js?v=20260814-foundation-english-topic2"]],
    [/^\/foundation\/english\/ac9ef/i, [...foundationEnglishData, ...foundationEnglishTopicModules, "/assets/foundation-english-render.js?v=20260814-foundation-english-topic2"]],

    [/^\/year1\/maths\/ac9m1/i, [...year1MathsData, "/assets/year1-maths-render.js?v=2"]],
    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/(practice|test)\/?$/i, [...year1MathsData, "/assets/year1-maths-practice-quick-read.js?v=3"]],
    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/worksheet\/?$/i, [...year1MathsData, "/assets/year1-maths-worksheet-page.js?v=3"]],
    [/^\/year1\/science\/ac9s1/i, [...year1ScienceData, "/assets/year1-science-render.js?v=2"]],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/(practice|test)\/?$/i, [...year1ScienceData, "/assets/year1-science-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/worksheet\/?$/i, [...year1ScienceData, "/assets/year1-science-worksheet-page.js?v=2"]],
    [/^\/year1\/english\/ac9e1/i, [...year1EnglishData, "/assets/year1-english-render.js?v=2"]],
    [/^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/(practice|test)\/?$/i, [...year1EnglishData, "/assets/year1-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/worksheet\/?$/i, [...year1EnglishData, "/assets/year1-english-worksheet-page.js?v=2"]],

    [/^\/year2\/maths\/ac9m2/i, [...year2MathsData, "/assets/year2-maths-render.js?v=3"]],
    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/(practice|test)\/?$/i, [...year2MathsData, "/assets/year2-maths-practice-quick-read.js?v=3"]],
    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/worksheet\/?$/i, [...year2MathsData, "/assets/year2-maths-worksheet-page.js?v=3"]],
    [/^\/year2\/science\/ac9s2/i, [...year2ScienceData, "/assets/year2-science-render.js?v=3"]],
    [/^\/quiz\/year-2\/science\/ac9s2u0[123]\/(practice|test)\/?$/i, [...year2ScienceData, "/assets/year2-science-practice-quick-read.js?v=2", "/assets/year2-science-authored-banks.js?v=20260813-qa1", "/assets/year2-science-bank-loader.js?v=20260813-qa1"]],
    [/^\/quiz\/year-2\/science\/ac9s2u0[123]\/quiz\/?$/i, [...year2ScienceData, "/assets/year2-science-quiz-page.js?v=20260813-qa1", "/assets/year2-science-authored-banks.js?v=20260813-qa1", "/assets/year2-science-bank-loader.js?v=20260813-qa1"]],
    [/^\/quiz\/year-2\/science\/ac9s2(?:h01|i0[12])\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch2.js?v=20260813-qa2", "/assets/year2-science-bank-loader.js?v=20260813-qa2", "/assets/year2-science-quiz-page.js?v=20260813-qa2"]],
    [/^\/quiz\/year-2\/science\/ac9s2i0[3-5]\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch3.js?v=20260813-qa3", "/assets/year2-science-bank-loader.js?v=20260813-qa3", "/assets/year2-science-quiz-page.js?v=20260813-qa3"]],
    [/^\/quiz\/year-2\/science\/ac9s2i06\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch4.js?v=20260813-qa4", "/assets/year2-science-bank-loader.js?v=20260813-qa4", "/assets/year2-science-quiz-page.js?v=20260813-qa4"]],
    [/^\/quiz\/year-2\/science\/ac9s2(?!u0[123])[a-z0-9]+\/(practice|test)\/?$/i, [...year2ScienceData, "/assets/year2-science-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/worksheet\/?$/i, [...year2ScienceData, "/assets/year2-science-worksheet-page.js?v=2"]],
    [/^\/year2\/english\/ac9e2/i, [...year2EnglishData, "/assets/year2-english-render.js?v=3"]],
    [/^\/quiz\/year-2\/english\/ac9e2la0[1-3]\/quiz\/?$/i, [...year2EnglishData, "/assets/year2-english-authored-banks-batch1.js?v=20260813-eqa1", "/assets/year2-english-bank-loader.js?v=20260813-eqa1", "/assets/year2-english-quiz-page.js?v=20260813-eqa1"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/(practice|test)\/?$/i, [...year2EnglishData, "/assets/year2-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/worksheet\/?$/i, [...year2EnglishData, "/assets/year2-english-worksheet-page.js?v=2"]],

    [/^\/year3\/maths\/ac9m3/i, [...year3MathsData, "/assets/year3-maths-render.js?v=2"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/(practice|test)\/?$/i, [...year3MathsData, "/assets/year3-maths-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/worksheet\/?$/i, [...year3MathsData, "/assets/year3-maths-worksheet-page.js?v=2"]],
    [/^\/year3\/science\/ac9s3/i, [...year3ScienceData, "/assets/year3-subject-render.js?v=2"]],
    [/^\/quiz\/year-3\/science\/ac9s3[a-z0-9]+\/(practice|test)\/?$/i, [...year3ScienceData, "/assets/year3-subject-quick-read.js?v=2"]],
    [/^\/quiz\/year-3\/science\/ac9s3[a-z0-9]+\/worksheet\/?$/i, [...year3ScienceData, "/assets/year3-subject-worksheet-page.js?v=2"]],
    [/^\/year3\/english\/ac9e3/i, [...year3EnglishData, "/assets/year3-subject-render.js?v=2"]],
    [/^\/quiz\/year-3\/english\/ac9e3[a-z0-9]+\/(practice|test)\/?$/i, [...year3EnglishData, "/assets/year3-subject-quick-read.js?v=2"]],
    [/^\/quiz\/year-3\/english\/ac9e3[a-z0-9]+\/worksheet\/?$/i, [...year3EnglishData, "/assets/year3-subject-worksheet-page.js?v=2"]],

    [/^\/year4\/maths\/ac9m4/i, [...year4MathsData, "/assets/year4-maths-render.js?v=5"]],
    [/^\/quiz\/year-4\/math\/ac9m4[a-z0-9]+\/(practice|test)\/?$/i, [...year4MathsData, "/assets/year4-maths-practice-quick-read.js?v=5"]],
    [/^\/quiz\/year-4\/math\/ac9m4[a-z0-9]+\/worksheet\/?$/i, [...year4MathsData, "/assets/year4-maths-worksheet-page.js?v=5"]],
    [/^\/year4\/science\/ac9s4/i, [...year4ScienceData, "/assets/year4-science-topic-render.js?v=2"]],
    [/^\/quiz\/year-4\/science\/ac9s4[a-z0-9]+\/(practice|test)\/?$/i, [...year4ScienceData, "/assets/year4-subject-quick-read.js?v=1"]],
    [/^\/quiz\/year-4\/science\/ac9s4[a-z0-9]+\/worksheet\/?$/i, [...year4ScienceData, "/assets/year4-science-worksheet.js?v=2"]],
    [/^\/year4\/english\/ac9e4/i, [...year4EnglishData, "/assets/year4-subject-render.js?v=1"]],
    [/^\/quiz\/year-4\/english\/ac9e4[a-z0-9]+\/(practice|test)\/?$/i, [...year4EnglishData, "/assets/year4-subject-quick-read.js?v=1"]],
    [/^\/quiz\/year-4\/english\/ac9e4[a-z0-9]+\/worksheet\/?$/i, [...year4EnglishData, "/assets/year4-subject-worksheet-page.js?v=1"]]
  ];

  const foundationMathsTopic = /^\/foundation\/maths\/ac9mf/i.test(path) && !document.getElementById("teaching-lesson");
  if (foundationMathsTopic && !window.SkillrFoundationMathsData) {
    loadSequence([...foundationMathsData, "/assets/foundation-maths-render.js?v=20260813-4"]);
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

  function normalizeSharedChrome() {
    const mainNav = document.querySelector(".main-nav");
    const currentPath = path.replace(/index\.html$/, "");
    if (mainNav) {
      mainNav.replaceChildren(...[
        ["Home", "/"], ["Dashboard", "/dashboard/"], ["Blogs", "/blogs/"],
        ["Features", "/why-skillrhub.html"], ["About", "/about.html"], ["Contact", "/contact.html"]
      ].map(([label, href]) => {
        const link = document.createElement("a");
        link.textContent = label;
        link.href = href;
        if (currentPath === href || (href.endsWith("/") && currentPath.startsWith(href) && href !== "/")) {
          link.setAttribute("aria-current", "page");
        }
        return link;
      }));
      const brand = document.createElement("a");
      brand.className = "skillr-nav-brand";
      brand.href = "/";
      brand.setAttribute("aria-label", "SkillrHub home");
      brand.innerHTML = '<img src="/icons/skillrhub-mark.svg" alt="" width="30" height="30"><span>SkillrHub</span>';
      mainNav.prepend(brand);
    }

    const footer = document.querySelector("footer");
    if (footer) {
      let footerNav = footer.querySelector(".footer-nav");
      if (!footerNav) {
        footerNav = document.createElement("nav");
        footerNav.className = "footer-nav";
        footerNav.setAttribute("aria-label", "Footer navigation");
        footer.prepend(footerNav);
      }
      footerNav.replaceChildren(...[
        ["Home", "/"], ["Dashboard", "/dashboard/"], ["Blogs", "/blogs/"],
        ["Worksheets", "/worksheets/"], ["About", "/about.html"],
        ["Features", "/why-skillrhub.html"], ["Contact", "/contact.html"],
        ["💬 Request a Feature / Feedback", "/contact.html"], ["Privacy", "/privacy-policy.html"]
      ].map(([label, href]) => {
        const link = document.createElement("a");
        link.textContent = label;
        link.href = href;
        return link;
      }));
    }
  }

  const TIMER_KEY = "skillrBreakTimerV1";
  const INSTALL_DISMISS_KEY = "skillrPwaBannerDismissedAt";
  let timerCheckId = null;

  function copyText(value) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
    const field = document.createElement("textarea");
    field.value = value;
    field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
    return Promise.resolve();
  }

  function closeLayer(layer, returnFocus) {
    layer?.remove();
    returnFocus?.focus?.();
  }

  function createLayer(className, labelledBy) {
    const layer = document.createElement("div");
    layer.className = `skillr-modal-layer ${className || ""}`.trim();
    layer.setAttribute("role", "presentation");
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        closeLayer(layer);
        document.removeEventListener("keydown", closeOnEscape);
      }
    };
    layer.addEventListener("click", (event) => { if (event.target === layer) closeLayer(layer); });
    document.addEventListener("keydown", closeOnEscape);
    if (labelledBy) layer.dataset.labelledBy = labelledBy;
    document.body.appendChild(layer);
    return layer;
  }

  function isIosSafari() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
  }

  function showInstallHelp(trigger) {
    const layer = createLayer("skillr-install-layer", "skillr-install-title");
    const panel = document.createElement("section");
    panel.className = "skillr-modal-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "skillr-install-title");
    const instructions = isIosSafari()
      ? "In Safari, tap the Share button, scroll down, then choose Add to Home Screen."
      : "Use the install icon in your browser address bar or browser menu. Installation support depends on your browser.";
    panel.innerHTML = `<header><div><span aria-hidden="true">📲</span><h2 id="skillr-install-title">Add SkillrHub to your device</h2></div><button type="button" class="skillr-modal-close" aria-label="Close">×</button></header><p>${instructions}</p><ul><li>Open Daily Drills in one tap.</li><li>Keep private, local progress on this device.</li><li>Use the distraction-free app window when supported.</li></ul><button type="button" class="skillr-primary-action">Got it</button>`;
    layer.appendChild(panel);
    const close = () => closeLayer(layer, trigger);
    panel.querySelector(".skillr-modal-close").addEventListener("click", close);
    panel.querySelector(".skillr-primary-action").addEventListener("click", close);
    panel.querySelector(".skillr-modal-close").focus();
  }

  async function handleInstall(trigger) {
    const choice = await promptInstall();
    if (choice?.outcome === "unavailable") showInstallHelp(trigger);
  }

  function readTimer() {
    try {
      const value = JSON.parse(localStorage.getItem(TIMER_KEY) || "null");
      if (value && [15, 20, 30, 45, 60].includes(Number(value.minutes))) {
        return { minutes: Number(value.minutes), running: Boolean(value.running), nextAt: Number(value.nextAt) || 0 };
      }
    } catch (_) {}
    return { minutes: 60, running: false, nextAt: 0 };
  }

  function writeTimer(value) {
    try { localStorage.setItem(TIMER_KEY, JSON.stringify(value)); } catch (_) {}
    updateTimerLabels();
  }

  function playTimerChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audio = new AudioContext();
      const gain = audio.createGain();
      const oscillator = audio.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(587.33, audio.currentTime);
      oscillator.frequency.setValueAtTime(880, audio.currentTime + .2);
      gain.gain.setValueAtTime(.18, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + 1.2);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 1.2);
      oscillator.addEventListener("ended", () => audio.close());
    } catch (_) {}
  }

  function showTimerReminder(minutes) {
    document.querySelector(".skillr-timer-toast")?.remove();
    const toast = document.createElement("aside");
    toast.className = "skillr-timer-toast";
    toast.setAttribute("role", "alert");
    toast.innerHTML = `<strong>⏰ ${minutes} minutes are up</strong><span>Time to stretch, drink water and rest your eyes.</span><button type="button">Dismiss</button>`;
    document.body.appendChild(toast);
    toast.querySelector("button").addEventListener("click", () => toast.remove());
    window.setTimeout(() => toast.remove(), 12000);
  }

  function checkTimer() {
    const timer = readTimer();
    updateHomeTimerStatus(timer);
    if (!timer.running || !timer.nextAt || Date.now() < timer.nextAt) return;
    playTimerChime();
    showTimerReminder(timer.minutes);
    timer.nextAt = Date.now() + timer.minutes * 60 * 1000;
    writeTimer(timer);
  }

  function updateHomeTimerStatus(timer = readTimer()) {
    const status = document.getElementById("home-timer-status");
    if (!status) return;
    if (!timer.running || !timer.nextAt) {
      status.textContent = "Set a 15–60 minute reminder";
      return;
    }
    const remaining = Math.max(0, timer.nextAt - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    status.textContent = `${minutes}:${String(seconds).padStart(2, "0")} remaining`;
  }

  function updateTimerLabels() {
    const timer = readTimer();
    document.querySelectorAll("[data-skillr-timer]").forEach((button) => {
      const label = timer.running ? `${timer.minutes}m active` : "Break timer";
      button.innerHTML = `<svg class="skillr-ui-icon" aria-hidden="true"><use href="/icons/skillr-symbols.svg#timer"></use></svg><span>${label}</span>`;
      button.setAttribute("aria-label", timer.running ? `Break timer active every ${timer.minutes} minutes` : "Open break timer");
    });
  }

  function showTimerPanel(trigger) {
    const timer = readTimer();
    const layer = createLayer("skillr-timer-layer", "skillr-timer-title");
    const panel = document.createElement("section");
    panel.className = "skillr-modal-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "skillr-timer-title");
    panel.innerHTML = '<header><div><span aria-hidden="true">⏰</span><h2 id="skillr-timer-title">Classroom break timer</h2></div><button type="button" class="skillr-modal-close" aria-label="Close">×</button></header><p>Choose a gentle reminder interval. Your preference stays on this device.</p><label class="skillr-timer-field">Reminder interval<select><option value="15">15 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label><p class="skillr-timer-panel-status" role="status"></p><div class="skillr-modal-actions"><button type="button" class="skillr-primary-action"></button><button type="button" class="skillr-secondary-action">Close</button></div>';
    layer.appendChild(panel);
    const select = panel.querySelector("select");
    const action = panel.querySelector(".skillr-primary-action");
    const status = panel.querySelector(".skillr-timer-panel-status");
    select.value = String(timer.minutes);
    action.textContent = timer.running ? "Stop timer" : "Start timer";
    status.textContent = timer.running ? `Active every ${timer.minutes} minutes.` : "Timer is stopped.";
    const close = () => closeLayer(layer, trigger);
    panel.querySelector(".skillr-modal-close").addEventListener("click", close);
    panel.querySelector(".skillr-secondary-action").addEventListener("click", close);
    action.addEventListener("click", () => {
      const current = readTimer();
      if (current.running) {
        writeTimer({ minutes: Number(select.value), running: false, nextAt: 0 });
        status.textContent = "Timer stopped.";
        action.textContent = "Start timer";
      } else {
        const minutes = Number(select.value);
        writeTimer({ minutes, running: true, nextAt: Date.now() + minutes * 60 * 1000 });
        status.textContent = `Active every ${minutes} minutes.`;
        action.textContent = "Stop timer";
      }
    });
    panel.querySelector(".skillr-modal-close").focus();
  }

  function makeUtilityButton(kind, label, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "skillr-utility-button";
    button.dataset[`skillr${kind[0].toUpperCase()}${kind.slice(1)}`] = "true";
    button.innerHTML = `<svg class="skillr-ui-icon" aria-hidden="true"><use href="/icons/skillr-symbols.svg#${icon}"></use></svg><span>${label}</span>`;
    if (kind === "install") button.addEventListener("click", () => handleInstall(button));
    if (kind === "timer") button.addEventListener("click", () => showTimerPanel(button));
    return button;
  }

  function setupUtilityControls() {
    // Remove the retired Projector Mode state from devices that previously used it.
    document.documentElement.classList.remove("skillr-projector-mode");
    try { localStorage.removeItem("skillrProjectorModeV1"); } catch (_) {}
    const headerHost = document.querySelector(".site-header__links, .main-nav, .dashboard-nav");
    if (headerHost && !headerHost.querySelector(".skillr-header-tools")) {
      const tools = document.createElement("div");
      tools.className = "skillr-header-tools";
      if (!document.getElementById("installButton")) tools.appendChild(makeUtilityButton("install", "App", "install"));
      tools.append(makeUtilityButton("timer", "Timer", "timer"));
      headerHost.appendChild(tools);
    }
    const footer = document.querySelector("footer");
    if (footer && !footer.querySelector(".skillr-footer-tools")) {
      const tools = document.createElement("div");
      tools.className = "skillr-footer-tools";
      tools.append(makeUtilityButton("install", "Install app", "install"), makeUtilityButton("timer", "Break timer", "timer"));
      footer.appendChild(tools);
    }
    document.querySelectorAll("[data-skillr-home-timer]").forEach((button) => {
      if (button.dataset.skillrTimerReady === "true") return;
      button.dataset.skillrTimerReady = "true";
      button.addEventListener("click", () => showTimerPanel(button));
    });
    updateTimerLabels();
    updateHomeTimerStatus();
    window.clearInterval(timerCheckId);
    timerCheckId = window.setInterval(checkTimer, 1000);
    window.addEventListener("focus", checkTimer);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) checkTimer(); });
  }

  function bannerRecentlyDismissed() {
    try {
      const dismissed = Number(localStorage.getItem(INSTALL_DISMISS_KEY)) || 0;
      const accepted = Number(localStorage.getItem(ACCEPTED_AT_KEY)) || 0;
      return accepted > 0 || Date.now() - dismissed < 30 * 24 * 60 * 60 * 1000;
    } catch (_) { return false; }
  }

  function showInstallBanner() {
    if (isStandaloneApp() || bannerRecentlyDismissed() || document.querySelector(".skillr-install-banner")) return;
    const banner = document.createElement("aside");
    banner.className = "skillr-install-banner";
    banner.setAttribute("aria-label", "Install SkillrHub app");
    banner.innerHTML = '<div><strong>⚡ Add SkillrHub to your device</strong><span>Open Daily Drills in one tap and keep private progress on this device.</span></div><div><button type="button" class="skillr-banner-install">Add app</button><button type="button" class="skillr-banner-dismiss">Not now</button></div>';
    document.body.appendChild(banner);
    banner.querySelector(".skillr-banner-install").addEventListener("click", () => handleInstall(banner.querySelector(".skillr-banner-install")));
    banner.querySelector(".skillr-banner-dismiss").addEventListener("click", () => {
      try { localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now())); } catch (_) {}
      banner.remove();
    });
  }

  function cleanShareUrl() {
    const url = new URL(window.location.href);
    ["warmup", "embed", "questions"].forEach((key) => url.searchParams.delete(key));
    url.hash = "";
    return url.href;
  }

  function practiceWidgetUrl() {
    const current = new URL(cleanShareUrl());
    if (/\/quiz\/.+\/(practice|test|worksheet)\/?$/i.test(current.pathname)) {
      current.pathname = current.pathname.replace(/\/(practice|test|worksheet)\/?$/i, "/practice/");
    } else {
      const practice = document.querySelector('a[href*="/quiz/"][href*="/practice/"]');
      if (!practice) return "";
      current.href = new URL(practice.href, window.location.origin).href;
    }
    current.searchParams.set("questions", "3");
    current.searchParams.set("embed", "1");
    return current.href;
  }

  function isQrCardPage() {
    return /\/quiz\/.+\/(?:practice|test|worksheet)\/?$/i.test(path) ||
      /\/daily-drills\//i.test(path);
  }

  async function showQrCard(trigger) {
    const layer = createLayer("skillr-qr-layer", "skillr-qr-title");
    const panel = document.createElement("section");
    panel.className = "skillr-modal-panel skillr-qr-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "skillr-qr-title");
    const title = (document.querySelector("h1")?.textContent || document.title).trim();
    const url = cleanShareUrl();
    panel.innerHTML = '<header><div><span aria-hidden="true">▦</span><h2 id="skillr-qr-title">Lesson quick-code card</h2></div><button type="button" class="skillr-modal-close" aria-label="Close">×</button></header><div class="skillr-qr-print-card"><p class="skillr-qr-brand">SkillrHub</p><h3></h3><div class="skillr-qr-image" aria-label="QR code"></div><p>Scan to open this learning resource</p><small></small></div><p class="skillr-qr-status" role="status">Creating QR code…</p><div class="skillr-modal-actions"><button type="button" class="skillr-primary-action skillr-copy-link">Copy lesson link</button><button type="button" class="skillr-secondary-action skillr-print-qr">Print card</button></div>';
    panel.querySelector("h3").textContent = title;
    panel.querySelector(".skillr-qr-print-card small").textContent = url.replace(/^https?:\/\//, "");
    layer.appendChild(panel);
    const status = panel.querySelector(".skillr-qr-status");
    const close = () => closeLayer(layer, trigger);
    panel.querySelector(".skillr-modal-close").addEventListener("click", close);
    panel.querySelector(".skillr-copy-link").addEventListener("click", async () => { await copyText(url); status.textContent = "Lesson link copied."; });
    panel.querySelector(".skillr-print-qr").addEventListener("click", () => { document.body.classList.add("skillr-printing-qr"); window.print(); window.setTimeout(() => document.body.classList.remove("skillr-printing-qr"), 500); });
    const widget = practiceWidgetUrl();
    if (widget) {
      const embed = document.createElement("button");
      embed.type = "button";
      embed.className = "skillr-secondary-action";
      embed.textContent = "Copy 3-question embed";
      embed.addEventListener("click", async () => {
        const code = `<iframe src="${widget}" title="SkillrHub 3-question warm-up" width="100%" height="650" loading="lazy"></iframe>`;
        await copyText(code);
        status.textContent = "Embed code copied.";
      });
      panel.querySelector(".skillr-modal-actions").appendChild(embed);
    }
    try {
      await loadScript("/assets/vendor/qrcode.min.js?v=1");
      const image = panel.querySelector(".skillr-qr-image");
      new window.QRCode(image, { text: url, width: 220, height: 220, colorDark: "#102a50", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
      status.textContent = "Ready to copy or print.";
    } catch (_) {
      status.textContent = "The QR code could not be created, but the lesson link can still be copied.";
    }
    panel.querySelector(".skillr-modal-close").focus();
  }

  function setupQrCard() {
    if (!isQrCardPage() || document.querySelector(".skillr-qr-trigger")) return;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "skillr-qr-trigger";
    trigger.innerHTML = '<svg class="skillr-ui-icon" aria-hidden="true"><use href="/icons/skillr-symbols.svg#qr"></use></svg> QR card';
    trigger.addEventListener("click", () => showQrCard(trigger));
    const host = document.querySelector(".quiz-breadcrumb, .worksheet-nav, .quiz-header");
    host?.prepend(trigger);
  }

  function setupSlideKeyboard() {
    if (!/\/teacher-slides\//i.test(path)) return;
    document.addEventListener("keydown", (event) => {
      if (event.target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      const next = document.querySelector('[data-action="next"], .next-slide, #nextSlide, [aria-label*="Next slide" i]');
      const previous = document.querySelector('[data-action="previous"], .previous-slide, #previousSlide, [aria-label*="Previous slide" i]');
      if (event.key === "ArrowRight" && next) { event.preventDefault(); next.click(); }
      if (event.key === "ArrowLeft" && previous) { event.preventDefault(); previous.click(); }
    });
  }

  function initialiseSharedExperience() {
    normalizeSharedChrome();
    setupUtilityControls();
    setupQrCard();
    setupSlideKeyboard();
    window.setTimeout(showInstallBanner, 45000);
    document.addEventListener("skillr:quiz-complete", () => window.setTimeout(showInstallBanner, 500));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseSharedExperience, { once: true });
  } else {
    initialiseSharedExperience();
  }
})();
