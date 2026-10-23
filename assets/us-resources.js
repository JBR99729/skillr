(() => {
  'use strict';
  const controls = document.querySelector('[data-us-filters]');
  if (!controls) return;
  const cards = [...document.querySelectorAll('[data-us-card]')];
  const grade = controls.querySelector('[data-us-grade]');
  const type = controls.querySelector('[data-us-type]');
  const cost = controls.querySelector('[data-us-cost]');
  function render() {
    let count = 0;
    for (const card of cards) {
      card.hidden = !!((grade.value && card.dataset.grade !== grade.value) || (type.value && card.dataset.type !== type.value) || (cost.value && card.dataset.cost !== cost.value));
      if (!card.hidden) count++;
    }
    document.querySelector('[data-us-status]').textContent = `${count} ${count === 1 ? 'resource' : 'resources'} shown`;
    document.querySelector('[data-us-empty]').hidden = count > 0;
  }
  controls.hidden = false;
  [grade, type, cost].forEach(control => control.addEventListener('change', render));
  controls.querySelector('[data-us-reset]').addEventListener('click', () => { grade.value = ''; type.value = ''; cost.value = ''; render(); });
})();
