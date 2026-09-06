export function year2EnglishBankProfile(items) {
  if (!Array.isArray(items) || !items.length) throw new Error("Bank must be a non-empty JSON array");
  const schemas = new Set(items.map((item) => item?.quality_schema || "production-v1"));
  if (schemas.size !== 1 || !["production-v1", "student-facing-v3"].includes([...schemas][0])) {
    throw new Error("Bank has mixed or unsupported quality schemas");
  }
  const studentFacing = schemas.has("student-facing-v3");
  return { studentFacing, practiceCount: studentFacing ? 40 : 24, testCount: 16,
    practiceAttempt: studentFacing ? 40 : 8, testAttempt: 12,
    practiceShuffle: !studentFacing, practiceCycle: !studentFacing };
}

export function needsEditingChoiceSpeech(item) {
  return item.curriculum_code === "AC9E2LA10" && /_(?:apply|direct|discriminate)$/.test(item.skill || "");
}

// Preserve the spoken punctuation/capital descriptions used by the original
// production builder when generating or repairing the student-facing bank.
export function editingChoiceSpeech(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  const capitalWords = [...text.matchAll(/\b[A-Z][a-z]*/g)].map((match) => match[0]);
  const commaWords = [...text.matchAll(/\b([A-Za-z]+),/g)].map((match) => match[1]);
  const parts = [capitalWords.length ? `Capital words: ${capitalWords.join(", ")}.` : "There are no capital words."];
  parts.push(commaWords.length ? `Commas come after: ${commaWords.join(", ")}.` : "There are no commas.");
  if (text.includes("—")) parts.push("There is a dash between the title and the list.");
  if (/[.!?]$/.test(text)) parts.push(`The text ends with ${text.endsWith(".") ? "a full stop" : text.endsWith("!") ? "an exclamation mark" : "a question mark"}.`);
  parts.push(`The text reads: ${text}`);
  return parts.join(" ");
}

export function updateStudentFacingPracticeCopy(html) {
  return html
    .replaceAll("with 8 progressive questions from a 40-question bank", "with 40 progressive questions")
    .replaceAll("Practice rotates 8 questions from a 40-question bank", "Practice contains 40 progressive questions")
    .replaceAll("This page draws 8 questions from a 40-question practice bank", "This page presents all 40 progressive Practice questions")
    .replace(/(id="questionCount">)8(?=<\/span>)/g, (_match, prefix) => `${prefix}40`)
    .replace(/>24(<\/span><span class="summary-label">Question bank)/g, ">40$1");
}
