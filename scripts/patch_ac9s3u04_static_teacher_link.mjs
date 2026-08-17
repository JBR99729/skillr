#!/usr/bin/env node
import fs from 'node:fs';
const file='year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/index.html';
let html=fs.readFileSync(file,'utf8');
const before=html;
html=html.replace('Open the complete live 12-slide teaching sequence with classroom navigation and teacher guidance.','Use the static teacher slide deck to introduce the key idea, vocabulary and teaching sequence before students begin the activities.');
html=html.replace('<a class="curriculum-button primary" href="/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/teacher-deck/">Open 12 live teacher slides</a>','<a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Teacher Slides</a>');
if(html===before){console.error('Expected legacy AC9S3U04 teacher block not found');process.exit(1);}
fs.writeFileSync(file,html);
console.log('Patched AC9S3U04 to static Teacher Slides');
