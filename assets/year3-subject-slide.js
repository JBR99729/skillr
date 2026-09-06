(() => {
  "use strict";
  const subject = (window.skillrSlideSubject || document.body.dataset.subject || "").toLowerCase();
  const subjectName = subject === "science" ? "Science" : "English";
  const params = new URLSearchParams(location.search);
  const defaultCode = subject === "science" ? "AC9S3U01" : "AC9E3LA01";
  const code = (params.get("code") || defaultCode).toUpperCase();
  const data = window[`SkillrYear3${subjectName}Data`] || {};
  const unit = data[code];
  const root = document.getElementById("slideRoot");
  const back = document.getElementById("backLink");
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  if (!unit || !root) {
    if (root) root.innerHTML = '<p style="padding:16px">Slide content is still loading. Refresh once if needed.</p>';
    return;
  }
  document.title = `${code} ${unit.title} Teacher Slide | SkillrHub`;
  back.href = `/year3/${subject}/${unit.slug}/`;
  const routine = unit.routine.split("→").map((part) => `<span>${esc(part.trim())}</span>`).join("");
  const mixups = unit.mistakes.slice(0, 3).map(([name, fix]) => `<li><strong>${esc(name)}:</strong> ${esc(fix)}</li>`).join("");
  const checks = unit.quick.slice(0, 4).map((item) => `<li>${esc(item)}</li>`).join("");
  const activities = unit.activities.slice(0, 3).map((activity) => `<li><strong>${esc(activity.title)}:</strong> ${esc(activity.text)}</li>`).join("");
  root.innerHTML = `<div class="skillr-repeat-watermark" aria-hidden="true">${Array.from({ length: 15 }, () => "<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="brandbar"><div class="brand">SkillrHub <span>F–10</span></div><small>Year 3 ${subjectName} • Live classroom display</small></div><section class="hero"><div><p class="eyebrow">${code} • Year 3 ${subjectName}</p><h1>${esc(unit.title)}</h1><p class="subtitle">${esc(unit.subtitle)}</p><p class="goal"><strong>Learning goal:</strong> ${esc(unit.learn)}</p></div><div class="hero-box"><p><strong>Curriculum focus</strong></p><p>${esc(unit.desc)}</p><p><strong>Classroom routine</strong></p><p>${esc(unit.routine)}</p></div></section><div class="flow-row">${routine}</div><section class="model"><div class="model-grid"><div><span class="tag">Teach It</span><h2>${esc(unit.model_title)}</h2>${unit.model_html}</div><div><span class="tag">Apply</span><h2>${esc(unit.apply_title)}</h2>${unit.apply_html}</div></div></section><section class="grid"><div class="card"><span class="tag">Try it</span><h2>Activities</h2><ul>${activities}</ul></div><div class="card mistake"><span class="tag">Common Mix-Ups</span><h2>Watch for</h2><ul>${mixups}</ul></div><div class="card check"><span class="tag">Quick check</span><h2>Ask</h2><ol>${checks}</ol></div></section><div class="footer"><span>Project directly in class • same visuals as the topic page</span><span>skillrhub.com • ${code}</span></div>`;
})();
