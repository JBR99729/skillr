(() => {
  "use strict";
  const esc=(v)=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const code=(new URLSearchParams(location.search).get("code")||"AC9M3N01").toUpperCase();
  const unit=window.SkillrYear3MathsData?.[code], root=document.getElementById("slideRoot"), back=document.getElementById("backLink");
  if(!unit||!root)return;
  document.title=`${code} ${unit.title} Teacher Slides | SkillrHub`; back.href=`/year3/maths/${unit.slug}/`;
  const criteria=unit.slides.success_criteria.map(x=>`<li>${esc(x)}</li>`).join("");
  const terms=unit.vocabulary.map(([a,b])=>`<li><strong>${esc(a)}:</strong> ${esc(b)}</li>`).join("");
  const steps=unit.worked_examples[0].steps.map((x,i)=>`<li><strong>Step ${i+1}:</strong> ${esc(x)}</li>`).join("");
  root.innerHTML=`<div class="deck-brand"><img src="/icons/icon-192.png" alt="SkillrHub logo"><strong>SkillrHub</strong><span>${code} • Year 3 Maths</span></div>
  <section class="core-slide" data-slide-role="learning-intention"><p class="eyebrow">Slide 1 • Learning intention</p><h1>${esc(unit.title)}</h1><h2>${esc(unit.slides.learning_intention)}</h2><h3>Success criteria</h3><ul>${criteria}</ul></section>
  <section class="core-slide" data-slide-role="concept-refresher"><p class="eyebrow">Slide 2 • Concept refresher and visual clues</p><h2>${esc(unit.model_title)}</h2><div role="img" aria-label="${esc(unit.worked_examples[0].alt)}">${unit.worked_examples[0].visual_html}</div><ul>${terms}</ul></section>
  <section class="core-slide" data-slide-role="guided-example"><p class="eyebrow">Slide 3 • Guided worked example</p><h2>${esc(unit.worked_examples[0].title)}</h2><ol>${steps}</ol><aside><strong>Teacher note:</strong> Ask students to explain why each step follows from the previous one.</aside></section>
  <section class="core-slide" data-slide-role="quick-check"><p class="eyebrow">Slide 4 • 60-second Quick Check / Turn and Talk</p><h2>${esc(unit.slides.quick_check)}</h2><details><summary>Reveal answer and teacher guidance</summary><p><strong>Expected response:</strong> ${esc(unit.slides.expected_response)}</p><p><strong>If students are unsure:</strong> ${esc(unit.slides.remediation)}</p></details></section>
  <footer>Legacy one-page PDF remains available • <a href="/worksheets/year3/maths/teacher-slides/${code.toLowerCase()}-teacher-slide.pdf">Open legacy PDF</a></footer>`;
})();
