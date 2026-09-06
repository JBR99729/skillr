window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'Which direction is opposite to east?';
    answers = ['west', 'north', 'south', 'up'];
    explanation = 'West is opposite east.';
  } else if (index % 3 === 1) {
    question = 'If a toy is on the table and moves to the left, which direction is it going?';
    answers = ['left', 'right', 'up', 'down'];
    explanation = 'Moving to the left is left.';
  } else {
    question = 'What does the word between mean?';
    answers = ['in the middle of two things', 'above something', 'under something', 'next to something'];
    explanation = 'Between means in the middle of two things.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
