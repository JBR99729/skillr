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
      const lineCount = question.enrichment ? 3 : 2;
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
      doc.setFontSize(15.5);
      doc.setTextColor(36, 87, 214);
      const xs = [38, 105, 172];
      const ys = [72, 132, 192, 252];
      ys.forEach((y) => xs.forEach((x) => {
        doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 });
      }));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW) {
    const margin = 10;
    doc.setFillColor(15, 47, 95);
    doc.rect(0, 0, pageW, 26, "F");
    doc.setFillColor(36, 87, 214);
    doc.rect(0, 23.5, pageW, 2.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(255, 255, 255);
    doc.text("SkillrHub F-10", margin, 10.5);

    doc.setFontSize(11.8);
    doc.text("AC9MFN01 • Numbers to 20 Worksheet", margin, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    doc.setTextColor(224, 235, 255);
    doc.text("Foundation Maths", pageW - margin, 10.5, { align: "right" });
    doc.text("skillrhub.com", pageW - margin, 18, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.7);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ____________________________", margin, 32.5);
    doc.text("Date: ______________", pageW - margin, 32.5, { align: "right" });

    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.65);
    doc.line(margin, 35.5, pageW - margin, 35.5);
    return 39;
  }

  function drawFooter(doc, pageW, pageH) {
    const margin = 10;
    const y = pageH - 8;
    doc.setFillColor(238, 245, 255);
    doc.rect(0, pageH - 14, pageW, 14, "F");
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.45);
    doc.line(0, pageH - 14, pageW, pageH - 14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
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
    const border = question.enrichment ? [153, 185, 228] : [201, 216, 235];
    const fill = question.enrichment ? [239, 246, 255] : [255, 255, 255];

    doc.setFillColor(...fill);
    doc.setDrawColor(...border);
    doc.setLineWidth(question.enrichment ? 0.5 : 0.3);
    doc.roundedRect(x, y, width, height, 1.8, 1.8, "FD");

    doc.setFillColor(...navy);
    doc.circle(x + 5, y + 5, 3.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.3);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), x + 5, y + 5.9, { align: "center" });

    if (question.enrichment) {
      doc.setFontSize(7.1);
      doc.setTextColor(...blue);
      doc.text("ENRICHMENT", x + width - 3, y + 5.4, { align: "right" });
    }

    let cursor = y + 10;
    doc.setFont("helvetica", "bold");
    let promptFont = question.enrichment ? 8.8 : 8.6;
    doc.setFontSize(promptFont);
    doc.setTextColor(...text);

    let prompt = wrap(doc, question.question, width - 6);
    if (prompt.length > (question.enrichment ? 6 : 5)) {
      promptFont = 8.1;
      doc.setFontSize(promptFont);
      prompt = wrap(doc, question.question, width - 6);
    }

    const promptLineHeight = 3.55;
    doc.text(prompt, x + 3, cursor);
    cursor += prompt.length * promptLineHeight + 0.8;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(8.4);
      doc.text(String(question.visual), x + 3, cursor);
      cursor += 4.1;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.0);
    doc.setTextColor(...text);

    if (question.type === "single") {
      const options = (question.answers || []).map((value, idx) => `${String.fromCharCode(65 + idx)}. ${value}`);
      const rows = [options.slice(0, 2).join("    "), options.slice(2, 4).join("    ")].filter(Boolean);
      doc.text(rows, x + 3, cursor);
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.1);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "________"), x + 3, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(7.9);
      for (let i = 0; i < count; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 3, cursor + i * 3.6);
        doc.text(rightText, x + width * 0.54, cursor + i * 3.6);
      }
      cursor += count * 3.6 + 0.6;
      doc.setDrawColor(...muted);
      if (cursor < y + height - 2) doc.line(x + 3, cursor, x + width - 3, cursor);
    } else {
      const lineCount = question.enrichment ? 3 : 2;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lineCount; i += 1) {
        const lineY = cursor + i * 4.6;
        if (lineY < y + height - 2.2) doc.line(x + 3, lineY, x + width - 3, lineY);
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
      const margin = 10;
      const gap = 5;
      const colW = (pageW - margin * 2 - gap) / 2;

      drawRepeatedWatermark(doc, pageW, pageH);
      const top = drawHeader(doc, pageW);

      const core = questions.filter((question) => !question.enrichment);
      const enrichment = questions.filter((question) => question.enrichment);
      const coreH = 33;
      const rowGap = 2.5;

      core.forEach((question, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + col * (colW + gap);
        const y = top + row * (coreH + rowGap);
        drawQuestion(doc, question, index + 1, x, y, colW, coreH);
      });

      const enrichTop = top + 4 * (coreH + rowGap) + 0.8;
      doc.setFillColor(224, 237, 255);
      doc.setDrawColor(153, 185, 228);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, enrichTop, pageW - margin * 2, 7.5, 1.5, 1.5, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.0);
      doc.setTextColor(23, 57, 104);
      doc.text("Enrichment — complete Questions 9–10 after you have finished Questions 1–8.", margin + 3, enrichTop + 4.9);

      const enrichY = enrichTop + 10.3;
      const enrichH = 45;
      enrichment.forEach((question, index) => {
        const x = margin + index * (colW + gap);
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
