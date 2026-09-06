"""Materialise only the final five reviewed Year 1 English banks."""
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SKILLS={'ly11':'reading and writing words using vowel and consonant patterns','ly12':'letters with different sounds and vowel sounds in syllables','ly13':'spelling words with common patterns','ly14':'reading and writing high frequency words','ly15':'grammatical endings and meaningful word families'}
REFS={'ly11':'complete-the-word-with-the-right-vowel-digraph','ly12':'sort-short-and-long-vowel-words','ly13':'complete-the-two-syllable-words','ly14':'spell-the-sight-word','ly15':'form-regular-plurals-with-s-and-es'}
for short,skill in SKILLS.items():
 rows=[r.split('|') for r in (HERE/(short+'.txt')).read_text().splitlines() if r]
 assert len(rows)==40,(short,len(rows))
 bank=[];counts={'practice':0,'test':0}
 for i,row in enumerate(rows):
  code='AC9E1'+short.upper();mode='practice' if i<24 else 'test';n=i+1 if i<24 else i-23
  assert len(row)==(5 if short in ['ly12','ly15'] else 2),(short,i,row)
  adult=len(row)==2 or row[2]=='OPEN';stage=['recognise','apply','reason'][min(i//8,2)] if mode=='practice' else 'independent'
  q=dict(id=f'{code.lower()}-er6-{mode[0]}-{n:03}',subject='english',year_level='Year 1',curriculum_code=code,bank=mode,skill=skill,question=row[0],audio_prompt=row[0],visual={'type':'none','alt_text':''},stage=stage,difficulty=min(i//8+1,3) if mode=='practice' else 3,difficulty_tier=stage,sequence_priority=n,explanation={'summary':row[-1],'hint':'Complete the task before comparing with the model. A grown-up checks reading and writing.' if adult else 'Say the words and check the whole example.'},review={'version':'20260906-english-review-6','status':'editorially-reviewed','ixl_reference_url':'https://au.ixl.com/ela/year-1/'+REFS[short],'evidence_scope':'Representative IXL task inspected; response format and curriculum coverage are documented in docs/question-bank-reviews/2026-09-06-year1-english-ly11-ly15.md. No measured equivalence or endorsement.'})
  if adult:
   q.update(answers=[],correct_index=None,grading_mode='adult-review',model_answer=row[1],acceptance_note=row[-1],response_instructions='Try reading the target words yourself before using Read aloud. Complete the writing on paper; a grown-up checks both parts.' if short in ['ly11','ly14'] else 'A grown-up says the target word without showing its spelling. Write it on paper before checking.' if short=='ly13' else 'Write your response on paper or here. A grown-up checks it.',completion_label='I have completed the reading and writing task.' if short in ['ly11','ly14'] else 'I have completed the writing on paper.')
  else:
   answers=row[1:4];pos=counts[mode]%3;counts[mode]+=1;answers=answers[-pos:]+answers[:-pos] if pos else answers
   q.update(answers=[{'text':a,'is_correct':j==pos} for j,a in enumerate(answers)],correct_index=pos)
  bank.append(q)
 assert len({q['question'] for q in bank})==40
 (ROOT/f'assets/assessment-banks/year1/english/{code.lower()}.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
 print(code,'40 items;',sum(q.get('grading_mode')=='adult-review' for q in bank),'performance tasks')
