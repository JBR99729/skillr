const fs = require('node:fs');
const rows = [
['year-2-maths-workbook',2,'maths','workbook','20.00','Year 2 Maths Workbook | Australian Curriculum Version 9.0 | Full-Year Resource','A complete Year 2 teaching and practice workbook with explanations, visual models, worksheets, assessments and answers.','Year-2-Maths-Workbook-Australian-Curriculum-Version-90-Full-Year-Resource-17273907','Australian Curriculum v9.0','full year,workbook,number,algebra,measurement,space,statistics'],
['year-1-science-bundle',1,'science','bundle','19.99','Year 1 Science Bundle | Australian Curriculum v9.0 | Teaching Slides + Worksheet','Six Year 1 Science products combining teacher explanations and matching student practice worksheets.','Year-1-Science-Bundle-Australian-Curriculum-v90-Teaching-Slides-Worksheet-17205384','Australian Curriculum v9.0','bundle,biology,earth,space,physical sciences,inquiry'],
['year-1-science-inquiry-part-1',1,'science','unit','6.99','Year 1 Science – Science Inquiry Skills | Australian Curriculum v9.0 | Part 1','Hands-on teaching and practice for observing, recording, analysing, evaluating and communicating.','Year-1-Science-Science-Inquiry-Skills-Australian-Curriculum-v90-Part-1-17204859','Australian Curriculum v9.0','inquiry,observing,recording,communicating'],
['year-1-science-inquiry-part-2',1,'science','unit','5.50','Year 1 Science Inquiry Skills | Questioning, Planning & Processing | Part 2','Inquiry activities for asking questions, making predictions, planning investigations and processing findings.','Year-1-Science-Inquiry-Skills-Questioning-Planning-Processing-Part-2-17204897','Australian Curriculum v9.0','inquiry,questions,predictions,planning,processing'],
['year-1-science-earth-space',1,'science','unit','4.75','Year 1 Science – Earth and Space Sciences | Australian Curriculum v9.0 | Lessons','Age-appropriate lessons, visuals and investigations exploring Earth, the Sun, weather and seasons.','Year-1-Science-Earth-and-Space-Sciences-Australian-Curriculum-v90-Lessons-17204732','Australian Curriculum v9.0','earth,space,sun,weather,seasons'],
['year-1-science-physical',1,'science','unit','4.75','Year 1 Science – Physical Sciences | Australian Curriculum v9.0 | Pushes & Pulls','Visual lessons and investigations showing how pushes and pulls affect movement and shape.','Year-1-Science-Physical-Sciences-Australian-Curriculum-v90-Pushes-Pulls-17204675','Australian Curriculum v9.0','physical sciences,forces,motion,pushes,pulls'],
['year-1-science-human-endeavour',1,'science','unit','4.75','Year 1 – Science as a Human Endeavour | Australian Curriculum v9.0 | Lessons','Lessons showing how people use science in daily life to care, decide and solve problems.','Year-1-Science-as-a-Human-Endeavour-Australian-Curriculum-v90-Lessons-17204777','Australian Curriculum v9.0','human endeavour,everyday science,environment'],
['year-1-biological-sciences-free',1,'science','unit','0','Year 1 Biological Sciences | Chapter 1: Introduction to Biological Sciences','A free introductory chapter about living things through observation, exploration and inquiry.','Year-1-Biological-Sciences-Chapter-1-Introduction-to-Biological-Sciences-17204521','Australian Curriculum v9.0','biology,living things,free sample'],
['year-2-numbers-1000-free',2,'maths','worksheet','0','Year 2 Numbers to 1000 Free Lesson | Place Value Worksheets | AC9M2N01','A free teaching and practice pack for reading, representing, comparing and ordering numbers to 1000.','Year-2-Numbers-to-1000-Free-Lesson-Place-Value-Worksheets-AC9M2N01-17273749','AC9M2N01','numbers to 1000,place value,free'],
['year-3-telling-time-free',3,'maths','worksheet','0','Year 3 Telling Time FREE Worksheets | Analog Clocks | AC9M3M04','A free mini-pack for identifying clock hands and reading analogue and digital time to the minute.','Year-3-Telling-Time-FREE-Worksheets-Analog-Clocks-AC9M3M04-17492537','AC9M3M04','telling time,analogue clocks,analog clocks,free'],
['year-4-fractions-free',4,'maths','worksheet','0','Year 4 Fractions FREE Worksheet Pack | Equivalent Fractions & Number Lines','A free mini-pack with fraction models, number lines, reasoning, an exit ticket and answers.','Year-4-Fractions-FREE-Worksheet-Pack-Equivalent-Fractions-Number-Lines--17526065','AC9M4N03,AC9M4N04','fractions,equivalent fractions,number lines'],
['year-5-decimals-free',5,'maths','worksheet','0','FREE Year 5 Decimals Worksheets | Place Value, Comparing & Rounding Decimals','A free decimal pack covering place value, comparing, ordering and rounding, with answers.','FREE-Year-5-Decimals-Worksheets-Place-Value-Comparing-Rounding-Decimals-17567833','AC9M5N01','decimals,place value,comparing,rounding'],
['year-3-time-bundle',3,'maths','bundle','7.98','Year 3 Time Bundle | Analogue Clocks, Duration, Teaching Slides & Worksheets','A complete bundle combining 60 teaching slides with printable time practice and worked answers.','Year-3-Time-Bundle-Analogue-Clocks-Duration-Teaching-Slides-Worksheets-17593227','AC9M3M03,AC9M3M04','time,duration,clocks,slides,worksheets'],
['year-3-time-slides-60',3,'maths','teaching-slides','6.99','Year 3 Time Teaching Slides | Analogue Clocks & Duration | 60-Slide Pack','Sixty classroom-ready slides with visual explanations, worked examples and guided practice.','Year-3-Time-Teaching-Slides-Analogue-Clocks-Duration-60-Slide-Pack-17593166','AC9M3M03,AC9M3M04','time,duration,analogue clocks,slides'],
['year-3-time-slides',3,'maths','teaching-slides','6.98','Year 3 Time Teaching Slides | Analogue Clocks & Duration','A classroom-ready PDF for analogue clocks, comparing times, elapsed time and duration problems.','Year-3-Time-Teaching-Slides-Analogue-Clocks-Duration-17593120','AC9M3M03,AC9M3M04','time,duration,analogue clocks,slides'],
['year-3-time-slides-sample',3,'maths','teaching-sample','0','Year 3 Time Teaching Slides Sample Pack | Analogue Clocks & Duration','A free 12-slide sample covering time units, duration, analogue clocks and common mistakes.','Year-3-Time-Teaching-Slides-Sample-Pack-Analogue-Clocks-Duration-17593083','AC9M3M03,AC9M3M04','time,duration,clocks,sample'],
['year-3-time-practice',3,'maths','worksheet','2.99','Year 3 Time Practice Pack | Analogue Clocks & Duration | AC9M3M03 AC9M3M04','Ready-to-print A4 practice for time units, duration and analogue clocks, with worked answers.','Year-3-Time-Practice-Pack-Analogue-Clocks-Duration-AC9M3M03-AC9M3M04-17592266','AC9M3M03,AC9M3M04','time,duration,clocks,hours,minutes'],
['year-3-time-duration-free',3,'maths','worksheet','0','FREE Year 3 Time Duration Worksheets | Hours, Minutes, Seconds | AC9M3M03','A free mini-pack for choosing time units, estimating and comparing duration, and reading timers.','FREE-Year-3-Time-Duration-Worksheets-Hours-Minutes-Seconds-AC9M3M03-17592010','AC9M3M03','time,duration,hours,minutes,seconds,timers']
];
const products = rows.map(([id,year,subject,resourceType,price,title,description,slug,codes,topics]) => ({
  id,title,year,yearLabel:`Year ${year}`,subject,subjectLabel:subject === 'maths' ? 'Maths' : 'Science',
  topics:topics.split(','),curriculumCodes:codes.split(','),description,url:`/product.html?id=${id}`,
  image:year === 3 ? '/assets/year-3-time-pack-cover.png' : year === 4 ? '/assets/free-resources/year-4-fractions-mini-pack-preview.png' : '/icons/skillrhub-mark.svg',
  price,currency:'USD',available:true,resourceType,...(Number(price) === 0 ? {free:true} : {}),
  tptUrl:`https://www.teacherspayteachers.com/Product/${slug}`
}));
products.find(p=>p.id==='year-1-science-bundle').listPrice='26.74';
products.find(p=>p.id==='year-3-time-bundle').listPrice='9.98';
products.push({
  "id": "year-3-multiplication-division-slides",
  "title": "Year 3 Multiplication & Division Teaching Slides | Australian Curriculum v9",
  "year": 3,
  "yearLabel": "Year 3",
  "subject": "maths",
  "subjectLabel": "Maths",
  "topics": [
    "multiplication",
    "division",
    "times tables",
    "arrays",
    "equal groups",
    "fact families",
    "slides"
  ],
  "curriculumCodes": [
    "AC9M3A03",
    "AC9M3N04"
  ],
  "description": "36 PowerPoint teaching slides covering the 3, 4, 5 and 10 times tables, related division facts, arrays, sharing, grouping and calculation strategies. Teaching presentation only; the companion workbook is sold separately.",
  "url": "/product.html?id=year-3-multiplication-division-slides",
  "image": "/assets/year-3-multiplication-division-slides-cover.png",
  "price": "6.99",
  "currency": "USD",
  "available": true,
  "resourceType": "teaching-slides",
  "tptUrl": "https://www.teacherspayteachers.com/Product/Year-3-Multiplication-Division-Teaching-Slides-Australian-Curriculum-v9-17594247",
  "includes": [
    "36 slides in PowerPoint (.pptx) format",
    "Learning intentions, visual models, worked examples and guided practice",
    "Eight check and misconception questions with separate answer slides",
    "Two exit tickets with answers and think–pair–share prompts",
    "Times-table recall focus: 3, 4, 5 and 10, plus related division facts",
    "Product images and purchase available on TPT"
  ]
});
products.push({
  "id": "year-3-multiplication-division-bundle",
  "title": "Year 3 Multiplication & Division Bundle | Workbook + Teaching Slides | AC v9",
  "year": 3,
  "yearLabel": "Year 3",
  "subject": "maths",
  "subjectLabel": "Maths",
  "topics": [
    "multiplication",
    "division",
    "times tables",
    "arrays",
    "equal groups",
    "workbook",
    "slides",
    "bundle"
  ],
  "curriculumCodes": [
    "AC9M3A03",
    "AC9M3N04"
  ],
  "description": "Combine a 144-question workbook with answers and 36 PowerPoint teaching slides. Focuses on the 3, 4, 5 and 10 times tables and related division facts. Save US$2.10 compared with buying separately.",
  "url": "/product.html?id=year-3-multiplication-division-bundle",
  "image": "/assets/year-3-multiplication-division-slides-cover.png",
  "price": "8.38",
  "listPrice": "10.48",
  "currency": "USD",
  "available": true,
  "resourceType": "bundle",
  "tptUrl": "https://www.teacherspayteachers.com/Product/Year-3-Multiplication-Division-Bundle-Workbook-Teaching-Slides-AC-v9-17594338",
  "includes": [
    "144-question Multiplication & Division workbook with answer keys",
    "36 PowerPoint teaching slides with visual models, worked examples and guided practice",
    "Eight check and misconception questions plus two exit tickets with answers in the presentation",
    "Focus: 3, 4, 5 and 10 times tables and related division facts; not a complete Year 3 mathematics program",
    "Does not teach 6, 7, 8 and 9 times tables as primary units or word problems involving remainders",
    "Preview and purchase available on TPT",
    "These two resources are also sold individually; check previous purchases to avoid duplicates"
  ]
});
fs.writeFileSync('data/print-and-go-products.json', JSON.stringify(products, null, 2) + '\n');
console.log(`Wrote ${products.length} live products`);


require('./build-product-pages.cjs');
