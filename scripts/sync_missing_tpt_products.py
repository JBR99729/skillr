#!/usr/bin/env python3
"""Add missing, browser-observed store listings, keyed by immutable TpT ID.

Existing catalogue records, product routes, prices and authored lessons survive.
Rebuild the current folder browser's static fallback; do not create a second
listing for an existing ID. Link actual AC9 mappings only, never guessed US/AU
equivalences. Repeat runs update owned blocks and add zero duplicate products.
"""
import html
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / 'data/tpt-observed-store-20261115.json'
DATE = '2026-11-15'
SITE = 'https://skillrhub.com'
ESC = html.escape
CATALOGUE = ROOT / 'data/print-and-go-products.json'


def pid(p):
    m = re.search(r'-(\d+)(?:[?#].*)?$', p.get('tptUrl', p.get('url', '')))
    assert m, p
    return m[1]


def save_json(path, obj):
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n')


def resource_format(p):
    return 'bundle' if p.get('isBundle') or p.get('resourceType') == 'bundle' else 'slides' if p.get('hasSlides') or p.get('resourceType') in ('teaching-slides', 'teaching-sample') else 'worksheets'


def folder_url(p):
    return '/products/?market=' + p['market'] + '&year=' + str(p['year']) + '&subject=' + p['subject'] + '&format=' + resource_format(p)


def price(row):
    text = row['text']
    if '\nFREE\n' in text:
        return '0.00'
    current = re.findall(r'^Price \$([\d,.]+)', text, re.M)
    original = re.findall(r'^Original Price \$([\d,.]+)', text, re.M)
    assert current or original, ('Missing observed price', row['productId'])
    return (current or original)[-1].replace(',', '')


def new_record(row, units):
    title, text = row['title'], row['text']
    ac9 = sorted(set(re.findall(r'AC9[EMS](?:F|\d{1,2})[A-Z]+\d{2}', title + ' ' + text)))
    ac9 = [c for c in ac9 if c in units]
    us = sorted(set(re.findall(r'\b(?:K|\d{1,2})\.[A-Z]{1,3}\.[A-Z]\.\d+[a-z]?\b', title)))
    assert ac9 or us, ('No verified curriculum code', row['productId'], title)
    market = 'au' if ac9 else 'us'
    year = units[ac9[0]]['yearNumber'] if ac9 else int(us[0].split('.')[0])
    subject = units[ac9[0]]['subjectSlug'] if ac9 else 'maths'
    bundle = bool(re.search(r'\nBundle \(\d+ products\)', text))
    slides = bool(re.search(r'slides?|powerpoint|presentation', title, re.I)) or bool(bundle and re.search(r'teaching slides?|slide deck|slide teaching|teaching presentation', text, re.I))
    printables = bool(re.search(r'worksheets?|workbooks?|printable|Slides \+ PDF', title, re.I)) or bool(bundle and re.search(r'printable|worksheets?|workbook', text, re.I))
    assert slides or printables, ('Unknown resource format', title)
    kind = 'bundle' if bundle else 'teaching-slides' if slides else 'workbook' if 'workbook' in title.lower() else 'worksheet'
    body = text.split('Created by\nSkillrhub\n', 1)[-1].split('\n')[0]
    sentences = re.findall(r'[^.!?]+[.!?](?:\s|$)', body)
    description = ' '.join(x.strip() for x in sentences[:2])
    if not description or len(description) > 600:
        description = title.split('|')[0].strip() + '. View the actual resource preview, included files and current price on Teachers Pay Teachers.'
    result = dict(id='tpt-' + row['productId'], title=title, year=year,
                  yearLabel=('Year ' if market == 'au' else 'Grade ') + str(year),
                  subject=subject, subjectLabel={'maths': 'Maths' if market == 'au' else 'Math', 'english': 'English', 'science': 'Science'}[subject],
                  topics=sorted(set(re.findall(r'[a-z]{3,}', title.lower()))),
                  curriculumCodes=ac9 or us, description=description,
                  url='/products/tpt-' + row['productId'] + '/', image=row['image'],
                  price=price(row), currency='USD', available=True,
                  resourceType=kind, tptUrl=row['url'], free=False, isBundle=bundle,
                  hasSlides=slides, hasPrintables=printables, market=market,
                  listingConfirmedAt=DATE, tptObservedAt=DATE,
                  format='Teaching slides and printable worksheets' if slides and printables else 'Teaching slides' if slides else 'Printable worksheets')
    if market == 'us':
        result['usGrade'] = str(year)
        result['usUseNote'] = 'US Common Core resource. Check the listing preview and exact standard; no Australian Curriculum equivalence is claimed.'
    if bundle:
        result['packCount'] = int(re.search(r'\nBundle \((\d+) products\)', text)[1])
        original = re.search(r'^Original Price \$([\d,.]+)', text, re.M)
        if original:
            result['listPrice'] = original[1].replace(',', '')
    return result


def product_page(p, units):
    target = ROOT / p['url'].lstrip('/') / 'index.html'
    assert not target.exists(), ('Would replace an existing product page', p['id'])
    links = ''.join('<li><a href="' + ESC(units[c]['url'], quote=True) + '">' + ESC(c + ' — ' + units[c]['title']) + '</a></li>' for c in p['curriculumCodes'] if c in units)
    related = '<section><h2>Matching topic guides</h2><ul>' + links + '</ul></section>' if links else '<p><a href="/us-resources/#standard-' + re.sub(r'[^a-z0-9]+', '-', p['curriculumCodes'][0].lower()) + '">Browse resources for this US standard</a></p>'
    graph = {'@context': 'https://schema.org', '@type': 'Product', '@id': SITE + p['url'] + '#product',
             'name': p['title'], 'description': p['description'], 'url': SITE + p['url'],
             'image': [p['image']], 'sku': p['id'], 'brand': {'@type': 'Brand', 'name': 'SkillrHub'},
             'offers': {'@type': 'Offer', 'price': p['price'], 'priceCurrency': 'USD', 'url': p['tptUrl'], 'availability': 'https://schema.org/InStock'}}
    source = f'''<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{ESC(p['title'])} | SkillrHub</title><meta name="description" content="{ESC(p['description'], quote=True)}"><meta name="robots" content="index,follow">
<link rel="canonical" href="{SITE + p['url']}"><meta property="og:title" content="{ESC(p['title'], quote=True)}"><meta property="og:description" content="{ESC(p['description'], quote=True)}"><meta property="og:type" content="product"><meta property="og:url" content="{SITE + p['url']}"><meta property="og:image" content="{ESC(p['image'], quote=True)}">
<link rel="icon" href="/icons/skillrhub-mark.svg"><link rel="stylesheet" href="/assets/print-and-go.css?v=5"><script defer src="/assets/site-analytics.js?v=20261112-coverage"></script><script type="application/ld+json">{json.dumps(graph, ensure_ascii=False).replace('</', '<\\/')}</script>
</head><body><header><nav class="top-nav" aria-label="Main navigation"><a class="brand" href="/">SkillrHub</a><div class="nav-links"><a href="/learn/">Topic guides</a><a href="/products/">Resource library</a><a href="/us-resources/">US resources</a></div></nav></header>
<main><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/products/">Resource library</a> · <a href="{ESC(folder_url(p), quote=True)}">{ESC(p['yearLabel'] + ' ' + p['subjectLabel'] + ' ' + resource_format(p))}</a></nav>
<section aria-label="Product details"><div class="product-detail"><img src="{ESC(p['image'], quote=True)}" alt="{ESC(p['title'], quote=True)} cover" width="525" height="525" style="width:100%;height:auto;object-fit:contain"><div><p class="eyebrow">{ESC(p['yearLabel'] + ' · ' + p['subjectLabel'] + ' · ' + p['format'])}</p><h1>{ESC(p['title'])}</h1><p>{ESC(p['description'])}</p><p>{ESC(' · '.join(p['curriculumCodes']))}</p><p class="price">US${p['price']}</p><p>Check the actual listing for its preview, full contents, included answers, file format and current price. This is a separately purchased resource.</p><a class="button" href="{ESC(p['tptUrl'], quote=True)}" target="_blank" rel="noopener noreferrer">Preview and buy on TpT</a><p>Teachers Pay Teachers handles checkout and file delivery.</p></div></div></section>
{related}<section class="support"><h2>Online practice is separate</h2><p>Read the topic guides and choose available online practice on SkillrHub. Paid worksheets and teaching resources are purchased separately.</p><p><a href="/learn/">Explore topic guides</a> · <a href="https://app.skillrhub.com/">Open online practice</a></p></section></main><footer><a href="/products/">Resource library</a> · <a href="/contact.html">Contact</a><p>SkillrHub · Learn • Practice • Grow</p></footer></body></html>
'''
    target.parent.mkdir(parents=True, exist_ok=True); target.write_text(source)


def card(p):
    return f'''<article class="rl-product" data-product-id="{pid(p)}"><a class="rl-cover" href="{ESC(p['tptUrl'], quote=True)}" target="_blank" rel="noopener noreferrer"><img src="{ESC(p['image'], quote=True)}" alt="{ESC(p['title'], quote=True)} cover" width="525" height="525" loading="lazy"></a><div class="rl-product-copy"><p class="rl-product-meta">{ESC(p['yearLabel'] + ' · ' + p['subjectLabel'])}</p><h3><a href="{ESC(p['tptUrl'], quote=True)}" target="_blank" rel="noopener noreferrer">{ESC(p['title'])}</a></h3><a class="rl-product-link" href="{ESC(p['tptUrl'], quote=True)}" target="_blank" rel="noopener noreferrer">{'Free sample on TpT' if p.get('free') else 'View price on TpT'} ↗</a></div></article>'''


def native_folders(products, market='', format=''):
    def detail(label, body):
        return '<details class="rl-native-folder"><summary>' + ESC(label) + '</summary>' + body + '</details>'
    body = ''
    for country in ([market] if market else ['au', 'us']):
        subset = [p for p in products if p.get('available') and p.get('market') == country and (not format or resource_format(p) == format)]
        years = ''
        for year in sorted(set(p['year'] for p in subset), key=int):
            rows = [p for p in subset if p['year'] == year]; subjects = ''
            for subject in ['maths', 'english', 'science']:
                items = [p for p in rows if p['subject'] == subject]
                if not items:
                    continue
                formats = ''
                for kind, label in [('worksheets', 'Worksheets & workbooks'), ('slides', 'Teaching slides'), ('bundle', 'Bundles')]:
                    group = sorted([p for p in items if resource_format(p) == kind], key=lambda p: p['title'])
                    if group:
                        formats += detail(label + ' (' + str(len(group)) + ')', '<div class="rl-products">' + ''.join(card(p) for p in group) + '</div>')
                subjects += detail('Math' if country == 'us' and subject == 'maths' else {'maths': 'Maths', 'english': 'English', 'science': 'Science'}[subject], formats)
            years += detail(('Kindergarten' if country == 'us' else 'Foundation') if int(year) == 0 else ('Grade ' if country == 'us' else 'Year ') + str(year), subjects)
        body += detail(('United States · Common Core' if country == 'us' else 'Australia · Australian Curriculum') + ' (' + str(len(subset)) + ')', years)
    return '<h2 class="rl-heading">Browse resource folders</h2><p class="rl-helper">Choose a curriculum, year or grade, subject and format. Paid worksheets, teaching slides and bundles are separate listings; genuine TpT samples are labelled.</p>' + body


def update_folders(products):
    for name, market, format in [('products/index.html', '', ''), ('us-resources/index.html', 'us', ''), ('teach-and-explain.html', '', 'slides')]:
        path = ROOT / name; source = path.read_text()
        source, n = re.subn(r'(<section\b[^>]*data-resource-library[^>]*>)[\s\S]*?(</section>)', lambda m: m[1] + native_folders(products, market, format) + m[2], source, count=1)
        assert n == 1, name
        path.write_text(source)


def link_topics(products, new_ids, units):
    mapped = defaultdict(list); us_mapped = defaultdict(list)
    for p in products:
        if pid(p) not in new_ids:
            continue
        for code in p['curriculumCodes']:
            (mapped if code in units else us_mapped)[code].append(p)
    count = 0
    for code, items in mapped.items():
        path = ROOT / units[code]['url'].lstrip('/') / 'index.html'
        source = path.read_text()
        marker = r'<!-- skillr-observed-products:start -->[\s\S]*?<!-- skillr-observed-products:end -->'
        source = re.sub(marker, '', source)
        # Existing links are authoritative; never duplicate a listed product.
        existing = set(re.findall(r'teacherspayteachers\.com/Product/[^"<>?]+?-(\d+)(?=["?<#\s])', source))
        items = [p for p in items if pid(p) not in existing and p['url'] not in source]
        if not items:
            continue
        groups = []
        for kind, label in [('worksheets', 'Paid worksheets'), ('slides', 'Teaching slides'), ('bundle', 'Matching bundles')]:
            rows = [p for p in items if resource_format(p) == kind]
            if rows:
                groups.append('<h3>' + label + '</h3><ul>' + ''.join('<li><a href="' + ESC(p['url'], quote=True) + '" data-tpt-listing-id="' + pid(p) + '">' + ESC(p['title']) + '</a></li>' for p in rows) + '</ul>')
        block = '<!-- skillr-observed-products:start --><aside class="support" id="matching-paid-resources" aria-label="Matching paid resources for ' + code + '"><h2>Paid resources for ' + code + '</h2><p>Choose a paid worksheet pack, teaching slides or a bundle. Check the product preview and included resources before purchasing; bundles may overlap with individual packs.</p>' + ''.join(groups) + '</aside><!-- skillr-observed-products:end -->'
        assert '</main>' in source, path
        path.write_text(source.replace('</main>', block + '</main>', 1)); count += 1
    path = ROOT / 'us-resources/index.html'; source = path.read_text()
    source = re.sub(r'<!-- skillr-us-standard-links:start -->[\s\S]*?<!-- skillr-us-standard-links:end -->', '', source)
    body = ''
    for code, items in sorted(us_mapped.items()):
        anchor = 'standard-' + re.sub(r'[^a-z0-9]+', '-', code.lower())
        body += '<details id="' + anchor + '"><summary>' + ESC(code) + '</summary><ul>' + ''.join('<li><a href="' + ESC(p['url'], quote=True) + '">' + ESC(p['title']) + '</a></li>' for p in items) + '</ul></details>'
    if body:
        block = '<!-- skillr-us-standard-links:start --><section class="support"><h2>Resources by US topic standard</h2><p>These listings identify their US Common Core standard. Australian curriculum equivalence and matching online-practice availability are not implied.</p>' + body + '</section><!-- skillr-us-standard-links:end -->'
        source = source.replace('</main>', block + '</main>', 1); path.write_text(source)
    return len(mapped), len(us_mapped)


def main():
    observed = json.loads(SNAPSHOT.read_text()); rows = observed['products']
    assert len(rows) == len({r['productId'] for r in rows}) == observed['expectedCount']
    products = json.loads(CATALOGUE.read_text()); old_ids = {pid(p) for p in products}
    assert len(old_ids) == len(products), 'Existing catalogue contains duplicate TpT IDs'
    units = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    added = []
    for row in rows:
        if row['productId'] in old_ids:
            continue
        p = new_record(row, units); products.append(p); added.append(p)
        product_page(p, units); old_ids.add(row['productId'])
    assert len(products) == len({pid(p) for p in products})
    save_json(CATALOGUE, products)
    new_ids = {pid(p) for p in products if p.get('listingConfirmedAt') == DATE and p.get('id', '').startswith('tpt-')}
    update_folders(products)
    au_topics, us_standards = link_topics(products, new_ids, units)
    inventory = dict(auditedAt=DATE, storefront=observed['storefront'], activeProductCount=len(rows),
                     retainedCatalogueIdsNotInStore=sorted(old_ids - {r['productId'] for r in rows}),
                     products=[dict(productId=r['productId'], title=r['title'], url=r['url'], image=r['image'], price=price(r), observedAt=DATE) for r in rows])
    save_json(ROOT / 'data/tpt-active-product-inventory.json', inventory)
    report = dict(observedListings=len(rows), added=len(added), addedIds=[pid(p) for p in added],
                  catalogueEntries=len(products), duplicateIds=0, linkedAustralianTopics=au_topics,
                  linkedUSStandards=us_standards, retainedNotInStore=inventory['retainedCatalogueIdsNotInStore'])
    report_path = ROOT / 'docs/qa/2026-11-15-paid-worksheets-tpt-sync.json'
    report_path.parent.mkdir(parents=True, exist_ok=True)
    if not added and report_path.exists():
        report['added'] = json.loads(report_path.read_text())['added']
        report['addedIds'] = json.loads(report_path.read_text())['addedIds']
    save_json(report_path, report)
    print(json.dumps({**report, 'added_this_run': len(added)}))


if __name__ == '__main__':
    main()
