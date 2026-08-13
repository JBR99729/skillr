(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-3\/math\/(ac9m3[a-z0-9]+)\/worksheet\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  const loadScript = (src) => new Promise((resolve, reject) => {
    const base = src.split("?")[0];
    const existing = [...document.scripts].find((script) => script.src.includes(base));
    if (existing) { setTimeout(resolve,100); return; }
    const script = document.createElement("script");
    script.src = src; script.async = false; script.onload = resolve; script.onerror = reject;
    document.head.appendChild(script);
  });

  function ensureCss() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("foundation-authored-worksheet.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet"; link.href = "/quiz/assets/foundation-authored-worksheet.css?v=2"; document.head.appendChild(link);
    }
    if (document.getElementById("skillr-year3-worksheet-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-year3-worksheet-css";
    style.textContent = `
      body{background:#f4f7fb}.worksheet-shell{max-width:1060px;margin:0 auto;padding:18px}.worksheet-nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.worksheet-nav a{color:#2457d6;font-weight:800;text-decoration:none}.worksheet-hero{border:1px solid #d8e2ef;border-radius:18px;background:#fff;padding:20px;box-shadow:0 8px 24px rgba(28,55,91,.08)}.worksheet-hero h1{font-size:clamp(1.45rem,3vw,2rem);margin:.25rem 0}.worksheet-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.worksheet-meta span{border:1px solid #d7e3fb;background:#f7faff;border-radius:999px;padding:6px 9px;font-size:.82rem;font-weight:800}.worksheet-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.worksheet-actions a,.worksheet-actions button{border:0;border-radius:12px;padding:10px 14px;font-weight:900;text-decoration:none;cursor:pointer}.worksheet-actions .primary{background:#2457d6;color:#fff}.worksheet-actions .secondary{background:#173968;color:#fff}.worksheet-actions a{background:#edf2f7;color:#173968}.worksheet-print-tip{margin-top:10px;color:#5d6c80;font-size:.9rem}.brandbar{display:flex;justify-content:space-between;gap:12px;align-items:center}.brandmark{display:flex;align-items:center;gap:8px;font-weight:900;color:#2457d6}.brandmark img{width:38px;height:38px}.brandmark span{color:#173968}.worksheet-paper{position:relative;overflow-wrap:anywhere;background:#fff;border:1.5px solid #2457d6!important}.worksheet-question{break-inside:avoid;page-break-inside:avoid}.tier-heading{margin:18px 0 8px;color:#173968;border-bottom:2px solid #d7e3fb;break-after:avoid;page-break-after:avoid}.worksheet-question .question-line{display:flex;align-items:flex-start;gap:6px}.worksheet-question .question-prompt{margin:0;flex:1}.question-number-text{font-weight:900;color:#173968}.worksheet-options{display:flex!important;flex-wrap:wrap;gap:8px 14px;margin:6px 0}.worksheet-options span{white-space:normal}.fill-template{font-weight:800;color:#173968;margin:6px 0}.blank-line{display:inline-block;min-width:58px;border-bottom:2px solid #5d6c80}.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.match-grid p{margin:3px 0}.response-lines span{display:block;height:18px;border-bottom:1px solid #93a4ba}.watermark-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(5,1fr);pointer-events:none;z-index:0}.watermark-grid span{display:grid;place-items:center;transform:rotate(-24deg);font-weight:900;color:rgba(36,87,214,.05);font-size:.72rem}.worksheet-paper>*:not(.watermark-grid){position:relative;z-index:1}.answer-key{break-before:page;page-break-before:always}.answer-key li{margin-bottom:10px;break-inside:avoid;page-break-inside:avoid}.answer-key p{margin:2px 0}.worksheet-paper__head h2{font-size:1.14rem}@media(max-width:650px){.worksheet-shell{padding:10px}.match-grid{grid-template-columns:1fr}.brandbar{display:block}.brandbar small{display:block;margin-top:4px}}@page{size:A4 portrait;margin:12mm}@media print{html,body{width:210mm}body{background:#fff!important;font-size:10.5pt}.worksheet-actions,.worksheet-nav,.worksheet-hero{display:none!important}.worksheet-paper{box-shadow:none!important;background:#fff!important;max-width:186mm;margin:0 auto;border-width:1px!important}.worksheet-options,.match-grid{max-width:100%}.brandmark img{max-width:12mm;max-height:12mm}}
    `;
    document.head.appendChild(style);
  }

  function renderQuestion(question, index) {
    let response = "";
    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || []).map((answer, i) => `<span><strong>[${String.fromCharCode(65+i)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    } else if (question.type === "fill-blank") {
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}",'<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || []).map((item,i)=>`<p><strong>${String.fromCharCode(65+i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item,i)=>`<p><strong>${i+1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      response = `<div class="response-lines">${Array.from({length:question.enrichment?6:3},()=>"<span></span>").join("")}</div>`;
    }
    return `<article class="worksheet-question${question.enrichment?" enrichment":""}"><div class="question-line"><span class="question-number-text">${index+1}.</span>${question.enrichment?'<span class="enrichment-label">Enrichment</span>':""}<p class="question-prompt">${esc(question.question)}</p></div>${response}</article>`;
  }

  const watermark = () => `<div class="watermark-grid" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div>`;
  const paperHeader = (title, subtitle="Name: ____________________ &nbsp;&nbsp; Date: ____________") => `<div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${title}</h2></div><p>${subtitle}</p></div>`;

  function renderScreen(unit, worksheet) {
    const tiers=[["warm-up","Tier 1: Warm-Up"],["core","Tier 2: Core Practice"],["extension","Tier 3: Extension / Challenge"]];
    const questions=tiers.map(([key,label])=>`<h2 class="tier-heading">${label}</h2>${worksheet.questions.map((q,i)=>q.tier===key?renderQuestion(q,i):"").join("")}`).join("");
    const answers=worksheet.questions.map((q,i)=>`<li><strong>${i+1}. ${esc(q.answer)}</strong><p>Summary: ${esc(q.summary)}</p><p>Hint: ${esc(q.hint)}</p></li>`).join("");
    document.body.innerHTML = `<div class="worksheet-shell"><nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/year3/curriculum/maths/">Year 3 Maths</a><a href="/year3/maths/${unit.slug}/">${code} topic</a></nav><header class="worksheet-hero"><div class="brandbar"><div class="brandmark"><img src="/icons/icon-192.png" alt="SkillrHub logo">SkillrHub <span>F–10</span></div><small>Year 3 Maths • Student Worksheet</small></div><p class="eyebrow">${code} • Year 3 Maths</p><h1>${esc(worksheet.title)} Practice Sheet</h1><p>Nine questions aligned only to this curriculum code and independent from Practice and Test.</p><div class="worksheet-meta"><span>3 Warm-Up</span><span>4 Core Practice</span><span>2 Extension</span><span>Answer key included</span></div><div class="worksheet-actions"><button class="primary" onclick="window.print()" type="button">Print practice sheet</button><a href="/year3/maths/${unit.slug}/">Back to topic</a><a href="/worksheets/year3/maths/teacher-slides/live.html?code=${code}">Teacher slides</a><a href="/quiz/year-3/math/${code.toLowerCase()}/practice/">Open Practice</a><a href="/quiz/year-3/math/${code.toLowerCase()}/test/">Open Test</a></div></header><main id="worksheetRoot"><section class="worksheet-paper">${watermark()}${paperHeader(`${code} — ${esc(worksheet.title)}`)}${questions}<footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Year 3 Maths Practice Sheet</span><span>skillrhub.com</span></footer></section><section class="worksheet-paper answer-key">${paperHeader(`${code} — Answer Key`,"Teacher / self-check copy")}<ol>${answers}</ol></section></main></div>`;
  }

  function wrap(doc,text,width){const lines=doc.splitTextToSize(String(text??""),width);return Array.isArray(lines)?lines:[String(lines)];}

  function drawPdfQuestion(doc, question, number, x, y, width) {
    doc.setTextColor(32,48,71); doc.setFont("helvetica","bold"); doc.setFontSize(10);
    const prefix = `${number}. ${question.enrichment ? "ENRICHMENT — " : ""}${question.question}`;
    const lines = wrap(doc,prefix,width); doc.text(lines,x,y);
    let cursor = y + lines.length*4.5 + 2; doc.setFont("helvetica","normal"); doc.setFontSize(9);
    if (question.type === "single") {
      const options=(question.answers||[]).map((answer,i)=>`[${String.fromCharCode(65+i)}] ${answer}`).join("   ");
      const optionLines=wrap(doc,options,width-5); doc.text(optionLines,x+5,cursor); cursor += optionLines.length*4.3+3;
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica","bold"); const fillLines=wrap(doc,String(question.template||"").replaceAll("{{blank}}","__________"),width-5); doc.text(fillLines,x+5,cursor); cursor += fillLines.length*4.3+3;
    } else if (question.type === "match") {
      const left=question.matchLeft||[], right=question.matchRight||[], count=Math.max(left.length,right.length);
      for(let i=0;i<count;i++){doc.text(left[i]!==undefined?`${String.fromCharCode(65+i)}. ${left[i]}`:"",x+5,cursor+i*4.5);doc.text(right[i]!==undefined?`${i+1}. ${right[i]}`:"",x+width*.56,cursor+i*4.5);}
      cursor += count*4.5+5; doc.line(x+5,cursor,x+width-5,cursor); cursor+=3;
    } else {
      const count=question.enrichment?6:3; doc.setDrawColor(120,136,157);
      for(let i=0;i<count;i++) doc.line(x+5,cursor+i*5.5,x+width-5,cursor+i*5.5);
      cursor += count*5.5+2;
    }
    doc.setDrawColor(219,228,239); doc.line(x,cursor,x+width,cursor); return cursor+4;
  }

  async function previewPdf(worksheet, mode) {
    if (!window.jspdf?.jsPDF) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const extension = mode === "extension";
    const button=document.getElementById(extension?"previewExtensionPdfButton":"previewCorePdfButton"), original=button?.textContent;
    if(button){button.disabled=true;button.textContent="Preparing preview...";}
    try {
      const {jsPDF}=window.jspdf;
      const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4",compress:true});
      const pageW=doc.internal.pageSize.getWidth(), pageH=doc.internal.pageSize.getHeight(), margin=10, width=pageW-margin*2;
      const all=worksheet.questions, questions=extension?all.filter(q=>q.enrichment):all.filter(q=>!q.enrichment), start=extension?all.filter(q=>!q.enrichment).length+1:1;
      let y=34, pageNumber=1;
      const header=()=>{doc.setDrawColor(36,87,214);doc.setLineWidth(.55);doc.rect(5,5,pageW-10,pageH-10);doc.setFont("helvetica","bold");doc.setFontSize(17);doc.setTextColor(36,87,214);doc.text("SkillrHub F-10",margin,12);doc.setFontSize(11);doc.setTextColor(23,57,104);doc.text(`${code} • ${worksheet.title} ${extension?"Enrichment":"Core"}`,margin,21);doc.setFontSize(9);doc.text(extension?"Optional extension":"Name: ______________________________",margin,29);doc.text(extension?`Page ${pageNumber}`:"Date: ______________",pageW-margin,29,{align:"right"});doc.line(margin,31.5,pageW-margin,31.5);};
      const footer=()=>{doc.setDrawColor(36,87,214);doc.line(margin,pageH-13,pageW-margin,pageH-13);doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(36,87,214);doc.text(`SkillrHub F-10 • Year 3 Maths ${extension?"Enrichment":"Core"}`,margin,pageH-8);doc.text("skillrhub.com",pageW-margin,pageH-8,{align:"right"});};
      header();
      questions.forEach((question,index)=>{const estimate=24+(question.enrichment?24:0)+(question.type==="match"?10:0);if(y+estimate>pageH-18){footer();doc.addPage("letter","portrait");pageNumber++;y=34;header();}y=drawPdfQuestion(doc,question,start+index,margin,y,width);});
      footer();
      const blob=doc.output("blob"), url=URL.createObjectURL(blob), link=document.createElement("a");link.href=url;link.target="_blank";link.rel="noopener";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),120000);
    } finally {if(button){button.disabled=false;button.textContent=original || (extension?"Preview enrichment extension":"Preview core worksheet");}}
  }

  async function init() {
    try {
      if (!window.SkillrYear3MathsRegister) await loadScript("/assets/year3-maths-data-base.js?v=2");
      const files = ["/assets/year3-maths-data-n1.js?v=1","/assets/year3-maths-data-n2.js?v=1","/assets/year3-maths-data-n3.js?v=1","/assets/year3-maths-data-a.js?v=1","/assets/year3-maths-data-m1.js?v=1","/assets/year3-maths-data-m2.js?v=1","/assets/year3-maths-data-sp.js?v=1","/assets/year3-maths-data-st.js?v=1","/assets/year3-maths-data-p.js?v=1"];
      for (const file of files) { if (!window.SkillrYear3MathsData?.[code]) await loadScript(file); }
      ensureCss();
      const unit=window.SkillrYear3MathsData?.[code], worksheet=window.SkillrYear3MathsWorksheetData?.[code];
      if(!unit||!worksheet)return;
      document.title=`${code} ${worksheet.title} Worksheet | SkillrHub`;
      const meta=document.querySelector('meta[name="description"]'); if(meta)meta.content=`${code} Year 3 Maths practice sheet with 3 warm-up, 4 core and 2 extension questions plus answers, summaries and hints.`;
      renderScreen(unit,worksheet);
      document.getElementById("previewCorePdfButton")?.addEventListener("click",()=>previewPdf(worksheet,"core"));
      document.getElementById("previewExtensionPdfButton")?.addEventListener("click",()=>previewPdf(worksheet,"extension"));
    } catch(error) {console.error("Skillr Year 3 Maths worksheet setup failed:",error);}
  }

  init();
})();
