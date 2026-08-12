(() => {
  "use strict";

  const subject = (window.skillrSlideSubject || document.body.dataset.subject || "").toLowerCase();
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const defaults = {maths:"AC9M6N01",science:"AC9S6U01",english:"AC9E6LA01"};
  const code = (new URLSearchParams(location.search).get("code") || defaults[subject] || defaults.maths).toUpperCase();
  const unit = window[`SkillrYear6${subjectName}Data`]?.[code];
  const root = document.getElementById("slideRoot");
  const back = document.getElementById("backLink");
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  if (!unit || !root) {
    if (root) root.innerHTML = '<p style="padding:16px">Slide content is still loading. Refresh once if needed.</p>';
    return;
  }

  document.title = `${code} ${unit.title} Teacher Slides | SkillrHub`;
  if (back) back.href = `/year6/${subject}/${unit.slug}/`;

  const routine = unit.routine.split("→").map((part) => `<span>${esc(part.trim())}</span>`).join("");
  const mixups = unit.mistakes.slice(0,3).map(([name,fix]) => `<li><strong>${esc(name)}:</strong> ${esc(fix)}</li>`).join("");
  const checks = unit.quick.slice(0,4).map((item) => `<li>${esc(item)}</li>`).join("");
  const activities = unit.activities.slice(0,3).map((activity) => `<li><strong>${esc(activity.title)}:</strong> ${esc(activity.text)}</li>`).join("");
  const reasoning = subject === "maths"
    ? [["Represent","Identify structure, quantities and constraints."],["Reason","Explain why the property or strategy works."],["Verify","Use an estimate, inverse or alternate representation."]]
    : subject === "science"
      ? [["Observe","Identify measurable or comparable evidence."],["Explain","Connect the model to the evidence."],["Evaluate","State variables, errors, limits and further questions."]]
      : [["Notice","Identify language, structure and multimodal choices."],["Explain","Connect choices to meaning and audience."],["Transfer","Apply and review the feature in a new text."]];

  root.innerHTML = `<div class="skillr-repeat-watermark" aria-hidden="true">${Array.from({length:15},()=>"<span>SkillrHub F–10 • skillrhub.com</span>").join("")}</div><div class="brandbar"><div class="brand">SkillrHub <span>F–10</span></div><small>Year 6 ${subjectName} • Live classroom display</small></div><section class="hero"><div><p class="eyebrow">${code} • Year 6 ${subjectName}</p><h1>${esc(unit.title)}</h1><p class="subtitle">${esc(unit.subtitle)}</p><p class="goal"><strong>Learning goal:</strong> ${esc(unit.learn)}</p></div><div class="hero-box"><p><strong>Curriculum focus</strong></p><p>${esc(unit.desc)}</p><p><strong>Learning routine</strong></p><p>${esc(unit.routine)}</p></div></section><div class="flow-row">${routine}</div><section class="model"><div class="model-grid"><div><span class="tag">Teach It</span><h2>${esc(unit.model_title)}</h2>${unit.model_html}</div><div><span class="tag">Apply and transfer</span><h2>${esc(unit.apply_title)}</h2>${unit.apply_html}</div></div></section><section class="reasoning">${reasoning.map(([title,text])=>`<div><strong>${title}</strong>${esc(text)}</div>`).join("")}</section><section class="grid"><div class="card"><span class="tag">Try it</span><h2>Activities</h2><ul>${activities}</ul></div><div class="card mistake"><span class="tag">Common Mix-Ups</span><h2>Watch for</h2><ul>${mixups}</ul></div><div class="card check"><span class="tag">Quick check</span><h2>Ask</h2><ol>${checks}</ol></div></section><div class="footer"><span>Lightweight instructional diagrams • no stock photography</span><span>skillrhub.com • ${code}</span></div>`;
})();
