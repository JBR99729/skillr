window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  const a = 4 + (index % 9);
  const b = 3 + (index % 7);
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 2 === 0) {
    question = `What is ${a} + ${b}?`;
    answers = [String(a + b), String(a + b - 1), String(a + b + 1), String(a + b + 2)];
    explanation = 'Add the two numbers carefully.';
  } else {
    question = `What is ${a + 6} - ${b}?`;
    answers = [String(a + 6 - b), String(a + 6 - b + 1), String(a + 6 - b - 1), String(a + 6 - b + 2)];
    explanation = 'Subtract the smaller number from the larger number.';
  }

  return {
    type: 'single',
    question,
    answers,
    correct: 0,
    explanation
  };
});
