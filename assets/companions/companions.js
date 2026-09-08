(function () {
  'use strict';
  if (window.__skillrCompanionsMounted) return;
  const config = window.SkillrCompanionConfig;
  if (!config?.enabled) return;
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function init() {
    if (!document.body || document.querySelector('meta[http-equiv="refresh" i]')) return;
    window.__skillrCompanionsMounted = true;
    const title = clean(document.querySelector('h1')?.textContent || document.title);
    const ctx = config.context(location.pathname, title);
    // Brand guidance is a learning utility; don't distract on legal/error/admin pages.
    if (/^\/(?:privacy-policy|policy|404|offline|ai-|editorial-standards)/i.test(location.pathname)) return;
    let hidden = false;
    try { hidden = localStorage.getItem(config.storageKey) === 'false'; } catch (_) { /* Storage is optional. */ }
    let guideIndex = -1, running = false, lastQuestion = '', previousTarget = null;
    const originalTabindex = new Map();
    const openState = new Map();
    let stepbar = null, replayNotice = null;
    const steps = [];
    const panel = element('section', 'skillr-companions');
    panel.id = 'skillr-companions';
    panel.setAttribute('aria-label', 'Ben and Vani learning companions');
    panel.dataset.year = String(ctx.year);
    panel.dataset.band = ctx.band.label;
    panel.style.setProperty('--companion-row', String(ctx.band.row));
    panel.style.setProperty('--ben', config.characters.ben.colour);
    panel.style.setProperty('--vani', config.characters.vani.colour);
    if (ctx.quiet) panel.classList.add('skillr-companions--quiet');
    if (ctx.sensitive) panel.classList.add('skillr-companions--sensitive');
    if (ctx.classroom) panel.classList.add('skillr-companions--classroom');
    if (ctx.worksheet) panel.classList.add('skillr-companions--worksheet');
    if (ctx.home) panel.classList.add('skillr-companions--home');
    const pair = element('div', 'skillr-companions__pair');
    pair.setAttribute('aria-hidden', 'true');
    function paintAvatar(avatar, name, band) {
      const [x, y, w, h] = config.portraits[band.row][name];
      const [width, height] = config.artworkSize;
      avatar.style.backgroundImage = 'url("' + config.atlas + '")';
      avatar.style.backgroundSize = (width / w * 100) + '% ' + (height / h * 100) + '%';
      avatar.style.backgroundPosition = (x / (width - w) * 100) + '% ' + (y / (height - h) * 100) + '%';
    }
    for (const name of ['ben', 'vani']) {
      const avatar = element('span', 'skillr-companion-avatar skillr-companion-avatar--' + name);
      paintAvatar(avatar, name, ctx.band);
      pair.appendChild(avatar);
    }
    const body = element('div', 'skillr-companions__body');
    const copy = element('div', 'skillr-companions__copy');
    copy.id = 'skillr-companion-copy';
    const eyebrow = element('p', 'skillr-companions__eyebrow', ctx.quiet ? 'Ben & Vani · Study companions' : 'Ben & Vani · One step at a time');
    const heading = element('h2', 'skillr-companions__title', ctx.home ? 'Meet your learning companions' : ctx.classroom ? 'Guide the lesson at your class’s pace' : ctx.test ? 'Ready to try it yourself?' : 'Let’s work through this together');
    const message = element('p', 'skillr-companions__message', ctx.test ? config.prompts.independent : ctx.worksheet ? 'Try each question on paper. Show your thinking, then check your work with a teacher or parent.' : ctx.band.intro);
    const siteMessage = config.siteMessages[location.pathname];
    if (siteMessage) { heading.textContent = siteMessage.title; message.textContent = siteMessage.message; }
    message.id = 'skillr-companion-message';
    message.setAttribute('aria-live', 'polite');
    message.setAttribute('aria-atomic', 'true');
    copy.append(eyebrow, heading, message);
    const actions = element('div', 'skillr-companions__actions');
    const buttons = {};
    function button(action, label, handler) {
      const b = element('button', '', label); b.type = 'button'; b.dataset.action = action;
      b.addEventListener('click', handler); actions.appendChild(b); buttons[action] = b;
      return b;
    }
    body.append(copy, actions); panel.append(pair, body);
    if (ctx.note) {
      const note = element('p', 'skillr-companions__note', ctx.note);
      note.setAttribute('role', 'note'); panel.appendChild(note);
    }
    const staticHome = document.getElementById('skillr-companions-home');
    if (staticHome) staticHome.replaceWith(panel);
    else {
      const hero = document.querySelector('.curriculum-hero');
      const quiz = document.querySelector('#quizApp,main.quiz-app');
      const classroom = document.querySelector('.display-board,.classroom-board,.deck-shell');
      const pageHeader = document.querySelector('.page-header');
      const infoHero = document.querySelector('.info-hero');
      if (ctx.classroom && classroom) classroom.before(panel);
      else if (quiz) quiz.prepend(panel);
      else if (hero) hero.after(panel);
      else if (pageHeader) pageHeader.after(panel);
      else if (infoHero) infoHero.after(panel);
      else (document.querySelector('main,.curriculum-page,.display-shell,.container') || document.body).prepend(panel);
    }

    function addStep(target, label, kind) {
      if (!target || panel.contains(target) || steps.some(s => s.target === target)) return;
      steps.push({ target, label: clean(label) || 'Lesson step', kind });
    }
    function kindFor(label) {
      if (/vocab|key words/i.test(label)) return 'vocabulary';
      if (/misconcep|mistake|mix-up/i.test(label)) return 'misconception';
      if (/independent|practice|try|question|exit ticket|check understanding/i.test(label)) return 'practice';
      if (/example|model|worked|thinking|elaboration/i.test(label)) return 'example';
      if (/review|mastery/i.test(label)) return 'review';
      if (/learn|concept|goal|intention/i.test(label)) return 'learn';
      return 'next';
    }
    if (ctx.topic || ctx.classroom) {
      const sections = Array.from(document.querySelectorAll('details.curriculum-topic-section,details.lesson-section,.display-shell details[name="lesson"],main details'));
      sections.forEach(section => {
        if (sections.some(other => other !== section && other.contains(section))) return;
        const summary = section.querySelector(':scope > summary');
        const label = clean(summary?.textContent);
        if (!label || /reference|curriculum alignment|international|equivalent|related|optional video|about these|resource|mapping/i.test(label) && !/fraction/i.test(label)) return;
        const kind = kindFor(label);
        addStep(section, label, kind);
        const examples = Array.from(section.querySelectorAll('.curriculum-worked-example,.example-card,.worked-example'));
        examples.forEach(example => {
          if (examples.some(other => other !== example && other.contains(example))) return;
          const exampleTitle = clean(example.querySelector('h3,h4')?.textContent) || label;
          const list = example.querySelector('ol');
          if (list && list.children.length > 1) {
            Array.from(list.children).forEach((li, i) => {
              if (li.tagName === 'LI') addStep(li, exampleTitle + ' · Step ' + (i + 1), 'example');
            });
          } else addStep(example, exampleTitle, 'example');
        });
      });
      if (!steps.length) {
        document.querySelectorAll('main section[id],main article[id]').forEach(section => {
          const h = section.querySelector('h2');
          if (h && !panel.contains(h)) addStep(section, h.textContent, kindFor(h.textContent));
        });
      }
    }

    function clearTarget() {
      if (previousTarget) previousTarget.classList.remove('skillr-companion-current');
      previousTarget = null;
      if (stepbar) stepbar.remove();
      stepbar = null;
      if (replayNotice) replayNotice.remove();
      replayNotice = null;
    }
    function restore() {
      clearTarget();
      openState.forEach((open, node) => { node.open = open; }); openState.clear();
      originalTabindex.forEach((value, node) => value === null ? node.removeAttribute('tabindex') : node.setAttribute('tabindex', value)); originalTabindex.clear();
      running = false;
    }
    function reveal(target) {
      const ancestors = [];
      for (let node = target; node && node !== document.body; node = node.parentElement) {
        if (node.tagName === 'DETAILS') ancestors.unshift(node);
      }
      ancestors.forEach(node => { if (!openState.has(node)) openState.set(node, node.open); node.open = true; });
      target.classList.add('skillr-companion-current'); previousTarget = target;
      if (!originalTabindex.has(target)) originalTabindex.set(target, target.getAttribute('tabindex'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    function repeatStep() {
      showStep(Math.min(guideIndex, steps.length - 1), true);
    }
    function showStep(index, repeat = false) {
      if (!steps.length) return;
      if (!running) document.querySelectorAll('details').forEach(node => openState.set(node, node.open));
      running = true; clearTarget(); guideIndex = Math.max(0, Math.min(index, steps.length));
      if (guideIndex === steps.length) {
        heading.textContent = 'Now put the skill to work'; message.textContent = config.prompts.complete;
        buttons.next.disabled = true; buttons.previous.disabled = false;
        panel.scrollIntoView({ behavior: 'auto', block: 'start' });
        buttons.previous.focus(); return;
      }
      const step = steps[guideIndex];
      const speaker = guideIndex % 2 ? config.characters.vani.name : config.characters.ben.name;
      eyebrow.textContent = speaker + ' · Step ' + (guideIndex + 1) + ' of ' + steps.length;
      heading.textContent = step.label;
      message.textContent = config.prompts[step.kind] || config.prompts.next;
      if (repeat) message.textContent = 'Let’s look again: ' + step.label + '. ' + message.textContent;
      buttons.start.hidden = true; buttons.previous.hidden = false; buttons.next.hidden = false; buttons.again.hidden = false;
      buttons.previous.disabled = guideIndex === 0; buttons.next.disabled = false;
      stepbar = element('div', 'skillr-companions__stepbar');
      stepbar.setAttribute('aria-label', speaker + ' guided step controls');
      const avatar = element('span', 'skillr-companion-avatar');
      avatar.setAttribute('aria-hidden', 'true');
      paintAvatar(avatar, guideIndex % 2 ? 'vani' : 'ben', ctx.band);
      if (ctx.sensitive) avatar.hidden = true;
      const status = element('span', '', speaker + ' · Step ' + (guideIndex + 1) + '/' + steps.length + '. ' + message.textContent);
      const again = element('button', '', 'Show me again'); again.type = 'button'; again.onclick = repeatStep;
      const next = element('button', '', guideIndex === steps.length - 1 ? 'Finish guided steps' : 'Next step'); next.type = 'button'; next.onclick = () => showStep(guideIndex + 1);
      stepbar.append(avatar, status, again, next);
      if (['DETAILS','LI'].includes(step.target.tagName)) step.target.appendChild(stepbar);
      else step.target.after(stepbar);
      if (repeat) {
        // Put replay feedback beside the authored content, where the learner returns.
        replayNotice = element('p', 'skillr-companions__replay', speaker + ' · ' + message.textContent);
        replayNotice.setAttribute('role', 'status');
        const summary = step.target.querySelector(':scope > summary');
        if (step.target.tagName === 'DETAILS' && summary) summary.after(replayNotice);
        else step.target.prepend(replayNotice);
      }
      // Scroll only after inserting controls/feedback, so layout changes cannot hide the start.
      reveal(step.target);
    }
    function independent() {
      restore(); heading.textContent = 'Work at your own pace';
      message.textContent = 'Explore the lesson yourself. You can bring the guide back whenever you need it.';
      for (const key of ['next','previous','again']) if (buttons[key]) buttons[key].hidden = true;
      if (buttons.start) { buttons.start.hidden = false; buttons.start.textContent = 'Guide me'; }
    }
    if (steps.length) {
      const usage = element('p', 'skillr-companions__usage');
      usage.append('Start with ', element('strong', '', 'Guide me'), ', choose ', element('strong', '', 'Let me try'), ' when you’re ready, or ', element('strong', '', 'Hide companions'), ' for a quieter page.');
      copy.appendChild(usage);
      button('start', 'Guide me', () => showStep(0));
      button('previous', 'Previous step', () => showStep(guideIndex - 1)).hidden = true;
      button('next', 'Next step', () => showStep(guideIndex + 1)).hidden = true;
      button('again', 'Show me again', repeatStep).hidden = true;
      button('independent', 'Let me try', independent);
    }
    const practiceLink = Array.from(document.querySelectorAll('a[href]')).find(a => {
      try { const url = new URL(a.href, location.href); return url.origin === location.origin && /\/practice\/?$/.test(url.pathname) && ctx.code && url.pathname.toUpperCase().includes('/' + ctx.code + '/'); } catch (_) { return false; }
    });
    if (practiceLink && !ctx.activity && !ctx.classroom) {
      const link = element('a', '', 'Try practice'); link.href = practiceLink.href; actions.appendChild(link);
    }
    function currentQuestion() {
      const number = Number((document.getElementById('questionNumber')?.textContent.match(/\d+/) || [])[0]);
      return Array.isArray(window.skillrActiveQuestions) && Number.isInteger(number) && number > 0 ? window.skillrActiveQuestions[number - 1] : null;
    }
    function activityUpdate() {
      const active = document.getElementById('quizScreen')?.classList.contains('is-active');
      const results = document.getElementById('resultScreen')?.classList.contains('is-active');
      if (ctx.test && active) { panel.hidden = true; return; }
      panel.hidden = false;
      if (buttons.hint) buttons.hint.hidden = !active || !!ctx.test;
      if (results || /\/(result|review)\//i.test(location.pathname)) {
        heading.textContent = 'Make your next step count';
        message.textContent = 'Review your responses and their explanations. Choose one idea to practise again.';
        if (buttons.hint) buttons.hint.hidden = true; return;
      }
      if (!active) return;
      const number = clean(document.getElementById('questionNumber')?.textContent);
      const feedback = document.getElementById('feedback');
      const key = number + '|' + clean(feedback?.textContent);
      if (key === lastQuestion) return;
      lastQuestion = key;
      const hasFeedback = !!clean(feedback?.textContent);
      heading.textContent = hasFeedback ? 'Check the thinking behind your answer' : (number || 'One question at a time');
      if (feedback?.classList.contains('pending')) message.textContent = config.prompts.pending;
      else if (feedback?.classList.contains('incorrect')) message.textContent = config.prompts.incorrect;
      else if (feedback?.classList.contains('correct')) message.textContent = config.prompts.correct;
      else message.textContent = 'Read the question, try your first step, then check your answer when you’re ready.';
    }
    if (ctx.activity && !ctx.test) {
      button('hint', 'Give me a hint', () => {
        // Only use an authored hint for the active shuffled question. Never reveal its answer/explanation.
        const authored = currentQuestion()?.hint;
        const isTextHint = typeof authored === 'string' && !/[<>]/.test(authored);
        eyebrow.textContent = 'Vani · ' + (isTextHint ? 'Question hint' : 'Getting started');
        message.textContent = isTextHint ? authored : config.subjectHints[ctx.subject] || config.subjectHints.general;
      }).hidden = true;
      button('independent', 'Let me try', () => { setVisible(false); });
    }
    const toggle = button('toggle', 'Hide companions', () => setVisible(hidden));
    toggle.className = 'skillr-companions__toggle';
    toggle.setAttribute('aria-controls', copy.id);
    const messageBadges = [];
    document.querySelectorAll('.skillr-feedback-card,.info-callout,[data-skillr-message]').forEach((notice, i) => {
      if (notice.closest('.skillr-companions') || ctx.sensitive) return;
      const badge = element('div', 'skillr-companion-message-badge');
      const avatar = element('span', 'skillr-companion-avatar'); avatar.setAttribute('aria-hidden', 'true');
      const speaker = notice.dataset.companion === 'ben' ? 'ben' : notice.dataset.companion === 'vani' ? 'vani' : i % 2 ? 'ben' : 'vani';
      paintAvatar(avatar, speaker, ctx.band);
      badge.append(avatar, element('span', '', config.characters[speaker].name + ' · A message from SkillrHub'));
      notice.prepend(badge); messageBadges.push(badge);
    });
    function setVisible(visible) {
      hidden = !visible;
      if (hidden && running) independent();
      panel.classList.toggle('skillr-companions--collapsed', hidden);
      toggle.textContent = hidden ? 'Show Ben & Vani' : 'Hide companions';
      toggle.setAttribute('aria-expanded', String(!hidden));
      messageBadges.forEach(badge => { badge.hidden = hidden; });
      try { localStorage.setItem(config.storageKey, String(!hidden)); } catch (_) { /* Core learning never needs storage. */ }
    }
    setVisible(!hidden);
    // Shared, text-only announcement API for future SkillrHub messages.
    window.SkillrCompanions = Object.freeze({
      announce(details) {
        if (!details || ctx.test && document.getElementById('quizScreen')?.classList.contains('is-active')) return;
        const speaker = details.speaker === 'ben' ? 'ben' : 'vani';
        eyebrow.textContent = config.characters[speaker].name + ' · SkillrHub';
        heading.textContent = clean(details.title);
        message.textContent = clean(details.message);
      }
    });
    if (ctx.home) {
      function updateHomeBand() {
        const chosen = document.querySelector('.ux-year[aria-pressed="true"]')?.dataset.year;
        const year = chosen === 'foundation' ? 0 : Number((chosen || '').replace('year', ''));
        if (!chosen || !Number.isFinite(year)) return;
        const band = config.bands.find(b => year <= b.maxYear) || config.bands.at(-1);
        pair.querySelectorAll('.skillr-companion-avatar').forEach((avatar, i) => paintAvatar(avatar, i ? 'vani' : 'ben', band));
        panel.dataset.year = String(year); panel.dataset.band = band.label;
        message.textContent = band.intro;
      }
      document.querySelectorAll('.ux-year').forEach(b => b.addEventListener('click', () => queueMicrotask(updateHomeBand)));
      updateHomeBand();
    }
    // Observe only quiz state. No polling, question mutation, score changes or answer selection.
    if (ctx.activity) {
      const observer = new MutationObserver(activityUpdate);
      for (const id of ['quizScreen','resultScreen']) {
        const node = document.getElementById(id); if (node) observer.observe(node, { attributes: true, attributeFilter: ['class'] });
      }
      for (const id of ['questionNumber','feedback']) {
        const node = document.getElementById(id); if (node) observer.observe(node, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
      }
      activityUpdate();
    }
    document.addEventListener('fullscreenchange', () => {
      if (ctx.classroom) panel.hidden = !!document.fullscreenElement;
    });
    // Restore native disclosure state before printing; never omit authored content.
    window.addEventListener('beforeprint', () => { if (running) independent(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
