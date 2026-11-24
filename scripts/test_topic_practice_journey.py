import re
import sys
import subprocess
import unittest
from pathlib import Path
from sync_topic_bank_links import TOPIC, rewrite
from topic_practice_journey import INLINE, SECONDARY, protected_codes

CODE = 'AC9M4N04'
GUEST = {'practice': True, 'guestPractice': True}
ACCOUNT = {'practice': True, 'guestPractice': False}
EXAMPLE = '<div class="example"><h2>Example</h2><p>See the steps.</p><div><p>More detail</p></div></div>'
PAID = '<a class="curriculum-button" href="/products/test/">View paid worksheets</a>'
SAMPLE = '<a href="/worksheets/#samples">Free printable sample</a>'
COHORT = 'AC9M6N02'

def guide(body, heading='Count and compare fractions', code=CODE):
    canonical = f'https://skillrhub.com/year4/maths/{code.lower()}-example/'
    return f'<html><head><link rel="canonical" href="{canonical}"></head><body><h1>{heading}</h1>{body}</body></html>'

class TestJourney(unittest.TestCase):
    def test_nested_complete_example_outside_card_is_first_eligible(self):
        source = guide(f'<main><div class="hero">{EXAMPLE}</div><details>{EXAMPLE}</details>{PAID}{EXAMPLE}{SAMPLE}</main>')
        result = rewrite(source, CODE, GUEST)
        match = INLINE.search(result)
        self.assertTrue(result[:match.start()].endswith(EXAMPLE))
        self.assertEqual(result.count('class="skillr-inline-practice"'), 1)
        self.assertIn('Free practice: Count and compare fractions', match.group())
        self.assertIn('No account needed', match.group())
        self.assertIn(f'skill={CODE}', match.group())
        self.assertIn(SECONDARY, result)
        self.assertIn(SAMPLE, result)
        self.assertEqual(result, rewrite(result, CODE, GUEST))

    def test_known_compact_preview_account_route_and_fallback_label(self):
        source = guide(f'<section class="lesson-preview" aria-label="Lesson preview">{EXAMPLE}</section>',
                       'This is very long official wording and should not become the full linked label')
        result = rewrite(source, CODE, ACCOUNT)
        match = INLINE.search(result).group()
        self.assertIn('Practise this skill for free', match)
        self.assertIn('Free account required', match)
        self.assertIn('login=1', match)
        self.assertNotIn('try=1', match)

    def test_unpublished_and_holdout_never_gain_inline_action(self):
        source = guide(f'<main>{EXAMPLE}{PAID}</main>')
        state = rewrite(source, CODE, GUEST)
        for bank in [None, {'practice': False, 'assessment': True}]:
            result = rewrite(state, CODE, bank)
            self.assertNotIn('skillr-inline-practice', result)
            self.assertNotIn(SECONDARY, result)
            self.assertIn('View paid worksheets', result)
        result = rewrite(guide(f'<main>{EXAMPLE}{PAID}</main>', code=COHORT), COHORT, GUEST)
        self.assertNotIn('skillr-inline-practice', result)
        self.assertIn(PAID, result)

def check_rollout():
    changed = subprocess.check_output(['git', 'diff', '--name-only', 'HEAD'], text=True).splitlines()
    topics = 0
    for filename in changed:
        topic = TOPIC.fullmatch(filename)
        if not topic:
            continue
        previous = subprocess.check_output(['git', 'show', 'HEAD:' + filename]).decode()
        current = Path(filename).read_text()
        assert topic[3].upper() not in protected_codes(), filename
        assert INLINE.sub('', current).replace(SECONDARY, '') == previous, filename
        topics += 1
    print(f'{topics} generated topic changes preserve exact existing content and metadata outside the new UI.')

if __name__ == '__main__':
    if sys.argv[1:] == ['--check-rollout']:
        check_rollout()
    else:
        unittest.main()
