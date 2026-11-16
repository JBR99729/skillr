import re
import unittest
from pathlib import Path

from build_free_tpt_samples import ROOT, SELECTED, build
from normalize_resource_messaging import transform


class FreeSampleTests(unittest.TestCase):
    def test_only_observed_free_listings_and_matching_lessons(self):
        block = build()  # Fails on paid, missing, unavailable or mismatched listings.
        self.assertEqual(re.findall(r'data-free-tpt-sample="(\d+)"', block), SELECTED)
        self.assertEqual(block.count('Read the free topic guide'), len(SELECTED))
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


if __name__ == '__main__':
    unittest.main()
