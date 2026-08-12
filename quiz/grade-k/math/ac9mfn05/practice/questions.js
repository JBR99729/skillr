
"use strict";
(() => {
  const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const NAMES = ["Mia","Noah","Ava","Leo","Zoe","Sam","Lina","Kai"];
  const OBJECTS = ["buttons","counters","stars","blocks","shells","beads","leaves","stickers"];
  const SYMBOLS = ["●","■","▲","◆","★","⬟"];
  const PATTERN_SYMBOLS = [
    ["●","■"],
    ["▲","◆"],
    ["★","●","●"],
    ["■","▲","◆"],
    ["●","●","■"],
    ["◆","★","▲","★"]
  ];

  const pad = (n) => String(n).padStart(3, "0");
  const rotate = (arr, n) => arr[((n % arr.length) + arr.length) % arr.length];
  const dots = (n, symbol="●") => Array.from({length:n}, () => symbol).join(" ");
  const grouped = (groups, each, symbol="●") =>
    Array.from({length:groups}, () => `[ ${dots(each, symbol)} ]`).join("   ");
  const splitDots = (a,b,s1="●",s2="■") => `${dots(a,s1)}   ${dots(b,s2)}`;
  const scatter = (n, symbol="●") => {
    const rows = [];
    let left = n;
    let row = 0;
    while(left > 0){
      const take = Math.min(left, 3 + ((n + row * 2) % 4));
      rows.push(`${" ".repeat((row*2)%5)}${dots(take, symbol)}`);
      left -= take;
      row += 1;
    }
    return rows.join("\n");
  };
  const frame10 = (n) => {
    const cells = Array.from({length:10}, (_,i) => i < n ? "●" : "○");
    return `${cells.slice(0,5).join(" ")}\n${cells.slice(5).join(" ")}`;
  };
  const fiveFrame = (n) => Array.from({length:5},(_,i)=>i<n?"●":"○").join(" ");
  const unique = (items) => [...new Set(items.map(String))];
  const choiceOptions = (correct, distractors) => {
    const options = unique([correct, ...distractors]).slice(0,4);
    while(options.length < 3) options.push(`Other ${options.length+1}`);
    return options;
  };
  const base = (c, type, skill, question, extra={}) => ({
    id: `${c.code.toLowerCase()}-${c.bank[0]}-${pad(c.i+1)}`,
    curriculumCode: c.code,
    bank: c.bank,
    skill,
    printable: true,
    type,
    question,
    ...extra
  });
  const single = (c, skill, question, correctAnswer, distractors, explanation, visual) => {
    const answers = choiceOptions(correctAnswer, distractors);
    return base(c, "single", skill, question, {
      ...(visual ? {visual} : {}),
      answers,
      correct: answers.indexOf(String(correctAnswer)),
      explanation
    });
  };
  const tf = (c, skill, question, correct, explanation, visual) =>
    base(c, "true-false", skill, question, {
      ...(visual ? {visual} : {}),
      answers:["True","False"],
      correct: correct ? 0 : 1,
      explanation
    });
  const number = (c, skill, question, correct, explanation, visual) =>
    base(c, "number", skill, question, {
      ...(visual ? {visual} : {}),
      correct,
      tolerance:0,
      placeholder:"Type the number",
      explanation
    });
  const multiple = (c, skill, question, answers, correct, explanation, visual) =>
    base(c, "multiple", skill, question, {
      ...(visual ? {visual} : {}),
      answers,
      correct,
      explanation
    });
  const order = (c, skill, question, items, correct, explanation, visual) =>
    base(c, "order", skill, question, {
      ...(visual ? {visual} : {}),
      items,
      correct,
      instruction:"Use the arrows to put them in order.",
      explanation
    });

  const BUILDERS = {
    AC9MFN03: [
      (c) => { const n=5+(c.v%12); return number(c,"count visible collection",`How many ${rotate(OBJECTS,c.v)} are shown?`,n,`Touch or track each object once. There are ${n}.`,scatter(n,rotate(SYMBOLS,c.v))); },
      (c) => { const n=6+(c.v%11); return number(c,"count structured collection",`Count the filled spaces in the two-row frame.`,n,`Five on the top row and ${n-5} below make ${n}.`,frame10(Math.min(n,10))); },
      (c) => { const n=4+(c.v%13); const name=rotate(NAMES,c.v); return single(c,"cardinality",`${name} counts every counter once and says “${n}” last. What does ${n} tell ${name}?`,`There are ${n} counters`,[`Start counting again`,`The counters changed size`,`Only the last counter matters`],`The final number said tells how many objects are in the whole collection.`,scatter(n)); },
      (c) => { const a=5+(c.v%9), b=a+1+(c.v%3); return single(c,"compare by counting",`Which collection has more?`,`Collection B`,[`Collection A`,`They are equal`,`You cannot compare them`],`B has ${b}; A has ${a}. ${b} is more than ${a}.`,`A: ${dots(a,"●")}\nB: ${dots(b,"■")}`); },
      (c) => { const a=6+(c.v%8); return single(c,"compare equal quantities",`Both collections were counted carefully. Which statement is correct?`,`They have the same number`,[`The spread-out collection has more`,`The close collection has more`,`The larger symbols make more`],`Both contain ${a}. Spacing does not change quantity.`,`A: ${dots(a,"●")}\nB: ${scatter(a,"■")}`); },
      (c) => { const children=4+(c.v%5), cups=children-(c.v%2); return single(c,"one-to-one matching",`Match one cup to each teddy. Are there enough cups?`,cups===children?`Yes, one for each teddy`:`No, one teddy has no cup`,[`Yes, because the cups are larger`,`No, because cups and teddies look different`,`There are always enough`],cups===children?`Each teddy can be paired with one cup.`:`After pairing, one teddy is left without a cup.`,`Teddies: ${dots(children,"▲")}\nCups:    ${dots(cups,"○")}`); },
      (c) => { const a=5+(c.v%8), b=a+1; return single(c,"one-to-one leftovers",`One counter from A is matched with one counter from B. What will happen?`,`B will have 1 counter left`,[`A will have 1 counter left`,`Nothing will be left`,`Both will have 2 left`],`B has ${b} and A has ${a}, so one B counter is unmatched.`,`A: ${dots(a,"●")}\nB: ${dots(b,"■")}`); },
      (c) => { const children=5+(c.v%4), pencils=children+(c.v%3)-1; return single(c,"enough for a purpose",`${children} children each need one pencil. There are ${pencils} pencils. Which statement is correct?`,pencils>=children?`There are enough pencils`:`There are not enough pencils`,[`Everyone should share one pencil at the same time`,`The pencil colour decides`,`Do not count the children`],pencils>=children?`There are at least as many pencils as children.`:`There are fewer pencils than children.`,`Children: ${dots(children,"▲")}\nPencils:  ${dots(pencils,"—")}`); },
      (c) => { const n=7+(c.v%9), said=n+1; return single(c,"identify double counting",`${rotate(NAMES,c.v)} counts one object twice and says ${said}. What explains the mistake?`,`One object was counted twice`,[`One object was skipped`,`The collection became larger`,`The last number must be repeated`],`Counting one object twice makes the answer one too large.`,scatter(n)); },
      (c) => { const n=8+(c.v%8), said=n-1; return single(c,"identify skipped object",`${rotate(NAMES,c.v+1)} misses one object and says ${said}. What happened?`,`One object was not counted`,[`One object was counted twice`,`The objects changed places`,`The first number should be zero`],`Skipping one object makes the count one too small.`,scatter(n,"■")); },
      (c) => { const n=5+(c.v%10); return multiple(c,"accurate counting method",`Select both actions that help count this collection accurately.`,[`Touch or move each object once`,`Say one number for each object`,`Count the same object whenever you see it`,`Stop before every object is counted`],[0,1],`One-to-one counting means one number word for each object.`,scatter(n)); },
      (c) => { const a=4+(c.v%8), b=a+(c.v%2?0:2); return single(c,"compare after rearrangement",`The objects in B are rearranged but none are added or removed. How does B compare with A?`,b===a?`They are equal`:(b>a?`B has more`:`A has more`),[`The wider row always has more`,`The taller row always has more`,`You cannot count rearranged objects`],b===a?`Rearranging does not change how many.`:`Count both collections to compare them.`,`A: ${dots(a,"●")}\nB: ${scatter(b,"●")}`); },
      (c) => { const a=6+(c.v%7), b=a+2; return order(c,"order quantities",`Put the collections from fewest to most.`,[`C: ${b} objects`,`A: ${a} objects`,`B: ${a+1} objects`],[`A: ${a} objects`,`B: ${a+1} objects`,`C: ${b} objects`],`${a} < ${a+1} < ${b}.`); },
      (c) => { const n=10+(c.v%10); return single(c,"teen collection structure",`Which description matches this collection?`,`${n} objects`,[`${n-1} objects`,`${n+1} objects`,`Only ${n-10} objects`],`A full group of 10 and ${n-10} more make ${n}.`,`Ten: ${frame10(10)}\nMore: ${dots(n-10,"■")}`); },
      (c) => { const n=6+(c.v%9); return tf(c,"conservation of quantity",`Moving these ${n} counters farther apart changes how many counters there are.`,false,`Moving objects changes their position, not their quantity.`,`${dots(n,"●")}\n${scatter(n,"●")}`); },
      (c) => { const a=5+(c.v%10), b=a+1; return single(c,"reason from final count",`A careful count gives A = ${a} and B = ${b}. Which reason proves B has more?`,`${b} comes after ${a} when counting`,[`B is drawn lower on the screen`,`B uses darker symbols`,`A was counted first`],`The count, not position or colour, decides which quantity is greater.`); }
    ],

    AC9MFN04: [
      (c) => { const a=1+(c.v%5), b=1+((c.v*2)%5), total=Math.min(10,a+b); const bb=total-a; return number(c,"combine visible parts",`How many counters are in the whole?`,total,`${a} and ${bb} combine to make ${total}.`,splitDots(a,bb)); },
      (c) => { const whole=5+(c.v%6), shown=1+(c.v%(whole-1)), hidden=whole-shown; return number(c,"find hidden part",`There are ${whole} counters altogether. ${shown} are outside the cup. How many are hidden?`,hidden,`${shown} and ${hidden} make ${whole}.`,`Outside: ${dots(shown,"●")}   Cup: [ ? ]`); },
      (c) => { const whole=4+(c.v%7), a=1+(c.v%(whole-1)), b=whole-a; return single(c,"recognise partition",`Which pair is a correct way to split ${whole}?`,`${a} and ${b}`,[`${a} and ${b+1}`,`${whole} and ${b}`,`${Math.max(0,a-1)} and ${Math.max(0,b-1)}`],`${a}+${b}=${whole}.`); },
      (c) => { const whole=5, a=1+(c.v%4), b=5-a; return single(c,"five-frame parts",`The five-frame has ${a} filled spaces and ${b} empty spaces. Which whole does the frame show?`,`5`,[`4`,`6`,`${a}`],`Filled and empty spaces are parts of one five-frame with 5 spaces.`,fiveFrame(a)); },
      (c) => { const whole=6+(c.v%5), a=1+(c.v%(whole-1)), b=whole-a; return number(c,"ten-frame part whole",`A ten-frame shows ${a} filled spaces, then ${b} more counters are added beside it. How many altogether?`,whole,`${a}+${b}=${whole}.`,`${frame10(a)}\nExtra: ${dots(b,"■")}`); },
      (c) => { const whole=6+(c.v%5), a=1+(c.v%(whole-1)), b=whole-a; const a2=Math.max(1,a-1), b2=whole-a2; return multiple(c,"different partitions same whole",`Select both pairs that make ${whole}.`,[`${a} and ${b}`,`${a2} and ${b2}`,`${a} and ${b+1}`,`${whole} and 1`],[0,1],`Both selected pairs have a total of ${whole}.`); },
      (c) => { const whole=5+(c.v%6), a=1+(c.v%(whole-1)), b=whole-a; return single(c,"match model to statement",`Which statement matches the model?`,`${a} and ${b} make ${whole}`,[`${a} and ${b} make ${whole+1}`,`${a} is the whole`,`The two parts are equal every time`],`The visible parts contain ${a} and ${b}; together they make ${whole}.`,splitDots(a,b)); },
      (c) => { const whole=5+(c.v%6), a=1+(c.v%(whole-1)), b=whole-a; return tf(c,"reverse parts",`${a} and ${b} make ${whole}, so ${b} and ${a} also make ${whole}.`,true,`Changing the order of the parts does not change the whole.`,`${dots(a,"●")} + ${dots(b,"■")}\n${dots(b,"■")} + ${dots(a,"●")}`); },
      (c) => { const whole=6+(c.v%5), a=1+(c.v%(whole-1)), wrong=whole-a+1; return single(c,"identify incorrect partition",`${rotate(NAMES,c.v)} says ${a} and ${wrong} make ${whole}. What is correct?`,`The parts make ${a+wrong}, not ${whole}`,[`The claim is correct`,`Parts never make a whole`,`Only equal parts are allowed`],`${a}+${wrong}=${a+wrong}.`); },
      (c) => { const whole=5+(c.v%6), hidden=1+(c.v%(whole-1)), seen=whole-hidden; return single(c,"covered counters",`${whole} counters are on a mat. A card covers some. ${seen} can be seen. How many are covered?`,String(hidden),[String(seen),String(whole),String(hidden+1)],`${seen}+${hidden}=${whole}.`,`Seen: ${dots(seen,"●")}   Covered: [ ? ]`); },
      (c) => { const whole=6+(c.v%5), a=Math.floor(whole/2), b=whole-a; return single(c,"equal and unequal partitions",`Which model shows ${whole} split into two parts?`,`${a} and ${b}`,[`${a} and ${b+2}`,`${whole} and ${whole}`,`${Math.max(0,a-1)} and ${Math.max(0,b-2)}`],`The parts must combine to the stated whole.`); },
      (c) => { const whole=5+(c.v%6), a=1+(c.v%(whole-1)), b=whole-a; return order(c,"build part whole statement",`Put the statement in a sensible order.`,[`${whole} is the whole`,`${a} is one part`,`${b} is the other part`],[`${a} is one part`,`${b} is the other part`,`${whole} is the whole`],`The two parts combine to make the whole.`); },
      (c) => { const whole=5+(c.v%6), a=1+(c.v%(whole-1)), b=whole-a; return single(c,"same partition rearranged",`The ${a} circles and ${b} squares are moved into a new arrangement. What stays the same?`,`The whole is still ${whole}`,[`The whole becomes ${whole+1}`,`Only circles count`,`The parts must swap colours`],`Rearranging the same parts does not change the total.`,`${splitDots(a,b)}\n${scatter(a,"●")}\n${scatter(b,"■")}`); },
      (c) => { const fingers=5, up=1+(c.v%4), down=fingers-up; return number(c,"finger partition",`${up} fingers are up and ${down} are folded. How many fingers are on the hand altogether?`,5,`Up and folded fingers are two parts of the same five-finger hand.`,`Up: ${dots(up,"|")}   Folded: ${dots(down,"_")}`); },
      (c) => { const whole=6+(c.v%5), a=1+(c.v%(whole-1)), b=whole-a; return single(c,"whole versus part misconception",`In the model, which number is the whole?`,String(whole),[String(a),String(b),String(Math.abs(a-b))],`The whole is the total of both parts.`,splitDots(a,b)); },
      (c) => { const whole=6+(c.v%5), a=1+(c.v%(whole-1)), b=whole-a; return multiple(c,"choose equivalent descriptions",`Select both statements that describe the same whole.`,[`${a}+${b}=${whole}`,`${b}+${a}=${whole}`,`${a}+${b+1}=${whole}`,`${whole}+1=${whole}`],[0,1],`Reversing the two parts keeps the same total.`); }
    ],

    AC9MFN05: [
      (c) => { const start=3+(c.v%6), add=1+(c.v%4), total=start+add; return number(c,"joining situation",`${start} ducks are in a pond. ${add} more swim in. How many ducks are there now?`,total,`The collection grows: ${start}+${add}=${total}.`,`Before: ${dots(start,"▲")}\nJoin:   ${dots(add,"▲")}`); },
      (c) => { const start=6+(c.v%5), take=1+(c.v%Math.min(4,start-1)), remain=start-take; return number(c,"separating situation",`${start} blocks are on the mat. ${take} are taken away. How many remain?`,remain,`Remove ${take} from ${start}; ${remain} remain.`,`Start: ${dots(start,"■")}\nTaken: ${dots(take,"×")}`); },
      (c) => { const a=3+(c.v%5), b=1+(c.v%4), total=a+b; return single(c,"choose joining model",`Which model shows ${a} objects, then ${b} more joining?`,`${dots(a,"●")} + ${dots(b,"●")}`,[`${dots(a,"●")} − ${dots(b,"×")}`,`${dots(b,"●")} only`,`No objects change`],`Joining combines the starting group and the new group.`); },
      (c) => { const start=5+(c.v%5), take=1+(c.v%3), remain=start-take; return single(c,"choose separating model",`Which model matches: ${start} counters, then ${take} leave?`,`${dots(start,"●")} → ${dots(remain,"●")}`,[`${dots(start,"●")} → ${dots(start+take,"●")}`,`${dots(take,"●")} → ${dots(start,"●")}`,`The amount stays ${start}`],`Leaving makes the collection smaller.`); },
      (c) => { const start=4+(c.v%5), add=1+(c.v%3), total=start+add; return single(c,"match addition statement",`Which number sentence represents the story: start with ${start}, add ${add} more?`,`${start} + ${add} = ${total}`,[`${start} - ${add} = ${start-add}`,`${add} + ${total} = ${start}`,`${total} - ${start} = ${total}`],`The plus sign represents joining.`); },
      (c) => { const start=7+(c.v%4), take=1+(c.v%4), remain=start-take; return single(c,"match subtraction statement",`Which number sentence represents taking ${take} away from ${start}?`,`${start} - ${take} = ${remain}`,[`${start} + ${take} = ${start+take}`,`${take} - ${start} = ${remain}`,`${remain} + ${take} = ${take}`],`The subtraction sentence shows the starting amount, removal and result.`); },
      (c) => { const start=5+(c.v%5), add=1+(c.v%3), total=start+add; return single(c,"count on strategy",`${rotate(NAMES,c.v)} starts at ${start} and counts on ${add} numbers. Where does the count finish?`,String(total),[String(start),String(total-1),String(total+1)],`Counting on ${add} from ${start} reaches ${total}.`); },
      (c) => { const start=7+(c.v%4), take=1+(c.v%3), remain=start-take; return single(c,"count what remains",`Cross out ${take} from the collection. How many are not crossed out?`,String(remain),[String(take),String(start),String(remain+1)],`${start}-${take}=${remain}.`,`${dots(take,"×")} ${dots(remain,"●")}`); },
      (c) => { const start=4+(c.v%4), final=start+2+(c.v%3), change=final-start; return number(c,"unknown joining change",`There were ${start} toy cars. Now there are ${final}. How many joined?`,change,`The change is ${final}-${start}=${change}.`,`Before: ${dots(start,"■")}\nAfter:  ${dots(final,"■")}`); },
      (c) => { const start=7+(c.v%4), final=3+(c.v%3), change=start-final; return number(c,"unknown separating change",`There were ${start} apples. Now there are ${final}. How many were removed?`,change,`${start}-${change}=${final}.`,`Before: ${dots(start,"●")}\nAfter:  ${dots(final,"●")}`); },
      (c) => { const a=4+(c.v%5), b=1+(c.v%3); return single(c,"distinguish operation",`${a} birds are on a fence. ${b} birds fly away. Which action should you use?`,`Separate or subtract`,[`Join or add`,`Partition a fixed whole without change`,`Compare colours`],`The number of birds decreases because some leave.`); },
      (c) => { const a=3+(c.v%5), b=1+(c.v%3); return single(c,"distinguish operation",`${a} children are playing. ${b} more arrive. Which action should you use?`,`Join or add`,[`Separate or subtract`,`Ignore the new children`,`Only compare the two groups`],`The collection increases because more children arrive.`); },
      (c) => { const a=5+(c.v%4), b=2, total=a+b; return single(c,"strategy comparison",`Sam counts all from 1. Zoe starts at ${a} and counts on ${b}. Both find ${total}. Which statement is correct?`,`Both strategies can find the same total`,[`Only counting all can be correct`,`Counting on always changes the answer`,`The total should be ${total+1}`],`Different sensible strategies can reach the same result.`); },
      (c) => { const start=6+(c.v%4), final=start-2; return single(c,"infer event from change",`There were ${start} counters. Now there are ${final}. Which event could explain the change?`,`2 counters were removed`,[`2 counters joined`,`The counters were spread out`,`The counter colour changed`],`The quantity decreased by 2.`); },
      (c) => { const start=4+(c.v%5), add=1+(c.v%3), total=start+add; return tf(c,"keyword misconception",`A story should be solved only by looking for a word such as “altogether”, without thinking about what happened.`,false,`Use the meaning of the situation: did objects join, leave or stay the same?`); },
      (c) => { const start=5+(c.v%5), add=1+(c.v%3), total=start+add; return multiple(c,"equivalent joining representations",`Select both representations of the same joining story.`,[`${start} objects and ${add} more make ${total}`,`${start}+${add}=${total}`,`${start}-${add}=${start-add}`,`${total}+${add}=${start}`],[0,1],`The words and the addition sentence describe the same change.`); }
    ],

    AC9MFN06: [
      (c) => { const groups=2+(c.v%3), each=1+(c.v%4), total=groups*each; return number(c,"fair sharing",`Share ${total} counters equally between ${groups} children. How many does each child get?`,each,`Deal one at a time. Each child receives ${each}.`,`${dots(total,"●")}\nChildren: ${dots(groups,"▲")}`); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each; return single(c,"recognise fair share",`Which arrangement is a fair share of ${total} objects between ${groups} groups?`,grouped(groups,each),[grouped(groups,each+1),`${grouped(groups-1,each)} [ ]`,grouped(groups,Math.max(1,each-1))],`A fair share has the same number in every group and uses all ${total} objects.`); },
      (c) => { const groups=2+(c.v%4), each=2+(c.v%3), total=groups*each; return number(c,"count group total",`How many objects are shown altogether?`,total,`${groups} equal groups of ${each} contain ${total}.`,grouped(groups,each)); },
      (c) => { const each=2+(c.v%3), groups=2+(c.v%4), total=each*groups; return number(c,"count number of groups",`${total} buttons are put into groups of ${each}. How many groups are made?`,groups,`Count groups of ${each}: there are ${groups}.`,grouped(groups,each,"■")); },
      (c) => { const a=2+(c.v%3), b=a+(c.v%2); return single(c,"equal or unequal",`Are the two groups equal?`,a===b?`Yes, both groups have ${a}`:`No, the groups have different amounts`,[`Yes, because both use circles`,`No, equal groups must be empty`,`You cannot compare groups`],a===b?`Each group contains ${a}.`:`One group has ${a}; the other has ${b}.`,`A: [ ${dots(a)} ]\nB: [ ${dots(b)} ]`); },
      (c) => single(c,"fair sharing method",`Which action is best for sharing fairly?`,`Give one object to each group in turn`,[`Give everything to the first group`,`Guess without checking`,`Stop while objects remain`],`Dealing one at a time helps keep shares equal.`),
      (c) => { const people=2+(c.v%4), total=people*(1+(c.v%3)) + (c.v%2); const divisible=total%people===0; return single(c,"can share exactly",`Can ${total} objects be shared equally between ${people} children with none left?`,divisible?`Yes`:`No`,[`Only if the objects are the same colour`,`Always`,`Never`],divisible?`${total} divides into equal shares.`:`Equal dealing leaves an object left over.`); },
      (c) => { const groups=3, each=2+(c.v%2), total=groups*each; return single(c,"spot unfair share",`${total} counters should be shared among 3 children. Which share is unfair?`,`${each-1}, ${each}, ${each+1}`,[`${each}, ${each}, ${each}`,`Deal one at a time`,`Check every child has the same amount`],`The amounts ${each-1}, ${each}, ${each+1} are not equal.`); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each; return single(c,"sharing versus grouping",`Which description asks for the number in each share?`,`Share ${total} between ${groups} children`,[`Make groups of ${each} from ${total}`,`Count the total only`,`Compare two colours`],`Sharing asks how many each recipient gets.`); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each; return single(c,"grouping versus sharing",`Which description asks how many groups can be made?`,`Put ${total} objects into groups of ${each}`,[`Share ${total} among ${groups} children`,`Give every object to one child`,`Choose the heaviest object`],`Grouping fixes the group size and asks for the number of groups.`); },
      (c) => { const groups=3, each=2+(c.v%3), total=groups*each; return tf(c,"use all objects",`${groups} equal groups of ${each} use ${total} objects altogether.`,true,`${groups} groups of ${each} total ${total}.`,grouped(groups,each)); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each+1; return single(c,"leftover reasoning",`${total} counters are put into ${groups} equal groups. What happens?`,`1 counter is left over`,[`Every group gets one extra`,`No counters are used`,`The groups must be different colours`],`${total-1} can be shared equally; one remains.`); },
      (c) => { const groups=2+(c.v%3), each=1+(c.v%4), total=groups*each; return multiple(c,"select equal groups",`Select both arrangements that show equal groups.`,[grouped(groups,each),grouped(2,3),`[ ${dots(2)} ] [ ${dots(3)} ]`,`[ ${dots(1)} ] [ ${dots(2)} ] [ ${dots(3)} ]`],[0,1],`In each selected arrangement, every group has the same size.`); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each; return order(c,"fair dealing sequence",`Put the fair-sharing steps in order.`,[`Check the groups are equal`,`Give one object to each group`,`Repeat until all ${total} objects are used`],[`Give one object to each group`,`Repeat until all ${total} objects are used`,`Check the groups are equal`],`Deal in turns, use all objects, then check.`); },
      (c) => { const groups=2+(c.v%3), each=2+(c.v%3), total=groups*each; return single(c,"misconception group count",`${rotate(NAMES,c.v)} sees ${groups} groups of ${each} and says the total is ${groups+each}. What is correct?`,`Count every object: the total is ${total}`,[`Add the group count and group size every time`,`Only count one group`,`The total is ${each}`],`Equal groups must be counted across all groups.`); },
      (c) => { const people=3, each=1+(c.v%3), total=people*each; return single(c,"fairness reasoning",`Three children receive ${each}, ${each} and ${each} stickers. Why is the share fair?`,`Everyone receives the same number`,[`The stickers are colourful`,`The first child was served first`,`There are three children`],`Fair sharing means equal amounts.`); }
    ],

    AC9MFA01: [
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v); const seq=[...p,...p,...p].slice(0,6); const next=p[6%p.length]; return single(c,"continue pattern",`What comes next?`,next,p.filter(x=>x!==next).concat(["○"]),`The unit ${p.join(" ")} repeats in the same order.`,`${seq.join(" ")}  ?`); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+1); return single(c,"identify repeating unit",`What is the smallest part that repeats?`,p.join(" "),[p.slice(0,Math.max(1,p.length-1)).join(" "),[...p,...p].join(" "),"There is no unit"],`The shortest complete repeating unit is ${p.join(" ")}.`,[...p,...p,...p].join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+2); const seq=[...p,...p]; const miss=(c.v%seq.length); const answer=seq[miss]; seq[miss]="?"; return single(c,"missing item inside pattern",`Which item belongs at the question mark?`,answer,p.filter(x=>x!==answer).concat(["○"]),`Follow the repeating unit to replace the missing item.`,seq.join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+3); const wrong=[...p,...p,...p]; const idx=p.length+(c.v%p.length); const correct=wrong[idx]; wrong[idx]=rotate(SYMBOLS,c.v+4); return single(c,"repair pattern break",`Which item should replace the odd item?`,correct,p.filter(x=>x!==correct).concat(["○"]),`The item must match the same position in each repeated unit.`,wrong.join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v); const label=p.length===2?"AB":p.length===3?"ABC":"ABCB"; return single(c,"match same rule",`Which letter rule matches this pattern?`,label,[`AAB`,`ABB`,`No repeating rule`],`Each different symbol can be named with a letter to show the repeating structure.`,[...p,...p].join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v); return single(c,"same rule different objects",`Which pattern follows the same repeating rule?`,p.length===2?`clap, stamp, clap, stamp`:(p.length===3?`clap, tap, jump, clap, tap, jump`:`clap, tap, jump, tap, clap, tap, jump, tap`),[`clap, clap, stamp, jump`,`clap, stamp, jump, clap`,`random actions`],`The actions repeat with the same unit length and order.`); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+1); return tf(c,"recognise repeating pattern",`${[...p,...p,...p].join(" ")} is a repeating pattern.`,true,`The same unit occurs again and again.`); },
      (c) => { const seq=["●","■","▲","★"]; return tf(c,"distinguish nonrepeating sequence",`${seq.join(" ")} is repeating because every item is different.`,false,`A repeating pattern must repeat a unit, not simply contain different items.`); },
      (c) => { const actions=rotate([["clap","stamp"],["jump","turn"],["tap","tap","clap"],["clap","jump","stamp"]],c.v); const seq=[...actions,...actions]; return single(c,"movement pattern",`Which action comes next?`,actions[0],actions.slice(1).concat(["sit"]),`The body-action unit starts again.`,`${seq.join(" → ")} → ?`); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+2); return order(c,"order one repeating unit",`Put one complete repeating unit in order.`,[...p].reverse(),p,`The unit is ${p.join(" ")}.`); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+3); const seq=[...p,...p,...p]; return number(c,"count unit length",`How many items are in the repeating unit?`,p.length,`The shortest repeated section contains ${p.length} items.`,seq.join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v); const correct=[...p,...p].join(" "); return single(c,"choose copied pattern",`Which is a correct copy of the shown pattern?`,correct,[`${[...p].reverse().join(" ")} ${p.join(" ")}`,`${p.join(" ")} ${p.slice(1).join(" ")}`,`Random symbols`],`A copy keeps the same unit and order.`,correct); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+1); const next2=[p[0],p[1%p.length]].join(" "); return single(c,"continue two positions",`Which two items come next?`,next2,[`${p[p.length-1]} ${p[0]}`,`${p[1%p.length]} ${p[0]}`,`○ ○`],`After a complete unit, the pattern starts again.`,`${[...p,...p].join(" ")}  ? ?`); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+2); const seq=[...p,...p]; return multiple(c,"select valid continuations",`Select both statements that are true about the pattern.`,[`The same unit repeats`,`The order matters`,`Any symbol can come next`,`The pattern stops after one unit`],[0,1],`A repeating pattern keeps its unit and order.`,seq.join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v+3); return single(c,"pattern misconception",`${rotate(NAMES,c.v)} says the largest symbol must always come next. What is correct?`,`The repeating unit decides what comes next`,[`Size always decides`,`Colour always decides`,`Patterns have no rules`],`The next item depends on position in the repeated unit.`,[...p,...p].join(" ")); },
      (c) => { const p=rotate(PATTERN_SYMBOLS,c.v); const seq=[...p,...p,...p]; return single(c,"find complete unit boundary",`Which section is one complete unit?`,p.join(" "),[seq.slice(0,p.length+1).join(" "),p.slice(0,1).join(" "),`the final symbol only`],`A complete unit contains every item in the repeated rule once.`,seq.join(" ")); }
    ],

    AC9MFM01: [
      (c) => { const a=4+(c.v%4), b=a+2; return single(c,"direct length comparison",`The lines start together. Which is longer?`,`Line B`,[`Line A`,`They are equal`,`Colour decides`],`Line B reaches farther from the common starting point.`,`A: |${"—".repeat(a)}|\nB: |${"—".repeat(b)}|`); },
      (c) => single(c,"align length starts",`Two ribbons start at different places. What should you do before deciding which is longer?`,`Line up one end of each ribbon`,[`Compare colours`,`Hold one farther away`,`Count the letters in their names`],`A fair direct comparison uses the same starting point.`),
      (c) => { const a=4+(c.v%4), b=a+2; return single(c,"compare object length",`A ${a}-cube train and a ${b}-cube train start together. Which is shorter?`,`${a}-cube train`,[`${b}-cube train`,`They are equal`,`The brighter train`],`Fewer equal cubes make the shorter train.`); },
      (c) => single(c,"mass by balance",`A balance tilts down on the rock side. Which object is heavier?`,`The rock`,[`The sponge`,`They are equal`,`The balance cannot compare mass`],`The heavier side of a balance moves down.`),
      (c) => single(c,"heft mass",`Which action directly compares the mass of two small bags?`,`Lift one in each hand`,[`Line up their ends`,`Pour water between them`,`Count how long they last`],`Hefting compares how heavy or light the bags feel.`),
      (c) => { const a=3+(c.v%3), b=a+2; return single(c,"capacity equal units",`Cup A holds ${a} equal scoops. Cup B holds ${b}. Which has greater capacity?`,`Cup B`,[`Cup A`,`They are equal`,`The taller cup always wins`],`Cup B holds more equal scoops.`); },
      (c) => single(c,"direct capacity method",`How can you directly compare the capacity of two cups?`,`Fill one and pour into the other`,[`Compare only their height`,`Compare colours`,`Line up their bases only`],`Using the same liquid shows which container holds more.`),
      (c) => single(c,"capacity appearance trap",`Can height alone prove which of a tall narrow cup and a short wide cup holds more?`,`No, compare how much each holds`,[`Yes, the taller cup always holds more`,`Yes, the wider cup always holds more`,`Containers cannot be compared`],`Container shape can be misleading.`),
      (c) => { const a=10+c.v*2%10, b=a+5; return single(c,"duration numerical comparison",`Activity A lasts ${a} seconds. Activity B lasts ${b}. Which lasts longer?`,`Activity B`,[`Activity A`,`They are equal`,`The first always lasts longer`],`${b} seconds is longer than ${a}.`); },
      (c) => single(c,"familiar duration",`Which usually lasts longer: clapping once or singing a whole song?`,`Singing a whole song`,[`Clapping once`,`They always take the same time`,`Neither is an event`],`A whole song continues much longer than one clap.`),
      (c) => single(c,"fair duration method",`To compare which of two activities takes longer, what should you do?`,`Start both at the same time`,[`Start one much later`,`Compare colours`,`Measure mass`],`Starting together makes the comparison fair.`),
      (c) => { const data=rotate([["How long is the rope?","length"],["How heavy is the box?","mass"],["How much can the jug hold?","capacity"],["How long did the game take?","duration"]],c.v); return single(c,"choose attribute",`Which attribute answers “${data[0]}”?`,data[1],["length","mass","capacity","duration"].filter(x=>x!==data[1]),`${data[1][0].toUpperCase()+data[1].slice(1)} is the relevant attribute.`); },
      (c) => single(c,"correct comparison error",`Sam compares two pencils without lining up their ends. What is the problem?`,`The starting points are different`,[`The pencils have colours`,`Pencils cannot be compared`,`Only mass can be compared`],`Length comparisons need a common starting point.`),
      (c) => multiple(c,"fair comparison methods",`Select both fair direct-comparison methods.`,[`Line up ribbons at one end`,`Use the same scoop for both containers`,`Choose the brightest object`,`Start one timed event later`],[0,1],`Aligned starts and equal units support fair comparisons.`),
      (c) => { const a=4+(c.v%3), b=a; return tf(c,"equal length",`Two strings both span ${a} equal cubes. They have the same length.`,true,`Equal counts of equal-size units show equal length.`); },
      (c) => single(c,"attribute misconception",`A large-looking object must always be heavier than a small-looking object.`, `Not always; compare mass directly`,[`Always true`,`Only colour matters`,`Mass cannot be compared`],`Size and mass are different attributes.`)
    ],

    AC9MFM02: [
      (c) => { const d=rotate(DAYS,c.v); const ans=rotate(DAYS,DAYS.indexOf(d)+1); return single(c,"day after",`Which day comes after ${d}?`,ans,DAYS.filter(x=>x!==ans).slice(0,3),`${ans} follows ${d} in the weekly cycle.`); },
      (c) => { const d=rotate(DAYS,c.v+2); const ans=rotate(DAYS,DAYS.indexOf(d)-1); return single(c,"day before",`Which day comes before ${d}?`,ans,DAYS.filter(x=>x!==ans).slice(0,3),`${ans} comes before ${d}.`); },
      (c) => { const start=c.v%7; const seq=Array.from({length:4},(_,i)=>DAYS[(start+i)%7]); return single(c,"complete day sequence",`Complete: ${seq[0]}, ${seq[1]}, ___, ${seq[3]}.`,seq[2],[seq[0],seq[1],rotate(DAYS,start+4)],`The missing day is ${seq[2]}.`); },
      (c) => tf(c,"weekly cycle",`After Sunday, the weekly sequence continues with Monday.`,true,`The seven days repeat in a cycle.`),
      (c) => { const d=rotate(DAYS,c.v); const ans=rotate(DAYS,DAYS.indexOf(d)+2); return single(c,"two days later",`If today is ${d}, what day will it be two days later?`,ans,[rotate(DAYS,DAYS.indexOf(d)+1),rotate(DAYS,DAYS.indexOf(d)+3),d],`Count forward two days to ${ans}.`); },
      (c) => { const data=rotate([["morning","eat breakfast"],["lunchtime","eat lunch"],["afternoon","play after school"],["night time","go to bed"]],c.v); return single(c,"match event to day part",`Which event best matches ${data[0]}?`,data[1],["wake at midnight for school","eat a second breakfast at night","sleep during assembly"].concat(["eat breakfast","eat lunch","play after school","go to bed"]).filter(x=>x!==data[1]).slice(0,3),`${data[1]} commonly matches ${data[0]}.`); },
      (c) => order(c,"order day parts",`Put the day parts from earlier to later.`,["night time","morning","afternoon","lunchtime"],["morning","lunchtime","afternoon","night time"],`Morning, lunchtime, afternoon, night time.`),
      (c) => order(c,"sequence routine",`Put the routine from earlier to later.`,["go to bed","eat breakfast","eat lunch"],["eat breakfast","eat lunch","go to bed"],`Breakfast comes before lunch and bedtime.`),
      (c) => single(c,"read visual schedule",`What activity is shown for Wednesday?`,`art`,[`library`,`sport`,`music`],`The schedule pairs Wednesday with art.`,`Monday: library\nTuesday: sport\nWednesday: art\nThursday: music`),
      (c) => single(c,"earlier later",`Which happens earlier in the shown routine?`,`breakfast`,[`lunch`,`bedtime`,`all happen together`],`Breakfast is shown before lunch and bedtime.`,`Morning: breakfast → Lunchtime: lunch → Night: bedtime`),
      (c) => single(c,"chart starting point",`A classroom chart starts with Monday. Does that mean Sunday is not followed by Monday?`,`No, the week is a cycle`,[`Yes, charts change the week`,`Yes, Sunday has no next day`,`Only weekdays repeat`],`A chart may choose a starting point, but the weekly order still cycles.`),
      (c) => single(c,"correct sequence error",`Mia writes Friday, Saturday, Monday. Which day did she miss?`,`Sunday`,[`Thursday`,`Tuesday`,`Wednesday`],`Sunday comes between Saturday and Monday.`),
      (c) => multiple(c,"later day parts",`Select the two day parts that come after lunchtime.`,["morning","lunchtime","afternoon","night time"],[2,3],`Afternoon and night time come after lunchtime.`),
      (c) => { const start=c.v%7; return order(c,"order four days",`Put these four days in weekly order.`,[DAYS[(start+2)%7],DAYS[start],DAYS[(start+3)%7],DAYS[(start+1)%7]],[DAYS[start],DAYS[(start+1)%7],DAYS[(start+2)%7],DAYS[(start+3)%7]],`Follow the weekly sequence.`); },
      (c) => tf(c,"routine variability",`Every family must complete every daily activity at exactly the same time.`,false,`Routines can differ. Use the schedule shown in the question.`),
      (c) => single(c,"next event from schedule",`According to the schedule, what happens after lunch?`,`play`,[`breakfast`,`sleep`,`wake up`],`The shown schedule places play after lunch.`,`breakfast → school → lunch → play → sleep`)
    ],

    AC9MFSP01: [
      (c) => { const shapes=[["◯","circle"],["△","triangle"],["□","square"],["▭","rectangle"]]; const s=rotate(shapes,c.v); return single(c,"name shape",`Which shape name matches ${s[0]}?`,s[1],shapes.filter(x=>x[1]!==s[1]).map(x=>x[1]),`The symbol shows a ${s[1]}.`); },
      (c) => { const data=rotate([["triangle",3],["square",4],["rectangle",4]],c.v); return number(c,"count sides",`How many straight sides does a ${data[0]} have?`,data[1],`A ${data[0]} has ${data[1]} straight sides.`); },
      (c) => { const data=rotate([["circle",0],["triangle",3],["square",4],["rectangle",4]],c.v); return number(c,"count corners",`How many corners does a ${data[0]} have?`,data[1],`A ${data[0]} has ${data[1]} corner${data[1]===1?"":"s"}.`); },
      (c) => single(c,"curved boundary",`Which familiar shape has a curved boundary and no corners?`,`circle`,[`triangle`,`square`,`rectangle`],`A circle has no straight sides or corners.`,"◯"),
      (c) => tf(c,"rotated shape",`A square turned so one corner points up is still a square.`,true,`Turning a shape does not change its sides or corners.`,"□ → ◇"),
      (c) => tf(c,"non-prototypical triangle",`A long skinny triangle is still a triangle if it has 3 straight sides.`,true,`Triangles can have different sizes and orientations.`,"△   ◁   ▷"),
      (c) => single(c,"sort by four sides",`Which pair belongs in the group “has 4 straight sides”?`,`square and rectangle`,[`circle and triangle`,`circle and square`,`triangle and rectangle`],`Squares and rectangles both have 4 straight sides.`,"□  ▭"),
      (c) => single(c,"odd one out property",`Which shape is different because it has 3 straight sides?`,`triangle`,[`circle`,`square`,`rectangle`],`A triangle has 3 straight sides.`,"◯  △  □  ▭"),
      (c) => { const data=rotate([["coin","circle"],["door","rectangle"],["square tile","square"],["warning sign","triangle"]],c.v); return single(c,"shape in environment",`Which shape best matches a ${data[0]}?`,data[1],["circle","triangle","square","rectangle"].filter(x=>x!==data[1]),`A ${data[0]} commonly has a ${data[1]} face or outline.`); },
      (c) => multiple(c,"select triangles",`Select both shapes that are triangles.`,["△","□","▷","◯"],[0,2],`Both selected shapes have 3 straight sides.`),
      (c) => multiple(c,"select four-corner shapes",`Select both shapes that have 4 corners.`,["□","△","▭","◯"],[0,2],`The square and rectangle each have 4 corners.`),
      (c) => single(c,"rotation misconception",`${rotate(NAMES,c.v)} says ◇ is not a square because it points up. What is correct?`,`It is a turned square`,[`It became a triangle`,`Only colour decides shape`,`A square must sit flat`],`Rotation does not change the defining features.`),
      (c) => single(c,"compare properties",`Which statement is true?`,`A square and rectangle both have 4 straight sides`,[`A circle has 4 corners`,`Every triangle has 4 sides`,`A rectangle has no corners`],`Both shapes share the property of 4 straight sides.`),
      (c) => order(c,"sort by side count",`Order the shapes from fewest straight sides to most.`,["square","circle","triangle"],["circle","triangle","square"],`A circle has 0 straight sides, a triangle 3, and a square 4.`),
      (c) => single(c,"shape versus colour",`What should you look at when sorting by shape?`,`Sides, corners and curved boundaries`,[`Colour only`,`Who owns the object`,`The shape name length`],`Shape is determined by geometric features.`),
      (c) => single(c,"possible shape names",`A drawn shape has 4 straight sides and 4 corners. Which answer gives two possible familiar names?`,`square and rectangle`,[`circle and triangle`,`triangle and square`,`circle and rectangle`],`Both squares and rectangles fit those features.`)
    ],

    AC9MFSP02: [
      (c) => single(c,"above below",`The star is over the box. Where is the star?`,`above the box`,[`below the box`,`inside the box`,`behind the box`],`Over means above.`,`   ★\n [ □ ]`),
      (c) => single(c,"under",`The teddy is under the table. Which word describes its position?`,`below`,[`above`,`inside`,`between`],`Under and below describe the teddy's position.`,`──── table ────\n      ▲`),
      (c) => single(c,"between",`The circle is in the middle of a square and a triangle. Where is the circle?`,`between them`,[`above them`,`inside both`,`behind them`],`The circle is between the two shapes.`,`□   ◯   △`),
      (c) => single(c,"inside outside",`A pencil is completely contained in a case. Which word is best?`,`inside`,[`outside`,`above`,`behind`],`The pencil is inside the case.`,`[  —  ]`),
      (c) => single(c,"outside",`A ball is on the playground, not in the classroom. Where is it compared with the classroom?`,`outside`,[`inside`,`between`,`below`],`The ball is outside the classroom.`),
      (c) => single(c,"front behind",`A tree blocks the child from your view. Where is the child compared with the tree?`,`behind the tree`,[`in front of the tree`,`inside the tree`,`above the tree`],`The child is behind the tree.`),
      (c) => single(c,"beside",`The book is next to the pencil. Which word also describes this position?`,`beside`,[`above`,`inside`,`between`],`Next to and beside have the same meaning.`,`▭  —`),
      (c) => single(c,"left right",`The star is immediately to the right of the circle. Where is the star?`,`right of the circle`,[`left of the circle`,`above the circle`,`inside the circle`],`The star is on the circle's right.`,`◯  ★`),
      (c) => order(c,"two step movement",`Put the movement instructions in order to move a toy from inside a box to beside it.`,["Place it beside the box","Take it out of the box"],["Take it out of the box","Place it beside the box"],`First move out, then place beside.`),
      (c) => single(c,"follow one step",`The robot is at the centre. It moves one space right. Where does it finish?`,`right square`,[`left square`,`centre square`,`above square`],`Moving right changes the robot's horizontal position.`,`□   🤖   □`),
      (c) => { const path=rotate([["forward","left"],["forward","right"],["right","forward"],["left","forward"]],c.v); return order(c,"follow route",`Put the two route instructions in order.`,[path[1],path[0]],path,`Follow the stated route one move at a time.`); },
      (c) => single(c,"select route to target",`The star is to the right of the circle. Which move takes the circle to the star?`,`move right`,[`move left`,`move down`,`stay still`],`The target is on the right.`,`◯  →  ★`),
      (c) => single(c,"viewpoint",`Ava and Ben stand on opposite sides of a chair. Why might Ava say “left” while Ben says “right”?`,`They are looking from different viewpoints`,[`The chair moved by itself`,`Left and right mean the same`,`Only Ava can be correct`],`Left and right can depend on viewing direction.`),
      (c) => single(c,"correct location mistake",`Mia says the ball is inside the box, but the picture shows it beside the box. Which word is correct?`,`beside`,[`inside`,`above`,`between`],`The ball is next to, not contained by, the box.`,`[ □ ]   ●`),
      (c) => multiple(c,"select position words",`Select both words that describe relative position.`,["above","between","heavy","longer"],[0,1],`Above and between describe location.`),
      (c) => order(c,"three step route",`Put the route in order.`,["stop beside the desk","turn left","move forward"],["move forward","turn left","stop beside the desk"],`Follow the route in sequence.`)
    ],

    AC9MFST01: [
      (c) => { const a=4+(c.v%4), b=2+(c.v%3); return single(c,"sort visible objects",`Which sorting rule makes two useful groups for this collection?`,`sort circles and squares`,[`sort by who likes them`,`put every item alone`,`change the rule for each item`],`The objects can be classified consistently by shape.`,`${dots(a,"●")} ${dots(b,"■")}`); },
      (c) => single(c,"choose sorting rule",`A class wants to compare red and blue cards. What should they do first?`,`Sort the cards by colour`,[`Mix all cards together`,`Hide the cards`,`Change every card's colour`],`Sorting by the feature in the question makes comparison possible.`),
      (c) => { const cats=2+(c.v%5), dogs=1+((c.v*2)%5); return number(c,"count category",`How many cat pictures are in the display?`,cats,`Count the cat pictures only.`,`Cats: ${dots(cats,"▲")}\nDogs: ${dots(dogs,"●")}`); },
      (c) => { const a=3+(c.v%5), b=2+(c.v%4); const ans=a>b?"apples":b>a?"bananas":"same"; return single(c,"compare categories",`Which category has more?`,ans,[ans==="apples"?"bananas":"apples","same","cannot tell"],a===b?`Both categories contain ${a}.`:`Compare ${a} and ${b}.`,`Apples:  ${dots(a,"●")}\nBananas: ${dots(b,"■")}`); },
      (c) => { const a=2+(c.v%5), b=a; return single(c,"recognise equal categories",`Which statement is correct?`,`The categories are equal`,[`Circles have more`,`Squares have more`,`You cannot count pictures`],`Both rows contain ${a}.`,`Circles: ${dots(a,"●")}\nSquares: ${dots(b,"■")}`); },
      (c) => { const a=3+(c.v%4), b=a+2; return single(c,"read picture display",`What does the display show?`,`There are more bikes than scooters`,[`There are fewer bikes than scooters`,`The categories are equal`,`The pictures cannot be compared`],`${b} bikes is more than ${a} scooters.`,`Bikes:    ${dots(b,"◆")}\nScooters: ${dots(a,"▲")}`); },
      (c) => single(c,"question data can answer",`Which question can this data answer?`,`Which shape appears more often?`,[`What will tomorrow's weather be?`,`Who is the teacher's favourite student?`,`How heavy is each shape?`],`The display contains counts of circles and squares.`,`Circles: ● ● ●\nSquares: ■ ■ ■ ■`),
      (c) => single(c,"question data cannot answer",`Which question cannot be answered by a fruit picture display?`,`How heavy is each fruit?`,[`Which fruit appears most?`,`How many apples are shown?`,`Are bananas fewer than apples?`],`A picture count does not provide mass information.`),
      (c) => { const n=2+(c.v%5); return number(c,"update display",`A display shows ${n} boot pictures. One more boot is added. What is the new count?`,n+1,`Count on one from ${n} to ${n+1}.`,`Before: ${dots(n,"▲")}   Add: ▲`); },
      (c) => single(c,"consistent sorting rule",`What makes a sort fair and useful?`,`Use the same rule for every object`,[`Change the rule for each object`,`Put every object alone`,`Ignore the question`],`A consistent rule lets categories be compared.`),
      (c) => { const labels=["book","puzzle","book","book","puzzle"]; return single(c,"sort and count labels",`After sorting, which counts are correct?`,`books = 3, puzzles = 2`,[`books = 2, puzzles = 3`,`books = 5, puzzles = 0`,`books = 3, puzzles = 3`],`Count each label in its category.`,labels.join(", ")); },
      (c) => single(c,"different useful sorts",`Two children sort the same buttons. One sorts by colour; the other by shape. Can both sorts be useful?`,`Yes, they answer different questions`,[`No, only colour is allowed`,`No, only shape is allowed`,`Sorting rules never matter`],`The useful rule depends on the investigation question.`),
      (c) => single(c,"identify data error",`A picture graph row has 4 symbols, but the label says 5. What should be corrected?`,`The label should say 4`,[`Add a random category`,`Ignore the symbols`,`Change every symbol colour`],`The recorded count must match the displayed data.`,`● ● ● ●`),
      (c) => multiple(c,"select evidence statements",`Select both statements supported by the display.`,[`Cars = 4`,`Bikes = 2`,`Bikes are more than cars`,`Cars and bikes are equal`],[0,1],`The rows show 4 cars and 2 bikes.`,`Cars: ${dots(4,"■")}\nBikes: ${dots(2,"◆")}`),
      (c) => order(c,"data investigation sequence",`Put the data steps in order.`,["Compare the groups","Sort or record the objects","Ask a question"],["Ask a question","Sort or record the objects","Compare the groups"],`Ask, organise, then compare.`),
      (c) => { const a=4+(c.v%3), b=a-1; return single(c,"conclusion with evidence",`Which conclusion uses the counts as evidence?`,`Milk has more: ${a} compared with ${b} water`,[`Milk wins because its word is shorter`,`Water wins because it is listed second`,`No conclusion is possible`],`A data conclusion should quote the relevant counts.`); }
    ]
  };

  function build(code, bank, count){
    const templates = BUILDERS[code];
    if(!templates) return [];
    const offset = bank === "practice" ? 0 : bank === "test" ? 200 : 500;
    return Array.from({length:count}, (_,i) => {
      const c = {code, bank, i, v:i+offset};
      const q = templates[i % templates.length](c);
      q.id = `${code.toLowerCase()}-${bank[0]}-${pad(i+1)}`;
      q.bank = bank;
      return q;
    });
  }

  function load(code){
    const practice = build(code,"practice",56);
    const test = build(code,"test",24);
    const quiz = build(code,"quiz",100);
    window.skillrPracticeQuestions = practice;
    window.skillrExamQuestions = test;
    window.skillrTestQuestions = test;
    window.skillrQuizQuestions = quiz;
    const path = String(window.location?.pathname || "");
    window.quizQuestions = path.includes("/practice/")
      ? practice
      : path.includes("/test/")
        ? test
        : quiz;
  }

  window.SkillrFoundationRebuild = {build, load, supportedCodes:Object.keys(BUILDERS)};
})();

window.SkillrFoundationRebuild.load("AC9MFN05");
