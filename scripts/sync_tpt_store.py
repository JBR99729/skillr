#!/usr/bin/env python3
"""Reconcile a complete observed TpT store without publishing prices or lessons.

Only catalogue records, product pages and their discovery surfaces are updated.
Existing article sections and product URLs survive; no topic page is rebuilt.
"""
import argparse
from collections import Counter
import html
import json
from pathlib import Path
import re
from urllib.parse import urlencode, urlsplit

from bs4 import BeautifulSoup
import sync_missing_tpt_products as folders

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://skillrhub.com'
AC = re.compile(r'\bAC9[EMS](?:F|\d{1,2})[A-Z]+\d{2}\b')
US = re.compile(r'\b(?:K|\d{1,2})\.[A-Z]{1,3}\.[A-Z]\.\d+[a-z]?\b')
PRICE_KEYS = {'price', 'listPrice', 'regularPrice', 'salePrice', 'originalPrice', 'discountPrice', 'bundlePrice', 'priceCurrency'}


def read(path): return json.loads(path.read_text())
def save(path, value): path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
def pid(p): return re.search(r'-(\d+)$', p['tptUrl'])[1]
def esc(value): return html.escape(str(value), quote=True)


def clean_copy(text):
    text = re.sub(r'\bSave\s+\d+(?:\.\d+)?%\s+compared with[^.!?]*(?:[.!?]|$)', '', text, flags=re.I)
    text = re.sub(r'\bSave\s+\d+(?:\.\d+)?%\s+(?:on|with)\s+', '', text, flags=re.I)
    text = re.sub(r'\s*\(save\s+\d+(?:\.\d+)?%\)', '', text, flags=re.I)
    sentences = re.split(r'(?<=[.!?])\s+', text)
    result = ' '.join(s for s in sentences if not (re.search(r'(?:US\s*\$|A\$|\$)\s*\d', s) and re.search(r'\b(?:save|price|cost|buy|purchase|separately|only)\b', s, re.I))).strip()
    return result[:1].upper() + result[1:]


def clean_commerce_text(source):
    # Prices can also be embedded in an anchor rather than a .price element.
    # Edit text tokens only: preserve links, section markup and authored examples.
    tokens = re.split(r'(<[^>]*>)', source)
    skip = False
    anchor = False
    for i, token in enumerate(tokens):
        if token.startswith('<'):
            if re.match(r'<(?:script|style)\b', token, re.I): skip = True
            elif re.match(r'</(?:script|style)\b', token, re.I): skip = False
            if re.match(r'<a\b', token, re.I): anchor = True
            elif re.match(r'</a\b', token, re.I): anchor = False
            continue
        if skip: continue
        text = html.unescape(token)
        if not re.search(r'\bSave\s+\d+(?:\.\d+)?%|US\s*\$\s*\d', text, re.I): continue
        clean = 'View price on TpT' if anchor and re.search(r'US\s*\$\s*\d', text) else clean_copy(text)
        if clean != text: tokens[i] = esc(clean)
    return ''.join(tokens)


def phrase(p):
    base = re.sub(r'^AU\s+', '', p['title'].split('|')[0].strip(), flags=re.I)
    base = AC.sub('', US.sub('', base)).strip(' ,:;|–-')
    part = re.search(r'\bPart\s+\d+\b', p['title'], re.I)
    if part and part[0].lower() not in base.lower(): base += ' ' + part[0]
    if p['market'] == 'us':
        base = re.sub(r'\bYear\s+\d+\b', '', base, flags=re.I).strip()
        if not re.search(r'\b(?:grade|kindergarten)\b', base, re.I): base = p['yearLabel'] + ' ' + base
    elif not re.search(r'\b(?:Year\s+\d+|Foundation)\b', base, re.I): base = p['yearLabel'] + ' ' + base
    if p.get('isBundle'):
        if not re.search(r'\bbundle\b', base, re.I): base += ' Bundle'
        if p.get('hasSlides') and p.get('hasPrintables') and not re.search(r'slides', base, re.I): base += ' — Slides & Worksheets'
    elif p.get('hasSlides'):
        if not re.search(r'slides?|powerpoint|presentation', base, re.I): base += ' Teaching Slides'
    elif not re.search(r'worksheets?|workbooks?|printables?', base, re.I): base += ' Worksheets'
    return re.sub(r'\s+', ' ', base).strip()


def metadata(p):
    base = phrase(p)
    codes = p.get('curriculumCodes', [])
    code = codes[0] if len(codes) == 1 else ''
    brand = ' | SkillrHub'
    # Reserve the format/part before shortening the topic; otherwise a slide deck
    # and its worksheets can collapse to the same search title.
    kind = 'Bundle' if p.get('isBundle') else 'Slides' if p.get('hasSlides') else 'Worksheets'
    part = re.search(r'\bPart\s+\d+\b', base, re.I)
    topic = re.sub(r'\b(?:Teaching\s+)?(?:Slides?|Worksheets?|Workbooks?|Printables?|PowerPoint|Presentation|Bundle)\b', '', base, flags=re.I)
    topic = re.sub(r'\bPart\s+\d+\b', '', topic, flags=re.I)
    topic = re.sub(r'\s*\b(?:and|&)\s*(?=[—–-]|$)', '', topic).strip(' ,:;|—–-')
    topic = re.sub(r'\s+', ' ', topic)
    topic = re.sub(r'(?:\s|[&—–-])+$', '', topic)
    detail = p.get('seoVariant', '')
    tail = (' ' + detail if detail else '') + ' ' + kind + (' ' + part[0] if part else '')
    code_bit = ' | ' + code if code and code not in topic else ''
    budget = 69 - len(brand + code_bit + tail)
    if len(topic) > budget:
        code_bit = ''; budget = 69 - len(brand + tail)
    short = topic if len(topic) <= budget else topic[:budget - 1].rsplit(' ', 1)[0].rstrip(' ,:;&–-') + '…'
    title = short + tail + code_bit + brand
    # US pages name their own framework; no Australian equivalence is inferred.
    context = ('Common Core ' + code if code else 'Common Core math' if codes else 'US math resource') if p['market'] == 'us' else code or 'Australian Curriculum v9'
    suffix = (f' ({context})' if context else '') + '. Preview contents and view the current price on TpT.'
    budget = 159 - len(suffix)
    stem = base
    if len(stem) > budget: stem = stem[:budget - 1].rsplit(' ', 1)[0].rstrip(' ,:;–-') + '…'
    return title, stem.rstrip('.') + suffix


def learn_schema(p, url, old_id=None):
    framework = 'Common Core State Standards for Mathematics' if p['market'] == 'us' else 'Australian Curriculum v9.0'
    value = {'@context': 'https://schema.org', '@type': 'LearningResource', '@id': old_id or url + '#resource',
             'name': p['title'], 'description': p['description'], 'url': url, 'identifier': p['id'],
             'image': [p['image'] if p['image'].startswith('https://') else SITE + p['image']],
             'inLanguage': 'en-US' if p['market'] == 'us' else 'en-AU',
             'educationalLevel': p['yearLabel'], 'learningResourceType': p['format'],
             'isAccessibleForFree': bool(p.get('free')), 'sameAs': p['tptUrl'],
             'publisher': {'@type': 'Organization', 'name': 'SkillrHub', '@id': SITE + '/#organization'}}
    if p.get('curriculumCodes'):
        value['educationalAlignment'] = [{'@type': 'AlignmentObject', 'alignmentType': 'teaches',
            'educationalFramework': framework, 'targetName': c} for c in p['curriculumCodes']]
    return value


def breadcrumb(p):
    parent = '/products/?' + urlencode({'market': p['market'], 'year': p['year'], 'subject': p['subject']})
    return [('Home', '/'), ('Resource library', '/products/'), (p['yearLabel']+' '+p['subjectLabel'], parent), (p['title'], p['url'])]


def breadcrumb_schema(p):
    return {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':SITE+href} for i,(name,href) in enumerate(breadcrumb(p))]}


def normalize_schema(value, product=None, url=None):
    if isinstance(value, list): return [v for x in value if (v := normalize_schema(x, product, url)) is not None]
    if not isinstance(value, dict): return value
    kind = value.get('@type')
    if product and kind == 'BreadcrumbList': return breadcrumb_schema(product)
    if kind in ('Offer', 'AggregateOffer'): return None
    if product and kind in ('Product', 'LearningResource') and (value.get('url') == url or kind == 'Product'):
        return learn_schema(product, url, value.get('@id'))
    if kind == 'Product':
        result = {k: v for k, v in value.items() if k not in PRICE_KEYS | {'offers', 'brand', 'sku'}}
        result['@type'] = 'LearningResource'
        if value.get('sku'): result['identifier'] = value['sku']
        result['publisher'] = {'@type': 'Organization', 'name': 'SkillrHub'}
        return normalize_schema(result)
    return {k: clean for k, v in value.items() if k not in PRICE_KEYS | {'offers'} and (clean := normalize_schema(v, product, url)) is not None}


def set_attr(tag, name, value):
    pattern = re.compile(r'\b' + re.escape(name) + r'\s*=\s*(["\'])(.*?)\1', re.I | re.S)
    replacement = name + '="' + esc(value) + '"'
    return pattern.sub(lambda _: replacement, tag, count=1) if pattern.search(tag) else tag[:-1] + ' ' + replacement + '>'


def patch_metadata(source, p):
    title, description = metadata(p)
    source = re.sub(r'<title>.*?</title>', lambda _: '<title>' + esc(title) + '</title>', source, count=1, flags=re.I | re.S)
    source = re.sub(r'<h1\b[^>]*>.*?</h1>', lambda m: m[0][:m[0].find('>') + 1] + esc(p['title']) + '</h1>', source, count=1, flags=re.I | re.S)
    source = re.sub(r'<html\b[^>]*>', lambda m: set_attr(m[0], 'lang', 'en-US' if p['market'] == 'us' else 'en-AU'), source, count=1, flags=re.I)
    def meta(m):
        tag = m[0]; s = BeautifulSoup(tag, 'html.parser').find('meta')
        key = s.get('name', s.get('property', '')).lower()
        if key.startswith('product:price') or key == 'keywords': return ''
        value = {'description': description, 'og:title': title, 'twitter:title': title,
                 'og:description': description, 'twitter:description': description,
                 'og:image': p['image'] if p['image'].startswith('https://') else SITE + p['image'],
                 'og:type': 'website'}.get(key)
        return set_attr(tag, 'content', value) if value is not None else tag
    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)
    # Replace only this listing's checkout URL, preserving related resource links.
    source = re.sub(r'https://www\.teacherspayteachers\.com/Product/[^\s"\'<>]+-' + pid(p) + r'(?=[\s"\'<>])', lambda _: p['tptUrl'], source)
    source = re.sub(r'(<div\b[^>]*class=["\'][^"\']*\bproduct-detail\b[^"\']*["\'][^>]*>\s*)(<img\b[^>]*>)',
                    lambda m: m[1] + set_attr(set_attr(m[2], 'src', p['image']), 'alt', p['title'] + ' cover'), source, count=1, flags=re.I)
    source = re.sub(r'(<p class="eyebrow">).*?(</p>)', lambda m: m[1] + esc(p['yearLabel'] + ' · ' + p['subjectLabel']) + m[2], source, count=1, flags=re.S)
    label = 'US Common Core' if p['market'] == 'us' else 'Australian Curriculum'
    source = re.sub(r'<p class="small">Australian Curriculum:.*?</p>', lambda _: '<p class="small">' + label + ': ' + esc(' · '.join(p.get('curriculumCodes', []))) + '</p>', source, count=1, flags=re.S)
    source = source.replace('href="/print-and-go.html"', 'href="/products/"')
    source = source.replace('https://skillrhub.com/print-and-go.html', 'https://skillrhub.com/products/')
    nav = '<nav class="breadcrumbs" aria-label="Breadcrumb">' + ' · '.join('<span aria-current="page">'+esc(name)+'</span>' if i==3 else '<a href="'+esc(href)+'">'+esc(name)+'</a>' for i,(name,href) in enumerate(breadcrumb(p))) + '</nav>'
    pattern = r'<nav\b(?=[^>]*(?:aria-label=["\']Breadcrumb["\']|class=["\']breadcrumbs["\']))[^>]*>.*?</nav>'
    source, count = re.subn(pattern, lambda _:nav, source, count=1, flags=re.I|re.S)
    if not count: source = re.sub(r'<main\b[^>]*>',lambda m:m[0]+nav,source,count=1,flags=re.I)
    return source


def element_span(node, source):
    lines = source.splitlines(keepends=True)
    start = sum(len(x) for x in lines[:node.sourceline - 1]) + node.sourcepos
    opening_end = source.index('>', start) + 1
    if node.name in ('img', 'meta', 'input', 'link', 'br', 'hr'): return start, opening_end
    depth = 0
    for m in re.finditer(r'</?' + re.escape(node.name) + r'\b[^>]*>', source[start:], re.I):
        if m[0].startswith('</'): depth -= 1
        elif not m[0].endswith('/>'): depth += 1
        if depth == 0: return start, start + m.end()
    raise ValueError(f'Unclosed price element: {node.name}')


def clean_page(source, product=None, url=None):
    if product: source = patch_metadata(source, product)
    soup = BeautifulSoup(source, 'html.parser')
    nodes = soup.select('.price,[itemprop="price"],meta[property="product:price:amount"],meta[property="product:price:currency"]')
    price_node_ids = {id(n) for n in nodes}
    nodes += [n for n in soup.find_all('p') if re.search(r'(?:US\s*\$|A\$|\$)\s*\d', n.get_text()) and re.search(r'\b(?:save|separately|price|purchase|buy)\b', n.get_text(), re.I)]
    unique, seen = [], set()
    for n in nodes:
        if id(n) not in seen: unique.append(n); seen.add(id(n))
    unique = [n for n in unique if not any(id(parent) in seen for parent in n.parents)]
    replacements = []
    leaf = product is not None or soup.select_one('.product-detail') is not None
    for n in unique:
        replacement = ''
        if id(n) not in price_node_ids:
            retained = clean_copy(n.get_text(' ', strip=True))
            if retained: replacement = '<p>' + esc(retained) + '</p>'
        if not leaf and n.name != 'meta':
            container = n.find_parent('article') or n.parent
            dest = container.find('a', href=re.compile(r'teacherspayteachers\.com/Product/'))
            href = dest['href'] if dest else 'https://www.teacherspayteachers.com/store/skillrhub'
            replacement += '<p><a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">View price on TpT</a></p>'
        start, end = element_span(n, source); replacements.append((start, end, replacement))
    for start, end, value in sorted(replacements, reverse=True): source = source[:start] + value + source[end:]
    def script(m):
        value = json.loads(m[2]); clean = normalize_schema(value, product, url)
        if clean == value: return m[0]
        if clean is None: return ''
        return m[1] + json.dumps(clean, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c') + m[3]
    source = re.sub(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)', script, source, flags=re.I | re.S)
    if product:
        label = 'View free sample on TpT' if product.get('free') else 'View price on TpT'
        source = re.sub(r'(<a\b(?=[^>]*href=["\']' + re.escape(product['tptUrl']) + r'["\'])(?=[^>]*class=["\'][^"\']*\bbutton\b)[^>]*>).*?(</a>)', lambda m: m[1] + label + m[2], source, flags=re.S)
        # Correct a verified full-deck fact without changing preview-page counts.
        if pid(product) == '17593166': source = re.sub(r'(<dt>Slides</dt>\s*<dd>)12(</dd>)', r'\g<1>60\2', source)
        scripts = re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',source,re.I|re.S)
        if not any('"BreadcrumbList"' in s for s in scripts):
            source=source.replace('</head>','<script type="application/ld+json">'+json.dumps(breadcrumb_schema(product),ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+'</script></head>',1)
        if not any('"LearningResource"' in s for s in scripts):
            source=source.replace('</head>','<script type="application/ld+json">'+json.dumps(learn_schema(product,url),ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+'</script></head>',1)
    return clean_commerce_text(source)


def new_page(p, units):
    title, description = metadata(p); url = SITE + p['url']
    parent = '/products/?' + urlencode({'market': p['market'], 'year': p['year'], 'subject': p['subject']})
    crumbs = [('Home', '/'), ('Resource library', '/products/'), (p['yearLabel'] + ' ' + p['subjectLabel'], parent), (p['title'], p['url'])]
    breadcrumb = {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': name, 'item': SITE + href} for i, (name, href) in enumerate(crumbs)]}
    graph = {'@context': 'https://schema.org', '@graph': [learn_schema(p, url), breadcrumb]}
    nav = '<nav class="breadcrumbs" aria-label="Breadcrumb">' + ' · '.join('<span aria-current="page">' + esc(name) + '</span>' if i == len(crumbs)-1 else '<a href="' + esc(href) + '">' + esc(name) + '</a>' for i,(name,href) in enumerate(crumbs)) + '</nav>'
    links = ''.join('<li><a href="' + esc(units[c]['url']) + '">' + esc(c + ' — ' + units[c]['title']) + '</a></li>' for c in p['curriculumCodes'] if c in units)
    related = '<section><h2>Matching topic guides</h2><ul>' + links + '</ul></section>' if links else '<p><a href="/us-resources/?' + esc(urlencode({'year':p['year'],'subject':'maths','q':p['curriculumCodes'][0]})) + '">Browse related US curriculum resources</a></p>'
    framework = 'US Common Core' if p['market'] == 'us' else 'Australian Curriculum v9'
    return f'''<!doctype html>
<html lang="{'en-US' if p['market']=='us' else 'en-AU'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title><meta name="description" content="{esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="{url}">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:image" content="{esc(p['image'])}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icons/skillrhub-mark.svg"><link rel="stylesheet" href="/assets/print-and-go.css?v=5"><script defer src="/assets/site-analytics.js?v=20261112-coverage"></script><script type="application/ld+json">{json.dumps(graph,ensure_ascii=False,separators=(',',':')).replace('<', chr(92)+'u003c')}</script>
</head><body><header><nav class="top-nav" aria-label="Main navigation"><a class="brand" href="/">SkillrHub</a><div class="nav-links"><a href="/learn/">Topic guides</a><a href="/products/">Resource library</a><a href="/us-resources/">US resources</a></div></nav></header>
<main>{nav}<section aria-label="Product details"><div class="product-detail"><img src="{esc(p['image'])}" alt="{esc(p['title'])} cover" width="525" height="525" style="width:100%;height:auto;object-fit:contain"><div><p class="eyebrow">{esc(p['yearLabel']+' · '+p['subjectLabel']+' · '+p['format'])}</p><h1>{esc(p['title'])}</h1><p>{esc(p['description'])}</p><p>{framework}: {esc(' · '.join(p['curriculumCodes']))}</p><p>Check the actual listing for the complete preview, included files, answers and access conditions.</p><a class="button" href="{esc(p['tptUrl'])}" target="_blank" rel="noopener noreferrer">{'View free sample on TpT' if p.get('free') else 'View price on TpT'}</a><p>Teachers Pay Teachers handles checkout and file delivery. A bundle may include resources also sold individually.</p></div></div></section>{related}<section class="support"><h2>Online learning is separate</h2><p>SkillrHub topic explanations and available online practice are separate from these printable and teaching resources. Check the relevant curriculum and product preview before choosing.</p><p><a href="{esc(parent)}">Browse this resource folder</a> · <a href="/learn/">Explore topic guides</a></p></section></main><footer><a href="/products/">Resource library</a> · <a href="/contact.html">Contact</a></footer></body></html>
'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('snapshot', type=Path)
    parser.add_argument('--bundle-evidence', type=Path, required=True)
    args = parser.parse_args()
    snapshot, bundles = read(args.snapshot), read(args.bundle_evidence)
    rows, date = snapshot['products'], snapshot['auditedAt']
    assert len(rows) == len({r['productId'] for r in rows}) == snapshot['expectedCount']
    products = read(ROOT / 'data/print-and-go-products.json')
    existing = {pid(p): p for p in products}; assert len(existing) == len(products)
    units = {u['code']: u for u in read(ROOT/'data/curriculum-units.json')['units']}
    new = []
    for row in rows:
        ident = row['productId']; text = row['title'] + ' ' + row['description']
        ac = sorted({c for c in AC.findall(text) if c in units})
        us = sorted(set(US.findall(text)))
        if ident not in existing:
            ac = bundles.get(ident, {}).get('curriculumCodes', ac)
            assert ac or us, ('Missing verified curriculum reference', ident)
            assert not row['free'], ('New free resource requires collection reconciliation', ident)
            market = 'au' if ac else 'us'
            year = units[ac[0]]['yearNumber'] if ac else 0 if us[0].startswith('K.') else int(us[0].split('.')[0])
            slides = bool(re.search(r'slides?|powerpoint|presentation', row['title'], re.I))
            printables = bool(row['isBundle'] or not slides or re.search(r'worksheets?|workbooks?', row['title'], re.I))
            sentences = re.split(r'(?<=[.!?])\s+', re.sub(r'\s+', ' ', row['description']).strip())
            desc = ' '.join(sentences[:2])
            if len(desc)>500: desc = desc[:450].rsplit(' ',1)[0].rstrip(' ,:;') + '… Preview the complete contents on TpT.'
            p = {'id':'tpt-'+ident,'year':year,'subject':'maths','curriculumCodes':ac or us,'market':market,
                 'url':'/products/tpt-'+ident+'/', 'description':clean_copy(desc), 'resourceType':'bundle' if row['isBundle'] else 'teaching-slides' if slides else 'worksheet',
                 'isBundle':row['isBundle'],'hasSlides':slides,'hasPrintables':printables,'available':True,'listingConfirmedAt':date,
                 'topics':sorted(set(re.findall(r'\b[a-z]{3,}\b',row['title'].lower())))}
            if row.get('packCount'): p['packCount']=row['packCount']
            new.append(p); products.append(p); existing[ident]=p
        else: p = existing[ident]
        p.update(title=row['title'], tptUrl=row['url'], image=row['image'], free=row['free'], tptObservedAt=date)
        if not p['url'].startswith('/'): p['url']=row['url']
        if p['market']=='us':
            p['curriculumCodes']=us or [c for c in p.get('curriculumCodes',[]) if US.fullmatch(c)]
            p['usGrade']='K' if int(p['year'])==0 else str(p['year'])
            p['usUseNote']='US curriculum resource. Check the exact standard and preview on TpT; Australian curriculum equivalence is not claimed.'
        else:
            codes=[c for c in p.get('curriculumCodes',[]) if c in units]
            p['curriculumCodes'] = codes
            if codes:
                positions={(units[c]['yearNumber'],units[c]['subjectSlug']) for c in codes}
                if len(positions)==1: p['year'],p['subject']=next(iter(positions))
        p['yearLabel']=('Kindergarten' if int(p['year'])==0 else 'Grade '+str(p['year'])) if p['market']=='us' else ('Foundation' if int(p['year'])==0 else 'Year '+str(p['year']))
        p['subjectLabel']={'maths':'Math' if p['market']=='us' else 'Maths','science':'Science','english':'English'}[p['subject']]
        p['format']='Teaching slides and printable worksheets' if p.get('hasSlides') and p.get('hasPrintables') else 'Teaching slides' if p.get('hasSlides') else 'Printable worksheets'
        if ident=='17593166':p['verifiedListingFacts']={'slides':60,'fileFormat':'PDF'}
    for p in products:
        p.setdefault('market', 'au')
        p.setdefault('format', 'Teaching slides' if p.get('hasSlides') else 'Printable worksheets')
        for key in PRICE_KEYS:p.pop(key,None)
        p['description']=clean_copy(p['description'])
        if p.get('includes'):p['includes']=[clean_copy(x) for x in p['includes'] if clean_copy(x)]
        p['seoTitle'],p['metaDescription']=metadata(p)
    duplicate_titles = Counter(p['seoTitle'] for p in products if p.get('available') and p['url'].startswith('/') and p['url'].endswith('/'))
    for p in products:
        if duplicate_titles[p['seoTitle']] < 2: continue
        facts = p.get('verifiedListingFacts', {})
        source = next((r['description'] for r in rows if r['productId'] == pid(p)), '')
        match = re.search(r'\b(\d+)\s+(?:classroom\s+)?slides\b', source, re.I)
        if facts.get('pages'): p['seoVariant'] = str(facts['pages']) + '-page'
        elif facts.get('slides') or match: p['seoVariant'] = str(facts.get('slides') or match[1])
        else: raise ValueError('Duplicate title needs verified distinguishing facts: ' + p['id'])
        p['seoTitle'],p['metaDescription']=metadata(p)
    assert {pid(p) for p in products if p.get('available')}=={r['productId'] for r in rows}
    save(ROOT/'data/print-and-go-products.json',products)
    for p in new:
        path=ROOT/p['url'].lstrip('/')/'index.html'
        assert not path.exists(),p['id'];path.parent.mkdir(parents=True,exist_ok=True);path.write_text(new_page(p,units))
    local={str((ROOT/p['url'].lstrip('/')/'index.html').relative_to(ROOT)):p for p in products if p['url'].startswith('/') and p['url'].endswith('/')}
    changed=[]
    for base in ['products','print-and-go','teach-and-explain']:
        for path in (ROOT/base).rglob('*.html'):
            relative=path.relative_to(ROOT).as_posix();p=local.get(relative)
            source=path.read_text()
            if p or re.search(r'class=["\'][^"\']*\bprice\b|"price"\s*:|\bSave\s+\d+(?:\.\d+)?%|US\s*\$\s*\d',source,re.I):
                result=clean_page(source,p,SITE+p['url'] if p else None)
                if result!=source:path.write_text(result);changed.append(relative)
    folders.update_folders(products)
    inventory={'auditedAt':date,'storefront':snapshot['storefront'],'activeProductCount':len(rows),
               'pricePolicy':'View price on TpT; no numerical prices published.',
               'retainedCatalogueIdsNotInStore':sorted(set(existing)-{r['productId'] for r in rows}),
               'products':[{k:r[k] for k in ['productId','title','url','image','free','observedAt']} for r in rows]}
    save(ROOT/'data/tpt-active-product-inventory.json',inventory)
    (ROOT/'data/tpt-observed-listings.tsv').write_text('\n'.join(r['title']+'\t'+r['url'].split('/Product/')[1] for r in rows)+'\n')
    site=ROOT/'sitemap-site.xml';source=site.read_text()
    for p in new:
        needle='<loc>'+SITE+p['url']+'</loc>'
        assert needle not in source,p['id'];source=source.replace('</urlset>','<url>'+needle+'<lastmod>'+date+'</lastmod></url>\n</urlset>',1)
    site.write_text(source)
    from generate_sitemap import page_title,visible_search_text
    path=ROOT/'assets/site-search-index.json';index=read(path);byurl={x['u']:x for x in index['items'] if not x.get('e')}
    for relative in set(changed)|{p['url'].lstrip('/')+'index.html' for p in new}|{'products/index.html','us-resources/index.html','teach-and-explain.html'}:
        file=ROOT/relative;url='/'+relative.removesuffix('index.html') if relative.endswith('/index.html') else '/'+relative
        if url not in byurl:byurl[url]={'u':url};index['items'].append(byurl[url])
        byurl[url].update(t=page_title(file.read_text(),file),x=visible_search_text(file.read_text()))
    path.write_text(json.dumps(index,ensure_ascii=False,separators=(',',':'))+'\n')
    report={'auditedAt':date,'storeListings':len(rows),'storePagesVerified':snapshot['pages'],'added':len(new),
            'newIds':[pid(p) for p in new],'newFormats':dict(Counter(p['resourceType'] for p in new)),
            'activeByMarket':dict(Counter(p['market'] for p in products if p.get('available'))),
            'catalogueEntries':len(products),'activeEntries':sum(bool(p.get('available')) for p in products),
            'retainedInactiveIds':inventory['retainedCatalogueIdsNotInStore'],'pricePolicy':inventory['pricePolicy'],
            'newPages':len(new),'updatedCommercePages':len(set(changed)),'topicPagesModified':0}
    report_path=ROOT/f'docs/qa/{date}-tpt-sync.json'
    if report_path.exists():
        previous=read(report_path)
        report['newIds']=list(dict.fromkeys(previous.get('newIds',[])+report['newIds']))
        report['added']=len(report['newIds']);report['newPages']=report['added']
        report['newFormats']=dict(Counter(p['resourceType'] for p in products if pid(p) in report['newIds']))
        report['updatedCommercePages']=max(report['updatedCommercePages'],previous.get('updatedCommercePages',0))
    save(report_path,report)
    print(json.dumps({**report,'added_this_run':len(new)},indent=2))


if __name__=='__main__':main()
