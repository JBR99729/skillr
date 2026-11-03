(function () {
  'use strict';
  const formatOf = p => p.isBundle || p.resourceType === 'bundle' ? 'bundle' : p.hasSlides || ['teaching-slides','teaching-sample'].includes(p.resourceType) ? 'slides' : 'worksheets';
  const uniqueProducts = rows => [...new Map(rows.filter(p => p.available).map(p => [(p.tptUrl || '').match(/\d+$/)?.[0] || p.id, p])).values()];
  function filterProducts(rows, state) {
    const terms = (state.query || '').toLowerCase().trim().split(/\s+/).filter(Boolean);
    return rows.filter(p => (!state.market || p.market === state.market) && (state.year === '' || state.year === undefined || String(p.year) === String(state.year)) && (!state.subject || p.subject === state.subject) && (!state.format || state.format === 'all' || formatOf(p) === state.format) && terms.every(t => [p.title,...(p.curriculumCodes || []),...(p.topics || [])].join(' ').toLowerCase().includes(t)));
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {formatOf, uniqueProducts, filterProducts};
  if (typeof document === 'undefined') return;
  const root = document.querySelector('[data-resource-library]');
  if (!root) return;
  let products = [], page = 1;
  const defaultMarket = root.dataset.market || '';
  const defaultFormat = root.dataset.format || '';
  const marketLabel = m => m === 'us' ? 'United States' : 'Australia';
  const yearLabel = (y,m) => Number(y) === 0 ? m === 'us' ? 'Kindergarten' : 'Foundation' : (m === 'us' ? 'Grade ' : 'Year ') + y;
  const subjectLabel = s => ({maths:state.market === 'us' ? 'Math' : 'Maths',english:'English',science:'Science'})[s] || s;
  const formatLabel = f => ({worksheets:'Worksheets & workbooks',slides:'Teaching slides',bundle:'Bundles',all:'All resources'})[f] || f;
  let state;
  function readState() {
    const q = new URLSearchParams(location.search);
    const market = q.has('market') ? q.get('market') : defaultMarket;
    const year = q.get('year') ?? '';
    const subject = q.get('subject') || '';
    const format = q.has('format') ? q.get('format') : defaultFormat;
    state = {market:['au','us'].includes(market) ? market : '',year:/^\d{1,2}$/.test(year) ? year : '',subject:['maths','english','science'].includes(subject) ? subject : '',format:['worksheets','slides','bundle','all'].includes(format) ? format : '',query:(q.get('q') || '').slice(0,160)};
    if (!state.market) {state.year='';state.subject='';state.query='';}
    if (!state.subject) state.subject='';
  }
  readState();
  function node(tag,text,cls) { const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n; }
  function urlFor(next) {
    const q=new URLSearchParams();q.set('market',next.market || '');
    if(next.year!=='')q.set('year',next.year);
    if(next.subject)q.set('subject',next.subject);
    q.set('format',next.format || '');
    if(next.query)q.set('q',next.query);
    return location.pathname+'?'+q.toString();
  }
  function go(next) {state={...state,...next};page=1;history.pushState(null,'',urlFor(state));render(true);}
  function action(text,next,cls='rl-button') {const a=node('a',text,cls);a.href=urlFor({...state,...next});a.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();go(next);});return a;}
  function folder(title,subtitle,count,next,icon) {
    const a=action('',next,'rl-folder');const mark=node('span','','rl-folder-icon');mark.setAttribute('aria-hidden','true');mark.textContent=icon || '';
    const text=node('span','','rl-folder-text');text.append(node('strong',title),node('span',subtitle),node('small',count+' '+(count===1?'resource':'resources')));
    const arrow=node('span','→','rl-arrow');arrow.setAttribute('aria-hidden','true');a.append(mark,text,arrow);return a;
  }
  function card(p) {
    const a=node('article','','rl-product');a.dataset.productId=(p.tptUrl || '').match(/\d+$/)?.[0] || p.id;
    const link=node('a','','rl-cover');link.href=p.tptUrl;link.target='_blank';link.rel='noopener noreferrer';
    const image=node('img');image.src=p.image;image.alt=p.title+' cover';image.width=525;image.height=525;image.loading='lazy';link.append(image);
    const copy=node('div','','rl-product-copy');const title=node('h3');const titleLink=node('a',p.title);titleLink.href=p.tptUrl;titleLink.target='_blank';titleLink.rel='noopener noreferrer';title.append(titleLink);
    const meta=node('p',yearLabel(p.year,p.market)+' · '+formatLabel(formatOf(p)),'rl-product-meta');
    const buy=node('a',p.free ? 'Free sample on TpT ↗' : 'View price on TpT ↗','rl-product-link');buy.href=p.tptUrl;buy.target='_blank';buy.rel='noopener noreferrer';
    copy.append(meta,title,buy);a.append(link,copy);return a;
  }
  function render(focus=false) {
    root.replaceChildren();
    const crumbs=node('nav','','rl-breadcrumbs');crumbs.setAttribute('aria-label','Resource folders');const list=node('ol');crumbs.append(list);
    function crumb(text,next,last=false){const li=node('li');if(last){const span=node('span',text);span.setAttribute('aria-current','page');li.append(span);}else li.append(action(text,next,''));list.append(li);}
    crumb('Library',{market:'',year:'',subject:'',format:'',query:''},!state.market);
    if(state.market)crumb(marketLabel(state.market),{year:'',subject:'',format:'',query:''},state.year==='');
    if(state.market && state.year!=='')crumb(yearLabel(state.year,state.market),{subject:'',format:'',query:''},!state.subject);
    if(state.subject)crumb(subjectLabel(state.subject),{format:'',query:''},!state.format);
    if(state.market && state.year!=='' && state.subject && state.format)crumb(formatLabel(state.format),{},true);
    root.append(crumbs);
    let stage=!state.market?'market':state.year===''?'year':!state.subject?'subject':!state.format?'format':'results';
    if((state.query || state.format==='all') && state.market)stage='results';
    const scoped=filterProducts(products,{...state,query:'',format:stage==='results' || state.format===defaultFormat ? state.format:''});
    const headingText=stage==='market'?'Choose your curriculum':stage==='year'?'Choose a '+(state.market==='us'?'grade':'year'):stage==='subject'?'Choose a subject':stage==='format'?'Choose a resource type':state.query?'Search results':formatLabel(state.format);
    const heading=node('h2',headingText,'rl-heading');heading.tabIndex=-1;
    const sub=node('p',stage==='market'?'Start with the curriculum your learner follows.':stage==='year'?(state.market==='us'?'US resources use US grade labels.':'Australian resources use Foundation and year labels.'):'Open a folder to narrow your choice.','rl-helper');
    if(stage==='results')sub.textContent='Preview the resource and check the current price on Teachers Pay Teachers.';
    root.append(heading,sub);
    if(state.market){const form=node('form','','rl-search');form.setAttribute('role','search');const label=node('label','Search this folder');label.htmlFor='rl-query';const row=node('div');const input=node('input');input.id='rl-query';input.type='search';input.placeholder='Topic, title or curriculum code';input.maxLength=160;input.value=state.query;const submit=node('button','Search');submit.type='submit';row.append(input,submit);form.append(label,row);form.addEventListener('submit',e=>{e.preventDefault();go({query:input.value.trim()});});root.append(form);}
    if(stage==='market'){
      const grid=node('div','','rl-folders rl-markets');
      grid.append(folder('Australia','Australian Curriculum · Foundation & Years',products.filter(p=>p.market==='au' && (!defaultFormat || formatOf(p)===defaultFormat)).length,{market:'au',year:'',subject:'',format:defaultFormat,query:''},'AU'),folder('United States','US resources · Kindergarten & Grades',products.filter(p=>p.market==='us' && (!defaultFormat || formatOf(p)===defaultFormat)).length,{market:'us',year:'',subject:'',format:defaultFormat,query:''},'US'));root.append(grid);
    } else if(stage==='year'){
      const grid=node('div','','rl-folders');const years=[...new Set(scoped.map(p=>String(p.year)))].sort((a,b)=>Number(a)-Number(b));
      for(const year of years){const rows=scoped.filter(p=>String(p.year)===year);grid.append(folder(yearLabel(year,state.market),'Browse subjects',rows.length,{year,subject:'',format:state.format || defaultFormat,query:''}));}root.append(grid);
    } else if(stage==='subject'){
      const grid=node('div','','rl-folders');for(const subject of ['maths','english','science']){const rows=scoped.filter(p=>p.subject===subject);if(rows.length)grid.append(folder(subjectLabel(subject),state.format==='slides' && defaultFormat==='slides' ? 'Teaching slides' : 'Worksheets, slides & bundles',rows.length,{subject,query:''}));}root.append(grid);
    } else if(stage==='format'){
      const grid=node('div','','rl-folders');for(const format of ['worksheets','slides','bundle']){const rows=scoped.filter(p=>formatOf(p)===format);if(rows.length)grid.append(folder(formatLabel(format),format==='worksheets'?'Paper practice & answer keys':format==='slides'?'Visual teaching resources':'Resources sold together',rows.length,{format,query:''}));}root.append(grid);
    } else {
      const rows=filterProducts(products,state).sort((a,b)=>a.title.localeCompare(b.title));const pages=Math.max(1,Math.ceil(rows.length/24));page=Math.max(1,Math.min(page,pages));
      const status=node('p',rows.length+' '+(rows.length===1?'resource':'resources')+(pages>1?' · Page '+page+' of '+pages:''),'rl-status');status.setAttribute('role','status');root.append(status);
      if(!rows.length){const empty=node('div','','rl-empty');empty.append(node('h3','No matching resources'),node('p','Try a shorter topic or curriculum code.'),action('Clear search',{query:''}));root.append(empty);}else{const grid=node('div','','rl-products');for(const p of rows.slice((page-1)*24,page*24))grid.append(card(p));root.append(grid);}
      if(pages>1){const nav=node('nav','','rl-pagination');nav.setAttribute('aria-label','Resource pages');for(const [label,delta] of [['Previous',-1],['Next',1]]){const b=node('button',label);b.type='button';b.disabled=delta<0?page===1:page===pages;b.addEventListener('click',()=>{page+=delta;render(true);});nav.append(b);}root.append(nav);}
    }
    if(state.market){const foot=node('div','','rl-folder-footer');
      const back=stage==='year'?{market:'',year:'',subject:'',format:'',query:''}:stage==='subject'?{year:'',subject:'',query:''}:stage==='format'?{subject:'',format:'',query:''}:state.query?{query:''}:{format:'',query:''};
      foot.append(action('← Back to folders',back,'rl-back'));
      if(stage!=='results')foot.append(action('View all '+scoped.length+' resources in this folder',{format:'all',query:''},'rl-text-link'));
      if(stage==='results' && state.subject)foot.append(action('Choose another resource type',{format:'',query:''},'rl-text-link'));
      root.append(foot);
    }
    if(focus)heading.focus();
  }
  window.addEventListener('popstate',()=>{readState();page=1;render(true);});
  fetch('/data/print-and-go-products.json?v=20261103-library',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(rows=>{products=uniqueProducts(rows);render();}).catch(()=>{const message=node('p','The folder browser could not load. You can still open the resource folders below.','rl-error');root.prepend(message);});
}());
