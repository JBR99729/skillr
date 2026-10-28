#!/usr/bin/env python3
"""Check this 48-page patch against its original complete Git base."""
import argparse
from collections import Counter
import json
from pathlib import Path
import subprocess
from urllib.parse import urljoin, urlparse, unquote
import xml.etree.ElementTree as ET

from prepare_priority_seo_batch import ROOT, MANIFEST, visible

parser = argparse.ArgumentParser()
parser.add_argument('--base', required=True)
args = parser.parse_args()
profiles = json.loads(MANIFEST.read_text())['codes']
units = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
inventory = set()
for child in ET.parse(ROOT / 'sitemap.xml').getroot().findall('s:sitemap/s:loc', ns):
    inventory.update(n.text for n in ET.parse(ROOT / child.text.rsplit('/', 1)[-1]).getroot().findall('s:url/s:loc', ns))


def broken(soup, url):
    result = set()
    for el in soup.select('[href], img[src]'):
        href = el.get('href', el.get('src', ''))
        parsed = urlparse(urljoin(url, href))
        if parsed.netloc != 'skillrhub.com':
            continue
        path = ROOT / unquote(parsed.path).lstrip('/')
        if parsed.path.endswith('/'):
            path /= 'index.html'
        if not path.exists():
            result.add(href)
        elif parsed.fragment and path.suffix == '.html':
            target = soup if parsed.path == urlparse(url).path else visible(path.read_text())
            if not target.find(id=unquote(parsed.fragment)) and not target.find(attrs={'name': unquote(parsed.fragment)}):
                result.add(href)
    return result


def lesson(soup):
    guide = soup.select_one('#topic-guide')
    assert guide, 'Missing static learning guide'
    # Both approved shells keep exactly the same authored teaching body.
    for el in guide.select('.source-development-notes, [data-seo-related]'):
        el.decompose()
    return guide.get_text(' ', strip=True)


rows = []
for p in profiles:
    u = units[p['code']]
    relative = u['url'].lstrip('/') + 'index.html'
    original = subprocess.check_output(['git', 'show', args.base + ':' + relative], cwd=ROOT, text=True)
    current = (ROOT / relative).read_text()
    a, b = visible(original), visible(current)
    url = 'https://skillrhub.com' + u['url']
    assert b.title.get_text() == p['title'] + ' | ' + p['code'], p['code']
    assert b.select_one('.curriculum-hero__lead').get_text() == p['introduction'], p['code']
    assert len(b.find_all('h1')) == 1 and b.h1.get_text() == a.h1.get_text(), p['code']
    assert b.select_one('link[rel="canonical"]')['href'] == a.select_one('link[rel="canonical"]')['href'] == url, p['code']
    assert b.select_one('meta[name="robots"]')['content'] == a.select_one('meta[name="robots"]')['content'], p['code']
    assert 'noindex' not in b.select_one('meta[name="robots"]')['content'], p['code']
    assert url in inventory, p['code']
    assert {i.get('src') for i in a.find_all('img')} == {i.get('src') for i in b.find_all('img')}, p['code']
    assert [s.get('src') for s in a.find_all('script', src=True)] == [s.get('src') for s in b.find_all('script', src=True)], p['code']
    assert not b.select_one('.source-development-notes'), p['code']
    before_links = {x.get('href') for x in a.find_all('a') if not x.find_parent(class_='source-development-notes')}
    assert before_links <= {x.get('href') for x in b.find_all('a')}, p['code']
    for script in b.select('script[type="application/ld+json"]'):
        json.loads(script.string or script.get_text())
    before_ids, after_ids = Counter(x['id'] for x in a.select('[id]')), Counter(x['id'] for x in b.select('[id]'))
    assert not {k for k, v in after_ids.items() if v > max(1, before_ids[k])}, p['code']
    new_broken = broken(b, url) - broken(a, url)
    assert not new_broken, (p['code'], new_broken)
    before_lesson, after_lesson = lesson(a), lesson(b)
    assert before_lesson == after_lesson, (p['code'], 'Authored lesson content changed')
    rows.append({'code': p['code'], 'url': url, 'static_teaching_preserved': True, 'canonical_robots_h1_images_scripts_preserved': True, 'original_resource_links_preserved': True, 'new_broken_links': 0, 'in_root_sitemap': True})

out = ROOT / 'docs/qa/seo-priority-48-20261028-checks.json'
out.write_text(json.dumps({'base': args.base, 'passed': len(rows), 'pages': rows, 'limits': ['No question banks or teacher presentations were changed or independently recertified.', 'Local connected-browser preview could not reach the container server; live browser verification is recorded separately.', 'Historical impressions are not keyword search-volume estimates.']}, indent=2) + '\n')
print(f'PASS: {len(rows)}/48 pages; static teaching, resource paths, indexability and sitemap inclusion preserved; no new broken internal links.')
