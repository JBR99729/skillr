#!/usr/bin/env python3
"""Check/wire GA on indexable public HTML without altering teaching or SEO.

Redirect stubs, private reports, error/offline pages and noindex resources are
excluded. Existing active inline or homework-runtime loaders are preserved.
Run with --write once to repair gaps; the default read-only check fails on gaps.
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
TAG = '<script defer src="/assets/site-analytics.js?v=20261112-coverage"></script>'


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.scripts = []
        self.current = None
        self.noindex = False
        self.redirect = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script':
            self.current = {'src': attrs.get('src', ''), 'text': '', 'type': attrs.get('type', '')}
            self.scripts.append(self.current)
        if tag == 'meta':
            self.noindex |= attrs.get('name', '').lower() == 'robots' and 'noindex' in attrs.get('content', '').lower()
            self.redirect |= attrs.get('http-equiv', '').lower() == 'refresh'

    def handle_data(self, data):
        if self.current is not None:
            self.current['text'] += data

    def handle_endtag(self, tag):
        if tag == 'script':
            self.current = None


def required(path, page):
    return (not page.noindex and not page.redirect
            and path.name not in {'404.html', 'offline.html'}
            and not set(path.parts) & {'docs', 'scripts', 'tests', 'qa', 'reports', 'experiments', 'node_modules'})


def tracked(page):
    for script in page.scripts:
        if script['type'] in {'application/ld+json', 'application/json'}:
            continue
        if re.search(r'googletagmanager\.com/(gtag/js|gtm\.js)', script['src'] + '\n' + script['text']):
            return True
        if any(name in script['src'] for name in ('/assets/homework-page-runtime.js', '/assets/site-analytics.js')):
            return True
    return False


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    names = subprocess.check_output(['git', 'ls-files', '-z', '--', '*.html'], cwd=ROOT).decode().split('\0')
    checked, missing, repaired = 0, [], 0
    for name in filter(None, names):
        path = ROOT / name
        source = path.read_text(encoding='utf-8')
        page = Page()
        page.feed(source)
        if not required(Path(name), page):
            continue
        checked += 1
        if tracked(page):
            continue
        if args.write and re.search(r'</head\s*>', source, re.I):
            updated = re.sub(r'</head\s*>', lambda match: TAG + '\n' + match.group(), source, count=1, flags=re.I)
            path.write_text(updated, encoding='utf-8')
            repaired += 1
        else:
            missing.append(name)
    print(f'Public indexable HTML checked: {checked}; repaired: {repaired}; missing: {len(missing)}')
    for name in missing:
        print(name)
    return bool(missing)


if __name__ == '__main__':
    raise SystemExit(main())
