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
  let year, subject, strand;

  function readLocation() {
    const params = new URLSearchParams(location.search);
    const requestedYear = params.get('year');
    const requestedSubject = params.get('subject');
    year = years.some(link => link.dataset.year === requestedYear) ? requestedYear : '1';
    subject = subjects.some(button => button.dataset.subject === requestedSubject) ? requestedSubject : 'maths';
    strand = '';
    search.value = '';
  }

  function filterRows() {
    const group = groups.find(item => item.dataset.group === year + '-' + subject);
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const row of group.querySelectorAll('li')) {
      row.hidden = Boolean((strand && row.dataset.strand !== strand) ||
        !row.textContent.toLowerCase().includes(query));
      if (!row.hidden) visible++;
    }
    count.textContent = visible ? visible + (visible === 1 ? ' skill' : ' skills') : 'No matching skills';
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
    history.pushState(null, '', '/learn/?year=' + year + '&subject=' + subject);
    readLocation();
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
