(function () {
  'use strict';
  var root = document.getElementById('skillr-home');
  if (!root) return;
  var input = root.querySelector('#site-search-input');
  var form = root.querySelector('#home-topic-search');
  var results = root.querySelector('#site-search-results');
  var list = root.querySelector('#site-search-list');
  var status = root.querySelector('#site-search-status');
  var showAll = root.querySelector('#site-search-show-all');
  var yearFilter = root.querySelector('#search-year');
  var subjectFilter = root.querySelector('#search-subject');
  var cataloguePromise, banksPromise, productsPromise, request = 0, current = null;
  var names = {maths: 'Maths', science: 'Science', english: 'English'};
  function normalise(value) {
    return String(value || '').toLowerCase().replace(/\b(?:math|mathematics)\b/g, 'maths').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function codeQuery(query) {
    var compact = query.replace(/ /g, '');
    return /^ac9[a-z](?:10|[0-9f])[a-z]+[0-9]+$/.test(compact) ? compact : '';
  }
  function wordMatches(word, term) {
    if (/^\d+$/.test(term)) return word === term;
    return word.startsWith(term) || (term.length > 4 && term.endsWith('s') && word === term.slice(0, -1));
  }
  function matchesTopic(item, terms, code) {
    if (code) return item.code.toLowerCase() === code;
    return terms.every(function (term) {
      return item.words.some(function (word) {
        return wordMatches(word, term);
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
          // Keep catalogue text searchable, but don't lead with a curriculum code or a long descriptor.
          var title = code === 'AC9M4N04' ? 'Count and locate fractions on number lines' : item.t.replace(/^AC9\w+:\s*/i, '');
          return {title:title, titleWords:normalise(title).split(' '), url:item.u, code:code,
            year:year, subject:parts[2],
            words:normalise([title, item.t, item.x, code, yearLabel, parts[2]].join(' ')).split(' ')};
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
  function message(text) {
    results.hidden = false; status.textContent = text; list.replaceChildren(); showAll.hidden = true;
  }
  function action(row, text, href, primary, topic) {
    var link = document.createElement('a'); link.textContent = text; link.href = href;
    link.setAttribute('aria-label', text + ': ' + topic);
    if (primary) link.className = 'sp-result-practice';
    if (href.startsWith('https://app.skillrhub.com/')) {
      link.dataset.homeConversion = primary ? 'practice_trial' : 'assessment'; link.dataset.homePlacement = 'topic_search';
    }
    row.append(link);
    return link;
  }
  function titleScore(item, terms, query, code) {
    if (code) return item.code.toLowerCase() === code ? 1000 : 0;
    if (!terms.length) return 0;
    var titleMatches = terms.filter(function (term) {
      return item.titleWords.some(function (word) { return wordMatches(word, term); });
    }).length;
    // Direct title matches outrank words mentioned in a guide, with full phrases first.
    return (titleMatches === terms.length ? 1000 : 0) +
      (item.titleWords.join(' ').includes(query) ? 100 : 0) + titleMatches;
  }
  function addPaid(actions, item, products) {
    var paid = products.get(item.code);
    if (!paid) return;
    var label = paid.resourceType === 'bundle' ? 'Printable bundle (TpT, paid)' : 'Printable worksheets (TpT, paid)';
    action(actions, label, paid.tptUrl, false, item.title).classList.add('sp-result-paid');
  }
  function appendMatches(search, limit) {
    var fragment = document.createDocumentFragment(), firstNewTitle = null;
    for (var i = search.rendered; i < limit; i++) {
      var item = search.matches[i].item, bank = search.banks.get(item.code);
      var row = document.createElement('li'), title = document.createElement('h3');
      var meta = document.createElement('p'), actions = document.createElement('div');
      title.className = 'sp-result-title'; title.tabIndex = -1; title.textContent = item.title;
      if (!firstNewTitle) firstNewTitle = title;
      meta.className = 'sp-result-meta'; meta.textContent = (item.year === '0' ? 'Foundation' : 'Year '+item.year)+' · '+names[item.subject]+' · '+item.code;
      actions.className = 'sp-result-actions';
      if (bank?.practice) action(actions, bank.guestPractice ? 'Practise online' : 'Practise online (free account)', 'https://app.skillrhub.com/?'+(bank.guestPractice ? 'try=1' : 'login=1')+'&skill='+encodeURIComponent(item.code), true, item.title);
      action(actions, 'Read the guide', item.url, false, item.title);
      if (bank?.assessment) action(actions, 'Assessment', 'https://app.skillrhub.com/?assessment='+encodeURIComponent(item.code), false, item.title);
      if (search.products) addPaid(actions, item, search.products);
      search.renderedActions.push({actions:actions, item:item});
      row.append(title,meta,actions); fragment.append(row);
    }
    list.append(fragment);
    search.rendered = limit;
    var count = search.matches.length;
    status.textContent = count ? (limit === count ? count+' matching topic'+(count === 1 ? '' : 's')+'.' : 'Showing '+limit+' of '+count+' matching topics.') : 'No matching topics. Try fewer words or a curriculum code.';
    showAll.hidden = limit >= count;
    if (!showAll.hidden) showAll.textContent = 'Show all '+count+' results';
    return firstNewTitle;
  }
  async function runSearch(submitted) {
    var ticket = ++request;
    current = null;
    var query = normalise(input.value), terms = query.split(' ').filter(Boolean), code = codeQuery(query);
    var year = yearFilter.value, subject = subjectFilter.value;
    if (query.length < 2 && !year && !subject) {
      message('Enter a topic or choose a year or subject.');
      results.hidden = !submitted;
      return;
    }
    message('Finding matching topics…');
    try {
      var data = await Promise.all([loadCatalogue(), loadBanks()]);
      if (ticket !== request) return;
      var matches = data[0].filter(function (item) {
        return (!year || year === item.year) && (!subject || subject === item.subject) && matchesTopic(item, terms, code);
      }).map(function (item) {
        return {item:item, score:titleScore(item, terms, query, code), hasPractice:!!data[1].get(item.code)?.practice};
      }).sort(function (a,b) {
        return b.score-a.score || Number(b.hasPractice)-Number(a.hasPractice) ||
          Number(a.item.year)-Number(b.item.year) || a.item.title.localeCompare(b.item.title);
      });
      var search = {matches:matches, banks:data[1], products:null, rendered:0, renderedActions:[]};
      current = search;
      appendMatches(search, Math.min(matches.length, year && subject ? 20 : 8));
      if (matches.length) loadPaidProducts().then(function (products) {
        if (ticket !== request) return;
        search.products = products;
        search.renderedActions.forEach(function (result) { addPaid(result.actions, result.item, products); });
      });
    } catch (_) { if(ticket === request) message('Search is temporarily unavailable. Use the curriculum index in the footer.'); }
  }
  input.addEventListener('input', function () { runSearch(false); });
  yearFilter.addEventListener('change', function () { runSearch(false); });
  subjectFilter.addEventListener('change', function () { runSearch(false); });
  input.addEventListener('focus', function () { loadCatalogue().catch(function () {}); });
  [input, results].forEach(function (element) {
    element.addEventListener('keydown', function (event) {
      if(event.key !== 'Escape' || results.hidden) return;
      if (element === results) input.focus();
      ++request; current = null; results.hidden = true;
    });
  });
  showAll.addEventListener('click', function () {
    if (!current) return;
    var firstNewTitle = appendMatches(current, current.matches.length);
    if (firstNewTitle) firstNewTitle.focus();
  });
  form.addEventListener('submit', function (event) { event.preventDefault(); runSearch(true); });
  var params = new URLSearchParams(location.search);
  var year = params.get('year'), subject = params.get('subject');
  if (/^(?:[0-9]|10)$/.test(year || '')) yearFilter.value = year;
  if (Object.hasOwn(names, subject)) subjectFilter.value = subject;
  input.value = params.get('q') || '';
  if (input.value || yearFilter.value || subjectFilter.value) runSearch();
})();

