"use strict";
(() => {
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function questionHtml(q,i){
    let body="";
    if(q.visual) body+=`<div class="visual">${esc(q.visual).replace(/\n/g,"<br>")}</div>`;
    if(q.type==="single"||q.type==="true-false"||q.type==="multiple"){
      body+="<div class='choices'>"+q.answers.map((a,j)=>`<div>${q.type==="multiple"?"☐":String.fromCharCode(65+j)+"."} ${esc(a)}</div>`).join("")+"</div>";
    }else if(q.type==="fill-blank"){
      body+=`<div class="answer">${esc(q.template||"").replace(/\{\{blank\}\}/g,"________________")}</div>`;
    }else if(q.type==="order"||q.type==="drag-drop"){
      body+="<div class='choices'>"+q.items.map(a=>`<div>___ ${esc(a)}</div>`).join("")+"</div>";
    }else{
      body+="<div class='line'></div><div class='line'></div>";
    }
    return `<section class="q"><h3>${i+1}. ${esc(q.question)}</h3>${body}</section>`;
  }
  function printSheet(){
    const meta=window.skillrDailyDrillMeta||{}, support=window.skillrDailySupportActive||{};
    const questions=window.skillrActiveQuestions||window.quizQuestions||[];
    const passage=window.skillrEnglishPassageActive||questions[0]?.passage||null;
    const w=window.open("","_blank","noopener,noreferrer");
    if(!w){alert("Please allow pop-ups to print the worksheet.");return;}
    const ideas=(meta.subject==="science"?support.facts:support.bullets)||[];
    const kw=support.keywords||[];
    const note=`
      <section class="review">
        <h2>${meta.subject==="science"?"Quick Read":"Quick Review"}</h2>
        <p>${esc(support.quick||"")}</p>
        ${support.formula?`<p><strong>Formula / rule:</strong> ${esc(support.formula)}</p>`:""}
        ${support.example?`<p><strong>Worked example:</strong> ${esc(support.example)}</p>`:""}
        ${ideas.length?`<ul>${ideas.slice(0,6).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
        ${kw.length?`<p class="keywords"><strong>Key words:</strong> ${kw.slice(0,8).map(x=>esc(x[0])).join(" • ")}</p>`:""}
        ${support.trap?`<p><strong>Common trap:</strong> ${esc(support.trap)}</p>`:""}
      </section>`;
    const passageBlock=passage?`<section class="passage"><h2>${esc(passage.title)}</h2><p>${esc(passage.text)}</p></section>`:"";
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(meta.title||"Daily Drill")} Worksheet</title>
    <style>
      @page{size:A4;margin:12mm}
      *{box-sizing:border-box} body{font-family:Arial,sans-serif;color:#111;margin:0;font-size:11pt;line-height:1.35}
      header{border-bottom:2px solid #111;padding-bottom:8px;margin-bottom:10px}
      h1{font-size:19pt;margin:0 0 3px} .sub{font-size:10pt;color:#444}
      .name{margin-top:8px;display:flex;gap:25px}.name span{flex:1;border-bottom:1px solid #555;padding-bottom:3px}
      .review{border:1px solid #bbb;border-radius:8px;padding:9px 11px;margin:10px 0}.passage{border:1px solid #999;border-radius:8px;padding:10px 12px;margin:10px 0}.passage h2{font-size:12.5pt;margin:0 0 6px}.passage p{margin:0;line-height:1.45}
      .review h2{font-size:12pt;margin:0 0 5px}.review p{margin:4px 0}.review ul{margin:5px 0;padding-left:18px}
      .keywords{font-size:9.5pt}.q{break-inside:avoid;border-top:1px solid #ddd;padding:8px 0}.q h3{font-size:10.5pt;margin:0 0 5px;font-weight:600}
      .choices{display:grid;grid-template-columns:1fr 1fr;gap:3px 14px;padding-left:10px}.visual{text-align:center;font-size:12pt;margin:4px}
      .line{height:17px;border-bottom:1px solid #bbb;margin-top:3px}.answer{padding:4px 8px}
      footer{margin-top:10px;border-top:1px solid #bbb;padding-top:6px;font-size:9pt;color:#555;display:flex;justify-content:space-between}
      @media print{button{display:none}}
    </style></head><body>
      <header><h1>${esc(meta.title||"Daily Drill")}</h1><div class="sub">${esc(meta.yearLabel||"")} ${meta.subject==="science"?"Science":"Maths"} • Daily Drill • 8 questions</div>
      <div class="name"><span>Name:</span><span>Date:</span></div></header>
      ${note}
      ${passageBlock}
      ${questions.map(questionHtml).join("")}
      <footer><span>SkillrHub • ${esc(meta.yearLabel||"")} Daily Practice</span><span>Score: ____ / ${questions.length}</span></footer>
      <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
    w.document.close();
  }
  function bind(){
    const b=document.getElementById("printWorksheetButton");
    if(b)b.addEventListener("click",printSheet);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind);else bind();
})();
