window.quizQuestions = Array.from({ length: 150 }, (_, index) => {
  let question = '';
  let answers = [];
  let explanation = '';

  if (index % 3 === 0) {
    question = 'Which unit would you use to measure a pencil?';
    answers = ['cm', 'kg', 'L', 'mL'];
    explanation = 'Centimetres are used for small lengths.';
  } else if (index % 3 === 1) {
    question = 'How many centimetres are in 2 metres?';
    answers = ['200', '20', '2000', '2'];
    explanation = 'One metre is 100 centimetres.';
  } else {
    question = 'How many grams are in 1 kilogram?';
    answers = ['1000', '100', '10', '500'];
    explanation = 'A kilogram has 1000 grams.';
  }

  return { type: 'single', question, answers, correct: 0, explanation };
});
