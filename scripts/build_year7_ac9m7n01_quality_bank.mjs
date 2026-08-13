#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CODE = "AC9M7N01";
const TITLE = "Perfect Squares and Square Roots";
const ASSET = "/assets/assessment-visuals/year7/maths/ac9m7n01.svg";

const practice = [];
const test = [];
const add = (bank, question, correct, wrong, summary, hint, symbol, alt) => (bank === "practice" ? practice : test).push({ question, correct: String(correct), wrong: wrong.map(String), summary, hint, symbol, alt });

// Practice: direct representations, pattern recognition, application and explanation.
[[6,36],[8,64],[11,121],[14,196]].forEach(([side,area]) => add("practice", `A square courtyard has side length ${side} metres. What is its area?`, `${area} m²`, [`${side*2} m²`, `${area+side} m²`], `A square's area is side × side, so ${side} × ${side} = ${area} square metres.`, "Use the same side length twice, not side plus side.", "square", `Square with each side labelled ${side} metres, arranged as ${side} rows of ${side} equal square units.`));
[[49,7],[81,9],[144,12],[225,15]].forEach(([area,side]) => add("practice", `A square display covers ${area} square centimetres. How long is each side?`, `${side} cm`, [`${Math.round(area/4)} cm`, `${side*2} cm`], `The side length is √${area} = ${side} centimetres because ${side}² = ${area}.`, "Find the positive number that multiplies by itself to make the area.", "square", `Square area model labelled ${area} square centimetres with an unknown equal side length.`));
[[30,5,6],[70,8,9],[110,10,11],[170,13,14]].forEach(([n,low,high]) => add("practice", `Between which two consecutive whole numbers does √${n} lie?`, `${low} and ${high}`, [`${low-1} and ${low}`, `${high} and ${high+1}`], `${low}² = ${low*low} and ${high}² = ${high*high}, so √${n} lies between ${low} and ${high}.`, `Bracket ${n} between two neighbouring perfect squares.`, "numberline", `Number line locating ${n} between the consecutive perfect squares ${low*low} and ${high*high}.`));
[["1, 4, 9, 16, 25",36],["16, 25, 36, 49, 64",81],["49, 64, 81, 100, 121",144]].forEach(([sequence,next]) => add("practice", `The pattern is ${sequence}. What is the next term?`, next, [next-1, next+next**0.5], `These are consecutive perfect squares, so the next term is ${next}.`, "Write each term as n² and increase n by one.", "pattern", `Dot-array sequence of consecutive square numbers matching ${sequence}.`));
[[18,17,19],[27,26,28],[42,41,43]].forEach(([n,below,above]) => add("practice", `Which perfect square is closest to ${n}²?`, n*n, [below*below,above*above], `${n}² = ${n*n}, exactly the square of ${n}.`, "Square the stated number before comparing nearby square numbers.", "pattern", `Three neighbouring square arrays representing ${below} squared, ${n} squared and ${above} squared.`));
add("practice", "Mia says √100 = 50 because 100 ÷ 2 = 50. Which response best corrects her?", "√100 is 10 because 10 × 10 = 100.", ["√100 is 20 because 20 + 20 + 20 + 20 + 20 = 100.", "√100 is 5 because 5 × 20 = 100."], "A square root is a number that multiplies by itself to make the original number.", "Test each proposed root by squaring it.", "square", "Square area model of 100 unit squares arranged in 10 equal rows and 10 equal columns.");
add("practice", "A student writes 13² = 26. What mistake has the student made?", "They doubled 13 instead of multiplying 13 by itself.", ["They found the square root instead of the square.", "They multiplied 13 by 3 instead of by 2."], "Squaring 13 means 13 × 13, not 13 × 2.", "Translate the exponent 2 into repeated multiplication.", "pattern", "Comparison showing 13 plus 13 beside a 13 by 13 square array.");
add("practice", "Which calculation uses a nearby square to find 19² efficiently?", "20² − 2 × 20 + 1", ["20² − 1", "20² − 20 + 1"], "Since 19 = 20 − 1, (20 − 1)² = 20² − 2 × 20 + 1.", "Use (a − b)² = a² − 2ab + b².", "split", "Area diagram splitting a 20 by 20 square to represent a 19 by 19 square.");
add("practice", "Which calculation correctly finds 23² using 20 + 3?", "20² + 2 × 20 × 3 + 3²", ["20² + 3²", "20² + 20 × 3 + 3²"], "The square of a sum includes two equal 20-by-3 rectangles: (20 + 3)² = 20² + 2 × 20 × 3 + 3².", "Account for all four regions in the area model.", "split", "Area model for a 23 by 23 square split into 20 and 3 along both dimensions.");
add("practice", "A square tile has area 196 cm². A second square has sides twice as long. What is the second square's area?", "784 cm²", ["392 cm²", "588 cm²"], "Doubling both dimensions multiplies area by 2² = 4, so 196 × 4 = 784 cm².", "Area changes by the square of the scale factor.", "square", "Two square tiles, with the second side twice the first side and divided into four matching regions.");
add("practice", "A square garden has area between 120 m² and 130 m². Which whole-number side length is possible?", "11 m", ["10 m", "12 m"], "11² = 121, which lies between 120 and 130; 10² = 100 and 12² = 144 do not.", "Square each possible side length and check the interval.", "numberline", "Number line showing 120 to 130 with the perfect square 121 marked inside the interval.");

// Test: new contexts and less scaffolded reasoning.
[[17,289],[22,484],[25,625]].forEach(([side,area]) => add("test", `A square solar panel has side length ${side} centimetres. What area does it cover?`, `${area} cm²`, [`${side*4} cm²`, `${area-side} cm²`], `The area is ${side}² = ${area} square centimetres.`, "Multiply the side length by itself.", "square", `Square solar panel with side length ${side} centimetres and an equal-row grid.`));
[[169,13],[256,16],[324,18]].forEach(([area,side]) => add("test", `A square stage has area ${area} m². What is its side length?`, `${side} m`, [`${area/4} m`, `${side*2} m`], `√${area} = ${side} because ${side} × ${side} = ${area}.`, "Look for the whole number whose square equals the area.", "square", `Square stage labelled ${area} square metres with equal unknown sides.`));
[[50,7,8],[95,9,10],[150,12,13]].forEach(([n,low,high]) => add("test", `A calculator display shows √${n}. Between which consecutive integers must the value lie?`, `${low} and ${high}`, [`${low-1} and ${low}`, `${high} and ${high+1}`], `${low*low} < ${n} < ${high*high}, so ${low} < √${n} < ${high}.`, "Find the neighbouring perfect squares around the radicand.", "numberline", `Number line bracketing ${n} between ${low*low} and ${high*high}.`));
add("test", "Noah claims 15² is 225 because 10² + 5² = 125, then he adds 100. Which method directly verifies the result?", "Calculate 15 × 15 and obtain 225.", ["Calculate 15 + 15 and obtain 30.", "Calculate 225 ÷ 15² and obtain 1."], "Direct multiplication verifies that 15² = 15 × 15 = 225.", "A verification should independently reproduce the claimed square.", "split", "Fifteen by fifteen area model split into 10 and 5 along each dimension.");
add("test", "Which expression is equal to 31²?", "30² + 2 × 30 + 1", ["30² + 1", "30² + 30 + 1"], "Because 31 = 30 + 1, (30 + 1)² = 30² + 2 × 30 × 1 + 1².", "Include both rectangular cross-parts in the square-of-a-sum model.", "split", "Area model for a 31 by 31 square partitioned into 30 and 1 along both sides.");
add("test", "A square photograph is enlarged so each side is three times the original length. How does its area change?", "The area becomes 9 times as large.", ["The area becomes 3 times as large.", "The area becomes 6 times as large."], "Scaling both side lengths by 3 scales area by 3² = 9.", "Square the linear scale factor to find the area scale factor.", "square", "Original square beside an enlarged square divided into nine copies of the original area.");
add("test", "Which value is not a perfect square?", "180", ["169", "196"], "169 = 13² and 196 = 14², while 180 lies between them.", "Check neighbouring squares rather than relying on the final digit alone.", "numberline", "Number line showing 169, 180 and 196 between the square numbers 13 squared and 14 squared.");
add("test", "A square storage area must cover at least 200 m² using a whole-number side length. What is the shortest possible side?", "15 m", ["14 m", "16 m"], "14² = 196 is too small, while 15² = 225 meets the requirement.", "Test the whole-number roots immediately below and above √200.", "numberline", "Number line comparing the required area 200 with 14 squared and 15 squared.");
add("test", "A student says every number ending in 5 is a perfect square. Which counterexample disproves the claim?", "15", ["25", "225"], "15 ends in 5 but is not the square of a whole number; 25 = 5² and 225 = 15².", "A counterexample must satisfy the condition but make the conclusion false.", "pattern", "Cards labelled 15, 25 and 225, with square arrays shown only for 25 and 225.");
add("test", "The area of a square is 400 cm². Its side is reduced by 2 cm. What is the new area?", "324 cm²", ["396 cm²", "360 cm²"], "The original side is √400 = 20 cm. The new side is 18 cm, so its area is 18² = 324 cm².", "Convert area to side length before applying the change.", "square", "Twenty-centimetre square with a two-centimetre strip removed from two adjacent sides, leaving an eighteen-centimetre square.");

if (practice.length !== 24 || test.length !== 16) throw new Error(`Expected 24/16, found ${practice.length}/${test.length}`);

const items = [];
for (const [bank, source] of [["practice", practice], ["test", test]]) source.forEach((item, index) => {
  const correctIndex = index % 3;
  const choices = [...item.wrong];
  choices.splice(correctIndex, 0, item.correct);
  items.push({
    id: `${CODE}-${bank === "practice" ? "P" : "T"}-${String(index + 1).padStart(3, "0")}`,
    subject: "math", year_level: "Year 7", curriculum_code: CODE, bank,
    skill: "perfect_squares_and_square_roots", question: item.question, audio_prompt: item.question,
    visual: { type: "svg", asset_path: `${ASSET}#${item.symbol}`, alt_text: item.alt },
    answers: choices.map((text, i) => ({ text, is_correct: i === correctIndex })), correct_index: correctIndex,
    explanation: { summary: item.summary, hint: item.hint },
  });
});

const out = path.join(ROOT, "assets/assessment-banks/year7/math/ac9m7n01.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(items, null, 2)}\n`);

const route = path.join(ROOT, "quiz/year-7/math/ac9m7n01");
for (const bank of ["practice", "test"]) {
  const file = path.join(route, `${bank}/index.html`);
  const count = bank === "practice" ? 8 : 12;
  const size = bank === "practice" ? 24 : 16;
  let html = fs.readFileSync(file, "utf8")
    .replace(/<title>.*?<\/title>/, `<title>${CODE} ${TITLE} ${bank === "practice" ? "Practice" : "Test"} | SkillrHub</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${bank === "practice" ? "Practise 8 rotating questions from a 24-question" : "Take a 12-question test drawn from a separate 16-question"} Year 7 bank for ${CODE}.">`)
    .replace(/<h1 id="quizTitle">.*?<\/h1>/, `<h1 id="quizTitle">${TITLE}</h1>`)
    .replace(/<span class="summary-number" id="questionCount">\d+<\/span><span class="summary-label">Questions(?: this attempt)?<\/span>/, `<span class="summary-number" id="questionCount">${count}</span><span class="summary-label">Questions this attempt</span>`)
    .replace(/<script>window\.quizConfig=\{.*?<\/script>/, (config) => config.replace(/"maxQuestions":\d+/, `"maxQuestions":${count}`).replace(/"shuffleQuestions":(?:true|false)/, '"shuffleQuestions":true').replace(/"questionCycle":(?:true|false)/, `"questionCycle":${bank === "practice" ? "true" : "false"}`))
    .replace(/<script src="\/quiz\/year-7\/math\/ac9m7n01\/(?:practice|test)\/questions\.js[^>]*><\/script>/, `<script src="/quiz/year-7/math/ac9m7n01/${bank}/questions.js?v=20260813-y7m2"></script>`);
  html = html.replace(`<div><span class="summary-number">75%</span>`, `<div><span class="summary-number">${size}</span><span class="summary-label">Question bank</span></div><div><span class="summary-number">75%</span>`);
  fs.writeFileSync(file, html);
}

let html = fs.readFileSync(path.join(route, "index.html"), "utf8")
  .replace(/<title>.*?<\/title>/, `<title>${CODE} ${TITLE} Activities | SkillrHub</title>`)
  .replace(/<h1>.*?<\/h1>/, `<h1>${TITLE}</h1>`)
  .replace(/<p>Choose a learning activity\..*?<\/p>/, "<p>Choose a learning activity. Practice rotates 8 questions from a 24-question bank; Test draws 12 questions from a separate 16-question bank.</p>");
fs.writeFileSync(path.join(route, "index.html"), html);
html = fs.readFileSync(path.join(route, "worksheet/index.html"), "utf8")
  .replace(/<h1 id="quizTitle">.*?<\/h1>/, `<h1 id="quizTitle">${TITLE} worksheet</h1>`)
  .replace(/<p>Download a worksheet containing.*?<\/p>/, "<p>Download an 8-question worksheet drawn from the Practice bank.</p>");
fs.writeFileSync(path.join(route, "worksheet/index.html"), html);
for (const bank of ["practice", "test"]) {
  const retake = path.join(route, `${bank}/retake/index.html`);
  html = fs.readFileSync(retake, "utf8")
    .replace(/<h1>Retake (?:practice|test): .*?<\/h1>/, `<h1>Retake ${bank}: ${TITLE}</h1>`)
    .replace(/<p>Try the same eight curriculum questions again.*?<\/p>/, bank === "practice" ? "<p>Start a fresh rotating 8-question attempt from the 24-question Practice bank.</p>" : "<p>Start a fresh 12-question attempt from the separate 16-question Test bank.</p>");
  fs.writeFileSync(retake, html);
  const review = path.join(route, `${bank}/review/index.html`);
  html = fs.readFileSync(review, "utf8").replace(/try the eight questions again/, bank === "practice" ? "try another rotating set of eight questions" : "try another 12-question test");
  fs.writeFileSync(review, html);
}
console.log(`Built ${CODE}: ${practice.length} Practice and ${test.length} Test questions.`);
