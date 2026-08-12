(() => {
  "use strict";

  const card = (items) => `<div class="math-card-row">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
  const board = (html) => `<div class="math-model-board">${html}</div>`;
  const q = (type, question, extra = {}) => ({ type, question, ...extra });

  const baseTen = (hundreds, tens, ones) => `
    <div class="y2-base-ten" aria-label="${hundreds} hundreds, ${tens} tens and ${ones} ones">
      <div class="y2-block y2-hundreds"><strong>${hundreds}</strong><span>hundreds</span></div>
      <div class="y2-block y2-tens"><strong>${tens}</strong><span>tens</span></div>
      <div class="y2-block y2-ones"><strong>${ones}</strong><span>ones</span></div>
    </div>`;

  const placeTable = (hundreds, tens, ones) => `
    <div class="y2-place-table" role="img" aria-label="Place value table ${hundreds} hundreds ${tens} tens ${ones} ones">
      <span>Hundreds</span><span>Tens</span><span>Ones</span>
      <strong>${hundreds}</strong><strong>${tens}</strong><strong>${ones}</strong>
    </div>`;

  const numberLine = (number, percent) => `
    <div class="y2-number-line" role="img" aria-label="${number} on a number line from 0 to 1000">
      <div class="y2-number-line__rail"><span style="left:${percent}%"></span></div>
      <div class="y2-number-line__labels"><b>0</b><b>250</b><b>500</b><b>750</b><b>1000</b></div>
      <p>${number} is ${percent < 50 ? "before" : "after"} 500 on the 0–1000 number line.</p>
    </div>`;

  const chartPuzzle = () => `
    <div class="y2-chart-puzzle" role="img" aria-label="Hundreds chart puzzle pieces around 420">
      <span>418</span><span>419</span><span>420</span>
      <span>428</span><span>429</span><span>430</span>
      <span>438</span><span>439</span><span>440</span>
    </div>`;

  const recycleVisual = () => `
    <div class="y2-recycle-visual" role="img" aria-label="Bottle tops grouped into hundreds tens and ones">
      <span>100</span><span>100</span><span>100</span><span>10</span><span>10</span><span>7</span>
    </div>`;

  const UNITS = {
    AC9M2N01: {
      slug: "ac9m2n01-recognise-represent-and-order-numbers-to-at-least-1000-using",
      title: "Numbers to 1000",
      subtitle: "Recognise, represent, read and order numbers using materials, numerals and number lines",
      desc: "recognise, represent and order numbers to at least 1000 using physical and virtual materials, numerals and number lines",
      routine: "Build → Read → Write → Locate → Order → Explain",
      learn: "Three-digit numbers can be shown with hundreds, tens and ones. Students compare numbers by checking hundreds first, then tens, then ones, and they use number lines to explain where a number belongs.",
      model_title: "Show 486 in more than one way",
      model_html: board(`${baseTen(4,8,6)}${placeTable(4,8,6)}${card(["486", "4 hundreds", "8 tens", "6 ones", "400 + 80 + 6"])}<p>Say the number, build it, write it, then explain each digit by its place.</p>`),
      apply_title: "Use place value and number lines to order numbers",
      apply_html: board(`${numberLine(486, 49)}${card(["425", "452", "542"])}<p>Compare hundreds first. If the hundreds are the same, compare tens. If the tens are the same, compare ones.</p>`),
      hero_visual: board(`${baseTen(3,7,2)}${numberLine(372, 37)}`),
      quick_visuals: [
        { label: "Build", html: baseTen(4,8,6) },
        { label: "Locate", html: numberLine(486, 49) },
        { label: "Chart", html: chartPuzzle() }
      ],
      activities: [
        { title: "Build the number", text: "Use base-ten blocks, bundling sticks or a virtual manipulative to build 372. Then write it as 300 + 70 + 2.", visual_html: `${baseTen(3,7,2)}${card(["372", "300 + 70 + 2"])}` },
        { title: "Number-line landing", text: "Place 240, 520 and 890 on a 0–1000 number line. Explain which number is closest to 500.", visual_html: `${numberLine(520, 52)}${card(["240", "520", "890"])}` },
        { title: "Hundreds chart puzzle", text: "Use the pattern of rows and columns to put missing chart pieces back in order.", visual_html: chartPuzzle() }
      ],
      mistakes: [
        ["Reading zeros incorrectly", "In 304, the 0 means there are no tens. The number is three hundred and four, not thirty-four."],
        ["Swapping similar numbers", "Read 808, 880, 818 and 881 slowly. Compare hundreds, then tens, then ones."],
        ["Guessing on number lines", "Use the end points and half-way point before placing the number."],
        ["Only counting by ones", "For large collections, group materials into hundreds, tens and ones first."]
      ],
      quick: [
        "Show 486 with hundreds, tens and ones.",
        "Write 372 in expanded form.",
        "Which is greater: 808 or 880? Explain using place value.",
        "Where would 675 sit on a number line from 0 to 1000?",
        "Order 425, 452, 245 and 542 from smallest to largest."
      ],
      mastery: ["Build three-digit numbers", "Read numerals", "Use hundreds, tens and ones", "Locate on 0–1000 number lines", "Order and compare", "Explain using place value"],
      worksheet: [
        q("single", "Which representation shows 486?", { answers: ["4 hundreds, 8 tens and 6 ones", "8 hundreds, 4 tens and 6 ones", "4 hundreds, 6 tens and 8 ones", "486 hundreds"] }),
        q("fill-blank", "Complete the place-value sentence.", { template: "352 = {{blank}} hundreds, {{blank}} tens and {{blank}} ones" }),
        q("single", "Which number is greatest?", { answers: ["808", "880", "818", "881"] }),
        q("text", "Draw or describe where 675 belongs on a number line from 0 to 1000. Explain how you know."),
        q("match", "Match each number to its representation.", { matchLeft: ["207", "720", "702"], matchRight: ["7 hundreds, 2 tens, 0 ones", "2 hundreds, 0 tens, 7 ones", "7 hundreds, 0 tens, 2 ones"] }),
        q("fill-blank", "Complete the count on the number line.", { template: "300, 400, {{blank}}, 600, 700" }),
        q("text", "Order these numbers from smallest to largest: 425, 452, 245, 542."),
        q("text", "A student says 304 is the same as 34 because zero does not count. Explain the mistake."),
        q("text", "A class collected 237 bottle tops. Describe a way to group them into hundreds, tens and ones, then write two clues that would help someone place 237 on a 0–1000 number line.", { enrichment: true }),
        q("text", "Create two different clue sentences for the number 818 using place value and ordering. Your clues should help another student identify the number without seeing it.", { enrichment: true })
      ]
    }
  };

  window.SkillrYear2MathsOrder = ["AC9M2N01"];
  window.SkillrYear2MathsData = Object.assign(window.SkillrYear2MathsData || {}, UNITS);
  window.SkillrYear2MathsWorksheetData = Object.assign(window.SkillrYear2MathsWorksheetData || {}, Object.fromEntries(Object.entries(UNITS).map(([code, unit]) => [code, { title: unit.title, questions: unit.worksheet, yearLabel: "Year 2 Maths" }])));
})();