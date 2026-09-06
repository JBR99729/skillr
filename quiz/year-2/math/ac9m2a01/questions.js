window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  const a = 4 + (index % 9);
  const b = 3 + (index % 7);
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = `What number comes next in the pattern 2, 4, 6, ___?`;
    answers = ['8', '7', '9', '10'];
    explanation = 'The pattern adds 2 each time.';
  } else if (index % 3 === 1) {
    question = `What number is missing: 5 + ___ = 12?`;
    answers = ['7', '6', '8', '5'];
    explanation = 'The missing addend makes 12.';
  } else {
    question = `What comes next: 10, 15, 20, ___?`;
    answers = ['25', '22', '24', '30'];
    explanation = 'The pattern adds 5 each time.';
  }

  return {
    type: 'single',
    question,
    answers,
    correct: 0,
    explanation
  };
});
