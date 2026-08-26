#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root='year9/science';
const expected=[...Array.from({length:7},(_,i)=>`AC9S9U0${i+1}`),...Array.from({length:4},(_,i)=>`AC9S9H0${i+1}`),...Array.from({length:8},(_,i)=>`AC9S9I0${i+1}`)];
const requiredIds=['learn','prerequisites','teaching','examples','misconceptions','guided-practice','independent-practice','reasoning','important-questions','assessment','mastery','guidance','alignment','resources','related','official-references'];
const bannedRuntime=/(?:year9-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render)\.js/i;
function text(html){return html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();}
function isRedirect(html){return /name=["']robots["'][^>]*noindex/i.test(html)&&(/http-equiv=["']refresh["']/i.test(html)||/location\.replace\s*\(/i.test(html));}
function codeFrom(html,dir){return text(html).match(/AC9S9(?:U0[1-7]|H0[1-4]|I0[1-8])/i)?.[0]?.toUpperCase()||dir.match(/ac9s9(?:u0[1-7]|h0[1-4]|i0[1-8])/i)?.[0]?.toUpperCase()||null;}
function sectionBlock(html,id){const re=new RegExp(`<details\\b[^>]*\\bid=["']${id}["'][^>]*>`,'i');const m=re.exec(html);if(!m)return'';const tail=html.slice(m.index+m[0].length);const next=tail.search(/<details\b[^>]*class=["'][^"']*curriculum-topic-section/i);return m[0]+(next>=0?tail.slice(0,next):tail);}
function liCount(s){return(s.match(/<li\b/gi)||[]).length;}
const failures=[];const found=new Map();
for(const entry of fs.readdirSync(root,{withFileTypes:true})){
 if(!entry.isDirectory())continue;const file=path.join(root,entry.name,'index.html');if(!fs.existsSync(file))continue;const html=fs.readFileSync(file,'utf8');if(isRedirect(html))continue;const code=codeFrom(html,entry.name);if(!code||!expected.includes(code))continue;
 if(found.has(code))failures.push(`${code}: multiple canonical-looking pages (${found.get(code)}, ${file})`);found.set(code,file);const p=[];
 if(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*index[^"']*follow/i.test(html))p.push('missing index,follow robots');
 const canonical=html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];if(canonical!==`https://skillrhub.com/year9/science/${entry.name}/`)p.push(`canonical mismatch: ${canonical||'(missing)'}`);
 const h1=text(html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)?.[0]||'');if(!h1.includes(code))p.push('H1 does not include curriculum code');
 if(!/<title>[\s\S]*AC9S9/i.test(html)||!/<meta\b[^>]*name=["']description["']/i.test(html))p.push('missing unique SEO title/meta contract');
 if(!/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?LearningResource/i.test(html))p.push('missing LearningResource schema');
 if(!/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?BreadcrumbList/i.test(html))p.push('missing BreadcrumbList schema');
 if(!/educationalAlignment/i.test(html))p.push('missing educationalAlignment structured data');
 if(!/Australian Curriculum v9\.0/i.test(html)||!/Victorian Curriculum F/i.test(html)||!/NSW Science 7/i.test(html))p.push('missing visible Australian/Victoria/NSW alignment');
 if(!/(Exact|Partial|Supporting)/i.test(sectionBlock(html,'alignment')))p.push('alignment relationship strength not stated');
 for(const id of requiredIds){if(!new RegExp(`\\bid=["']${id}["']`,'i').test(html))p.push(`missing #${id}`);}
 if(!/href=["'][^"']*teacher-slides[^"']*\//i.test(html))p.push('missing Teacher Slides route');if(!/href=["'][^"']*\/homework\//i.test(html))p.push('missing Homework route');if(!/href=["'][^"']*\/practice\//i.test(html))p.push('missing Practice route');if(!/href=["'][^"']*\/test\//i.test(html))p.push('missing Test route');if(/href=["'][^"']*\/worksheet\//i.test(html))p.push('duplicate Worksheet CTA reintroduced');
 if(!/data-report-issue/i.test(html)||!/report-issue\.js/i.test(html))p.push('missing Report issue control');if(!/G-8P22BET45N/.test(html))p.push('analytics regression');if(!/ca-pub-7734963540104771/.test(html))p.push('AdSense integration regression');
 if(liCount(sectionBlock(html,'learn'))<3)p.push('learning goals too thin');if((sectionBlock(html,'examples').match(/worked-example/gi)||[]).length<3)p.push('fewer than 3 worked/modelled examples');if(liCount(sectionBlock(html,'misconceptions'))<2)p.push('misconceptions too thin');if(liCount(sectionBlock(html,'independent-practice'))<5)p.push('independent practice too thin');if(liCount(sectionBlock(html,'assessment'))<3)p.push('assessment practice too thin');if(liCount(sectionBlock(html,'important-questions'))<3)p.push('important Q&A too thin');
 if(bannedRuntime.test(html))p.push('runtime curriculum renderer detected');if(/<script[^>]+src=["'][^"']*(?:content|lesson|curriculum)[^"']*\.js/i.test(html))p.push('core curriculum appears runtime-loaded');
 if(code.startsWith('AC9S9U')&&!/science-concept-diagram|science-flow/i.test(sectionBlock(html,'examples')))p.push('Science Understanding page lacks a purposeful native diagram/model');
 if(p.length)failures.push(`${file}\n  - ${p.join('\n  - ')}`);
}
for(const code of expected)if(!found.has(code))failures.push(`${code}: canonical Year 9 Science page not found`);if(found.size!==expected.length)failures.push(`Expected ${expected.length} canonical Year 9 Science pages, found ${found.size}`);
if(failures.length){console.error('Year 9 Science Static Curriculum Architecture v2 quality gate FAILED:\n');failures.forEach(x=>console.error(`- ${x}`));process.exit(1);}console.log(`Year 9 Science static v2 PASS: ${found.size}/${expected.length} canonical pages; static lesson depth, resources, SEO, schemas, diagrams and state alignment intact.`);
