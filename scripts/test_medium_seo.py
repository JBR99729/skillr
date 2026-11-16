"""Check truthful metadata and preserve the complete authored lesson inventory."""
import html
import json
import re
import subprocess
import unittest
from pathlib import Path
from repair_medium_seo import ROOT, REVIEW_BLOCK, HOME_DESCRIPTION, review_block


class MediumSEOTests(unittest.TestCase):
    def test_homepage_schema_matches_visible_offer_and_metadata(self):
        source = (ROOT / 'index.html').read_text()
        graph = json.loads(re.search(r'<script[^>]*id="skillrhub-site-entity-jsonld"[^>]*>(.*?)</script>', source, re.S)[1])['@graph']
        title = html.unescape(re.search(r'<title>(.*?)</title>', source)[1])
        for node in graph:
            if node['@type'] == 'WebPage':
                self.assertEqual(node['name'], title)
            if node['@type'] in ('WebSite', 'WebPage'):
                self.assertEqual(node['description'], HOME_DESCRIPTION)
        for field in ['description', 'og:description', 'twitter:description']:
            value = re.search(r'<meta[^>]*(?:name|property)="' + field + r'"[^>]*content="([^"]+)"', source)[1]
            self.assertEqual(html.unescape(value), HOME_DESCRIPTION)

    def test_every_review_block_matches_its_code_and_recorded_status(self):
        records = json.loads((ROOT / 'data/resource-review-records.json').read_text())['records']
        reviewed = set(json.loads((ROOT / 'data/content-verification-status.json').read_text())['reviewedCodes'])
        self.assertEqual(set(records), reviewed)
        pages = []
        for year in ['foundation'] + ['year' + str(i) for i in range(1, 11)]:
            for subject in ['maths', 'english', 'science']:
                for path in (ROOT / year / subject).glob('*/index.html'):
                    source = path.read_text()
                    blocks = REVIEW_BLOCK.findall(source)
                    if not blocks:
                        continue
                    self.assertEqual(len(blocks), 1, str(path))
                    code = re.search(r'id="resource-review-(AC9[A-Z0-9]+)"', blocks[0])[1]
                    self.assertEqual(blocks[0], review_block(code, records))
                    self.assertIn(code.lower(), str(path).lower())
                    self.assertNotIn('"@type": "Review"', blocks[0])
                    pages.append(path)
        self.assertEqual(len(pages), 676)

    def test_existing_lesson_content_and_canonical_urls_are_preserved(self):
        changed = subprocess.check_output(['git', 'diff', 'origin/main', '--name-only', '--', '*.html'], cwd=ROOT, text=True).splitlines()
        for name in changed:
            if not re.match(r'^(foundation|year\d+)/(maths|english|science)/', name):
                continue
            before = subprocess.check_output(['git', 'show', 'origin/main:' + name], cwd=ROOT, text=True)
            after = (ROOT / name).read_text()
            self.assertEqual(REVIEW_BLOCK.sub('', after.split('</head>', 1)[1]), REVIEW_BLOCK.sub('', before.split('</head>', 1)[1]), name)
            for tag in ['title', 'link[^>]*rel="canonical"']:
                self.assertEqual(re.findall('<' + tag + '[^>]*>[^<]*', after), re.findall('<' + tag + '[^>]*>[^<]*', before), name)

    def test_homeschool_page_has_clear_steps_and_an_honest_example(self):
        source = (ROOT / 'homeschooling-australia/index.html').read_text()
        for phrase in ['Learning Calendar', 'Basic, Medium, Extra or Custom', 'workbook', 'print', 'illustrative plan', 'HASS']:
            self.assertIn(phrase, source)
        self.assertNotIn('Now:</strong> Years 1–5 Maths', source)
        self.assertIn('original work samples as the actual evidence', source)


if __name__ == '__main__':
    unittest.main()
