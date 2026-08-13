"use strict";
(() => {
  const originalGenerator = window.SkillrDailyMath;
  const extensionRoot = window.SkillrDailyQuestionExtensions?.F?.math || {};
  if (!originalGenerator?.generate) return;

  const TOPICS = [
    "numbers-to-20",
    "addition-subtraction",
    "equal-groups-sharing",
    "repeating-patterns",
    "measurement-shapes-data",
    "maths-vocabulary"
  ];
  const SPRITE_PATH = "/quiz/assets/daily-drills/foundation-maths-visuals-v2.svg";
  const NAMES = [
    "Mia", "Noah", "Ava", "Leo", "Zara", "Eli", "Sofia", "Arun", "Grace", "Ben",
    "Lina", "Kai", "Ruby", "Omar", "Ivy", "Max", "Nina", "Hugo", "Amira", "Finn",
    "Chloe", "Ravi", "Ella", "Luca", "Maya", "Sam", "Zoe", "Theo", "Isla", "Jai"
  ];
  const OBJECTS = [
    ["buttons", "●"], ["blocks", "■"], ["stars", "★"], ["shells", "◉"],
    ["beads", "◆"], ["leaves", "♢"], ["stickers", "⬟"], ["counters", "●"]
  ];
  const SHAPES = [
    { glyph: "●", label: "Circle" },
    { glyph: "■", label: "Square" },
    { glyph: "▲", label: "Triangle" },
    { glyph: "◆", label: "Diamond" },
    { glyph: "★", label: "Star" },
    { glyph: "⬟", label: "Hexagon" }
  ];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const pad = (value) => String(value).padStart(3, "0");
  const rotate = (items, index) => items[((index % items.length) + items.length) % items.length];
  const symbols = (count, glyph = "●") => Array.from({ length: count }, () => glyph).join(" ");
  const groups = (count, each, glyph = "●") =>
    Array.from({ length: count }, () => `[ ${symbols(each, glyph)} ]`).join("   ");
  const snake = (value) => String(value || "maths_skill")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

  function hash(value) {
    let total = 2166136261;
    for (const character of String(value)) {
      total ^= character.charCodeAt(0);
      total = Math.imul(total, 16777619);
    }
    return total >>> 0;
  }

  function answerLabel(text) {
    const found = SHAPES.find((shape) => shape.glyph === String(text));
    return found?.label || String(text);
  }

  function orderedChoices(correct, distractors, seed) {
    const all = [String(correct), ...distractors.map(String)]
      .filter((value, index, list) => value && list.indexOf(value) === index);
    const target = seed % all.length;
    const wrong = all.filter((value) => value !== String(correct));
    const values = [...wrong];
    values.splice(target, 0, String(correct));
    return {
      answers: values.map((text) => ({
        text,
        label: answerLabel(text),
        is_correct: text === String(correct)
      })),
      correct_index: values.indexOf(String(correct))
    };
  }

  function orderedMultiple(options, correctValues, seed) {
    const values = [...new Set(options.map(String))];
    const shift = seed % values.length;
    const shuffled = values.slice(shift).concat(values.slice(0, shift));
    const correct = new Set(correctValues.map(String));
    return {
      answers: shuffled.map((text) => ({
        text,
        label: answerLabel(text),
        is_correct: correct.has(text)
      })),
      correct_indexes: shuffled
        .map((text, index) => correct.has(text) ? index : -1)
        .filter((index) => index >= 0),
      correct_index: null
    };
  }

  function describeVisual(text) {
    const replacements = [
      [/●/g, "circle"], [/○/g, "empty circle"], [/■/g, "square"], [/□/g, "empty square"],
      [/▲/g, "triangle"], [/◆/g, "diamond"], [/★/g, "star"], [/⬟/g, "hexagon"],
      [/×/g, "crossed out"], [/→/g, "then"], [/\|/g, ";"]
    ];
    let result = String(text || "");
    replacements.forEach(([pattern, replacement]) => { result = result.replace(pattern, ` ${replacement} `); });
    return result.replace(/\s+/g, " ").replace(/\s*\n\s*/g, "; ").trim();
  }

  function makeVisual(id, type, fallbackText, altText) {
    if (!fallbackText) return null;
    return {
      type,
      asset_path: SPRITE_PATH,
      symbol_id: `visual-${snake(id)}`,
      view_box: "0 0 720 180",
      alt_text: altText || describeVisual(fallbackText),
      fallback_text: String(fallbackText)
    };
  }

  function baseItem({ code, topic, set, position, skill, question, explanation, hint, visual, type }) {
    const serial = set * 8 + position + 1;
    const tempId = `${code}-${topic}-${pad(serial)}`;
    return {
      id: tempId,
      curriculumCode: code,
      bank: "daily-drill",
      topic,
      skill: snake(skill),
      set,
      difficulty: position < 2 ? "easy" : position < 5 ? "core" : position < 7 ? "application" : "challenge",
      type,
      question,
      visual: visual ? makeVisual(tempId, visual.type, visual.text, visual.alt) : null,
      answers: [],
      correct_index: null,
      explanation: {
        summary: explanation,
        hint
      },
      audio_prompt: question,
      printable: true,
      source: "production-core"
    };
  }

  function single(config, correct, distractors) {
    const item = baseItem({ ...config, type: "single" });
    Object.assign(item, orderedChoices(correct, distractors, config.set * 8 + config.position));
    return item;
  }

  function trueFalse(config, correct, explanation, hint) {
    return single({ ...config, explanation, hint }, correct ? "True" : "False", [correct ? "False" : "True"]);
  }

  function multiple(config, options, correctValues) {
    const item = baseItem({ ...config, type: "multiple" });
    Object.assign(item, orderedMultiple(options, correctValues, config.set * 8 + config.position));
    item.instruction = "Choose all the answers that work.";
    return item;
  }

  function numberItem(config, correct) {
    const item = baseItem({ ...config, type: "number" });
    item.correct_answer = Number(correct);
    item.placeholder = "Type the number";
    item.tolerance = 0;
    return item;
  }

  function textItem(config, acceptedAnswers) {
    const item = baseItem({ ...config, type: "text" });
    item.correct_answer = String(acceptedAnswers[0]);
    item.accepted_answers = acceptedAnswers.map(String);
    return item;
  }

  function fillItem(config, template, acceptedAnswers) {
    const item = baseItem({ ...config, type: "fill-blank" });
    item.template = template;
    item.correct_answer = String(acceptedAnswers[0]);
    item.accepted_answers = acceptedAnswers.map(String);
    return item;
  }

  function orderItem(config, items, correctOrder) {
    const item = baseItem({ ...config, type: "order" });
    item.items = items.map(String);
    item.correct_answer = correctOrder.map(String);
    item.instruction = "Put the cards in order.";
    return item;
  }

  function numbersSet(set) {
    const name = NAMES[set];
    const object = rotate(OBJECTS, set);
    const after = 1 + ((set * 7) % 19);
    const quick = 1 + (set % 5);
    const a = 5 + ((set * 3) % 13);
    const b = set % 5 === 0 ? a : Math.min(20, a + (set % 2 ? 2 : -2));
    const count = 6 + ((set * 5) % 15);
    const start = (set * 4) % 17;
    const middle = 1 + ((set * 5) % 18);
    const threshold = 5 + (set % 11);
    const greaterOptions = [threshold - 2, threshold, threshold + 1, threshold + 3].map(String);
    const orderValues = [...new Set([2 + (set * 3) % 17, 1 + (set * 7) % 19, 3 + (set * 5) % 16])];
    while (orderValues.length < 3) orderValues.push(orderValues.at(-1) + 1);
    const ordered = [...orderValues].sort((x, y) => x - y).map(String);
    const groupAnswer = a === b ? "They have the same number" : a > b ? "Group A" : "Group B";

    return [
      single({ code: "AC9MFN01", topic: "numbers-to-20", set, position: 0, skill: "number after", question: `${name} has the number ${after}. What number comes next?`, explanation: `${after + 1} comes straight after ${after}.`, hint: `Start at ${after} and count on one.`, visual: { type: "svg_number_line", text: `${Math.max(0, after - 1)}   ${after}   ?`, alt: `Number line showing ${Math.max(0, after - 1)}, ${after}, then a missing number.` } }, after + 1, [Math.max(0, after - 1), Math.min(20, after + 2)]),
      single({ code: "AC9MFN02", topic: "numbers-to-20", set, position: 1, skill: "subitise to 5", question: `${name} looks quickly. How many dots are there?`, explanation: `There are ${quick} dots.`, hint: "Try to see the small group without counting every dot.", visual: { type: "svg_collection", text: quick > 3 ? `${symbols(3)}\n${symbols(quick - 3)}` : symbols(quick), alt: `A small group of ${quick} dots.` } }, quick, [Math.max(0, quick - 1), Math.min(5, quick + 1)]),
      single({ code: "AC9MFN03", topic: "numbers-to-20", set, position: 2, skill: "compare collections", question: `${name} compares two groups. Which group has more?`, explanation: a === b ? `Both groups have ${a}, so they are equal.` : `${a === Math.max(a, b) ? "Group A" : "Group B"} has more objects.`, hint: "Pair one object from A with one object from B. Look for leftovers.", visual: { type: "svg_comparison", text: `Group A: ${symbols(a, object[1])}\nGroup B: ${symbols(b, rotate(OBJECTS, set + 1)[1])}`, alt: `Group A has ${a} ${object[0]}. Group B has ${b} objects.` } }, groupAnswer, [groupAnswer === "Group A" ? "Group B" : "Group A", "They have the same number"]),
      numberItem({ code: "AC9MFN03", topic: "numbers-to-20", set, position: 3, skill: "count a collection", question: `${name} counts the ${object[0]}. How many are there?`, explanation: `Counting each ${object[0].slice(0, -1) || "object"} once gives ${count}.`, hint: "Touch each object once as you count.", visual: { type: "svg_collection", text: count > 10 ? `${symbols(10, object[1])}\n${symbols(count - 10, object[1])}` : symbols(count, object[1]), alt: `A collection of ${count} ${object[0]}.` } }, count),
      fillItem({ code: "AC9MFN01", topic: "numbers-to-20", set, position: 4, skill: "missing number", question: `${name} is counting. Which number is missing?`, explanation: `The numbers go up by one, so the missing number is ${start + 2}.`, hint: `Count on from ${start + 1}.`, visual: { type: "svg_number_sequence", text: `${start}   ${start + 1}   ?   ${start + 3}`, alt: `Number cards ${start}, ${start + 1}, missing number, ${start + 3}.` } }, `${start}, ${start + 1}, {{blank}}, ${start + 3}`, [String(start + 2)]),
      single({ code: "AC9MFN01", topic: "numbers-to-20", set, position: 5, skill: "number between", question: `${name} points to ${middle} and ${middle + 2}. Which number sits between them?`, explanation: `${middle + 1} is one more than ${middle} and one less than ${middle + 2}.`, hint: `Count: ${middle}, then one more, then ${middle + 2}.`, visual: { type: "svg_number_line", text: `${middle}   ?   ${middle + 2}`, alt: `Number line with ${middle}, a missing number, then ${middle + 2}.` } }, middle + 1, [middle, Math.min(20, middle + 2)]),
      multiple({ code: "AC9MFN03", topic: "numbers-to-20", set, position: 6, skill: "greater than", question: `${name} chooses numbers greater than ${threshold}. Which numbers work?`, explanation: `${threshold + 1} and ${threshold + 3} come after ${threshold}.`, hint: `Find ${threshold} on the counting line. Choose numbers to its right.`, visual: { type: "svg_number_line", text: `${Math.max(0, threshold - 2)} ─ ${threshold} ─ ${threshold + 1} ─ ${threshold + 3}`, alt: `Number line showing ${threshold} with numbers before and after it.` } }, greaterOptions, [String(threshold + 1), String(threshold + 3)]),
      orderItem({ code: "AC9MFN01", topic: "numbers-to-20", set, position: 7, skill: "order numbers", question: `${name} wants the numbers from smallest to biggest. Put them in order.`, explanation: `${ordered.join(", ")} is the counting order.`, hint: "Find the number that comes first when you count.", visual: { type: "svg_number_cards", text: orderValues.join("   "), alt: `Three number cards: ${orderValues.join(", ")}.` } }, orderValues.map(String), ordered)
    ];
  }

  function additionSet(set) {
    const name = NAMES[set];
    const object = rotate(OBJECTS, set + 2);
    const whole = 5 + (set % 6);
    const part = 1 + ((set * 3) % (whole - 1));
    const other = whole - part;
    const start = 3 + (set % 6);
    const join = 1 + ((set * 2) % 4);
    const total = start + join;
    const takeStart = 6 + (set % 5);
    const take = 1 + (set % 4);
    const left = takeStart - take;

    return [
      numberItem({ code: "AC9MFN04", topic: "addition-subtraction", set, position: 0, skill: "find a hidden part", question: `${name} has ${whole} counters. ${part} are showing. How many are hidden?`, explanation: `${part} showing and ${other} hidden make ${whole}.`, hint: `Start at ${part} and count on until you reach ${whole}.`, visual: { type: "svg_part_whole", text: `Showing: ${symbols(part)}   Hidden: [ ? ]\nWhole: ${whole}`, alt: `${whole} counters altogether, with ${part} showing and the rest hidden.` } }, other),
      single({ code: "AC9MFN04", topic: "addition-subtraction", set, position: 1, skill: "combine parts", question: `${name} needs two parts that make ${whole}. Which pair works?`, explanation: `${part} and ${other} join to make ${whole}.`, hint: `Count on from ${part} until you reach ${whole}.`, visual: { type: "svg_part_whole", text: `${symbols(part, "●")}   +   ${symbols(other, "■")}   =   ${whole}`, alt: `${part} circles and ${other} squares combine to make ${whole}.` } }, `${part} and ${other}`, [`${part} and ${other + 1}`, `${Math.max(0, part - 1)} and ${other}`]),
      numberItem({ code: "AC9MFN05", topic: "addition-subtraction", set, position: 2, skill: "join groups", question: `${name} has ${start} ${object[0]}. ${join} more arrive. How many now?`, explanation: `The groups join: ${start} and ${join} make ${total}.`, hint: `Start at ${start} and count on ${join}.`, visual: { type: "svg_join_story", text: `First: ${symbols(start, object[1])}\nJoin:  ${symbols(join, object[1])}`, alt: `${start} ${object[0]} with ${join} more joining.` } }, total),
      numberItem({ code: "AC9MFN05", topic: "addition-subtraction", set, position: 3, skill: "take away", question: `${name} has ${takeStart} blocks. ${take} are taken away. How many are left?`, explanation: `Take ${take} from ${takeStart}. There are ${left} left.`, hint: `Cross out ${take}, then count what is not crossed out.`, visual: { type: "svg_take_away", text: `${symbols(take, "×")}  ${symbols(left, "■")}`, alt: `${takeStart} blocks with ${take} crossed out and ${left} left.` } }, left),
      single({ code: "AC9MFN05", topic: "addition-subtraction", set, position: 4, skill: "match a number story", question: `${name} sees ${start} birds. ${join} more land. Which number story matches?`, explanation: `More birds land, so the two groups join: ${start} + ${join} = ${total}.`, hint: "Ask: did the group get bigger or smaller?", visual: { type: "svg_join_story", text: `${symbols(start, "▲")}  +  ${symbols(join, "▲")}  →  ?`, alt: `${start} birds with ${join} more birds joining.` } }, `${start} + ${join} = ${total}`, [`${start} - ${join} = ${Math.max(0, start - join)}`, `${total} - ${join} = ${start}`]),
      single({ code: "AC9MFN05", topic: "addition-subtraction", set, position: 5, skill: "choose add or take away", question: `${name} has ${takeStart} apples. ${take} apples are eaten. What should ${name} do?`, explanation: `The group gets smaller, so take away ${take}.`, hint: "Listen for what happened to the apples. Did more arrive, or did some leave?", visual: { type: "svg_take_away", text: `${symbols(takeStart, "●")}  →  ${symbols(left, "●")}`, alt: `${takeStart} apples at first and ${left} apples after some are eaten.` } }, "Take away", ["Join more", "Keep the same number"]),
      multiple({ code: "AC9MFN04", topic: "addition-subtraction", set, position: 6, skill: "same part whole story", question: `${name} checks four cards. Which two show ${part} and ${other} making ${whole}?`, explanation: `Both selected cards show the same two parts and the same whole.`, hint: `Check that both parts add to ${whole}.`, visual: { type: "svg_part_whole", text: `${symbols(part, "●")}   ${symbols(other, "■")}`, alt: `A part of ${part} circles and a part of ${other} squares.` } }, [`${part} + ${other} = ${whole}`, `${whole} is made from ${other} and ${part}`, `${part} + ${other + 1} = ${whole}`, `${whole} + ${part} = ${other}`], [`${part} + ${other} = ${whole}`, `${whole} is made from ${other} and ${part}`]),
      orderItem({ code: "AC9MFN05", topic: "addition-subtraction", set, position: 7, skill: "solve a joining story", question: `${name} solves a joining story. Put the steps in order.`, explanation: "First see the starting group, then join the new group, then count the whole group.", hint: "What must you know before anything can join?", visual: { type: "svg_join_story", text: `${symbols(start, object[1])}  +  ${symbols(join, object[1])}`, alt: `${start} ${object[0]} and ${join} more ${object[0]}.` } }, ["Count the whole group", `Start with ${start}`, `Join ${join} more`], [`Start with ${start}`, `Join ${join} more`, "Count the whole group"])
    ];
  }

  function equalGroupsSet(set) {
    const name = NAMES[set];
    const object = rotate(OBJECTS, set + 4);
    const groupCount = 2 + (set % 4);
    const each = 1 + ((set * 2) % 4);
    const total = groupCount * each;
    const children = 2 + ((set * 3) % 4);
    const eachShare = 1 + (set % 4);
    const shareTotal = children * eachShare;

    return [
      numberItem({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 0, skill: "count equal groups", question: `${name} makes ${groupCount} equal groups of ${each}. How many ${object[0]} altogether?`, explanation: `${groupCount} groups with ${each} in each group make ${total}.`, hint: `Count ${each} once for every group.`, visual: { type: "svg_equal_groups", text: groups(groupCount, each, object[1]), alt: `${groupCount} equal groups with ${each} ${object[0]} in each group.` } }, total),
      numberItem({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 1, skill: "fair share", question: `${name} shares ${shareTotal} counters between ${children} children. How many does each child get?`, explanation: `Each child gets ${eachShare} counters.`, hint: "Give one counter to each child in turn until none are left.", visual: { type: "svg_fair_share", text: `Counters: ${symbols(shareTotal)}\nChildren: ${symbols(children, "▲")}`, alt: `${shareTotal} counters to share fairly between ${children} children.` } }, eachShare),
      single({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 2, skill: "recognise equal groups", question: `${name} checks two pictures. Which picture shows equal groups?`, explanation: `Every group in the correct picture has ${each} objects.`, hint: "Count each group. Equal groups have the same number in every group.", visual: { type: "svg_equal_groups", text: `Picture A: ${groups(3, each)}\nPicture B: [ ${symbols(each)} ] [ ${symbols(each + 1)} ]`, alt: `Picture A has three equal groups of ${each}. Picture B has groups of ${each} and ${each + 1}.` } }, "Picture A", ["Picture B", "Both pictures"]),
      numberItem({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 3, skill: "count the groups", question: `${name} puts ${total} ${object[0]} into groups of ${each}. How many groups are made?`, explanation: `There are ${groupCount} groups of ${each}.`, hint: `Circle ${each} objects at a time, then count the circles.`, visual: { type: "svg_equal_groups", text: groups(groupCount, each, object[1]), alt: `${total} ${object[0]} arranged in groups of ${each}.` } }, groupCount),
      single({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 4, skill: "check a fair share", question: `${name} shares stickers as ${eachShare}, ${eachShare}, ${eachShare + 1}. Is the share fair?`, explanation: `No. One child has ${eachShare + 1}, so the amounts are not the same.`, hint: "Compare the number each child has.", visual: { type: "svg_fair_share", text: `[ ${symbols(eachShare, "★")} ]  [ ${symbols(eachShare, "★")} ]  [ ${symbols(eachShare + 1, "★")} ]`, alt: `Three shares with ${eachShare}, ${eachShare}, and ${eachShare + 1} stickers.` } }, "No, one share has an extra sticker", ["Yes, every share is equal", "Yes, because all are stickers"]),
      single({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 5, skill: "leftovers", question: `${name} shares ${shareTotal + 1} counters between ${children} children. What happens?`, explanation: `${shareTotal} can be shared equally. One counter is left over.`, hint: "Deal one to each child in turns. Stop when you cannot make another full turn.", visual: { type: "svg_fair_share", text: `${groups(children, eachShare)}   Left: ●`, alt: `${children} equal groups of ${eachShare} counters with one counter left over.` } }, "One counter is left over", ["Every child gets one extra", "No counters are left"]),
      multiple({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 6, skill: "choose equal groups", question: `${name} checks four cards. Which two cards show equal groups?`, explanation: "The two correct cards have the same number in every group.", hint: "Count the objects inside each bracket.", visual: { type: "svg_equal_groups", text: `1: ${groups(2, each)}   2: ${groups(3, eachShare)}\n3: [ ${symbols(each)} ] [ ${symbols(each + 1)} ]   4: [ ${symbols(eachShare)} ] [ ${symbols(eachShare + 1)} ]`, alt: `Four group cards. Card 1 has equal groups of ${each}; Card 2 has equal groups of ${eachShare}; Cards 3 and 4 are unequal.` } }, ["Card 1", "Card 2", "Card 3", "Card 4"], ["Card 1", "Card 2"]),
      orderItem({ code: "AC9MFN06", topic: "equal-groups-sharing", set, position: 7, skill: "fair sharing steps", question: `${name} wants to share fairly. Put the steps in order.`, explanation: "Deal in turns, keep going until every object is used, then check the shares.", hint: "Which action starts a fair share?", visual: { type: "svg_fair_share", text: `${symbols(shareTotal)}  →  ${children} children`, alt: `${shareTotal} counters ready to be shared between ${children} children.` } }, ["Check every share is equal", "Give one object to each child", "Keep dealing in turns"], ["Give one object to each child", "Keep dealing in turns", "Check every share is equal"])
    ];
  }

  const PATTERN_UNITS = [];
  for (let first = 0; first < SHAPES.length; first += 1) {
    for (let second = 0; second < SHAPES.length; second += 1) {
      if (first !== second) PATTERN_UNITS.push([SHAPES[first], SHAPES[second]]);
    }
  }
  const ACTIONS = ["clap", "tap", "stamp", "jump", "turn", "nod"];

  function repeatingPatternsSet(set) {
    const name = NAMES[set];
    const unit = PATTERN_UNITS[set];
    const sequence = [...unit, ...unit, ...unit];
    const missingIndex = 2 + (set % 4);
    const missingAnswer = sequence[missingIndex];
    const missingSequence = sequence.map((shape, index) => index === missingIndex ? "?" : shape.glyph).join(" ");
    const wrongSequence = [...sequence];
    wrongSequence[3] = rotate(SHAPES, set + 3);
    const actionA = rotate(ACTIONS, set);
    const actionB = rotate(ACTIONS, set + 2);

    return [
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 0, skill: "continue a pattern", question: `${name} made a repeating pattern. What comes next?`, explanation: `The pattern repeats ${unit[0].label}, ${unit[1].label}. The next shape is ${unit[0].label}.`, hint: "Find the small part that repeats, then start it again.", visual: { type: "svg_sequence", text: `${sequence.slice(0, 6).map((shape) => shape.glyph).join(" ")}  ?`, alt: `${sequence.slice(0, 6).map((shape) => shape.label).join(", ")}, then a question mark.` } }, unit[0].glyph, [unit[1].glyph, rotate(SHAPES, set + 4).glyph]),
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 1, skill: "find the repeating part", question: `What is the smallest part that repeats?`, explanation: `${unit[0].label} then ${unit[1].label} is the repeating part.`, hint: "Look for the shortest group that starts again.", visual: { type: "svg_sequence", text: sequence.map((shape) => shape.glyph).join(" "), alt: `A repeating sequence: ${sequence.map((shape) => shape.label).join(", ")}.` } }, `${unit[0].label}, ${unit[1].label}`, [unit[0].label, `${unit[1].label}, ${unit[0].label}`]),
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 2, skill: "find a missing shape", question: `Which shape belongs at the question mark?`, explanation: `${missingAnswer.label} keeps the repeating part in the same order.`, hint: "Check the same place in the other repeats.", visual: { type: "svg_sequence", text: missingSequence, alt: `Pattern with a missing shape: ${sequence.map((shape, index) => index === missingIndex ? "question mark" : shape.label).join(", ")}.` } }, missingAnswer.glyph, [unit.find((shape) => shape.glyph !== missingAnswer.glyph).glyph, rotate(SHAPES, set + 5).glyph]),
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 3, skill: "repair a pattern", question: `One shape breaks the pattern. Which shape should replace it?`, explanation: `${sequence[3].label} belongs in that place.`, hint: "Compare the first repeat with the second repeat.", visual: { type: "svg_sequence", text: wrongSequence.map((shape) => shape.glyph).join(" "), alt: `A pattern with one wrong shape in the second repeat.` } }, sequence[3].glyph, [wrongSequence[3].glyph, rotate(SHAPES, set + 1).glyph]),
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 4, skill: "match a pattern rule", question: `Which new pattern follows the same AB rule?`, explanation: "The correct pattern changes item, then changes back, in the same AB order.", hint: "Say the rule as A, B, A, B.", visual: { type: "svg_sequence", text: `${unit[0].glyph} ${unit[1].glyph} ${unit[0].glyph} ${unit[1].glyph}`, alt: `${unit[0].label}, ${unit[1].label}, ${unit[0].label}, ${unit[1].label}.` } }, "clap, stamp, clap, stamp", ["clap, clap, stamp, stamp", "clap, stamp, jump, clap"]),
      single({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 5, skill: "continue an action pattern", question: `${name} does: ${actionA}, ${actionB}, ${actionA}, ${actionB}. What comes next?`, explanation: `The actions repeat ${actionA}, ${actionB}, so ${actionA} comes next.`, hint: "Listen for the two-action part that repeats.", visual: { type: "svg_action_sequence", text: `${actionA} → ${actionB} → ${actionA} → ${actionB} → ?`, alt: `${actionA}, ${actionB}, ${actionA}, ${actionB}, then a missing action.` } }, actionA, [actionB, rotate(ACTIONS, set + 4)]),
      multiple({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 6, skill: "describe a pattern", question: `Which two ideas are true about ${name}'s pattern?`, explanation: "A repeating pattern keeps the same small part and the same order.", hint: "Check what repeats and whether the order changes.", visual: { type: "svg_sequence", text: sequence.map((shape) => shape.glyph).join(" "), alt: `A repeating sequence of ${unit[0].label} and ${unit[1].label}.` } }, ["The same part repeats", "The order stays the same", "Any shape can come next", "The rule changes each time"], ["The same part repeats", "The order stays the same"]),
      orderItem({ code: "AC9MFA01", topic: "repeating-patterns", set, position: 7, skill: "copy a repeating part", question: `Put one repeating part in the right order.`, explanation: `${unit[0].label} comes first, then ${unit[1].label}.`, hint: "Look at the first two shapes in the pattern.", visual: { type: "svg_sequence", text: sequence.slice(0, 4).map((shape) => shape.glyph).join(" "), alt: `Pattern starting ${unit[0].label}, ${unit[1].label}, then repeating.` } }, [unit[1].label, unit[0].label], [unit[0].label, unit[1].label])
    ];
  }

  const MASS_PAIRS = [
    ["rock", "sponge"], ["book", "feather"], ["full bottle", "empty bottle"],
    ["bag of blocks", "one block"], ["watermelon", "apple"]
  ];
  const SHAPE_FACTS = [
    ["circle", "no straight sides", "●"], ["triangle", "3 straight sides", "▲"],
    ["square", "4 equal straight sides", "■"], ["rectangle", "4 straight sides", "▭"]
  ];

  function mixedSet(set) {
    const name = NAMES[set];
    const lengthA = 3 + (set % 5);
    const lengthB = lengthA + 2;
    const mass = rotate(MASS_PAIRS, set);
    const cupA = 3 + (set % 4);
    const cupB = cupA + 2;
    const dayIndex = set % 7;
    const shape = rotate(SHAPE_FACTS, set);
    const row = ["ball", "teddy", "book"];
    const targetPosition = ["left of", "between", "right of"][set % 3];
    const cats = 2 + (set % 5);
    const dogs = 1 + ((set * 2) % 5);
    const more = cats === dogs ? "They are the same" : cats > dogs ? "Cats" : "Dogs";

    return [
      single({ code: "AC9MFM01", topic: "measurement-shapes-data", set, position: 0, skill: "compare length", question: `${name} lines up two ribbons at one end. Which ribbon is longer?`, explanation: "Ribbon B reaches farther, so it is longer.", hint: "Check that the ends start together. Then see which ribbon reaches farther.", visual: { type: "svg_length_comparison", text: `A: |${"—".repeat(lengthA)}|\nB: |${"—".repeat(lengthB)}|`, alt: `Two aligned ribbons. Ribbon B is longer than Ribbon A.` } }, "Ribbon B", ["Ribbon A", "They are the same length"]),
      single({ code: "AC9MFM01", topic: "measurement-shapes-data", set, position: 1, skill: "compare mass", question: `${name} watches a balance tip down under the ${mass[0]}. Which item is heavier?`, explanation: `The ${mass[0]} side tips down, so the ${mass[0]} is heavier.`, hint: "On a balance, look at the side that goes down.", visual: { type: "svg_balance", text: `${mass[0]}  \\  ⚖  /  ${mass[1]}`, alt: `A balance tipped down on the ${mass[0]} side and up on the ${mass[1]} side.` } }, mass[0], [mass[1], "They have the same mass"]),
      single({ code: "AC9MFM01", topic: "measurement-shapes-data", set, position: 2, skill: "compare capacity", question: `${name} fills two cups. Cup A holds ${cupA} scoops. Cup B holds ${cupB}. Which cup holds more?`, explanation: `Cup B holds ${cupB} scoops, which is more than ${cupA}.`, hint: "Use the scoop counts. A taller-looking cup does not always hold more.", visual: { type: "svg_capacity_comparison", text: `Cup A: ${symbols(cupA, "◉")}\nCup B: ${symbols(cupB, "◉")}`, alt: `Cup A holds ${cupA} equal scoops. Cup B holds ${cupB} equal scoops.` } }, "Cup B", ["Cup A", "They hold the same amount"]),
      single({ code: "AC9MFM02", topic: "measurement-shapes-data", set, position: 3, skill: "sequence days", question: `${name} says today is ${DAYS[dayIndex]}. What day comes next?`, explanation: `${DAYS[(dayIndex + 1) % 7]} comes after ${DAYS[dayIndex]}.`, hint: "Say the days of the week in order.", visual: { type: "svg_day_sequence", text: `${DAYS[dayIndex]}  →  ?`, alt: `${DAYS[dayIndex]} followed by a missing day.` } }, DAYS[(dayIndex + 1) % 7], [DAYS[(dayIndex + 6) % 7], DAYS[(dayIndex + 2) % 7]]),
      single({ code: "AC9MFSP01", topic: "measurement-shapes-data", set, position: 4, skill: "name shape features", question: `${name} sorts shapes. Which shape has ${shape[1]}?`, explanation: `A ${shape[0]} has ${shape[1]}.`, hint: "Trace around each shape and count its straight sides.", visual: { type: "svg_shape_choice", text: `●     ▲     ■     ▭`, alt: "A circle, triangle, square and rectangle." } }, shape[0], SHAPE_FACTS.filter((fact) => fact[0] !== shape[0]).slice(0, 2).map((fact) => fact[0])),
      single({ code: "AC9MFSP02", topic: "measurement-shapes-data", set, position: 5, skill: "describe position", question: `${name} puts a teddy between a ball and a book. Where is the teddy?`, explanation: "The teddy is in the middle, so it is between the other two objects.", hint: "Find the object with one item on each side.", visual: { type: "svg_position", text: `${row[0]}     ${row[1]}     ${row[2]}`, alt: "A ball on the left, a teddy in the middle and a book on the right." } }, "Between the ball and the book", ["Left of the ball", "Right of the book"]),
      numberItem({ code: "AC9MFST01", topic: "measurement-shapes-data", set, position: 6, skill: "read picture data", question: `${name}'s picture chart shows cats and dogs. How many cats are shown?`, explanation: `There are ${cats} cat pictures.`, hint: "Count only the pictures in the cats row.", visual: { type: "svg_picture_graph", text: `Cats: ${symbols(cats, "▲")}\nDogs: ${symbols(dogs, "●")}`, alt: `Picture chart with ${cats} cats and ${dogs} dogs.` } }, cats),
      single({ code: "AC9MFST01", topic: "measurement-shapes-data", set, position: 7, skill: "compare picture data", question: `Which group has more pictures in ${name}'s chart?`, explanation: cats === dogs ? `Both rows have ${cats} pictures.` : `${more} have more pictures: ${Math.max(cats, dogs)} compared with ${Math.min(cats, dogs)}.`, hint: "Count each row, then compare the two numbers.", visual: { type: "svg_picture_graph", text: `Cats: ${symbols(cats, "▲")}\nDogs: ${symbols(dogs, "●")}`, alt: `Picture chart with ${cats} cats and ${dogs} dogs.` } }, more, [more === "Cats" ? "Dogs" : "Cats", "They are the same"])
    ];
  }

  const VOCAB = [
    ["number", "an idea that tells how many", "AC9MFN01"],
    ["numeral", "a written number sign", "AC9MFN01"],
    ["zero", "none in a group", "AC9MFN01"],
    ["count", "say one number for each object", "AC9MFN03"],
    ["order", "put things in a chosen sequence", "AC9MFN01"],
    ["before", "comes earlier", "AC9MFN01"],
    ["after", "comes next or later", "AC9MFN01"],
    ["more", "a bigger number of objects", "AC9MFN03"],
    ["fewer", "a smaller number of objects", "AC9MFN03"],
    ["equal", "the same amount", "AC9MFN03"],
    ["quantity", "how many there are", "AC9MFN03"],
    ["part", "one piece of a whole group", "AC9MFN04"],
    ["whole", "all the parts together", "AC9MFN04"],
    ["combine", "put groups together", "AC9MFN04"],
    ["altogether", "the total in all the groups", "AC9MFN05"],
    ["take away", "remove some from a group", "AC9MFN05"],
    ["remain", "what is left", "AC9MFN05"],
    ["share", "give parts to people or groups", "AC9MFN06"],
    ["each", "one person or group at a time", "AC9MFN06"],
    ["equal groups", "groups with the same number in each", "AC9MFN06"],
    ["pattern", "items that follow a rule", "AC9MFA01"],
    ["repeat", "happen again in the same way", "AC9MFA01"],
    ["unit", "the smallest part of a pattern that repeats", "AC9MFA01"],
    ["length", "how long something is", "AC9MFM01"],
    ["mass", "how heavy something is", "AC9MFM01"],
    ["capacity", "how much a container can hold", "AC9MFM01"],
    ["duration", "how long an event lasts", "AC9MFM01"],
    ["shape", "the form or outline of an object", "AC9MFSP01"],
    ["position", "where something is", "AC9MFSP02"],
    ["data", "information we collect", "AC9MFST01"]
  ];

  function vocabularySet(set) {
    const name = NAMES[set];
    const terms = Array.from({ length: 4 }, (_, index) => VOCAB[(set + index * 7) % VOCAB.length]);
    const [a, b, c, d] = terms;
    const statementIsTrue = set % 2 === 0;
    const shownMeaning = statementIsTrue ? c[1] : d[1];

    return [
      single({ code: a[2], topic: "maths-vocabulary", set, position: 0, skill: `${a[0]} vocabulary`, question: `${name} asks, “Which word means ${a[1]}?”`, explanation: `${a[0]} means ${a[1]}.`, hint: "Say each word, then match it to the meaning.", visual: null }, a[0], [b[0], c[0]]),
      single({ code: b[2], topic: "maths-vocabulary", set, position: 1, skill: `${b[0]} vocabulary`, question: `What does “${b[0]}” mean?`, explanation: `${b[0]} means ${b[1]}.`, hint: `Think about when you hear “${b[0]}” in a maths lesson.`, visual: null }, b[1], [a[1], c[1]]),
      trueFalse({ code: c[2], topic: "maths-vocabulary", set, position: 2, skill: `${c[0]} vocabulary`, question: `${name} says, “${c[0]} means ${shownMeaning}.” Is ${name} right?`, explanation: "", hint: "", visual: null }, statementIsTrue, statementIsTrue ? `Yes. ${c[0]} means ${c[1]}.` : `No. ${c[0]} means ${c[1]}.`, `Match the word “${c[0]}” to its meaning.`),
      textItem({ code: d[2], topic: "maths-vocabulary", set, position: 3, skill: `${d[0]} vocabulary`, question: `Type the maths word that means “${d[1]}”.`, explanation: `The word is ${d[0]}.`, hint: `The word starts with “${d[0][0]}”.`, visual: null }, [d[0]]),
      fillItem({ code: a[2], topic: "maths-vocabulary", set, position: 4, skill: `${a[0]} vocabulary`, question: `${name} is finishing a maths sentence. Which word is missing?`, explanation: `${a[0]} is the word that matches the meaning.`, hint: `Read the meaning after the word “means”.`, visual: null }, `{{blank}} means ${a[1]}.`, [a[0]]),
      single({ code: b[2], topic: "maths-vocabulary", set, position: 5, skill: `${b[0]} in a maths story`, question: `${name} needs a word for “${b[1]}”. Which word should ${name} use?`, explanation: `${b[0]} is the best word for this maths idea.`, hint: "Choose the word that says exactly what is happening.", visual: null }, b[0], [c[0], d[0]]),
      multiple({ code: c[2], topic: "maths-vocabulary", set, position: 6, skill: "match maths words", question: `Which two word cards are matched correctly?`, explanation: `The two correct cards match each word to its real meaning.`, hint: "Check one card at a time. Say the word, then read its meaning.", visual: null }, [`${a[0]} — ${a[1]}`, `${b[0]} — ${c[1]}`, `${c[0]} — ${c[1]}`, `${d[0]} — ${a[1]}`], [`${a[0]} — ${a[1]}`, `${c[0]} — ${c[1]}`]),
      single({ code: d[2], topic: "maths-vocabulary", set, position: 7, skill: `${d[0]} vocabulary`, question: `${name} hears “${d[1]}”. Which maths word matches?`, explanation: `${d[0]} matches that meaning.`, hint: `Look for the word you would use when talking about ${d[1]}.`, visual: null }, d[0], [a[0], b[0]])
    ];
  }

  const builders = {
    "numbers-to-20": numbersSet,
    "addition-subtraction": additionSet,
    "equal-groups-sharing": equalGroupsSet,
    "repeating-patterns": repeatingPatternsSet,
    "measurement-shapes-data": mixedSet,
    "maths-vocabulary": vocabularySet
  };

  function simplifyLanguage(value) {
    return String(value || "")
      .replace(/Which attribute directly compares/gi, "How can you compare")
      .replace(/Which attribute answers/gi, "What are you finding when you ask")
      .replace(/Which arrangement/gi, "Which picture")
      .replace(/Which description/gi, "Which story")
      .replace(/Which representation/gi, "Which way to show it")
      .replace(/equivalent to/gi, "the same as")
      .replace(/equivalent/gi, "the same")
      .replace(/numerical/gi, "number")
      .replace(/direct comparison/gi, "fair comparison")
      .replace(/Which statement is correct\?/gi, "Which answer is right?")
      .replace(/Select both/gi, "Choose the two")
      .replace(/Select all/gi, "Choose all")
      .replace(/\s+/g, " ")
      .trim();
  }

  const HINTS = {
    AC9MFN01: "Say the counting numbers slowly and look for the place that fits.",
    AC9MFN02: "Look at the small group as a whole before counting one by one.",
    AC9MFN03: "Touch each object once, then compare the counts.",
    AC9MFN04: "Find the two parts and check that they make the whole.",
    AC9MFN05: "Ask whether objects joined the group or left the group.",
    AC9MFN06: "Count each group. Fair groups have the same number in each.",
    AC9MFA01: "Find the smallest part that repeats in the same order.",
    AC9MFM01: "Compare the same feature in a fair way.",
    AC9MFM02: "Say the days or parts of the day in order.",
    AC9MFSP01: "Look at the shape's sides, corners and curved edges.",
    AC9MFSP02: "Use the objects around it to describe where it is.",
    AC9MFST01: "Sort or count one group at a time, then compare."
  };

  function enhanceExtension(rawQuestion, topic, index) {
    const code = rawQuestion.curriculumCode || rawQuestion.learningArea || "AC9MFN01";
    const seed = hash(rawQuestion.id || `${topic}-${index}`);
    const question = simplifyLanguage(rawQuestion.question);
    const summary = simplifyLanguage(
      typeof rawQuestion.explanation === "string"
        ? rawQuestion.explanation
        : rawQuestion.explanation?.summary || "Check the maths shown in the picture."
    );
    const item = {
      id: rawQuestion.id || `${code}-${topic}-extension-${pad(index + 1)}`,
      curriculumCode: code,
      bank: "daily-drill",
      topic,
      skill: snake(rawQuestion.skill || topic),
      set: Number.isInteger(rawQuestion.set) ? rawQuestion.set : Math.floor(index / 8),
      difficulty: rawQuestion.difficulty || (index % 4 < 2 ? "core" : "application"),
      type: rawQuestion.type || "single",
      question,
      visual: rawQuestion.visual ? makeVisual(rawQuestion.id || `${code}-${index}`, "svg_model", rawQuestion.visual, describeVisual(rawQuestion.visual)) : null,
      answers: [],
      correct_index: null,
      explanation: { summary, hint: HINTS[code] || "Use the picture and check one step at a time." },
      audio_prompt: question,
      printable: rawQuestion.printable !== false,
      source: "production-extension"
    };

    if (["single", "true-false"].includes(item.type) && Array.isArray(rawQuestion.answers)) {
      const correctText = rawQuestion.answers[rawQuestion.correct];
      const distractors = rawQuestion.answers.filter((_, answerIndex) => answerIndex !== rawQuestion.correct);
      Object.assign(item, orderedChoices(correctText, distractors, seed));
    } else if (item.type === "multiple" && Array.isArray(rawQuestion.answers)) {
      const correctValues = (rawQuestion.correct || []).map((answerIndex) => rawQuestion.answers[answerIndex]);
      Object.assign(item, orderedMultiple(rawQuestion.answers, correctValues, seed));
      item.instruction = "Choose all the answers that work.";
    } else if (["order", "drag-drop"].includes(item.type)) {
      item.items = (rawQuestion.items || []).map(String);
      item.correct_answer = (rawQuestion.correct || []).map(String);
      item.instruction = "Put the cards in order.";
    } else if (item.type === "fill-blank") {
      item.template = rawQuestion.template || "{{blank}}";
      item.accepted_answers = (rawQuestion.acceptedAnswers || [rawQuestion.correct]).map(String);
      item.correct_answer = item.accepted_answers[0];
    } else if (item.type === "text") {
      item.accepted_answers = (rawQuestion.acceptedAnswers || [rawQuestion.correct]).map(String);
      item.correct_answer = item.accepted_answers[0];
    } else {
      item.correct_answer = rawQuestion.correct;
      item.placeholder = rawQuestion.placeholder || "Type the number";
      item.tolerance = Number(rawQuestion.tolerance || 0);
    }
    return item;
  }

  function contentSignature(item) {
    return JSON.stringify([
      item.question,
      item.visual?.alt_text || "",
      item.answers?.map((answer) => answer.text) || [],
      item.items || [],
      item.template || "",
      item.correct_answer ?? item.correct_index ?? item.correct_indexes
    ]);
  }

  const WEAK_DISTRACTOR = /colour decides|because .*colou?r|thoughts?|friendl|favourite|random|word is shorter|listed second|brightest|darkest|look different|cannot be compared|guess without|no rules|only colou?r matters|happier|likes water|remembers heat/i;

  function passesExtensionQuality(item) {
    if (item.type === "multiple" && (item.correct_indexes || []).length < 2) return false;
    const distractors = (item.answers || [])
      .filter((answer) => !answer.is_correct)
      .map((answer) => answer.text);
    return !distractors.some((text) => WEAK_DISTRACTOR.test(String(text)));
  }

  const productionByTopic = {};
  const globalIds = new Map();
  const seenContent = new Set();

  TOPICS.forEach((topic) => {
    const core = Array.from({ length: 30 }, (_, set) => builders[topic](set)).flat();
    const rawExtensions = Array.isArray(extensionRoot[topic]) ? extensionRoot[topic] : [];
    core.forEach((item) => seenContent.add(contentSignature(item)));
    const extensions = rawExtensions
      .map((question, index) => enhanceExtension(question, topic, index))
      .filter((item) => {
        if (!passesExtensionQuality(item)) return false;
        const signature = contentSignature(item);
        if (seenContent.has(signature)) return false;
        seenContent.add(signature);
        return true;
      });
    productionByTopic[topic] = { core, extension: extensions };
  });

  TOPICS.forEach((topic) => {
    [...productionByTopic[topic].core, ...productionByTopic[topic].extension].forEach((item) => {
      const next = (globalIds.get(item.curriculumCode) || 0) + 1;
      globalIds.set(item.curriculumCode, next);
      const oldSymbol = item.visual?.symbol_id;
      item.id = `${item.curriculumCode}-D-${pad(next)}`;
      if (item.visual) item.visual.symbol_id = `visual-${snake(item.id)}`;
      if (oldSymbol && item.visual?.symbol_id !== oldSymbol) item.visual.previous_symbol_id = oldSymbol;
    });
  });

  function runtimeItem(item) {
    const runtime = {
      ...item,
      answers: item.answers.map((answer) => answer.text),
      explanation: { ...item.explanation },
      visual: item.visual ? { ...item.visual } : null,
      acceptedAnswers: item.accepted_answers ? [...item.accepted_answers] : undefined
    };
    if (["single", "true-false"].includes(item.type)) runtime.correct = item.correct_index;
    else if (item.type === "multiple") runtime.correct = [...(item.correct_indexes || [])];
    else if (["order", "drag-drop"].includes(item.type)) runtime.correct = [...(item.correct_answer || [])];
    else runtime.correct = item.correct_answer;
    return runtime;
  }

  window.SkillrDailyMath = {
    ...originalGenerator,
    generate(year, topic) {
      if (String(year) !== "F" || !productionByTopic[topic]) {
        return originalGenerator.generate(year, topic);
      }
      return productionByTopic[topic].core.map(runtimeItem);
    }
  };

  TOPICS.forEach((topic) => {
    extensionRoot[topic] = productionByTopic[topic].extension.map(runtimeItem);
  });

  window.SkillrFoundationMathsProduction = {
    version: "2.0",
    year: "F",
    subject: "math",
    generated: "2026-08-13",
    topics: productionByTopic,
    all: TOPICS.flatMap((topic) => [
      ...productionByTopic[topic].core,
      ...productionByTopic[topic].extension
    ]),
    runtimeItem
  };
})();
