import re
import json
import unittest
from pathlib import Path

from build_free_tpt_samples import ROOT, resources, build
from normalize_resource_messaging import transform


class FreeSampleTests(unittest.TestCase):
    def test_only_observed_free_listings_and_matching_lessons(self):
        block = build()  # Fails on paid, missing, unavailable or mismatched listings.
        ids = re.findall(r'data-free-tpt-sample="(\d+)"', block)
        expected = [p['listingId'] for p in resources()]
        self.assertEqual(set(ids), set(expected))
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(len(ids), 67)
        self.assertEqual(sum(p['kind'] == 'worksheets' for p in resources()), 64)
        self.assertEqual(sum(p['kind'] == 'slides' for p in resources()), 3)
        self.assertNotIn('.pdf', block)

    def test_cleanup_preserves_real_samples_and_existing_paid_policy(self):
        for name in ['index.html', 'worksheets/index.html']:
            source = (ROOT / name).read_text()
            self.assertEqual(transform(source, name), source, name)
        self.assertNotIn('Free worksheets', transform('<p>Free worksheets</p>', 'example.html'))

    def test_indexability_and_sample_section_survive(self):
        source = (ROOT / 'worksheets/index.html').read_text()
        self.assertEqual(source.count('id="free-tpt-samples"'), 1)
        self.assertIn('href="https://skillrhub.com/worksheets/"', source)
        self.assertIn('<meta name="robots" content="index, follow">', source)
        self.assertIn('free_tpt_sample_click', source)
        self.assertIn('https://app.skillrhub.com/?try=1', source)

    def test_ai_guides_match_the_verified_collection(self):
        items = resources()
        index = json.loads((ROOT / 'ai-index.json').read_text())['free_tpt_resources']
        self.assertEqual(index['total_resources'], len(items))
        self.assertEqual(index['printable_worksheet_resources'], sum(p['kind'] == 'worksheets' for p in items))
        full = (ROOT / 'llms-full.txt').read_text().split('<!-- free-tpt-resources:start -->')[1].split('<!-- free-tpt-resources:end -->')[0]
        for item in items:
            self.assertIn(item['tptUrl'], full)
        for name in ['llms.txt', 'llms-full.txt']:
            text = (ROOT / name).read_text()
            self.assertIn('TpT requires an account to download', text)
            self.assertIn('https://skillrhub.com/worksheets/#free-tpt-samples', text)


if __name__ == '__main__':
    unittest.main()
