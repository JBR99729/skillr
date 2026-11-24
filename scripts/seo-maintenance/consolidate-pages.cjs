const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '../..');
const ORIGIN = 'https://skillrhub.com';
const GUIDE = '/blogs/free-worksheets-for-indian-students-class-1-to-5.html';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read = relative => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const write = (relative, value) => { if (read(relative) !== value) fs.writeFileSync(path.join(ROOT, relative), value); };
const products = {
  '/products/year-3-time-bundle/': '/products/tpt-17593227/',
  '/products/year-3-multiplication-division-bundle/': '/products/tpt-17594338/',
  '/products/year-3-fractions-bundle/': '/products/tpt-17594471/'
};
const articles = Object.fromEntries(Array.from({length:5}, (_, i) => [`/blogs/free-class-${i+1}-maths-english-science-worksheets-india.html`, `${GUIDE}#class-${i+1}`]));
const aliases = {...products, ...articles};
const fileFor = route => route.split('#')[0].replace(/^\//, '') + (route.split('#')[0].endsWith('/') ? 'index.html' : '');
function redirect(target, label) {
  const canonical = ORIGIN + target.split('#')[0];
  return `<!doctype html>\n<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(label)} | SkillrHub</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${esc(canonical)}"><meta http-equiv="refresh" content="0; url=${esc(target)}"><link rel="stylesheet" href="/style.css"></head><body><main class="container"><h1>${esc(label)}</h1><p>This resource has moved to its current page.</p><p><a href="${esc(target)}">Open the resource</a></p><p><a href="/">SkillrHub home</a></p></main><script>const target=new URL(${JSON.stringify(target)},location.origin);if(location.search)target.search=location.search;if(location.hash&&!target.hash)target.hash=location.hash;location.replace(target.href);</script></body></html>\n`;
}
function topic(code) {
  const subject = code.startsWith('AC9M') ? 'maths' : code.startsWith('AC9E') ? 'english' : 'science';
  const year = code.match(/^AC9[EMS](\d+)/)[1];
  const dir = `year${year}/${subject}`;
  for (const slug of fs.readdirSync(path.join(ROOT, dir)).filter(s => s.startsWith(code.toLowerCase()+'-')).sort()) {
    const relative = `${dir}/${slug}/index.html`;
    if (!fs.existsSync(path.join(ROOT, relative))) continue;
    const html = read(relative), url = '/'+relative.replace(/index.html$/, '');
    if (/name=["']robots["'][^>]*noindex/i.test(html) || !html.includes(`rel="canonical" href="${ORIGIN}${url}"`)) continue;
    return url;
  }
  throw new Error(`Missing canonical topic ${code}`);
}
function updateIndiaPages() {
  const relative = fileFor(GUIDE);
  let html = read(relative);
  const levels = [
    {n:1, focus:'Counting, simple sentences and living things', intro:'Start with the skill your child is practising at school. Use objects for counting, talk through a simple sentence, or observe the needs of a familiar plant or animal before choosing a written task.', links:[['AC9M1N01','Numbers to 120'],['AC9E1LA06','Simple sentences'],['AC9S1U01','Needs of plants and animals']], worksheet:['/quiz/year-1/math/ac9m1n01/worksheet/','Numbers to 120 worksheet']},
    {n:2, focus:'Place value, word groups and asking questions', intro:'For number work, compare hundreds, tens and ones. For English, choose the noun or verb skill that matches the current lesson. For science, distinguish a question from a prediction before attempting an investigation.', links:[['AC9M2N01','Numbers to 1000 and place value'],['AC9E2LA07','Noun groups and verb groups'],['AC9S2I01','Scientific questions and predictions']], worksheet:['/quiz/year-2/math/ac9m2n01/worksheet/','Numbers to 1000 worksheet']},
    {n:3, focus:'Multiplication, comprehension and heat', intro:'Choose one topic for the session rather than working through a whole year catalogue. A multiplication explanation, a listening or viewing task, and a practical heat observation are separate starting points; select the one relevant to the schoolwork.', links:[['AC9M3A03','Multiplication facts for 3, 4, 5 and 10'],['AC9E3LY05','Listening and viewing comprehension'],['AC9S3U03','Heat energy and temperature change']]},
    {n:4, focus:'Decimals, dialogue and the water cycle', intro:'Look for the specific difficulty before selecting a page: decimal place value, punctuation in dialogue, or the processes of the water cycle. Read the matching explanation and use its examples before moving to independent work.', links:[['AC9M4N01','Tenths and hundredths'],['AC9E4LA12','Punctuating dialogue'],['AC9S4U02','Water sources and the water cycle']], worksheet:['/quiz/year-4/english/ac9e4la12/worksheet/','Punctuating dialogue worksheet']},
    {n:5, focus:'Decimal place value, comprehension and light', intro:'Use the learner’s own textbook or teacher’s task to decide the topic and level. These links separate decimal number work, English comprehension and scientific ideas about light so families can choose targeted revision.', links:[['AC9M5N01','Ordering decimals and place value'],['AC9E5LY05','Comprehension strategies and evaluation'],['AC9S5U03','Light, reflection and refraction']], worksheet:['/quiz/year-5/science/ac9s5u03/worksheet/','Light practice sheets']}
  ];
  const sections = levels.map(level => `<section id="class-${level.n}"><h2>Class ${level.n}: ${esc(level.focus)}</h2><p>${esc(level.intro)}</p><ul>${level.links.map(([code,label])=>`<li><a href="${topic(code)}">${esc(label)}</a> <small>Australian Curriculum ${code}</small></li>`).join('')}</ul>${level.worksheet ? `<p><a href="${level.worksheet[0]}">${esc(level.worksheet[1])}</a></p>` : ''}<p><a href="/learn/?year=${level.n}&amp;subject=maths">Browse Australian Year ${level.n} Maths</a> · <a href="/learn/?year=${level.n}&amp;subject=english">English</a> · <a href="/learn/?year=${level.n}&amp;subject=science">Science</a></p></section>`).join('\n');
  const body = `<article data-india-guide="consolidated"><header><p class="eyebrow">Supplementary learning · Maths, English and Science</p><h1>Free worksheets for Indian students: Class 1 to Class 5</h1><p>Find a useful SkillrHub topic or worksheet by the skill your child needs to practise. SkillrHub follows the Australian Curriculum; these resources can support Indian learners where the topic and difficulty match their schoolwork.</p></header><nav aria-label="Class sections"><p>${levels.map(x=>`<a href="#class-${x.n}">Class ${x.n}</a>`).join(' · ')}</p></nav><section><h2>Choose by skill, then check the level</h2><p>Indian Class numbers and Australian Year levels are not a syllabus equivalence. The class sections below are browsing suggestions. Check the linked explanation against your child’s textbook, teacher’s instructions and current understanding before using a worksheet.</p><ol><li>Choose one skill from the sections below.</li><li>Read the topic explanation and work through an example together.</li><li>Open a published worksheet from the topic page, or use one of the direct worksheet links below.</li><li>Check the responses and revisit the explanation for anything unclear.</li></ol></section>${sections}<section><h2>Free resources and optional packs</h2><p>Public topic guides and published practice-sheet questions can be read without a learner login. Generating a separate worksheet in the app requires a free account. Optional printable packs are sold separately on Teachers Pay Teachers; check the listing’s preview, contents and current price before purchasing.</p><p><a href="/worksheets/">Browse website worksheets</a> · <a href="/products/">Browse optional printable packs</a> · <a href="/blogs/free-maths-english-science-worksheets-for-indian-students-k-10.html">Support for other class levels</a></p></section><section><h2>Curriculum scope</h2><p>SkillrHub is an independent, Australia-first learning resource. These links do not claim complete CBSE, ICSE, NCERT or Indian state-board coverage, or endorsement by a curriculum authority. Use your school’s programme to decide what to teach and these resources for suitable supplementary practice.</p></section></article>`;
  html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i, `<main>${body}</main>`);
  const description = 'Find Class 1–5 supplementary Maths, English and Science topic guides and worksheets. Choose by skill and check the Australian resource level against schoolwork.';
  html = html.replace(/(<meta\b[^>]*(?:name="description"|property="og:description")[^>]*content=")[^"]*/g, (_, prefix)=>prefix+esc(description));
  html = html.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (block, a, source, b) => {
    const value = JSON.parse(source); if (value['@type'] !== 'BlogPosting') return block;
    value.dateModified = '2026-11-07'; value.description = description; return a+JSON.stringify(value)+b;
  });
  write(relative, html);
  for (const [old, target] of Object.entries(articles)) write(fileFor(old), redirect(target, `Class ${old.match(/class-(\d)/)[1]} worksheet guide`));
}
function updateProducts() {
  const data = JSON.parse(read('data/print-and-go-products.json'));
  for (const [old, target] of Object.entries(products)) {
    const oldHtml = read(fileFor(old));
    let html = read(fileFor(target));
    const id = target.split('/').filter(Boolean).at(-1);
    const item = data.find(x=>x.id === id);
    if (!item || item.url !== target) throw new Error(`Missing catalogue product ${target}`);
    const inclusion = oldHtml.match(/<h2>What.s included<\/h2>(<ul>[\s\S]*?<\/ul>)/i)?.[1];
    if (inclusion && !html.includes('<!-- skillr-product-inclusions:start -->') && !/<h2>What.s included<\/h2>/i.test(html)) {
      html = html.replace('</main>', `<!-- skillr-product-inclusions:start --><section><h2>What’s included</h2>${inclusion}</section><!-- skillr-product-inclusions:end --></main>`);
      if (!item.includes?.length) item.includes = [...inclusion.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x=>x[1].replace(/&amp;/g,'&').replace(/&#39;/g,"'"));
    }
    const previousCodes = oldHtml.match(/Australian Curriculum:\s*([^<]+)/)?.[1]?.match(/AC9[A-Z0-9]+/g) || [];
    item.curriculumCodes = [...new Set([...(item.curriculumCodes || []), ...previousCodes])];
    html = html.replace(/(Australian Curriculum:\s*)[^<]*/, (_, prefix)=>prefix+item.curriculumCodes.join(' · '));
    write(fileFor(target), html);
    write(fileFor(old), redirect(target, item.title));
  }
  write('data/print-and-go-products.json', JSON.stringify(data,null,2)+'\n');
}
function replaceLinks() {
  let count = 0;
  function walk(dir) {
    for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
      if (['.git','node_modules'].includes(e.name)) continue;
      const file = path.join(dir,e.name);
      if (e.isDirectory()) walk(file);
      else if (e.name.endsWith('.html')) {
        let html = fs.readFileSync(file,'utf8'), original = html;
        if (file === path.join(ROOT,'blogs/index.html')) {
          html = html.replace(/<article\b[^>]*>[\s\S]*?<\/article>/gi, block => Object.keys(articles).some(old=>block.includes(`href="${old}"`)) ? '' : block);
        }
        html = html.replace(/(<a\b[^>]*\bhref=)(["'])([^"']+)\2/gi, (all, prefix, quote, href) => {
          const local = href.startsWith(ORIGIN+'/') ? href.slice(ORIGIN.length) : href;
          const [base] = local.split(/[?#]/); const target = aliases[base];
          if (!target) return all;
          const tail = local.slice(base.length); return prefix+quote+esc(target+(target.includes('#') ? '' : tail))+quote;
        });
        if (html !== original) {fs.writeFileSync(file,html);count++;}
      }
    }
  }
  walk(ROOT); return count;
}
function updateWorksheetPortals() {
  for (const relative of require('./worksheet-portals.json')) {
    let html = read(relative);
    const code = relative.match(/ac9[a-z0-9]+/i)[0].toUpperCase();
    const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)[1];
    const app = `https://app.skillrhub.com/?worksheet=${code}`;
    html = html.replace(/<!-- skillr-static-worksheet:start -->[\s\S]*?<!-- skillr-static-worksheet:end -->/g,'');
    html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i, `<main class="quiz-app resource-sheet-shell" data-worksheet-portal="${code}"><section class="card start-card resource-sheet-header"><p class="eyebrow">${code} · Worksheet generation</p><h1>${title}</h1><p>Sign in to the app, choose your learner profile, then generate a five-question worksheet and a separate answer key. A free account is required; available formats depend on the topic.</p><p><a id="downloadPdfButton" class="button button-primary" href="${app}">Generate worksheet in the app</a></p><p><a href="${topic(code)}">Read the free topic guide</a></p></section></main>`);
    html = html.replace(/(<meta\b[^>]*name=["']robots["'][^>]*content=["'])[^"']*/, '$1noindex, follow');
    html = html.replace(/<script\b[^>]*id="skillr-static-worksheet-questions"[^>]*>[\s\S]*?<\/script>/g,'');
    html = html.replace(/<script\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/g,(block,src)=>/googletagmanager|pwa-register\.js|share-button\.js|adsbygoogle/.test(src) ? block : '');
    html = html.replace(/<script>window\.(?:quizConfig|skillrYear2EnglishBankConfig)=[\s\S]*?<\/script>/g,'');
    write(relative,html);
  }
}
function consolidate() { updateIndiaPages(); updateProducts(); updateWorksheetPortals(); console.log(`Consolidated 8 aliases and 9 native app portals; updated links in ${replaceLinks()} HTML pages.`); }
module.exports = { ROOT, ORIGIN, GUIDE, products, articles, aliases, fileFor, redirect, updateIndiaPages, consolidate };
if (require.main === module) consolidate();
