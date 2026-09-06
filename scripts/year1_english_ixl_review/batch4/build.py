"""Materialise the five reviewed Year 1 English literacy banks only."""
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SKILLS={
 'ly01':'text features indicating purposes',
 'ly02':'turn-taking, listening and relevant contributions',
 'ly03':'comparing imaginative, informative and persuasive texts',
 'ly04':'reading words and short texts accurately and monitoring meaning',
 'ly05':'literal meaning, inference and comprehension strategies',
}
REFS={
 'ly01':None,
 'ly02':None,
 'ly03':'https://au.ixl.com/ela/year-1/which-could-happen-in-real-life',
 'ly04':'https://au.ixl.com/ela/year-1/complete-the-sentence-with-the-correct-short-vowel-word',
 'ly05':'https://au.ixl.com/ela/year-1/what-will-happen-next',
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
  bank.append({'id':f'{code.lower()}-er4-{mode[0]}-{number:03}','subject':'english','year_level':'Year 1','curriculum_code':code,'bank':mode,'skill':skill,'question':question,'audio_prompt':question,'visual':{'type':'none','alt_text':''},'answers':[{'text':a,'is_correct':j==pos} for j,a in enumerate(answers)],'correct_index':pos,'explanation':{'summary':explanation,'hint':'Read the whole example and check what the question asks.'},'stage':stage,'difficulty':min(i//8+1,3) if i<24 else 3,'difficulty_tier':stage,'sequence_priority':number,'review':{'version':'20260906-english-review-4','status':'editorially-reviewed','ixl_reference_url':REFS[short],'evidence_scope':('Representative related IXL task inspected; curriculum determines full coverage.' if REFS[short] else 'No direct task mapped by IXL; official curriculum-led review.')+' See docs/question-bank-reviews/2026-09-06-year1-english-ly01-ly05.md. No measured equivalence or IXL endorsement.'}})
 assert len({q['question'] for q in bank})==40
 (ROOT/f'assets/assessment-banks/year1/english/{code.lower()}.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
 print(code,'24 Practice + 16 Test; text only')
