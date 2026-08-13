import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const dataFiles=["n1","n2","n3","a","m1","m2","sp","st","p"];
const topicScripts=["<script src=\"/assets/year3-maths-data-base.js?v=2\"></script>",...dataFiles.map(x=>`<script src="/assets/year3-maths-data-${x}.js?v=2"></script>`),"<script src=\"/assets/year3-maths-render.js?v=2\"></script>"].join("\n");
const topicDir=path.join(root,"year3/maths");
for(const entry of fs.readdirSync(topicDir,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const file=path.join(topicDir,entry.name,"index.html"); if(!fs.existsSync(file))continue;
  let html=fs.readFileSync(file,"utf8");
  if(!html.includes("year3-maths-render.js")) html=html.replace('<script src="/pwa-register.js"></script>',`${topicScripts}\n<script src="/pwa-register.js"></script>`);
  fs.writeFileSync(file,html);
}
const worksheetRoot=path.join(root,"quiz/year-3/math");
for(const entry of fs.readdirSync(worksheetRoot,{withFileTypes:true}).filter(x=>x.isDirectory())){
  const file=path.join(worksheetRoot,entry.name,"worksheet/index.html"); if(!fs.existsSync(file))continue;
  let html=fs.readFileSync(file,"utf8");
  if(!html.includes("year3-maths-worksheet-page.js")) html=html.replace('<script src="/pwa-register.js"></script>','<script src="/assets/year3-maths-worksheet-page.js?v=2"></script><script src="/pwa-register.js"></script>');
  fs.writeFileSync(file,html);
}
console.log("Published Year 3 Maths topic modules to 23 topic and 23 worksheet routes.");
