#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "foundation", "maths", "ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least", "index.html");
const outputPath = path.join(root, "assets", "foundation-ac9mfn01-visual-elaborations.js");
const html = fs.readFileSync(sourcePath, "utf8");

const guidance = {
  E1: {
    say: "Please collect 9 objects. How will you make sure the collection and numeral match?",
    check: "The learner collects exactly 9 objects, counts each once, states 9 altogether and matches the numeral 9.",
    mistake: "The learner double-counts an object or chooses a numeral before checking the collection.",
    fix: "Move each counted object into a finished group, state the total, then match the numeral."
  },
  E2: {
    say: "Start at 14. Which number is one less, and which is one more? Show each move.",
    check: "The learner identifies 13 as one less and 15 as one more, with the direction and quantity change explained.",
    mistake: "The learner reverses one less and one more or moves on the line without changing the collection.",
    fix: "Build 14, physically remove or add one, then make the matching move on the number line."
  },
  E3: {
    say: "Where is the starting end? Which object is second, before green and between red and green?",
    check: "The learner marks the starting end and uses first, second, before, after and between consistently.",
    mistake: "The learner changes the starting end or treats an ordinal word as a quantity.",
    fix: "Mark the starting end with an arrow and recount positions from that same end."
  },
  E4: {
    say: "Read each numeral. Is it showing an amount, an order or a label in this place?",
    check: "The learner reads the numeral correctly and explains its familiar use as an amount, position or label.",
    mistake: "The learner assumes every numeral names a collection that must be counted.",
    fix: "Compare a counted collection with a door, bus or page label and name what the numeral does in each context."
  },
  E5: {
    say: "Act out 3 apples and 2 more. How do the objects, spoken number name and numeral show the same amount?",
    check: "The learner connects 5 objects, the spoken word five and the numeral 5, then confirms 5 after rearranging.",
    mistake: "The learner treats the collection, number name and numeral as unrelated answers.",
    fix: "Point between the same five objects, the spoken name and numeral, then rearrange without adding or removing."
  }
};

const strip = (value) => String(value || "")
  .replace(/<br\s*\/?>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, " ")
  .trim();

const elaborations = [];
const cardPattern = /<article class="elab-visual-card(?:\s+elab-wide)?">([\s\S]*?)<\/article>/g;
for (const match of html.matchAll(cardPattern)) {
  const block = match[1];
  const label = strip(block.match(/<span class="elab-code">([\s\S]*?)<\/span>/)?.[1]);
  const title = strip(block.match(/<h4>([\s\S]*?)<\/h4>/)?.[1]);
  const idea = strip(block.match(/<\/div>\s*<p>([\s\S]*?)<\/p>\s*<div class="elab-model">/)?.[1]);
  const visual = block.match(/<div class="elab-model">\s*([\s\S]*?)\s*<\/div>\s*<div class="elab-teach">/)?.[1]?.trim() || "";
  const teach = strip(block.match(/<div class="elab-teach"><strong>Teach:<\/strong>\s*([\s\S]*?)<\/div>/)?.[1]);
  if (!label || !title || !idea || !visual || !teach || !guidance[label]) throw new Error(`Could not extract complete ${label || "unknown"} AC9MFN01 model`);
  elaborations.push({ label, title, idea, visual, steps: [teach], worked: `${idea} ${teach}`, teach, ...guidance[label] });
}

if (elaborations.length !== 5) throw new Error(`Expected 5 AC9MFN01 elaborations, found ${elaborations.length}`);

const output = `(() => {\n  "use strict";\n  const unit = window.SkillrFoundationMathsData?.AC9MFN01;\n  if (!unit) return;\n  unit.elaborations = ${JSON.stringify(elaborations, null, 2)};\n})();\n`;
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Built ${path.relative(root, outputPath)} with ${elaborations.length} shared elaboration models.`);
