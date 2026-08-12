(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/grade-k\/science\/(ac9s[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  const loadScript = (src) => new Promise((resolve,reject) => {
    const s=document.createElement("script");s.src=src;s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
  });

  const ensureCss = () => {
    if ([...document.styleSheets].some(sheet => String(sheet.href||"").includes("foundation-authored-worksheet.css"))) return;
    const link=document.createElement("link");link.rel="stylesheet";link.href="/quiz/assets/foundation-authored-worksheet.css?v=2";document.head.appendChild(link);
  };

  async function init(){
    try{
      if(!window.SkillrFoundationScienceData?.[code]) await loadScript("/assets/foundation-science-data.js?v=1");
      if(!window.SkillrFoundationScienceWorksheetData?.[code]) await loadScript("/quiz/assets/foundation-science-worksheet-data.js?v=2");
      const lesson=window.SkillrFoundationScienceData?.[code];
      const worksheet=window.SkillrFoundationScienceWorksheetData?.[code];
      if(!lesson||!worksheet) return;

      ensureCss();
      document.title=`${code} ${worksheet.title} Worksheet | SkillrHub`;
      const meta=document.querySelector('meta[name="description"]');
      if(meta) meta.content=`${code} Foundation Science worksheet with 8 core and 2 enrichment questions authored from the ${worksheet.title} topic lesson.`;

      document.body.innerHTML=`<div class="worksheet-shell">
        <nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/foundation/curriculum/science/">Foundation Science</a><a href="/foundation/science/${lesson.slug}/">${code} topic</a></nav>
        <header class="worksheet-hero">
          <div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Foundation Science • Student Worksheet</small></div>
          <p class="eyebrow">${code} • Foundation Science</p>
          <h1>${worksheet.title} Worksheet</h1>
          <div class="worksheet-meta"><span>10 questions</span><span>8 core</span><span>2 enrichment</span><span>US Letter portrait • 1 page when possible</span></div>
          <div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview PDF worksheet</button><a href="/foundation/science/${lesson.slug}/">Back to topic</a><a href="/quiz/grade-k/science/${code.toLowerCase()}/practice/">Open practice</a></div>
          <div class="worksheet-print-tip">Printing tip: if this worksheet uses 2 pages, choose double-sided (duplex) printing to use one sheet per student.</div>
        </header>
        <main id="worksheetRoot"></main>
      </div>`;

      if(!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      await loadScript("/quiz/assets/foundation-maths-authored-worksheet.js?v=4");
    }catch(error){console.error("Skillr Foundation Science worksheet setup failed:",error);}
  }

  init();
})();
