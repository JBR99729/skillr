(function () {
  "use strict";

  var input = document.getElementById("site-search-input");
  var results = document.getElementById("site-search-results");
  var form = input && input.closest("form");
  var indexPromise;
  var activeIndex = -1;

  if (!input || !results || !form) return;

  function normalise(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function describe(url) {
    var parts = url.split("/").filter(Boolean);
    var yearPart = parts.find(function (part) {
      return part === "foundation" || /^year-?\d+$/.test(part);
    });
    var subject = parts.find(function (part) {
      return /^(math|maths|science|english)$/.test(part);
    });
    var resource = parts.find(function (part) {
      return /^(practice|test|worksheet|curriculum|blogs?)$/.test(part);
    });
    var labels = [];

    if (yearPart === "foundation") labels.push("Foundation");
    else if (yearPart) labels.push("Year " + yearPart.replace(/\D/g, ""));
    if (subject) labels.push(subject === "math" || subject === "maths" ? "Maths" : subject.charAt(0).toUpperCase() + subject.slice(1));
    if (resource) labels.push(resource === "curriculum" ? "Topic guide" : resource.charAt(0).toUpperCase() + resource.slice(1));

    return labels.join(" · ") || "SkillrHub resource";
  }

  function loadIndex() {
    if (indexPromise) return indexPromise;

    indexPromise = fetch("/sitemap.html", { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) throw new Error("Search index unavailable");
        return response.text();
      })
      .then(function (source) {
        var documentCopy = new DOMParser().parseFromString(source, "text/html");
        return Array.from(documentCopy.querySelectorAll(".sitemap-section a[href]"))
          .map(function (link) {
            var title = link.textContent.trim();
            var url = link.getAttribute("href");
            return {
              title: title,
              url: url,
              meta: describe(url),
              searchable: normalise(title + " " + describe(url) + " " + url)
            };
          })
          .filter(function (item) {
            return item.title && item.url && item.url !== "/sitemap.html";
          });
      });

    return indexPromise;
  }

  function score(item, query, terms) {
    var title = normalise(item.title);
    var meta = normalise(item.meta);
    var words = item.searchable.split(" ");
    var codeMatch = /^[a-z]{2}\d[a-z0-9]+$/.test(query.replace(/ /g, ""));
    var value = 0;

    if (!terms.every(function (term) {
      return words.some(function (word) { return word.startsWith(term); });
    })) return -1;
    if (title === query) value += 100;
    if (title.startsWith(query)) value += 60;
    if (title.includes(query)) value += 35;
    if (meta.startsWith(query)) value += 55;
    else if (meta.includes(query)) value += 30;
    if (codeMatch && item.searchable.includes(query.replace(/ /g, ""))) value += 80;
    terms.forEach(function (term) {
      if (title.split(" ").some(function (word) { return word.startsWith(term); })) value += 8;
    });
    if (!item.url.startsWith("/quiz/")) value += 4;

    return value;
  }

  function closeResults() {
    results.hidden = true;
    results.replaceChildren();
    input.setAttribute("aria-expanded", "false");
    activeIndex = -1;
  }

  function setActive(index) {
    var links = results.querySelectorAll("a");
    if (!links.length) return;
    activeIndex = (index + links.length) % links.length;
    links.forEach(function (link, itemIndex) {
      link.classList.toggle("is-active", itemIndex === activeIndex);
    });
    links[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function showMessage(message) {
    var paragraph = document.createElement("p");
    paragraph.className = "site-search__message";
    paragraph.textContent = message;
    results.replaceChildren(paragraph);
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function render(items) {
    var list = document.createElement("ul");
    list.className = "site-search__list";

    items.forEach(function (item) {
      var row = document.createElement("li");
      var link = document.createElement("a");
      var title = document.createElement("strong");
      var meta = document.createElement("span");

      link.href = item.url;
      title.textContent = item.title;
      meta.textContent = item.meta;
      link.append(title, meta);
      row.appendChild(link);
      list.appendChild(row);
    });

    results.replaceChildren(list);
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
    activeIndex = -1;
  }

  function runSearch() {
    var query = normalise(input.value);
    var terms = query.split(" ").filter(Boolean);

    if (query.length < 2) {
      closeResults();
      return;
    }

    showMessage("Searching…");
    loadIndex()
      .then(function (items) {
        if (query !== normalise(input.value)) return;
        var matches = items
          .map(function (item) { return { item: item, rank: score(item, query, terms) }; })
          .filter(function (match) { return match.rank >= 0; })
          .sort(function (a, b) { return b.rank - a.rank || a.item.title.length - b.item.title.length; })
          .slice(0, 8)
          .map(function (match) { return match.item; });

        if (matches.length) render(matches);
        else showMessage("No matching resources found. Try fewer words or a curriculum code.");
      })
      .catch(function () {
        showMessage("Search is temporarily unavailable. You can still browse by year below.");
      });
  }

  input.addEventListener("focus", loadIndex);
  input.addEventListener("input", runSearch);
  input.addEventListener("keydown", function (event) {
    var links = results.querySelectorAll("a");
    if (event.key === "ArrowDown" && links.length) {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === "ArrowUp" && links.length) {
      event.preventDefault();
      setActive(activeIndex - 1);
    } else if (event.key === "Enter" && activeIndex >= 0 && links[activeIndex]) {
      event.preventDefault();
      links[activeIndex].click();
    } else if (event.key === "Escape") {
      closeResults();
    }
  });

  form.addEventListener("submit", function (event) {
    var firstResult = results.querySelector("a");
    if (firstResult) {
      event.preventDefault();
      firstResult.click();
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".site-search")) closeResults();
  });
})();
