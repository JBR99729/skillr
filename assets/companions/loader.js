(function () {
  'use strict';

  function removePublicDashboardReferences(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('a[href*="/dashboard"]').forEach(function (link) {
      link.remove();
    });

    scope.querySelectorAll('nav, header, footer, .site-header__links, .site-header__menu-panel, .ux-utility-grid, .portal-next').forEach(function (container) {
      Array.from(container.children || []).forEach(function (child) {
        if (/dashboard/i.test((child.textContent || '').trim())) child.remove();
      });
    });
  }

  removePublicDashboardReferences(document);

  if (!window.__skillrDashboardRemovalObserver) {
    window.__skillrDashboardRemovalObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) removePublicDashboardReferences(node);
        });
      });
    });
    window.__skillrDashboardRemovalObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (window.__skillrCompanionsLoading) return;
  window.__skillrCompanionsLoading = true;
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = '/assets/companions/companions.css?v=20260909-3';
  document.head.appendChild(css);
  const config = document.createElement('script');
  config.src = '/assets/companions/config.js?v=20260909-1';
  config.onload = function () {
    if (!window.SkillrCompanionConfig?.enabled) return;
    const runtime = document.createElement('script');
    runtime.src = '/assets/companions/companions.js?v=20260911-1';
    document.head.appendChild(runtime);
  };
  document.head.appendChild(config);
}());
