(() => {
  "use strict";

  const path = window.location.pathname;
  const topicMatch = path.match(/^\/(foundation|year\d+)\/(maths|science|english)\/(ac9[a-z0-9]+)/i);

  // STATIC_CURRICULUM_TOPIC_GUARD: canonical topic pages already contain their
  // complete lesson in HTML. This visual helper is interactive-resource only.
  if (topicMatch) return;

  const script = document.createElement("script");
  script.src = "/assets/curriculum-visual-layer-interactive.js?v=1";
  script.async = false;
  document.head.appendChild(script);
})();
