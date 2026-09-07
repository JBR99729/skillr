(function () {
  'use strict';
  function filterProducts(products, query, scope = {}) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return products.filter(product => {
      const wantedType = scope.resourceType || 'worksheet';
      const productType = product.resourceType || 'worksheet';
      if (wantedType === 'teaching-slides') {
        if (!['teaching-slides', 'teaching-sample'].includes(productType)) return false;
      } else if (productType !== wantedType) return false;
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
    const link = element('a');
    link.href = product.url;
    const image = element('img');
    image.src = product.image; image.alt = product.title + ' cover';
    image.width = 637; image.height = 900; image.loading = 'lazy';
    link.append(image, element('h2', product.title));
    const details = element('a', 'View pack details'); details.href = product.url;
    const priceText = product.paidTptUrl ? 'Free preview · Full pack US
    return article;
  }
  function render() {
    const query = input.value.trim();
    results.replaceChildren(); results.hidden = true; pagination.hidden = true; browse.hidden = false;
    if (!query) { status.textContent = ''; return; }
    if (failed) { status.textContent = 'Search is unavailable. Please browse the categories below or reload to try again.'; return; }
    if (!products) { status.textContent = isSlides ? 'Loading teaching slides...' : 'Loading printables...'; return; }
    const matches = filterProducts(products, query, document.body.dataset);
    const result = paginate(matches, page); page = result.page;
    browse.hidden = true; results.hidden = false;
    status.textContent = matches.length ? matches.length + (isSlides ? (matches.length === 1 ? ' slide pack found' : ' slide packs found') : (matches.length === 1 ? ' printable found' : ' printables found')) : isSlides ? 'No matching slide packs. Try another topic or clear your search.' : 'No matching printables. Try another topic or clear your search.';
    results.append(...result.items.map(card));
    pagination.hidden = result.pages <= 1;
    previous.disabled = page === 1; next.disabled = page === result.pages;
    section.querySelector('[data-page]').textContent = 'Page ' + page + ' of ' + result.pages;
  }
  section.querySelector('form').addEventListener('submit', event => {event.preventDefault(); clearTimeout(timer); page = 1; render();});
  input.addEventListener('input', () => {clearTimeout(timer); page = 1; timer = setTimeout(render, 120);});
  previous.addEventListener('click', () => {page--; render();});
  next.addEventListener('click', () => {page++; render();});
  fetch('/data/print-and-go-products.json').then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  }).then(data => {if (!Array.isArray(data)) throw new Error('Invalid catalogue'); products = data; render();}).catch(() => {failed = true; render();});
}());
 + Number(product.paidPrice || 0).toFixed(2) : new Intl.NumberFormat('en-AU', {style: 'currency', currency: product.currency}).format(Number(product.price));
    article.append(link, element('p', product.curriculumCodes.join(' · '), 'small'), element('p', product.description), element('p', priceText, 'price'), details);
    if (product.paidTptUrl) { const buy = element('a', 'Buy full pack — US
    return article;
  }
  function render() {
    const query = input.value.trim();
    results.replaceChildren(); results.hidden = true; pagination.hidden = true; browse.hidden = false;
    if (!query) { status.textContent = ''; return; }
    if (failed) { status.textContent = 'Search is unavailable. Please browse the categories below or reload to try again.'; return; }
    if (!products) { status.textContent = isSlides ? 'Loading teaching slides...' : 'Loading printables...'; return; }
    const matches = filterProducts(products, query, document.body.dataset);
    const result = paginate(matches, page); page = result.page;
    browse.hidden = true; results.hidden = false;
    status.textContent = matches.length ? matches.length + (isSlides ? (matches.length === 1 ? ' slide pack found' : ' slide packs found') : (matches.length === 1 ? ' printable found' : ' printables found')) : isSlides ? 'No matching slide packs. Try another topic or clear your search.' : 'No matching printables. Try another topic or clear your search.';
    results.append(...result.items.map(card));
    pagination.hidden = result.pages <= 1;
    previous.disabled = page === 1; next.disabled = page === result.pages;
    section.querySelector('[data-page]').textContent = 'Page ' + page + ' of ' + result.pages;
  }
  section.querySelector('form').addEventListener('submit', event => {event.preventDefault(); clearTimeout(timer); page = 1; render();});
  input.addEventListener('input', () => {clearTimeout(timer); page = 1; timer = setTimeout(render, 120);});
  previous.addEventListener('click', () => {page--; render();});
  next.addEventListener('click', () => {page++; render();});
  fetch('/data/print-and-go-products.json').then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  }).then(data => {if (!Array.isArray(data)) throw new Error('Invalid catalogue'); products = data; render();}).catch(() => {failed = true; render();});
}());
 + Number(product.paidPrice || 0).toFixed(2), 'button'); buy.href = product.paidTptUrl; buy.target = '_blank'; buy.rel = 'noopener noreferrer'; article.append(buy); }
    return article;
  }
  function render() {
    const query = input.value.trim();
    results.replaceChildren(); results.hidden = true; pagination.hidden = true; browse.hidden = false;
    if (!query) { status.textContent = ''; return; }
    if (failed) { status.textContent = 'Search is unavailable. Please browse the categories below or reload to try again.'; return; }
    if (!products) { status.textContent = isSlides ? 'Loading teaching slides...' : 'Loading printables...'; return; }
    const matches = filterProducts(products, query, document.body.dataset);
    const result = paginate(matches, page); page = result.page;
    browse.hidden = true; results.hidden = false;
    status.textContent = matches.length ? matches.length + (isSlides ? (matches.length === 1 ? ' slide pack found' : ' slide packs found') : (matches.length === 1 ? ' printable found' : ' printables found')) : isSlides ? 'No matching slide packs. Try another topic or clear your search.' : 'No matching printables. Try another topic or clear your search.';
    results.append(...result.items.map(card));
    pagination.hidden = result.pages <= 1;
    previous.disabled = page === 1; next.disabled = page === result.pages;
    section.querySelector('[data-page]').textContent = 'Page ' + page + ' of ' + result.pages;
  }
  section.querySelector('form').addEventListener('submit', event => {event.preventDefault(); clearTimeout(timer); page = 1; render();});
  input.addEventListener('input', () => {clearTimeout(timer); page = 1; timer = setTimeout(render, 120);});
  previous.addEventListener('click', () => {page--; render();});
  next.addEventListener('click', () => {page++; render();});
  fetch('/data/print-and-go-products.json').then(response => {
    if (!response.ok) throw new Error('Catalogue unavailable');
    return response.json();
  }).then(data => {if (!Array.isArray(data)) throw new Error('Invalid catalogue'); products = data; render();}).catch(() => {failed = true; render();});
}());
