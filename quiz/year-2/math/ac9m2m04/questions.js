window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'How many minutes are in 1 hour?';
    answers = ['60', '30', '45', '90'];
    explanation = 'An hour has 60 minutes.';
  } else if (index % 3 === 1) {
    question = 'What is half of 1 hour?';
    answers = ['30 minutes', '15 minutes', '45 minutes', '60 minutes'];
    explanation = 'Half of an hour is 30 minutes.';
  } else {
    question = 'What time is 15 minutes after 2:00?';
    answers = ['2:15', '2:30', '2:45', '3:00'];
    explanation = 'Add 15 minutes to the time.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
