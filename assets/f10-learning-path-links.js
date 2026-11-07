(() => {
  "use strict";

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const topicMatch = path.match(/^\/(year(?:10|[1-9]))\/(maths|science|english)\/(ac9[a-z0-9]+-[^/]+)$/i);
  if (!topicMatch) return;
  if (document.querySelector('[data-skillr-learning-path]')) return;

  const yearLabel = (unit) => `Year ${unit.yearNumber}`;
  const subjectLabel = (unit) => unit.learningArea === "Mathematics" ? "Maths" : unit.learningArea;

  function makeLink(unit, label, explanation) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    const link = document.createElement("a");
    link.href = unit.url;
    link.textContent = `${yearLabel(unit)} ${unit.title} (${unit.code})`;
    const note = document.createElement("span");
    note.textContent = ` — ${explanation}`;
    item.append(strong, link, note);
    return item;
  }

  fetch("/assets/learning-path-index.json", { credentials: "same-origin" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("curriculum manifest unavailable")))
    .then((data) => {
      const code = (document.querySelector(".curriculum-eyebrow")?.textContent.match(/AC9[A-Z0-9]+/i)?.[0] || path.match(/ac9[a-z0-9]+/i)?.[0] || "").toUpperCase();
      const current = data.topics[code];
      const related = data.paths[code];
      if (!current || !related) return;

      const prior = data.topics[related.prior];
      const companion = data.topics[related.companion];
      const next = data.topics[related.next];

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

      if (prior) list.appendChild(makeLink(prior, "Build first", "review the closest earlier-year foundation before this lesson"));
      if (companion) list.appendChild(makeLink(companion, "Learn alongside", "connect this lesson with a closely related topic in the same year"));
      if (next) list.appendChild(makeLink(next, "Next step", "continue the same concept into the following year"));

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

      // Add a compact ItemList schema so the semantic relationship is explicit
      // without changing the canonical topic page or duplicating curriculum text.
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${code} learning pathway`,
        itemListElement: links.map((unit, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${yearLabel(unit)} ${unit.title}`,
          url: new URL(unit.url, window.location.origin).href
        }))
      });
      document.head.appendChild(schema);
    })
    .catch(() => {});
})();
