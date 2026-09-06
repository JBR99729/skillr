window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'Which shape has 3 sides?';
    answers = ['triangle', 'circle', 'square', 'rectangle'];
    explanation = 'A triangle has 3 sides.';
  } else if (index % 3 === 1) {
    question = 'Which shape has 4 equal sides?';
    answers = ['square', 'triangle', 'circle', 'hexagon'];
    explanation = 'A square has 4 equal sides.';
  } else {
    question = 'What is a line of symmetry?';
    answers = ['a line that divides a shape into matching halves', 'a point where two sides meet', 'a curved edge', 'a shape with no corners'];
    explanation = 'A line of symmetry creates matching halves.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
