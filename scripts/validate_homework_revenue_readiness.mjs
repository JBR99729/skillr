import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const quizRoot = path.join(root, "quiz");
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === "index.html" && full.split(path.sep).includes("homework")) files.push(full);
  }
}

walk(quizRoot);

const failures = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const checks = [
    ["visible SkillrHub branding", html.includes("SkillrHub")],
    ["noindex,follow preserved", /content=["']noindex,\s*follow["']/i.test(html)],
    ["AdSense account verification meta", html.includes("google-adsense-account") && html.includes("ca-pub-7734963540104771")],
    ["shared homework CSS", html.includes("/assets/homework-shell.css")],
    ["central ad config", html.includes("/assets/skillr-ad-config.js")],
    ["homework runtime", html.includes("/assets/homework-page-runtime.js")],
    ["dormant end ad zone", html.includes('data-ad-zone="homework-end"') && html.includes(" hidden")],
    ["no page-level AdSense loader before approval", !html.includes("pagead2.googlesyndication.com")],
    ["no false ads conversion event", !html.includes("ads_conversion")]
  ];
  for (const [label, ok] of checks) if (!ok) failures.push(rel + ": " + label);
}

const config = fs.readFileSync(path.join(root, "assets", "skillr-ad-config.js"), "utf8");
if (!/enabled:\s*false/.test(config)) failures.push("assets/skillr-ad-config.js: ads must remain disabled before approval");
if (!/homeworkEnd:\s*["']["']/.test(config)) failures.push("assets/skillr-ad-config.js: homework slot must remain empty before approval");

if (files.length === 0) failures.push("No homework pages found");
if (failures.length) {
  console.error("Homework revenue readiness failed:\n" + failures.join("\n"));
  process.exit(1);
}
console.log("Homework revenue readiness passed for " + files.length + " pages (ads disabled; GA4 and safe zones ready).");
