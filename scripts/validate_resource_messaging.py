#!/usr/bin/env python3
"""Verify SEO-copy repairs preserve site identity, lessons and product offers."""
import argparse
import html
import json
import re
import subprocess
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

import normalize_resource_messaging as policy

ROOT = policy.ROOT


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.canonical = []; self.robots = []; self.ids = []
        self.links = []; self.scripts = []; self.json = []; self._script = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            self.ids.append(a['id'])
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a.get('href'))
        if tag == 'meta' and a.get('name', '').lower() == 'robots':
            self.robots.append(a.get('content'))
        if tag == 'a':
            self.links.append(a.get('href'))
        if tag == 'script':
            self._script = [a, '']

    def handle_data(self, data):
        if self._script is not None:
            self._script[1] += data

    def handle_endtag(self, tag):
        if tag == 'script' and self._script is not None:
            attrs, source = self._script
            if attrs.get('type', '').lower() == 'application/ld+json':
                try:
                    self.json.append(json.loads(source))
                except ValueError:
                    self.json.append({'invalid-existing-json': source})
            else:
                self.scripts.append((attrs, source))
            self._script = None


def product_nodes(obj):
    if isinstance(obj, list):
        return [p for x in obj for p in product_nodes(x)]
    if isinstance(obj, dict):
        if obj.get('@type') in ('Product', 'Offer', 'AggregateOffer'):
            return [obj]
        return [p for v in obj.values() for p in product_nodes(v)]
    return []


def original_sources(base, names):
    payload = ''.join(base + ':' + n + '\n' for n in names).encode()
    out = subprocess.check_output(['git', 'cat-file', '--batch'], input=payload, cwd=ROOT)
    pos = 0
    for name in names:
        end = out.index(b'\n', pos); header = out[pos:end].split()
        assert header[-1] != b'missing', name
        size = int(header[-1]); pos = end + 1
        yield name, out[pos:pos + size].decode()
        pos += size + 1


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--base', default='HEAD')
    args = parser.parse_args()
    names = subprocess.check_output(['git', 'diff', args.base, '--diff-filter=M', '--name-only', '--', '*.html'], cwd=ROOT, text=True).splitlines()
    assert names, 'Expected a reviewed HTML copy change'
    for name, before in original_sources(args.base, names):
        after = (ROOT / name).read_text()
        old, new = Page(before), Page(after)
        assert old.canonical == new.canonical, ('Canonical changed', name)
        if re.fullmatch(r'quiz/.+/(?:worksheet|homework)/index\.html', name) or name == 'year1/maths/ac9m1n03-skip-counting-and-equal-groups/quick-check/index.html':
            assert new.robots and all('noindex' in r for r in new.robots), ('Withdrawn worksheet must not be indexed', name)
        else:
            assert old.robots == new.robots, ('Indexing directive changed', name)
        assert not Counter(old.ids) - Counter(new.ids), ('Authored section/element removed', name)
        assert old.scripts == new.scripts, ('Runtime or authored question data changed', name)
        assert product_nodes(old.json) == product_nodes(new.json), ('Product price/contents changed', name)
        assert 'RESOURCE-CATALOGUE-COPY-' not in after, ('Unrestored catalogue block', name)
        removed = Counter(old.links) - Counter(new.links)
        added = Counter(new.links) - Counter(old.links)
        for href in removed:
            if href == '/print-and-go.html':
                continue  # Replaced by a newly verified exact-code product.
            if name.startswith('year2/maths/ac9') and href and href.startswith('https://app.skillrhub.com/') and '?try=1&skill=' in href:
                assert any(x and x.startswith(href) for x in new.links), ('Lost verified practice entrance', name)
                continue
            assert href and re.search(r'/ac9[a-z0-9]+/(?:worksheet|homework)/(?:index\.html)?(?:[?#].*)?$', href, re.I), ('Unrelated link changed', name, href)
        for href in added:
            if href and href.startswith('https://www.teacherspayteachers.com/Product/'):
                assert href in {p['tptUrl'] for p in policy.CATALOGUE}, ('Unverified product link', name, href)
                code = policy.CODE.search(name)
                if code:
                    assert any(p['tptUrl'] == href and code[0].upper() in p.get('curriculumCodes', []) and p.get('hasPrintables') and not p.get('free') for p in policy.CATALOGUE), ('External worksheet belongs to another code', name, href)
                continue
            if href and href.startswith('/product.html?id='):
                assert href in {p.get('url') for p in policy.CATALOGUE}, ('Unknown legacy product entry', href)
                continue
            assert href and (href.startswith('/products/') or href == '/print-and-go.html'), ('Unexpected new destination', name, href)
            target = ROOT / href.lstrip('/')
            if href.endswith('/'):
                target /= 'index.html'
            assert target.is_file(), ('Broken new link', name, href)
        if 'human-search page' in before:
            assert 'human-search page' not in after, name
    # The owner's actual commercial records and the exercise banks are unchanged.
    changed = subprocess.check_output(['git', 'diff', args.base, '--name-only'], cwd=ROOT, text=True).splitlines()
    if 'data/print-and-go-products.json' in changed:
        before = json.loads(subprocess.check_output(['git', 'show', args.base + ':data/print-and-go-products.json'], cwd=ROOT, text=True))
        after = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
        assert after[:len(before)] == before, 'Existing catalogue records changed'
        ids = [re.search(r'-(\d+)$', p['tptUrl'])[1] for p in after]
        assert len(ids) == len(set(ids)), 'Duplicate TpT listing IDs'
    assert not any(re.search(r'questions\.js$|assessment-banks/|curriculum-question-banks/', n) for n in changed)
    # Exact-code links must not substitute another topic or a teaching-slide-only item.
    for code in policy.BANKS:
        product = policy.pack_for(code)
        if product:
            assert product['available'] and product.get('hasPrintables') and not product.get('free')
            assert code in product['curriculumCodes']
    assert policy.pack_url('AC9NOTPUBLISHED') == '/print-and-go.html'
    print(json.dumps({'html_pages_checked': len(names), 'canonicals_and_indexing': 'preserved',
                      'sections_runtime_and_question_data': 'preserved', 'product_offers': 'preserved',
                      'new_purchase_destinations': 'valid', 'question_banks': 'unchanged'}))


if __name__ == '__main__':
    main()
