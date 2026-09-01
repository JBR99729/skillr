(() => {
  "use strict";
  const api = window.SkillrFoundationEnglishStudentFacing;
  if (!api) return;
  const S=(q,a,w1,w2,why)=>({q,a,w1,w2,why});
  api.register({
    AC9EFLY08:{
      shortTitle:"Forming upper- and lower-case letters",
      childGoal:"I can form most upper- and lower-case letters using the letter shapes I have learnt.",
      bigIdea:"Letter formation becomes clearer and easier when children start in the taught place, move in the taught direction and use a comfortable functional pencil grip.",
      routine:["Look at the model","Start in the right place","Follow the movement","Check the letter shape"],
      vocabulary:["upper-case","lower-case","formation","start point","pencil grip"],
      use:"form taught upper- and lower-case letters with clear starting points and movement patterns",
      misconception:"Starting anywhere because the finished letter looks almost the same",
      fix:"Use the taught starting point and direction so letter formation becomes consistent and fluent.",
      seeds:[
        S("Before writing a new letter, what should you look at?","A clear model showing how the letter is formed.","A random number.","A picture unrelated to the letter.","A clear demonstration shows the shape, start point and movement."),
        S("Why does the starting point of a letter matter?","It helps you use the learnt formation consistently.","It changes the sound of every word.","It makes the paper bigger.","A consistent starting point supports efficient, recognisable letter formation."),
        S("Which pair shows the same letter in upper- and lower-case?","A / a","A / b","C / d","Upper- and lower-case forms represent the same letter."),
        S("Which pair matches correctly?","M / m","M / n","P / q","M and m are the upper- and lower-case forms of the same letter."),
        S("What should your pencil grip allow you to do?","Control the pencil comfortably enough to form letters.","Hold the pencil as tightly as possible until your hand hurts.","Avoid moving the pencil at all.","A functional grip supports controlled, comfortable writing."),
        S("A letter looks unclear. What is a useful next step?","Compare it with the model and try the taught movement again.","Add random lines until it looks busy.","Turn the paper over and stop.","Comparing with a model helps identify what part of the formation needs adjusting."),
        S("Which action helps build letter-formation skill?","Practise the same taught movement several times.","Change the letter shape every time.","Start from a different place on every attempt.","Repeated consistent movement helps the letter pattern become familiar."),
        S("You are practising lower-case letters. Which choice belongs?","a","A","7","Lower-case a is the requested lower-case letter form."),
        S("You are practising upper-case letters. Which choice belongs?","B","b","3","Upper-case B is the requested upper-case form."),
        S("What is the best final check after forming a letter?","Does it match the learnt letter shape closely enough to be recognised?","Is it the biggest mark on the page?","Did I use the most pencil pressure possible?","The goal is a recognisable letter made using the learnt formation." )
      ]
    },
    AC9EFLY09:{
      shortTitle:"Rhyme, alliteration, syllables and phonemes",
      childGoal:"I can hear and make rhymes, repeated beginning sounds, syllables and individual speech sounds.",
      bigIdea:"Spoken words have sound patterns we can listen for, clap, segment and generate without needing to see the words written down.",
      routine:["Say it aloud","Listen carefully","Find the sound pattern","Make or mark the pattern"],
      vocabulary:["rhyme","alliteration","syllable","phoneme","spoken word"],
      use:"recognise and generate rhymes, alliteration, syllables and phonemes in spoken words",
      misconception:"Looking at spelling instead of listening to the spoken sounds",
      fix:"Say the words aloud and focus on what you hear.",
      seeds:[
        S("Which pair rhymes?","funny / money","funny / fish","money / map","The spoken endings of ‘funny’ and ‘money’ match."),
        S("Which word rhymes with ‘cat’?","hat","cup","dog","‘Cat’ and ‘hat’ share the same ending sound."),
        S("Which phrase has alliteration?","helpful Henry","helpful Mia","Henry jumps","The /h/ sound repeats at the beginning of nearby words."),
        S("Which phrase repeats the /b/ sound at the beginning?","busy blue bird","small blue bird","bird on a tree","The words busy, blue and bird begin with /b/."),
        S("How many syllables can you hear in ‘Monday’?","2","1","4","‘Mon-day’ has two spoken beats or syllables."),
        S("How many syllables can you hear in ‘Jacob’?","2","1","3","‘Ja-cob’ has two syllables."),
        S("How many syllables can you hear in ‘Sienna’?","3","1","5","‘Si-en-na’ can be heard as three syllables."),
        S("What is the first sound in the spoken word ‘sun’?","/s/","/m/","/t/","The first phoneme heard in ‘sun’ is /s/."),
        S("What is the last sound in the spoken word ‘map’?","/p/","/m/","/a/","The final phoneme heard in ‘map’ is /p/."),
        S("Which new word continues the rhyme ‘log, frog, ___’?","dog","sun","fish","‘Dog’ has the same spoken ending sound as ‘log’ and ‘frog’." )
      ]
    },
    AC9EFLY10:{
      shortTitle:"Words in sentences and sounds in words",
      childGoal:"I can hear words in a sentence and blend, segment and change sounds in one-syllable words.",
      bigIdea:"Spoken sentences can be broken into words, and one-syllable words can be broken into phonemes, blended from phonemes and changed by replacing a sound.",
      routine:["Say it slowly","Listen for each part","Blend or separate the sounds","Check the new word"],
      vocabulary:["word","blend","segment","phoneme","sound"],
      use:"segment spoken sentences into words and manipulate phonemes in single-syllable words",
      misconception:"Treating letters on a page as the only way to hear word and phoneme boundaries",
      fix:"Work with the spoken sentence or word first and listen to each sound carefully.",
      seeds:[
        S("How many words are in ‘I can hop’?","3","2","4","The spoken sentence has the words I / can / hop."),
        S("How many words are in ‘The dog ran’?","3","1","5","The sentence separates into The / dog / ran."),
        S("What sounds can you hear in ‘can’?","/c/ /a/ /n/","/c/ /o/ /g/","/m/ /a/ /p/","‘Can’ segments into three phonemes: /c/ /a/ /n/."),
        S("Blend /l/ /i/ /p/. What word do you hear?","lip","lap","log","Blending the sounds together makes ‘lip’."),
        S("Blend /m/ /u/ /n/ /ch/. What word do you hear?","munch","much","mint","The spoken sounds blend in order to form ‘munch’."),
        S("Change the first sound in ‘run’ from /r/ to /f/. What word do you make?","fun","run","fan","Replacing only the beginning phoneme changes ‘run’ to ‘fun’."),
        S("Change the middle sound in ‘fun’ from /u/ to /a/. What word do you make?","fan","fun","fin","Changing the medial phoneme makes ‘fan’."),
        S("Change the last sound in ‘cat’ from /t/ to /p/. What word do you make?","cap","cat","can","Replacing the final phoneme /t/ with /p/ makes ‘cap’."),
        S("Which word has the sounds /s/ /i/ /t/?","sit","sat","sip","Blending /s/ /i/ /t/ makes ‘sit’."),
        S("Which segmentation matches ‘ship’?","/sh/ /i/ /p/","/s/ /h/ /i/ /p/","/sh/ /o/ /p/","The beginning /sh/ is one phoneme in the spoken word ‘ship’." )
      ]
    },
    AC9EFLY11:{
      shortTitle:"Letters and their common sounds",
      childGoal:"I can name upper- and lower-case letters and say their most common sounds.",
      bigIdea:"Each letter has an upper- and lower-case graph, and letters commonly represent particular sounds in words.",
      routine:["Look at the letter","Name it","Say its common sound","Find it in a familiar word"],
      vocabulary:["letter","upper-case","lower-case","graph","sound"],
      use:"recognise letter forms and connect letters with their most common sounds",
      misconception:"Thinking upper- and lower-case forms are different letters",
      fix:"The two shapes can represent the same letter and share its common sound.",
      seeds:[
        S("Which lower-case letter matches upper-case A?","a","b","d","A and a are two forms of the same letter."),
        S("Which upper-case letter matches lower-case m?","M","N","W","M and m are the upper- and lower-case forms of the same letter."),
        S("What is the common sound for the letter m?","/m/","/s/","/t/","The letter m commonly represents the /m/ sound."),
        S("What is the common sound for the letter s?","/s/","/m/","/p/","The letter s commonly represents /s/."),
        S("Which letter begins the name ‘Mia’?","M","S","T","The name Mia begins with the letter M."),
        S("Which lower-case letter matches B?","b","d","p","B and b are the same letter in different cases."),
        S("Which upper-case letter matches t?","T","F","L","T is the upper-case form of t."),
        S("Which word begins with the common /c/ sound of c?","cat","moon","sun","‘Cat’ begins with the common sound represented by c."),
        S("Which word begins with the common /p/ sound of p?","pig","dog","map","‘Pig’ begins with /p/."),
        S("Why should you learn both A and a?","They are both forms of the same letter and appear in different places in texts.","They are completely unrelated symbols.","Only one of them can ever make a sound.","Readers need to recognise both cases as the same letter." )
      ]
    },
    AC9EFLY12:{
      shortTitle:"Reading and writing CVC words",
      childGoal:"I can use letters for sounds to read and write simple consonant-vowel-consonant words.",
      bigIdea:"CVC words can be segmented into three phonemes for spelling and blended from letter-sound knowledge for reading.",
      routine:["Say the word","Hear three sounds","Choose the letters","Blend and check"],
      vocabulary:["CVC","consonant","vowel","segment","blend"],
      use:"spell and read consonant-vowel-consonant words using sound-letter correspondences",
      misconception:"Guessing the whole word without checking each sound",
      fix:"Hear or say each phoneme, match it to a letter, then blend the sequence.",
      seeds:[
        S("Which letters spell the spoken word ‘cat’?","c-a-t","c-o-t","m-a-t","The sounds /c/ /a/ /t/ are represented by c-a-t."),
        S("Blend c-a-t. What word do you read?","cat","cot","cut","The letter sounds blend to form ‘cat’."),
        S("Which letters spell ‘dog’?","d-o-g","d-i-g","f-o-g","The sounds in ‘dog’ match d-o-g."),
        S("Blend m-a-p. What word do you read?","map","mop","mat","The three letter sounds blend to ‘map’."),
        S("Which letters spell ‘sun’?","s-u-n","s-i-t","r-u-n","The phonemes /s/ /u/ /n/ are represented by s-u-n."),
        S("Blend p-i-g. What word do you read?","pig","peg","pin","The letter sounds p-i-g blend to ‘pig’."),
        S("Which word is a CVC word?","fin","ship","tree","‘Fin’ has consonant-vowel-consonant letter pattern f-i-n."),
        S("Which spelling matches the sounds /h/ /e/ /n/?","hen","hin","hat","The three phonemes are represented by h-e-n."),
        S("You hear /r/ /u/ /n/. Which word should you write?","run","ran","rug","The sequence /r/ /u/ /n/ maps to r-u-n."),
        S("Which action helps check a CVC spelling?","Say each sound and point to the matching letter.","Ignore the sounds and choose random letters.","Add as many extra letters as possible.","Checking each phoneme-letter match supports accurate CVC spelling." )
      ]
    },
    AC9EFLY13:{
      shortTitle:"Using letters and sounds to spell",
      childGoal:"I can listen to a word and use what I know about letters and sounds to make a sensible spelling.",
      bigIdea:"Beginning spelling uses sound-letter correspondences and growing knowledge of meaningful word parts to make plausible choices.",
      routine:["Say the word","Stretch the sounds","Choose letters for the sounds","Read the spelling back"],
      vocabulary:["spell","sound","letter","plausible","word part"],
      use:"make plausible spelling choices using known letter-sound relationships",
      misconception:"Thinking an early spelling attempt is useless unless every letter is conventional",
      fix:"Represent the sounds you can hear, then improve spellings as new patterns and word parts are learnt.",
      seeds:[
        S("You want to spell ‘map’. Which choice best matches the sounds?","map","mip","sap","The sounds /m/ /a/ /p/ match the letters m-a-p."),
        S("You hear ‘sun’. Which spelling is the best choice?","sun","sin","run","The chosen letters represent the sounds in the spoken word."),
        S("Which spelling best matches ‘fish’ using known sounds?","fish","fash","dish","The beginning /f/, middle /i/ and ending /sh/ are represented in ‘fish’."),
        S("You are unsure how to spell a word. What should you do first?","Say it slowly and listen for the sounds you know.","Choose letters without saying the word.","Copy a different word.","Stretching the spoken word helps identify sound-letter correspondences."),
        S("Which choice is a plausible early spelling of the spoken word ‘bed’?","bed","bid","bad","The letters b-e-d match the sounds in ‘bed’."),
        S("You wrote a word and want to check it. What can you do?","Read the letters back using their sounds.","Cover it and never look again.","Add random capitals.","Reading the spelling back helps check whether the letters represent the intended sounds."),
        S("Which spelling begins with the letter that matches /t/?","top","mop","pop","The letter t commonly represents the beginning /t/ sound."),
        S("Which spelling ends with the letter that matches /n/?","sun","sum","sup","The word ‘sun’ ends with n for the /n/ sound."),
        S("If you hear a plural /s/ at the end of ‘cats’, what meaningful part has been added?","s","cat","a","The ending s is a meaningful part that signals more than one cat."),
        S("What makes a spelling choice sensible for a beginning writer?","The letters connect to the sounds and word parts the writer knows.","The word is as long as possible.","The letters are chosen randomly.","Plausible spelling is based on known sound-letter and meaning relationships." )
      ]
    },
    AC9EFLY14:{
      shortTitle:"High-frequency and familiar words",
      childGoal:"I can read and write some common words and words that are very familiar to me.",
      bigIdea:"Frequently encountered words and personally familiar words become easier to recognise and write through repeated meaningful use.",
      routine:["Look at the whole word","Say it","Notice the letters","Read or write it again in a sentence"],
      vocabulary:["high-frequency word","familiar word","read","write","recognise"],
      use:"read and write common high-frequency words and personally familiar words",
      misconception:"Guessing common words only from the first letter",
      fix:"Look at the whole word and connect its letters with the word you know from repeated reading and writing.",
      seeds:[
        S("Which is a common high-frequency word?","the","zup","vexy","‘The’ appears very often in beginning texts."),
        S("Which is a common high-frequency word?","and","zog","qub","‘And’ is frequently used to join words and ideas."),
        S("Which is a common high-frequency word?","my","xim","baf","‘My’ is a common word children meet often in texts."),
        S("Which is a common high-frequency word?","is","uv","za","‘Is’ occurs very often in simple sentences."),
        S("Which is a common high-frequency word?","go","zo","vu","‘Go’ is a familiar high-frequency word."),
        S("Which word is likely to be especially familiar to you?","Your own name.","A random invented word.","A word you have never heard or seen.","Children often learn to recognise and write their own name early because it is personally meaningful."),
        S("A story character is called Sam and the name appears on many pages. What may happen?","Sam becomes a familiar word you can recognise quickly.","The name stops being a word.","You must sound it out from the beginning every single time forever.","Repeated meaningful exposure can make a word familiar."),
        S("Which sentence uses the high-frequency word ‘and’ correctly?","Mia and Leo run.","Mia the Leo run.","Mia go Leo run.","‘And’ joins the two names in the sentence."),
        S("What is a good way to practise a familiar word?","Read it in a text and write it in a meaningful sentence.","Copy it without ever saying or reading it.","Change its letters randomly each time.","Repeated reading and writing in context strengthens recognition."),
        S("You know the word ‘school’ because you see and write your school name often. What kind of word can it be for you?","A familiar word.","A punctuation mark.","A number.","Words linked to everyday life can become familiar through repeated use." )
      ]
    },
    AC9EFLY15:{
      shortTitle:"Words and meaningful parts",
      childGoal:"I can understand that a word has meaning and can sometimes contain more than one meaningful part.",
      bigIdea:"Words are units of meaning, and some words contain smaller meaningful parts, such as a base word plus an ending that changes meaning.",
      routine:["Say the word","Find the main word","Look for an added part","Work out what the whole word means"],
      vocabulary:["word","meaning","part","base word","plural"],
      use:"recognise words as units of meaning and notice simple meaningful parts within words",
      misconception:"Thinking every letter in a word is a separate meaning part",
      fix:"A meaningful part contributes meaning to the whole word; it is not simply any single letter.",
      seeds:[
        S("What does the word ‘dog’ do?","It names a kind of animal and carries meaning.","It is only three unrelated marks.","It is punctuation.","A word is a unit that communicates meaning."),
        S("In ‘dogs’, what does the added s tell us?","There is more than one dog.","The dog is blue.","The dog is sleeping.","The plural s is a meaningful part that changes the number meaning."),
        S("How many meaningful parts are in ‘dogs’ for this example?","2: dog + s","4: d + o + g + s as four meanings","1 because s never adds meaning","The base ‘dog’ carries the animal meaning and s adds plural meaning."),
        S("Which word means more than one cat?","cats","cat","catly","The added s changes the base word ‘cat’ to plural ‘cats’."),
        S("Which pair shows a base word and a plural form?","book / books","book / chair","book / blue","‘Books’ contains the base ‘book’ plus the plural ending s."),
        S("In ‘hats’, which part names the object?","hat","s","at","The base word ‘hat’ carries the main object meaning."),
        S("In ‘hats’, what does s add?","The meaning ‘more than one’.","The meaning ‘very small’.","The meaning ‘running’. ","The ending s contributes plural meaning."),
        S("Which statement about words is true?","Words carry meaning and some can contain smaller meaningful parts.","Words never have meaning.","Every letter is always a separate word part with its own meaning.","Words are meaning units, and some have more than one morpheme or meaningful part."),
        S("Which change affects meaning?","cat → cats","cat → cat written in a different colour","cat → cat written larger","Adding plural s changes the word's meaning, while display changes do not."),
        S("Why is s meaningful in ‘dogs’?","It changes one dog to more than one dog.","It makes the word look longer only.","It turns the word into punctuation.","A meaningful word part contributes a predictable change to meaning." )
      ]
    }
  });
})();
