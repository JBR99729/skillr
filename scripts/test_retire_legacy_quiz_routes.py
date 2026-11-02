#!/usr/bin/env python3
"""Focused navigation checks; no learner accounts or answer events are created."""
import json
import subprocess
import tempfile
import unittest
from pathlib import Path
from retire_legacy_quiz_routes import APP, destination, legacy_path, moved_page, rewrite_html, migrate

BANKS = {
    'AC9M1N01': {'practice': True, 'guestPractice': True},
    'AC9M7P01': {'practice': True, 'guestPractice': False},
    'AC9M9N01': {'practice': False},
}

class RoutingTests(unittest.TestCase):
    def test_exact_code_and_access_route(self):
        self.assertEqual(destination('/quiz/year-1/math/ac9m1n01/test/result/',BANKS),APP+'?try=1&skill=AC9M1N01')
        self.assertEqual(destination('/quiz/year-7/math/ac9m7p01/practice/',BANKS),APP+'?login=1&skill=AC9M7P01')
        self.assertEqual(destination('/quiz/year-9/math/ac9m9n01/',BANKS),APP)
        self.assertEqual(destination('/quiz/year-10/science/ac9s10u01/test/',BANKS),APP)
        self.assertEqual(destination('/quiz/daily-drills/practice.html',BANKS),APP)

    def test_paper_resources_and_nonplayers_are_preserved(self):
        for path in ['/quiz/year-1/math/ac9m1n01/worksheet/','/quiz/year-1/math/ac9m1n01/homework/',
                     '/quiz/assets/script.js','/quiz/year-1/math/ac9m1n01/questions.js','/year1/maths/topic/']:
            self.assertFalse(legacy_path(path));self.assertIsNone(destination(path,BANKS))

    def test_native_links_comments_scripts_and_teaching(self):
        source='''<h1>Original lesson</h1><p>Original model and worked example.</p><a href="../../quiz/year-7/math/ac9m7p01/test/?score=5#name">Test</a><a href="https://other.example/quiz/code/">Other</a><!-- <a href="/quiz/old/">archive</a> --><script>const href="/quiz/old/";</script>'''
        result=rewrite_html(source,'year7/maths/index.html',BANKS)
        self.assertIn('href="https://app.skillrhub.com/?login=1&amp;skill=AC9M7P01"',result)
        self.assertIn('>Practice now →</a>',result)
        self.assertIn('<h1>Original lesson</h1><p>Original model and worked example.</p>',result)
        self.assertIn('https://other.example/quiz/code/',result)
        self.assertIn('<!-- <a href="/quiz/old/">archive</a> -->',result)
        self.assertIn('<script>const href="/quiz/old/";</script>',result)
        self.assertNotIn('score=5',result)

    def test_direct_urls_work_without_javascript(self):
        page=moved_page('quiz/year-7/math/ac9m7p01/practice/result/index.html',BANKS)
        self.assertIn('http-equiv="refresh"',page);self.assertIn('noindex,follow',page)
        self.assertIn('<a href="https://app.skillrhub.com/?login=1&amp;skill=AC9M7P01">',page)
        self.assertNotIn('/quiz/assets/',page);self.assertNotIn('questions.js',page)

    def test_site_migration_is_idempotent_and_keeps_worksheets(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp);subprocess.run(['git','init','-q'],cwd=root,check=True)
            fixtures={'data/app-question-banks.json':json.dumps({'codes':[{'code':k,**v} for k,v in BANKS.items()]}),
             'quiz/year-7/math/ac9m7p01/practice/index.html':'<html>old player</html>',
             'quiz/year-7/math/ac9m7p01/worksheet/index.html':'<h1>Paper questions unchanged</h1>',
             'index.html':'<a href="/quiz/year-7/math/ac9m7p01/practice/">Practice</a>',
             'sitemap-practice.xml':'<urlset><url><loc>https://skillrhub.com/quiz/year-7/math/ac9m7p01/practice/</loc></url></urlset>'}
            for p,text in fixtures.items():
                path=root/p;path.parent.mkdir(parents=True,exist_ok=True);path.write_text(text)
            subprocess.run(['git','add','.'],cwd=root,check=True)
            first=migrate(root,True);self.assertEqual(first['retired_routes'],1)
            self.assertEqual((root/'quiz/year-7/math/ac9m7p01/worksheet/index.html').read_text(),fixtures['quiz/year-7/math/ac9m7p01/worksheet/index.html'])
            self.assertEqual(migrate(root)['changed'],0)
            self.assertNotIn('<url>',(root/'sitemap-practice.xml').read_text())

if __name__=='__main__':unittest.main()
