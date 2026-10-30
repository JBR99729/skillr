(function () {
  'use strict';
  if (window.__skillrResourceLinks) return;
  window.__skillrResourceLinks = true;

  function pageCode(path) {
    return ((path.match(/\/(ac9[a-z0-9]+)(?:-|\/)/i) || [])[1] || '').toUpperCase();
  }

  function sameCode(product, code) {
    if (!code || !product) return false;
    const exact = (product.curriculumCodes || []).some(c => String(c).toUpperCase() === code);
    if (exact) return true;
    const haystack = [product.id, product.title, product.description, ...(product.topics || [])]
      .filter(Boolean).join(' ').toUpperCase();
    return haystack.includes(code);
  }

  function isPaid(product) {
    return product && product.available && !product.free && Number(product.price || 0) > 0 && /^https:\/\/www\.teacherspayteachers\.com\//i.test(product.tptUrl || '');
  }

  function trackedTptUrl(rawUrl, code, placement, productId) {
    try {
      const url = new URL(rawUrl);
      url.searchParams.set('utm_source', 'skillrhub');
      url.searchParams.set('utm_medium', 'curriculum');
      url.searchParams.set('utm_campaign', 'tpt_code_funnel');
      url.searchParams.set('utm_content', [code || 'catalogue', placement || 'resource', productId || 'product'].join('_'));
      return url.toString();
    } catch (_) {
      return rawUrl;
    }
  }

  function fireTptEvent(anchor) {
    const detail = {
      event: 'tpt_outbound_click',
      curriculum_code: anchor.dataset.curriculumCode || '',
      product_id: anchor.dataset.productId || '',
      placement: anchor.dataset.funnelPlacement || '',
      destination: anchor.href
    };
    try {
      if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
      if (typeof window.gtag === 'function') window.gtag('event', 'tpt_outbound_click', detail);
      window.dispatchEvent(new CustomEvent('skillr:tpt-click', {detail}));
    } catch (_) {}
  }

  function productPriority(product) {
    const type = String(product.resourceType || '');
    if (type === 'teaching-slides') return 0;
    if (type === 'unit') return 1;
    if (type === 'assessment-pack') return 2;
    if (type === 'workbook') return 3;
    return 4;
  }

  function topicalBundle(products, product, code) {
    if (product.bundleTptUrl) {
      return {
        id: product.id + '-bundle',
        title: 'Matching bundle',
        tptUrl: product.bundleTptUrl,
        price: product.bundlePrice || '',
        description: 'Get this resource together with its matching companion resources.'
      };
    }
    return products.find(p =>
      isPaid(p) &&
      p.resourceType === 'bundle' &&
      p.id !== product.id &&
      sameCode(p, code) &&
      !/complete|full.year/i.test(String(p.title || ''))
    ) || null;
  }

  function yearBundle(products, product) {
    return products.find(p =>
      isPaid(p) &&
      p.resourceType === 'bundle' &&
      p.id !== product.id &&
      Number(p.year) === Number(product.year) &&
      String(p.subject || '').toLowerCase() === String(product.subject || '').toLowerCase() &&
      /complete|full.year|year.1/i.test(String(p.title || ''))
    ) || null;
  }

  function makeTptLink(product, code, placement, label) {
    const link = document.createElement('a');
    link.className = 'skillr-tpt-funnel__button';
    link.href = trackedTptUrl(product.tptUrl, code, placement, product.id);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    link.dataset.tptOutbound = 'true';
    link.dataset.curriculumCode = code;
    link.dataset.productId = product.id || '';
    link.dataset.funnelPlacement = placement;
    return link;
  }

  function buildProductFunnel(products, path) {
    const panel = document.querySelector('[data-teaching-resources] .content-block');
    if (!panel || document.getElementById('skillr-tpt-code-funnel')) return;

    const code = pageCode(path);
    if (!code) return;

    const matches = products
      .filter(p => isPaid(p) && sameCode(p, code))
      .sort((a, b) => productPriority(a) - productPriority(b) || Number(a.price || 0) - Number(b.price || 0));

    if (!matches.length) return;

    const product = matches[0];
    const bundle = topicalBundle(products, product, code);
    const wholeYear = yearBundle(products, product);
    const box = document.createElement('section');
    box.id = 'skillr-tpt-code-funnel';
    box.className = 'skillr-tpt-funnel';
    box.setAttribute('aria-label', 'Ready-to-teach resource for ' + code);

    const eyebrow = document.createElement('p');
    eyebrow.className = 'skillr-tpt-funnel__eyebrow';
    eyebrow.textContent = 'READY-TO-TEACH · ' + code;

    const heading = document.createElement('h3');
    heading.textContent = 'Want the complete classroom resource?';

    const copy = document.createElement('p');
    copy.textContent = product.description || 'Use the complete SkillrHub teaching resource for this curriculum code.';

    const proof = document.createElement('ul');
    proof.className = 'skillr-tpt-funnel__proof';
    ['Aligned to this curriculum code', 'Preview before purchase on TPT', 'SkillrHub online learning stays free'].forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      proof.appendChild(li);
    });

    const actions = document.createElement('div');
    actions.className = 'skillr-tpt-funnel__actions';
    const price = Number(product.price || 0);
    actions.appendChild(makeTptLink(product, code, 'topic_resource_panel', 'View full resource on TPT' + (price ? ' · US$' + price.toFixed(2) : '')));

    if (bundle && bundle.tptUrl) {
      const bundleLink = makeTptLink(bundle, code, 'topic_bundle_upsell', 'See matching bundle' + (bundle.price ? ' · US$' + Number(bundle.price).toFixed(2) : ''));
      bundleLink.classList.add('skillr-tpt-funnel__button--secondary');
      actions.appendChild(bundleLink);
    }

    if (wholeYear && wholeYear.tptUrl && (!bundle || wholeYear.tptUrl !== bundle.tptUrl)) {
      const yearLink = makeTptLink(wholeYear, code, 'whole_year_bundle_upsell', 'See complete Year 1 ' + (String(product.subject || '').toLowerCase() === 'science' ? 'Science' : 'Maths') + ' bundle' + (wholeYear.price ? ' · US$' + Number(wholeYear.price).toFixed(2) : ''));
      yearLink.classList.add('skillr-tpt-funnel__button--secondary');
      actions.appendChild(yearLink);
    }

    const reassurance = document.createElement('p');
    reassurance.className = 'skillr-tpt-funnel__note';
    reassurance.textContent = 'Use the free topic guide, practice and test here first. TPT handles the paid preview, checkout and file delivery.';

    box.append(eyebrow, heading, copy, proof, actions, reassurance);
    panel.prepend(box);
  }

  function topicPacks() {
    const panel = document.querySelector('[data-teaching-resources] .content-block');
    if (!panel) return;
    fetch('/data/print-and-go-products.json?v=20260923-tpt-funnel', {cache: 'no-cache'}).then(response => {
      if (!response.ok) throw new Error('Catalogue unavailable');
      return response.json();
    }).then(products => {
      if (!Array.isArray(products)) return;
      buildProductFunnel(products, window.location.pathname);
    }).catch(() => {});
  }

  function mountTopicPracticeLink(code) {
    let link = document.getElementById('skillr-topic-practice-now');
    const visibility = () => { if (link) link.hidden = !!document.fullscreenElement; };
    document.addEventListener('fullscreenchange', visibility);
    visibility();
    fetch('/data/app-question-banks.json?v=20261031', {cache: 'no-cache'})
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Practice catalogue unavailable')))
      .then(data => {
        const bank = (data.codes || []).find(item => item.code === code);
        if (!bank?.practice) { link?.remove(); return; }
        if (!link) {
          link = document.createElement('a');
          link.id = 'skillr-topic-practice-now';
          link.className = 'skillr-topic-practice-now';
          document.body.appendChild(link);
        }
        link.href = 'https://app.skillrhub.com/?' + (bank.guestPractice ? 'try=1&skill=' : 'login=1&skill=') + encodeURIComponent(code);
        link.textContent = 'Practice now →';
        link.dataset.floatingPractice = code;
        link.dataset.practicePlacement = 'floating_button';
        link.dataset.curriculumCode = code;
        link.setAttribute('aria-label', 'Practice ' + code + (bank.guestPractice ? '' : ' — free account needed'));
        visibility();
      })
      .catch(() => {}); // A verified static link remains usable if the catalogue cannot be refreshed.
  }

  function init() {
    if (!document.body || document.getElementById('skillr-resource-links')) return;
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = '/assets/resource-links.css?v=topic-floating-practice-20261031';
    document.head.appendChild(css);
    const menu=document.createElement('section');menu.id='skillr-resource-links';menu.className='skillr-practice-bar';menu.setAttribute('aria-label','Free practice');
    const intro=document.createElement('div');intro.className='skillr-practice-bar__intro';intro.innerHTML='<strong>Free practice questions</strong><span>No email to start</span>';
    const practice=document.createElement('a');practice.className='skillr-practice-bar__button';practice.href='https://app.skillrhub.com/?try=1';practice.textContent='Try free practice →';practice.dataset.practicePlacement='sticky_bar';
    const code=pageCode(window.location.pathname),isTopic=/^\/(?:foundation|year(?:[1-9]|10))\/(?:maths|science|english)\/ac9[^/]+\/(?:index\.html)?$/i.test(window.location.pathname);
    if(isTopic&&code){practice.href+='&skill='+encodeURIComponent(code);practice.dataset.curriculumCode=code;}
    const close=document.createElement('button');close.type='button';close.className='skillr-practice-bar__close';close.textContent='×';close.setAttribute('aria-label','Dismiss free practice bar');
    let dismissed=false;try{dismissed=window.sessionStorage?.getItem('skillr-practice-bar-dismissed-v1')==='1';}catch{}
    menu.hidden=dismissed;menu.append(intro,practice,close);document.body.appendChild(menu);
    close.addEventListener('click',()=>{dismissed=true;menu.hidden=true;try{window.sessionStorage?.setItem('skillr-practice-bar-dismissed-v1','1');}catch{}});
    // Topic pages retain one code-matched floating action; the main card stays compact.
    if(isTopic)menu.remove();
    if(isTopic && /^\/(?:foundation|year[1-6])\//i.test(window.location.pathname)) mountTopicPracticeLink(code);
    topicPacks();

    if (window.location.pathname === '/teach-and-explain.html') {
      fetch('/data/print-and-go-products.json?v=20260923-tpt-funnel', {cache: 'no-cache'}).then(response => response.ok ? response.json() : []).then(products => {
        const slides = Array.isArray(products) ? products.filter(product => product.available && product.resourceType === 'teaching-slides' && product.id.indexOf('tpt-') === 0) : [];
        if (!slides.length || document.getElementById('tpt-active-slide-catalogue')) return;
        const section = document.createElement('section');
        section.id = 'tpt-active-slide-catalogue';
        section.className = 'featured-products';
        section.setAttribute('aria-labelledby', 'tpt-active-slide-catalogue-title');
        const heading = document.createElement('div');
        heading.className = 'section-heading';
        heading.innerHTML = '<p class="eyebrow">EXPANDED RANGE</p><h2 id="tpt-active-slide-catalogue-title">Year 1 Maths and Science teaching resources</h2><p>Additional active SkillrHub teaching-slide resources, including measurement, space, statistics and science topics.</p>';
        const grid = document.createElement('div');
        grid.className = 'product-grid product-grid--featured';
        slides.forEach(product => {
          const card = document.createElement('article');
          card.className = 'product-card';
          const title = document.createElement('h3'); title.textContent = product.title;
          const description = document.createElement('p'); description.textContent = product.description;
          const details = document.createElement('p'); details.className = 'small'; details.textContent = product.curriculumCodes.join(' · ') + ' · ' + product.yearLabel + ' ' + product.subjectLabel;
          const price = document.createElement('p'); price.className = 'price'; price.textContent = 'US$' + Number(product.price).toFixed(2);
          const action = makeTptLink(product, (product.curriculumCodes || [])[0] || '', 'teach_catalogue', 'View on TPT');
          action.classList.add('button');
          card.append(title, description, details, price, action); grid.appendChild(card);
        });
        section.append(heading, grid);
        const support = document.querySelector('main > .support');
        (support || document.querySelector('main')).before(section);
      }).catch(() => {});
    }

    document.addEventListener('click', event => {
      const tpt = event.target.closest && event.target.closest('[data-tpt-outbound]');
      if (tpt) fireTptEvent(tpt);
      const practice=event.target.closest?.('[data-practice-placement]');
      if(practice&&typeof window.gtag==='function')window.gtag('event','practice_start_click',{placement:practice.dataset.practicePlacement,curriculum_code:practice.dataset.curriculumCode});
    });
    document.addEventListener('fullscreenchange', () => { menu.hidden = isTopic || dismissed || !!document.fullscreenElement; });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
}());

// skillr-companions: shared brand and optional learning navigation
(function () {
  if (window.__skillrCompanionLoaderRequested) return;
  window.__skillrCompanionLoaderRequested = true;
  var script = document.createElement('script');
  script.src = '/assets/companions/loader.js?v=20260909-1';
  script.defer = true;
  document.head.appendChild(script);
}());
