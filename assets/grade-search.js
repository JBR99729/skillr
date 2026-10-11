(function () {
  "use strict";

  function mountGradeSearch() {
    if (document.getElementById("site-search-input")) return;
    var main = document.querySelector("main");
    if (!main) return;
    var heading = main.querySelector("h1");
    if (!heading) return;
    var host = heading.closest("header") || heading.parentElement;
    if (!host) return;

    var section = document.createElement("section");
    section.className = "site-search grade-site-search";
    section.setAttribute("role", "search");
    section.setAttribute("aria-label", "Find a topic or curriculum code");
    section.innerHTML = '<label class="site-search__label" for="site-search-input">Find a topic or curriculum code</label><form action="/" role="search"><div class="site-search__control"><span class="site-search__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 5 5"></path></svg></span><input class="site-search__input" id="site-search-input" name="q" type="search" autocomplete="off" placeholder="Try fractions, cells or AC9M8N02" aria-describedby="site-search-help" aria-controls="site-search-results"></div><p id="site-search-help" class="sr-only">Type at least two letters to find a SkillrHub topic.</p><div class="site-search__results" id="site-search-results" role="status" aria-live="polite" hidden></div></form>';
    host.insertAdjacentElement("afterend", section);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountGradeSearch, { once: true });
  else mountGradeSearch();
}());