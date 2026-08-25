"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m7n01-t-001",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square meaning and notation",
    "elaborations": [
      "E1"
    ],
    "difficulty": 3,
    "printable": true,
    "type": "single",
    "question": "A student says √196 = −14 because (−14)² = 196. What is the best correction?",
    "audioPrompt": "A student says √196 = −14 because (−14)² = 196. What is the best correction?",
    "answers": [
      "The radical symbol gives the principal root, so √196 = 14",
      "Negative numbers cannot be squared",
      "Both 14 and −14 are written as √196",
      "√196 = 98"
    ],
    "correct": 0,
    "explanation": "Although both 14 and −14 solve x² = 196, √196 denotes the principal, non-negative root.\nHint: Distinguish an equation's solutions from the radical symbol.",
    "structuredExplanation": {
      "summary": "Although both 14 and −14 solve x² = 196, √196 denotes the principal, non-negative root.",
      "hint": "Distinguish an equation's solutions from the radical symbol."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-002",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "two-digit squares with area models",
    "elaborations": [
      "E2"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A 47 cm square is split using 47 = 40 + 7. Which total gives its area?",
    "audioPrompt": "A 47 cm square is split using 47 = 40 + 7. Which total gives its area?",
    "visual": "A 47 by 47 square partitioned into 40 and 7.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"A 47 by 47 square partitioned into 40 and 7.\"><use href=\"/assets/assessment-visuals/year7/maths/ac9m7n01.svg#split\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year7/maths/ac9m7n01.svg#split",
      "alt_text": "A 47 by 47 square partitioned into 40 and 7."
    },
    "answers": [
      "1600 + 280 + 49",
      "1600 + 560 + 49",
      "1600 + 47",
      "1880 + 49"
    ],
    "correct": 1,
    "explanation": "47² = 40² + 2 × 40 × 7 + 7² = 1600 + 560 + 49 = 2209.\nHint: Include two 40-by-7 rectangles.",
    "structuredExplanation": {
      "summary": "47² = 40² + 2 × 40 × 7 + 7² = 1600 + 560 + 49 = 2209.",
      "hint": "Include two 40-by-7 rectangles."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-003",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "two-digit squares with area models",
    "elaborations": [
      "E2"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A student calculates 28² as 30² − 2² = 896. Which correction is valid?",
    "audioPrompt": "A student calculates 28² as 30² − 2² = 896. Which correction is valid?",
    "answers": [
      "Use 30² − 2 × 30 × 2 + 2² = 784",
      "Use 30² − 30 × 2 = 840",
      "Use 28 × 2 = 56",
      "Use 30² − 4 = 896"
    ],
    "correct": 0,
    "explanation": "(30 − 2)² = 30² − 2 × 30 × 2 + 2² = 784.\nHint: Apply the complete square-of-a-difference identity.",
    "structuredExplanation": {
      "summary": "(30 − 2)² = 30² − 2 × 30 × 2 + 2² = 784.",
      "hint": "Apply the complete square-of-a-difference identity."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-004",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "bounding square roots",
    "elaborations": [
      "E3"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "Without a calculator, which is the tightest whole-number interval for √210?",
    "audioPrompt": "Without a calculator, which is the tightest whole-number interval for √210?",
    "answers": [
      "13 < √210 < 14",
      "14 < √210 < 15",
      "15 < √210 < 16",
      "16 < √210 < 17"
    ],
    "correct": 1,
    "explanation": "14² = 196 and 15² = 225, so 14 < √210 < 15.\nHint: Find consecutive squares around 210.",
    "structuredExplanation": {
      "summary": "14² = 196 and 15² = 225, so 14 < √210 < 15.",
      "hint": "Find consecutive squares around 210."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-005",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "bounding square roots",
    "elaborations": [
      "E3"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A square has area A where 82 < A < 90. Which statement about its side s is guaranteed?",
    "audioPrompt": "A square has area A where 82 < A < 90. Which statement about its side s is guaranteed?",
    "answers": [
      "8 < s < 9",
      "9 < s < 10",
      "s = 9",
      "s > 10"
    ],
    "correct": 1,
    "explanation": "Because 81 < 82 < A < 90 < 100, taking principal roots gives 9 < s < 10.\nHint: Bracket the entire area interval between consecutive perfect squares.",
    "structuredExplanation": {
      "summary": "Because 81 < 82 < A < 90 < 100, taking principal roots gives 9 < s < 10.",
      "hint": "Bracket the entire area interval between consecutive perfect squares."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-006",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "patterns in perfect squares",
    "elaborations": [
      "E4"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "The differences between consecutive square numbers are 3, 5, 7, 9, …. What is the difference between 24² and 23²?",
    "audioPrompt": "The differences between consecutive square numbers are 3, 5, 7, 9, …. What is the difference between 24² and 23²?",
    "answers": [
      "23",
      "24",
      "47",
      "48"
    ],
    "correct": 2,
    "explanation": "n² − (n−1)² = 2n−1, so 24² − 23² = 47.\nHint: Use the next odd difference.",
    "structuredExplanation": {
      "summary": "n² − (n−1)² = 2n−1, so 24² − 23² = 47.",
      "hint": "Use the next odd difference."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-007",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "patterns in perfect squares",
    "elaborations": [
      "E4"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A number ends in 8. What can be concluded?",
    "audioPrompt": "A number ends in 8. What can be concluded?",
    "answers": [
      "It must be a perfect square",
      "It cannot be a perfect square",
      "Its square root is 4",
      "It is between two odd squares"
    ],
    "correct": 1,
    "explanation": "No perfect square ends in 8, as checking the squares of final digits 0–9 shows.\nHint: Use the possible final digits of squares.",
    "structuredExplanation": {
      "summary": "No perfect square ends in 8, as checking the squares of final digits 0–9 shows.",
      "hint": "Use the possible final digits of squares."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-008",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "patterns in perfect squares",
    "elaborations": [
      "E4"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A sequence begins 9, 16, 25, 36. Which evidence best shows it is a square-number sequence?",
    "audioPrompt": "A sequence begins 9, 16, 25, 36. Which evidence best shows it is a square-number sequence?",
    "answers": [
      "Terms increase",
      "First differences are 7, 9, 11 and the second difference is 2",
      "Every term is odd",
      "The ratio is constant"
    ],
    "correct": 1,
    "explanation": "The terms are consecutive squares; their odd first differences rise by 2, producing constant second difference 2.\nHint: Compare differences, not ratios.",
    "structuredExplanation": {
      "summary": "The terms are consecutive squares; their odd first differences rise by 2, producing constant second difference 2.",
      "hint": "Compare differences, not ratios."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-009",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square area, side and perimeter",
    "elaborations": [
      "E5"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A square tiled floor has perimeter 68 tile lengths. How many tiles cover it?",
    "audioPrompt": "A square tiled floor has perimeter 68 tile lengths. How many tiles cover it?",
    "answers": [
      "17",
      "34",
      "136",
      "289"
    ],
    "correct": 3,
    "explanation": "The side is 68 ÷ 4 = 17 tiles, so the area is 17² = 289 tiles.\nHint: Reverse perimeter to side, then square.",
    "structuredExplanation": {
      "summary": "The side is 68 ÷ 4 = 17 tiles, so the area is 17² = 289 tiles.",
      "hint": "Reverse perimeter to side, then square."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-010",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square area, side and perimeter",
    "elaborations": [
      "E5"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A square lawn has area 324 m². A 1 m-wide path is built inside along every edge. What area remains as lawn?",
    "audioPrompt": "A square lawn has area 324 m². A 1 m-wide path is built inside along every edge. What area remains as lawn?",
    "answers": [
      "256 m²",
      "288 m²",
      "289 m²",
      "322 m²"
    ],
    "correct": 0,
    "explanation": "The original side is √324 = 18 m. Removing 1 m from both ends of each dimension leaves a 16 m square, with area 256 m².\nHint: The inner side is 18 − 2.",
    "structuredExplanation": {
      "summary": "The original side is √324 = 18 m. Removing 1 m from both ends of each dimension leaves a 16 m square, with area 256 m².",
      "hint": "The inner side is 18 − 2."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-011",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "two-digit squares with area models",
    "elaborations": [
      "E2"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "Which expression is equal to 31² and shows why?",
    "audioPrompt": "Which expression is equal to 31² and shows why?",
    "answers": [
      "30² + 1",
      "30² + 30 + 1",
      "30² + 2 × 30 + 1",
      "31 × 2"
    ],
    "correct": 2,
    "explanation": "(30 + 1)² contains two 30-by-1 strips and one 1-by-1 square.\nHint: Use the area model.",
    "structuredExplanation": {
      "summary": "(30 + 1)² contains two 30-by-1 strips and one 1-by-1 square.",
      "hint": "Use the area model."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-012",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square area, side and perimeter",
    "elaborations": [
      "E5"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A square photograph is enlarged so each side is three times as long. How does its area change?",
    "audioPrompt": "A square photograph is enlarged so each side is three times as long. How does its area change?",
    "answers": [
      "It triples",
      "It increases by 6",
      "It becomes 9 times as large",
      "It becomes 12 times as large"
    ],
    "correct": 2,
    "explanation": "Area depends on side², so multiplying each side by 3 multiplies area by 3² = 9.\nHint: Square the scale factor.",
    "structuredExplanation": {
      "summary": "Area depends on side², so multiplying each side by 3 multiplies area by 3² = 9.",
      "hint": "Square the scale factor."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-013",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square meaning and notation",
    "elaborations": [
      "E1"
    ],
    "difficulty": 3,
    "printable": true,
    "type": "single",
    "question": "Which list contains only perfect squares?",
    "audioPrompt": "Which list contains only perfect squares?",
    "answers": [
      "36, 49, 64, 81",
      "25, 45, 65, 85",
      "16, 32, 48, 64",
      "1, 9, 27, 81"
    ],
    "correct": 0,
    "explanation": "36 = 6², 49 = 7², 64 = 8² and 81 = 9².\nHint: Verify every entry.",
    "structuredExplanation": {
      "summary": "36 = 6², 49 = 7², 64 = 8² and 81 = 9².",
      "hint": "Verify every entry."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-014",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "bounding square roots",
    "elaborations": [
      "E3"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A square storage area must cover at least 200 m² using a whole-number side. What is the shortest possible side?",
    "audioPrompt": "A square storage area must cover at least 200 m² using a whole-number side. What is the shortest possible side?",
    "answers": [
      "14 m",
      "15 m",
      "16 m",
      "20 m"
    ],
    "correct": 1,
    "explanation": "14² = 196 is too small, while 15² = 225 meets the requirement.\nHint: Test consecutive whole-number sides around √200.",
    "structuredExplanation": {
      "summary": "14² = 196 is too small, while 15² = 225 meets the requirement.",
      "hint": "Test consecutive whole-number sides around √200."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-015",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "patterns in perfect squares",
    "elaborations": [
      "E4"
    ],
    "difficulty": 4,
    "printable": true,
    "type": "single",
    "question": "A student claims every number ending in 5 is a perfect square. Which counterexample disproves the claim?",
    "audioPrompt": "A student claims every number ending in 5 is a perfect square. Which counterexample disproves the claim?",
    "answers": [
      "5",
      "15",
      "25",
      "225"
    ],
    "correct": 1,
    "explanation": "15 ends in 5 but is not a perfect square.\nHint: One valid counterexample disproves an always claim.",
    "structuredExplanation": {
      "summary": "15 ends in 5 but is not a perfect square.",
      "hint": "One valid counterexample disproves an always claim."
    },
    "qualitySchema": "production-v2"
  },
  {
    "id": "ac9m7n01-t-016",
    "curriculumCode": "AC9M7N01",
    "bank": "test",
    "skill": "square area, side and perimeter",
    "elaborations": [
      "E5"
    ],
    "difficulty": 5,
    "printable": true,
    "type": "single",
    "question": "A square has area 400 cm². Its side is reduced by 10%, then reduced by another 2 cm. What is the new area?",
    "audioPrompt": "A square has area 400 cm². Its side is reduced by 10%, then reduced by another 2 cm. What is the new area?",
    "answers": [
      "256 cm²",
      "289 cm²",
      "324 cm²",
      "361 cm²"
    ],
    "correct": 0,
    "explanation": "The original side is 20 cm. Reducing by 10% gives 18 cm, then by 2 cm gives 16 cm; 16² = 256 cm².\nHint: Apply each side-length change before squaring.",
    "structuredExplanation": {
      "summary": "The original side is 20 cm. Reducing by 10% gives 18 cm, then by 2 cm gives 16 cm; 16² = 256 cm².",
      "hint": "Apply each side-length change before squaring."
    },
    "qualitySchema": "production-v2"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
