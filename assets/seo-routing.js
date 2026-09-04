(() => {
  "use strict";
  const canonicalByQuizPath = {"/quiz/year-3/math/ac9m3m04/worksheet/":"/year-3-maths/analog-time-worksheets/","/quiz/year-3/math/ac9m3m04/practice/":"/year-3-maths/analog-time-worksheets/","/quiz/year-3/math/ac9m3m04/test/":"/year-3-maths/analog-time-worksheets/","/quiz/year-3/math/ac9m3m04/quiz/":"/year-3-maths/analog-time-worksheets/","/quiz/year-3/math/ac9m3m03/worksheet/":"/year-3-maths/units-of-time-practice/","/quiz/year-3/math/ac9m3m03/practice/":"/year-3-maths/units-of-time-practice/","/quiz/year-3/math/ac9m3m03/test/":"/year-3-maths/units-of-time-practice/","/quiz/year-3/math/ac9m3m03/quiz/":"/year-3-maths/units-of-time-practice/","/quiz/year-3/math/ac9m3n02/worksheet/":"/year-3-maths/fractions-worksheets/","/quiz/year-3/math/ac9m3n02/practice/":"/year-3-maths/fractions-worksheets/","/quiz/year-3/math/ac9m3n02/test/":"/year-3-maths/fractions-worksheets/","/quiz/year-3/math/ac9m3n02/quiz/":"/year-3-maths/fractions-worksheets/","/quiz/year-3/math/ac9m3n04/worksheet/":"/year-3-maths/division-worksheets/","/quiz/year-3/math/ac9m3n04/practice/":"/year-3-maths/division-worksheets/","/quiz/year-3/math/ac9m3n04/test/":"/year-3-maths/division-worksheets/","/quiz/year-3/math/ac9m3n04/quiz/":"/year-3-maths/division-worksheets/","/quiz/year-2/math/ac9m2n01/worksheet/":"/year-2-maths/place-value-worksheets/","/quiz/year-2/math/ac9m2n01/practice/":"/year-2-maths/place-value-worksheets/","/quiz/year-2/math/ac9m2n01/test/":"/year-2-maths/place-value-worksheets/","/quiz/year-2/math/ac9m2n01/quiz/":"/year-2-maths/place-value-worksheets/","/quiz/year-1/math/ac9m1a02/worksheet/":"/year-1-maths/patterning/","/quiz/year-1/math/ac9m1a02/practice/":"/year-1-maths/patterning/","/quiz/year-1/math/ac9m1a02/test/":"/year-1-maths/patterning/","/quiz/year-1/math/ac9m1a02/quiz/":"/year-1-maths/patterning/","/quiz/foundation/math/ac9mfn01/worksheet/":"/foundation-maths/counting-worksheets/","/quiz/foundation/math/ac9mfn01/practice/":"/foundation-maths/counting-worksheets/","/quiz/foundation/math/ac9mfn01/test/":"/foundation-maths/counting-worksheets/","/quiz/foundation/math/ac9mfn01/quiz/":"/foundation-maths/counting-worksheets/","/quiz/year-4/math/ac9m4n03/worksheet/":"/year-4-maths/equivalent-fractions-worksheets/","/quiz/year-4/math/ac9m4n03/practice/":"/year-4-maths/equivalent-fractions-worksheets/","/quiz/year-4/math/ac9m4n03/test/":"/year-4-maths/equivalent-fractions-worksheets/","/quiz/year-4/math/ac9m4n03/quiz/":"/year-4-maths/equivalent-fractions-worksheets/","/quiz/year-5/math/ac9m5n01/worksheet/":"/year-5-maths/decimals-worksheets/","/quiz/year-5/math/ac9m5n01/practice/":"/year-5-maths/decimals-worksheets/","/quiz/year-5/math/ac9m5n01/test/":"/year-5-maths/decimals-worksheets/","/quiz/year-5/math/ac9m5n01/quiz/":"/year-5-maths/decimals-worksheets/"};
  const path = window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/";
  const target = canonicalByQuizPath[path];
  if (!target) return;
  const setMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };
  setMeta("robots", "noindex,follow");
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = new URL(target, "https://skillrhub.com").href;
})();
