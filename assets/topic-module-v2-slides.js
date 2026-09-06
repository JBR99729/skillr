(() => {
  "use strict";
  const code = (new URLSearchParams(location.search).get("code") || "").toUpperCase();
  const module = window.SkillrTopicModulesV2?.get(code);
  const root = document.getElementById("slideRoot");
  if (!module || !root) return;
  document.title = `${code} ${module.identity.title} Teacher Slides | SkillrHub`;
  // The four canonical screens already consolidate the useful legacy teaching
  // layer. Prevent the global concept-cluster enhancer from wrapping this deck
  // in a second, competing slide navigator after pwa-register.js loads.
  root.dataset.clusterSlidesReady = "true";
  document.querySelectorAll(".slide-controls").forEach(control => control.remove());
  const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const visual = id => window.SkillrTopicModuleV2Visuals.render(module.topic.visuals.find(item => item.id === id));
  const cards = module.slides.map((slide,index)=>`<section class="tmv2-slide${index ? "" : " active"}" data-slide="${index}"><header><img src="/icons/skillrhub-mark.svg" alt="" width="34" height="34"><b>SkillrHub F–10</b><span>${e(code)} • Year ${e(module.identity.year)} ${e(module.identity.subject)} • ${index+1} of 4</span></header><main><p class="tmv2-eyebrow">${e(slide.role)}</p><h1>${e(slide.title)}</h1>${slide.body.map(x=>`<p>${e(x)}</p>`).join("")}${slide.visualIds.map(visual).join("")}${slide.concealAnswer?`<details><summary>Reveal expected response</summary><p>${e(slide.expectedResponse)}</p></details>`:""}</main><aside><h2>Teacher guidance</h2><p><strong>Notes:</strong> ${e(slide.teacherNotes)}</p>${slide.concealAnswer?"":`<p><strong>Expected:</strong> ${e(slide.expectedResponse)}</p>`}<p><strong>If this misconception appears:</strong> ${e(slide.misconceptionResponse)}</p><p><strong>Remediation:</strong> ${e(slide.remediation)}</p></aside></section>`).join("");
  root.className = "tmv2-deck";
  root.innerHTML = `<nav><button type="button" id="tmv2Prev">Previous</button><strong id="tmv2Count">1 / 4</strong><button type="button" id="tmv2Next">Next</button></nav>${cards}`;
  const slides=[...root.querySelectorAll(".tmv2-slide")]; let current=0;
  const show=()=>{slides.forEach((x,i)=>x.classList.toggle("active",i===current));root.querySelector("#tmv2Count").textContent=`${current+1} / 4`;};
  root.querySelector("#tmv2Prev").onclick=()=>{current=(current+3)%4;show();};
  root.querySelector("#tmv2Next").onclick=()=>{current=(current+1)%4;show();};
  document.addEventListener("keydown",event=>{if(event.key==="ArrowLeft")root.querySelector("#tmv2Prev").click();if(event.key==="ArrowRight")root.querySelector("#tmv2Next").click();});
  document.getElementById("backLink").href=module.links.topic;
})();
