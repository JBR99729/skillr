"""Materialise the five reviewed Year 1 English language banks only."""
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
from visuals import V
import html
SKILLS={
 'la06':'complete simple sentences and their parts',
 'la07':'word roles in sentences',
 'la08':'comparing how images contribute to meaning across text types',
 'la09':'learning-area vocabulary in context',
 'la10':'end punctuation and capitals for familiar proper nouns',
}
REFS={
 'la06':'https://au.ixl.com/ela/year-1/is-it-the-naming-or-action-part-of-the-sentence',
 'la07':'https://au.ixl.com/ela/year-1/identify-adjectives',
 'la08':'https://au.ixl.com/ela/year-1/which-feeling-matches-the-picture',
 'la09':'https://au.ixl.com/ela/year-1/use-context-to-identify-the-meaning-of-a-word',
 'la10':'https://au.ixl.com/ela/year-1/choose-the-right-end-mark',
}
assets=ROOT/'assets/assessment-visuals/year1/english/ixl-review-2'
assets.mkdir(parents=True,exist_ok=True)
for short,skill in SKILLS.items():
 code='AC9E1'+short.upper()
 rows=[line.split('|') for line in (HERE/(short+'.txt')).read_text().splitlines() if line and not line.startswith('#')]
 assert len(rows)==40
 bank=[]
 for i,row in enumerate(rows):
  assert len(row)==5,(code,i,row)
  question,correct,wrong1,wrong2,explanation=row
  answers=[correct,wrong1,wrong2];pos=i%3
  answers=answers[-pos:]+answers[:-pos] if pos else answers
  mode='practice' if i<24 else 'test';number=i+1 if i<24 else i-23
  stage=['recognise','apply','reason'][min(i//8,2)] if i<24 else 'independent'
  visual={'type':'none','alt_text':''}
  if short=='la08' and i+1 in V:
   body,alt=V[i+1];name=f'{code.lower()}-{i+1:02}.svg'
   svg=f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 300" role="img" aria-label="{html.escape(alt,quote=True)}"><defs><symbol id="model" viewBox="0 0 640 300">{body}</symbol></defs><use href="#model" xlink:href="#model" width="640" height="300"/></svg>\n'
   (assets/name).write_text(svg)
   visual={'type':'svg','alt_text':alt,'asset_path':f'/assets/assessment-visuals/year1/english/ixl-review-2/{name}#model'}
  bank.append({'id':f'{code.lower()}-er2-{mode[0]}-{number:03}','subject':'english','year_level':'Year 1','curriculum_code':code,'bank':mode,'skill':skill,'question':question,'audio_prompt':question,'visual':visual,'answers':[{'text':a,'is_correct':j==pos} for j,a in enumerate(answers)],'correct_index':pos,'explanation':{'summary':explanation,'hint':'Read the whole example and check what the question asks.'},'stage':stage,'difficulty':min(i//8+1,3) if i<24 else 3,'difficulty_tier':stage,'sequence_priority':number,'review':{'version':'20260906-english-review-2','status':'editorially-reviewed','ixl_reference_url':REFS[short],'evidence_scope':('Representative related IXL task inspected; curriculum determines full coverage.' if REFS[short] else 'No direct task mapped by IXL; official curriculum-led review.')+' See docs/question-bank-reviews/2026-09-06-year1-english-la06-la10.md. No measured equivalence or IXL endorsement.'}})
 for item in bank:
  if any(a['text'] in ['?','.',',','!'] for a in item['answers']):
   item['audio_answers']=[{'?':'question mark','.':'full stop',',':'comma','!':'exclamation mark'}.get(a['text'],a['text']) for a in item['answers']]
 assert len({q['question'] for q in bank})==40
 (ROOT/f'assets/assessment-banks/year1/english/{code.lower()}.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
 print(code,'24 Practice + 16 Test;',sum(q['visual']['type']=='svg' for q in bank),'visuals')
