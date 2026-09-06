window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'What is a turn called?';
    answers = ['rotation', 'flip', 'slide', 'stretch'];
    explanation = 'A turn is called a rotation.';
  } else if (index % 3 === 1) {
    question = 'What is a flip called?';
    answers = ['reflection', 'rotation', 'slide', 'turn'];
    explanation = 'A flip is called a reflection.';
  } else {
    question = 'What is a slide called?';
    answers = ['translation', 'rotation', 'reflection', 'turn'];
    explanation = 'A slide is called a translation.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
