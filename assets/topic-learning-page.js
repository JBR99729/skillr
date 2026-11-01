/* Analytics only. Lessons, disclosure controls and buying links work without JS. */
(() => {
  'use strict';
  const root = document.querySelector('.topic-learning-page');
  if (!root) return;
  const curriculumCode = window.skillrPageMeta?.curriculumCode || '';
  const track = (name, values) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, { curriculum_code: curriculumCode, ...values });
    }
  };
  root.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-topic-tpt]');
    if (link) track('tpt_outbound_click', {
      placement: link.dataset.topicTpt,
      product_id: link.dataset.productId || '',
      destination: link.href,
    });
    const section = event.target.closest('.topic-section-nav a');
    if (section) track('topic_section_click', { section_id: section.hash.slice(1) });
  });
  root.querySelectorAll('main details[id]').forEach((section) => {
    let wasOpen = section.open;
    section.addEventListener('toggle', () => {
      if (section.open === wasOpen) return;
      wasOpen = section.open;
      if (section.open) track('topic_section_open', { section_id: section.id });
    });
  });
})();
