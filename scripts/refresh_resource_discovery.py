#!/usr/bin/env python3
"""Refresh changed copy in discovery data without changing URL/canonical policy."""
import json
import re
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path

import generate_sitemap as sitemap
import normalize_resource_messaging as policy

ROOT = Path(__file__).resolve().parents[1]


def main():
    changed = set(subprocess.check_output(['git', 'diff', 'HEAD', '--name-only', '--', '*.html'], cwd=ROOT, text=True).splitlines())
    index_path = ROOT / 'assets/site-search-index.json'
    obj = json.loads(index_path.read_text()); items = obj['items']
    items[:] = [x for x in items if not re.search(r'^/quiz/.+/(?:worksheet|homework)/(?:index\.html)?$', x['u'])]
    items[:] = [x for x in items if x['u'] != '/year1/maths/ac9m1n03-skip-counting-and-equal-groups/quick-check/']
    seen = {x['u'] for x in items}
    for item in items:
        if item.get('e'):
            continue
        name = item['u'].split('?', 1)[0].lstrip('/')
        if not name or name.endswith('/'):
            name += 'index.html'
        if name not in changed or not (ROOT / name).is_file():
            continue
        source = (ROOT / name).read_text()
        item['t'] = sitemap.page_title(source, Path(name)); item['x'] = sitemap.visible_search_text(source)
    added_urls = []
    for p in json.loads((ROOT / 'data/print-and-go-products.json').read_text()):
        if p.get('listingConfirmedAt') != '2026-11-15' or not p.get('url', '').startswith('/'):
            continue
        name = p['url'].lstrip('/') + 'index.html'; source = (ROOT / name).read_text()
        if p['url'] not in seen:
            items.append({'t': sitemap.page_title(source, Path(name)), 'u': p['url'], 'x': sitemap.visible_search_text(source)})
            seen.add(p['url'])
        added_urls.append(sitemap.BASE + p['url'])
    index_path.write_text(json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n')
    path = ROOT / 'sitemap-site.xml'; source = path.read_text()
    ns = '{http://www.sitemaps.org/schemas/sitemap/0.9}'
    existing = {loc.text for loc in ET.fromstring(source).iter(ns + 'loc')}
    insert = ''.join('  <url><loc>' + url + '</loc><lastmod>2026-11-15</lastmod></url>\n' for url in added_urls if url not in existing)
    if insert:
        path.write_text(source.replace('</urlset>', insert + '</urlset>'))
        path = ROOT / 'sitemap.xml'; source = path.read_text()
        source = re.sub(r'(<loc>https://skillrhub\.com/sitemap-site\.xml</loc>\s*<lastmod>)[^<]+', r'\g<1>2026-11-15', source)
        path.write_text(source)
    retired_count = 0
    for path in ROOT.glob('sitemap-*.xml'):
        source = path.read_text()
        def retire(m):
            nonlocal retired_count
            if re.search(r'<loc>https://skillrhub\.com/quiz/.+?/(?:worksheet|homework)/(?:index\.html)?</loc>', m[0]) or '<loc>https://skillrhub.com/year1/maths/ac9m1n03-skip-counting-and-equal-groups/quick-check/</loc>' in m[0]:
                retired_count += 1
                return ''
            return m[0]
        after = re.sub(r'\s*<url>[\s\S]*?</url>', retire, source)
        if after != source:
            path.write_text(after)
    # Published machine-readable marketing descriptions follow the same model.
    for name in ['ai-index.json', 'ai-international.json', 'ai-underserved-markets.json']:
        path = ROOT / name
        if path.exists():
            before = json.loads(path.read_text()); after = policy.json_copy(before)
            if before != after:
                path.write_text(json.dumps(after, ensure_ascii=False, indent=2) + '\n')
    for name in ['llms.txt', 'llms-full.txt', 'ai-site-map.md']:
        path = ROOT / name; source = path.read_text()
        # Protect all source URLs, including legacy slugs containing "free".
        parts = re.split(r'(https?://[^\s)<>]+)', source)
        after = ''.join(part if part.startswith(('https://', 'http://')) else policy.wording(part) for part in parts)
        if source != after:
            path.write_text(after)
    print(json.dumps({'search_entries': len(items), 'new_product_urls': len(added_urls), 'sitemap_entries_added': len(added_urls) - len(set(added_urls) & existing), 'withdrawn_worksheet_urls_removed': retired_count}))


if __name__ == '__main__':
    main()
