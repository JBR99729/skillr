#!/usr/bin/env python3
"""Apply only the owner's existing 48-page NSW/Victoria search shortlist."""
import argparse
import html
import json
import re
from html.parser import HTMLParser

from update_topic_learning_seo import ROOT, STATE_TOPIC_SEO, metadata

MARKER = r'<!-- state-curriculum-links:start -->[\s\S]*?<!-- state-curriculum-links:end -->'
NSW = {
    'maths': 'https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/outcomes',
    'english': 'https://curriculum.nsw.edu.au/learning-areas/english/english-k-10-2022/outcomes',
    'science': 'https://curriculum.nsw.edu.au/learning-areas/science/science-and-technology-k-6-2024/outcomes',
}
VICTORIA = 'https://f10.vcaa.vic.edu.au/'


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hidden = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.hidden += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden = max(0, self.hidden - 1)

    def handle_data(self, data):
        if not self.hidden:
            self.parts.append(data)


def update(source, unit):
    code = unit['code']
    profile = STATE_TOPIC_SEO[code]
    assert profile['path'] == unit['url'].strip('/') + '/index.html', code
    source = metadata(source, unit)
    parser = VisibleText()
    parser.feed(source)
    text = ' '.join(parser.parts)
    # Keep an existing visible curriculum table. Archived comments and JSON-LD
    # do not count as a reader-facing explanation of the regional references.
    if re.search(r'Victori(?:a|an)', text) and re.search(r'NSW|New South Wales', text):
        return source
    subject = {'maths': 'Mathematics', 'english': 'English', 'science': 'Science and Technology'}[unit['subjectSlug']]
    block = (
        '<!-- state-curriculum-links:start -->'
        '<p class="state-curriculum-links">NSW and Victorian curriculum links: '
        '<a href="' + NSW[unit['subjectSlug']] + '">NSW ' + subject + ' syllabus</a> · '
        '<a href="' + VICTORIA + '">Victorian Curriculum F–10</a>. '
        'This guide follows ' + html.escape(code) + '; compare local content and sequence before planning.</p>'
        '<!-- state-curriculum-links:end -->'
    )
    # Add one paragraph inside the existing resource disclosure, without
    # adding a competing section, heading, teaching panel or practice action.
    pattern = (
        r'(<details\b[^>]*\bid=["\']resource-review-' + re.escape(code)
        + r'["\'][^>]*>[\s\S]*?<div\b[^>]*class=["\']curriculum-detail-body["\'][^>]*>)'
    )
    source, count = re.subn(pattern, lambda match: match[1] + block, source, count=1)
    assert count == 1, (code, 'Existing resource disclosure missing')
    return source


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    units = {unit['code']: unit for unit in json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']}
    changed = []
    for code, profile in STATE_TOPIC_SEO.items():
        path = ROOT / profile['path']
        source = path.read_text()
        result = update(source, units[code])
        if result != source:
            changed.append(code)
            if not args.check:
                path.write_text(result)
    print(json.dumps({'selected': len(STATE_TOPIC_SEO), 'needing_update' if args.check else 'updated': len(changed), 'codes': changed}))
    if args.check and changed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
