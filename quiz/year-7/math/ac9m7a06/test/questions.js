"use strict";
window.skillrTestQuestions = [
  {
    "id": "AC9M7A06-T-001",
    "type": "single",
    "question": "For V=lwh, find V when l=9 cm, w=4 cm and h=6 cm.",
    "answers": [
      "216 cm³",
      "108 cm³",
      "54 cm³",
      "19 cm³"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "V=9×4×6=216 cm³.\nHint: Multiply all three dimensions."
  },
  {
    "id": "AC9M7A06-T-002",
    "type": "single",
    "question": "For V=lwh, l=5 and w=8 are fixed. If h changes from 3 to 7, by how much does V increase?",
    "answers": [
      "160",
      "40",
      "280",
      "4"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "V=40h, so ΔV=40(7−3)=160.\nHint: Use change in h rather than calculating from scratch twice."
  },
  {
    "id": "AC9M7A06-T-003",
    "type": "single",
    "question": "A prism has V=420 cm³, l=10 cm and w=7 cm. Find h.",
    "answers": [
      "6 cm",
      "5 cm",
      "30 cm",
      "60 cm"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "h=420÷(10×7)=6 cm.\nHint: Divide by the fixed product lw."
  },
  {
    "id": "AC9M7A06-T-004",
    "type": "single",
    "question": "A spreadsheet uses =2*A1-3*B1. If A1=9 and B1=4, what is the result?",
    "answers": [
      "6",
      "30",
      "−6",
      "42"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "2(9)−3(4)=18−12=6.\nHint: Substitute carefully with multiplication first."
  },
  {
    "id": "AC9M7A06-T-005",
    "type": "single",
    "question": "For P=2a+5b−c, a and c stay fixed. If b increases by 4, how does P change?",
    "answers": [
      "It increases by 20",
      "It increases by 9",
      "It decreases by 20",
      "It increases by 4"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "ΔP=5×4=20.\nHint: Only the changing variable contributes to ΔP."
  },
  {
    "id": "AC9M7A06-T-006",
    "type": "single",
    "question": "A vehicle travels 75 km/h for 2.5 h. What distance does d=st predict?",
    "answers": [
      "187.5 km",
      "150 km",
      "77.5 km",
      "300 km"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "d=75×2.5=187.5 km.\nHint: Multiply speed by time."
  },
  {
    "id": "AC9M7A06-T-007",
    "type": "single",
    "question": "In d=st, speed is multiplied by 1.5 and time by 2. What happens to distance?",
    "answers": [
      "It becomes 3 times as large",
      "It becomes 2.5 times as large",
      "It becomes 1.5 times as large",
      "It is unchanged"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "New d=(1.5s)(2t)=3st.\nHint: Multiply scale factors."
  },
  {
    "id": "AC9M7A06-T-008",
    "type": "single",
    "question": "At fixed time 4 h, distances are 120, 200 and 280 km. Which speeds produced them?",
    "answers": [
      "30, 50, 70 km/h",
      "40, 60, 80 km/h",
      "30, 40, 50 km/h",
      "120, 200, 280 km/h"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "s=d÷4, giving 30, 50 and 70 km/h.\nHint: Reverse d=st."
  },
  {
    "id": "AC9M7A06-T-009",
    "type": "single",
    "question": "For y=7x−2z+5, x increases by 3 and z stays fixed. What is Δy?",
    "answers": [
      "21",
      "7",
      "6",
      "−6"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Δy=7×3=21.\nHint: Coefficient times change."
  },
  {
    "id": "AC9M7A06-T-010",
    "type": "single",
    "question": "For y=7x−2z+5, z increases by 4 and x stays fixed. What is Δy?",
    "answers": [
      "−8",
      "+8",
      "−2",
      "+4"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Δy=−2×4=−8.\nHint: Keep the negative sign."
  },
  {
    "id": "AC9M7A06-T-011",
    "type": "single",
    "question": "Which statement is valid for y=6a+b when a and b are measured on comparable scales?",
    "answers": [
      "A one-unit change in a has a larger direct effect than a one-unit change in b",
      "a is always more important in every context",
      "b has no effect",
      "The model proves a causes y"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "The coefficients give per-unit direct effects; they do not by themselves prove universal importance or causation.\nHint: Interpret coefficients narrowly."
  },
  {
    "id": "AC9M7A06-T-012",
    "type": "single",
    "question": "Why hold other variables constant during a sensitivity test?",
    "answers": [
      "To isolate the effect of the variable being changed",
      "To make all outputs equal",
      "To remove the need for a formula",
      "To guarantee a correct model"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Holding other inputs fixed lets you attribute output changes to the selected input.\nHint: Think controlled comparison."
  },
  {
    "id": "AC9M7A06-T-013",
    "type": "single",
    "question": "For F=4x+3y−2z, x rises by 1, y rises by 2 and z falls by 3. What is ΔF?",
    "answers": [
      "16",
      "4",
      "10",
      "−2"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "ΔF=4(1)+3(2)−2(−3)=4+6+6=16.\nHint: Use signed changes."
  },
  {
    "id": "AC9M7A06-T-014",
    "type": "single",
    "question": "A student says doubling both l and w in V=lwh doubles V when h is fixed. What is correct?",
    "answers": [
      "V becomes 4 times as large",
      "V doubles",
      "V becomes 8 times as large",
      "V is unchanged"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "(2l)(2w)h=4lwh, so volume quadruples.\nHint: Multiply both scale factors."
  },
  {
    "id": "AC9M7A06-T-015",
    "type": "single",
    "question": "A sensitivity table shows output changes of +2, +5 and −7 for one-unit increases in x, y and z respectively. Which input has greatest absolute one-unit effect?",
    "answers": [
      "z",
      "y",
      "x",
      "All equal"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "The absolute changes are 2, 5 and 7, so z has the greatest magnitude of effect in this comparison.\nHint: Compare absolute values when direction is not the question."
  },
  {
    "id": "AC9M7A06-T-016",
    "type": "single",
    "question": "For F=3x+2y−4z+15, which change leaves F unchanged?",
    "answers": [
      "x+2, y−1, z+1",
      "x+1, y+1, z+1",
      "x+2, y+2, z unchanged",
      "x unchanged, y+2, z+1"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "For the first change, ΔF=6−2−4=0.\nHint: Test the net change, not the new full value."
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
