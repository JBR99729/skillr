import json
import html
import re
import unittest
from update_topic_learning_seo import ROOT, topic_units, metadata, copy_for
from apply_free_sample_topic_seo import targets, update
from normalize_resource_messaging import transform


class TopicLearningSEOTests(unittest.TestCase):
    def test_every_canonical_topic_has_accurate_free_learning_copy(self):
        samples = targets(); seen = set()
        for unit in topic_units():
            name = unit['url'].strip('/') + '/index.html'; seen.add(name)
            source = (ROOT / name).read_text()
            title, description = copy_for(source, unit, sample=unit['code'] in samples)
            self.assertEqual(html.unescape(re.search(r'<title>(.*?)</title>', source, re.S)[1]), title, name)
            self.assertIn(html.escape(description, quote=True), source, name)
            self.assertEqual(source, transform(source, name), name)
            expected = update(source, unit, samples[unit['code']][1]) if unit['code'] in samples else metadata(source, unit)
            self.assertEqual(source, expected, name)
            if unit['code'] not in samples:
                self.assertNotIn('<!-- free-topic-samples:start -->', source, name)
                self.assertNotIn('Sample Worksheet</title>', source, name)
            for script in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', source, re.S):
                json.loads(script)
        self.assertEqual(len(seen), 676)


if __name__ == '__main__':
    unittest.main()
