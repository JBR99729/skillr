"""Verify free labels are evidence-gated and retain existing learning pages."""
import json
import html
import re
import subprocess
import unittest
from apply_free_sample_topic_seo import ROOT, targets, update
from normalize_resource_messaging import transform
from update_topic_learning_seo import copy_for


class TopicSampleSEOTests(unittest.TestCase):
    def test_exact_scope_and_content_preservation(self):
        eligible = targets()
        self.assertEqual(len(eligible), 60)
        for code, (u, rows) in eligible.items():
            name = u['url'].strip('/') + '/index.html'
            source = (ROOT / name).read_text()
            old = subprocess.check_output(['git', 'show', 'HEAD:' + name], cwd=ROOT, text=True)
            self.assertIn('<title>' + html.escape(copy_for(source, u, sample=True)[0]) + '</title>', source)
            self.assertIn('Free sample worksheet available on TpT.', source)
            self.assertEqual(source.count('<!-- free-topic-samples:start -->'), 1)
            self.assertEqual(source, update(source, u, rows), code)
            self.assertEqual(source, transform(source, name), code)
            # All headings, examples, section inventories, practice/paid actions remain.
            for pattern in [r'<h[1-6]\b[^>]*>.*?</h[1-6]>', r'<summary\b[^>]*>.*?</summary>', r'<svg\b.*?</svg>', r'<link\b[^>]*rel="canonical"[^>]*>', r'<meta\b[^>]*name="robots"[^>]*>']:
                self.assertEqual(re.findall(pattern, old, re.S), re.findall(pattern, source, re.S), (code, pattern))
            for p in rows:
                self.assertEqual(p['kind'], 'worksheets')
                self.assertIn('\nFREE\n', p['liveText'])
                self.assertIn('data-free-tpt-sample="' + p['listingId'] + '"', source)
            for block in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', source, re.S):
                json.loads(block)

    def test_other_free_promises_still_normalized(self):
        self.assertIn('Paid', transform('<p>Free worksheets</p>', 'example.html'))
        self.assertNotIn('Free Sample Worksheet', transform('<p>Paid worksheet packs</p>', 'example.html'))


if __name__ == '__main__':
    unittest.main()
