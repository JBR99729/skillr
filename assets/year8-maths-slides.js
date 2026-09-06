(()=>{"use strict";
const code=(new URLSearchParams(location.search).get("code")||"AC9M8N01").toUpperCase();
const data=window.SkillrUpperMathsData||window.SkillrYear8MathsData;
const u=data?.[code],root=document.getElementById("slideRoot");if(!u||!root)return;
const year=u.year||Number(code.match(/^AC9M(8|9|10)/)?.[1]||8);
const e=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.title=`${code} ${u.title} Teacher Slides | SkillrHub`;
document.getElementById("backLink").href=`/year${year}/maths/${u.slug}/`;
const notes=(n={})=>`<aside class="notes"><h3>Teacher notes & support</h3><dl><dt>Teacher does</dt><dd>${e(n.teacherDoes)}</dd><dt>Teacher says / asks</dt><dd>${e(n.teacherAsks)}</dd><dt>Student does</dt><dd>${e(n.studentDoes)}</dd><dt>Expected evidence</dt><dd>${e(n.expectedEvidence)}</dd><dt>If incorrect</dt><dd>${e(n.ifIncorrect)}</dd><dt>Short check</dt><dd>${e(n.shortCheck)}</dd></dl></aside>`;
const labelled=(type,label,inside)=>`<div class="concept-visual ${e(type)}" role="img" aria-label="${e(label)}">${inside}<p class="visual-label">${e(label)}</p></div>`;
const conceptVisual=v=>{
  if(!v)return"";const label=v.label||v.caption||"Mathematical model";
  if(v.type==="numberline"&&v.left)return labelled("numberline",label,`<div class="number-rail"><i class="left"></i><i class="point"></i><i class="right"></i></div><div class="number-labels"><b>${e(v.left)}</b><strong>${e(v.point)}</strong><b>${e(v.right)}</b></div>`);
  if(v.type==="square-paper")return labelled("square-paper",label,`<div class="unit-square"><span class="side-x">${e(v.side)}</span><span class="side-y">${e(v.side)}</span><i></i><b>${e(v.diagonal)}</b></div><div class="paper-fold"><div class="a4">A4<i></i><span>A5</span></div><strong>side ratio ${e(v.ratio)}</strong></div>`);
  if(v.type==="golden-history")return labelled("golden-history",label,`<div class="golden-box"><div></div><span>${e(v.phi)}</span></div><div class="history-cards"><article><small>Archimedes' bounds</small><b>${e(v.archimedes)}</b></article><article><small>Ancient Egyptian method</small><b>${e(v.egypt)}</b></article></div>`);
  if(v.type==="circle-roll")return labelled("circle-roll",label,`<div class="circle"><i></i><b>${e(v.diameter)}</b></div><div class="roll-arrow">roll one turn →</div><div class="unrolled"><i></i><b>${e(v.circumference)}</b></div><strong>${e(v.equation)}</strong>`);
  const diagrams={numberline:`<div class="generic-numberline"><i></i><b>lower</b><strong>target</strong><b>upper</b></div>`,equation:`<div class="equation-flow"><b>original</b><i>⇄</i><b>equivalent form</b></div>`,graph:`<div class="graph-model"><i class="axis-x"></i><i class="axis-y"></i><i class="trend"></i><b>relationship</b></div>`,table:`<div class="table-model"><b>input</b><b>rule</b><b>output</b><span>value</span><span>→</span><span>value</span></div>`,geometry:`<div class="geometry-model"><i></i><b>given</b><strong>?</strong><span>condition</span></div>`,measurement:`<div class="measurement-model"><i></i><b>measure</b><strong>unit</strong><span>check</span></div>`,data:`<div class="data-model"><i></i><i></i><i></i><i></i><b>compare centre • spread • shape</b></div>`,probability:`<div class="probability-model"><b>start</b><i></i><span>A</span><span>B</span><strong>outcomes</strong></div>`,algorithm:`<div class="algorithm-model"><b>input</b><i>→</i><b>process</b><i>→</i><b>test</b></div>`,network:`<div class="network-model"><i></i><i></i><i></i><i></i><span></span><b>vertices + edges</b></div>`,ratio:`<div class="ratio-model"><b>quantity A</b><i></i><b>quantity B</b><i></i><strong>same scale factor</strong></div>`,timeline:`<div class="timeline-model"><i></i><b>start</b><strong>common reference</strong><b>end</b></div>`,relationship:`<div class="relationship-model"><b>representation 1</b><i>⇄</i><b>representation 2</b></div>`};
  return labelled(v.type,label,diagrams[v.type]||diagrams.relationship);
};
const shell=(title,body,note)=>`<section class="slide"><div class="brand"><b>SkillrHub <span>F–10</span></b><small>Year ${year} Mathematics</small></div><div class="slide-body"><p class="eyebrow">${e(title)}</p>${body}</div>${note}<footer>${code} • ${e(u.title)}</footer></section>`;
const canonicalModels=new Map((Array.isArray(u.models)?u.models:[]).map(model=>[model.id,model.parameters||model]));
const canonicalCheckpoints=new Map((Array.isArray(u.checkpoints)?u.checkpoints:[]).map(item=>[item.id,item]));
const legacyTeachingSlides=Array.isArray(u.teachingSlides)?u.teachingSlides.filter(Boolean):[];
const canonicalTeachingSlides=Array.isArray(u.slides)?u.slides.filter(Boolean).map((s,index)=>{
  const layer=s.teacherLayer||{};
  const display=s.display||{};
  const modelId=Array.isArray(display.modelIds)?display.modelIds[0]:null;
  const checkpointId=Array.isArray(s.checkpointIds)?s.checkpointIds[0]:null;
  const checkpoint=checkpointId?canonicalCheckpoints.get(checkpointId):null;
  return {
    heading:s.title||`Explore the idea ${index+1}`,
    lead:s.purpose||u.learningIntention||u.subtitle||"",
    visual:modelId?canonicalModels.get(modelId):null,
    highlight:Array.isArray(display.keyText)?display.keyText[0]||"":display.keyText||"",
    ask:display.studentPrompt||layer.teacherSaysOrAsks||"What do you notice, and how can you justify it?",
    answer:checkpoint?.expectedAnswer||checkpoint?.expectedResponse||layer.whatToLookFor||"Use the labelled model and justify the relationship shown.",
    notes:{
      teacherDoes:layer.teacherDoes||"Model the representation and make the mathematical relationship explicit.",
      teacherAsks:layer.teacherSaysOrAsks||display.studentPrompt||"What evidence supports your conclusion?",
      studentDoes:layer.studentDoes||"Explains the relationship using the representation.",
      expectedEvidence:layer.whatToLookFor||checkpoint?.expectedAnswer||checkpoint?.expectedResponse||"Uses the model and correct mathematical language.",
      ifIncorrect:layer.ifIncorrect||"Return to the labelled representation and rebuild the reasoning one step at a time.",
      shortCheck:display.studentPrompt||checkpoint?.prompt||"State the relationship and one way to verify it."
    }
  };
}):[];
const teachingSlides=legacyTeachingSlides.length?legacyTeachingSlides:canonicalTeachingSlides;
const reviewLevels={
  support:u.levels?.support||u.differentiation?.support?.adaptation||"Use the central representation with reduced numerical or representational load.",
  core:u.levels?.core||u.differentiation?.core?.adaptation||"Connect representations, justify the method and verify independently.",
  extend:u.levels?.extend||u.differentiation?.extend?.adaptation||"Test a boundary case, counterexample or limitation while staying within the topic scope."
};
const slides=[];
slides.push(shell("Learning intention",`<h1>${e(u.title)}</h1><div class="anchor-box"><h2>${e(u.anchor||u.learningIntention||u.subtitle||u.contentDescription)}</h2></div><div class="routine"><span>Represent</span><span>Reason</span><span>Apply</span><span>Verify</span></div>`,notes({teacherDoes:"Establish the learning goal and activate prerequisite knowledge.",teacherAsks:"What prior representation or relationship will help us begin?",studentDoes:"Paraphrases the goal and identifies relevant prior knowledge.",expectedEvidence:"Names a relevant quantity, condition or representation.",ifIncorrect:"Use one familiar case and label each quantity before generalising.",shortCheck:"What must be true before this idea can be used?"})));
teachingSlides.forEach(s=>slides.push(shell("Explore the idea",`<h1>${e(s.heading)}</h1><p class="slide-lead">${e(s.lead)}</p>${conceptVisual(s.visual)}<mark class="focus-mark">${e(s.highlight)}</mark><div class="ask"><b>Ask the class</b><p>${e(s.ask)}</p></div><details><summary>Check together</summary><p>${e(s.answer)}</p></details>`,notes(s.notes))));
const firstMisconception=Array.isArray(u.misconceptions)&&u.misconceptions.length?u.misconceptions[0]:["Check the reasoning","Return to the labelled representation and verify each step."];
slides.push(shell("Review and respond",`<h1>Show what you know</h1><div class="review"><article><b>Support</b><p>${e(reviewLevels.support)}</p></article><article><b>Core</b><p>${e(reviewLevels.core)}</p></article><article><b>Extend</b><p>${e(reviewLevels.extend)}</p></article></div><div class="mixup"><b>Diagnose this</b><p>${e(firstMisconception[0])}</p><p>${e(firstMisconception[1])}</p></div>`,notes({teacherDoes:"Select the response level from current evidence.",teacherAsks:"Which representation best proves your conclusion?",studentDoes:"Completes the matched response and verifies it independently.",expectedEvidence:"States the relationship, its conditions and a valid check.",ifIncorrect:"Return to the central labelled model and complete a reasoning frame.",shortCheck:"State the relationship, its condition and one verification."})));
root.innerHTML=`<div class="deck-nav"><button id="prev" aria-label="Previous slide">←</button><span id="count"></span><button id="next" aria-label="Next slide">→</button><button id="notesToggle">Notes</button></div><div id="deck">${slides.join("")}</div>`;
let n=0;const all=[...root.querySelectorAll(".slide")],show=()=>{all.forEach((s,i)=>s.classList.toggle("active",i===n));root.querySelector("#count").textContent=`${n+1} / ${all.length}`};root.querySelector("#prev").onclick=()=>{n=(n-1+all.length)%all.length;show()};root.querySelector("#next").onclick=()=>{n=(n+1)%all.length;show()};root.querySelector("#notesToggle").onclick=()=>document.body.classList.toggle("hide-notes");document.addEventListener("keydown",ev=>{if(ev.key==="ArrowRight")root.querySelector("#next").click();if(ev.key==="ArrowLeft")root.querySelector("#prev").click()});show();
})();
