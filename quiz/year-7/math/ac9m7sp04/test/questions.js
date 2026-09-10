"use strict";
window.skillrTestQuestions = [
  {
    "id": "AC9M7SP04-T-001",
    "type": "single",
    "question": "A triangle algorithm checks 'all sides equal?' then 'two sides equal?'. Why is this order efficient?",
    "answers": [
      "It separates equilateral before the broader isosceles case",
      "It avoids checking sides",
      "It classifies angles first",
      "It makes every triangle scalene"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Equilateral triangles also have at least two equal sides, so testing the more specific case first avoids ambiguity."
  },
  {
    "id": "AC9M7SP04-T-002",
    "type": "single",
    "question": "A triangle has sides 7,7,7 and angles 60°,60°,60°. A complete algorithm should output:",
    "answers": [
      "equilateral acute",
      "isosceles only",
      "scalene acute",
      "right equilateral"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "It is equilateral by sides and acute by angles."
  },
  {
    "id": "AC9M7SP04-T-003",
    "type": "single",
    "question": "A triangle has sides 5,5,8 and one 100° angle. The best combined output is:",
    "answers": [
      "isosceles obtuse",
      "isosceles acute",
      "scalene obtuse",
      "equilateral obtuse"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "Two equal sides and one obtuse angle."
  },
  {
    "id": "AC9M7SP04-T-004",
    "type": "single",
    "question": "A student writes: IF one angle is 90° THEN right ELSE acute. What case is missing?",
    "answers": [
      "obtuse",
      "equilateral",
      "isosceles",
      "scalene"
    ],
    "correct": 0,
    "difficulty": "easy",
    "explanation": "The ELSE branch wrongly groups obtuse triangles with acute triangles."
  },
  {
    "id": "AC9M7SP04-T-005",
    "type": "single",
    "question": "A student writes: IF all sides equal THEN equilateral ELSE scalene. What case is missing?",
    "answers": [
      "isosceles",
      "right",
      "obtuse",
      "acute"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Triangles with exactly two equal sides are not covered."
  },
  {
    "id": "AC9M7SP04-T-006",
    "type": "single",
    "question": "Which decision tree is logically complete for side classification?",
    "answers": [
      "all equal? yes→equilateral; no→two equal? yes→isosceles; no→scalene",
      "two equal? yes→scalene; no→equilateral",
      "all equal? no→equilateral",
      "count angles only"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "It partitions all possible side-equality cases."
  },
  {
    "id": "AC9M7SP04-T-007",
    "type": "single",
    "question": "A quadrilateral has two parallel pairs, all sides equal, but no right angles. A correct hierarchy outputs:",
    "answers": [
      "rhombus",
      "square",
      "rectangle",
      "trapezium"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "It is a parallelogram refined by four equal sides, but not by right angles."
  },
  {
    "id": "AC9M7SP04-T-008",
    "type": "single",
    "question": "A quadrilateral has two parallel pairs and four right angles, but adjacent sides differ. Output:",
    "answers": [
      "rectangle",
      "square",
      "rhombus",
      "kite"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Right angles make it a rectangle; unequal adjacent sides rule out square."
  },
  {
    "id": "AC9M7SP04-T-009",
    "type": "single",
    "question": "A quadrilateral has two parallel pairs, four equal sides and four right angles. Which output is most specific?",
    "answers": [
      "square",
      "parallelogram",
      "rectangle",
      "rhombus"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Square is the most specific class satisfying all properties."
  },
  {
    "id": "AC9M7SP04-T-010",
    "type": "single",
    "question": "Why should a hierarchy allow a square to pass through both rectangle and rhombus branches?",
    "answers": [
      "Because square satisfies both sets of defining properties",
      "Because square has no unique properties",
      "Because all quadrilaterals do",
      "Because orientation changes its class"
    ],
    "correct": 0,
    "difficulty": "medium",
    "explanation": "Inclusive classification recognises overlapping subclasses."
  },
  {
    "id": "AC9M7SP04-T-011",
    "type": "single",
    "question": "An algorithm checks parallel pairs first. It sees 0 pairs, then checks two pairs of adjacent equal sides. Why?",
    "answers": [
      "To distinguish a kite from a general irregular quadrilateral",
      "To find a square",
      "To find a rectangle",
      "To test concavity only"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "With no parallel pairs, adjacent side equality can identify a kite in this scheme."
  },
  {
    "id": "AC9M7SP04-T-012",
    "type": "single",
    "question": "Under the exclusive trapezium convention used in this unit, which branch should a shape with two parallel pairs follow?",
    "answers": [
      "parallelogram",
      "trapezium",
      "kite",
      "irregular"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Exactly one pair is reserved for trapezium; two pairs lead to parallelogram."
  },
  {
    "id": "AC9M7SP04-T-013",
    "type": "single",
    "question": "A square is misclassified as rectangle and the algorithm stops. What improvement is best?",
    "answers": [
      "After rectangle, test whether all sides are equal",
      "Remove the right-angle test",
      "Check concavity",
      "Count sides again"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "A further side-equality check refines rectangle to square."
  },
  {
    "id": "AC9M7SP04-T-014",
    "type": "single",
    "question": "A rhombus is misclassified as square. Which likely test is faulty?",
    "answers": [
      "The algorithm assumed equal sides imply right angles",
      "It counted four sides",
      "It checked parallelism",
      "It checked equal sides"
    ],
    "correct": 0,
    "difficulty": "hard",
    "explanation": "Equal sides alone do not guarantee right angles."
  },
  {
    "id": "AC9M7SP04-T-015",
    "type": "single",
    "question": "A polygon has 7 sides, unequal sides/angles, all interior angles below 180°. Output:",
    "answers": [
      "irregular convex heptagon",
      "regular convex heptagon",
      "irregular concave heptagon",
      "regular concave heptagon"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "Seven sides gives heptagon; unequal measures give irregular; all angles below 180° gives convex."
  },
  {
    "id": "AC9M7SP04-T-016",
    "type": "single",
    "question": "A polygon has 6 sides and one reflex interior angle. What can you conclude immediately?",
    "answers": [
      "It is a concave hexagon",
      "It is regular",
      "It is convex",
      "It is a parallelogram"
    ],
    "correct": 0,
    "difficulty": "super-hard",
    "explanation": "Side count and reflex angle are sufficient for hexagon + concave."
  }
];
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
