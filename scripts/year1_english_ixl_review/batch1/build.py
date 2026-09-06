"""Materialise the five reviewed Year 1 English language banks only."""
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SKILLS={
 'la01':'language, facial expressions and gestures in interactions',
 'la02':'reasons for likes, dislikes and preferences',
 'la03':'text organisation matched to purpose',
 'la04':'repetition, rhyme and rhythm connecting poems, chants and songs',
 'la05':'print and screen organisation and navigation',
}
REFS={
 'la01':'https://au.ixl.com/ela/year-1/describe-the-difference-between-related-words',
 'la02':'https://au.ixl.com/ela/year-1/compare-pictures-using-adjectives',
 'la03':None,
 'la04':'https://au.ixl.com/ela/year-1/complete-the-poem-with-a-word-that-rhymes',
 'la05':None,
}
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
  bank.append({'id':f'{code.lower()}-er1-{mode[0]}-{number:03}','subject':'english','year_level':'Year 1','curriculum_code':code,'bank':mode,'skill':skill,'question':question,'audio_prompt':question,'visual':{'type':'none','alt_text':''},'answers':[{'text':a,'is_correct':j==pos} for j,a in enumerate(answers)],'correct_index':pos,'explanation':{'summary':explanation,'hint':'Read the whole example and check what the question asks.'},'stage':stage,'difficulty':min(i//8+1,3) if i<24 else 3,'difficulty_tier':stage,'sequence_priority':number,'review':{'version':'20260906-english-review-1','status':'editorially-reviewed','ixl_reference_url':REFS[short],'evidence_scope':('Representative related IXL task inspected; curriculum determines full coverage.' if REFS[short] else 'No direct task mapped by IXL; official curriculum-led review.')+' See docs/question-bank-reviews/2026-09-06-year1-english-la01-la05.md. No measured equivalence or IXL endorsement.'}})
 assert len({q['question'] for q in bank})==40
 (ROOT/f'assets/assessment-banks/year1/english/{code.lower()}.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
 print(code,'24 Practice + 16 Test; text only')
