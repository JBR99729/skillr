(() => {
  "use strict";

  if (window.__skillrYear2MathsWorksheetLoaded) return;
  window.__skillrYear2MathsWorksheetLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-2\/math\/(ac9m2[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  function loadScript(src) {
    return new Promise((resolve, reject) => {
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
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function loadData() {
    if (!window.SkillrYear2MathsData?.[code]) await loadScript("/assets/year2-maths-data.js?v=3");
    if (!window.SkillrYear2MathsData?.[code]) await loadScript("/assets/year2-maths-data-extra.js?v=2");
  }

  function ensureCss() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("foundation-authored-worksheet.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/quiz/assets/foundation-authored-worksheet.css?v=3";
      document.head.appendChild(link);
    }
    if (document.getElementById("skillr-year2-worksheet-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-worksheet-css";
    style.textContent = `
      .worksheet-shell{max-width:1040px;margin:0 auto;padding:18px}.worksheet-nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.worksheet-nav a{color:#2457d6;font-weight:800;text-decoration:none}.worksheet-hero{border:1px solid #d8e2ef;border-radius:18px;background:#fff;padding:20px;box-shadow:0 8px 24px rgba(28,55,91,.08)}.worksheet-hero h1{font-size:clamp(1.45rem,3vw,2rem);margin:.25rem 0}.worksheet-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.worksheet-meta span{border:1px solid #d7e3fb;background:#f7faff;border-radius:999px;padding:6px 9px;font-size:.82rem;font-weight:800}.worksheet-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.worksheet-actions a,.worksheet-actions button{border:0;border-radius:12px;padding:10px 14px;font-weight:900;text-decoration:none;cursor:pointer}.worksheet-actions .primary{background:#2457d6;color:#fff}.worksheet-actions .secondary{background:#173968;color:#fff}.worksheet-actions a{background:#edf2f7;color:#173968}.worksheet-print-tip{margin-top:10px;color:#5d6c80;font-size:.9rem}.brandbar{display:flex;justify-content:space-between;gap:12px;align-items:center}.brandmark{font-weight:900;color:#2457d6}.brandmark span{color:#173968}.worksheet-paper{position:relative;overflow:hidden}.worksheet-paper+.worksheet-paper{margin-top:18px}.worksheet-extension{border-style:dashed!important}.worksheet-question .question-prompt{margin:0}.worksheet-options{gap:10px}.fill-template{font-weight:800;color:#173968}.blank-line{display:inline-block;min-width:58px;border-bottom:2px solid #5d6c80}.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.match-grid p{margin:3px 0}.response-lines span{display:block;height:17px;border-bottom:1px solid #93a4ba}.watermark-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none;z-index:0}.watermark-grid span{display:grid;place-items:center;transform:rotate(-24deg);font-weight:900;color:rgba(36,87,214,.045)}.worksheet-paper>*:not(.watermark-grid){position:relative;z-index:1}.extension-note{margin:6px 0 10px;color:#5d6c80;font-size:.9rem;font-weight:700}@media(max-width:650px){.worksheet-shell{padding:10px}.match-grid{grid-template-columns:1fr}.brandbar{display:block}.brandbar small{display:block;margin-top:4px}}@media print{body{background:#fff!important}.worksheet-extension{break-before:page;page-break-before:always}.worksheet-actions,.worksheet-nav,.worksheet-hero{display:none!important}.worksheet-paper+.worksheet-paper{margin-top:0}}
    `;
    document.head.appendChild(style);
  }

  function renderQuestion(question, number) {
    let response = "";
    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || []).map((answer, i) => `<span><strong>[${String.fromCharCode(65 + i)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    } else if (question.type === "fill-blank") {
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || []).map((item, i) => `<p><strong>${String.fromCharCode(65 + i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item, i) => `<p><strong>${i + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      response = `<div class="response-lines">${Array.from({ length: question.enrichment ? 5 : 2 }, () => "<span></span>").join("")}</div>`;
    }
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${number}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${response}</article>`;
  }

  function paperHeader(title, subtitle = "Name: ____________________ &nbsp;&nbsp; Date: ____________") {
    return `<div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${title}</h2></div><p>${subtitle}</p></div>`;
  }

  function watermark() {
    return `<div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div>`;
  }

  function renderScreen(unit, worksheet) {
    const questions = worksheet.questions;
    const core = questions.filter((question) => !question.enrichment);
    const enrichment = questions.filter((question) => question.enrichment);
    document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/year2/curriculum/maths/">Year 2 Maths</a><a href="/year2/maths/${unit.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Year 2 Maths • Student Worksheet</small></div><p class="eyebrow">${code} • Year 2 Maths</p><h1>${esc(worksheet.title)} Worksheet</h1><div class="worksheet-meta"><span>Core sheet: 8 questions</span><span>Optional enrichment: 2 questions</span><span>US Letter portrait</span><span>Preview before download</span></div><div class="worksheet-actions"><button class="primary" id="previewCorePdfButton" type="button">Preview core worksheet</button><button class="secondary" id="previewExtensionPdfButton" type="button">Preview enrichment extension</button><a href="/year2/maths/${unit.slug}/">Back to topic</a><a href="/quiz/year-2/math/${code.toLowerCase()}/practice/">Open practice</a></div><div class="worksheet-print-tip">Print the core worksheet for the class. Print the enrichment extension only for students who are ready.</div></header><main id="worksheetRoot"><section class="worksheet-paper worksheet-core">${watermark()}${paperHeader(`${code} — ${esc(worksheet.title)}`)}<section class="core-grid">${core.map((question, index) => renderQuestion(question, index + 1)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Year 2 Maths Core Worksheet</span><span>skillrhub.com</span></footer></section><section class="worksheet-paper worksheet-extension">${watermark()}${paperHeader(`${code} — Enrichment Extension`, "Optional challenge questions") }<p class="extension-note">Use this page for students who are ready to explain, justify and create using the same topic idea.</p><section class="enrichment-grid">${enrichment.map((question, index) => renderQuestion(question, core.length + index + 1)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Optional Enrichment Extension</span><span>skillrhub.com</span></footer></section></main></div>`;
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: .055 }));
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(36,87,214);
      [62, 122, 182, 242].forEach((y) => [55, 160].forEach((x) => doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 })));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawPdfQuestion(doc, question, number, x, y, width) {
    doc.setTextColor(32,48,71);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const prefix = `${number}. ${question.enrichment ? "ENRICHMENT — " : ""}${question.question}`;
    const lines = wrap(doc, prefix, width);
    doc.text(lines, x, y);
    let cursor = y + lines.length * 4.5 + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    if (question.type === "single") {
      const options = (question.answers || []).map((answer, i) => `[${String.fromCharCode(65+i)}] ${answer}`).join("   ");
      const optionLines = wrap(doc, options, width - 5);
      doc.text(optionLines, x + 5, cursor);
      cursor += optionLines.length * 4.3 + 2;
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      const templateLines = wrap(doc, String(question.template || "").replaceAll("{{blank}}", "__________"), width - 5);
      doc.text(templateLines, x + 5, cursor);
      cursor += templateLines.length * 4.4 + 2;
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      for (let i = 0; i < count; i++) {
        doc.text(left[i] !== undefined ? `${String.fromCharCode(65+i)}. ${left[i]}` : "", x + 5, cursor + i * 4.5);
        doc.text(right[i] !== undefined ? `${i+1}. ${right[i]}` : "", x + width * .56, cursor + i * 4.5);
      }
      cursor += count * 4.5 + 5;
      doc.line(x + 5, cursor, x + width - 5, cursor);
      cursor += 3;
    } else {
      const count = question.enrichment ? 5 : 2;
      doc.setDrawColor(120,136,157);
      for (let i = 0; i < count; i++) doc.line(x + 5, cursor + i * 5.5, x + width - 5, cursor + i * 5.5);
      cursor += count * 5.5 + 2;
    }
    doc.setDrawColor(219,228,239);
    doc.line(x, cursor, x + width, cursor);
    return cursor + 4;
  }

  async function previewPdf(worksheet, mode) {
    if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const isExtension = mode === "extension";
    const button = document.getElementById(isExtension ? "previewExtensionPdfButton" : "previewCorePdfButton");
    const original = button?.textContent;
    if (button) { button.disabled = true; button.textContent = "Preparing preview..."; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 10;
      const width = pageW - margin * 2;
      const all = worksheet.questions;
      const coreCount = all.filter((question) => !question.enrichment).length;
      const questions = isExtension ? all.filter((question) => question.enrichment) : all.filter((question) => !question.enrichment);
      const startNumber = isExtension ? coreCount + 1 : 1;
      let pageNumber = 1;
      let y = 34;

      const header = () => {
        drawWatermark(doc, pageW, pageH);
        doc.setDrawColor(36,87,214);
        doc.setLineWidth(.55);
        doc.rect(5,5,pageW-10,pageH-10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(17);
        doc.setTextColor(36,87,214);
        doc.text("SkillrHub F-10", margin, 12);
        doc.setFontSize(11);
        doc.setTextColor(23,57,104);
        doc.text(`${code} • ${worksheet.title} ${isExtension ? "Enrichment" : "Core"}`, margin, 21);
        doc.setFontSize(9);
        doc.text(isExtension ? "Optional extension" : "Name: ______________________________", margin, 29);
        doc.text(isExtension ? `Page ${pageNumber}` : "Date: ______________", pageW-margin, 29, { align: "right" });
        doc.setDrawColor(36,87,214);
        doc.line(margin, 31.5, pageW-margin, 31.5);
      };

      const footer = () => {
        doc.setDrawColor(36,87,214);
        doc.line(margin, pageH-13, pageW-margin, pageH-13);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(36,87,214);
        doc.text(`SkillrHub F-10 • Year 2 Maths ${isExtension ? "Enrichment" : "Core"}`, margin, pageH-8);
        doc.text("skillrhub.com", pageW-margin, pageH-8, { align: "right" });
      };

      header();
      questions.forEach((question, index) => {
        const estimate = 22 + (question.enrichment ? 18 : 0) + (question.type === "match" ? 8 : 0);
        if (y + estimate > pageH - 18) {
          footer();
          doc.addPage("letter", "portrait");
          pageNumber += 1;
          y = 34;
          header();
        }
        y = drawPdfQuestion(doc, question, startNumber + index, margin, y, width);
      });
      footer();

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (button) button.disabled = false;
      if (button) button.textContent = original || (isExtension ? "Preview enrichment extension" : "Preview core worksheet");
    }
  }

  async function init() {
    try {
      await loadData();
      ensureCss();
      const unit = window.SkillrYear2MathsData?.[code];
      const worksheet = window.SkillrYear2MathsWorksheetData?.[code];
      if (!unit || !worksheet || worksheet.questions?.length !== 10) return;
      document.title = `${code} ${worksheet.title} Worksheet | SkillrHub`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = `${code} Year 2 Maths worksheet with an 8-question core sheet and a separate optional 2-question enrichment extension.`;
      renderScreen(unit, worksheet);
      document.getElementById("previewCorePdfButton")?.addEventListener("click", () => previewPdf(worksheet, "core"));
      document.getElementById("previewExtensionPdfButton")?.addEventListener("click", () => previewPdf(worksheet, "extension"));
    } catch (error) {
      console.error("Skillr Year 2 Maths worksheet setup failed:", error);
    }
  }

  init();
})();