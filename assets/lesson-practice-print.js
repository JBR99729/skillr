/* Printing utility only. All lesson questions and answers are authored in HTML. */
(() => {
  'use strict';
  let printCopy;
  function cleanup() {
    printCopy?.remove(); printCopy = undefined;
    document.body.classList.remove('print-lesson-only', 'print-lesson-answers');
  }
  window.addEventListener('afterprint', cleanup);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-print-lesson]');
    if (!button) return;
    const source = button.closest('.lesson-practice');
    if (!source) return;
    cleanup();
    printCopy = source.cloneNode(true);
    printCopy.removeAttribute('id');
    printCopy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    printCopy.classList.add('lesson-print-root');
    printCopy.querySelectorAll('.answer-key').forEach(node => { node.open = true; });
    document.body.append(printCopy);
    document.body.classList.add('print-lesson-only');
    if (button.dataset.printLesson === 'answers') document.body.classList.add('print-lesson-answers');
    try { window.print(); } catch (error) { cleanup(); throw error; }
  });
})();
