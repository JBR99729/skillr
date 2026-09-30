(() => {
  "use strict";
  const root = document.querySelector("[data-year1-teaching-catalogue]");
  if (!root) return;

  const grid = root.querySelector("[data-year1-products]");
  const count = root.querySelector("[data-year1-count]");
  const bundleGrid = root.querySelector("[data-year1-bundles]");
  const filters = [...root.querySelectorAll("[data-year1-filter]")];

  const esc = (value) => String(value ?? "");
  function card(item) {
    const article = document.createElement("article");
    article.className = "product-card year1-teaching-card";
    article.dataset.subject = item.subject;

    const img = document.createElement("img");
    img.src = item.image || "/assets/tpt-catalogue-cover.svg";
    img.alt = "";
    img.loading = "lazy";
    article.appendChild(img);

    const kicker = document.createElement("p");
    kicker.className = "product-kicker";
    kicker.textContent = item.subjectLabel.toUpperCase() + " · TEACHING SLIDES";
    article.appendChild(kicker);

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    article.appendChild(h3);

    const small = document.createElement("p");
    small.className = "small";
    small.textContent = item.code + " · Year 1 " + item.subjectLabel;
    article.appendChild(small);

    const actions = document.createElement("div");
    actions.className = "product-actions";
    if (item.topicGuide) {
      const guide = document.createElement("a");
      guide.className = "button button--secondary";
      guide.href = item.topicGuide;
      guide.textContent = "Topic guide";
      actions.appendChild(guide);
    }

    const tpt = document.createElement("a");
    tpt.className = "button";
    tpt.href = item.tptUrl;
    tpt.target = "_blank";
    tpt.rel = "noopener noreferrer";
    tpt.textContent = item.tptLinkType === "direct" ? "View on TPT" : "Find on TPT";
    actions.appendChild(tpt);

    article.appendChild(actions);
    return article;
  }

  function bundleCard(item) {
    const article = document.createElement("article");
    article.className = "product-card product-card--bundle year1-bundle-card";
    const img = document.createElement("img");
    img.src = "/assets/tpt-catalogue-cover.svg";
    img.alt = "";
    img.loading = "lazy";
    article.appendChild(img);
    const kicker = document.createElement("p");
    kicker.className = "product-kicker";
    kicker.textContent = "YEAR 1 BUNDLE";
    article.appendChild(kicker);
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    article.appendChild(h3);
    if (item.price) {
      const price = document.createElement("p");
      price.className = "price";
      price.textContent = "US$" + item.price;
      article.appendChild(price);
    }
    const actions = document.createElement("div");
    actions.className = "product-actions";
    const link = document.createElement("a");
    link.className = "button bundle-button";
    link.href = item.tptUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View bundle on TPT";
    actions.appendChild(link);
    article.appendChild(actions);
    return article;
  }

  function render(items, subject = "all") {
    grid.replaceChildren();
    const visible = subject === "all" ? items : items.filter((item) => item.subject === subject);
    visible.forEach((item) => grid.appendChild(card(item)));
    count.textContent = visible.length + (visible.length === 1 ? " teaching pack" : " teaching packs");
  }

  fetch("/data/year1-teaching-slides.json?v=20260930-1", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Year 1 teaching catalogue unavailable");
      return response.json();
    })
    .then((data) => {
      const unique = [];
      const seen = new Set();
      for (const item of data.items || []) {
        if (!item?.code || seen.has(item.code)) continue;
        seen.add(item.code);
        unique.push(item);
      }
      render(unique);
      bundleGrid.replaceChildren();
      const bundleSeen = new Set();
      for (const item of data.bundles || []) {
        if (!item?.tptUrl || bundleSeen.has(item.tptUrl)) continue;
        bundleSeen.add(item.tptUrl);
        bundleGrid.appendChild(bundleCard(item));
      }
      filters.forEach((button) => {
        button.addEventListener("click", () => {
          filters.forEach((other) => other.setAttribute("aria-pressed", other === button ? "true" : "false"));
          render(unique, button.dataset.year1Filter);
        });
      });
    })
    .catch(() => {
      root.querySelector("[data-year1-status]").textContent = "The Year 1 catalogue is temporarily unavailable. Browse all SkillrHub resources on TPT.";
    });
})();
