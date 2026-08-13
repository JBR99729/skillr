(()=>{"use strict";
const code=(window.skillrPageMeta?.curriculumCode||"").toUpperCase();
const data=window.SkillrUpperMathsData||window.SkillrYear8MathsData;
const u=data?.[code],root=document.getElementById("year8Topic");
if(!u||!root)return;
const year=u.year||Number(code.match(/^AC9M(8|9|10)/)?.[1]||8);
const e=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const labelled=(type,label,inside)=>`<div class="concept-visual ${e(type)}" role="img" aria-label="${e(label)}">${inside}<p class="visual-label">${e(label)}</p></div>`;
const conceptVisual=v=>{
  if(!v)return"";
  const label=v.label||v.caption||"Mathematical model";
  if(v.type==="numberline"&&v.left)return labelled("numberline",label,`<div class="number-rail"><i class="left"></i><i class="point"></i><i class="right"></i></div><div class="number-labels"><b>${e(v.left)}</b><strong>${e(v.point)}</strong><b>${e(v.right)}</b></div>`);
  if(v.type==="square-paper")return labelled("square-paper",label,`<div class="unit-square"><span class="side-x">${e(v.side)}</span><span class="side-y">${e(v.side)}</span><i></i><b>${e(v.diagonal)}</b></div><div class="paper-fold"><div class="a4">A4<i></i><span>A5</span></div><strong>side ratio ${e(v.ratio)}</strong></div>`);
  if(v.type==="golden-history")return labelled("golden-history",label,`<div class="golden-box"><div></div><span>${e(v.phi)}</span></div><div class="history-cards"><article><small>Archimedes' bounds</small><b>${e(v.archimedes)}</b></article><article><small>Ancient Egyptian method</small><b>${e(v.egypt)}</b></article></div>`);
  if(v.type==="circle-roll")return labelled("circle-roll",label,`<div class="circle"><i></i><b>${e(v.diameter)}</b></div><div class="roll-arrow">roll one turn →</div><div class="unrolled"><i></i><b>${e(v.circumference)}</b></div><strong>${e(v.equation)}</strong>`);
  const diagrams={
    numberline:`<div class="generic-numberline"><i></i><b>lower</b><strong>target</strong><b>upper</b></div>`,
    equation:`<div class="equation-flow"><b>original</b><i>⇄</i><b>equivalent form</b></div>`,
    graph:`<div class="graph-model"><i class="axis-x"></i><i class="axis-y"></i><i class="trend"></i><b>relationship</b></div>`,
    table:`<div class="table-model"><b>input</b><b>rule</b><b>output</b><span>value</span><span>→</span><span>value</span></div>`,
    geometry:`<div class="geometry-model"><i></i><b>given</b><strong>?</strong><span>condition</span></div>`,
    measurement:`<div class="measurement-model"><i></i><b>measure</b><strong>unit</strong><span>check</span></div>`,
    data:`<div class="data-model"><i></i><i></i><i></i><i></i><b>compare centre • spread • shape</b></div>`,
    probability:`<div class="probability-model"><b>start</b><i></i><span>A</span><span>B</span><strong>outcomes</strong></div>`,
    algorithm:`<div class="algorithm-model"><b>input</b><i>→</i><b>process</b><i>→</i><b>test</b></div>`,
    network:`<div class="network-model"><i></i><i></i><i></i><i></i><span></span><b>vertices + edges</b></div>`,
    ratio:`<div class="ratio-model"><b>quantity A</b><i></i><b>quantity B</b><i></i><strong>same scale factor</strong></div>`,
    timeline:`<div class="timeline-model"><i></i><b>start</b><strong>common reference</strong><b>end</b></div>`,
    relationship:`<div class="relationship-model"><b>representation 1</b><i>⇄</i><b>representation 2</b></div>`
  };
  return labelled(v.type,label,diagrams[v.type]||diagrams.relationship);
};
const qp=`/quiz/year-${year}/math/${code.toLowerCase()}`;
const topicPath=`/year${year}/maths/${u.slug}/`;
const slidesPath=`/worksheets/year${year}/maths/teacher-slides/live.html?code=${code}`;
const resourceNav=`<nav class="resource-nav" aria-label="Learning resources"><a class="active" href="${topicPath}">Topic Guide</a><a href="${slidesPath}">Teacher Slides</a><a href="${qp}/worksheet/">Practice Sheet</a><a href="${qp}/practice/">Practice</a><a href="${qp}/test/">Test</a></nav>`;
const investigations=u.teachingSlides.map((s,i)=>`<article class="elaboration authored"><span>${i+1}</span><div><h3>${e(s.heading)}</h3><p>${e(s.lead)}</p>${conceptVisual(s.visual)}<div class="mini-model"><b>${e(s.highlight)}</b><small>${e(s.ask)}</small></div><details><summary>Check together</summary><p>${e(s.answer)}</p></details></div></article>`).join("");
root.innerHTML=`<header class="topbar"><a href="/">SkillrHub <span>F–10</span></a><a href="/year${year}/curriculum/maths/">All Year ${year} Maths</a></header><section class="hero"><p>${code} • Year ${year} Mathematics • ${e(u.strand)}</p><h1>${e(u.title)}</h1><div class="curriculum-focus"><b>Learning intention</b><span>${e(u.learningIntention||u.anchor)}</span></div>${resourceNav}</section><div class="layout"><div><section id="guide" class="panel anchor"><p class="kicker">What it means</p><h2>${e(u.anchor)}</h2><div class="focus-grid"><article><p class="kicker">First model</p><h3>${e(u.teachingSlides[0].heading)}</h3><div class="math-model">${e(u.teachingSlides[0].highlight)}</div></article><article><p class="kicker">Transfer model</p><h3>${e(u.teachingSlides.at(-1).heading)}</h3><div class="math-model secondary">${e(u.teachingSlides.at(-1).highlight)}</div></article></div><details class="curriculum-wording"><summary>Australian Curriculum wording</summary><p>${e(u.curriculum)}</p></details></section><section class="panel"><p class="kicker">Explore the ideas</p><h2>${u.teachingSlides.length} visual investigation${u.teachingSlides.length===1?"":"s"}</h2><div class="elaboration-list">${investigations}</div></section><section class="panel check-panel"><p class="kicker">Ask the class</p><h2>${e(u.ask)}</h2><details><summary>Check together</summary><p>${e(u.answer)}</p><p><strong>Expected evidence:</strong> students name the deciding relationship, apply it accurately and justify a check.</p></details></section><section class="panel"><p class="kicker">Differentiation without changing the goal</p><div class="level-grid">${Object.entries(u.levels).map(([k,v])=>`<article><h3>${e(k)}</h3><p>${e(v)}</p></article>`).join("")}</div></section><section class="panel"><p class="kicker">Common mix-ups</p><div class="mistakes">${u.misconceptions.map(([a,b])=>`<article><b>${e(a)}</b><span>${e(b)}</span></article>`).join("")}</div></section></div><aside><section class="side"><h2>Key terms</h2>${u.terms.map(t=>`<span class="term">${e(t)}</span>`).join("")}</section><section class="side"><h2>Concept boundary</h2>${Object.entries(u.boundary).map(([k,v])=>`<h3>${e(k.replace(/([A-Z])/g," $1"))}</h3><p>${e(v)}</p>`).join("")}</section><section class="side teacher"><h2>Teacher resource</h2><p>Project the aligned multi-screen lesson, with prompts, concealed checks and detailed teaching notes.</p><a href="${slidesPath}">Open teacher slides</a></section></aside></div><footer>${resourceNav}<p>SkillrHub • ${code}</p></footer>`;
})();
