#!/usr/bin/env python3
"""Keep retired learning entrances on the single filtered Learn catalogue.

Owner-authorised consolidation, 7 November 2026. GitHub Pages cannot set server
redirect rules; zero-second meta refresh is Google's permanent HTML redirect.
Teaching topic pages, worksheets, blogs and teacher/product catalogues stay intact.
"""
import argparse
import html
import json
import re
import subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://skillrhub.com'
MARKER = 'data-learning-hub-retired="2026-11-07"'
ARCHIVES = {'backup', 'reports', 'exports', 'docs', 'tests', 'scripts', 'artifacts',
            'screenshots', '.github', 'curriculum-question-banks', 'node_modules'}
PROTECTED = re.compile(r'(<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?</script>|<style\b[^>]*>[\s\S]*?</style>)', re.I)
ANCHOR = re.compile(r'<a\b[^>]*>', re.I)
HREF = re.compile(r'(\bhref\s*=\s*)(["\'])(.*?)\2', re.I | re.S)
FOOTER = re.compile(r'<!-- learning-navigation:start -->[\s\S]*?<!-- learning-navigation:end -->\s*')
NAV_SCRIPT = '<script defer src="/assets/learning-navigation.js?v=20261107-flow"></script>'


class Anchors(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.href, self.label = [], None, []
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.href, self.label = dict(attrs).get('href'), []
    def handle_data(self, text):
        if self.href:
            self.label.append(text)
    def handle_endtag(self, tag):
        if tag == 'a' and self.href:
            self.links.append((self.href, ' '.join(' '.join(self.label).split())))
            self.href = None


def topic_navigation(root):
    from discovery_navigation import inventory, normalize
    docs = inventory(root)
    topics = {url: doc for url, doc in docs.items() if doc.code and doc.indexable}
    changed = []
    for url, doc in topics.items():
        source = FOOTER.sub('', doc.source)
        anchors = Anchors(); anchors.feed(source)
        related = []
        for href, label in anchors.links:
            target = normalize(urljoin(url, href))
            other = topics.get(target)
            if not other or other.code == doc.code or other.relative.split('/')[1] != doc.relative.split('/')[1]:
                continue
            if target not in [item[0] for item in related]:
                related.append((target, label or other.name))
            if len(related) == 3:
                break
        level, subject = doc.relative.split('/')[:2]
        year = '0' if level == 'foundation' else level[4:]
        target = html.escape(f'/learn/?year={year}&subject={subject}', quote=True)
        links = ''.join(f'<li><a href="{html.escape(urlsplit(u).path, quote=True)}">{html.escape(label)}</a></li>' for u, label in related)
        block = f'''<!-- learning-navigation:start --><section data-learning-navigation-links aria-label="Useful topic links"><h2>Keep learning</h2><nav class="learning-return-links" aria-label="Return to learning"><a href="/">Home</a><a data-learning-return href="{target}">Back to your topic index</a></nav><p>Related topics</p><ul>{links}</ul></section><!-- learning-navigation:end -->\n'''
        source = source.replace('</main>', block + '</main>', 1)
        if NAV_SCRIPT not in source:
            source = source.replace('</body>', NAV_SCRIPT + '\n</body>', 1)
        stylesheet = '<link rel="stylesheet" href="/assets/learning-navigation.css?v=20261107-flow">'
        if stylesheet not in source:
            source = source.replace('</head>', stylesheet + '\n</head>', 1)
        if source != doc.source:
            (root / doc.relative).write_text(source, encoding='utf-8')
            changed.append(doc.relative)
    for relative in ['index.html', 'learn/index.html']:
        page = root / relative
        source = page.read_text(encoding='utf-8')
        if NAV_SCRIPT not in source:
            page.write_text(source.replace('</body>', NAV_SCRIPT + '\n</body>', 1), encoding='utf-8')
            changed.append(relative)
    return changed


def destinations(root=ROOT):
    routes = {}
    for year in range(11):
        level = 'foundation' if year == 0 else f'year{year}'
        learn_level = 'foundation' if year == 0 else f'year-{year}'
        year_target = f'/learn/?year={year}'
        candidates = {f'/{level}/': year_target,
                      f'/{level}/curriculum/': year_target,
                      f'/learn/{learn_level}/': year_target}
        for subject in ('maths', 'science', 'english'):
            target = year_target + '&subject=' + subject
            candidates[f'/{level}/curriculum/{subject}/'] = target
            candidates[f'/{level}/{subject}/'] = target
        for route, target in candidates.items():
            if (root / route.lstrip('/') / 'index.html').is_file():
                routes[route] = target
    return routes


def target_for(value, relative, routes):
    parsed = urlsplit(urljoin(ORIGIN + '/' + relative, html.unescape(value)))
    if parsed.netloc.lower() not in ('skillrhub.com', 'www.skillrhub.com'):
        return None
    path = parsed.path
    if path.endswith('/index.html'):
        path = path[:-10]
    target = routes.get(path.rstrip('/') + '/')
    # Old hub fragments name sections that do not exist on the catalogue.
    return target


def moved_page(target):
    escaped = html.escape(ORIGIN + target, quote=True)
    # The filtered destination and the shared catalogue agree on /learn/ as canonical.
    return f'''<!doctype html>
<html lang="en-AU" {MARKER}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0;url={escaped}">
<link rel="canonical" href="{ORIGIN}/learn/">
<title>Find your learning topic | SkillrHub</title>
</head><body><main><h1>Find your learning topic</h1>
<p>The learning catalogue now keeps all years and subjects together.</p>
<a href="{escaped}">Continue to your selected year and subject</a>
</main><script>location.replace({json.dumps(ORIGIN + target)});</script></body></html>
'''


def rewrite_links(source, relative, routes):
    def part(value):
        if value.startswith('<!--') or re.match(r'<(?:script|style)\b', value, re.I):
            # Breadcrumb schema is navigation too. Leave other scripts untouched.
            if re.match(r'<script\b[^>]*type=["\']application/ld\+json', value, re.I):
                def literal(match):
                    try:
                        original = json.loads(match[0])
                    except ValueError:
                        return match[0]
                    target = target_for(original, relative, routes) if isinstance(original, str) and original.startswith(('/', ORIGIN)) else None
                    return json.dumps(ORIGIN + target) if target else match[0]
                return re.sub(r'"(?:[^"\\]|\\.)*"', literal, value)
            return value
        def anchor(match):
            def href(attr):
                target = target_for(attr[3], relative, routes)
                return attr[1] + attr[2] + html.escape(target, quote=True) + attr[2] if target else attr[0]
            return HREF.sub(href, match[0])
        return ANCHOR.sub(anchor, value)
    return ''.join(part(value) for value in PROTECTED.split(source))


def consolidate(root=ROOT, write=False):
    routes = destinations(root)
    changed = []
    for relative in subprocess.check_output(['git', 'ls-files', '*.html'], cwd=root, text=True).splitlines():
        if relative.split('/')[0] in ARCHIVES:
            continue
        page = root / relative
        source = page.read_text(encoding='utf-8')
        route = '/' + relative.removesuffix('index.html') if relative.endswith('/index.html') else '/' + relative
        output = moved_page(routes[route]) if route in routes else rewrite_links(source, relative, routes)
        if source != output:
            changed.append(relative)
            if write:
                page.write_text(output, encoding='utf-8')
    if write:
        # Some authored worksheets/guides were linked only from retired hubs.
        # Reconnect them from the matching lesson, or from Learn for general guides.
        from discovery_navigation import inventory, graph, sitemap_urls
        docs = inventory(root)
        _, depth = graph(docs)
        lessons = {doc.code: doc for doc in docs.values() if doc.code and doc.indexable}
        for url in sorted(sitemap_urls(root)):
            doc = docs.get(url)
            if not doc or not doc.indexable or url in depth:
                continue
            code = re.search(r'ac9[a-z0-9]+', doc.relative, re.I)
            parent = lessons.get(code[0].upper()) if code else None
            relative = parent.relative if parent else 'learn/index.html'
            page = root / relative
            source = page.read_text(encoding='utf-8')
            link = f'<p><a href="{html.escape(urlsplit(url).path, quote=True)}">{html.escape(doc.name)}</a></p>\n'
            page.write_text(source.replace('</main>', link + '</main>', 1), encoding='utf-8')
            if relative not in changed:
                changed.append(relative)
        for relative in topic_navigation(root):
            if relative not in changed:
                changed.append(relative)
    return {'retired_hubs': len(routes), 'changed_files': len(changed), 'paths': changed}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    result = consolidate(write=args.write)
    print(json.dumps({k: v for k, v in result.items() if k != 'paths'}))
    if result['changed_files'] and not args.write:
        raise SystemExit(1)
