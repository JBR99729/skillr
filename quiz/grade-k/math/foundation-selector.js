/* ---------------------------------------------------------
   FOUNDATION PRACTICE SELECTOR — 8 QUESTIONS
   ---------------------------------------------------------
   Main skill pages:
   - 8 questions per attempt.
   - Every curriculum elaboration for the skill is represented.
   - Every set includes choosing, typing and arranging tasks.
   - Foundation-friendly balance: 4 choosing, 2 typing,
     2 arranging questions.
   - Technical formats are varied where the bank supports them:
     MCQ, true/false, multi-select, typed text/number,
     fill-blank, order and drag.
   - Exact duplicate-looking questions are blocked within each set.
   - The same question pattern is limited to 1 per set when possible so students
     do not receive repeated near-identical prompts in one attempt.
   --------------------------------------------------------- */

(() => {
  const config = window.exerciseConfig || {};
  const TARGET = Number(config.maxQuestions || 8);

  const OFFICIAL_ELABORATIONS = {"AC9MFN01": ["AC9MFN01_E1", "AC9MFN01_E2", "AC9MFN01_E3", "AC9MFN01_E4", "AC9MFN01_E5"], "AC9MFN02": ["AC9MFN02_E1", "AC9MFN02_E2"], "AC9MFN03": ["AC9MFN03_E1", "AC9MFN03_E2", "AC9MFN03_E3", "AC9MFN03_E4", "AC9MFN03_E5"], "AC9MFN04": ["AC9MFN04_E1", "AC9MFN04_E2", "AC9MFN04_E3", "AC9MFN04_E4"], "AC9MFN05": ["AC9MFN05_E1", "AC9MFN05_E2", "AC9MFN05_E3", "AC9MFN05_E4"], "AC9MFN06": ["AC9MFN06_E1", "AC9MFN06_E2", "AC9MFN06_E3"], "AC9MFA01": ["AC9MFA01_E1", "AC9MFA01_E2", "AC9MFA01_E3", "AC9MFA01_E4"], "AC9MFM01": ["AC9MFM01_E1", "AC9MFM01_E2", "AC9MFM01_E3", "AC9MFM01_E4"], "AC9MFM02": ["AC9MFM02_E1", "AC9MFM02_E2", "AC9MFM02_E3", "AC9MFM02_E4", "AC9MFM02_E5"], "AC9MFSP01": ["AC9MFSP01_E1", "AC9MFSP01_E2", "AC9MFSP01_E3", "AC9MFSP01_E4", "AC9MFSP01_E5"], "AC9MFSP02": ["AC9MFSP02_E1", "AC9MFSP02_E2", "AC9MFSP02_E3", "AC9MFSP02_E4"], "AC9MFST01": ["AC9MFST01_E1", "AC9MFST01_E2", "AC9MFST01_E3", "AC9MFST01_E4", "AC9MFST01_E5", "AC9MFST01_E6", "AC9MFST01_E7"]};
  const SUPPLEMENTAL = [
  {
    "id": "AC9MFN01-SUP-001",
    "code": "AC9MFN01",
    "elaboration": "AC9MFN01_E2",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the numbers from smallest to largest.",
    "explanation": "The correct counting order is 6 → 7 → 8 → 9.",
    "items": [
      "9",
      "7",
      "6",
      "8"
    ],
    "correct": [
      "6",
      "7",
      "8",
      "9"
    ],
    "instruction": "Use the arrows to put the numbers in order."
  },
  {
    "id": "AC9MFN01-SUP-002",
    "code": "AC9MFN01",
    "elaboration": "AC9MFN01_E3",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Drag the ordinal positions into order.",
    "explanation": "Ordinal positions go first, second, third, fourth.",
    "items": [
      "third",
      "first",
      "fourth",
      "second"
    ],
    "correct": [
      "first",
      "second",
      "third",
      "fourth"
    ]
  },
  {
    "id": "AC9MFN02-SUP-001",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E2",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the quantities from least to greatest.",
    "explanation": "The order is 1, 3, 5.",
    "items": [
      "5",
      "1",
      "3"
    ],
    "correct": [
      "1",
      "3",
      "5"
    ]
  },
  {
    "id": "AC9MFN02-SUP-002",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Drag the quantities into order from smallest to largest.",
    "explanation": "The order is 2, 4, 5.",
    "items": [
      "5",
      "2",
      "4"
    ],
    "correct": [
      "2",
      "4",
      "5"
    ]
  },
  {
    "id": "AC9MFN02-SUP-003",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E1",
    "difficulty": "easy",
    "type": "text",
    "question": "Type how many dots you see at a quick look.",
    "visual": "● ● ● ●",
    "acceptedAnswers": ["4", "four"],
    "explanation": "There are 4 dots."
  },
  {
    "id": "AC9MFN02-SUP-004",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E2",
    "difficulty": "easy",
    "type": "true-false",
    "question": "Do these two groups show the same number?",
    "visual": "First:  ● ● ●\nSecond: ● ● ●",
    "answers": ["True", "False"],
    "correct": 0,
    "explanation": "Both groups show 3 dots."
  },

  {
    "id": "AC9MFN02-SUP-005",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E2",
    "difficulty": "easy",
    "type": "multiple",
    "question": "Select the number names that can match a quick-look collection up to 5.",
    "answers": ["two", "four", "seven", "nine"],
    "correct": [0, 1],
    "explanation": "Two and four are within the subitising range up to 5."
  },
  {
    "id": "AC9MFN02-SUP-006",
    "code": "AC9MFN02",
    "elaboration": "AC9MFN02_E1",
    "difficulty": "easy",
    "type": "number",
    "question": "A dot card flashes five dots. Enter the number you saw.",
    "correct": 5,
    "explanation": "Five dots represent the number 5."
  },

  {
    "id": "AC9MFN03-SUP-001",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the counting numbers in order.",
    "explanation": "Counting goes 8 → 9 → 10 → 11.",
    "items": [
      "10",
      "8",
      "11",
      "9"
    ],
    "correct": [
      "8",
      "9",
      "10",
      "11"
    ]
  },
  {
    "id": "AC9MFN03-SUP-002",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E3",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Put the one-to-one matching steps in order.",
    "explanation": "First count the people, then collect one item for each, then check.",
    "items": [
      "Check each person has one",
      "Collect one item for each person",
      "Count the people"
    ],
    "correct": [
      "Count the people",
      "Collect one item for each person",
      "Check each person has one"
    ]
  },
  {
    "id": "AC9MFN04-SUP-001",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E2",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange these parts from smallest to largest.",
    "explanation": "The parts are 1, 2, 4.",
    "items": [
      "4",
      "1",
      "2"
    ],
    "correct": [
      "1",
      "2",
      "4"
    ]
  },
  {
    "id": "AC9MFN04-SUP-002",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E3",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the number parts to show a growing whole.",
    "explanation": "The quantities increase 2 → 3 → 5.",
    "items": [
      "5",
      "2",
      "3"
    ],
    "correct": [
      "2",
      "3",
      "5"
    ]
  },
  {
    "id": "AC9MFN05-SUP-001",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the story steps in order.",
    "explanation": "Start, change, then find the result.",
    "items": [
      "Find how many now",
      "Start with the first group",
      "Add or take away"
    ],
    "correct": [
      "Start with the first group",
      "Add or take away",
      "Find how many now"
    ]
  },
  {
    "id": "AC9MFN05-SUP-002",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the shop steps in order.",
    "explanation": "Read the price, count $1 coins, then pay.",
    "items": [
      "Pay with the coins",
      "Read the price",
      "Count the $1 coins"
    ],
    "correct": [
      "Read the price",
      "Count the $1 coins",
      "Pay with the coins"
    ]
  },
  {
    "id": "AC9MFN06-SUP-001",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the equal-sharing steps.",
    "explanation": "Deal equally, continue, then check.",
    "items": [
      "Check the groups are equal",
      "Give one item to each person",
      "Keep sharing one at a time"
    ],
    "correct": [
      "Give one item to each person",
      "Keep sharing one at a time",
      "Check the groups are equal"
    ]
  },
  {
    "id": "AC9MFN06-SUP-002",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the grouping steps.",
    "explanation": "Choose group size, make groups, then count groups.",
    "items": [
      "Count how many groups",
      "Choose the group size",
      "Make equal groups"
    ],
    "correct": [
      "Choose the group size",
      "Make equal groups",
      "Count how many groups"
    ]
  },
  {
    "id": "AC9MFA01-SUP-001",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the colours to make the repeating pattern red, blue, red, blue.",
    "explanation": "The pattern alternates red and blue.",
    "items": [
      "blue",
      "red",
      "blue",
      "red"
    ],
    "correct": [
      "red",
      "blue",
      "red",
      "blue"
    ]
  },
  {
    "id": "AC9MFA01-SUP-002",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Drag the actions into the repeating pattern clap, tap, clap, tap.",
    "explanation": "The repeating unit is clap, tap.",
    "items": [
      "tap",
      "clap",
      "tap",
      "clap"
    ],
    "correct": [
      "clap",
      "tap",
      "clap",
      "tap"
    ]
  },
  {
    "id": "AC9MFA01-SUP-007",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "easy",
    "type": "single",
    "question": "Which movement pair could repeat as an AB pattern?",
    "answers": ["clap, tap", "clap, clap, tap", "jump, clap, spin"],
    "correct": 0,
    "explanation": "An AB pattern repeats two parts, such as clap, tap."
  },

  {
    "id": "AC9MFM01-SUP-001",
    "code": "AC9MFM01",
    "elaboration": "AC9MFM01_E2",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the ribbons from shortest to longest.",
    "explanation": "3 blocks is shortest, then 5, then 8.",
    "items": [
      "8 blocks",
      "3 blocks",
      "5 blocks"
    ],
    "correct": [
      "3 blocks",
      "5 blocks",
      "8 blocks"
    ]
  },
  {
    "id": "AC9MFM01-SUP-002",
    "code": "AC9MFM01",
    "elaboration": "AC9MFM01_E3",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the events from shortest duration to longest duration.",
    "explanation": "A blink is shorter than a clap, and a song takes longest.",
    "items": [
      "sing a song",
      "blink",
      "clap once"
    ],
    "correct": [
      "blink",
      "clap once",
      "sing a song"
    ]
  },
  {
    "id": "AC9MFM02-SUP-001",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the times of day from earliest to latest.",
    "explanation": "Morning comes before lunchtime, afternoon and night.",
    "items": [
      "night",
      "lunchtime",
      "morning",
      "afternoon"
    ],
    "correct": [
      "morning",
      "lunchtime",
      "afternoon",
      "night"
    ]
  },
  {
    "id": "AC9MFM02-SUP-002",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Drag the weekdays into order.",
    "explanation": "The school week runs Monday to Friday.",
    "items": [
      "Thursday",
      "Monday",
      "Friday",
      "Tuesday",
      "Wednesday"
    ],
    "correct": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ]
  },
  {
    "id": "AC9MFSP01-SUP-001",
    "code": "AC9MFSP01",
    "elaboration": "AC9MFSP01_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange these shapes by number of straight sides, from least to most.",
    "explanation": "Circle has 0, triangle 3, square 4.",
    "items": [
      "square",
      "circle",
      "triangle"
    ],
    "correct": [
      "circle",
      "triangle",
      "square"
    ]
  },
  {
    "id": "AC9MFSP01-SUP-002",
    "code": "AC9MFSP01",
    "elaboration": "AC9MFSP01_E4",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the objects by the shape named: circle, triangle, rectangle.",
    "explanation": "Wheel is circle-like, triangular sign is triangle-like, door is rectangle-like.",
    "items": [
      "door",
      "wheel",
      "triangular road sign"
    ],
    "correct": [
      "wheel",
      "triangular road sign",
      "door"
    ]
  },
  {
    "id": "AC9MFSP01-SUP-003",
    "code": "AC9MFSP01",
    "elaboration": "AC9MFSP01_E4",
    "difficulty": "easy",
    "type": "single",
    "question": "Which familiar shape has 3 straight sides?",
    "answers": ["triangle", "circle", "square"],
    "correct": 0,
    "explanation": "A triangle has 3 straight sides."
  },
  {
    "id": "AC9MFSP01-SUP-004",
    "code": "AC9MFSP01",
    "elaboration": "AC9MFSP01_E4",
    "difficulty": "easy",
    "type": "text",
    "question": "Type the name of a familiar shape with no straight sides.",
    "acceptedAnswers": ["circle"],
    "explanation": "A circle has no straight sides."
  },

  {
    "id": "AC9MFSP02-SUP-001",
    "code": "AC9MFSP02",
    "elaboration": "AC9MFSP02_E2",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the movement instructions in order.",
    "explanation": "Start, move, then stop.",
    "items": [
      "Stop behind the desk",
      "Start at the mat",
      "Move beside the chair"
    ],
    "correct": [
      "Start at the mat",
      "Move beside the chair",
      "Stop behind the desk"
    ]
  },
  {
    "id": "AC9MFSP02-SUP-002",
    "code": "AC9MFSP02",
    "elaboration": "AC9MFSP02_E3",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the robot positions in the order described.",
    "explanation": "The robot starts, moves, then stops.",
    "items": [
      "Stops next to the box",
      "Starts by the chair",
      "Moves under the desk"
    ],
    "correct": [
      "Starts by the chair",
      "Moves under the desk",
      "Stops next to the box"
    ]
  },
  {
    "id": "AC9MFSP02-SUP-003",
    "code": "AC9MFSP02",
    "elaboration": "AC9MFSP02_E1",
    "difficulty": "easy",
    "type": "text",
    "question": "Type the position word that means next to something.",
    "acceptedAnswers": ["beside", "next to"],
    "explanation": "Beside means next to."
  },

  {
    "id": "AC9MFST01-SUP-001",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E1",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the sorting steps.",
    "explanation": "Look, check the rule, then place the object.",
    "items": [
      "Put it in a group",
      "Look at the object",
      "Check the sorting rule"
    ],
    "correct": [
      "Look at the object",
      "Check the sorting rule",
      "Put it in a group"
    ]
  },
  {
    "id": "AC9MFST01-SUP-002",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the data steps.",
    "explanation": "Ask, record, then compare.",
    "items": [
      "Compare the answers",
      "Ask the yes/no question",
      "Record the answers"
    ],
    "correct": [
      "Ask the yes/no question",
      "Record the answers",
      "Compare the answers"
    ]
  },
  {
    "id": "AC9MFN03-SUP-003",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E4",
    "difficulty": "medium",
    "type": "single",
    "question": "Which tool can be used to represent counts in many cultures, including parts of Asia?",
    "explanation": "An abacus can be used to represent and work with counts.",
    "answers": [
      "abacus",
      "ruler",
      "paintbrush"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN03-SUP-004",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E4",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Different cultures can use different representations for the same number.",
    "explanation": "The same quantity can be represented in different ways.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN03-SUP-005",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E4",
    "difficulty": "medium",
    "type": "text",
    "question": "Type the name of a counting tool that uses beads on rods or wires.",
    "explanation": "An abacus uses beads to represent numbers.",
    "acceptedAnswers": [
      "abacus"
    ],
    "placeholder": "Type your answer"
  },
  {
    "id": "AC9MFN03-SUP-006",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E4",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the steps for comparing two cultural number representations.",
    "explanation": "First identify each quantity, then compare the quantities.",
    "items": [
      "Compare the quantities",
      "Identify the quantity shown by each representation"
    ],
    "correct": [
      "Identify the quantity shown by each representation",
      "Compare the quantities"
    ]
  },
  {
    "id": "AC9MFN03-SUP-007",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E5",
    "difficulty": "medium",
    "type": "true-false",
    "question": "In a one-to-one body-tallying activity, each count should match one item.",
    "explanation": "One-to-one correspondence matches each item with one count.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN03-SUP-008",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E5",
    "difficulty": "medium",
    "type": "number",
    "question": "A body-tallying activity makes 8 one-to-one count points. How many items have been matched?",
    "explanation": "Eight count points match 8 items.",
    "correct": 8
  },
  {
    "id": "AC9MFN03-SUP-009",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E5",
    "difficulty": "medium",
    "type": "single",
    "question": "What mathematical idea is used when one body-part point matches one item?",
    "explanation": "This is one-to-one correspondence.",
    "answers": [
      "one-to-one correspondence",
      "guessing",
      "measuring length"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN03-SUP-010",
    "code": "AC9MFN03",
    "elaboration": "AC9MFN03_E5",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange these counts in the order they would be matched one-to-one.",
    "explanation": "Counting follows 5, 6, 7.",
    "items": [
      "7",
      "5",
      "6"
    ],
    "correct": [
      "5",
      "6",
      "7"
    ]
  },
  {
    "id": "AC9MFN04-SUP-003",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E4",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A whole number can be grouped in different ways while keeping the same total.",
    "explanation": "Partitioning changes the parts, not the whole.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN04-SUP-004",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E4",
    "difficulty": "medium",
    "type": "number",
    "question": "A collection of 8 objects is grouped as 5 and another part. How many are in the other part?",
    "explanation": "5 and 3 make 8.",
    "correct": 3
  },
  {
    "id": "AC9MFN04-SUP-005",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E4",
    "difficulty": "medium",
    "type": "fill-blank",
    "question": "Complete the grouping.",
    "explanation": "Six can be grouped as 4 and 2.",
    "template": "6 can be partitioned into 4 and {{blank}}.",
    "acceptedAnswers": [
      "2"
    ]
  },
  {
    "id": "AC9MFN04-SUP-006",
    "code": "AC9MFN04",
    "elaboration": "AC9MFN04_E4",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the parts from smallest to largest.",
    "explanation": "The parts are 1, 2 and 3.",
    "items": [
      "3",
      "1",
      "2"
    ],
    "correct": [
      "1",
      "2",
      "3"
    ]
  },
  {
    "id": "AC9MFN05-SUP-003",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E2",
    "difficulty": "medium",
    "type": "number",
    "question": "An item costs $6. You pay using only $1 coins. How many coins are needed?",
    "explanation": "Six $1 coins make $6.",
    "correct": 6
  },
  {
    "id": "AC9MFN05-SUP-004",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E2",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Five $1 coins have a total value of $5.",
    "explanation": "Each coin is worth $1.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN05-SUP-005",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E2",
    "difficulty": "medium",
    "type": "number",
    "question": "There are 7 children. Each needs one pair of scissors. How many pairs are needed?",
    "explanation": "One pair for each child means 7 pairs.",
    "correct": 7
  },
  {
    "id": "AC9MFN05-SUP-006",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E2",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the shop steps.",
    "explanation": "Read price, count coins, pay.",
    "items": [
      "Pay",
      "Read the price",
      "Count the $1 coins"
    ],
    "correct": [
      "Read the price",
      "Count the $1 coins",
      "Pay"
    ]
  },
  {
    "id": "AC9MFN05-SUP-007",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E3",
    "difficulty": "medium",
    "type": "number",
    "question": "In an appropriate story connected to Country/Place, 4 birds are joined by 3 more. How many birds are there?",
    "explanation": "4 + 3 = 7.",
    "correct": 7
  },
  {
    "id": "AC9MFN05-SUP-008",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E3",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Counters or drawings can be used to model an addition situation in a story.",
    "explanation": "Materials can represent the mathematical action in a story.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN05-SUP-009",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E3",
    "difficulty": "medium",
    "type": "fill-blank",
    "question": "Complete the story number sentence.",
    "explanation": "3 + 2 = 5.",
    "template": "3 + 2 = {{blank}}",
    "acceptedAnswers": [
      "5"
    ]
  },
  {
    "id": "AC9MFN05-SUP-010",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E3",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the story-model steps.",
    "explanation": "Listen, model, then find the result.",
    "items": [
      "Find the result",
      "Listen to the story",
      "Show the action with counters"
    ],
    "correct": [
      "Listen to the story",
      "Show the action with counters",
      "Find the result"
    ]
  },
  {
    "id": "AC9MFN05-SUP-011",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E4",
    "difficulty": "medium",
    "type": "number",
    "question": "A set in a story game starts with 9 leaves. 3 are removed. How many remain?",
    "explanation": "9 - 3 = 6.",
    "correct": 6
  },
  {
    "id": "AC9MFN05-SUP-012",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E4",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A set of objects can be used to act out an addition or subtraction story.",
    "explanation": "Objects can model changes in a story.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN05-SUP-013",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E4",
    "difficulty": "medium",
    "type": "fill-blank",
    "question": "Complete the subtraction sentence.",
    "explanation": "8 - 2 = 6.",
    "template": "8 - 2 = {{blank}}",
    "acceptedAnswers": [
      "6"
    ]
  },
  {
    "id": "AC9MFN05-SUP-014",
    "code": "AC9MFN05",
    "elaboration": "AC9MFN05_E4",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the subtraction story steps.",
    "explanation": "Start, remove, then count what remains.",
    "items": [
      "Count what remains",
      "Start with the set",
      "Remove some objects"
    ],
    "correct": [
      "Start with the set",
      "Remove some objects",
      "Count what remains"
    ]
  },
  {
    "id": "AC9MFN06-SUP-003",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E3",
    "difficulty": "medium",
    "type": "number",
    "question": "In an appropriate sharing game, 12 counters are shared equally among 3 players. How many does each receive?",
    "explanation": "12 shared by 3 gives 4 each.",
    "correct": 4
  },
  {
    "id": "AC9MFN06-SUP-004",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E3",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A fair sharing game gives each player the same number of items.",
    "explanation": "Equal sharing means the amounts are the same.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN06-SUP-005",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E3",
    "difficulty": "medium",
    "type": "single",
    "question": "Which result shows equal sharing of 8 items between 2 players?",
    "explanation": "Each player should receive 4.",
    "answers": [
      "4 each",
      "3 each",
      "5 each"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFN06-SUP-006",
    "code": "AC9MFN06",
    "elaboration": "AC9MFN06_E3",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the fair-sharing steps.",
    "explanation": "Deal, continue, then check.",
    "items": [
      "Check the amounts are equal",
      "Deal one item to each player",
      "Keep dealing equally"
    ],
    "correct": [
      "Deal one item to each player",
      "Keep dealing equally",
      "Check the amounts are equal"
    ]
  },
  {
    "id": "AC9MFM02-SUP-003",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E4",
    "difficulty": "medium",
    "type": "single",
    "question": "A garden roster says Mia waters on Tuesday and Noah on Wednesday. Who waters on Wednesday?",
    "explanation": "The roster assigns Noah to Wednesday.",
    "answers": [
      "Mia",
      "Noah",
      "both"
    ],
    "correct": 1
  },
  {
    "id": "AC9MFM02-SUP-004",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E4",
    "difficulty": "medium",
    "type": "text",
    "question": "Today is Thursday. Type the day that was yesterday.",
    "explanation": "Wednesday comes before Thursday.",
    "acceptedAnswers": [
      "Wednesday",
      "wednesday"
    ]
  },
  {
    "id": "AC9MFM02-SUP-005",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E4",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A classroom roster can help tell whose turn it is today.",
    "explanation": "Rosters connect people or tasks with days.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFM02-SUP-006",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E4",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the roster days in order.",
    "explanation": "Tuesday comes before Wednesday and Thursday.",
    "items": [
      "Thursday",
      "Tuesday",
      "Wednesday"
    ],
    "correct": [
      "Tuesday",
      "Wednesday",
      "Thursday"
    ]
  },
  {
    "id": "AC9MFM02-SUP-007",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E5",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A pictorial diary can show important events on different days of the week.",
    "explanation": "A diary links events with days.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFM02-SUP-008",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E5",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange these diary days in calendar order.",
    "explanation": "Monday comes before Wednesday and Friday.",
    "items": [
      "Friday",
      "Monday",
      "Wednesday"
    ],
    "correct": [
      "Monday",
      "Wednesday",
      "Friday"
    ]
  },
  {
    "id": "AC9MFM02-SUP-009",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E5",
    "difficulty": "medium",
    "type": "text",
    "question": "A diary shows an event on the day after Monday. Type that day.",
    "explanation": "Tuesday comes after Monday.",
    "acceptedAnswers": [
      "Tuesday",
      "tuesday"
    ]
  },
  {
    "id": "AC9MFM02-SUP-010",
    "code": "AC9MFM02",
    "elaboration": "AC9MFM02_E5",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Drag the diary days into order.",
    "explanation": "Friday, Saturday, Sunday are consecutive.",
    "items": [
      "Sunday",
      "Friday",
      "Saturday"
    ],
    "correct": [
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "AC9MFST01-SUP-003",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E4",
    "difficulty": "medium",
    "type": "true-false",
    "question": "A sorting robot needs a clear rule to decide where an object belongs.",
    "explanation": "A sorting rule tells how to classify objects.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-004",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E4",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the robot sorting steps.",
    "explanation": "Look, check, place.",
    "items": [
      "Put it in the matching group",
      "Look at the object",
      "Check the rule"
    ],
    "correct": [
      "Look at the object",
      "Check the rule",
      "Put it in the matching group"
    ]
  },
  {
    "id": "AC9MFST01-SUP-005",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E4",
    "difficulty": "medium",
    "type": "single",
    "question": "Which instruction is a sorting rule?",
    "explanation": "Sort by colour is a clear rule.",
    "answers": [
      "sort by colour",
      "put anywhere",
      "guess"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-006",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E4",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": "Arrange the robot instructions.",
    "explanation": "Observe, compare with rule, then sort.",
    "items": [
      "Sort the object",
      "Observe the object",
      "Compare with the rule"
    ],
    "correct": [
      "Observe the object",
      "Compare with the rule",
      "Sort the object"
    ]
  },
  {
    "id": "AC9MFST01-SUP-007",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E5",
    "difficulty": "medium",
    "type": "multiple",
    "question": "Select all useful yes/no questions for a mystery object.",
    "explanation": "Each selected question can be answered yes or no.",
    "answers": [
      "Is it round?",
      "Is it red?",
      "Tell me a story.",
      "Does it move?"
    ],
    "correct": [
      0,
      1,
      3
    ],
    "instruction": "Select all the yes/no questions."
  },
  {
    "id": "AC9MFST01-SUP-008",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E5",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the mystery-object data steps.",
    "explanation": "Ask, record, then use the information.",
    "items": [
      "Use the information to make a better guess",
      "Ask a yes/no question",
      "Record the answer"
    ],
    "correct": [
      "Ask a yes/no question",
      "Record the answer",
      "Use the information to make a better guess"
    ]
  },
  {
    "id": "AC9MFST01-SUP-009",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E5",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Asking several yes/no questions can collect information about a mystery object.",
    "explanation": "Each answer adds data that can help identify the object.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-010",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E5",
    "difficulty": "medium",
    "type": "text",
    "question": "Type one word that can answer a yes/no question.",
    "explanation": "Yes is one possible answer.",
    "acceptedAnswers": [
      "yes",
      "no"
    ],
    "placeholder": "Type yes or no"
  },
  {
    "id": "AC9MFST01-SUP-011",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E6",
    "difficulty": "medium",
    "type": "single",
    "question": "A story chart records 3 tigers and 5 kangaroos. Which appeared more?",
    "explanation": "Five is more than three.",
    "answers": [
      "tigers",
      "kangaroos",
      "same"
    ],
    "correct": 1
  },
  {
    "id": "AC9MFST01-SUP-012",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E6",
    "difficulty": "medium",
    "type": "number",
    "question": "A story chart records 4 birds and 3 frogs. How many animals are recorded altogether?",
    "explanation": "4 + 3 = 7.",
    "correct": 7
  },
  {
    "id": "AC9MFST01-SUP-013",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E6",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Data collected from a story can be organised into categories such as animal type.",
    "explanation": "Story information can be sorted and compared.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-014",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E6",
    "difficulty": "medium",
    "type": "multiple",
    "question": "Select all questions a class could answer from an animal chart.",
    "explanation": "Charts can show categories and counts.",
    "answers": [
      "Which animal appeared more?",
      "How many types were seen?",
      "What colour is the teacher's car?"
    ],
    "correct": [
      0,
      1
    ]
  },
  {
    "id": "AC9MFST01-SUP-015",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E7",
    "difficulty": "medium",
    "type": "true-false",
    "question": "Repeated observations of clouds, wind, plants or animal activity can be recorded as environmental data.",
    "explanation": "Repeated observations can be collected and compared over time.",
    "answers": [
      "True",
      "False"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-016",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E7",
    "difficulty": "medium",
    "type": "order",
    "question": "Arrange the environmental observation steps.",
    "explanation": "Observe, record, compare.",
    "items": [
      "Compare observations over time",
      "Observe the environment",
      "Record what was noticed"
    ],
    "correct": [
      "Observe the environment",
      "Record what was noticed",
      "Compare observations over time"
    ]
  },
  {
    "id": "AC9MFST01-SUP-017",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E7",
    "difficulty": "medium",
    "type": "single",
    "question": "Which action is an example of collecting environmental information?",
    "explanation": "Recording what you observe collects data.",
    "answers": [
      "recording cloud observations",
      "guessing without looking",
      "erasing every record"
    ],
    "correct": 0
  },
  {
    "id": "AC9MFST01-SUP-018",
    "code": "AC9MFST01",
    "elaboration": "AC9MFST01_E7",
    "difficulty": "medium",
    "type": "text",
    "question": "Type the word for information that has been collected and recorded.",
    "explanation": "Collected information is called data.",
    "acceptedAnswers": [
      "data"
    ]
  },
  {
    "id": "AC9MFA01-SUP-003",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "easy",
    "type": "single",
    "question": "Which row shows an AB repeating pattern?",
    "answers": ["red, blue, red, blue", "red, red, blue, green", "red, blue, green, yellow"],
    "correct": 0,
    "explanation": "An AB pattern repeats the same two parts: red, blue, red, blue."
  },
  {
    "id": "AC9MFA01-SUP-004",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "easy",
    "type": "text",
    "question": "Type the missing colour: red, blue, red, ___.",
    "acceptedAnswers": ["blue"],
    "explanation": "The pattern repeats red, blue."
  },
  {
    "id": "AC9MFA01-SUP-005",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E1",
    "difficulty": "easy",
    "type": "fill-blank",
    "question": "Complete the repeating action pattern.",
    "template": "clap, tap, clap, {{blank}}",
    "acceptedAnswers": ["tap"],
    "explanation": "The actions repeat clap, tap."
  },
  {
    "id": "AC9MFA01-SUP-006",
    "code": "AC9MFA01",
    "elaboration": "AC9MFA01_E3",
    "difficulty": "easy",
    "type": "true-false",
    "question": "Does circle, square, circle, square make a repeating pattern?",
    "answers": ["True", "False"],
    "correct": 0,
    "explanation": "Yes. Circle, square repeats in the same order."
  }
];

  const shuffle = (items) => {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const familyOf = (question) => {
    const type = question.type || "single";
    if (["order", "drag-drop", "drag-image"].includes(type)) {
      return "arranging";
    }
    if (["text", "number", "fill-blank"].includes(type)) {
      return "typing";
    }
    return "choice";
  };

  // Build a stable fingerprint for what the learner actually sees.
  // This prevents duplicate-looking questions with different IDs
  // from appearing in the same 8-question practice set.
  const questionFingerprint = (question) => {
    const cleanText = (value) =>
      String(value ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    const itemText = Array.isArray(question.items)
      ? question.items
          .map((item) =>
            typeof item === "string"
              ? cleanText(item)
              : cleanText(
                  item?.label ||
                  item?.alt ||
                  item?.id ||
                  item?.image ||
                  ""
                )
          )
          .join("|")
      : "";

    const categoryText = Array.isArray(question.categories)
      ? question.categories
          .map((category) =>
            cleanText(
              category?.label ||
              category?.id ||
              ""
            )
          )
          .join("|")
      : "";

    return [
      cleanText(question.question),
      cleanText(question.visual),
      cleanText(question.image),
      cleanText(question.template),
      itemText,
      categoryText
    ].join("||");
  };

  // Group very similar question prompts together so a learner does not
  // receive the same task pattern three or more times in one set.
  // Numbers and common symbol quantities are ignored for this check.
  const questionStemFingerprint = (question) => {
    return String(question?.question ?? "")
      .split("\n")[0]
      .toLowerCase()
      .replace(/[0-9]+(?:\.[0-9]+)?/g, "#")
      .replace(/[★●▲■◆♦︎◼︎◻︎⬤⚫⚪]+/g, "*")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normaliseVisual = (question) => {
    const q = { ...question };

    if (
      !q.visual &&
      typeof q.question === "string" &&
      q.question.includes("\n")
    ) {
      const lines = q.question.split("\n");
      q.question = lines.shift().trim();

      // Fix the old subitising comparison layout where a
      // multi-row dot pattern could split the First or Second
      // group across several lines.
      const firstIndex =
        lines.findIndex(
          (line) => /^First:/i.test(line)
        );

      const secondIndex =
        lines.findIndex(
          (line) => /^Second:/i.test(line)
        );

      if (
        firstIndex >= 0 &&
        secondIndex >= 0
      ) {
        let firstLine = "";
        let secondLine = "";

        if (firstIndex < secondIndex) {
          firstLine = [
            lines[firstIndex],
            ...lines.slice(
              firstIndex + 1,
              secondIndex
            )
          ].join(" ");

          secondLine = [
            lines[secondIndex],
            ...lines.slice(
              secondIndex + 1
            )
          ].join(" ");
        } else {
          secondLine = [
            lines[secondIndex],
            ...lines.slice(
              secondIndex + 1,
              firstIndex
            )
          ].join(" ");

          firstLine = [
            lines[firstIndex],
            ...lines.slice(
              firstIndex + 1
            )
          ].join(" ");
        }

        q.visual =
          `${firstLine.trim()}\n${secondLine.trim()}`;
      } else {
        q.visual =
          lines.join("\n").trim();
      }
    }

    return q;
  };

  const makeTypingVariant = (question) => {
    if (
      !question ||
      !Array.isArray(question.answers) ||
      !Number.isInteger(question.correct)
    ) {
      return null;
    }

    const answer =
      String(question.answers[question.correct] ?? "").trim();

    if (!answer) {
      return null;
    }

    const numeric =
      /^-?(?:\d+|\d*\.\d+)$/.test(answer);

    const idNumber =
      Array.from(String(question.id || ""))
        .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

    if (numeric && idNumber % 2 === 0) {
      return {
        ...question,
        id: `${question.id}-TYPE`,
        sourceId: question.id,
        type: "number",
        correct: Number(answer),
        answers: undefined,
        placeholder: "Enter a number"
      };
    }

    if (idNumber % 3 === 0) {
      return {
        ...question,
        id: `${question.id}-FILL`,
        sourceId: question.id,
        type: "fill-blank",
        answers: undefined,
        correct: undefined,
        template: "Answer: {{blank}}",
        acceptedAnswers: [answer],
        placeholder: "Type your answer"
      };
    }

    return {
      ...question,
      id: `${question.id}-TYPE`,
      sourceId: question.id,
      type: "text",
      answers: undefined,
      correct: undefined,
      acceptedAnswers: [answer],
      placeholder: "Type your answer"
    };
  };

  const baseCode =
    String(config.code || "").trim().toUpperCase();

  let baseBank = [
    ...window.allMathQuestions,
    ...SUPPLEMENTAL
  ].map(normaliseVisual);

  if (baseCode) {
    baseBank = baseBank.filter(
      (q) =>
        String(q.code || "").trim().toUpperCase() ===
        baseCode
    );
  }

  if (config.elaboration) {
    const wanted =
      String(config.elaboration).trim().toUpperCase();

    baseBank = baseBank.filter(
      (q) =>
        String(q.elaboration || "").trim().toUpperCase() ===
        wanted
    );
  }

  // Add a typed/fill variant for choice questions.
  const variants = [];

  baseBank.forEach((q) => {
    const normal = {
      ...q,
      sourceId: q.sourceId || q.id
    };

    variants.push(normal);

    if (familyOf(normal) === "choice") {
      const typed = makeTypingVariant(normal);
      if (typed) {
        variants.push(typed);
      }
    }
  });

  const requiredElabs =
    config.elaboration
      ? [String(config.elaboration).trim().toUpperCase()]
      : (OFFICIAL_ELABORATIONS[baseCode] || [
          ...new Set(
            baseBank
              .map((q) => q.elaboration)
              .filter(Boolean)
          )
        ]);

  const seenKey =
    `skillr-seen-${baseCode || "foundation"}-questions`;

  let seen = new Set();

  try {
    const stored =
      JSON.parse(localStorage.getItem(seenKey) || "[]");

    if (Array.isArray(stored)) {
      seen = new Set(stored);
    }
  } catch (_) {}

  // Once every source question has been encountered, begin a new cycle.
  const availableSourceIds =
    new Set(
      baseBank
        .map((q) => q.sourceId || q.id)
        .filter(Boolean)
    );

  if (
    availableSourceIds.size > 0 &&
    [...availableSourceIds].every((id) => seen.has(id))
  ) {
    seen.clear();
  }

  const familySlots =
    TARGET >= 8
      ? [
          "arranging",
          "arranging",
          "typing",
          "typing",
          "choice",
          "choice",
          "choice",
          "choice"
        ]
      : Array.from(
          { length: TARGET },
          (_, i) =>
            i % 3 === 0
              ? "arranging"
              : i % 3 === 1
                ? "typing"
                : "choice"
        );

  const byFamily = {
    choice: [],
    typing: [],
    arranging: []
  };

  variants.forEach((q) => {
    byFamily[familyOf(q)].push(q);
  });

  Object.keys(byFamily).forEach((family) => {
    byFamily[family] = shuffle(byFamily[family]).sort(
      (a, b) => {
        const aSeen =
          seen.has(a.sourceId || a.id) ? 1 : 0;
        const bSeen =
          seen.has(b.sourceId || b.id) ? 1 : 0;
        return aSeen - bSeen;
      }
    );
  });

  let best = null;
  let explored = 0;
  const MAX_SEARCH = 30000;

  const dfs = (
    slotIndex,
    selected,
    usedSources,
    usedFingerprints,
    stemCounts,
    coveredElabs,
    usedTypes
  ) => {
    if (best || explored > MAX_SEARCH) {
      return;
    }

    explored += 1;

    if (slotIndex === familySlots.length) {
      const allCovered =
        requiredElabs.every(
          (e) => coveredElabs.has(e)
        );

      if (allCovered) {
        best = [...selected];
      }

      return;
    }

    const remaining =
      familySlots.length - slotIndex;

    const missing =
      requiredElabs.filter(
        (e) => !coveredElabs.has(e)
      );

    if (missing.length > remaining) {
      return;
    }

    const family =
      familySlots[slotIndex];

    const candidates =
      byFamily[family]
        .filter(
          (q) =>
            !usedSources.has(
              q.sourceId || q.id
            ) &&
            !usedFingerprints.has(
              questionFingerprint(q)
            ) &&
            (stemCounts.get(questionStemFingerprint(q)) || 0) < 1
        )
        .sort((a, b) => {
          const aMissing =
            missing.includes(a.elaboration)
              ? 0
              : 1;
          const bMissing =
            missing.includes(b.elaboration)
              ? 0
              : 1;

          if (aMissing !== bMissing) {
            return aMissing - bMissing;
          }

          // Prefer a technical interaction format not already
          // used in this set (for example MCQ, true/false,
          // number entry, fill-blank, order or drag).
          const aTypeUsed =
            usedTypes.has(a.type || "single")
              ? 1
              : 0;

          const bTypeUsed =
            usedTypes.has(b.type || "single")
              ? 1
              : 0;

          if (aTypeUsed !== bTypeUsed) {
            return aTypeUsed - bTypeUsed;
          }

          const aSeen =
            seen.has(a.sourceId || a.id)
              ? 1
              : 0;
          const bSeen =
            seen.has(b.sourceId || b.id)
              ? 1
              : 0;

          return aSeen - bSeen;
        })
        .slice(0, 18);

    for (const q of candidates) {
      const source =
        q.sourceId || q.id;

      const fingerprint =
        questionFingerprint(q);

      const stem =
        questionStemFingerprint(q);

      usedSources.add(source);
      usedFingerprints.add(fingerprint);
      stemCounts.set(
        stem,
        (stemCounts.get(stem) || 0) + 1
      );
      selected.push(q);

      const wasCovered =
        coveredElabs.has(q.elaboration);

      const technicalType =
        q.type || "single";

      const typeWasUsed =
        usedTypes.has(technicalType);

      coveredElabs.add(q.elaboration);
      usedTypes.add(technicalType);

      dfs(
        slotIndex + 1,
        selected,
        usedSources,
        usedFingerprints,
        stemCounts,
        coveredElabs,
        usedTypes
      );

      if (best) {
        return;
      }

      selected.pop();
      usedSources.delete(source);
      usedFingerprints.delete(fingerprint);

      const nextStemCount =
        (stemCounts.get(stem) || 1) - 1;
      if (nextStemCount <= 0) {
        stemCounts.delete(stem);
      } else {
        stemCounts.set(stem, nextStemCount);
      }

      if (!typeWasUsed) {
        const typeStillUsed =
          selected.some(
            (item) =>
              (item.type || "single") ===
              technicalType
          );

        if (!typeStillUsed) {
          usedTypes.delete(
            technicalType
          );
        }
      }

      if (!wasCovered) {
        const stillCovered =
          selected.some(
            (item) =>
              item.elaboration ===
              q.elaboration
          );

        if (!stillCovered) {
          coveredElabs.delete(
            q.elaboration
          );
        }
      }
    }
  };

  dfs(
    0,
    [],
    new Set(),
    new Set(),
    new Map(),
    new Set(),
    new Set()
  );

  // Safe fallback if a very unusual subsection has too few
  // candidates for the normal family mix.
  if (!best) {
    const selected = [];
    const used = new Set();
    const usedFingerprints = new Set();
    const stemCounts = new Map();

    requiredElabs.forEach((elab) => {
      const candidate =
        shuffle(variants).find(
          (q) =>
            q.elaboration === elab &&
            !used.has(
              q.sourceId || q.id
            ) &&
            !usedFingerprints.has(
              questionFingerprint(q)
            ) &&
            (stemCounts.get(questionStemFingerprint(q)) || 0) < 1
        );

      if (candidate) {
        selected.push(candidate);
        used.add(
          candidate.sourceId ||
          candidate.id
        );
        usedFingerprints.add(
          questionFingerprint(candidate)
        );
        const stem = questionStemFingerprint(candidate);
        stemCounts.set(stem, (stemCounts.get(stem) || 0) + 1);
      }
    });

    shuffle(variants).forEach((q) => {
      if (selected.length >= TARGET) {
        return;
      }

      const source =
        q.sourceId || q.id;

      const fingerprint =
        questionFingerprint(q);

      const stem = questionStemFingerprint(q);

      if (
        !used.has(source) &&
        !usedFingerprints.has(fingerprint) &&
        (stemCounts.get(stem) || 0) < 1
      ) {
        selected.push(q);
        used.add(source);
        usedFingerprints.add(fingerprint);
        stemCounts.set(stem, (stemCounts.get(stem) || 0) + 1);
      }
    });

    // If a very small bank still cannot reach TARGET under the
    // two-per-pattern rule, fill only with genuinely different
    // visible questions. This avoids exact duplicates.
    best = selected.slice(0, TARGET);
  }

  const selectedQuestions =
    shuffle(best || []).map((q) => {
      const clean = { ...q };
      delete clean.sourceId;
      return clean;
    });

  // Remember source questions so repeated practice tends to
  // expose new questions before cycling back.
  try {
    (best || []).forEach((q) => {
      seen.add(q.sourceId || q.id);
    });

    localStorage.setItem(
      seenKey,
      JSON.stringify([...seen])
    );
  } catch (_) {}

  window.quizQuestions =
    selectedQuestions;

  window.skillrActiveQuestions =
    selectedQuestions;

  window.quizConfig = {
    ...(window.quizConfig || {}),
    shuffleQuestions: false,
    shuffleAnswers: false,
    maxQuestions: TARGET,
    caseSensitiveText: false,
    storageKey:
      config.storageKey ||
      `${baseCode || "foundation-maths"}-${
        config.elaboration || "all"
      }-BestScore`
  };
})();
