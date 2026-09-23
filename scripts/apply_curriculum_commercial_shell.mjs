import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const yearRoots = ["foundation", ...Array.from({ length: 10 }, (_, index) => `year${index + 1}`)];
const topicPath = /^(?:foundation|year(?:[1-9]|10))\/(?:maths|science|english)\/ac9[a-z0-9][^/]*\/index\.html$/i;
const siteNavigation = '<link rel="stylesheet" href="/assets/site-navigation.css?v=20260908-responsive3">';
const commercialStyles = '<link rel="stylesheet" href="/assets/css/curriculum-commercial.css?v=20260923-1">';
const sharedHeader = `<header class="site-header skillr-site-header" data-static-navigation>
  <nav class="site-header__nav" aria-label="Main navigation">
    <a class="site-header__brand" href="/" aria-label="SkillrHub F–10 home"><img src="/icons/skillrhub-mark.svg" alt="" width="38" height="38"><strong>SkillrHub</strong> <span>F–10</span></a>
    <div class="site-header__links"><a href="/learn/" aria-current="page">Learn</a><a href="/teach/">Teach</a><a href="/products/">Products</a><a href="/homeschooling-australia/">Homeschool</a><a href="/worksheets/">Worksheets &amp; Homework</a><a href="/dashboard/">Dashboard</a><a href="/print-and-go.html">Print &amp; Go</a><a href="/teach-and-explain.html">Teach &amp; Explain</a><a href="/updates.html">Updates</a></div>
    <details class="site-header__menu"><summary>Menu</summary><div class="site-header__menu-panel"><a href="/learn/" aria-current="page">Learn</a><a href="/teach/">Teach</a><a href="/products/">Products</a><a href="/homeschooling-australia/">Homeschool</a><a href="/worksheets/">Worksheets &amp; Homework</a><a href="/dashboard/">Dashboard</a><a href="/print-and-go.html">Print &amp; Go</a><a href="/teach-and-explain.html">Teach &amp; Explain</a><a href="/updates.html">Updates</a></div></details>
  </nav>
</header>`;

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name === "index.html") files.push(full);
  }
  return files;
}

function signal(source, pattern) {
  return source.match(pattern)?.[1]?.replace(/\s+/g, " ").trim() || "";
}

function seoSnapshot(source) {
  return {
    title: signal(source, /<title>([\s\S]*?)<\/title>/i),
    description: signal(source, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i),
    canonical: signal(source, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i),
    robots: signal(source, /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i),
    h1: signal(source, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  };
}

function addBodyClasses(source) {
  return source.replace(/<body(?:\s+class=(["'])(.*?)\1)?([^>]*)>/i, (_match, quote = '"', classes = "", rest = "") => {
    const tokens = new Set(classes.split(/\s+/).filter(Boolean));
    tokens.add("skillr-resource");
    tokens.add("skillr-resource--topic");
    tokens.add("skillr-shared-navigation");
    tokens.add("skillr-commercial-topic");
    return `<body class="${[...tokens].join(" ")}"${rest}>`;
  });
}

function ensureStyles(source) {
  let output = source;
  if (!output.includes("/assets/site-navigation.css")) output = output.replace(/<\/head>/i, `${siteNavigation}\n</head>`);
  if (!output.includes("/assets/css/curriculum-commercial.css")) output = output.replace(/<\/head>/i, `${commercialStyles}\n</head>`);
  return output;
}

function ensureHeader(source) {
  let output = source;
  const staticHeader = /<header\b[^>]*class=(["'])[^"']*\bskillr-site-header\b[^"']*\1[^>]*\sdata-static-navigation[^>]*>[\s\S]*?<\/header>/i;
  const mainNav = /<nav\b[^>]*class=(["'])[^"']*\bmain-nav\b[^"']*\1[^>]*>[\s\S]*?<\/nav>/i;
  output = output.replace(staticHeader, "");
  if (mainNav.test(output)) output = output.replace(mainNav, "");
  // Removing an indented legacy nav can leave whitespace-only lines behind.
  output = output.replace(/^[\t ]+$/gm, "");
  if (!/<body\b[^>]*>/i.test(output)) throw new Error("missing body for shared navigation");
  return output.replace(/<body\b[^>]*>/i, (body) => `${body}${sharedHeader}`);
}

const files = yearRoots
  .flatMap((directory) => walk(path.join(root, directory)))
  .filter((file) => topicPath.test(path.relative(root, file).split(path.sep).join("/")));

const failures = [];
let changed = 0;
let skipped = 0;

for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  const before = fs.readFileSync(file, "utf8");
  if (/http-equiv=["']refresh["']/i.test(before) || /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(before)) {
    skipped++;
    continue;
  }
  // AC9MFN02 already uses its own deliberately authored commercial shell.
  if (/<header\b[^>]*class=["']top["']/i.test(before)) {
    skipped++;
    continue;
  }
  const beforeSeo = seoSnapshot(before);
  try {
    let after = addBodyClasses(before);
    after = ensureStyles(after);
    after = ensureHeader(after);
    const afterSeo = seoSnapshot(after);
    if (JSON.stringify(beforeSeo) !== JSON.stringify(afterSeo)) {
      failures.push(`${relative}: protected SEO signal changed`);
      continue;
    }
    if (Object.values(afterSeo).some((value) => !value)) {
      failures.push(`${relative}: missing protected SEO signal`);
      continue;
    }
    if (after !== before) {
      changed++;
      if (checkOnly) failures.push(`${relative}: commercial shell is not current`);
      else fs.writeFileSync(file, after);
    }
  } catch (error) {
    failures.push(`${relative}: ${error.message}`);
  }
}

console.log(JSON.stringify({ mode: checkOnly ? "check" : "apply", files: files.length, changed, skipped, failures: failures.length }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 50).join("\n"));
  process.exitCode = 1;
}
