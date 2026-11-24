const {productSeoTitle} = require('./lib/product-seo-title.cjs');
// Render catalogue products as crawlable HTML; run after catalogue edits.
const fs = require('node:fs');
const path = require('node:path');
const { preserveProductGuideLinks } = require('./lib/product-guide-links.cjs');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(root,p)), {recursive:true}); fs.writeFileSync(path.join(root,p),s); };
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = v => JSON.stringify(v).replace(/</g, '\\u003c');
const products = JSON.parse(read('data/print-and-go-products.json'));
const template = read('product.html').replace(/<script src="\/assets\/product-detail\.js[^>]*><\/script>/,'');
const cards=[];
for (const p of products.filter(p=>p.available && p.url.startsWith('/products/'))) {
  if (!p.url.startsWith('/')) p.url = `/products/${p.id}/`;
  const url = 'https://skillrhub.com'+p.url;
  const image = p.image.startsWith('https://') ? p.image : 'https://skillrhub.com'+p.image;
  const title = productSeoTitle(p);
  const description = p.metaDescription || p.description;
  const structured = {'@context':'https://schema.org','@graph':[
    {'@type':'LearningResource','@id':url+'#resource',name:p.title,description:p.description,image:[image],url,identifier:p.id,publisher:{'@type':'Organization',name:'SkillrHub'},sameAs:p.tptUrl,isAccessibleForFree:!!p.free,inLanguage:p.market==='us'?'en-US':'en-AU',educationalLevel:p.yearLabel,educationalAlignment:p.curriculumCodes.map(code=>({'@type':'AlignmentObject',alignmentType:'teaches',educationalFramework:p.market==='us'?'Common Core State Standards for Mathematics':'Australian Curriculum v9.0',targetName:code}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://skillrhub.com/'},{'@type':'ListItem',position:2,name:'Products',item:'https://skillrhub.com/products/'},{'@type':'ListItem',position:3,name:p.title,item:url}]}
  ]};
  const metadata = `<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${json(structured)}</script>`;
  const includes=p.includes?.length ? `<h2>What’s included</h2><ul>${p.includes.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>` : '';
  const planning=p.curriculumPlanningNote ? `<section class="curriculum-planning" aria-label="Australian curriculum planning"><h2>Australian curriculum planning</h2><p>${esc(p.curriculumPlanningNote)}</p></section>` : '';
  const detail=`<section aria-label="Product details"><div class="product-detail"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" style="width:100%;height:auto"><div><p class="eyebrow">${esc(p.yearLabel)} · ${esc(p.subjectLabel)}</p><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p><p class="small">${p.market==='us'?'US Common Core':'Australian Curriculum'}: ${esc(p.curriculumCodes.join(' · '))}</p>${planning}${includes}<a class="button" href="${esc(p.tptUrl)}" target="_blank" rel="noopener noreferrer">${p.free?'View free sample on TpT':'View price on TpT'}</a><p class="small">Preview, checkout and file delivery are available on Teachers Pay Teachers.</p></div></div></section>`;
  let html=template.replace('content="noindex,follow"', 'content="index,follow"').replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(description)}">`).replace('</head>',metadata+'</head>').replace(/<span aria-current="page" data-crumb>.*?<\/span>/,`<span aria-current="page">${esc(p.title)}</span>`).replace(/<section data-product-detail[\s\S]*?<\/section>/,detail);
  const productFile = `${p.url.replace(/^\//,'')}index.html`;
  if (fs.existsSync(path.join(root, productFile))) {
    html = preserveProductGuideLinks(read(productFile), html);
  }
  write(productFile, html);
  cards.push(`<article class="product-card"><a href="${p.url}"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy"><h2>${esc(p.title)}</h2></a><p>${esc(description)}</p><a href="${p.url}">View pack details</a> · <a href="${esc(p.tptUrl)}">View price on TpT</a></article>`);
}
write('data/print-and-go-products.json',JSON.stringify(products,null,2)+'\n');
let catalogue=read('print-and-go.html');
const fallback=`<div data-browse><!-- PRODUCT-CARDS:START --><div class="product-grid">${cards.join('')}</div><!-- PRODUCT-CARDS:END --></div>`;
catalogue=catalogue.replace(/<div data-browse(?: hidden)?>(?:<!-- PRODUCT-CARDS:START -->[\s\S]*?<!-- PRODUCT-CARDS:END -->)?<\/div>/,fallback);
catalogue=catalogue.replace(/(<summary>Browse SkillrHub TpT downloads<\/summary>)<ul>[\s\S]*?<\/ul>/, (_, heading) => heading+'<ul>'+products.filter(p=>p.available).map(p=>`<li><a href="${esc(p.tptUrl)}">${esc(p.title)}</a></li>`).join('')+'</ul>');
catalogue=catalogue.replace(/(<section[^>]*id="year-1-maths-worksheet-bundles"[\s\S]*?<\/section>)/, section => section.replace(/(?:Each bundle saves 10%|The full-year bundle saves 20%; strand and term bundles save 10%)/g, 'View the current bundle price on TpT').replace(/<article class="product-card">[\s\S]*?<\/article>/g, card => {
  const pid=card.match(/-(\d+)"/); const p=pid && products.find(p=>p.tptUrl.endsWith('-'+pid[1]));
  if(!p)return card;
  return `<article class="product-card"><a href="${esc(p.url)}"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy"><h3>${esc(p.title)}</h3></a><p>${esc(p.description)}</p><p class="small">${esc(p.curriculumCodes.join(' · '))}</p><a class="button" href="${esc(p.tptUrl)}" target="_blank" rel="noopener noreferrer">View price on TpT</a></article>`;
}));
catalogue=catalogue.replace(/print-and-go-search\.js\?v=[^" ]+/g,'print-and-go-search.js?v=20261008-sync');
write('print-and-go.html',catalogue);
let sitemap=read('sitemap-site.xml');
const date=new Date().toISOString().slice(0,10);
for (const p of products.filter(p=>p.available && p.url.startsWith('/products/'))) {
 const url='https://skillrhub.com'+p.url;
 if(!sitemap.includes(`<loc>${url}</loc>`))sitemap=sitemap.replace('</urlset>',`  <url><loc>${url}</loc><lastmod>${date}</lastmod></url>\n</urlset>`);
}
write('sitemap-site.xml',sitemap);
console.log(`Rendered ${products.filter(p=>p.available).length} product pages, catalogue cards and sitemap entries.`);

// Preserve verified contents and on-site previews after catalogue rebuilds.
require('node:child_process').execFileSync('python3', [path.join(__dirname, 'repair_priority_seo.py')], {stdio: 'inherit'});

