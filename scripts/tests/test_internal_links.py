import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('links', Path(__file__).parents[1] / 'audit_internal_links.py')
links = importlib.util.module_from_spec(spec)
spec.loader.exec_module(links)


class InternalLinksTests(unittest.TestCase):
    def test_relative_query_fragment(self):
        self.assertEqual(links.target_file('https://skillrhub.com/year1/topic/', '../other/?source=guide#practice'), 'year1/other/index.html')

    def test_case_is_preserved(self):
        self.assertEqual(links.target_file('https://skillrhub.com/', '/foundation/Maths/'), 'foundation/Maths/index.html')

    def test_external_and_utility_links(self):
        for href in ('mailto:help@example.com', 'https://other.example/page', 'javascript:void(0)'):
            self.assertIsNone(links.target_file('https://skillrhub.com/', href))

    def test_archived_content_is_ignored(self):
        p = links.Links()
        p.feed('<!-- <a href="/old/">Old</a> --><script>let s=\'<a href="/fake/">Fake</a>\';</script><a href="/real/">Real</a>')
        self.assertEqual(p.hrefs, ['/real/'])

    def test_root_and_directory_routes(self):
        self.assertEqual(links.route_for_file('index.html'), '/')
        self.assertEqual(links.route_for_file('year2/english/index.html'), '/year2/english/')


if __name__ == '__main__':
    unittest.main()
