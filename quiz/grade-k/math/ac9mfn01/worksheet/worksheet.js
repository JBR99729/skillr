"use strict";

(() => {
  const questions = Array.isArray(window.skillrWorksheetQuestions)
    ? window.skillrWorksheetQuestions
    : [];

  const list = document.getElementById("worksheetQuestions");
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
        .join("")}</div></div><p class="match-instruction">Write the matching pairs: ________________________________</p>`;
    } else {
      const lineCount = question.enrichment ? 4 : 2;
      response = `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
    }

    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}">
      <div class="question-topline"><span class="question-number">${index + 1}</span><span class="question-format">${esc(question.formatLabel || "Question")}</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}</div>
      <p class="question-prompt">${esc(question.question)}</p>
      ${question.visual ? `<div class="question-visual">${esc(question.visual)}</div>` : ""}
      ${response}
    </article>`;
  }

  function renderPage() {
    if (!list) return;
    list.innerHTML = questions.map(renderQuestion).join("");
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) {
        doc.setGState(new doc.GState({ opacity: 0.045 }));
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(32);
      doc.setTextColor(36, 87, 214);
      doc.text("SkillrHub F-10", pageW / 2, pageH / 2, {
        align: "center",
        angle: 30
      });
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageNumber, pageW) {
    const margin = 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, 13);

    doc.setFontSize(12);
    doc.setTextColor(23, 57, 104);
    doc.text("AC9MFN01 - Numbers to 20 Worksheet", margin, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(93, 108, 128);
    doc.text("Name: ______________________________", margin, 27);
    doc.text("Date: ______________", pageW - margin, 27, { align: "right" });

    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.4);
    doc.line(margin, 30, pageW - margin, 30);

    doc.setFontSize(8);
    doc.setTextColor(93, 108, 128);
    doc.text(`Page ${pageNumber} of 2`, pageW - margin, 13, { align: "right" });
    return 36;
  }

  function drawFooter(doc, pageW, pageH) {
    const margin = 12;
    doc.setDrawColor(216, 224, 234);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(36, 87, 214);
    doc.text("skillrhub.com", pageW / 2, pageH - 7, { align: "center" });
  }

  function drawQuestion(doc, question, number, x, y, width, maxHeight) {
    const blue = [36, 87, 214];
    const text = [32, 48, 71];
    const muted = [93, 108, 128];
    const border = [216, 226, 239];
    const fill = question.enrichment ? [247, 250, 255] : [255, 255, 255];

    doc.setFillColor(...fill);
    doc.setDrawColor(...border);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, y, width, maxHeight, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...blue);
    doc.text(`${number}.`, x + 3, y + 5);

    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text(String(question.formatLabel || "Question").toUpperCase(), x + 11, y + 5);

    let cursor = y + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.4);
    doc.setTextColor(...text);
    const prompt = wrap(doc, question.question, width - 7).slice(0, 3);
    doc.text(prompt, x + 3, cursor);
    cursor += prompt.length * 4.2 + 1.2;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      doc.text(String(question.visual), x + 3, cursor);
      cursor += 5;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.8);
    doc.setTextColor(...text);

    if (question.type === "single") {
      const options = (question.answers || []).map((value, idx) => `${String.fromCharCode(65 + idx)}. ${value}`);
      const rows = [options.slice(0, 2).join("      "), options.slice(2, 4).join("      ")].filter(Boolean);
      doc.text(rows, x + 3, cursor);
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 3, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const lineCount = Math.max(left.length, right.length);
      for (let i = 0; i < lineCount; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 4, cursor + i * 4.2);
        doc.text(rightText, x + width * 0.53, cursor + i * 4.2);
      }
      cursor += lineCount * 4.2 + 1;
      doc.setDrawColor(...muted);
      doc.line(x + 4, cursor, x + width - 4, cursor);
    } else {
      const lines = question.enrichment ? 4 : 2;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lines; i += 1) {
        const lineY = cursor + i * 5.2;
        if (lineY < y + maxHeight - 3) doc.line(x + 4, lineY, x + width - 4, lineY);
      }
    }
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
      const margin = 12;
      const width = pageW - margin * 2;

      drawWatermark(doc, pageW, pageH);
      let y = drawHeader(doc, 1, pageW);
      const firstPage = questions.slice(0, 6);
      const coreHeight = 38;
      firstPage.forEach((question, index) => {
        drawQuestion(doc, question, index + 1, margin, y, width, coreHeight);
        y += coreHeight + 3;
      });
      drawFooter(doc, pageW, pageH);

      doc.addPage("a4", "portrait");
      drawWatermark(doc, pageW, pageH);
      y = drawHeader(doc, 2, pageW);
      questions.slice(6).forEach((question, localIndex) => {
        const number = localIndex + 7;
        const height = question.enrichment ? 61 : 38;
        drawQuestion(doc, question, number, margin, y, width, height);
        y += height + 4;
      });
      drawFooter(doc, pageW, pageH);

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
