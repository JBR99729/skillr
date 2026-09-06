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

  function installLayout() {
    if (document.getElementById("skillr-clean-worksheet-layout")) return;

    const style = document.createElement("style");
    style.id = "skillr-clean-worksheet-layout";
    style.textContent = `
      .worksheet-paper{
        border:2px solid #2457d6!important;
        border-radius:14px!important;
      }
      .worksheet-question,.worksheet-question.enrichment{
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        box-shadow:none!important;
        padding:10px 0 12px!important;
        border-bottom:1px solid #dbe4ef!important;
      }
      .worksheet-question.enrichment{border-bottom-color:#b9cceb!important}
      .question-line{
        display:flex;
        align-items:baseline;
        gap:7px;
        margin:0 0 7px;
        min-width:0;
      }
      .question-number-text{
        flex:0 0 auto;
        font-weight:900;
        color:#173968;
        font-size:.96rem;
      }
      .question-prompt{
        display:inline!important;
        margin:0!important;
        font-size:.96rem!important;
        font-weight:800!important;
        line-height:1.35!important;
        min-width:0;
      }
      .enrichment-label{
        flex:0 0 auto;
        border-radius:999px;
        background:#d4e3ff;
        border:1px solid #9db9e4;
        padding:2px 7px;
        font-size:.65rem;
        font-weight:900;
        color:#173968;
        text-transform:uppercase;
        letter-spacing:.03em;
      }
      .question-visual{
        margin:3px 0 7px 27px!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        padding:0!important;
        font-size:.9rem!important;
      }
      .worksheet-options{
        display:flex!important;
        align-items:center;
        flex-wrap:wrap;
        gap:8px 20px!important;
        margin-left:27px;
      }
      .worksheet-options span{
        display:inline-block;
        font-size:.9rem;
        font-weight:600;
        white-space:nowrap;
      }
      .worksheet-options strong{color:#173968}
      .fill-template,.match-grid,.match-instruction,.response-lines{margin-left:27px!important}
      .match-grid{
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        padding:0!important;
      }
      .match-grid p{font-size:.88rem!important}
      .core-grid,.enrichment-grid{gap:0!important}

      @page{size:Letter portrait;margin:9mm}
      @media print{
        body{background:#fff!important}
        .worksheet-nav,.worksheet-actions,.worksheet-hero{display:none!important}
        .worksheet-shell{max-width:none!important;padding:0!important}
        .worksheet-paper{
          width:100%!important;
          margin:0!important;
          border:1.5px solid #2457d6!important;
          border-radius:0!important;
          box-shadow:none!important;
          padding:0 5mm 4mm!important;
          overflow:visible!important;
          background:#fff!important;
          box-decoration-break:clone;
          -webkit-box-decoration-break:clone;
        }
        .worksheet-paper__head{
          margin:0 -5mm 4mm!important;
          padding:4mm 6mm 3mm!important;
          background:#fff!important;
          border-top:0!important;
          border-bottom:2px solid #2457d6!important;
          color:#173968!important;
        }
        .worksheet-paper__head h2{font-size:14pt!important;color:#173968!important}
        .paper-brand{
          display:inline-block!important;
          font-size:12pt!important;
          color:#2457d6!important;
          padding-bottom:1mm!important;
          border-bottom:2px solid #2457d6!important;
        }
        .paper-brand span{color:#173968!important}
        .worksheet-paper__head p{font-size:9pt!important;color:#173968!important}
        .watermark-grid{
          position:fixed!important;
          inset:0!important;
          z-index:-1!important;
          grid-template-columns:repeat(2,1fr)!important;
          grid-template-rows:repeat(4,1fr)!important;
        }
        .watermark-grid span{font-size:13pt!important;color:rgba(36,87,214,.075)!important}
        .core-grid,.enrichment-grid{display:block!important;margin:0!important}
        .worksheet-question,.worksheet-question.enrichment{
          display:block!important;
          margin:0!important;
          padding:3.3mm 0 4mm!important;
          border:0!important;
          border-radius:0!important;
          border-bottom:1px solid #dbe4ef!important;
          background:#fff!important;
          break-inside:avoid!important;
          page-break-inside:avoid!important;
        }
        .question-line{gap:2mm!important;margin-bottom:1.8mm!important}
        .question-number-text{font-size:10.5pt!important;color:#173968!important}
        .question-prompt{font-size:10.5pt!important;line-height:1.3!important}
        .enrichment-label{
          font-size:7.7pt!important;
          padding:.6mm 1.8mm!important;
          background:#fff!important;
          border:1px solid #2457d6!important;
          color:#2457d6!important;
        }
        .question-visual{font-size:9.5pt!important;margin:0 0 1.8mm 8mm!important;background:#fff!important}
        .worksheet-options{
          display:flex!important;
          flex-wrap:wrap!important;
          gap:1.8mm 6mm!important;
          margin-left:8mm!important;
        }
        .worksheet-options span{font-size:9.5pt!important}
        .fill-template{font-size:10.5pt!important;margin-left:8mm!important}
        .blank-line{min-width:18mm!important}
        .match-grid{gap:7mm!important;padding:0!important;margin-left:8mm!important;background:#fff!important}
        .match-grid p{font-size:9.5pt!important;margin:1.1mm 0!important}
        .match-instruction{font-size:8.8pt!important;margin:1.7mm 0 0 8mm!important}
        .response-lines{gap:2.3mm!important;margin:2mm 0 0 8mm!important}
        .response-lines span{height:3.4mm!important}
        .enrichment-heading{
          font-size:9.5pt!important;
          margin:3mm 0 1.5mm!important;
          padding:1.3mm 0!important;
          border:0!important;
          border-left:2px solid #2457d6!important;
          padding-left:2.5mm!important;
          background:#fff!important;
          color:#173968!important;
          break-inside:avoid!important;
        }
        .worksheet-footer{
          font-size:8pt!important;
          margin:3mm -5mm -4mm!important;
          padding:2.5mm 5mm!important;
          border-top:1.5px solid #2457d6!important;
          background:#fff!important;
          color:#173968!important;
        }
        .worksheet-footer strong{color:#2457d6!important}
      }
    `;
    document.head.appendChild(style);

    const meta = document.querySelector(".worksheet-meta");
    if (meta) {
      [...meta.querySelectorAll("span")].forEach((chip) => {
        if (/A4|landscape|2-page|one .* sheet|US Letter/i.test(chip.textContent || "")) {
          chip.textContent = "US Letter portrait • 1 page when possible";
        }
      });
    }
  }

  function renderQuestion(question, index) {
    let response = "";

    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || [])
        .map((answer, optionIndex) => `<span><strong>[${String.fromCharCode(65 + optionIndex)}]</strong> ${esc(answer)}</span>`)
        .join("")}</div>`;
    } else if (question.type === "fill-blank") {
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || [])
        .map((item, i) => `<p><strong>${String.fromCharCode(65 + i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || [])
        .map((item, i) => `<p><strong>${i + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      const lineCount = question.enrichment ? 4 : 2;
      response = `<div class="response-lines">${Array.from({ length: lineCount }, () => "<span></span>").join("")}</div>`;
    }

    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}">
      <div class="question-line"><span class="question-number-text">${index + 1}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>
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

  function packOptionRows(doc, answers, width) {
    const labels = (answers || []).map((value, idx) => `[${String.fromCharCode(65 + idx)}] ${value}`);
    const rows = [];
    let row = [];
    let used = 0;
    labels.forEach((label) => {
      const itemWidth = doc.getTextWidth(label) + 8;
      if (row.length && used + itemWidth > width) {
        rows.push(row);
        row = [];
        used = 0;
      }
      row.push(label);
      used += itemWidth;
    });
    if (row.length) rows.push(row);
    return rows;
  }

  function measureQuestion(doc, question, width) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const promptWidth = width - 8 - (question.enrichment ? 25 : 0);
    const promptLines = wrap(doc, question.question, promptWidth);
    let height = Math.max(8, promptLines.length * 4.1 + 4);

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      height += wrap(doc, question.visual, width - 8).length * 3.8 + 1;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    if (question.type === "single") {
      height += packOptionRows(doc, question.answers, width - 8).length * 4.6 + 2;
    } else if (question.type === "fill-blank") {
      height += 6;
    } else if (question.type === "match") {
      height += Math.max(question.matchLeft?.length || 0, question.matchRight?.length || 0) * 4.2 + 5;
    } else {
      height += (question.enrichment ? 4 : 2) * 5.4 + 2;
    }

    return Math.max(question.enrichment ? 28 : 18, height + 2);
  }

  function paginate(doc, items, width, availableHeight) {
    const pages = [[]];
    let used = 0;
    const gap = 2.6;

    items.forEach((question, index) => {
      const height = measureQuestion(doc, question, width);
      const required = (pages[pages.length - 1].length ? gap : 0) + height;
      if (pages[pages.length - 1].length && used + required > availableHeight) {
        pages.push([]);
        used = 0;
      }
      pages[pages.length - 1].push({ question, number: index + 1, height });
      used += (pages[pages.length - 1].length > 1 ? gap : 0) + height;
    });

    return pages;
  }

  function drawWatermark(doc, pageW, pageH) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: 0.06 }));
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(36, 87, 214);
      [70, 135, 200, 255].forEach((y) => [55, 160].forEach((x) => {
        doc.text("SkillrHub F-10 • skillrhub.com", x, y, { align: "center", angle: 28 });
      }));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW, pageNumber, pageCount) {
    const margin = 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, 11);
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.7);
    doc.line(margin, 13.5, margin + 55, 13.5);

    doc.setFontSize(11.2);
    doc.setTextColor(23, 57, 104);
    doc.text("AC9MFN01 • Numbers to 20 Worksheet", margin, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(36, 87, 214);
    doc.text(`Page ${pageNumber} of ${pageCount} • skillrhub.com`, pageW - margin, 11, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(32, 48, 71);
    doc.text("Name: ______________________________", margin, 29.5);
    doc.text("Date: ______________", pageW - margin, 29.5, { align: "right" });

    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.4);
    doc.line(margin, 32.5, pageW - margin, 32.5);
    return 36;
  }

  function drawFooter(doc, pageW, pageH, pageNumber, pageCount) {
    const margin = 10;
    const y = pageH - 7;
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.35);
    doc.line(margin, pageH - 13, pageW - margin, pageH - 13);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(36, 87, 214);
    doc.text("SkillrHub F-10", margin, y - 2.6);
    doc.text("skillrhub.com", pageW - margin, y - 2.6, { align: "right" });

    if (pageCount > 1) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.3);
      doc.setTextColor(23, 57, 104);
      doc.text("Printing tip: choose double-sided (duplex) printing to use one sheet per student.", pageW / 2, y + 1.2, { align: "center" });
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.3);
    doc.setTextColor(23, 57, 104);
    doc.text(`Page ${pageNumber} of ${pageCount}`, pageW - margin, y + 1.2, { align: "right" });
  }

  function drawOuterBorder(doc, pageW, pageH) {
    doc.setDrawColor(36, 87, 214);
    doc.setLineWidth(0.55);
    doc.rect(5, 5, pageW - 10, pageH - 10);
  }

  function drawQuestion(doc, question, number, x, y, width, height) {
    const text = [32, 48, 71];
    const muted = [93, 108, 128];
    const blue = [36, 87, 214];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    doc.setTextColor(...text);
    doc.text(`${number}.`, x, y + 4.2);

    let promptX = x + 8;
    if (question.enrichment) {
      doc.setFontSize(7.1);
      doc.setTextColor(...blue);
      doc.text("ENRICHMENT", promptX, y + 4.2);
      promptX += 25;
      doc.setFontSize(10.2);
      doc.setTextColor(...text);
    }

    const promptLines = wrap(doc, question.question, x + width - promptX);
    doc.text(promptLines, promptX, y + 4.2);
    let cursor = y + 4.2 + promptLines.length * 4.1 + 1;

    if (question.visual) {
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      const visualLines = wrap(doc, question.visual, width - 8);
      doc.text(visualLines, x + 8, cursor);
      cursor += visualLines.length * 3.8 + 1;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    doc.setTextColor(...text);

    if (question.type === "single") {
      const rows = packOptionRows(doc, question.answers, width - 8);
      rows.forEach((row, rowIndex) => {
        let optionX = x + 8;
        const optionY = cursor + rowIndex * 4.6;
        row.forEach((label) => {
          doc.text(label, optionX, optionY);
          optionX += doc.getTextWidth(label) + 8;
        });
      });
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.1);
      doc.text(String(question.template || "").replaceAll("{{blank}}", "__________"), x + 8, cursor);
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      doc.setFontSize(8.9);
      for (let i = 0; i < count; i += 1) {
        const leftText = left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "";
        const rightText = right[i] !== undefined ? `${i + 1}. ${right[i]}` : "";
        doc.text(leftText, x + 8, cursor + i * 4.2);
        doc.text(rightText, x + width * 0.57, cursor + i * 4.2);
      }
      const lineY = cursor + count * 4.2 + 1;
      doc.setDrawColor(...muted);
      doc.line(x + 8, lineY, x + width - 4, lineY);
    } else {
      const lineCount = question.enrichment ? 4 : 2;
      doc.setDrawColor(...muted);
      for (let i = 0; i < lineCount; i += 1) {
        const lineY = cursor + i * 5.4;
        if (lineY < y + height - 1) doc.line(x + 8, lineY, x + width - 4, lineY);
      }
    }

    doc.setDrawColor(219, 228, 239);
    doc.setLineWidth(0.2);
    doc.line(x, y + height, x + width, y + height);
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
      const margin = 10;
      const contentWidth = pageW - margin * 2;
      const contentTop = 36;
      const contentBottom = pageH - 16;
      const availableHeight = contentBottom - contentTop;
      const pages = paginate(doc, questions, contentWidth, availableHeight);
      const pageCount = pages.length;

      pages.forEach((items, pageIndex) => {
        if (pageIndex > 0) doc.addPage("letter", "portrait");
        drawWatermark(doc, pageW, pageH);
        drawOuterBorder(doc, pageW, pageH);
        let y = drawHeader(doc, pageW, pageIndex + 1, pageCount);
        items.forEach((item) => {
          drawQuestion(doc, item.question, item.number, margin, y, contentWidth, item.height);
          y += item.height + 2.6;
        });
        drawFooter(doc, pageW, pageH, pageIndex + 1, pageCount);
      });

      doc.save("ac9mfn01-numbers-to-20-worksheet.pdf");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText || "Download PDF worksheet";
      }
    }
  }

  installLayout();
  renderPage();
  if (button) button.addEventListener("click", downloadPdf);
})();
