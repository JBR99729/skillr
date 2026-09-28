(function(){
  const tabs=[...document.querySelectorAll("[data-demo-tab]")];
  const panels=[...document.querySelectorAll("[data-demo-panel]")];
  if(!tabs.length||!panels.length)return;
  function show(name){
    tabs.forEach((tab)=>{
      const active=tab.dataset.demoTab===name;
      tab.classList.toggle("is-active",active);
      tab.setAttribute("aria-selected",active?"true":"false");
      tab.tabIndex=active?0:-1;
    });
    panels.forEach((panel)=>{
      const active=panel.dataset.demoPanel===name;
      panel.classList.toggle("is-active",active);
      panel.hidden=!active;
    });
  }
  tabs.forEach((tab)=>tab.addEventListener("click",()=>show(tab.dataset.demoTab)));
  tabs.forEach((tab,index)=>tab.addEventListener("keydown",(event)=>{
    if(event.key!=="ArrowRight"&&event.key!=="ArrowLeft")return;
    event.preventDefault();
    const offset=event.key==="ArrowRight"?1:-1;
    const next=tabs[(index+offset+tabs.length)%tabs.length];
    show(next.dataset.demoTab);
    next.focus();
  }));
})();
