(() => {
  "use strict";

  if (window.__skillrYear2EnglishQuickReadLoaded) return;
  window.__skillrYear2EnglishQuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-2\/english\/(ac9e2[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const mode = match[2].toLowerCase();
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));

  function loadData() {
    return new Promise((resolve, reject) => {
      if (window.SkillrYear2EnglishData?.[code]) return resolve();
      const existing = [...document.scripts].find((script) => script.src.includes("/assets/year2-english-data.js"));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = "/assets/year2-english-data.js?v=1";
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureStyle() {
    if (document.getElementById("skillr-year2-english-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-english-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:920px;padding:20px 22px;text-align:left;position:relative;overflow:hidden}.skillr-quiz-brandbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:-4px 0 10px;padding:9px 11px;border:1px solid #d8e5f4;border-radius:12px;background:linear-gradient(90deg,#f7fbff,#eef5ff)}.skillr-quiz-brandbar strong{font-size:1rem;color:#2457d6;font-weight:900}.skillr-quiz-brandbar strong span{color:#173968}.skillr-quiz-brandbar small{color:#5d6c80;font-size:.76rem;font-weight:800;text-align:right}#startScreen .eyebrow{font-size:.75rem;margin:0 0 4px;color:#2457d6}#startScreen #quizTitle{font-size:clamp(1.32rem,2.7vw,1.82rem);line-height:1.16;margin:6px 0;color:#173968}#startScreen .intro-text{font-size:.88rem;line-height:1.42;margin:0 0 9px;color:#5d6c80}#startScreen .pre-read-notes{margin:10px 0 13px;padding:11px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}#startScreen .pre-read-notes h2{font-size:1rem;margin:0 0 8px;color:#173968}#startScreen .pre-read-notes ul{margin:8px 0 0;padding-left:1.1rem}#startScreen .pre-read-notes li{font-size:.81rem;line-height:1.4;margin:3px 0}.year2-english-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 8px}.year2-english-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:92px}.year2-english-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.year2-english-quick-visuals .english-model-board{padding:0;border:0;background:transparent;margin:0}.year2-english-quick-visuals p{display:none}.year2-english-quick-visuals .english-card-row,.year2-english-quick-visuals .english-flow,.year2-english-quick-visuals .english-sentence-strip,.year2-english-quick-visuals .english-sound-boxes{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px}.year2-english-quick-visuals .english-card-row span,.year2-english-quick-visuals .english-flow span,.year2-english-quick-visuals .english-sentence-strip span,.year2-english-quick-visuals .english-sound-boxes span{display:inline-flex;align-items:center;justify-content:center;min-height:27px;border:1px solid #d9e5f5;border-radius:8px;background:#fff;padding:4px 6px;color:#173968;font-size:.58rem;font-weight:900;text-align:center}.year2-english-quick-visuals .english-flow b{color:#2457d6}.year2-english-quick-visuals .english-panels{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}.year2-english-quick-visuals .english-panels>div{position:relative;min-height:58px;border:1px solid #d9e5f5;border-radius:7px;background:#fff;padding:17px 4px 4px;display:grid;place-items:center;text-align:center}.year2-english-quick-visuals .english-panels small{position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;display:grid;place-items:center;background:#2457d6;color:#fff;font-size:.42rem;font-weight:900}.year2-english-quick-visuals .english-panels strong{font-size:.5rem;color:#173968}.year2-english-quick-visuals .english-sound-boxes span{min-width:28px;border-width:2px}#startScreen .quiz-summary{margin:13px 0;gap:8px}#startScreen .quiz-summary>div{padding:9px 8px}#startScreen .summary-number{font-size:1.2rem}#startScreen .summary-label{font-size:.75rem}#startScreen .button{min-height:42px;padding:9px 16px}@media(max-width:650px){.skillr-quiz-brandbar{display:block}.skillr-quiz-brandbar small{display:block;text-align:left;margin-top:3px}.year2-english-quick-visuals{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const unit = window.SkillrYear2EnglishData?.[code];
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;
    ensureStyle();

    if (!card.querySelector(".skillr-quiz-brandbar")) {
      const bar = document.createElement("div");
      bar.className = "skillr-quiz-brandbar";
      bar.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Year 2 English • ${mode === "test" ? "Test" : "Practice"} Quick Read</small>`;
      card.insertBefore(bar, card.firstChild);
    }

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test" ? "Review the visual notes, then take the Test." : "Review the visual notes, then start Practice.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
    }
    if (notes.dataset.skillrYear2EnglishQuickRead === `${code}-${mode}`) return true;

    const firstMixUp = unit.mistakes?.[0];
    const visuals = (unit.quick_visuals || []).slice(0, 3).map((item) => `<figure>${item.html}<figcaption>${esc(item.label)}</figcaption></figure>`).join("");
    const items = [
      `<strong>Core idea:</strong> ${esc(unit.learn)}`,
      `<strong>Teaching model:</strong> ${esc(unit.model_title)}.`,
      `<strong>Use it:</strong> ${esc(unit.apply_title)}.`,
      firstMixUp ? `<strong>Watch for:</strong> ${esc(firstMixUp[0])} — ${esc(firstMixUp[1])}` : null
    ].filter(Boolean);

    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year2-english-quick-visuals">${visuals}</div><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrYear2EnglishQuickRead = `${code}-${mode}`;
    return true;
  }

  loadData().then(() => {
    if (apply()) return;
    const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3500);
  }).catch((error) => console.error("Skillr Year 2 English Quick Read failed:", error));
})();