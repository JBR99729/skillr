import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const groups = [
  {
    skill: "complete_sample_spaces",
    practice: [
      ["A coin is flipped and a 4-section spinner is spun. How many outcomes are in the complete sample space?", "8", ["4", "6", "16"], "Each of 2 coin outcomes pairs with each of 4 spinner outcomes: 2 × 4 = 8.", "Multiply the number of choices at the two stages."],
      ["A coin is flipped and a six-sided die is rolled. What is the probability of T5?", "1/12", ["1/2", "1/6", "2/12"], "There are 2 × 6 = 12 equally likely ordered outcomes, and T5 is one outcome, so its probability is 1/12.", "List T1 to T6 and H1 to H6."],
    ],
    test: [
      ["A 3-colour spinner is spun and then a coin is flipped. How many ordered outcomes are possible?", "6", ["3", "5", "9"], "The multiplication principle gives 3 × 2 = 6 ordered outcomes.", "Pair each spinner colour with H and T."],
      ["Two fair six-sided dice are rolled. What is the probability of the ordered outcome (2, 5)?", "1/36", ["1/12", "1/6", "2/36"], "There are 6 × 6 = 36 equally likely ordered outcomes and (2, 5) is one of them.", "The first and second die positions matter."],
    ],
  },
  {
    skill: "systematic_lists_and_tables",
    practice: [
      ["Two coins are flipped. Which is the complete sample space?", "{HH, HT, TH, TT}", ["{H, T}", "{HH, TT}", "{HH, HT, TT}"], "A two-way array pairs each first-flip result with each second-flip result, producing HH, HT, TH and TT.", "Keep the first and second flip positions separate."],
      ["Two fair coins are flipped. What is the probability of exactly one head?", "1/2", ["1/4", "3/4", "1"], "HT and TH are the 2 favourable outcomes among 4 equally likely outcomes, so 2/4 = 1/2.", "Identify both orders that contain one head."],
    ],
    test: [
      ["A spinner labelled A, B, C is spun twice. Which method guarantees every ordered outcome is recorded once?", "Use a 3 × 3 table with first spin as rows and second spin as columns", ["List A, B and C once", "Record only matching letters", "Add the two labels"], "A 3 × 3 table creates one cell for each of the 9 ordered pairs.", "One axis must represent each stage."],
      ["A 3-colour spinner is spun twice. What is the probability that both spins show the same colour?", "1/3", ["1/9", "2/3", "1"], "The 3 matching outcomes are AA, BB and CC among 9 equally likely ordered outcomes, so 3/9 = 1/3.", "Use the diagonal cells of a 3 × 3 table."],
    ],
  },
  {
    skill: "replacement_and_tree_diagrams",
    practice: [
      ["A bag has 3 red and 2 blue marbles. A marble is replaced after the first draw. What is P(red then red)?", "9/25", ["3/10", "6/20", "2/5"], "Replacement restores the bag, so P(RR) = 3/5 × 3/5 = 9/25.", "Use the same red branch probability at both stages."],
      ["From a standard deck, an ace is drawn, replaced and the deck shuffled. What is P(ace then king)?", "1/169", ["4/51", "4/663", "1/13"], "With replacement, P(ace then king) = 4/52 × 4/52 = 1/13 × 1/13 = 1/169.", "Replacement keeps both denominators at 52."],
    ],
    test: [
      ["A bag has 4 green and 3 yellow counters. Two are drawn without replacement. What is P(green then green)?", "2/7", ["16/49", "3/7", "4/21"], "Without replacement, P(GG) = 4/7 × 3/6 = 12/42 = 2/7.", "After one green is removed, update both counts."],
      ["An ace is drawn from a 52-card deck and kept out. What is the probability the next card is a king?", "4/51", ["3/51", "4/52", "3/52"], "Removing an ace leaves 51 cards but all 4 kings, so the second probability is 4/51.", "Ask separately how the total and number of kings changed."],
    ],
  },
  {
    skill: "population_selection_without_replacement",
    practice: [
      ["A class has 4 Year 9 and 6 Year 10 students. Two different students are selected. What is P(both are Year 9)?", "2/15", ["4/25", "1/5", "4/15"], "Students are not replaced: 4/10 × 3/9 = 12/90 = 2/15.", "Reduce the target group and total after selection one."],
      ["A committee has 5 teachers and 3 students. Two different people are selected. What is P(student then teacher)?", "15/56", ["15/64", "5/14", "3/8"], "P(student then teacher) = 3/8 × 5/7 = 15/56.", "After selecting a student, 7 people remain and all 5 teachers remain."],
    ],
    test: [
      ["A team has 7 juniors and 5 seniors. Two captains are selected without replacement. What is P(both are seniors)?", "5/33", ["25/144", "10/33", "5/12"], "P(two seniors) = 5/12 × 4/11 = 20/132 = 5/33.", "Update 5 seniors out of 12 to 4 seniors out of 11."],
      ["From 6 musicians and 4 actors, two different people are chosen. What is P(actor first, then musician)?", "4/15", ["2/5", "3/10", "8/15"], "P(actor then musician) = 4/10 × 6/9 = 24/90 = 4/15.", "Selecting an actor leaves all 6 musicians among 9 people."],
    ],
  },
];

const items = [];
for (const bank of ["practice", "test"]) {
  let index = 0;
  for (const group of groups) {
    for (const [question, correct, distractors, summary, hint] of group[bank]) {
      const correctIndex = index % 4;
      const answers = [...distractors];
      answers.splice(correctIndex, 0, correct);
      items.push({
        id: `ac9m9p01-${bank === "practice" ? "p" : "t"}-${String(index + 1).padStart(3, "0")}`,
        curriculum_code: "AC9M9P01",
        year_level: "Year 9",
        subject: "math",
        bank,
        skill: group.skill,
        question,
        audio_prompt: question,
        visual: { type: "none", alt_text: "" },
        answers: answers.map((text, answerIndex) => ({ text, is_correct: answerIndex === correctIndex })),
        correct_index: correctIndex,
        explanation: { summary, hint },
      });
      index += 1;
    }
  }
}

const output = path.join(ROOT, "assets/assessment-banks/year9/math/ac9m9p01.json");
fs.writeFileSync(output, `${JSON.stringify(items, null, 2)}\n`);
console.log(`Built ${items.length} AC9M9P01 items: 8 Practice and 8 Test.`);