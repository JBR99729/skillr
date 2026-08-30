import fs from "node:fs";

const file = "foundation/curriculum/maths/index.html";

const groups = [
  {
    id: "number",
    title: "Number",
    description: "Build number sense to 20 through counting, comparing, partitioning, adding, subtracting, sharing and grouping.",
    skills: [
      ["AC9MFN01", "Numbers to 20", "Name, show and put numbers from 0 to 20 in order.", "12 comes after 11 and before 13.", "name, represent and order numbers including zero to at least 20, using physical and virtual materials and numerals", "ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least"],
      ["AC9MFN02", "Recognise quantities to 5 without counting", "See a small group and know how many objects there are straight away.", "● ● ● ● means 4 without counting one by one.", "recognise and name the number of objects within a collection up to 5 using subitising", "ac9mfn02-and-name-the-number-of-objects-within-a-collection-up"],
      ["AC9MFN03", "Count and compare groups to 20", "Count collections and decide which has more, fewer or the same number.", "A group of 12 has more objects than a group of 8.", "quantify and compare collections to at least 20 using counting and explain or demonstrate reasoning", "ac9mfn03-and-compare-collections-to-at-least-20-using-counting-and"],
      ["AC9MFN04", "Make and split numbers to 10", "Explore the smaller parts that combine to make a whole number.", "7 can be split into 5 and 2, or 4 and 3.", "partition and combine collections up to 10 using part-part-whole relationships and subitising to recognise and name the parts", "ac9mfn04-partition-and-combine-collections-up-to-10-using-part-part"],
      ["AC9MFN05", "Model adding and taking away", "Use objects, drawings and numbers to show quantities joining or separating.", "5 birds and 2 more birds make 7 birds.", "represent practical situations involving addition, subtraction and quantification with physical and virtual materials and use counting or subitising strategies", "ac9mfn05-represent-practical-situations-involving-addition-subtraction"],
      ["AC9MFN06", "Share and group objects equally", "Make fair shares and equal groups, then check each group has the same amount.", "Share 8 counters between 4 people: each receives 2.", "represent practical situations that involve equal sharing and grouping with physical and virtual materials and use counting or subitising strategies", "ac9mfn06-represent-practical-situations-that-involve-equal-sharing-and"],
    ],
  },
  { id: "algebra", title: "Algebra", description: "Notice, copy, continue and explain repeating patterns made in different ways.", skills: [
    ["AC9MFA01", "Copy and continue repeating patterns", "Spot the part that repeats, copy it and work out what comes next.", "Red, blue, red, blue … comes next with red.", "recognise, copy and continue repeating patterns represented in different ways", "ac9mfa01-recognise-copy-and-continue-repeating-patterns-represented-in"],
  ]},
  { id: "measurement", title: "Measurement", description: "Compare measurable attributes fairly and connect familiar events to everyday time language.", skills: [
    ["AC9MFM01", "Compare length, mass, capacity and time", "Compare everyday objects and events, then explain the result.", "Line up two objects at the same starting point to compare length.", "identify and compare attributes of objects and events, including length, capacity, mass and duration, using direct comparisons and communicating reasoning", "ac9mfm01-and-compare-attributes-of-objects-and-events-including-length"],
    ["AC9MFM02", "Days of the week and times of day", "Put days and familiar daily events in order using everyday time language.", "Breakfast is in the morning; dinner is usually in the evening.", "sequence days of the week and times of the day including morning, lunchtime, afternoon and night time, and connect them to familiar events and actions", "ac9mfm02-sequence-days-of-the-week-and-times-of-the-day"],
  ]},
  { id: "space", title: "Space", description: "Recognise and create familiar shapes, then describe where people and objects are located.", skills: [
    ["AC9MFSP01", "Sort, name and make shapes", "Recognise familiar shapes, describe their features and sort or create them.", "A triangle has 3 straight sides and 3 corners.", "sort, name and create familiar shapes; recognise and describe familiar shapes within objects in the environment, giving reasons", "ac9mfsp01-sort-name-and-create-familiar-shapes-recognise-and-describe"],
    ["AC9MFSP02", "Describe position and location", "Use position words to explain where people and objects are.", "The ball is under the chair and beside the bag.", "describe the position and location of themselves and objects in relation to other people and objects within a familiar space", "ac9mfsp02-the-position-and-location-of-themselves-and-objects-in-relation"],
  ]},
  { id: "statistics", title: "Statistics", description: "Answer familiar questions by collecting, sorting, displaying and comparing information.", skills: [
    ["AC9MFST01", "Collect, sort and compare data", "Collect objects or images, sort them into groups and compare the results.", "Sort class pets into cats, dogs and other animals, then find the largest group.", "collect, sort and compare data represented by objects and images in response to given investigative questions that relate to familiar situations", "ac9mfst01-collect-sort-and-compare-data-represented-by-objects-and-images"],
  ]},
];

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const card = (strand, [code, title, summary, example, official, slug]) => `<article class="curriculum-unit-card">
  <div class="skill-card-topline"><span class="curriculum-badge">${code}</span><p class="skill-strand">${strand}</p></div>
  <h3>${esc(title)}</h3>
  <p class="skill-summary">${esc(summary)}</p>
  <p class="skill-example"><strong>Example</strong><span>${esc(example)}</span></p>
  <div class="skill-card-actions">
    <a href="/foundation/maths/${slug}/">Explore skill</a>
    <details class="resource-menu"><summary>Resources</summary><div class="resource-menu__links">
      <a href="/foundation/maths/${slug}/teacher-slides/">Classroom View</a>
      <a href="/quiz/grade-k/math/${code.toLowerCase()}/worksheet/">Worksheet</a>
      <a href="/quiz/grade-k/math/${code.toLowerCase()}/practice/">Practice</a>
      <a href="/quiz/grade-k/math/${code.toLowerCase()}/test/">Quick check</a>
    </div></details>
  </div>
  <details class="official-wording"><summary>Official curriculum wording</summary><p>${esc(official)}</p></details>
</article>`;

const content = `<section class="curriculum-panel foundation-maths-intro" aria-labelledby="choose-foundation-skill">
  <div><p class="curriculum-eyebrow">Skill navigator</p><h2 id="choose-foundation-skill">Choose the skill you want to teach</h2><p>Skills are grouped by strand. Open a skill for the complete lesson, or expand Resources for a worksheet, classroom view, practice or quick check.</p></div>
  <nav class="strand-jump-list" aria-label="Foundation Maths strands">${groups.map((group) => `<a href="#${group.id}">${group.title}</a>`).join("")}</nav>
</section>
<main class="foundation-skill-groups">
${groups.map((group) => `<section class="foundation-skill-group" id="${group.id}" aria-labelledby="${group.id}-title"><header class="foundation-skill-group__header"><div><h2 id="${group.id}-title">${group.title}</h2><p>${group.description}</p></div><span class="foundation-skill-count">${group.skills.length} ${group.skills.length === 1 ? "skill" : "skills"}</span></header><div class="foundation-skill-grid">${group.skills.map((skill) => card(group.title, skill)).join("")}</div></section>`).join("\n")}
</main>`;

let html = fs.readFileSync(file, "utf8");
html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>Foundation Maths Skills Explained | Curriculum-Aligned Resources</title>");
html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Browse every Foundation Maths skill in plain English, with examples, exact Australian Curriculum wording, classroom views, worksheets, practice and quick checks.">');
html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Foundation Maths Skills Explained | SkillrHub">');
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Choose a Foundation Maths skill in plain English and open curriculum-aligned teaching, worksheet and practice resources.">');
if (!html.includes('/assets/css/foundation-maths-hub.css')) {
  html = html.replace('<link rel="stylesheet" href="/assets/curriculum.css?v=4">', '<link rel="stylesheet" href="/assets/curriculum.css?v=4">\n  <link rel="stylesheet" href="/assets/css/foundation-maths-hub.css">');
}
html = html.replace('<body class="curriculum-shell">', '<body class="curriculum-shell foundation-maths-hub">');
html = html.replace(/<header class="curriculum-hero">[\s\S]*?<\/header>/, '<header class="curriculum-hero"><p class="curriculum-eyebrow">Foundation Maths</p><h1>Foundation Maths skills</h1><p class="curriculum-hero__lead">Find the exact skill a child needs, understand it in plain English and open the right teaching or practice resource.</p><div class="curriculum-actions"><a class="curriculum-button" href="/foundation/curriculum/">All Foundation subjects</a><a class="curriculum-button" href="/how-to-use-skillr.html">User guide</a></div></header>');
const current = /<section class="curriculum-panel" aria-labelledby="maths-strands">[\s\S]*?<\/section>\s*<section class="curriculum-panel">[\s\S]*?<\/section>/;
const marked = /<!-- foundation-maths-skill-groups:start -->[\s\S]*?<!-- foundation-maths-skill-groups:end -->/;
const replacement = `<!-- foundation-maths-skill-groups:start -->\n${content}\n<!-- foundation-maths-skill-groups:end -->`;
html = marked.test(html) ? html.replace(marked, replacement) : html.replace(current, replacement);
fs.writeFileSync(file, html);
console.log("Built Foundation Maths landing-page skill cards.");
