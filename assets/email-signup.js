/* Signup analytics: fixed placement/code only; never email addresses or field values. */
(function(){'use strict';
function track(name,placement,code){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('event',name,{signup_placement:placement,curriculum_code:code||'',signup_provider:'brevo'});}
document.querySelectorAll('[data-email-signup]').forEach(function(form){var placement=form.dataset.emailSignup;form.addEventListener('input',function(){track('email_signup_start',placement);},{once:true});form.addEventListener('submit',function(){if(form.checkValidity())track('email_signup_submit_attempt',placement);});});
document.querySelectorAll('[data-email-cta]').forEach(function(link){link.addEventListener('click',function(){track('email_signup_cta_click',link.dataset.emailCta,link.dataset.curriculumCode);});});
if('IntersectionObserver' in window){var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){track('email_signup_view',e.target.dataset.emailPlacement);obs.unobserve(e.target);}});},{threshold:0.35});document.querySelectorAll('[data-email-placement]').forEach(function(section){obs.observe(section);});}
})();
