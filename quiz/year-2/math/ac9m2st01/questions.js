window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'What is data?';
    answers = ['information we collect', 'a type of shape', 'a kind of animal', 'a unit of time'];
    explanation = 'Data is information we collect.';
  } else if (index % 3 === 1) {
    question = 'What can we use to record data?';
    answers = ['tally marks', 'rulers', 'clocks', 'triangles'];
    explanation = 'Tally marks help record data.';
  } else {
    question = 'What kind of graph uses bars?';
    answers = ['bar graph', 'line graph', 'map', 'clock'];
    explanation = 'A bar graph uses bars.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
