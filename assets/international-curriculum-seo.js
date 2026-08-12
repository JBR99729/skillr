(function(){
  'use strict';
  var AU_EXACT={
    AC9MFN01:{vic:'VC2MFN01',nsw:'MAE-RWN-01 + MAE-RWN-02',note:'whole-number quantity, reading numerals and representing numbers to at least 20'},
    AC9MFN02:{vic:'VC2MFN02',nsw:'MAE-RWN-01',note:'understanding whole numbers as quantities; closest NSW Early Stage 1 outcome for recognising small collections'},
    AC9MFN03:{vic:'VC2MFN03',nsw:'MAE-RWN-01',note:'quantifying and comparing collections; closest NSW Early Stage 1 whole-number quantity outcome'},
    AC9MFN04:{vic:'VC2MFN04',nsw:'MAE-CSQ-02',note:'part-part-whole relations with numbers up to 10'},
    AC9MFN05:{vic:'VC2MFN05',nsw:'MAE-CSQ-01',note:'combining, separating and comparing collections to model addition and subtraction'},
    AC9MFN06:{vic:'VC2MFN06',nsw:'MAE-FG-02',note:'forming equal groups by sharing and counting collections'},
    AC9MFA01:{vic:'VC2MFA01',nsw:'MAE-FG-01',note:'recognising, describing and continuing repeating patterns'},
    AC9MFM01:{vic:'VC2MFM01',nsw:'MAE-GM-02 + MAE-3DS-02 + MAE-NSM-01',note:'closest NSW outcomes across length, capacity/volume and mass; duration is also developed in MAE-NSM-02'},
    AC9MFM02:{vic:'VC2MFM02',nsw:'MAE-NSM-02',note:'sequencing events and time; closest NSW Early Stage 1 non-spatial measure outcome'},
    AC9MFSP01:{vic:'VC2MFSP01',nsw:'MAE-2DS-01 + MAE-3DS-01',note:'sorting, describing, naming and making 2D shapes and manipulating, describing and sorting 3D objects'},
    AC9MFSP02:{vic:'VC2MFSP02',nsw:'MAE-GM-01',note:'describing position and giving and following simple directions'},
    AC9MFST01:{vic:'VC2MFST01',nsw:'MAE-DATA-01',note:'collecting data and interpreting data displays made from objects'},
    AC9M1N01:{vic:'VC2M1N01',nsw:'MA1-RWN-01 + MA1-RWN-02',note:'reading, representing, ordering and working with whole numbers; closest NSW Stage 1 whole-number outcomes'},
    AC9M1N02:{vic:'VC2M1N02',nsw:'MA1-RWN-02',note:'representing and partitioning two-digit numbers using place-value structure'},
    AC9M1N03:{vic:'VC2M1N03',nsw:'MA1-RWN-01 + MA1-FG-01',note:'number sequences and skip-counting connect to whole-number patterns and equal-group foundations'},
    AC9M1N04:{vic:'VC2M1N04',nsw:'MA1-CSQ-01',note:'using number bonds and the relationship between addition and subtraction to solve partitioning problems'},
    AC9M1N05:{vic:'VC2M1N05',nsw:'MA1-CSQ-01 + MA1-NSM-01',note:'additive problem solving with money contexts; NSW separates additive relations and money into related Stage 1 outcomes'},
    AC9M1N06:{vic:'VC2M1N06',nsw:'MA1-FG-01',note:'forming equal groups through sharing and grouping; closest NSW Stage 1 flexible strategies outcome'}
  };
  function yearLabels(meta){var y=(meta.year||'').toLowerCase();if(y==='foundation')return{vic:'Victorian Foundation',nsw:'NSW Early Stage 1',us:'US Kindergarten',uk:'England Reception'};var m=y.match(/year\s*(\d+)/);if(!m)return null;var n=Number(m[1]);return{vic:'Victorian Year '+n,nsw:'NSW '+(n<=2?'Stage 1':n<=4?'Stage 2':n<=6?'Stage 3':n<=8?'Stage 4':'Stage 5'),us:'US Grade '+n,uk:'England Year '+n};}
  function subjectTopic(meta){var s=(meta.subject||'').toLowerCase(),t=meta.title||'';if(s==='maths')return t+' maths';if(s==='science')return t+' science';if(s==='english')return t+' English';return t;}
  function init(){var meta=window.skillrPageMeta;if(!meta||!meta.curriculumCode||!meta.title)return;var labels=yearLabels(meta);if(!labels)return;var main=document.querySelector('.curriculum-layout > div, main');if(!main)return;if(document.getElementById('international-alignment'))return;var topic=subjectTopic(meta),au=AU_EXACT[meta.curriculumCode];var vic=au?'<strong>'+au.vic+'</strong> — verified Victorian Curriculum 2.0 match':labels.vic+' — '+topic;var nsw=au?'<strong>'+au.nsw+'</strong> — '+au.note:labels.nsw+' — '+topic;var section=document.createElement('section');section.className='curriculum-topic-section';section.id='international-alignment';section.innerHTML='<h2>Australian and international curriculum alignment</h2><p>This SkillrHub topic follows <strong>'+meta.curriculumCode+'</strong> in Australian Curriculum v9.0.</p><ul class="curriculum-check-list"><li><strong>Victoria:</strong> '+vic+'</li><li><strong>New South Wales:</strong> '+nsw+'</li><li><strong>United States:</strong> '+labels.us+' — '+topic+'</li><li><strong>England:</strong> '+labels.uk+' — '+topic+'</li></ul><p><small>Victorian codes marked verified are direct Victorian Curriculum 2.0 content-description matches. NSW uses stage outcomes rather than AC-style one-to-one codes, so listed NSW outcomes are the closest defensible alignment and a topic may span more than one outcome. International entries are topic-level alignments, not identical curriculum codes.</small></p>';var related=Array.from(main.querySelectorAll('.curriculum-topic-section')).find(function(el){return /related/i.test((el.querySelector('h2')||{}).textContent||'');});if(related)main.insertBefore(section,related);else main.appendChild(section);var desc=document.querySelector('meta[name="description"]');if(desc&&au&&!desc.content.includes(au.vic)){desc.content=(desc.content+' VIC '+au.vic+' and NSW '+au.nsw+' alignment.').slice(0,300);}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
