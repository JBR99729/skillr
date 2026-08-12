(() => {
  "use strict";

  if (window.__skillrCurriculumStrandCoverageLoaded) return;
  window.__skillrCurriculumStrandCoverageLoaded = true;

  const pathMatch = location.pathname.match(/^\/(foundation|year\d+)\/(maths|science|english)\/(ac9[a-z0-9]+)/i);
  if (!pathMatch) return;

  const yearRaw = pathMatch[1].toLowerCase();
  const subject = pathMatch[2].toLowerCase();
  const code = pathMatch[3].toUpperCase();
  const yearLabel = yearRaw === "foundation" ? "Foundation" : `Year ${yearRaw.replace("year", "")}`;
  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[char]));

  function ensureStyle() {
    if (document.getElementById("skillr-curriculum-strand-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-curriculum-strand-style";
    style.textContent = `
      .curriculum-strand-section{border-top:1px solid #e6ebf2;padding-top:3px}.curriculum-strand-intro{border:1px solid #c9d9ee;background:linear-gradient(135deg,#f7faff,#eef5ff);border-radius:12px;padding:11px 13px;margin-bottom:10px}.curriculum-strand-intro strong{color:#173968}.curriculum-strand-intro p{margin:4px 0;line-height:1.45}.curriculum-worldwide-note{font-size:.83rem;color:#53677f}.curriculum-strand-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.curriculum-strand-card{border:1px solid #dce5ef;border-radius:13px;background:#fff;padding:12px;box-shadow:0 2px 7px rgba(28,55,91,.035)}.curriculum-strand-card__head{display:flex;align-items:flex-start;gap:8px;margin-bottom:7px}.curriculum-strand-code{flex:0 0 auto;display:inline-grid;place-items:center;min-width:36px;height:28px;border-radius:999px;background:#2457d6;color:#fff;font-size:.75rem;font-weight:900}.curriculum-strand-card h4{margin:2px 0 0;color:#173968;font-size:.95rem;line-height:1.3}.curriculum-strand-exact{margin:0 0 8px;padding:8px 9px;border-left:3px solid #9dbcf6;background:#f8fafc;border-radius:0 8px 8px 0;font-size:.84rem;line-height:1.42;color:#3e5067}.curriculum-strand-card dl{display:grid;gap:6px;margin:0}.curriculum-strand-card dl>div{display:grid;grid-template-columns:115px 1fr;gap:7px}.curriculum-strand-card dt{font-weight:900;color:#2457d6;font-size:.78rem}.curriculum-strand-card dd{margin:0;font-size:.84rem;line-height:1.4}.curriculum-strand-global{margin-top:7px;padding:7px 8px;border:1px solid #ead9ae;background:#fffaf0;border-radius:9px;font-size:.79rem;line-height:1.38}.curriculum-strand-global strong{color:#815d00}@media(max-width:800px){.curriculum-strand-grid{grid-template-columns:1fr}}@media(max-width:520px){.curriculum-strand-card dl>div{grid-template-columns:1fr;gap:2px}}
    `;
    document.head.appendChild(style);
  }

  function locateElaborations() {
    const headings = [...document.querySelectorAll("h2")];
    const heading = headings.find((element) => element.textContent.trim().toLowerCase() === "curriculum coverage and elaborations");
    if (!heading) return [];
    const scope = heading.closest(".menu-content") || heading.closest("section") || heading.parentElement;
    if (!scope) return [];
    return [...scope.querySelectorAll("li")].map((li) => {
      const strong = li.querySelector("strong");
      const strongText = strong?.textContent.trim() || "";
      const full = li.textContent.replace(/\s+/g, " ").trim();
      const match = strongText.match(/^(E\d+):?$/i) || full.match(/^(E\d+):\s*(.+)$/i);
      if (!match) return null;
      const label = match[1].toUpperCase();
      const text = full.replace(/^E\d+:\s*/i, "").trim();
      return { label, text };
    }).filter(Boolean);
  }

  function headline(text) {
    const clean = text.replace(/\s*\(teaching context\)\s*/gi, "").trim();
    const first = clean.split(/;\s*(?:for example|including)|\.\s+/i)[0];
    if (first.length <= 105) return first;
    return `${first.slice(0, 102).replace(/\s+\S*$/, "")}…`;
  }

  function teachingFocus(text) {
    const lower = text.toLowerCase();
    const parts = [];
    if (/first nations|aboriginal|torres strait|cultural/.test(lower)) {
      parts.push("Teach this as a specific Australian Curriculum cultural-context strand using accurate, authorised and respectful sources rather than generalisations.");
    }
    if (/money|dollars|cents|coins|notes|financial|price|cost|budget/.test(lower)) {
      parts.push("Connect the mathematics to financial representations, emphasising the numerical structure rather than memorising one currency example.");
    }
    if (/metre|centimetre|millimetre|kilometre|gram|kilogram|litre|millilitre|temperature|metric|measurement|measure/.test(lower)) {
      parts.push("Use measurable quantities, labelled units and conversion or comparison reasoning so the representation remains tied to a real attribute.");
    }
    if (/digital tool|spreadsheet|software|virtual|technology/.test(lower)) {
      parts.push("Model the mathematics first, then use the digital tool to test, display, compare or verify rather than replacing the reasoning.");
    }
    if (/bar|grid|number line|array|material|model|fold|tile|counter|straw|decipipe|diagram|representation/.test(lower)) {
      parts.push("Develop the concept through a concrete or visual representation and explicitly connect every part of the model to the symbols and language.");
    }
    if (/compare|order|classif|sort|same and different|relationship/.test(lower)) {
      parts.push("Ask students to compare at least two examples, name the deciding feature and justify the order or classification.");
    }
    if (/estimate|round|approximat|reasonable/.test(lower)) {
      parts.push("Treat this as a reasonableness strand: students choose an approximation method, state the precision and compare it with an exact or measured result.");
    }
    if (/investigat|experiment|collect|survey|observe|data/.test(lower)) {
      parts.push("Use a short investigation with a clear question, consistent method, recorded evidence and a conclusion limited to the collected data.");
    }
    if (/create|design|construct|make|generate/.test(lower)) {
      parts.push("Include a creation task so students transfer the concept, make choices and verify that their example satisfies the mathematical conditions.");
    }
    if (/explain|justify|reason|prove|describe why/.test(lower)) {
      parts.push("Require a verbal, written or visual justification; a correct answer alone does not demonstrate this strand.");
    }
    if (/solve|problem|modelling|practical situation|context/.test(lower)) {
      parts.push("Formulate the situation mathematically, solve it, check constraints and interpret the result back in the original context.");
    }
    if (!parts.length) {
      parts.push("Teach this elaboration directly through a worked example, guided practice and a new transfer example rather than leaving it as reference wording only.");
    }
    return parts.slice(0, 2).join(" ");
  }

  function studentEvidence(text) {
    const lower = text.toLowerCase();
    if (/first nations|aboriginal|torres strait|cultural/.test(lower)) return "The student identifies the mathematical idea and discusses the named cultural context accurately, respectfully and without treating one example as representative of every community.";
    if (/compare|order|classif|sort/.test(lower)) return "The student compares examples using a stated mathematical feature, records the result and explains why the comparison is valid.";
    if (/investigat|experiment|collect|survey|data/.test(lower)) return "The student follows or proposes a consistent method, records evidence and states a conclusion supported by the data.";
    if (/create|design|construct|generate|make/.test(lower)) return "The student creates an original example, labels the important features and checks that it satisfies the stated conditions.";
    if (/estimate|round|approximat/.test(lower)) return "The student selects a suitable level of accuracy, gives an estimate and explains whether the final result is reasonable.";
    if (/money|financial|price|cost|budget/.test(lower)) return "The student represents the quantities, calculates accurately, includes the currency/unit and explains what the answer means in the transaction.";
    if (/digital tool|spreadsheet|software|virtual/.test(lower)) return "The student explains the mathematical setup, uses the tool correctly and validates the output with estimation, a second representation or an inverse relationship.";
    if (/model|represent|diagram|number line|array|grid|material/.test(lower)) return "The student represents the idea in at least two connected ways and explains how the parts of the model correspond to the mathematical notation.";
    if (/explain|justify|reason|prove/.test(lower)) return "The student gives a complete justification using a model, property, example, counterexample or calculation check.";
    return "The student completes a familiar example, applies the same idea to a new example and explains the key mathematical relationship.";
  }

  function worldwideNote(text) {
    const lower = text.toLowerCase();
    if (/first nations|aboriginal|torres strait/.test(lower)) {
      return "Retain this Australian-specific strand and label it clearly. International teachers may add a separately sourced local cultural connection, but should not replace, merge or generalise First Nations Australian knowledge.";
    }
    if (/dollars|cents|coins|notes|money|financial|price|cost|budget/.test(lower)) {
      return "The Australian example may use AUD. For worldwide use, keep the original curriculum example and add a parallel local-currency example while preserving the same place-value or calculation structure.";
    }
    if (/season|summer|winter|weather|daylight/.test(lower)) {
      return "Seasonal examples can vary by hemisphere and climate. State the location or season explicitly and add a locally relevant parallel example.";
    }
    if (/metre|centimetre|millimetre|kilometre|gram|kilogram|litre|millilitre|metric/.test(lower)) {
      return "SI metric units are the primary curriculum units and are internationally transferable. Local customary units can be included as an extension, not as a replacement for the metric concept.";
    }
    if (/school|classroom|excursion|canteen|playground/.test(lower)) {
      return "Names and school routines can be localised, but the mathematical relationship, constraints and success criteria should remain unchanged.";
    }
    return "Use globally familiar names, objects and situations. Local examples may be added in parallel without deleting the original curriculum meaning or narrowing the concept to one country.";
  }

  function apply() {
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    if (!lesson || document.getElementById("skillr-all-curriculum-strands")) return false;
    const elaborations = locateElaborations();
    if (!elaborations.length) return false;
    ensureStyle();

    const section = document.createElement("section");
    section.className = "lesson-part curriculum-strand-section";
    section.id = "skillr-all-curriculum-strands";
    section.innerHTML = `<h3>All curriculum elaboration strands explained</h3><div class="curriculum-strand-intro"><strong>${code} coverage check: all ${elaborations.length} elaborations are included below.</strong><p>The original Australian Curriculum wording remains unchanged in the reference section. These cards add the teaching interpretation and the evidence students should demonstrate; they do not replace or remove existing content.</p><p class="curriculum-worldwide-note"><strong>Worldwide classroom use:</strong> The curriculum code remains Australian and exact. Core concepts are taught for an international audience using durable, culturally respectful examples. Teachers may add local names, currencies or contexts in parallel while retaining Australian-specific content and mathematical meaning.</p></div><div class="curriculum-strand-grid">${elaborations.map(({label,text}) => `<article class="curriculum-strand-card"><div class="curriculum-strand-card__head"><span class="curriculum-strand-code">${esc(label)}</span><h4>${esc(headline(text))}</h4></div><p class="curriculum-strand-exact"><strong>Exact elaboration:</strong> ${esc(text)}</p><dl><div><dt>What to teach</dt><dd>${esc(teachingFocus(text))}</dd></div><div><dt>Student evidence</dt><dd>${esc(studentEvidence(text))}</dd></div></dl><div class="curriculum-strand-global"><strong>Worldwide use:</strong> ${esc(worldwideNote(text))}</div></article>`).join("")}</div>`;

    const firstPart = lesson.querySelector(".lesson-part");
    if (firstPart?.nextSibling) lesson.insertBefore(section, firstPart.nextSibling);
    else lesson.appendChild(section);
    return true;
  }

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 10000);
})();
