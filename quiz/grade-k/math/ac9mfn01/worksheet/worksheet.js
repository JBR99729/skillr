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
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || [])
        .map((item, i) => `<p><strong>${String.fromCharCode(65 + i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || [])
        .map((item, i) => `<p><strong>${i + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
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
    if (coreList) coreList.innerHTML = core.map((q, i) => renderQuestion(q, i)).join("");
    if (enrichmentList) enrichmentList.innerHTML = enrichment.map((q, i) => renderQuestion(q, i + core.length)).join("");
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: 0.085 }));
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(36, 87, 214);
      [58, 108, 158].forEach((y) => [50, 148, 246].forEach((x) => {
        doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 24 });
      }));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW) {
    const margin = 8;
    doc.setFillColor(15, 47, 95);
    doc.rect(0, 0, pageW, 20, "F");
    doc.setFillColor(36, 87, 214);
    doc.rect(0, 18, pageW, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text("SkillrHub F-10", margin, 8.5);
    doc.setFontSize(10.8);
    doc.text("AC9MFN01 • Numbers to 20 Worksheet", margin, 15.2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    doc.setTextColor(224, 235, 255);
    doc.text("Foundation Maths • skillrhub.com", pageW - margin, 11.5, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ______________________________", margin, 26);
    doc.text("Date: ______________", pageW - margin, 26, { align: "right" });
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.55);
    doc.line(margin, 28.5, pageW - margin, 28.5);
    return 32;
  }

  function drawFooter(doc, pageW, pageH) {
    const margin = 8;
    const y = pageH - 5.5;
    doc.setFillColor(238, 245, 255);
    doc.rect(0, pageH - 10, pageW, 10, "F");
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.35);
    doc.line(0, pageH - 10, pageW, pageH - 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.7);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, y);
    doc.text("skillrhub.com", pageW / 2, y, { align: "center" });
    doc.setTextColor(23, 57, 104);
    doc.text("AC9MFN01 • Foundation Maths", pageW - margin, y, { align: "right" });
  }

  function drawQuestion(doc, question, number, x, y, width, height) {
    const blue = [36, 87, 214];
    const navy = [23, 57, 104];
    const text = [32, 48, 71];
    const muted = [93, 108, 128];

    doc.setFillColor(...(question.enrichment ? [239, 246, 255] : [255, 255, 255]));
    doc.setDrawColor(...(question.enrichment ? [153, 185, 228] : [201, 216, 235]));
    doc.setLineWidth(question.enrichment ? 0.45 : 0.28);
    doc.roundedRect(x, y, width, height, 1.8, 1.8, "FD");

    doc.setFillColor(...navy);
    doc.circle(x + 4.5, y + 4.5, 2.8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), x + 4.5, y + 5.3, { align: "center" });

    if (question.enrichment) {
      doc.setFontSize(6.6);
      doc.setTextColor(...blue);
      doc.text("ENRICHMENT", x + width - 3, y + 5, { align: "right" });
    }

    let cursor = y + 9;
    doc.setFont("helvetica", "bold");
    let fontSize = question.enrichment ? 9.4 : 9.2;
    doc.setFontSize(fontSize);
    doc.setTextColor(...text);
    let prompt = wrap(doc, question.question, width - 8);
    if (prompt.length > (question.enrichment ? 5 : 3)) {
      fontSize = question.enrichment ? 8.8 : 8.6;
      doc.setFontSize(fontSize);
      prompt = wrap(doc, question.question, width - 8);
    }
    doc.text(prompt, x + 4, cursor);
    cursor += prompt.length * 3.7 + 0.8;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(8.2);
      const visualLines = wrap(doc, question.visual, width - 8).slice(0, 2);
      doc.text(visualLines, x + 4, cursor);
      cursor += visualLines.length * 3.4 + 0.5;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.3);
    doc.setTextColor(...text);

    if (question.type === "single") {
      const options = (question.answers || []).map((value, idx) => `${String.fromCharCode(65 + idx)}. ${value}`);
      const rows = [options.slice(0, 2).join("      "), options.slice(2, 4).join("      ")].filter(Boolean);
      rows.forEach((row, idx) => {
        const rowY = cursor + idx * 3.8;
        if (rowY < y + height - 2) doc.text(row, x + 4, rowY);
      });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "________"), x + 4, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(8.1);
      for (let i = 0; i < count; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 4, cursor + i * 3.5);
        doc.text(rightText, x + width * 0.56, cursor + i * 3.5);
      }
      const lineY = cursor + count * 3.5 + 0.4;
      if (lineY < y + height - 2) {
        doc.setDrawColor(...muted);
        doc.line(x + 4, lineY, x + width - 4, lineY);
      }
    } else {
      const lineCount = question.enrichment ? 4 : 2;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lineCount; i += 1) {
        const lineY = cursor + i * (question.enrichment ? 5.7 : 4.6);
        if (lineY < y + height - 2) doc.line(x + 4, lineY, x + width - 4, lineY);
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
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 8;
      const gapX = 5;
      const colW = (pageW - margin * 2 - gapX) / 2;
      const top = drawHeader(doc, pageW);

      drawWatermark(doc, pageW, pageH);

      const core = questions.filter((q) => !q.enrichment);
      const enrichment = questions.filter((q) => q.enrichment);
      const coreH = 26;
      const rowGap = 2.2;

      core.forEach((question, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + col * (colW + gapX);
        const y = top + row * (coreH + rowGap);
        drawQuestion(doc, question, index + 1, x, y, colW, coreH);
      });

      const enrichTop = top + 4 * (coreH + rowGap) + 1;
      doc.setFillColor(224, 237, 255);
      doc.setDrawColor(153, 185, 228);
      doc.setLineWidth(0.35);
      doc.roundedRect(margin, enrichTop, pageW - margin * 2, 6.5, 1.2, 1.2, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.3);
      doc.setTextColor(23, 57, 104);
      doc.text("Enrichment — complete Questions 9–10 after Questions 1–8.", margin + 3, enrichTop + 4.2);

      const enrichY = enrichTop + 8.7;
      const enrichH = pageH - 10 - enrichY - 2;
      enrichment.forEach((question, index) => {
        const x = margin + index * (colW + gapX);
        drawQuestion(doc, question, index + 9, x, enrichY, colW, enrichH);
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
