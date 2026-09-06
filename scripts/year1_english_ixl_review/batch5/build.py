"""Author only LY06-LY10; performance tasks use the existing adult-review flow."""
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SKILLS={'ly06':'creating and editing short texts','ly07':'creating and delivering short presentations','ly08':'handwriting words with unjoined letters','ly09':'segmenting spoken phonemes including clusters','ly10':'adding, deleting and substituting spoken phonemes'}
REFS={'ly06':'complete-the-sentence-with-the-best-verb','ly07':None,'ly08':None,'ly09':'does-the-word-start-with-a-consonant-blend','ly10':'identify-each-sound-in-a-word'}
for short,skill in SKILLS.items():
 rows=[r.split('|') for r in (HERE/(short+'.txt')).read_text().splitlines() if r]
 assert len(rows)==40,(short,len(rows))
 bank=[];mcq_counts={'practice':0,'test':0}
 for i,row in enumerate(rows):
  code='AC9E1'+short.upper();mode='practice' if i<24 else 'test';n=i+1 if i<24 else i-23
  assert len(row)==(5 if short=='ly06' else 2),(short,i,row)
  adult=short!='ly06' or row[2]=='OPEN'
  question=row[0];guide=row[-1]
  if short in ['ly09','ly10']:
   question='Grown-up: keep the screen out of the child\'s view. '+question
  stage=['recognise','apply','reason'][min(i//8,2)] if mode=='practice' else 'independent'
  q=dict(id=f'{code.lower()}-er5-{mode[0]}-{n:03}',subject='english',year_level='Year 1',curriculum_code=code,bank=mode,skill=skill,question=question,audio_prompt=question,visual={'type':'none','alt_text':''},stage=stage,difficulty=min(i//8+1,3) if mode=='practice' else 3,difficulty_tier=stage,sequence_priority=n,explanation={'summary':guide,'hint':'Complete the task before comparing your response with the guidance.' if adult else 'Read the whole sentence and check its meaning.'},review={'version':'20260906-english-review-5','status':'editorially-reviewed','ixl_reference_url':('https://au.ixl.com/ela/year-1/'+REFS[short]) if REFS[short] else None,'evidence_scope':'Representative related IXL task inspected where mapped; official curriculum sets the performance requirement. See docs/question-bank-reviews/2026-09-06-year1-english-ly06-ly10.md. No measured equivalence or endorsement.'})
  if adult:
   q.update(answers=[],correct_index=None,grading_mode='adult-review',model_answer=row[1],acceptance_note=guide,response_instructions=('Complete the spoken task with a grown-up, who will check the response. Do not use letter names in place of speech sounds.' if short in ['ly09','ly10'] else 'Do the task on paper.' if short=='ly08' else 'Deliver your short talk to a grown-up.' if short=='ly07' else 'Write your response on paper or here. A grown-up will check it.'),completion_label='I have completed the task with a grown-up.' if short in ['ly07','ly09','ly10'] else 'I have completed the writing on paper.')
  else:
   answers=row[1:4];pos=mcq_counts[mode]%3;mcq_counts[mode]+=1;answers=answers[-pos:]+answers[:-pos] if pos else answers
   q.update(answers=[{'text':a,'is_correct':j==pos} for j,a in enumerate(answers)],correct_index=pos)
  bank.append(q)
 assert len({q['question'] for q in bank})==40
 (ROOT/f'assets/assessment-banks/year1/english/{code.lower()}.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
 print(code,'40 items;',sum(q.get('grading_mode')=='adult-review' for q in bank),'performance tasks')
