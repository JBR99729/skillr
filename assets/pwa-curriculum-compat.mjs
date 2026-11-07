export function loadCurriculumCompatibility(path, loadScript) {
  function loadSequence(items) {
    return items.reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve())
      .catch((error) => console.error("Skillr script load failed:", error));
  }

  loadScript("/assets/foundation-topic-language.js?v=1");
  loadScript("/assets/foundation-maths-professional-ui.js?v=5");
  loadSequence([
    "/assets/skillr-svg-runtime.js?v=2",
    "/assets/skillr-concept-svg.js?v=2",
    "/assets/curriculum-cluster-core.js?v=1",
    "/assets/curriculum-strand-coverage.js?v=2",
    "/assets/curriculum-visual-layer.js?v=2",
    "/assets/teacher-slide-clusters.js?v=1",
    "/assets/multi-strand-worksheet-pack.js?v=1",
    "/assets/qa-complete-ribbon.js?v=3"
  ]);

  const foundationMathsData = [
    "/assets/foundation-maths-data-number.js?v=2",
    "/assets/foundation-maths-data-other.js?v=2",
    "/assets/foundation-ac9mfn02-visual-elaborations.js?v=20260813",
    "/assets/foundation-maths-elaborations-n03-n05.js?v=20260813-4"
    ,"/assets/foundation-maths-elaborations-n06-a01-m01.js?v=20260813-4"
    ,"/assets/foundation-maths-elaborations-m02-sp01-sp02.js?v=20260813-4"
  ];
  const foundationScienceData = ["/assets/foundation-science-data.js?v=2"];
  const foundationEnglishData = ["/assets/foundation-english-data.js?v=2"];
  const foundationEnglishTopicModules = [
    "/assets/foundation-english-topic-module-la-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/assets/foundation-english-topic-module-le-ly1-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/assets/foundation-english-topic-module-ly2-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/assets/foundation-english-topic-module-core-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/assets/foundation-english-classroom-v2.js?v=20260906-foundation-english-worksheet-layout"
  ];
  const foundationEnglishWorksheetModules = [
    "/quiz/assets/foundation-english-topic-module-la-data-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/quiz/assets/foundation-english-topic-module-le-ly1-data-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/quiz/assets/foundation-english-topic-module-ly2-data-v2.js?v=20260906-foundation-english-worksheet-layout",
    "/quiz/assets/foundation-english-topic-module-balance-v2.js?v=20260906-foundation-english-worksheet-layout"
  ];

  const year1MathsData = ["/assets/year1-maths-data.js?v=2"];
  const year1ScienceData = ["/assets/year1-science-data.js?v=3"];
  const year1EnglishData = ["/assets/year1-english-data.js?v=2"];
  const year1Slides = ["/assets/year1-slides-v11.js?v=1"];

  const year2MathsData = ["/assets/year2-maths-data.js?v=3", "/assets/year2-maths-data-extra.js?v=2"];
  const year2ScienceData = ["/assets/year2-science-data.js?v=2"];
  const year2EnglishData = ["/assets/year2-english-data.js?v=2"];

  const year3MathsData = [
    "/assets/year3-maths-data-base.js?v=2",
    "/assets/year3-maths-data-n1.js?v=2",
    "/assets/year3-maths-data-n2.js?v=2",
    "/assets/year3-maths-data-n3.js?v=2",
    "/assets/year3-maths-data-a.js?v=2",
    "/assets/year3-maths-data-m1.js?v=2",
    "/assets/year3-maths-data-m2.js?v=2",
    "/assets/year3-maths-data-sp.js?v=2",
    "/assets/year3-maths-data-st.js?v=2",
    "/assets/year3-maths-data-p.js?v=2"
  ];
  const year3ScienceData = ["/assets/year3-subject-data-base.js?v=2", "/assets/year3-science-data.js?v=2"];
  const year3EnglishData = [
    "/assets/year3-subject-data-base.js?v=2",
    "/assets/year3-english-data-la1.js?v=2",
    "/assets/year3-english-data-la2.js?v=2",
    "/assets/year3-english-data-la3a.js?v=2",
    "/assets/year3-english-data-la3b.js?v=2",
    "/assets/year3-english-data-le.js?v=2",
    "/assets/year3-english-data-ly1.js?v=2",
    "/assets/year3-english-data-ly2.js?v=2"
  ];

  const year4MathsData = [
    "/assets/year4-maths-data-base.js?v=5",
    "/assets/year4-maths-data-n1.js?v=5",
    "/assets/year4-maths-data-n2.js?v=5",
    "/assets/year4-maths-data-n3.js?v=5",
    "/assets/year4-maths-data-a.js?v=5",
    "/assets/year4-maths-data-m1.js?v=5",
    "/assets/year4-maths-data-m2.js?v=5",
    "/assets/year4-maths-data-sp.js?v=5",
    "/assets/year4-maths-data-st.js?v=5",
    "/assets/year4-maths-data-p.js?v=5"
  ];
  const year4ScienceData = ["/assets/year4-subject-data-base.js?v=1", "/assets/year4-science-data.js?v=1", "/assets/year4-science-topic-modules.js?v=2"];
  const year4EnglishData = [
    "/assets/year4-subject-data-base.js?v=1",
    "/assets/year4-english-data-la1.js?v=1",
    "/assets/year4-english-data-la2.js?v=1",
    "/assets/year4-english-data-le.js?v=1",
    "/assets/year4-english-data-ly1.js?v=1",
    "/assets/year4-english-data-ly2.js?v=1"
  ];

  const routes = [
    [/^\/foundation\/science\/ac9sfu01-observe-external-features-of-plants-and-animals-and-describe\/?$/i, []],
    [/^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/(practice|test)\/?$/i, [...foundationMathsData, "/assets/foundation-maths-practice-quick-read.js?v=7"]],
    [/^\/quiz\/grade-k\/math\/ac9mf[a-z0-9]+\/worksheet\/?$/i, foundationMathsData],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/(practice|test)\/?$/i, [...foundationScienceData, "/assets/foundation-science-practice-quick-read.js?v=5"]],
    [/^\/quiz\/grade-k\/science\/ac9s[a-z0-9]+\/worksheet\/?$/i, [...foundationScienceData, "/assets/foundation-science-worksheet-page.js?v=20260814-topic-practice-split2"]],
    [/^\/foundation\/science\/ac9s/i, [...foundationScienceData, "/assets/foundation-science-render.js?v=2", "/assets/foundation-science-curriculum-scope.js?v=2"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/(practice|test)\/?$/i, [...foundationEnglishData, "/assets/foundation-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet(?:\/topic-practice-[12])?\/?$/i, [...foundationEnglishData, ...foundationEnglishWorksheetModules, "/assets/foundation-english-worksheet-page.js?v=20260906-foundation-english-worksheet-layout", "/assets/foundation-english-topic-practice-compat.js?v=20260906-foundation-english-worksheet-layout"]],
    [/^\/foundation\/english\/ac9ef/i, [...foundationEnglishData, ...foundationEnglishTopicModules, "/assets/foundation-english-render.js?v=20260906-foundation-english-worksheet-layout"]],

    [/^\/year1\/maths\/ac9m1/i, [...year1MathsData, "/assets/year1-maths-render.js?v=2"]],
    [/^\/worksheets\/year1\/maths\/teacher-slides\/live\.html$/i, year1Slides],
    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/(practice|test)\/?$/i, [...year1MathsData, "/assets/year1-maths-practice-quick-read.js?v=3"]],
    [/^\/quiz\/year-1\/math\/ac9m1[a-z0-9]+\/worksheet\/?$/i, [...year1MathsData, "/assets/year1-maths-worksheet-page.js?v=3"]],
    [/^\/year1\/science\/ac9s1/i, [...year1ScienceData, "/assets/year1-science-render.js?v=2"]],
    [/^\/worksheets\/year1\/science\/teacher-slides\/live\.html$/i, year1Slides],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/(practice|test)\/?$/i, [...year1ScienceData, "/assets/year1-science-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-1\/science\/ac9s1[a-z0-9]+\/worksheet\/?$/i, [...year1ScienceData, "/assets/year1-science-worksheet-page.js?v=2"]],
    [/^\/year1\/english\/ac9e1/i, [...year1EnglishData, "/assets/year1-english-render.js?v=2"]],
    [/^\/worksheets\/year1\/english\/teacher-slides\/live\.html$/i, year1Slides],
    [/^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/(practice|test)\/?$/i, [...year1EnglishData, "/assets/year1-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-1\/english\/ac9e1[a-z0-9]+\/worksheet\/?$/i, [...year1EnglishData, "/assets/year1-english-worksheet-page.js?v=2"]],

    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/(practice|test)\/?$/i, [...year2MathsData, "/assets/year2-maths-practice-quick-read.js?v=3"]],
    [/^\/quiz\/year-2\/math\/ac9m2[a-z0-9]+\/worksheet\/?$/i, [...year2MathsData, "/assets/year2-maths-worksheet-page.js?v=3"]],
    [/^\/year2\/science\/ac9s2/i, [...year2ScienceData, "/assets/year2-science-render.js?v=3"]],
    [/^\/quiz\/year-2\/science\/ac9s2u0[123]\/(practice|test)\/?$/i, [...year2ScienceData, "/assets/year2-science-practice-quick-read.js?v=2", "/assets/year2-science-authored-banks.js?v=20260813-qa1", "/assets/year2-science-bank-loader.js?v=20260813-qa1&guard=20261019"]],
    [/^\/quiz\/year-2\/science\/ac9s2u0[123]\/quiz\/?$/i, [...year2ScienceData, "/assets/year2-science-quiz-page.js?v=20260813-qa1&guard=20261019", "/assets/year2-science-authored-banks.js?v=20260813-qa1", "/assets/year2-science-bank-loader.js?v=20260813-qa1&guard=20261019"]],
    [/^\/quiz\/year-2\/science\/ac9s2(?:h01|i0[12])\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch2.js?v=20260813-qa2", "/assets/year2-science-bank-loader.js?v=20260813-qa2&guard=20261019", "/assets/year2-science-quiz-page.js?v=20260813-qa2&guard=20261019"]],
    [/^\/quiz\/year-2\/science\/ac9s2i0[3-5]\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch3.js?v=20260813-qa3", "/assets/year2-science-bank-loader.js?v=20260813-qa3&guard=20261019", "/assets/year2-science-quiz-page.js?v=20260813-qa3&guard=20261019"]],
    [/^\/quiz\/year-2\/science\/ac9s2i06\/(practice|test|worksheet|quiz)\/?$/i, [...year2ScienceData, "/assets/year2-science-authored-banks-batch4.js?v=20260813-qa4", "/assets/year2-science-bank-loader.js?v=20260813-qa4&guard=20261019", "/assets/year2-science-quiz-page.js?v=20260813-qa4&guard=20261019"]],
    [/^\/quiz\/year-2\/science\/ac9s2(?!u0[123])[a-z0-9]+\/(practice|test)\/?$/i, [...year2ScienceData, "/assets/year2-science-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-2\/science\/ac9s2[a-z0-9]+\/worksheet\/?$/i, [...year2ScienceData, "/assets/year2-science-worksheet-page.js?v=2"]],
    [/^\/year2\/english\/ac9e2/i, [...year2EnglishData, "/assets/year2-english-render.js?v=3"]],
    [/^\/quiz\/year-2\/english\/ac9e2la0[1-3]\/quiz\/?$/i, [...year2EnglishData, "/assets/year2-english-authored-banks-batch1.js?v=20260813-eqa1", "/assets/year2-english-bank-loader.js?v=20260813-eqa1", "/assets/year2-english-quiz-page.js?v=20260813-eqa1"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/(practice|test)\/?$/i, [...year2EnglishData, "/assets/year2-english-practice-quick-read.js?v=2"]],
    [/^\/quiz\/year-2\/english\/ac9e2[a-z0-9]+\/worksheet\/?$/i, [...year2EnglishData, "/assets/year2-english-worksheet-page.js?v=2"]],

    [/^\/year3\/maths\/ac9m3/i, [...year3MathsData, "/assets/year3-maths-render.js?v=2"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/(practice|test)\/?$/i, [...year3MathsData, "/assets/year3-maths-practice-quick-read.js?v=20261020-authored"]],
    [/^\/quiz\/year-3\/math\/ac9m3[a-z0-9]+\/worksheet\/?$/i, [...year3MathsData, "/assets/year3-maths-worksheet-page.js?v=2"]],
    [/^\/year3\/science\/(?!ac9s3u04(?:-|\/))ac9s3/i, [...year3ScienceData, "/assets/year3-subject-render.js?v=2"]],
    [/^\/quiz\/year-3\/science\/ac9s3[a-z0-9]+\/(practice|test)\/?$/i, [...year3ScienceData, "/assets/year3-subject-quick-read.js?v=2"]],
    [/^\/quiz\/year-3\/science\/ac9s3[a-z0-9]+\/worksheet\/?$/i, [...year3ScienceData, "/assets/year3-subject-worksheet-page.js?v=2"]],
    [/^\/year3\/english\/ac9e3/i, [...year3EnglishData, "/assets/year3-subject-render.js?v=2"]],
    [/^\/quiz\/year-3\/english\/ac9e3[a-z0-9]+\/(practice|test)\/?$/i, [...year3EnglishData, "/assets/year3-subject-quick-read.js?v=2"]],
    [/^\/quiz\/year-3\/english\/ac9e3[a-z0-9]+\/worksheet\/?$/i, [...year3EnglishData, "/assets/year3-subject-worksheet-page.js?v=2"]],

    [/^\/year4\/maths\/ac9m4/i, [...year4MathsData, "/assets/year4-maths-render.js?v=5"]],
    [/^\/quiz\/year-4\/math\/ac9m4[a-z0-9]+\/(practice|test)\/?$/i, [...year4MathsData, "/assets/year4-maths-practice-quick-read.js?v=5"]],
    [/^\/quiz\/year-4\/math\/ac9m4[a-z0-9]+\/worksheet\/?$/i, [...year4MathsData, "/assets/year4-maths-worksheet-page.js?v=5"]],
    [/^\/year4\/science\/ac9s4/i, [...year4ScienceData, "/assets/year4-science-topic-render.js?v=2"]],
    [/^\/quiz\/year-4\/science\/ac9s4[a-z0-9]+\/(practice|test)\/?$/i, [...year4ScienceData, "/assets/year4-subject-quick-read.js?v=1"]],
    [/^\/quiz\/year-4\/science\/ac9s4[a-z0-9]+\/worksheet\/?$/i, [...year4ScienceData, "/assets/year4-science-worksheet.js?v=2"]],
    [/^\/year4\/english\/ac9e4/i, [...year4EnglishData, "/assets/year4-subject-render.js?v=1"]],
    [/^\/quiz\/year-4\/english\/ac9e4[a-z0-9]+\/(practice|test)\/?$/i, [...year4EnglishData, "/assets/year4-subject-quick-read.js?v=1"]],
    [/^\/quiz\/year-4\/english\/ac9e4[a-z0-9]+\/worksheet\/?$/i, [...year4EnglishData, "/assets/year4-subject-worksheet-page.js?v=1"]]
  ];

  const foundationMathsTopic = /^\/foundation\/maths\/ac9mf/i.test(path) && !document.getElementById("teaching-lesson");
  if (foundationMathsTopic && !window.SkillrFoundationMathsData) {
    loadSequence([...foundationMathsData, "/assets/foundation-maths-render.js?v=20260813-4"]);
  }

  for (const [pattern, scripts] of routes) {
    if (pattern.test(path)) { loadSequence(scripts); break; }
  }
}
