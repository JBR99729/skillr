import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const code = "AC9M2N01";
const bankFile = path.join(root, "assets", "assessment-banks", "year2", "math", "ac9m2n01.json");
const visualFile = path.join(root, "assets", "assessment-visuals", "year2", "math", "ac9m2n01-research.svg");

const specs = [];
const add = (bank, skill, question, correct, distractors, summary, hint, visual = null) =>
  specs.push({ bank, skill, question, correct: String(correct), distractors: distractors.map(String), summary, hint, visual });
const blocks = (h, t, o, caption = "Base-ten model") => ({ kind: "blocks", h, t, o, caption });
const line = (start, step, mark, caption = "Number line") => ({ kind: "line", start, step, mark, caption });
const cards = (values, caption = "Number cards") => ({ kind: "cards", values, caption });

// Practice: recognise and represent numbers using materials, numerals and words.
add("practice", "read_base_ten_model", "This base-ten model has 3 hundreds, 7 tens and 4 ones. Which numeral does it show?", 374, [347, 734], "It shows 3 hundreds, 7 tens and 4 ones, so the numeral is 374.", "Read hundreds, then tens, then ones.", blocks(3, 7, 4, "Read the base-ten model"));
add("practice", "match_materials_to_numeral", "Which collection could be used to show 506?", "5 hundreds, 0 tens and 6 ones", ["5 hundreds, 6 tens and 0 ones", "6 hundreds, 0 tens and 5 ones"], "506 has 5 hundreds, no tens and 6 ones.", "Say each digit in its place.", blocks(5, 0, 6, "Build 506"));
add("practice", "read_place_value_table", "A place-value chart has 8 in Hundreds, 2 in Tens and 9 in Ones. Which numeral does it show?", 829, [892, 809], "The digits stay in hundreds–tens–ones order: 829.", "Read the chart from left to right.");
add("practice", "word_to_numeral", "Which numeral matches ‘six hundred and forty-three’?", 643, [634, 603], "Six hundreds, four tens and three ones make 643.", "Listen for the tens word before the ones word.");
add("practice", "numeral_to_words", "Which words name 702?", "seven hundred and two", ["seven hundred and twenty", "seventy-two"], "702 has 7 hundreds, no tens and 2 ones.", "Do not skip the hundreds place.");
add("practice", "read_base_ten_model", "This model has 2 hundred flats, 9 ten rods and 1 one. Which numeral is shown?", 291, [219, 921], "2 hundreds, 9 tens and 1 one make 291.", "Keep the places in order.", blocks(2, 9, 1, "Read the base-ten model"));
add("practice", "select_matching_model", "Which description shows 480?", "4 hundreds and 8 tens", ["4 hundreds and 8 ones", "8 hundreds and 4 tens"], "480 is 4 hundreds, 8 tens and no ones.", "A missing ones digit means 0 ones.");
add("practice", "read_number_with_zero", "Which numeral matches 9 hundreds and 5 ones?", 905, [950, 95], "There are no tens, so the tens digit is 0: 905.", "Keep a place for tens.", blocks(9, 0, 5, "Build 905"));
add("practice", "match_word_and_numeral", "Which pair names the same number?", "318 and three hundred and eighteen", ["381 and three hundred and eighteen", "318 and three hundred and eighty-one"], "Three hundred and eighteen is 318.", "Match the tens word to the middle digit.");
add("practice", "read_base_ten_model", "What number has 1 hundred flat, 0 ten rods and 8 one blocks?", 108, [180, 18], "1 hundred, 0 tens and 8 ones make 108.", "Use three places even when one place has none.", blocks(1, 0, 8, "Read the base-ten model"));
add("practice", "match_materials_to_numeral", "A student writes 672. Which materials should they use?", "6 hundreds, 7 tens and 2 ones", ["6 hundreds, 2 tens and 7 ones", "7 hundreds, 6 tens and 2 ones"], "The numeral 672 tells you the hundreds, tens and ones counts.", "Point to each digit from left to right.");
add("practice", "numeral_to_words", "Which words name 460?", "four hundred and sixty", ["four hundred and six", "four hundred and sixteen"], "460 has 4 hundreds and 6 tens.", "The 6 is in the tens place.");
add("practice", "read_place_value_table", "A place-value chart has 4 in Hundreds, 0 in Tens and 3 in Ones. What number is shown?", 403, [430, 43], "The chart reads 4 hundreds, 0 tens and 3 ones: 403.", "Keep the zero in the middle place.");
add("practice", "word_to_numeral", "Which numeral matches ‘one hundred and ninety’?", 190, [109, 910], "One hundred and ninety is 1 hundred, 9 tens and 0 ones.", "Ninety tells you there are 9 tens.");
add("practice", "read_base_ten_model", "Which numeral is represented by this model with 6 hundreds, 5 tens and 8 ones?", 658, [685, 568], "It shows 6 hundreds, 5 tens and 8 ones, so it is 658.", "Start with the hundreds flats.", blocks(6, 5, 8, "Read the base-ten model"));
add("practice", "choose_correct_representation", "Which number can be represented by 7 hundred flats, 3 ten rods and no one blocks?", 730, [703, 73], "7 hundreds and 3 tens make 730.", "No one blocks means the ones digit is 0.");

// Practice: read, locate and reason with number lines.
add("practice", "missing_number_line", "The marks are equally spaced: 420, 430, ___, 450. Which number is missing?", 440, [435, 460], "The line increases by 10 each mark: 420, 430, 440, 450.", "Find the equal jump first.", line(420, 10, 440, "Find the missing mark"));
add("practice", "locate_marked_number", "The arrow points to a mark on the number line. What number is it?", 260, [250, 270], "The marks count by 10 from 220. The arrow is at 260.", "Count the equal jumps from 220.", line(220, 10, 260, "Read the arrow"));
add("practice", "number_line_between", "Which number belongs between 676 and 678 on a number line?", 677, [667, 679], "677 is one more than 676 and one less than 678.", "Count forward one step.");
add("practice", "number_line_scale", "A number line starts at 300. Each mark is 20 more. What number is on the fourth mark after 300?", 380, [340, 420], "Four jumps of 20 from 300 land on 380.", "Count 320, 340, 360, 380.", line(300, 20, 380, "Count in jumps of 20"));
add("practice", "locate_between_tens", "Where would 475 go on a number line marked 470, 480, 490?", "halfway between 470 and 480", ["on the 470 mark", "halfway between 480 and 490"], "475 is 5 more than 470 and 5 less than 480.", "Find the two tens around 475.");
add("practice", "successor_on_line", "What number comes immediately after 699 on a number line?", 700, [690, 701], "One more than 699 is 700.", "Crossing into a new hundred does not change the one-step jump.");
add("practice", "predecessor_on_line", "What number comes immediately before 500 on a number line?", 499, [490, 501], "One less than 500 is 499.", "Step back one, not ten.");
add("practice", "missing_number_line", "A line counts by 50: 550, 600, ___, 700. What is missing?", 650, [625, 750], "Each jump is 50, so 600 + 50 = 650.", "Use the first two labels to find the step.", line(550, 50, 650, "Find the missing mark"));
add("practice", "read_number_line_interval", "On this number line, which value is at the arrow?", 840, [820, 860], "The line starts at 800 and the marks increase by 20. The arrow is at 840.", "Count two jumps of 20 from 800.", line(800, 20, 840, "Read the arrow"));
add("practice", "choose_number_line_position", "Which number would be closest to the middle of a number line from 600 to 700?", 650, [610, 690], "650 is halfway between 600 and 700.", "Half of a 100 jump is 50.");
add("practice", "read_equal_jumps", "A number line has equal marks: 150, 175, 200, 225. What is the size of each jump?", 25, [20, 50], "175 − 150 = 25, so every equal jump is 25.", "Subtract two neighbouring labels.");
add("practice", "find_missing_before_after", "Which number completes this line: 897, 898, ___, 900?", 899, [890, 901], "The numbers increase by 1, so 899 comes before 900.", "Say the numbers in order.");
add("practice", "locate_hundred_benchmark", "A point is between 700 and 800 and is 30 more than 700. What number is the point?", 730, [703, 770], "Starting at 700 and moving 30 lands on 730.", "Use the hundreds digit, then add the tens.");
add("practice", "number_line_scale", "The labels on a line are 100, 200, 300, 400. Which number would be halfway between 200 and 300?", 250, [225, 350], "250 is 50 more than 200 and 50 less than 300.", "Find half of 100.");
add("practice", "locate_close_number", "A line is marked every 10 from 520 to 570. Which mark is 3 marks after 520?", 550, [530, 560], "Three jumps of 10 are 530, 540, 550.", "Count the marks, not just the spaces.", line(520, 10, 550, "Count three equal jumps"));
add("practice", "compare_positions", "Mia says 425 is to the right of 452 on a number line. Is Mia correct?", "No, because 425 is less than 452", ["Yes, because 425 has a 5", "Yes, because 425 is closer to 500"], "Smaller numbers are to the left. Since 425 is less than 452, it is left of 452.", "Compare the tens after the 4 hundreds.");

// Practice: compare and order numbers to 1000.
add("practice", "compare_hundreds", "Complete the statement: 386 ___ 412.", "<", [">", "="], "3 hundreds is less than 4 hundreds, so 386 < 412.", "Compare hundreds first.");
add("practice", "compare_tens", "Which number is greater: 563 or 593?", 593, [563, "They are equal"], "Both have 5 hundreds. 9 tens is greater than 6 tens.", "When hundreds match, compare tens.");
add("practice", "compare_ones", "Complete the statement: 728 ___ 723.", ">", ["<", "="], "The hundreds and tens match. 8 ones is greater than 3 ones.", "Compare ones only after the other places match.");
add("practice", "recognise_equal_numbers", "Which comparison is true?", "667 = 667", ["667 > 676", "667 < 660"], "A number is equal to itself.", "Check every digit in both numerals.");
add("practice", "order_three_numbers", "Put 405, 450 and 504 in order from smallest to largest.", "405, 450, 504", ["504, 450, 405", "450, 405, 504"], "405 and 450 have 4 hundreds; 405 comes first. 504 has 5 hundreds.", "Sort by hundreds, then tens.", cards([405, 450, 504], "Order from smallest to largest"));
add("practice", "order_four_numbers", "Which list is in order from greatest to least?", "980, 908, 890, 809", ["809, 890, 908, 980", "980, 890, 908, 809"], "Compare the hundreds, then tens: 980 is greatest and 809 is least.", "Greatest to least moves from right to left on a number line.");
add("practice", "find_middle_number", "Which number is in the middle when 318, 381 and 813 are ordered?", 381, [318, 813], "318 is smallest and 813 is greatest, so 381 is in the middle.", "Find the smallest and greatest first.");
add("practice", "find_greatest_number", "Which number is greatest: 699, 696 or 669?", 699, [696, 669], "All have 6 hundreds. 9 tens is greater than 6 tens.", "Compare the first place that is different.");
add("practice", "find_least_number", "Which number is least: 730, 703 or 370?", 370, [703, 730], "370 has 3 hundreds, while the other numbers have 7 hundreds.", "The hundreds digit decides first.");
add("practice", "order_equal_hundreds", "Put 846, 864 and 804 in order from smallest to largest.", "804, 846, 864", ["864, 846, 804", "846, 804, 864"], "All have 8 hundreds. Compare the tens: 0, 4, then 6.", "Line up the hundreds, tens and ones.");
add("practice", "compare_with_zero", "Which number is greater: 908 or 890?", 908, [890, "They are equal"], "Both have 8 hundreds. 0 tens is less than 9 tens, so 908 is greater.", "Compare tens before ones.");
add("practice", "identify_not_ordered", "Which number is out of order in this increasing list: 245, 254, 252, 260?", 252, [245, 260], "252 should come before 254, so it is out of order there.", "Compare the tens, then the ones.");
add("practice", "justify_comparison", "Why is 731 greater than 713?", "731 has 3 tens and 713 has 1 ten", ["731 has more digits", "1 one is greater than 3 tens"], "Both have 7 hundreds. 3 tens is greater than 1 ten.", "Use the first place where the digits differ.");
add("practice", "order_from_bounds", "Which number belongs between 599 and 601?", 600, [590, 610], "600 is one more than 599 and one less than 601.", "Use the numbers just before and after it.");
add("practice", "compare_number_line_positions", "On a number line, which number is farther right: 762 or 726?", 762, [726, "They are at the same place"], "762 is greater than 726, so it is farther right.", "Greater numbers are farther right.");
add("practice", "order_numbers_with_same_tens", "Put 492, 429 and 494 in order from smallest to largest.", "429, 492, 494", ["494, 492, 429", "492, 429, 494"], "All have 4 hundreds. 429 has 2 tens, then 492 and 494 have 9 tens; compare ones last.", "Compare one place at a time.", cards([492, 429, 494], "Order from smallest to largest"));

// Independent quick check: different numbers and decisions from Practice.
add("test", "read_base_ten_model", "A virtual base-ten model has 4 hundreds, 8 tens and 2 ones. Which numeral is shown?", 482, [428, 842], "It shows 4 hundreds, 8 tens and 2 ones: 482.", "Read hundreds, tens and ones in that order.", blocks(4, 8, 2, "Read the base-ten model"));
add("test", "word_to_numeral", "Which numeral matches ‘three hundred and seventy’?", 370, [307, 730], "Three hundreds and seven tens make 370.", "The ones digit is 0.");
add("test", "read_number_with_zero", "A model has 6 hundred flats, 0 ten rods and 4 one blocks. What number is shown?", 604, [640, 64], "6 hundreds, no tens and 4 ones make 604.", "Keep the tens place even when there are no tens.", blocks(6, 0, 4, "Read the base-ten model"));
add("test", "numeral_to_words", "Which words name 815?", "eight hundred and fifteen", ["eight hundred and fifty", "eight hundred and five"], "815 is 8 hundreds, 1 ten and 5 ones.", "Read the tens and ones together.");
add("test", "missing_number_line", "The marks are equally spaced: 610, 630, ___, 670. What number is missing?", 650, [640, 660], "The line jumps by 20: 610, 630, 650, 670.", "Find the equal jump.", line(610, 20, 650, "Find the missing mark"));
add("test", "locate_marked_number", "This number line counts by 5 from 900. What value is at the arrow?", 925, [915, 935], "The line counts by 5. The arrow is at 925.", "Count the equal jumps from 900.", line(900, 5, 925, "Read the arrow"));
add("test", "number_line_scale", "A line starts at 400 and each mark is 25 more. What number is on the third mark after 400?", 475, [425, 500], "Three jumps of 25 are 425, 450, 475.", "Count each equal jump.");
add("test", "number_line_between", "Which number would be halfway between 740 and 760?", 750, [745, 770], "750 is 10 more than 740 and 10 less than 760.", "Half of 20 is 10.");
add("test", "compare_hundreds", "Complete the statement: 799 ___ 801.", "<", [">", "="], "7 hundreds is less than 8 hundreds, so 799 < 801.", "Compare the hundreds first.");
add("test", "compare_tens", "Which sign correctly completes 645 ___ 614?", ">", ["<", "="], "Both have 6 hundreds; 4 tens is greater than 1 ten.", "Compare the tens after equal hundreds.");
add("test", "compare_ones", "Which number is greater: 857 or 852?", 857, [852, "They are equal"], "The hundreds and tens are equal. 7 ones is greater than 2 ones.", "Use the ones place last.");
add("test", "order_three_numbers", "Put 698, 689 and 869 in order from smallest to largest.", "689, 698, 869", ["869, 698, 689", "698, 689, 869"], "689 and 698 both have 6 hundreds; compare their tens. 869 has 8 hundreds.", "Order by hundreds, then tens, then ones.", cards([698, 689, 869], "Order from smallest to largest"));
add("test", "order_four_numbers", "Arrange 934, 893, 839 and 398 from greatest to least.", "934, 893, 839, 398", ["398, 839, 893, 934", "934, 839, 893, 398"], "934 has the most hundreds. Then 893, 839 and 398 follow in decreasing order.", "Check the hundreds digit first.");
add("test", "find_middle_number", "Which number is in the middle when 507, 570 and 705 are ordered?", 570, [507, 705], "507 is smallest and 705 is greatest, leaving 570 in the middle.", "Find the least and greatest first.");
add("test", "justify_comparison", "Why is 460 less than 496?", "Both have 4 hundreds, but 6 tens is less than 9 tens", ["460 has fewer digits", "0 ones is less than 6 ones"], "The tens decide because both numbers have 4 hundreds.", "Compare the first place that is different.");
add("test", "identify_not_ordered", "Which number is out of order in this increasing list: 806, 860, 850, 890?", 850, [806, 890], "850 should be before 860, so it is the number out of order.", "Compare 850 and 860 one place at a time.");

const escapeXml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const label = (value, x, y, size = 18, weight = 700) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="#17324d">${escapeXml(value)}</text>`;
function blockVisual({ h, t, o, caption }) {
  const hundreds = Array.from({ length: h }, (_, i) => `<rect x="${66 + (i % 5) * 42}" y="${76 + Math.floor(i / 5) * 42}" width="34" height="34" rx="4" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>`).join("");
  const tens = Array.from({ length: t }, (_, i) => `<rect x="${300 + (i % 5) * 26}" y="${76 + Math.floor(i / 5) * 55}" width="17" height="46" rx="4" fill="#5eead4" stroke="#0f766e" stroke-width="2"/>`).join("");
  const ones = Array.from({ length: o }, (_, i) => `<circle cx="${468 + (i % 4) * 27}" cy="${93 + Math.floor(i / 4) * 27}" r="9" fill="#fde68a" stroke="#b45309" stroke-width="2"/>`).join("");
  return `${label(caption, 320, 40, 24)}${hundreds}${tens}${ones}${label(`${h} hundreds`, 150, 268)}${label(`${t} tens`, 365, 268)}${label(`${o} ones`, 520, 268)}`;
}
function lineVisual({ start, step, mark, caption }) {
  const values = Array.from({ length: 6 }, (_, i) => start + i * step);
  const markIndex = values.indexOf(mark);
  const mx = 90 + Math.max(0, markIndex) * 92;
  return `${label(caption, 320, 40, 24)}<line x1="90" y1="140" x2="550" y2="140" stroke="#17324d" stroke-width="5"/>${values.map((value, i) => `<line x1="${90 + i * 92}" y1="124" x2="${90 + i * 92}" y2="156" stroke="#17324d" stroke-width="3"/>${label(value, 90 + i * 92, 187)}`).join("")}<path d="M ${mx} 74 L ${mx - 13} 105 L ${mx + 13} 105 Z" fill="#f97316"/>${label("?", mx, 68, 20)}`;
}
function cardsVisual({ values, caption }) {
  return `${label(caption, 320, 52, 24)}${values.map((value, i) => `<rect x="${85 + i * 155}" y="98" width="125" height="90" rx="16" fill="#eff6ff" stroke="#60a5fa" stroke-width="3"/>${label(value, 147 + i * 155, 153, 29)}`).join("")}${label("Use hundreds, then tens, then ones.", 320, 255)}`;
}
function renderVisual(id, visual) {
  const body = visual.kind === "blocks" ? blockVisual(visual) : visual.kind === "line" ? lineVisual(visual) : cardsVisual(visual);
  return `<symbol id="${id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="18" fill="#f8fbff"/>${body}</symbol>`;
}

const output = specs.map((spec, index) => {
  const withinBank = specs.filter((entry, entryIndex) => entry.bank === spec.bank && entryIndex <= index).length;
  const correctIndex = (withinBank - 1) % 3;
  const answers = [...spec.distractors];
  answers.splice(correctIndex, 0, spec.correct);
  const id = `${code}-${spec.bank === "practice" ? "P" : "T"}-${String(withinBank).padStart(3, "0")}`;
  const visualId = id.toLowerCase();
  return {
    id,
    subject: "math",
    year_level: "Year 2",
    curriculum_code: code,
    bank: spec.bank,
    skill: spec.skill,
    question: spec.question,
    audio_prompt: spec.question,
    visual: spec.visual ? { type: "svg", asset_path: `/assets/assessment-visuals/year2/math/ac9m2n01-research.svg#${visualId}`, alt_text: spec.question } : { type: "none", alt_text: "" },
    answers: answers.map((text, answerIndex) => ({ text, is_correct: answerIndex === correctIndex })),
    correct_index: correctIndex,
    explanation: { summary: spec.summary, hint: spec.hint },
    difficulty: spec.bank === "test" ? 3 : withinBank <= 16 ? 1 : withinBank <= 32 ? 2 : 3,
    difficulty_tier: spec.bank === "test" ? "independent" : withinBank <= 16 ? "recognise" : withinBank <= 32 ? "apply" : "reason",
    sequence_priority: withinBank,
    quality_schema: "skillr-ac9m2n01-research-v1",
    review: {
      version: "20261015-ac9m2n01-research-v1",
      status: "author-review-complete",
      research_record: "JBR99729/research- year-2/maths/AC9M2N01/research/research.md",
      evidence_scope: "Original items derived from recorded task types; source wording and media were not copied. Formal partitioning/regrouping is excluded because it belongs to AC9M2N02."
    }
  };
});
const practice = output.filter((item) => item.bank === "practice");
const test = output.filter((item) => item.bank === "test");
if (practice.length !== 48 || test.length !== 16) throw new Error(`Expected 48 practice and 16 test items; found ${practice.length}/${test.length}`);
const visualSymbols = output.filter((item) => item.visual.type === "svg").map((item) => {
  const source = specs.find((spec, index) => {
    const current = `${code}-${spec.bank === "practice" ? "P" : "T"}-${String(specs.filter((entry, entryIndex) => entry.bank === spec.bank && entryIndex <= index).length).padStart(3, "0")}`;
    return current === item.id;
  });
  return renderVisual(item.id.toLowerCase(), source.visual);
});
fs.writeFileSync(bankFile, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(visualFile, `<svg xmlns="http://www.w3.org/2000/svg">\n${visualSymbols.join("\n")}\n</svg>\n`);
console.log(JSON.stringify({ code, practice: practice.length, test: test.length, visuals: visualSymbols.length, bankFile: path.relative(root, bankFile) }, null, 2));
