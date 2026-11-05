(() => {
  "use strict";
  if (window.__skillrMultiAudienceUXLoaded) return;
  window.__skillrMultiAudienceUXLoaded = true;

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const subjectMatch = path.match(/^\/(foundation|year(?:[1-9]|10))\/curriculum\/(maths|science|english)$/i);
  const topicMatch = path.match(/^\/(foundation|year(?:[1-9]|10))\/(maths|science|english)\/ac9[^/]+/i);

  document.querySelectorAll('.y10-ad-slot, .ad[aria-label="Advertisement area"]').forEach((node) => node.remove());

  function addSubjectFlow() {
    if (document.querySelector(".skillr-use-flow")) return;
    const matrix = document.querySelector(".unit-matrix");
    if (!matrix) return;
    const flow = document.createElement("div");
    flow.className = "skillr-use-flow";
    flow.innerHTML = `<div><strong>For each topic: learn → practise → test.</strong><p>Teacher slides, homework and worksheets stay available as supporting resources.</p></div><div class="skillr-use-flow__steps" aria-label="Learning sequence"><span>1 Learn</span><span>2 Practice</span><span>3 Test</span><span>4 Review</span></div>`;
    matrix.insertAdjacentElement("beforebegin", flow);
  }

  function improveActionLabels() {
    document.querySelectorAll(".unit-action-row a.primary, .topic-action-row a.primary").forEach((link) => {
      if (/topic guide|start lesson/i.test(link.textContent || "")) link.textContent = "Learn";
    });
  }

  function actionType(link) {
    const text = (link.textContent || "").trim().toLowerCase();
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (/\bpractice\b/.test(text) || /\/practice\/?(?:[?#]|$)/.test(href)) return "practice";
    if (/\btest\b/.test(text) || /\/test\/?(?:[?#]|$)/.test(href)) return "test";
    if (/topic guide|start lesson|\blearn\b|\bteach\b/.test(text) || link.classList.contains("primary")) return "learn";
    return "resource";
  }

  function normalizeTopicActions() {
    if (!topicMatch) return;
    const row = document.querySelector(".topic-action-row");
    if (!row || row.dataset.skillrSimpleActions === "true") return;

    const links = [...row.querySelectorAll(":scope > a")];
    if (!links.length) return;

    const primary = {};
    const resources = [];
    links.forEach((link) => {
      const type = actionType(link);
      if (type !== "resource" && !primary[type]) primary[type] = link;
      else resources.push(link);
    });

    if (primary.learn) primary.learn.textContent = "Learn";
    if (primary.practice) primary.practice.textContent = "Practice";
    if (primary.test) primary.test.textContent = "Test";

    row.innerHTML = "";
    ["learn", "practice", "test"].forEach((type) => {
      if (!primary[type]) return;
      primary[type].classList.add("skillr-topic-primary-action");
      row.appendChild(primary[type]);
    });

    const oldMore = row.parentElement?.querySelector(":scope > .skillr-more-resources");
    if (oldMore) oldMore.remove();
    if (resources.length) {
      const details = document.createElement("details");
      details.className = "skillr-more-resources";
      const summary = document.createElement("summary");
      summary.textContent = "More resources";
      const box = document.createElement("div");
      box.className = "skillr-more-resources__links";
      resources.forEach((link) => box.appendChild(link));
      details.append(summary, box);
      row.insertAdjacentElement("afterend", details);
    }

    row.dataset.skillrSimpleActions = "true";
  }

  function init() {
    if (subjectMatch) addSubjectFlow();
    improveActionLabels();
    normalizeTopicActions();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  if (topicMatch) {
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        const row = document.querySelector(".topic-action-row");
        if (row && row.dataset.skillrSimpleActions !== "true") normalizeTopicActions();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
