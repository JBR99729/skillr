(() => {
  "use strict";

  const VALID_ROLES = new Set(["student", "teacher", "substitute", "family"]);
  const ROLE_CONTENT = {
    student: {
      eyebrow: "Student pathway",
      title: "Practise one topic at a time",
      description: "Read the guide if you need help, practise with feedback, then use the test when you’re ready.",
      primaryLabel: "Start topic practice",
      primaryKey: "practiceUrl"
    },
    teacher: {
      eyebrow: "Teacher pathway",
      title: "Plan, teach and check understanding",
      description: "Use the topic guide to prepare, project the slides, then choose an activity or test.",
      primaryLabel: "Open topic guide",
      primaryKey: "url"
    },
    substitute: {
      eyebrow: "Substitute-ready pathway",
      title: "Run a clear lesson with minimal preparation",
      description: "Open the slides, follow the teaching sequence, then give students practice and a quick check.",
      primaryLabel: "Project teacher slides",
      primaryKey: "teacherSlideUrl"
    },
    family: {
      eyebrow: "Home-learning pathway",
      title: "Learn together in short, manageable sessions",
      description: "Read the guide together, try a few questions, then print a worksheet or revisit the topic later.",
      primaryLabel: "Learn this topic",
      primaryKey: "url"
    }
  };

  const RESOURCE_LABELS = {
    url: "Topic guide",
    teacherSlideUrl: "Teacher slides",
    worksheetUrl: "Printable worksheet",
    practiceUrl: "Interactive practice",
    testUrl: "Topic test"
  };

  const state = {
    role: "student",
    units: [],
    filteredUnits: []
  };

  const roleButtons = [...document.querySelectorAll("[data-guided-role]")];
  const yearSelect = document.getElementById("guided-year");
  const subjectSelect = document.getElementById("guided-subject");
  const topicSelect = document.getElementById("guided-topic");
  const topicSearch = document.getElementById("guided-topic-search");
  const status = document.getElementById("guided-status");
  const result = document.getElementById("guided-result");
  const resultEyebrow = document.getElementById("guided-result-eyebrow");
  const resultTitle = document.getElementById("guided-result-title");
  const resultDescription = document.getElementById("guided-result-description");
  const resultTopic = document.getElementById("guided-result-topic");
  const resultActions = document.getElementById("guided-result-actions");
  const routine = document.getElementById("guided-routine");
  const topicCount = document.getElementById("guided-topic-count");
  const ROUTE_FIELDS = new Set(["yearNumber", "yearFolder", "subject", "subjectSlug", "quizYearSegment", "code", "url", "practiceUrl", "testUrl", "worksheetUrl"]);

  function isSafeRoute(value) {
    return typeof value === "string" && /^\/[A-Za-z0-9_/?=&.%-]+$/.test(value) && !value.startsWith("//");
  }

  function isValidUnit(unit) {
    return unit && typeof unit === "object" &&
      Number.isInteger(Number(unit.yearNumber)) && Number(unit.yearNumber) >= 0 && Number(unit.yearNumber) <= 10 &&
      ["Mathematics", "Science", "English"].includes(unit.subject) &&
      /^(foundation|year(?:10|[1-9]))$/.test(unit.yearFolder) &&
      /^(maths|science|english)$/.test(unit.subjectSlug) &&
      /^(grade-k|year-(?:10|[1-9]))$/.test(unit.quizYearSegment) &&
      /^AC9[A-Z0-9]+$/.test(unit.code) &&
      [...ROUTE_FIELDS].every((field) => field === "yearNumber" || ["subject", "yearFolder", "subjectSlug", "quizYearSegment", "code"].includes(field) || isSafeRoute(unit[field]));
  }

  function sentenceCase(value) {
    const text = String(value || "").trim().replace(/\s+/g, " ");
    if (!text) {
      return "Curriculum topic";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/[.;:,]+$/, "");
  }

  function compactTopic(unit, maxLength = 126) {
    const description = sentenceCase(unit.description || unit.title);
    return description.length > maxLength ? `${description.slice(0, maxLength - 1).trim()}…` : description;
  }

  function liveSlideUrl(unit) {
    return `/worksheets/${unit.yearFolder}/${unit.subjectSlug}/teacher-slides/live.html?code=${encodeURIComponent(unit.code)}`;
  }

  function resourceUrl(unit, key) {
    return key === "teacherSlideUrl" ? liveSlideUrl(unit) : unit[key];
  }

  function updateQuery() {
    const query = new URLSearchParams(window.location.search);
    query.set("role", state.role);
    query.set("year", yearSelect.value);
    query.set("subject", subjectSelect.value);
    window.history.replaceState({}, "", `${window.location.pathname}?${query.toString()}`);
  }

  function setRole(role, updateUrl = true) {
    state.role = VALID_ROLES.has(role) ? role : "student";
    roleButtons.forEach((button) => {
      const selected = button.dataset.guidedRole === state.role;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    const content = ROLE_CONTENT[state.role];
    resultEyebrow.textContent = content.eyebrow;
    resultTitle.textContent = content.title;
    resultDescription.textContent = content.description;
    routine.dataset.role = state.role;
    routine.querySelectorAll("[data-routine]").forEach((item) => {
      item.hidden = item.dataset.routine !== state.role;
    });
    renderResult();
    if (updateUrl && state.units.length) {
      updateQuery();
    }
  }

  function normaliseSearch(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\bmulitpl(e|es)\b/g, "multipl$1")
      .trim();
  }

  function unitsForSelection() {
    const query = normaliseSearch(topicSearch.value);
    return state.units.filter((unit) => {
      if (String(unit.yearNumber) !== yearSelect.value || unit.subject !== subjectSelect.value) {
        return false;
      }
      if (!query) {
        return true;
      }
      const searchable = normaliseSearch(
        [unit.code, unit.description, unit.searchTerms]
          .filter(Boolean)
          .join(" ")
      );
      return searchable.includes(query);
    });
  }

  function populateTopics(preserveCode = "") {
    state.filteredUnits = unitsForSelection();
    topicSelect.replaceChildren();

    if (!state.filteredUnits.length) {
      const option = document.createElement("option");
      option.textContent = "No matching topics";
      option.value = "";
      topicSelect.appendChild(option);
      topicSelect.disabled = true;
      status.textContent = "No topics match those choices. Try another word, subject or year level.";
      renderResult();
      return;
    }

    topicSelect.disabled = false;
    state.filteredUnits.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit.code;
      option.textContent = `${unit.code} — ${compactTopic(unit)}`;
      topicSelect.appendChild(option);
    });

    if (preserveCode && state.filteredUnits.some((unit) => unit.code === preserveCode)) {
      topicSelect.value = preserveCode;
    }

    const yearLabel = yearSelect.options[yearSelect.selectedIndex]?.textContent || "the selected year";
    status.textContent = `${state.filteredUnits.length} ${subjectSelect.value} topics available for ${yearLabel}.`;
    renderResult();
  }

  function makeAction(label, url, primary = false, newTab = false) {
    const link = document.createElement("a");
    link.className = primary ? "guided-action guided-action--primary" : "guided-action";
    link.href = url;
    link.textContent = label;
    if (newTab) {
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", `${label} (opens in a new tab)`);
    }
    return link;
  }

  function renderResult() {
    const unit = state.filteredUnits.find((item) => item.code === topicSelect.value);
    if (!unit) {
      result.hidden = true;
      return;
    }

    const content = ROLE_CONTENT[state.role];
    result.hidden = false;
    const code = document.createElement("strong");
    const description = document.createElement("span");
    code.textContent = unit.code;
    description.textContent = compactTopic(unit, 220);
    resultTopic.replaceChildren(code, description);
    resultActions.replaceChildren();

    const primaryUrl = resourceUrl(unit, content.primaryKey);
    if (primaryUrl) {
      resultActions.appendChild(makeAction(
        content.primaryLabel,
        primaryUrl,
        true,
        content.primaryKey === "teacherSlideUrl"
      ));
    }

    const actionOrder = state.role === "student"
      ? ["url", "testUrl", "worksheetUrl"]
      : state.role === "substitute"
        ? ["url", "practiceUrl", "worksheetUrl", "testUrl"]
        : state.role === "family"
          ? ["practiceUrl", "worksheetUrl", "testUrl"]
          : ["teacherSlideUrl", "worksheetUrl", "practiceUrl", "testUrl"];

    actionOrder.forEach((key) => {
      const url = resourceUrl(unit, key);
      if (key !== content.primaryKey && url) {
        resultActions.appendChild(makeAction(
          RESOURCE_LABELS[key],
          url,
          false,
          key === "teacherSlideUrl"
        ));
      }
    });

    const drillUrl = `/quiz/${unit.quizYearSegment}/daily-drills/`;
    if (state.role === "student" || state.role === "family") {
      resultActions.appendChild(makeAction("Daily Drill", drillUrl));
    }
  }

  function normalizeInitialSelection() {
    const query = new URLSearchParams(window.location.search);
    const role = query.get("role") || "student";
    const year = query.get("year");
    const subject = query.get("subject");

    if (year !== null && [...yearSelect.options].some((option) => option.value === year)) {
      yearSelect.value = year;
    }
    if (subject && [...subjectSelect.options].some((option) => option.value === subject)) {
      subjectSelect.value = subject;
    }
    setRole(role, false);
  }

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => setRole(button.dataset.guidedRole));
  });
  yearSelect.addEventListener("change", () => {
    topicSearch.value = "";
    populateTopics();
    updateQuery();
  });
  subjectSelect.addEventListener("change", () => {
    topicSearch.value = "";
    populateTopics();
    updateQuery();
  });
  topicSelect.addEventListener("change", renderResult);
  topicSearch.addEventListener("input", () => populateTopics(topicSelect.value));

  normalizeInitialSelection();
  fetch("/data/guided-start-topics.json", { credentials: "same-origin" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Curriculum list returned ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const topics = Array.isArray(data) ? data : data.topics || data.units || [];
      state.units = topics.filter(isValidUnit);
      if (!state.units.length) {
        throw new Error("Curriculum list is empty");
      }
      topicCount.textContent = `A clear path through all ${state.units.length} curriculum topics`;
      topicSearch.disabled = false;
      populateTopics();
      updateQuery();
    })
    .catch((error) => {
      console.error("Skillr guided start could not load curriculum topics:", error);
      status.innerHTML = 'Topics could not load just now. You can still <a href="/#choose-year">browse by year and subject</a>.';
      topicSelect.disabled = true;
      topicSearch.disabled = true;
      result.hidden = true;
    });
})();
