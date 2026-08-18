(() => {
  "use strict";

  if (window.__skillrYear1SlidesV11Loaded) return;
  window.__skillrYear1SlidesV11Loaded = true;

  if (!document.querySelector('link[href*="year1-slides-v11.css"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/assets/year1-slides-v11.css?v=1";
    document.head.appendChild(stylesheet);
  }

  const subjectKey = location.pathname.match(/\/year1\/(maths|english|science)\//)?.[1] || "maths";
  const settings = {
    maths: { label: "Maths", data: "SkillrYear1MathsData", hub: "/year1/curriculum/maths/" },
    english: { label: "English", data: "SkillrYear1EnglishData", hub: "/year1/curriculum/english/" },
    science: { label: "Science", data: "SkillrYear1ScienceData", hub: "/year1/curriculum/science/" }
  }[subjectKey];
  const code = (new URLSearchParams(location.search).get("code") || "").toUpperCase();
  const unit = window[settings.data]?.[code];
  if (!unit) return;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[character]);
  const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  const teacherLayer = (teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect) => ({ teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect });
  const firstMistake = unit.mistakes?.[0] || ["The response does not yet show the intended concept.", "Return to the labelled model and reduce the task to one step."];
  const activities = (unit.activities || []).slice(0, 3);
  const quick = (unit.quick || []).slice(0, 4);
  const mastery = (unit.mastery || []).slice(0, 5);
  const modelDescription = String(unit.model_html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const applicationDescription = String(unit.apply_html || unit.solved_example || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const differentiation = {
    support: `Use one familiar example from ${unit.model_title.toLowerCase()} and let students point, act, draw or answer orally.`,
    core: `Complete the displayed model and one guided activity, explaining the decision with the lesson vocabulary.`,
    extend: `Apply the same concept to a new example and justify an independent check without changing the curriculum target.`
  };
  const masteryItems = quick.map((prompt, index) => ({
    id: `checkpoint-${index + 1}`,
    prompt,
    expectedAnswer: mastery[index] || mastery[0] || unit.learn,
    acceptableEvidence: ["oral explanation", "pointing or acting", "drawing or labelled model", "written response"],
    likelyError: unit.mistakes?.[index % unit.mistakes.length]?.[0] || firstMistake[0],
    remediation: unit.mistakes?.[index % unit.mistakes.length]?.[1] || firstMistake[1]
  }));

  const slides = [
    {
      id: "learning-goal",
      title: unit.title,
      purpose: "Establish the learning goal and observable success criteria.",
      body: `<p class="y1-lead">${escapeHtml(unit.learn)}</p><h2>Success looks like</h2>${list(mastery)}`,
      teacherLayer: teacherLayer("Read the goal, then connect it to one familiar example.", `Ask: What will we be able to explain or do by the end?`, "Restate the goal and identify one success criterion.", "Students name an action or explanation from the displayed criteria.", "Rephrase one criterion as an I can statement and ask the student to repeat it in their own words.")
    },
    {
      id: "concept-model",
      title: unit.model_title,
      purpose: "Teach the central concept through the approved lesson model.",
      body: `<div class="y1-model">${unit.model_html || ""}</div>`,
      teacherLayer: teacherLayer("Reveal and describe the model in the order shown.", `Ask: What do you notice, and which part shows ${escapeHtml(unit.title.toLowerCase())}?`, "Point to model features and explain the relationship they show.", modelDescription || "Students connect the labels or examples to the lesson concept.", firstMistake[1])
    },
    {
      id: "worked-application",
      title: unit.apply_title || "Worked application",
      purpose: "Model how to apply the concept and explain the decision.",
      body: `${unit.solved_example ? `<div class="y1-worked"><h2>Think aloud</h2><p>${escapeHtml(unit.solved_example)}</p></div>` : ""}<div class="y1-model">${unit.apply_html || unit.model_html || ""}</div>`,
      teacherLayer: teacherLayer("Work through the example aloud and name the reason for each decision.", "Ask: Which clue or relationship tells us what to do next?", "Explain the next step before the teacher reveals it.", applicationDescription || "Students use the displayed relationship rather than guessing.", `Return to ${unit.model_title.toLowerCase()} and match each part of the application to the model.`)
    },
    {
      id: "guided-practice",
      title: "Guided practice",
      purpose: "Rehearse the concept through short connected classroom actions.",
      body: `<div class="y1-activity-grid">${activities.map((activity) => `<article><h2>${escapeHtml(activity.title)}</h2><p>${escapeHtml(activity.text)}</p>${activity.visual ? `<strong>${escapeHtml(activity.visual)}</strong>` : ""}</article>`).join("")}</div>`,
      teacherLayer: teacherLayer("Choose one activity, model the first action, then release students to complete it.", "Ask students to explain what they are doing and why it fits the lesson goal.", "Complete the selected activity and explain one decision.", "Students use the target vocabulary and keep their representation connected to the concept.", "Reduce the activity to one example and complete it alongside the student before trying a new example.")
    },
    {
      id: "misconceptions-check",
      title: "Spot and fix the mix-up",
      purpose: "Diagnose common errors and apply an immediate correction.",
      body: `<div class="y1-misconceptions">${(unit.mistakes || []).slice(0, 3).map(([mistake, fix]) => `<article><h2>${escapeHtml(mistake)}</h2><p>${escapeHtml(fix)}</p></article>`).join("")}</div><div class="y1-check"><strong>20–30 second checkpoint</strong><p>${escapeHtml(quick[0] || "Explain the central idea in your own words.")}</p></div>`,
      teacherLayer: teacherLayer("Present the checkpoint without showing a solution and listen to individual responses.", quick[0] || "Explain the central idea in your own words.", "Respond independently, then compare reasoning with a partner.", mastery[0] || "The response accurately demonstrates the central concept.", firstMistake[1])
    },
    {
      id: "mastery-check",
      title: "Quick mastery check",
      purpose: "Check independent understanding and decide whether to continue or reteach.",
      body: `<div class="y1-check-list">${quick.map((prompt, index) => `<p><span>${index + 1}</span>${escapeHtml(prompt)}</p>`).join("")}</div>`,
      teacherLayer: teacherLayer("Ask one prompt at a time and sample several independent responses.", quick.join(" ") || "Explain and apply the lesson concept.", "Answer independently using words, actions, drawings or the displayed model.", `Continue when students demonstrate: ${mastery.join(", ")}.`, `Reteach with ${unit.model_title.toLowerCase()}, then repeat the first checkpoint with a smaller or more familiar example.`)
    }
  ];

  window.SkillrYear1CanonicalSlides = window.SkillrYear1CanonicalSlides || {};
  window.SkillrYear1CanonicalSlides[code] = { schemaVersion: "1.1", code, year: 1, subject: settings.label, differentiation, masteryItems, slides };

  document.title = `${code} ${unit.title} Teacher Slides | SkillrHub`;
  document.body.className = "y1-deck-page";
  document.body.innerHTML = `<header class="y1-toolbar"><a href="/year1/${subjectKey}/${escapeHtml(unit.slug)}/">Back to topic</a><div class="y1-controls" aria-label="Slide navigation"><button id="previousSlide" type="button">Previous</button><span id="slideProgress" aria-live="polite"></span><button id="nextSlide" type="button">Next</button><button id="teacherGuidance" type="button" aria-expanded="false">Teacher guidance</button></div></header><main class="y1-stage" id="slideStage"></main><aside class="y1-guidance" id="guidancePanel" hidden><button id="closeGuidance" type="button" aria-label="Close teacher guidance">Close</button><h2>Teacher guidance</h2><dl></dl></aside>`;

  const stage = document.getElementById("slideStage");
  const guidance = document.getElementById("guidancePanel");
  let current = 0;
  function render() {
    const slide = slides[current];
    stage.innerHTML = `<section class="y1-slide skillr-display-slide" data-slide-id="${slide.id}"><div class="y1-watermark" aria-hidden="true">${Array.from({ length: 12 }, () => "<span>SkillrHub</span>").join("")}</div><p class="y1-eyebrow">${code} • Year 1 ${settings.label}</p><h1>${escapeHtml(slide.title)}</h1><p class="y1-purpose">${escapeHtml(slide.purpose)}</p><div class="y1-content">${slide.body}</div><footer><span>SkillrHub • Live classroom display</span><span>${code}</span></footer></section>`;
    document.getElementById("slideProgress").textContent = `${current + 1} / ${slides.length}`;
    document.getElementById("previousSlide").disabled = current === 0;
    document.getElementById("nextSlide").disabled = current === slides.length - 1;
    guidance.querySelector("dl").innerHTML = `${Object.entries(slide.teacherLayer).map(([key, value]) => `<div><dt>${escapeHtml(key.replace(/([A-Z])/g, " $1"))}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}<div><dt>Support</dt><dd>${escapeHtml(differentiation.support)}</dd></div><div><dt>Core</dt><dd>${escapeHtml(differentiation.core)}</dd></div><div><dt>Extend</dt><dd>${escapeHtml(differentiation.extend)}</dd></div>`;
  }
  const move = (offset) => { current = Math.max(0, Math.min(slides.length - 1, current + offset)); render(); };
  document.getElementById("previousSlide").addEventListener("click", () => move(-1));
  document.getElementById("nextSlide").addEventListener("click", () => move(1));
  document.getElementById("teacherGuidance").addEventListener("click", () => { guidance.hidden = !guidance.hidden; document.getElementById("teacherGuidance").setAttribute("aria-expanded", String(!guidance.hidden)); });
  document.getElementById("closeGuidance").addEventListener("click", () => { guidance.hidden = true; document.getElementById("teacherGuidance").setAttribute("aria-expanded", "false"); });
  document.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); });
  render();
})();
