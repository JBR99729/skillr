import fs from 'node:fs';
import path from 'node:path';

const clean = (value) => String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function lessonSections(topicHtml, code) {
  const marker = topicHtml.indexOf('id="topic-guide"');
  const start = topicHtml.lastIndexOf('<details', marker);
  const end = topicHtml.indexOf('<!-- skillr-topic-videos:start -->');
  if (start < 0 || end < 0 || end <= start) throw new Error(`${code}: cannot locate static topic lesson`);
  const source = topicHtml.slice(start, end);
  const blocks = source.match(/<details\b[\s\S]*?<\/details>/g) || [];
  return blocks.map((block, index) => {
    const heading = clean(block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1]);
    const body = block.match(/<div class="curriculum-detail-body">([\s\S]*?)<\/div>\s*<\/details>/i)?.[1];
    if (!heading || !body) throw new Error(`${code}: invalid lesson section ${index + 1}`);
    const label = index === 0 ? 'Start here' : heading.includes('question') ? 'With answers' : heading.includes('example') || heading.includes('thinking') ? 'Teach from the board' : 'Open section';
    return `<details${index === 0 ? ' open' : ''} name="lesson"><summary><span>${escapeHtml(heading)}</span><span>${label}</span></summary><div class="panel"><article class="content-block">${body}</article></div></details>`;
  }).filter((section) => !section.includes(' Classroom View</span>') && !section.includes('>How to use this unit</span>'));
}

export function buildYear6ScienceClassroomViewFromTopic(root, code, directory) {
  const topicFile = path.join(root, 'year6/science', directory, 'index.html');
  const topicHtml = fs.readFileSync(topicFile, 'utf8');
  const title = clean(topicHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]) || code;
  const subtitle = clean(topicHtml.match(/<p><strong>Learning intention:<\/strong>\s*([\s\S]*?)<\/p>/i)?.[1]) || `Year 6 Science learning for ${code}.`;
  const sections = lessonSections(topicHtml, code);
  if (sections.length < 7) throw new Error(`${code}: Classroom View requires at least 7 authored sections`);
  sections.push(`<details class="classroom-related" data-classroom-related name="lesson"><summary><span>Related resources</span><span>Keep learning</span></summary><div class="panel"><article class="content-block"><h2>Continue this topic</h2><p>Use the matching resources for the same curriculum code.</p><p class="display-link-row"><a class="display-button" href="../">Topic Guide</a><a class="display-button" href="/quiz/year-6/science/${code.toLowerCase()}/worksheet/">Worksheet</a><a class="display-button" href="/quiz/year-6/science/${code.toLowerCase()}/practice/">Practice</a><a class="display-button primary" href="/quiz/year-6/science/${code.toLowerCase()}/test/">Test</a></p></article></div></details>`);
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow">
<title>${code} Classroom View | SkillrHub</title>
<link rel="canonical" href="https://skillrhub.com/year6/science/${directory}/">
<link rel="stylesheet" href="../../../../style.css">
<link rel="stylesheet" href="/assets/css/classroom-view.css">
<link rel="stylesheet" href="/assets/css/resource-polish.css?v=20260907-f10" data-resource-presentation>
</head>
<body class="classroom-view-v2 skillr-resource skillr-resource--classroom">
<main class="display-shell">
<nav class="display-nav resource-actions" aria-label="Learning resources"><div class="display-nav-group"><a href="../">Topic Guide</a><a href="./" aria-current="page">Classroom View</a><a href="/quiz/year-6/science/${code.toLowerCase()}/worksheet/">Worksheet</a><a href="/quiz/year-6/science/${code.toLowerCase()}/practice/">Practice</a><a class="primary" href="/quiz/year-6/science/${code.toLowerCase()}/test/">Test</a></div></nav>
<section class="display-board" aria-labelledby="page-title">
<header class="display-header"><div><p class="display-eyebrow">Year 6 Science · ${code}</p><h1 id="page-title">${escapeHtml(title)}</h1><p class="display-subtitle">${escapeHtml(subtitle)}</p><!-- Teacher Display Page --></div><p class="display-mode">Ready to project and teach</p></header>
<div class="display-content"><div class="section-stack" data-single-open>
${sections.join('\n')}
</div></div>
</section>
</main>
<script>document.querySelectorAll("[data-single-open] details").forEach((section)=>{section.addEventListener("toggle",()=>{if(!section.open)return;section.parentElement.querySelectorAll("details").forEach((other)=>{if(other!==section)other.open=false})})});</script>
<script src="/assets/resource-links.js?v=1" defer></script>
</body>
</html>\n`;
}

export function writeYear6ScienceClassroomView(root, code, directory) {
  const output = path.join(root, 'year6/science', directory, 'teacher-slides/index.html');
  fs.writeFileSync(output, buildYear6ScienceClassroomViewFromTopic(root, code, directory));
  return output;
}
