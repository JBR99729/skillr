"use strict";

(() => {
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
  if (!unit || !Array.isArray(unit.questions) || ![9, 10].includes(unit.questions.length)) return;

  const root = document.getElementById("worksheetRoot");
  if (!root) return;
  const questions = unit.questions;
  const warmUp = questions.filter((question) => question.tier === "warm-up");
  const core = questions.filter((question) => question.tier === "core");
  const challenge = questions.filter((question) => question.tier === "challenge");
  const studentQuestions = [...warmUp, ...core, ...challenge];
  const subjectLabel = unit.subject || (subject === "science" ? "Science" : subject === "english" ? "English" : "Maths");
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  document.title = `${code} ${unit.title} Worksheet | SkillrHub`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `${code} ${subjectLabel} practice sheet with 3 warm-up, 4 core and 2 challenge questions, plus a complete answer key.`;
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
    const lineCount = question.tier === "challenge" ? 4 : 2;
    return `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
  }

  function renderQuestion(question, displayNumber) {
    return `<article class="worksheet-question ${esc(question.tier)}"><div class="question-line"><span class="question-number-text">${displayNumber}.</span><span class="enrichment-label">${esc(question.tierLabel)}</span><p class="question-prompt">${esc(question.question)}</p></div>${question.visual ? `<div class="question-visual">${esc(question.visual)}</div>` : ""}${responseHtml(question)}</article>`;
  }

  function paperHtml() {
    const sections = [["Tier 1: Warm-Up", warmUp, 1], ["Tier 2: Core Practice", core, 4], ["Tier 3: Extension / Challenge", challenge, 8]];
    return `<section class="worksheet-paper worksheet-core-paper"><div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${esc(code)} — ${esc(unit.title)}</h2><p class="worksheet-sheet-label">Practice Sheet</p></div><p>Name: ____________________ &nbsp;&nbsp; Date: ____________</p></div><p class="worksheet-sheet-note">Try the warm-up, then the core practice. Finish with the challenge.</p>${sections.map(([heading, list, start]) => `<section class="core-grid"><h3>${heading}</h3>${list.map((question, index) => renderQuestion(question, start + index)).join("")}</section>`).join("")}<footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • ${esc(subjectLabel)}</span><span>skillrhub.com</span></footer></section>`;
  }

  function answerKeyHtml() {
    return `<section class="worksheet-paper worksheet-extension-paper answer-key"><div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${esc(code)} — Answer Key</h2><p class="worksheet-sheet-label">Teacher copy</p></div></div><section class="core-grid">${studentQuestions.map((question, index) => `<article class="worksheet-question"><p><strong>${index + 1}. ${esc(question.answer)}</strong></p><p><strong>Summary:</strong> ${esc(question.summary)}</p><p><strong>Hint:</strong> ${esc(question.hint)}</p></article>`).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • ${esc(subjectLabel)}</span><span>skillrhub.com</span></footer></section>`;
  }

  root.innerHTML = `${paperHtml()}${answerKeyHtml()}`;

  function ensureButtons() {
    const firstButton = document.getElementById("previewPdfButton") || document.getElementById("downloadPdfButton");
    if (!firstButton) return {};
    firstButton.id = "previewStudentPdfButton";
    firstButton.textContent = "Preview practice sheet";
    let answerButton = document.getElementById("previewAnswerPdfButton");
    if (!answerButton) {
      answerButton = document.createElement("button");
      answerButton.className = firstButton.className || "primary";
      answerButton.id = "previewAnswerPdfButton";
      answerButton.type = "button";
      answerButton.textContent = "Preview answer key";
      firstButton.insertAdjacentElement("afterend", answerButton);
    }
    document.querySelectorAll(".worksheet-meta span").forEach((span) => {
      if (/10 questions|8 core|2 enrichment|1 page/i.test(span.textContent || "")) span.remove();
    });
    const meta = document.querySelector(".worksheet-meta");
    if (meta && !meta.dataset.skillrSplitWorksheet) {
      meta.insertAdjacentHTML("afterbegin", "<span>9 questions</span><span>3 Warm-Up • 4 Core • 2 Challenge</span><span>Complete answer key</span><span>US Letter portrait</span>");
      meta.dataset.skillrSplitWorksheet = "true";
    }
    document.querySelectorAll(".worksheet-print-tip").forEach((tip) => {
      tip.textContent = "Print the practice sheet for students. Keep the answer key as the teacher copy.";
    });
    return { studentButton: firstButton, answerButton };
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
    const promptWidth = width - 8;
    const promptLines = wrap(doc, question.question, promptWidth);
    let height = Math.max(8, promptLines.length * 4 + 4);
    if (question.visual) { doc.setFont("courier", "bold"); doc.setFontSize(8.9); height += wrap(doc, question.visual, width - 8).length * 3.7 + 1; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.1);
    if (question.type === "single") height += packOptionRows(doc, question.answers, width - 8).length * 4.5 + 2;
    else if (question.type === "fill-blank") height += 5.8;
    else if (question.type === "match") height += Math.max(question.matchLeft?.length || 0, question.matchRight?.length || 0) * 4.1 + 5;
    else height += (question.tier === "challenge" ? 4 : 2) * 5.2 + 2;
    return Math.max(question.tier === "challenge" ? 27 : 17, height + 1.5);
  }

  function paginate(doc, list, width, availableHeight) {
    const pages = [[]];
    let used = 0;
    const gap = 2.4;
    list.forEach((question, index) => {
      const height = measureQuestion(doc, question, width);
      const required = (pages.at(-1).length ? gap : 0) + height;
      if (pages.at(-1).length && used + required > availableHeight) { pages.push([]); used = 0; }
      pages.at(-1).push({ question, number: index + 1, height });
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

  function drawHeader(doc, pageW, pageNumber, pageCount, mode) {
    const m = 10;
    doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(36, 87, 214); doc.text("SkillrHub F-10", m, 11);
    doc.setDrawColor(36, 87, 214); doc.setLineWidth(.7); doc.line(m, 13.5, m + 55, 13.5);
    doc.setFontSize(11); doc.setTextColor(23, 57, 104); doc.text(`${code} • ${unit.title}`, m, 20);
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.4); doc.setTextColor(32, 48, 71);
    doc.text(mode === "answers" ? "Teacher Answer Key" : "Student Practice Sheet • 3 Warm-Up • 4 Core • 2 Challenge", m, 25);
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
    doc.text(mode === "answers" ? "Teacher answer key" : "Student practice sheet", pageW / 2, y + 1.1, { align: "center" });
    doc.text(`Page ${pageNumber} of ${pageCount}`, pageW - m, y + 1.1, { align: "right" });
  }

  function drawQuestion(doc, item, x, y, width) {
    const { question, number, height } = item;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.1); doc.setTextColor(32, 48, 71); doc.text(`${number}.`, x, y + 4.1);
    let promptX = x + 8;
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
      const count = question.tier === "challenge" ? 4 : 2; doc.setDrawColor(93, 108, 128);
      for (let index = 0; index < count; index++) { const lineY = cursor + index * 5.2; if (lineY < y + height - 1) doc.line(x + 8, lineY, x + width - 4, lineY); }
    }
    doc.setDrawColor(219, 228, 239); doc.setLineWidth(.2); doc.line(x, y + height, x + width, y + height);
  }

  async function previewPdf(mode) {
    if (!window.jspdf?.jsPDF) return;
    const activeButton = mode === "answers" ? buttons.answerButton : buttons.studentButton;
    const original = activeButton?.textContent;
    if (activeButton) { activeButton.disabled = true; activeButton.textContent = "Preparing preview..."; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight(), m = 10, width = pageW - m * 2;
      const list = studentQuestions;
      const pages = paginate(doc, list, width, pageH - 54);
      pages.forEach((items, pageIndex) => {
        if (pageIndex > 0) doc.addPage("letter", "portrait");
        drawWatermark(doc, pageW, pageH);
        doc.setDrawColor(36, 87, 214); doc.setLineWidth(.55); doc.rect(5, 5, pageW - 10, pageH - 10);
        let y = drawHeader(doc, pageW, pageIndex + 1, pages.length, mode);
        if (mode === "answers") {
          items.forEach((item) => {
            const answerLines = wrap(doc, `${item.number}. ${item.question.answer}\nSummary: ${item.question.summary}\nHint: ${item.question.hint}`, width - 8);
            doc.setFont("helvetica", "normal"); doc.setFontSize(9.2); doc.setTextColor(32, 48, 71); doc.text(answerLines, m + 4, y + 4);
            y += Math.max(18, answerLines.length * 4 + 5);
          });
        } else {
          items.forEach((item) => { drawQuestion(doc, item, m, y, width); y += item.height + 2.4; });
        }
        drawFooter(doc, pageW, pageH, pageIndex + 1, pages.length, mode);
      });
      const blob = doc.output("blob"), url = URL.createObjectURL(blob), link = document.createElement("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener"; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (activeButton) { activeButton.disabled = false; activeButton.textContent = original || (mode === "answers" ? "Preview answer key" : "Preview practice sheet"); }
    }
  }

  const buttons = ensureButtons();
  buttons.studentButton?.addEventListener("click", () => previewPdf("student"));
  buttons.answerButton?.addEventListener("click", () => previewPdf("answers"));
})();
