"use strict";
(() => {
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));

  function visualHtml(visual) {
    if (!visual) return "";
    if (typeof visual !== "object") return esc(visual).replace(/\n/g, "<br>");
    const alt = esc(visual.alt_text || "Maths picture");
    if (visual.asset_path && visual.symbol_id) {
      return `<svg viewBox="${esc(visual.view_box || "0 0 720 180")}" role="img" aria-label="${alt}"><use href="${esc(visual.asset_path)}#${esc(visual.symbol_id)}"></use></svg>`;
    }
    return esc(visual.fallback_text || visual.alt_text || "").replace(/\n/g, "<br>");
  }

  function questionHtml(q, i) {
    let body = "";

    if (q.visual) {
      body += `<div class="visual">${visualHtml(q.visual)}</div>`;
    }

    if (q.type === "single" || q.type === "true-false" || q.type === "multiple") {
      body += `<div class="choices">${(q.answers || []).map((a, j) =>
        `<div>${q.type === "multiple" ? "☐" : String.fromCharCode(65 + j) + "."} ${esc(a)}</div>`
      ).join("")}</div>`;
    } else if (q.type === "fill-blank") {
      body += `<div class="answer">${esc(q.template || "").replace(/\\{\\{blank\\}\\}/g,"________________")}</div>`;
    } else if (q.type === "order" || q.type === "drag-drop") {
      body += `<div class="choices">${(q.items || []).map(a => `<div>___ ${esc(a)}</div>`).join("")}</div>`;
    } else {
      body += `<div class="line"></div><div class="line"></div>`;
    }

    return `<section class="print-q"><h3>${i + 1}. ${esc(q.question)}</h3>${body}</section>`;
  }

  function subjectLabel(subject) {
    if (subject === "science") return "Science";
    if (subject === "english") return "English";
    return "Maths";
  }

  function supportHeading(meta) {
    if (meta.subject === "science") return "Quick Read";
    if (meta.subject === "english" && meta.skill === "reading-comprehension") return "Reading Strategy";
    if (meta.subject === "english" && meta.skill === "vocabulary-word-meaning") return "Vocabulary Preview";
    if (meta.subject === "english") return "Language Quick Review";
    return "Quick Review";
  }

  function buildPrintableSheet() {
    const meta = window.skillrDailyDrillMeta || {};
    const support = window.skillrDailySupportActive || {};
    const questions = window.skillrActiveQuestions || window.quizQuestions || [];
    const passage = window.skillrEnglishPassageActive || questions[0]?.passage || null;

    const old = document.getElementById("dailyPrintableWorksheet");
    if (old) old.remove();

    const ideas = (meta.subject === "science" ? support.facts : support.bullets) || [];
    let kw = support.keywords || [];
    if (meta.subject === "english" && meta.skill === "vocabulary-word-meaning" && Array.isArray(window.skillrEnglishTodayWords)) {
      kw = window.skillrEnglishTodayWords;
    }

    const supportBlock = (support.quick || ideas.length || kw.length) ? `
      <section class="print-review">
        <h2>${esc(supportHeading(meta))}</h2>
        ${support.quick ? `<p>${esc(support.quick)}</p>` : ""}
        ${support.formula ? `<p><strong>Formula / rule:</strong> ${esc(support.formula)}</p>` : ""}
        ${support.example ? `<p><strong>Worked example:</strong> ${esc(String(support.example).replace(/^Example:\\s*/,""))}</p>` : ""}
        ${ideas.length ? `<ul>${ideas.slice(0, 6).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${kw.length ? `<p class="print-keywords"><strong>Key words:</strong> ${kw.slice(0, 8).map(x => `<span>${esc(x[0])}</span>`).join(" • ")}</p>` : ""}
        ${support.trap ? `<p><strong>Common trap:</strong> ${esc(support.trap)}</p>` : ""}
      </section>` : "";

    const passageBlock = passage ? `
      <section class="print-passage">
        <p class="print-small-label">READING PASSAGE</p>
        <h2>${esc(passage.title)}</h2>
        <p>${esc(passage.text)}</p>
      </section>` : "";

    const sheet = document.createElement("div");
    sheet.id = "dailyPrintableWorksheet";
    sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = `
      <div class="print-page">
        <header class="print-header">
          <h1>${esc(meta.title || "Daily Drill")}</h1>
          <p>${esc(meta.yearLabel || "")} ${subjectLabel(meta.subject)} • Daily Practice • ${questions.length} questions</p>
          <div class="print-name"><span>Name:</span><span>Date:</span></div>
        </header>
        ${supportBlock}
        ${passageBlock}
        <section class="print-questions">${questions.map(questionHtml).join("")}</section>
        <p class="quiz-print-tip"><strong>Teacher Tip:</strong> <em>Printouts auto-fit to 1 page so students can use the blank back side as working paper. Project the Quick Review above on your board for explicit teaching!</em> This is most true for maths and other short tasks, with rare exceptions in English where comprehension passages can be longer.</p>
        <footer class="print-footer"><span>SkillrHub • ${esc(meta.yearLabel || "")} Daily Practice</span><span>Score: ____ / ${questions.length}</span></footer>
      </div>`;

    document.body.appendChild(sheet);
    return sheet;
  }

  function ensurePrintStyles() {
    if (document.getElementById("dailyWorksheetPrintStyles")) return;
    const style = document.createElement("style");
    style.id = "dailyWorksheetPrintStyles";
    style.textContent = `
      #dailyPrintableWorksheet { display:none; }

      @media print {
        @page { size:A4; margin:12mm; }
        body > *:not(#dailyPrintableWorksheet) { display:none !important; }
        #dailyPrintableWorksheet {
          display:block !important;
          position:static !important;
          width:auto !important;
          height:auto !important;
          margin:0 !important;
          padding:0 !important;
          color:#111 !important;
          background:#fff !important;
          font-family:Arial, Helvetica, sans-serif !important;
          font-size:10.5pt !important;
          line-height:1.35 !important;
        }
        #dailyPrintableWorksheet * { box-sizing:border-box; }
        .print-page { width:100%; }
        .print-header { border-bottom:2px solid #111; padding-bottom:8px; margin-bottom:10px; }
        .print-header h1 { margin:0 0 3px; font-size:19pt; line-height:1.15; }
        .print-header p { margin:0; color:#444; font-size:10pt; }
        .print-name { display:flex; gap:24px; margin-top:9px; }
        .print-name span { flex:1; border-bottom:1px solid #555; padding-bottom:3px; }
        .print-review, .print-passage { border:1px solid #aaa; border-radius:7px; padding:9px 11px; margin:9px 0 11px; break-inside:avoid; }
        .print-review h2, .print-passage h2 { margin:0 0 5px; font-size:12pt; }
        .print-review p, .print-passage p { margin:4px 0; }
        .print-review ul { margin:5px 0; padding-left:18px; }
        .print-keywords { font-size:9.5pt; }
        .print-small-label { font-size:8pt; letter-spacing:.08em; font-weight:700; color:#555; }
        .print-passage p:not(.print-small-label) { line-height:1.48; }
        .print-q { break-inside:avoid; border-top:1px solid #ddd; padding:8px 0; }
        .print-q h3 { margin:0 0 5px; font-size:10.5pt; font-weight:600; line-height:1.35; }
        .choices { display:grid; grid-template-columns:1fr 1fr; gap:3px 14px; padding-left:9px; }
        .visual { text-align:center; font-size:12pt; margin:4px; }
        .visual svg { display:block; width:100%; max-width:150mm; height:auto; max-height:30mm; margin:0 auto; }
        .line { height:17px; border-bottom:1px solid #aaa; margin-top:3px; }
        .answer { padding:4px 8px; }
        .print-footer { display:flex; justify-content:space-between; gap:12px; margin-top:10px; padding-top:6px; border-top:1px solid #bbb; font-size:8.5pt; color:#555; }
        .quiz-print-tip { margin:8px 0 0; font-size:0.95rem; line-height:1.5; color:#475467; }
      }
    `;
    document.head.appendChild(style);
  }

  function printSheet() {
    ensurePrintStyles();
    buildPrintableSheet();

    // Printing from the current document is more reliable than printing a newly opened blank tab.
    // The afterprint handler removes the temporary printable DOM afterwards.
    const cleanup = () => {
      document.getElementById("dailyPrintableWorksheet")?.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);

    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }

  function bind() {
    const b = document.getElementById("printWorksheetButton");
    if (b) b.addEventListener("click", printSheet);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
