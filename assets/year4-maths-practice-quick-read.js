(() => {
  "use strict";

  if (window.__skillrYear4MathsQuickReadLoaded) return;
  window.__skillrYear4MathsQuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-4\/math\/(ac9m4[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const mode = match[2].toLowerCase();
  const unit = window.SkillrYear4MathsData?.[code];
  if (!unit) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));

  function ensureStyle() {
    if (![...document.styleSheets].some((sheet) => String(sheet.href || "").includes("year4-maths-visuals.css"))) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/year4-maths-visuals.css?v=1";
      document.head.appendChild(link);
    }
    if (document.getElementById("skillr-year4-maths-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year4-maths-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:970px;padding:20px 22px;text-align:left;position:relative;overflow:hidden}.skillr-quiz-brandbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:-4px 0 10px;padding:9px 11px;border:1px solid #d8e5f4;border-radius:12px;background:linear-gradient(90deg,#f7fbff,#eef5ff)}.skillr-quiz-brandbar strong{font-size:1rem;color:#2457d6;font-weight:900}.skillr-quiz-brandbar strong span{color:#173968}.skillr-quiz-brandbar small{color:#5d6c80;font-size:.76rem;font-weight:800;text-align:right}#startScreen .eyebrow{font-size:.75rem;margin:0 0 4px;color:#2457d6}#startScreen #quizTitle{font-size:clamp(1.32rem,2.7vw,1.86rem);line-height:1.16;margin:6px 0;color:#173968}#startScreen .intro-text{font-size:.88rem;line-height:1.42;margin:0 0 9px;color:#5d6c80}#startScreen .pre-read-notes{margin:10px 0 13px;padding:11px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}#startScreen .pre-read-notes h2{font-size:1rem;line-height:1.2;margin:0 0 8px;color:#173968}#startScreen .pre-read-notes ul{margin:8px 0 0;padding-left:1.1rem}#startScreen .pre-read-notes li{font-size:.81rem;line-height:1.4;margin:3px 0}.year4-maths-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 8px}.year4-maths-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:112px}.year4-maths-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.year4-maths-quick-visuals .y4-maths-board{padding:0;border:0;background:transparent;margin:0}.year4-maths-quick-visuals .y4-maths-board>p{display:none}.year4-maths-quick-visuals .y4-card-row span,.year4-maths-quick-visuals .y4-flow span{min-height:27px;padding:5px 6px;font-size:.61rem}.year4-maths-quick-visuals .y4-table span{padding:4px;font-size:.58rem}.year4-maths-quick-visuals .y4-decimal-place{grid-template-columns:repeat(5,1fr);padding:0}.year4-maths-quick-visuals .y4-decimal-place small{font-size:.43rem;padding:3px}.year4-maths-quick-visuals .y4-decimal-place strong{font-size:.88rem;padding:5px}.year4-maths-quick-visuals .y4-decimal-place .decimal-point{display:none}.year4-maths-quick-visuals .y4-hundred-grid{width:105px}.year4-maths-quick-visuals .y4-fraction-bar{height:28px}.year4-maths-quick-visuals .y4-number-line{padding:10px 7px 26px}.year4-maths-quick-visuals .y4-bargraph{height:92px}.year4-maths-quick-visuals .y4-angle{transform:scale(.7);transform-origin:center}.year4-maths-quick-visuals .y4-composite{height:105px}.year4-reasoning-check{border-left:4px solid #2457d6;background:#eef5ff;border-radius:8px;padding:7px 9px;margin:8px 0;font-size:.8rem}.year4-reasoning-check strong{color:#173968}#startScreen .quiz-summary{margin:13px 0;gap:8px}#startScreen .quiz-summary>div{padding:9px 8px}#startScreen .summary-number{font-size:1.2rem}#startScreen .summary-label{font-size:.75rem}#startScreen .button{min-height:42px;padding:9px 16px}@media(max-width:700px){.skillr-quiz-brandbar{display:block}.skillr-quiz-brandbar small{display:block;text-align:left;margin-top:3px}.year4-maths-quick-visuals{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function ensureBrand(card) {
    if (card.querySelector(".skillr-quiz-brandbar")) return;
    const bar = document.createElement("div");
    bar.className = "skillr-quiz-brandbar";
    bar.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Year 4 Maths • ${mode === "test" ? "Test" : "Practice"} Quick Read</small>`;
    card.insertBefore(bar, card.firstChild);
  }

  function apply() {
    const card = document.querySelector("#startScreen .start-card");
    if (!card) return false;
    ensureStyle();
    ensureBrand(card);

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test" ? "Review the visual model and reasoning check, then take the Test." : "Review the visual model and reasoning check, then start Practice.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
    }
    if (notes.dataset.skillrYear4MathsQuickRead === `${code}-${mode}`) return true;

    const visuals = (unit.quick_visuals || []).slice(0, 3).map((item) => `<figure>${item.html}<figcaption>${esc(item.label)}</figcaption></figure>`).join("");
    const firstMixUp = unit.mistakes?.[0];
    const checkQuestion = unit.quick?.[0] || "Explain the key relationship before calculating.";
    const items = [
      `<strong>Core idea:</strong> ${esc(unit.learn)}`,
      `<strong>Worked model:</strong> ${esc(unit.model_title)}.`,
      `<strong>Transfer:</strong> ${esc(unit.apply_title)}.`,
      firstMixUp ? `<strong>Common mix-up:</strong> ${esc(firstMixUp[0])} — ${esc(firstMixUp[1])}` : null
    ].filter(Boolean);

    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year4-maths-quick-visuals">${visuals}</div><div class="year4-reasoning-check"><strong>Reasoning check:</strong> ${esc(checkQuestion)} Do not begin by guessing the operation—identify the relationship first.</div><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrYear4MathsQuickRead = `${code}-${mode}`;
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 4000);
})();
