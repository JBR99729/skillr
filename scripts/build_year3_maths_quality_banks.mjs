import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BANK_ROOT = path.join(ROOT, "assets", "assessment-banks", "year3", "math");
const VISUAL_ROOT = path.join(ROOT, "assets", "assessment-visuals", "year3", "math");

const context = { window: {} };
vm.createContext(context);
for (const file of ["assets/year3-maths-data-base.js", "assets/year3-maths-data-n1.js", "assets/year3-maths-data-n2.js", "assets/year3-maths-data-n3.js", "assets/year3-maths-data-a.js", "assets/year3-maths-data-m1.js", "assets/year3-maths-data-m2.js", "assets/year3-maths-data-sp.js", "assets/year3-maths-data-st.js", "assets/year3-maths-data-p.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
}
const UNITS = context.window.SkillrYear3MathsData;
const CODES = Object.keys(UNITS).sort();

const CONTEXTS = {
  AC9M3A01: ["At the bead table", "On the number steps", "With the shell cards", "At the block station", "In the flag game"],
  AC9M3A02: ["In the shell game", "At the ten-frame table", "With the number cards", "During the bird count", "At the sticker station"],
  AC9M3A03: ["At the sock table", "With the bike cards", "In the counter game", "At the doubles station", "During the pair challenge"],
  AC9M3M01: ["At the art table", "In the reading corner", "At the water station", "In the lunch area", "At the science table"],
  AC9M3M02: ["At lunch", "At the paper table", "With a fruit bar", "In the garden", "At the playdough table"],
  AC9M3M03: ["On the class calendar", "For library week", "Before the school visit", "For sports week", "On the camp calendar"],
  AC9M3M04: ["Before recess", "At reading time", "Before lunch", "At sport time", "At home time"],
  AC9M3M05: ["In the robot game", "On the playground", "At the dance station", "With an arrow card", "In the direction challenge"],
  AC9M3M06: ["At the class shop", "At the market stall", "During the book fair", "At the canteen", "In the savings challenge"],
  AC9M3N01: ["With base-ten blocks", "On the class number line", "In the number-card game", "At the counting table", "In the place-value challenge"],
  AC9M3N02: ["At the trading station", "With base-ten blocks", "In the place-value game", "At the number table", "During the regrouping challenge"],
  AC9M3N03: ["With a pizza", "With a wrap", "With a melon", "With a cake", "With a pancake"],
  AC9M3N04: ["At the sticker table", "In the class shop", "During the pencil count", "In the playground story", "At the number-line station"],
  AC9M3N05: ["With the counter groups", "At the biscuit table", "In the array game", "At the sharing station", "With the marble bags"],
  AC9M3N06: ["In the class shop", "At the toy stall", "During the fruit order", "At the crayon table", "In the school-fair challenge"],
  AC9M3N07: ["In the robot lab", "At the number station", "During the coding game", "At the class shop", "In the pathway challenge"],
  AC9M3SP01: ["At the shape table", "In the block corner", "With the shape cards", "During the sorting game", "At the art station"],
  AC9M3SP02: ["On the classroom map", "On the playground map", "In the robot grid", "On the library map", "In the treasure-map challenge"],
  AC9M3ST01: ["In the fruit survey", "In the travel survey", "In the playground survey", "In the pet survey", "In the story survey"],
  AC9M3ST02: ["On the fruit graph", "On the pet graph", "On the games graph", "On the weather graph", "On the books graph"]
  ,AC9M3ST03: ["In the garden survey", "During the travel survey", "In the reading survey", "During the playground survey", "In the recycling survey"],
  AC9M3P01: ["In the spinner game", "At the weather station", "With a number cube", "In the marble game", "At the chance table"],
  AC9M3P02: ["During the coin trial", "In the spinner trial", "With the colour bag", "During the number-cube trial", "In the class chance experiment"]
};

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clean = (value) => String(value).replace(/\s+/g, " ").trim();
const ordinal = (n) => `${n}${n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th"}`;

function draft(question, correct, wrong, summary, hint, visual) {
  const answers = [String(correct), ...wrong.map(String)];
  if (new Set(answers.map((value) => value.toLowerCase())).size !== 3) throw new Error(`Duplicate choices: ${question} :: ${answers.join(" | ")}`);
  return { question: clean(question), correct: String(correct), wrong: wrong.map(String), summary: clean(summary), hint: clean(hint), visual };
}

function itemFor(code, source, sourceIndex) {
  const bank = sourceIndex < 24 ? "practice" : "test";
  const bankIndex = bank === "practice" ? sourceIndex : sourceIndex - 24;
  const correctIndex = (bankIndex + CODES.indexOf(code)) % 3;
  const ordered = [...source.wrong];
  ordered.splice(correctIndex, 0, source.correct);
  const sequence = String(bankIndex + 1).padStart(3, "0");
  const id = `${code}-${bank === "practice" ? "P" : "T"}-${sequence}`;
  const visualId = id.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const contextLead = CONTEXTS[code][Math.floor(sourceIndex / 8)];
  const contextualQuestion = `${contextLead}, ${source.question.charAt(0).toLowerCase()}${source.question.slice(1)}`;
  return {
    id,
    subject: "math",
    year_level: "Year 3",
    curriculum_code: code,
    bank,
    skill: source.visual.skill,
    question: contextualQuestion,
    audio_prompt: contextualQuestion,
    visual: {
      type: "svg",
      asset_path: `/assets/assessment-visuals/year3/math/${code.toLowerCase()}.svg#${visualId}`,
      alt_text: `${contextLead}: ${source.visual.alt}`
    },
    answers: ordered.map((text, index) => ({ text, is_correct: index === correctIndex })),
    correct_index: correctIndex,
    explanation: { summary: source.summary, hint: source.hint },
    _visual_id: visualId,
    _visual_model: source.visual
  };
}

function textLines(value, max = 34) {
  const words = clean(value).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > max && line) { lines.push(line); line = word; }
    else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function label(value, x, y, options = {}) {
  const lines = textLines(value, options.max || 34);
  const size = options.size || 22;
  const weight = options.weight || 700;
  const anchor = options.anchor || "middle";
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${options.fill || "#17324d"}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? size + 4 : 0}">${esc(line)}</tspan>`).join("")}</text>`;
}

function circles(count, x, y, colour = "#14b8a6", radius = 13, perRow = 10) {
  return Array.from({ length: Math.min(count, 30) }, (_, index) => {
    const cx = x + (index % perRow) * (radius * 2 + 7);
    const cy = y + Math.floor(index / perRow) * (radius * 2 + 7);
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${colour}" stroke="#0f766e" stroke-width="2"/>`;
  }).join("");
}

function visualBody(model) {
  const kind = model.kind;
  if (kind === "numberline") {
    const ticks = Array.from({ length: 6 }, (_, i) => {
      const x = 95 + i * 90;
      const value = Math.round(model.start + ((model.end - model.start) * i) / 5);
      return `<line x1="${x}" y1="125" x2="${x}" y2="151" stroke="#17324d" stroke-width="3"/>${label(value, x, 181, { size: 18 })}`;
    }).join("");
    const ratio = (model.mark - model.start) / (model.end - model.start);
    const mx = Math.max(95, Math.min(545, 95 + ratio * 450));
    return `${label(model.caption || "Use the number line", 320, 48, { size: 24 })}<line x1="95" y1="138" x2="545" y2="138" stroke="#17324d" stroke-width="5"/>${ticks}<path d="M ${mx} 82 L ${mx - 13} 107 L ${mx + 13} 107 Z" fill="#f97316"/>${label(model.markLabel ?? "?", mx, 72, { size: 20, fill: "#b45309" })}`;
  }
  if (kind === "blocks") {
    const h = model.h || 0, t = model.t || 0, o = model.o || 0;
    const hundreds = Array.from({ length: Math.min(h, 9) }, (_, i) => `<rect x="${85 + (i % 3) * 55}" y="${80 + Math.floor(i / 3) * 55}" width="46" height="46" rx="5" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>`).join("");
    const tens = Array.from({ length: Math.min(t, 12) }, (_, i) => `<rect x="${285 + (i % 4) * 25}" y="${78 + Math.floor(i / 4) * 55}" width="17" height="48" rx="4" fill="#5eead4" stroke="#0f766e" stroke-width="2"/>`).join("");
    const ones = circles(Math.min(o, 20), 462, 92, "#fde68a", 9, 5);
    return `${label(model.caption || "Hundreds, tens and ones", 320, 43, { size: 24 })}${hundreds}${tens}${ones}${label(`${h} hundreds`, 150, 258, { size: 18 })}${label(`${t} tens`, 335, 258, { size: 18 })}${label(`${o} ones`, 500, 258, { size: 18 })}`;
  }
  if (kind === "groups") {
    const groups = model.groups || 2, each = model.each || 2;
    const width = Math.min(115, 460 / groups);
    let out = label(model.caption || "Equal groups", 320, 42, { size: 24 });
    for (let g = 0; g < groups; g++) {
      const x = 75 + g * (width + 8);
      out += `<rect x="${x}" y="72" width="${width}" height="145" rx="18" fill="#ecfeff" stroke="#0891b2" stroke-width="3"/>`;
      const perRow = each > 4 ? 3 : 2;
      out += circles(each, x + 25, 105, g % 2 ? "#fbbf24" : "#34d399", 11, perRow);
    }
    return `${out}${label(model.footer || `${groups} equal groups of ${each}`, 320, 264, { size: 20 })}`;
  }
  if (kind === "fraction") {
    const parts = model.parts || 2, shaded = model.shaded ?? 1;
    const width = 440 / parts;
    const pieces = Array.from({ length: parts }, (_, i) => `<rect x="${100 + i * width}" y="90" width="${width}" height="110" fill="${i < shaded ? "#2dd4bf" : "#eff6ff"}" stroke="#1d4ed8" stroke-width="3"/>`).join("");
    return `${label(model.caption || "Equal parts of one whole", 320, 48, { size: 24 })}${pieces}${label(`${shaded} of ${parts} equal parts shaded`, 320, 246, { size: 20 })}`;
  }
  if (kind === "clock") {
    const minuteAngle = (model.minute || 0) * 6 - 90;
    const hourAngle = ((model.hour % 12) + (model.minute || 0) / 60) * 30 - 90;
    const point = (angle, length) => [320 + Math.cos((angle * Math.PI) / 180) * length, 150 + Math.sin((angle * Math.PI) / 180) * length];
    const [mx, my] = point(minuteAngle, 88), [hx, hy] = point(hourAngle, 60);
    const numbers = Array.from({ length: 12 }, (_, i) => {
      const angle = ((i + 1) * 30 - 90) * Math.PI / 180;
      return label(i + 1, 320 + Math.cos(angle) * 108, 156 + Math.sin(angle) * 108, { size: 16 });
    }).join("");
    return `<circle cx="320" cy="150" r="125" fill="#fff" stroke="#2563eb" stroke-width="6"/>${numbers}<line x1="320" y1="150" x2="${hx}" y2="${hy}" stroke="#17324d" stroke-width="8" stroke-linecap="round"/><line x1="320" y1="150" x2="${mx}" y2="${my}" stroke="#f97316" stroke-width="5" stroke-linecap="round"/><circle cx="320" cy="150" r="8" fill="#17324d"/>`;
  }
  if (kind === "calendar") {
    let out = `${label(model.month || "Class calendar", 320, 30, { size: 22 })}<rect x="105" y="44" width="430" height="220" rx="12" fill="#fff" stroke="#2563eb" stroke-width="3"/>`;
    for (let i = 0; i < 21; i++) {
      const x = 125 + (i % 7) * 59, y = 78 + Math.floor(i / 7) * 72;
      const date = (model.first || 1) + i;
      const active = date === model.start || date === model.end;
      out += `<rect x="${x - 20}" y="${y - 23}" width="43" height="46" rx="8" fill="${active ? "#fef3c7" : "#eff6ff"}" stroke="${active ? "#f59e0b" : "#bfdbfe"}" stroke-width="2"/>${label(date, x + 1, y + 6, { size: 17 })}`;
    }
    return out;
  }
  if (kind === "turn") {
    const dirs = { north: [320, 62], east: [480, 150], south: [320, 238], west: [160, 150] };
    const [tx, ty] = dirs[model.to] || dirs.north;
    return `${label(model.caption || "Follow the turn", 320, 40, { size: 24 })}<circle cx="320" cy="150" r="105" fill="#eff6ff" stroke="#2563eb" stroke-width="4"/><path d="M320 150 L${tx} ${ty}" stroke="#f97316" stroke-width="13" stroke-linecap="round"/><path d="M${tx} ${ty} l${model.to === "east" ? -22 : model.to === "west" ? 22 : -14} ${model.to === "south" ? -25 : model.to === "north" ? 25 : -14} l${model.to === "east" || model.to === "west" ? 0 : 28} ${model.to === "east" ? 28 : model.to === "west" ? -28 : 0} Z" fill="#f97316"/>${label("N", 320, 81, { size: 18 })}${label("E", 458, 157, { size: 18 })}${label("S", 320, 232, { size: 18 })}${label("W", 182, 157, { size: 18 })}`;
  }
  if (kind === "measure") {
    const a = model.a || 4, b = model.b || 6;
    return `${label(model.caption || "Compare the measures", 320, 42, { size: 24 })}<rect x="90" y="105" width="${a * 35}" height="42" rx="8" fill="#60a5fa"/><rect x="90" y="188" width="${b * 35}" height="42" rx="8" fill="#34d399"/>${label(model.left || `${a} units`, 545, 135, { size: 18 })}${label(model.right || `${b} units`, 545, 218, { size: 18 })}`;
  }
  if (kind === "shapes") {
    const shape = (name, x, colour) => {
      if (name === "triangle") return `<polygon points="${x},75 ${x - 55},195 ${x + 55},195" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      if (name === "circle") return `<circle cx="${x}" cy="140" r="60" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      if (name === "pentagon") return `<polygon points="${x},70 ${x + 62},115 ${x + 38},195 ${x - 38},195 ${x - 62},115" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      if (name === "hexagon") return `<polygon points="${x - 52},90 ${x + 18},70 ${x + 65},120 ${x + 48},190 ${x - 20},207 ${x - 67},157" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      if (name === "octagon") return `<polygon points="${x - 36},72 ${x + 36},72 ${x + 66},102 ${x + 66},174 ${x + 36},204 ${x - 36},204 ${x - 66},174 ${x - 66},102" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      if (name === "square") return `<rect x="${x - 58}" y="82" width="116" height="116" rx="3" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
      return `<rect x="${x - 60}" y="82" width="120" height="116" rx="${name === "rounded" ? 35 : 3}" fill="${colour}" stroke="#17324d" stroke-width="3"/>`;
    };
    const names = model.names || ["triangle", "rectangle", "circle"];
    return `${label(model.caption || "Look at the shapes", 320, 38, { size: 24 })}${shape(names[0], 140, "#fde68a")}${shape(names[1], 320, "#93c5fd")}${shape(names[2], 500, "#99f6e4")}${names.map((name, i) => label(model.labels?.[i] || name, 140 + i * 180, 245, { size: 17 })).join("")}`;
  }
  if (kind === "map") {
    let grid = "";
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) grid += `<rect x="${145 + c * 70}" y="35" width="70" height="55" transform="translate(0 ${r * 55})" fill="${(r + c) % 2 ? "#eff6ff" : "#dbeafe"}" stroke="#93c5fd"/>`;
    const sx = 180 + (model.startCol || 0) * 70, sy = 62 + (model.startRow || 0) * 55;
    const ex = 180 + (model.endCol || 2) * 70, ey = 62 + (model.endRow || 2) * 55;
    return `${grid}<circle cx="${sx}" cy="${sy}" r="16" fill="#f97316"/>${label("START", sx, sy - 24, { size: 13, fill: "#9a3412" })}<path d="M${sx} ${sy} L${ex} ${ey}" stroke="#0f766e" stroke-width="8" stroke-dasharray="10 8"/><path d="M${ex - 10} ${ey - 12} L${ex + 13} ${ey} L${ex - 10} ${ey + 12} Z" fill="#0f766e"/>`;
  }
  if (kind === "data") {
    const cats = model.categories || ["A", "B", "C"];
    const counts = model.counts || [3, 5, 2];
    const colours = ["#60a5fa", "#34d399", "#fbbf24"];
    return `${label(model.caption || "Read the data", 320, 36, { size: 24 })}<line x1="95" y1="230" x2="560" y2="230" stroke="#17324d" stroke-width="3"/>${counts.map((count, i) => `<rect x="${130 + i * 145}" y="${230 - count * 22}" width="72" height="${count * 22}" rx="6" fill="${colours[i]}"/>${label(cats[i], 166 + i * 145, 260, { size: 16 })}${label(count, 166 + i * 145, 218 - count * 22, { size: 17 })}`).join("")}`;
  }
  if (kind === "solids") {
    const shape = model.shape || "cube";
    const cube = `<path d="M205 85 L330 55 L435 105 L310 140 Z M205 85 L205 205 L310 255 L310 140 M310 140 L435 105 L435 220 L310 255" fill="#dbeafe" stroke="#1d4ed8" stroke-width="4"/>`;
    const cylinder = `<ellipse cx="320" cy="82" rx="105" ry="35" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="4"/><path d="M215 82 V215 C215 260 425 260 425 215 V82" fill="#dbeafe" stroke="#1d4ed8" stroke-width="4"/><ellipse cx="320" cy="215" rx="105" ry="35" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="4"/>`;
    const cone = `<ellipse cx="320" cy="225" rx="110" ry="34" fill="#fde68a" stroke="#b45309" stroke-width="4"/><path d="M210 225 L320 48 L430 225" fill="#fef3c7" stroke="#b45309" stroke-width="4"/>`;
    const sphere = `<circle cx="320" cy="148" r="105" fill="#ccfbf1" stroke="#0f766e" stroke-width="4"/><ellipse cx="320" cy="148" rx="105" ry="35" fill="none" stroke="#0f766e" stroke-width="3" stroke-dasharray="8 7"/><path d="M320 43 C260 90 260 205 320 253 M320 43 C380 90 380 205 320 253" fill="none" stroke="#0f766e" stroke-width="3"/>`;
    return `${label(model.caption || "Classify the object",320,28,{size:22})}${shape === "cylinder" ? cylinder : shape === "cone" ? cone : shape === "sphere" ? sphere : cube}${label(model.footer || shape,320,286,{size:18})}`;
  }
  return `${label(model.caption || "Look at the model", 320, 50, { size: 24 })}<rect x="95" y="85" width="450" height="120" rx="18" fill="#eff6ff" stroke="#60a5fa" stroke-width="3"/>${label(model.display || "Use the information shown", 320, 135, { size: 27, max: 30 })}${model.footer ? label(model.footer, 320, 250, { size: 18 }) : ""}`;
}

function renderSprite(items) {
  const symbols = items.map((item) => `<symbol id="${item._visual_id}" viewBox="0 0 640 300"><rect width="640" height="300" rx="18" fill="#f8fbff"/>${visualBody(item._visual_model)}</symbol>`).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n${symbols}\n</svg>\n`;
}

function model(kind, skill, alt, values = {}) { return { kind, skill, alt, ...values }; }

function numberOptions(value, delta = 1) {
  const values = [Math.max(0, value - delta), value + delta];
  return values.map(String);
}

function buildA01(i) {
  const s = Math.floor(i / 8), t = i % 8, names = ["bead", "step", "shell", "block", "flag"];
  const start = 3 + s * 4, step = 2 + (s % 4), down = 32 + s * 5;
  if (t === 0) return draft(`The ${names[s]} pattern is ${start}, ${start + step}, ${start + 2 * step}, __. What comes next?`, start + 3 * step, numberOptions(start + 3 * step, step), `The pattern adds ${step} each time, so the next number is ${start + 3 * step}.`, `Check the jump between each pair of numbers.`, model("default", "continue_additive_pattern", `${start}, ${start + step}, ${start + 2 * step}, then a blank.`, { display: `${start}  →  ${start + step}  →  ${start + 2 * step}  →  ?`, caption: "Find the next number" }));
  if (t === 1) return draft(`What number is missing? ${start}, __, ${start + 2 * step}, ${start + 3 * step}.`, start + step, [start + step - 1, start + 2 * step], `Every number increases by ${step}. The missing number is ${start + step}.`, `Start at ${start} and add ${step}.`, model("default", "find_missing_pattern_term", `${start}, blank, ${start + 2 * step}, ${start + 3 * step}.`, { display: `${start}  →  ?  →  ${start + 2 * step}  →  ${start + 3 * step}`, caption: "Fill the gap" }));
  if (t === 2) return draft(`What is the rule for ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}?`, `Add ${step}`, [`Add ${step + 1}`, `Take away ${step}`], `Each term is ${step} more than the one before it.`, `Work out one jump, then check the other jumps.`, model("default", "describe_additive_rule", `A number pattern that rises by ${step} each step.`, { display: `+${step}     +${step}     +${step}`, footer: `${start}   ${start + step}   ${start + 2 * step}   ${start + 3 * step}`, caption: "Name the rule" }));
  if (t === 3) return draft(`The countdown is ${down}, ${down - step}, ${down - 2 * step}, __. What comes next?`, down - 3 * step, [down - 3 * step + 1, down - 2 * step + step], `The pattern takes away ${step} each time, so ${down - 3 * step} comes next.`, `Check how much each number decreases.`, model("default", "continue_decreasing_pattern", `${down}, ${down - step}, ${down - 2 * step}, then a blank.`, { display: `${down}  →  ${down - step}  →  ${down - 2 * step}  →  ?`, caption: "Continue the countdown" }));
  if (t === 4) return draft(`Which pattern adds ${step} every time?`, `${start}, ${start + step}, ${start + 2 * step}`, [`${start}, ${start + step}, ${start + 2 * step + 1}`, `${start}, ${start - step}, ${start - 2 * step}`], `Only ${start}, ${start + step}, ${start + 2 * step} has the same +${step} jump each time.`, `Check both jumps in every choice.`, model("default", "identify_constant_change", `Three number patterns to compare for a constant increase of ${step}.`, { display: `Which row keeps the same jump?`, footer: `Look for +${step}, then +${step} again.`, caption: "Compare the patterns" }));
  if (t === 5) return draft(`A pattern starts at ${start + 1} and adds ${step}. Which number is the third term?`, start + 1 + 2 * step, [start + 1 + step, start + 1 + 3 * step], `The terms are ${start + 1}, ${start + 1 + step}, ${start + 1 + 2 * step}.`, `The starting number is the first term. Add ${step} twice.`, model("default", "generate_additive_pattern", `Start at ${start + 1} and make two jumps of ${step}.`, { display: `${start + 1}  →  ?  →  ?`, footer: `Each jump is +${step}`, caption: "Build the pattern" }));
  if (t === 6) return draft(`Which number does not belong in ${start}, ${start + step}, ${start + 2 * step + 1}, ${start + 3 * step}?`, start + 2 * step + 1, [start + step, start + 3 * step], `${start + 2 * step + 1} breaks the add-${step} rule. It should be ${start + 2 * step}.`, `Predict each term using the rule.`, model("default", "identify_pattern_error", `A pattern with one number that breaks the constant rule.`, { display: `${start}  →  ${start + step}  →  ${start + 2 * step + 1}  →  ${start + 3 * step}`, caption: "Spot the pattern mistake" }));
  return draft(`The shape pattern has ${2 + s}, ${4 + s}, ${6 + s} dots. It grows by the same amount. How many dots come next?`, 8 + s, [7 + s, 9 + s], `The number of dots grows by 2, so ${8 + s} dots come next.`, `Count how many new dots are added each time.`, model("data", "connect_shape_and_number_patterns", `Three dot groups containing ${2 + s}, ${4 + s} and ${6 + s} dots, growing by 2.`, { categories: ["step 1", "step 2", "step 3"], counts: [2 + s, 4 + s, 6 + s], caption: "The dot groups grow by 2" }));
}

function buildA02(i) {
  const s = Math.floor(i / 8), t = i % 8;
  const a = 4 + s, b = 5 + (s % 3), whole = a + b, near = 8 + (s % 2), add = 4 + s;
  if (t === 0) return draft(`What is ${a} + ${b}?`, whole, numberOptions(whole), `${a} and ${b} make ${whole}.`, `Start with ${a} and count on ${b}.`, model("groups", "recall_addition_facts", `${a} counters beside ${b} counters.`, { groups: 2, each: Math.max(a, b), footer: `${a} + ${b}`, caption: "Join the two parts" }));
  if (t === 1) return draft(`What is ${whole} − ${a}?`, b, [a, b + 1], `${whole} has parts ${a} and ${b}, so ${whole} − ${a} = ${b}.`, `Think: ${a} plus what makes ${whole}?`, model("default", "use_related_subtraction", `Part-part-whole model with ${a} and a missing part making ${whole}.`, { display: `${a}  +  ?  =  ${whole}`, caption: "Find the missing part" }));
  if (t === 2) return draft(`Which subtraction fact belongs with ${a} + ${b} = ${whole}?`, `${whole} − ${a} = ${b}`, [`${whole} − ${b} = ${whole - b + 1}`, `${a} − ${b} = ${Math.abs(a - b)}`], `The same whole and parts make ${whole} − ${a} = ${b}.`, `The largest number is the whole. Start subtraction with it.`, model("default", "connect_fact_family", `Fact triangle with parts ${a} and ${b}, and whole ${whole}.`, { display: `${a}      ${b}`, footer: `whole: ${whole}`, caption: "Use the same fact family" }));
  if (t === 3) return draft(`Use make ten. What is ${near} + ${add}?`, near + add, [10 + add, near + add - 1], `${near} needs ${10 - near} to make 10. Add the rest to get ${near + add}.`, `Move ${10 - near} from ${add} to make 10 first.`, model("default", "use_make_ten", `A make-ten model for ${near} plus ${add}.`, { display: `${near} + ${10 - near} = 10`, footer: `Then add the part left over.`, caption: "Make 10 first" }));
  if (t === 4) return draft(`You know ${a} + ${a} = ${2 * a}. What is ${a} + ${a + 1}?`, 2 * a + 1, [2 * a, 2 * a + 2], `${a} + ${a + 1} is one more than the double ${a} + ${a}.`, `Use the double, then add one.`, model("groups", "use_near_doubles", `Two groups: one has ${a} counters and one has ${a + 1}.`, { groups: 2, each: a, footer: `double ${a}, then one more`, caption: "Use a near double" }));
  if (t === 5) return draft(`Which fact helps you solve ${whole} − ${b}?`, `${b} + ${a} = ${whole}`, [`${b} + ${whole} = ${b + whole}`, `${whole} + ${a} = ${whole + a}`], `The related addition fact is ${b} + ${a} = ${whole}.`, `Use the same two parts and whole.`, model("default", "choose_related_fact", `A whole of ${whole} split into ${b} and ${a}.`, { display: `${b} + ${a} = ${whole}`, caption: "Think addition to subtract" }));
  if (t === 6) return draft(`Mia has ${a} shells and finds ${b} more. How many shells does she have now?`, whole, [Math.abs(a - b), whole + 1], `The shells join, so ${a} + ${b} = ${whole}.`, `The word “more” tells you to join the groups.`, model("groups", "apply_addition_fact", `${a} shells and ${b} more shells shown in two groups.`, { groups: 2, each: Math.max(a, b), footer: `${a} shells + ${b} shells`, caption: "How many altogether?" }));
  return draft(`There are ${whole + 3} birds. ${b} fly away. How many birds stay?`, whole + 3 - b, [whole + 3 + b, whole + 3 - b - 1], `The birds leave, so ${whole + 3} − ${b} = ${whole + 3 - b}.`, `Start with all the birds and take away the ones that flew away.`, model("default", "apply_subtraction_fact", `${whole + 3} birds with ${b} shown flying away.`, { display: `${whole + 3}  −  ${b}  =  ?`, caption: "Take away the birds that leave" }));
}

function buildA03(i) {
  const s = Math.floor(i / 8), t = i % 8, n = 3 + s, even = 10 + s * 2;
  if (t === 0) return draft(`How many counters are in ${n} pairs?`, n * 2, [n, n * 2 + 2], `${n} pairs means ${n} groups of 2, so there are ${n * 2}.`, `Skip-count by twos ${n} times.`, model("groups", "multiply_by_two", `${n} equal groups with 2 counters in each group.`, { groups: n, each: 2, footer: `${n} groups of 2`, caption: "Count the pairs" }));
  if (t === 1) return draft(`What is double ${n + 2}?`, (n + 2) * 2, [n + 2, (n + 2) * 2 - 1], `Double means two equal groups. ${n + 2} + ${n + 2} = ${(n + 2) * 2}.`, `Say the number twice, then add.`, model("groups", "double_number", `Two equal groups of ${n + 2} counters.`, { groups: 2, each: n + 2, footer: `${n + 2} + ${n + 2}`, caption: "Double means two equal parts" }));
  if (t === 2) return draft(`What is half of ${even}?`, even / 2, [even - 2, even / 2 + 1], `Half means split ${even} into 2 equal groups. Each group has ${even / 2}.`, `Share one at a time into two groups.`, model("groups", "halve_even_number", `${even} counters shared equally between 2 groups.`, { groups: 2, each: even / 2, footer: `${even} shared into 2 equal groups`, caption: "Find one half" }));
  if (t === 3) return draft(`Which division fact matches ${n} × 2 = ${n * 2}?`, `${n * 2} ÷ 2 = ${n}`, [`${n * 2} ÷ ${n} = ${n}`, `${n * 2} − 2 = ${n * 2 - 2}`], `${n * 2} shared into 2 equal groups gives ${n} in each group.`, `Use the total ${n * 2}, then divide it into 2 groups.`, model("default", "connect_twos_and_division", `A fact family showing ${n}, 2 and ${n * 2}.`, { display: `${n} × 2 = ${n * 2}`, footer: `${n * 2} ÷ 2 = ?`, caption: "Use the related fact" }));
  if (t === 4) return draft(`Count by twos: ${2 + s * 2}, ${4 + s * 2}, ${6 + s * 2}, ${8 + s * 2}, __. What comes next?`, 10 + s * 2, [9 + s * 2, 12 + s * 2], `Counting by twos adds 2. After ${8 + s * 2} comes ${10 + s * 2}.`, `Say the next even number.`, model("default", "skip_count_by_two", `An even-number sequence ending with a blank.`, { display: `${2 + s * 2} → ${4 + s * 2} → ${6 + s * 2} → ${8 + s * 2} → ?`, caption: "Skip-count by twos" }));
  if (t === 5) return draft(`${even} socks make pairs. How many pairs are there?`, even / 2, [even, even / 2 + 2], `Each pair uses 2 socks, so ${even} ÷ 2 = ${even / 2} pairs.`, `Circle the socks two at a time.`, model("groups", "make_pairs", `${even} socks arranged as ${even / 2} pairs.`, { groups: Math.min(even / 2, 6), each: 2, footer: `${even} socks grouped in twos`, caption: "Make equal pairs" }));
  if (t === 6) return draft(`There are ${n + 1} bikes. Each bike has 2 wheels. How many wheels are there?`, (n + 1) * 2, [n + 1, (n + 1) * 2 + 1], `${n + 1} groups of 2 wheels make ${(n + 1) * 2} wheels.`, `Draw 2 wheels for each bike, then count them.`, model("groups", "solve_twos_context", `${n + 1} bikes represented by groups of 2 wheels.`, { groups: n + 1, each: 2, footer: `${n + 1} bikes × 2 wheels`, caption: "Count all the wheels" }));
  return draft(`Which shows half of ${even + 2}?`, `${(even + 2) / 2} and ${(even + 2) / 2}`, [`${even / 2} and ${even / 2 + 2}`, `${even + 2} and ${even + 2}`], `Two equal parts of ${(even + 2) / 2} make ${even + 2}.`, `Halves must be equal and join to make the whole.`, model("groups", "recognise_equal_halves", `${even + 2} counters shown in two equal groups.`, { groups: 2, each: (even + 2) / 2, footer: `two equal groups make ${even + 2}`, caption: "Choose the equal split" }));
}

function buildM01(i) {
  const s = Math.floor(i / 8), t = i % 8, a = 4 + s, b = 7 + s;
  if (t === 0) return draft(`A pencil is ${a} paperclips long. A brush is ${b} paperclips long. Which is longer?`, "The brush", ["The pencil", "They are the same length"], `The brush measures ${b} paperclips and the pencil measures ${a}. ${b} is greater than ${a}.`, `Compare the number of equal paperclips.`, model("measure", "compare_length", `A pencil measuring ${a} paperclips and a brush measuring ${b} paperclips.`, { a, b, left: `pencil: ${a}`, right: `brush: ${b}`, caption: "Compare with equal units" }));
  if (t === 1) return draft(`Which is the fair way to measure a book with blocks?`, "Use equal blocks with no gaps", ["Use big and small blocks together", "Leave gaps between the blocks"], `Equal blocks placed end to end give a fair measure.`, `Check that every unit is the same size and touches the next one.`, model("default", "measure_with_uniform_units", `Equal blocks placed end to end along a book with no gaps or overlaps.`, { display: "▣ ▣ ▣ ▣ ▣", footer: "same size • no gaps • no overlaps", caption: "Measure fairly" }));
  if (t === 2) return draft(`A jug holds ${b} cups. A bottle holds ${a} cups. Which holds more?`, "The jug", ["The bottle", "They hold the same amount"], `The jug holds ${b} cups, which is more than ${a} cups.`, `Capacity tells how much a container can hold. Compare the cup counts.`, model("measure", "compare_capacity", `A jug labelled ${b} cups and a bottle labelled ${a} cups.`, { a, b, left: `bottle: ${a} cups`, right: `jug: ${b} cups`, caption: "Which container holds more?" }));
  if (t === 3) return draft(`A lunchbox balances with ${b} cubes. An apple balances with ${a} cubes. Which is heavier?`, "The lunchbox", ["The apple", "They have the same mass"], `The lunchbox needs ${b} equal cubes to balance, so it has more mass than the apple with ${a}.`, `The heavier object balances with more of the same cubes.`, model("measure", "compare_mass", `A lunchbox with a mass of ${b} cubes and an apple with a mass of ${a} cubes.`, { a, b, left: `apple: ${a} cubes`, right: `lunchbox: ${b} cubes`, caption: "Compare mass" }));
  if (t === 4) return draft(`You need to measure a tiny button. Which unit will give the most accurate answer?`, "Small beads", ["Large books", "A mix of beads and books"], `Small equal beads fit the tiny length more closely.`, `Choose a unit that is smaller than the object and can repeat without gaps.`, model("default", "choose_informal_unit", `A tiny button beside small beads and large books.`, { display: "button   • • •", footer: "Small equal units fit closely.", caption: "Choose a useful unit" }));
  if (t === 5) return draft(`Sam measures a ribbon as ${b} cubes. Lee measures the same ribbon as ${b + 3} tiny counters. Why are the numbers different?`, "The units are different sizes", ["The ribbon changed length", "Lee counted backwards"], `Smaller units are needed more times, so the count can be larger.`, `The object stays the same. Compare the size of each measuring unit.`, model("measure", "explain_unit_size", `The same ribbon measured with ${b} large cubes and ${b + 3} small counters.`, { a: b, b: b + 3, left: `${b} large cubes`, right: `${b + 3} small counters`, caption: "Same ribbon, different units" }));
  if (t === 6) return draft(`Which tool helps compare how heavy two classroom objects are?`, "A balance scale", ["A calendar", "A measuring cup"], `A balance scale compares mass by showing which side is heavier.`, `Think about a tool with two sides that can tip.`, model("default", "select_mass_tool", `A balance scale with one object on each side.`, { display: "⚖", footer: "The lower side has more mass.", caption: "Compare how heavy" }));
  return draft(`A row of ${a} tiles has one gap between two tiles. Is ${a} tiles a fair length measure?`, "No, the gap makes it unfair", ["Yes, gaps do not matter", "Yes, because all tiles are colourful"], `A gap leaves part of the length unmeasured, so the result is not fair.`, `Units must touch end to end.`, model("default", "identify_measurement_error", `A row of equal tiles with a visible gap between the middle tiles.`, { display: "▣ ▣     ▣ ▣", footer: "A gap leaves space unmeasured.", caption: "Spot the measuring mistake" }));
}

function buildM02(i) {
  const s = Math.floor(i / 8), t = i % 8, contexts = ["sandwich", "paper square", "fruit bar", "garden bed", "playdough slab"], thing = contexts[s];
  if (t === 0) return draft(`Which picture would show one half of the ${thing}?`, "1 of 2 equal parts shaded", ["1 of 3 equal parts shaded", "1 of 2 unequal parts shaded"], `One half is one of 2 equal parts of the same whole.`, `Check the number of parts and whether they are equal.`, model("fraction", "recognise_half_in_measure", `One ${thing} divided into 2 equal parts with 1 part shaded.`, { parts: 2, shaded: 1, caption: `One half of the ${thing}` }));
  if (t === 1) return draft(`The ${thing} is cut into 4 equal pieces. What is one piece called?`, "One quarter", ["One half", "One eighth"], `One of 4 equal parts is one quarter.`, `The fraction name tells how many equal parts make the whole.`, model("fraction", "recognise_quarter_in_measure", `One ${thing} divided into 4 equal parts with 1 part shaded.`, { parts: 4, shaded: 1, caption: `One quarter of the ${thing}` }));
  if (t === 2) return draft(`How many eighths make one whole ${thing}?`, "8", ["4", "2"], `Eight one-eighth parts join to make one whole.`, `Count all the equal pieces in the whole.`, model("fraction", "compose_eighths", `One ${thing} divided into 8 equal parts.`, { parts: 8, shaded: 8, caption: "Eight eighths make a whole" }));
  if (t === 3) return draft(`Which is smaller: one quarter or one eighth of the same ${thing}?`, "One eighth", ["One quarter", "They are the same size"], `When the same whole is split into more equal parts, each part is smaller.`, `Compare 4 equal cuts with 8 equal cuts.`, model("fraction", "compare_fraction_units", `The same-size ${thing} shown once in quarters and once in eighths.`, { parts: 8, shaded: 1, caption: "More equal parts make smaller pieces" }));
  if (t === 4) return draft(`A timer shows half an hour. How many equal half-hours make one hour?`, "2", ["4", "8"], `Two half-hours join to make one whole hour.`, `Think of an hour split into 2 equal time parts.`, model("fraction", "connect_fraction_to_time", `One hour bar divided into 2 equal half-hour parts.`, { parts: 2, shaded: 1, caption: "Half of one hour" }));
  if (t === 5) return draft(`A full turn is split into 4 equal turns. What is each turn?`, "A quarter turn", ["A half turn", "An eighth turn"], `Four equal quarter turns make one full turn.`, `The whole turn is divided into 4 equal parts.`, model("turn", "connect_fraction_to_turn", `An arrow making one quarter of a full turn from north to east.`, { to: "east", caption: "One of four equal turns" }));
  if (t === 6) return draft(`Which sharing shows quarters of one ${thing}?`, "4 equal shares", ["4 different-sized shares", "2 equal shares"], `Quarters must be 4 equal parts of one whole.`, `Count the shares, then check they are equal.`, model("fraction", "identify_equal_quarters", `One ${thing} divided into 4 equal sections.`, { parts: 4, shaded: 2, caption: "Four equal shares" }));
  return draft(`The ${thing} is folded in half, then in half again, then in half again. How many equal parts are made?`, "8", ["6", "4"], `Repeated halving makes 2, then 4, then 8 equal parts.`, `Double the number of parts after every fold.`, model("fraction", "make_eighths_by_halving", `One ${thing} divided into 8 equal parts after three halvings.`, { parts: 8, shaded: 4, caption: "Half, half again, half again" }));
}

function buildM03(i) {
  const s = Math.floor(i / 8), t = i % 8, start = 2 + s * 2, gaps = 3 + (s % 4), end = start + gaps;
  if (t === 0) return draft(`The class visit is on the ${ordinal(start)}. What date is one week later?`, ordinal(start + 7), [ordinal(start + 6), ordinal(start + 8)], `One week is 7 days, so ${start} + 7 = ${start + 7}.`, `Move down one full week on the calendar.`, model("calendar", "find_date_one_week_later", `Calendar with the ${ordinal(start)} and ${ordinal(start + 7)} highlighted one week apart.`, { first: 1, start, end: start + 7, month: "One week later" }));
  if (t === 1) return draft(`How many days are between the ${ordinal(start)} and the ${ordinal(end)}?`, gaps, [gaps + 1, gaps - 1], `Count the jumps after the ${ordinal(start)}: there are ${gaps} days to the ${ordinal(end)}.`, `Do not count the starting date as a jump.`, model("calendar", "count_days_between_dates", `Calendar with the ${ordinal(start)} and ${ordinal(end)} highlighted.`, { first: 1, start, end, month: "Count the days between" }));
  if (t === 2) return draft(`Today is Monday. What day is ${gaps} days later?`, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][gaps % 7], [["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(gaps - 1) % 7], ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"][gaps % 7]], `Move forward ${gaps} day${gaps === 1 ? "" : "s"} from Monday.`, `Use one jump for each day.`, model("default", "move_forward_on_week", `A row of weekday cards starting on Monday with ${gaps} forward jumps.`, { display: `Monday  +  ${gaps} days`, footer: "Count each jump once.", caption: "Move through the week" }));
  if (t === 3) return draft(`Which is a date?`, `${ordinal(end)} of May`, ["Thursday", "After lunch"], `A date gives a number and a month: ${ordinal(end)} of May.`, `A day name is not a full date.`, model("calendar", "distinguish_date_and_day", `May calendar with the ${ordinal(end)} highlighted.`, { first: 1, start: end, end, month: "May" }));
  if (t === 4) return draft(`The library day is the ${ordinal(start)}. Sports day is ${gaps} days later. What is the sports date?`, ordinal(end), [ordinal(end + 1), ordinal(start + gaps - 1)], `Starting after the ${ordinal(start)}, count ${gaps} jumps to reach the ${ordinal(end)}.`, `Put your finger on the start, then move once for each day.`, model("calendar", "solve_calendar_event_problem", `Calendar with library day on the ${ordinal(start)} and sports day on the ${ordinal(end)}.`, { first: 1, start, end, month: "Class events" }));
  if (t === 5) return draft(`Which method correctly counts days from the ${ordinal(start)} to the ${ordinal(end)}?`, `Start after the ${ordinal(start)} and count ${gaps} jumps`, [`Count the ${ordinal(start)} as jump 1`, `Count backwards from the ${ordinal(start)}`], `Days between dates are counted as jumps after the starting date.`, `Trace the spaces from one date to the next.`, model("calendar", "choose_calendar_counting_method", `Calendar showing ${gaps} jumps between two highlighted dates.`, { first: 1, start, end, month: "Count jumps, not boxes" }));
  if (t === 6) return draft(`A camp starts on the ${ordinal(start + 7)}. What date was one week before?`, ordinal(start), [ordinal(start + 1), ordinal(start + 6)], `One week before means move back 7 days, to the ${ordinal(start)}.`, `Move up one row on the calendar.`, model("calendar", "find_date_one_week_before", `Calendar with two dates one week apart, ending on the ${ordinal(start + 7)}.`, { first: 1, start, end: start + 7, month: "One week before" }));
  return draft(`The ${ordinal(end)} is a Friday. What day is the ${ordinal(end + 1)}?`, "Saturday", ["Thursday", "Friday"], `The day after Friday is Saturday.`, `Move one day forward in the weekday order.`, model("calendar", "identify_next_calendar_day", `Two neighbouring calendar dates, the ${ordinal(end)} and ${ordinal(end + 1)}.`, { first: Math.max(1, end - 5), start: end, end: end + 1, month: "Neighbouring dates" }));
}

function timeName(hour, minute) {
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 30) return `half past ${hour}`;
  return `quarter to ${hour === 12 ? 1 : hour + 1}`;
}

function buildM04(i) {
  const s = Math.floor(i / 8), t = i % 8, hour = 2 + s, minutes = [0, 15, 30, 45];
  if (t < 4) {
    const minute = minutes[t], correct = timeName(hour, minute);
    const wrong = minute === 0 ? [`half past ${hour}`, `quarter past ${hour}`] : minute === 15 ? [`quarter to ${hour}`, `half past ${hour}`] : minute === 30 ? [`${hour} o'clock`, `quarter to ${hour}`] : [`quarter past ${hour}`, `quarter to ${hour}`];
    const handClue = minute === 0 ? `The minute hand points to 12 and the hour hand points to ${hour}. What time is shown?` : minute === 15 ? `The minute hand points to 3 and the hour hand is just past ${hour}. What time is shown?` : minute === 30 ? `The minute hand points to 6 and the hour hand is halfway past ${hour}. What time is shown?` : `The minute hand points to 9 and the hour hand is nearing ${hour + 1}. What time is shown?`;
    return draft(handClue, correct, wrong, `The minute hand shows ${minute === 0 ? "o'clock" : minute === 15 ? "quarter past" : minute === 30 ? "half past" : "quarter to"}, so the time is ${correct}.`, `Check the long minute hand first, then the short hour hand.`, model("clock", "read_analog_time", `Analog clock showing ${correct}.`, { hour, minute }));
  }
  if (t === 4) return draft(`Where does the minute hand point at half past ${hour}?`, "6", ["3", "12"], `At half past, 30 minutes have passed, so the minute hand points to 6.`, `Halfway around the clock face lands on 6.`, model("clock", "locate_half_hour_minute_hand", `Analog clock showing half past ${hour}, with the minute hand on 6.`, { hour, minute: 30 }));
  if (t === 5) return draft(`Where does the minute hand point at quarter past ${hour}?`, "3", ["6", "9"], `A quarter of the way around the clock is 15 minutes, at the 3.`, `Start at 12 and move one quarter-turn clockwise.`, model("clock", "locate_quarter_past_hand", `Analog clock showing quarter past ${hour}, with the minute hand on 3.`, { hour, minute: 15 }));
  if (t === 6) return draft(`The minute hand points to 9 and the hour hand is nearly at ${hour + 1}. What time is it?`, `quarter to ${hour + 1}`, [`quarter past ${hour}`, `half past ${hour}`], `The 9 means quarter to the next hour, which is ${hour + 1}.`, `When the minute hand is on 9, name the hour that is coming next.`, model("clock", "read_quarter_to", `Analog clock showing quarter to ${hour + 1}.`, { hour, minute: 45 }));
  return draft(`Which clock hand tells whether it is o'clock, half past or quarter past?`, "The minute hand", ["The hour hand only", "The second hand"], `The long minute hand shows how far the hour has passed.`, `Look for the hand that points to 12, 3, 6 or 9 for these times.`, model("clock", "distinguish_clock_hands", `Analog clock with a long minute hand and a shorter hour hand.`, { hour, minute: 15 }));
}

function buildM05(i) {
  const s = Math.floor(i / 8), t = i % 8, starts = ["north", "east", "south", "west"], start = starts[s % 4];
  const quarter = { north: "east", east: "south", south: "west", west: "north" }[start];
  const half = { north: "south", east: "west", south: "north", west: "east" }[start];
  const anti = { north: "west", west: "south", south: "east", east: "north" }[start];
  if (t === 0) return draft(`An arrow faces ${start}. After a clockwise quarter turn, where does it face?`, quarter, [half, anti], `A clockwise quarter turn moves one direction around: ${start} to ${quarter}.`, `Move one step clockwise around north, east, south and west.`, model("turn", "follow_quarter_turn", `Arrow starts facing ${start} and turns clockwise to face ${quarter}.`, { to: quarter, caption: `Quarter turn from ${start}` }));
  if (t === 1) return draft(`An arrow faces ${start}. After a half turn, where does it face?`, half, [start, quarter], `A half turn faces the opposite direction, so ${start} becomes ${half}.`, `A half turn is two quarter turns.`, model("turn", "follow_half_turn", `Arrow after a half turn from ${start}, facing ${half}.`, { to: half, caption: `Half turn from ${start}` }));
  if (t === 2) return draft(`An arrow faces ${start}. After a full turn, where does it face?`, start, [quarter, half], `A full turn goes all the way around and ends facing ${start} again.`, `Spin once and notice the starting and finishing direction match.`, model("turn", "follow_full_turn", `Arrow completes a full turn and faces ${start} again.`, { to: start, caption: "A full turn returns to the start" }));
  if (t === 3) return draft(`Which turn makes an object face the opposite way?`, "A half turn", ["A quarter turn", "A full turn"], `A half turn is 180 degrees and points in the opposite direction.`, `Think of turning from north to south.`, model("turn", "identify_half_turn", `Arrow facing the opposite direction after a half turn.`, { to: half, caption: "Opposite direction" }));
  if (t === 4) return draft(`How many quarter turns make a full turn?`, "4", ["2", "3"], `Four equal quarter turns go all the way around.`, `Count the four directions around a compass.`, model("turn", "compose_full_turn", `Four quarter-turn arrows moving around a full circle.`, { to: start, caption: "Four quarters make one full turn" }));
  if (t === 5) return draft(`A three-quarter clockwise turn from ${start} ends facing which direction?`, anti, [quarter, half], `Three clockwise quarter turns from ${start} finish at ${anti}.`, `Move clockwise three steps, one direction at a time.`, model("turn", "follow_three_quarter_turn", `Arrow after three clockwise quarter turns from ${start}, facing ${anti}.`, { to: anti, caption: `Three-quarter turn from ${start}` }));
  if (t === 6) return draft(`A robot turns from ${start} to ${quarter}. Which is the shortest turn?`, "A clockwise quarter turn", ["A half turn", "A full turn"], `${quarter} is one clockwise quarter turn from ${start}.`, `Choose the turn that reaches the new direction in one step.`, model("turn", "choose_shortest_turn", `Robot arrow changing from ${start} to ${quarter}.`, { to: quarter, caption: "Choose the shortest turn" }));
  return draft(`Which instruction describes three quarter turns?`, "Turn quarter, quarter, quarter", ["Turn quarter, quarter", "Turn all the way around"], `Three quarter turns are three equal one-quarter rotations.`, `Count exactly three quarter-turn actions.`, model("turn", "describe_three_quarter_turn", `Three quarter-turn steps shown around a circle.`, { to: anti, caption: "Three equal turn steps" }));
}

function buildN01(i) {
  const s = Math.floor(i / 8), t = i % 8, h = 2 + s, tens = 3 + (s % 4), ones = 4 + (s % 5), n = h * 100 + tens * 10 + ones;
  if (t === 0) return draft(`Which number has ${h} hundreds, ${tens} tens and ${ones} ones?`, n, [h * 100 + ones * 10 + tens, h * 100 + tens + ones], `${h} hundreds, ${tens} tens and ${ones} ones make ${n}.`, `Write the hundreds digit, then tens, then ones.`, model("blocks", "represent_three_digit_number", `${h} hundred blocks, ${tens} ten rods and ${ones} one counters representing ${n}.`, { h, t: tens, o: ones, caption: `Build ${n}` }));
  if (t === 1) return draft(`What is ${n} in expanded form?`, `${h * 100} + ${tens * 10} + ${ones}`, [`${h * 100} + ${ones * 10} + ${tens}`, `${h * 10} + ${tens} + ${ones}`], `The digits show ${h * 100}, ${tens * 10} and ${ones}.`, `Use the place of each digit to find its value.`, model("blocks", "write_expanded_form", `Place-value blocks for ${n}: ${h} hundreds, ${tens} tens and ${ones} ones.`, { h, t: tens, o: ones, caption: "Write each place value" }));
  if (t === 2) { const other = h * 100 + (tens + 1) * 10 + Math.max(0, ones - 2); return draft(`Which number is greater: ${n} or ${other}?`, other, [n, "They are equal"], `Both have ${h} hundreds. ${other} has more tens, so it is greater.`, `Compare hundreds first, then tens, then ones.`, model("default", "compare_three_digit_numbers", `The numerals ${n} and ${other} shown in place-value columns.`, { display: `${n}      ${other}`, footer: "Compare H, then T, then O.", caption: "Which number is greater?" })); }
  if (t === 3) { const start = h * 100, end = (h + 1) * 100, mark = start + 50; return draft(`Which number belongs halfway between ${start} and ${end}?`, mark, [start + 5, end - 10], `${mark} is ${50} more than ${start} and ${50} less than ${end}.`, `Half of 100 is 50.`, model("numberline", "locate_number_on_number_line", `Number line from ${start} to ${end} with a midpoint marker.`, { start, end, mark, markLabel: "?", caption: "Find the halfway number" })); }
  if (t === 4) { const nums = [n, n + 30, n - 100]; const sorted = [...nums].sort((a,b)=>a-b).join(", "); return draft(`Put these numbers from smallest to largest: ${nums.join(", ")}.`, sorted, [[...nums].sort((a,b)=>b-a).join(", "), `${n}, ${n - 100}, ${n + 30}`], `Compare the hundreds first. The order is ${sorted}.`, `Find the number with the fewest hundreds first.`, model("default", "order_three_digit_numbers", `Cards labelled ${nums.join(", ")} ready to be ordered.`, { display: nums.join("     "), footer: "smallest → largest", caption: "Order the number cards" })); }
  if (t === 5) return draft(`What is 10 more than ${n}?`, n + 10, [n + 1, n + 100], `Adding 10 increases the tens place by 1: ${n} becomes ${n + 10}.`, `Keep the hundreds and ones the same.`, model("numberline", "find_ten_more", `Number line showing a jump of 10 from ${n} to a missing number.`, { start: n - 20, end: n + 30, mark: n + 10, markLabel: "?", caption: `Jump 10 from ${n}` }));
  if (t === 6) return draft(`What does the 0 mean in ${h}0${ones}?`, "There are no tens", ["There are no hundreds", "There are no ones"], `The 0 is in the tens place, so the number has no tens.`, `Read the place-value columns: hundreds, tens, ones.`, model("blocks", "interpret_zero_digit", `${h} hundred blocks, no ten rods and ${ones} ones for ${h}0${ones}.`, { h, t: 0, o: ones, caption: `The zero in ${h}0${ones}` }));
  return draft(`Which numeral matches “${h} hundred and ${ones}”?`, `${h}0${ones}`, [`${h}${ones}0`, `${h}${ones}`], `With no tens, a zero keeps the tens place: ${h}0${ones}.`, `Leave a zero in the tens column.`, model("blocks", "read_three_digit_number", `${h} hundreds, zero tens and ${ones} ones.`, { h, t: 0, o: ones, caption: "Read the place-value model" }));
}

function buildN02(i) {
  const s = Math.floor(i / 8), t = i % 8, h = 2 + s, tens = 3 + (s % 4), ones = 5 + (s % 4), n = h * 100 + tens * 10 + ones;
  if (t === 0) return draft(`Which partition equals ${n}?`, `${h * 100} + ${tens * 10} + ${ones}`, [`${h * 100} + ${ones * 10} + ${tens}`, `${h * 100} + ${tens} + ${ones}`], `${n} has ${h} hundreds, ${tens} tens and ${ones} ones.`, `Read each digit by its place.`, model("blocks", "partition_standard_form", `Base-ten model of ${n} with ${h} hundreds, ${tens} tens and ${ones} ones.`, { h, t: tens, o: ones, caption: `Partition ${n}` }));
  if (t === 1) return draft(`Trade 1 ten for ones. How many ones is that?`, "10 ones", ["1 one", "100 ones"], `One ten has the same value as 10 ones.`, `Count the unit squares in a ten rod.`, model("blocks", "regroup_ten_as_ones", `One ten rod beside 10 one counters of equal total value.`, { h: 0, t: 1, o: 10, caption: "One ten equals ten ones" }));
  if (t === 2) return draft(`Which is another way to make ${n}?`, `${h - 1} hundreds + ${tens + 10} tens + ${ones} ones`, [`${h - 1} hundreds + ${tens + 1} tens + ${ones} ones`, `${h} hundreds + ${tens} tens + ${ones + 10} ones`], `Regrouping 1 hundred as 10 tens keeps the total at ${n}.`, `Take one hundred away and add ten tens.`, model("blocks", "rename_hundred_as_tens", `${n} represented after one hundred is traded for 10 tens.`, { h: h - 1, t: tens + 10, o: ones, caption: "Rename without changing value" }));
  if (t === 3) { const z = h * 100 + ones; return draft(`What does the 0 mean in ${z}?`, "0 tens", ["0 hundreds", "0 ones"], `The zero sits in the tens place, so ${z} has 0 tens.`, `Name the columns from left to right: hundreds, tens, ones.`, model("blocks", "explain_zero_placeholder", `${h} hundred blocks, no tens and ${ones} ones representing ${z}.`, { h, t: 0, o: ones, caption: `Zero keeps the tens place` })); }
  if (t === 4) return draft(`Is ${h * 100 + (tens - 1) * 10 + (ones + 10)} the same value as ${n}?`, "Yes", ["No, it is 10 more", "No, it is 10 less"], `One ten was traded for 10 ones, so the total value stays ${n}.`, `Compare the parts after regrouping, not just the number of pieces.`, model("blocks", "verify_nonstandard_partition", `A regrouped model with ${h} hundreds, ${tens - 1} tens and ${ones + 10} ones.`, { h, t: tens - 1, o: ones + 10, caption: "Does the value stay the same?" }));
  if (t === 5) return draft(`How many tens are in ${tens * 10 + ones} if all the ones stay separate?`, tens, [tens + 1, ones], `${tens * 10 + ones} has ${tens} full tens and ${ones} ones.`, `Group the amount into tens before counting leftover ones.`, model("blocks", "identify_tens_in_number", `${tens} ten rods and ${ones} one counters.`, { h: 0, t: tens, o: ones, caption: "Count the full tens" }));
  if (t === 6) return draft(`Which regrouping is not equal to ${n}?`, `${h} hundreds + ${tens - 1} tens + ${ones} ones`, [`${h} hundreds + ${tens - 1} tens + ${ones + 10} ones`, `${h - 1} hundreds + ${tens + 10} tens + ${ones} ones`], `Taking away a ten without adding 10 ones makes the value 10 less.`, `Every trade must exchange equal value.`, model("default", "identify_invalid_regrouping", `Three place-value regroupings for ${n}, including one that loses a ten.`, { display: `${n}  =  ${h}H ${tens}T ${ones}O`, footer: "A fair trade keeps the total.", caption: "Spot the incorrect regrouping" }));
  return draft(`Which number is ${h} hundreds and ${tens * 10 + ones} ones?`, n, [h * 100 + tens + ones, (h + 1) * 100 + tens * 10 + ones], `${tens * 10 + ones} ones regroup as ${tens} tens and ${ones} ones, making ${n}.`, `Make groups of 10 from the ones.`, model("blocks", "rename_nonstandard_grouping", `${h} hundreds and ${tens * 10 + ones} ones regrouped to show ${n}.`, { h, t: tens, o: ones, caption: "Regroup the ones into tens" }));
}

function buildN03(i) {
  const s = Math.floor(i / 8), t = i % 8, food = ["pizza", "wrap", "melon", "cake", "pancake"][s];
  if (t === 0) return draft(`Which picture shows one half of the ${food}?`, "1 of 2 equal parts shaded", ["1 of 2 unequal parts shaded", "1 of 4 equal parts shaded"], `One half is one of 2 equal parts of the whole ${food}.`, `Check that there are exactly 2 equal parts.`, model("fraction", "recognise_one_half", `One ${food} divided into 2 equal parts with one part shaded.`, { parts: 2, shaded: 1, caption: `One half of the ${food}` }));
  if (t === 1) return draft(`A whole ${food} is split into 4 equal parts. What is each part?`, "One quarter", ["One half", "One eighth"], `One of 4 equal parts is called one quarter.`, `Use the number of equal parts to name the fraction.`, model("fraction", "recognise_one_quarter", `One ${food} divided into 4 equal parts.`, { parts: 4, shaded: 1, caption: "One of four equal parts" }));
  if (t === 2) return draft(`How can you make quarters from halves of the ${food}?`, "Halve each half again", ["Join the two halves", "Make the halves different sizes"], `Halving each half makes 4 equal quarters.`, `Start with 2 parts, then split both parts equally.`, model("fraction", "connect_halves_and_quarters", `One ${food} first halved, then each half split again to make quarters.`, { parts: 4, shaded: 2, caption: "Halve each half" }));
  if (t === 3) return draft(`How can you make eighths from quarters of the ${food}?`, "Halve each quarter", ["Join two quarters", "Remove one quarter"], `Halving each of 4 quarters makes 8 equal eighths.`, `Doubling the number of equal parts makes smaller pieces.`, model("fraction", "connect_quarters_and_eighths", `One ${food} divided into 8 equal pieces after every quarter is halved.`, { parts: 8, shaded: 4, caption: "Halve every quarter" }));
  if (t === 4) return draft(`Which piece is larger when the whole ${food} is the same size?`, "One half", ["One eighth", "They are the same size"], `A half is one of 2 equal parts; an eighth is one of 8 smaller equal parts.`, `Fewer equal parts means each part is larger.`, model("fraction", "compare_half_and_eighth", `Same-size wholes divided into halves and eighths.`, { parts: 8, shaded: 4, caption: "Four eighths equal one half" }));
  if (t === 5) return draft(`Four pieces of the ${food} are different sizes. Can they be called quarters?`, "No, quarters must be equal", ["Yes, because there are 4 pieces", "Yes, if one piece is very large"], `Four pieces are quarters only when all 4 parts are equal.`, `Counting pieces is not enough; compare their sizes.`, model("default", "identify_unequal_fraction_parts", `One ${food} divided into four visibly unequal pieces.`, { display: "small | LARGE | tiny | medium", footer: "Four pieces are not always quarters.", caption: "Are the parts equal?" }));
  if (t === 6) return draft(`How many quarters have the same amount as one half?`, "2 quarters", ["1 quarter", "4 quarters"], `Two quarters join to make one half of the same whole.`, `Look at 4 equal parts and shade 2 of them.`, model("fraction", "equate_half_and_two_quarters", `A whole divided into 4 equal parts with 2 shaded, showing one half.`, { parts: 4, shaded: 2, caption: "Two quarters make one half" }));
  return draft(`How many eighths have the same amount as one quarter?`, "2 eighths", ["1 eighth", "4 eighths"], `Two eighths join to make one quarter of the same whole.`, `Each quarter is split into 2 eighths.`, model("fraction", "equate_quarter_and_two_eighths", `A whole divided into 8 equal parts with 2 shaded, showing one quarter.`, { parts: 8, shaded: 2, caption: "Two eighths make one quarter" }));
}

function buildN04(i) {
  const s = Math.floor(i / 8), t = i % 8, a = 24 + s * 7, b = 13 + s * 2;
  if (t === 0) return draft(`What is ${a} + ${b}?`, a + b, [a + b - 10, a + b + 1], `Add tens and ones: ${a} + ${b} = ${a + b}.`, `Partition both numbers into tens and ones.`, model("default", "add_two_digit_numbers", `Part-part-whole model for ${a} plus ${b}.`, { display: `${a}  +  ${b}  =  ?`, caption: "Join the two amounts" }));
  if (t === 1) return draft(`What is ${a + b + 8} − ${b}?`, a + 8, [a + b + 8, a + 7], `Take away ${b}: ${a + b + 8} − ${b} = ${a + 8}.`, `Subtract the tens, then the ones.`, model("default", "subtract_two_digit_numbers", `Number sentence ${a + b + 8} minus ${b}.`, { display: `${a + b + 8}  −  ${b}  =  ?`, caption: "Find what remains" }));
  if (t === 2) { const x = 28 + s * 4, y = 16 + s; return draft(`Use partitioning. What is ${x} + ${y}?`, x + y, [x + y - 10, x + y + 10], `${x} + ${y} = ${Math.floor(x/10)*10} + ${Math.floor(y/10)*10} + ${(x%10)+(y%10)} = ${x + y}.`, `Add the tens, add the ones, then combine.`, model("default", "partition_to_add", `Partitioned addition showing tens and ones for ${x} and ${y}.`, { display: `${Math.floor(x/10)*10} + ${x%10}   and   ${Math.floor(y/10)*10} + ${y%10}`, footer: "Add tens, then ones.", caption: "Partition the numbers" })); }
  if (t === 3) { const x = 42 + s * 5, y = 18 + s; return draft(`There are ${x} stickers. ${y} are used. How many are left?`, x - y, [x + y, x - y + 10], `The stickers are taken away, so ${x} − ${y} = ${x - y}.`, `Start with the whole and subtract the used part.`, model("default", "solve_take_away_problem", `${x} stickers with ${y} crossed out as used.`, { display: `${x}  −  ${y}  =  ?`, caption: "How many are left?" })); }
  if (t === 4) { const part = 17 + s, whole = 48 + s * 3; return draft(`${part} children are inside. There are ${whole} children altogether. How many are outside?`, whole - part, [whole + part, whole - part - 1], `The missing part is ${whole} − ${part} = ${whole - part}.`, `Use whole minus known part.`, model("default", "find_missing_part", `Part-part-whole model with whole ${whole}, known part ${part} and a missing part.`, { display: `${part} + ? = ${whole}`, caption: "Find the missing part" })); }
  if (t === 5) return draft(`Which number sentence checks ${a + b} − ${b} = ${a}?`, `${a} + ${b} = ${a + b}`, [`${a} − ${b} = ${Math.abs(a-b)}`, `${a + b} + ${b} = ${a + 2*b}`], `Addition checks subtraction by joining the two parts back to the whole.`, `Use the answer and the amount taken away.`, model("default", "check_with_inverse", `Related addition and subtraction facts using ${a}, ${b} and ${a + b}.`, { display: `${a + b} − ${b} = ${a}`, footer: `${a} + ${b} = ${a + b}`, caption: "Check with the inverse" }));
  if (t === 6) { const x = 39 + s * 4; return draft(`Which is a helpful way to solve ${x} + 19?`, `Add 20, then take away 1`, ["Add 10, then take away 1", "Take away 20, then add 1"], `Because 19 is one less than 20, add 20 then subtract 1.`, `Use a nearby friendly number.`, model("numberline", "use_compensation_strategy", `Number line showing a jump of 20 then one step back from ${x}.`, { start: x, end: x + 25, mark: x + 19, markLabel: x + 19, caption: "+20, then −1" })); }
  return draft(`A box has ${a} red pencils and ${b} blue pencils. How many pencils are there altogether?`, a + b, [a - b, a + b + 10], `Altogether means join the groups: ${a} + ${b} = ${a + b}.`, `Look for whether the story joins or separates amounts.`, model("groups", "solve_joining_problem", `${a} red pencils and ${b} blue pencils in two groups.`, { groups: 2, each: Math.min(8, b), footer: `${a} red + ${b} blue`, caption: "Join the pencil groups" }));
}

function buildN05(i) {
  const s = Math.floor(i / 8), t = i % 8, groups = 2 + s, each = 2 + (s % 3), total = groups * each;
  if (t === 0) return draft(`How many counters are in ${groups} equal groups of ${each}?`, total, [total - 1, total + each], `${groups} groups of ${each} make ${total}.`, `Add ${each} once for each group.`, model("groups", "count_equal_groups", `${groups} equal groups with ${each} counters in each group.`, { groups, each, caption: "Count all the equal groups" }));
  if (t === 1) return draft(`Which repeated addition matches ${groups} groups of ${each}?`, Array(groups).fill(each).join(" + "), [Array(each).fill(groups).join(" + ") + " + 1", `${total} − ${each}`], `Repeat ${each} once for every group: ${Array(groups).fill(each).join(" + ")}.`, `The number in each group is the addend.`, model("groups", "write_repeated_addition", `${groups} equal groups of ${each} counters.`, { groups, each, footer: Array(groups).fill(each).join(" + "), caption: "Write the repeated addition" }));
  if (t === 2) return draft(`${total} counters are shared equally into ${groups} groups. How many go in each group?`, each, [each + 1, Math.max(1, each - 1)], `${total} ÷ ${groups} = ${each}, so each group gets ${each}.`, `Share one counter to every group until none are left.`, model("groups", "share_equally", `${total} counters shared into ${groups} equal groups of ${each}.`, { groups, each, caption: "Share into equal groups" }));
  if (t === 3) return draft(`An array has ${groups} rows with ${each} dots in each row. How many dots are there?`, total, [total - 1, total + groups], `Each of the ${groups} rows has ${each} dots, so there are ${total}.`, `Skip-count by ${each} for every row.`, model("groups", "read_array", `An array with ${groups} rows and ${each} dots in each row.`, { groups, each, footer: `${groups} rows of ${each}`, caption: "Read the array" }));
  if (t === 4) return draft(`Which groups can show multiplication?`, "Groups with the same number in each", ["Groups with different amounts", "One group with no objects"], `Multiplication uses equal groups.`, `Compare every group before you count the total.`, model("groups", "identify_equal_group_model", `Several groups, each containing ${each} counters.`, { groups, each, caption: "Equal groups have equal amounts" }));
  if (t === 5) return draft(`${total + each} biscuits are packed ${each} in each bag. How many bags are needed?`, groups + 1, [groups, groups + 2], `${total + each} divided into groups of ${each} makes ${groups + 1} bags.`, `Circle groups of ${each} and count the circles.`, model("groups", "division_find_number_of_groups", `${total + each} biscuits arranged in groups of ${each}.`, { groups: groups + 1, each, caption: "How many groups?" }));
  if (t === 6) return draft(`Which number sentence matches the model?`, `${groups} × ${each} = ${total}`, [`${groups} + ${each} = ${groups + each}`, `${total} − ${each} = ${total - each}`], `The model has ${groups} equal groups of ${each}, giving ${total}.`, `Count the groups and the amount in each group.`, model("groups", "match_multiplication_sentence", `${groups} equal groups containing ${each} counters each.`, { groups, each, footer: `${groups} groups of ${each}`, caption: "Match the number sentence" }));
  return draft(`Are groups of ${each}, ${each} and ${each + 1} equal groups?`, "No", ["Yes", "Only if they are in a row"], `One group has ${each + 1}, so the groups are not equal.`, `Count every group, not just the first two.`, model("default", "check_equal_groups", `Three groups containing ${each}, ${each}, and ${each + 1} counters.`, { display: `${each} dots   ${each} dots   ${each + 1} dots`, footer: "Every group must match.", caption: "Are the groups equal?" }));
}

function buildN06(i) {
  const s = Math.floor(i / 8), t = i % 8, a = 4 + s, b = 3 + (s % 3), price = 5 + s * 2;
  if (t === 0) return draft(`A notebook costs $${price} and a pen costs $${b}. How much do they cost altogether?`, `$${price + b}`, [`$${price - b}`, `$${price + b + 1}`], `Join the two costs: $${price} + $${b} = $${price + b}.`, `Altogether means add the amounts.`, model("default", "model_money_addition", `A notebook labelled $${price} and a pen labelled $${b}.`, { display: `$${price}  +  $${b}  =  ?`, caption: "Find the total cost" }));
  if (t === 1) { const paid = 20 + s * 5; return draft(`Kai pays $${paid} for a toy that costs $${price + 3}. How much change should Kai get?`, `$${paid - price - 3}`, [`$${paid + price + 3}`, `$${paid - price - 2}`], `Change is the amount left: $${paid} − $${price + 3} = $${paid - price - 3}.`, `Start with the amount paid and subtract the cost.`, model("default", "model_money_change", `A $${paid} payment and a toy price of $${price + 3}.`, { display: `$${paid}  −  $${price + 3}  =  ?`, caption: "Work out the change" })); }
  if (t === 2) return draft(`There are ${a} bags with ${b} apples in each bag. Which operation finds all the apples?`, "Multiplication", ["Subtraction", "Measuring length"], `Equal groups are modelled with multiplication: ${a} groups of ${b}.`, `Ask whether the story has equal groups.`, model("groups", "choose_operation_for_equal_groups", `${a} bags with ${b} apples in every bag.`, { groups: a, each: b, caption: "Choose the operation" }));
  if (t === 3) return draft(`${a * b} crayons are shared equally between ${a} tables. How many crayons does each table get?`, b, [a, a * b - a], `${a * b} ÷ ${a} = ${b}, so every table gets ${b}.`, `Share the crayons one at a time into ${a} equal groups.`, model("groups", "model_equal_sharing", `${a * b} crayons shared into ${a} equal table groups.`, { groups: a, each: b, caption: "Share the crayons fairly" }));
  if (t === 4) return draft(`Lina has ${price} cards and gets ${a} more. Which number sentence models the story?`, `${price} + ${a} = ${price + a}`, [`${price} − ${a} = ${price - a}`, `${price} × ${a} = ${price * a}`], `The cards join, so addition models the story.`, `Look for the action: “gets more” means the amount increases.`, model("default", "represent_additive_situation", `A group of ${price} cards joined by ${a} more cards.`, { display: `${price} cards  +  ${a} cards`, caption: "Choose the matching model" }));
  if (t === 5) { const claimed = a * b + 10; return draft(`A student says ${a} bags of ${b} marbles make ${claimed} marbles. Does that answer make sense?`, "No, the total should be " + a * b, ["Yes, every multiplication answer is large", `No, the total should be ${a + b}`], `${a} equal groups of ${b} make ${a * b}, not ${claimed}.`, `Build or draw the groups to check the answer.`, model("groups", "check_reasonableness", `${a} bags with ${b} marbles in each, compared with a claim of ${claimed}.`, { groups: a, each: b, footer: `Claim: ${claimed} marbles`, caption: "Does the answer fit the model?" })); }
  if (t === 6) return draft(`Which final sentence clearly answers a money problem?`, `The two items cost $${price + b} altogether.`, [`The answer is ${price + b}.`, "I used addition."], `A complete answer includes the number, dollars and what it means in the story.`, `Name the amount and the situation in your final sentence.`, model("default", "communicate_model_solution", `A receipt showing a total of $${price + b}.`, { display: `TOTAL   $${price + b}`, footer: "Say what the number means.", caption: "Write the answer in context" }));
  return draft(`Which is a helpful first step for ${a} boxes with ${b} pencils in each?`, `Draw ${a} equal groups of ${b}`, ["Add every number you see", "Guess a large answer"], `A drawing of the equal groups shows the situation before calculating.`, `Represent the story, then choose the operation.`, model("groups", "select_mathematical_model", `${a} empty group boxes ready for ${b} pencil counters in each.`, { groups: a, each: b, caption: "Model the story first" }));
}

function buildSP01(i) {
  const s = Math.floor(i / 8), t = i % 8;
  const polygons = [["triangle",3],["rectangle",4],["hexagon",6],["pentagon",5],["octagon",8]], [name, sides] = polygons[s];
  if (t === 0) return draft(`Which shape has ${sides} straight sides?`, name, [sides === 3 ? "rectangle" : "triangle", "circle"], `A ${name} has ${sides} straight sides.`, `Trace the boundary and count each straight side once.`, model("shapes", "classify_by_number_of_sides", `A ${name}, a triangle and a circle shown for comparison.`, { names: [name, sides === 3 ? "rectangle" : "triangle", "circle"], caption: `Find the shape with ${sides} sides` }));
  if (t === 1) return draft(`Which shape has no straight sides?`, "circle", ["triangle", "rectangle"], `A circle has one curved boundary and no straight sides.`, `Trace around each shape and feel for straight edges.`, model("shapes", "classify_curved_boundary", `A triangle, rectangle and circle. The circle has a curved boundary.`, { names: ["triangle", "rectangle", "circle"], caption: "Find the curved shape" }));
  if (t === 2) return draft(`A ${name} is turned sideways. What shape is it now?`, name, ["circle", sides === 3 ? "rectangle" : "triangle"], `Turning a shape does not change its sides or corners, so it is still a ${name}.`, `Count the features instead of judging the direction it points.`, model("shapes", "recognise_rotated_shape", `A ${name} shown in a rotated position.`, { names: [name, name, name], labels: ["turned", "turned", "turned"], caption: "A turn does not change the shape" }));
  if (t === 3) return draft(`Which word describes two lines that stay the same distance apart?`, "parallel", ["curved", "opposite"], `Parallel lines remain the same distance apart and do not meet.`, `Think of straight train tracks.`, model("default", "use_parallel_language", `Two straight horizontal lines that remain the same distance apart.`, { display: "────────────\n────────────", footer: "The lines never meet.", caption: "Name the line relationship" }));
  if (t === 4) return draft(`Which sides of a rectangle face each other across the shape?`, "opposite sides", ["curved sides", "one single side"], `Opposite sides are across from each other and do not share a corner.`, `Point to one side, then look directly across the shape.`, model("shapes", "identify_opposite_sides", `A rectangle with its top and bottom opposite sides highlighted.`, { names: ["rectangle", "rectangle", "rectangle"], labels: ["top", "across", "bottom"], caption: "Opposite means across" }));
  if (t === 5) return draft(`Which statement is true about a rectangle?`, "It has 4 straight sides", ["It has 3 straight sides", "It has only a curved boundary"], `A rectangle has 4 straight sides and 4 corners.`, `Count the sides instead of using the shape's size or position.`, model("shapes", "describe_rectangle_features", `A rectangle with four straight sides clearly outlined.`, { names: ["rectangle", "triangle", "circle"], caption: "Describe the rectangle" }));
  if (t === 6) return draft(`Which two shapes belong together because both have 4 straight sides?`, "square and rectangle", ["triangle and circle", "circle and hexagon"], `Both a square and a rectangle have 4 straight sides.`, `Choose one feature and check it on both shapes.`, model("shapes", "classify_shapes_by_shared_feature", `A square, rectangle and circle ready to be sorted by number of straight sides.`, { names: ["square", "rectangle", "circle"], caption: "Sort by the same feature" }));
  return draft(`Why is a circle not in the straight-sided shape group?`, "Its boundary is curved", ["It is too small", "It is facing the wrong way"], `A circle has a curved boundary, unlike polygons with straight sides.`, `Use a visible feature, not colour, size or direction.`, model("shapes", "justify_shape_classification", `A circle beside a group of straight-sided polygons.`, { names: ["circle", "triangle", "rectangle"], caption: "Explain the odd one out" }));
}

function buildSP02(i) {
  const s = Math.floor(i / 8), t = i % 8, sr = s % 2, sc = s % 3;
  if (t === 0) return draft(`The library is above the canteen on the map. Where is the library?`, "above the canteen", ["below the canteen", "inside the canteen"], `The library is higher on the map, so it is above the canteen.`, `Find the canteen first, then look directly higher.`, model("map", "locate_position_using_landmark", `Simple map with the library one grid square above the canteen.`, { startRow: 2, startCol: 2, endRow: 1, endCol: 2 }));
  if (t === 1) return draft(`Start at the orange dot. Move 2 squares right. Where do you finish?`, "2 squares to the right", ["2 squares to the left", "2 squares up"], `Moving right keeps the same row and increases the column by 2.`, `Face the top of the map, then move toward your right hand.`, model("map", "follow_horizontal_path", `Grid map with an orange start dot and a path moving 2 squares right.`, { startRow: sr + 1, startCol: 0, endRow: sr + 1, endCol: 2 }));
  if (t === 2) return draft(`Start at the orange dot. Move 1 square down, then 2 squares right. Which path is correct?`, "down 1, then right 2", ["right 1, then down 2", "up 1, then left 2"], `Directions must be followed in order: down 1 first, then right 2.`, `Do one instruction at a time and mark each stop.`, model("map", "follow_multi_step_path", `Grid map with a path moving down one square and then right two squares.`, { startRow: 0, startCol: sc, endRow: 1, endCol: sc + 2 }));
  if (t === 3) return draft(`The tree is between the slide and the bench. Which object is in the middle?`, "the tree", ["the slide", "the bench"], `Between means in the middle of two landmarks.`, `Name the object with one landmark on each side.`, model("default", "use_between_position_word", `A slide, tree and bench arranged in that order.`, { display: "slide     tree     bench", footer: "The tree has an object on both sides.", caption: "Which object is between?" }));
  if (t === 4) return draft(`What does a classroom map show?`, "where things are from above", ["how heavy the furniture is", "what time the class starts"], `A map is a two-dimensional view that shows positions from above.`, `Imagine looking down at the room from the ceiling.`, model("map", "interpret_map_view", `Top-down classroom map with desks shown as rectangles on a grid.`, { startRow: 1, startCol: 1, endRow: 2, endCol: 3 }));
  if (t === 5) return draft(`Which direction tells someone exactly where to go?`, "Walk 2 squares up to the door", ["Go over there", "Move somewhere near the wall"], `The first direction gives a distance, direction and landmark.`, `A useful direction should tell how far and which way.`, model("map", "choose_precise_direction", `Grid path moving two squares up from a start dot to a door.`, { startRow: 3, startCol: 2, endRow: 1, endCol: 2 }));
  if (t === 6) return draft(`A robot follows: right 1, down 1, right 1. How many squares right of the start does it finish?`, "2", ["1", "3"], `The robot makes two right moves, so it finishes 2 squares to the right.`, `Track horizontal and vertical moves separately.`, model("map", "describe_path_endpoint", `Grid path moving right, down, then right from the start.`, { startRow: 1, startCol: 0, endRow: 2, endCol: 2 }));
  return draft(`Why must map directions be followed in order?`, "A different order can end at a different place", ["The map changes colour", "The landmarks disappear"], `Changing the order can change the pathway and finishing position.`, `Try swapping the first two moves on the grid.`, model("map", "explain_path_order", `Two grid pathways with the same moves in different orders and different routes.`, { startRow: 0, startCol: 1, endRow: 2, endCol: 3 }));
}

function buildST01(i) {
  const s = Math.floor(i / 8), t = i % 8, topics = ["favourite fruit", "way to travel to school", "favourite playground game", "type of pet", "favourite story type"], topic = topics[s];
  const categorySets = [["apples", "bananas", "oranges"], ["walk", "car", "bus"], ["chase", "swings", "ball"], ["cats", "dogs", "fish"], ["funny", "animal", "facts"]];
  const counts = [2 + s, 6 + s, 3 + (s % 2)], categories = categorySets[s];
  if (t === 0) return draft(`Which question would collect data about ${topic}?`, `What is your ${topic}?`, ["How old is the school building?", "Can you draw any picture?"], `The question asks every person for one category about ${topic}.`, `Choose a question whose answers can be sorted into named groups.`, model("data", "ask_categorical_survey_question", `Three category bars ready to record answers about ${topic}.`, { categories, counts, caption: `Survey: ${topic}` }));
  if (t === 1) return draft(`A class records how many books each student read. What kind of data are the whole-number counts?`, "Discrete numerical data", ["Categorical labels", "Continuous length data"], `Book counts are numbers recorded in separate whole-number steps, so they are discrete numerical data.`, `Ask whether values are counted whole numbers or named groups.`, model("data", "recognise_discrete_numerical_data", `A table of whole-number book counts such as ${counts[0]}, ${counts[1]} and ${counts[2]}.`, { categories: ["student 1", "student 2", "student 3"], counts, caption: "Discrete whole-number counts" }));
  if (t === 2) return draft(`Why should each student's answer be counted once?`, "so the totals are accurate", ["so every total is the same", "so the survey has no labels"], `Counting each response once keeps the category totals correct.`, `Imagine what happens if one answer is marked twice.`, model("default", "collect_data_accurately", `A checklist with one tick beside each student's response.`, { display: "✓ one mark per answer", footer: "No missed or double-counted responses.", caption: "Record each response once" }));
  if (t === 3) return draft(`Which table correctly records ${counts[0]} ${categories[0]}, ${counts[1]} ${categories[1]} and ${counts[2]} ${categories[2]}?`, `${categories[0]} ${counts[0]}, ${categories[1]} ${counts[1]}, ${categories[2]} ${counts[2]}`, [`${categories[0]} ${counts[0] + 1}, ${categories[1]} ${counts[1]}, ${categories[2]} ${counts[2]}`, `${categories[0]} ${counts[0]}, ${categories[1]} ${counts[1]}, ${categories[2]} ${counts[2] + 1}`], `Each category is matched to its correct count.`, `Read across one row at a time.`, model("data", "record_categories_in_table", `Data display with ${categories[0]} ${counts[0]}, ${categories[1]} ${counts[1]} and ${categories[2]} ${counts[2]}.`, { categories, counts, caption: "Match each category and count" }));
  if (t === 4) { const correct = categories[counts.indexOf(Math.max(...counts))]; return draft(`Which category has the most responses?`, correct, categories.filter((x)=>x!==correct), `The ${correct} category has the largest count.`, `Compare the heights or the count numbers.`, model("data", "identify_most_frequent_category", `${categories[0]} has ${counts[0]}, ${categories[1]} has ${counts[1]} and ${categories[2]} has ${counts[2]} responses.`, { categories, counts, caption: "Which category has the most?" })); }
  if (t === 5) return draft(`Which categories are clear and do not overlap for a pet survey?`, "cat, dog, fish", ["small, cute, dog", "pet, animal, cat"], `Cat, dog and fish are distinct groups, so each pet has one clear place.`, `Avoid categories where one answer could fit more than one group.`, model("data", "choose_nonoverlapping_categories", `Three labelled boxes: cat, dog and fish.`, { categories: ["cat", "dog", "fish"], counts: [2,3,1], caption: "Use clear categories" }));
  if (t === 6) return draft(`Which method could collect data about birds visiting the playground?`, "observe and tally each bird", ["guess without looking", "measure one desk"], `Observation and tally marks record each bird that visits.`, `Choose a method that directly watches the thing being counted.`, model("default", "select_data_collection_method", `A bird observation sheet with tally marks.`, { display: "birds   ||||  ||", footer: "Watch • tally • total", caption: "Collect data by observation" }));
  return draft(`${categories[0]} has ${counts[0]} responses and ${categories[1]} has ${counts[1]}. How many responses altogether?`, counts[0] + counts[1], [Math.abs(counts[0] - counts[1]), counts[0] + counts[1] + 1], `Add the two category counts: ${counts[0]} + ${counts[1]} = ${counts[0] + counts[1]}.`, `Altogether means combine both counts.`, model("data", "answer_question_from_table", `A data display showing ${categories[0]} with ${counts[0]} and ${categories[1]} with ${counts[1]}.`, { categories: [categories[0], categories[1], ""], counts: [counts[0], counts[1], 0], caption: "Find the combined total" }));
}

function buildST02(i) {
  const s = Math.floor(i / 8), t = i % 8, contexts = ["fruit", "pets", "games", "weather", "books"], topic = contexts[s], counts = [2 + s, 8 + s, 5 + s];
  const cats = [["apples", "bananas", "oranges"], ["cats", "dogs", "fish"], ["chase", "swings", "ball"], ["sunny", "rainy", "cloudy"], ["funny", "animal", "facts"]][s];
  const maxIndex = counts.indexOf(Math.max(...counts)), minIndex = counts.indexOf(Math.min(...counts));
  if (t === 0) return draft(`Which category has the most ${topic} votes?`, cats[maxIndex], cats.filter((_,i)=>i!==maxIndex), `Category ${cats[maxIndex]} has the tallest bar and the greatest count, ${counts[maxIndex]}.`, `Compare the top of each bar.`, model("data", "read_greatest_category_from_graph", `Bar graph for ${topic}: A ${counts[0]}, B ${counts[1]}, C ${counts[2]}.`, { categories: cats, counts, caption: `Read the ${topic} graph` }));
  if (t === 1) return draft(`Which category has the fewest ${topic} votes?`, cats[minIndex], cats.filter((_,i)=>i!==minIndex), `Category ${cats[minIndex]} has the shortest bar and the smallest count, ${counts[minIndex]}.`, `Find the bar that reaches the lowest number.`, model("data", "read_least_category_from_graph", `Bar graph for ${topic}: A ${counts[0]}, B ${counts[1]}, C ${counts[2]}.`, { categories: cats, counts, caption: `Find the smallest ${topic} category` }));
  if (t === 2) return draft(`How many more votes does ${cats[1]} have than ${cats[0]}?`, counts[1] - counts[0], [counts[1] + counts[0], counts[1] - counts[0] + 1], `Find the difference: ${counts[1]} − ${counts[0]} = ${counts[1] - counts[0]}.`, `Start at ${cats[0]}'s height and count up to ${cats[1]}'s height.`, model("data", "compare_graph_categories", `Bar graph with ${cats[0]} at ${counts[0]} and ${cats[1]} at ${counts[1]}.`, { categories: cats, counts, caption: `Compare ${cats[1]} with ${cats[0]}` }));
  if (t === 3) return draft(`What must stay the same when this table is changed into a graph?`, "the category counts", ["the bar colours only", "the order of the alphabet"], `A new display must represent the same data values.`, `Check every graph bar against its table count.`, model("data", "preserve_data_across_displays", `A table and bar graph both showing counts ${counts.join(", ")}.`, { categories: cats, counts, caption: "Same data, different display" }));
  if (t === 4) return draft(`Why does a graph need category labels?`, "to show what each bar represents", ["to make every bar equal", "to change the data totals"], `Labels connect each bar or picture to its category.`, `Without labels, you cannot tell what is being counted.`, model("data", "explain_graph_labels", `A labelled graph for categories A, B and C.`, { categories: cats, counts, caption: "Labels explain each bar" }));
  if (t === 5) return draft(`Which display makes it easy to compare three category counts?`, "a labelled bar graph", ["an unlabelled picture", "a clock face"], `A labelled bar graph places the category amounts side by side.`, `Choose a display where the heights and labels can be compared.`, model("data", "choose_data_display", `A labelled bar graph with three side-by-side bars.`, { categories: cats, counts, caption: "Choose a clear display" }));
  if (t === 6) return draft(`A picture graph uses one star for one vote. How many votes do ${counts[2]} stars show?`, counts[2], [counts[2] + 1, counts[2] * 2], `When one picture equals one vote, ${counts[2]} stars represent ${counts[2]} votes.`, `Check the key before counting the pictures.`, model("default", "interpret_picture_graph_key", `Picture graph key says one star equals one vote, with ${counts[2]} stars shown.`, { display: Array(counts[2]).fill("★").join("  "), footer: "Key: ★ = 1 vote", caption: "Use the picture-graph key" }));
  return draft(`The table says ${cats[0]} has ${counts[0]} votes, but the graph shows ${counts[0] + 1}. What is wrong?`, "the graph count does not match the table", ["the graph uses a blue bar", "the table has a heading"], `The graph must show ${counts[0]} for ${cats[0]}, the same as the source table.`, `Compare one category at a time across both displays.`, model("data", "identify_graph_data_error", `Table shows ${cats[0]} equals ${counts[0]}, while graph shows ${cats[0]} equals ${counts[0] + 1}.`, { categories: cats, counts: [counts[0] + 1, counts[1], counts[2]], caption: "Spot the mismatched count" }));
}

function buildY3N01(i) {
  const s=Math.floor(i/8),t=i%8, a=23040+s*11731, b=a+307+s*41, d=String(a).split("").map(Number);
  const vis=(display,alt,skill)=>model("default",skill,alt,{display,caption:"Use place value"});
  if(t===0)return draft(`Which numeral is ${a.toLocaleString("en-AU")} written without commas?`,String(a),[String(a+90),String(a-900)],`${a.toLocaleString("en-AU")} has the same digits and place values as ${a}.`,`Read from the highest place and keep every zero.`,vis(String(a),`The numeral ${a} displayed on a place-value card.`,`read_large_numeral`));
  if(t===1)return draft(`What is the value of the first digit in ${a}?`,String(d[0]*10000),[String(d[0]*1000),String(d[0]*100)],`The first digit is in the ten-thousands place, so its value is ${d[0]*10000}.`,`Name the place before finding the value.`,vis(`${d[0]} | ${d.slice(1).join(" | ")}`,`The digits of ${a} arranged from ten-thousands to ones.`,`identify_large_place_value`));
  if(t===2)return draft(`Which expanded form represents ${a}?`,`${d[0]*10000} + ${d[1]*1000} + ${d[2]*100} + ${d[3]*10} + ${d[4]}`,[`${d[0]*1000} + ${d[1]*100} + ${d[2]*10} + ${d[3]+d[4]}`,`${d[0]*10000} + ${d[1]*1000} + ${d[2]*10} + ${d[3]*100} + ${d[4]}`],`Each digit contributes its place value.`,`Match each digit to ten-thousands, thousands, hundreds, tens and ones.`,vis(String(a),`The numeral ${a} ready to be partitioned by place value.`,`expand_large_number`));
  if(t===3)return draft(`Which number is greater: ${a} or ${b}?`,String(b),[String(a),"They are equal"],`${b} is greater because the first different place has the larger digit.`,`Compare from the left.`,vis(`${a}   ${b}`,`The numerals ${a} and ${b} shown side by side.`,`compare_large_numbers`));
  if(t===4)return draft(`Put ${a}, ${b} and ${a-500} in order from smallest to largest.`,`${a-500}, ${a}, ${b}`,[`${b}, ${a}, ${a-500}`,`${a}, ${a-500}, ${b}`],`Compare the highest place first: ${a-500} < ${a} < ${b}.`,`Find the smallest first, then compare the two remaining numbers.`,vis(`${a}  ${b}  ${a-500}`,`Three large-number cards labelled ${a}, ${b}, and ${a-500}.`,`order_large_numbers`));
  if(t===5)return draft(`What number is 1 more than ${a+9}?`,String(a+10),[String(a+9),String(a+19)],`Adding 1 to ${a+9} gives ${a+10}.`,`Watch whether the ones digit causes a regrouping.`,vis(`${a+9} + 1`,`${a+9} plus one shown as a place-value change.`,`cross_place_value_boundary`));
  if(t===6)return draft(`Which renaming has the same value as ${a}?`,`${Math.floor(a/100)} hundreds and ${a%100} ones`,[`${Math.floor(a/1000)} hundreds and ${a%100} ones`,`${Math.floor(a/10)} hundreds and ${a%10} ones`],`${Math.floor(a/100)} hundreds make ${Math.floor(a/100)*100}; adding ${a%100} ones gives ${a}.`,`Multiply the hundreds by 100, then add the ones.`,vis(String(a),`The numeral ${a} beside a hundreds-and-ones renaming frame.`,`rename_large_number`));
  return draft(`A counter says ${a} is smaller than ${a-1000} because its last digit is smaller. What should be checked first?`,`The highest place value`,["The ones digit","The number of spaces"],`Large numbers are compared from the highest place, not from the final digit.`,`Start on the left and stop at the first different digit.`,vis(`${a} ? ${a-1000}`,`A comparison between ${a} and ${a-1000} with a question mark.`,`explain_large_number_comparison`));
}

function buildY3N02(i){
  const s=Math.floor(i/8),t=i%8, den=[2,3,4,5,10][s], num=Math.min(den-1,1+(s%3)), missing=den-num;
  const fv=(shaded=num)=>model("fraction","fractions",`One whole divided into ${den} equal parts with ${shaded} shaded.`,{parts:den,shaded,caption:"Equal parts of one whole"});
  if(t===0)return draft(`One whole is split into ${den} equal parts. What is one part called?`,`1/${den}`,[`${den}/1`,`1/${den+1}`],`One of ${den} equal parts is 1/${den}.`,`The denominator counts equal parts in the whole.`,fv(1));
  if(t===1)return draft(`Which fraction describes ${num} of ${den} equal parts shaded?`,`${num}/${den}`,[`${den}/${num}`,`${num}/${den+1}`],`${num} selected parts out of ${den} equal parts is ${num}/${den}.`,`Count shaded parts, then all equal parts.`,fv());
  if(t===2)return draft(`How many ${den===2?"halves":den===3?"thirds":den===4?"quarters":den===5?"fifths":"tenths"} make one whole?`,String(den),[String(Math.max(1,den-1)),String(den+1)],`${den}/${den} is one whole.`,`The denominator tells how many equal parts complete the whole.`,fv(den));
  if(t===3)return draft(`What completes ${num}/${den} to make one whole?`,`${missing}/${den}`,[`${den}/${den}`,`${missing}/${den+1}`],`${num}/${den} + ${missing}/${den} = ${den}/${den}, or one whole.`,`Count the unshaded equal parts.`,fv(num));
  if(t===4)return draft(`Which statement about ${num}/${den} is correct?`,`${num} of ${den} equal parts are selected`,[`${den} of ${num} parts are selected`,`${num} unequal parts are selected`],`A fraction names selected equal parts of one whole.`,`The numerator is selected parts; the denominator is all equal parts.`,fv());
  if(t===5)return draft(`Can ${den} different-sized pieces be called ${den===4?"quarters":"equal fraction parts"}?`,`No, the pieces must be equal`,["Yes, only the number of pieces matters","Yes, if one piece is very large"],`Fraction parts of one whole must be equal in size.`,`Compare the sizes, not only the count.`,model("default","equal_fraction_parts",`${den} visibly unequal pieces of one whole.`,{display:"small | LARGE | medium",caption:"Are the parts equal?"}));
  if(t===6)return draft(`Which sum makes one whole?`,`${num}/${den} + ${missing}/${den}`,[`${num}/${den} + ${missing}/${den+1}`,`${num}/${den} + ${Math.min(den,missing+1)}/${den}`],`The numerators total ${den} while the equal parts keep denominator ${den}.`,`Use parts of the same size and count until you have ${den}.`,fv(den));
  return draft(`A student writes ${num}/${den} + ${missing}/${den} = ${den}/${den*2}. What is the mistake?`,`The denominator should stay ${den}`,[`The numerator should stay ${num}`,"Fractions cannot make a whole"],`When equal-sized parts are combined, count the parts and keep their size: ${den}/${den}=1.`,`Do not add denominators when the parts have the same denominator.`,fv(den));
}

function buildY3N03(i){
  const s=Math.floor(i/8),t=i%8,a=236+s*71,b=47+s*13,sum=a+b,diff=a-b;
  const cv=(text,skill,alt)=>model("default",skill,alt,{display:text,caption:"Use place value"});
  if(t===0)return draft(`What is ${a} + ${b}?`,String(sum),[String(sum-10),String(sum+100)],`${a}+${b}=${sum}.`,`Partition ${b} into tens and ones.`,cv(`${a} + ${b}`,"add_three_digit_numbers",`${a} plus ${b} shown for calculation.`));
  if(t===1)return draft(`What is ${a} − ${b}?`,String(diff),[String(diff+10),String(diff-1)],`${a}−${b}=${diff}.`,`Subtract tens, then ones, regrouping if needed.`,cv(`${a} − ${b}`,"subtract_three_digit_numbers",`${a} minus ${b} shown for calculation.`));
  if(t===2)return draft(`Which partition helps calculate ${a} + ${b}?`,`${a} + ${Math.floor(b/10)*10} + ${b%10}`,[`${a} + ${b%10} + ${b%10}`,`${a} + ${b*10}`],`Splitting ${b} into tens and ones preserves its value.`,`Check that the parts recombine to ${b}.`,cv(`${b} = ${Math.floor(b/10)*10} + ${b%10}`,"partition_addend",`${b} partitioned into tens and ones.`));
  if(t===3)return draft(`Which addition checks ${a} − ${b} = ${diff}?`,`${diff} + ${b} = ${a}`,[`${a} + ${b} = ${diff}`,`${diff} − ${b} = ${a}`],`Addition reverses subtraction, so ${diff}+${b}=${a}.`,`Use the answer and the amount subtracted.`,cv(`${a} − ${b} = ${diff}`,"check_subtraction_inverse",`A subtraction fact ready to check with addition.`));
  if(t===4)return draft(`What is the best estimate for ${a} + ${b}?`,String(Math.round(a/10)*10+Math.round(b/10)*10),[String(Math.round(a/100)*100),String(sum+200)],`Rounding both numbers to nearby tens gives a sensible estimate.`,`Round each number before adding.`,cv(`${a} ≈ ${Math.round(a/10)*10}; ${b} ≈ ${Math.round(b/10)*10}`,"estimate_sum",`Both addends rounded to nearby tens.`));
  if(t===5)return draft(`Which strategy efficiently solves ${a+1} + 99?`,`Add 100, then subtract 1`,["Add 90, then subtract 9","Subtract 100, then add 1"],`99 is 1 less than 100, so compensate after adding 100.`,`Use the friendly number 100.`,cv(`${a+1} + 99`,"use_compensation_addition",`An addition calculation using 99 near 100.`));
  if(t===6)return draft(`A library has ${a} books and receives ${b} more. How many books are there now?`,String(sum),[String(diff),String(sum+10)],`Receiving more books means add: ${a}+${b}=${sum}.`,`Decide whether the amount grows or decreases.`,cv(`${a} books + ${b} books`,"apply_addition_context",`Two book groups containing ${a} and ${b} books.`));
  return draft(`Sam says ${a} − ${b} = ${a+b}. What shows the answer is unreasonable?`,`Subtraction should make the starting number smaller`,["Every answer must be even","Subtraction always makes zero"],`${a}−${b} must be less than ${a}; the correct result is ${diff}.`,`Compare the result with the starting number.`,cv(`${a} − ${b}`,"check_calculation_reasonableness",`A subtraction calculation beside an incorrectly larger answer.`));
}

function buildY3N04(i){
  const s=Math.floor(i/8),t=i%8,g=3+s,e=4+(s%4),total=g*e;
  const gv=(groups=g,each=e)=>model("groups","equal_groups",`${groups} equal groups with ${each} objects in each group.`,{groups,each,footer:`${groups} groups of ${each}`,caption:"Use equal groups"});
  if(t===0)return draft(`There are ${g} rows of ${e} chairs. How many chairs are there?`,String(total),[String(g+e),String(total-g)],`${g}×${e}=${total}.`,`Count ${g} equal groups of ${e}.`,gv());
  if(t===1)return draft(`${total} counters are shared into ${g} equal groups. How many are in each group?`,String(e),[String(g),String(total-g)],`${total}÷${g}=${e}.`,`Use the related multiplication fact.`,gv());
  if(t===2)return draft(`How many groups of ${e} fit into ${total}?`,String(g),[String(e),String(total)],`${g} groups of ${e} make ${total}.`,`Skip-count by ${e} until ${total}.`,gv());
  if(t===3)return draft(`Which multiplication sentence matches ${g} equal groups of ${e}?`,`${g} × ${e} = ${total}`,[`${g} + ${e} = ${g+e}`,`${total} × ${g} = ${total*g}`],`The number of groups multiplied by the amount in each group gives the total.`,`Groups × each = total.`,gv());
  if(t===4)return draft(`Which division fact belongs to ${g} × ${e} = ${total}?`,`${total} ÷ ${g} = ${e}`,[`${g} ÷ ${e} = ${total}`,`${total} − ${g} = ${e}`],`Division undoes multiplication.`,`Start the division fact with the total.`,gv());
  if(t===5)return draft(`An array has ${g} rows and ${e} columns. How many dots are in the array?`,String(total),[String(g+e),String(total+g)],`Rows × columns gives ${total}.`,`Count equal rows, then multiply.`,model("groups","interpret_array",`An array with ${g} rows and ${e} columns.`,{groups:g,each:e,caption:"Read the array"}));
  if(t===6)return draft(`A student shares ${total} stickers among ${e} children and gives each child ${e}. Is the share correct?`,g===e?"Yes":"No, each child should get "+g,[g===e?"No, each should get "+g:"Yes","No, sharing cannot be checked"],`${total}÷${e}=${g}.`,`Multiply the claimed share by the number of children.`,gv(e,g));
  return draft(`Why do ${g} × ${e} and ${e} × ${g} have the same total?`,`The rows and columns are swapped`,["The total is guessed","Multiplication always adds one"],`Both arrays contain ${total} objects; only their orientation changes.`,`Imagine turning the array.`,gv());
}

function buildY3N05(i){
  const s=Math.floor(i/8),t=i%8,a=47+s*51,b=103+s*49,exact=a+b;
  const ev=(text,alt)=>model("default","estimation",alt,{display:text,caption:"Estimate, then check"});
  if(t===0)return draft(`What is a sensible estimate for ${a} + ${b}?`,String(Math.round(a/10)*10+Math.round(b/10)*10),[String(exact+300),String(Math.abs(a-b))],`Round to nearby tens, then add.`,`Choose nearby friendly numbers.`,ev(`${a} + ${b}`,`The numbers ${a} and ${b} ready to be rounded.`));
  if(t===1)return draft(`About how many objects are in ${6+s} rows of about ${9+s} objects?`,String((6+s)*(9+s)),[String(15+2*s),String((6+s)*(9+s)+100)],`Estimate with equal groups: ${6+s}×${9+s}≈${(6+s)*(9+s)}.`,`Multiply the approximate row count by the approximate amount per row.`,ev(`${6+s} rows × about ${9+s}`,`A collection arranged in ${6+s} nearly equal rows.`));
  if(t===2)return draft(`Which estimate for ${a} + ${b} is unreasonable?`,String(exact+500),[String(Math.round(exact/10)*10),String(Math.round(exact/100)*100)],`${exact+500} is far larger than both addends combined.`,`Compare the estimate with the size of the numbers.`,ev(`${a} + ${b}`,`Two addends shown beside three possible estimates.`));
  if(t===3){const rounded=Math.round(b/10)*10;return draft(`Round ${b} to the nearest ten.`,String(rounded),[String(rounded-10),String(rounded+10)],`The ones digit decides whether the tens digit stays or increases.`,`Locate ${b} between two multiples of 10.`,ev(String(b),`${b} positioned between nearby multiples of ten.`));}
  if(t===4)return draft(`A jar has about ${8+s} groups of ${12+s} beads. Which method is most useful?`,`Estimate one group, then multiply by the groups`,["Guess without using the groups","Count only the first bead"],`Using the visible groups gives evidence for the estimate.`,`Use the repeated structure in the collection.`,ev(`${8+s} groups`,`${8+s} similar bead groups ready to estimate.`));
  if(t===5)return draft(`The exact answer is ${exact}. Is ${Math.round(exact/10)*10} a reasonable estimate?`,`Yes, it is close to the exact answer`,["No, estimates must equal exactly","No, estimates must be larger"],`A useful estimate is close enough for the purpose.`,`Find the difference between estimate and exact answer.`,ev(`${exact} ≈ ${Math.round(exact/10)*10}`,`An exact total compared with a nearby rounded estimate.`));
  if(t===6)return draft(`Why estimate before calculating ${a} + ${b}?`,`To predict a sensible range for the answer`,["To avoid understanding the problem","To make every answer end in zero"],`An estimate helps detect an unreasonable exact calculation.`,`Think of estimation as a reasonableness check.`,ev(`${a} + ${b}`,`A calculation with a check box labelled sensible range.`));
  return draft(`A student estimates ${a} + ${b} as 20. What is the best response?`,`The estimate is far too small`,["The estimate is exact","Any estimate is acceptable"],`Both addends are greater than 20, so their sum cannot be about 20.`,`Use the size of each addend to reject impossible estimates.`,ev(`${a} + ${b} ≈ 20?`,`Two large addends compared with an estimate of 20.`));
}

function buildY3N07(i){
  const s=Math.floor(i/8),t=i%8,start=5+s*7,add=3+s,result=(start+add)*2;
  const av=(steps,alt)=>model("default","algorithm",alt,{display:steps,caption:"Follow the steps in order"});
  if(t===0)return draft(`Start at ${start}, add ${add}, then double. What is the output?`,String(result),[String(start+add*2),String(result+add)],`Following the steps gives ${start}+${add}=${start+add}, then double to ${result}.`,`Complete one instruction before the next.`,av(`${start} → +${add} → ×2`, `An algorithm starting at ${start}, adding ${add}, then doubling.`));
  if(t===1)return draft(`Which instruction is precise enough for an algorithm?`,`Add ${add}`,["Make it nicer","Do something with it"],`A precise instruction tells exactly what operation to perform.`,`Another person should be able to follow it without guessing.`,av(`INPUT → add ${add} → OUTPUT`,`A clear add-${add} algorithm step.`));
  if(t===2)return draft(`What is missing from: start at ${start}; ___; output ${start+add}?`,`Add ${add}`,[`Subtract ${add}`,`Multiply by ${add}`],`Adding ${add} changes ${start} to ${start+add}.`,`Compare input and output.`,av(`${start} → ? → ${start+add}`,`An algorithm with one missing operation between input and output.`));
  if(t===3)return draft(`Why can changing the order of “add ${add}” and “double” change the output?`,`The operations act on different intermediate values`,["Numbers forget their value","Order never changes an answer"],`Adding then doubling is not generally the same as doubling then adding.`,`Try both orders with the starting value.`,av(`+${add} then ×2  ≠  ×2 then +${add}`,`Two operation orders shown for comparison.`));
  if(t===4)return draft(`Which sequence correctly checks ${start+add} − ${add} = ${start}?`,`Start at ${start+add}, subtract ${add}, compare with ${start}`,[`Start at ${start}, subtract ${start+add}`,"Guess, then stop"],`The check follows the subtraction and compares the output with the expected value.`,`Use a clear input, operation and output.`,av(`${start+add} → −${add} → ${start}`,`A subtraction-check algorithm with input, step and output.`));
  if(t===5)return draft(`An algorithm says ${start} + ${add} = ${start+add+1}. What should be debugged?`,`The recorded output`,["The starting number","The word add"],`${start}+${add}=${start+add}, so the final output is incorrect.`,`Recalculate each step and find the first mismatch.`,av(`${start} → +${add} → ${start+add+1}`,`An algorithm with an incorrect final output.`));
  if(t===6)return draft(`Which algorithm creates a pattern adding ${add} each time?`,`Start at ${start}; repeatedly add ${add}`,[`Start at ${start}; repeatedly subtract ${add}`,`Start at ${start}; change the rule each time`],`Repeating the same add-${add} step creates a constant pattern.`,`The repeated instruction must stay the same.`,av(`${start} → ${start+add} → ${start+2*add}`,`Three pattern terms produced by repeatedly adding ${add}.`));
  return draft(`A robot must move forward ${add} squares, turn right, then move 2 squares. Why must the turn stay in the middle?`,`Moving it changes the pathway`,["The robot changes colour","Turns have no effect"],`Algorithms depend on ordered steps; changing the turn changes the route.`,`Trace both possible orders on a grid.`,av(`forward ${add} → right turn → forward 2`,`A three-step robot movement algorithm.`));
}

function buildY3M06(i){
  const s=Math.floor(i/8),t=i%8,d=2+s,c=15+s*7,total=d*100+c,price=125+s*35;
  const mv=(text,alt)=>model("default","money",alt,{display:text,caption:"Dollars and cents"});
  if(t===0)return draft(`How many cents equal $${d}?`,String(d*100),[String(d*10),String(d*100+10)],`Each dollar is 100 cents, so $${d} is ${d*100} cents.`,`Multiply the dollars by 100.`,mv(`$${d} = ? cents`,`A ${d}-dollar amount beside a cents conversion.`));
  if(t===1)return draft(`Which amount is ${d} dollars and ${c} cents?`,`$${d}.${String(c).padStart(2,"0")}`,[`$${d+c}.00`,`$${d}.0${c}`],`Money notation uses two digits for cents.`,`Write dollars before the decimal point and cents after it.`,mv(`${d} dollars + ${c} cents`,`Separate dollar and cent amounts ready to combine.`));
  if(t===2)return draft(`How many cents are in $${d}.${String(c).padStart(2,"0")}?`,String(total),[String(d*100+c*10),String(d+c)],`$${d} is ${d*100} cents; add ${c} cents to get ${total}.`,`Convert dollars first, then add the cents.`,mv(`$${d}.${String(c).padStart(2,"0")}`,`A money amount of ${d} dollars and ${c} cents.`));
  if(t===3)return draft(`Which collection has the same value as ${price} cents?`,`$${Math.floor(price/100)} and ${price%100} cents`,[`$${price} and 1 cent`,`${Math.floor(price/10)} cents`],`${price} cents is ${Math.floor(price/100)} dollar and ${price%100} cents.`,`Trade each group of 100 cents for one dollar.`,mv(`${price} cents`,`A cent amount ready to exchange into dollars and cents.`));
  if(t===4)return draft(`A book costs $${d}.${String(c).padStart(2,"0")} and a pencil costs $1.00. What is the total?`,`$${d+1}.${String(c).padStart(2,"0")}`,[`$${d}.${String(c+1).padStart(2,"0")}`,`$${d+1}.00`],`Adding one dollar increases the dollars by 1 while cents stay ${c}.`,`Line up dollars with dollars and cents with cents.`,mv(`$${d}.${String(c).padStart(2,"0")} + $1.00`,`Two prices shown on a receipt.`));
  if(t===5)return draft(`You pay $${d+2}.00 for an item costing $${d}.${String(c).padStart(2,"0")}. Which operation finds the change?`,`Subtraction`,["Multiplication","Measurement"],`Change is the amount paid minus the cost.`,`Start with the larger paid amount.`,mv(`$${d+2}.00 − $${d}.${String(c).padStart(2,"0")}`,`A payment and lower item price shown for a change calculation.`));
  if(t===6)return draft(`Which is greater: ${total} cents or $${d}.00?`,`${total} cents`,[`$${d}.00`,"They are equal"],`${total} cents is $${d}.${String(c).padStart(2,"0")}, which is more than $${d}.00.`,`Convert both amounts to cents.`,mv(`${total}c ? $${d}.00`,`A cents amount compared with a whole-dollar amount.`));
  return draft(`A label shows $${d}.${c}. What should be checked?`,`Cents should use exactly two digits`,["Dollars must use three digits","The decimal point should be removed"],`Standard money notation writes the cents with two digits.`,`Count the digits after the decimal point.`,mv(`$${d}.${c}`,`A price label being checked for correct money notation.`));
}

function buildY3ST03(i){
  const s=Math.floor(i/8),t=i%8,n=12+s*3,yes=7+s,no=n-yes,topic=["seed growth","travel choices","reading habits","playground use","recycling"][s];
  const dv=(text,alt)=>model("default","statistical_investigation",alt,{display:text,caption:"Plan, collect, display, interpret"});
  if(t===0)return draft(`Which question is suitable for a guided investigation about ${topic}?`,`A question with answers that can be collected and compared`,["A question no one can answer","A question unrelated to the topic"],`A statistical question anticipates varied answers that can be recorded.`,`Ask whether a group could provide data for the question.`,dv(`Question → data`,`An investigation question leading to a set of data.`));
  if(t===1)return draft(`Why should the class decide categories before collecting ${topic} data?`,`So responses are recorded consistently`,["So every response becomes equal","So no labels are needed"],`Clear categories help each response go into the correct group.`,`Categories are the organised places where answers are recorded.`,dv(`categories → tally`,`Named categories beside tally columns.`));
  if(t===2)return draft(`${n} responses include ${yes} yes answers. How many no answers are there?`,String(no),[String(no+2),String(n+yes)],`${n}−${yes}=${no}.`,`Subtract the yes responses from the total.`,dv(`total ${n}; yes ${yes}; no ?`,`A two-category investigation table with a missing no count.`));
  if(t===3)return draft(`Which display best compares yes ${yes} and no ${no}?`,`A labelled graph using the same scale`,["An unlabelled sketch","A clock with no data"],`A labelled common scale allows the two counts to be compared fairly.`,`Look for labels, counts and an even scale.`,dv(`YES ${yes} | NO ${no}`,`Two labelled category counts ready for a graph.`));
  if(t===4)return draft(`What conclusion is supported when yes has ${yes} responses and no has ${no}?`,yes>no?"More people answered yes":"More people answered no",[yes>no?"More people answered no":"More people answered yes","Both groups are equal"],`The larger count supports the conclusion.`,`Base the conclusion on the recorded values.`,dv(`yes ${yes}; no ${no}`,`Two response counts shown for interpretation.`));
  if(t===5)return draft(`Another group gets a different result for the same investigation. What should the class do?`,`Compare methods and data before explaining the difference`,["Delete one result","Assume the larger number is correct"],`Different samples can vary; comparing collection methods and evidence supports a fair explanation.`,`Check who was asked and how responses were recorded.`,dv(`Group A ↔ Group B`,`Two investigation results ready to compare.`));
  if(t===6)return draft(`Which step comes after collecting the data?`,`Organise and display it`,["Change the question secretly","Ignore the responses"],`Organising and displaying data makes patterns easier to interpret.`,`Follow the investigation cycle in order.`,dv(`question → collect → display → interpret`,`Four stages of a guided statistical investigation.`));
  return draft(`Why must a conclusion mention the data?`,`Evidence shows whether the claim is supported`,["It makes every claim true","It replaces the investigation question"],`A conclusion should connect directly to observed counts or patterns.`,`Quote or compare the relevant values.`,dv(`claim + evidence`,`A conclusion box linked to a data display.`));
}

function buildY3P01(i){
  const s=Math.floor(i/8),t=i%8,red=1+s,blue=4+s;
  const pv=(text,alt)=>model("default","chance",alt,{display:text,caption:"Describe the chance"});
  if(t===0)return draft(`A bag has ${red} red and ${blue} blue counters. Which colour is more likely to be drawn?`,`Blue`,["Red","They are equally likely"],`There are more blue counters, so blue has the greater chance.`,`Compare how many of each colour are possible.`,pv(`red ${red} | blue ${blue}`,`A bag containing ${red} red and ${blue} blue counters.`));
  if(t===1)return draft(`Which event is impossible when a number cube has faces 1 to 6?`,`Rolling a 9`,["Rolling a 3","Rolling an even number"],`A 9 is not on the cube, so it cannot occur.`,`List the possible outcomes.`,pv(`1 2 3 4 5 6`,`The six faces possible on a standard number cube.`));
  if(t===2)return draft(`Which event is certain when choosing one card from cards labelled A, B and C?`,`The card has a letter`,["The card is D","The card is always A"],`Every available card has a letter.`,`Check what is true for every possible outcome.`,pv(`A  B  C`,`Three cards labelled A, B and C.`));
  if(t===3)return draft(`A fair spinner has 4 equal sections, two green and two yellow. What is true?`,`Green and yellow are equally likely`,["Green is impossible","Yellow is certain"],`Each colour covers two equal sections.`,`Count equal sections for each outcome.`,pv(`green green | yellow yellow`,`A fair spinner with two green and two yellow equal sections.`));
  if(t===4)return draft(`Which word best describes rain tomorrow when the forecast says 80%?`,`Likely`,["Impossible","Certain"],`An 80% chance is high but not guaranteed.`,`Likely means expected more often than not.`,pv(`rain chance 80%`,`A weather forecast showing an 80 percent chance of rain.`));
  if(t===5)return draft(`Which change makes drawing red more likely?`,`Add more red counters`,["Remove red counters","Add only blue counters"],`Increasing favourable outcomes increases the chance of red.`,`Compare the bag before and after the change.`,pv(`red + more red`,`A counter bag gaining extra red counters.`));
  if(t===6)return draft(`Can an unlikely event still happen?`,`Yes`,["No","Only if it is certain"],`Unlikely means a small chance, not no chance.`,`Impossible is the word for no chance.`,pv(`unlikely ≠ impossible`,`A chance scale distinguishing unlikely from impossible.`));
  return draft(`Why is drawing blue more likely from a bag with ${red} red and ${blue} blue?`,`Blue has more possible counters`,["Blue is a brighter colour","The first counter must be blue"],`Chance depends on the number of possible outcomes, not colour preference.`,`Use counts as evidence.`,pv(`red ${red} | blue ${blue}`,`Counts of red and blue counters used to justify likelihood.`));
}

function buildY3P02(i){
  const s=Math.floor(i/8),t=i%8,trials=20+s*5,a=8+s*2,b=trials-a;
  const xv=(text,alt)=>model("default","chance_experiment",alt,{display:text,caption:"Repeat and record"});
  if(t===0)return draft(`A coin is tossed ${trials} times. What should be recorded after each toss?`,`Whether it lands heads or tails`,["The time of day only","A guessed final total"],`Recording every outcome creates usable experiment data.`,`Use one tally for each trial.`,xv(`heads | tails`,`A two-column tally table for repeated coin tosses.`));
  if(t===1)return draft(`${a} of ${trials} spins land on red. How many land on other colours?`,String(b),[String(a),String(trials+a)],`${trials}−${a}=${b}.`,`Subtract red outcomes from all trials.`,xv(`red ${a}; total ${trials}`,`A spinner results table with ${a} red outcomes from ${trials} trials.`));
  if(t===2)return draft(`Why repeat a chance experiment many times?`,`To see patterns in the outcomes`,["To guarantee one exact sequence","To remove every random result"],`Repeated trials provide more evidence about how outcomes behave.`,`One trial gives very little evidence.`,xv(`trial 1 → trial 2 → … → trial ${trials}`,`A sequence of repeated chance trials.`));
  if(t===3)return draft(`Two groups repeat the same fair spinner experiment and get different totals. Is that possible?`,`Yes, random results can vary`,["No, both lists must match exactly","No, one group must erase its data"],`Chance experiments can produce different short-run results.`,`Fair does not mean every small set is identical.`,xv(`Group A ≠ Group B`,`Two valid but different result tables from the same experiment.`));
  if(t===4)return draft(`Which table is ready for a ${trials}-trial colour experiment?`,`A labelled tally column for every possible colour`,["An unlabelled blank page","A table missing one possible colour"],`All outcomes need a clear place to be recorded.`,`List possible outcomes before starting.`,xv(`colour | tally | total`,`A labelled chance-experiment recording table.`));
  if(t===5)return draft(`Red appears ${a} times and blue appears ${b} times. Which appeared more often?`,a>b?"Red":b>a?"Blue":"They appeared equally often",[a>b?"Blue":"Red","The experiment gives no evidence"],`Compare ${a} with ${b}.`,`Use the observed totals, not what you expected.`,xv(`red ${a} | blue ${b}`,`Observed red and blue totals from repeated trials.`));
  if(t===6)return draft(`What makes the experiment fair?`,`Use the same spinner and method for every trial`,["Change the spinner halfway","Record only favourite outcomes"],`Keeping conditions consistent makes comparisons meaningful.`,`Only the random outcome should change.`,xv(`same tool + same method`,`A consistent repeated-trial procedure.`));
  return draft(`A student predicts equal colours but observes ${a} red and ${b} blue. What should the report say?`,`The observed results differed from the prediction`,["The data must be changed","Predictions are always exact"],`A report compares the prediction honestly with recorded evidence.`,`Describe what happened without rewriting the totals.`,xv(`prediction ↔ results`,`A prediction beside observed trial totals.`));
}

function buildY3A01(i){
  const s=Math.floor(i/8),t=i%8,a=24+s*13,b=17+s*7,w=a+b;
  const v=(text,alt)=>model("default","inverse_operations",alt,{display:text,caption:"Use the same parts and whole"});
  if(t===0)return draft(`Which subtraction fact checks ${a} + ${b} = ${w}?`,`${w} − ${b} = ${a}`,[`${w} − ${a} = ${b+1}`,`${a} − ${b} = ${w}`],`Subtraction undoes the addition: ${w}−${b}=${a}.`,`Start subtraction with the whole, ${w}.`,v(`${a} + ${b} = ${w}`,`An addition fact with parts ${a} and ${b} and whole ${w}.`));
  if(t===1)return draft(`Which addition fact checks ${w} − ${a} = ${b}?`,`${b} + ${a} = ${w}`,[`${w} + ${a} = ${b}`,`${b} − ${a} = ${w}`],`Adding the removed part back reconstructs ${w}.`,`Use difference + removed part = starting amount.`,v(`${w} − ${a} = ${b}`,`A subtraction fact ready to check with inverse addition.`));
  if(t===2)return draft(`Find the missing number: ${a} + ___ = ${w}.`,String(b),[String(a),String(w)],`${w}−${a}=${b}.`,`Use subtraction to find the missing part.`,v(`${a} + ? = ${w}`,`A part-part-whole equation with one missing addend.`));
  if(t===3)return draft(`Find the missing number: ${w} − ___ = ${a}.`,String(b),[String(a),String(w-a+1)],`The missing amount is ${b} because ${a}+${b}=${w}.`,`Think of the related addition fact.`,v(`${w} − ? = ${a}`,`A subtraction equation with the removed part missing.`));
  if(t===4)return draft(`Which fact family uses exactly ${a}, ${b} and ${w}?`,`${a}+${b}=${w}; ${w}−${a}=${b}`,[`${a}+${w}=${b}; ${b}−${a}=${w}`,`${a}−${b}=${w}; ${w}+${b}=${a}`],`A fact family keeps the same two parts and whole.`,`The largest number is the whole.`,v(`${a}  ${b}  ${w}`,`Three values arranged as a fact family.`));
  if(t===5)return draft(`Mina had ${w} cards and gave away ${b}. Which inverse fact checks that ${a} remain?`,`${a} + ${b} = ${w}`,[`${w} + ${b} = ${a}`,`${a} − ${b} = ${w}`],`Remaining cards plus cards given away must equal the starting total.`,`Rebuild the original amount.`,v(`${w} − ${b} = ${a}`,`A card-removal story shown as a subtraction equation.`));
  if(t===6)return draft(`A student writes ${a}+${b}=${w}, then checks with ${w}−${b}=${a+1}. What is wrong?`,`The check should equal ${a}`,[`The addition should start with ${w}`,"Inverse operations cannot check answers"],`The inverse check must return the original addend ${a}.`,`Compare the check output with the number that was added first.`,v(`${w} − ${b} = ${a+1}?`,`An inverse check with an incorrect result.`));
  return draft(`Why are addition and subtraction called inverse operations?`,`They undo each other`,["They always give the same answer","They only work with one-digit numbers"],`Adding a part and then subtracting that same part returns to the start.`,`Think of moving forward and back by the same amount.`,v(`${a} → +${b} → ${w} → −${b} → ${a}`,`A number path moving forward by ${b} and back by ${b}.`));
}

function buildY3A02(i){
  const s=Math.floor(i/8),t=i%8,base=6+s,other=7+(s%3),fact=base+other,tens=base*10,otherT=other*10;
  const v=(text,alt)=>model("default","mental_facts",alt,{display:text,caption:"Extend a known fact"});
  if(t===0)return draft(`Knowing ${base}+${other}=${fact}, what is ${tens}+${otherT}?`,String(fact*10),[String(fact),String(fact*100)],`Each addend is 10 times as large, so the sum is ${fact*10}.`,`Keep the basic fact and scale each value by 10.`,v(`${base}+${other}=${fact} → ${tens}+${otherT}=?`,`A basic addition fact extended from ones to tens.`));
  if(t===1)return draft(`Knowing ${fact}−${base}=${other}, what is ${fact*10}−${tens}?`,String(otherT),[String(other),String(otherT+10)],`The related tens fact is ${fact*10}−${tens}=${otherT}.`,`Use the same fact-family relationship in tens.`,v(`${fact}−${base}=${other} → ${fact*10}−${tens}=?`,`A subtraction fact extended from ones to tens.`));
  if(t===2){const answer=tens+8+other;return draft(`What is ${tens+8} + ${other}?`,String(answer),[String(answer-1),String(answer+10)],`Use ${8}+${other}=${8+other}, then combine with ${tens}.`,`Work with the ones fact, then restore the tens.`,v(`${tens} + 8 + ${other}`,`A two-digit number partitioned into tens and ones before adding.`));}
  if(t===3)return draft(`What is ${tens+fact} − ${other}?`,String(tens+base),[String(tens+other),String(tens+base+10)],`Since ${fact}−${other}=${base}, the tens stay and the ones become ${base}.`,`Use the known subtraction fact in the ones.`,v(`${tens} + ${fact} − ${other}`,`A subtraction calculation partitioned into tens and a known fact.`));
  if(t===4)return draft(`Which strategy is efficient for ${tens+9} + ${other+1}?`,`Make the next ten, then add the remainder`,["Count every number from zero","Ignore the ones digits"],`Bridging to a multiple of 10 reduces the calculation to known facts.`,`Ask how much ${tens+9} needs to reach ${tens+10}.`,v(`${tens+9} + ${other+1}`,`An addition poised one below the next multiple of ten.`));
  if(t===5)return draft(`What is ${base*100} + ${other*100}?`,String(fact*100),[String(fact*10),String(fact*100+100)],`${base}+${other}=${fact}, so ${base} hundreds + ${other} hundreds = ${fact} hundreds.`,`Treat hundreds as equal units.`,v(`${base} hundreds + ${other} hundreds`,`Two collections of hundreds to combine mentally.`));
  if(t===6)return draft(`A student says ${tens}+${otherT}=${fact}. What place-value idea was missed?`,`Each basic-fact unit now represents ten`,["Addition changes to multiplication","Zeros have no value"],`The digits follow the known fact, but the values are tens, giving ${fact*10}.`,`Name the unit being counted.`,v(`${tens}+${otherT}=${fact}?`,`A tens calculation incorrectly answered with a ones fact.`));
  return draft(`Which estimate supports ${tens+8}+${other}=${tens+8+other}?`,`The answer should be a little more than ${tens+10}`,[`The answer should be less than ${tens}`,"The answer must be exactly 100"],`Adding a positive one-digit number increases ${tens+8} beyond the next ten.`,`Use nearby tens to judge reasonableness.`,v(`${tens+8}+${other}`,`An addition result compared with nearby multiples of ten.`));
}

function buildY3A03(i){
  const s=Math.floor(i/8),t=i%8,f=[3,4,5,10,3][s],n=4+s,total=f*n;
  const v=(groups=n,each=f,alt=`${groups} equal groups of ${each}.`)=>model("groups","multiplication_facts",alt,{groups,each,caption:`Facts for ${f}`});
  if(t===0)return draft(`What is ${n} × ${f}?`,String(total),[String(n+f),String(total-f)],`${n} groups of ${f} make ${total}.`,`Skip-count by ${f}, ${n} times.`,v());
  if(t===1)return draft(`What is ${total} ÷ ${f}?`,String(n),[String(f),String(n+1)],`${total} split into groups of ${f} makes ${n} groups.`,`Use the related multiplication fact.`,v());
  if(t===2)return draft(`Which fact helps solve ${f} × ${n+1}?`,`${f} × ${n} = ${total}`,[`${f} + ${n} = ${f+n}`,`${total} ÷ ${n} = ${n}`],`Add one more group of ${f} to the known fact.`,`Use a nearby multiplication fact.`,v());
  if(t===3)return draft(`Which array represents ${f} × ${n}?`,`${f} rows of ${n}`,[`${f+n} dots in one row`,`${f} rows of ${n+1}`],`${f} equal rows of ${n} contain ${total} objects.`,`Rows × objects per row gives the total.`,v(f,n,`An array with ${f} rows and ${n} columns.`));
  if(t===4)return draft(`What comes next when skip-counting by ${f}: ${f}, ${f*2}, ${f*3}, ___?`,String(f*4),[String(f*3+1),String(f*5)],`Add ${f} to ${f*3} to get ${f*4}.`,`Keep the jump size constant.`,model("default","skip_count_fact",`A sequence increasing by ${f}.`,{display:`${f} → ${f*2} → ${f*3} → ?`,caption:`Count by ${f}s`}));
  if(t===5)return draft(`${n} boxes hold ${f} pencils each. How many pencils are there?`,String(total),[String(n+f),String(total+n)],`Equal groups are multiplied: ${n}×${f}=${total}.`,`Identify groups and amount in each group.`,v());
  if(t===6)return draft(`A student answers ${n}×${f} as ${n+f}. What was confused?`,`Multiplication with addition`,["Rows with columns","Division with subtraction"],`${n}×${f} means ${n} equal groups of ${f}, not ${n}+${f}.`,`Draw the equal groups.`,v());
  return draft(`Which division fact belongs with ${n}×${f}=${total}?`,`${total}÷${n}=${f}`,[`${total}−${n}=${f}`,`${n}÷${f}=${total}`],`Division reverses the equal-group multiplication.`,`Start with the product ${total}.`,v());
}

function buildY3M01(i){
  const s=Math.floor(i/8),t=i%8,items=["pencil","classroom","water bottle","school bag","playground"],thing=items[s];
  const v=(text,alt)=>model("default","choose_metric_unit",alt,{display:text,caption:"Choose and estimate a metric unit"});
  const unitSets=[["centimetres","metres","kilometres"],["metres","centimetres","kilometres"],["millilitres","litres","kilograms"],["kilograms","grams","litres"],["metres","millimetres","kilograms"]], correct=unitSets[s][0];
  if(t===0)return draft(`Which unit is most suitable for measuring the ${thing}?`,correct,unitSets[s].slice(1),`The scale of a ${thing} is sensibly measured in ${correct}.`,`Choose a unit that gives a useful-sized number.`,v(`${thing} → ?`, `A ${thing} beside possible metric-unit labels.`));
  if(t===1)return draft(`Which estimate is most reasonable for a ${thing}?`,s===0?"18 cm":s===1?"8 m":s===2?"600 mL":s===3?"4 kg":"30 m",s===0?["18 m","18 km"]:s===1?["8 cm","8 km"]:s===2?["600 L","600 kg"]:s===3?["4 g","4 L"]:["30 mm","30 kg"],`The estimate matches the familiar size or capacity of the object.`,`Picture the object beside a known benchmark.`,v(thing,`A familiar ${thing} used as an estimation benchmark.`));
  if(t===2)return draft(`Why is kilometres unsuitable for the length of a pencil?`,`The unit is far too large`,["Kilometres measure mass","Pencils cannot be measured"],`A pencil is much shorter than one kilometre; centimetres are practical.`,`Compare the object with the size of one unit.`,v(`pencil ≪ 1 km`,`A pencil contrasted with a kilometre-scale distance.`));
  if(t===3)return draft(`Which benchmark is closest to 1 metre?`,`The height of a door handle`,["The thickness of a coin","A drive between towns"],`A door handle is roughly one metre above the floor.`,`Use a familiar object you can visualise.`,v(`about 1 m`,`A door handle shown approximately one metre above a floor.`));
  if(t===4)return draft(`Which unit measures capacity?`,`millilitres`,["centimetres","kilograms"],`Millilitres and litres measure how much a container holds.`,`Think about liquid containers.`,v(`container → mL or L`,`A container labelled with capacity units.`));
  if(t===5)return draft(`Which unit measures mass?`,`kilograms`,["metres","millilitres"],`Grams and kilograms measure mass.`,`Think of a scale used to weigh objects.`,v(`object → g or kg`,`A school bag beside a mass scale.`));
  if(t===6)return draft(`An estimate says a classroom is 7 centimetres long. What is wrong?`,`Centimetres are too small for the room`,["Classrooms have no length","Seven is not a number"],`A room is better measured in metres.`,`Check whether the unit fits the object's scale.`,v(`classroom = 7 cm?`,`A classroom compared with a very short seven-centimetre measure.`));
  return draft(`Why estimate before measuring?`,`To predict a sensible range and notice errors`,["To replace measuring every time","To force the exact answer"],`An estimate provides a reasonableness check for the measured result.`,`Use a familiar benchmark first.`,v(`estimate → measure → check`,`A three-step measurement routine.`));
}

function buildY3M02(i){
  const s=Math.floor(i/8),t=i%8,val=25+s*15,unit=["cm","g","mL","m","kg"][s];
  const v=(text,alt)=>model("default","measure_metric_instrument",alt,{display:text,caption:"Read the instrument carefully"});
  if(t===0)return draft(`A scale is marked every 5 ${unit}. The pointer is at ${val} ${unit}. What is the reading?`,`${val} ${unit}`,[`${val-5} ${unit}`,`${val+5} ${unit}`],`Count equal intervals from zero to ${val}.`,`Check the value of each interval.`,v(`${val-10} | ${val-5} | ${val}`,`A metric scale with equal five-${unit} intervals ending at ${val} ${unit}.`));
  if(t===1)return draft(`Which tool is suitable for measuring ${unit==="cm"||unit==="m"?"length":unit==="g"||unit==="kg"?"mass":"capacity"}?`,unit==="cm"||unit==="m"?"A ruler or tape":unit==="g"||unit==="kg"?"A balance or scale":"A measuring jug",unit==="cm"||unit==="m"?["A clock","A thermometer"]:unit==="g"||unit==="kg"?["A ruler","A calendar"]:["A ruler","A balance"],`The tool is designed for this measurement attribute.`,`Match the tool to length, mass or capacity.`,v(`tool → ${unit}`,`A measurement tool beside its metric unit.`));
  if(t===2)return draft(`An object begins at 3 cm and ends at ${val} cm on a ruler. How long is it?`,`${val-3} cm`,[`${val} cm`,`${val+3} cm`],`Length is end reading minus start reading: ${val}−3=${val-3}.`,`Do not assume the object starts at zero.`,v(`3 cm ├────┤ ${val} cm`,`An object aligned from the 3-centimetre mark to the ${val}-centimetre mark.`));
  if(t===3)return draft(`Which measurement is greater: ${val} ${unit} or ${val+5} ${unit}?`,`${val+5} ${unit}`,[`${val} ${unit}`,"They are equal"],`The units match, so compare the numbers.`,`Only compare directly when units are the same.`,v(`${val} ${unit} ? ${val+5} ${unit}`,`Two measurements in the same unit shown side by side.`));
  if(t===4)return draft(`Why should your eye be level with a measuring-jug scale?`,`To avoid misreading the level`,["To change the liquid amount","To make intervals unequal"],`Viewing at an angle can make the liquid appear beside the wrong mark.`,`Look straight across at the liquid level.`,v(`eye → level mark`,`An eye aligned horizontally with a liquid-level mark.`));
  if(t===5)return draft(`A ruler has no zero visible. What should you do?`,`Subtract the start reading from the end reading`,["Use the end reading only","Add both readings"],`The difference between endpoints gives the object's length.`,`Record both readings first.`,v(`start → end → difference`,`A broken-zero ruler measurement shown with two endpoints.`));
  if(t===6)return draft(`A student reads intervals as 1 ${unit}, but the labels rise by 5 ${unit}. What is the mistake?`,`The interval value was not checked`,["Labels should be ignored","Every scale counts by ones"],`Scale intervals can represent different values.`,`Find the difference between neighbouring labelled marks.`,v(`0, 5, 10 ${unit}`,`A scale labelled in steps of five ${unit}.`));
  return draft(`Why repeat a measurement?`,`To check consistency and catch mistakes`,["To guarantee a larger result","To change the unit"],`Repeated close readings increase confidence in the measurement.`,`Use the same tool and method each time.`,v(`measure → repeat → compare`,`Two repeated metric readings ready to compare.`));
}

function buildY3M03(i){
  const s=Math.floor(i/8),t=i%8,h=1+s,min=15+s*5;
  const v=(text,alt)=>model("default","time_units_duration",alt,{display:text,caption:"Connect time units"});
  if(t===0)return draft(`How many minutes are in ${h} hour${h===1?"":"s"}?`,String(h*60),[String(h*100),String(h*30)],`${h}×60=${h*60} minutes.`,`Each hour contains 60 minutes.`,v(`${h} h = ? min`,`A time-unit conversion from ${h} hours to minutes.`));
  if(t===1)return draft(`How many seconds are in ${min} minutes?`,String(min*60),[String(min*100),String(min+60)],`${min}×60=${min*60} seconds.`,`Each minute contains 60 seconds.`,v(`${min} min = ? s`,`A time-unit conversion from ${min} minutes to seconds.`));
  if(t===2)return draft(`Which duration is longer: ${h} hours or ${h*60-10} minutes?`,`${h} hours`,[`${h*60-10} minutes`,"They are equal"],`${h} hours is ${h*60} minutes, which is 10 minutes longer.`,`Convert to the same unit before comparing.`,v(`${h} h ? ${h*60-10} min`,`Two durations in different units ready to compare.`));
  if(t===3)return draft(`A lesson starts at 9:00 and lasts ${min} minutes. When does it finish?`,`9:${String(min).padStart(2,"0")}`,[`9:${String(Math.max(0,min-5)).padStart(2,"0")}`,`10:${String(min).padStart(2,"0")}`],`Counting ${min} minutes from 9:00 gives 9:${String(min).padStart(2,"0")}.`,`Move forward in minutes from the start time.`,v(`9:00 → +${min} min`,`A timeline beginning at 9:00 and extending ${min} minutes.`));
  if(t===4)return draft(`How many days are in ${h} weeks?`,String(h*7),[String(h*5),String(h*10)],`${h}×7=${h*7} days.`,`Each week has 7 days.`,v(`${h} weeks = ? days`,`A calendar conversion from weeks to days.`));
  if(t===5)return draft(`Which unit best describes the duration of brushing teeth?`,`minutes`,["weeks","years"],`Brushing teeth usually lasts a small number of minutes.`,`Choose a unit matching the event's duration.`,v(`brushing teeth → ?`,`A short everyday event beside time-unit choices.`));
  if(t===6)return draft(`A student says 1 hour equals 100 minutes. What should replace 100?`,`60`,["10","24"],`Clock time uses 60 minutes per hour, not base ten.`,`Recall the minute marks around a clock.`,v(`1 hour = 60 minutes`,`A correct hour-to-minute relationship.`));
  return draft(`Why convert two durations to the same unit before comparing?`,`So the numbers describe equal-sized units`,["So both numbers become equal","So the events last longer"],`A fair comparison uses the same unit.`,`Convert hours to minutes or minutes to hours first.`,v(`same unit → fair comparison`,`Two durations being converted to a common unit.`));
}

function buildY3M04(i){
  const s=Math.floor(i/8),t=i%8,h=2+s,min=[7,23,38,52,14][s],digital=`${h}:${String(min).padStart(2,"0")}`;
  const cv=(hour=h,minute=min,alt=`Analog clock showing ${digital}.`)=>model("clock","read_time_to_minute",alt,{hour,minute});
  if(t===0)return draft(`The minute hand is on minute ${min} and the hour hand is just past ${h}. Which digital time matches?`,digital,[`${h}:${String((min+5)%60).padStart(2,"0")}`,`${h+1}:${String(min).padStart(2,"0")}`],`The long hand shows ${min} minutes past ${h}, so the time is ${digital}.`,`Read the minute hand, then check which hour has just passed.`,cv());
  if(t===1)return draft(`Which description matches ${digital}?`,`${min} minutes past ${h}`,[`${h} minutes past ${min}`,`${60-min} minutes past ${h}`],`${digital} means ${min} minutes have passed since ${h} o'clock.`,`Digits after the colon show minutes past the hour.`,cv());
  if(t===2)return draft(`Where should the minute hand point at ${digital}?`,`At minute ${min}`,[`At minute ${h}`,`At minute ${60-min}`],`The minute digits are ${String(min).padStart(2,"0")}, so the long hand marks minute ${min}.`,`Count minute marks clockwise from 12.`,cv());
  if(t===3)return draft(`At ${digital}, where should the hour hand be?`,`A little past ${h}`,[`Exactly on ${h+1}`,`Exactly on ${min}`],`The hour hand moves gradually from ${h} toward ${h+1} as minutes pass.`,`It should not stay exactly on the hour after minutes have passed.`,cv());
  if(t===4){const later=min+6,lh=later>=60?h+1:h,lm=later%60;return draft(`What time is 6 minutes after ${digital}?`,`${lh}:${String(lm).padStart(2,"0")}`,[`${h}:${String(Math.max(0,min-6)).padStart(2,"0")}`,`${h+1}:${String(min).padStart(2,"0")}`],`Count forward 6 minutes from ${digital}.`,`Move one minute mark at a time and regroup at 60.`,cv(lh,lm,`Analog clock showing 6 minutes after ${digital}.`));}
  if(t===5){const before=min>=5?`${h}:${String(min-5).padStart(2,"0")}`:`${h-1}:${String(min+55).padStart(2,"0")}`;return draft(`What time is 5 minutes before ${digital}?`,before,[`${h}:${String((min+5)%60).padStart(2,"0")}`,`${h-1}:${String(min).padStart(2,"0")}`],`Count back 5 minutes from ${digital}.`,`Move anticlockwise across the hour if needed.`,cv());}
  if(t===6)return draft(`A student reads ${digital} as ${min}:${h}. What was reversed?`,`The hour and minute parts`,["The clock direction","The number of days"],`Digital time writes hour before the colon and minutes after it.`,`Label the two sides of the colon.`,cv());
  return draft(`Why is the hour hand not exactly on ${h} at ${digital}?`,`It moves toward the next hour as minutes pass`,["It only moves at midnight","The minute hand pushes it"],`The hour hand moves continuously, so after ${min} minutes it is between ${h} and ${h+1}.`,`Use the fraction of the hour that has passed.`,cv());
}

function buildY3SP01(i){
  const s=Math.floor(i/8),t=i%8,objects=[["cube","6 square faces"],["rectangular prism","6 rectangular faces"],["cylinder","2 flat circular faces and a curved surface"],["cone","1 flat circular face and a curved surface"],["sphere","one curved surface"]], [name,feature]=objects[s];
  const v=(text,alt)=>model("solids","classify_3d_objects",alt,{shape:name==="rectangular prism"?"cube":name,footer:text,caption:"Classify by features and use"});
  if(t===0)return draft(`Which description matches a ${name}?`,feature,["only one straight edge","no surfaces at all"],`A ${name} has ${feature}.`,`Check faces, edges, vertices and curved surfaces.`,v(name,`A classroom model of a ${name} with ${feature}.`));
  if(t===1)return draft(`Which object is shaped most like a ${name}?`,name==="cube"?"A dice":name==="rectangular prism"?"A cereal box":name==="cylinder"?"A drink can":name==="cone"?"A party hat":"A ball",["A sheet of paper","A flat triangle"],`The everyday object shares the ${name}'s three-dimensional features.`,`Ignore colour and compare shape features.`,v(`${name} ↔ everyday object`,`A ${name} beside a matching everyday object.`));
  if(t===2)return draft(`Why is a ${name} useful for some designs?`,name==="sphere"?"It can roll in every direction":name==="cylinder"?"It can roll and also stand on a flat face":name==="cone"?"It has a pointed end and a flat base":"Its flat faces can stack",["Its colour never changes","It has no measurable features"],`The object's geometric features affect how it rolls, stacks or fits.`,`Connect a visible feature to a practical use.`,v(name,`A ${name} shown in a practical stacking or rolling situation.`));
  if(t===3)return draft(`Which feature is best for sorting a mixed set of 3D objects?`,`Whether surfaces are flat or curved`,["The owner's favourite colour","Where the objects were found"],`Flat and curved surfaces are geometric features that support consistent classification.`,`Choose a feature another person can observe and repeat.`,v(`flat surfaces | curved surfaces`,`A sorting mat for flat and curved surfaces.`));
  if(t===4)return draft(`Can the same object belong to more than one useful group?`,`Yes, groups can use different features`,["No, every object has only one feature","Only if its colour changes"],`A cylinder can be grouped with rollers by its curved surface and stackers by its flat faces.`,`Change the sorting rule and test the object again.`,v(`${name} → group A and group B`,`One object linked to two feature-based groups.`));
  if(t===5)return draft(`Which object is most suitable for stacking?`,`An object with stable flat faces`,["A sphere with no flat face","An object chosen only for colour"],`Flat faces can rest securely against other flat faces.`,`Imagine placing another object on top.`,v(`flat face → stable stack`,`Two three-dimensional objects stacked using flat faces.`));
  if(t===6)return draft(`A student calls a cylinder a prism. What feature disproves this?`,`A cylinder has a curved surface`,["A cylinder is often colourful","A cylinder can be tall"],`Prisms have flat polygonal faces; a cylinder includes a curved surface.`,`Use defining geometric features.`,v(`cylinder ≠ prism`,`A cylinder and prism compared by surface type.`));
  return draft(`Why is “it is big” a weak classification reason?`,`Size can change without changing the object type`,["Big objects have no faces","Size is always a colour"],`Classification should use defining features such as faces, edges, vertices and surfaces.`,`Ask whether a smaller version would still be the same object.`,v(`${name}: features, not size`,`Large and small versions of the same three-dimensional object.`));
}

const BUILDERS = {
  AC9M3A01: buildY3A01, AC9M3A02: buildY3A02, AC9M3A03: buildY3A03,
  AC9M3M01: buildY3M01, AC9M3M02: buildY3M02, AC9M3M03: buildY3M03, AC9M3M04: buildY3M04, AC9M3M05: buildM05, AC9M3M06: buildY3M06,
  AC9M3N01: buildY3N01, AC9M3N02: buildY3N02, AC9M3N03: buildY3N03, AC9M3N04: buildY3N04, AC9M3N05: buildY3N05, AC9M3N06: buildN06, AC9M3N07: buildY3N07,
  AC9M3SP01: buildY3SP01, AC9M3SP02: buildSP02, AC9M3ST01: buildST01, AC9M3ST02: buildST02, AC9M3ST03: buildY3ST03,
  AC9M3P01: buildY3P01, AC9M3P02: buildY3P02
};

if (CODES.length !== 23 || CODES.some((code) => !BUILDERS[code])) throw new Error(`Expected 23 mapped Year 3 Maths codes; found ${CODES.join(", ")}`);
fs.mkdirSync(BANK_ROOT, { recursive: true });
fs.mkdirSync(VISUAL_ROOT, { recursive: true });

const report = [];
for (const code of CODES) {
  const sources = Array.from({ length: 40 }, (_, index) => BUILDERS[code](index));
  const items = sources.map((source, index) => itemFor(code, source, index));
  const sprite = renderSprite(items);
  fs.writeFileSync(path.join(VISUAL_ROOT, `${code.toLowerCase()}.svg`), sprite);
  const output = items.map(({ _visual_id, _visual_model, ...item }) => item);
  fs.writeFileSync(path.join(BANK_ROOT, `${code.toLowerCase()}.json`), `${JSON.stringify(output, null, 2)}\n`);
  report.push({ code, title: UNITS[code].title, practice: 24, test: 16, total: 40 });
}

console.log(JSON.stringify({ year_level: "Year 3", subject: "math", codes: report.length, items: report.length * 40, banks: report, status: "BUILT" }, null, 2));
