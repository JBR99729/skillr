"use strict";
window.skillrTestQuestions = [
  {
    "id": "ac9m4n07-t-001",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "estimate addition",
    "printable": true,
    "type": "single",
    "question": "Round each addend to the nearest hundred to estimate 642 + 279.",
    "audioPrompt": "Round each addend to the nearest hundred to estimate 642 + 279.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "About 900",
      "About 800",
      "About 1 000",
      "About 90"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 1,
    "correct": 0,
    "explanation": "642 rounds to 600 and 279 to 300. Their rounded sum is 900.\nHint: Use the same rounding place for both addends.",
    "structuredExplanation": {
      "summary": "642 rounds to 600 and 279 to 300. Their rounded sum is 900.",
      "hint": "Use the same rounding place for both addends."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-002",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "estimate subtraction",
    "printable": true,
    "type": "single",
    "question": "Estimate 1 908 − 1 187 by rounding both numbers to the nearest hundred.",
    "audioPrompt": "Estimate 1 908 − 1 187 by rounding both numbers to the nearest hundred.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "About 3 100",
      "About 800",
      "About 70",
      "About 700"
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 2,
    "correct": 3,
    "explanation": "1 908 rounds to 1 900 and 1 187 to 1 200. The difference is about 700.\nHint: Subtract the rounded amounts in the original order.",
    "structuredExplanation": {
      "summary": "1 908 rounds to 1 900 and 1 187 to 1 200. The difference is about 700.",
      "hint": "Subtract the rounded amounts in the original order."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-003",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "estimate product",
    "printable": true,
    "type": "single",
    "question": "Seven trays each hold 62 beads. Round 62 to the nearest ten to estimate the total.",
    "audioPrompt": "Seven trays each hold 62 beads. Round 62 to the nearest ten to estimate the total.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "About 490 beads",
      "About 420 beads",
      "About 69 beads",
      "About 4 200 beads"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 3,
    "correct": 1,
    "explanation": "62 is close to 60, so 7 × 60 = 420 is the requested estimate.\nHint: Keep the seven trays unchanged.",
    "structuredExplanation": {
      "summary": "62 is close to 60, so 7 × 60 = 420 is the requested estimate.",
      "hint": "Keep the seven trays unchanged."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-004",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "compatible quotient",
    "printable": true,
    "type": "single",
    "question": "Use 360 ÷ 9 to estimate 356 ÷ 9.",
    "audioPrompt": "Use 360 ÷ 9 to estimate 356 ÷ 9.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "About 4",
      "About 30",
      "About 40",
      "About 90"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 4,
    "correct": 2,
    "explanation": "360 is near 356 and divides exactly by 9. The easy quotient is 40.\nHint: Use the nearby compatible dividend provided.",
    "structuredExplanation": {
      "summary": "360 is near 356 and divides exactly by 9. The easy quotient is 40.",
      "hint": "Use the nearby compatible dividend provided."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-005",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "money rounding",
    "printable": true,
    "type": "single",
    "question": "Round a $23.45 price to the nearest dollar.",
    "audioPrompt": "Round a $23.45 price to the nearest dollar.",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "$24",
      "$23",
      "$23.50",
      "$20"
    ],
    "difficulty": 1,
    "difficultyTier": "confidence",
    "sequencePriority": 5,
    "correct": 1,
    "explanation": "45 cents is below half a dollar, so $23.45 is nearer $23 than $24.\nHint: Locate the halfway price $23.50.",
    "structuredExplanation": {
      "summary": "45 cents is below half a dollar, so $23.45 is nearer $23 than $24.",
      "hint": "Locate the halfway price $23.50."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-006",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "financial bounds",
    "printable": true,
    "type": "single",
    "question": "Six meals cost $4.30 each. Which bounds follow from using $4 and $5 per meal?",
    "audioPrompt": "Six meals cost $4.30 each. Which bounds follow from using $4 and $5 per meal?",
    "visual": "Six meals each cost $4.30. Six $4 parts total $24 and six $5 parts total $30, providing lower and upper bounds.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Six meals each cost $4.30. Six $4 parts total $24 and six $5 parts total $30, providing lower and upper bounds.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n07/test-cost-bounds.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n07/test-cost-bounds.svg#model",
      "alt_text": "Six meals each cost $4.30. Six $4 parts total $24 and six $5 parts total $30, providing lower and upper bounds."
    },
    "answers": [
      "More than $24 and less than $30",
      "More than $4 and less than $5",
      "More than $30 and less than $36",
      "Exactly $24"
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 6,
    "correct": 0,
    "explanation": "Each meal is between $4 and $5. Six meals are therefore between $24 and $30.\nHint: Multiply both price bounds by six.",
    "structuredExplanation": {
      "summary": "Each meal is between $4 and $5. Six meals are therefore between $24 and $30.",
      "hint": "Multiply both price bounds by six."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-007",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "upward shopping budget",
    "printable": true,
    "type": "single",
    "question": "Prices are $8.20, $6.10 and $4.65. Round each upward to a whole dollar. What is the estimated budget?",
    "audioPrompt": "Prices are $8.20, $6.10 and $4.65. Round each upward to a whole dollar. What is the estimated budget?",
    "visual": "Three prices, $8.20, $6.10 and $4.65, round upward to $9, $7 and $5 respectively.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"Three prices, $8.20, $6.10 and $4.65, round upward to $9, $7 and $5 respectively.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n07/test-upward-budget.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n07/test-upward-budget.svg#model",
      "alt_text": "Three prices, $8.20, $6.10 and $4.65, round upward to $9, $7 and $5 respectively."
    },
    "answers": [
      "$21",
      "$19",
      "$18",
      "$20"
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 7,
    "correct": 0,
    "explanation": "The upward prices are $9, $7 and $5, totalling $21. This covers the listed items.\nHint: Do not round a price downward in an upward budget.",
    "structuredExplanation": {
      "summary": "The upward prices are $9, $7 and $5, totalling $21. This covers the listed items.",
      "hint": "Do not round a price downward in an upward budget."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-008",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "preserve known count",
    "printable": true,
    "type": "single",
    "question": "Thirteen tickets cost $6.40 each. Keep all 13 tickets and round the price upward to $7. What budget estimate results?",
    "audioPrompt": "Thirteen tickets cost $6.40 each. Keep all 13 tickets and round the price upward to $7. What budget estimate results?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "$78",
      "$91",
      "$70",
      "$84"
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 8,
    "correct": 1,
    "explanation": "13 × $7 = $91. Since $7 is above $6.40, the estimate covers all thirteen tickets.\nHint: Use the exact number of tickets with the upward price.",
    "structuredExplanation": {
      "summary": "13 × $7 = $91. Since $7 is above $6.40, the estimate covers all thirteen tickets.",
      "hint": "Use the exact number of tickets with the upward price."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-009",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "addition both up",
    "printable": true,
    "type": "single",
    "question": "228 + 341 is estimated by rounding both numbers upward to the next hundred: 300 + 400 = 700. What follows?",
    "audioPrompt": "228 + 341 is estimated by rounding both numbers upward to the next hundred: 300 + 400 = 700. What follows?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "700 is below the exact sum because both addends increased.",
      "700 must equal the exact sum.",
      "700 is above the exact sum because both addends increased.",
      "An estimate cannot be compared with an exact answer."
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 9,
    "correct": 2,
    "explanation": "The exact sum is 569. Both upward changes increase it, so 700 is an overestimate.\nHint: Track the effect of increasing both addends.",
    "structuredExplanation": {
      "summary": "The exact sum is 569. Both upward changes increase it, so 700 is an overestimate.",
      "hint": "Track the effect of increasing both addends."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-010",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "addition rounding cancellation",
    "printable": true,
    "type": "single",
    "question": "246 + 354 is 600. Rounding the addends to the nearest hundred also gives 200 + 400 = 600. Why?",
    "audioPrompt": "246 + 354 is 600. Rounding the addends to the nearest hundred also gives 200 + 400 = 600. Why?",
    "visual": "246 decreases by 46 to 200, while 354 increases by 46 to 400. The original and rounded sums are both 600.",
    "visualHtml": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"246 decreases by 46 to 200, while 354 increases by 46 to 400. The original and rounded sums are both 600.\"><use href=\"/assets/assessment-visuals/year4/math/ac9m4n07/test-mixed-addition.svg#model\"></use></svg>",
    "visualMeta": {
      "type": "svg",
      "asset_path": "/assets/assessment-visuals/year4/math/ac9m4n07/test-mixed-addition.svg#model",
      "alt_text": "246 decreases by 46 to 200, while 354 increases by 46 to 400. The original and rounded sums are both 600."
    },
    "answers": [
      "Every rounded estimate is exactly correct.",
      "An estimate is never allowed to equal an exact answer.",
      "Both numbers decreased by 46.",
      "The decrease of 46 is balanced by an increase of 46."
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 10,
    "correct": 3,
    "explanation": "Here the equal opposite changes cancel in addition. That explains this equality without claiming that all mixed rounding is exact.\nHint: Calculate how much each addend changes.",
    "structuredExplanation": {
      "summary": "Here the equal opposite changes cancel in addition. That explains this equality without claiming that all mixed rounding is exact.",
      "hint": "Calculate how much each addend changes."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-011",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "product both down",
    "printable": true,
    "type": "single",
    "question": "32 × 47 is estimated as 30 × 40 = 1 200. Is the estimate above or below the exact product 1 504?",
    "audioPrompt": "32 × 47 is estimated as 30 × 40 = 1 200. Is the estimate above or below the exact product 1 504?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "Above: both positive factors decreased.",
      "Equal: rounding preserves every product.",
      "Neither: 1 200 and 1 504 cannot be compared.",
      "Below: both positive factors decreased."
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 11,
    "correct": 3,
    "explanation": "Reducing both positive factors reduces their product. The estimate is 304 below the exact result.\nHint: Connect factor size to the resulting product.",
    "structuredExplanation": {
      "summary": "Reducing both positive factors reduces their product. The estimate is 304 below the exact result.",
      "hint": "Connect factor size to the resulting product."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-012",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "mixed rounding counterexample",
    "printable": true,
    "type": "single",
    "question": "The exact product 12 × 21 is 252. Compare 10 × 20 = 200, 20 × 20 = 400 and 20 × 30 = 600. Which is closest?",
    "audioPrompt": "The exact product 12 × 21 is 252. Compare 10 × 20 = 200, 20 × 20 = 400 and 20 × 30 = 600. Which is closest?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "400, because mixed rounding must always be best",
      "200, the both-down estimate",
      "600, the both-up estimate",
      "All three are equally close."
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 12,
    "correct": 1,
    "explanation": "The errors are 52, 148 and 348. The both-down estimate is closest in this case.\nHint: Compare the numerical distances from 252.",
    "structuredExplanation": {
      "summary": "The errors are 52, 148 and 348. The both-down estimate is closest in this case.",
      "hint": "Compare the numerical distances from 252."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-013",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "financial place value error",
    "printable": true,
    "type": "single",
    "question": "Six bags cost $9.95 each. A displayed total is $597. Which estimate checks this result?",
    "audioPrompt": "Six bags cost $9.95 each. A displayed total is $597. Which estimate checks this result?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "6 × $10 is about $60, so $597 is far too large.",
      "6 × $100 is about $600, so $597 is correct.",
      "6 + $10 is about $16, so addition should replace multiplication.",
      "$9.95 rounds to $0, so no payment is needed."
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 13,
    "correct": 0,
    "explanation": "The expected total is near $60. Exact calculation gives $59.70, so the displayed amount has the wrong place-value scale.\nHint: Choose a whole-dollar price close to $9.95.",
    "structuredExplanation": {
      "summary": "The expected total is near $60. Exact calculation gives $59.70, so the displayed amount has the wrong place-value scale.",
      "hint": "Choose a whole-dollar price close to $9.95."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-014",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "estimated change",
    "printable": true,
    "type": "single",
    "question": "A shopper pays $50 for items costing $12.60 and $15.20. Round each price to the nearest dollar. What is the estimated change?",
    "audioPrompt": "A shopper pays $50 for items costing $12.60 and $15.20. Round each price to the nearest dollar. What is the estimated change?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "About $28",
      "About $78",
      "About $22",
      "About $2.20"
    ],
    "difficulty": 2,
    "difficultyTier": "understanding",
    "sequencePriority": 14,
    "correct": 2,
    "explanation": "The estimated cost is $13 + $15 = $28, so estimated change is $50 − $28 = $22. Exact change is $22.20.\nHint: Find the cost estimate before finding the change.",
    "structuredExplanation": {
      "summary": "The estimated cost is $13 + $15 = $28, so estimated change is $50 − $28 = $22. Exact change is $22.20.",
      "hint": "Find the cost estimate before finding the change."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-015",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "budget estimate limit",
    "printable": true,
    "type": "single",
    "question": "A shopper has $44. Rounding all planned prices upward gives a $45 total estimate. No exact total has been calculated yet. Which conclusion is valid?",
    "audioPrompt": "A shopper has $44. Rounding all planned prices upward gives a $45 total estimate. No exact total has been calculated yet. Which conclusion is valid?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "The actual total must be exactly $45.",
      "The shopper definitely cannot afford the items.",
      "The estimate alone does not prove the actual cost exceeds $44; check the exact prices.",
      "The actual total must be less than $40."
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 15,
    "correct": 2,
    "explanation": "An upper estimate can be larger than the available money while the actual cost is lower. Exact calculation is needed to settle a close budget decision.\nHint: Distinguish an upper planning amount from the actual bill.",
    "structuredExplanation": {
      "summary": "An upper estimate can be larger than the available money while the actual cost is lower. Exact calculation is needed to settle a close budget decision.",
      "hint": "Distinguish an upper planning amount from the actual bill."
    },
    "qualitySchema": "production-v1"
  },
  {
    "id": "ac9m4n07-t-016",
    "curriculumCode": "AC9M4N07",
    "bank": "test",
    "skill": "estimate not exact proof",
    "printable": true,
    "type": "single",
    "question": "726 + 198 is estimated as 700 + 200 = 900. A calculator displays 914. Which conclusion is correct?",
    "audioPrompt": "726 + 198 is estimated as 700 + 200 = 900. A calculator displays 914. Which conclusion is correct?",
    "visual": "",
    "visualHtml": "",
    "visualMeta": {
      "type": "none",
      "asset_path": "",
      "alt_text": ""
    },
    "answers": [
      "914 is proven correct because it is close to 900.",
      "914 must be correct because it is even.",
      "900 must be the exact sum because it is the estimate.",
      "914 has a plausible size, but exact addition gives 924, so the entry needs checking."
    ],
    "difficulty": 3,
    "difficultyTier": "reasoning",
    "sequencePriority": 16,
    "correct": 3,
    "explanation": "Estimation checks scale. Exact addition, 726 + 200 − 2, gives 924 and reveals the incorrect display.\nHint: Use an exact strategy after the approximate check.",
    "structuredExplanation": {
      "summary": "Estimation checks scale. Exact addition, 726 + 200 − 2, gives 924 and reveals the incorrect display.",
      "hint": "Use an exact strategy after the approximate check."
    },
    "qualitySchema": "production-v1"
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
