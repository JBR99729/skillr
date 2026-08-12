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

  function installPrintLayout() {
    const existing = document.getElementById("skillr-letter-print-layout");
    if (!existing) {
      const style = document.createElement("style");
      style.id = "skillr-letter-print-layout";
      style.textContent = `
        .worksheet-print-tip{
          margin:12px 0 0;
          padding:9px 11px;
          border:1px solid #b9cceb;
          border-radius:10px;
          background:#eef5ff;
          color:#173968;
          font-size:.86rem;
          font-weight:800;
        }
        @page{size:Letter portrait;margin:9mm}
        @media print{
          body{background:#fff!important}
          .worksheet-nav,.worksheet-actions,.worksheet-hero{display:none!important}
          .worksheet-shell{max-width:none!important;padding:0!important}
          .worksheet-paper{width:100%!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0!important;overflow:visible!important}
          .worksheet-paper__head{margin:0 0 5mm!important;padding:6mm 6mm 5mm!important;background:linear-gradient(90deg,#0f2f5f,#2457d6)!important;border-bottom:3px solid #173968!important}
          .worksheet-paper__head h2{font-size:15pt!important}.paper-brand{font-size:12pt!important}.worksheet-paper__head p{font-size:9.5pt!important}
          .watermark-grid{position:fixed!important;inset:0!important;z-index:-1!important;grid-template-columns:repeat(2,1fr)!important;grid-template-rows:repeat(4,1fr)!important}
          .watermark-grid span{font-size:14pt!important;color:rgba(36,87,214,.095)!important}
          .core-grid,.enrichment-grid{display:block!important;margin:0!important}
          .worksheet-question{display:block!important;margin:0 0 5mm!important;padding:4mm 4.5mm!important;border:1.3px solid #c9d7e9!important;border-radius:2.5mm!important;break-inside:avoid!important;page-break-inside:avoid!important}
          .question-topline{margin-bottom:2mm!important}.question-number{width:7mm!important;height:7mm!important;font-size:9pt!important}
          .question-prompt{font-size:11pt!important;line-height:1.32!important;margin-bottom:2.5mm!important}
          .question-visual{font-size:10pt!important;padding:2mm 2.5mm!important;margin-bottom:2mm!important}
          .worksheet-options{grid-template-columns:1fr 1fr!important;gap:2mm 3mm!important}.worksheet-options div{font-size:9.8pt!important;padding:2mm 2.5mm!important}
          .fill-template{font-size:11pt!important}.blank-line{min-width:18mm!important}
          .match-grid{gap:6mm!important;padding:2.5mm 3mm!important}.match-grid p{font-size:9.8pt!important;margin:1.4mm 0!important}.match-instruction{font-size:9pt!important;margin-top:2mm!important}
          .response-lines{gap:2.8mm!important;margin-top:2.5mm!important}.response-lines span{height:4mm!important}
          .enrichment-heading{font-size:10pt!important;margin:4mm 0 3mm!important;padding:2.5mm 3mm!important;border-left-width:2mm!important;break-inside:avoid!important}
          .enrichment-grid .worksheet-question{margin-bottom:6mm!important}.enrichment-grid .question-prompt{font-size:10.5pt!important}.enrichment-label{font-size:8pt!important;padding:.7mm 2mm!important}
          .worksheet-footer{font-size:8.5pt!important;margin:4mm 0 0!important;padding:3mm 0!important;border-top:1.5px solid #a9c1e5!important;background:transparent!important}
          .core-grid .worksheet-question:nth-child(6){break-before:page!important;page-break-before:always!important;margin-top:0!important}
          .worksheet-print-tip{display:block!important;margin:4mm 0 0!important;padding:2.5mm 3mm!important;font-size:9pt!important;border:1px solid #b9cceb!important;background:#eef5ff!important}
        }
      `;
      document.head.appendChild(style);
    }

    const meta = document.querySelector(".worksheet-meta");
    if (meta) {
      [...meta.querySelectorAll("span")].forEach((chip) => {
        if (/A4|landscape|2-page|one .* sheet/i.test(chip.textContent || "")) {
          chip.textContent = "US Letter • up to 2 pages";
        }
      });
    }

    if (!document.querySelector(".worksheet-print-tip")) {
      const tip = document.createElement("div");
      tip.className = "worksheet-print-tip";
      tip.textContent = "Printing tip: choose double-sided (duplex) printing to use one sheet per student.";
      const actions = document.querySelector(".worksheet-actions");
      if (actions) actions.insertAdjacentElement("afterend", tip);
      else if (meta) meta.insertAdjacentElement("afterend", tip);
    }
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
      const lineCount = question.enrichment ? 5 : 3;
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
      doc.setFontSize(16);
      doc.setTextColor(36, 87, 214);
      const xs = [55, 160];
      const ys = [70, 135, 200, 255];
      ys.forEach((y) => xs.forEach((x) => {
        doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 });
      }));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW, pageNumber) {
    const margin = 10;
    doc.setFillColor(15, 47, 95);
    doc.rect(0, 0, pageW, 26, "F");
    doc.setFillColor(36, 87, 214);
    doc.rect(0, 23.5, pageW, 2.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18.5);
    doc.setTextColor(255, 255, 255);
    doc.text("SkillrHub F-10", margin, 10.5);
    doc.setFontSize(11.5);
    doc.text("AC9MFN01 • Numbers to 20 Worksheet", margin, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    doc.setTextColor(224, 235, 255);
    doc.text(`Page ${pageNumber} of 2 • skillrhub.com`, pageW - margin, 14.5, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ______________________________", margin, 33);
    doc.text("Date: ______________", pageW - margin, 33, { align: "right" });
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.6);
    doc.line(margin, 36, pageW - margin, 36);
    return 40;
  }

  function drawFooter(doc, pageW, pageH, pageNumber) {
    const margin = 10;
    const y = pageH - 7;
    doc.setFillColor(238, 245, 255);
    doc.rect(0, pageH - 15, pageW, 15, "F");
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.4);
    doc.line(0, pageH - 15, pageW, pageH - 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.1);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, y - 3.2);
    doc.text("skillrhub.com", pageW - margin, y - 3.2, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.6);
    doc.setTextColor(23, 57, 104);
    doc.text("Printing tip: choose double-sided (duplex) printing to use one sheet per student.", pageW / 2, y + 1.2, { align: "center" });
    doc.text(`Page ${pageNumber} of 2`, pageW - margin, y + 1.2, { align: "right" });
  }

  function drawQuestion(doc, question, number, x, y, width, height) {
    const blue = [36, 87, 214];
    const navy = [23, 57, 104];
    const text = [32, 48, 71];
    const muted = [93, 108, 128];

    doc.setFillColor(...(question.enrichment ? [239, 246, 255] : [255, 255, 255]));
    doc.setDrawColor(...(question.enrichment ? [153, 185, 228] : [201, 216, 235]));
    doc.setLineWidth(question.enrichment ? 0.5 : 0.32);
    doc.roundedRect(x, y, width, height, 2.1, 2.1, "FD");

    doc.setFillColor(...navy);
    doc.circle(x + 5.5, y + 5.5, 3.4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(255, 255, 255);
    doc.text(String(number), x + 5.5, y + 6.5, { align: "center" });

    if (question.enrichment) {
      doc.setFontSize(7.1);
      doc.setTextColor(...blue);
      doc.text("ENRICHMENT", x + width - 4, y + 5.8, { align: "right" });
    }

    let cursor = y + 12;
    doc.setFont("helvetica", "bold");
    let fontSize = question.enrichment ? 10.2 : 9.9;
    doc.setFontSize(fontSize);
    doc.setTextColor(...text);
    let prompt = wrap(doc, question.question, width - 10);
    if (prompt.length > 5) {
      fontSize = 9.2;
      doc.setFontSize(fontSize);
      prompt = wrap(doc, question.question, width - 10);
    }
    doc.text(prompt, x + 5, cursor);
    cursor += prompt.length * 4 + 1.4;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      const visualLines = wrap(doc, question.visual, width - 10);
      doc.text(visualLines, x + 5, cursor);
      cursor += visualLines.length * 4 + 1;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...text);

    if (question.type === "single") {
      (question.answers || []).forEach((value, idx) => {
        const option = `${String.fromCharCode(65 + idx)}. ${value}`;
        const optionY = cursor + idx * 5;
        if (optionY < y + height - 4) doc.text(option, x + 6, optionY);
      });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.2);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 5, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(8.8);
      for (let i = 0; i < count; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 5, cursor + i * 4.7);
        doc.text(rightText, x + width * 0.56, cursor + i * 4.7);
      }
      const lineY = cursor + count * 4.7 + 1;
      if (lineY < y + height - 4) {
        doc.setDrawColor(...muted);
        doc.line(x + 5, lineY, x + width - 5, lineY);
      }
    } else {
      const lineCount = question.enrichment ? 5 : 3;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lineCount; i += 1) {
        const lineY = cursor + i * 6.3;
        if (lineY < y + height - 4) doc.line(x + 5, lineY, x + width - 5, lineY);
      }
    }
  }

  function drawPage(doc, pageQuestions, pageNumber, startNumber, pageW, pageH) {
    const margin = 10;
    const width = pageW - margin * 2;
    drawWatermark(doc, pageW, pageH);
    let y = drawHeader(doc, pageW, pageNumber);
    const bottom = pageH - 18;
    const gap = 4;

    pageQuestions.forEach((question, index) => {
      const questionsLeft = pageQuestions.length - index;
      const remaining = bottom - y;
      const height = Math.max(question.enrichment ? 49 : 38, (remaining - gap * (questionsLeft - 1)) / questionsLeft);
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
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter", compress: true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      drawPage(doc, questions.slice(0, 5), 1, 1, pageW, pageH);
      doc.addPage("letter", "portrait");
      drawPage(doc, questions.slice(5), 2, 6, pageW, pageH);

      doc.save("ac9mfn01-numbers-to-20-worksheet.pdf");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText || "Download PDF worksheet";
      }
    }
  }

  installPrintLayout();
  renderPage();
  if (button) button.addEventListener("click", downloadPdf);
})();
