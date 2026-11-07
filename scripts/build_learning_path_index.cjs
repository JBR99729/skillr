const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const { units } = JSON.parse(fs.readFileSync(path.join(root, 'data/curriculum-units.json'), 'utf8'));

const STOP = new Set([
  "and","the","a","an","of","to","in","on","for","with","using","use","used","from","by","as","at","is","are","be","or","that","this","these","their","its","into","including","through","within","between","different","variety","ways","situations","contexts","objects","events","students","student","recognise","identify","describe","explore","explain","compare","create","apply","investigate","represent"
]);

const words = (value) => String(value || "")
  .toLowerCase()
  .replace(/\\frac\s*\{?(\d+)\}?\s*\{?(\d+)\}?/g, "$1 $2 fraction")
  .replace(/[^a-z0-9]+/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 2 && !STOP.has(word));

const tokenSet = (unit) => new Set(words(`${unit.title || ""} ${unit.description || ""}`));
const overlap = (a, b) => {
  let shared = 0;
  a.forEach((token) => { if (b.has(token)) shared += 1; });
  return shared;
};

const sameText = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
const cleanTitle = (unit) => String(unit.title || unit.description || unit.code)
  .replace(/\\frac\s*\{?(\d+)\}?\s*\{?(\d+)\}?/g, "$1/$2")
  .replace(/\s+/g, " ")
  .trim();

function scoreCandidate(current, candidate, relation) {
  if (!candidate || candidate.code === current.code || candidate.learningArea !== current.learningArea) return -999;
  const shared = overlap(tokens.get(current), tokens.get(candidate));
  const sameStrand = Boolean(current.strand && sameText(current.strand, candidate.strand));
  const sameSubStrand = Boolean(current.subStrand && sameText(current.subStrand, candidate.subStrand));

  // A shared broad strand alone is not enough. Require either genuine concept
  // vocabulary overlap or an exact sub-strand match so links stay pedagogical.
  if (shared === 0 && !sameSubStrand) return -999;

  let score = shared * 5;
  if (sameStrand) score += 5;
  if (sameSubStrand) score += 12;

  if (relation === "prior") {
    if (candidate.yearNumber !== current.yearNumber - 1) return -999;
    score += 8;
  } else if (relation === "next") {
    if (candidate.yearNumber !== current.yearNumber + 1) return -999;
    score += 8;
  } else if (relation === "companion") {
    if (candidate.yearNumber !== current.yearNumber) return -999;
    score += 5;
    const distance = Math.abs(Number(candidate.sourceOrder || 0) - Number(current.sourceOrder || 0));
    score += Math.max(0, 3 - distance);
  }
  return score;
}

function choose(units, current, relation, used) {
  return units
    .filter((unit) => !used.has(unit.code))
    .map((unit) => ({ unit, score: scoreCandidate(current, unit, relation) }))
    .filter((item) => item.score >= (relation === "companion" ? 10 : 13))
    .sort((a, b) => b.score - a.score || Number(a.unit.sourceOrder || 0) - Number(b.unit.sourceOrder || 0))[0]?.unit || null;
}


const tokens = new Map(units.map(unit => [unit, tokenSet(unit)]));
const levels = new Map();
for (const unit of units) {
  const key = `${unit.learningArea}:${unit.yearNumber}`;
  if (!levels.has(key)) levels.set(key, []);
  levels.get(key).push(unit);
}
const topics = {};
const paths = {};
for (const unit of units) {
  topics[unit.code] = {
    code: unit.code, title: cleanTitle(unit), url: unit.url, yearNumber: unit.yearNumber,
    yearFolder: unit.yearFolder, subjectSlug: unit.subjectSlug, learningArea: unit.learningArea,
  };
  if (unit.yearNumber < 1 || unit.yearNumber > 10) continue;
  const used = new Set([unit.code]);
  const links = {};
  for (const [relation, year] of [['prior', unit.yearNumber - 1], ['companion', unit.yearNumber], ['next', unit.yearNumber + 1]]) {
    if (year < 1 || year > 10) continue;
    const candidates = levels.get(`${unit.learningArea}:${year}`) || [];
    const match = choose(candidates, unit, relation, used);
    if (!match) continue;
    links[relation] = match.code;
    used.add(match.code);
  }
  if (Object.keys(links).length) paths[unit.code] = links;
}
const output = JSON.stringify({ topics, paths }) + '\n';
fs.writeFileSync(path.join(root, 'assets/learning-path-index.json'), output);
