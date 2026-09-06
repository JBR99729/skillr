window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  const a = 2 + (index % 6);
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 2 === 0) {
    question = `What is ${a} × 2?`;
    answers = [String(a * 2), String(a * 2 + 1), String(a * 2 - 1), String(a * 2 + 2)];
    explanation = 'Skip counting by twos helps.';
  } else {
    question = `What is ${a * 2} ÷ 2?`;
    answers = [String(a), String(a + 1), String(a - 1), String(a + 2)];
    explanation = 'Divide by 2 to split into 2 equal groups.';
  }

  return {
    type: 'single',
    question,
    answers,
    correct: 0,
    explanation
  };
});
