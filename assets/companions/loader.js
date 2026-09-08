(function () {
  'use strict';
  if (window.__skillrCompanionsLoading) return;
  window.__skillrCompanionsLoading = true;
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = '/assets/companions/companions.css?v=20260909-1';
  document.head.appendChild(css);
  const config = document.createElement('script');
  config.src = '/assets/companions/config.js?v=20260909-1';
  config.onload = function () {
    if (!window.SkillrCompanionConfig?.enabled) return;
    const runtime = document.createElement('script');
    runtime.src = '/assets/companions/companions.js?v=20260909-1';
    document.head.appendChild(runtime);
  };
  document.head.appendChild(config);
}());
