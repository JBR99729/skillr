/* Requests open a reviewable email draft. No contact values are sent to analytics or saved locally. */
(function(){'use strict';var form=document.getElementById('resource-consultation-form');if(!form)return;
form.addEventListener('submit',function(event){event.preventDefault();if(!form.reportValidity())return;
var value=function(name){return form.elements.namedItem(name).value.trim();};
var request=value('request');
var intro=request==='consultation'?'I would like a free, no-obligation consultation to help me choose or use the worksheets.':request==='sample-consultation'?'Please email me sample pages for the resources below. I would also like a free, no-obligation consultation.':'Please email me sample pages for the resources below.';
var closing=request==='sample'?'Please reply by email with available sample pages. I understand preparation may take 1–2 business days.':'Please reply by email to arrange a suitable consultation time.';
var body=['Hello SkillrHub,','',intro,'','Name: '+value('name'),'Reply email: '+value('email'),'Role: '+value('role'),'Year level(s): '+value('year'),'School or organisation: '+(value('school')||'Not provided'),'','Resources or questions:',value('needs'),'',closing].join('\n');
var url='mailto:skillrhublearning@gmail.com?subject='+encodeURIComponent((request==='consultation'?'Free resource consultation':request==='sample-consultation'?'Workbook sample and consultation request':'Workbook sample request')+' — '+value('year'))+'&body='+encodeURIComponent(body);
document.getElementById('consultation-result').textContent='Your request is ready. Review and send it in your email app. If your email app does not open, use the email address below. Your request has not been sent automatically.';
window.location.href=url;
});})();
