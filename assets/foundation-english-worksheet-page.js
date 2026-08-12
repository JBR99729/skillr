(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/grade-k\/english\/(ac9ef[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  const loadScript = (src) => new Promise((resolve, reject) => {
    if ([...document.scripts].some((script) => script.src.includes(src.split("?")[0]))) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));

  function ensureCss() {
    if ([...document.styleSheets].some((sheet) => String(sheet.href || "").includes("foundation-authored-worksheet.css"))) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/quiz/assets/foundation-authored-worksheet.css?v=2";
    document.head.appendChild(link);
  }

  function responseHtml(question) {
    if (question.type === "single") {
      return `<div class="worksheet-options">${(question.answers || []).map((answer, index) => `<span><strong>[${String.fromCharCode(65 + index)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    }
    if (question.type === "fill-blank") {
      return `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    }
    if (question.type === "match") {
      return `<div class="match-grid"><div>${(question.matchLeft || []).map((item, index) => `<p><strong>${String.fromCharCode(65 + index)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item, index) => `<p><strong>${index + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    }
    const lines = question.enrichment ? 4 : 2;
    return `<div class="response-lines">${Array.from({length: lines}, () => "<span></span>").join("")}</div>`;
  }

  function renderQuestion(question, index) {
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${index + 1}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${question.visual ? `<div class="question-visual">${esc(question.visual)}</div>` : ""}${responseHtml(question)}</article>`;
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function measureQuestion(doc, question, width) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.1);
    const promptWidth = width - 8 - (question.enrichment ? 25 : 0);
    const promptLines = wrap(doc, question.question, promptWidth);
    let height = Math.max(8, promptLines.length * 4 + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.1);
    if (question.visual) height += wrap(doc, question.visual, width - 8).length * 3.7 + 1;
    if (question.type === "single") height += Math.ceil((question.answers || []).length / 2) * 4.7 + 2;
    else if (question.type === "fill-blank") height += 6;
    else if (question.type === "match") height += Math.max(question.matchLeft?.length || 0, question.matchRight?.length || 0) * 4.2 + 6;
    else height += (question.enrichment ? 4 : 2) * 5.2 + 2;
    return Math.max(question.enrichment ? 28 : 18, height + 2);
  }

  function paginate(doc, questions, width, availableHeight) {
    const pages = [[]];
    let used = 0;
    const gap = 2.4;
    questions.forEach((question, index) => {
      const height = measureQuestion(doc, question, width);
      const required = (pages.at(-1).length ? gap : 0) + height;
      if (pages.at(-1).length && used + required > availableHeight) {
        pages.push([]);
        used = 0;
      }
      pages.at(-1).push({ question, number: index + 1, height });
      used += (pages.at(-1).length > 1 ? gap : 0) + height;
    });
    return pages;
  }

  function drawHeader(doc, pageW, pageNumber, pageCount, unit) {
    const m = 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", m, 11);
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(.7);
    doc.line(m, 13.5, m + 55, 13.5);
    doc.setFontSize(11);
    doc.setTextColor(23, 57, 104);
    doc.text(`${code} • ${unit.title} Worksheet`, m, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(36, 87, 214);
    doc.text(`Page ${pageNumber} of ${pageCount} • skillrhub.com`, pageW - m, 11, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ______________________________", m, 29.5);
    doc.text("Date: ______________", pageW - m, 29.5, { align: "right" });
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(.4);
    doc.line(m, 32.5, pageW - m, 32.5);
    return 36;
  }

  function drawFooter(doc, pageW, pageH, pageNumber, pageCount) {
    const m = 10;
    const y = pageH - 7;
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(.35);
    doc.line(m, pageH - 13, pageW - m, pageH - 13);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", m, y - 2.6);
    doc.text("skillrhub.com", pageW - m, y - 2.6, { align: "right" });
    if (pageCount > 1) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.1);
      doc.setTextColor(23, 57, 104);
      doc.text("Printing tip: choose double-sided (duplex) printing to use one sheet per student.", pageW / 2, y + 1.1, { align: "center" });
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.1);
    doc.setTextColor(23, 57, 104);
    doc.text(`Page ${pageNumber} of ${pageCount}`, pageW - m, y + 1.1, { align: "right" });
  }

  function drawQuestion(doc, item, x, y, width) {
    const { question, number, height } = item;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.1);
    doc.setTextColor(32, 48, 71);
    doc.text(`${number}.`, x, y + 4.1);
    let promptX = x + 8;
    if (question.enrichment) {
      doc.setFontSize(7);
      doc.setTextColor(36, 87, 214);
      doc.text("ENRICHMENT", promptX, y + 4.1);
      promptX += 25;
      doc.setFontSize(10.1);
      doc.setTextColor(32, 48, 71);
    }
    const promptLines = wrap(doc, question.question, x + width - promptX);
    doc.text(promptLines, promptX, y + 4.1);
    let cursor = y + 4.1 + promptLines.length * 4 + 1;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.1);
    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(8.9);
      const lines = wrap(doc, question.visual, width - 8);
      doc.text(lines, x + 8, cursor);
      cursor += lines.length * 3.7 + 1;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.1);
    }
    if (question.type === "single") {
      let ox = x + 8;
      let oy = cursor;
      (question.answers || []).forEach((answer, index) => {
        const label = `[${String.fromCharCode(65 + index)}] ${answer}`;
        if (ox + doc.getTextWidth(label) > x + width - 4) { ox = x + 8; oy += 4.7; }
        doc.text(label, ox, oy);
        ox += doc.getTextWidth(label) + 8;
      });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 8, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(8.8);
      for (let i = 0; i < count; i++) {
        doc.text(left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "", x + 8, cursor + i * 4.1);
        doc.text(right[i] !== undefined ? `${i + 1}. ${right[i]}` : "", x + width * .57, cursor + i * 4.1);
      }
      const ly = cursor + count * 4.1 + 1;
      doc.setDrawColor(93, 108, 128);
      doc.line(x + 8, ly, x + width - 4, ly);
    } else {
      const count = question.enrichment ? 4 : 2;
      doc.setDrawColor(93, 108, 128);
      for (let i = 0; i < count; i++) {
        const ly = cursor + i * 5.2;
        if (ly < y + height - 1) doc.line(x + 8, ly, x + width - 4, ly);
      }
    }
    doc.setDrawColor(219, 228, 239);
    doc.setLineWidth(.2);
    doc.line(x, y + height, x + width, y + height);
  }

  async function previewPdf(unit) {
    if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const button = document.getElementById("previewPdfButton");
    const original = button?.textContent;
    if (button) { button.disabled = true; button.textContent = "Preparing preview..."; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const m = 10;
      const width = pageW - m * 2;
      const pages = paginate(doc, unit.questions, width, pageH - 52);
      pages.forEach((items, pi) => {
        if (pi > 0) doc.addPage("letter", "portrait");
        doc.setDrawColor(36, 87, 214);
        doc.setLineWidth(.55);
        doc.rect(5, 5, pageW - 10, pageH - 10);
        let y = drawHeader(doc, pageW, pi + 1, pages.length, unit);
        items.forEach((item) => { drawQuestion(doc, item, m, y, width); y += item.height + 2.4; });
        drawFooter(doc, pageW, pageH, pi + 1, pages.length);
      });
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (button) { button.disabled = false; button.textContent = original || "Preview PDF worksheet"; }
    }
  }

  async function init() {
    try {
      if (!window.SkillrFoundationEnglishData?.[code]) await loadScript("/assets/foundation-english-data.js?v=1");
      const lesson = window.SkillrFoundationEnglishData?.[code];
      const unit = window.SkillrFoundationEnglishWorksheetData?.[code];
      if (!lesson || !unit) return;
      ensureCss();
      document.title = `${code} ${unit.title} Worksheet | SkillrHub`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = `${code} Foundation English worksheet with 8 core and 2 enrichment questions authored from the ${unit.title} topic lesson.`;
      document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/foundation/curriculum/english/">Foundation English</a><a href="/foundation/english/${lesson.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Foundation English • Student Worksheet</small></div><p class="eyebrow">${code} • Foundation English</p><h1>${esc(unit.title)} Worksheet</h1><div class="worksheet-meta"><span>10 questions</span><span>8 core</span><span>2 enrichment</span><span>US Letter portrait • 1 page when possible</span></div><div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview PDF worksheet</button><a href="/foundation/english/${lesson.slug}/">Back to topic</a><a href="/quiz/grade-k/english/${code.toLowerCase()}/practice/">Open practice</a></div><div class="worksheet-print-tip">Printing tip: if this worksheet uses 2 pages, choose double-sided (duplex) printing to use one sheet per student.</div></header><main id="worksheetRoot"></main></div>`;
      const core = unit.questions.filter((question) => !question.enrichment);
      const enrichment = unit.questions.filter((question) => question.enrichment);
      document.getElementById("worksheetRoot").innerHTML = `<section class="worksheet-paper"><div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${code} — ${esc(unit.title)}</h2></div><p>Name: ____________________ &nbsp;&nbsp; Date: ____________</p></div><section class="core-grid">${core.map((question, index) => renderQuestion(question, index)).join("")}</section><div class="enrichment-heading">Enrichment — complete Questions 9–10 after Questions 1–8.</div><section class="enrichment-grid">${enrichment.map((question, index) => renderQuestion(question, index + core.length)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Foundation English</span><span>skillrhub.com</span></footer></section>`;
      document.getElementById("previewPdfButton")?.addEventListener("click", () => previewPdf(unit));
    } catch (error) {
      console.error("Skillr Foundation English worksheet setup failed:", error);
    }
  }

  init();
})();
