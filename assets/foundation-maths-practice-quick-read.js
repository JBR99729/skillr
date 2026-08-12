(() => {
  "use strict";

  const match = window.location.pathname.match(/^\/quiz\/grade-k\/math\/(ac9mf[a-z0-9]+)\/practice\/?$/i);
  if (!match) return;

  const code = match[1].toUpperCase();

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if ([...document.scripts].some((script) => script.src.includes(src.split("?")[0]))) {
        resolve();
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

  function applyQuickRead() {
    const data = window.SkillrFoundationMathsData?.[code];
    if (!data) return false;

    const card = document.querySelector("#startScreen .start-card");
    if (!card) return false;

    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = "Read these key lesson notes, then start when you are ready.";

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      if (summary) card.insertBefore(notes, summary);
      else card.appendChild(notes);
    }

    const firstMistake = Array.isArray(data.mistakes) && data.mistakes.length ? data.mistakes[0] : null;
    const items = [
      `<strong>Core idea:</strong> ${data.learn}`,
      `<strong>Teaching model:</strong> ${data.model_title}.`,
      `<strong>Use it:</strong> ${data.apply_title}.`,
      firstMistake ? `<strong>Watch for:</strong> ${firstMistake[0]} — ${firstMistake[1]}` : null
    ].filter(Boolean);

    notes.innerHTML = `<h2>60-second Quick Read</h2><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    notes.dataset.skillrTopicSynced = "true";
    return true;
  }

  async function init() {
    try {
      if (!window.SkillrFoundationMathsData?.[code]) {
        await loadScript("/assets/foundation-maths-data-number.js?v=1");
        await loadScript("/assets/foundation-maths-data-other.js?v=1");
      }
      applyQuickRead();
      const observer = new MutationObserver(() => applyQuickRead());
      observer.observe(document.documentElement, { childList: true, subtree: true });
    } catch (error) {
      console.error("Skillr Foundation Maths Quick Read sync failed:", error);
    }
  }

  init();
})();
