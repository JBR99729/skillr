/* Requests open a reviewable email draft. No contact values are sent to analytics or saved locally. */
(function(){'use strict';var form=document.getElementById('resource-consultation-form');if(!form)return;
form.addEventListener('submit',function(event){event.preventDefault();if(!form.reportValidity())return;
var value=function(name){return form.elements.namedItem(name).value.trim();};
var body=['Hello SkillrHub,','','I would like a free, no-obligation consultation to look through the printable resources before buying.','','Name: '+value('name'),'Reply email: '+value('email'),'Role: '+value('role'),'Year level(s): '+value('year'),'School or organisation: '+(value('school')||'Not provided'),'','Resources or questions:',value('needs'),'','Please reply by email to arrange a suitable time.'].join('\n');
var url='mailto:skillrhublearning@gmail.com?subject='+encodeURIComponent('Free resource consultation — '+value('year'))+'&body='+encodeURIComponent(body);
document.getElementById('consultation-result').textContent='Your request is ready. Review and send it in your email app. If your email app does not open, use the email address below. Your request has not been sent automatically.';
window.location.href=url;
});})();
