window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'How many quarters make one whole?';
    answers = ['4', '2', '3', '8'];
    explanation = 'Four quarters make one whole.';
  } else if (index % 3 === 1) {
    question = 'What is half of 12?';
    answers = ['6', '3', '4', '8'];
    explanation = 'Half means split into two equal parts.';
  } else {
    question = 'What fraction is one part out of 4 equal parts?';
    answers = ['1/4', '1/2', '3/4', '1'];
    explanation = 'One out of four equal parts is one quarter.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
