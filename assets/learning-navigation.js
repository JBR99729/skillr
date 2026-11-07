(() => {
  'use strict';
  const key = 'skillrhub.topicReturn';
  const normalise = path => path.replace(/\/index\.html$/i, '/');
  const topic = path => /^\/(foundation|year(?:[1-9]|10))\/(maths|science|english)\/ac9[^/]+\/$/i.test(normalise(path));
  const current = normalise(location.pathname);
  function read() {
    try { return JSON.parse(sessionStorage.getItem(key)) || {}; } catch { return {}; }
  }
  function valid(value) {
    try {
      const url = new URL(value, location.origin);
      return url.origin === location.origin && ['/', '/learn/'].includes(url.pathname) ? url : null;
    } catch { return null; }
  }
  function remember(path, href) {
    const url = valid(href);
    if (!url) return;
    try {
      const entries = read();
      entries[normalise(path)] = { href: url.pathname + url.search + url.hash, at: Date.now() };
      const recent = Object.entries(entries).sort((a, b) => b[1].at - a[1].at).slice(0, 50);
      sessionStorage.setItem(key, JSON.stringify(Object.fromEntries(recent)));
    } catch { /* Static Home and catalogue links also work without storage. */ }
  }
  function originResults() {
    if (current === '/learn/') return location.pathname + location.search + location.hash;
    if (current !== '/') return null;
    const form = document.getElementById('home-topic-search');
    if (!form) return null;
    const params = new URLSearchParams();
    for (const name of ['q', 'year', 'subject']) {
      const field = form.querySelector(`[name="${name}"]`);
      if (field?.value) params.set(name, field.value);
    }
    return '/?' + params.toString() + '#topic-search';
  }
  const saved = read()[current];
  const returnUrl = saved && Date.now() - saved.at < 24 * 60 * 60 * 1000 ? valid(saved.href) : null;
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (topic(current) && url.origin === 'https://app.skillrhub.com') {
      // Send only the public lesson URL, never a learner ID or search history.
      const code = current.match(/\/(ac9[a-z0-9]+)-/i)?.[1]?.toUpperCase();
      const requested = url.searchParams.get('assessment') || url.searchParams.get('skill');
      if (!requested || requested.toUpperCase() === code) {
        url.searchParams.set('returnTo', 'https://skillrhub.com' + current);
        link.href = url.href;
      }
      return;
    }
    if (url.origin !== location.origin || !topic(url.pathname)) return;
    const results = originResults() || (topic(current) && returnUrl ? returnUrl.href : null);
    if (results) remember(url.pathname, results);
  }, true);
  if (!topic(current) || !returnUrl) return;
  const href = returnUrl.pathname + returnUrl.search + returnUrl.hash;
  const name = returnUrl.pathname === '/' || returnUrl.searchParams.has('q') ? 'Search results' : 'Topic index';
  document.querySelectorAll('[data-learning-return]').forEach(link => {
    link.href = href;
    link.textContent = 'Back to your ' + (name === 'Search results' ? 'search results' : 'topic index');
  });
  const crumb = document.querySelector('nav[aria-label="Breadcrumb"], .breadcrumb, .breadcrumbs, .crumb');
  if (!crumb) return;
  const home = document.createElement('a'); home.href = '/'; home.textContent = 'Home';
  const back = document.createElement('a'); back.href = href; back.textContent = name;
  const here = document.createElement('span');
  here.setAttribute('aria-current', 'page');
  here.textContent = document.querySelector('h1')?.textContent.trim() || 'Current topic';
  crumb.replaceChildren(home, document.createTextNode(' › '), back, document.createTextNode(' › '), here);
})();
