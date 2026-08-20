"use strict";

(() => {
  const meta = window.skillrPageMeta || {};
  const code = String(meta.curriculumCode || "").toUpperCase();
  const isYear8Science = meta.year === "Year 8" && meta.subject === "Science" && /^AC9S8/.test(code);
  if (!isYear8Science) return;

  const IMPORTANT_NOTES = {
    AC9S8U01: [
      "Plant and animal cells share a cell membrane, cytoplasm and nucleus in the models used at this level.",
      "Typical plant-cell models also show a cell wall, chloroplasts and a large vacuole; not every plant cell contains visible chloroplasts.",
      "Microscope images are observations; diagrams and models simplify colour, scale and arrangement."
    ],
    AC9S8U02: [
      "Always link structure → function → effect on the organ system or organism.",
      "Cells form tissues, tissues form organs and organs work together in organ systems.",
      "Plant and animal transport systems both move materials, but their structures and driving mechanisms differ."
    ],
    AC9S8U03: [
      "Boundary motion determines the geological features expected: divergent, convergent and transform boundaries behave differently.",
      "Earthquake and volcano patterns, seafloor evidence and modern measurements together support plate tectonic theory.",
      "Slab pull, ridge push and mantle movement contribute to plate motion; do not treat one mechanism as the only cause."
    ],
    AC9S8U04: [
      "The rock cycle is a network of possible changes, not one fixed circular path.",
      "Rock properties provide evidence about how the rock formed.",
      "Rock-cycle processes occur over very different timescales, from rapid cooling to slow burial and metamorphism."
    ],
    AC9S8U05: [
      "Classify energy as kinetic or potential, then track where energy is transferred and transformed.",
      "Energy is not used up; some is often transferred to the surroundings as heating or sound.",
      "Define the system before describing energy changes."
    ],
    AC9S8U06: [
      "Elements contain one type of atom; compounds contain chemically joined atom types in fixed ratios; mixtures contain substances together without chemical bonding.",
      "Particle models, symbols and formulas show different kinds of information and all have limitations.",
      "Do not infer true particle size, spacing or colour from a simplified model."
    ],
    AC9S8U07: [
      "A physical change does not form a new substance; a chemical change does.",
      "Use several observations together before concluding that a chemical reaction occurred.",
      "Temperature change, gas production, precipitate formation or persistent colour change can be evidence, but no single sign is always conclusive."
    ]
  };

  function hasSupportSheet() {
    return [...document.querySelectorAll("details.curriculum-topic-section summary")].some((summary) => {
      const text = summary.textContent.toLowerCase();
      return text.includes("cheat sheet") || text.includes("important notes");
    });
  }

  function makeImportantNotes() {
    if (hasSupportSheet()) return;
    const notes = IMPORTANT_NOTES[code] || [
      "Focus on the central scientific relationship in this curriculum code rather than memorising isolated facts.",
      "Use observations or data as evidence, then explain what the evidence supports.",
      "Scientific models simplify reality; be able to state what a model shows well and one limitation."
    ];

    const details = document.createElement("details");
    details.className = "curriculum-topic-section";
    details.open = true;
    const summary = document.createElement("summary");
    summary.innerHTML = "<strong>Important notes</strong>";
    const body = document.createElement("div");
    body.className = "curriculum-detail-body";
    const list = document.createElement("ul");
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      list.appendChild(li);
    });
    body.appendChild(list);
    details.append(summary, body);

    const topicGuide = document.getElementById("topic-guide");
    if (!topicGuide) return;
    const sections = [...topicGuide.querySelectorAll(":scope > details.curriculum-topic-section")];
    const insertBefore = sections.find((section) => {
      const text = section.querySelector("summary")?.textContent.toLowerCase() || "";
      return text.includes("worked example") || text.includes("australian curriculum") || text.includes("resources");
    });
    if (insertBefore) topicGuide.insertBefore(details, insertBefore);
    else topicGuide.appendChild(details);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", makeImportantNotes, { once: true });
  else makeImportantNotes();
})();
