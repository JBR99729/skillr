(() => {
  "use strict";

  if (window.SkillrCurriculumClusterCore) return;

  const FIRST_NATIONS = /first nations|aboriginal|torres strait/i;
  const CATEGORY_RULES = [
    ["Represent and visualise", /represent|model|material|diagram|image|illustration|bar|grid|number line|array|table|graph|map|fold|tile|counter|straw|physical|visual|layout|symbol|notation/],
    ["Understand the relationship", /recognis|understand|relationship|property|equivalent|connection|role|interaction|feature|structure|meaning|compare|classif|identify/],
    ["Use a strategy or process", /solve|calculate|strategy|algorithm|operation|convert|measure|estimate|round|sequence|procedure|read|write|spell|decode|compose|edit/],
    ["Apply in context", /money|dollar|cent|financial|price|cost|budget|measurement|metre|litre|gram|temperature|time|duration|environment|habitat|water|material|online|digital text|practical|everyday|context/],
    ["Investigate and use evidence", /investigat|experiment|observe|collect|survey|data|predict|fair test|finding|evidence|pattern|trial|sample|question/],
    ["Explain, create and communicate", /explain|justify|reason|discuss|communicat|present|create|design|construct|report|respond|evaluate|conclusion|argument|opinion/]
  ];

  const clean = (value) => String(value || "").replace(/\s+/g, " ").replace(/\s*\(teaching context\)\s*/gi, "").trim();

  function headline(text, limit = 92) {
    const source = clean(text);
    const first = source.split(/;\s*(?:for example|including)|\.\s+/i)[0];
    if (first.length <= limit) return first;
    return `${first.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
  }

  function extractElaborations(doc) {
    const headings = [...doc.querySelectorAll("h2")];
    const heading = headings.find((element) => element.textContent.trim().toLowerCase() === "curriculum coverage and elaborations");
    const scope = heading?.closest(".menu-content") || heading?.closest("section") || heading?.parentElement;
    if (!scope) return [];
    return [...scope.querySelectorAll("li")].map((li) => {
      const text = clean(li.textContent);
      const match = text.match(/^(E\d+):\s*(.+)$/i);
      return match ? { label: match[1].toUpperCase(), text: match[2].trim() } : null;
    }).filter(Boolean);
  }

  function categoryFor(text) {
    const lower = clean(text).toLowerCase();
    for (const [name, pattern] of CATEGORY_RULES) if (pattern.test(lower)) return name;
    return "Understand the relationship";
  }

  function mergeSmallClusters(clusters) {
    const entries = [...clusters.entries()].map(([title, items]) => ({ title, items }));
    if (entries.length <= 4) return entries;

    const mergeInto = (fromTitle, toTitle) => {
      const from = entries.find((entry) => entry.title === fromTitle);
      const to = entries.find((entry) => entry.title === toTitle);
      if (!from || !to) return;
      to.items.push(...from.items);
      entries.splice(entries.indexOf(from), 1);
    };

    mergeInto("Represent and visualise", "Understand the relationship");
    if (entries.length > 4) mergeInto("Apply in context", "Use a strategy or process");
    if (entries.length > 4) mergeInto("Explain, create and communicate", "Investigate and use evidence");
    return entries.slice(0, 4);
  }

  function connection(title, subject = "") {
    const subjectName = String(subject).toLowerCase();
    const map = {
      "Represent and visualise": subjectName === "english" ? "See how words, images and layout carry meaning before analysing or creating a text." : "Move from an object or diagram to precise vocabulary, symbols and relationships.",
      "Understand the relationship": "Name the deciding feature, compare examples and connect the new idea to what students already know.",
      "Use a strategy or process": "Choose the process deliberately, show the steps and verify the result rather than copying a rule.",
      "Apply in context": "Keep the underlying concept unchanged while the names, currency, setting or local example changes.",
      "Investigate and use evidence": "Ask a clear question, use a consistent method, record evidence and limit the conclusion to what the evidence supports.",
      "Explain, create and communicate": "Require an explanation, original example or finished text that demonstrates the concept to another person."
    };
    return map[title] || map["Understand the relationship"];
  }

  function evidence(title, items, yearLabel = "") {
    const age = /foundation|year 1|year 2/i.test(yearLabel) ? "shows or says" : "shows, records and explains";
    const labels = items.map((item) => item.label).join(", ");
    const map = {
      "Represent and visualise": `The student ${age} the idea in at least two connected forms and points to how the parts correspond.`,
      "Understand the relationship": `The student compares examples, names the important feature and applies the relationship to a new example.`,
      "Use a strategy or process": `The student selects a suitable process, completes it accurately and checks the result.`,
      "Apply in context": `The student transfers the same concept to a practical or unfamiliar context and includes suitable units or text evidence.`,
      "Investigate and use evidence": `The student records evidence from a consistent method and gives a cautious conclusion supported by that evidence.`,
      "Explain, create and communicate": `The student creates or communicates an original response and justifies the choices made.`
    };
    return `${map[title] || map["Understand the relationship"]} Coverage: ${labels}.`;
  }

  function clusterElaborations(elaborations, options = {}) {
    const required = elaborations.filter((item) => !FIRST_NATIONS.test(item.text));
    const excluded = elaborations.filter((item) => FIRST_NATIONS.test(item.text));
    const grouped = new Map();
    for (const item of required) {
      const category = categoryFor(item.text);
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push(item);
    }
    const yearLabel = options.yearLabel || "";
    const subject = options.subject || "";
    const clusters = mergeSmallClusters(grouped).map((entry, index) => ({
      id: `cluster-${index + 1}`,
      title: entry.title,
      labels: entry.items.map((item) => item.label),
      items: entry.items,
      summary: entry.items.map((item) => headline(item.text, 78)).slice(0, 3),
      connection: connection(entry.title, subject),
      evidence: evidence(entry.title, entry.items, yearLabel)
    }));
    return { clusters, excluded, required };
  }

  function keyTerm(text) {
    const source = clean(text).toLowerCase();
    const terms = [
      "equivalent", "hundredths", "tenths", "fraction", "decimal", "perimeter", "area", "symmetry", "rotation", "duration", "temperature", "producer", "consumer", "decomposer", "evaporation", "condensation", "precipitation", "friction", "gravity", "magnetic", "variable", "evidence", "conclusion", "paragraph", "clause", "connective", "subjective", "objective", "quotation", "homophone", "prefix", "suffix", "inference", "audience", "purpose"
    ];
    return terms.find((term) => source.includes(term)) || source.match(/\b[a-z]{6,}\b/)?.[0] || "concept";
  }

  window.SkillrCurriculumClusterCore = {
    clean,
    headline,
    extractElaborations,
    clusterElaborations,
    isFirstNations: (text) => FIRST_NATIONS.test(String(text || "")),
    keyTerm
  };
})();
