(function () {
  'use strict';
  if (window.__skillrResourceLinks) return;
  window.__skillrResourceLinks = true;
  function matchedSlides(products, path) {
    const code = (path.match(/\/(ac9[a-z0-9]+)(?:-|\/)/i) || [])[1];
    return code ? products.filter(p => p.available && p.resourceType === 'teaching-slides' && (p.curriculumCodes || []).some(c => c.toLowerCase() === code.toLowerCase())) : [];
  }
  function topicPacks() {
    const panel = document.querySelector('[data-teaching-resources] .content-block');
    if (!panel) return;
    fetch('/data/print-and-go-products.json').then(response => {
      if (!response.ok) throw new Error('Catalogue unavailable');
      return response.json();
    }).then(products => {
      if (!Array.isArray(products)) return;
      matchedSlides(products, window.location.pathname).forEach(product => {
        if (typeof product.url !== 'string' || !/^\/teach-and-explain\//.test(product.url) || product.url.includes('..')) return;
        const row = document.createElement('p');
        const link = document.createElement('a');
        link.href = product.url;
        link.textContent = 'Preview teaching slides: ' + product.title;
        row.appendChild(link); panel.appendChild(row);
      });
    }).catch(() => {});
  }
  function init() {
    if (!document.body || document.getElementById('skillr-resource-links')) return;
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = '/assets/resource-links.css?v=2';
    document.head.appendChild(css);
    const menu = document.createElement('details');
    menu.id = 'skillr-resource-links';
    menu.innerHTML = '<summary>Teaching resources</summary><nav aria-label="Teaching resource shortcuts"><a href="/print-and-go.html">Print &amp; Go<span>Printable practice packs</span></a><a href="/teach-and-explain.html">Teach &amp; Explain<span>Slides for teachers &amp; parents</span></a><a class="skillr-amazon-link" href="/amazon-resources/">Amazon Skillr educational resources</a></nav>';
    document.body.appendChild(menu);
    topicPacks();
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
    document.addEventListener('click', event => { if (menu.open && !menu.contains(event.target)) menu.open = false; });
    document.addEventListener('fullscreenchange', () => { menu.open = false; menu.hidden = !!document.fullscreenElement; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
}());

// skillr-companions: shared brand and optional learning navigation
(function () {
  if (window.__skillrCompanionLoaderRequested) return;
  window.__skillrCompanionLoaderRequested = true;
  var script = document.createElement('script');
  script.src = '/assets/companions/loader.js?v=20260909-1';
  script.defer = true;
  document.head.appendChild(script);
}());
