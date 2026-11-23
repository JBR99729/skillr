#!/usr/bin/env python3
"""Read the public TpT result cards and prove complete pagination/ID coverage.

This records observed listing facts. It never edits the published catalogue.
Requires beautifulsoup4, as does the historical store-capture command.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
import json
import math
from pathlib import Path
import re
from urllib.parse import urljoin
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.teacherspayteachers.com/store/skillrhub'


def fetch(page):
    url = BASE if page == 1 else f'{BASE}?page={page}'
    request = Request(url, headers={
        'User-Agent': 'SkillrHub catalogue check (+https://skillrhub.com/)',
        'Accept': 'text/html',
    })
    with urlopen(request, timeout=40) as response:
        source = response.read(4_000_001).decode('utf-8', 'replace')
        if response.status != 200 or len(source.encode('utf-8')) > 4_000_000:
            raise ValueError(f'Incomplete store response: page {page}')
    if 'data-testid="ProductRow"' not in source:
        raise ValueError(f'No public product cards on page {page}; stop and inspect the response')
    return source


def count(source):
    match = re.search(r'placeholder="Search all\s+(\d+)\s+resources"', source)
    if not match: raise ValueError('Cannot verify live store count')
    return int(match[1])


def parse(page, source, date):
    soup = BeautifulSoup(source, 'html.parser')
    rows = []
    for card in soup.select('[data-testid="ProductRow"]'):
        identifier = re.fullmatch(r'product-row-(\d{7,10})', card.get('id', ''))
        if not identifier: raise ValueError(f'Missing immutable product ID on page {page}')
        pid = identifier[1]
        heading = card.select_one('h2 a[href*="/Product/"]')
        image = card.select_one('picture img[src^="https://ecdn.teacherspayteachers.com/"]')
        description = card.select_one('[class*="cardDescription"]')
        sidebar = card.select_one('[data-testid="prc-sidebar"]')
        if not all((heading, image, description, sidebar)):
            raise ValueError(f'Incomplete card for {pid}')
        url = urljoin(BASE, heading['href'])
        if not re.fullmatch(r'https://www\.teacherspayteachers\.com/Product/[^?#]+-' + pid, url):
            raise ValueError(f'Unexpected checkout URL for {pid}')
        pricing = sidebar.get_text(' ', strip=True)
        free = bool(re.search(r'\bFREE\b', pricing, re.I))
        amounts = re.findall(r'\$([\d,]+(?:\.\d{2})?)', pricing)
        if not free and not amounts: raise ValueError(f'Unknown access status for {pid}')
        bundle = re.search(r'Bundle\s*\((\d+)\s+products?\)', card.get_text(' ', strip=True), re.I)
        rows.append({
            'productId': pid, 'title': heading.get_text(' ', strip=True),
            'url': url, 'image': image['src'], 'free': free, 'isBundle': bool(bundle),
            'packCount': int(bundle[1]) if bundle else None,
            'description': description.get_text(' ', strip=True),
            'text': heading.get_text(' ', strip=True) + '\n' + description.get_text(' ', strip=True),
            'observedAt': date, 'storePage': page,
        })
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--date', default=str(datetime.now(ZoneInfo('Australia/Sydney')).date()))
    args = parser.parse_args()
    date = args.date
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date): parser.error('Expected YYYY-MM-DD')
    first = fetch(1)
    expected = count(first)
    if not 1 <= expected <= 10_000: raise ValueError('Unexpected store size')
    pages = math.ceil(expected / 20)
    captured = {1: parse(1, first, date)}
    with ThreadPoolExecutor(max_workers=3) as pool:
        tasks = {pool.submit(fetch, n): n for n in range(2, pages + 1)}
        for task in as_completed(tasks):
            n = tasks[task]
            captured[n] = parse(n, task.result(), date)
            print(f'Captured page {n}/{pages}', flush=True)
    rows = []
    for n in range(1, pages + 1):
        if len(captured[n]) != min(20, expected - 20 * (n - 1)):
            raise ValueError(f'Incomplete pagination at page {n}')
        rows.extend(captured[n])
    ids = [r['productId'] for r in rows]
    if len(rows) != expected or len(set(ids)) != expected:
        raise ValueError('Missing or repeated product IDs across store pages')
    if count(fetch(1)) != expected:
        raise ValueError('Store changed during capture; review/restart before importing')
    catalogue = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
    known = {re.search(r'-(\d+)$', p['tptUrl'])[1] for p in catalogue}
    if len(known) != len(catalogue): raise ValueError('Existing catalogue has duplicate product IDs')
    old = {re.search(r'-(\d+)$', p['tptUrl'])[1]: p for p in catalogue}
    report = {
        'auditedAt': date, 'storeListings': expected, 'storePagesVerified': pages,
        'previousCatalogueEntries': len(catalogue),
        'missingIds': sorted(set(ids) - known, key=int),
        'previousCatalogueIdsNotInCurrentStore': sorted(known - set(ids), key=int),
        'freeStoreListings': sum(r['free'] for r in rows),
        'pricePolicy': 'No numerical prices published; view the current price on the linked TpT listing.',
        'changedTitles': [r['productId'] for r in rows if r['productId'] in old and old[r['productId']]['title'] != r['title']],
        'source': 'Public server-rendered TpT result cards; full pagination; immutable product IDs; store count rechecked after capture',
    }
    stamp = date.replace('-', '')
    snapshot = {'storefront': BASE, 'auditedAt': date, 'expectedCount': expected, 'pages': pages,
                'source': report['source'], 'products': rows}
    (ROOT / f'data/tpt-observed-store-{stamp}.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n')
    (ROOT / f'docs/qa/{date}-tpt-scan.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({k: v for k, v in report.items() if not isinstance(v, list)}, indent=2))
    print(json.dumps({k: len(v) for k, v in report.items() if isinstance(v, list)}, indent=2))


if __name__ == '__main__': main()
