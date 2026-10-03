#!/usr/bin/env python3
"""Check public HTML for the defects in the October 2026 Bing SEO reports.

Legacy noindex titles and per-slide headings in the HTML teacher deck are
intentional. Metadata is inspected in the HTML head, so SVG <title> labels
cannot be mistaken for page titles. No HTML is modified by this check.
"""
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'backup', 'exports', 'artifacts', 'node_modules', '.git'}
MAX_TITLE_LENGTH = 70


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.in_title = False
        self.has_head = False
        self.title = ''
        self.descriptions = []
        self.noindex = False
        self.h1_count = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'head':
            self.in_head = self.has_head = True
        if tag == 'h1':
            self.h1_count += 1
        if not self.in_head:
            return
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            name = attrs.get('name', '').lower()
            content = attrs.get('content', '')
            if name == 'description':
                self.descriptions.append(content)
            elif name == 'robots' and 'noindex' in content.lower():
                self.noindex = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'head':
            self.in_head = False

    def handle_data(self, data):
        if self.in_head and self.in_title:
            self.title += data


def main():
    issues = []
    checked = 0
    paths = subprocess.check_output(['git', 'ls-files', '-z', '--', '*.html'], cwd=ROOT).decode().split('\0')
    for relative in filter(None, paths):
        path = ROOT / relative
        if EXCLUDED.intersection(Path(relative).parts):
            continue
        page = Page()
        page.feed(path.read_text(encoding='utf-8'))
        if not page.has_head:
            continue
        checked += 1
        if len(page.descriptions) != 1 or not page.descriptions[0].strip():
            issues.append(f'{relative}: expected one nonempty description; found {len(page.descriptions)}')
        title = re.sub(r'\s+', ' ', page.title).strip()
        if not page.noindex and len(title) > MAX_TITLE_LENGTH:
            issues.append(f'{relative}: title has {len(title)} characters (maximum {MAX_TITLE_LENGTH})')
        if page.h1_count > 1 and '/teacher-deck/' not in relative:
            issues.append(f'{relative}: {page.h1_count} H1 headings')
    print(f'Bing SEO check: {checked} public HTML pages; {len(issues)} defects.')
    for issue in issues:
        print(issue)
    return 1 if issues else 0


if __name__ == '__main__':
    raise SystemExit(main())
