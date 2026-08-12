(() => {
  "use strict";

  const match = window.location.pathname.match(/^\/quiz\/grade-k\/math\/(ac9mf[a-z0-9]+)\/practice\/?$/i);
  if (!match) return;

  const code = match[1].toUpperCase();

  const BLOCKS_VISUAL = {
    src: "https://images.pexels.com/photos/8535193/pexels-photo-8535193.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Children using colourful wooden blocks for hands-on maths",
    caption: "Move real blocks or counters while you think."
  };
  const ADDITION_VISUAL = {
    src: "https://images.pexels.com/photos/12585860/pexels-photo-12585860.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Child using colourful number and addition blocks",
    caption: "Act out what changes before writing the number idea."
  };
  const SHAPES_VISUAL = {
    src: "https://images.unsplash.com/photo-1575881737088-a5a2bbf44e85?auto=format&fit=crop&q=80&w=700",
    alt: "Colourful wooden shape pieces for early learning",
    caption: "Handle and sort real pieces before explaining the pattern or shape."
  };
  const VISUALS = {
    AC9MFN01: BLOCKS_VISUAL,
    AC9MFN02: BLOCKS_VISUAL,
    AC9MFN03: BLOCKS_VISUAL,
    AC9MFN04: BLOCKS_VISUAL,
    AC9MFN05: ADDITION_VISUAL,
    AC9MFN06: BLOCKS_VISUAL,
    AC9MFA01: SHAPES_VISUAL,
    AC9MFSP01: SHAPES_VISUAL,
    AC9MFSP02: BLOCKS_VISUAL,
    AC9MFST01: BLOCKS_VISUAL
  };

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

  function installStyles() {
    if (document.getElementById("skillr-maths-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-maths-quick-read-style";
    style.textContent = `
      #startScreen .pre-read-notes{padding:12px 14px!important;margin:10px 0 14px!important;text-align:left}
      #startScreen .pre-read-notes h2{margin:0 0 8px!important;font-size:1rem!important}
      #startScreen .pre-read-notes ul{margin:7px 0 0!important;padding-left:1.1rem!important}
      #startScreen .pre-read-notes li{margin:3px 0!important;font-size:.86rem!important;line-height:1.35!important}
      .maths-quick-visual{display:grid;grid-template-columns:150px 1fr;gap:10px;align-items:center;margin:6px 0 8px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden;background:#fff}
      .maths-quick-visual img{display:block;width:100%;height:88px;object-fit:cover}
      .maths-quick-visual div{padding:7px 9px 7px 0;font-size:.78rem;line-height:1.35;color:#405570}
      .maths-quick-visual strong{display:block;color:#173968;margin-bottom:2px}
      @media(max-width:560px){.maths-quick-visual{grid-template-columns:110px 1fr}.maths-quick-visual img{height:76px}}
    `;
    document.head.appendChild(style);
  }

  function applyQuickRead() {
    const data = window.SkillrFoundationMathsData?.[code];
    if (!data) return false;

    const card = document.querySelector("#startScreen .start-card");
    if (!card) return false;

    installStyles();

    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = "A quick recap from the lesson before you practise.";

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
      firstMistake ? `<strong>Watch for:</strong> ${firstMistake[0]} — ${firstMistake[1]}` : null
    ].filter(Boolean);

    const visual = VISUALS[code];
    const visualHtml = visual
      ? `<div class="maths-quick-visual"><img src="${visual.src}" alt="${visual.alt}" loading="lazy"><div><strong>Remember the activity</strong>${visual.caption}</div></div>`
      : "";

    notes.innerHTML = `<h2>60-second Quick Read</h2>${visualHtml}<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
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
