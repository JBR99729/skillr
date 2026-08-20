#!/usr/bin/env python3
"""Validate non-negotiable English F–10 topic-page quality rules."""
from __future__ import annotations
import re, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
YEAR_ROOTS=[ROOT/'foundation',*[ROOT/f'year{year}' for year in range(1,11)]]
GENERIC_FILLER=(
 'The goal is not to memorise one answer pattern',
 'Use concrete examples, pictures, oral explanation and short written responses before moving to independent practice',
 'Finish with a mixed activity so students must choose the correct strategy rather than copy the last example',
 'Answering from memory without using clues from the text, sentence or image',
 'Knowing the idea orally but not transferring it into reading, writing or speaking',
 'Missing punctuation, word order or vocabulary clues that change meaning',
)
CROSS_SUBJECT=('Next Generation Science Standards','nextgenscience.org','NGSS science','Common Core Mathematics/ELA','Common Core Mathematics')
REQUIRED_MAPPING_TERMS=('Australian Curriculum v9.0','Victorian Curriculum F-10','NSW','Common Core','Key Stage','Canada','New Zealand','NCERT / CBSE')
def english_pages():
 pages=[]
 for year_root in YEAR_ROOTS:
  english=year_root/'english'
  if not english.is_dir(): continue
  pages += [p for p in english.glob('*/index.html') if re.match(r'ac9e',p.parent.name,re.I)]
 return sorted(pages)
def main():
 errors=[]; pages=english_pages()
 if not pages: print('FAIL: no canonical English topic pages found.'); sys.exit(1)
 for page in pages:
  source=page.read_text(encoding='utf-8',errors='replace'); low=source.lower(); rel=page.relative_to(ROOT)
  for phrase in GENERIC_FILLER:
   if phrase.lower() in low: errors.append(f'{rel}: generic English boilerplate remains: {phrase}')
  for phrase in CROSS_SUBJECT:
   if phrase.lower() in low: errors.append(f'{rel}: cross-subject curriculum mapping/reference remains: {phrase}')
  if 'international curriculum mapping' not in low:
   errors.append(f'{rel}: missing international curriculum mapping section')
  else:
   for term in REQUIRED_MAPPING_TERMS:
    if term.lower() not in low: errors.append(f'{rel}: mapping is missing expected English/ELA jurisdiction marker: {term}')
  if 'common mistakes' not in low and 'student misconceptions' not in low:
   errors.append(f'{rel}: missing misconceptions section')
  if 'explicit teaching' not in low or 'formative assessment' not in low:
   errors.append(f'{rel}: missing four-step English instructional sequence')
  if 'subject-specific content' not in low and 'key examples' not in low:
   errors.append(f'{rel}: missing subject-specific examples section')
  if 'rel="canonical"' not in low and "rel='canonical'" not in low:
   errors.append(f'{rel}: missing canonical link')
  for href in ('/worksheet/','/practice/','/test/'):
   if href not in low: errors.append(f'{rel}: missing resource link containing {href}')
  if 'mathjax' in low or 'katex' in low:
   errors.append(f'{rel}: external math renderer is not allowed on topic pages')
 if errors:
  for error in errors[:300]: print(error)
  if len(errors)>300: print(f'...and {len(errors)-300} more')
  print(f'FAIL: {len(errors)} English topic-page quality errors across {len(pages)} pages.'); sys.exit(1)
 print(f'PASS: {len(pages)} English topic pages satisfy the locked structural and cross-curriculum quality gate.')
if __name__=='__main__': main()
