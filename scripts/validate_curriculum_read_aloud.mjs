import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("../quiz/assets/script.js", import.meta.url),
  "utf8"
);
const context = vm.createContext({
  Audio: class Audio {
    pause() {}
    play() {
      return Promise.resolve();
    }
  },
  console,
  document: {
    addEventListener() {}
  }
});

vm.runInContext(
  `${source}\n;globalThis.readAloudTestApi = { isQuestionReadAloudPath, normaliseSpeechText, getQuestionSpeechText };`,
  context
);

const {
  isQuestionReadAloudPath,
  normaliseSpeechText,
  getQuestionSpeechText
} = context.readAloudTestApi;

assert.equal(
  isQuestionReadAloudPath(
    "/quiz/grade-k/math/ac9mfn02/practice/"
  ),
  true
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/year-2/science/ac9s2u01/test/index.html"
  ),
  true
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/year-2/daily-drills/math/fractions/"
  ),
  true
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/daily-drills/english/reading-comprehension/"
  ),
  true
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/year-2/math/ac9m2n02/"
  ),
  true
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/year-2/math/ac9m2n02/worksheet/"
  ),
  false
);
assert.equal(
  isQuestionReadAloudPath(
    "/quiz/year-2/math/ac9m2n02/practice/result/"
  ),
  false
);
assert.equal(
  isQuestionReadAloudPath("/quiz/review.html"),
  false
);
assert.equal(
  isQuestionReadAloudPath(
    "/year2/maths/ac9m2n02-topic-guide/"
  ),
  false
);

assert.equal(
  normaliseSpeechText("5 × 3 + 2 = 17"),
  "5 multiplied by 3 plus 2 equals 17"
);
assert.equal(
  getQuestionSpeechText({
    question: "What is 5 × 3?",
    answers: ["10", "15"]
  }),
  "What is 5 multiplied by 3? Option A. 10. Option B. 15."
);
assert.equal(
  getQuestionSpeechText({
    question: "● ● ●",
    audio_prompt: "How many dots are shown?",
    answers: ["2", "3"]
  }),
  "How many dots are shown? Option A. 2. Option B. 3."
);

console.log("Question read-aloud validation passed.");
