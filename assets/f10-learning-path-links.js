(() => {
  "use strict";

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const topicMatch = path.match(/^\/(foundation|year(?:10|[1-9]))\/(maths|science|english)\/(ac9[a-z0-9]+-[^/]+)$/i);
  if (!topicMatch) return;
  if (document.querySelector('[data-skillr-learning-path]')) return;

  const STOP = new Set([
    "and","the","a","an","of","to","in","on","for","with","using","use","used","from","by","as","at","is","are","be","or","that","this","these","their","its","into","including","through","within","between","different","variety","ways","situations","contexts","objects","events","students","student"
  ]);

  const words = (value) => String(value || "")
    .toLowerCase()
    .replace(/\\frac\s*\{?(\d+)\}?\s*\{?(\d+)\}?/g, "$1 $2 fraction")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP.has(word));

  const tokenSet = (unit) => new Set(words(`${unit.title || ""} ${unit.description || ""} ${unit.strand || ""} ${unit.subStrand || ""}`));
  const overlap = (a, b) => {
    let shared = 0;
    a.forEach((token) => { if (b.has(token)) shared += 1; });
    return shared;
  };

  const sameText = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
  const yearLabel = (unit) => unit.yearNumber === 0 ? "Foundation" : `Year ${unit.yearNumber}`;
  const subjectLabel = (unit) => unit.learningArea === "Mathematics" ? "Maths" : unit.learningArea;
  const cleanTitle = (unit) => String(unit.title || unit.description || unit.code)
    .replace(/\\frac\s*\{?(\d+)\}?\s*\{?(\d+)\}?/g, "$1/$2")
    .replace(/\s+/g, " ")
    .trim();

  function scoreCandidate(current, candidate, relation) {
    if (!candidate || candidate.code === current.code || candidate.learningArea !== current.learningArea) return -999;
    const currentTokens = tokenSet(current);
    const candidateTokens = tokenSet(candidate);
    let score = overlap(currentTokens, candidateTokens) * 4;
    if (current.strand && sameText(current.strand, candidate.strand)) score += 7;
    if (current.subStrand && sameText(current.subStrand, candidate.subStrand)) score += 14;

    if (relation === "prior") {
      if (candidate.yearNumber !== current.yearNumber - 1) return -999;
      score += 8;
    } else if (relation === "next") {
      if (candidate.yearNumber !== current.yearNumber + 1) return -999;
      score += 8;
    } else if (relation === "companion") {
      if (candidate.yearNumber !== current.yearNumber) return -999;
      score += 6;
      const distance = Math.abs(Number(candidate.sourceOrder || 0) - Number(current.sourceOrder || 0));
      score += Math.max(0, 4 - distance);
    }
    return score;
  }

  function choose(units, current, relation, used) {
    return units
      .filter((unit) => !used.has(unit.code))
      .map((unit) => ({ unit, score: scoreCandidate(current, unit, relation) }))
      .filter((item) => item.score >= (relation === "companion" ? 10 : 12))
      .sort((a, b) => b.score - a.score || Number(a.unit.sourceOrder || 0) - Number(b.unit.sourceOrder || 0))[0]?.unit || null;
  }

  function makeLink(unit, label, explanation) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    const link = document.createElement("a");
    link.href = unit.url;
    link.textContent = `${unit.code} — ${cleanTitle(unit)}`;
    const note = document.createElement("span");
    note.textContent = ` ${explanation}`;
    item.append(strong, link, note);
    return item;
  }

  fetch("/data/curriculum-units.json", { credentials: "same-origin" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("curriculum manifest unavailable")))
    .then((data) => {
      const units = Array.isArray(data) ? data : Array.isArray(data.units) ? data.units : [];
      const code = (document.querySelector(".curriculum-eyebrow")?.textContent.match(/AC9[A-Z0-9]+/i)?.[0] || path.match(/ac9[a-z0-9]+/i)?.[0] || "").toUpperCase();
      const current = units.find((unit) => String(unit.code).toUpperCase() === code);
      if (!current) return;

      const used = new Set([current.code]);
      const prior = current.yearNumber > 0 ? choose(units, current, "prior", used) : null;
      if (prior) used.add(prior.code);
      const companion = choose(units, current, "companion", used);
      if (companion) used.add(companion.code);
      const next = current.yearNumber < 10 ? choose(units, current, "next", used) : null;
      if (next) used.add(next.code);

      const links = [prior, companion, next].filter(Boolean);
      if (!links.length) return;

      const section = document.createElement("section");
      section.className = "curriculum-topic-section skillr-learning-path";
      section.dataset.skillrLearningPath = "true";
      section.setAttribute("aria-labelledby", "skillr-learning-path-title");

      const title = document.createElement("h2");
      title.id = "skillr-learning-path-title";
      title.textContent = "Learning pathway";
      const intro = document.createElement("p");
      intro.textContent = `Build this ${yearLabel(current)} ${subjectLabel(current)} topic in sequence with closely related curriculum learning.`;
      const list = document.createElement("ul");

      if (prior) list.appendChild(makeLink(prior, "Build first", "Revises the closest earlier-year foundation for this concept."));
      if (companion) list.appendChild(makeLink(companion, "Learn alongside", "Connects this lesson to a closely related topic in the same year."));
      if (next) list.appendChild(makeLink(next, "Next step", "Shows how this concept develops in the following year."));

      const hub = document.createElement("p");
      const hubLink = document.createElement("a");
      hubLink.href = `/${current.yearFolder}/curriculum/${current.subjectSlug}/`;
      hubLink.textContent = `Browse all ${yearLabel(current)} ${subjectLabel(current)} curriculum topics`;
      hub.appendChild(hubLink);
      section.append(title, intro, list, hub);

      const mainColumn = document.querySelector("main.curriculum-layout > div, main .curriculum-layout > div, main.curriculum-layout, main");
      if (!mainColumn) return;
      const feedback = mainColumn.querySelector(".skillr-feedback-card");
      const mapping = [...mainColumn.querySelectorAll(".curriculum-topic-section")].find((node) => /international curriculum mapping/i.test(node.textContent || ""));
      if (feedback) mainColumn.insertBefore(section, feedback);
      else if (mapping) mainColumn.insertBefore(section, mapping);
      else mainColumn.appendChild(section);
    })
    .catch(() => {});
})();
