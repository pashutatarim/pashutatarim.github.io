(()=>{
const EMAIL='shay-freelance+pashutatarim@mail.grokbot.com';
document.getElementById('y').textContent=new Date().getFullYear();
// menu
const mb=document.querySelector('.menu-btn'),menu=document.getElementById('menu');
mb.addEventListener('click',()=>{const o=menu.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');mb.setAttribute('aria-expanded',false)}));
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
// form -> mailto
const f=document.getElementById('contact-form');
f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
 ['f-name','f-biz'].forEach(id=>{const el=document.getElementById(id);const bad=!el.value.trim();el.setAttribute('aria-invalid',bad);if(bad)ok=false});
 const st=f.querySelector('.form-note');
 if(!ok){st.textContent='נא למלא שם ושם העסק 🙏';return}
 const d=new FormData(f);
 const body=`שם: ${d.get('name')}\nעסק: ${d.get('biz')}\nטלפון: ${d.get('phone')||'-'}\n\n${d.get('msg')||''}`;
 location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('בקשה לדמו חינם — '+d.get('biz'))}&body=${encodeURIComponent(body)}`;
 st.innerHTML='נפתחת תוכנת המייל… אם לא נפתחה, כתבו ל־<a href="mailto:'+EMAIL+'">'+EMAIL+'</a>';
});
// particles
const c=document.getElementById('bg'),x=c.getContext('2d');let w,h,p=[];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function size(){w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;const n=Math.min(90,Math.floor(innerWidth*innerHeight/16000));
 p=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35*devicePixelRatio,vy:(Math.random()-.5)*.35*devicePixelRatio}))}
function draw(){x.clearRect(0,0,w,h);const L=130*devicePixelRatio;
 for(let i=0;i<p.length;i++){const a=p[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1;
  x.fillStyle='rgba(165,180,252,.7)';x.beginPath();x.arc(a.x,a.y,1.4*devicePixelRatio,0,7);x.fill();
  for(let j=i+1;j<p.length;j++){const b=p[j],dx=a.x-b.x,dy=a.y-b.y,dd=dx*dx+dy*dy;if(dd<L*L){x.strokeStyle=`rgba(129,140,248,${.18*(1-Math.sqrt(dd)/L)})`;x.lineWidth=devicePixelRatio;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}}
 if(!reduce)requestAnimationFrame(draw)}
addEventListener('resize',size);size();draw();
})();
