(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-1\/math\/(ac9m1[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  const loadScript = (src) => new Promise((resolve, reject) => {
    const existing = [...document.scripts].find((script) => script.src.includes(src.split("?")[0]));
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      setTimeout(resolve, 250);
      return;
    }
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
    link.href = "/quiz/assets/foundation-authored-worksheet.css?v=2";
    document.head.appendChild(link);
  }

  async function init() {
    try {
      if (!window.SkillrYear1MathsData?.[code]) await loadScript("/assets/year1-maths-data.js?v=1");
      const unit = window.SkillrYear1MathsData?.[code];
      const worksheet = window.SkillrYear1MathsWorksheetData?.[code];
      if (!unit || !worksheet) return;
      ensureCss();
      window.SkillrFoundationWorksheetData = Object.assign(window.SkillrFoundationWorksheetData || {}, window.SkillrYear1MathsWorksheetData || {});
      document.title = `${code} ${worksheet.title} Worksheet | SkillrHub`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = `${code} Year 1 Maths worksheet with 8 core and 2 enrichment questions authored from the ${worksheet.title} topic lesson.`;
      document.body.innerHTML = `<div class="worksheet-shell">
        <nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/year1/curriculum/maths/">Year 1 Maths</a><a href="/year1/maths/${unit.slug}/">${code} topic</a></nav>
        <header class="worksheet-hero">
          <div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Year 1 Maths • Student Worksheet</small></div>
          <p class="eyebrow">${code} • Year 1 Maths</p>
          <h1>${worksheet.title} Worksheet</h1>
          <div class="worksheet-meta"><span>10 questions</span><span>8 core</span><span>2 enrichment</span><span>US Letter portrait • 1 page when possible</span></div>
          <div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview PDF worksheet</button><a href="/year1/maths/${unit.slug}/">Back to topic</a><a href="/quiz/year-1/math/${code.toLowerCase()}/practice/">Open practice</a></div>
          <div class="worksheet-print-tip">Printing tip: if this worksheet uses 2 pages, choose double-sided (duplex) printing to use one sheet per student.</div>
        </header>
        <main id="worksheetRoot"></main>
      </div>`;
      if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      await loadScript("/quiz/assets/foundation-maths-authored-worksheet.js?v=5");
    } catch (error) {
      console.error("Skillr Year 1 Maths worksheet setup failed:", error);
    }
  }

  init();
})();
