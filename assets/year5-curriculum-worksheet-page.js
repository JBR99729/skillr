(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-5\/(math|science|english)\/(ac9[mse]5[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;

  const routeSubject = match[1].toLowerCase();
  const subject = routeSubject === "math" ? "maths" : routeSubject;
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const code = match[2].toUpperCase();
  const unit = window[`SkillrYear5${subjectName}Data`]?.[code];
  const worksheet = window[`SkillrYear5${subjectName}WorksheetData`]?.[code];
  const commercialMaster = worksheet?.commercial_master;
  if (!unit || !worksheet) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const requestedSheet = new URLSearchParams(location.search).get("sheet");
  const sheetKey = requestedSheet === "topic-practice-2" ? "topic-practice-2" : "topic-practice-1";
  const partitions = Object.fromEntries(commercialMaster.sheets.map(sheet=>[sheet.id,sheet.questionIds.map(id=>commercialMaster.questions.find(question=>question.id===id))]));
  const activeQuestions = partitions[sheetKey];
  const sheetNumber = sheetKey.endsWith("2") ? 2 : 1;
  const loadScript = (src) => new Promise((resolve, reject) => {
    const base = src.split("?")[0];
    const existing = [...document.scripts].find((script) => script.src.includes(base));
    if (existing) { setTimeout(resolve, 100); return; }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  function ensureStyles() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("foundation-authored-worksheet.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/quiz/assets/foundation-authored-worksheet.css?v=2";
      document.head.appendChild(link);
    }
    if (document.getElementById("skillr-year5-worksheet-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year5-worksheet-style";
    style.textContent = `
      body{background:#f4f7fb}.worksheet-shell{max-width:1100px;margin:0 auto;padding:18px}.worksheet-nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.worksheet-nav a{color:#2457d6;font-weight:800;text-decoration:none}.worksheet-hero{border:1px solid #d8e2ef;border-radius:18px;background:#fff;color:#203047;padding:20px}.worksheet-hero h1,.worksheet-hero .brandbar,.worksheet-hero .worksheet-meta{color:#173968}.brandbar,.paper-brand{display:flex;align-items:center;gap:10px}.brand-logo{width:42px;height:42px;border-radius:9px}.worksheet-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.worksheet-meta span{border:1px solid #d7e3fb;background:#f7faff;color:#173968;border-radius:999px;padding:6px 9px;font-size:.82rem;font-weight:800}.worksheet-actions{display:flex;flex-wrap:wrap;gap:8px}.worksheet-actions a,.worksheet-actions button{border:0;border-radius:12px;padding:10px 14px;font-weight:900;text-decoration:none}.worksheet-actions .primary{background:#2457d6;color:#fff}.worksheet-actions a{background:#edf2f7;color:#173968}.worksheet-paper{position:relative;background:#fff;border:1.5px solid #2457d6!important;margin-top:18px;padding:12mm;max-width:210mm;min-height:297mm;margin-inline:auto}.tier-heading{color:#173968;border-bottom:2px solid #2457d6;padding-bottom:4px}.worksheet-question{break-inside:avoid;margin-bottom:8px}.question-line{display:flex;gap:6px}.question-prompt{margin:0;flex:1}.question-number-text{font-weight:900}.worksheet-options{display:flex;flex-wrap:wrap;gap:8px 14px;margin:6px 0}.fill-template{font-weight:800}.blank-line{display:inline-block;min-width:62px;border-bottom:2px solid #5d6c80}.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.response-lines span{display:block;height:21px;border-bottom:1px solid #93a4ba}.answer-card{break-inside:avoid;border:1px solid #d8e2ef;border-radius:9px;padding:8px;margin:7px 0}.answer-card p{margin:3px 0}.watermark-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none}.watermark-grid span{display:grid;place-items:center;transform:rotate(-24deg);font-weight:900;color:rgba(36,87,214,.04);font-size:.72rem}.worksheet-paper>*:not(.watermark-grid){position:relative}.reasoning-reminder{border-left:4px solid #2457d6;background:#eef5ff;padding:7px 9px}@media(max-width:650px){.worksheet-shell{padding:10px}.match-grid{grid-template-columns:1fr}}@media print{@page{size:A4;margin:10mm}body{background:#fff}.worksheet-actions,.worksheet-nav,.worksheet-hero{display:none!important}.worksheet-paper{border:0!important;margin:0;min-height:auto;page-break-after:always}.answer-key{display:block}}
      .sheet-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.sheet-tab{border-radius:12px;padding:10px 14px;font-weight:900;text-decoration:none;background:#edf2f7;color:#173968}.sheet-tab[aria-current="page"]{background:#2457d6;color:#fff}.worksheet-paper{max-width:297mm;min-height:210mm;padding:10mm}.worksheet-options{flex-flow:row nowrap}.worksheet-options span{flex:1;min-width:0}.response-lines span{height:18px}@media(max-width:650px){.worksheet-options{flex-wrap:wrap}.worksheet-options span{flex:1 1 44%}}@media print{@page{size:A4 landscape;margin:8mm}body{font-size:9.5pt}.worksheet-paper{padding:5mm}.worksheet-options{flex-flow:row nowrap}.response-lines span{height:14px}}
    `;
    document.head.appendChild(style);
  }

  function renderQuestion(question, index) {
    let response = "";
    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || []).map((answer, i) => `<span><strong>[${String.fromCharCode(65 + i)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    } else if (question.type === "fill-blank") {
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || []).map((item, i) => `<p><strong>${String.fromCharCode(65 + i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item, i) => `<p><strong>${i + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      response = `<div class="response-lines">${Array.from({ length: question.enrichment ? 9 : 4 }, () => "<span></span>").join("")}</div>`;
    }
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${index + 1}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${response}</article>`;
  }

  const watermark = () => `<div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div>`;
  const logo = '<img class="brand-logo" src="/icons/apple-touch-icon.png" alt="SkillrHub logo">';
  const paperHeader = (title, subtitle = "Name: ____________________ &nbsp;&nbsp; Date: ____________") => `<div class="worksheet-paper__head"><div><p class="paper-brand">${logo}<strong>SkillrHub F–10</strong></p><h2>${title}</h2></div><p>${subtitle}</p></div>`;

  function evidenceReminder() {
    if (subject === "maths") return "Show an efficient representation or strategy, state units or constraints where relevant, and verify using estimation, an inverse or another representation.";
    if (subject === "science") return "Use observations, measurements, models and fair-test reasoning. Separate evidence from explanation and limit conclusions to the investigation.";
    return "Use specific language, structural, visual or textual evidence. Explain how the feature shapes meaning for audience and purpose.";
  }

  function renderScreen() {
    if(subject==="science") document.body.dataset.topicPracticePair="true";
    const groups = [["Warm-Up",activeQuestions.filter(q=>q.tier==="warm-up")],["Core Practice",activeQuestions.filter(q=>q.tier==="core")],["Extension / Challenge",activeQuestions.filter(q=>q.tier==="challenge")]].filter(([,items])=>items.length);
    const questionsHtml = groups.map(([label,items])=>`<h3 class="tier-heading">${label}</h3>${items.map((question)=>renderQuestion(question,activeQuestions.indexOf(question))).join("")}`).join("");
    const answers = activeQuestions.map((question,index)=>`<article class="answer-card"><strong>${index+1}. ${esc(question.answer)}</strong><p><b>Summary:</b> ${esc(question.summary)}</p><p><b>Hint:</b> ${esc(question.hint)}</p></article>`).join("");
    const base=`/quiz/year-5/${routeSubject}/${code.toLowerCase()}/worksheet/`;
    document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/year5/curriculum/${subject}/">Year 5 ${subjectName}</a><a href="/year5/${subject}/${unit.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar">${logo}<strong>SkillrHub F–10</strong><small>Year 5 ${subjectName} • Topic Practice ${sheetNumber}</small></div><h1>${esc(worksheet.title)} — Topic Practice ${sheetNumber}</h1><nav class="sheet-tabs" aria-label="Topic practice sheets"><a class="sheet-tab" aria-current="${sheetNumber===1?"page":"false"}" href="${base}?sheet=topic-practice-1">Topic Practice 1 (5)</a><a class="sheet-tab" aria-current="${sheetNumber===2?"page":"false"}" href="${base}?sheet=topic-practice-2">Topic Practice 2 (4)</a></nav><div class="worksheet-meta"><span>${activeQuestions.length} questions on this sheet</span><span>Combined: 3 Warm-Up • 4 Core • 2 Challenge</span><span>A4 landscape</span></div><div class="worksheet-actions"><button class="primary" id="previewCorePdfButton" type="button">Preview Topic Practice ${sheetNumber} PDF</button><a href="/year5/${subject}/${unit.slug}/">Back to topic</a><a href="/worksheets/year5/${subject}/teacher-slides/live.html?code=${code}">Teacher slides</a></div></header><main id="worksheetRoot"><section class="worksheet-paper">${watermark()}${paperHeader(`${code} — Topic Practice ${sheetNumber}: ${esc(worksheet.title)}`)}<div id="skillr-worksheet-concept-picture" class="worksheet-model">${unit.model_html}</div><p class="reasoning-reminder">${esc(evidenceReminder())}</p>${questionsHtml}</section><section class="worksheet-paper answer-key">${paperHeader(`${code} — Topic Practice ${sheetNumber} Answer Key`,"Teacher copy for this sheet only")} ${answers}</section></main></div>`;
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawQuestion(doc, question, number, x, y, width) {
    doc.setTextColor(32, 48, 71);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const lines = wrap(doc, `${number}. ${question.enrichment ? "ENRICHMENT — " : ""}${question.question}`, width);
    doc.text(lines, x, y);
    let cursor = y + lines.length * 4.6 + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    if (question.type === "single") {
      const options = (question.answers || []).map((answer, i) => `[${String.fromCharCode(65 + i)}] ${answer}`).join("   ");
      const optionLines = wrap(doc, options, width - 5);
      doc.text(optionLines, x + 5, cursor);
      cursor += optionLines.length * 4.4 + 3;
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica", "bold");
      const fillLines = wrap(doc, String(question.template || "").replaceAll("{{blank}}", "__________"), width - 5);
      doc.text(fillLines, x + 5, cursor);
      cursor += fillLines.length * 4.4 + 3;
    } else if (question.type === "match") {
      const left = question.matchLeft || [];
      const right = question.matchRight || [];
      const count = Math.max(left.length, right.length);
      for (let i = 0; i < count; i++) {
        doc.text(left[i] !== undefined ? `${String.fromCharCode(65 + i)}. ${left[i]}` : "", x + 5, cursor + i * 4.7);
        doc.text(right[i] !== undefined ? `${i + 1}. ${right[i]}` : "", x + width * .56, cursor + i * 4.7);
      }
      cursor += count * 4.7 + 5;
      doc.line(x + 5, cursor, x + width - 5, cursor);
      cursor += 3;
    } else {
      const count = question.enrichment ? 9 : 4;
      doc.setDrawColor(120, 136, 157);
      for (let i = 0; i < count; i++) doc.line(x + 5, cursor + i * 5.7, x + width - 5, cursor + i * 5.7);
      cursor += count * 5.7 + 2;
    }

    doc.setDrawColor(219, 228, 239);
    doc.line(x, cursor, x + width, cursor);
    return cursor + 4;
  }

  async function previewPdf(mode) {
    if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const extension = mode === "extension";
    const button = document.getElementById(extension ? "previewExtensionPdfButton" : "previewCorePdfButton");
    const original = button?.textContent;
    if (button) { button.disabled = true; button.textContent = "Preparing preview..."; }

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation:"landscape", unit:"mm", format:"a4", compress:true });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 10;
      const width = pageW - margin * 2;
      const all = activeQuestions;
      const questions = activeQuestions;
      const start = 1;
      let y = 37;
      let pageNumber = 1;

      const header = () => {
        doc.setDrawColor(36,87,214);
        doc.setLineWidth(.55);
        doc.rect(5,5,pageW-10,pageH-10);
        doc.setFont("helvetica","bold");
        doc.setFontSize(17);
        doc.setTextColor(36,87,214);
        doc.text("SkillrHub F-10",margin,12);
        doc.setFontSize(11);
        doc.setTextColor(23,57,104);
        doc.text(`${code} • ${worksheet.title} ${extension ? "Enrichment" : "Core"}`,margin,21);
        doc.setFontSize(9);
        doc.text(extension ? "Optional extension" : "Name: ______________________________",margin,29);
        doc.text(extension ? `Page ${pageNumber}` : "Date: ______________",pageW-margin,29,{align:"right"});
        doc.setFont("helvetica","normal");
        doc.setFontSize(7.6);
        doc.text(evidenceReminder(),margin,34,{maxWidth:width});
        doc.line(margin,35.5,pageW-margin,35.5);
      };

      const footer = () => {
        doc.setDrawColor(36,87,214);
        doc.line(margin,pageH-13,pageW-margin,pageH-13);
        doc.setFont("helvetica","bold");
        doc.setFontSize(8);
        doc.setTextColor(36,87,214);
        doc.text(`SkillrHub F-10 • Year 5 ${subjectName} ${extension ? "Enrichment" : "Core"}`,margin,pageH-8);
        doc.text("skillrhub.com",pageW-margin,pageH-8,{align:"right"});
      };

      header();
      questions.forEach((question,index) => {
        const estimate = 28 + (question.enrichment ? 36 : 0) + (question.type === "match" ? 11 : 0);
        if (y + estimate > pageH - 18) {
          footer();
          doc.addPage("a4","landscape");
          pageNumber++;
          y = 37;
          header();
        }
        y = drawQuestion(doc, question, start + index, margin, y, width);
      });
      footer();

      doc.addPage("a4","landscape");
      pageNumber++;
      header();
      y = 41;
      doc.setFont("helvetica","bold"); doc.setFontSize(15); doc.setTextColor(23,57,104); doc.text("Answer Key",margin,y); y += 8;
      all.forEach((question,index) => {
        doc.setFontSize(8.5); doc.setFont("helvetica","bold");
        const answerLines = wrap(doc,`${index+1}. ${question.answer}`,width); doc.text(answerLines,margin,y); y += answerLines.length*4+1;
        doc.setFont("helvetica","normal");
        const summaryLines = wrap(doc,`Summary: ${question.summary}`,width); doc.text(summaryLines,margin,y); y += summaryLines.length*3.8;
        const hintLines = wrap(doc,`Hint: ${question.hint}`,width); doc.text(hintLines,margin,y); y += hintLines.length*3.8+3;
        if(y>pageH-20){footer();doc.addPage("a4","landscape");pageNumber++;header();y=41;}
      });
      footer();

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = original || (extension ? "Preview enrichment extension" : "Preview Worksheet 1 — Core");
      }
    }
  }

  ensureStyles();
  document.title = `${code} ${worksheet.title} Worksheets | SkillrHub`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = `${code} Year 5 ${subjectName} worksheets with core, enrichment and additional connected-strand sheets where required.`;
  renderScreen();
  document.getElementById("previewCorePdfButton")?.addEventListener("click", () => previewPdf("core"));
  document.getElementById("previewExtensionPdfButton")?.addEventListener("click", () => previewPdf("extension"));
})();
