(() => {
  "use strict";

  if (window.__skillrYear2MathsQuickReadLoaded) return;
  window.__skillrYear2MathsQuickReadLoaded = true;

  const match = location.pathname.match(/^\/quiz\/year-2\/math\/(ac9m2[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const mode = match[2].toLowerCase();

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));
  const plain = (value) => String(value || "").replace(/<br\s*\/?\s*>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => script.src.includes(base));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function loadData() {
    if (!window.SkillrYear2MathsData?.[code]) await loadScript("/assets/year2-maths-data.js?v=2");
    if (!window.SkillrYear2MathsData?.[code]) await loadScript("/assets/year2-maths-data-extra.js?v=1");
  }

  function ensureStyle() {
    if (document.getElementById("skillr-year2-maths-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-maths-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:900px;padding:20px 22px;text-align:left;position:relative;overflow:hidden}
      .skillr-quiz-brandbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:-4px 0 10px;padding:9px 11px;border:1px solid #d8e5f4;border-radius:12px;background:linear-gradient(90deg,#f7fbff,#eef5ff)}
      .skillr-quiz-brandbar strong{font-size:1rem;color:#2457d6;font-weight:900}.skillr-quiz-brandbar strong span{color:#173968}.skillr-quiz-brandbar small{color:#5d6c80;font-size:.76rem;font-weight:800;text-align:right}
      #startScreen .eyebrow{font-size:.75rem;margin:0 0 4px;color:#2457d6}
      #startScreen #quizTitle{font-size:clamp(1.32rem,2.7vw,1.82rem);line-height:1.16;margin:6px 0 6px;color:#173968}
      #startScreen .intro-text{font-size:.88rem;line-height:1.42;margin:0 0 9px;color:#5d6c80}
      #startScreen .pre-read-notes{margin:10px 0 13px;padding:11px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}
      #startScreen .pre-read-notes h2{font-size:1rem;line-height:1.2;margin:0 0 8px;color:#173968}
      #startScreen .pre-read-notes ul{margin:8px 0 0;padding-left:1.1rem}
      #startScreen .pre-read-notes li{font-size:.81rem;line-height:1.4;margin:3px 0}
      .year2-maths-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 8px}
      .year2-maths-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden;min-height:82px}
      .year2-maths-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}
      .year2-maths-quick-visuals .math-model-board{padding:0;border:0;background:transparent;margin:0}.year2-maths-quick-visuals p{display:none}
      .year2-maths-quick-visuals .math-card-row{display:flex!important;flex-wrap:wrap;gap:4px;margin:0}.year2-maths-quick-visuals .math-card-row span{display:inline-flex;align-items:center;justify-content:center;min-height:28px;border:1px solid #d9e5f5;border-radius:8px;background:#fff;padding:5px 6px;color:#173968;font-size:.62rem;font-weight:900}
      .year2-maths-quick-visuals .y2-base-ten{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:0}.year2-maths-quick-visuals .y2-block{display:grid;place-items:center;min-height:42px;border:1px solid #d8e5f4;border-radius:8px;background:#fff}.year2-maths-quick-visuals .y2-block strong{font-size:.95rem;color:#2457d6}.year2-maths-quick-visuals .y2-block span{font-size:.52rem;font-weight:900;color:#49627f;text-transform:uppercase}.year2-maths-quick-visuals .y2-hundreds{background:linear-gradient(90deg,rgba(36,87,214,.08) 1px,transparent 1px),linear-gradient(rgba(36,87,214,.08) 1px,transparent 1px),#fff;background-size:8px 8px}.year2-maths-quick-visuals .y2-tens{background:repeating-linear-gradient(90deg,#fff 0 7px,#edf5ff 7px 14px)}.year2-maths-quick-visuals .y2-ones{background:radial-gradient(circle at 10px 10px,rgba(36,87,214,.22) 0 3px,transparent 4px),#fff;background-size:20px 20px}
      .year2-maths-quick-visuals .y2-number-line{padding:8px;margin:0;border:1px solid #d9e5f5;background:#fff;border-radius:9px}.year2-maths-quick-visuals .y2-number-line__rail{position:relative;height:12px;border-bottom:3px solid #173968;margin:0 7px 4px}.year2-maths-quick-visuals .y2-number-line__rail::before,.year2-maths-quick-visuals .y2-number-line__rail::after{content:'';position:absolute;bottom:-6px;width:2px;height:10px;background:#173968}.year2-maths-quick-visuals .y2-number-line__rail::before{left:0}.year2-maths-quick-visuals .y2-number-line__rail::after{right:0}.year2-maths-quick-visuals .y2-number-line__rail span{position:absolute;bottom:-6px;width:12px;height:12px;border-radius:999px;background:#2457d6;transform:translateX(-50%)}.year2-maths-quick-visuals .y2-number-line__labels{display:flex;justify-content:space-between;font-size:.53rem;color:#49627f}
      .year2-maths-quick-visuals .y2-chart-puzzle{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:0;padding:5px;background:#eef5ff;border:1px solid #d9e5f5;border-radius:9px}.year2-maths-quick-visuals .y2-chart-puzzle span{background:#fff;border:1px solid #d9e5f5;border-radius:7px;text-align:center;padding:5px 2px;font-size:.62rem;font-weight:900;color:#173968}
      #startScreen .quiz-summary{margin:13px 0;gap:8px}#startScreen .quiz-summary>div{padding:9px 8px}#startScreen .summary-number{font-size:1.2rem}#startScreen .summary-label{font-size:.75rem}#startScreen .button{min-height:42px;padding:9px 16px}
      @media(max-width:650px){.skillr-quiz-brandbar{display:block}.skillr-quiz-brandbar small{display:block;text-align:left;margin-top:3px}.year2-maths-quick-visuals{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function solvedExample(unit) {
    const source = plain(unit.model_html || unit.apply_html || "");
    return source.length > 150 ? `${source.slice(0, 147).trim()}…` : source;
  }

  function ensureBrand(card) {
    if (card.querySelector(".skillr-quiz-brandbar")) return;
    const bar = document.createElement("div");
    bar.className = "skillr-quiz-brandbar";
    bar.innerHTML = `<strong>SkillrHub <span>F–10</span></strong><small>Year 2 Maths • ${mode === "test" ? "Test" : "Practice"} Quick Read</small>`;
    card.insertBefore(bar, card.firstChild);
  }

  function apply() {
    const unit = window.SkillrYear2MathsData?.[code];
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;
    ensureStyle();
    ensureBrand(card);

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test" ? "Review the visual notes, then take the Test." : "Review the visual notes, then start Practice.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      if (summary) card.insertBefore(notes, summary);
      else card.appendChild(notes);
    }
    if (notes.dataset.skillrYear2MathsQuickRead === `${code}-${mode}`) return true;

    const firstMixUp = unit.mistakes?.[0];
    const visualStrip = (unit.quick_visuals || []).slice(0,3).map((item) => `<figure>${item.html}<figcaption>${esc(item.label)}</figcaption></figure>`).join("");
    const items = [
      `<strong>Core idea:</strong> ${esc(unit.learn)}`,
      `<strong>Visual model:</strong> ${esc(unit.model_title)}.`,
      `<strong>Solved example:</strong> ${esc(solvedExample(unit))}`,
      `<strong>Use it:</strong> ${esc(unit.apply_title)}.`,
      firstMixUp ? `<strong>Common mix-up:</strong> ${esc(firstMixUp[0])} — ${esc(firstMixUp[1])}` : null
    ].filter(Boolean);

    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year2-maths-quick-visuals">${visualStrip}</div><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrYear2MathsQuickRead = `${code}-${mode}`;
    return true;
  }

  loadData()
    .then(() => {
      if (apply()) return;
      const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
      observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 3000);
    })
    .catch((error) => console.error("Skillr Year 2 Maths Quick Read failed:", error));
})();