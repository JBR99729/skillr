(() => {
  "use strict";
  const vocabulary = {
    AC9MFN01:[["quantity","how many objects there are"],["numeral","a written mark that names a number"],["order","where a number comes when we count"],["zero","the number used when there are no objects"]],
    AC9MFN02:[["subitise","see how many without counting one by one"],["quantity","how many objects there are"],["parts","smaller groups seen inside a whole group"],["arrangement","the way objects are placed"]],
    AC9MFN03:[["collection","a group of objects"],["total","how many altogether"],["more","a greater number"],["fewer","a smaller number"]],
    AC9MFN04:[["whole","the complete group"],["part","a smaller group inside the whole"],["partition","split a whole into parts"],["combine","put parts together"]],
    AC9MFN05:[["join","put more objects into a group"],["separate","take objects away from a group"],["represent","show an idea with objects, pictures or numbers"],["result","how many there are after the action"]],
    AC9MFN06:[["equal","the same amount"],["share","give out objects fairly"],["group","a set of objects together"],["group size","how many objects are in each group"]],
    AC9MFA01:[["pattern","an arrangement that follows a rule"],["repeat","happen again in the same order"],["unit","the smallest part that repeats"],["continue","add the next correct part"]],
    AC9MFM01:[["length","how long an object is"],["mass","how heavy an object feels"],["capacity","how much a container can hold"],["duration","how long an event takes"]],
    AC9MFM02:[["sequence","an order that makes sense"],["daypart","a part of the day, such as morning"],["yesterday","the day before today"],["tomorrow","the day after today"]],
    AC9MFSP01:[["shape","the form of an object or outline"],["side","a straight or curved boundary"],["corner","a point where sides meet"],["sort","put things into groups using a rule"]],
    AC9MFSP02:[["position","where something is"],["location","the place where something can be found"],["reference object","the object used to explain where another object is"],["route","a path from one place to another"]],
    AC9MFST01:[["data","information collected to answer a question"],["category","a group made using a sorting rule"],["display","a way to show collected data"],["compare","look for more, fewer or the same"]]
  };
  const data = window.SkillrFoundationMathsData || {};
  Object.entries(vocabulary).forEach(([code, entries]) => {
    if (data[code]) data[code].vocabulary = entries.map(([term, definition]) => ({ term, definition }));
  });

  function labelCoreSlides() {
    const select = document.getElementById("v11-slide-select");
    if (!select || select.dataset.topicModuleRoles === "true") return false;
    [...select.options].forEach((option, index, options) => {
      const role = index < 3 || index === options.length - 1 ? "Core" : "Optional";
      if (!option.textContent.startsWith(`${role} `)) option.textContent = `${role} ${option.textContent}`;
    });
    select.dataset.topicModuleRoles = "true";
    return true;
  }
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", labelCoreSlides);
    const observer = new MutationObserver(() => { if (labelCoreSlides()) observer.disconnect(); });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
