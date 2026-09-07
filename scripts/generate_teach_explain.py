"""Build only the optional slide shop pages; never rebuild curriculum content."""
import json
from html import escape
from pathlib import Path
from urllib.parse import quote, urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE = '/teach-and-explain'
HOME = BASE + '.html'
EMAIL = 'skillrhublearning@gmail.com'

def e(value):
    return escape(str(value), quote=True)

def sample(title='teaching slides'):
    subject = quote('Free sample request: ' + title)
    body = quote('Hello SkillrHub,\n\nI follow SkillrHub on TPT and would like to request a free sample before buying.\n\nYear level:\nSubject:\nTopic or curriculum code:\nResource: ' + title + '\n\nThank you.')
    return f'''<section class="support sample-request" aria-label="Request a free sample"><h2>Request a free sample</h2><p>Teachers can request a free sample before buying. Follow SkillrHub on TPT, then email us with the year, subject and topic or curriculum code.</p><p>After trying the sample, we welcome your honest feedback. A TPT review is optional, where available, and does not need to be positive.</p><a class="button" href="mailto:{EMAIL}?subject={subject}&amp;body={body}">Request a free sample</a><p class="small">Email: <a href="mailto:{EMAIL}">{EMAIL}</a></p></section>'''

def page(path, title, description, crumbs, content, scope=''):
    schema = {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':'https://skillrhub.com'+url} for i,(name,url) in enumerate(crumbs)]}
    breadcrumb = ''.join(f'<li><a href="{e(url)}">{e(name)}</a></li>' if i < len(crumbs)-1 else f'<li><span aria-current="page">{e(name)}</span></li>' for i,(name,url) in enumerate(crumbs))
    html = f'''<!DOCTYPE html>
<html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)} | SkillrHub</title><meta name="description" content="{e(description)}"><link rel="canonical" href="https://skillrhub.com{e(path)}"><meta name="robots" content="index,follow">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:url" content="https://skillrhub.com{e(path)}"><meta property="og:type" content="website">
<link rel="icon" href="/icons/skillrhub-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/print-and-go.css?v=2"><link rel="stylesheet" href="/assets/teach-and-explain.css?v=1">
<script type="application/ld+json">{json.dumps(schema).replace('<', chr(92)+'u003c')}</script><script src="/assets/print-and-go-search.js?v=2" defer></script><script src="/assets/resource-links.js?v=1" defer></script>
</head><body data-resource-type="teaching-slides" {scope}><header><nav class="top-nav" aria-label="Main navigation"><a class="brand" href="/"><img src="/icons/skillrhub-mark.svg" width="30" height="30" alt="">SkillrHub</a><div class="nav-links"><a href="/">Learn</a><a href="/print-and-go.html">Print &amp; Go</a><a href="{HOME}" aria-current="page">Teach &amp; Explain</a></div></nav></header>
<main><nav class="breadcrumbs" aria-label="Breadcrumb"><ol>{breadcrumb}</ol></nav>{content}{sample(title) if 'product-detail' not in content else ''}<section class="support"><h2>Convenience that supports free learning</h2><p>Affordable purchases help our team keep creating useful learning resources. SkillrHub’s online practice remains free.</p><p><a href="/print-and-go.html">Browse Print &amp; Go packs</a> · <a href="/">Explore free learning</a></p></section></main><footer><a href="/">Free learning</a><a href="/print-and-go.html">Print &amp; Go</a><a href="{HOME}">Teach &amp; Explain</a><a href="/contact.html">Contact</a><a href="/privacy-policy.html">Privacy</a></footer></body></html>
'''
    dest = ROOT / path.lstrip('/')
    if path.endswith('/'): dest /= 'index.html'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html)
    return path

def search():
    return '''<section class="catalogue-search" data-search hidden aria-label="Search teaching slides"><form role="search"><label for="print-search">Search teaching slides</label><div class="search-row"><input id="print-search" type="search" maxlength="200" placeholder="Search a topic or curriculum code" autocomplete="off"><button type="submit">Search</button></div></form><p class="small" role="status" aria-live="polite" data-search-status></p><div class="product-grid" data-search-results hidden></div><nav class="pagination" data-pagination hidden aria-label="Search results pages"><button type="button" data-previous>Previous</button><span data-page></span><button type="button" data-next>Next</button></nav></section>'''

def card(p):
    label = 'View free sample' if p.get('resourceType') == 'teaching-sample' else 'View slide pack'
    price = 'Free sample' if p.get('resourceType') == 'teaching-sample' else f'US${float(p["price"]):.2f}'
    buy_url = p.get('paidTptUrl') if p.get('resourceType') == 'teaching-sample' else p.get('tptUrl')
    buy = (f' <a class="button" href="{e(buy_url)}" target="_blank" rel="noopener noreferrer">Buy slides — US$6.99</a>' if buy_url else '')
    bundle = (f' <a class="button" href="{e(p["bundleTptUrl"])}" target="_blank" rel="noopener noreferrer">Bundle — US${float(p["bundlePrice"]):.2f} (save 20%)</a>' if p.get('bundleTptUrl') else '')
    return f'<article class="product-card"><a href="{e(p["url"])}"><img src="{e(p["image"])}" alt="{e(p["title"])} preview" loading="lazy"><h2>{e(p["title"])}</h2></a><p>{e(p["description"])}</p><p class="small">{e(" · ".join(p["curriculumCodes"]))}</p><p class="price">{e(price)}</p><a href="{e(p["url"])}">{e(label)}</a>' + buy + bundle + '</article>'
def build():
    products = json.loads((ROOT/'data/print-and-go-products.json').read_text())
    slides = [p for p in products if p.get('resourceType') in ('teaching-slides','teaching-sample') and p.get('available')]
    for p in slides:
        required = ('title','year','yearLabel','subject','subjectLabel','description','url','image','price','currency','curriculumCodes','includes','learningGoals','format')
        if p.get('resourceType') == 'teaching-sample':
            required = required + ('sampleUrl',)
        else:
            required = required + ('tptUrl',)
        if any(key not in p for key in required): raise ValueError('Incomplete published slide product')
        if not isinstance(p['year'], int) or not 0 <= p['year'] <= 10 or p['subject'] not in ('maths','science','english'): raise ValueError('Invalid year or subject')
        if p['currency']!='USD' or float(p['price'])<0: raise ValueError('Invalid price')
        if not p['url'].startswith(BASE+'/') or '..' in p['url'] or not p['url'].endswith('/'): raise ValueError('Invalid product route')
        if p.get('tptUrl') and urlparse(p['tptUrl']).hostname not in ('www.teacherspayteachers.com','teacherspayteachers.com'): raise ValueError('Use a verified TPT listing')
        if not p['image'].startswith('/assets/') or '..' in p['image'] or not (ROOT/p['image'].lstrip('/')).is_file(): raise ValueError('Missing preview asset')
        if p.get('sampleUrl') and (not p['sampleUrl'].startswith(BASE+'/') or '..' in p['sampleUrl']): raise ValueError('Invalid sample URL')
        if p.get('samplePdf') and (not p['samplePdf'].startswith('/assets/samples/') or '..' in p['samplePdf'] or not (ROOT/p['samplePdf'].lstrip('/')).is_file()): raise ValueError('Missing sample PDF')
    crumbs = [('Home','/'),('Teach & Explain',HOME)]
    cards=[]
    for year in range(11):
        label='Foundation' if year==0 else f'Year {year}'
        group=[p for p in slides if p['year']==year]
        cards.append(f'<a class="category-card" href="{BASE}/year-{year}/"><h2>{label}</h2><span>Browse subjects</span></a>' if group else f'<div class="category-card unavailable" aria-disabled="true"><h2>{label}</h2><span>Coming soon</span></div>')
    empty='<p class="catalogue-empty">Teaching slide packs are being prepared. Published packs will appear here when they are ready to buy. You can email us to request a sample for a topic.</p>' if not slides else ''
    intro='''<section class="intro"><p class="eyebrow">FOR TEACHERS AND PARENTS</p><h1>Teach &amp; Explain</h1><p>Visual teaching slides for explaining tricky topics in class or at home. Browse by year, subject and topic.</p></section><div class="teaching-benefits"><section><h2>Teach in class</h2><p>Look for worked examples, guided practice and teaching notes to support your lessons.</p></section><section><h2>Explain at home</h2><p>Help your child work through a difficult idea one step at a time.</p></section></div>'''
    paths=[page(HOME,'Teach & Explain: Teaching Slides for Teachers and Parents','Browse optional SkillrHub teaching slides by year, subject and topic for classroom lessons and explanations at home. Request a free sample before buying.',crumbs,intro+empty+search()+'<section data-browse aria-label="Browse by year"><div class="category-grid">'+''.join(cards)+'</div></section>')]
    for year in sorted({p['year'] for p in slides}):
        year_products=[p for p in slides if p['year']==year]; yl=year_products[0]['yearLabel']; yp=f'{BASE}/year-{year}/'; yc=crumbs+[(yl,yp)]
        subjects=''.join(f'<a class="category-card" href="{yp}{s}/"><h2>{label}</h2><span>Browse topics</span></a>' if any(p['subject']==s for p in year_products) else f'<div class="category-card unavailable" aria-disabled="true"><h2>{label}</h2><span>Coming soon</span></div>' for s,label in [('maths','Maths'),('science','Science')])
        paths.append(page(yp,yl+' Teaching Slides','Browse '+yl+' slide packs for teachers and parents.',yc,f'<h1>{yl} teaching slides</h1>'+search()+'<section data-browse><div class="category-grid">'+subjects+'</div></section>',f'data-year="{year}"'))
        for subject in sorted({p['subject'] for p in year_products}):
            ps=[p for p in year_products if p['subject']==subject]; label=ps[0]['subjectLabel']; sp=yp+subject+'/'; sc=yc+[(label,sp)]
            paths.append(page(sp,yl+' '+label+' Teaching Slides','Choose a '+yl+' '+label+' topic to preview teaching slides.',sc,f'<h1>{yl} {label} teaching slides</h1>'+search()+'<section data-browse><div class="product-grid">'+''.join(card(p) for p in ps)+'</div></section>',f'data-year="{year}" data-subject="{subject}"'))
            for p in ps:
                if p.get('resourceType') == 'teaching-sample':
                    action = f'<p class="price">Free sample · Full 60-slide pack US$6.99</p><a class="button" href="{e(p["sampleUrl"])}">View free preview</a> <a class="button" href="{e(p.get("samplePdf", p["sampleUrl"]))}">Download free preview PDF</a>'+ (f' <a class="button" href="{e(p["paidTptUrl"])}" target="_blank" rel="noopener noreferrer">Buy full pack on TPT — US$6.99</a>' if p.get('paidTptUrl') else '') + (f' <a class="button" href="{e(p["tptUrl"])}" target="_blank" rel="noopener noreferrer">Get free sample on TPT</a>' if p.get('tptUrl') else '') + '<p>The full 60-slide teaching pack is available on TPT for US$6.99. The matching worksheet pack is US$2.99.</p>'
                else:
                    action = f'<p class="price">US${float(p["price"]):.2f}</p><p>Preview available on TPT.</p><a class="button" href="{e(p["tptUrl"])}" target="_blank" rel="noopener noreferrer">View preview and buy on TPT</a>' + (f' <a class="button" href="{e(p["bundleTptUrl"])}" target="_blank" rel="noopener noreferrer">Bundle — US${float(p["bundlePrice"]):.2f} (save 20%)</a>' if p.get('bundleTptUrl') else '')
                details=f'<section class="product-detail"><img src="{e(p["image"])}" alt="{e(p["title"])} preview"><div><h1>{e(p["title"])}</h1><p>{e(p["description"])}</p><p>{e(" · ".join(p["curriculumCodes"]))}</p>'+action+'<h2>What is included</h2><ul>'+''.join(f'<li>{e(x)}</li>' for x in p['includes'])+f'</ul><p>Format: {e(p["format"])}</p><h2>Learning goals</h2><ul>'+''.join(f'<li>{e(x)}</li>' for x in p['learningGoals'])+'</ul>'+('<p>Use the sample to preview the resource before buying the full pack.</p>' if p.get('resourceType') == 'teaching-sample' else '<p>Read the TPT listing for the classroom-use licence and full purchase details.</p>')+'</div></section>'
                paths.append(page(p['url'],p['title'],p['description'],sc+[(p['title'],p['url'])],details))
    print('Generated '+str(len(paths))+' Teach & Explain pages; '+str(len(slides))+' published slide packs.')
    return paths

if __name__=='__main__': build()
