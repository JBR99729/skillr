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
  var cataloguePromise, banksPromise, request = 0;
  var names = {maths: 'Maths', science: 'Science', english: 'English'};
  function normalise(value) {
    return String(value || '').toLowerCase().replace(/\bmathematics\b/g, 'maths').replace(/[^a-z0-9]+/g, ' ').trim();
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
          var code = (parts[3].match(/^ac9[a-z]+\d*[a-z]*\d+/i) || [''])[0].toUpperCase();
          return {title:item.t, url:item.u, code:code,
            year:parts[1] === 'foundation' ? '0' : parts[1].slice(4), subject:parts[2],
            searchable:normalise(item.t+' '+item.x+' '+code)};
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
    var query = normalise(input.value), terms = query.split(' ').filter(Boolean);
    if (query.length < 2 && !yearFilter.value && !subjectFilter.value) { results.hidden = true; list.replaceChildren(); return; }
    message('Finding matching topics…');
    try {
      var data = await Promise.all([loadCatalogue(), loadBanks()]);
      if (ticket !== request) return;
      var matches = data[0].filter(function (item) {
        return (!yearFilter.value || yearFilter.value === item.year) && (!subjectFilter.value || subjectFilter.value === item.subject) && terms.every(function (term) {
          return item.searchable.split(' ').some(function (word) { return word.startsWith(term); });
        });
      }).map(function (item) {
        var title = normalise(item.title);
        return {item:item, score:(title.includes(query) && query ? 50 : 0)+(item.code.toLowerCase() === query.replace(/ /g,'') ? 100 : 0)+(data[1].get(item.code)?.practice ? 5 : 0)};
      }).sort(function (a,b) { return b.score-a.score || Number(a.item.year)-Number(b.item.year) || a.item.title.localeCompare(b.item.title); });
      list.replaceChildren();
      status.textContent = matches.length ? (matches.length > 8 ? 'Showing 8 of '+matches.length+' matching topics. Refine your search for more.' : matches.length+' matching topic'+(matches.length === 1 ? '' : 's')+'.') : 'No matching topics. Try fewer words, another year or a curriculum code.';
      matches.slice(0,8).forEach(function (match) {
        var item=match.item, bank=data[1].get(item.code);
        var row=document.createElement('li'), title=document.createElement('a'), meta=document.createElement('p'), actions=document.createElement('div');
        title.className='sp-result-title'; title.href=item.url; title.textContent=item.title;
        meta.className='sp-result-meta'; meta.textContent=(item.year === '0' ? 'Foundation' : 'Year '+item.year)+' · '+names[item.subject]+' · '+item.code;
        actions.className='sp-result-actions';
        if (bank?.practice) action(actions, bank.guestPractice ? 'Free practice' : 'Free practice · free account', 'https://app.skillrhub.com/?'+(bank.guestPractice ? 'try=1' : 'login=1')+'&skill='+encodeURIComponent(item.code), true);
        if (bank?.assessment) action(actions, 'Assessment', 'https://app.skillrhub.com/?assessment='+encodeURIComponent(item.code));
        action(actions, 'Topic guide', item.url); row.append(title,meta,actions); list.append(row);
      });
    } catch (_) { if(ticket === request) message('Search is temporarily unavailable. Browse the topic guides by year below.'); }
  }
  input.addEventListener('input', runSearch);
  input.addEventListener('focus', function () { loadCatalogue().catch(function () {}); });
  input.addEventListener('keydown', function (event) { if(event.key==='Escape'){++request;results.hidden=true;} });
  form.addEventListener('submit', function (event) { event.preventDefault(); runSearch(); });
  yearFilter.addEventListener('change', runSearch); subjectFilter.addEventListener('change', runSearch);
  function setGuideYear(year, save) {
    if (!/^([0-9]|10)$/.test(String(year))) year='1';
    var label=String(year)==='0' ? 'Foundation' : 'Year '+year, base=String(year)==='0' ? 'foundation' : 'year'+year;
    root.querySelectorAll('[data-guide-year]').forEach(function (button) { button.setAttribute('aria-pressed',String(button.dataset.guideYear===String(year))); });
    root.querySelectorAll('[data-guide-subject]').forEach(function (link) {
      link.href='/'+base+'/curriculum/'+link.dataset.guideSubject+'/';
      link.querySelector('strong').textContent=label+' '+names[link.dataset.guideSubject];
    });
    root.querySelector('#guide-year-label').textContent='Showing '+label+' topic guides';
    if(save) {
      yearFilter.value=String(year);
      input.placeholder='Search '+label+' topics or curriculum codes';
      if(normalise(input.value).length>=2 || !results.hidden) runSearch();
      try {localStorage.setItem('skillrHomeYear',base);} catch (_) {}
    }
  }
  root.querySelectorAll('[data-guide-year]').forEach(function(button){button.addEventListener('click',function(){setGuideYear(button.dataset.guideYear,true);});});
  var saved='year1';try{saved=localStorage.getItem('skillrHomeYear') || saved;}catch(_){}
  setGuideYear(saved==='foundation' ? '0' : saved.replace('year',''),false);
  root.querySelector('.sp-quick-search').addEventListener('click',function(event){event.preventDefault();input.focus({preventScroll:true});root.querySelector('#topic-search').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  var menu=root.querySelector('.sp-mobile-menu');
  menu.addEventListener('keydown',function(event){if(event.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();}});
  menu.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){menu.open=false;});});
  document.addEventListener('click',function(event){if(menu.open&&!menu.contains(event.target))menu.open=false;});
  var query=new URLSearchParams(location.search).get('q'); if(query){input.value=query;runSearch();}
})();
