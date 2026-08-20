#!/usr/bin/env python3
from pathlib import Path
import re, sys
ROOT=Path(__file__).resolve().parents[1]
pages=sorted((ROOT/'year10'/'science').glob('ac9s10i*/index.html'))
errors=[]
required=['Core concepts and success criteria','Worked examples','Common misconceptions and fixes','Step-by-step inquiry method','Apply and transfer','Australian Curriculum coverage','International curriculum mapping','/worksheet/','/practice/','/test/','teacher-slides/']
for p in pages:
 s=p.read_text(encoding='utf-8',errors='replace'); rel=p.relative_to(ROOT)
 for x in required:
  if x not in s: errors.append(f'{rel}: missing {x}')
 for bad in ['Use the shared model to foreground','We are learning to explain','Observe → connect → conclude','MathJax','KaTeX']:
  if bad.lower() in s.lower(): errors.append(f'{rel}: generic/external-renderer residue: {bad}')
 if len(re.findall(r'<article class="curriculum-worked-example">',s))<8: errors.append(f'{rel}: too few concrete teaching cards')
 if 'rel="canonical"' not in s: errors.append(f'{rel}: canonical link missing')
if len(pages)!=8: errors.append(f'Expected 8 Inquiry pages, found {len(pages)}')
if errors:
 print('\n'.join(errors)); print(f'FAIL: {len(errors)} Year 10 Inquiry topic-page errors.'); sys.exit(1)
print('PASS: 8 Year 10 Science Inquiry topic pages satisfy final quality gate.')
