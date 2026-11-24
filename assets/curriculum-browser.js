(() => {
  const root = document.getElementById('curriculum-browser');
  if (!root) return;
  const years = [...root.querySelectorAll('[data-year]')];
  const subjects = [...root.querySelectorAll('[data-subject]')];
  const groups = [...root.querySelectorAll('[data-group]')];
  const search = root.querySelector('input[type=search]');
  const strands = root.querySelector('.cb-strands');
  const count = root.querySelector('.cb-count');
  const controls = root.querySelector('[data-controls]');
  const yearNav = root.querySelector('.cb-years');
  const storageKey = 'skillrhub.learn';
  let year, subject, strand;

  function savedSelection(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
      return {};
    }
  }

  function readLocation() {
    const params = new URLSearchParams(location.search);
    const last = savedSelection(storageKey);
    const requestedYear = params.has('year') ? params.get('year') : last.year;
    year = years.some(link => link.dataset.year === requestedYear) ? requestedYear : '1';
    const previousYear = savedSelection(storageKey + '.year.' + year);
    const requestedSubject = params.has('subject') ? params.get('subject') : previousYear.subject;
    subject = subjects.some(button => button.dataset.subject === requestedSubject) ? requestedSubject : 'maths';
    const saved = savedSelection(storageKey + '.' + year + '.' + subject);
    const requestedStrand = params.has('strand') ? params.get('strand') : saved.strand;
    const requestedSearch = params.has('q') ? params.get('q') : saved.search;
    strand = typeof requestedStrand === 'string' ? requestedStrand : '';
    search.value = typeof requestedSearch === 'string' ? requestedSearch : '';
  }

  function rememberSelection() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ year }));
      localStorage.setItem(storageKey + '.year.' + year, JSON.stringify({ subject }));
      localStorage.setItem(storageKey + '.' + year + '.' + subject, JSON.stringify({ strand, search: search.value }));
    } catch {
      // Selection still travels in the URL when browser storage is unavailable.
    }
    const params = new URLSearchParams(location.search);
    params.set('year', year);
    params.set('subject', subject);
    for (const [key, value] of [['strand', strand], ['q', search.value]]) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const url = '/learn/?' + params.toString() + location.hash;
    if (location.pathname + location.search + location.hash !== url) history.replaceState(null, '', url);
  }

  function filterRows() {
    const group = groups.find(item => item.dataset.group === year + '-' + subject);
    const words = search.value.toLowerCase().match(/[a-z0-9]+/g) || [];
    let visible = 0;
    for (const row of group.querySelectorAll('li')) {
      const topic = row.querySelector('a');
      const searchable = (row.textContent + ' ' + (topic?.getAttribute('href') || '')).toLowerCase();
      row.hidden = Boolean((strand && row.dataset.strand !== strand) ||
        !words.every(word => searchable.includes(word)));
      if (!row.hidden) visible++;
    }
    count.textContent = visible ? visible + (visible === 1 ? ' skill' : ' skills') :
      'No matching skills in ' + group.querySelector('h2').textContent + '. Try another year, subject or search term.';
    rememberSelection();
  }

  function render() {
    const group = groups.find(item => item.dataset.group === year + '-' + subject);
    for (const item of groups) item.hidden = item !== group;
    for (const link of years) {
      link.href = '/learn/?year=' + link.dataset.year + '&subject=' + subject;
      if (link.dataset.year === year) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    for (const button of subjects) button.setAttribute('aria-pressed', String(button.dataset.subject === subject));
    const categories = new Set([...group.querySelectorAll('[data-strand]')].map(row => row.dataset.strand));
    if (!categories.has(strand)) strand = '';
    strands.replaceChildren();
    for (const category of ['', ...categories]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = category || 'All topics';
      button.setAttribute('aria-pressed', String(category === strand));
      button.addEventListener('click', () => {
        strand = category;
        for (const control of strands.children) control.setAttribute('aria-pressed', String(control === button));
        filterRows();
      });
      strands.append(button);
    }
    filterRows();
  }

  function select(nextYear, nextSubject) {
    if (nextYear === year && nextSubject === subject) return;
    year = nextYear;
    subject = nextSubject;
    strand = '';
    search.value = '';
    history.pushState(null, '', '/learn/?year=' + year + '&subject=' + subject);
    render();
  }

  for (const link of years) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(link.dataset.year, subject);
  });
  for (const button of subjects) button.addEventListener('click', () => select(year, button.dataset.subject));
  search.addEventListener('input', filterRows);
  window.addEventListener('popstate', () => { readLocation(); render(); });
  readLocation();
  render();
  for (const element of [controls, yearNav, strands, count]) element.hidden = false;
})();
