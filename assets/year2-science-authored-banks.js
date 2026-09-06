(() => {
  "use strict";

  const svg = (label, body) => `<svg role="img" aria-label="${label}" viewBox="0 0 240 130" width="240" height="130" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="130" rx="14" fill="#eef8ff"/>${body}</svg>`;
  const sky = (label, x, shadow = false) => svg(label, `<circle cx="${x}" cy="28" r="16" fill="#ffd43b"/><path d="M20 105H220" stroke="#56a36c" stroke-width="8"/>${shadow ? `<rect x="116" y="65" width="8" height="40" fill="#7a4b25"/><path d="M120 104L${x < 120 ? 205 : 35} 115" stroke="#52606d" stroke-width="9"/>` : ""}`);
  const orbit = (label) => svg(label, `<circle cx="62" cy="65" r="24" fill="#ffbf00"/><ellipse cx="145" cy="65" rx="70" ry="46" fill="none" stroke="#7589b5" stroke-width="3"/><circle cx="188" cy="42" r="14" fill="#3b82f6"/><circle cx="211" cy="29" r="6" fill="#cbd5e1"/>`);
  const moon = (label, phase) => svg(label, `<circle cx="120" cy="65" r="36" fill="#1c2940"/><path d="${phase}" fill="#f8fafc"/>`);
  const sound = (label, action, waves = 3) => svg(label, `<rect x="30" y="55" width="90" height="18" rx="7" fill="#e85d75"/><path d="M75 45Q90 64 75 83Q60 64 75 45" fill="#ffd166"/><text x="28" y="105" font-size="16" fill="#213547">${action}</text>${Array.from({length:waves},(_,i)=>`<path d="M${145+i*20} 45Q${165+i*20} 65 ${145+i*20} 85" fill="none" stroke="#3568d4" stroke-width="4"/>`).join("")}`);
  const material = (label, before, after) => svg(label, `<rect x="18" y="47" width="70" height="28" rx="6" fill="#ff9f43"/><path d="M98 62H136" stroke="#334155" stroke-width="4"/><path d="M128 54L138 62L128 70" fill="none" stroke="#334155" stroke-width="4"/><path d="${after}" fill="none" stroke="#9b51e0" stroke-width="18" stroke-linecap="round"/><text x="20" y="105" font-size="14">${before}</text>`);
  const q = (code, bank, n, skill, question, answers, explanation, visualHtml) => ({
    id: `${code.toLowerCase()}-${bank[0]}-${String(n).padStart(3,"0")}`,
    curriculumCode: code, bank, skill, type: "single", question, answers,
    correct: 0, explanation, printable: true, ...(visualHtml ? { visualHtml } : {})
  });
  const split = (code, scenes, build) => {
    const groups = scenes.map((scene, index) => build(scene, index));
    const practiceRaw = [...groups.slice(0,9).flat(), groups[9][0]];
    const testRaw = groups.slice(10,14).flat();
    const quizRaw = [...groups.slice(14,30).flat(), groups[30][0], groups[31][0]];
    const map = (raw, bank) => raw.map((item, i) => q(code, bank, i + 1, ...item));
    return { practice: map(practiceRaw,"practice"), test: map(testRaw,"test"), quiz: map(quizRaw,"quiz") };
  };

  const earthScenes = [
    ["identify Earth", "A space picture shows a blue world with land and oceans. What is it?", "Earth, a planet", "the Sun, a star", "the Moon, a planet", "a cloud", "Earth is the planet where we live.", orbit("Earth beside the Sun and Moon",)],
    ["identify the Sun", "Which statement correctly names the bright object at the centre of our solar system?", "The Sun is a star", "The Sun is a planet", "The Sun is a moon", "The Sun is a cloud", "The Sun is a star that gives Earth light and heat."],
    ["identify the Moon", "The small rocky object shown travelling around Earth is the —", "Moon", "Sun", "north star", "cloud", "The Moon is Earth's natural satellite.", orbit("The Moon travelling around Earth")],
    ["use orbit language", "What does it mean when Earth orbits the Sun?", "Earth travels around the Sun", "Earth sits inside the Sun", "the Sun switches off", "Earth becomes a star", "Orbit means to travel around another body."],
    ["recognise day pattern", "At breakfast the Sun appears low, near lunch it appears higher, and late afternoon it appears low again. What is this?", "a repeating daily sky pattern", "three different Suns", "the Sun changing into the Moon", "no pattern", "The Sun's apparent position follows a daily pattern.", sky("Sun shown high in the middle of the day",120)],
    ["compare morning and afternoon", "Which observation best compares the Sun's apparent position in morning and late afternoon?", "It appears on different sides of the sky", "It stays in exactly one spot", "It becomes a planet", "It can be safely stared at", "From Earth, the Sun appears to move across the sky."],
    ["observe safely", "Which is a safe way to investigate a Sun pattern?", "mark the end of a shadow at different times", "look straight at the Sun", "use binoculars to stare at it", "touch a hot lamp", "Shadows provide visible evidence without looking at the Sun.", sky("A tree and its shadow when the Sun is low",55,true)],
    ["interpret shadow", "The same pole has a long shadow in the morning and a shorter one near midday. What changed?", "the Sun's apparent position", "the pole's material", "Earth stopped turning", "the pole became shorter", "Shadow length changes as the Sun appears at different heights.", sky("Short shadow under a high Sun",120,true)],
    ["use repeated observations", "Why record the Moon on several evenings instead of once?", "to find a pattern over time", "to make the Moon move", "to turn night into day", "because one drawing proves every night", "Repeated observations help reveal change and patterns."],
    ["identify visible sky object", "Which object is often visible as a bright round or curved shape at night?", "the Moon", "Earth's core", "an ocean", "a tree root", "The Moon can appear round or curved from Earth.", moon("A bright crescent Moon", "M120 29A36 36 0 1 0 120 101A22 36 0 0 1 120 29")],
    ["fresh test: planet", "Mina says Earth is a star because it is in space. Which correction is accurate?", "Earth is a planet; the Sun is a star", "everything in space is a star", "Earth is a moon", "the Sun is a planet", "Location in space does not make an object a star."],
    ["fresh test: sequence", "Which order matches a usual clear-day pattern?", "morning, midday, evening", "evening, morning, midday", "midday, midnight, morning", "summer, morning, star", "A day progresses from morning through midday to evening."],
    ["fresh test: evidence", "A child marks one shadow at 9 am and another at noon. What evidence should be compared?", "shadow direction and length", "the child's shoe colour", "the pole's name", "the day of their birthday", "Direction and length are observable shadow features."],
    ["fresh test: model", "In a model, a small ball moves around an Earth ball. What does the small ball represent?", "the Moon", "the Sun", "another Earth", "a shadow", "The Moon travels around Earth.", orbit("A model of Sun, Earth and Moon")],
    ["sky vocabulary", "Which word names a large object such as Earth that travels around a star?", "planet", "shadow", "weather", "sound", "Earth is a planet because it travels around the Sun."],
    ["star vocabulary", "Which object is the nearest star to Earth?", "the Sun", "the Moon", "Mars", "a satellite dish", "The Sun is Earth's nearest star."],
    ["satellite vocabulary", "What is Earth's natural satellite?", "the Moon", "the Sun", "Venus", "a cloud", "The Moon naturally travels around Earth."],
    ["apparent movement", "Why do we say the Sun appears to move across our sky?", "we observe it in changing positions", "the Sun rolls along the ground", "the Sun is carried by clouds", "Earth stops each noon", "Appears describes what an observer on Earth sees."],
    ["day and night misconception", "Kai says the Sun switches off at night. What is the better idea?", "our part of Earth turns away from the Sun", "the Sun runs out of light nightly", "the Moon covers the Sun every night", "stars turn the Sun off", "The Sun keeps shining while Earth turns."],
    ["moon light misconception", "Which statement about the Moon is correct?", "we see sunlight reflected from the Moon", "the Moon is a small Sun", "the Moon makes all its own sunlight", "the Moon is a cloud", "The Moon reflects light from the Sun."],
    ["choose evidence", "Which record would best show a changing Moon pattern?", "dated drawings made at the same evening time", "one undated picture", "a list of favourite planets", "a daytime sound chart", "Dates and a similar viewing time make changes comparable."],
    ["predict shadow", "A pole's shadow was shortest near midday on three clear days. What is a sensible prediction for another clear day?", "it may again be shortest near midday", "there will be no shadow all day", "the pole will become a star", "night will begin at lunch", "Repeated evidence supports the prediction."],
    ["compare records", "Two children draw the Moon from different places at the same time. What should they do first?", "compare the visible shape and position they recorded", "choose the prettiest drawing", "erase any difference", "claim both are wrong", "Comparing observations can reveal shared evidence or differences."],
    ["identify non-planet", "Which object is not a planet?", "the Sun", "Earth", "Mars", "Venus", "The Sun is a star, not a planet."],
    ["solar-system relationship", "Which relationship is correct?", "Earth travels around the Sun", "the Sun travels around the Moon", "Earth travels around a tree", "the Moon is inside Earth", "Earth's orbit is around the Sun."],
    ["scale model limits", "A classroom model uses a basketball for the Sun and a marble for Earth. What does the model help show?", "the objects have very different sizes", "their exact real sizes", "Earth is made of glass", "the Sun can fit in a room", "Models represent ideas but are not the real objects."],
    ["stars at night", "Why can many stars be seen more easily at night?", "the sky is darker when our side faces away from the Sun", "stars only exist at night", "the Moon creates the stars", "all clouds become stars", "A darker sky makes star light easier to see."],
    ["clouds versus Moon", "A bright object keeps the same round outline while thin clouds pass in front. Which is the scientific observation?", "the clouds moved across the Moon", "the Moon became a cloud", "Earth stopped moving", "the Sun was inside the cloud", "The evidence shows two separate objects."],
    ["pattern duration", "Which change happens over about one day?", "the Sun appears to cross the sky", "Earth completes an orbit of the Sun", "a new planet forms", "the Moon becomes the Sun", "The apparent daily Sun path repeats over a day."],
    ["year relationship", "About what does Earth complete in one year?", "one orbit around the Sun", "one orbit around the Moon", "one trip through a cloud", "one daily shadow", "A year is linked to Earth's orbit around the Sun."],
    ["photo evidence", "A photograph taken from space shows Earth as curved. What can the photo support?", "Earth is round like a ball", "Earth is a flat square", "Earth is the Sun", "oceans are in space", "Space images provide visible evidence of Earth's curved shape."],
    ["responsible observation", "A student wants a closer look at the Sun. What should they do?", "use teacher-provided safe images or approved equipment", "stare with bare eyes", "look through a magnifier", "use ordinary sunglasses to stare", "Direct viewing can damage eyes; use approved safe methods."]
  ];
  const earthBuild = (s, i) => {
    const reason = [`Which evidence supports`, `What observation best explains`, `Which scientific reason supports`, `Why is it accurate to say`, `Which known relationship supports`][i % 5];
    const repair = [`Which idea conflicts with the evidence about`, `Which claim should be corrected when studying`, `Which mix-up could mislead someone learning`, `Which statement is not supported while investigating`, `Which explanation should a scientist reject for`][i % 5];
    return [[s[0],s[1],[s[2],s[3],s[4],s[5]],s[6],s[7]], [s[0]+" reasoning",`${reason} ${s[0]}: ${s[2]}?`,[s[6],"It is the longest sentence.","It was chosen without observing.","Every space object is the same."],`Scientific answers use relevant observations and known relationships.`,s[7]], [s[0]+" misconception",`${repair} ${s[0]}?`,[s[3],s[2],s[6],"recording what is observed"],`The idea “${s[3]}” conflicts with the evidence.`,s[7]]];
  };

  const soundScenes = [
    ["identify vibration","An elastic band moves quickly back and forth while making a sound. What is this movement?","a vibration","an orbit","a shadow","a material change","A vibration is repeated back-and-forth movement.",sound("A plucked elastic band vibrating","pluck")],
    ["connect cause and effect","What usually happens first when a drum makes a sound?","the drum skin vibrates","the drum becomes a new material","the air turns solid","the drum stops all movement","Striking starts vibrations that produce sound."],
    ["pluck action","Which action makes a guitar string sound?","plucking it","looking at it","covering it gently","leaving it still","Plucking starts the string vibrating.",sound("A plucked string producing waves","pluck")],
    ["strike action","Which action is used to make a triangle instrument ring?","striking it","stretching it into pieces","staring at it","cooling it","A strike starts the metal vibrating."],
    ["shake action","What action makes a maraca sound?","shaking it","folding it","painting it","placing it still","Shaking makes the contents and shell vibrate."],
    ["blow action","A recorder makes sound when a child —","blows air into it","bends it","covers it in cloth","holds it still","Moving air causes vibrations in the recorder."],
    ["rub action","Rubbing a wet finger around a glass rim can make a tone because the rim —","vibrates","becomes a star","changes material","stops moving","Rubbing can start a repeated vibration."],
    ["observe ruler","A ruler over a desk edge looks blurry while it buzzes. What is the best explanation?","it is vibrating quickly","it is melting","the desk is orbiting","the ruler has become sound","Fast vibration can look blurred.",sound("A ruler vibrating over a desk edge","twang")],
    ["feel vibration safely","How can a child safely gather evidence that their voice uses vibration?","gently touch their throat while humming","shout into another person's ear","put an object in their mouth","hit their throat","A gentle touch can feel the voice box vibrating."],
    ["volume vocabulary","Which pair describes volume?","loud and soft","high and low","long and short","bright and dark","Loud and soft tell how strong a sound seems."],
    ["fresh test pitch","Which pair describes pitch?","high and low","loud and soft","rough and smooth","fast and bright","Pitch tells how high or low a sound is."],
    ["fresh test fair comparison","To compare two elastic-band sounds fairly, what should change?","one feature at a time","every feature at once","the listener each second","nothing including the action","One change helps link it to the sound difference."],
    ["fresh test stronger strike","A drum is tapped gently, then struck more strongly in the same place. What will most likely change?","the second sound will be louder","the drum becomes a different material","the second sound must be higher","no vibration occurs","A stronger strike usually makes a larger vibration and louder sound."],
    ["fresh test muffle","A ringing phone is covered with a thick towel. What is most likely observed?","the sound becomes softer","the pitch always doubles","the phone stops vibrating completely","the towel becomes metal","The towel reduces sound reaching the listener."],
    ["sound energy","Which statement is correct?","sound energy is linked to vibrating objects","sound is a colour","sound only exists in instruments","sound changes paper into metal","Vibrations transfer sound energy."],
    ["silent object","A bell sits still and is not struck or shaken. Why is it silent?","it is not vibrating enough to make sound","all bells are silent","it has no colour","the room has no gravity","A sound-making vibration has not been started."],
    ["tiny vibration","A speaker cone moves too quickly to see clearly. Which evidence could still show vibration?","a light paper scrap on it moves","its colour is blue","its label has letters","the table is rectangular","Movement of the scrap is visible evidence."],
    ["rice on drum","Rice grains jump when a nearby drum is struck. What does this show?","the drum skin is vibrating","rice makes all sound","the drum became rice","sound has no movement","The moving skin pushes the grains."],
    ["tuning fork water","A vibrating tuning fork touches water and makes splashes. What is the splash evidence of?","the fork's vibration","the fork melting","water changing to metal","an orbit","The moving prongs disturb the water."],
    ["long and short string","Two similar strings are plucked. One is shorter. What can be compared?","their pitches","their colours only","which becomes a new material","their shadows only","Changing string length can change pitch."],
    ["tight and loose band","A tighter and a looser elastic band are plucked in the same way. What is the useful observation?","whether their pitches differ","which child likes blue","whether Earth turns","whether they become glass","Tension can affect vibration and pitch."],
    ["instrument classification","Which instrument is mainly played by shaking?","maraca","drum","recorder","guitar","A maraca sounds when shaken."],
    ["action classification","Which instrument is mainly played by blowing?","whistle","bell","xylophone","tambourine","Blown air starts the whistle's vibration."],
    ["loud versus high","A mouse squeak can be high but soft. What does this prove?","high does not mean loud","all high sounds are loud","soft means low","pitch and volume are identical","Pitch and volume describe different sound features."],
    ["echo observation","A clap in an empty hall is heard again a moment later. What is the second sound called?","an echo","a shadow","a planet","a physical material","An echo is reflected sound."],
    ["distance and hearing","A ringing bell is moved farther away. What is likely?","it sounds softer to the listener","its pitch must become higher","it stops vibrating instantly","it changes into plastic","Less sound energy reaches the listener farther away."],
    ["ear safety","Which action protects hearing?","move away from a painfully loud sound","put an ear beside a loud speaker","increase every sound","shout into ears","Distance from very loud sounds helps protect ears."],
    ["soundproof choice","Which material would most likely muffle a small alarm?","thick foam","an open wire frame","a sheet with large holes","nothing around it","Soft thick material can reduce transmitted sound."],
    ["record evidence","Which record best compares sounds scientifically?","a table of action and loud/soft observation","a list of favourite songs","a drawing with no labels","a guess made before listening","A labelled table records comparable evidence."],
    ["repeat test","Why repeat a sound comparison?","to check whether the pattern happens again","to force the preferred answer","to change every condition","to avoid recording","Repeats make evidence more dependable."],
    ["voice uniqueness","Two people say the same word but sound different. What can be observed?","voices can have different sound qualities","only one voice vibrates","words change material","one person makes no sound","Different voices still use vibrations but can sound different."],
    ["design instrument","A box-and-band instrument must make a sound. What must a band be able to do?","vibrate when plucked","remain completely still","turn into wood","block every movement","A vibrating band is the sound source."]
  ];
  const soundBuild = (s, i) => {
    const evidence = [`Which observation proves`, `What evidence best shows`, `Which result supports`, `What could a child notice to confirm`, `Which cause-and-effect clue supports`][i % 5];
    const repair = [`How should this sound idea be corrected`, `Which explanation fixes the mix-up`, `What should replace the incorrect claim`, `Which response uses better sound science`, `How would evidence correct the claim`][i % 5];
    return [[s[0],s[1],[s[2],s[3],s[4],s[5]],s[6],s[7]], [s[0]+" evidence",`${evidence} ${s[0]}: “${s[2]}”?`,[s[6],"The object has a bright colour.","A child guessed it before testing.","The object has a printed name."],"Evidence must connect an action, a vibration and the sound heard.",s[7]], [s[0]+" misconception",`${repair} in ${s[0]} if someone says “${s[3]}”?`,[s[6],"The choice is correct because it is unusual.","Sound never involves movement.","All sound words mean the same thing."],s[6],s[7]]];
  };

  const materialScenes = [
    ["identify bending","A paper strip changes from straight to curved without tearing. What action changed it?","bending","melting","orbiting","making sound","Bending changes direction or shape.",material("Paper changes from straight to curved","straight","M160 88Q180 35 214 58")],
    ["identify twisting","A soft clay rope is turned around itself. What action is this?","twisting","freezing","shining","vibrating","Twisting turns parts around each other."],
    ["identify stretching","An elastic band becomes longer when pulled. What action caused this?","stretching","folding","cooling","striking","Stretching increases length.",material("An elastic band becomes longer","short","M150 62H220")],
    ["identify breaking","A chalk stick becomes several smaller pieces. What action occurred?","breaking","orbiting","blowing","reflecting","Breaking makes smaller pieces."],
    ["same material paper","After paper is folded, what material is it?","paper","glass","metal","wood","Changing shape does not change paper into a new material."],
    ["same material clay","A clay ball is rolled into a snake shape. What stayed the same?","the material is still clay","the shape stayed round","the length stayed equal","it became rubber","The shape changed but the material did not."],
    ["same material foil","Aluminium foil is crumpled into a ball. Which statement is true?","it is still aluminium foil","it became stone","no physical change happened","it became water","Crumpling changes shape, not composition."],
    ["cutting paper","A sheet is cut into four pieces. What changed?","its size and number of pieces","its material became plastic","its colour must change","it became alive","Cutting changes size and arrangement."],
    ["before and after evidence","Which record best shows a physical change?","a labelled before-and-after picture","a favourite-colour list","an unlabelled guess","a weather chart","Before-and-after evidence shows the observable effect."],
    ["action versus effect","Which sentence correctly names an action and its effect?","Stretching made the band longer","Longer stretched the action","Paper made bending disappear","The material changed into a new substance","It clearly links the action to an observable change."],
    ["fresh test bend wire","A soft craft wire is curved into a circle. What changed?","its shape","the material became paper","its composition became water","it stopped being wire","The wire remains the same material."],
    ["fresh test twist towel","A damp cloth is turned tightly to squeeze out water. Which action is used?","twisting","shining","orbiting","ringing","The cloth is turned around itself."],
    ["fresh test stretch sock","A sock opening is pulled wider and then released. What property allowed this?","it could stretch","it could make sunlight","it was a planet","it could become metal","Stretchy materials can change size when pulled."],
    ["fresh test break biscuit","A biscuit snaps into two pieces. Which observation is accurate?","the pieces are still biscuit","it became two new materials","nothing changed","it became liquid","Breaking changed size, not the material type."],
    ["physical change vocabulary","What is a physical change?","a change to shape or size while the material stays the same","every change that makes a new material","only a colour word","a movement around the Sun","This curriculum idea focuses on observable shape or size changes."],
    ["composition vocabulary","In this topic, material composition means —","what material an object is made from","the object's favourite use","how loud it sounds","where the Sun appears","Composition describes what the material is."],
    ["reversible fold","A folded paper is opened flat again. What does this show?","some physical changes can be reversed","paper always becomes new material","folding is not a change","paper is elastic like rubber","The shape can be changed back."],
    ["not fully reversible tear","A paper sheet is torn. Which statement is best?","it stays paper but cannot easily become one whole sheet again","it becomes glass","it has not changed at all","it becomes liquid","A physical change need not be easy to reverse."],
    ["compare actions","How is bending different from breaking?","bending keeps one piece; breaking makes pieces","both always make powder","bending makes new material","breaking never changes size","The effects on shape and number of pieces differ."],
    ["same action different materials","Paper and thin plastic are bent with the same gentle action. Why compare them?","materials may respond differently","to prove they become identical","to change both into metal","to measure sound only","The same action can have different effects."],
    ["choose stretch material","Which object is most suitable for testing stretching?","an elastic band","a ceramic plate","a glass marble","a wooden block","Elastic bands visibly lengthen under a safe pull."],
    ["choose bend material","Which material can usually be bent safely by hand?","a pipe cleaner","a glass cup","a sharp blade","a brick wall","A pipe cleaner is flexible and suitable for a safe test."],
    ["safety material","What should happen before breaking a classroom sample?","use only teacher-approved safe material","break glass by hand","point pieces at a friend","taste the sample","Safety must be checked before applying force."],
    ["fair comparison","To compare how two paper types bend, what should be the same?","the size of each strip and bending action","every feature including paper type","one strip wet and one dry","the result chosen first","Keeping conditions similar makes the comparison fair."],
    ["observe texture after change","Clay is flattened. Which properties can be checked before and after?","shape and thickness","planet and star type","pitch and volume only","day and night","Shape and thickness are observable material features."],
    ["crushing chalk","Chalk is crushed to powder. What has happened?","it became smaller pieces of chalk","it became flour","it became a liquid","it disappeared","Powder contains very small pieces of the same material."],
    ["sharpening pencil","A pencil is sharpened and wood shavings appear. What changed physically?","some wood became smaller pieces","wood became plastic","the pencil became a star","nothing was removed","Sharpening changes size and shape."],
    ["moulding dough","Dough is pressed into a flat disc. Which effect is visible?","it becomes flatter and wider","it becomes metal","it changes into a sound","its material vanishes","Pressing changes shape and dimensions."],
    ["rolling clay","A clay block is rolled into a long cylinder. What is the strongest evidence of change?","a before-and-after length comparison","the child's opinion","the table colour","the clay's name","Length can be observed and compared."],
    ["misconception new shape","Sam says a clay star is a new material because it was once a ball. What is correct?","both shapes are clay","every new shape is a new material","the ball was metal","stars cannot be shapes","Shape and composition are different ideas."],
    ["sort changes","Which group contains only physical changes?","fold paper, twist clay, stretch elastic","make paper into gold, make wood into water","orbit Earth, reflect moonlight","hear music, see a star","Each correct example changes form while retaining material."],
    ["design purpose","Why might a maker bend cardboard?","to change its shape for a useful form","to turn it into steel","to make it orbit","to make sunlight","Physical changes help materials suit purposes."]
  ];
  const materialBuild = (s, i) => {
    const evidence = [`Which before-and-after evidence supports`, `What observation confirms`, `Which comparison best shows`, `What visible result supports`, `Which recorded change is evidence for`][i % 5];
    const repair = [`Which explanation repairs the mix-up in`, `What better thinking replaces the claim in`, `Which correction fits the evidence from`, `How should the material idea be corrected in`, `Which statement fixes the misconception about`][i % 5];
    return [[s[0],s[1],[s[2],s[3],s[4],s[5]],s[6],s[7]], [s[0]+" reasoning",`${evidence} ${s[0]}: “${s[2]}”?`,[s[6],"Only the object's name was recorded.","A student chose without observing.","The material was hidden before and after."],"Compare observable features before and after the action.",s[7]], [s[0]+" misconception",`${repair} ${s[0]} when the claim is “${s[3]}”?`,[s[6],"Every shape change creates a new material.","No action can change size.","All materials react in exactly the same way."],s[6],s[7]]];
  };

  window.SkillrYear2ScienceBanks = {
    AC9S2U01: split("AC9S2U01", earthScenes, earthBuild),
    AC9S2U02: split("AC9S2U02", soundScenes, soundBuild),
    AC9S2U03: split("AC9S2U03", materialScenes, materialBuild)
  };
})();
