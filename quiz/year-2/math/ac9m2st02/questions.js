window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'If one bar is taller than another, which category is greater?';
    answers = ['the taller bar', 'the shorter bar', 'both equal', 'neither'];
    explanation = 'The taller bar shows the greater amount.';
  } else if (index % 3 === 1) {
    question = 'What does a graph title tell us?';
    answers = ['what the data is about', 'how to count', 'the weather', 'what time it is'];
    explanation = 'The title tells us what the graph is about.';
  } else {
    question = 'Which graph uses pictures to show data?';
    answers = ['pictograph', 'bar graph', 'clock', 'map'];
    explanation = 'A pictograph uses pictures.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
