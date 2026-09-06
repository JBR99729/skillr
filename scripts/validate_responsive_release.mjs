import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const htmlFiles = ["index.html", "about.html", "contact.html", "blogs/index.html", "dashboard/index.html"];
const cssFiles = ["style.css", "dashboard/style.css", "quiz/assets/style.css"];

function braceDepth(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let depth = 0;
  let quote = "";
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") depth -= 1;
    assert.ok(depth >= 0, "Stylesheet has an unmatched closing brace");
  }
  return depth;
}

for (const relativePath of cssFiles) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  assert.equal(braceDepth(source), 0, `${relativePath}: unclosed CSS block`);
  assert.match(source, /overflow-x:\s*(?:hidden|clip)/, `${relativePath}: horizontal overflow safeguard missing`);
}

for (const relativePath of htmlFiles) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  assert.match(source, /<meta[^>]+name="viewport"[^>]+width=device-width/i, `${relativePath}: responsive viewport missing`);
  const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${relativePath}: duplicate ID found`);
}

const globalCss = fs.readFileSync(path.join(root, "style.css"), "utf8");
assert.match(globalCss, /@media \(max-width: 1024px\)[\s\S]*?\.home-hero\s*\{[^}]*grid-template-columns:\s*1fr/, "Homepage must reflow at laptop widths");
assert.match(globalCss, /@media \(max-width: 900px\)[\s\S]*?\.learning-pathway__phases\s*\{[^}]*grid-template-columns:\s*1fr/, "Learning phases must stack on tablets");

console.log(JSON.stringify({
  htmlPages: htmlFiles.length,
  stylesheets: cssFiles.length,
  laptopBreakpoint: "1024px",
  tabletBreakpoint: "900px",
  status: "passed"
}));
