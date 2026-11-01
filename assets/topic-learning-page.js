/* Analytics only. Lessons, disclosure controls and buying links work without JS. */
(() => {
  'use strict';
  const root = document.querySelector('.topic-learning-page');
  if (!root) return;
  // Keep optional video lessons after the written lesson and practice links.
  // This also corrects legacy topic pages generated with videos before <main>.
  const videos = [...root.querySelectorAll('.topic-video-lesson, .skillr-topic-videos')]
    .filter((el) => !el.parentElement.closest('.topic-video-lesson, .skillr-topic-videos'));
  if (videos.length) {
    const content = root.querySelector('main.topic-learning-main, main.curriculum-layout, main#main-content');
    const footer = root.querySelector('.topic-footer');
    const placement = footer || (content && content.nextSibling);
    if (content && content.parentElement === root.querySelector('.curriculum-page')) {
      const parent = content.parentElement;
      videos.forEach((video) => parent.insertBefore(video, footer && footer.parentElement === parent ? footer : null));
    } else if (content) {
      const parent = content.parentElement;
      videos.forEach((video) => parent.insertBefore(video, content.nextSibling));
    }
  }
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
