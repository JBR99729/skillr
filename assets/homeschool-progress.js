(function () {
  const yearSelect = document.getElementById("homeschool-year");
  const subjectSelect = document.getElementById("homeschool-subject");
  const learnerInput = document.getElementById("homeschool-learner");
  const periodInput = document.getElementById("homeschool-period");
  const checklist = document.getElementById("homeschool-checklist");
  const summaryTitle = document.getElementById("homeschool-summary-title");
  const summaryCount = document.getElementById("homeschool-summary-count");
  const subjectLink = document.getElementById("homeschool-subject-link");
  const printButton = document.querySelector("[data-print-record]");
  const clearButton = document.querySelector("[data-clear-record]");
  const yearLabels = {
    foundation: "Foundation",
    year1: "Year 1",
    year2: "Year 2",
    year3: "Year 3",
    year4: "Year 4",
    year5: "Year 5",
    year6: "Year 6",
    year7: "Year 7",
    year8: "Year 8",
    year9: "Year 9",
    year10: "Year 10",
  };
  const subjectLabels = { maths: "Maths", science: "Science", english: "English" };
  let units = [];

  function storageKey() {
    return `skillrHomeschool:${yearSelect.value}:${subjectSelect.value}`;
  }

  function readRecord() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "{}");
    } catch (_) {
      return {};
    }
  }

  function writeRecord(record) {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(record));
    } catch (_) {}
  }

  function selectedUnits() {
    return units.filter((unit) => unit.yearFolder === yearSelect.value && unit.subjectSlug === subjectSelect.value);
  }

  function updateSummary(items, record) {
    const year = yearLabels[yearSelect.value] || yearSelect.value;
    const subject = subjectLabels[subjectSelect.value] || subjectSelect.value;
    const ticked = items.reduce((total, unit) => {
      const item = record[unit.code] || {};
      return total + ["plan", "teach", "practice", "check"].filter((key) => item[key]).length;
    }, 0);
    summaryTitle.textContent = `${year} ${subject} homeschool record`;
    summaryCount.textContent = `${items.length} skills • ${ticked} progress ticks`;
    subjectLink.href = `/${yearSelect.value}/curriculum/${subjectSelect.value}/`;
    subjectLink.textContent = `Open ${year} ${subject} hub`;
  }

  function render() {
    const items = selectedUnits();
    const record = readRecord();
    updateSummary(items, record);
    if (!items.length) {
      checklist.innerHTML = '<tr><td colspan="6">No curriculum skills found for this selection.</td></tr>';
      return;
    }
    checklist.innerHTML = items.map((unit) => {
      const saved = record[unit.code] || {};
      const note = saved.note || "";
      const checks = ["plan", "teach", "practice", "check"].map((key) => {
        const checked = saved[key] ? " checked" : "";
        return `<td><input type="checkbox" data-code="${unit.code}" data-field="${key}" aria-label="${key} ${unit.code}"${checked}></td>`;
      }).join("");
      return `<tr>
        <td><span class="homeschool-skill-title"><a href="${unit.url}">${unit.code}</a> ${escapeHtml(unit.description)}</span><span class="homeschool-skill-meta">${escapeHtml(unit.strand || subjectLabels[unit.subjectSlug] || "")}</span></td>
        ${checks}
        <td><input type="text" data-code="${unit.code}" data-field="note" value="${escapeAttr(note)}" placeholder="Work sample, confidence, next step"></td>
      </tr>`;
    }).join("");
  }

  function updateField(code, field, value) {
    const record = readRecord();
    record[code] = record[code] || {};
    record[code][field] = value;
    writeRecord(record);
    updateSummary(selectedUnits(), record);
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  checklist.addEventListener("change", (event) => {
    const target = event.target;
    if (!target.matches("[data-code][data-field]")) return;
    updateField(target.dataset.code, target.dataset.field, target.type === "checkbox" ? target.checked : target.value);
  });

  checklist.addEventListener("input", (event) => {
    const target = event.target;
    if (!target.matches('input[type="text"][data-code][data-field]')) return;
    updateField(target.dataset.code, target.dataset.field, target.value);
  });

  [yearSelect, subjectSelect].forEach((select) => select.addEventListener("change", render));
  printButton.addEventListener("click", () => window.print());
  clearButton.addEventListener("click", () => {
    if (!window.confirm("Clear ticks and notes for this selected year and subject?")) return;
    try {
      localStorage.removeItem(storageKey());
    } catch (_) {}
    render();
  });

  [learnerInput, periodInput].forEach((input) => {
    const key = `skillrHomeschool:${input.id}`;
    try {
      input.value = localStorage.getItem(key) || "";
    } catch (_) {}
    input.addEventListener("input", () => {
      try {
        localStorage.setItem(key, input.value);
      } catch (_) {}
    });
  });

  fetch("/data/curriculum-units.json")
    .then((response) => response.json())
    .then((data) => {
      units = (data.units || []).filter((unit) => unit.questionEligible !== false);
      render();
    })
    .catch(() => {
      checklist.innerHTML = '<tr><td colspan="6">Checklist could not load. Use the Learn by year links above while we fix this.</td></tr>';
      summaryTitle.textContent = "Checklist unavailable";
      summaryCount.textContent = "";
    });
})();
