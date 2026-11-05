(function () {
  'use strict';
  var root = document.getElementById('skillr-home');
  if (!root) return;
  var input = root.querySelector('#site-search-input');
  var form = root.querySelector('#home-topic-search');
  var results = root.querySelector('#site-search-results');
  var list = root.querySelector('#site-search-list');
  var status = root.querySelector('#site-search-status');
  var yearFilter = root.querySelector('#search-year');
  var subjectFilter = root.querySelector('#search-subject');
  var cataloguePromise, banksPromise, productsPromise, request = 0;
  var names = {maths: 'Maths', science: 'Science', english: 'English'};
  function normalise(value) {
    return String(value || '').toLowerCase().replace(/\b(?:math|mathematics)\b/g, 'maths').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function codeQuery(query) {
    var compact = query.replace(/ /g, '');
    return /^ac9[a-z](?:10|[0-9f])[a-z]+[0-9]+$/.test(compact) ? compact : '';
  }
  function matchesTopic(item, terms, code) {
    if (code) return item.code.toLowerCase() === code;
    return terms.every(function (term) {
      return item.words.some(function (word) {
        return /^\d+$/.test(term) ? word === term : word.startsWith(term);
      });
    });
  }
  function loadCatalogue() {
    if (!cataloguePromise) cataloguePromise = fetch('/assets/site-search-index.json?v=20261029', {credentials:'same-origin'})
      .then(function (response) { if (!response.ok) throw Error('Search unavailable'); return response.json(); })
      .then(function (payload) {
        var seen = new Set();
        return (payload.items || []).filter(function (item) {
          // Canonical topic guides only: never surface obsolete quiz/test routes.
          if (item.e || !/^\/(foundation|year\d+)\/(maths|english|science)\/ac9[^/]+\/$/i.test(item.u) || seen.has(item.u)) return false;
          seen.add(item.u); return true;
        }).map(function (item) {
          var parts = item.u.split('/');
          var code = (parts[3].match(/^ac9[a-z](?:10|[0-9f])[a-z]+[0-9]+(?=-|$)/i) || [''])[0].toUpperCase();
          var year = parts[1] === 'foundation' ? '0' : parts[1].slice(4);
          var yearLabel = year === '0' ? 'Foundation' : 'Year '+year;
          return {title:item.t, url:item.u, code:code,
            year:year, subject:parts[2],
            words:normalise([item.t, item.x, code, yearLabel, parts[2]].join(' ')).split(' ')};
        });
      }).catch(function (error) { cataloguePromise = null; throw error; });
    return cataloguePromise;
  }
  function loadBanks() {
    if (!banksPromise) banksPromise = fetch('/data/app-question-banks.json?v=20261031', {credentials:'same-origin'})
      .then(function (response) { if (!response.ok) throw Error('Banks unavailable'); return response.json(); })
      .then(function (payload) { return new Map((payload.codes || []).map(function (bank) { return [bank.code, bank]; })); })
      .catch(function () { banksPromise = null; return new Map(); });
    return banksPromise;
  }
  function isTptListing(value) {
    try {
      var url = new URL(value);
      return url.origin === 'https://www.teacherspayteachers.com' &&
        !url.username && !url.password && /^\/Product\/[^/]+-\d+\/?$/.test(url.pathname);
    } catch (_) { return false; }
  }
  // Only link to confirmed public storefront listings.
  function loadPaidProducts() {
    if (!productsPromise) productsPromise = fetch('/data/print-and-go-products.json?v=20261104', {credentials:'same-origin'})
      .then(function (response) { if (!response.ok) throw Error('Products unavailable'); return response.json(); })
      .then(function (products) {
        var found = new Map(), rank = {worksheet:0, 'assessment-pack':1, workbook:2, bundle:3, unit:4, 'teaching-slides':5};
        (Array.isArray(products) ? products : []).forEach(function (product) {
          if (!product.available || product.free || !product.hasPrintables ||
              !(product.listingConfirmedAt || product.tptObservedAt) || !isTptListing(product.tptUrl) ||
              !Array.isArray(product.curriculumCodes)) return;
          product.curriculumCodes.forEach(function (code) {
            var key = String(code).toUpperCase(), previous = found.get(key);
            if (!previous || (rank[product.resourceType] ?? 10) < (rank[previous.resourceType] ?? 10))
              found.set(key, product);
          });
        });
        return found;
      }).catch(function () { productsPromise = null; return new Map(); });
    return productsPromise;
  }
  function message(text) { results.hidden = false; status.textContent = text; list.replaceChildren(); }
  function action(row, text, href, primary) {
    var link = document.createElement('a'); link.textContent = text; link.href = href;
    if (primary) link.className = 'sp-result-practice';
    if (href.startsWith('https://app.skillrhub.com/')) {
      link.dataset.homeConversion = primary ? 'practice_trial' : 'assessment'; link.dataset.homePlacement = 'topic_search';
    }
    row.append(link);
  }
  async function runSearch() {
    var ticket = ++request;
    var query = normalise(input.value), terms = query.split(' ').filter(Boolean), code = codeQuery(query);
    if (query.length < 2 && !yearFilter.value && !subjectFilter.value) { results.hidden = true; list.replaceChildren(); return; }
    message('Finding matching topics…');
    try {
      var data = await Promise.all([loadCatalogue(), loadBanks(), loadPaidProducts()]);
      if (ticket !== request) return;
      var matches = data[0].filter(function (item) {
        return (!yearFilter.value || yearFilter.value === item.year) && (!subjectFilter.value || subjectFilter.value === item.subject) && matchesTopic(item, terms, code);
      }).map(function (item) {
        var title = normalise(item.title);
        return {item:item, score:(title.includes(query) && query ? 50 : 0)+(item.code.toLowerCase() === code ? 100 : 0)+(data[1].get(item.code)?.practice ? 5 : 0)};
      }).sort(function (a,b) { return b.score-a.score || Number(a.item.year)-Number(b.item.year) || a.item.title.localeCompare(b.item.title); });
      var limit = yearFilter.value && subjectFilter.value ? 20 : 8;
      list.replaceChildren();
      status.textContent = matches.length ? (matches.length > limit ? 'Showing '+limit+' of '+matches.length+' matching topics. Refine your search for more.' : matches.length+' matching topic'+(matches.length === 1 ? '' : 's')+'.') : 'No matching topics. Try fewer words or a curriculum code.';
      matches.slice(0,limit).forEach(function (match) {
        var item=match.item, bank=data[1].get(item.code);
        var row=document.createElement('li'), title=document.createElement('a'), meta=document.createElement('p'), actions=document.createElement('div');
        title.className='sp-result-title'; title.href=item.url; title.textContent=item.title;
        meta.className='sp-result-meta'; meta.textContent=(item.year === '0' ? 'Foundation' : 'Year '+item.year)+' · '+names[item.subject]+' · '+item.code;
        actions.className='sp-result-actions';
        if (bank?.practice) action(actions, bank.guestPractice ? 'Free practice' : 'Free practice · free account', 'https://app.skillrhub.com/?'+(bank.guestPractice ? 'try=1' : 'login=1')+'&skill='+encodeURIComponent(item.code), true);
        if (bank?.assessment) action(actions, 'Assessment', 'https://app.skillrhub.com/?assessment='+encodeURIComponent(item.code));
        var paid = data[2].get(item.code);
        if (paid) {
          var paidLabel = paid.resourceType === 'bundle' ? 'Paid bundle' : 'Paid printables';
          action(actions, paidLabel+' & preview · TpT', paid.tptUrl);
          actions.lastElementChild.classList.add('sp-result-paid');
        }
        title.setAttribute('aria-label', item.title+' · free topic guide');
        row.append(title,meta,actions); list.append(row);
      });
    } catch (_) { if(ticket === request) message('Search is temporarily unavailable. Use the curriculum index in the footer.'); }
  }
  input.addEventListener('input', runSearch);
  yearFilter.addEventListener('change', runSearch);
  subjectFilter.addEventListener('change', runSearch);
  input.addEventListener('focus', function () { loadCatalogue().catch(function () {}); });
  input.addEventListener('keydown', function (event) { if(event.key==='Escape'){++request;results.hidden=true;} });
  form.addEventListener('submit', function (event) { event.preventDefault(); runSearch(); });
  var params = new URLSearchParams(location.search);
  var year = params.get('year'), subject = params.get('subject');
  if (/^(?:[0-9]|10)$/.test(year || '')) yearFilter.value = year;
  if (Object.hasOwn(names, subject)) subjectFilter.value = subject;
  input.value = params.get('q') || '';
  if (input.value || yearFilter.value || subjectFilter.value) runSearch();
})();

