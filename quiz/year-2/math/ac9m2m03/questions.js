window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'How many days are in a week?';
    answers = ['7', '5', '6', '8'];
    explanation = 'A week has seven days.';
  } else if (index % 3 === 1) {
    question = 'How many months are in a year?';
    answers = ['12', '10', '8', '24'];
    explanation = 'A year has twelve months.';
  } else {
    question = 'Which month comes after June?';
    answers = ['July', 'May', 'August', 'September'];
    explanation = 'July comes after June.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
