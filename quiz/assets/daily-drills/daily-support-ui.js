"use strict";
(() => {
  function el(tag,cls,text){
    const x=document.createElement(tag);
    if(cls)x.className=cls;
    if(text!==undefined)x.textContent=text;
    return x;
  }

  function render(){
    const meta=window.skillrDailyDrillMeta, s=window.skillrDailySupportActive;
    if(!meta||!s) return;
    const host=document.getElementById("quickSupportHost");
    if(!host) return;

    const details=el("details","daily-quick-support");
    details.open=true;

    let label="💡 Quick Review";
    if(meta.subject==="science") label="📖 60-second Quick Read";
    if(meta.subject==="english"&&meta.skill==="reading-comprehension") label="📚 Reading Strategy";
    if(meta.subject==="english"&&meta.skill==="vocabulary-word-meaning") label="🧠 Vocabulary Preview";
    if(meta.subject==="english"&&meta.skill==="language-skills") label="✍️ Language Quick Review";

    details.appendChild(el("summary","daily-quick-summary",label));
    const body=el("div","daily-quick-body");
    body.appendChild(el("h2","daily-quick-title",s.title||meta.title));
    body.appendChild(el("p","daily-quick-text",s.quick||""));

    const listData=meta.subject==="science"?s.facts:s.bullets;
    if(Array.isArray(listData)&&listData.length){
      const h=meta.subject==="science"?"What to remember":meta.subject==="english"?"Useful reminders":"Key ideas";
      body.appendChild(el("h3","daily-quick-subtitle",h));
      const ul=el("ul","daily-quick-list");
      listData.forEach(v=>ul.appendChild(el("li","",v)));
      body.appendChild(ul);
    }

    if(meta.subject==="math"&&s.formula){
      const box=el("div","daily-formula-box");
      box.append(el("strong","","Formula / rule: "),document.createTextNode(s.formula));
      body.appendChild(box);
    }
    if(meta.subject==="math"&&s.example){
      const box=el("p","daily-example");
      box.append(el("strong","","Worked example: "),document.createTextNode(s.example.replace(/^Example:\s*/,"")));
      body.appendChild(box);
    }

    if(meta.subject==="english"&&meta.skill==="vocabulary-word-meaning"&&Array.isArray(window.skillrEnglishTodayWords)){
      body.appendChild(el("h3","daily-quick-subtitle","Today's 4 focus words"));
      const grid=el("div","daily-keyword-grid");
      window.skillrEnglishTodayWords.forEach(pair=>{
        const item=el("div","daily-keyword");
        item.append(el("strong","",pair[0]),document.createTextNode(` — ${pair[1]}`));
        grid.appendChild(item);
      });
      body.appendChild(grid);
    } else if(Array.isArray(s.keywords)&&s.keywords.length){
      body.appendChild(el("h3","daily-quick-subtitle","Key words"));
      const grid=el("div","daily-keyword-grid");
      s.keywords.forEach(pair=>{
        const item=el("div","daily-keyword");
        item.append(el("strong","",pair[0]),document.createTextNode(` — ${pair[1]}`));
        grid.appendChild(item);
      });
      body.appendChild(grid);
    }

    if(meta.subject==="math"&&s.trap){
      const p=el("p","daily-trap");
      p.append(el("strong","","Common trap: "),document.createTextNode(s.trap));
      body.appendChild(p);
    }

    const mode=el("p","daily-mode-note",
      meta.subject==="science"
      ?"First attempt: read this before starting. Later attempts: close it and answer from memory."
      : meta.subject==="english"&&meta.skill==="reading-comprehension"
      ?"Read the passage during the quiz and return to it whenever you need evidence."
      : meta.subject==="english"
      ?"Use the review when learning. On later attempts, close it and practise from memory."
      :"Use the review when learning or revising. On later attempts, close it and practise retrieval from memory."
    );
    body.appendChild(mode);
    details.appendChild(body);
    host.replaceChildren(details);
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();
})();
