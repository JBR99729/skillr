#!/usr/bin/env python3
"""Add static resource facts only for codes with observed TpT listings.

No lesson rewriting or SEO metadata changes. Re-running replaces owned blocks.
The observed store snapshot must be refreshed deliberately, not inferred by AI.
"""
import json
import re
from collections import defaultdict
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://skillrhub.com'
DATE = '2026-10-07'
LIVE_IDS = '''17273907,17720276,17718181,17717457,17792767,17719151,17718482,17856838,17842866,17842475,17842350,17678421,17813656,17812573,17812026,17811759,17811456,17803594,17793855,17811158,17793696,17792524,17728279,17727914,17716709,17710509,17844340,17843715,17843349,17840189,17810632,17804195,17804874,17804595,17803723,17802766,17802130,17795150,17730055,17729544,17728068,17710715,17795280,17794756,17794632,17794524,17791625,17621276,17684936,17593166,17746391,17746230,17746080,17745451,17745803,17745214,17744721,17744486,17744877,17743951,17679159,17678987,17678407,17677514,17676771,17737649,17737193,17737053,17736971,17737657,17737343,17736863,17736411,17670474,17676629,17669944,17669505,17669357,17669472,17594445,17594247,17593120,17839947,17594471,17204859,17594426,17594338,17204897,17593227,17204675,17204777,17204732,17594291,17592266,17593083,17567833,17745962,17728088,17670322,17620166,17620155,17620145,17592010,17526065,17492537,17273749,17204521,17869356,17869034,17867818,17867745,17867511,17867400,17867276,17867187,17866956,17865943,17865797,17865943,17865685,17865530,17865364,17865133,17864784,17864634'''.split(',')
LIVE_IDS = set(LIVE_IDS)
assert len(LIVE_IDS) == 124

def read(path):
    return json.loads((ROOT / path).read_text())

def write_json(path, data):
    (ROOT / path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def codes(text):
    return re.findall(r'AC9(?:M|E|S)(?:F|\d{1,2})[A-Z]+\d{2}', text)

def owned(text, key, block, anchor):
    start, end = f'<!-- {key}:start -->', f'<!-- {key}:end -->'
    wrapped = start + '\n' + block + '\n' + end
    if start in text:
        assert text.count(start) == text.count(end) == 1
        return re.sub(re.escape(start) + r'.*?' + re.escape(end), lambda _: wrapped, text, flags=re.S)
    assert anchor in text, (key, anchor)
    return text.replace(anchor, wrapped + '\n' + anchor, 1)

def link(url, label):
    return f'<a href="{escape(url, quote=True)}">{escape(label)}</a>'

def absolute(url):
    return ORIGIN + url if url.startswith('/') else url

units = {u['code']: u for u in read('data/curriculum-units.json')['units']}
products = {}
sources = read('data/tpt-active-product-inventory.json')['products']
sources += read('data/year1-teaching-slides.json')['items']
sources += read('data/print-and-go-products.json')
for p in sources:
    url = p.get('tptUrl', p.get('url', ''))
    match = re.search(r'-(\d{8})$', url)
    if not match or match[1] not in LIVE_IDS:
        continue
    pid = match[1]
    mapped = set(codes(p.get('title', '') + ' ' + url))
    mapped.update(c for c in p.get('curriculumCodes', []) if c in units)
    if p.get('code') in units:
        mapped.add(p['code'])
    old = products.get(pid, {})
    mapped.update(old.get('curriculumCodes', []))
    # Prefer catalogue resource names over short topic-guide labels.
    title = p['title'] if 'curriculumCodes' in p or pid not in products else old['name']
    products[pid] = dict(productId=pid, name=title, url=url, curriculumCodes=sorted(mapped))

for line in (ROOT / 'data/tpt-observed-listings.tsv').read_text().splitlines():
    title, slug = line.split('\t')
    pid = slug.split('-')[-1]
    products[pid] = dict(productId=pid, name=title,
                         url='https://www.teacherspayteachers.com/Product/' + slug,
                         curriculumCodes=sorted(set(codes(title))))

# These pack/code relationships are established by the existing catalogue.
# The full-year Year 2 listing was opened on DATE and explicitly covers all five
# strands, matching its topic list to the 18 canonical Year 2 Maths descriptors.
products['17273907']['curriculumCodes'] = sorted(c for c, u in units.items() if u['yearNumber'] == 2 and u['subjectSlug'] == 'maths')
for pid, mapped in {
    '17204521': ['AC9S1U01'], '17204675': ['AC9S1U03'],
    '17204732': ['AC9S1U02'], '17204777': ['AC9S1H01'],
    '17620145': ['AC9MFN01'], '17620155': ['AC9M1N04'],
    '17620166': ['AC9M2N01'], '17678421': ['AC9M1A01', 'AC9M1A02'],
}.items():
    products[pid]['curriculumCodes'] = mapped
assert set(products) == LIVE_IDS, (LIVE_IDS - set(products), set(products) - LIVE_IDS)

by_code = defaultdict(list)
for p in products.values():
    p['freeSample'] = p['name'].upper().startswith('FREE')
    # Do not promote generic catalogue 'includes' text into verified pack facts.
    for c in p['curriculumCodes']:
        assert c in units, c
        by_code[c].append(p)

contexts = []
for code, packs in sorted(by_code.items()):
    u = dict(units[code])
    u['description'] = re.sub(r'\\+frac\{?(\d)\}?\{(\d+)\}', r'\1/\2', u['description'])
    u['description'] = re.sub(r'\\+frac(\d)(\d)', r'\1/\2', u['description'])
    path = ROOT / u['url'].strip('/') / 'index.html'
    assert path.exists(), path
    html = path.read_text()
    canonical_tag = re.search(r'<link\b[^>]*rel=[\'"]canonical[\'"][^>]*>', html)
    assert canonical_tag, code
    canonical = re.search(r'href=[\'"]([^\'"]+)', canonical_tag[0])[1]
    assert canonical == absolute(u['url']), (code, canonical, u['url'])
    # Use published schema links, because historic unit data has stale teacher routes.
    schemas = [json.loads(s) for s in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S)]
    resource = next(s for s in schemas if isinstance(s, dict) and s.get('@id', '').endswith('#learning-resource'))
    parts = resource['hasPart']
    routes = {}
    for label, types in [('Worksheet', ['Worksheet']), ('Practice', ['Practice']), ('Test', ['Assessment']), ('Classroom View', ['Teacher resource'])]:
        part = next(p for p in parts if p.get('learningResourceType') in types)
        routes[label] = absolute(part['url'])
        assert routes[label].startswith(ORIGIN + '/'), (code, routes[label])
        target = ROOT / urlsplit(routes[label]).path.strip('/')
        exists = target.is_file() or (target / 'index.html').is_file()
        if label == 'Classroom View' and not exists:
            del routes[label]
        else:
            assert exists, (code, routes[label])
    packs.sort(key=lambda p: ('worksheet' not in p['name'].lower(), p['freeSample'], p['productId']))
    level = u['levelLabel']
    subject = 'Maths' if u['subjectSlug'] == 'maths' else u['subject']
    facts = [('Year level', level), ('Subject', subject), ('Strand', u['strand']),
             ('Curriculum', 'Australian Curriculum Version 9.0'), ('Curriculum code', code),
             ('Content description', u['description']), ('Publisher', 'SkillrHub')]
    rows = ''.join(f'<tr><th scope="row">{escape(k)}</th><td>{escape(v)}</td></tr>' for k, v in facts)
    choices = ''.join(f'<li>{link(p["url"], p["name"])}' + (' — free sample' if p['freeSample'] else '') + '</li>' for p in packs)
    free_links = ' · '.join(link(url, label) for label, url in routes.items())
    body = f'''<details class="curriculum-topic-section" id="resource-facts"><summary><strong>About this resource: curriculum, worksheets and teaching packs</strong></summary><div class="curriculum-detail-body">
<p>SkillrHub provides a {escape(level)} {escape(subject)} topic guide and learning resources for <strong>{code}</strong>, aligned with Australian Curriculum Version 9.0. The curriculum focus is: {escape(u['description'])}.</p>
<div class="curriculum-table-wrap"><table class="curriculum-map-table"><caption>Resource facts for {code}</caption><tbody>{rows}</tbody></table></div>
<h3>Where can I find a {code} worksheet?</h3><p>Open the {link(routes['Worksheet'], code + ' worksheet')} for student written work. The website worksheet, topic guide, online practice and test are free to access without a login.</p>
<p>{free_links}</p>
<h3>Related SkillrHub downloads on Teachers Pay Teachers</h3><p>These separate TpT resources cover this curriculum code. Open the matching listing to check its preview, file format, included activities, answers and current price before choosing a pack.</p><ul>{choices}</ul>
<p>For classroom teaching, start with the topic guide, use the worksheet or practice to consolidate learning, then use the test to check understanding. TpT downloads are optional resources with their own purchase or download conditions.</p>
<p>Publisher information: {link('/about.html', 'About SkillrHub')} · {link('/editorial-standards.html', 'Editorial standards')} · {link('/contact.html', 'Contact SkillrHub')}.</p>
</div></details>'''
    anchor = '<!-- skillr-learning-strands:start -->' if '<!-- skillr-learning-strands:start -->' in html else re.search(r'<details\b[^>]*class="[^"]*curriculum-topic-section[^>]*>', html)[0]
    html = owned(html, 'skillr-tpt-resource-facts', body, anchor)
    # Link separately distributed learning resources using subjectOf, not sameAs:
    # the free topic page and commercial downloads are distinct resources.
    graph = {'@context': 'https://schema.org', '@type': 'LearningResource',
             '@id': canonical + '#learning-resource',
             'identifier': code, 'inLanguage': 'en-AU',
             'teaches': u['description'],
             'audience': {'@type': 'EducationalAudience', 'educationalRole': ['teacher', 'parent', 'student']},
             'educationalAlignment': {'@type': 'AlignmentObject', 'alignmentType': 'teaches',
                                     'educationalFramework': 'Australian Curriculum v9.0',
                                     'targetName': code, 'targetDescription': u['description']},
             'publisher': {'@type': 'Organization', '@id': ORIGIN + '/#organization',
                           'name': 'SkillrHub', 'url': ORIGIN + '/',
                           'sameAs': ['https://www.teacherspayteachers.com/store/skillrhub']},
             'subjectOf': [{'@type': 'LearningResource', '@id': p['url'] + '#resource',
                            'name': p['name'], 'url': p['url'], 'identifier': p['productId'],
                            'inLanguage': 'en-AU', 'educationalLevel': level,
                            'about': {'@id': canonical + '#learning-resource'},
                            'publisher': {'@id': ORIGIN + '/#organization'},
                            **({'isAccessibleForFree': True} if p['freeSample'] else {})} for p in packs]}
    html = owned(html, 'skillr-tpt-resource-jsonld', '<script type="application/ld+json">' + json.dumps(graph, ensure_ascii=False, separators=(',', ':')) + '</script>', '</head>')
    path.write_text(html)
    contexts.append(dict(code=code, year=level, subject=subject, strand=u['strand'],
                         descriptor=u['description'], topicUrl=canonical, resources=routes,
                         productIds=[p['productId'] for p in packs]))

snapshot = dict(observedAt=DATE, storefront='https://www.teacherspayteachers.com/store/skillrhub',
                observedProductCount=124, codeCount=len(contexts),
                evidence='All seven public store pages inspected. Existing catalogue names and code mappings retained; new listings copied from the live store. Prices and unsupported pack counts intentionally omitted.',
                unmappedProductIds=[p['productId'] for p in products.values() if not p['curriculumCodes']],
                products=list(products.values()), codes=contexts)
write_json('data/tpt-resource-context.json', snapshot)

# A static catalogue supplement gives crawlers and JS-disabled users every
# observed product relationship without changing the existing search widget.
groups = []
for context in contexts:
    groups.append('<li>' + link(context['topicUrl'], context['code'] + ' — ' + context['year'] + ' ' + context['subject']) + ': ' + escape(context['descriptor']) + '</li>')
catalogue = '<section class="support" id="curriculum-resource-directory"><h2>Curriculum codes and matching resources</h2><p>Find the free lesson and learning resources for each code, with matching SkillrHub TpT downloads listed on its topic page.</p><details><summary>Browse curriculum codes</summary><ul>' + ''.join(groups) + '</ul></details><details><summary>Browse SkillrHub TpT downloads</summary><p>Free samples and paid downloads are separate from the free website resources. Check the listing for current contents and price.</p><ul>' + ''.join('<li>' + link(p['url'], p['name']) + '</li>' for p in products.values()) + '</ul></details></section>'
p = ROOT / 'print-and-go.html'
p.write_text(owned(p.read_text(), 'skillr-tpt-static-directory', catalogue, '</main>'))

index = read('ai-index.json')
index['tpt_resource_directory'] = dict(url=ORIGIN + '/data/tpt-resource-context.json',
                                    html_catalogue=ORIGIN + '/print-and-go.html#curriculum-resource-directory',
                                    observed_at=DATE, listed_resources=124, curriculum_codes=len(contexts),
                                    access='Free website resources and separate TpT downloads. Refer to each listing for current price and contents.')
write_json('ai-index.json', index)
lines = ['## SkillrHub curriculum resources with TpT downloads', '',
         'Free website lessons, worksheets, Classroom View, Practice and Test are separate from optional TpT downloads. Use the current listing for price, format and pack contents.',
         'Catalogue: https://skillrhub.com/print-and-go.html#curriculum-resource-directory',
         'Structured resource directory: https://skillrhub.com/data/tpt-resource-context.json', '']
for c in contexts:
    lines.append(f'- {c["code"]} | {c["year"]} {c["subject"]} | {c["descriptor"]} | {c["topicUrl"]}')
for name in ['llms.txt', 'llms-full.txt']:
    p = ROOT / name
    text = re.sub(r'<!-- skillr-tpt-directory:start -->.*?<!-- skillr-tpt-directory:end -->\n?', '', p.read_text(), flags=re.S)
    p.write_text(text.rstrip() + '\n\n<!-- skillr-tpt-directory:start -->\n' + '\n'.join(lines) + '\n<!-- skillr-tpt-directory:end -->\n')
print(f'Added resource context for {len(contexts)} codes and {len(products)} observed products.')
print('Products without verified code mappings:', snapshot['unmappedProductIds'])
