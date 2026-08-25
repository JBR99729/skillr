from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted((ROOT / 'year7' / 'science').glob('ac9s7*/index.html'))
changed = 0

for path in PAGES:
    text = path.read_text(encoding='utf-8')
    if 'science-premium-layer:' not in text:
        continue

    # Keep the teaching snapshot visible while using the repository's native
    # static <details>/<summary> section convention.
    pattern = re.compile(
        r'(<!-- science-premium-layer:AC9S7[A-Z0-9]+ -->)'
        r'<section class="science-premium-layer curriculum-topic-section" aria-labelledby="([^"]+)">'
        r'<div id="\2">([\s\S]*?)</div></section>'
    )
    replacement = (
        r'\1<details open class="science-premium-layer curriculum-topic-section">'
        r'<summary><strong>Key concept</strong></summary><div id="\2">\3</div></details>'
    )
    text2, n = pattern.subn(replacement, text, count=1)
    if n != 1:
        raise RuntimeError(f'Could not convert premium layer in {path}')

    # AC9S7U04 already has a fixed teacher-slides directory; expose it through
    # the same local viewer link pattern used by the other Year 7 Science pages.
    if 'ac9s7u04-' in path.parent.name and 'href="teacher-slides/"' not in text2:
        needle = '<a class="primary" href="#topic-guide">Topic guide</a>'
        if needle not in text2:
            raise RuntimeError('AC9S7U04 topic-guide action not found')
        text2 = text2.replace(needle, needle + '<a href="teacher-slides/">Teacher Slides</a>', 1)

    if text2 != text:
        path.write_text(text2, encoding='utf-8')
        changed += 1

assert changed == 18, f'Expected 18 updated pages, got {changed}'
print('PASS: finalized 18 Year 7 Science premium pages for static architecture')
