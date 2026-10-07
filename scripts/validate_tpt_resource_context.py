#!/usr/bin/env python3
"""Release check: factual additions must preserve all existing page content."""
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

root = Path(__file__).resolve().parents[1]
base = sys.argv[1] if len(sys.argv) > 1 else 'HEAD'
snapshot = json.loads((root / 'data/tpt-resource-context.json').read_text())
assert len(snapshot['products']) == snapshot['observedProductCount'] == 124
assert len({p['productId'] for p in snapshot['products']}) == 124
assert len(snapshot['codes']) == snapshot['codeCount']
products = {p['productId']: p for p in snapshot['products']}

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.jsonld = [], [], []
        self.script = False
        self.payload = ''

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.script, self.payload = True, ''

    def handle_data(self, text):
        if self.script:
            self.payload += text

    def handle_endtag(self, tag):
        if tag == 'script' and self.script:
            self.jsonld.append(json.loads(self.payload))
            self.script = False

def normalise(s):
    return re.sub(r'\s+', ' ', re.sub(r'>\s+<', '><', s)).strip()

def without_owned(s):
    return re.sub(r'<!-- skillr-tpt-[\w-]+:start -->.*?<!-- skillr-tpt-[\w-]+:end -->', '', s, flags=re.S)

for c in snapshot['codes']:
    path = urlsplit(c['topicUrl']).path.strip('/') + '/index.html'
    current = (root / path).read_text()
    original = subprocess.check_output(['git', 'show', f'{base}:{path}'], cwd=root, text=True)
    assert normalise(without_owned(current)) == normalise(original), f'Existing HTML changed: {path}'
    page = Page()
    page.feed(current)
    assert page.ids.count('resource-facts') == 1, c['code']
    facts = re.search(r'<!-- skillr-tpt-resource-facts:start -->(.*?)<!-- skillr-tpt-resource-facts:end -->', current, re.S)[1]
    assert '\\frac' not in facts, c['code']
    facts_page = Page()
    facts_page.feed(facts)
    for pid in c['productIds']:
        assert c['code'] in products[pid]['curriculumCodes']
        assert products[pid]['url'] in facts_page.links
    for href in facts_page.links:
        url = urlsplit(href)
        if url.netloc and url.netloc != 'skillrhub.com':
            assert url.netloc == 'www.teacherspayteachers.com'
            continue
        target = root / url.path.strip('/')
        if target.is_dir():
            target /= 'index.html'
        assert target.is_file(), f'New broken link: {href}'
        if url.fragment:
            p = Page()
            p.feed(target.read_text())
            assert url.fragment in p.ids, href
    matching = [p for p in page.jsonld if p.get('@id') == c['topicUrl'] + '#learning-resource' and 'subjectOf' in p]
    assert len(matching) == 1
    assert matching[0]['identifier'] == c['code']
    assert matching[0]['teaches'] == c['descriptor']

catalogue = (root / 'print-and-go.html').read_text()
original = subprocess.check_output(['git', 'show', f'{base}:print-and-go.html'], cwd=root, text=True)
assert normalise(without_owned(catalogue)) == normalise(original)
directory = re.search(r'<!-- skillr-tpt-static-directory:start -->(.*?)<!-- skillr-tpt-static-directory:end -->', catalogue, re.S)[1]
page = Page()
page.feed(directory)
assert {p['url'] for p in products.values()} <= set(page.links)
assert {c['topicUrl'] for c in snapshot['codes']} <= set(page.links)
for name in ['llms.txt', 'llms-full.txt']:
    original = subprocess.check_output(['git', 'show', f'{base}:{name}'], cwd=root, text=True)
    assert normalise(without_owned((root / name).read_text())) == normalise(original), name
index = json.loads((root / 'ai-index.json').read_text())
del index['tpt_resource_directory']
original = json.loads(subprocess.check_output(['git', 'show', f'{base}:ai-index.json'], cwd=root, text=True))
assert index == original, 'Existing AI index changed'
print(f'Passed: {snapshot["codeCount"]} topic pages preserve existing HTML and SEO metadata; all added local links and JSON-LD valid; 124 listings represented.')
