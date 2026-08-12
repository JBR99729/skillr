(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-2\/math\/(ac9m2[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const mode = match[2].toLowerCase();

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));
  const plain = (value) => String(value || "").replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  function loadData() {
    return new Promise((resolve, reject) => {
      if (window.SkillrYear2MathsData?.[code]) return resolve();
      const existing = [...document.scripts].find((script) => script.src.includes("/assets/year2-maths-data.js"));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = "/assets/year2-maths-data.js?v=1";
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureStyle() {
    if (document.getElementById("skillr-year2-maths-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year2-maths-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:900px;padding:22px 24px;text-align:left}
      #startScreen #quizTitle{font-size:clamp(1.35rem,3vw,1.9rem);line-height:1.15;margin:7px 0 7px}
      #startScreen .intro-text{font-size:.9rem;line-height:1.42;margin:0 0 10px}
      #startScreen .pre-read-notes{margin:10px 0 14px;padding:12px;border:1px solid #dce5ef;border-radius:14px;background:#fbfcfe}
      #startScreen .pre-read-notes h2{font-size:1.02rem;line-height:1.2;margin:0 0 8px;color:#173968}
      #startScreen .pre-read-notes ul{margin:8px 0 0;padding-left:1.15rem}
      #startScreen .pre-read-notes li{font-size:.83rem;line-height:1.42;margin:4px 0}
      .year2-maths-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 9px}
      .year2-maths-quick-visuals figure{margin:0;border:1px solid #d9e5f5;border-radius:12px;background:#fff;padding:7px;overflow:hidden}
      .year2-maths-quick-visuals figcaption{margin-top:4px;color:#173968;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em}
      .year2-maths-quick-visuals .math-model-board{padding:0;border:0;background:transparent;margin:0}.year2-maths-quick-visuals p{display:none}.year2-maths-quick-visuals .math-card-row{display:none}
      .year2-maths-quick-visuals .y2-base-ten{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:0}.year2-maths-quick-visuals .y2-block{display:grid;place-items:center;min-height:44px;border:1px solid #d8e5f4;border-radius:8px;background:#fff}.year2-maths-quick-visuals .y2-block strong{font-size:1rem;color:#2457d6}.year2-maths-quick-visuals .y2-block span{font-size:.55rem;font-weight:900;color:#49627f;text-transform:uppercase}.year2-maths-quick-visuals .y2-hundreds{background:linear-gradient(90deg,rgba(36,87,214,.08) 1px,transparent 1px),linear-gradient(rgba(36,87,214,.08) 1px,transparent 1px),#fff;background-size:8px 8px}.year2-maths-quick-visuals .y2-tens{background:repeating-linear-gradient(90deg,#fff 0 7px,#edf5ff 7px 14px)}.year2-maths-quick-visuals .y2-ones{background:radial-gradient(circle at 10px 10px,rgba(36,87,214,.22) 0 3px,transparent 4px),#fff;background-size:20px 20px}
      .year2-maths-quick-visuals .y2-number-line{padding:8px;margin:0;border:1px solid #d9e5f5;background:#fff;border-radius:9px}.year2-maths-quick-visuals .y2-number-line__rail{position:relative;height:12px;border-bottom:3px solid #173968;margin:0 7px 4px}.year2-maths-quick-visuals .y2-number-line__rail::before,.year2-maths-quick-visuals .y2-number-line__rail::after{content:'';position:absolute;bottom:-6px;width:2px;height:10px;background:#173968}.year2-maths-quick-visuals .y2-number-line__rail::before{left:0}.year2-maths-quick-visuals .y2-number-line__rail::after{right:0}.year2-maths-quick-visuals .y2-number-line__rail span{position:absolute;bottom:-6px;width:12px;height:12px;border-radius:999px;background:#2457d6;transform:translateX(-50%)}.year2-maths-quick-visuals .y2-number-line__labels{display:flex;justify-content:space-between;font-size:.55rem;color:#49627f}
      .year2-maths-quick-visuals .y2-chart-puzzle{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:0;padding:5px;background:#eef5ff;border:1px solid #d9e5f5;border-radius:9px}.year2-maths-quick-visuals .y2-chart-puzzle span{background:#fff;border:1px solid #d9e5f5;border-radius:7px;text-align:center;padding:5px 2px;font-size:.65rem;font-weight:900;color:#173968}
      #startScreen .quiz-summary{margin:14px 0;gap:8px}
      #startScreen .quiz-summary>div{padding:10px 8px}
      #startScreen .summary-number{font-size:1.25rem}
      #startScreen .button{min-height:42px;padding:9px 16px}
      @media(max-width:650px){.year2-maths-quick-visuals{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function solvedExample(unit) {
    const source = plain(unit.model_html || unit.apply_html || "");
    return source.length > 165 ? `${source.slice(0, 162).trim()}…` : source;
  }

  function apply() {
    const unit = window.SkillrYear2MathsData?.[code];
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;
    ensureStyle();

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

  loadData().then(() => {
    if (apply()) return;
    const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3000);
  }).catch((error) => console.error("Skillr Year 2 Maths Quick Read failed:", error));
})();