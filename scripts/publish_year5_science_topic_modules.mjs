import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const codes=[...fs.readFileSync(path.join(root,"assets/year5-science-data.js"),"utf8").matchAll(/\b(AC9S5(?:U|H|I)\d{2}):mk\(\{\s*\n\s*slug:"([^"]+)"/g)].map(([,code,slug])=>({code,slug}));
if(codes.length!==12) throw new Error(`Expected 12 codes, found ${codes.length}`);
const scripts=`<script src="/assets/year5-curriculum-base.js?v=4"></script>\n<script src="/assets/year5-science-data.js?v=4"></script>`;
for(const {code,slug} of codes){
  const routeSlug=fs.readdirSync(path.join(root,"year5/science")).find(name=>name.startsWith(code.toLowerCase()+"-"));
  if(!routeSlug) throw new Error(`Missing topic route for ${code}`);
  const topic=path.join(root,"year5/science",routeSlug,"index.html");
  let html=fs.readFileSync(topic,"utf8");
  if(!html.includes("year5-curriculum-render.js")) html=html.replace('<script src="/pwa-register.js"></script>',`${scripts}\n<script src="/assets/year5-curriculum-render.js?v=4"></script>\n<script src="/pwa-register.js"></script>`);
  fs.writeFileSync(topic,html);
  const worksheet=path.join(root,"quiz/year-5/science",code.toLowerCase(),"worksheet/index.html");
  html=fs.readFileSync(worksheet,"utf8");
  if(html.includes("year5-curriculum-worksheet-page.js")) continue;
  const first=html.indexOf("<script>window.quizConfig");
  const last=html.indexOf('<script src="/pwa-register.js"></script>');
  if(first<0||last<0) throw new Error(`Unexpected worksheet shell: ${worksheet}`);
  html=html.slice(0,first)+`${scripts}<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script><script src="/assets/curriculum-cluster-core.js?v=1"></script><script src="/assets/multi-strand-worksheet-pack.js?v=2"></script><script src="/assets/year5-curriculum-worksheet-page.js?v=4"></script>`+html.slice(last);
  fs.writeFileSync(worksheet,html);
}
console.log(`Published Year 5 Science topic modules for ${codes.length} codes.`);
