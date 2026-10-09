// Render catalogue products as crawlable HTML; run after catalogue edits.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(root,p)), {recursive:true}); fs.writeFileSync(path.join(root,p),s); };
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = v => JSON.stringify(v).replace(/</g, '\\u003c');
const products = JSON.parse(read('data/print-and-go-products.json'));
const template = read('product.html').replace(/<script src="\/assets\/product-detail\.js[^>]*><\/script>/,'');
const cards=[];
for (const p of products.filter(p=>p.available)) {
  if (!p.url.startsWith('/')) p.url = `/products/${p.id}/`;
  const url = 'https://skillrhub.com'+p.url;
  const image = p.image.startsWith('https://') ? p.image : 'https://skillrhub.com'+p.image;
  const price = p.price === undefined ? 'See current price on TPT' : Number(p.price)===0 ? 'FREE' : 'US$'+Number(p.price).toFixed(2);
  const title = p.title+' | SkillrHub';
  const description = p.description;
  const structured = {'@context':'https://schema.org','@graph':[
    {'@type':'Product','@id':url+'#product',name:p.title,description,image:[image],url,sku:p.id,brand:{'@type':'Brand',name:'SkillrHub'},offers:{'@type':'Offer',url:p.tptUrl,price:p.price,priceCurrency:p.currency,availability:'https://schema.org/InStock',seller:{'@type':'Organization',name:'Skillrhub Learning'}}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://skillrhub.com/'},{'@type':'ListItem',position:2,name:'Products',item:'https://skillrhub.com/print-and-go.html'},{'@type':'ListItem',position:3,name:p.title,item:url}]}
  ]};
  const metadata = `<link rel="canonical" href="${url}"><meta property="og:type" content="product"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${json(structured)}</script>`;
  const includes=p.includes?.length ? `<h2>What’s included</h2><ul>${p.includes.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>` : '';
  const planning=p.curriculumPlanningNote ? `<section class="curriculum-planning" aria-label="Australian curriculum planning"><h2>Australian curriculum planning</h2><p>${esc(p.curriculumPlanningNote)}</p></section>` : '';
  const savings=Number(p.listPrice)>Number(p.price) ? `<p>Separately: US$${Number(p.listPrice).toFixed(2)} · Save US$${(Number(p.listPrice)-Number(p.price)).toFixed(2)}</p>` : '';
  const detail=`<section aria-label="Product details"><div class="product-detail"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" style="width:100%;height:auto"><div><p class="eyebrow">${esc(p.yearLabel)} · ${esc(p.subjectLabel)}</p><h1>${esc(p.title)}</h1><p>${esc(description)}</p><p class="small">Australian Curriculum: ${esc(p.curriculumCodes.join(' · '))}</p>${planning}<p class="price">${price}</p>${savings}${includes}<a class="button" href="${esc(p.tptUrl)}" target="_blank" rel="noopener noreferrer">${Number(p.price)===0?'Download free on TPT':'Purchase on TPT'}</a><p class="small">Preview, checkout and file delivery are available on Teachers Pay Teachers.</p></div></div></section>`;
  let html=template.replace('content="noindex,follow"', 'content="index,follow"').replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(description)}">`).replace('</head>',metadata+'</head>').replace(/<span aria-current="page" data-crumb>.*?<\/span>/,`<span aria-current="page">${esc(p.title)}</span>`).replace(/<section data-product-detail[\s\S]*?<\/section>/,detail);
  write(`${p.url.replace(/^\//,'')}index.html`,html);
  cards.push(`<article class="product-card"><a href="${p.url}"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy"><h2>${esc(p.title)}</h2></a><p>${esc(description)}</p><p class="price">${price}</p><a href="${p.url}">View pack details</a></article>`);
}
write('data/print-and-go-products.json',JSON.stringify(products,null,2)+'\n');
let catalogue=read('print-and-go.html');
const fallback=`<div data-browse><!-- PRODUCT-CARDS:START --><div class="product-grid">${cards.join('')}</div><!-- PRODUCT-CARDS:END --></div>`;
catalogue=catalogue.replace(/<div data-browse(?: hidden)?>(?:<!-- PRODUCT-CARDS:START -->[\s\S]*?<!-- PRODUCT-CARDS:END -->)?<\/div>/,fallback);
catalogue=catalogue.replace(/(<summary>Browse SkillrHub TpT downloads<\/summary>)<ul>[\s\S]*?<\/ul>/, (_, heading) => heading+'<ul>'+products.filter(p=>p.available).map(p=>`<li><a href="${esc(p.tptUrl)}">${esc(p.title)}</a></li>`).join('')+'</ul>');
catalogue=catalogue.replace(/(<section[^>]*id="year-1-maths-worksheet-bundles"[\s\S]*?<\/section>)/, section => section.replace('Each bundle saves 10%', 'The full-year bundle saves 20%; strand and term bundles save 10%').replace(/<article class="product-card">[\s\S]*?<\/article>/g, card => {
  const pid=card.match(/-(\d+)"/); const p=pid && products.find(p=>p.tptUrl.endsWith('-'+pid[1]));
  if(!p)return card;
  const saving=p.id.includes('full-year')?20:10;
  return `<article class="product-card"><a href="${esc(p.url)}"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy"><h3>${esc(p.title)}</h3></a><p>${esc(p.description)}</p><p class="small">${esc(p.curriculumCodes.join(' · '))}</p><p class="price">US$${Number(p.price).toFixed(2)} <span class="small">(save ${saving}%)</span></p><a class="button" href="${esc(p.tptUrl)}" target="_blank" rel="noopener noreferrer">View worksheet bundle on TpT</a></article>`;
}));
catalogue=catalogue.replace(/print-and-go-search\.js\?v=[^" ]+/g,'print-and-go-search.js?v=20261008-sync');
write('print-and-go.html',catalogue);
let sitemap=read('sitemap-site.xml');
const date=new Date().toISOString().slice(0,10);
for (const p of products.filter(p=>p.available)) {
 const url='https://skillrhub.com'+p.url;
 if(!sitemap.includes(`<loc>${url}</loc>`))sitemap=sitemap.replace('</urlset>',`  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>\n</urlset>`);
}
write('sitemap-site.xml',sitemap);
console.log(`Rendered ${products.filter(p=>p.available).length} product pages, catalogue cards and sitemap entries.`);
