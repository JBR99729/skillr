#!/usr/bin/env python3
"""Build an internal, offline SEO evidence report; never edits production pages."""
import argparse,csv,json,re,html,collections
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a' and a.get('href'):self.links.append(a['href'])
def main():
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--study',type=Path,required=True);a=p.parse_args();root=a.source;out=a.study
 inventory=json.loads((out/'heading-metadata-audit.json').read_text());metadata={r['url']:r for r in inventory['rows']}
 pages=json.loads((out/'australia-pages.json').read_text());queries=json.loads((out/'australia-query_pages.json').read_text());pm={r['page']:r for r in pages['rows']};gm={r['page']:r for r in json.loads((out/'global-pages.json').read_text())['rows']};qm=collections.defaultdict(list)
 for r in queries['rows']:qm[r['page']].append(r)
 topics={};hub_count=0
 for year in ['foundation']+['year'+str(i) for i in range(1,11)]:
  for subject in ['maths','english','science']:
   f=root/year/'curriculum'/subject/'index.html'
   if not f.exists():continue
   hub_count+=1;parser=Links();parser.feed(f.read_text());base=f'https://skillrhub.com/{year}/curriculum/{subject}/'
   for href in parser.links:
    u=urljoin(base,href);parts=urlsplit(u);codes=re.findall(r'ac9[a-z]+\d*[a-z]*\d+',parts.path,re.I)
    if parts.netloc!='skillrhub.com' or not parts.path.startswith(f'/{year}/{subject}/') or not codes:continue
    u=parts._replace(fragment='',query='').geturl();code=codes[-1].upper();key=(year,subject,code)
    if key not in topics:topics[key]={'year':year,'subject':subject,'code':code,'guide':u,'hub':base}
 rows=[]
 for (year,subject,code),t in sorted(topics.items()):
  guide=t['guide'];m=metadata.get(guide,{});metric=pm.get(guide,{});family=[u for u in metadata if code.lower() in u.lower()];observed=[q for u in family for q in qm[u]];shared=collections.defaultdict(set)
  for q in observed:shared[q['query']].add(q['page'])
  overlap=[q for q,urls in shared.items() if len(urls)>1]
  h=m.get('h1','');title=m.get('title','');codefirst=bool(re.match('AC9',h,re.I));impressions=metric.get('impressions',0);family_impressions=sum(pm.get(u,{}).get('impressions',0) for u in family)
  reason='No reported Australian guide impressions; inspect indexing before changing copy'
  if impressions:reason='Observed guide visibility; assess specific query intent'
  if family_impressions and not impressions:reason='Related resources visible, guide absent from returned page data; inspect guide canonical/indexing'
  if overlap:reason='Shared query across related URLs; review intent overlap (not confirmed cannibalisation)'
  row={**t,'title':title,'h1':h,'description':m.get('description',''),'guide_impressions':impressions,'global_guide_impressions':gm.get(guide,{}).get('impressions',0),'guide_position':metric.get('position',''),'family_page_impressions':family_impressions,'family_urls':len(family),'observed_queries':len(observed),'shared_query_count':len(overlap),'code_first_h1':codefirst,'index_status':'Unknown — URL Inspection not available','priority_reason':reason,'candidate_phrase':re.sub(r'\s*\|.*','',re.sub(r'\s*AC9\w+','',title,flags=re.I)).strip(' :|'),'query_evidence':observed}
  rows.append(row)
 groups=[]
 for (year,subject),rr in __import__('itertools').groupby(rows,key=lambda r:(r['year'],r['subject'])):
  rr=list(rr);groups.append({'year':year,'subject':subject,'guides':len(rr),'with_reported_au_impressions':sum(r['guide_impressions']>0 for r in rr),'guide_impressions':sum(r['guide_impressions'] for r in rr)})
 summary={'source_commit':inventory['base'],'period':[pages['start'],pages['end']],'country':'Australia','subject_hubs':hub_count,'unique_code_subject_entries':len(rows),'unique_codes':len(set(r['code'] for r in rows)),'guides_with_reported_global_impressions':sum(r['global_guide_impressions']>0 for r in rows),'guides_with_reported_au_impressions':sum(r['guide_impressions']>0 for r in rows),'guides_without_reported_au_impressions':sum(r['guide_impressions']==0 for r in rows),'code_first_h1':sum(r['code_first_h1'] for r in rows),'returned_au_page_rows':len(pm),'returned_au_query_page_rows':len(queries['rows']),'groups':groups}
 (out/'catalogue-visibility.json').write_text(json.dumps({'summary':summary,'topics':rows},indent=2))
 keys=[k for k in rows[0] if k!='query_evidence']
 with (out/'catalogue-visibility.csv').open('w') as f:
  w=csv.DictWriter(f,fieldnames=keys);w.writeheader();w.writerows({k:r[k] for k in keys} for r in rows)
 e=html.escape
 body=''.join('<tr>'+''.join('<td>'+e(str(r[k]))+'</td>' for k in ['year','subject','code','global_guide_impressions','guide_impressions','h1','priority_reason'])+'<td><a href="'+e(r['guide'])+'">Open guide</a></td></tr>' for r in rows)
 (out/'visibility-report.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta name="viewport" content="width=device-width"><title>SkillrHub SEO visibility study</title><style>body{font:16px system-ui;margin:30px;color:#172c3c}input{padding:12px;width:90%;max-width:700px}table{border-collapse:collapse;font-size:13px;width:100%;margin-top:20px}td,th{padding:10px;border-bottom:1px solid #ddd;text-align:left}th{background:#eef5f7;position:sticky;top:0}h1{font-size:28px}.scroll{overflow:auto}</style><h1>SkillrHub catalogue visibility</h1><p>Australia · 20 September–17 October 2026 · Internal audit</p><p>'''+e(str(summary['unique_code_subject_entries']))+''' curriculum entries; '''+e(str(summary['guides_with_reported_global_impressions']))+''' guides with reported global impressions.</p><p><strong>No reported impressions does not mean not indexed.</strong> The connector page breakdown is incomplete relative to country totals; absent rows are unknown. Source tags and Search Console performance are separate from Google's indexing decisions. Family page impressions can count multiple results for the same search; do not add them as site totals. Candidate wording is not measured keyword demand.</p><label>Filter by year, subject, code or heading <input id="filter" type="search"></label><div class="scroll"><table><thead><tr>'''+''.join('<th>'+x+'</th>' for x in ['Year','Subject','Code','Global guide impressions','AU reported impressions','H1','Next investigation','Link'])+'</tr></thead><tbody>'+body+'''</tbody></table></div><script>document.getElementById('filter').addEventListener('input',e=>{const q=e.target.value.toLowerCase();for(const r of document.querySelectorAll('tbody tr'))r.hidden=!r.textContent.toLowerCase().includes(q)})</script></html>''')
 print(json.dumps(summary,indent=2))
if __name__=='__main__':main()
