import html
import json
import re
import unittest
from sync_learning_intent import ROOT, SUMMARY, ACCESS, ai_copy, pages, topic_description


class LearningIntentTests(unittest.TestCase):
    def test_all_canonical_topic_metadata_is_specific_and_matches_availability(self):
        banks = {x['code']: x for x in json.loads((ROOT / 'data/app-question-banks.json').read_text())['codes']}
        corpus = list(pages())
        self.assertEqual(len(corpus), 676)
        descriptions = set()
        for unit, path, source in corpus:
            description = topic_description(unit, source, banks)
            self.assertLessEqual(len(description), 250, str(path))
            descriptions.add(description)
            for field in ['description', 'og:description', 'twitter:description']:
                matches = [re.search(r'content="([^"]+)"', tag)[1] for tag in re.findall(r'<meta\b[^>]*>', source)
                           if re.search(r'(?:name|property)="' + field + r'"', tag)]
                self.assertEqual([html.unescape(x) for x in matches], [description], str(path))
            if not banks.get(unit['code'], {}).get('practice'):
                self.assertIn('Find available free practice questions', description)
            for phrase in ['Australian Curriculum', 'examples', 'free account', 'paid worksheets', unit['code']]:
                self.assertIn(phrase, description)
        self.assertEqual(len(descriptions), 676)

    def test_visible_resource_information_keeps_access_limits_and_progress_requirements(self):
        for _, path, source in pages():
            block = re.search(r'<!-- resource-review:start -->(.*?)<!-- resource-review:end -->', source, re.S)[1]
            for phrase in ['Free learning resources and examples', 'free practice questions in published banks',
                           'free account, confirmed email and selected learner profile', 'paid worksheet packs',
                           '20 free questions daily', '500 free questions in total', '/faq.html#free-practice']:
                self.assertIn(phrase, block, str(path))

    def test_both_ai_guides_have_the_same_offer_and_access_information(self):
        for name in ['llms.txt', 'llms-full.txt']:
            source = (ROOT / name).read_text()
            self.assertEqual(source.count('## Learning offer and access'), 1)
            self.assertIn(SUMMARY, source)
            self.assertIn(ACCESS, source)
            self.assertEqual(ai_copy(source), source)
            self.assertNotIn('500 free questions', source)

    def test_offer_refresh_preserves_following_marked_resources(self):
        source = '# Guide\n\n## Learning offer and access\n\nOld copy.\n\n<!-- free-tpt-resources:start -->\n## Samples\n\nSample links\n<!-- free-tpt-resources:end -->\n'
        updated = ai_copy(source)
        self.assertIn(ACCESS, updated)
        self.assertEqual(updated.split('<!-- free-tpt-resources:start -->')[1],
                         source.split('<!-- free-tpt-resources:start -->')[1])
        self.assertEqual(ai_copy(updated), updated)



if __name__ == '__main__': unittest.main()
