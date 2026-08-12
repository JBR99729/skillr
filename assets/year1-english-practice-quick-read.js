(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/year-1\/english\/(ac9e1[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();
  const mode = match[2].toLowerCase();

  function loadData() {
    return new Promise((resolve, reject) => {
      if (window.SkillrYear1EnglishData?.[code]) return resolve();
      const existing = [...document.scripts].find((script) => script.src.includes("/assets/year1-english-data.js"));
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = "/assets/year1-english-data.js?v=1";
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));

  function ensureStyle() {
    if (document.getElementById("skillr-year1-english-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-year1-english-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:840px;padding:24px 26px;text-align:left}
      #startScreen #quizTitle{font-size:clamp(1.45rem,3vw,2rem);line-height:1.16;margin:8px 0}
      #startScreen .intro-text{font-size:.9rem;line-height:1.45;margin:0 0 10px}
      #startScreen .pre-read-notes{margin:10px 0 14px;padding:12px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}
      #startScreen .pre-read-notes h2{font-size:1.02rem;line-height:1.2;margin:0 0 8px}
      #startScreen .pre-read-notes ul{margin:7px 0 0;padding-left:1.15rem}
      #startScreen .pre-read-notes li{font-size:.84rem;line-height:1.42;margin:4px 0}
      .year1-english-quick-cards{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 8px}
      .year1-english-quick-cards span{display:inline-flex;align-items:center;justify-content:center;min-height:34px;border:1px solid #d9e5f5;border-radius:9px;background:#fff;padding:7px 9px;color:#173968;font-size:.74rem;font-weight:850}
      #startScreen .quiz-summary{margin:14px 0;gap:8px}
      #startScreen .quiz-summary>div{padding:10px 8px}
      #startScreen .summary-number{font-size:1.25rem}
      #startScreen .button{min-height:42px;padding:9px 16px}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const unit = window.SkillrYear1EnglishData?.[code];
    const card = document.querySelector("#startScreen .start-card");
    if (!unit || !card) return false;
    ensureStyle();

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = unit.title;
    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = mode === "test" ? "Review the key lesson notes, then take the Test." : "Review the key lesson notes, then start Practice.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      if (summary) card.insertBefore(notes, summary);
      else card.appendChild(notes);
    }

    if (notes.dataset.skillrYear1EnglishQuickRead === `${code}-${mode}`) return true;
    const firstMixUp = unit.mistakes?.[0];
    const items = [
      `<strong>Core idea:</strong> ${esc(unit.learn)}`,
      `<strong>Teaching model:</strong> ${esc(unit.model_title)}.`,
      `<strong>Solved example:</strong> ${esc(unit.solved_example)}`,
      `<strong>Use it:</strong> ${esc(unit.apply_title)}.`,
      firstMixUp ? `<strong>Common Mix-Up:</strong> ${esc(firstMixUp[0])} — ${esc(firstMixUp[1])}` : null
    ].filter(Boolean);
    const cards = (unit.visuals || []).slice(0,5).map((item)=>`<span>${esc(item)}</span>`).join("");
    notes.innerHTML = `<h2>60-second Quick Read</h2><div class="year1-english-quick-cards">${cards}</div><ul>${items.map((item)=>`<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    notes.dataset.skillrYear1EnglishQuickRead = `${code}-${mode}`;
    return true;
  }

  loadData()
    .then(() => {
      if (apply()) return;
      const observer = new MutationObserver(() => { if (apply()) observer.disconnect(); });
      observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 2500);
    })
    .catch((error) => console.error("Skillr Year 1 English Quick Read failed:", error));
})();