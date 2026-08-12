(() => {
  "use strict";

  if (window.__skillrYear5QuickReadLoaded) return;
  window.__skillrYear5QuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-5\/(math|science|english)\/(ac9[mse]5[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;

  const routeSubject = match[1].toLowerCase();
  const subject = routeSubject === "math" ? "maths" : routeSubject;
  const subjectName = subject === "maths" ? "Maths" : subject === "science" ? "Science" : "English";
  const code = match[2].toUpperCase();
  const mode = match[3].toLowerCase();
  const unit = window[`SkillrYear5${subjectName}Data`]?.[code];
  if (!unit) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureStyles() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("year5-curriculum.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/year5-curriculum.css?v=1";
      document.head.appendChild(link);
    }

    if (document.getElementById("skillr-year5-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year5-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:1000px;padding:20px 22px;text-align:left;position:relative;overflow:hidden}.year5-quick-brand{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:-4px 0 10px;padding:9px 11px;border:1px solid #d8e5f4;border-radius:12px;background:linear-gradient(90deg,#f7fbff,#eef5ff)}.year5-quick-brand strong{font-size:1rem;color:#2457d6;font-weight:900}.year5-quick-brand strong span{color:#173968}.year5-quick-brand small{color:#5d6c80;font-size:.76rem;font-weight:800;text-align:right}#startScreen .eyebrow{font-size:.75rem;margin:0 0 4px;color:#2457d6}#startScreen #quizTitle{font-size:clamp(1.32rem,2.7vw,1.9rem);line-height:1.16;margin:6px 0;color:#173968}#startScreen .intro-text{font-size:.87rem;line-height:1.4;margin:0 0 8px;color:#5d6c80}#startScreen .pre-read-notes{margin:10px 0 13px;padding:11px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}#startScreen .pre-read-notes h2{font-size:1rem;line-height:1.2;margin:0 0 8px;color:#173968}.year5-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 8px}.year5-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:118px}.year5-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.67rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.year5-quick-visuals .y5-board{padding:0;border:0;background:transparent;margin:0}.year5-quick-visuals .y5-board>p{display:none}.year5-quick-visuals .y5-cards span,.year5-quick-visuals .y5-flow span{min-height:26px;padding:5px 6px;font-size:.57rem}.year5-quick-visuals .y5-table span{padding:4px;font-size:.54rem}.year5-quick-visuals .y5-numberline{padding:10px 6px 25px}.year5-quick-visuals .y5-grid{width:105px}.year5-quick-visuals .y5-graph{height:95px}.year5-quick-visuals .y5-particles section{height:72px}.year5-quick-visuals .y5-rays{grid-template-columns:70px 1fr 55px 55px;min-height:85px;font-size:.55rem}.year5-quick-visuals .y5-coordinate .plot span{min-height:24px}.year5-quick-points{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:7px 0}.year5-quick-points>div{border-left:3px solid #2457d6;border-radius:8px;background:#eef5ff;padding:7px 8px;font-size:.75rem;line-height:1.34}.year5-quick-points strong{display:block;color:#173968;margin-bottom:2px}.year5-quick-check{border:1px solid #d7eadc;background:#f7fbf8;border-radius:9px;padding:7px 9px;font-size:.78rem;line-height:1.35}.year5-quick-check strong{color:#17663a}#startScreen .quiz-summary{margin:12px 0;gap:8px}#startScreen .quiz-summary>div{padding:9px 8px}#startScreen .button{min-height:42px;padding:9px 16px}@media(max-width:720px){.year5-quick-brand{display:block}.year5-quick-brand small{display:block;text-align:left;margin-top:3px}.year5-quick-visuals,.year5-quick-points{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const card = document.querySelector("#startScreen .start-card");
    if (!card) return false;
    ensureStyles();

    if (!card.querySelector(".year5-quick-brand")) {
      const brand = document.createElement("div");
      brand.className = "year5-quick-brand";
      brand.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Year 5 ${subjectName} • ${mode === "test" ? "Test" : "Practice"} Quick Read</small>`;
      card.insertBefore(brand, card.firstChild);
    }

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test"
      ? "Review the connected visual summary and reasoning check, then take the Test."
      : "Review the connected visual summary and reasoning check, then start Practice.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
    }
    if (notes.dataset.skillrYear5QuickRead === `${code}-${mode}`) return true;

    const visuals = (unit.quick_visuals || []).slice(0,3).map((item) => `<figure>${item.html}<figcaption>${esc(item.label)}</figcaption></figure>`).join("");
    const misconception = unit.mistakes?.[0];
    const subjectPrompt = subject === "maths"
      ? "State the relationship before calculating, then use an estimate, inverse or alternate representation to verify."
      : subject === "science"
        ? "Separate observation from explanation, identify relevant variables and limit the conclusion to the evidence."
        : "Name the language, structural or visual feature, cite evidence and explain its effect for audience and purpose.";

    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year5-quick-visuals">${visuals}</div><div class="year5-quick-points"><div><strong>Core relationship</strong>${esc(unit.learn)}</div><div><strong>Apply and transfer</strong>${esc(unit.apply_title)}</div><div><strong>Common mix-up</strong>${esc(misconception ? `${misconception[0]} — ${misconception[1]}` : unit.quick?.[0] || "Check the central relationship.")}</div></div><div class="year5-quick-check"><strong>Reasoning check:</strong> ${esc(subjectPrompt)}</div>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrYear5QuickRead = `${code}-${mode}`;
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 10000);
})();
