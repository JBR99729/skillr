"use strict";
(() => {
  function render(){
    const meta=window.skillrDailyDrillMeta, p=window.skillrEnglishPassageActive;
    if(!meta||meta.subject!=="english"||meta.skill!=="reading-comprehension"||!p) return;
    const quiz=document.getElementById("quizScreen");
    if(!quiz||document.getElementById("englishPassageCard")) return;

    const card=document.createElement("article");
    card.id="englishPassageCard";
    card.className="card english-passage-card";

    const eyebrow=document.createElement("p");
    eyebrow.className="eyebrow";
    eyebrow.textContent=`Reading passage • ${p.wordCount} words`;

    const h=document.createElement("h2");
    h.textContent=p.title;

    const text=document.createElement("p");
    text.className="english-passage-text";
    text.textContent=p.text;

    const note=document.createElement("p");
    note.className="daily-mode-note";
    note.textContent="Keep this passage open while you answer all 8 questions. Return to the text whenever you need evidence.";

    card.append(eyebrow,h,text,note);

    const header=quiz.querySelector(".quiz-header");
    if(header && header.nextSibling) quiz.insertBefore(card,header.nextSibling);
    else quiz.appendChild(card);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();
})();
