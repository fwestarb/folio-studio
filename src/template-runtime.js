(()=>{
 const config=window.FOLIO||{},root=document.documentElement;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');let motion=config.motion&&!preference.matches;
 preference.addEventListener('change',e=>{motion=config.motion&&!e.matches;schedule();});
 const elements=[...document.querySelectorAll('[data-reveal]')],band=document.querySelector('.type-band span');
 let pending=false;
 function update(){pending=false;const height=innerHeight;
  for(const el of elements){const top=el.getBoundingClientRect().top;const p=motion?Math.max(0,Math.min(1,(height*.94-top)/(height*.5))):1;el.style.setProperty('--p',p);el.querySelectorAll('.word>span').forEach((word,i,all)=>{const progress=Math.max(0,Math.min(1,p*1.55-(i/Math.max(1,all.length))*.55));word.style.transform=`translateY(${(1-progress)*105}%)`;});}
  if(band&&motion)band.style.transform=`translateX(${-Math.min(20,Math.max(0,(innerHeight-band.parentElement.getBoundingClientRect().top)/innerHeight)*9)}%)`;
  if(config.preview)parent.postMessage({type:'folio-position',y:scrollY},'*');
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);
 let previousFocus;const menu=document.querySelector('.menu'),opener=document.querySelector('.menu-toggle');
 function close(){document.querySelector('main').inert=false;document.querySelector('header').inert=false;menu.hidden=true;opener.setAttribute('aria-expanded','false');document.body.style.overflow='';previousFocus?.focus({preventScroll:true});}
 opener.addEventListener('click',()=>{previousFocus=document.activeElement;menu.hidden=false;opener.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';document.querySelector('main').inert=true;document.querySelector('header').inert=true;menu.querySelector('button').focus();});
 menu.querySelector('button').addEventListener('click',close);
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 menu.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const links=[...menu.querySelectorAll('button,a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();links[0].focus();}}});
 if(config.preview){document.querySelectorAll('a[href^="http"],a[href^="mailto:"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();parent.postMessage({type:'folio-link-preview'},'*');}));addEventListener('message',event=>{if(event.source!==parent)return;if(event.data?.type==='folio-navigate'&&['inicio','projetos','sobre','contato'].includes(event.data.id))document.getElementById(event.data.id)?.scrollIntoView({behavior:'smooth'});});}
 requestAnimationFrame(()=>{scrollTo({top:config.scroll||0,behavior:'instant'});update();root.classList.add('started');});
})();
