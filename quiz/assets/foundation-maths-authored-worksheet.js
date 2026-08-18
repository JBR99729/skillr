"use strict";

(() => {
  function renderTopicPractice() {
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

  const isFoundationMathsSplit = subject === "math" && /^AC9MF/.test(code) && unit.questions.length === 9;
  const isFoundationEnglishSplit = subject === "english" && /^AC9EF/.test(code) && unit.questions.length === 9;
  if (!isFoundationMathsSplit) {
    if (isFoundationEnglishSplit) {
      // Foundation English uses the same two-sheet renderer with its own authored banks.
    } else {
    if (typeof window.SkillrFoundationLegacyWorksheetRender === "function") {
      window.SkillrFoundationLegacyWorksheetRender();
    } else if (!document.querySelector('script[data-skillr-legacy-authored-worksheet="true"]')) {
      const legacyScript = document.createElement("script");
      legacyScript.src = "/quiz/assets/foundation-legacy-authored-worksheet.js?v=20260814-topic-practice-split2";
      legacyScript.dataset.skillrLegacyAuthoredWorksheet = "true";
      document.head.appendChild(legacyScript);
    }
    return;
    }
  }

  const root = document.getElementById("worksheetRoot");
  if (!root) return;
  const questions = unit.questions;
  const studentQuestions = [
    ...questions.filter((question) => question.tier === "warm-up"),
    ...questions.filter((question) => question.tier === "core"),
    ...questions.filter((question) => question.tier === "challenge")
  ];
  const routeSheet = Number((window.location.pathname.match(/\/worksheet\/topic-practice-([12])\/?$/i) || [])[1]);
  const sheetNumber = routeSheet === 2 ? 2 : 1;
  const sheetTitle = `Topic Practice ${sheetNumber}`;
  const sheetQuestions = sheetNumber === 1 ? studentQuestions.slice(0, 5) : studentQuestions.slice(5, 9);
  unit.exportMeta = {
    curriculumCode: code,
    year: "Foundation",
    subject: subject === "english" ? "English" : "Maths",
    topicTitle: unit.title,
    publicBranding: "renderer-chrome-only",
    sheets: [
      { slug: "topic-practice-1", title: "Topic Practice 1", questionNumbers: [1, 2, 3, 4, 5] },
      { slug: "topic-practice-2", title: "Topic Practice 2", questionNumbers: [6, 7, 8, 9] }
    ]
  };
  const baseWorksheetPath = `/quiz/grade-k/${subject}/${code.toLowerCase()}/worksheet/`;
  const sheetPath = (number) => `${baseWorksheetPath}topic-practice-${number}/`;
  const questionNumber = (question) => studentQuestions.indexOf(question) + 1;
  const subjectLabel = unit.subject || (subject === "science" ? "Science" : subject === "english" ? "English" : "Maths");
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  document.title = `${code} ${unit.title} ${sheetTitle} | SkillrHub`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `${code} ${subjectLabel} ${sheetTitle}, one of two aligned printable sheets covering 9 questions with a sheet-specific answer key.`;
  const heroTitle = document.getElementById("worksheetHeroTitle");
  if (heroTitle) heroTitle.textContent = sheetTitle;
  const eyebrow = document.getElementById("worksheetEyebrow");
  if (eyebrow) eyebrow.textContent = `${code} • ${subjectLabel}`;
  const backToTopic = document.getElementById("backToTopic");
  if (backToTopic && unit.topicUrl) backToTopic.href = unit.topicUrl;
  const openPractice = document.getElementById("openPractice");
  if (openPractice) openPractice.href = `/quiz/grade-k/${subject}/${code.toLowerCase()}/practice/`;

  function responseHtml(question) {
    if (question.type === "single") {
      return `<div class="worksheet-options">${(question.answers || []).map((answer, index) => {
        const letter = String.fromCharCode(65 + index);
        const audio = question.audio_answers?.[index];
        return audio
          ? `<span><span class="worksheet-sr-only">Option ${letter}. ${esc(audio)}</span><strong aria-hidden="true">[${letter}]</strong> <span aria-hidden="true">${esc(answer)}</span></span>`
          : `<span><strong>[${letter}]</strong> ${esc(answer)}</span>`;
      }).join("")}</div>`;
    }
    if (question.type === "fill-blank") {
      return `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line" role="img" aria-label="blank"></span>')}</div>`;
    }
    if (question.type === "match") {
      return `<div class="match-grid"><div>${(question.matchLeft || []).map((item, index) => `<p><strong>${String.fromCharCode(65 + index)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item, index) => `<p><strong>${index + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    }
    const lineCount = question.tier === "challenge" ? 4 : 2;
    return `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
  }

  function renderQuestion(question, displayNumber) {
    return `<article class="worksheet-question ${esc(question.tier)}"><div class="question-line"><span class="question-number-text">${displayNumber}.</span><span class="enrichment-label">${esc(question.tierLabel)}</span><p class="question-prompt">${esc(question.question)}</p></div>${question.visual ? `<div class="question-visual" role="img" aria-label="${esc(question.visualAlt || question.visual)}"><span aria-hidden="true">${esc(question.visual)}</span></div>` : ""}${responseHtml(question)}</article>`;
  }

  const brandHtml = (label = `${code} • ${unit.title}`) => `<div class="worksheet-brand-lockup"><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><p>${esc(label)}</p></div></div>`;

  function paperHtml() {
    const tierHeadings = { "warm-up": "Tier 1: Warm-Up", core: "Tier 2: Core Practice", challenge: "Tier 3: Extension / Challenge" };
    const sections = ["warm-up", "core", "challenge"].map((tier) => [tierHeadings[tier], sheetQuestions.filter((question) => question.tier === tier)]).filter(([, list]) => list.length);
    return `<section class="worksheet-paper worksheet-core-paper"><div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="worksheet-paper__head"><div>${brandHtml()}<h2>${esc(code)} — ${esc(unit.title)}</h2><p class="worksheet-sheet-label">${sheetTitle}</p></div><p>Name: ____________________ &nbsp;&nbsp; Date: ____________</p></div><p class="worksheet-sheet-note">Complete this sheet, then use the other Topic Practice sheet to finish all 9 questions.</p>${sections.map(([heading, list]) => `<section class="core-grid"><h3>${heading}</h3>${list.map((question) => renderQuestion(question, questionNumber(question))).join("")}</section>`).join("")}<footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • ${esc(subjectLabel)}</span><span>${sheetTitle} • skillrhub.com</span></footer></section>`;
  }

  function answerKeyHtml() {
    return `<section class="worksheet-paper worksheet-extension-paper answer-key"><div class="worksheet-paper__head"><div>${brandHtml(`${code} • Answer Key`)}<h2>${esc(code)} — ${sheetTitle} Answer Key</h2><p class="worksheet-sheet-label">Teacher copy • this sheet only</p></div></div><section class="core-grid">${sheetQuestions.map((question) => `<article class="worksheet-question"><p><strong>${questionNumber(question)}. ${esc(question.answer)}</strong></p><p><strong>Summary:</strong> ${esc(question.summary)}</p><p><strong>Hint:</strong> ${esc(question.hint)}</p></article>`).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • ${esc(subjectLabel)}</span><span>${sheetTitle} • skillrhub.com</span></footer></section>`;
  }

  root.innerHTML = `${paperHtml()}${answerKeyHtml()}`;

  const hero = document.querySelector(".worksheet-hero");
  if (hero && !hero.querySelector(".worksheet-sheet-tabs")) {
    hero.insertAdjacentHTML("beforeend", `<nav class="worksheet-sheet-tabs" aria-label="Choose a topic practice sheet"><a class="worksheet-sheet-tab" href="${sheetPath(1)}"${sheetNumber === 1 ? ' aria-current="page"' : ""}>Topic Practice 1 <small>Questions 1–5</small></a><a class="worksheet-sheet-tab" href="${sheetPath(2)}"${sheetNumber === 2 ? ' aria-current="page"' : ""}>Topic Practice 2 <small>Questions 6–9</small></a></nav>`);
  }

  function ensureButtons() {
    const firstButton = document.getElementById("previewPdfButton") || document.getElementById("downloadPdfButton");
    if (!firstButton) return {};
    firstButton.id = "printWorksheetButton";
    firstButton.textContent = "Print worksheet + answer key";
    document.getElementById("previewAnswerPdfButton")?.remove();
    const meta = document.querySelector(".worksheet-meta");
    if (meta && !meta.dataset.skillrSplitWorksheet) {
      meta.innerHTML = `<span>${sheetQuestions.length} questions on this sheet</span><span>9 across Topic Practice 1 + 2</span><span>Sheet-only answer key</span><span>US Letter portrait</span>`;
      meta.dataset.skillrSplitWorksheet = "true";
    }
    document.querySelectorAll(".worksheet-print-tip").forEach((tip) => {
      tip.textContent = "Print one combined file: the student practice sheet first, followed by the teacher answer key.";
    });
    return firstButton;
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
      pages.at(-1).push({ question, number: questionNumber(question), height });
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
      canvas.width = 160; canvas.height = 160;
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
    doc.text(mode === "answers" ? `${sheetTitle} • Teacher Answer Key` : `${sheetTitle} • Student Practice Sheet`, m, 25);
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
    doc.text(mode === "answers" ? `${sheetTitle} teacher answer key` : `${sheetTitle} student sheet`, pageW / 2, y + 1.1, { align: "center" });
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

  async function printWorksheet() {
    if (!window.jspdf?.jsPDF) return;
    const original = printButton?.textContent;
    if (printButton) { printButton.disabled = true; printButton.textContent = "Preparing print file..."; }
    try {
      await loadPdfLogo();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight(), m = 10, width = pageW - m * 2;
      const list = sheetQuestions;
      const pages = paginate(doc, list, width, pageH - 54);
      ["student", "answers"].forEach((mode, modeIndex) => {
        pages.forEach((items, pageIndex) => {
          if (modeIndex > 0 || pageIndex > 0) doc.addPage("letter", "portrait");
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
      });
      const blob = doc.output("blob"), url = URL.createObjectURL(blob), link = document.createElement("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener"; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (printButton) { printButton.disabled = false; printButton.textContent = original || "Print worksheet + answer key"; }
    }
  }

  const printButton = ensureButtons();
  printButton?.addEventListener("click", printWorksheet);
  }

  window.SkillrFoundationTopicPracticeRender = renderTopicPractice;
  renderTopicPractice();
})();
