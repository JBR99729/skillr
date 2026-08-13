"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF - DIRECT PDF v16
   File path: /quiz/assets/worksheet-pdf.js

   IMPORTANT
   - Direct jsPDF drawing only. No html2canvas/html2pdf capture.
   - Exactly one US Letter page.
   - Creates a worksheet using the page's configured question count.
   - Future practice/exam pages can provide a dedicated worksheet bank.
   - Replaces the PDF button node during setup so stale listeners
     from older worksheet-pdf.js versions cannot also fire.
   ========================================================= */

(() => {
  const VERSION = "17";
  const JSPDF_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";
  const WORKSHEET_LIMIT = Math.max(
    1,
    Number(window.quizConfig?.worksheetQuestionLimit) || 10
  );
  const PAPER_FRIENDLY_TYPES = new Set([
    "single",
    "true-false",
    "multiple",
    "text",
    "self-check",
    "number",
    "fill-blank",
    "order",
    "drag-drop",
    "drag-image"
  ]);

  const BLUE = [36, 87, 214];
  const TEXT = [23, 32, 51];
  const MUTED = [102, 112, 133];
  const LINE = [216, 224, 234];
  const NOTE_FILL = [246, 248, 255];
  const NOTE_BORDER = [205, 217, 246];

  // Keep every minus/dash passed to jsPDF inside Helvetica's safe ASCII set.
  // The first two patterns also repair common UTF-8 mojibake forms of U+2212.
  const MOJIBAKE_MINUS = /\u00E2(?:\u02C6\u2019|\u0088\u0092)/g;
  const MINUS_OR_DASH = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;

  const $ = (selector, root = document) => root.querySelector(selector);

  function normaliseText(value) {
    return String(value ?? "")
      .replace(MOJIBAKE_MINUS, "-")
      .replace(MINUS_OR_DASH, "-")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2026/g, "...")
      .replace(/\u00A0/g, " ")
      .trim();
  }

  function getTitle() {
    return (
      $("#quizTitle, main h1, h1")?.textContent?.trim() ||
      document.title ||
      "Practice Worksheet"
    );
  }

  function getEyebrow() {
    return (
      $(".start-card .eyebrow, .eyebrow")?.textContent?.trim() ||
      "Foundation Mathematics"
    );
  }

  function getSkillCode() {
    const config = window.quizConfig || {};
    const configuredCode =
      config.skillCode ||
      config.curriculumCode ||
      config.code;

    if (configuredCode) {
      return normaliseText(configuredCode).toUpperCase();
    }

    const firstQuestion = getWorksheetQuestionBank()[0] || {};
    const questionCode =
      firstQuestion.curriculumCode ||
      firstQuestion.skillCode ||
      firstQuestion.code;

    if (questionCode) {
      return normaliseText(questionCode).toUpperCase();
    }

    const pageText = `${getEyebrow()} ${getTitle()}`;
    const curriculumMatch = pageText.match(/\bAC9[A-Z0-9]+\b/i);

    if (curriculumMatch) {
      return curriculumMatch[0].toUpperCase();
    }

    const dailyYear = window.SKILLR_DAILY_YEAR;
    const dailySubject = window.SKILLR_DAILY_SUBJECT;
    const dailySkill = window.SKILLR_DAILY_SKILL;

    if (dailyYear && dailySubject && dailySkill) {
      return normaliseText(
        `Y${dailyYear}-${dailySubject}-${dailySkill}`
      ).toUpperCase();
    }

    return "";
  }

  function getGlobalQuestionArray(name) {
    return Array.isArray(window[name]) ? window[name] : [];
  }

  function getWorksheetQuestionBank() {
    const explicitWorksheetBank = [
      ...getGlobalQuestionArray("skillrWorksheetQuestions"),
      ...getGlobalQuestionArray("quizWorksheetQuestions")
    ];

    if (explicitWorksheetBank.length) {
      return explicitWorksheetBank;
    }

    const practiceExamBanks = [
      ...getGlobalQuestionArray("skillrPracticeQuestions"),
      ...getGlobalQuestionArray("skillrExamQuestions"),
      ...getGlobalQuestionArray("quizPracticeQuestions"),
      ...getGlobalQuestionArray("quizExamQuestions")
    ];

    if (practiceExamBanks.length) {
      return practiceExamBanks;
    }

    const fullQuizBank = getGlobalQuestionArray("quizQuestions");

    if (fullQuizBank.length) {
      return fullQuizBank;
    }

    return getGlobalQuestionArray("skillrActiveQuestions");
  }

  function questionKey(question) {
    return normaliseText(
      question?.id ||
        `${question?.curriculumCode || ""}|${question?.question || ""}`
    );
  }

  function uniqueQuestions(questions) {
    const seen = new Set();

    return questions.filter((question) => {
      const key = questionKey(question);

      if (!key || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  function shuffleArray(items) {
    const copy = [...items];

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }

    return copy;
  }

  function isPaperFriendly(question) {
    if (
      !question ||
      question.printable === false ||
      question.worksheet === false ||
      question.excludeFromWorksheet === true
    ) {
      return false;
    }

    const type = question?.type || "single";

    if (!PAPER_FRIENDLY_TYPES.has(type)) {
      return false;
    }

    if (type === "single" || type === "true-false" || type === "multiple") {
      return (question.answers || []).map(optionText).filter(Boolean).length >= 2;
    }

    if (type === "fill-blank") {
      return Boolean(question.template || question.question);
    }

    if (type === "order" || type === "drag-drop") {
      return (question.items || []).map(itemText).filter(Boolean).length >= 2;
    }

    if (type === "drag-image") {
      return (
        (question.items || []).length > 0 &&
        (question.categories || []).length > 0
      );
    }

    return true;
  }

  function getPrintableQuestions() {
    const practiceLimit = Math.max(
      0,
      Number(window.quizConfig?.worksheetPracticeSelection) || 0
    );
    const examLimit = Math.max(
      0,
      Number(window.quizConfig?.worksheetExamSelection) || 0
    );
    const practiceBank = uniqueQuestions([
      ...getGlobalQuestionArray("skillrPracticeQuestions"),
      ...getGlobalQuestionArray("quizPracticeQuestions")
    ]).filter(isPaperFriendly);
    const examBank = uniqueQuestions([
      ...getGlobalQuestionArray("skillrExamQuestions"),
      ...getGlobalQuestionArray("quizExamQuestions")
    ]).filter(isPaperFriendly);

    if (
      practiceLimit + examLimit === WORKSHEET_LIMIT &&
      practiceBank.length >= practiceLimit &&
      examBank.length >= examLimit
    ) {
      return [
        ...shuffleArray(practiceBank).slice(0, practiceLimit),
        ...shuffleArray(examBank).slice(0, examLimit)
      ];
    }

    const printablePool = uniqueQuestions(getWorksheetQuestionBank())
      .filter(isPaperFriendly);

    return shuffleArray(printablePool).slice(0, WORKSHEET_LIMIT);
  }

  function setText(doc, rgb) {
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  }

  function setDraw(doc, rgb) {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  }

  function setFill(doc, rgb) {
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  }

  function wrap(doc, text, width) {
    const value = normaliseText(text);
    if (!value) return [];
    const lines = doc.splitTextToSize(value, width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function optionText(value) {
    if (typeof value === "string" || typeof value === "number") {
      return normaliseText(value);
    }
    if (value && typeof value === "object") {
      return normaliseText(value.label || value.alt || value.id || "");
    }
    return "";
  }

  function itemText(value) {
    return optionText(value);
  }

  function loadJsPdf() {
    // jsPDF from html2pdf bundles is still capable of direct drawing.
    if (window.jspdf?.jsPDF) {
      return Promise.resolve(window.jspdf.jsPDF);
    }

    return new Promise((resolve, reject) => {
      const previous = document.querySelector(
        'script[data-skillr-direct-jspdf="true"]'
      );

      const finish = () => {
        if (window.jspdf?.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error("jsPDF did not initialise."));
        }
      };

      if (previous) {
        previous.addEventListener("load", finish, { once: true });
        previous.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = JSPDF_URL;
      script.async = true;
      script.dataset.skillrDirectJspdf = "true";
      script.addEventListener("load", finish, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function imageToDataUrl(url) {
    if (!url) return null;
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) return null;
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  async function preloadImages(questions) {
    const urls = [...new Set(questions.map((q) => q.image).filter(Boolean))];
    const map = new Map();
    await Promise.all(
      urls.map(async (url) => {
        map.set(url, await imageToDataUrl(url));
      })
    );
    return map;
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) {
        doc.setGState(new doc.GState({ opacity: 0.045 }));
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(44);
      setText(doc, BLUE);
      doc.text("SkillrHub.com", pageW / 2, pageH / 2 + 8, {
        align: "center",
        angle: 32
      });
      doc.restoreGraphicsState();
    } catch {
      // Watermark is decorative; never allow it to break the worksheet.
    }
  }

  function drawHeader(doc, pageW, margin, printableCount, logoDataUrl) {
    const right = pageW - margin;
    let brandX = margin;

    if (logoDataUrl) {
      try {
        const props = doc.getImageProperties(logoDataUrl);
        const logoSize = 12.5;
        const scale = Math.min(logoSize / props.width, logoSize / props.height);
        const width = props.width * scale;
        const height = props.height * scale;
        const format = String(props.fileType || "PNG").toUpperCase();

        doc.addImage(
          logoDataUrl,
          format,
          margin,
          4.5,
          width,
          height,
          undefined,
          "FAST"
        );
        brandX = margin + width + 3.2;
      } catch {
        brandX = margin;
      }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    setText(doc, BLUE);
    doc.text(BRAND, brandX, 11.5);

    doc.setFontSize(12.5);
    setText(doc, TEXT);
    const titleLines = wrap(doc, getTitle(), 120).slice(0, 2);
    doc.text(titleLines, margin, 18.5);

    doc.setFontSize(8.3);
    setText(doc, MUTED);
    doc.text(normaliseText(getEyebrow()).toUpperCase(), margin, 27.2);

    doc.setFontSize(11.5);
    setText(doc, BLUE);
    doc.text(WEBSITE, right, 11.5, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    setText(doc, MUTED);
    doc.text(`${printableCount}-question printable worksheet`, right, 18.3, {
      align: "right"
    });

    const skillCode = getSkillCode();

    if (skillCode) {
      doc.text(`Skill code: ${skillCode}`, right, 23.5, {
        align: "right"
      });
    }

    setDraw(doc, BLUE);
    doc.setLineWidth(0.5);
    doc.line(margin, 30.2, right, 30.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    setText(doc, TEXT);
    doc.text("Name: __________________________", margin, 36.7);
    doc.text("Date: ______________", right, 36.7, { align: "right" });

    const noteY = 40.2;
    const noteH = 18.2;
    setFill(doc, NOTE_FILL);
    setDraw(doc, NOTE_BORDER);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin, noteY, pageW - 2 * margin, noteH, 1.7, 1.7, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.6);
    setText(doc, BLUE);
    doc.text("For mastery", margin + 2.8, noteY + 4.4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    setText(doc, TEXT);
    const note =
      `Use this printable sheet for independent classroom or home practice. It contains ${printableCount} paper-friendly questions from the same unit bank used in Practice and Test.`;
    const noteLines = wrap(doc, note, pageW - 2 * margin - 5.6).slice(0, 3);
    doc.text(noteLines, margin + 2.8, noteY + 8.8);

    return noteY + noteH + 4.0;
  }

  function drawQuestionImage(doc, dataUrl, x, y, width, availableH) {
    if (!dataUrl || availableH < 7) return y;

    try {
      const props = doc.getImageProperties(dataUrl);
      const maxW = Math.min(width * 0.38, 42);
      const maxH = Math.min(availableH, 16);
      const scale = Math.min(maxW / props.width, maxH / props.height);
      const w = props.width * scale;
      const h = props.height * scale;
      const format = String(props.fileType || "PNG").toUpperCase();
      doc.addImage(
        dataUrl,
        format,
        x + (width - w) / 2,
        y,
        w,
        h,
        undefined,
        "FAST"
      );
      return y + h + 0.8;
    } catch {
      return y;
    }
  }

  function drawVisual(doc, visual, x, y, width, availableH) {
    if (!visual || availableH < 4) return y;

    const lines = String(visual)
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 3);

    const lineH = 6.0;
    const maxLines = Math.max(1, Math.floor(availableH / lineH));

    lines.slice(0, maxLines).forEach((rawLine) => {
      const dotMatches = rawLine.match(/[●•]/g);

      if (dotMatches?.length) {
        const label = normaliseText(rawLine.replace(/[●•]/g, "").replace(/\s+/g, " "));
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        setText(doc, TEXT);

        const labelW = label ? doc.getTextWidth(label) : 0;
        const dotDiameter = 4.2;
        const dotGap = 2.2;
        const dotsW = dotMatches.length * dotDiameter +
          Math.max(0, dotMatches.length - 1) * dotGap;
        const gapAfterLabel = label ? 4 : 0;
        const totalW = labelW + gapAfterLabel + dotsW;
        let cursorX = x + (width - totalW) / 2;

        if (label) {
          doc.text(label, cursorX, y);
          cursorX += labelW + gapAfterLabel;
        }

        setFill(doc, TEXT);
        for (let i = 0; i < dotMatches.length; i += 1) {
          doc.circle(cursorX + dotDiameter / 2, y - 1.3, dotDiameter / 2, "F");
          cursorX += dotDiameter + dotGap;
        }
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16.5);
        setText(doc, TEXT);
        doc.text(normaliseText(rawLine), x + width / 2, y, { align: "center" });
      }

      y += lineH;
    });

    return y + 0.5;
  }

  function drawOptions(doc, question, x, y, width, availableH) {
    const type = question.type || "single";
    const answers = (question.answers || []).map(optionText).filter(Boolean);
    if (!answers.length) return y;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.8);
    setText(doc, TEXT);

    const labels = answers.map((answer, i) =>
      `${String.fromCharCode(65 + i)}. ${answer}`
    );

    // Pack options across rows, but never shrink the font to make them fit.
    const rows = [];
    let current = "";
    labels.forEach((label) => {
      const test = current ? `${current}     ${label}` : label;
      if (!current || doc.getTextWidth(test) <= width) {
        current = test;
      } else {
        rows.push(current);
        current = label;
      }
    });
    if (current) rows.push(current);

    const lineH = 4.4;
    const maxRows = Math.max(1, Math.floor(availableH / lineH));
    rows.slice(0, maxRows).forEach((row) => {
      doc.text(row, x, y);
      y += lineH;
    });

    return y;
  }

  function drawAnswerLine(doc, x, y, width) {
    setDraw(doc, MUTED);
    doc.setLineWidth(0.28);
    doc.line(x, y, x + width, y);
    return y + 1.5;
  }

  function drawOrder(doc, question, x, y, width, availableH) {
    const items = (question.items || []).map(itemText).filter(Boolean);
    const text = items.join("  -  ");
    const boxH = Math.min(8.5, Math.max(6.8, availableH - 3));

    setFill(doc, [248, 250, 253]);
    setDraw(doc, LINE);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, y, width, boxH, 1.4, 1.4, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.4);
    setText(doc, TEXT);
    const lines = wrap(doc, text, width - 4).slice(0, 2);
    doc.text(lines, x + 2, y + 3.5);

    return drawAnswerLine(doc, x, y + boxH + 1.5, width);
  }

  function drawFillBlank(doc, question, x, y, width) {
    const template = normaliseText(question.template || "{{blank}}")
      .replace(/\{\{blank\}\}/g, "____________");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    setText(doc, TEXT);
    const lines = wrap(doc, template, width).slice(0, 2);
    doc.text(lines, x, y);
    return y + Math.max(1, lines.length) * 4.4;
  }

  function drawDragImage(doc, question, x, y, width, availableH) {
    const categories = (question.categories || [])
      .map((c) => normaliseText(c.label || c.id || ""))
      .filter(Boolean)
      .join(" / ");

    if (categories) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      setText(doc, MUTED);
      doc.text(`Groups: ${categories}`, x, y);
      y += 4.2;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setText(doc, TEXT);
    const labels = (question.items || [])
      .map((item) => itemText(item))
      .filter(Boolean)
      .map((label) => `${label}: ______`)
      .join("     ");

    const lines = wrap(doc, labels, width).slice(
      0,
      Math.max(1, Math.floor(Math.max(4, availableH - 4) / 4.2))
    );
    doc.text(lines, x, y);
    return y + lines.length * 4.2;
  }

  function drawQuestion(doc, question, index, x, top, width, blockH, imageMap) {
    const numberW = 7.5;
    const bodyX = x + numberW;
    const bodyW = width - numberW;
    const bottom = top + blockH - 1.2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.2);
    setText(doc, TEXT);
    doc.text(`${index + 1}.`, x, top + 4.4);

    const qLines = wrap(doc, question.question || "", bodyW).slice(0, 2);
    doc.text(qLines, bodyX, top + 4.4);

    let y = top + 4.4 + Math.max(1, qLines.length) * 4.8 + 0.6;
    let remaining = Math.max(3, bottom - y);

    if (question.image && imageMap.get(question.image) && remaining > 7) {
      y = drawQuestionImage(
        doc,
        imageMap.get(question.image),
        bodyX,
        y,
        bodyW,
        Math.min(remaining, 16)
      );
      remaining = Math.max(3, bottom - y);
    }

    if (question.visual && remaining > 4) {
      y = drawVisual(
        doc,
        question.visual,
        bodyX,
        y,
        bodyW,
        Math.min(remaining, 12)
      );
      remaining = Math.max(3, bottom - y);
    }

    const type = question.type || "single";

    if (type === "single" || type === "true-false" || type === "multiple") {
      if (type === "multiple") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.8);
        setText(doc, MUTED);
        doc.text("Select all correct answers.", bodyX, y);
        y += 3.8;
      }

      drawOptions(doc, question, bodyX, y, bodyW, remaining);
    } else if (type === "fill-blank") {
      drawFillBlank(doc, question, bodyX, y, bodyW);
    } else if (type === "order" || type === "drag-drop") {
      drawOrder(doc, question, bodyX, y, bodyW, remaining);
    } else if (type === "drag-image") {
      drawDragImage(doc, question, bodyX, y, bodyW, remaining);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      setText(doc, TEXT);
      doc.text("Answer:", bodyX, y + 1.5);
      drawAnswerLine(
        doc,
        bodyX + 15,
        Math.min(bottom - 1.5, y + 1.5),
        Math.max(35, bodyW * 0.6)
      );
    }

    setDraw(doc, LINE);
    doc.setLineWidth(0.2);
    doc.line(x, top + blockH, x + width, top + blockH);
  }

  function drawFooter(doc, pageW, pageH, margin) {
    const y = pageH - 8;
    setDraw(doc, LINE);
    doc.setLineWidth(0.25);
    doc.line(margin, y - 5, pageW - margin, y - 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    setText(doc, MUTED);
    doc.text(`${BRAND} - Free learning resources`, margin, y);

    doc.setFontSize(10.2);
    setText(doc, BLUE);
    doc.text(WEBSITE, pageW / 2, y, { align: "center" });

    doc.setFontSize(8.2);
    setText(doc, MUTED);
    doc.text("Page 1 of 1", pageW - margin, y, { align: "right" });
  }

  async function createPdf(questions) {
    const JsPDF = await loadJsPdf();
    const doc = new JsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
      compress: true,
      putOnlyUsedFonts: true
    });

    // Metadata makes it easy to confirm that the direct generator is active.
    try {
      doc.setProperties({
        title: `${getTitle()} - Worksheet`,
        subject: `SkillrHub direct worksheet PDF v${VERSION}`,
        author: BRAND,
        creator: `SkillrHub worksheet-pdf.js v${VERSION}`
      });
    } catch {}

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 10;

    drawWatermark(doc, pageW, pageH);

    const [imageMap, logoDataUrl] = await Promise.all([
      preloadImages(questions),
      imageToDataUrl("/icons/icon-512.png")
        .then((dataUrl) => dataUrl || imageToDataUrl("/icons/apple-touch-icon.png")),
    ]);
    const contentTop = drawHeader(
      doc,
      pageW,
      margin,
      questions.length,
      logoDataUrl
    );
    const scoreY = pageH - 22.5;
    const contentBottom = scoreY - 5;
    const contentWidth = pageW - 2 * margin;
    const available = contentBottom - contentTop;

    // Equal-height rows use the entire printable area. This prevents the
    // "small text with a quarter page empty" problem.
    const blockH = available / questions.length;

    questions.forEach((question, index) => {
      drawQuestion(
        doc,
        question,
        index,
        margin,
        contentTop + index * blockH,
        contentWidth,
        blockH,
        imageMap
      );
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    setText(doc, TEXT);
    doc.text(`Score: ______ / ${questions.length}`, margin, scoreY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    setText(doc, MUTED);
    doc.text(
      "Interactive questions from this set are completed online at www.skillrhub.com.",
      margin,
      scoreY + 5.2
    );

    drawFooter(doc, pageW, pageH, margin);

    const safeName = getTitle()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "skillrhub-worksheet";

    doc.save(`${safeName}-worksheet.pdf`);
  }

  async function downloadWorksheet() {
    const questions = getPrintableQuestions();

    if (questions.length < WORKSHEET_LIMIT) {
      alert(`This worksheet needs ${WORKSHEET_LIMIT} unique printable questions. Please add more paper-friendly questions to this set.`);
      return;
    }

    const button = $("#downloadPdfButton");
    const original = button?.textContent || "Worksheet";

    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF...";
    }

    try {
      await createPdf(questions);
    } catch (error) {
      console.error(`SkillrHub direct PDF v${VERSION} failed:`, error);
      alert("The PDF could not be created. Please refresh the page and try again.");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = original;
      }
    }
  }

  function setup() {
    let button = $("#downloadPdfButton");

    if (!button) {
      const startButton = $("#startButton");
      if (!startButton) return;

      button = document.createElement("button");
      button.id = "downloadPdfButton";
      button.type = "button";
      button.className = "button button-secondary";
      button.textContent = "Worksheet";
      startButton.insertAdjacentElement("afterend", button);
    }

    // Critical: cloning removes event listeners attached by any old cached
    // worksheet-pdf.js. This prevents two generators firing from one click.
    const fresh = button.cloneNode(true);
    fresh.dataset.pdfGenerator = `direct-v${VERSION}`;
    button.replaceWith(fresh);
    fresh.addEventListener("click", downloadWorksheet);

    window.skillrWorksheetPdfVersion = VERSION;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
