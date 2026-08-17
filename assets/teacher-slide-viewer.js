(() => {
  'use strict';

  const root = document.querySelector('[data-fixed-slide-viewer]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('[data-slide]'));
  const previous = root.querySelector('[data-slide-previous]');
  const next = root.querySelector('[data-slide-next]');
  const counter = root.querySelector('[data-slide-counter]');
  const fullscreen = root.querySelector('[data-slide-fullscreen]');
  let index = 0;

  const SCIENCE_PROGRESSION = {
    AC9S1H01: { practice:'/quiz/year-1/science/ac9s1h01/practice/', up:'/year2/science/ac9s2h01-how-people-use-science-in-their-daily-lives-including-using/', upTitle:'Year 2: Science in daily life', upText:'Extend everyday science examples into how people use scientific knowledge and skills in daily life.' },
    AC9S1I01: { practice:'/quiz/year-1/science/ac9s1i01/practice/', up:'/year2/science/ac9s2i01-questions-to-explore-observed-simple-patterns-and-relationships/teacher-slides/', upTitle:'Year 2: Questions, patterns and relationships', upText:'Open the QA-cleared static Year 2 teacher deck for questions, patterns and relationships.' },
    AC9S1I02: { practice:'/quiz/year-1/science/ac9s1i02/practice/', up:'/year2/science/ac9s2i02-and-follow-safe-procedures-to-investigate-questions-and-test/', upTitle:'Year 2: Plan and follow safe procedures', upText:'Build from following safe steps into planning and following procedures to investigate questions and test predictions.' },
    AC9S1I03: { practice:'/quiz/year-1/science/ac9s1i03/practice/', up:'/year2/science/ac9s2i03-and-record-observations-including-informal-measurements-using/', upTitle:'Year 2: Record observations and informal measurements', upText:'Extend descriptive records into observations that include informal measurements and suitable representations.' },
    AC9S1I04: { practice:'/quiz/year-1/science/ac9s1i04/practice/', up:'/year2/science/ac9s2i04-and-order-data-and-information-and-represent-patterns-including/', upTitle:'Year 2: Order data and represent patterns', upText:'Extend sorting into ordering data and representing observed patterns more deliberately.' },
    AC9S1I05: { practice:'/quiz/year-1/science/ac9s1i05/practice/', up:'/year2/science/ac9s2i05-observations-with-predictions-and-others-observations-consider/', upTitle:'Year 2: Compare observations and predictions', upText:'Extend simple comparisons by considering predictions, your observations and other people’s observations.' },
    AC9S1I06: { practice:'/quiz/year-1/science/ac9s1i06/practice/', up:'/year2/science/ac9s2i06-and-create-texts-to-communicate-observations-findings-and-ideas/', upTitle:'Year 2: Communicate findings and ideas', upText:'Move from sharing scientific ideas to creating simple texts that communicate observations, findings and ideas.' },
    AC9S1U01: { practice:'/quiz/year-1/science/ac9s1u01/practice/', up:'/year3/science/ac9s3u01-characteristics-of-living-and-non-living-things-and-examine-the/', upTitle:'Year 3: Living and non-living things', upText:'Build from what plants and animals need into recognising characteristics that distinguish living and non-living things.' },
    AC9S1U02: { practice:'/quiz/year-1/science/ac9s1u02/practice/', up:'/year2/science/ac9s2u01-earth-is-a-planet-in-the-solar-system-and-identify/', upTitle:'Year 2: Patterns in the sky', upText:'Extend daily and seasonal environmental patterns into observing changing positions of the sun, moon, planets and stars.' },
    AC9S1U03: { practice:'/quiz/year-1/science/ac9s1u03/practice/', up:'/year4/science/ac9s4u03-how-forces-can-be-exerted-by-one-object-on-another/', upTitle:'Year 4: Forces between objects', upText:'Extend pushes and pulls into explaining how forces can be exerted by one object on another.' }
  };

  const loadProgression = () => {
    if (document.querySelector('script[data-skillr-curriculum-progression]')) return;
    const script = document.createElement('script');
    script.src = '/assets/curriculum-progression.js?v=1';
    script.defer = true;
    script.dataset.skillrCurriculumProgression = 'true';
    document.head.appendChild(script);
  };

  const loadScienceProgressionFallback = () => {
    window.setTimeout(() => {
      if (root.querySelector('.fixed-slide-viewer__learning-links')) return;
      const pageText = `${document.title} ${document.querySelector('h1')?.textContent || ''}`.toUpperCase();
      const code = Object.keys(SCIENCE_PROGRESSION).find((key) => pageText.includes(key));
      if (!code) return;
      const item = SCIENCE_PROGRESSION[code];
      const links = document.createElement('div');
      links.className = 'fixed-slide-viewer__learning-links';
      const practice = document.createElement('a');
      practice.className = 'fixed-slide-viewer__learning-link';
      practice.href = item.practice;
      practice.textContent = 'Practice this skill';
      const up = document.createElement('a');
      up.className = 'fixed-slide-viewer__learning-link fixed-slide-viewer__learning-link--primary';
      up.href = item.up;
      up.textContent = item.upTitle;
      up.title = item.upText;
      links.append(practice, up);
      root.appendChild(links);
    }, 350);
  };

  const show = (nextIndex) => {
    if (!slides.length) return;
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.hidden = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    document.dispatchEvent(new CustomEvent('skillr:slidechange', { detail: { index, total: slides.length, root } }));
  };

  previous?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));

  fullscreen?.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await root.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {
      // Fullscreen is an enhancement; the deck remains usable without it.
    }
  });

  root.addEventListener('contextmenu', (event) => event.preventDefault());
  root.addEventListener('copy', (event) => event.preventDefault());
  root.addEventListener('cut', (event) => event.preventDefault());
  root.addEventListener('dragstart', (event) => event.preventDefault());
  root.addEventListener('selectstart', (event) => event.preventDefault());

  root.querySelectorAll('img').forEach((image) => {
    image.draggable = false;
    image.setAttribute('draggable', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (!root.contains(document.activeElement) && !document.fullscreenElement) return;

    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      show(index - 1);
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      show(index + 1);
      return;
    }

    const blocked = (event.ctrlKey || event.metaKey) && ['c', 's', 'p', 'u'].includes(event.key.toLowerCase());
    if (blocked) event.preventDefault();
  });

  loadProgression();
  loadScienceProgressionFallback();
  show(0);
})();
