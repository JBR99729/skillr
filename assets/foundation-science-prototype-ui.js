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

  function syncPracticeQuickRead() {
    if (path !== practicePath) return;
    const card = document.querySelector("#startScreen .start-card");
    if (!card) return;

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
    notes.innerHTML = `<h2>Quick Read</h2><ul>${QUICK_READ.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function apply() {
    addExpansionNote();
    syncPracticeQuickRead();
  }

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
