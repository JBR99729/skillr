(() => {
  "use strict";

  if (window.__skillrFoundationTestQuickReadLoaded) return;
  window.__skillrFoundationTestQuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/grade-k\/(math|science|english)\/(ac9[a-z0-9]+)\/test\/?$/i);
  if (!match) return;
  const routeSubject = match[1].toLowerCase();
  const subject = routeSubject === "math" ? "maths" : routeSubject;
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
  const code = match[2].toUpperCase();
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function findUnit() {
    const names = subject === "maths" ? ["SkillrFoundationMathsData"] : subject === "science" ? ["SkillrFoundationScienceData"] : ["SkillrFoundationEnglishData"];
    for (const name of names) if (window[name]?.[code]) return window[name][code];
    return null;
  }

  function ensureStyle() {
    if (document.getElementById("skillr-foundation-test-quick-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-foundation-test-quick-style";
    style.textContent = `
      #startScreen .start-card{max-width:900px;text-align:left;padding:20px 22px}.foundation-test-brand{display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid #d8e5f4;border-radius:12px;background:#f7faff;padding:9px 11px;margin-bottom:9px}.foundation-test-brand strong{color:#2457d6;font-weight:900}.foundation-test-brand strong span{color:#173968}.foundation-test-brand small{font-weight:800;color:#5d6c80}.foundation-test-visuals{display:grid;grid-template-columns:1.1fr .9fr;gap:8px;margin:7px 0}.foundation-test-visual{border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:120px}.foundation-test-visual h3{margin:0 0 5px;font-size:.72rem;color:#173968;text-transform:uppercase}.foundation-test-visual svg{display:block;width:100%;height:auto;max-height:145px}.foundation-test-visual .model,.foundation-test-visual .y3-vector-board,.foundation-test-visual .y4-subject-board{margin:0;padding:6px;border:0;background:#fff}.foundation-test-visual p{font-size:.75rem}.foundation-test-points{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.foundation-test-points>div{border-left:3px solid #2457d6;border-radius:8px;background:#eef5ff;padding:7px 8px;font-size:.76rem;line-height:1.34}.foundation-test-points strong{display:block;color:#173968;margin-bottom:2px}@media(max-width:680px){.foundation-test-brand{display:block}.foundation-test-brand small{display:block;margin-top:3px}.foundation-test-visuals,.foundation-test-points{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const unit = findUnit();
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;
    ensureStyle();
    if (!card.querySelector(".foundation-test-brand")) {
      const brand = document.createElement("div");
      brand.className = "foundation-test-brand";
      brand.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Foundation ${subjectName} • Test Quick Read</small>`;
      card.insertBefore(brand, card.firstChild);
    }
    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title || code;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = "Look at the visual summary, say the key idea aloud, then begin the Test.";
    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
    }
    if (notes.dataset.foundationTestVisual === code) return true;
    const concept = window.SkillrConceptSvg?.render(unit, subject, code) || "";
    const model = unit.model_html || unit.hero_visual || "";
    const apply = unit.apply_html || "";
    const mistake = unit.mistakes?.[0];
    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="foundation-test-visuals"><div class="foundation-test-visual"><h3>See the idea</h3>${concept || model}</div><div class="foundation-test-visual"><h3>Use the idea</h3>${apply || model}</div></div><div class="foundation-test-points"><div><strong>Say</strong>${esc(unit.learn || unit.desc || "Explain the main idea in your own words.")}</div><div><strong>Show</strong>${esc(unit.model_title || "Use the visual model and point to the important parts.")}</div><div><strong>Check</strong>${esc(mistake ? `${mistake[0]} — ${mistake[1]}` : unit.quick?.[0] || "Check the answer against the model.")}</div></div>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.foundationTestVisual = code;
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 10000);
})();
