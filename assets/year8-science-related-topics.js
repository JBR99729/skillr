"use strict";

(function addYear8ScienceRelatedTopics() {
  const match = window.location.pathname.match(/^\/year8\/science\/(ac9s8[a-z]\d{2})[^/]*\/?/i);
  if (!match || document.querySelector('[data-year8-related-topics]')) return;

  const currentCode = match[1].toUpperCase();
  const container = document.querySelector('#topic-guide');
  if (!container) return;

  const shorten = (text, max = 92) => {
    const clean = (text || '').replace(/\s+/g, ' ').trim();
    return clean.length > max ? `${clean.slice(0, max - 1).trim()}…` : clean;
  };

  fetch('/year8/curriculum/science/')
    .then((response) => {
      if (!response.ok) throw new Error('Could not load Year 8 Science curriculum index');
      return response.text();
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const topics = [...doc.querySelectorAll('.curriculum-unit-card')]
        .map((card) => ({
          code: card.querySelector('.curriculum-badge')?.textContent?.trim().toUpperCase(),
          href: card.querySelector('.unit-action-row a.primary')?.getAttribute('href'),
          description: card.querySelector('h3')?.textContent?.trim()
        }))
        .filter((topic) => topic.code && topic.href && topic.description);

      const index = topics.findIndex((topic) => topic.code === currentCode);
      if (index < 0) return;

      const related = [];
      const add = (topic) => {
        if (topic && topic.code !== currentCode && !related.some((item) => item.code === topic.code)) related.push(topic);
      };

      add(topics[index - 1]);
      add(topics[index + 1]);
      if (related.length < 2) add(topics[index - 2]);
      if (related.length < 2) add(topics[index + 2]);

      const section = document.createElement('details');
      section.className = 'curriculum-topic-section';
      section.open = true;
      section.dataset.year8RelatedTopics = 'true';

      const summary = document.createElement('summary');
      summary.innerHTML = '<strong>Related Year 8 Science Topics</strong>';
      section.appendChild(summary);

      const body = document.createElement('div');
      body.className = 'curriculum-detail-body';
      const intro = document.createElement('p');
      intro.textContent = 'Continue with nearby Year 8 Science topics or browse the complete Year 8 Science curriculum.';
      body.appendChild(intro);

      const links = document.createElement('div');
      links.className = 'curriculum-link-row';
      related.forEach((topic) => {
        const link = document.createElement('a');
        link.className = 'curriculum-button';
        link.href = topic.href;
        link.textContent = `${topic.code} · ${shorten(topic.description)}`;
        links.appendChild(link);
      });

      const all = document.createElement('a');
      all.className = 'curriculum-button primary';
      all.href = '/year8/curriculum/science/';
      all.textContent = 'Browse all Year 8 Science topics';
      links.appendChild(all);
      body.appendChild(links);
      section.appendChild(body);

      const resources = [...container.querySelectorAll('.curriculum-topic-section')]
        .find((node) => /resources/i.test(node.querySelector('summary')?.textContent || ''));
      if (resources) container.insertBefore(section, resources);
      else container.appendChild(section);
    })
    .catch(() => {
      /* Non-critical enhancement: leave the page usable if the index cannot be fetched. */
    });
}());
