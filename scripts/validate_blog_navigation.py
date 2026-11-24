#!/usr/bin/env python3
"""Check published blog links, section targets and static breadcrumb parity."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

from discovery_navigation import ROOT, ORIGIN, normalize, sitemap_urls


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.schemas, self.crumbs = set(), [], [], []
        self.robots, self.canonical = [], ''
        self.styles, self.nav_depth, self.current, self.script = 0, 0, None, None
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'a' and a.get('name'): self.ids.add(a['name'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'meta' and a.get('name', '').lower() in ('robots', 'googlebot'):
            self.robots.append(a.get('content', '').lower())
        if tag == 'link' and 'canonical' in a.get('rel', '').split(): self.canonical = a.get('href', '')
        if tag == 'link' and a.get('href') == '/assets/blog-navigation.css': self.styles += 1
        if tag == 'nav':
            if self.nav_depth: self.nav_depth += 1
            elif a.get('aria-label', '').lower() == 'breadcrumb':
                self.nav_depth = 1
                self.crumbs.append([])
        if self.nav_depth and tag == 'li':
            self.current = {'name': '', 'href': None, 'current': a.get('aria-current') == 'page'}
            self.crumbs[-1].append(self.current)
        if self.current and tag == 'a': self.current['href'] = a.get('href')
        if tag == 'script' and a.get('type', '').lower() == 'application/ld+json': self.script = []

    def handle_endtag(self, tag):
        if tag == 'nav' and self.nav_depth: self.nav_depth -= 1
        if tag == 'li': self.current = None
        if tag == 'script' and self.script is not None:
            self.schemas.append(json.loads(''.join(self.script)))
            self.script = None

    def handle_data(self, text):
        if self.current: self.current['name'] += text
        if self.script is not None: self.script.append(text)

    @property
    def indexable(self):
        return not any('noindex' in r for r in self.robots)


def breadcrumb_nodes(value):
    if isinstance(value, dict):
        kinds = value.get('@type', [])
        if kinds == 'BreadcrumbList' or isinstance(kinds, list) and 'BreadcrumbList' in kinds:
            yield value
        for child in value.values(): yield from breadcrumb_nodes(child)
    elif isinstance(value, list):
        for child in value: yield from breadcrumb_nodes(child)


def resolve(url):
    p = urlsplit(url)
    if p.scheme not in ('https', 'http') or p.hostname not in ('skillrhub.com', 'www.skillrhub.com'): return None
    relative = unquote(p.path).lstrip('/')
    path = ROOT / (relative + 'index.html' if p.path.endswith('/') else relative)
    if not path.is_file() and path.is_dir(): path = path / 'index.html'
    return path, unquote(p.fragment)


def validate():
    paths = sorted(p for p in ROOT.rglob('*.html') if 'blogs' in p.relative_to(ROOT).parts)
    submitted, cache, errors, stats = sitemap_urls(), {}, [], Counter()

    def page(path):
        if path not in cache: cache[path] = Page(path)
        return cache[path]

    for path in paths:
        relative = path.relative_to(ROOT).as_posix()
        url = normalize(ORIGIN + relative)
        doc = page(path)
        stats['blog_pages'] += 1
        for href in doc.links:
            target = resolve(urljoin(url, href))
            if target is None: continue
            stats['internal_links'] += 1
            dest, fragment = target
            if not dest.is_file(): errors.append(f'{relative}: missing destination {href}')
            elif fragment and dest.suffix == '.html' and fragment not in page(dest).ids:
                errors.append(f'{relative}: missing section {href}')
        if not doc.indexable:
            stats['noindex_redirects'] += 1
            if url in submitted: errors.append(f'{relative}: noindex URL in sitemap')
            continue
        stats['indexable_blogs'] += 1
        if doc.canonical != url: errors.append(f'{relative}: canonical does not match URL')
        if url not in submitted: errors.append(f'{relative}: indexable blog missing from sitemap')
        if len(doc.crumbs) != 1:
            errors.append(f'{relative}: expected one visible breadcrumb')
            continue
        trail = doc.crumbs[0]
        schemas = [v for tree in doc.schemas for v in breadcrumb_nodes(tree)]
        if len(schemas) != 1:
            errors.append(f'{relative}: expected one BreadcrumbList')
            continue
        if doc.styles != 1: errors.append(f'{relative}: missing or duplicate breadcrumb stylesheet')
        items = schemas[0].get('itemListElement', [])
        if len(trail) < 2 or len(items) != len(trail):
            errors.append(f'{relative}: visible/schema breadcrumb length mismatch')
            continue
        if trail[0]['href'] != '/' or not trail[-1]['current'] or trail[-1]['href']:
            errors.append(f'{relative}: invalid breadcrumb start/current page')
        for position, (visible, item) in enumerate(zip(trail, items), 1):
            href = urljoin(url, visible['href']) if visible['href'] else url
            if item.get('position') != position or item.get('name') != ' '.join(visible['name'].split()) or item.get('item') != href:
                errors.append(f'{relative}: breadcrumb/schema mismatch at {position}')
            target = resolve(href)
            if target is None or not target[0].is_file() or not page(target[0]).indexable:
                errors.append(f'{relative}: breadcrumb points to missing/noindex page {href}')
    print(json.dumps({**stats, 'errors': len(errors)}, indent=2))
    for error in errors: print(error)
    return not errors


if __name__ == '__main__':
    raise SystemExit(0 if validate() else 1)
