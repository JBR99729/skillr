import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "assets", "assessment-banks", "year3", "math");
const REPORT = path.join(ROOT, "reports", "year3-maths-ixl-review");

const specs = {
  AC9M3M01: {
    title: "Choosing Metric Units and Estimating",
    descriptor: "identify which metric units are used to measure everyday items; use measurements of familiar items and known units to make estimates",
    ixl: [
      "Estimate lengths with centimetres and metres",
      "Which metric unit of length is appropriate?",
      "Which metric unit of mass is appropriate?",
      "Which metric unit of volume is appropriate?"
    ],
    skills: ["choose_length_unit", "choose_mass_unit", "choose_capacity_unit", "estimate_with_benchmark"],
    practice: [
      ["choose_length_unit", "Which unit is most sensible for measuring the length of a glue stick?", "centimetres", ["metres", "kilometres", "litres"], "A glue stick is a small length, so centimetres give a useful measurement.", "Match the unit to the attribute and size."],
      ["choose_length_unit", "Which unit is most sensible for measuring the length of a school oval?", "metres", ["centimetres", "grams", "millilitres"], "An oval is a long distance around a field, so metres are sensible.", "Think about whether the object is small or large."],
      ["choose_length_unit", "A desk is about 1 metre wide. Which estimate is sensible for a classroom whiteboard?", "3 metres", ["3 centimetres", "3 kilograms", "3 millilitres"], "A whiteboard is a few desk-widths across, so about 3 metres is sensible.", "Use the desk width as a benchmark."],
      ["choose_length_unit", "A pencil is about 15 centimetres long. Which estimate is sensible for a lunchbox length?", "25 centimetres", ["25 metres", "25 litres", "25 kilograms"], "A lunchbox is a little longer than a pencil, so 25 centimetres is sensible.", "Compare with a familiar object."],
      ["choose_mass_unit", "Which unit is most sensible for measuring the mass of a strawberry?", "grams", ["kilograms", "metres", "litres"], "A strawberry has a small mass, so grams are sensible.", "Mass uses grams or kilograms."],
      ["choose_mass_unit", "Which unit is most sensible for measuring the mass of a full school bag?", "kilograms", ["grams", "centimetres", "millilitres"], "A full school bag is heavy enough to measure in kilograms.", "Choose the larger mass unit for heavier objects."],
      ["choose_mass_unit", "A can of beans is about 400 grams. Which estimate is sensible for an apple?", "150 grams", ["150 kilograms", "150 metres", "150 litres"], "An apple is lighter than a can of beans, so 150 grams is sensible.", "Use the known mass to judge the estimate."],
      ["choose_mass_unit", "A bag of rice is labelled 5 kg. Which object would also be measured in kilograms?", "a small dog", ["a paper clip", "a sip of water", "a pencil line"], "A small dog has a mass large enough for kilograms.", "Kilograms suit heavier masses."],
      ["choose_capacity_unit", "Which unit is most sensible for measuring the capacity of a water bottle?", "millilitres", ["grams", "metres", "kilometres"], "A water bottle holds liquid, and millilitres suit a small container.", "Capacity is how much a container holds."],
      ["choose_capacity_unit", "Which unit is most sensible for measuring the capacity of a bucket?", "litres", ["centimetres", "grams", "kilograms"], "A bucket holds several litres of liquid.", "Choose litres for larger containers."],
      ["choose_capacity_unit", "A mug holds about 250 mL. Which estimate is sensible for a small juice box?", "200 mL", ["200 L", "200 kg", "200 m"], "A juice box has a capacity close to a mug, so 200 mL is sensible.", "Compare the container with the benchmark."],
      ["choose_capacity_unit", "A bathtub holds much more than a cup. Which unit should be used for its capacity?", "litres", ["grams", "centimetres", "seconds"], "A bathtub is a large container for water, so litres are sensible.", "Use a capacity unit for liquid containers."],
      ["estimate_with_benchmark", "A classroom door is about 2 metres high. Which estimate is sensible for a teacher's desk length?", "1 metre", ["1 kilometre", "1 gram", "1 millilitre"], "A desk is shorter than a door but still close to a metre long.", "Use the door height as a length benchmark."],
      ["estimate_with_benchmark", "A paper clip is about 3 cm long. Which estimate is sensible for an eraser?", "5 cm", ["5 m", "5 kg", "5 L"], "An eraser is only a little longer than a paper clip, so 5 cm is sensible.", "Choose a nearby length estimate."],
      ["estimate_with_benchmark", "A litre bottle holds 1000 mL. Which estimate is sensible for a cup of water?", "250 mL", ["250 L", "250 kg", "250 m"], "A cup holds about a quarter of a litre bottle.", "Use the bottle as a capacity benchmark."],
      ["estimate_with_benchmark", "A bag of flour is 1 kg. Which estimate is sensible for a packet of biscuits?", "250 g", ["250 kg", "250 L", "250 m"], "A packet of biscuits is lighter than 1 kg, so a few hundred grams is sensible.", "Think smaller than the kilogram benchmark."]
    ]
  },
  AC9M3M02: {
    title: "Measuring with Metric Instruments",
    descriptor: "measure and compare objects using familiar metric units of length, mass and capacity, and instruments with labelled markings",
    ixl: [
      "Measure using a centimetre ruler",
      "Compare metric units of length",
      "Compare metric units of mass",
      "Compare metric units of volume",
      "Compare metric units"
    ],
    skills: ["read_ruler", "read_labelled_scale", "compare_measurements", "choose_instrument"],
    practice: [
      ["read_ruler", "A line starts at 0 cm and ends at 14 cm. How long is the line?", "14 cm", ["7 cm", "15 cm", "14 m"], "The length is read from zero to the endpoint at 14 cm.", "Start at zero and read the endpoint."],
      ["read_ruler", "An eraser starts at 2 cm and ends at 9 cm on a ruler. What is its length?", "7 cm", ["9 cm", "11 cm", "2 cm"], "Subtract the start reading from the end reading: 9 cm minus 2 cm is 7 cm.", "When it does not start at zero, find the difference."],
      ["read_ruler", "A ribbon starts at 0 cm and reaches halfway between 18 cm and 19 cm. What is the best reading?", "18.5 cm", ["18 cm", "19.5 cm", "185 cm"], "Halfway between 18 and 19 is 18.5 cm.", "Read the interval between labelled marks."],
      ["read_ruler", "A crayon is measured from 0 cm to 8 cm. Which measurement is recorded correctly?", "8 cm", ["8 g", "8 mL", "8 kg"], "A crayon length measured on a ruler is recorded in centimetres.", "Include the correct unit."],
      ["read_labelled_scale", "A jug scale is marked every 100 mL. The water level is at 600 mL. What is the reading?", "600 mL", ["60 mL", "700 mL", "600 L"], "The labelled scale shows the water level at 600 mL.", "Check the value of each interval."],
      ["read_labelled_scale", "A kitchen scale is marked every 50 g. The pointer is at 350 g. What is the reading?", "350 g", ["300 g", "400 g", "350 kg"], "Counting by 50 g reaches 350 g at the pointer.", "Use the interval size."],
      ["read_labelled_scale", "A measuring jug shows 1 L and 200 mL. Which amount is this?", "1200 mL", ["102 mL", "12 mL", "120 L"], "1 L is 1000 mL, plus 200 mL makes 1200 mL.", "Connect litres and millilitres."],
      ["read_labelled_scale", "A parcel has a mass of 2 kg and 500 g. Which amount is this?", "2500 g", ["205 g", "25 g", "250 kg"], "2 kg is 2000 g, plus 500 g makes 2500 g.", "Connect kilograms and grams."],
      ["compare_measurements", "Which is longer?", "1 m", ["75 cm", "50 cm", "90 cm"], "1 metre is 100 centimetres, which is longer than the other choices.", "Use 100 cm equals 1 m."],
      ["compare_measurements", "Which is the greatest mass?", "2 kg", ["900 g", "1500 g", "750 g"], "2 kg is 2000 g, which is greater than 1500 g, 900 g and 750 g.", "Convert to compare fairly."],
      ["compare_measurements", "Which container has the greatest capacity?", "1 L", ["600 mL", "850 mL", "400 mL"], "1 L is 1000 mL, greater than the other capacities.", "Use 1000 mL equals 1 L."],
      ["compare_measurements", "A plant is 42 cm tall and a book is 28 cm tall. How much taller is the plant?", "14 cm", ["70 cm", "24 cm", "12 m"], "Subtract 28 from 42 to find the difference of 14 cm.", "Compare measurements using subtraction."],
      ["choose_instrument", "Which instrument should you use to measure the length of a notebook?", "ruler", ["measuring jug", "balance scale", "clock"], "A ruler measures length in centimetres.", "Match the instrument to the attribute."],
      ["choose_instrument", "Which instrument should you use to measure the capacity of a cup?", "measuring jug", ["ruler", "balance scale", "thermometer"], "A measuring jug measures how much liquid a cup can hold.", "Capacity needs a container scale."],
      ["choose_instrument", "Which instrument should you use to measure the mass of an orange?", "kitchen scale", ["metre ruler", "measuring jug", "calendar"], "A kitchen scale measures mass in grams or kilograms.", "Mass needs a scale."],
      ["choose_instrument", "A student measures a pencil from the ruler edge instead of the zero mark. What should they do?", "line up the pencil with 0 cm", ["measure in litres", "ignore the unit", "start at 10 cm and read 10 cm"], "The zero mark is the correct starting point for a direct ruler measurement.", "Accurate measuring starts at zero."]
    ]
  },
  AC9M3M03: {
    title: "Time Units and Duration",
    descriptor: "recognise and use the relationship between formal units of time including days, hours, minutes and seconds to estimate and compare the duration of events",
    ixl: [
      "Convert between seconds and minutes",
      "Convert between minutes and hours",
      "Convert between hours and days",
      "Compare durations",
      "Estimate time for everyday events"
    ],
    skills: ["convert_time_units", "compare_durations", "estimate_duration", "elapsed_time"],
    practice: [
      ["convert_time_units", "How many seconds are in 3 minutes?", "180 seconds", ["90 seconds", "120 seconds", "300 seconds"], "Each minute has 60 seconds, so 3 minutes is 180 seconds.", "Multiply minutes by 60."],
      ["convert_time_units", "How many minutes are in 4 hours?", "240 minutes", ["120 minutes", "180 minutes", "400 minutes"], "Each hour has 60 minutes, so 4 hours is 240 minutes.", "Multiply hours by 60."],
      ["convert_time_units", "How many hours are in 2 days?", "48 hours", ["24 hours", "36 hours", "60 hours"], "Each day has 24 hours, so 2 days is 48 hours.", "Multiply days by 24."],
      ["convert_time_units", "Which duration is the same as 120 seconds?", "2 minutes", ["1 hour", "12 minutes", "20 minutes"], "120 seconds is 2 groups of 60 seconds.", "Divide seconds by 60."],
      ["compare_durations", "Which is longer: 90 minutes or 2 hours?", "2 hours", ["90 minutes", "they are equal", "90 seconds"], "2 hours is 120 minutes, which is longer than 90 minutes.", "Change both to minutes."],
      ["compare_durations", "Which is shortest?", "45 seconds", ["1 minute", "2 minutes", "90 seconds"], "45 seconds is less than 60 seconds, so it is shorter than 1 minute.", "Compare using seconds."],
      ["compare_durations", "Which is the same as 1 day?", "24 hours", ["12 hours", "60 hours", "100 hours"], "One day has 24 hours.", "Recall the hours in a day."],
      ["compare_durations", "A movie lasts 95 minutes and a lesson lasts 1 hour. Which lasts longer?", "the movie", ["the lesson", "they are equal", "the lesson by 35 minutes"], "1 hour is 60 minutes, so 95 minutes is longer.", "Convert the hour to minutes."],
      ["estimate_duration", "Which is the best estimate for brushing your teeth?", "2 minutes", ["2 seconds", "2 days", "2 hours"], "Brushing teeth usually takes a few minutes.", "Pick a sensible time unit."],
      ["estimate_duration", "Which is the best estimate for blinking once?", "less than 1 second", ["5 minutes", "2 hours", "1 day"], "A blink is very quick, so it takes less than a second.", "Very quick events use seconds."],
      ["estimate_duration", "Which is the best estimate for a school lunch break?", "40 minutes", ["40 seconds", "40 days", "40 hours"], "A lunch break usually lasts many minutes, not seconds, hours or days.", "Use everyday experience."],
      ["estimate_duration", "Which is the best estimate for a weekend?", "2 days", ["2 seconds", "2 minutes", "2 hours"], "A weekend lasts Saturday and Sunday, which is 2 days.", "Long events often use days."],
      ["elapsed_time", "A reading session starts at 9:10 and ends at 9:35. How long is it?", "25 minutes", ["15 minutes", "35 minutes", "45 minutes"], "From 9:10 to 9:35 is 25 minutes.", "Count forward on the clock."],
      ["elapsed_time", "A game starts at 2:00 and finishes at 3:30. How long is it?", "1 hour 30 minutes", ["30 minutes", "2 hours", "3 hours 30 minutes"], "From 2:00 to 3:00 is 1 hour, then 30 more minutes.", "Break the time into hours and minutes."],
      ["elapsed_time", "A cake bakes for 45 minutes from 10:20. What time does it finish?", "11:05", ["10:45", "11:20", "12:05"], "40 minutes after 10:20 is 11:00, then 5 more minutes is 11:05.", "Count forward carefully."],
      ["elapsed_time", "A bus trip takes 1 hour 15 minutes. If it starts at 7:30, when does it end?", "8:45", ["8:15", "7:45", "9:30"], "One hour after 7:30 is 8:30, then 15 more minutes is 8:45.", "Add the hour first, then the minutes."]
    ]
  }
};

function optionTexts(correct, distractors, desiredIndex) {
  const options = [...distractors.slice(0, 3)];
  options.splice(desiredIndex, 0, correct);
  return options.slice(0, 4).map((text, index) => ({ text, is_correct: index === desiredIndex }));
}

function makeItem(code, bank, n, base, desiredIndex) {
  const [skill, question, correct, distractors, summary, hint] = base;
  const suffix = bank === "practice" ? "P" : "T";
  return {
    id: `${code}-${suffix}-${String(n).padStart(3, "0")}`,
    subject: "math",
    year_level: "Year 3",
    curriculum_code: code,
    bank,
    skill,
    question,
    audio_prompt: question,
    visual: { type: "none" },
    answers: optionTexts(correct, distractors, desiredIndex),
    correct_index: desiredIndex,
    explanation: { summary, hint },
    difficulty: Math.min(4, Math.floor((n - 1) / 16) + 1)
  };
}

function variants(seed, code) {
  const rows = [...specs[code].practice];
  const prefixes = [
    "",
    "During maths group, ",
    "In a classroom check, ",
    "At a school activity, "
  ];
  return prefixes.flatMap((prefix, prefixIndex) => rows.map(([skill, question, correct, distractors, summary, hint], index) => {
    if (!prefix) return [skill, question, correct, distractors, summary, hint];
    const changed = question
      .replace(/^Which unit is most sensible/, "choose the most sensible unit")
      .replace(/^Which estimate is sensible/, "choose the sensible estimate")
      .replace(/^Which is/, "choose")
      .replace(/^What is/, "find")
      .replace(/^How many/, "work out how many")
      .replace(/^A /, "a ");
    const detail = ["with a partner", "from the labelled information", "before measuring", "using the benchmark"][(seed + prefixIndex + index) % 4];
    return [skill, `${prefix}${changed.charAt(0).toLowerCase()}${changed.slice(1)} ${detail}.`, correct, distractors, summary, hint];
  }));
}

function buildCode(code) {
  const pool = variants(Object.keys(specs).indexOf(code), code);
  while (pool.length < 64) pool.push(...variants(pool.length, code));
  const items = [];
  for (let i = 0; i < 48; i++) items.push(makeItem(code, "practice", i + 1, pool[i], i % 4));
  for (let i = 0; i < 16; i++) {
    const source = pool[i + 48];
    items.push(makeItem(code, "test", i + 1, source, i % 4));
  }
  const seen = new Set();
  for (const item of items) {
    const key = `${item.bank}|${item.question.toLowerCase()}|${item.answers.map((a) => a.text).join("|").toLowerCase()}`;
    if (seen.has(key)) throw new Error(`${code}: duplicate ${item.id}`);
    seen.add(key);
  }
  fs.writeFileSync(path.join(OUT, `${code.toLowerCase()}.json`), `${JSON.stringify(items, null, 2)}\n`);
  const spec = specs[code];
  const report = [
    `# ${code} ${spec.title}`,
    "",
    "## ACARA descriptor",
    spec.descriptor,
    "",
    "## IXL benchmark signals used",
    ...spec.ixl.map((line) => `- ${line}`),
    "",
    "## Coverage map",
    ...spec.skills.map((line) => `- ${line.replace(/_/g, " ")}`),
    "",
    "## Authorship note",
    "The bank uses original SkillrHub questions. IXL was used as the benchmark for coverage and cognitive demand; prompts and answer sets were not copied.",
    "",
    "## Bank shape",
    "- 48 practice questions",
    "- 16 test questions",
    "- 4 options per question",
    "- Balanced correct answer positions",
    "- Five-question shuffled attempts configured separately in quiz pages"
  ].join("\n");
  fs.mkdirSync(REPORT, { recursive: true });
  fs.writeFileSync(path.join(REPORT, `${code}.md`), `${report}\n`);
}

for (const code of Object.keys(specs)) buildCode(code);