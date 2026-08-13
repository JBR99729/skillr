(() => {
  "use strict";

  const modules = new Map();

  function register(module) {
    if (!module || module.schemaVersion !== "2.0" || !module.identity?.code) {
      throw new Error("Invalid SkillrHub topic-module v2 payload.");
    }
    modules.set(module.identity.code.toUpperCase(), Object.freeze(module));
  }

  window.SkillrTopicModulesV2 = {
    register,
    get(code) { return modules.get(String(code || "").toUpperCase()); },
    all() { return [...modules.values()]; }
  };
})();
