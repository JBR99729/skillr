(() => {
  "use strict";

  if (window.__skillrYear4SubjectQuickReadLoaded) return;
  window.__skillrYear4SubjectQuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-4\/(science|english)\/(ac9[se]4[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const subject = match[1].toLowerCase();
  const subjectName = subject === "science" ? "Science" : "English";
  const code = match[2].toUpperCase();
  const mode = match[3].toLowerCase();
  const unit = window[`SkillrYear4${subjectName}Data`]?.[code];
  if (!unit) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureStyle() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("year4-subject-visuals.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/year4-subject-visuals.css?v=1";
      document.head.appendChild(link);
    }
    if (document.getElementById("skillr-year4-subject-quick-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year4-subject-quick-style";
    style.textContent = `
      #startScreen .start-card{max-width:980px;padding:20px 22px;text-align:left;position:relative;overflow:hidden}.skillr-quiz-brandbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:-4px 0 10px;padding:9px 11px;border:1px solid #d8e5f4;border-radius:12px;background:linear-gradient(90deg,#f7fbff,#eef5ff)}.skillr-quiz-brandbar strong{font-size:1rem;color:#2457d6;font-weight:900}.skillr-quiz-brandbar strong span{color:#173968}.skillr-quiz-brandbar small{color:#5d6c80;font-size:.76rem;font-weight:800;text-align:right}#startScreen .eyebrow{font-size:.75rem;margin:0 0 4px;color:#2457d6}#startScreen #quizTitle{font-size:clamp(1.32rem,2.7vw,1.86rem);line-height:1.16;margin:6px 0;color:#173968}#startScreen .intro-text{font-size:.87rem;line-height:1.4;margin:0 0 8px;color:#5d6c80}#startScreen .pre-read-notes{margin:10px 0 13px;padding:11px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}#startScreen .pre-read-notes h2{font-size:1rem;line-height:1.2;margin:0 0 8px;color:#173968}.year4-subject-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 8px}.year4-subject-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:112px}.year4-subject-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.67rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.year4-subject-quick-visuals .y4-subject-board{padding:0;border:0;background:transparent;margin:0}.year4-subject-quick-visuals .y4-subject-board>p{display:none}.year4-subject-quick-visuals .y4-subject-cards span,.year4-subject-quick-visuals .y4-subject-flow span{min-height:26px;padding:5px 6px;font-size:.58rem}.year4-subject-quick-visuals .y4-subject-table span{padding:4px;font-size:.56rem}.year4-subject-quick-visuals .y4-subject-cycle>div{min-width:52px}.year4-subject-quick-visuals .y4-subject-cycle i{width:27px;height:27px;font-size:.58rem}.year4-subject-quick-visuals .y4-subject-chain>div{min-width:65px;padding:5px;font-size:.58rem}.year4-subject-quick-visuals .y4-subject-chain>b{display:none}.quick-read-points{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:7px 0}.quick-read-points div{border-left:3px solid #2457d6;background:#eef5ff;border-radius:7px;padding:7px 8px;font-size:.75rem;line-height:1.32}.quick-read-points strong{display:block;color:#173968;margin-bottom:2px}#startScreen .quiz-summary{margin:12px 0;gap:8px}#startScreen .quiz-summary>div{padding:9px 8px}#startScreen .button{min-height:42px;padding:9px 16px}@media(max-width:700px){.skillr-quiz-brandbar{display:block}.skillr-quiz-brandbar small{display:block;text-align:left;margin-top:3px}.year4-subject-quick-visuals,.quick-read-points{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const card = document.querySelector("#startScreen .start-card");
    if (!card) return false;
    ensureStyle();
    if (!card.querySelector(".skillr-quiz-brandbar")) {
      const bar = document.createElement("div");
      bar.className = "skillr-quiz-brandbar";
      bar.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Year 4 ${subjectName} • ${mode === "test" ? "Test" : "Practice"} Quick Read</small>`;
      card.insertBefore(bar, card.firstChild);
    }
    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test" ? "Review the visual summary, then take the Test." : "Review the visual summary, then start Practice.";
    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
    }
    if (notes.dataset.year4SubjectQuick === `${code}-${mode}`) return true;
    const visuals = unit.quick_visuals.slice(0,3).map((item) => `<figure>${item.html}<figcaption>${esc(item.label)}</figcaption></figure>`).join("");
    const misconception = unit.mistakes?.[0];
    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year4-subject-quick-visuals">${visuals}</div><div class="quick-read-points"><div><strong>Core relationship</strong>${esc(unit.learn)}</div><div><strong>Apply</strong>${esc(unit.apply_title)}</div><div><strong>Check the mix-up</strong>${esc(misconception ? `${misconception[0]} — ${misconception[1]}` : unit.quick[0])}</div></div>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.year4SubjectQuick = `${code}-${mode}`;
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.documentElement, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 8000);
})();
