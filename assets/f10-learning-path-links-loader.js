(() => {
  "use strict";
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (!/^\/(?:foundation|year(?:10|[1-9]))\/(?:maths|science|english)\/ac9[a-z0-9]+-/i.test(path)) return;
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "/assets/f10-learning-path-links.css?v=1";
  document.head.appendChild(css);
  const script = document.createElement("script");
  script.src = "/assets/f10-learning-path-links.js?v=1";
  script.defer = true;
  document.head.appendChild(script);
})();
