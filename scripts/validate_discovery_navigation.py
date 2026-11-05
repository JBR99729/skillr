#!/usr/bin/env python3
"""Release guard for source-HTML discovery, related lessons and trust links."""
from collections import Counter
import json
from discovery_navigation import ROOT, ORIGIN, STYLE, inventory, graph, sitemap_urls, subject_hub


def validate():
    docs = inventory()
    incoming, depth = graph(docs)
    lessons = {d.code: d for d in docs.values() if d.code and d.indexable}
    code_for_url = {d.url: c for c, d in lessons.items()}
    submitted = sitemap_urls()
    errors = []
    for url in submitted:
        doc = docs.get(url)
        if doc is None: errors.append(f'Missing sitemap file: {url}'); continue
        if not doc.indexable: errors.append(f'Noindex sitemap URL: {url}')
        if doc.canonical != url: errors.append(f'Canonical differs: {url}')
        if not doc.name: errors.append(f'Missing title: {url}')
        if url not in depth: errors.append(f'Not reachable from homepage through HTML: {url}')
        if url != ORIGIN and not incoming[url]: errors.append(f'No incoming HTML link: {url}')
    for code, doc in lessons.items():
        if subject_hub(doc) not in doc.links: errors.append(f'{code}: no direct subject hub')
        if depth.get(doc.url, 999) > 3: errors.append(f'{code}: more than three homepage clicks')
        destinations = doc.links | {docs[t].canonical for t in doc.links if t in docs}
        related = {code_for_url[t] for t in destinations if t in code_for_url and code_for_url[t] != code}
        if len(related) < 2: errors.append(f'{code}: fewer than two distinct related lessons')
        for target in ('about.html', 'editorial-standards.html'):
            if ORIGIN + target not in doc.links: errors.append(f'{code}: missing {target}')
    for doc in docs.values():
        if 'skillr-discovery:start' in doc.source:
            if doc.source.count('<!-- skillr-discovery:start -->') != 1: errors.append(f'{doc.relative}: duplicate navigation')
            if doc.source.count(STYLE) != 1: errors.append(f'{doc.relative}: missing/duplicate stylesheet')
    print(json.dumps({'html_pages': len(docs), 'sitemap_urls': len(submitted), 'code_lessons': len(lessons), 'lesson_click_depth': dict(Counter(depth.get(d.url) for d in lessons.values())), 'errors': len(errors)}, indent=2))
    for error in errors: print(error)
    return not errors


if __name__ == '__main__': raise SystemExit(0 if validate() else 1)
