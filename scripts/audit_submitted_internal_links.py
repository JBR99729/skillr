#!/usr/bin/env python3
"""Audit static links from pages in the submitted sitemap; exclude sitemap-only discovery."""
import html
import json
import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://skillrhub.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

def file_for(path):
    file = ROOT / (unquote(path).lstrip('/') or 'index.html')
    return file / 'index.html' if path.endswith('/') and path != '/' else file

def audit():
    urls = []
    for child in ET.parse(ROOT / 'sitemap.xml').findall('s:sitemap/s:loc', NS):
        urls.extend(node.text for node in ET.parse(ROOT / child.text.rsplit('/', 1)[-1]).findall('s:url/s:loc', NS))
    incoming, missing = defaultdict(set), defaultdict(set)
    for url in urls:
        path = urlparse(url).path
        source = file_for(path).read_text()
        source = re.sub(r'<!--.*?-->|<script\b.*?</script>', '', source, flags=re.S | re.I)
        for href in re.findall(r'<a\b[^>]*href=["\']([^"\']+)', source, re.I):
            target = urlparse(urljoin(url, html.unescape(href)))
            if target.netloc != 'skillrhub.com':
                continue
            route = unquote(target.path)
            if not file_for(route).exists():
                missing[route].add(path)
            if path != '/sitemap.html' and route != path:
                incoming[BASE + route.removesuffix('index.html')].add(path)
    return {
        'submitted_pages': len(urls),
        'scope': 'Static anchor links from submitted canonical pages; sitemap.html excluded as an incoming source. External URLs and fragment IDs are not audited.',
        'without_incoming_links': [url for url in urls if not incoming[url]],
        'missing_local_targets': {path: sorted(sources) for path, sources in sorted(missing.items())},
    }

if __name__ == '__main__':
    result = audit()
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['missing_local_targets'] or result['without_incoming_links']))
