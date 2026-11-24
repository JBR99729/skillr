#!/usr/bin/env python3
"""Check observed coverage, unique IDs, folders, and reciprocal topic links."""
import json
import re
from collections import Counter
from pathlib import Path
from html.parser import HTMLParser

import sync_missing_tpt_products as sync

ROOT = sync.ROOT


class Cards(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.ids = []; self.links = []; self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'article' and attrs.get('data-product-id'):
            self.ids.append(attrs['data-product-id'])
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])


def main():
    from validate_tpt_catalogue import validate
    assert validate(), 'Current complete-store reconciliation failed'
    observed = json.loads(sync.SNAPSHOT.read_text()); products = json.loads(sync.CATALOGUE.read_text())
    ids = [sync.pid(p) for p in products]; by_id = dict(zip(ids, products))
    assert len(ids) == len(set(ids)), 'Duplicate listing ID'
    assert {r['productId'] for r in observed['products']} <= set(ids), 'Store listing missing'
    report = json.loads((ROOT / 'docs/qa/2026-11-15-paid-worksheets-tpt-sync.json').read_text())
    units = {u['code']: u for u in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    for pid in report['addedIds']:
        p = by_id[pid]; row = next(x for x in observed['products'] if x['productId'] == pid)
        assert p['market'] in ('au', 'us') and p['subject'] in ('maths', 'english', 'science')
        assert p['hasSlides'] or p['hasPrintables']
        page = (ROOT / p['url'].lstrip('/') / 'index.html').read_text()
        assert 'href="https://skillrhub.com' + p['url'] + '"' in page
        assert p['tptUrl'] in Cards(page).links
        for code in p['curriculumCodes']:
            if code in units:
                route = units[code]['url']; topic = (ROOT / route.lstrip('/') / 'index.html').read_text()
                links = Cards(topic).links
                assert p['url'] in links or p['tptUrl'] in links, ('Missing topic to product link', pid, code)
                assert route in Cards(page).links, ('Missing product to topic link', pid, code)
                assert topic.count('data-tpt-listing-id="' + pid + '"') <= 1
                assert int(p['year']) == units[code]['yearNumber'] and p['subject'] == units[code]['subjectSlug']
            else:
                assert p['market'] == 'us' and re.fullmatch(r'\d+\.[A-Z]+\.[A-Z]\.\d+', code)
    for name, market, kind in [('products/index.html', '', ''), ('us-resources/index.html', 'us', ''), ('teach-and-explain.html', '', 'slides')]:
        parser = Cards((ROOT / name).read_text())
        assert not [pid for pid, n in Counter(parser.ids).items() if n > 1], ('Duplicate visible product cards', name)
        expected = {sync.pid(p) for p in products if p.get('available') and p.get('market') in ('au', 'us') and (not market or p.get('market') == market) and (not kind or sync.resource_format(p) == kind)}
        assert set(parser.ids) == expected, ('Static folder catalogue differs from live folder data', name)
    print(json.dumps({'store_listings_covered': len(observed['products']), 'new_products_checked': len(report['addedIds']),
                      'duplicate_listing_ids': 0, 'duplicate_visible_cards': 0, 'reciprocal_topic_links': 'passed',
                      'folder_and_format_assignments': 'passed', 'price_link_policy': 'passed'}))


if __name__ == '__main__':
    main()
