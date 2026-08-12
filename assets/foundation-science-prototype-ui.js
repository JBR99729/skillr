(() => {
  "use strict";

  const path = window.location.pathname;
  const topicPath = "/foundation/science/ac9sfu01-observe-external-features-of-plants-and-animals-and-describe/";
  const practicePath = "/quiz/grade-k/science/ac9sfu01/practice/";

  const QUICK_READ = [
    "Look closely at what can be seen on the outside of plants and animals.",
    "Name visible external features such as roots, leaves, feathers, wings, scales, fins, eyes or legs.",
    "Compare the features, then group living things using one clear observable rule and explain the rule."
  ];

  const QUICK_VISUALS = [
    {
      src: "https://images.unsplash.com/photo-1728399818501-88271908292e?auto=format&fit=crop&q=78&w=700",
      alt: "Plant showing leaves and visible roots",
      label: "Plant",
      note: "roots • stem • leaves"
    },
    {
      src: "https://images.unsplash.com/photo-1673434524408-22e6ef86a1ef?auto=format&fit=crop&q=78&w=700",
      alt: "Close view of bird feathers",
      label: "Bird",
      note: "feathers • wings • beak"
    },
    {
      src: "https://images.unsplash.com/photo-1722542186120-17b4248100ad?auto=format&fit=crop&q=78&w=700",
      alt: "Close view of a fish showing scales",
      label: "Fish",
      note: "scales • fins • tail"
    }
  ];

  function addExpansionNote() {
    if (path !== topicPath || document.getElementById("skillr-expansion-note")) return;
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    if (!lesson) return;

    const section = document.createElement("section");
    section.id = "skillr-expansion-note";
    section.className = "lesson-part";
    section.innerHTML = `
      <div style="border:1px solid #d7e3fb;background:#f7faff;border-radius:11px;padding:10px 12px">
        <strong style="color:#173968">Need more detail on this topic?</strong>
        <p style="margin:5px 0 0">Email <a href="mailto:skillrhublearning@gmail.com">skillrhublearning@gmail.com</a> with the part you would like explained further. SkillrHub will use that feedback to expand this section.</p>
      </div>`;
    lesson.appendChild(section);
  }

  function installPracticeStyles() {
    if (path !== practicePath || document.getElementById("skillr-science-quick-read-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-science-quick-read-style";
    style.textContent = `
      #startScreen .start-card{max-width:900px;padding:24px 28px;text-align:left}
      #startScreen .eyebrow{text-align:center}
      #startScreen #quizTitle{margin:7px 0 8px;text-align:center;font-size:clamp(1.45rem,3.2vw,2.05rem);line-height:1.14}
      #startScreen .intro-text{margin:0 0 10px;text-align:center;font-size:.92rem;line-height:1.45}
      #startScreen .pre-read-notes{margin:10px 0 14px;padding:12px 14px;border:1px solid #dbe4ef;border-radius:12px;background:#f8fbff;text-align:left}
      #startScreen .pre-read-notes h2{margin:0 0 8px;font-size:1rem;line-height:1.2;color:#173968}
      #startScreen .pre-read-notes ul{margin:7px 0 0;padding-left:1.1rem}
      #startScreen .pre-read-notes li{margin:3px 0;font-size:.86rem;line-height:1.35}
      .science-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:8px 0 6px}
      .science-quick-visual{overflow:hidden;border:1px solid #dbe4ef;border-radius:9px;background:#fff}
      .science-quick-visual img{display:block;width:100%;height:86px;object-fit:cover}
      .science-quick-visual div{padding:5px 7px;font-size:.74rem;line-height:1.25;color:#52657e}
      .science-quick-visual strong{display:block;color:#173968;font-size:.78rem}
      #startScreen .quiz-summary{margin:14px 0;gap:8px}
      #startScreen .quiz-summary>div{padding:10px 8px}
      #startScreen .summary-number{font-size:1.25rem}
      #startScreen #startButton{display:block;margin:8px auto 0}
      @media(max-width:620px){#startScreen .start-card{padding:18px 15px}.science-quick-visuals{grid-template-columns:1fr 1fr 1fr}.science-quick-visual img{height:72px}.science-quick-visual div{font-size:.68rem}}
    `;
    document.head.appendChild(style);
  }

  function syncPracticeQuickRead() {
    if (path !== practicePath) return;
    const card = document.querySelector("#startScreen .start-card");
    if (!card) return;

    installPracticeStyles();

    const title = card.querySelector("#quizTitle");
    if (title) title.textContent = "Living Things and External Features";

    const intro = card.querySelector(".intro-text");
    if (intro) intro.textContent = "A quick recap from the lesson before you practise.";

    // New prototype pages carry their own permanent visual Quick Read.
    // Do not add a second recap block when that panel is already present.
    if (card.querySelector(".science-quick-read")) {
      card.querySelectorAll(".pre-read-notes").forEach((node) => node.remove());
      return;
    }

    let notes = card.querySelector(".pre-read-notes");
    if (!notes) {
      notes = document.createElement("section");
      notes.className = "pre-read-notes";
      const summary = card.querySelector(".quiz-summary");
      if (summary) card.insertBefore(notes, summary);
      else card.appendChild(notes);
    }

    notes.dataset.skillrTopicSynced = "true";
    notes.innerHTML = `
      <h2>60-second Quick Read</h2>
      <div class="science-quick-visuals">
        ${QUICK_VISUALS.map((item) => `<div class="science-quick-visual"><img src="${item.src}" alt="${item.alt}" loading="lazy"><div><strong>${item.label}</strong>${item.note}</div></div>`).join("")}
      </div>
      <ul>${QUICK_READ.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function apply() {
    addExpansionNote();
    syncPracticeQuickRead();
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
