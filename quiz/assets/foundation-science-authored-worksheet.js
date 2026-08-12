"use strict";

(() => {
  const match = window.location.pathname.match(/\/science\/(ac9sf[a-z0-9]+)\/worksheet\/?/i);
  const code = match ? match[1].toUpperCase() : null;
  const unit = code ? window.SkillrFoundationScienceWorksheetData?.[code] : null;
  if (!code || !unit || !Array.isArray(unit.questions) || unit.questions.length !== 10) return;

  const questions = unit.questions;
  const root = document.getElementById("worksheetRoot");
  const button = document.getElementById("previewPdfButton");
  if (!root) return;

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));

  function renderQuestion(question, index) {
    let response = "";
    if (question.type === "single") {
      response = `<div class="worksheet-options">${(question.answers || []).map((answer, i) => `<span><strong>[${String.fromCharCode(65 + i)}]</strong> ${esc(answer)}</span>`).join("")}</div>`;
    } else if (question.type === "fill-blank") {
      response = `<div class="fill-template">${esc(question.template || "").replaceAll("{{blank}}", '<span class="blank-line"></span>')}</div>`;
    } else if (question.type === "match") {
      response = `<div class="match-grid"><div>${(question.matchLeft || []).map((item, i) => `<p><strong>${String.fromCharCode(65 + i)}.</strong> ${esc(item)}</p>`).join("")}</div><div>${(question.matchRight || []).map((item, i) => `<p><strong>${i + 1}.</strong> ${esc(item)}</p>`).join("")}</div></div><p class="match-instruction">Matches: __________________________</p>`;
    } else {
      const lineCount = question.enrichment ? 4 : 2;
      response = `<div class="response-lines">${Array.from({length:lineCount},()=>"<span></span>").join("")}</div>`;
    }
    return `<article class="worksheet-question${question.enrichment ? " enrichment" : ""}"><div class="question-line"><span class="question-number-text">${index + 1}.</span>${question.enrichment ? '<span class="enrichment-label">Enrichment</span>' : ""}<p class="question-prompt">${esc(question.question)}</p></div>${response}</article>`;
  }

  const core = questions.filter((q) => !q.enrichment);
  const enrichment = questions.filter((q) => q.enrichment);
  root.innerHTML = `<section class="worksheet-paper"><div class="watermark-grid" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="worksheet-paper__head"><div><p class="paper-brand">SkillrHub <span>F–10</span></p><h2>${esc(code)} — ${esc(unit.title)}</h2></div><p>Name: ____________________ &nbsp;&nbsp; Date: ____________</p></div><section class="core-grid">${core.map((q,i)=>renderQuestion(q,i)).join("")}</section><div class="enrichment-heading">Enrichment — complete Questions 9–10 after Questions 1–8.</div><section class="enrichment-grid">${enrichment.map((q,i)=>renderQuestion(q,i+core.length)).join("")}</section><footer class="worksheet-footer"><span><strong>SkillrHub F–10</strong> • Foundation Science</span><span>skillrhub.com</span></footer></section>`;

  const wrap = (doc, text, width) => {
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    return Array.isArray(lines) ? lines : [String(lines)];
  };

  function packOptionRows(doc, answers, width) {
    const labels = (answers || []).map((value, i) => `[${String.fromCharCode(65 + i)}] ${value}`);
    const rows = [];
    let row = [], used = 0;
    labels.forEach((label) => {
      const w = doc.getTextWidth(label) + 8;
      if (row.length && used + w > width) { rows.push(row); row = []; used = 0; }
      row.push(label); used += w;
    });
    if (row.length) rows.push(row);
    return rows;
  }

  function measureQuestion(doc, question, width) {
    doc.setFont("helvetica","bold"); doc.setFontSize(10.1);
    const promptWidth = width - 8 - (question.enrichment ? 25 : 0);
    const promptLines = wrap(doc, question.question, promptWidth);
    let height = Math.max(8, promptLines.length * 4 + 4);
    doc.setFont("helvetica","normal"); doc.setFontSize(9.1);
    if (question.type === "single") height += packOptionRows(doc, question.answers, width - 8).length * 4.5 + 2;
    else if (question.type === "fill-blank") height += 5.8;
    else if (question.type === "match") height += Math.max(question.matchLeft?.length || 0, question.matchRight?.length || 0) * 4.1 + 5;
    else height += (question.enrichment ? 4 : 2) * 5.2 + 2;
    return Math.max(question.enrichment ? 27 : 17, height + 1.5);
  }

  function paginate(doc, width, availableHeight) {
    const pages = [[]];
    let used = 0;
    const gap = 2.4;
    questions.forEach((question, index) => {
      const height = measureQuestion(doc, question, width);
      const required = (pages.at(-1).length ? gap : 0) + height;
      if (pages.at(-1).length && used + required > availableHeight) { pages.push([]); used = 0; }
      pages.at(-1).push({question, number:index+1, height});
      used += (pages.at(-1).length > 1 ? gap : 0) + height;
    });
    return pages;
  }

  function drawWatermark(doc) {
    try {
      doc.saveGraphicsState();
      if (doc.GState && doc.setGState) doc.setGState(new doc.GState({opacity:.06}));
      doc.setFont("helvetica","bold"); doc.setFontSize(16); doc.setTextColor(36,87,214);
      [70,135,200,255].forEach((y)=>[55,160].forEach((x)=>doc.text("SkillrHub F-10 • skillrhub.com",x,y,{align:"center",angle:28})));
      doc.restoreGraphicsState();
    } catch {}
  }

  function drawHeader(doc, pageW, pageNumber, pageCount) {
    const m=10;
    doc.setFont("helvetica","bold"); doc.setFontSize(18); doc.setTextColor(36,87,214); doc.text("SkillrHub F-10",m,11);
    doc.setDrawColor(36,87,214); doc.setLineWidth(.7); doc.line(m,13.5,m+55,13.5);
    doc.setFontSize(11); doc.setTextColor(23,57,104); doc.text(`${code} • ${unit.title} Worksheet`,m,20);
    doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(36,87,214); doc.text(`Page ${pageNumber} of ${pageCount} • skillrhub.com`,pageW-m,11,{align:"right"});
    doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(32,48,71); doc.text("Name: ______________________________",m,29.5); doc.text("Date: ______________",pageW-m,29.5,{align:"right"});
    doc.setDrawColor(36,87,214); doc.setLineWidth(.4); doc.line(m,32.5,pageW-m,32.5);
    return 36;
  }

  function drawFooter(doc, pageW, pageH, pageNumber, pageCount) {
    const m=10, y=pageH-7;
    doc.setDrawColor(36,87,214); doc.setLineWidth(.35); doc.line(m,pageH-13,pageW-m,pageH-13);
    doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(36,87,214); doc.text("SkillrHub F-10",m,y-2.6); doc.text("skillrhub.com",pageW-m,y-2.6,{align:"right"});
    if (pageCount > 1) { doc.setFont("helvetica","normal"); doc.setFontSize(7.1); doc.setTextColor(23,57,104); doc.text("Printing tip: choose double-sided (duplex) printing to use one sheet per student.",pageW/2,y+1.1,{align:"center"}); }
    doc.setFont("helvetica","normal"); doc.setFontSize(7.1); doc.setTextColor(23,57,104); doc.text(`Page ${pageNumber} of ${pageCount}`,pageW-m,y+1.1,{align:"right"});
  }

  function drawQuestion(doc, question, number, x, y, width, height) {
    const text=[32,48,71], muted=[93,108,128], blue=[36,87,214];
    doc.setFont("helvetica","bold"); doc.setFontSize(10.1); doc.setTextColor(...text); doc.text(`${number}.`,x,y+4.1);
    let promptX=x+8;
    if (question.enrichment) { doc.setFontSize(7); doc.setTextColor(...blue); doc.text("ENRICHMENT",promptX,y+4.1); promptX+=25; doc.setFontSize(10.1); doc.setTextColor(...text); }
    const promptLines=wrap(doc,question.question,x+width-promptX); doc.text(promptLines,promptX,y+4.1); let cursor=y+4.1+promptLines.length*4+1;
    doc.setFont("helvetica","normal"); doc.setFontSize(9.1); doc.setTextColor(...text);
    if (question.type === "single") {
      const rows=packOptionRows(doc,question.answers,width-8); rows.forEach((row,ri)=>{let ox=x+8; const oy=cursor+ri*4.5; row.forEach((label)=>{doc.text(label,ox,oy); ox+=doc.getTextWidth(label)+8;});});
    } else if (question.type === "fill-blank") {
      doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.text(String(question.template||"").replaceAll("{{blank}}","__________"),x+8,cursor);
    } else if (question.type === "match") {
      const left=question.matchLeft||[], right=question.matchRight||[], count=Math.max(left.length,right.length); doc.setFontSize(8.8);
      for(let i=0;i<count;i++){doc.text(left[i]!==undefined?`${String.fromCharCode(65+i)}. ${left[i]}`:"",x+8,cursor+i*4.1);doc.text(right[i]!==undefined?`${i+1}. ${right[i]}`:"",x+width*.57,cursor+i*4.1);}
      const ly=cursor+count*4.1+1; doc.setDrawColor(...muted); doc.line(x+8,ly,x+width-4,ly);
    } else {
      const count=question.enrichment?4:2; doc.setDrawColor(...muted); for(let i=0;i<count;i++){const ly=cursor+i*5.2;if(ly<y+height-1)doc.line(x+8,ly,x+width-4,ly);}
    }
    doc.setDrawColor(219,228,239); doc.setLineWidth(.2); doc.line(x,y+height,x+width,y+height);
  }

  async function previewPdf() {
    if (!window.jspdf?.jsPDF) return;
    const original=button?.textContent;
    if(button){button.disabled=true;button.textContent="Preparing preview...";}
    try {
      const {jsPDF}=window.jspdf;
      const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"letter",compress:true});
      const pageW=doc.internal.pageSize.getWidth(), pageH=doc.internal.pageSize.getHeight(), m=10, width=pageW-m*2, top=36, bottom=pageH-16;
      const pages=paginate(doc,width,bottom-top), count=pages.length;
      pages.forEach((items,pi)=>{if(pi>0)doc.addPage("letter","portrait");drawWatermark(doc);doc.setDrawColor(36,87,214);doc.setLineWidth(.55);doc.rect(5,5,pageW-10,pageH-10);let y=drawHeader(doc,pageW,pi+1,count);items.forEach((item)=>{drawQuestion(doc,item.question,item.number,m,y,width,item.height);y+=item.height+2.4;});drawFooter(doc,pageW,pageH,pi+1,count);});
      const blob=doc.output("blob"), url=URL.createObjectURL(blob), a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),120000);
    } finally { if(button){button.disabled=false;button.textContent=original||"Preview PDF worksheet";} }
  }

  button?.addEventListener("click",previewPdf);
})();
