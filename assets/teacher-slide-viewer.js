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
    AC9S1H01: { practice:'/quiz/year-1/science/ac9s1h01/practice/', up:'/year2/science/ac9s2h01-how-people-use-science-in-their-daily-lives-including-using/teacher-slides/', upTitle:'Year 2: Science in daily life', upText:'Open the static Year 2 teacher deck and extend everyday science examples into how people use scientific knowledge and skills.' },
    AC9S1I01: { practice:'/quiz/year-1/science/ac9s1i01/practice/', up:'/year2/science/ac9s2i01-questions-to-explore-observed-simple-patterns-and-relationships/teacher-slides/', upTitle:'Year 2: Questions, patterns and relationships', upText:'Extend pattern-based predictions into questions that explore simple observed relationships.' },
    AC9S1I02: { practice:'/quiz/year-1/science/ac9s1i02/practice/', up:'/year2/science/ac9s2i02-and-follow-safe-procedures-to-investigate-questions-and-test/teacher-slides/', upTitle:'Year 2: Plan and follow safe procedures', upText:'Build from following safe steps into planning and following procedures to investigate questions and test predictions.' },
    AC9S1I03: { practice:'/quiz/year-1/science/ac9s1i03/practice/', up:'/year2/science/ac9s2i03-and-record-observations-including-informal-measurements-using/teacher-slides/', upTitle:'Year 2: Record observations and informal measurements', upText:'Extend descriptive records into observations that include informal measurements and suitable representations.' },
    AC9S1I04: { practice:'/quiz/year-1/science/ac9s1i04/practice/', up:'/year2/science/ac9s2i04-and-order-data-and-information-and-represent-patterns-including/teacher-slides/', upTitle:'Year 2: Order data and represent patterns', upText:'Extend sorting into ordering data and representing observed patterns more deliberately.' },
    AC9S1I05: { practice:'/quiz/year-1/science/ac9s1i05/practice/', up:'/year2/science/ac9s2i05-observations-with-predictions-and-others-observations-consider/teacher-slides/', upTitle:'Year 2: Compare observations and predictions', upText:'Extend simple comparisons by considering predictions, your observations and other people’s observations.' },
    AC9S1I06: { practice:'/quiz/year-1/science/ac9s1i06/practice/', up:'/year2/science/ac9s2i06-and-create-texts-to-communicate-observations-findings-and-ideas/teacher-slides/', upTitle:'Year 2: Communicate findings and ideas', upText:'Move from sharing scientific ideas to creating simple texts that communicate observations, findings and ideas.' },
    AC9S1U01: { practice:'/quiz/year-1/science/ac9s1u01/practice/', up:'/year3/science/ac9s3u01-characteristics-of-living-and-non-living-things-and-examine-the/teacher-slides/', upTitle:'Year 3: Living and non-living things', upText:'Build from what plants and animals need into recognising characteristics that distinguish living and non-living things.' },
    AC9S1U02: { practice:'/quiz/year-1/science/ac9s1u02/practice/', up:'/year2/science/ac9s2u01-earth-is-a-planet-in-the-solar-system-and-identify/teacher-slides/', upTitle:'Year 2: Patterns in the sky', upText:'Extend daily and seasonal environmental patterns into observing changing positions of the sun, moon, planets and stars.' },
    AC9S1U03: { practice:'/quiz/year-1/science/ac9s1u03/practice/', up:'/year4/science/ac9s4u03-how-forces-can-be-exerted-by-one-object-on-another/teacher-slides/', upTitle:'Year 4: Forces between objects', upText:'Extend pushes and pulls into explaining how forces can be exerted by one object on another.' },

    AC9S2H01: { practice:'/quiz/year-2/science/ac9s2h01/practice/', up:'/year3/science/ac9s3h01-examine-how-people-use-data-to-develop-scientific-explanations/teacher-slides/', upTitle:'Year 3: Data and scientific explanations', upText:'Move from using patterns in daily science to using data as evidence for scientific explanations.' },
    AC9S2I01: { practice:'/quiz/year-2/science/ac9s2i01/practice/', up:'/year3/science/ac9s3i01-questions-to-explore-observed-patterns-and-relationships-and/teacher-slides/', upTitle:'Year 3: Investigable questions and predictions', upText:'Extend simple relationship questions into focused questions and predictions based on observations.' },
    AC9S2I02: { practice:'/quiz/year-2/science/ac9s2i02/practice/', up:'/year3/science/ac9s3i02-provided-scaffolds-to-plan-and-conduct-investigations-to-answer/teacher-slides/', upTitle:'Year 3: Plan fair investigations', upText:'Extend safe procedures into scaffolded planning, fair-test elements and safe investigation design.' },
    AC9S2I03: { practice:'/quiz/year-2/science/ac9s2i03/practice/', up:'/year3/science/ac9s3i03-follow-procedures-to-make-and-record-observations-including/teacher-slides/', upTitle:'Year 3: Measure and record observations', upText:'Move from informal measurement into formal measurements with familiar scaled instruments.' },
    AC9S2I04: { practice:'/quiz/year-2/science/ac9s2i04/practice/', up:'/year3/science/ac9s3i04-construct-and-use-representations-including-tables-simple/teacher-slides/', upTitle:'Year 3: Represent data and patterns', upText:'Extend provided tables and models into constructing suitable tables, simple graphs and representations.' },
    AC9S2I05: { practice:'/quiz/year-2/science/ac9s2i05/practice/', up:'/year3/science/ac9s3i05-findings-with-those-of-others-consider-if-investigations-were/teacher-slides/', upTitle:'Year 3: Compare findings and evaluate fairness', upText:'Extend guided comparison into comparing findings, considering fairness and identifying new questions.' },
    AC9S2I06: { practice:'/quiz/year-2/science/ac9s2i06/practice/', up:'/year3/science/ac9s3i06-and-create-texts-to-communicate-findings-and-ideas-for/teacher-slides/', upTitle:'Year 3: Communicate findings for an audience', upText:'Extend simple science texts into audience-aware communication using evidence and scientific language.' },
    AC9S2U03: { practice:'/quiz/year-2/science/ac9s2u03/practice/', up:'/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/teacher-slides/', upTitle:'Year 3: Solids, liquids and changes of state', upText:'Extend physical changes to materials into investigating solids, liquids and changes of state caused by heat transfer.' },

    AC9S3H01: { practice:'/quiz/year-3/science/ac9s3h01/practice/', up:'/year4/science/ac9s4h01-examine-how-people-use-data-to-develop-scientific-explanations/teacher-slides/', upTitle:'Year 4: Data and scientific explanations', upText:'Continue using data as evidence while working with more complex scientific explanations.' },
    AC9S3H02: { practice:'/quiz/year-3/science/ac9s3h02/practice/', up:'/year4/science/ac9s4h02-consider-how-people-use-scientific-explanations-to-meet-a-need/teacher-slides/', upTitle:'Year 4: Science used to meet needs', upText:'Extend how scientific explanations support practical needs and problem solving.' },
    AC9S3I01: { practice:'/quiz/year-3/science/ac9s3i01/practice/', up:'/year4/science/ac9s4i01-questions-to-explore-observed-patterns-and-relationships-and/teacher-slides/', upTitle:'Year 4: Questions, patterns and predictions', upText:'Develop more precise questions and predictions from observed patterns and relationships.' },
    AC9S3I02: { practice:'/quiz/year-3/science/ac9s3i02/practice/', up:'/year4/science/ac9s4i02-provided-scaffolds-to-plan-and-conduct-investigations-to-answer/teacher-slides/', upTitle:'Year 4: Plan and conduct investigations', upText:'Strengthen fair-test planning, procedure design and safe investigation choices.' },
    AC9S3I03: { practice:'/quiz/year-3/science/ac9s3i03/practice/', up:'/year4/science/ac9s4i03-follow-procedures-to-make-and-record-observations-including/teacher-slides/', upTitle:'Year 4: Measure and record accurately', upText:'Continue using scaled instruments and digital tools to collect increasingly reliable observations.' },
    AC9S3I04: { practice:'/quiz/year-3/science/ac9s3i04/practice/', up:'/year4/science/ac9s4i04-construct-and-use-representations-including-tables-simple/teacher-slides/', upTitle:'Year 4: Construct and interpret representations', upText:'Extend tables and simple graphs into increasingly purposeful representations of evidence.' },
    AC9S3I05: { practice:'/quiz/year-3/science/ac9s3i05/practice/', up:'/year4/science/ac9s4i05-findings-with-those-of-others-consider-if-investigations-were/teacher-slides/', upTitle:'Year 4: Compare findings and evaluate investigations', upText:'Continue comparing findings and evaluating whether methods and comparisons were fair.' },
    AC9S3I06: { practice:'/quiz/year-3/science/ac9s3i06/practice/', up:'/year4/science/ac9s4i06-and-create-texts-to-communicate-findings-and-ideas-for/teacher-slides/', upTitle:'Year 4: Communicate scientific findings', upText:'Extend evidence-based communication for different audiences and purposes.' },
    AC9S3U01: { practice:'/quiz/year-3/science/ac9s3u01/practice/', up:'/year4/science/ac9s4u01-explain-the-roles-and-interactions-of-consumers-producers-and/teacher-slides/', upTitle:'Year 4: Roles and interactions in ecosystems', upText:'Move from characteristics and life cycles into interactions among producers, consumers and decomposers.' },
    AC9S3U02: { practice:'/quiz/year-3/science/ac9s3u02/practice/', up:'/year5/science/ac9s5u02-how-weathering-erosion-transportation-and-deposition-cause-slow/teacher-slides/', upTitle:'Year 5: Weathering, erosion and landform change', upText:'Extend knowledge of soils, rocks and minerals into processes that weather, transport and deposit Earth materials.' },
    AC9S3U04: { practice:'/quiz/year-3/science/ac9s3u04/practice/', up:'/year4/science/ac9s4u02-sources-of-water-and-describe-key-processes-in-the-water/teacher-slides/', upTitle:'Year 4: Water and the water cycle', upText:'Apply changes of state to evaporation, condensation and other key processes in the water cycle.' }
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
