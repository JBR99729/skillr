"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF - DIRECT PDF v13
   File path: /quiz/assets/worksheet-pdf.js

   IMPORTANT
   - Direct jsPDF drawing only. No html2canvas/html2pdf capture.
   - Exactly one US Letter page.
   - Uses the same active 8 questions as the quiz.
   - Replaces the PDF button node during setup so stale listeners
     from older worksheet-pdf.js versions cannot also fire.
   ========================================================= */

(() => {
  const VERSION = "13";
  const JSPDF_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";
  const ONLINE_QUESTION_LIMIT = 8;
  const PRINTABLE_LIMIT = 6;
  const PAPER_FRIENDLY_TYPES = new Set([
    "single",
    "true-false",
    "text",
    "number",
    "fill-blank"
  ]);

  const BLUE = [36, 87, 214];
  const TEXT = [23, 32, 51];
  const MUTED = [102, 112, 133];
  const LINE = [216, 224, 234];
  const NOTE_FILL = [246, 248, 255];
  const NOTE_BORDER = [205, 217, 246];

  const $ = (selector, root = document) => root.querySelector(selector);

  function normaliseText(value) {
    return String(value ?? "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
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

  function getActiveQuestions() {
    if (
      Array.isArray(window.skillrActiveQuestions) &&
      window.skillrActiveQuestions.length
    ) {
      return window.skillrActiveQuestions.slice(0, ONLINE_QUESTION_LIMIT);
    }

    const bank = Array.isArray(window.quizQuestions)
      ? window.quizQuestions
      : [];

    return bank.slice(0, ONLINE_QUESTION_LIMIT);
  }

  function isPaperFriendly(question) {
    const type = question?.type || "single";
    return PAPER_FRIENDLY_TYPES.has(type);
  }

  function getPrintableQuestions() {
    return getActiveQuestions()
      .filter(isPaperFriendly)
      .slice(0, PRINTABLE_LIMIT);
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

  function drawHeader(doc, pageW, margin, printableCount) {
    const right = pageW - margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    setText(doc, BLUE);
    doc.text(BRAND, margin, 11.5);

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
      "Repeat this skill online across one week and aim to work through the full question bank over multiple attempts. This worksheet contains only paper-friendly questions from the current set. Complete arranging, drag-and-drop and select-all activities online.";
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

    if (type === "single" || type === "true-false") {
      drawOptions(doc, question, bodyX, y, bodyW, remaining);
    } else if (type === "fill-blank") {
      drawFillBlank(doc, question, bodyX, y, bodyW);
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

    const contentTop = drawHeader(doc, pageW, margin, questions.length);
    const scoreY = pageH - 22.5;
    const contentBottom = scoreY - 5;
    const contentWidth = pageW - 2 * margin;
    const available = contentBottom - contentTop;

    // Equal-height rows use the entire printable area. This prevents the
    // "small text with a quarter page empty" problem.
    const blockH = available / questions.length;

    const imageMap = await preloadImages(questions);

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

    if (!questions.length) {
      alert("No paper-friendly questions are available in this set. Please complete this practice online.");
      return;
    }

    const button = $("#downloadPdfButton");
    const original = button?.textContent || "Download PDF Worksheet";

    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF...";
    }

    try {
      await createPdf(questions);
    } catch (error) {
      console.error("SkillrHub direct PDF v13 failed:", error);
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
      button.textContent = "Download PDF Worksheet";
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
