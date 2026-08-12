"use strict";

(() => {
  const questions = Array.isArray(window.skillrWorksheetQuestions)
    ? window.skillrWorksheetQuestions
    : [];

  const coreList = document.getElementById("coreQuestions");
  const enrichmentList = document.getElementById("enrichmentQuestions");
  const button = document.getElementById("downloadPdfButton");

  function esc(value) {
    return String(value ?? "").replace(/[&<>\"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    }[char]));
  }

  function renderQuestion(question, index) {
    let response = "";

    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || [])
        .map((answer, optionIndex) => `<div><span class="choice-box"></span><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${esc(answer)}</div>`)
        .join("")}</div>`;
    } else if (question.type === "fill-blank") {
      const template = esc(question.template || "")
        .replaceAll("{{blank}}", '<span class="blank-line"></span>');
      response = `<div class="fill-template">${template}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || [])
        .map((item, itemIndex) => `<p><strong>${String.fromCharCode(65 + itemIndex)}.</strong> ${esc(item)}</p>`)
        .join("")}</div><div>${(question.matchRight || [])
        .map((item, itemIndex) => `<p><strong>${itemIndex + 1}.</strong> ${esc(item)}</p>`)
        .join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      const lineCount = question.enrichment ? 4 : 3;
      response = `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
    }

    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}">
      <div class="question-topline"><span class="question-number">${index + 1}</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}</div>
      <p class="question-prompt">${esc(question.question)}</p>
      ${question.visual ? `<div class="question-visual">${esc(question.visual)}</div>` : ""}
      ${response}
    </article>`;
  }

  function renderPage() {
    const core = questions.filter((question) => !question.enrichment);
    const enrichment = questions.filter((question) => question.enrichment);
    if (coreList) coreList.innerHTML = core.map((question, index) => renderQuestion(question, index)).join("");
    if (enrichmentList) enrichmentList.innerHTML = enrichment.map((question, index) => renderQuestion(question, index + core.length)).join("");
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawRepeatedWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) {
        doc.setGState(new doc.GState({ opacity: 0.095 }));
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.setTextColor(36, 87, 214);
      const xs = [38, 105, 172];
      const ys = [78, 142, 206, 270];
      ys.forEach((y) => xs.forEach((x) => {
        doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 });
      }));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW, pageNumber) {
    const margin = 10;
    doc.setFillColor(15, 47, 95);
    doc.rect(0, 0, pageW, 27, "F");
    doc.setFillColor(36, 87, 214);
    doc.rect(0, 24.5, pageW, 2.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(19.5);
    doc.setTextColor(255, 255, 255);
    doc.text("SkillrHub F-10", margin, 10.8);

    doc.setFontSize(12.2);
    doc.text("AC9MFN01 • Numbers to 20 Worksheet", margin, 18.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    doc.setTextColor(224, 235, 255);
    doc.text("Foundation Maths", pageW - margin, 10.8, { align: "right" });
    doc.text(`Page ${pageNumber} of 2 • skillrhub.com`, pageW - margin, 18.8, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.4);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ______________________________", margin, 34);
    doc.text("Date: ______________", pageW - margin, 34, { align: "right" });

    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.7);
    doc.line(margin, 37, pageW - margin, 37);
    return 41;
  }

  function drawFooter(doc, pageW, pageH, pageNumber) {
    const margin = 10;
    const y = pageH - 8;
    doc.setFillColor(238, 245, 255);
    doc.rect(0, pageH - 14, pageW, 14, "F");
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.45);
    doc.line(0, pageH - 14, pageW, pageH - 14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, y);
    doc.text("skillrhub.com", pageW / 2, y, { align: "center" });
    doc.setTextColor(23, 57, 104);
    doc.text(`Page ${pageNumber} of 2`, pageW - margin, y, { align: "right" });
  }

  function drawQuestion(doc, question, number, x, y, width, height) {
    const blue = [36, 87, 214];
    const navy = [23, 57, 104];
    const text = [32, 48, 71];
    const muted = [93, 108, 128];
    const border = question.enrichment ? [153, 185, 228] : [201, 216, 235];
    const fill = question.enrichment ? [239, 246, 255] : [255, 255, 255];

    doc.setFillColor(...fill);
    doc.setDrawColor(...border);
    doc.setLineWidth(question.enrichment ? 0.55 : 0.35);
    doc.roundedRect(x, y, width, height, 2.2, 2.2, "FD");

    doc.setFillColor(...navy);
    doc.circle(x + 6, y + 6, 3.7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), x + 6, y + 7, { align: "center" });

    if (question.enrichment) {
      doc.setFontSize(7.6);
      doc.setTextColor(...blue);
      doc.text("ENRICHMENT", x + width - 4, y + 6.2, { align: "right" });
    }

    let cursor = y + 13;
    doc.setFont("helvetica", "bold");
    let promptFont = question.enrichment ? 10.4 : 10.1;
    doc.setFontSize(promptFont);
    doc.setTextColor(...text);
    let prompt = wrap(doc, question.question, width - 10);
    if (prompt.length > 5) {
      promptFont = 9.4;
      doc.setFontSize(promptFont);
      prompt = wrap(doc, question.question, width - 10);
    }
    const promptLineHeight = 4.2;
    doc.text(prompt, x + 5, cursor);
    cursor += prompt.length * promptLineHeight + 1.8;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(9.4);
      doc.text(String(question.visual), x + 5, cursor);
      cursor += 5;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.1);
    doc.setTextColor(...text);

    if (question.type === "single") {
      const options = (question.answers || []).map((value, idx) => `${String.fromCharCode(65 + idx)}. ${value}`);
      options.forEach((option, idx) => {
        const oy = cursor + idx * 5.1;
        if (oy < y + height - 4) doc.text(option, x + 6, oy);
      });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 5, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(9.1);
      for (let i = 0; i < count; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 5, cursor + i * 5);
        doc.text(rightText, x + width * 0.55, cursor + i * 5);
      }
      cursor += count * 5 + 1;
      doc.setDrawColor(...muted);
      if (cursor < y + height - 4) doc.line(x + 5, cursor, x + width - 5, cursor);
    } else {
      const lineCount = question.enrichment ? 5 : 3;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lineCount; i += 1) {
        const lineY = cursor + i * 7;
        if (lineY < y + height - 4) doc.line(x + 5, lineY, x + width - 5, lineY);
      }
    }
  }

  function drawPage(doc, pageQuestions, pageNumber, startNumber, pageW, pageH) {
    const margin = 10;
    const width = pageW - margin * 2;
    drawRepeatedWatermark(doc, pageW, pageH);
    let y = drawHeader(doc, pageW, pageNumber);

    pageQuestions.forEach((question, index) => {
      const remaining = pageH - 18 - y;
      const questionsLeft = pageQuestions.length - index;
      const gap = 4;
      const baseHeight = Math.floor((remaining - gap * (questionsLeft - 1)) / questionsLeft);
      const minHeight = question.enrichment ? 50 : 39;
      const height = Math.max(minHeight, baseHeight);
      drawQuestion(doc, question, startNumber + index, margin, y, width, height);
      y += height + gap;
    });

    drawFooter(doc, pageW, pageH, pageNumber);
  }

  async function downloadPdf() {
    if (!window.jspdf?.jsPDF || questions.length !== 10) {
      alert("The worksheet could not be prepared. Please refresh and try again.");
      return;
    }

    const originalText = button?.textContent;
    if (button) {
      button.disabled = true;
      button.textContent = "Preparing PDF...";
    }

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      drawPage(doc, questions.slice(0, 5), 1, 1, pageW, pageH);
      doc.addPage("a4", "portrait");
      drawPage(doc, questions.slice(5, 10), 2, 6, pageW, pageH);

      doc.save("ac9mfn01-numbers-to-20-worksheet.pdf");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText || "Download PDF worksheet";
      }
    }
  }

  renderPage();
  if (button) button.addEventListener("click", downloadPdf);
})();
