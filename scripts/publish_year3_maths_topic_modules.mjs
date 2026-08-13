import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const dataFiles=["n1","n2","n3","a","m1","m2","sp","st","p"];
const CACHE_VERSION=4;
const v11Scripts=[`<script src="/assets/year3-maths-elaboration-map.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-profiles-number-algebra.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-profiles-measurement.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-profiles-space-stat-prob.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-canonical.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-render.js?v=${CACHE_VERSION}"></script>`,`<script src="/assets/year3-maths-v11-init.js?v=${CACHE_VERSION}"></script>`];
const topicScripts=[`<script src="/assets/year3-maths-data-base.js?v=${CACHE_VERSION}"></script>`,...dataFiles.map(x=>`<script src="/assets/year3-maths-data-${x}.js?v=${CACHE_VERSION}"></script>`),`<script src="/assets/year3-maths-render.js?v=${CACHE_VERSION}"></script>`,...v11Scripts].join("\n");
const topicDir=path.join(root,"year3/maths");
for(const entry of fs.readdirSync(topicDir,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const file=path.join(topicDir,entry.name,"index.html"); if(!fs.existsSync(file))continue;
  let html=fs.readFileSync(file,"utf8");
  if(!html.includes("year3-maths-render.js")) html=html.replace('<script src="/pwa-register.js"></script>',`${topicScripts}\n<script src="/pwa-register.js"></script>`);
  html=html.replace(/(year3-maths-(?:data-(?:base|n1|n2|n3|a|m1|m2|sp|st|p)|render|elaboration-map|v11-profiles-(?:number-algebra|measurement|space-stat-prob)|v11-canonical|v11-render|v11-init)\.js)\?v=\d+/g,`$1?v=${CACHE_VERSION}`);
  if(!html.includes("year3-maths-v11-init.js")) html=html.replace('<script src="/pwa-register.js"></script>',`${v11Scripts.join("\n")}\n<script src="/pwa-register.js"></script>`);
  for(const script of v11Scripts)if(!html.includes(script.match(/src="([^"]+)/)[1]))html=html.replace('<script src="/assets/year3-maths-v11-canonical.js?v=4"></script>',`${script}\n<script src="/assets/year3-maths-v11-canonical.js?v=4"></script>`);
  fs.writeFileSync(file,html);
}
const worksheetRoot=path.join(root,"quiz/year-3/math");
for(const entry of fs.readdirSync(worksheetRoot,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const file=path.join(worksheetRoot,entry.name,"worksheet/index.html"); if(!fs.existsSync(file))continue;
  let html=fs.readFileSync(file,"utf8");
  if(!html.includes("year3-maths-worksheet-page.js")) html=html.replace('<script src="/pwa-register.js"></script>',`<script src="/assets/year3-maths-worksheet-page.js?v=${CACHE_VERSION}"></script><script src="/pwa-register.js"></script>`);
  html=html.replace(/year3-maths-worksheet-page\.js\?v=\d+/g,`year3-maths-worksheet-page.js?v=${CACHE_VERSION}`);
  fs.writeFileSync(file,html);
  for(const number of [1,2]){
    const slug=`topic-practice-${number}`, directory=path.join(path.dirname(file),slug), target=path.join(directory,"index.html");
    fs.mkdirSync(directory,{recursive:true});
    const routed=html
      .replace(/<title>[^<]*<\/title>/,`<title>${entry.name.toUpperCase()} Topic Practice ${number} | SkillrHub</title>`)
      .replace(/<link rel="canonical" href="[^"]+">/,`<link rel="canonical" href="https://skillrhub.com/quiz/year-3/math/${entry.name}/worksheet/${slug}/">`);
    fs.writeFileSync(target,routed);
  }
}
const slideFile=path.join(root,"worksheets/year3/maths/teacher-slides/live.html");
let slideHtml=fs.readFileSync(slideFile,"utf8").replace(/(year3-maths-(?:data-(?:base|n1|n2|n3|a|m1|m2|sp|st|p)|slide|elaboration-map|v11-profiles-(?:number-algebra|measurement|space-stat-prob)|v11-canonical|v11-render|v11-init)\.js)\?v=\d+/g,`$1?v=${CACHE_VERSION}`);
if(!slideHtml.includes("year3-maths-v11-init.js")) slideHtml=slideHtml.replace('<script src="/pwa-register.js"></script>',`${v11Scripts.join("\n")}\n<script src="/pwa-register.js"></script>`);
for(const script of v11Scripts)if(!slideHtml.includes(script.match(/src="([^"]+)/)[1]))slideHtml=slideHtml.replace('<script src="/assets/year3-maths-v11-canonical.js?v=4"></script>',`${script}\n<script src="/assets/year3-maths-v11-canonical.js?v=4"></script>`);
fs.writeFileSync(slideFile,slideHtml);
console.log("Published Year 3 Maths topic modules to 23 topics, 23 compatible worksheet entries and 46 direct topic-practice routes.");
