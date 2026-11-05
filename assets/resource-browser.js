(() => {
  const form = document.querySelector('#resource-browser');
  if (!form) return;
  const { year, subject, topic } = form.elements;
  const tabs = [...form.querySelectorAll('[data-format]')];
  const results = document.querySelector('#resource-results');
  const fallback = document.querySelector('#resource-folder');
  const status = document.querySelector('#resource-status');
  const cache = new Map();
  let format = new URLSearchParams(location.search).get('format') === 'slides' ? 'slides' : 'worksheets';
  let request = 0;

  async function load(path) {
    if (!cache.has(path)) {
      cache.set(path, fetch(path).then(response => {
        if (!response.ok) throw new Error('Resources unavailable');
        return path.startsWith('/data/') ? response.json() : response.text();
      }).catch(error => {
        cache.delete(path);
        throw error;
      }));
    }
    return cache.get(path);
  }

  async function render() {
    const current = ++request;
    const selected = format;
    const folder = '/worksheets/' + year.value + '/' + subject.value + '/';
    fallback.href = folder;
    results.replaceChildren();
    status.textContent = 'Loading resources…';
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.format === selected)));
    const terms = topic.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    try {
      let rows;
      if (selected === 'packs') {
        const products = await load('/data/print-and-go-products.json');
        const grade = year.value === 'foundation' ? 0 : Number(year.value.slice(4));
        rows = [...new Map(products.filter(p => p.available && p.market === 'au' &&
          Number(p.year) === grade && p.subject === subject.value && p.hasPrintables &&
          /^https:\/\/www\.teacherspayteachers\.com\/Product\//.test(p.tptUrl))
          .map(p => [p.id, { title: p.title, code: (p.curriculumCodes || []).join(', '), href: p.tptUrl }])).values()];
      } else {
        const html = await load(folder);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        rows = [...doc.querySelectorAll('.worksheet-resource-list > li')].flatMap(item => {
          const title = item.querySelector('h3')?.textContent.trim();
          const code = item.querySelector('.worksheet-resource-code')?.textContent.trim() || '';
          const label = selected === 'slides' ? 'Classroom View' : 'Worksheet';
          const href = [...item.querySelectorAll('.worksheet-resource-actions a')]
            .find(link => link.textContent.trim() === label)?.getAttribute('href');
          return title && href?.startsWith('/') && !href.startsWith('//') ? [{ title, code, href }] : [];
        });
      }
      if (request !== current) return;
      rows = rows.filter(row => terms.every(term => (row.title + ' ' + row.code).toLowerCase().includes(term)));
      status.textContent = rows.length ? rows.length + (rows.length === 1 ? ' resource' : ' resources') : 'No matching resources. Try a different year, subject or search.';
      results.replaceChildren(...rows.map(row => {
        const item = document.createElement('li');
        const label = document.createElement('span');
        const title = document.createElement('strong');
        const code = document.createElement('small');
        const link = document.createElement('a');
        title.textContent = row.title;
        code.textContent = row.code;
        label.append(title, code);
        link.href = row.href;
        link.textContent = { worksheets: 'View worksheet', slides: 'Open classroom slides', packs: 'View on TpT' }[selected];
        link.setAttribute('aria-label', link.textContent + ': ' + row.title);
        item.append(label, link);
        return item;
      }));
    } catch {
      if (request === current) status.textContent = 'The results could not load. You can still open the selected worksheet folder.';
    }
  }

  form.addEventListener('submit', event => { event.preventDefault(); render(); });
  form.addEventListener('change', render);
  tabs.forEach(tab => tab.addEventListener('click', () => { format = tab.dataset.format; render(); }));
  form.closest('section').hidden = false;
  render();
})();
