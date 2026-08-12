(() => {
  "use strict";

  if (window.SkillrConceptSvg) return;

  const W = 960;
  const H = 300;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[char]));
  const words = (value, limit = 44) => {
    const clean = String(value ?? "").replace(/\s+/g, " ").trim();
    if (clean.length <= limit) return clean;
    return `${clean.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
  };
  const text = (x, y, value, cls = "label", anchor = "start") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
  const line = (x1,y1,x2,y2,cls="line") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const rect = (x,y,w,h,cls="shape",rx=12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  const circle = (cx,cy,r,cls="shape") => `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls}"/>`;
  const arrow = (x1,y1,x2,y2,cls="accent-line") => `${line(x1,y1,x2,y2,cls)}<polygon points="${x2},${y2} ${x2-10},${y2-5} ${x2-10},${y2+5}" class="accent-fill"/>`;
  const panel = (x, title, body) => `${rect(x,46,286,224,"panel",16)}${text(x+18,72,title,"panel-title")}${body}`;

  function svgShell(title, body, aria) {
    return `<svg class="skillr-concept-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria || title)}" xmlns="http://www.w3.org/2000/svg"><style>
      .bg{fill:#f8fbff}.panel{fill:#fff;stroke:#cbd9eb;stroke-width:2}.panel-title{font:800 15px Arial,Helvetica,sans-serif;fill:#173968}.label{font:700 13px Arial,Helvetica,sans-serif;fill:#203047}.small{font:600 11px Arial,Helvetica,sans-serif;fill:#52657e}.tiny{font:700 9px Arial,Helvetica,sans-serif;fill:#52657e}.big{font:900 24px Arial,Helvetica,sans-serif;fill:#2457d6}.shape{fill:#dbeafe;stroke:#2457d6;stroke-width:2}.shape2{fill:#dcfce7;stroke:#32945b;stroke-width:2}.shape3{fill:#fef3c7;stroke:#d97706;stroke-width:2}.soft{fill:#eef5ff;stroke:#9dbcf6;stroke-width:1.5}.line{stroke:#173968;stroke-width:3;stroke-linecap:round}.thin{stroke:#7890ad;stroke-width:1.5}.accent-line{stroke:#2457d6;stroke-width:4;stroke-linecap:round}.accent-fill{fill:#2457d6}.warm{fill:#fee2e2;stroke:#ef4444;stroke-width:2}.cool{fill:#dbeafe;stroke:#3b82f6;stroke-width:2}.white{fill:#fff}.dark{fill:#173968}.muted{fill:#52657e}.grid{stroke:#9dbcf6;stroke-width:1}.dash{stroke:#2457d6;stroke-width:2;stroke-dasharray:7 5}.title{font:900 18px Arial,Helvetica,sans-serif;fill:#173968}
    </style><rect width="960" height="300" rx="18" class="bg"/>${text(24,29,words(title,86),"title")}${body}</svg>`;
  }

  function flowPanel(x, labels) {
    const xs = [x+42,x+143,x+244];
    return labels.slice(0,3).map((label,i)=>`${rect(xs[i]-35,118,70,54,i===1?"shape2":"shape",10)}${text(xs[i],142,words(label,13),"small","middle")}`).join("")+arrow(x+78,145,x+108,145)+arrow(x+179,145,x+209,145);
  }

  function mathPanels(unit, lower) {
    const m = words(unit.model_title || "Model", 30);
    const a = words(unit.apply_title || "Apply", 30);
    let first="",second="",third="";

    if (/decimal|tenths|hundredths|place value/.test(lower)) {
      const labels=["ones","tenths","hundredths"];
      first = labels.map((l,i)=>`${rect(40+i*74,104,66,82,i===0?"shape":"soft",9)}${text(73+i*74,126,l,"tiny","middle")}${text(73+i*74,162,["3","4","7"][i],"big","middle")}`).join("")+text(151,172,".","big","middle");
      second = `<g transform="translate(350 91)">${Array.from({length:100},(_,i)=>`<rect x="${(i%10)*14}" y="${Math.floor(i/10)*14}" width="12" height="12" class="${i<47?"shape":"white"}" stroke="#b9c9dd"/>`).join("")}</g>${text(420,248,"47/100 = 0.47","label","middle")}`;
      third = flowPanel(650,["0.6","6/10","60/100"])+text(793,223,"same value","small","middle");
    } else if (/fraction|mixed numeral|improper/.test(lower)) {
      const bar=(x,y,parts,shade)=>Array.from({length:parts},(_,i)=>`<rect x="${x+i*(210/parts)}" y="${y}" width="${210/parts}" height="38" class="${i<shade?"shape":"white"}" stroke="#173968"/>`).join("");
      first = bar(40,108,4,3)+text(145,174,"3/4","big","middle");
      second = bar(365,101,2,1)+bar(365,158,4,2)+text(470,220,"1/2 = 2/4","label","middle");
      third = `<g transform="translate(680 90)">${bar(0,0,4,4)}${bar(0,48,4,3)}</g>${text(785,205,"7/4 = 1 3/4","label","middle")}`;
    } else if (/odd|even|parity/.test(lower)) {
      first = Array.from({length:9},(_,i)=>circle(52+(i%5)*39,105+Math.floor(i/5)*52,13,i===8?"shape3":"shape")).join("")+text(143,225,"one unpaired → odd","label","middle");
      second = Array.from({length:10},(_,i)=>circle(365+(i%5)*39,105+Math.floor(i/5)*52,13,"shape2")).join("")+text(455,225,"all paired → even","label","middle");
      third = flowPanel(650,["odd+odd","two singles pair","even"]);
    } else if (/multipli|divid|array|equal group|fact/.test(lower)) {
      first = `<g transform="translate(48 98)">${Array.from({length:24},(_,i)=>circle((i%6)*34,Math.floor(i/6)*34,10,"shape")).join("")}</g>${text(145,245,"4 × 6 = 24","label","middle")}`;
      second = `<g transform="translate(365 98)">${Array.from({length:28},(_,i)=>circle((i%7)*29,Math.floor(i/7)*34,9,i%7<5?"shape2":"shape3")).join("")}</g>${text(460,245,"split into known facts","small","middle")}`;
      third = flowPanel(650,["56","÷ 7","8"])+text(793,223,"inverse check: 8 × 7","small","middle");
    } else if (/time|duration|clock|am|pm/.test(lower)) {
      const clock=(cx,cy,hx,hy,mx,my)=>`${circle(cx,cy,62,"white")}${circle(cx,cy,62,"shape")}${line(cx,cy,hx,hy)}${line(cx,cy,mx,my,"accent-line")}${text(cx,cy-46,"12","tiny","middle")}${text(cx+48,cy+4,"3","tiny","middle")}${text(cx,cy+54,"6","tiny","middle")}${text(cx-49,cy+4,"9","tiny","middle")}`;
      first = clock(145,145,145,112,186,145)+text(145,234,"3:15","label","middle");
      second = flowPanel(350,["9:35","+25 min","10:00"])+text(493,223,"bridge to a friendly time","small","middle");
      third = flowPanel(650,["60 min","1 hour","convert"]);
    } else if (/area|perimeter/.test(lower)) {
      first = `<g transform="translate(58 92)">${Array.from({length:24},(_,i)=>`<rect x="${(i%6)*29}" y="${Math.floor(i/6)*29}" width="27" height="27" class="shape"/>`).join("")}</g>${text(145,235,"area = 24 square units","small","middle")}`;
      second = `<rect x="370" y="97" width="180" height="116" fill="none" stroke="#ef4444" stroke-width="7"/>${text(460,238,"perimeter = around","small","middle")}`;
      third = flowPanel(650,["identify","measure","label units"]);
    } else if (/angle|turn/.test(lower)) {
      const angle=(cx,cy,deg,label)=>`${line(cx,cy,cx+82,cy)}${line(cx,cy,cx+82*Math.cos(-deg*Math.PI/180),cy+82*Math.sin(-deg*Math.PI/180),"accent-line")}${text(cx+40,cy+57,label,"small","middle")}`;
      first = angle(70,190,45,"acute")+angle(175,190,90,"right");
      second = angle(385,190,130,"obtuse")+angle(495,190,180,"straight");
      third = angle(710,190,250,"reflex")+text(800,225,"compare with 90° and 180°","small","middle");
    } else if (/symmetr|rotation/.test(lower)) {
      first = `<polygon points="145,85 220,145 145,220 70,145" class="shape"/>${line(145,75,145,230,"dash")}${text(145,246,"line symmetry","small","middle")}`;
      second = `<rect x="395" y="105" width="130" height="90" class="shape2"/>${arrow(430,88,500,88)}${text(460,225,"half-turn match","small","middle")}`;
      third = flowPanel(650,["trace","transform","exact overlap"]);
    } else if (/grid|map|position|pathway/.test(lower)) {
      first = `<g transform="translate(55 88)">${Array.from({length:25},(_,i)=>`<rect x="${(i%5)*38}" y="${Math.floor(i/5)*32}" width="36" height="30" class="${i===7||i===18?"shape2":"white"}" stroke="#9dbcf6"/>`).join("")}</g>${text(145,248,"column then row","small","middle")}`;
      second = `${arrow(375,190,430,190)}${arrow(430,190,430,125)}${arrow(430,125,520,125)}${text(455,232,"ordered pathway","small","middle")}`;
      third = flowPanel(650,["orient","locate","verify"]);
    } else if (/data|graph|statistic|distribution|survey/.test(lower)) {
      const bars=(x,vals)=>vals.map((v,i)=>`<rect x="${x+i*47}" y="${215-v*10}" width="28" height="${v*10}" class="${i%2?"shape2":"shape"}"/>`).join("");
      first = bars(65,[5,9,6,11])+line(55,216,245,216)+text(145,244,"compare frequencies","small","middle");
      second = `<g transform="translate(365 90)">${[4,5,5,6,6,6,7,8,10].map((v,i)=>circle((v-4)*30,120-(i%3)*22,7,"shape")).join("")}</g>${text(460,244,"cluster • gap • range","small","middle")}`;
      third = flowPanel(650,["question","collect","interpret"]);
    } else if (/chance|probab|likelihood|outcome/.test(lower)) {
      first = `<circle cx="145" cy="150" r="68" fill="#dbeafe" stroke="#173968" stroke-width="3"/><path d="M145 150 L145 82 A68 68 0 0 1 213 150 Z" fill="#dcfce7" stroke="#173968"/><path d="M145 150 L213 150 A68 68 0 0 1 145 218 Z" fill="#fef3c7" stroke="#173968"/>${text(145,244,"list outcomes","small","middle")}`;
      second = `${line(365,155,555,155,"thin")}${[0,50,100].map((p,i)=>`${circle(365+p*1.9,155,8,i===1?"shape3":"shape")}${text(365+p*1.9,188,["impossible","even","certain"][i],"tiny","middle")}`).join("")}`;
      third = flowPanel(650,["predict","repeat trials","compare"]);
    } else {
      first = flowPanel(0,["build","represent","explain"]);
      second = flowPanel(325,["choose","solve","check"]);
      third = flowPanel(650,["apply","compare","justify"]);
    }
    return panel(18,"MODEL",first)+panel(337,"APPLY",second)+panel(656,"EXPLAIN",third);
  }

  function sciencePanels(unit, lower) {
    let first="",second="",third="";
    if (/plant|animal|living|habitat|life cycle|organism/.test(lower)) {
      first = `${circle(100,125,22,"shape3")}${line(100,147,100,208,"line")}${line(100,165,65,145,"line")}${line(100,165,135,145,"line")}<ellipse cx="65" cy="138" rx="22" ry="12" class="shape2"/><ellipse cx="135" cy="138" rx="22" ry="12" class="shape2"/>${line(100,208,74,235,"line")}${line(100,208,126,235,"line")}${text(145,252,"needs • features • growth","small","middle")}`;
      second = `${circle(405,120,28,"shape3")}${text(405,126,"sun","tiny","middle")}${rect(455,172,62,36,"shape",10)}${text(486,195,"water","tiny","middle")}${circle(535,112,24,"shape2")}${text(535,118,"food","tiny","middle")}${arrow(430,145,470,172)}${arrow(510,155,500,172)}${text(460,242,"habitat meets needs","small","middle")}`;
      third = `${circle(700,120,24,"shape")}${circle(790,95,24,"shape2")}${circle(870,150,24,"shape3")}${circle(790,215,24,"shape")}${arrow(728,113,758,101)}${arrow(818,105,846,135)}${arrow(850,176,813,204)}${arrow(766,207,720,139)}${text(790,258,"observe stages and change","small","middle")}`;
    } else if (/push|pull|force|move|motion|roll|slide/.test(lower)) {
      first = `${rect(82,142,100,55,"shape",8)}${arrow(35,169,75,169)}${text(145,235,"push changes motion","small","middle")}`;
      second = `${line(365,205,535,115,"line")}${circle(400,174,20,"shape3")}${arrow(400,145,455,115)}${text(455,238,"same ramp • change one factor","small","middle")}`;
      third = flowPanel(650,["predict","test","compare evidence"]);
    } else if (/sound|vibrat/.test(lower)) {
      first = `${rect(80,120,65,70,"shape",8)}<polygon points="145,138 185,110 185,200 145,172" class="shape"/>${[1,2,3].map(i=>`<path d="M${185+i*18} ${132-i*7} Q${220+i*20} 155 ${185+i*18} ${178+i*7}" fill="none" stroke="#2457d6" stroke-width="3"/>`).join("")}${text(145,240,"vibration makes sound","small","middle")}`;
      second = `${line(375,145,545,145,"dash")}${[0,1,2,3,4].map(i=>circle(390+i*35,145+(i%2?12:-12),8,"shape2")).join("")}${text(460,235,"sound travels through a medium","small","middle")}`;
      third = flowPanel(650,["action","vibration","loud/soft"]);
    } else if (/heat|temperature|warm|cool/.test(lower)) {
      first = `${circle(105,155,45,"warm")}${text(105,160,"warm","label","middle")}${circle(220,155,45,"cool")}${text(220,160,"cool","label","middle")}${arrow(151,155,171,155)}${text(145,240,"heat moves warm → cool","small","middle")}`;
      second = `${rect(380,98,45,115,"white",20)}${rect(393,132,19,68,"warm",8)}${circle(402,205,24,"warm")}${rect(480,98,45,115,"white",20)}${rect(493,160,19,40,"cool",8)}${circle(502,205,24,"cool")}${text(452,240,"measure temperature change","small","middle")}`;
      third = flowPanel(650,["source","transfer","evidence"]);
    } else if (/solid|liquid|state|material|property/.test(lower)) {
      first = `<g transform="translate(55 103)">${Array.from({length:20},(_,i)=>circle((i%5)*37,Math.floor(i/5)*37,9,"shape")).join("")}</g>${text(145,244,"solid: fixed arrangement","small","middle")}`;
      second = `<g transform="translate(370 108)">${Array.from({length:20},(_,i)=>circle((i%5)*37+(i%2)*5,Math.floor(i/5)*31+(i%3)*5,9,"shape2")).join("")}</g>${text(460,244,"liquid: particles move","small","middle")}`;
      third = flowPanel(650,["add heat","change state","remove heat"]);
    } else if (/earth|moon|sun|solar|orbit|day|night/.test(lower)) {
      first = `${circle(145,150,42,"shape3")}${text(145,155,"Sun","label","middle")}${circle(235,150,18,"shape")}${line(145,85,145,215,"thin")}${text(145,245,"light source","small","middle")}`;
      second = `<ellipse cx="460" cy="150" rx="105" ry="62" fill="none" stroke="#9dbcf6" stroke-width="2"/><circle cx="460" cy="150" r="27" class="shape2"/><circle cx="555" cy="150" r="12" class="shape"/>${text(460,245,"orbit and position","small","middle")}`;
      third = flowPanel(650,["observe sky","model movement","explain pattern"]);
    } else if (/soil|rock|mineral|earth resource/.test(lower)) {
      first = `${rect(55,92,180,42,"shape2",0)}${rect(55,134,180,42,"shape3",0)}${rect(55,176,180,42,"shape",0)}${text(145,116,"topsoil","tiny","middle")}${text(145,158,"subsoil","tiny","middle")}${text(145,200,"rock","tiny","middle")}${text(145,244,"layers and particles","small","middle")}`;
      second = `${circle(390,125,25,"shape3")}${circle(450,165,34,"shape")}${circle(520,120,20,"shape2")}${text(455,240,"compare size • texture • hardness","small","middle")}`;
      third = flowPanel(650,["observe","compare property","link to use"]);
    } else {
      first = `${circle(112,145,46,"white")}${circle(112,145,37,"shape")}${line(145,178,190,223,"line")}${text(145,252,"observe closely","small","middle")}`;
      second = `${rect(370,98,180,120,"white",8)}${line(390,190,390,122,"thin")}${line(390,190,525,190,"thin")}${rect(410,158,24,32,"shape")}${rect(452,135,24,55,"shape2")}${rect(494,112,24,78,"shape3")}${text(460,245,"record evidence","small","middle")}`;
      third = flowPanel(650,["question","investigate","explain"]);
    }
    return panel(18,"OBSERVE",first)+panel(337,"MODEL",second)+panel(656,"EXPLAIN",third);
  }

  function englishPanels(unit, lower) {
    let first="",second="",third="";
    if (/conversation|interaction|turn-taking|discussion|oral/.test(lower)) {
      first = `${rect(48,100,160,64,"shape",18)}${text(128,128,"Listen and respond","label","middle")}<polygon points="85,164 105,164 93,184" class="shape"/>${rect(95,177,150,55,"shape2",18)}${text(170,207,"Build on the idea","label","middle")}`;
      second = flowPanel(337,["listen","take turn","clarify"]);
      third = flowPanel(650,["idea","evidence","response"]);
    } else if (/clause|sentence|verb|tense|grammar|subject/.test(lower)) {
      first = `${rect(42,116,102,60,"shape",9)}${rect(154,116,92,60,"shape2",9)}${text(93,141,"subject","tiny","middle")}${text(93,162,"The birds","label","middle")}${text(200,141,"verb","tiny","middle")}${text(200,162,"sing","label","middle")}`;
      second = `${rect(360,105,200,45,"shape",9)}${rect(360,160,200,45,"shape2",9)}${text(460,133,"Yesterday: walked","label","middle")}${text(460,188,"Today: walk","label","middle")}`;
      third = flowPanel(650,["identify","check agreement","revise"]);
    } else if (/paragraph|text structure|layout|navigation|purpose|audience/.test(lower)) {
      first = `${rect(65,90,160,135,"white",8)}${rect(78,104,132,22,"shape",5)}${[0,1,2,3].map(i=>line(80,145+i*18,204-(i%2)*25,145+i*18,"thin")).join("")}${text(145,248,"heading + related ideas","small","middle")}`;
      second = `${rect(375,88,170,138,"white",8)}${rect(387,100,42,114,"shape",5)}${rect(439,100,94,28,"shape2",5)}${rect(439,138,94,76,"soft",5)}${text(460,248,"layout guides readers","small","middle")}`;
      third = flowPanel(650,["purpose","audience","feature choice"]);
    } else if (/image|illustration|mood|character|setting|literary|narrative/.test(lower)) {
      first = `${rect(55,90,180,135,"cool",8)}${circle(95,123,20,"shape3")}${polygon(55,225,125,145,180,200,235,135,235,225,"shape2")}${text(145,248,"setting and mood clues","small","middle")}`;
      second = `${circle(460,135,30,"shape3")}${line(460,165,460,210,"line")}${line(460,175,430,195,"line")}${line(460,175,490,195,"line")}${text(460,244,"actions reveal character","small","middle")}`;
      third = flowPanel(650,["words","visual clues","inference"]);
    } else if (/phoneme|grapheme|spelling|syllable|prefix|suffix|word|vocabulary|apostrophe/.test(lower)) {
      first = `${rect(45,120,62,50,"shape",8)}${rect(116,120,62,50,"shape2",8)}${rect(187,120,62,50,"shape3",8)}${text(76,151,"un","label","middle")}${text(147,151,"help","label","middle")}${text(218,151,"ful","label","middle")}${text(147,210,"unhelpful","big","middle")}`;
      second = `${rect(360,115,90,58,"shape",8)}${rect(470,115,90,58,"shape2",8)}${text(405,139,"sound","tiny","middle")}${text(405,160,"/f/","label","middle")}${text(515,139,"spelling","tiny","middle")}${text(515,160,"ph","label","middle")}`;
      third = flowPanel(650,["segment","blend/build","use in context"]);
    } else {
      first = flowPanel(0,["read/view","notice","meaning"]);
      second = flowPanel(337,["plan","create","edit"]);
      third = flowPanel(650,["evidence","explain","apply"]);
    }
    return panel(18,"NOTICE",first)+panel(337,"MODEL",second)+panel(656,"APPLY",third);
  }

  function render(unit = {}, subject = "math", code = "") {
    const subjectKey = String(subject).toLowerCase();
    const lower = `${unit.title || ""} ${unit.subtitle || ""} ${unit.desc || ""} ${unit.model_title || ""} ${unit.apply_title || ""}`.toLowerCase();
    const title = `${code ? `${code} • ` : ""}${unit.title || "Concept model"}`;
    const body = subjectKey.includes("science") ? sciencePanels(unit, lower) : subjectKey.includes("english") ? englishPanels(unit, lower) : mathPanels(unit, lower);
    return svgShell(title, body, `${unit.title || "Topic"} visual concept model`);
  }

  window.SkillrConceptSvg = { render };
})();
