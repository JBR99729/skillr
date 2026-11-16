#!/usr/bin/env python3
"""Connect eight observed listings without rebuilding existing teaching content."""
import copy
import html
import json
import re
from pathlib import Path

from sync_missing_tpt_products import product_page, update_folders, link_topics
from build_free_tpt_samples import main as build_directory
from apply_free_sample_topic_seo import update, targets
from update_topic_learning_seo import REVIEWED_TITLES, REVIEWED_DESCRIPTIONS
from generate_sitemap import page_title, visible_search_text

ROOT = Path(__file__).resolve().parents[1]
PATH_COPY = 'Use the topic explanations and worked examples, try available online practice, then use the free sample for paper practice at home or in class. The optional complete paid pack provides the broader worksheet sequence and answers described in its listing.'


def read(name):
    return json.loads((ROOT / name).read_text())


def save(name, value):
    (ROOT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def metadata(source, title, description):
    source = re.sub(r'<title>.*?</title>', lambda _: '<title>' + html.escape(title) + '</title>', source, count=1, flags=re.S)
    def meta(m):
        tag = m[0]; key = re.search(r'(?:name|property)=[\"\']([^\"\']+)', tag, re.I)
        if key and key[1] in ['description', 'og:description', 'twitter:description', 'og:title', 'twitter:title']:
            value = title if key[1].endswith(':title') else description
            tag = re.sub(r'content=([\"\']).*?\1', lambda _: 'content="' + html.escape(value, quote=True) + '"', tag, flags=re.S)
        return tag
    source = re.sub(r'<meta\b[^>]*>', meta, source, flags=re.I)
    canonical = re.search(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"', source)
    def schema(m):
        obj = json.loads(m[2]); original = json.dumps(obj, sort_keys=True)
        def visit(x):
            if isinstance(x, list):
                for v in x: visit(v)
            elif isinstance(x, dict):
                if canonical and x.get('@type') == 'LearningResource' and x.get('url') == canonical[1] and not str(x.get('@id', '')).endswith('#curriculum-equivalents'):
                    x['description'] = description
                for v in x.values(): visit(v)
        visit(obj)
        if json.dumps(obj, sort_keys=True) == original: return m[0]
        pretty = '\n' in m[2].strip()
        return m[1] + ('\n' if pretty else '') + json.dumps(obj, ensure_ascii=False, indent=2 if pretty else None, separators=None if pretty else (',', ':')).replace('</', '<\\/') + ('\n' if pretty else '') + m[3]
    return re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)([\s\S]*?)(</script>)', schema, source)


def main():
    rows = read('data/tpt-new-products-20261116.json')['products']
    catalogue = read('data/print-and-go-products.json')
    known = {p['tptUrl'].rsplit('-', 1)[1]: p for p in catalogue}
    units = {u['code']: u for u in read('data/curriculum-units.json')['units']}
    observed = read('data/tpt-free-resources-20261116.json')
    observed_ids = {r['productId'] for r in observed['products']}
    added = []
    for row in rows:
        pid = row['productId']
        if pid not in known:
            p = dict(id='tpt-' + pid, title=row['title'], year=row['year'], yearLabel='Year ' + str(row['year']), subject='maths', subjectLabel='Maths',
                     topics=sorted(set(re.findall(r'[a-z]{3,}', row['title'].lower()))), curriculumCodes=[row['code']], description=row['description'],
                     url='/products/tpt-' + pid + '/', tptUrl=row['url'], image=row['image'], price=row['price'], currency='USD', available=True,
                     free=row['free'], resourceType=row['kind'], isBundle=row['kind'] == 'bundle', hasSlides=row['kind'] in ['bundle', 'teaching-slides'],
                     hasPrintables=row['kind'] != 'teaching-slides', market='au', listingConfirmedAt='2026-11-16', tptObservedAt='2026-11-16')
            p['format'] = 'Flattened PowerPoint and PDF' if row['kind'] == 'teaching-slides' else 'Teaching slides and worksheet pack' if row['kind'] == 'bundle' else 'A4 worksheet PDF'
            if row['free']:
                p['verifiedListingFacts'] = {'pages': row['pages'], 'practiceQuestions': row['practiceQuestions'], 'answerKey': 'Included', 'fileFormat': 'PDF'}
                p['includes'] = [str(row['pages']) + ' A4 pages', str(row['practiceQuestions']) + ' practice questions', 'Teaching/reference pages', 'Parent and teacher guide', 'Separate matching answer pages']
                p['topicLearningPath'] = PATH_COPY
            elif pid == '18367947':
                p.update(listPrice='20.00', packCount=2, includedProductIds=['18367881', '18349570'])
                p['includes'] = ['126-slide teaching resource with matching 126-page PDF', 'Companion AC9M5N07 worksheet pack', '20% bundle saving; check included products before buying']
            elif pid == '18367881':
                p['verifiedListingFacts'] = {'slides': 126, 'pdfPages': 126}
                p['includes'] = ['126-slide flattened PowerPoint', 'Matching 126-page PDF', '18 teaching models', '36 worked examples', '18 guided tries with explained checks']
            else:
                p['verifiedListingFacts'] = {'pages': 92, 'practiceQuestions': 90, 'testQuestions': 15, 'investigations': 4}
                p['includes'] = ['92-page A4 PDF', '90 practice questions', 'Four investigations', 'Separate 15-question assessment', 'Answer keys']
            catalogue.append(p); known[pid] = p; added.append(p)
        if row['free'] and pid not in observed_ids:
            observed['products'].append({k: row[k] for k in ['productId', 'title', 'url', 'image', 'text']}); observed_ids.add(pid)
    assert len(catalogue) == len({p['tptUrl'].rsplit('-', 1)[1] for p in catalogue})
    observed['expectedCount'] = len(observed['products'])
    observed['verificationNote'] = 'Original full Free-filter inventory retained; five additional samples individually published and verified FREE on 16 November 2026.'
    save('data/print-and-go-products.json', catalogue); save('data/tpt-free-resources-20261116.json', observed)
    short_names = {'18368851': 'Free Year 1 Skip Counting Worksheets', '18368872': 'Free Year 1 Sharing & Grouping Worksheets', '18368906': 'Free Year 1 Position & Direction Worksheets', '18368917': 'Free Year 2 Place Value Worksheets', '18368929': 'Free Year 2 Maps & Plans Worksheets', '18367947': 'Year 5 Division Slides & Worksheets Bundle', '18367881': 'Year 5 Division Teaching Slides', '18368437': 'Year 5 Fact Families Worksheets & Test'}
    for p in added:
        product_page(p, units)
        path = ROOT / p['url'].strip('/') / 'index.html'; source = path.read_text()
        includes = '<h2>What is included</h2><ul>' + ''.join('<li>' + html.escape(x) + '</li>' for x in p['includes']) + '</ul>'
        source = source.replace('<p class="price">', includes + '<p class="price">', 1)
        if p['free']:
            source = source.replace('US$0.00', 'FREE').replace('This is a separately purchased resource.', 'This is a free selected-focus sample, not the complete paid pack. TpT requires an account to download.').replace('Preview and buy on TpT', 'Download free sample on TpT').replace('Teachers Pay Teachers handles checkout and file delivery.', 'Teachers Pay Teachers handles the free download. Complete paid packs are optional.')
        path.write_text(source)
    for row in rows:
        p = known[row['productId']]; path = ROOT / p['url'].strip('/') / 'index.html'
        path.write_text(metadata(path.read_text(), short_names[row['productId']] + ' | ' + row['code'] + ' | SkillrHub', p['description']))
    update_folders(catalogue); build_directory()
    matched = targets(); pages = {}; checks = []
    for row in rows:
        if not row['free']: continue
        code = row['code']; unit, samples = matched[code]; path = ROOT / unit['url'].strip('/') / 'index.html'; before = path.read_text()
        after = update(before, unit, samples)
        for pattern in [r'<h[1-6]\b[^>]*>[\s\S]*?</h[1-6]>', r'<summary\b[^>]*>[\s\S]*?</summary>', r'<link[^>]*rel="canonical"[^>]*>', r'<meta[^>]*name="robots"[^>]*>']:
            assert re.findall(pattern, before) == re.findall(pattern, after), (code, pattern)
        path.write_text(after); pages[unit['url']] = (path, after)
        checks.append({'code': code, 'freeListingId': row['productId'], 'existingHeadingsSummariesCanonicalRobotsPreserved': True})
    paid_codes = {'AC9M5A01', 'AC9M5N07'}; matching = []
    for p in catalogue:
        codes = paid_codes.intersection(p.get('curriculumCodes', []))
        if codes and not p.get('free'):
            q = copy.deepcopy(p); q['curriculumCodes'] = sorted(codes); matching.append(q)
    link_topics(matching, {p['tptUrl'].rsplit('-', 1)[1] for p in matching}, units)
    for code in paid_codes:
        unit = units[code]; path = ROOT / unit['url'].strip('/') / 'index.html'; source = path.read_text()
        source = metadata(source, REVIEWED_TITLES[code], REVIEWED_DESCRIPTIONS[code])
        bridge = 'Learn with the worked examples, try available online practice, and use the linked free TpT sample for a first paper activity. The optional complete paid pack has 90 practice questions, four investigations and a separate assessment.' if code == 'AC9M5A01' else 'Learn division strategies through the worked examples, try available online practice, and choose optional paid worksheets for paper learning. The 126-slide teaching resource and the slides-and-worksheets bundle are separate purchase options; check overlap before buying.'
        marker = '<!-- learning-practice-worksheets-20261116 -->'
        if marker not in source: source = re.sub(r'(<h1\b[^>]*>[\s\S]*?</h1>\s*<p\b[^>]*>[\s\S]*?</p>)', lambda m: m[1] + marker + '<p>' + bridge + '</p>', source, count=1)
        path.write_text(source); pages[unit['url']] = (path, source)
    for name in ['llms.txt', 'llms-full.txt']:
        path = ROOT / name; source = path.read_text()
        for a, b in [('67 separately listed resources', '72 separately listed resources'), ('64 printable worksheet resources', '69 printable worksheet resources'), ('61 Australian resources and 3 US resources', '66 Australian resources and 3 US resources'), ('Browse all 67 free TpT resources', 'Browse all 72 free TpT resources')]: source = source.replace(a, b)
        source = source.replace("checked against all four pages of the store's Free filter.", 'from the complete Free-filter review plus five newly published, individually verified samples.')
        if name == 'llms-full.txt' and rows[0]['url'] not in source:
            links = ''.join('- [' + r['title'] + '](' + r['url'] + '): ' + r['description'] + '\n' for r in rows if r['free'])
            source = source.replace('<!-- free-tpt-resources:end -->', links + '<!-- free-tpt-resources:end -->')
        block = '\n<!-- new-paid-products-20261116:start -->\n## New matching paid learning resources\n' + ''.join('- [' + r['title'] + '](' + r['url'] + '): ' + r['description'] + '\n' for r in rows if not r['free']) + '<!-- new-paid-products-20261116:end -->\n'
        source = re.sub(r'\n<!-- new-paid-products-20261116:start -->[\s\S]*?<!-- new-paid-products-20261116:end -->\n', '', source)
        path.write_text(source + block)
    ai = read('ai-index.json'); ai['free_tpt_resources'].update(total_resources=72, printable_worksheet_resources=69, australian_printable_resources=66)
    ai['new_tpt_products_20261116'] = [{'name': r['title'], 'url': r['url'], 'curriculum_code': r['code'], 'free': r['free'], 'resource_type': r['kind']} for r in rows]; save('ai-index.json', ai)
    for name, url in [('products/index.html', '/products/'), ('teach-and-explain.html', '/teach-and-explain.html'), ('worksheets/index.html', '/worksheets/')]:
        path = ROOT / name; pages[url] = (path, path.read_text())
    for row in rows:
        p = known[row['productId']]; path = ROOT / p['url'].strip('/') / 'index.html'; pages[p['url']] = (path, path.read_text())
    search = read('assets/site-search-index.json'); by_url = {i['u']: i for i in search['items'] if not i.get('e')}
    for url, (path, source) in pages.items():
        if url not in by_url:
            item = {'u': url}; search['items'].append(item); by_url[url] = item
        by_url[url].update(t=page_title(source, path), x=visible_search_text(source))
    (ROOT / 'assets/site-search-index.json').write_text(json.dumps(search, ensure_ascii=False, separators=(',', ':')) + '\n')
    path = ROOT / 'sitemap-site.xml'; source = path.read_text()
    for row in rows:
        url = 'https://skillrhub.com' + known[row['productId']]['url']
        if '<loc>' + url + '</loc>' not in source: source = source.replace('</urlset>', '<url><loc>' + url + '</loc><lastmod>2026-11-16</lastmod></url>\n</urlset>')
    path.write_text(source)
    changed_urls = {'https://skillrhub.com' + units[c]['url'] for c in {r['code'] for r in rows}}
    for path in ROOT.glob('sitemap-*.xml'):
        source = path.read_text()
        def lastmod(m):
            return re.sub(r'<lastmod>[^<]+</lastmod>', '<lastmod>2026-11-16</lastmod>', m[0]) if any('<loc>' + u + '</loc>' in m[0] for u in changed_urls) else m[0]
        after = re.sub(r'<url>[\s\S]*?</url>', lastmod, source)
        if after != source: path.write_text(after)
    save('docs/qa/2026-11-16-checked-free-samples-and-new-products.json', {'newListingIds': [r['productId'] for r in rows], 'freeCollectionCount': 72, 'topicChecks': checks, 'paidTopicCodes': sorted(paid_codes), 'basicTeacherQA': {'status': 'PASS', 'scope': 'Five sample PDFs; all 54 questions and all 55 rendered pages checked by separate AI reviewer before upload. No full paid-pack or human classroom approval claimed.'}, 'publicationStatus': 'Prepared; deployment must be verified separately.'})
    print('Updated eight products, five free-sample topics, two paid-resource topics and discovery inventories.')


if __name__ == '__main__':
    main()
