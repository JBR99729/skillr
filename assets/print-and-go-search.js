(function () {
  'use strict';
  const NEW_FREEBIES = [
    {
      id: 'foundation-numbers-to-20-tpt-free',
      title: 'FREE Kindergarten Numbers to 20 Worksheet | Counting & Number Recognition',
      year: 'foundation', yearLabel: 'Foundation / Kindergarten', subject: 'maths', subjectLabel: 'Maths',
      topics: ['numbers to 20','counting','number recognition','number order','comparing numbers','kindergarten','foundation','free'],
      curriculumCodes: ['AC9MFN01'],
      description: 'A free no-prep worksheet for counting, recognising, comparing and ordering numbers to 20, with a complete answer key.',
      url: 'https://www.teacherspayteachers.com/Product/FREE-Kindergarten-Numbers-to-20-Worksheet-Counting-Number-Recognition-17620145',
      image: '/icons/skillrhub-mark.svg', price: '0', currency: 'USD', available: true, resourceType: 'worksheet', free: true,
      tptUrl: 'https://www.teacherspayteachers.com/Product/FREE-Kindergarten-Numbers-to-20-Worksheet-Counting-Number-Recognition-17620145'
    },
    {
      id: 'year-1-addition-subtraction-to-20-tpt-free',
      title: 'FREE 1st Grade Addition & Subtraction to 20 Worksheet | No Prep Math',
      year: 1, yearLabel: 'Year 1 / 1st Grade', subject: 'maths', subjectLabel: 'Maths',
      topics: ['addition','subtraction','within 20','missing numbers','word problems','1st grade','year 1','free'],
      curriculumCodes: ['AC9M1N04'],
      description: 'A free no-prep addition and subtraction worksheet within 20, including missing-number problems, simple word problems and answers.',
      url: 'https://www.teacherspayteachers.com/Product/FREE-1st-Grade-Addition-Subtraction-to-20-Worksheet-No-Prep-Math-17620155',
      image: '/icons/skillrhub-mark.svg', price: '0', currency: 'USD', available: true, resourceType: 'worksheet', free: true,
      tptUrl: 'https://www.teacherspayteachers.com/Product/FREE-1st-Grade-Addition-Subtraction-to-20-Worksheet-No-Prep-Math-17620155'
    },
    {
      id: 'year-2-place-value-to-1000-tpt-free',
      title: 'FREE 2nd Grade Place Value Worksheet | Numbers to 1000 + Answer Key',
      year: 2, yearLabel: 'Year 2 / 2nd Grade', subject: 'maths', subjectLabel: 'Maths',
      topics: ['place value','numbers to 1000','hundreds tens ones','expanded form','comparing numbers','rounding','2nd grade','year 2','free'],
      curriculumCodes: ['AC9M2N01'],
      description: 'A free no-prep place value worksheet covering hundreds, tens and ones, numbers to 1000, expanded form, comparing, ordering and rounding.',
      url: 'https://www.teacherspayteachers.com/Product/FREE-2nd-Grade-Place-Value-Worksheet-Numbers-to-1000-Answer-Key-17620166',
      image: '/icons/skillrhub-mark.svg', price: '0', currency: 'USD', available: true, resourceType: 'worksheet', free: true,
      tptUrl: 'https://www.teacherspayteachers.com/Product/FREE-2nd-Grade-Place-Value-Worksheet-Numbers-to-1000-Answer-Key-17620166'
    }
  ];
  function filterProducts(products, query, scope = {}) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return products.filter(product => {
      const wantedType = scope.resourceType || 'all';
      const wantedCost = scope.cost || 'all';
      const productType = product.resourceType || 'worksheet';

      if (scope.topic && scope.topic !== 'all') {
        const tag = scope.topic.toLowerCase().trim();
        const tags = new Set([...(product.topics || []), ...(product.curriculumCodes || [])].map(value => value.toLowerCase()));
        if (!tags.has(tag)) return false;
      }
      if (wantedType === 'teaching-slides') {
        if (!['teaching-slides', 'teaching-sample'].includes(productType)) return false;
      } else if (wantedType !== 'all' && productType !== wantedType) return false;
      if (wantedCost === 'free' && !(product.free || Number(product.price) === 0)) return false;
      if (wantedCost === 'paid' && (product.free || Number(product.price) === 0)) return false;
      if (!product.available || (scope.year && String(product.year) !== String(scope.year)) || (scope.subject && product.subject !== scope.subject)) return false;
      const text = [product.title, product.yearLabel, product.subjectLabel, product.description, ...(product.topics || []), ...(product.curriculumCodes || [])].join(' ').toLowerCase();
      return terms.every(term => text.includes(term));
    });
  }
  function paginate(products, page = 1, size = 24) {
    const pages = Math.max(1, Math.ceil(products.length / size));
    page = Math.max(1, Math.min(pages, page));
    return {items: products.slice((page - 1) * size, page * size), page, pages};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {filterProducts, paginate};
  if (typeof document === 'undefined') return;
  const isSlides = document.body.dataset.resourceType === 'teaching-slides';
  const section = document.querySelector('[data-search]');
  if (!section) return;
  const input = section.querySelector('input');
  const status = section.querySelector('[data-search-status]');
  const results = section.querySelector('[data-search-results]');
  const pagination = section.querySelector('[data-pagination]');
  const previous = section.querySelector('[data-previous]');
  const next = section.querySelector('[data-next]');
  const browse = document.querySelector('[data-browse]');
  const yearSelect = section.querySelector('[data-filter-year]');
  const subjectSelect = section.querySelector('[data-filter-subject]');
  const typeSelect = section.querySelector('[data-filter-type]');
  const costSelect = section.querySelector('[data-filter-cost]');
  const clearFilters = section.querySelector('[data-filter-clear]');
  const tagRow = section.querySelector('[data-tag-row]');
  const form = section.querySelector('form');
  let products = null, failed = false, page = 1, timer;
  let activeTag = 'all';
  section.hidden = false;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function card(product) {
    const article = element('article', '', 'product-card');
    const link = element('a'); link.href = product.url;
    const image = element('img'); image.src = product.image; image.alt = product.title + ' cover'; image.width = 637; image.height = 900; image.loading = 'lazy';
    link.append(image, element('h2', product.title));
    const details = element('a', 'View pack details'); details.href = product.url;
    const priceText = product.price === undefined ? 'See current price on TPT' : product.free || Number(product.price) === 0 ? 'Free on TPT' : product.resourceType === 'teaching-sample' ? 'Free sample' : new Intl.NumberFormat('en-AU', {style: 'currency', currency: product.currency}).format(Number(product.price));
    article.append(link, element('p', product.curriculumCodes.join(' · '), 'small'), element('p', product.description), element('p', priceText, 'price'), details);
    const buyUrl = product.paidTptUrl || product.tptUrl || null;
    if (buyUrl) { const buyLabel = product.free || Number(product.price) === 0 ? 'Get free pack on TPT' : isSlides ? 'Slides · US$' + Number(product.paidPrice || product.price || 0).toFixed(2) : 'View on TPT'; const buy = element('a', buyLabel, 'button'); buy.href = buyUrl; buy.target = '_blank'; buy.rel = 'noopener noreferrer'; article.append(buy); }
    if (product.bundleTptUrl) { const offer = element('a', 'Bundle · US$' + Number(product.bundlePrice || 0).toFixed(2) + ' (save 20%)', 'button bundle-button'); offer.href = product.bundleTptUrl; offer.target = '_blank'; offer.rel = 'noopener noreferrer'; article.append(offer); }
    return article;
  }

  function populateFilters(productsArg) {
    if (!productsArg || !productsArg.length) return;
    const years = Array.from(new Set(productsArg.map(product => product.year))).sort((a, b) => Number(a) - Number(b));
    const subjects = Array.from(new Set(productsArg.map(product => product.subject).filter(Boolean))).sort();
    const allTags = {};

    productsArg.forEach(product => {
      (product.topics || []).forEach(tag => {
        if (!tag) return;
        const key = String(tag).trim().toLowerCase();
        if (key === 'free') return;
        allTags[key] = (allTags[key] || 0) + 1;
      });
    });

    years.forEach(year => {
      const option = element('option', String(year) === '0' ? 'Foundation' : `Year ${year}`, '');
      option.value = year;
      yearSelect.appendChild(option);
    });

    subjects.forEach(subject => {
      const option = element('option', subject.charAt(0).toUpperCase() + subject.slice(1), '');
      option.value = subject;
      subjectSelect.appendChild(option);
    });

    const sortedTags = Object.entries(allTags).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    sortedTags.slice(0, 16).forEach(([tag]) => {
      const chip = element('button', tag, 'tag-chip');
      chip.type = 'button';
      chip.dataset.tagChip = tag;
      if (activeTag === tag) chip.classList.add('is-active');
      chip.addEventListener('click', () => {
        activeTag = activeTag === tag ? 'all' : tag;
        updateFilterUI();
        page = 1;
        render();
      });
      tagRow.appendChild(chip);
    });
  }

  function setFilterState({year = '', subject = '', resourceType = 'all', cost = 'all'} = {}) {
    if (yearSelect) yearSelect.value = String(year || '');
    if (subjectSelect) subjectSelect.value = subject || '';
    if (typeSelect) typeSelect.value = resourceType || 'all';
    if (costSelect) costSelect.value = cost || 'all';
  }

  function updateFilterUI() {
    tagRow.querySelectorAll('[data-tag-chip]').forEach(chip => {
      chip.classList.toggle('is-active', chip.dataset.tagChip === activeTag);
    });
  }

  function currentFilters() {
    const filters = {
      year: yearSelect ? yearSelect.value : '',
      subject: subjectSelect ? subjectSelect.value : '',
      resourceType: typeSelect ? typeSelect.value : 'all',
      cost: costSelect ? costSelect.value : 'all'
    };
    return filters;
  }

  function render() {
    const query = input.value.trim();
    results.replaceChildren();
    results.hidden = true;
    pagination.hidden = true;
    browse.hidden = true;
    if (!query && !section.dataset.showAll) { status.textContent = ''; return; }
    if (failed) { status.textContent = 'Search is unavailable. Please browse the categories below or reload to try again.'; return; }
    if (!products) { status.textContent = isSlides ? 'Loading teaching slides...' : 'Loading printables...'; return; }
    const filters = currentFilters();
    if (!activeTag || activeTag === 'all') {
      delete filters.topic;
    } else {
      filters.topic = activeTag;
    }
    const matches = filterProducts(products, query, filters);
    const result = paginate(matches, page); page = result.page;
    results.hidden = false;
    status.textContent = matches.length ? matches.length + (isSlides ? (matches.length === 1 ? ' slide pack found' : ' slide packs found') : (matches.length === 1 ? ' live product' : ' live products')) : isSlides ? 'No matching slide packs. Try another topic or clear your filters.' : 'No matching products. Try another topic or clear your filters.';
    results.append(...result.items.map(card));
    pagination.hidden = result.pages <= 1;
    previous.disabled = page === 1; next.disabled = page === result.pages;
    section.querySelector('[data-page]').textContent = 'Page ' + page + ' of ' + result.pages;
  }
  form.addEventListener('submit', event => {event.preventDefault(); clearTimeout(timer); page = 1; render();});
  input.addEventListener('input', () => {clearTimeout(timer); page = 1; timer = setTimeout(render, 120);});
  yearSelect.addEventListener('change', () => {page = 1; render();});
  subjectSelect.addEventListener('change', () => {page = 1; render();});
  typeSelect.addEventListener('change', () => {page = 1; render();});
  costSelect.addEventListener('change', () => {page = 1; render();});
  clearFilters.addEventListener('click', () => {
    setFilterState({});
    activeTag = 'all';
    input.value = '';
    page = 1;
    updateFilterUI();
    render();
  });
  previous.addEventListener('click', () => {page--; render();});
  next.addEventListener('click', () => {page++; render();});
  fetch('/data/print-and-go-products.json?v=20260907-bundle', { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  }).then(data => {
    if (!Array.isArray(data)) throw new Error('Invalid catalogue');
    const listingKey = item => (item.tptUrl || item.url || '').match(/\d+$/)?.[0] || item.id;
    const ids = new Set(data.map(listingKey));
    products = [...NEW_FREEBIES.filter(item => !ids.has(listingKey(item))), ...data];
    if (products.length === 0) return;
    populateFilters(products);
    updateFilterUI();
    render();
  }).catch(() => {failed = true; render();});
}());
