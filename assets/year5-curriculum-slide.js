(() => {
  "use strict";

  const subject = (window.skillrSlideSubject || document.body.dataset.subject || "").toLowerCase();
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const defaults = { maths:"AC9M5N01", science:"AC9S5U01", english:"AC9E5LA01" };
  const code = (new URLSearchParams(location.search).get("code") || defaults[subject] || defaults.maths).toUpperCase();
  const unit = window[`SkillrYear5${subjectName}Data`]?.[code];
  const master = unit?.commercial_master;
  const root = document.getElementById("slideRoot");
  const back = document.getElementById("backLink");
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  if (!unit || !root) {
    if (root) root.innerHTML = '<p style="padding:16px">Slide content is still loading. Refresh once if needed.</p>';
    return;
  }

  document.title = `${code} ${unit.title} Teacher Slides | SkillrHub`;
  if (back) back.href = `/year5/${subject}/${unit.slug}/`;

  const routine = unit.routine.split("→").map((part) => `<span>${esc(part.trim())}</span>`).join("");
  const mixups = unit.mistakes.slice(0,3).map(([name,fix]) => `<li><strong>${esc(name)}:</strong> ${esc(fix)}</li>`).join("");
  const checks = unit.quick.slice(0,4).map((item) => `<li>${esc(item)}</li>`).join("");
  const activities = unit.activities.slice(0,3).map((activity) => `<li><strong>${esc(activity.title)}:</strong> ${esc(activity.text)}</li>`).join("");
  const reasoning = subject === "maths"
    ? [["Represent","Identify quantities and structure."],["Reason","Explain why the property or strategy works."],["Verify","Use an estimate, inverse or alternate representation."]]
    : subject === "science"
      ? [["Observe","Identify measurable or comparable evidence."],["Explain","Connect the model to the evidence."],["Evaluate","State variables, limitations and further questions."]]
      : [["Notice","Identify language, structure and visual choices."],["Explain","Connect choices to meaning and audience."],["Transfer","Apply and review the feature in a new text."]];

  const success = unit.mastery.slice(0,4).map((item)=>`<li>I can ${esc(item.charAt(0).toLowerCase()+item.slice(1))}.</li>`).join("");
  const expected = master.slides[3].expectedResponse;
  root.innerHTML = `<div class="brandbar"><div class="brand">SkillrHub <span>F–10</span></div><small>${code} • Year 5 ${subjectName}</small></div><div class="slide-deck"><section class="core-slide" data-slide-role="learning-intention"><span class="tag">Slide 1 • Learning intention</span><h1>${esc(unit.title)}</h1><h2>We are learning to…</h2><p class="display-lead">${esc(unit.learn)}</p><h2>Success criteria</h2><ul>${success}</ul><aside class="teacher-notes"><strong>Teacher note:</strong> Connect this learning to a familiar observation or prior investigation.</aside></section><section class="core-slide" data-slide-role="concept-refresher"><span class="tag">Slide 2 • Concept refresher and visual clues</span><h2>${esc(unit.model_title)}</h2>${unit.model_html}<div class="flow-row">${routine}</div><aside class="teacher-notes"><strong>Visual cue:</strong> Ask students to point to the evidence before offering an explanation.</aside></section><section class="core-slide" data-slide-role="guided-example"><span class="tag">Slide 3 • Guided worked example</span><h2>${esc(unit.apply_title)}</h2>${unit.apply_html}<ol class="guided-steps"><li>Identify the observation, system or question.</li><li>Select the relevant evidence or model.</li><li>Connect evidence to the scientific explanation.</li><li>Check limits, variables or alternatives.</li></ol><aside class="teacher-notes"><strong>Misconception response:</strong> ${esc(unit.mistakes[0][1])}</aside></section><section class="core-slide" data-slide-role="quick-check"><span class="tag">Slide 4 • 60-second Quick Check / Turn and Talk</span><h2>${esc(unit.quick[0])}</h2><p class="display-lead">Think silently, then explain your evidence to a partner.</p><details class="concealed-answer"><summary>Teacher: reveal expected response</summary><p><strong>Expected response:</strong> ${esc(expected)}</p><p><strong>If students are unsure:</strong> Return to the labelled visual, name one observation, and use “because” to connect it to the explanation.</p><p><strong>Address:</strong> ${esc(unit.mistakes[0][0])} — ${esc(unit.mistakes[0][1])}</p></details></section></div><div class="legacy-extension"><h2>Optional teacher extensions</h2><div class="grid"><div class="card"><h3>Activities</h3><ul>${activities}</ul></div><div class="card mistake"><h3>Further misconceptions</h3><ul>${mixups}</ul></div><div class="card check"><h3>Additional checks</h3><ol>${checks}</ol></div></div></div><div class="footer"><span>Four screen-ready core slides • optional legacy material preserved below</span><span>skillrhub.com • ${code}</span></div>`;
})();
