"use strict";
window.skillrTestQuestions = [
  {
    "id": "AC9M7N02-T-001",
    "type": "single",
    "question": "What is the prime factorisation of 1152?",
    "answers": [
      "2⁷×3²",
      "2⁶×3²",
      "2⁵×3³",
      "2⁷×3"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "1152 = 128×9 = 2⁷×3².\nHint: Check by multiplying the prime powers."
  },
  {
    "id": "AC9M7N02-T-002",
    "type": "single",
    "question": "What is the prime factorisation of 945?",
    "answers": [
      "3³×5×7",
      "3²×5×7",
      "3²×5²×7",
      "3×5×7²"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "945 = 27×35 = 3³×5×7.\nHint: Use repeated division by 3, then 5 and 7."
  },
  {
    "id": "AC9M7N02-T-003",
    "type": "single",
    "question": "Which number equals 2⁴×3×11?",
    "answers": [
      "528",
      "264",
      "352",
      "176"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "16×3×11 = 528.\nHint: Evaluate the prime power first."
  },
  {
    "id": "AC9M7N02-T-004",
    "type": "single",
    "question": "Find the HCF of 270 and 630.",
    "answers": [
      "90",
      "30",
      "45",
      "15"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "270=2×3³×5 and 630=2×3²×5×7, so HCF=2×3²×5=90.\nHint: Use the lower exponent of each common prime."
  },
  {
    "id": "AC9M7N02-T-005",
    "type": "single",
    "question": "Find the LCM of 56 and 98.",
    "answers": [
      "392",
      "196",
      "784",
      "112"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "56=2³×7 and 98=2×7², so LCM=2³×7²=392.\nHint: Use the higher exponent of each prime."
  },
  {
    "id": "AC9M7N02-T-006",
    "type": "single",
    "question": "Find the HCF of 128 and 160.",
    "answers": [
      "32",
      "16",
      "64",
      "8"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "128=2⁷ and 160=2⁵×5, so HCF=2⁵=32.\nHint: Take the smaller common power."
  },
  {
    "id": "AC9M7N02-T-007",
    "type": "single",
    "question": "Find the LCM of 72 and 90.",
    "answers": [
      "360",
      "720",
      "180",
      "540"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "72=2³×3² and 90=2×3²×5, so LCM=2³×3²×5=360.\nHint: Include every prime at the highest required power."
  },
  {
    "id": "AC9M7N02-T-008",
    "type": "single",
    "question": "If N=2⁶×3², which number is a factor of N?",
    "answers": [
      "288",
      "432",
      "216",
      "320"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "288=2⁵×3², which fits within N's exponents.\nHint: A factor's prime exponents cannot exceed those in N."
  },
  {
    "id": "AC9M7N02-T-009",
    "type": "single",
    "question": "A=2⁴×7 and B=2²×7². What is HCF(A,B)?",
    "answers": [
      "2²×7",
      "2⁴×7",
      "2²×7²",
      "2⁴"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "HCF uses minimum exponents: 2²×7.\nHint: Compare exponents prime by prime."
  },
  {
    "id": "AC9M7N02-T-010",
    "type": "single",
    "question": "A=2⁵×3²×7 and B=2³×3³×5. What is LCM(A,B)?",
    "answers": [
      "2⁵×3³×5×7",
      "2³×3²",
      "2⁵×3²×7",
      "2³×3³×5"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "LCM takes the maximum exponent of every prime present.\nHint: Build the LCM from all prime bases."
  },
  {
    "id": "AC9M7N02-T-011",
    "type": "single",
    "question": "N=2³×3⁴. How many positive factors does N have?",
    "answers": [
      "20",
      "12",
      "16",
      "24"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "(3+1)(4+1)=20.\nHint: Each factor chooses an exponent from 0 to the maximum."
  },
  {
    "id": "AC9M7N02-T-012",
    "type": "single",
    "question": "Three lights flash every 12 s, 18 s and 30 s. If they flash together now, after how many seconds will they next flash together?",
    "answers": [
      "180",
      "90",
      "360",
      "60"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "LCM(12,18,30)=180.\nHint: Use highest prime powers across all three intervals."
  },
  {
    "id": "AC9M7N02-T-013",
    "type": "single",
    "question": "84 red beads and 126 blue beads are packed into identical groups with no beads left over. What is the greatest possible number of groups?",
    "answers": [
      "42",
      "21",
      "14",
      "7"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "HCF(84,126)=42, so 42 equal groups are possible.\nHint: A greatest equal grouping problem uses HCF."
  },
  {
    "id": "AC9M7N02-T-014",
    "type": "single",
    "question": "The smallest positive integer divisible by 84, 90 and 126 is which value?",
    "answers": [
      "1260",
      "2520",
      "630",
      "3780"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "84=2²×3×7, 90=2×3²×5, 126=2×3²×7; LCM=2²×3²×5×7=1260.\nHint: Take the highest exponent of each prime across all numbers."
  },
  {
    "id": "AC9M7N02-T-015",
    "type": "single",
    "question": "A=2⁵×3²×7 and B=2³×3³×5. Which statement is true?",
    "answers": [
      "HCF(A,B)=2³×3² and LCM(A,B)=2⁵×3³×5×7",
      "HCF(A,B)=2⁵×3³ and LCM(A,B)=2³×3²×5×7",
      "HCF(A,B)=2³×3³ and LCM(A,B)=2⁵×3²×5×7",
      "HCF(A,B)=6 and LCM(A,B)=A×B"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "HCF takes minimum common exponents; LCM takes maximum exponents across all primes.\nHint: Treat each prime independently."
  },
  {
    "id": "AC9M7N02-T-016",
    "type": "single",
    "question": "Find the highest common factor of 30 and 45.",
    "answers": [
      "15",
      "7.5",
      "30"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "Compare prime factors and take each common prime to the smaller exponent; HCF = 15."
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
