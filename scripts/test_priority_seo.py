"""Regression checks for access claims, decimal parsing and exact-code actions."""
import json
import re
import subprocess
import unittest
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from html import unescape
from repair_priority_seo import ROOT, listing_description, repair_actions


class PrioritySEOTests(unittest.TestCase):
    def test_decimal_in_curriculum_version_does_not_destroy_description(self):
        row = {'text': 'Title\nCreated by\nSkillrhub\nTeach fractions using Australian Curriculum v9.0 — AC9M4N03. Show 0.25 with models. Includes answers.\nGrade 4'}
        self.assertEqual(listing_description(row), 'Teach fractions using Australian Curriculum v9.0 — AC9M4N03. Show 0.25 with models.')

    def test_unpublished_code_never_links_to_another_bank(self):
        source = '<div class="worksheet-resource-actions" role="group" aria-label="AC9E4LY05 resources"><a href="/lesson/">Topic Guide</a><a href="https://app.skillrhub.com/">Activities</a></div>'
        result = repair_actions(source, {})
        self.assertNotIn('app.skillrhub.com', result)
        self.assertIn('Online practice not yet available', result)
        self.assertIn('href="/lesson/"', result)
        self.assertEqual(repair_actions(result, {}), result)

    def test_all_worksheet_rows_match_published_bank_availability(self):
        banks = {b['code']: b for b in json.loads((ROOT / 'data/app-question-banks.json').read_text())['codes']}
        rows = 0
        for path in (ROOT / 'worksheets').rglob('index.html'):
            for code, body in re.findall(r'<div class="worksheet-resource-actions"[^>]*aria-label="(AC9[A-Z0-9]+) resources"[^>]*>(.*?)</div>', path.read_text(), re.S):
                bank = banks.get(code, {}); rows += 1
                links = [unescape(x) for x in re.findall(r'href="(https://app.skillrhub.com/[^\"]*)"', body)]
                self.assertEqual(len(links), (1 + bool(bank.get('assessment'))) if bank.get('practice') else 0, (path, code))
                if bank.get('practice'):
                    params = parse_qs(urlparse(links[0]).query)
                    self.assertEqual(params.get('skill'), [code])
                    self.assertIn('try' if bank.get('guestPractice') else 'login', params)
                    if bank.get('assessment'):
                        self.assertEqual(parse_qs(urlparse(links[1]).query).get('assessment'), [code])
        self.assertGreater(rows, 600)

    def test_product_descriptions_previews_and_offers_are_preserved(self):
        products = json.loads((ROOT / 'data/print-and-go-products.json').read_text())
        old = json.loads(subprocess.check_output(['git', 'show', 'origin/main:data/print-and-go-products.json'], cwd=ROOT, text=True))
        previous = {p['id']: p for p in old}
        checked = 0
        for product in products:
            for field in ['id', 'title', 'price', 'currency', 'tptUrl', 'url', 'curriculumCodes', 'available']:
                self.assertEqual(product.get(field), previous[product['id']].get(field), (product['id'], field))
            path = ROOT / product['url'].lstrip('/') / 'index.html'
            if not product.get('available') or not path.is_file():
                continue
            source = path.read_text(); checked += 1
            self.assertFalse(re.match(r'^0\s*[—–-]', product['description']))
            self.assertEqual(source.count('priority-product-details:start'), 1)
            for script in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', source, re.S):
                obj = json.loads(script)
                for node in obj.get('@graph', [obj]):
                    if node.get('@type') == 'Product':
                        self.assertEqual(node['description'], product['description'], product['id'])
            for preview in product.get('previewImages', []):
                self.assertTrue((ROOT / preview['src'].lstrip('/')).is_file())
                self.assertIn(preview['src'], source)
        self.assertGreater(checked, 250)


if __name__ == '__main__':
    unittest.main()
