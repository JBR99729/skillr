(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/grade-k\/english\/(ac9ef[a-z0-9]+)\/worksheet(?:\/topic-practice-[12])?\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  const loadScript = (src) => new Promise((resolve, reject) => {
    const existing = [...document.scripts].find((script) => script.src.includes(src.split("?")[0]));
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const forceLoadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  function ensureCss() {
    if ([...document.styleSheets].some((sheet) => String(sheet.href || "").includes("foundation-authored-worksheet.css"))) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/quiz/assets/foundation-authored-worksheet.css?v=20260814-foundation-english-topic2";
    document.head.appendChild(link);
  }

  async function init() {
    try {
      if (!window.SkillrFoundationEnglishData?.[code]) await loadScript("/assets/foundation-english-data.js?v=20260814-foundation-english-topic2");
      for (const src of [
        "/quiz/assets/foundation-english-topic-module-la-data-v2.js?v=20260814-foundation-english-topic2",
        "/quiz/assets/foundation-english-topic-module-le-ly1-data-v2.js?v=20260814-foundation-english-topic2",
        "/quiz/assets/foundation-english-topic-module-ly2-data-v2.js?v=20260814-foundation-english-topic2",
        "/quiz/assets/foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2"
      ]) await loadScript(src);
      const lesson = window.SkillrFoundationEnglishData?.[code];
      const unit = window.SkillrFoundationEnglishWorksheetData?.[code];
      if (!lesson || !unit) return;
      ensureCss();
      document.title = `${code} ${unit.title} Worksheet | SkillrHub`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = `${code} Foundation English practice sheet with 3 Warm-Up, 4 Core and 2 Challenge questions plus a complete answer key.`;
      document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/foundation/curriculum/english/">Foundation English</a><a href="/foundation/english/${lesson.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar"><div class="brandmark"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo">SkillrHub <span>F–10</span></div><small>Foundation English • Student Practice Sheet</small></div><p class="eyebrow" id="worksheetEyebrow">${code} • Foundation English</p><h1 id="worksheetHeroTitle">${unit.title} Practice Sheet</h1><div class="worksheet-meta"><span>9 questions</span><span>3 Warm-Up • 4 Core • 2 Challenge</span><span>Complete answer key</span><span>US Letter portrait</span></div><div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview practice sheet</button><a id="backToTopic" href="/foundation/english/${lesson.slug}/">Back to topic</a><a id="openPractice" href="/quiz/grade-k/english/${code.toLowerCase()}/practice/">Open practice</a></div><div class="worksheet-print-tip">Print the practice sheet for students. Keep the answer key as the teacher copy.</div></header><main id="worksheetRoot"></main></div>`;
      // Always execute the release-pinned renderer after a cached DOM rebuild.
      // A service worker may have left an older global function in memory, and
      // invoking it here could silently restore the pre-split worksheet.
      await forceLoadScript("/quiz/assets/foundation-maths-authored-worksheet.js?v=20260814-foundation-english-topic2");
      if (!window.jspdf?.jsPDF) loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js").catch(() => {});
    } catch (error) {
      console.error("Skillr Foundation English worksheet setup failed:", error);
    }
  }

  window.SkillrFoundationEnglishWorksheetPageInit = init;
  init();
})();
