#!/usr/bin/env python3
"""Remove legacy science/maths mapping residue from canonical English topic pages."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
roots=[ROOT/'foundation',*[ROOT/f'year{i}' for i in range(1,11)]]
changed=0
for root in roots:
    d=root/'english'
    if not d.is_dir(): continue
    for page in d.glob('*/index.html'):
        if not page.parent.name.lower().startswith('ac9e'): continue
        src=page.read_text(encoding='utf-8',errors='replace')
        out=re.sub(r'<li>\s*<a\b[^>]*nextgenscience\.org[^>]*>.*?</a>\s*</li>','',src,flags=re.I|re.S)
        out=re.sub(r'<li>.*?Next Generation Science Standards.*?</li>','',out,flags=re.I|re.S)
        out=out.replace('Common Core Mathematics/ELA','Common Core ELA/Literacy')
        out=out.replace('Common Core Mathematics','Common Core ELA/Literacy')
        if out!=src:
            page.write_text(out,encoding='utf-8'); changed+=1
print(f'Cleaned legacy cross-subject references from {changed} English topic pages.')
