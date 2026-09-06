"use strict";

(() => {
  const renderLegacyAuthoredWorksheet = () => {
  const match = window.location.pathname.match(/\/(math|science|english)\/(ac9[a-z0-9]+)\/worksheet\/?/i);
  const subject = match ? match[1].toLowerCase() : null;
  const code = match ? match[2].toUpperCase() : null;
  if (!subject || !code) return;

  const sources = [
    window.SkillrFoundationWorksheetData,
    window.SkillrFoundationScienceWorksheetData,
    window.SkillrFoundationEnglishWorksheetData,
    window.SkillrYear1MathsWorksheetData,
    window.SkillrYear1ScienceWorksheetData,
    window.SkillrYear1EnglishWorksheetData
  ];
  const unit = sources.map((source) => source?.[code]).find(Boolean);
  if (!unit || !Array.isArray(unit.questions) || unit.questions.length !== 10) return;

  const root = document.getElementById("worksheetRoot");
  if (!root) return;
  const questions = unit.questions;
  const core = questions.filter((question) => !question.enrichment).slice(0, 8);
  const enrichment = questions.filter((question) => question.enrichment).slice(0, 2);
  const subjectLabel = unit.subject || (subject === "science" ? "Science" : subject === "english" ? "English" : "Maths");
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  document.title = `${code} ${unit.title} Worksheet | SkillrHub`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `${code} ${subjectLabel} worksheet with 8 core class questions and a separate optional 2-question enrichment extension.`;
  const heroTitle = document.getElementById("worksheetHeroTitle");
  if (heroTitle) heroTitle.textContent = `${unit.title} Worksheet`;
  const eyebrow = document.getElementById("worksheetEyebrow");
  if (eyebrow) eyebrow.textContent = `${code} • ${subjectLabel}`;
  const backToTopic = document.getElementById("backToTopic");
  if (backToTopic && unit.topicUrl) backToTopic.href = unit.topicUrl;
  const openPractice = document.getElementById("openPractice");
  if (openPractice) openPractice.href = window.location.pathname.replace(/worksheet\/?$/i, "practice/");

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
    const lineCount = question.enrichment ? 4 : 2;
    return `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
  }

  function renderQuestion(question, displayNumber) {
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${displayNumber}.</span>${question.enrichment ? '<span class="enrichment-label">Extension</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${question.visual ? `<div class="question-visual">${esc(question.visual)}</div>` : ""}${responseHtml(question)}</article>`;
  }

  const brandHtml = () => `<div class="worksheet-brand-lockup"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><p>${esc(code)} • ${esc(unit.title)}</p></div></div>`;

  function paperHtml(kind, list, startNumber) {
    const isExtension = kind === "extension";
    const heading = isExtension ? "Optional Enrichment Extension" : "Core Class Worksheet";
    const meta = isExtension ? "Print this page only for students who are ready for extension." : "Print this page for the whole class. Enrichment is on a separate optional sheet.";
    return `<section class="worksheet-paper ${isExtension ? "worksheet-extension-paper" : "worksheet-core-paper"}"><div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="worksheet-paper__head"><div>${brandHtml()}<h2>${esc(code)} — ${esc(unit.title)}</h2><p class="worksheet-sheet-label">${heading}</p></div><p>Name: ____________________ &nbsp;&nbsp; Date: ____________</p></div><p class="worksheet-sheet-note">${meta}</p><section class="${isExtension ? "enrichment-grid" : "core-grid"}">${list.map((question, index) => renderQuestion(question, startNumber + index)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • ${esc(subjectLabel)}</span><span>skillrhub.com</span></footer></section>`;
  }

  root.innerHTML = `${paperHtml("core", core, 1)}${paperHtml("extension", enrichment, 9)}`;

  function ensureButtons() {
    const firstButton = document.getElementById("previewPdfButton") || document.getElementById("downloadPdfButton");
    if (!firstButton) return {};
    firstButton.id = "previewCorePdfButton";
    firstButton.textContent = "Preview core worksheet";
    let extensionButton = document.getElementById("previewExtensionPdfButton");
    if (!extensionButton) {
      extensionButton = document.createElement("button");
      extensionButton.className = firstButton.className || "primary";
      extensionButton.id = "previewExtensionPdfButton";
      extensionButton.type = "button";
      extensionButton.textContent = "Preview enrichment extension";
      firstButton.insertAdjacentElement("afterend", extensionButton);
    }
    const meta = document.querySelector(".worksheet-meta");
    if (meta && !meta.dataset.skillrSplitWorksheet) {
      meta.innerHTML = "<span>Core sheet: 8 questions</span><span>Optional extension: 2 enrichment</span><span>US Letter portrait</span>";
      meta.dataset.skillrSplitWorksheet = "true";
    }
    document.querySelectorAll(".worksheet-print-tip").forEach((tip) => {
      tip.textContent = "Print the core worksheet for the class. Print the enrichment extension only for students who are ready.";
    });
    return { coreButton: firstButton, extensionButton };
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function packOptionRows(doc, answers, width) {
    const labels = (answers || []).map((value, index) => `[${String.fromCharCode(65 + index)}] ${value}`);
    const rows = [];
    let row = [];
    let used = 0;
    labels.forEach((label) => {
      const w = doc.getTextWidth(label) + 8;
      if (row.length && used + w > width) { rows.push(row); row = []; used = 0; }
      row.push(label); used += w;
    });
    if (row.length) rows.push(row);
    return rows;
  }

  function measureQuestion(doc, question, width) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.1);
    const promptWidth = width - 8 - (question.enrichment ? 22 : 0);
    const promptLines = wrap(doc, question.question, promptWidth);
    let height = Math.max(8, promptLines.length * 4 + 4);
    if (question.visual) { doc.setFont("courier", "bold"); doc.setFontSize(8.9); height += wrap(doc, question.visual, width - 8).length * 3.7 + 1; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.1);
    if (question.type === "single") height += packOptionRows(doc, question.answers, width - 8).length * 4.5 + 2;
    else if (question.type === "fill-blank") height += 5.8;
    else if (question.type === "match") height += Math.max(question.matchLeft?.length || 0, question.matchRight?.length || 0) * 4.1 + 5;
    else height += (question.enrichment ? 4 : 2) * 5.2 + 2;
    return Math.max(question.enrichment ? 27 : 17, height + 1.5);
  }

  function paginate(doc, list, width, availableHeight) {
    const pages = [[]];
    let used = 0;
    const gap = 2.4;
    list.forEach((question, index) => {
      const height = measureQuestion(doc, question, width);
      const required = (pages.at(-1).length ? gap : 0) + height;
      if (pages.at(-1).length && used + required > availableHeight) { pages.push([]); used = 0; }
      pages.at(-1).push({ question, number: question.enrichment ? index + 9 : index + 1, height });
      used += (pages.at(-1).length > 1 ? gap : 0) + height;
    });
    return pages;
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: .055 }));
      doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(36, 87, 214);
      [70, 135, 200, 255].forEach((y) => [55, 160].forEach((x) => doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 })));
      doc.restoreGraphicsState();
    } catch {}
  }

  let pdfLogoDataUrl = null;
  async function loadPdfLogo() {
    if (pdfLogoDataUrl) return pdfLogoDataUrl;
    try {
      const source = await fetch("/icons/skillrhub-mark.svg").then((response) => response.text());
      const image = new Image();
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 160;
      canvas.getContext("2d").drawImage(image, 0, 0, 160, 160);
      pdfLogoDataUrl = canvas.toDataURL("image/png");
    } catch {}
    return pdfLogoDataUrl;
  }

  function drawHeader(doc, pageW, pageNumber, pageCount, mode) {
    const m = 10;
    if (pdfLogoDataUrl) doc.addImage(pdfLogoDataUrl, "PNG", m, 7, 10, 10);
    doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(36, 87, 214); doc.text("SkillrHub F-10", m + 13, 11);
    doc.setDrawColor(36, 87, 214); doc.setLineWidth(.7); doc.line(m + 13, 13.5, m + 68, 13.5);
    doc.setFontSize(11); doc.setTextColor(23, 57, 104); doc.text(`${code} • ${unit.title}`, m, 20);
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.4); doc.setTextColor(32, 48, 71);
    doc.text(mode === "extension" ? "Optional Enrichment Extension" : "Core Class Worksheet", m, 25);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(36, 87, 214); doc.text(`Page ${pageNumber} of ${pageCount} • skillrhub.com`, pageW - m, 11, { align: "right" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(32, 48, 71); doc.text("Name: ______________________________", m, 31); doc.text("Date: ______________", pageW - m, 31, { align: "right" });
    doc.setDrawColor(36, 87, 214); doc.setLineWidth(.4); doc.line(m, 34, pageW - m, 34);
    return 38;
  }

  function drawFooter(doc, pageW, pageH, pageNumber, pageCount, mode) {
    const m = 10, y = pageH - 7;
    doc.setDrawColor(36, 87, 214); doc.setLineWidth(.35); doc.line(m, pageH - 13, pageW - m, pageH - 13);
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(36, 87, 214); doc.text("SkillrHub F-10", m, y - 2.6); doc.text("skillrhub.com", pageW - m, y - 2.6, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.1); doc.setTextColor(23, 57, 104);
    doc.text(mode === "extension" ? "Optional extension sheet" : "Core worksheet for whole-class printing", pageW / 2, y + 1.1, { align: "center" });
    doc.text(`Page ${pageNumber} of ${pageCount}`, pageW - m, y + 1.1, { align: "right" });
  }

  function drawQuestion(doc, item, x, y, width) {
    const { question, number, height } = item;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.1); doc.setTextColor(32, 48, 71); doc.text(`${number}.`, x, y + 4.1);
    let promptX = x + 8;
    if (question.enrichment) { doc.setFontSize(7); doc.setTextColor(36, 87, 214); doc.text("EXTENSION", promptX, y + 4.1); promptX += 22; doc.setFontSize(10.1); doc.setTextColor(32, 48, 71); }
    const promptLines = wrap(doc, question.question, x + width - promptX); doc.text(promptLines, promptX, y + 4.1);
    let cursor = y + 4.1 + promptLines.length * 4 + 1;
    if (question.visual) { doc.setFont("courier", "bold"); doc.setFontSize(8.9); const lines = wrap(doc, question.visual, width - 8); doc.text(lines, x + 8, cursor); cursor += lines.length * 3.7 + 1; }
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.1); doc.setTextColor(32, 48, 71);
    if (question.type === "single") {
      const rows = packOptionRows(doc, question.answers, width - 8);
      rows.forEach((row, rowIndex) => { let ox = x + 8; const oy = cursor + rowIndex * 4.5; row.forEach((label) => { doc.text(label, ox, oy); ox += doc.getTextWidth(label) + 8; }); });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 8, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [], right = question.matchRight || [], count = Math.max(left.length, right.length);
      doc.setFontSize(8.8);
      for (let index = 0; index < count; index++) { doc.text(left[index] !== undefined ? `${String.fromCharCode(65 + index)}. ${left[index]}` : "", x + 8, cursor + index * 4.1); doc.text(right[index] !== undefined ? `${index + 1}. ${right[index]}` : "", x + width * .57, cursor + index * 4.1); }
      const lineY = cursor + count * 4.1 + 1; doc.setDrawColor(93, 108, 128); doc.line(x + 8, lineY, x + width - 4, lineY);
    } else {
      const count = question.enrichment ? 4 : 2; doc.setDrawColor(93, 108, 128);
      for (let index = 0; index < count; index++) { const lineY = cursor + index * 5.2; if (lineY < y + height - 1) doc.line(x + 8, lineY, x + width - 4, lineY); }
    }
    doc.setDrawColor(219, 228, 239); doc.setLineWidth(.2); doc.line(x, y + height, x + width, y + height);
  }

  async function previewPdf(mode) {
    if (!window.jspdf?.jsPDF) return;
    const activeButton = mode === "extension" ? buttons.extensionButton : buttons.coreButton;
    const original = activeButton?.textContent;
    if (activeButton) { activeButton.disabled = true; activeButton.textContent = "Preparing preview..."; }
    try {
      await loadPdfLogo();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight(), m = 10, width = pageW - m * 2;
      const list = mode === "extension" ? enrichment : core;
      const pages = paginate(doc, list, width, pageH - 54);
      pages.forEach((items, pageIndex) => {
        if (pageIndex > 0) doc.addPage("letter", "portrait");
        drawWatermark(doc, pageW, pageH);
        doc.setDrawColor(36, 87, 214); doc.setLineWidth(.55); doc.rect(5, 5, pageW - 10, pageH - 10);
        let y = drawHeader(doc, pageW, pageIndex + 1, pages.length, mode);
        items.forEach((item) => { drawQuestion(doc, item, m, y, width); y += item.height + 2.4; });
        drawFooter(doc, pageW, pageH, pageIndex + 1, pages.length, mode);
      });
      const blob = doc.output("blob"), url = URL.createObjectURL(blob), link = document.createElement("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener"; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (activeButton) { activeButton.disabled = false; activeButton.textContent = original || (mode === "extension" ? "Preview enrichment extension" : "Preview core worksheet"); }
    }
  }

  const buttons = ensureButtons();
  buttons.coreButton?.addEventListener("click", () => previewPdf("core"));
  buttons.extensionButton?.addEventListener("click", () => previewPdf("extension"));
  };

  window.SkillrFoundationLegacyWorksheetRender = renderLegacyAuthoredWorksheet;
  renderLegacyAuthoredWorksheet();
})();
