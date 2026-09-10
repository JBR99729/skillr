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
      const productType = product.resourceType || 'worksheet';
      if (wantedType === 'teaching-slides') {
        if (!['teaching-slides', 'teaching-sample'].includes(productType)) return false;
      } else if (wantedType !== 'all' && productType !== wantedType) return false;
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
  const browse = document.querySelector('[data-browse]');
  const pagination = section.querySelector('[data-pagination]');
  const previous = section.querySelector('[data-previous]');
  const next = section.querySelector('[data-next]');
  let products = null, failed = false, page = 1, timer;
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
    if (/^https:\/\//.test(product.url)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    const image = element('img'); image.src = product.image; image.alt = product.title + ' cover'; image.width = 637; image.height = 900; image.loading = 'lazy';
    link.append(image, element('h2', product.title));
    const details = element('a', /^https:\/\//.test(product.url) ? 'Get free pack on TPT' : 'View pack details'); details.href = product.url;
    if (/^https:\/\//.test(product.url)) { details.target = '_blank'; details.rel = 'noopener noreferrer'; }
    const priceText = product.free || Number(product.price) === 0 ? 'Free on TPT' : product.resourceType === 'teaching-sample' ? 'Free sample' : new Intl.NumberFormat('en-AU', {style: 'currency', currency: product.currency}).format(Number(product.price));
    article.append(link, element('p', product.curriculumCodes.join(' · '), 'small'), element('p', product.description), element('p', priceText, 'price'), details);
    const buyUrl = product.paidTptUrl || product.tptUrl || null;
    if (buyUrl && buyUrl !== product.url) { const buyLabel = product.free || Number(product.price) === 0 ? 'Get free pack on TPT' : isSlides ? 'Slides · US$' + Number(product.paidPrice || product.price || 0).toFixed(2) : 'View on TPT'; const buy = element('a', buyLabel, 'button'); buy.href = buyUrl; buy.target = '_blank'; buy.rel = 'noopener noreferrer'; article.append(buy); }
    if (product.bundleTptUrl) { const offer = element('a', 'Bundle · US$' + Number(product.bundlePrice || 0).toFixed(2) + ' (save 20%)', 'button bundle-button'); offer.href = product.bundleTptUrl; offer.target = '_blank'; offer.rel = 'noopener noreferrer'; article.append(offer); }
    return article;
  }
  function render() {
    const query = input.value.trim();
    results.replaceChildren(); results.hidden = true; pagination.hidden = true; browse.hidden = false;
    if (!query && !section.dataset.showAll) { status.textContent = ''; return; }
    if (failed) { status.textContent = 'Search is unavailable. Please browse the categories below or reload to try again.'; return; }
    if (!products) { status.textContent = isSlides ? 'Loading teaching slides...' : 'Loading printables...'; return; }
    const matches = filterProducts(products, query, document.body.dataset);
    const result = paginate(matches, page); page = result.page;
    browse.hidden = true; results.hidden = false;
    status.textContent = matches.length ? matches.length + (isSlides ? (matches.length === 1 ? ' slide pack found' : ' slide packs found') : (matches.length === 1 ? ' live product' : ' live products')) : isSlides ? 'No matching slide packs. Try another topic or clear your search.' : 'No matching products. Try another topic or clear your search.';
    results.append(...result.items.map(card));
    pagination.hidden = result.pages <= 1;
    previous.disabled = page === 1; next.disabled = page === result.pages;
    section.querySelector('[data-page]').textContent = 'Page ' + page + ' of ' + result.pages;
  }
  section.querySelector('form').addEventListener('submit', event => {event.preventDefault(); clearTimeout(timer); page = 1; render();});
  input.addEventListener('input', () => {clearTimeout(timer); page = 1; timer = setTimeout(render, 120);});
  previous.addEventListener('click', () => {page--; render();});
  next.addEventListener('click', () => {page++; render();});
  fetch('/data/print-and-go-products.json?v=20260910-freebies', { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  }).then(data => {
    if (!Array.isArray(data)) throw new Error('Invalid catalogue');
    const ids = new Set(data.map(item => item.id));
    products = [...NEW_FREEBIES.filter(item => !ids.has(item.id)), ...data];
    render();
  }).catch(() => {failed = true; render();});
}());
