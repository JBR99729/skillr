#!/usr/bin/env python3
"""Check actual static anchors against the case-sensitive Git publication inventory.

Archived HTML comments and script strings do not count as links. Query strings
and fragments do not change the destination file. Case-colliding tracked paths
are read from Git objects because macOS cannot faithfully check them out.
"""
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://skillrhub.com'


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.base = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and attrs.get('href'):
            self.hrefs.append(attrs['href'])
        if tag == 'base' and self.base is None and attrs.get('href'):
            self.base = attrs['href']


def route_for_file(relative):
    if relative == 'index.html':
        return '/'
    return '/' + (relative[:-10] if relative.endswith('/index.html') else relative)


def target_file(base, href):
    target = urlparse(urljoin(base, href))
    if target.scheme not in {'http', 'https'} or target.netloc != 'skillrhub.com':
        return None
    path = unquote(target.path).lstrip('/')
    return path + 'index.html' if target.path.endswith('/') else path


def audit(root=ROOT):
    tracked = set(filter(None, subprocess.check_output(
        ['git', 'ls-files', '-z'], cwd=root).decode().split('\0')))
    folded = Counter(path.lower() for path in tracked)
    broken = defaultdict(set)
    checked = 0
    for relative in sorted(tracked):
        if not relative.endswith('.html'):
            continue
        if folded[relative.lower()] > 1:
            source = subprocess.check_output(['git', 'show', 'HEAD:' + relative], cwd=root).decode()
        else:
            source = (root / relative).read_text(encoding='utf-8')
        parser = Links()
        parser.feed(source)
        base = ORIGIN + route_for_file(relative)
        if parser.base:
            base = urljoin(base, parser.base)
        for href in parser.hrefs:
            target = target_file(base, href)
            if target is None:
                continue
            checked += 1
            if target not in tracked:
                broken[target].add(relative)
    return checked, broken


def main():
    checked, broken = audit()
    for target, sources in sorted(broken.items()):
        print(f'Missing internal target: /{target}')
        for source in sorted(sources):
            print(f'  from {source}')
    print(f'Internal link audit: {checked} anchors; {len(broken)} missing targets.')
    return 1 if broken else 0


if __name__ == '__main__':
    raise SystemExit(main())
