"use strict";

/* =========================================================
   SKILLRHUB WORKSHEET PDF - DIRECT jsPDF VERSION
   Save as: /quiz/assets/worksheet-pdf.js

   Why this version exists:
   - Does NOT screenshot HTML with html2canvas.
   - Draws directly onto a US Letter PDF with jsPDF.
   - Exactly one page for the active 8-question practice.
   - No phantom blank page, horizontal clipping or quarter-page capture.
   - Uses readable print sizes and distributes all 8 questions
     through the usable page height.
   - Uses the SAME active questions as the online quiz.
   ========================================================= */

(() => {
  const JSPDF_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  const BRAND = "SkillrHub";
  const WEBSITE = "www.skillrhub.com";
  const QUESTION_LIMIT = 8;

  const $ = (selector, root = document) => root.querySelector(selector);

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

  function getQuestions() {
    if (
      Array.isArray(window.skillrActiveQuestions) &&
      window.skillrActiveQuestions.length
    ) {
      return window.skillrActiveQuestions.slice(0, QUESTION_LIMIT);
    }

    const bank = Array.isArray(window.quizQuestions)
      ? window.quizQuestions
      : [];

    return bank.slice(0, QUESTION_LIMIT);
  }

  function loadJsPdf() {
    if (window.jspdf?.jsPDF) {
      return Promise.resolve(window.jspdf.jsPDF);
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[data-skillr-jspdf="true"]'
      );

      const finish = () => {
        if (window.jspdf?.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error("jsPDF loaded but was not available."));
        }
      };

      if (existing) {
        existing.addEventListener("load", finish, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = JSPDF_URL;
      script.async = true;
      script.dataset.skillrJspdf = "true";
      script.addEventListener("load", finish, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function normaliseText(value) {
    return String(value ?? "")
      .replace(/\u2018|\u2019/g, "'")
      .replace(/\u201C|\u201D/g, '"')
      .replace(/\u2013|\u2014/g, "-")
      .replace(/\u2026/g, "...")
      .replace(/\u00A0/g, " ")
      .trim();
  }

  function safeVisual(value) {
    return normaliseText(value)
      .replace(/●/g, "•")
      .replace(/◯/g, "O");
  }

  function optionText(answer) {
    if (typeof answer === "string" || typeof answer === "number") {
      return normaliseText(answer);
    }
    if (answer && typeof answer === "object") {
      return normaliseText(answer.label || answer.alt || answer.id || "");
    }
    return "";
  }

  function getItemLabel(item) {
    if (typeof item === "string" || typeof item === "number") {
      return normaliseText(item);
    }
    if (item && typeof item === "object") {
      return normaliseText(item.label || item.alt || item.id || "");
    }
    return "";
  }

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const value = parseInt(clean, 16);
    return [
      (value >> 16) & 255,
      (value >> 8) & 255,
      value & 255
    ];
  }

  const BLUE = hexToRgb("#2457d6");
  const TEXT = hexToRgb("#172033");
  const MUTED = hexToRgb("#667085");
  const LINE = hexToRgb("#d8e0ea");
  const SOFT = hexToRgb("#f5f7fb");
  const NOTE_BORDER = hexToRgb("#cdd9f6");
  const NOTE_FILL = hexToRgb("#f6f8ff");

  function setTextColor(doc, rgb = TEXT) {
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  }

  function setDrawColor(doc, rgb = LINE) {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  }

  function setFillColor(doc, rgb = SOFT) {
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  }

  function split(doc, text, width) {
    const cleaned = normaliseText(text);
    if (!cleaned) return [];
    const lines = doc.splitTextToSize(cleaned, width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawWatermark(doc, pageW, pageH) {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.045 }));
    doc.setFont("helvetica", "bold");
    doc.setFontSize(38);
    setTextColor(doc, BLUE);
    doc.text("SkillrHub.com", pageW / 2, pageH / 2 + 10, {
      align: "center",
      angle: 32
    });
    doc.restoreGraphicsState();
  }

  function drawHeader(doc, pageW, margin) {
    const right = pageW - margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    setTextColor(doc, BLUE);
    doc.text(BRAND, margin, 12);

    doc.setFontSize(13.5);
    setTextColor(doc, TEXT);
    const titleLines = split(doc, getTitle(), 125);
    doc.text(titleLines.slice(0, 2), margin, 19);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setTextColor(doc, MUTED);
    doc.text(normaliseText(getEyebrow()).toUpperCase(), margin, 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    setTextColor(doc, BLUE);
    doc.text(WEBSITE, right, 12, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setTextColor(doc, MUTED);
    doc.text("8-question practice", right, 19, { align: "right" });

    setDrawColor(doc, BLUE);
    doc.setLineWidth(0.55);
    doc.line(margin, 31.5, right, 31.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setTextColor(doc, TEXT);
    doc.text("Name: ______________________________", margin, 38.5);
    doc.text("Date: ______________", right, 38.5, { align: "right" });

    const noteY = 42;
    const noteH = 12;
    setFillColor(doc, NOTE_FILL);
    setDrawColor(doc, NOTE_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, noteY, pageW - 2 * margin, noteH, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.1);
    setTextColor(doc, BLUE);
    doc.text("Mastery recommendation:", margin + 3, noteY + 4.4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.1);
    setTextColor(doc, TEXT);
    const noteText =
      "Repeat this skill across one week and aim to work through the full question bank over multiple attempts. Repeated practice gives different examples and question formats while strengthening the same skill.";
    const noteLines = split(doc, noteText, pageW - 2 * margin - 36);
    doc.text(noteLines.slice(0, 2), margin + 36, noteY + 4.4);

    return 57;
  }

  function estimateQuestionHeight(doc, q, width) {
    const type = q.type || "single";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.8);
    const qLines = split(doc, q.question || "", width - 9).length || 1;

    let h = 4.7 * qLines + 5;

    if (q.visual) {
      const visualLines = safeVisual(q.visual).split(/\n+/).length;
      h += Math.min(12, 4.7 * visualLines + 2);
    }

    if (q.image) h += 12;

    if (type === "single" || type === "true-false" || type === "multiple") {
      const joined = (q.answers || [])
        .map(optionText)
        .filter(Boolean)
        .join("    ");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      h += Math.min(10, 4.2 * Math.max(1, split(doc, joined, width - 9).length));
    } else if (type === "order" || type === "drag-drop") {
      h += 9;
    } else if (type === "drag-image") {
      h += 10;
    } else {
      h += 6;
    }

    return Math.max(18, Math.min(31, h));
  }

  function drawVisual(doc, visualText, x, y, width, maxHeight) {
    const text = safeVisual(visualText);
    if (!text) return y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14.5);
    setTextColor(doc, TEXT);

    const rawLines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
    const lineH = 5.3;
    const maxLines = Math.max(1, Math.floor(maxHeight / lineH));
    const lines = rawLines.slice(0, maxLines);

    lines.forEach(line => {
      doc.text(line, x + width / 2, y, { align: "center" });
      y += lineH;
    });

    return y + 0.8;
  }

  function drawAnswerLine(doc, x, y, width) {
    setDrawColor(doc, MUTED);
    doc.setLineWidth(0.28);
    doc.line(x, y, x + width, y);
    return y + 2;
  }

  function drawOptions(doc, q, x, y, width, maxHeight) {
    const type = q.type || "single";
    const answers = (q.answers || []).map(optionText).filter(Boolean);
    if (!answers.length) return y;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setTextColor(doc, TEXT);

    const labels = answers.map((answer, i) => {
      if (type === "multiple") return `□ ${answer}`;
      return `${String.fromCharCode(65 + i)}. ${answer}`;
    });

    const lineH = 4.2;
    let currentLine = "";
    const rows = [];

    labels.forEach(label => {
      const candidate = currentLine ? `${currentLine}     ${label}` : label;
      if (doc.getTextWidth(candidate) <= width) {
        currentLine = candidate;
      } else {
        if (currentLine) rows.push(currentLine);
        currentLine = label;
      }
    });
    if (currentLine) rows.push(currentLine);

    const maxRows = Math.max(1, Math.floor(maxHeight / lineH));
    rows.slice(0, maxRows).forEach(row => {
      doc.text(row, x, y);
      y += lineH;
    });

    return y;
  }

  function drawOrder(doc, q, x, y, width, maxHeight) {
    const items = (q.items || []).map(getItemLabel).filter(Boolean);
    const joined = items.join("  •  ");

    setFillColor(doc, SOFT);
    setDrawColor(doc, LINE);
    doc.setLineWidth(0.25);
    const boxH = Math.min(8.5, Math.max(6.5, maxHeight - 3));
    doc.roundedRect(x, y, width, boxH, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    setTextColor(doc, TEXT);
    const lines = split(doc, joined, width - 4).slice(0, 2);
    doc.text(lines, x + 2, y + 3.5);
    y += boxH + 2;

    return drawAnswerLine(doc, x, y, width);
  }

  function drawDragImage(doc, q, x, y, width, maxHeight) {
    const groups = (q.categories || [])
      .map(cat => normaliseText(cat.label || cat.id || ""))
      .filter(Boolean)
      .join(" / ");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setTextColor(doc, MUTED);
    if (groups) {
      doc.text(`Groups: ${groups}`, x, y);
      y += 4;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    setTextColor(doc, TEXT);
    const labels = (q.items || [])
      .map(item => `${getItemLabel(item)}: ______`)
      .filter(label => label !== ": ______");

    const rows = split(doc, labels.join("     "), width).slice(
      0,
      Math.max(1, Math.floor((maxHeight - 4) / 4))
    );
    doc.text(rows, x, y);
    return y + rows.length * 4;
  }

  function drawFillBlank(doc, q, x, y, width) {
    let template = normaliseText(q.template || "{{blank}}");
    template = template.replace(/\{\{blank\}\}/g, "____________");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.8);
    setTextColor(doc, TEXT);
    const lines = split(doc, template, width).slice(0, 2);
    doc.text(lines, x, y);
    return y + lines.length * 4.2;
  }

  async function urlToDataUrl(url) {
    if (!url) return null;
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) return null;
      const blob = await response.blob();
      return await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  async function prepareQuestionImages(questions) {
    const result = new Map();
    const unique = [...new Set(questions.map(q => q.image).filter(Boolean))];
    await Promise.all(
      unique.map(async url => {
        result.set(url, await urlToDataUrl(url));
      })
    );
    return result;
  }

  function drawQuestionImage(doc, dataUrl, x, y, width, maxHeight) {
    if (!dataUrl || maxHeight < 7) return y;
    try {
      const props = doc.getImageProperties(dataUrl);
      const maxW = Math.min(44, width * 0.42);
      const maxH = Math.min(14, maxHeight);
      const ratio = Math.min(maxW / props.width, maxH / props.height);
      const w = props.width * ratio;
      const h = props.height * ratio;
      const format = String(props.fileType || "PNG").toUpperCase();
      doc.addImage(dataUrl, format, x + (width - w) / 2, y, w, h, undefined, "FAST");
      return y + h + 1;
    } catch {
      return y;
    }
  }

  function drawQuestion(doc, q, index, x, top, width, blockH, imageMap) {
    const innerX = x + 8;
    const innerW = width - 8;
    const bottom = top + blockH - 1;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.8);
    setTextColor(doc, TEXT);
    doc.text(`${index + 1}.`, x, top + 4);

    const qLines = split(doc, q.question || "", innerW).slice(0, 2);
    doc.text(qLines, innerX, top + 4);

    let y = top + 4 + qLines.length * 4.5 + 0.8;
    let remaining = Math.max(3, bottom - y);

    if (q.image && imageMap.get(q.image)) {
      y = drawQuestionImage(
        doc,
        imageMap.get(q.image),
        innerX,
        y,
        innerW,
        Math.min(remaining, 14)
      );
      remaining = Math.max(3, bottom - y);
    }

    if (q.visual && remaining > 4) {
      y = drawVisual(doc, q.visual, innerX, y, innerW, Math.min(remaining, 11));
      remaining = Math.max(3, bottom - y);
    }

    const type = q.type || "single";

    if (type === "single" || type === "true-false" || type === "multiple") {
      y = drawOptions(doc, q, innerX, y, innerW, remaining);
    } else if (type === "order" || type === "drag-drop") {
      y = drawOrder(doc, q, innerX, y, innerW, remaining);
    } else if (type === "fill-blank") {
      y = drawFillBlank(doc, q, innerX, y, innerW);
    } else if (type === "drag-image") {
      y = drawDragImage(doc, q, innerX, y, innerW, remaining);
    } else {
      y = drawAnswerLine(doc, innerX, Math.min(bottom - 2, y + 3), innerW * 0.75);
    }

    setDrawColor(doc, LINE);
    doc.setLineWidth(0.22);
    doc.line(x, top + blockH, x + width, top + blockH);
  }

  function allocateHeights(doc, questions, width, totalHeight) {
    const estimates = questions.map(q => estimateQuestionHeight(doc, q, width));
    const totalEstimate = estimates.reduce((a, b) => a + b, 0);

    if (totalEstimate <= totalHeight) {
      const spare = totalHeight - totalEstimate;
      const add = spare / questions.length;
      return estimates.map(h => h + add);
    }

    const minH = 20;
    const flexible = estimates.map(h => Math.max(minH, h));
    const flexibleTotal = flexible.reduce((a, b) => a + b, 0);

    if (flexibleTotal <= totalHeight) {
      const spare = totalHeight - flexibleTotal;
      const add = spare / questions.length;
      return flexible.map(h => h + add);
    }

    const equal = totalHeight / questions.length;
    return questions.map(() => equal);
  }

  function drawFooter(doc, pageW, pageH, margin) {
    const y = pageH - 8.5;
    setDrawColor(doc, LINE);
    doc.setLineWidth(0.25);
    doc.line(margin, y - 5, pageW - margin, y - 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.4);
    setTextColor(doc, MUTED);
    doc.text(`${BRAND} - Free learning resources`, margin, y);

    doc.setFontSize(10.5);
    setTextColor(doc, BLUE);
    doc.text(WEBSITE, pageW / 2, y, { align: "center" });

    doc.setFontSize(8.4);
    setTextColor(doc, MUTED);
    doc.text("Page 1 of 1", pageW - margin, y, { align: "right" });
  }

  async function buildPdf(questions) {
    const JsPDF = await loadJsPdf();
    const doc = new JsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
      compress: true
    });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 10;

    drawWatermark(doc, pageW, pageH);
    const contentTop = drawHeader(doc, pageW, margin);
    const footerTop = pageH - 18;
    const contentBottom = footerTop - 2;
    const contentHeight = contentBottom - contentTop;
    const contentWidth = pageW - 2 * margin;

    const images = await prepareQuestionImages(questions);
    const heights = allocateHeights(doc, questions, contentWidth, contentHeight - 8);

    let y = contentTop;
    heights.forEach((height, index) => {
      drawQuestion(
        doc,
        questions[index],
        index,
        margin,
        y,
        contentWidth,
        height,
        images
      );
      y += height;
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    setTextColor(doc, TEXT);
    doc.text(`Score: ______ / ${questions.length}`, margin, contentBottom + 5);

    drawFooter(doc, pageW, pageH, margin);

    const safeName = getTitle()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "skillrhub-worksheet";

    doc.save(`${safeName}-worksheet.pdf`);
  }

  async function downloadWorksheet() {
    const questions = getQuestions();

    if (!questions.length) {
      alert("Questions are not loaded yet.");
      return;
    }

    const button = $("#downloadPdfButton");
    const oldText = button?.textContent || "Download PDF worksheet";

    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF...";
    }

    try {
      await buildPdf(questions);
    } catch (error) {
      console.error("Worksheet PDF failed:", error);
      alert("The PDF could not be created. Please refresh and try again.");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = oldText;
      }
    }
  }

  function setupButton() {
    let button = $("#downloadPdfButton");

    if (!button) {
      const start = $("#startButton");
      if (!start) return;

      button = document.createElement("button");
      button.id = "downloadPdfButton";
      button.type = "button";
      button.className = "button button-secondary";
      button.textContent = "Download PDF worksheet";
      start.insertAdjacentElement("afterend", button);
    }

    button.addEventListener("click", downloadWorksheet);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupButton, { once: true });
  } else {
    setupButton();
  }
})();
