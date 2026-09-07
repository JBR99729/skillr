(function () {
  'use strict';
  const root = document.querySelector('[data-product-detail]');
  const id = new URLSearchParams(location.search).get('id');
  const el = (tag, text, className) => { const node = document.createElement(tag); if (text) node.textContent = text; if (className) node.className = className; return node; };
  fetch('/data/print-and-go-products.json?v=20260907-bundle', { cache: 'no-cache' }).then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(products => {
    const product = products.find(item => item.available && item.id === id);
    if (!product) throw new Error();
    document.title = product.title + ' | SkillrHub';
    document.querySelector('[data-crumb]').textContent = product.title;
    const detail = el('div', '', 'product-detail');
    const image = el('img'); image.src = product.image; image.alt = product.title + ' cover'; image.width = 637; image.height = 900;
    const copy = el('div'); copy.append(el('p', product.yearLabel + ' · ' + product.subjectLabel, 'eyebrow'), el('h1', product.title), el('p', product.description));
    if (product.curriculumCodes && product.curriculumCodes.length) copy.append(el('p', 'Australian Curriculum: ' + product.curriculumCodes.join(' · '), 'small'));
    const price = product.free || Number(product.price) === 0 ? 'FREE' : 'US$' + Number(product.price).toFixed(2);
    copy.append(el('p', price, 'price'));
    if (product.includes && product.includes.length) { copy.append(el('h2', 'What’s included')); const list = el('ul'); product.includes.forEach(item => list.append(el('li', item))); copy.append(list); }
    const action = el('a', product.free || Number(product.price) === 0 ? 'Download free on TPT' : 'Purchase on TPT', 'button'); action.href = product.tptUrl; action.target = '_blank'; action.rel = 'noopener noreferrer';
    copy.append(action, el('p', 'Checkout and file delivery are securely handled by Teachers Pay Teachers.', 'small'));
    detail.append(image, copy); root.replaceChildren(detail);
  }).catch(() => { root.replaceChildren(el('h1', 'Product not found'), el('p', 'This product may no longer be live. Please return to the current catalogue.')); });
}());
