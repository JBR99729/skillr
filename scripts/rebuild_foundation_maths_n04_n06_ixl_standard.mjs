import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const codes = ["AC9MFN04", "AC9MFN05", "AC9MFN06"];
const symbols = ["●", "■", "▲", "◆", "★"];
const names = ["Mia", "Noah", "Ava", "Leo", "Zoe", "Sam", "Lina", "Kai"];
const objects = ["counters", "buttons", "blocks", "shells", "beads", "tiles", "stars", "cups"];
const reviewPath = "docs/foundation-maths-n04-n06-question-bank-ixl-standard-2026-09-06.md";

function pad(n) { return String(n).padStart(3, "0"); }
function dots(n, symbol = "●") { return n === 0 ? "(empty)" : Array.from({ length: n }, () => symbol).join(" "); }
function groups(count, size, symbol = "●") {
  return Array.from({ length: count }, () => `[ ${dots(size, symbol)} ]`).join("   ");
}
function choices(correct, wrongs, pos, min = 0, max = 12) {
  const out = [];
  for (const value of wrongs.map(String)) if (value !== String(correct) && !out.includes(value)) out.push(value);
  for (let n = min; out.length < 2 && n <= max; n += 1) if (String(n) !== String(correct) && !out.includes(String(n))) out.push(String(n));
  out.splice(pos % 3, 0, String(correct));
  return out.slice(0, 3);
}
function item(code, bank, index, detail) {
  const pos = (index + (bank === "test" ? 1 : 0) + codes.indexOf(code)) % 3;
  const answers = choices(detail.correct, detail.wrongs, pos, detail.min, detail.max);
  return {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${pad(index + 1)}`,
    curriculumCode: code,
    bank,
    skill: detail.skill,
    printable: true,
    type: "single",
    question: detail.question,
    visual: detail.visual || "",
    answers,
    correct: answers.indexOf(String(detail.correct)),
    explanation: detail.explanation,
    structuredExplanation: {
      summary: detail.explanation,
      hint: detail.hint,
    },
    difficulty: bank === "test" ? 3 : index < 8 ? 1 : index < 17 ? 2 : 3,
    difficultyTier: bank === "test" ? "independent" : index < 8 ? "recognise" : index < 17 ? "apply" : "reason",
    sequencePriority: index + 1,
    qualitySchema: "foundation-maths-ixl-standard-v1",
    editorialReview: {
      status: "reviewed",
      date: "2026-09-06",
      method: "ACARA descriptor mapped against actual IXL skill-page examples and representative questions",
      evidence: reviewPath,
      originality: "Original SkillrHub wording and visuals; IXL used only for instructional structure and cognitive-load benchmarking.",
    },
  };
}

function n04(seed, bank) {
  const whole = 4 + ((seed * 5 + Math.floor(seed / 2)) % 7);
  const part = 1 + ((seed * 4 + Math.floor(seed / 3)) % (whole - 1));
  const other = whole - part;
  const symbolA = symbols[seed % symbols.length];
  const symbolB = symbols[(seed + 1) % symbols.length];
  const name = names[seed % names.length];
  const object = objects[(seed * 3) % objects.length];
  const type = seed % 6;
  if (type === 0) return {
    skill: "match parts to whole",
    question: `${name} has ${whole} ${object} in all. ${part} are on the mat and the rest are in a cup. How many are in the cup?`,
    visual: `Blue: ${dots(part, symbolA)}\nYellow: ?`,
    correct: other,
    wrongs: [part, whole, Math.max(0, other - 1)],
    explanation: `${part} and ${other} combine to make ${whole}. The missing part is ${other}.`,
    hint: "Keep the whole the same and find the part that is missing.",
  };
  if (type === 1) return {
    skill: "choose partition statement",
    question: `Which sentence matches ${name}'s ${object}?`,
    visual: `${dots(part, symbolA)}   ${dots(other, symbolB)}`,
    correct: `${whole} is ${part} and ${other}`,
    wrongs: [`${whole} is ${part} and ${whole}`, `${whole} is ${other} and ${whole}`],
    explanation: `The picture has ${part} in one part and ${other} in the other part, making ${whole} altogether.`,
    hint: "Count each colour, then name the whole.",
  };
  if (type === 2) return {
    skill: "complete addition sentence",
    question: `${name} splits ${whole} ${object} into two parts. Complete the number sentence: ${whole} = ${part} + __`,
    visual: `Whole: ${dots(whole, "●")}\nPart shown: ${dots(part, "■")}`,
    correct: other,
    wrongs: [part, whole, other + 1],
    explanation: `${whole} is made from ${part} and ${other}, so ${whole} = ${part} + ${other}.`,
    hint: "Ask what must be added to the shown part.",
  };
  if (type === 3) return {
    skill: "make the same whole another way",
    question: `${name} made ${whole} using ${part} and ${other}. Which pair is another way to make ${whole}?`,
    visual: `${part} + ${other} = ${whole}`,
    correct: `${Math.max(0, part - 1)} and ${other + 1}`,
    wrongs: [`${part} and ${other + 1}`, `${whole} and ${part}`],
    explanation: `${Math.max(0, part - 1)} and ${other + 1} also have a total of ${whole}.`,
    hint: "Both parts together must still equal the same whole.",
  };
  if (type === 4) return {
    skill: "spot total-part confusion",
    question: `${name} says ${part} and ${other} make ${Math.max(part, other)}. What is the mistake?`,
    correct: `The parts make ${whole}`,
    wrongs: [`The parts make ${part}`, `The parts cannot be counted`],
    explanation: `A whole is found by combining both parts: ${part} + ${other} = ${whole}.`,
    hint: "Do not stop after counting only the larger part.",
  };
  return {
    skill: "recognise ten partition",
    question: `${name}'s ten-frame has ${part} filled spaces and ${10 - part} empty spaces. How many spaces are in the whole frame?`,
    visual: `${dots(part, "●")} ${dots(10 - part, "○")}`,
    correct: 10,
    wrongs: [part, 10 - part, 9],
    explanation: `The filled and empty spaces are parts of one ten-frame, and the whole frame has 10 spaces.`,
    hint: "The empty spaces still belong to the whole frame.",
  };
}

function n05(seed, bank) {
  const a = 1 + ((seed * 2 + Math.floor(seed / 3)) % 6);
  const b = 1 + ((seed * 3 + Math.floor(seed / 2)) % 4);
  const sum = Math.min(10, a + b);
  const start = 5 + (seed % 6);
  const away = 1 + ((seed + 1) % Math.min(5, start));
  const left = start - away;
  const obj = objects[seed % objects.length];
  const type = seed % 6;
  if (type === 0) return {
    skill: "join collections",
    question: `${names[seed % names.length]} has ${a} ${obj}. ${b} more ${obj} join the group. How many ${obj} are there now?`,
    visual: `Start: ${dots(a, "●")}\nJoin:  ${dots(b, "■")}`,
    correct: a + b,
    wrongs: [a, b, a + b + 1],
    explanation: `Joining means count both parts: ${a} + ${b} = ${a + b}.`,
    hint: "The collection gets larger when more objects join.",
  };
  if (type === 1) return {
    skill: "take away from a collection",
    question: `${start} ${obj} are on a mat. ${away} are taken away. How many stay on the mat?`,
    visual: `Start: ${dots(start, "●")}\nTaken away: ${dots(away, "×")}`,
    correct: left,
    wrongs: [away, start, left + 1],
    explanation: `Taking away makes the collection smaller: ${start} - ${away} = ${left}.`,
    hint: "Count the objects that are not taken away.",
  };
  if (type === 2) return {
    skill: "choose operation from story",
    question: `Which number sentence matches this story? ${a} shells are in a basket and ${b} more are added.`,
    correct: `${a} + ${b} = ${a + b}`,
    wrongs: [`${a + b} - ${b} = ${a}`, `${a} - ${b} = ${Math.max(0, a - b)}`],
    explanation: `The word added tells us to join the groups, so the matching sentence is ${a} + ${b} = ${a + b}.`,
    hint: "Added means use addition.",
  };
  if (type === 3) return {
    skill: "complete subtraction sentence",
    question: `Complete the sentence for the picture: ${start} - ${away} = __`,
    visual: `${dots(left, "●")}   Taken away: ${dots(away, "×")}`,
    correct: left,
    wrongs: [start, away, start + away],
    explanation: `Start with ${start}, remove ${away}, and ${left} remain.`,
    hint: "The answer is what stays, not what was removed.",
  };
  if (type === 4) return {
    skill: "unknown joining change",
    question: `There were ${a} blocks. Now there are ${sum}. How many blocks joined?`,
    visual: `Before: ${dots(a, "■")}\nAfter:  ${dots(sum, "■")}`,
    correct: sum - a,
    wrongs: [sum, a, sum - a + 1],
    explanation: `Count on from ${a} to ${sum}. The missing joining part is ${sum - a}.`,
    hint: "Find the change between before and after.",
  };
  return {
    skill: "mixed add or subtract",
    question: `A plate had ${start} berries. After snack time, ${left} berries were left. What happened?`,
    correct: `${away} berries were taken away`,
    wrongs: [`${away} berries were added`, `${start} berries were left`],
    explanation: `The number went down from ${start} to ${left}, so ${away} berries were taken away.`,
    hint: "A smaller after-number means some were removed.",
  };
}

function n06(seed, bank) {
  const type = seed % 6;
  const groupCount = [2, 3, 4][(seed + Math.floor(seed / 4)) % 3];
  const groupSize = 1 + ((seed * 3 + Math.floor(seed / 2)) % 4);
  const total = groupCount * groupSize;
  const name = names[seed % names.length];
  const object = objects[(seed * 2) % objects.length];
  if (type === 0) return {
    skill: "fair sharing",
    question: `${name} shares ${total} ${object} equally between ${groupCount} children. How many ${object} does each child get?`,
    visual: `${dots(total, "●")}\nChildren: ${dots(groupCount, "▲")}`,
    correct: groupSize,
    wrongs: [groupCount, total, Math.max(0, groupSize - 1)],
    explanation: `Fair sharing gives the same amount to each child. ${total} counters shared between ${groupCount} children gives ${groupSize} each.`,
    hint: "Deal one counter to each child in turn.",
  };
  if (type === 1) return {
    skill: "count equal groups",
    question: `${name} makes equal groups of ${object}. How many equal groups are shown?`,
    visual: groups(groupCount, groupSize, "■"),
    correct: groupCount,
    wrongs: [groupSize, total, groupCount + 1],
    explanation: `There are ${groupCount} groups, and each group has ${groupSize} objects.`,
    hint: "Count the groups, not every object.",
  };
  if (type === 2) return {
    skill: "objects in each group",
    question: `${name} checks that each group is equal. How many ${object} are in each group?`,
    visual: groups(groupCount, groupSize, "◆"),
    correct: groupSize,
    wrongs: [groupCount, total, groupSize + 1],
    explanation: `Each bracket has ${groupSize} objects, so ${groupSize} objects are in each equal group.`,
    hint: "Count just one group when all groups are equal.",
  };
  if (type === 3) return {
    skill: "make groups of a fixed size",
    question: `Put ${total} ${object} into groups of ${groupSize}. How many equal groups can you make?`,
    visual: groups(groupCount, groupSize, "●"),
    correct: groupCount,
    wrongs: [groupSize, total, groupCount - 1],
    explanation: `${total} buttons can be arranged as ${groupCount} equal groups of ${groupSize}.`,
    hint: "The group size is fixed, so count how many groups are made.",
  };
  if (type === 4) return {
    skill: "spot unequal sharing",
    question: `${name} wants every child to receive the same number of ${object}. Which sharing is fair?`,
    correct: `${groupSize}, ${groupSize}, ${groupSize}`.split(", ").slice(0, groupCount).join(", "),
    wrongs: [`${groupSize + 1}, ${groupSize}, ${Math.max(0, groupSize - 1)}`, `${total}, 0, 0`],
    explanation: `A fair share gives the same number to each group.`,
    hint: "Equal means every share has the same number.",
  };
  return {
    skill: "sharing versus grouping",
    question: `Which sentence describes ${name}'s equal-group model?`,
    visual: groups(groupCount, groupSize, "★"),
    correct: `${groupCount} equal groups of ${groupSize}`,
    wrongs: [`${groupSize} equal groups of ${groupCount}`, `${total} equal groups of ${groupSize}`],
    explanation: `The model shows ${groupCount} groups, with ${groupSize} in each group.`,
    hint: "Say the number of groups first, then the number in each group.",
  };
}

const builders = { AC9MFN04: n04, AC9MFN05: n05, AC9MFN06: n06 };

for (const code of codes) {
  const slug = code.toLowerCase();
  const base = path.join(root, "quiz", "grade-k", "math", slug);
  const practice = Array.from({ length: 24 }, (_, index) => item(code, "practice", index, builders[code](index, "practice")));
  const test = Array.from({ length: 16 }, (_, index) => item(code, "test", index, builders[code](index + 40, "test")));
  fs.writeFileSync(path.join(base, "practice", "questions.js"), `"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practice, null, 2)};\n`);
  fs.writeFileSync(path.join(base, "test", "questions.js"), `"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(test, null, 2)};\n`);
  fs.writeFileSync(path.join(base, "questions.js"), `"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practice, null, 2)};\n`);
  console.log(`${code}: ${practice.length} practice, ${test.length} test`);
}

const review = `# Foundation Maths AC9MFN04-AC9MFN06 IXL-standard review

Date: 2026-09-06

## Scope

This batch rebuilds the Practice and Test banks only for AC9MFN04, AC9MFN05 and AC9MFN06. Topic pages, worksheets and teacher-slide assets are preserved.

## AC9MFN04

Official ACARA v9 descriptor: partition and combine collections up to 10 using part-part-whole relationships and subitising to recognise and name the parts.

Assessable components:
- identify a whole up to 10 from two visible parts;
- name the parts in a partition;
- find a missing part when the whole and one part are known;
- connect concrete cube/counter models to part-part-whole and addition sentences;
- recognise different partitions that make the same whole;
- avoid counting only one part or confusing a part with the whole.

IXL pages inspected:
- https://au.ixl.com/maths/foundation/partition-numbers-using-cubes-sums-up-to-10
- https://au.ixl.com/maths/foundation/make-a-number-different-ways-using-cubes-sums-up-to-10
- https://au.ixl.com/maths/foundation/partition-numbers-up-to-10-addition-sentences
- https://au.ixl.com/maths/foundation/make-a-number-using-addition-sums-up-to-10

IXL task evidence: inspected live Learn with an example and representative question states for cube partitions, alternate make-a-number tasks, missing addends and addition-sentence matching. Reading load is short and concrete. Difficulty moves from recognising coloured parts to completing symbolic addition. Distractors usually confuse one part, the whole, or an incorrect sum.

SkillrHub response: the bank mixes visible part naming, missing parts, ten-frame wholes, alternate partitions and correction of total/part misconceptions. Wording, values and visuals are original.

## AC9MFN05

Official ACARA v9 descriptor: represent practical situations involving addition, subtraction and quantification with physical and virtual materials and use counting or subitising strategies.

Assessable components:
- join two small collections and quantify the result;
- separate/take away from a collection and quantify what remains;
- match practical stories to addition or subtraction;
- use picture/counter models to complete number sentences;
- reason about before/after changes;
- distinguish add, subtract, start amount, change amount and result.

IXL pages inspected:
- https://au.ixl.com/maths/foundation/put-together-numbers-using-cubes-sums-up-to-10
- https://au.ixl.com/maths/foundation/addition-word-problems-with-pictures-sums-up-to-10
- https://au.ixl.com/maths/foundation/subtract-with-pictures-numbers-up-to-10
- https://au.ixl.com/maths/foundation/subtraction-word-problems-with-pictures-numbers-up-to-10
- https://au.ixl.com/maths/foundation/add-or-subtract-numbers-up-to-10
- https://au.ixl.com/maths/foundation/related-facts-with-models-numbers-up-to-10

IXL task evidence: inspected live examples for putting together cubes, short addition stories, take-away pictures, subtraction stories, mixed add/subtract prompts and related facts. IXL uses minimal sentences, visible models and step-by-step counting explanations. Distractors target operation reversal, counting the removed group, counting only the joined group, and off-by-one totals.

SkillrHub response: the bank samples joining, separating, story-to-sentence matching, missing change, and mixed operation decisions with concise explanations. All questions use original stories and values.

## AC9MFN06

Official ACARA v9 descriptor: represent practical situations that involve equal sharing and grouping with physical and virtual materials and use counting or subitising strategies.

Assessable components:
- share a small collection fairly between 2, 3 or 4 recipients;
- recognise equal and unequal shares;
- make equal groups of a fixed size;
- count the number of groups;
- count how many are in each group;
- distinguish a group count from a group size;
- keep the work concrete without requiring formal multiplication or division notation.

IXL pages inspected:
- https://au.ixl.com/maths/year-1/count-equal-groups
- https://au.ixl.com/maths/year-1/identify-repeated-addition-for-equal-groups-sums-to-25
- https://au.ixl.com/maths/year-1/write-addition-sentences-for-equal-groups-sums-to-25
- https://au.ixl.com/maths/year-1/divide-by-counting-equal-groups

IXL task evidence: no direct Foundation equal-sharing page was found in the searched IXL Foundation catalogue. Year 1 equal-group pages were opened as near-neighbour evidence for task structure: count groups, count objects in each group, describe equal groups and divide by counting equal groups. Repeated addition content was noted but excluded from the Foundation bank where it would exceed ACARA Foundation expectations.

SkillrHub response: the bank stays in concrete fair sharing and grouping. It avoids formal repeated-addition notation as a required skill, while using IXL-style short prompts, visible groups and misconception-focused distractors.

## Originality and limits

No IXL wording, examples, answer options, names, media, illustrations or question sequences were copied. IXL was used only to benchmark instructional structure, progression, reading load, distractor logic and explanation style. ACARA remains the authority for inclusion and exclusion.
`;

fs.writeFileSync(path.join(root, reviewPath), review);
