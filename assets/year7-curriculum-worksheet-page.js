(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-7\/(math|science|english)\/(ac9[mse]7[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const routeSubject = match[1].toLowerCase();
  const subject = routeSubject === "math" ? "maths" : routeSubject;
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const code = match[2].toUpperCase();
  const unit = window[`SkillrYear7${subjectName}Data`]?.[code];
  const worksheet = window[`SkillrYear7${subjectName}WorksheetData`]?.[code];
  if (!unit || !worksheet) return;

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[char]));
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
    if (document.getElementById("skillr-year7-worksheet-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year7-worksheet-style";
    style.textContent = `
      body{background:#f4f7fb}.worksheet-shell{max-width:1120px;margin:0 auto;padding:18px}.worksheet-nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.worksheet-nav a{color:#2457d6;font-weight:800;text-decoration:none}.worksheet-hero{border:1px solid #d8e2ef;border-radius:18px;background:#fff;padding:20px;box-shadow:0 8px 24px rgba(28,55,91,.08)}.worksheet-hero h1{font-size:clamp(1.45rem,3vw,2.05rem);margin:.25rem 0}.worksheet-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.worksheet-meta span{border:1px solid #d7e3fb;background:#f7faff;border-radius:999px;padding:6px 9px;font-size:.82rem;font-weight:800}.worksheet-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.worksheet-actions a,.worksheet-actions button{border:0;border-radius:12px;padding:10px 14px;font-weight:900;text-decoration:none;cursor:pointer}.worksheet-actions .primary{background:#2457d6;color:#fff}.worksheet-actions .secondary{background:#173968;color:#fff}.worksheet-actions a{background:#edf2f7;color:#173968}.worksheet-print-tip{margin-top:10px;color:#5d6c80;font-size:.9rem}.brandbar{display:flex;justify-content:space-between;gap:12px;align-items:center}.brandmark{font-weight:900;color:#2457d6}.brandmark span{color:#173968}.worksheet-paper{position:relative;overflow:hidden;background:#fff;border:1.5px solid #2457d6!important}.worksheet-paper+.worksheet-paper{margin-top:18px}.worksheet-extension{border-style:dashed!important}.worksheet-question{break-inside:avoid}.worksheet-question .question-line{display:flex;align-items:flex-start;gap:6px}.worksheet-question .question-prompt{margin:0;flex:1}.question-number-text{font-weight:900;color:#173968}.worksheet-options{display:flex!important;flex-wrap:wrap;gap:8px 14px;margin:6px 0}.worksheet-options span{white-space:normal}.fill-template{font-weight:800;color:#173968;margin:6px 0}.blank-line{display:inline-block;min-width:62px;border-bottom:2px solid #5d6c80}.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.match-grid p{margin:3px 0}.response-lines span{display:block;height:22px;border-bottom:1px solid #93a4ba}.watermark-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none;z-index:0}.watermark-grid span{display:grid;place-items:center;transform:rotate(-24deg);font-weight:900;color:rgba(36,87,214,.052);font-size:.72rem}.worksheet-paper>*:not(.watermark-grid){position:relative;z-index:1}.extension-note{margin:6px 0 10px;color:#5d6c80;font-size:.9rem;font-weight:700}.worksheet-paper__head h2{font-size:1.14rem}.reasoning-reminder{margin:0 0 9px;border-left:4px solid #2457d6;background:#eef5ff;padding:7px 9px;border-radius:8px;font-size:.84rem;font-weight:750;color:#173968}@media(max-width:650px){.worksheet-shell{padding:10px}.match-grid{grid-template-columns:1fr}.brandbar{display:block}.brandbar small{display:block;margin-top:4px}}@media print{body{background:#fff!important}.worksheet-extension{break-before:page;page-break-before:always}.worksheet-actions,.worksheet-nav,.worksheet-hero{display:none!important}.worksheet-paper+.worksheet-paper{margin-top:0}.worksheet-paper{box-shadow:none!important;background:#fff!important}}
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
      response = `<div class="response-lines">${Array.from({ length: question.enrichment ? 10 : 5 }, () => "<span></span>").join("")}</div>`;
    }
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${index + 1}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${response}</article>`;
  }

  const watermark = () => `<div class="watermark-grid" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div>`;
  const paperHeader = (title, subtitle = "Name: ____________________ &nbsp;&nbsp; Date: ____________") => `<div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${title}</h2></div><p>${subtitle}</p></div>`;

  function evidenceReminder() {
    if (subject === "maths") return "Show structure and an efficient strategy. State units or constraints and verify with an estimate, inverse, property or alternate representation.";
    if (subject === "science") return "Use observations, measurements, models and method evidence. Separate finding from explanation and limit conclusions to the evidence.";
    return "Use precise language, structural, visual or textual evidence. Explain how each feature shapes meaning for audience, purpose and context.";
  }

  function renderScreen() {
    const core = worksheet.questions.filter((question) => !question.enrichment);
    const enrichment = worksheet.questions.filter((question) => question.enrichment);
    document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/year7/curriculum/${subject}/">Year 7 ${subjectName}</a><a href="/year7/${subject}/${unit.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Year 7 ${subjectName} • Student Worksheets</small></div><p class="eyebrow">${code} • Year 7 ${subjectName}</p><h1>${esc(worksheet.title)} Worksheets</h1><p>Worksheet 1 checks the core visual model and reasoning. Broad curriculum codes automatically receive connected application and mixed-mastery worksheets.</p><div class="worksheet-meta"><span>8 core questions</span><span>2 separate enrichment questions</span><span>Additional strand worksheets where needed</span><span>US Letter portrait</span><span>Preview before download</span></div><div class="worksheet-actions"><button class="primary" id="previewCorePdfButton" type="button">Preview Worksheet 1 — Core</button><button class="secondary" id="previewExtensionPdfButton" type="button">Preview enrichment extension</button><a href="/year7/${subject}/${unit.slug}/">Back to topic</a><a href="/quiz/year-7/${routeSubject}/${code.toLowerCase()}/practice/">Open Practice</a></div><div class="worksheet-print-tip">A worksheet may continue to a second page to preserve readable type and sufficient reasoning space. Use double-sided printing where suitable.</div></header><main id="worksheetRoot"><section class="worksheet-paper worksheet-core worksheet-core-paper">${watermark()}${paperHeader(`${code} — ${esc(worksheet.title)}`)}<p class="reasoning-reminder">${esc(evidenceReminder())}</p><section class="core-grid">${core.map((question, i) => renderQuestion(question, i)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Year 7 ${subjectName} Core Worksheet</span><span>skillrhub.com</span></footer></section><section class="worksheet-paper worksheet-extension">${watermark()}${paperHeader(`${code} — Enrichment Extension`, "Optional reasoning, investigation and creation challenges")}<p class="extension-note">Use this extension for students ready to generalise, critique, design, evaluate or compare beyond the core model.</p><section class="enrichment-grid">${enrichment.map((question, i) => renderQuestion(question, i + core.length)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Optional Enrichment Extension</span><span>skillrhub.com</span></footer></section></main></div>`;
  }

  function wrap(doc, text, width) {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  }

  function drawQuestion(doc, question, number, x, y, width) {
    doc.setTextColor(32,48,71); doc.setFont("helvetica","bold"); doc.setFontSize(9.7);
    const lines = wrap(doc, `${number}. ${question.enrichment ? "ENRICHMENT — " : ""}${question.question}`, width); doc.text(lines,x,y);
    let cursor = y + lines.length * 4.5 + 2; doc.setFont("helvetica","normal"); doc.setFontSize(8.7);
    if (question.type === "single") {
      const options = (question.answers || []).map((answer,i)=>`[${String.fromCharCode(65+i)}] ${answer}`).join("   ");
      const optionLines = wrap(doc,options,width-5); doc.text(optionLines,x+5,cursor); cursor += optionLines.length*4.3+3;
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica","bold"); const fillLines=wrap(doc,String(question.template||"").replaceAll("{{blank}}","__________"),width-5); doc.text(fillLines,x+5,cursor); cursor+=fillLines.length*4.3+3;
    } else if (question.type === "match") {
      const left=question.matchLeft||[],right=question.matchRight||[],count=Math.max(left.length,right.length);
      for(let i=0;i<count;i++){doc.text(left[i]!==undefined?`${String.fromCharCode(65+i)}. ${left[i]}`:"",x+5,cursor+i*4.7);doc.text(right[i]!==undefined?`${i+1}. ${right[i]}`:"",x+width*.56,cursor+i*4.7);} cursor+=count*4.7+5; doc.line(x+5,cursor,x+width-5,cursor); cursor+=3;
    } else {
      const count=question.enrichment?10:5; doc.setDrawColor(120,136,157); for(let i=0;i<count;i++) doc.line(x+5,cursor+i*5.6,x+width-5,cursor+i*5.6); cursor+=count*5.6+2;
    }
    doc.setDrawColor(219,228,239); doc.line(x,cursor,x+width,cursor); return cursor+4;
  }

  async function previewPdf(mode) {
    if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const extension = mode === "extension";
    const button = document.getElementById(extension ? "previewExtensionPdfButton" : "previewCorePdfButton");
    const original = button?.textContent;
    if (button) { button.disabled = true; button.textContent = "Preparing preview..."; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"letter",compress:true});
      const pageW=doc.internal.pageSize.getWidth(),pageH=doc.internal.pageSize.getHeight(),margin=10,width=pageW-margin*2;
      const all=worksheet.questions,questions=extension?all.filter(q=>q.enrichment):all.filter(q=>!q.enrichment),start=extension?all.filter(q=>!q.enrichment).length+1:1;
      let y=38,pageNumber=1;
      const header=()=>{doc.setDrawColor(36,87,214);doc.setLineWidth(.55);doc.rect(5,5,pageW-10,pageH-10);doc.setFont("helvetica","bold");doc.setFontSize(17);doc.setTextColor(36,87,214);doc.text("SkillrHub F-10",margin,12);doc.setFontSize(10.5);doc.setTextColor(23,57,104);doc.text(`${code} • ${worksheet.title} ${extension?"Enrichment":"Core"}`,margin,21);doc.setFontSize(9);doc.text(extension?"Optional extension":"Name: ______________________________",margin,29);doc.text(extension?`Page ${pageNumber}`:"Date: ______________",pageW-margin,29,{align:"right"});doc.setFont("helvetica","normal");doc.setFontSize(7.2);doc.text(evidenceReminder(),margin,34,{maxWidth:width});doc.line(margin,36,pageW-margin,36);};
      const footer=()=>{doc.setDrawColor(36,87,214);doc.line(margin,pageH-13,pageW-margin,pageH-13);doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(36,87,214);doc.text(`SkillrHub F-10 • Year 7 ${subjectName} ${extension?"Enrichment":"Core"}`,margin,pageH-8);doc.text("skillrhub.com",pageW-margin,pageH-8,{align:"right"});};
      header();
      questions.forEach((question,index)=>{const estimate=32+(question.enrichment?42:0)+(question.type==="match"?12:0);if(y+estimate>pageH-18){footer();doc.addPage("letter","portrait");pageNumber++;y=38;header();}y=drawQuestion(doc,question,start+index,margin,y,width);});
      footer();
      const blob=doc.output("blob"),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.target="_blank";link.rel="noopener";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),120000);
    } finally {
      if (button) { button.disabled=false; button.textContent=original || (extension?"Preview enrichment extension":"Preview Worksheet 1 — Core"); }
    }
  }

  ensureStyles();
  document.title = `${code} ${worksheet.title} Worksheets | SkillrHub`;
  const meta=document.querySelector('meta[name="description"]');
  if(meta) meta.content=`${code} Year 7 ${subjectName} worksheets with core, enrichment and connected-strand sheets where required.`;
  renderScreen();
  document.getElementById("previewCorePdfButton")?.addEventListener("click",()=>previewPdf("core"));
  document.getElementById("previewExtensionPdfButton")?.addEventListener("click",()=>previewPdf("extension"));
})();
