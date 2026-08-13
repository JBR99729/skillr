(() => {
  "use strict";
  const unit = window.SkillrFoundationMathsData?.AC9MFN01;
  if (!unit) return;
  unit.elaborations = [
  {
    "label": "E1",
    "title": "Collect and match a requested quantity",
    "idea": "A spoken number, a collection and a numeral can represent the same amount.",
    "visual": "<svg viewBox=\"0 0 560 190\" role=\"img\" aria-label=\"Teacher asks for nine paintbrushes, nine paintbrushes are collected and matched to the numeral nine\">\n<defs><g id=\"brush-e1\"><line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"30\" stroke=\"#8b5a2b\" stroke-width=\"7\" stroke-linecap=\"round\"/><path d=\"M-8 0 L0-17 L8 0 Z\" fill=\"#2457d6\" stroke=\"#102a52\" stroke-width=\"1.5\"/></g><marker id=\"e1-arrow\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8Z\" fill=\"#173968\"/></marker></defs>\n<rect x=\"12\" y=\"24\" width=\"145\" height=\"66\" rx=\"14\" fill=\"#eef5ff\" stroke=\"#2457d6\" stroke-width=\"2\"/><path d=\"M150 72l26 15-20-29\" fill=\"#eef5ff\" stroke=\"#2457d6\" stroke-width=\"2\"/>\n<text x=\"84\" y=\"51\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" font-weight=\"700\" fill=\"#173968\"><tspan x=\"84\">Please collect</tspan><tspan x=\"84\" dy=\"23\">9 paintbrushes</tspan></text>\n<g transform=\"translate(222 48)\"><use href=\"#brush-e1\" x=\"0\"/><use href=\"#brush-e1\" x=\"38\"/><use href=\"#brush-e1\" x=\"76\"/><use href=\"#brush-e1\" x=\"114\"/><use href=\"#brush-e1\" x=\"152\"/><use href=\"#brush-e1\" x=\"19\" y=\"72\"/><use href=\"#brush-e1\" x=\"57\" y=\"72\"/><use href=\"#brush-e1\" x=\"95\" y=\"72\"/><use href=\"#brush-e1\" x=\"133\" y=\"72\"/></g>\n<path d=\"M405 94h55\" stroke=\"#173968\" stroke-width=\"4\" marker-end=\"url(#e1-arrow)\"/><rect x=\"476\" y=\"48\" width=\"65\" height=\"92\" rx=\"10\" fill=\"#fff8e7\" stroke=\"#9a6700\" stroke-width=\"3\"/><text x=\"508.5\" y=\"114\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"58\" font-weight=\"900\" fill=\"#173968\">9</text>\n</svg>",
    "steps": [
      "Say “nine”, move and count each brush once, state “nine altogether”, then choose the numeral 9."
    ],
    "worked": "A spoken number, a collection and a numeral can represent the same amount. Say “nine”, move and count each brush once, state “nine altogether”, then choose the numeral 9.",
    "teach": "Say “nine”, move and count each brush once, state “nine altogether”, then choose the numeral 9.",
    "say": "Please collect 9 objects. How will you make sure the collection and numeral match?",
    "check": "The learner collects exactly 9 objects, counts each once, states 9 altogether and matches the numeral 9.",
    "mistake": "The learner double-counts an object or chooses a numeral before checking the collection.",
    "fix": "Move each counted object into a finished group, state the total, then match the numeral."
  },
  {
    "label": "E2",
    "title": "Order numbers; find one less and one more",
    "idea": "Moving one position backward removes one; moving one position forward adds one.",
    "visual": "<svg viewBox=\"0 0 560 190\" role=\"img\" aria-label=\"Thirteen is one less than fourteen and fifteen is one more than fourteen\">\n<defs><marker id=\"e2-left\" markerWidth=\"8\" markerHeight=\"8\" refX=\"1\" refY=\"4\" orient=\"auto\"><path d=\"M8 0L0 4L8 8Z\" fill=\"#b42318\"/></marker><marker id=\"e2-right\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8Z\" fill=\"#13795b\"/></marker></defs>\n<line x1=\"75\" y1=\"108\" x2=\"485\" y2=\"108\" stroke=\"#173968\" stroke-width=\"5\"/>\n<g font-family=\"Arial\" text-anchor=\"middle\"><circle cx=\"135\" cy=\"108\" r=\"35\" fill=\"#fff1f0\" stroke=\"#b42318\" stroke-width=\"3\"/><text x=\"135\" y=\"119\" font-size=\"32\" font-weight=\"900\">13</text><circle cx=\"280\" cy=\"108\" r=\"42\" fill=\"#fff8e7\" stroke=\"#9a6700\" stroke-width=\"4\"/><text x=\"280\" y=\"121\" font-size=\"38\" font-weight=\"900\">14</text><circle cx=\"425\" cy=\"108\" r=\"35\" fill=\"#edf8f0\" stroke=\"#13795b\" stroke-width=\"3\"/><text x=\"425\" y=\"119\" font-size=\"32\" font-weight=\"900\">15</text>\n<text x=\"135\" y=\"35\" font-size=\"18\" font-weight=\"700\" fill=\"#b42318\">one less</text><text x=\"280\" y=\"35\" font-size=\"18\" font-weight=\"700\" fill=\"#7c4a03\">start</text><text x=\"425\" y=\"35\" font-size=\"18\" font-weight=\"700\" fill=\"#13795b\">one more</text></g>\n<path d=\"M258 62Q210 40 155 68\" fill=\"none\" stroke=\"#b42318\" stroke-width=\"5\" marker-end=\"url(#e2-left)\"/><path d=\"M302 62Q350 40 405 68\" fill=\"none\" stroke=\"#13795b\" stroke-width=\"5\" marker-end=\"url(#e2-right)\"/>\n</svg>",
    "steps": [
      "Build 14. Remove one and move left to 13; add one and move right to 15. Then use the full 0–20 line above."
    ],
    "worked": "Moving one position backward removes one; moving one position forward adds one. Build 14. Remove one and move left to 13; add one and move right to 15. Then use the full 0–20 line above.",
    "teach": "Build 14. Remove one and move left to 13; add one and move right to 15. Then use the full 0–20 line above.",
    "say": "Start at 14. Which number is one less, and which is one more? Show each move.",
    "check": "The learner identifies 13 as one less and 15 as one more, with the direction and quantity change explained.",
    "mistake": "The learner reverses one less and one more or moves on the line without changing the collection.",
    "fix": "Build 14, physically remove or add one, then make the matching move on the number line."
  },
  {
    "label": "E3",
    "title": "Use first, second, before, after and between",
    "idea": "Ordinal words describe position from a clearly marked starting end.",
    "visual": "<svg viewBox=\"0 0 560 220\" role=\"img\" aria-label=\"Red object is first, blue is second, green is third; blue is after red, before green and between them\">\n<defs><marker id=\"e3-arrow\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8Z\" fill=\"#173968\"/></marker></defs>\n<text x=\"20\" y=\"33\" font-family=\"Arial\" font-size=\"17\" font-weight=\"800\" fill=\"#173968\">START</text><path d=\"M82 28h55\" stroke=\"#173968\" stroke-width=\"4\" marker-end=\"url(#e3-arrow)\"/>\n<g font-family=\"Arial\" text-anchor=\"middle\"><circle cx=\"155\" cy=\"87\" r=\"38\" fill=\"#d92d20\" stroke=\"#7a1712\" stroke-width=\"3\"/><circle cx=\"280\" cy=\"87\" r=\"38\" fill=\"#2457d6\" stroke=\"#102a52\" stroke-width=\"3\"/><circle cx=\"405\" cy=\"87\" r=\"38\" fill=\"#36a269\" stroke=\"#145c39\" stroke-width=\"3\"/>\n<text x=\"155\" y=\"151\" font-size=\"17\" font-weight=\"900\" fill=\"#173968\">1st — red</text><text x=\"280\" y=\"151\" font-size=\"17\" font-weight=\"900\" fill=\"#173968\">2nd — blue</text><text x=\"405\" y=\"151\" font-size=\"17\" font-weight=\"900\" fill=\"#173968\">3rd — green</text>\n<rect x=\"68\" y=\"172\" width=\"424\" height=\"34\" rx=\"17\" fill=\"#eef5ff\"/><text x=\"280\" y=\"195\" font-size=\"16\" font-weight=\"700\" fill=\"#173968\">blue is after red • before green • between both</text></g>\n</svg>",
    "steps": [
      "Mark the starting end first. Ask “Which is second?”, “What is before green?” and “Which object is between red and green?”"
    ],
    "worked": "Ordinal words describe position from a clearly marked starting end. Mark the starting end first. Ask “Which is second?”, “What is before green?” and “Which object is between red and green?”",
    "teach": "Mark the starting end first. Ask “Which is second?”, “What is before green?” and “Which object is between red and green?”",
    "say": "Where is the starting end? Which object is second, before green and between red and green?",
    "check": "The learner marks the starting end and uses first, second, before, after and between consistently.",
    "mistake": "The learner changes the starting end or treats an ordinal word as a quantity.",
    "fix": "Mark the starting end with an arrow and recount positions from that same end."
  },
  {
    "label": "E4",
    "title": "Read numerals in familiar places",
    "idea": "A numeral may show an amount, an order or a label; it keeps the same number name.",
    "visual": "<svg viewBox=\"0 0 560 220\" role=\"img\" aria-label=\"Numeral seven on a door, twelve on a bus and twenty as a page number\">\n<g font-family=\"Arial\" text-anchor=\"middle\">\n<rect x=\"28\" y=\"28\" width=\"115\" height=\"142\" rx=\"7\" fill=\"#c98b54\" stroke=\"#6d4524\" stroke-width=\"4\"/><circle cx=\"125\" cy=\"103\" r=\"6\" fill=\"#f7d154\"/><rect x=\"59\" y=\"48\" width=\"53\" height=\"60\" rx=\"7\" fill=\"#fff\" stroke=\"#173968\" stroke-width=\"2\"/><text x=\"85.5\" y=\"93\" font-size=\"42\" font-weight=\"900\" fill=\"#173968\">7</text><text x=\"85.5\" y=\"202\" font-size=\"17\" font-weight=\"800\" fill=\"#173968\">door 7</text>\n<rect x=\"190\" y=\"58\" width=\"180\" height=\"105\" rx=\"20\" fill=\"#f4c542\" stroke=\"#7c4a03\" stroke-width=\"4\"/><rect x=\"211\" y=\"76\" width=\"62\" height=\"40\" rx=\"4\" fill=\"#d9f0ff\"/><rect x=\"283\" y=\"76\" width=\"62\" height=\"40\" rx=\"4\" fill=\"#d9f0ff\"/><circle cx=\"230\" cy=\"166\" r=\"18\" fill=\"#27364a\"/><circle cx=\"330\" cy=\"166\" r=\"18\" fill=\"#27364a\"/><rect x=\"246\" y=\"123\" width=\"68\" height=\"31\" rx=\"7\" fill=\"#fff\"/><text x=\"280\" y=\"146\" font-size=\"27\" font-weight=\"900\" fill=\"#173968\">12</text><text x=\"280\" y=\"202\" font-size=\"17\" font-weight=\"800\" fill=\"#173968\">bus 12</text>\n<path d=\"M412 38q48-18 96 0v133q-48-18-96 0z\" fill=\"#fff\" stroke=\"#173968\" stroke-width=\"4\"/><line x1=\"427\" y1=\"67\" x2=\"493\" y2=\"67\" stroke=\"#9db1ca\" stroke-width=\"3\"/><line x1=\"427\" y1=\"87\" x2=\"493\" y2=\"87\" stroke=\"#9db1ca\" stroke-width=\"3\"/><text x=\"460\" y=\"148\" font-size=\"35\" font-weight=\"900\" fill=\"#173968\">20</text><text x=\"460\" y=\"202\" font-size=\"17\" font-weight=\"800\" fill=\"#173968\">page 20</text></g>\n</svg>",
    "steps": [
      "Read each numeral aloud, then ask what it is doing there. These examples are labels or positions—not collections to count."
    ],
    "worked": "A numeral may show an amount, an order or a label; it keeps the same number name. Read each numeral aloud, then ask what it is doing there. These examples are labels or positions—not collections to count.",
    "teach": "Read each numeral aloud, then ask what it is doing there. These examples are labels or positions—not collections to count.",
    "say": "Read each numeral. Is it showing an amount, an order or a label in this place?",
    "check": "The learner reads the numeral correctly and explains its familiar use as an amount, position or label.",
    "mistake": "The learner assumes every numeral names a collection that must be counted.",
    "fix": "Compare a counted collection with a door, bus or page label and name what the numeral does in each context."
  },
  {
    "label": "E5",
    "title": "Connect a quantity, number name and numeral through a story",
    "idea": "The objects, spoken word and written numeral look different but represent the same number.",
    "visual": "<svg viewBox=\"0 0 900 230\" role=\"img\" aria-label=\"Three apples and two more apples make five, connected to the word five and numeral five\">\n<defs><g id=\"apple-e5\"><circle cx=\"0\" cy=\"0\" r=\"25\" fill=\"#d92d20\" stroke=\"#7a1712\" stroke-width=\"3\"/><path d=\"M0-25q2-16 10-22\" fill=\"none\" stroke=\"#6d4524\" stroke-width=\"5\" stroke-linecap=\"round\"/><ellipse cx=\"16\" cy=\"-38\" rx=\"13\" ry=\"7\" transform=\"rotate(-25 16 -38)\" fill=\"#36a269\" stroke=\"#145c39\" stroke-width=\"2\"/></g><marker id=\"e5-arrow\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8Z\" fill=\"#173968\"/></marker></defs>\n<g transform=\"translate(70 105)\"><use href=\"#apple-e5\" x=\"0\"/><use href=\"#apple-e5\" x=\"58\"/><use href=\"#apple-e5\" x=\"116\"/></g><text x=\"128\" y=\"180\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"20\" font-weight=\"800\" fill=\"#173968\">3 apples</text>\n<text x=\"228\" y=\"115\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"44\" font-weight=\"900\" fill=\"#173968\">+</text>\n<g transform=\"translate(285 105)\"><use href=\"#apple-e5\" x=\"0\"/><use href=\"#apple-e5\" x=\"58\"/></g><text x=\"314\" y=\"180\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"20\" font-weight=\"800\" fill=\"#173968\">2 more</text>\n<path d=\"M385 105h77\" stroke=\"#173968\" stroke-width=\"5\" marker-end=\"url(#e5-arrow)\"/>\n<g transform=\"translate(510 78) scale(.72)\"><use href=\"#apple-e5\" x=\"0\"/><use href=\"#apple-e5\" x=\"58\"/><use href=\"#apple-e5\" x=\"116\"/><use href=\"#apple-e5\" x=\"29\" y=\"72\"/><use href=\"#apple-e5\" x=\"87\" y=\"72\"/></g>\n<path d=\"M655 105h55\" stroke=\"#173968\" stroke-width=\"4\" marker-end=\"url(#e5-arrow)\"/>\n<g font-family=\"Arial\" text-anchor=\"middle\"><text x=\"757\" y=\"91\" font-size=\"31\" font-weight=\"800\" fill=\"#2457d6\">“five”</text><text x=\"757\" y=\"137\" font-size=\"52\" font-weight=\"900\" fill=\"#173968\">5</text><text x=\"757\" y=\"181\" font-size=\"18\" font-weight=\"700\" fill=\"#13795b\">same amount</text></g>\n</svg>",
    "steps": [
      "Act out “3 apples and 2 more”. Count 5 altogether, say “five” and select 5. Rearrange the five apples and confirm the quantity stays five."
    ],
    "worked": "The objects, spoken word and written numeral look different but represent the same number. Act out “3 apples and 2 more”. Count 5 altogether, say “five” and select 5. Rearrange the five apples and confirm the quantity stays five.",
    "teach": "Act out “3 apples and 2 more”. Count 5 altogether, say “five” and select 5. Rearrange the five apples and confirm the quantity stays five.",
    "say": "Act out 3 apples and 2 more. How do the objects, spoken number name and numeral show the same amount?",
    "check": "The learner connects 5 objects, the spoken word five and the numeral 5, then confirms 5 after rearranging.",
    "mistake": "The learner treats the collection, number name and numeral as unrelated answers.",
    "fix": "Point between the same five objects, the spoken name and numeral, then rearrange without adding or removing."
  }
];
})();
