(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/grade-k\/science\/(ac9s[a-z0-9]+)\/practice\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  function loadData() {
    return new Promise((resolve, reject) => {
      if (window.SkillrFoundationScienceData?.[code]) return resolve();
      const existing = [...document.scripts].find((script) =>
        script.src.includes("/assets/foundation-science-data.js")
      );
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = "/assets/foundation-science-data.js?v=1";
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>\"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    }[char]));
  }

  function ensureStyle() {
    if (document.getElementById("skillr-science-practice-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-science-practice-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:820px;padding:24px 26px;text-align:left}
      #startScreen #quizTitle{font-size:clamp(1.45rem,3vw,2rem);line-height:1.16;margin:8px 0 8px}
      #startScreen .intro-text{font-size:.9rem;line-height:1.45;margin:0 0 10px}
      #startScreen .pre-read-notes{margin:10px 0 14px;padding:12px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}
      #startScreen .pre-read-notes h2{font-size:1.02rem;line-height:1.2;margin:0 0 8px}
      #startScreen .pre-read-notes ul{margin:7px 0 0;padding-left:1.15rem}
      #startScreen .pre-read-notes li{font-size:.84rem;line-height:1.4;margin:4px 0}
      .science-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:0 0 8px}
      .science-quick-visuals.two{grid-template-columns:repeat(2,minmax(0,1fr))}
      .science-quick-visual{overflow:hidden;border:1px solid #dce5ef;border-radius:9px;background:#fff}
      .science-quick-visual img{display:block;width:100%;height:82px;object-fit:cover}
      .science-quick-visual span{display:block;padding:5px 6px;color:#173968;font-size:.7rem;font-weight:800;text-align:center}
      #startScreen .quiz-summary{margin:14px 0;gap:8px}
      #startScreen .quiz-summary>div{padding:10px 8px}
      #startScreen .summary-number{font-size:1.25rem}
      #startScreen .button{min-height:42px;padding:9px 16px}
      @media(max-width:620px){#startScreen .start-card{padding:18px}.science-quick-visuals,.science-quick-visuals.two{grid-template-columns:repeat(2,minmax(0,1fr))}.science-quick-visual img{height:76px}}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const unit = window.SkillrFoundationScienceData?.[code];
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;

    ensureStyle();

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;

    const intro = card.querySelector(".intro-text");
    if (intro) {
      intro.textContent = "A quick recap from the lesson before you practise.";
    }

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      if (summary) card.insertBefore(notes, summary);
      else card.appendChild(notes);
    }

    if (notes.dataset.skillrScienceQuickRead === code) return true;

    const visuals = unit.visuals.slice(0, 3).map((visual) =>
      `<div class="science-quick-visual"><img src="${esc(visual.src)}" alt="${esc(visual.alt)}"><span>${esc(visual.title)}</span></div>`
    ).join("");
    const firstMixUp = unit.mistakes?.[0];
    const items = [
      `<strong>Core idea:</strong> ${esc(unit.learn)}`,
      `<strong>Teaching model:</strong> ${esc(unit.model_title)}.`,
      `<strong>Use it:</strong> ${esc(unit.apply_title)}.`,
      firstMixUp ? `<strong>Common Mix-Up:</strong> ${esc(firstMixUp[0])} — ${esc(firstMixUp[1])}` : null
    ].filter(Boolean);

    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="science-quick-visuals${unit.visuals.length === 2 ? " two" : ""}">${visuals}</div><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrScienceQuickRead = code;
    return true;
  }

  loadData()
    .then(() => {
      if (apply()) return;
      const observer = new MutationObserver(() => {
        if (apply()) observer.disconnect();
      });
      observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 2500);
    })
    .catch((error) => console.error("Skillr Foundation Science Quick Read failed:", error));
})();
