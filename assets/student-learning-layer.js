/*
 * Student-first presentation for static curriculum topic pages.
 *
 * This deliberately changes navigation and learning language only. It never
 * invents subject content or replaces an authored worked example. Individual
 * topic authors remain responsible for topic-specific hints and explanations.
 */
(() => {
  "use strict";

  const topicPath = /\/(?:foundation|year\d+)\/(?:maths|science|english)\/ac9[a-z0-9]/i;
  if (!topicPath.test(location.pathname) || /\/teacher-slides?\//i.test(location.pathname)) return;

  const subject = /\/maths\//i.test(location.pathname) ? "maths"
    : /\/science\//i.test(location.pathname) ? "science" : "english";

  const advice = {
    maths: "Circle what is known and what you need to find. Then look for an example above that uses the same representation or operation.",
    science: "Name the scientific idea first. Then use an observation, model or piece of evidence from the lesson to support your answer.",
    english: "Read the wording closely. Identify one precise feature or idea, choose evidence, then explain what it makes the reader think or feel."
  };

  const labels = [
    [/^how to use this unit$/i, "Your learning path", "your-learning-path"],
    [/^what you need to know$/i, "Step 1 · Learn the idea", "learn-the-idea"],
    [/^(revision notes|.*cheat sheet)$/i, "Remember this", "remember-this"],
    [/^(\d+ )?(important )?worked examples?$/i, "Step 2 · Learn by example", "learn-by-example"],
    [/^(common mistakes|common misconceptions.*|common misconceptions and corrections|common misconceptions and quick fixes)$/i, "Avoid this trap", "avoid-this-trap"],
    [/^(\d+ )?important questions( to solve)?$/i, "Step 3 · Try it yourself", "try-it-yourself"],
    [/^solutions with explanations$/i, "Check your thinking", "check-your-thinking"]
  ];

  function headingOf(section) {
    return section.querySelector(":scope > summary strong, :scope > h2, :scope > h3");
  }

  function enhance(root = document) {
    const guide = root.querySelector?.("#topic-guide") || document.querySelector("#topic-guide");
    if (!guide || guide.dataset.studentLearningReady === "true") return;

    const sections = [...guide.querySelectorAll(":scope > details, :scope > section")];
    let found = 0;
    sections.forEach((section) => {
      const heading = headingOf(section);
      if (!heading) return;
      const sourceLabel = heading.textContent.trim().replace(/\s+/g, " ");
      for (const [pattern, replacement, id] of labels) {
        if (!pattern.test(sourceLabel)) continue;
        heading.textContent = replacement;
        section.id ||= id;
        section.classList.add("student-lesson-section", `student-${id}`);
        found += 1;
        break;
      }
      if (/teacher resource|teacher slide|classroom deck/i.test(sourceLabel)) {
        section.classList.add("skillr-optional-teacher-resource");
        heading.textContent = "For teachers · classroom slide";
      }
    });
    if (!found) return;

    guide.dataset.studentLearningReady = "true";
    const existing = guide.querySelector(":scope > .student-learning-start");
    if (!existing) {
      const start = document.createElement("section");
      start.className = "student-learning-start";
      start.setAttribute("aria-label", "Start learning this topic");
      start.innerHTML = `<p class="student-learning-kicker">Start here</p><h2>Learn it one step at a time</h2><p>Don’t memorise the page. Read the idea, follow an example, then have a go before checking your thinking.</p><div class="student-learning-actions"><a href="#learn-the-idea">1. Learn the idea</a><a href="#learn-by-example">2. See an example</a><a href="#try-it-yourself">3. Have a go</a></div>`;
      guide.prepend(start);
    }

    const questions = guide.querySelector("#try-it-yourself ol, #try-it-yourself ul");
    if (questions && !questions.dataset.hintsReady) {
      questions.dataset.hintsReady = "true";
      questions.querySelectorAll(":scope > li").forEach((question) => {
        if (question.querySelector(".student-hint")) return;
        const hint = document.createElement("details");
        hint.className = "student-hint";
        hint.innerHTML = `<summary>Need a hint?</summary><p>${advice[subject]}</p><a href="#learn-by-example">Find a similar worked example ↑</a>`;
        question.append(hint);
      });
    }
  }

  function injectStyle() {
    if (document.getElementById("student-learning-layer-style")) return;
    const style = document.createElement("style");
    style.id = "student-learning-layer-style";
    style.textContent = `
      .student-learning-start{margin:0 0 18px;padding:clamp(18px,3vw,26px);border:1px solid #b9d0ff;border-radius:18px;background:linear-gradient(135deg,#f4f8ff,#fff)}
      .student-learning-start h2{margin:.15rem 0 .45rem;color:#173968}.student-learning-start p{max-width:760px;margin:.3rem 0;line-height:1.55}.student-learning-kicker{font-size:.78rem;font-weight:850;text-transform:uppercase;letter-spacing:.06em;color:#2457d6}
      .student-learning-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}.student-learning-actions a{padding:9px 12px;border:1px solid #c9d8fb;border-radius:9px;background:#fff;color:#173968;font-weight:800;text-decoration:none}.student-learning-actions a:hover{border-color:#2457d6;background:#eef4ff}
      .student-lesson-section{scroll-margin-top:18px}.student-learn-the-idea{border-left:4px solid #2457d6}.student-learn-by-example{border-left:4px solid #13795b}.student-try-it-yourself{border-left:4px solid #9a6700}.student-avoid-this-trap{background:#fffaf2}
      .student-hint{margin:.75rem 0 0;padding:.65rem .8rem;border:1px solid #dbe5f2;border-radius:10px;background:#f8fbff}.student-hint summary{cursor:pointer;color:#173968;font-weight:800}.student-hint p{margin:.6rem 0}.student-hint a{font-weight:750}.skillr-optional-teacher-resource{opacity:.88}
      @media(max-width:620px){.student-learning-actions{display:grid;grid-template-columns:1fr}.student-learning-actions a{text-align:center}}
    `;
    document.head.append(style);
  }

  injectStyle();
  enhance();
  new MutationObserver(() => enhance()).observe(document.documentElement, { childList: true, subtree: true });
})();
