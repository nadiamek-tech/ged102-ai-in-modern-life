/* One lecture = one page (shared add-on, same file in every course repo).
   Load after course.js and before the page script. It wraps Lecture.mount:
   - default: every scene stacked on one page, no side menu, numbered topic chips on top, progress line;
   - Learning supports "One topic at a time" / "One step at a time": one scene at a time with Previous / Next;
   - Listen appears only when the student turns on "Read aloud (AI voice)";
   - practice methods from Learning supports (guided steps, one question at a time, calm start, read aloud). */
(function(){
  if(!window.Lecture) return;
  const LS=window.LearningSupports||{on:()=>false,get:()=>null};
  const W=Lecture.W, esc=W.esc;
  const view=LS.get('view')||'page', voice=LS.on('voice');
  const css=`
body.op .toc{display:none!important}
body.op .shell{grid-template-columns:minmax(0,1fr)!important;max-width:1180px}
body.op-page .stage>.pager,body.op-page .kbd{display:none}
.op-sec{border-top:1px solid var(--line);padding:30px 0 6px;scroll-margin-top:84px}
.op-sec:first-child{border-top:0;padding-top:6px}
.op-head{padding:14px 0 8px}
.op-head h1{font-family:var(--f-display);font-size:clamp(1.9rem,4.6vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1.04;margin:6px 0}
.op-head .meta{font-family:var(--f-display);color:var(--muted);font-size:.92rem}
.op-chips{display:flex;gap:6px;overflow-x:auto;flex:1;min-width:0;scrollbar-width:thin;padding:2px 0}
.op-chips a{flex:none;display:inline-flex;gap:6px;align-items:center;font-family:var(--f-display);font-size:.82rem;text-decoration:none;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:5px 11px;background:var(--surface);white-space:nowrap}
.op-chips a span{font-family:var(--f-mono);font-size:.7rem}
.op-chips a.on{color:var(--on-wk,#fff);background:var(--wk);border-color:var(--wk)}
body.op .bar-in{flex-wrap:nowrap}
body.op .bar .seg,body.op .bar .seg-label,body.op #cont{display:none!important}
body.op-novoice #listen{display:none!important}
.prac .qb{display:flex;gap:6px;flex:none}
.prac .spk{padding:4px 9px}
.calm-start{border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:10px 12px;font-family:var(--f-display);font-size:.92rem}
.calm-start summary{cursor:pointer;font-weight:700}
.calm-start textarea{width:100%;min-height:70px;border:1px solid var(--line);border-radius:8px;padding:8px;font:inherit;background:var(--bg);color:var(--ink)}
.calm-start .re{color:var(--muted)}
.prac .pnav{display:flex;align-items:center;justify-content:space-between;gap:8px;font-family:var(--f-display)}
.prac .pnav .pc{font-weight:700}
.prac .selfmon{display:grid;gap:4px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--line);font-size:.86rem;color:var(--muted)}
.prac .selfmon label{display:flex;gap:8px;align-items:center;color:var(--ink)}
.guide{margin-top:8px}.gsteps{margin:0;padding-left:22px;display:grid;gap:6px}
.gsteps>li{display:list-item}.gsteps>li.todo,.gsteps>li.done{color:var(--muted)}
.gsteps>li>b{color:inherit}.gsteps>li.cur>b{color:var(--wk)}.gsteps>li.done>b::after{content:" ✓";color:var(--good)}
.wsteps{display:grid;gap:6px;margin-top:6px}.wsteps .ws{display:block;border-left:3px solid var(--wk);padding:4px 10px;background:var(--wk-soft);border-radius:4px}
.wsteps .ws b{display:inline;color:var(--ink);font-size:inherit}
.gbtn{margin-top:8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}.gok{color:var(--good);font-weight:700}
.support-note{max-width:1180px;margin:0 auto;padding:14px 20px 90px;border-top:1px solid var(--line);font-family:var(--f-display);font-size:.84rem;color:var(--muted);text-align:center}
@media (max-width:620px){body.op .bar-in{flex-wrap:wrap}.op-chips{order:3;flex-basis:100%}}
/* ---- scene types: each kind of block looks different ---- */
:root{--ty-read:#5E6670;--ty-act:#C2410C;--ty-try:#2D6A4F;--ty-case:#1D4ED8;--ty-watch:#7C3AED;--ty-nerd:#A16207;--ty-prac:#9D174D}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--ty-read:#A2AAB3;--ty-act:#FB923C;--ty-try:#6EE7A8;--ty-case:#93B4FF;--ty-watch:#C4B5FD;--ty-nerd:#FACC15;--ty-prac:#F9A8D4}}
:root[data-theme="dark"]{--ty-read:#A2AAB3;--ty-act:#FB923C;--ty-try:#6EE7A8;--ty-case:#93B4FF;--ty-watch:#C4B5FD;--ty-nerd:#FACC15;--ty-prac:#F9A8D4}
.op-sec{--ty:var(--ty-read)}
.op-sec[data-type="activity"]{--ty:var(--ty-act)} .op-sec[data-type="try"]{--ty:var(--ty-try)} .op-sec[data-type="case"]{--ty:var(--ty-case)}
.op-sec[data-type="watch"]{--ty:var(--ty-watch)} .op-sec[data-type="nerd"]{--ty:var(--ty-nerd)} .op-sec[data-type="practise"]{--ty:var(--ty-prac)}
.ty-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--ty);border:1.5px solid var(--ty);border-radius:999px;padding:4px 12px 4px 8px;margin-bottom:6px}
.ty-badge i{width:18px;height:18px;border-radius:50%;background:var(--ty);color:var(--bg);display:inline-grid;place-items:center;font-style:normal;font-size:.68rem;font-family:var(--f-display)}
.ty-badge small{font-family:var(--f-display);text-transform:none;letter-spacing:0;font-weight:400;color:var(--muted);font-size:.78rem}
.op-sec[data-type]:not([data-type="reading"]){border:0;border-left:6px solid var(--ty);border-radius:0 18px 18px 0;padding:22px 22px 18px;margin:22px 0;background:color-mix(in srgb,var(--ty) 7%,var(--bg))}
.op-sec[data-type="activity"]{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--ty) 9%,var(--bg)) 0 14px,color-mix(in srgb,var(--ty) 5%,var(--bg)) 14px 28px)}
.op-sec[data-type="activity"] .scene-head h2::before{content:"Your turn · ";color:var(--ty)}
.op-sec[data-type="try"] .scene-head h2::before{content:"Try it · ";color:var(--ty)}
.op-legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 0 4px;font-family:var(--f-display);font-size:.82rem;color:var(--muted)}
.op-legend span{display:inline-flex;align-items:center;gap:6px}.op-legend b{width:10px;height:10px;border-radius:3px;display:inline-block}
/* ---- left lecture menu ---- */
.op-grid{display:grid;grid-template-columns:236px minmax(0,1fr);gap:32px;align-items:start}
.op-side{position:sticky;top:76px;max-height:calc(100vh - 92px);overflow:auto;font-family:var(--f-display);padding:6px 4px 20px 0;border-right:1px solid var(--line);scrollbar-width:thin}
.op-side h4{font-family:var(--f-mono);font-size:.64rem;letter-spacing:.09em;text-transform:uppercase;color:var(--wk);margin:16px 0 6px;font-weight:600}
.op-side h4:first-child{margin-top:0}
.op-side a{display:grid;grid-template-columns:10px minmax(0,1fr);gap:9px;align-items:center;text-decoration:none;color:var(--muted);font-size:.88rem;padding:6px 8px;border-radius:8px;line-height:1.25}
.op-side a b{width:9px;height:9px;border-radius:50%;background:var(--t,var(--ty-read))}
.op-side a:hover{background:var(--sunk);color:var(--ink)}
.op-side a.on{background:var(--wk-soft);color:var(--ink);font-weight:700}
@media (min-width:1000px){body.op-page .op-chips{display:none}}
@media (max-width:999px){.op-grid{grid-template-columns:minmax(0,1fr)}.op-side{display:none}}
@media (max-width:620px){.op-sec[data-type]:not([data-type="reading"]){padding:16px 14px;margin:16px -6px}}`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  /* practice methods (same as MTH 105), wording for text-based courses */
  const STAGES=window.GUIDE_STAGES||[
    ['Read','What is the question asking? Underline the key words.'],
    ['Plan','Which concept, model or framework from the lecture applies?'],
    ['Answer','Write your answer in your own words, with one example.'],
    ['Compare','Open the model answer one point at a time. Which points did you have?'],
    ['Check','Did you answer every part of the question, with an example?']];
  const say=t=>{ if(!window.speechSynthesis) return; speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(t)); };
  const spk=`<button type="button" class="btn ghost spk" title="Read aloud" aria-label="Read aloud"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg></button>`;
  const basePractice=W.practice;
  W.practice=function(el,items,opts={}){
    const guided=LS.on('guided'), single=LS.on('single'), calm=LS.on('calmstart'), aloud=voice;
    if(!guided&&!single&&!calm&&!aloud) return basePractice.call(W,el,items,opts);
    const label=opts.label||'Show hint', prefix=opts.prefix===undefined?'<b>A strong answer includes:</b> ':opts.prefix;
    el.innerHTML=`<div class="prac${single?' single':''}">${calm?`<details class="calm-start" open><summary>Before you start · 2 minutes</summary><p>Write down any worries about this topic. Nobody sees it and it is not saved. Writing worries down before a test frees working memory (Ramirez &amp; Beilock, 2011).</p><textarea rows="3" aria-label="Your worries (not saved)"></textarea><p class="re">A faster heartbeat means your body is getting ready to perform. This is practice, not a test.</p><button type="button" class="btn calm-go">Start</button></details>`:''}${single?`<div class="pnav"><button type="button" class="btn ghost pv">← Previous</button><span class="pc"></span><button type="button" class="btn ghost nx">Next →</button></div>`:''}${items.map((it,i)=>`<div class="pq"><div class="row"><span class="qt">${opts.numbered===false?'':`<b>Q${i+1}</b> `}${it.type?`<span class="tag">${it.type}</span> `:''}${it.q}</span><span class="qb">${aloud?spk:''}${guided?'':`<button type="button" class="btn ghost show">${calm?'Compare with the model answer':label}</button>`}</span></div>${guided?'<div class="guide"></div>':''}<div class="hint" hidden>${prefix}${it.hint}</div>${single?`<div class="selfmon"><span>Before moving on:</span><label><input type="checkbox"> I answered what was asked</label><label><input type="checkbox"> I used a term or model from the lecture</label><label><input type="checkbox"> I gave an example</label></div>`:''}</div>`).join('')}</div>`;
    el.querySelectorAll('.pq .show').forEach(b=>b.addEventListener('click',()=>{ const h=b.closest('.pq').querySelector('.hint'); h.hidden=!h.hidden; b.textContent=h.hidden?(calm?'Compare with the model answer':label):'Hide'; }));
    el.querySelectorAll('.pq .spk').forEach(b=>b.addEventListener('click',()=>say(b.closest('.pq').querySelector('.qt').innerText)));
    const cg=el.querySelector('.calm-go'); if(cg) cg.addEventListener('click',()=>{ const d=el.querySelector('.calm-start'); d.querySelector('textarea').value=''; d.open=false; });
    if(guided) el.querySelectorAll('.pq').forEach(pq=>{
      const tmp=document.createElement('div'); tmp.innerHTML=pq.querySelector('.hint').innerHTML;
      const blocks=[...tmp.children].filter(c=>/^(DIV|P|UL|OL|TABLE)$/.test(c.tagName));
      let parts=blocks.length>1?blocks.map(c=>c.outerHTML):(tmp.querySelector('ul,ol')?[...tmp.querySelectorAll('li')].map(l=>l.innerHTML):tmp.innerHTML.split(/(?<=[.;:])\s+(?=[A-Z<])/).filter(x=>x.trim()));
      if(!parts.length) parts=[tmp.innerHTML];
      const g=pq.querySelector('.guide'); let s=0,k=0;
      const draw=()=>{ g.innerHTML=`<ol class="gsteps">${STAGES.map(([t,d],i)=>`<li class="${i<s?'done':i===s?'cur':'todo'}"><b>${t}</b>${i<=s?` <span>${d}</span>`:''}${i===3&&s>=3?`<div class="wsteps">${parts.slice(0,k).map(x=>`<div class="ws">${x}</div>`).join('')}</div>`:''}</li>`).join('')}</ol><div class="gbtn">${s<3?'<button type="button" class="btn g-next">Done: next stage →</button>':s===3?(k<parts.length?`<button type="button" class="btn g-step">Show point ${k+1} of ${parts.length}</button>`:'<button type="button" class="btn g-next">Done: check →</button>'):'<span class="gok">Finished. Try the next question without the steps.</span>'}${aloud?' '+spk:''}</div>`;
        const n=g.querySelector('.g-next'); if(n) n.onclick=()=>{ s++; draw(); };
        const p=g.querySelector('.g-step'); if(p) p.onclick=()=>{ k++; draw(); };
        const sp=g.querySelector('.spk'); if(sp) sp.onclick=()=>{ const c=g.querySelector('li.cur')||g.querySelector('li:last-child'); say(c.innerText); }; };
      draw(); });
    if(single){ const qs=[...el.querySelectorAll('.pq')]; let c=0; const pc=el.querySelector('.pc');
      const show=()=>{ qs.forEach((q,i)=>q.hidden=i!==c); pc.textContent=`Question ${c+1} of ${qs.length}`; el.querySelector('.pv').disabled=c===0; el.querySelector('.nx').disabled=c===qs.length-1; };
      el.querySelector('.pv').onclick=()=>{ if(c>0){ c--; show(); } }; el.querySelector('.nx').onclick=()=>{ if(c<qs.length-1){ c++; show(); } }; show(); }
  };

  const mount=Lecture.mount;
  Lecture.mount=function(cfg){
    document.body.classList.add('op'); if(!voice) document.body.classList.add('op-novoice');
    try{ localStorage.setItem('ged102-cont','1'); }catch(e){}
    const hash=location.hash;
    mount.call(Lecture,cfg);
    if(!document.querySelector('.support-note')) document.body.appendChild(Object.assign(document.createElement('p'),{className:'support-note',textContent:'This website is interactive course support. It does not replace classes, attendance or class activities.'}));
    if(view!=='page') return;
    document.body.classList.add('op-page');
    const stage=document.getElementById('stage'), toc=document.querySelector('.toc'), btns=[...toc.querySelectorAll('ol li button')];
    const page=document.createElement('div'); page.className='op-page';
    const head=document.createElement('section'); head.className='op-head';
    head.innerHTML=[...toc.children].filter(x=>x.tagName!=='OL'&&!x.classList.contains('toclogo')).map(x=>x.outerHTML).join('');
    page.appendChild(head);
    const navs=[];
    btns.forEach((b,i)=>{ b.click();
      const sec=document.createElement('section'); sec.className='op-sec'; sec.id='s'+i;
      [...stage.childNodes].forEach(n=>{ if(!(n.classList&&n.classList.contains('pager'))) sec.appendChild(n); });
      const eb=sec.querySelector('.scene-head .eyebrow'); if(eb) eb.remove();
      navs.push((b.querySelector('.t')&&b.querySelector('.t').childNodes[0].textContent)||('Part '+(i+1)));
      page.appendChild(sec); });
    /* scene types */
    const TY={reading:['Read','R','Concept to understand'],activity:['Class activity','A','Do it in class, with others'],try:['Try a tool','T','Hands-on lab'],case:['Real case','C','From the news or research'],watch:['Watch','W','Video'],nerd:['AI Nerd · bonus','★','Optional credential'],practise:['Practise','P','Check what you remember']};
    const SC=cfg.scenes||[];
    const typeOf=s=>{ if(!s) return 'reading'; if(s.type) return s.type; if(s.kind==='bonus') return 'nerd'; if(s.part===4) return 'practise';
      const src=s.fig?[s.fig.build?String(s.fig.build):'',s.fig.flow?'flow':'',s.fig.html?'html':''].join(' '):'';
      if(/W\.tool/.test(src)||s.part===2) return /W\.poll|tally|beat62/.test(src)||/class game|debate/i.test(s.nav)?'activity':'try';
      if(/W\.news/.test(src)) return 'case';
      if(/W\.video/.test(src)) return 'watch';
      if(/W\.poll|W\.order|W\.sort|W\.practice|tally|beat62/.test(src)||/debate|game|vote|your turn/i.test(s.nav+' '+s.title)) return 'activity';
      if(s.part===3||/^case/i.test(s.nav||'')) return 'case';
      return 'reading'; };
    const types=[...page.querySelectorAll('.op-sec')].map((sec,i)=>{ const t=typeOf(SC[i]); sec.dataset.type=t;
      const b=document.createElement('div'); b.className='ty-badge'; b.innerHTML=`<i>${TY[t][1]}</i>${TY[t][0]}<small>· ${TY[t][2]}</small>`;
      const h=sec.querySelector('.scene-head'); if(h) h.before(b); else sec.prepend(b); return t; });
    const lg=document.createElement('div'); lg.className='op-legend';
    lg.innerHTML=[...new Set(types)].map(t=>`<span><b style="background:var(--ty-${{reading:'read',activity:'act',try:'try',case:'case',watch:'watch',nerd:'nerd',practise:'prac'}[t]})"></b>${TY[t][0]}</span>`).join('');
    head.appendChild(lg);
    /* left menu grouped by part */
    const PARTS=cfg.parts||{1:'Part 1 · Lecture',2:'Part 2 · Tools lab',3:'Part 3 · Case studies & AI Nerd',4:'Practise & remember'};
    const side=document.createElement('nav'); side.className='op-side'; side.setAttribute('aria-label','Lecture contents');
    let lastP=null; side.innerHTML=navs.map((t,i)=>{ const p=SC[i]&&SC[i].part; const hd=p&&p!==lastP?`<h4>${esc(PARTS[p]||'')}</h4>`:''; lastP=p||lastP;
      const v={reading:'read',activity:'act',try:'try',case:'case',watch:'watch',nerd:'nerd',practise:'prac'}[types[i]];
      return `${hd}<a href="#s${i}" data-i="${i}" style="--t:var(--ty-${v})"><b></b><span>${esc(t)}</span></a>`; }).join('');
    const grid=document.createElement('div'); grid.className='op-grid'; const main=document.createElement('div'); main.style.minWidth='0';
    [...page.childNodes].forEach(n=>main.appendChild(n)); grid.append(side,main); page.appendChild(grid);
    stage.innerHTML=''; stage.appendChild(page);
    addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft') e.stopImmediatePropagation(); },true);
    /* top chips */
    const barIn=document.querySelector('.bar .bar-in'), brand=barIn&&barIn.querySelector('.brand');
    const chips=document.createElement('nav'); chips.className='op-chips'; chips.setAttribute('aria-label','In this lecture');
    chips.innerHTML=navs.map((t,i)=>`<a href="#s${i}" data-i="${i}"><span>${i+1}</span>${esc(t)}</a>`).join('');
    if(brand) brand.after(chips);
    const secs=[...page.querySelectorAll('.op-sec')], cs=[...chips.querySelectorAll('a')];
    const sl=[...document.querySelectorAll('.op-side a')];
    const mark=i=>{ cs.forEach((c,j)=>{ c.classList.toggle('on',j===i); if(j===i&&c.scrollIntoView&&innerWidth<1000) c.scrollIntoView({block:'nearest',inline:'nearest'}); }); sl.forEach((c,j)=>c.classList.toggle('on',j===i)); };
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ const i=secs.indexOf(e.target); mark(i); try{ history.replaceState(null,'','#s'+i); }catch(x){} } }),{rootMargin:'-30% 0px -60% 0px'});
    secs.forEach(s=>io.observe(s));
    const prog=document.querySelector('.bar .progress i');
    const onScroll=()=>{ const d=document.documentElement; if(prog) prog.style.width=(d.scrollTop/((d.scrollHeight-d.clientHeight)||1)*100)+'%'; };
    addEventListener('scroll',onScroll,{passive:true});
    const m=hash.match(/^#s(\d+)$/); const t=m?secs[Math.min(+m[1],secs.length-1)]:null;
    window.scrollTo({top:0}); if(t) setTimeout(()=>t.scrollIntoView(),80); onScroll();
    /* voice in page mode: read every paragraph from where the student is, recorded audio when available */
    const old=document.getElementById('listen'); if(!old||!voice) return;
    const listen=old.cloneNode(true); old.replaceWith(listen); listen.textContent='▶ Listen';
    let rec=null, on=false, q=[], qi=0, player=null; const synth=window.speechSynthesis;
    const key=(location.pathname.split('/').pop()||'index').replace(/\.html$/,'');
    fetch('audio/manifest.json').then(r=>r.ok?r.json():null).then(mf=>{ if(mf&&mf.pages&&mf.pages[key]) rec=mf.pages[key]; }).catch(()=>{});
    const paras=()=>secs.flatMap((s,si)=>[...s.querySelectorAll('.narr .para, .narr .think')].filter(e=>!e.querySelector('table')).map((e,pi)=>({e,si,pi})));
    const clear=()=>document.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));
    const stop=()=>{ on=false; if(synth) synth.cancel(); if(player){ player.pause(); player.onended=null; player=null; } clear(); listen.textContent='▶ Listen'; listen.setAttribute('aria-pressed','false'); };
    const next=()=>{ clear(); if(!on) return; if(qi>=q.length){ stop(); return; }
      const {e,si,pi}=q[qi++]; e.classList.add('speaking'); e.scrollIntoView({block:'center',behavior:'smooth'});
      const f=rec&&rec[si]&&rec[si].length===secs[si].querySelectorAll('.narr .para, .narr .think').length?rec[si][pi]:null;
      if(f){ player=new Audio('audio/'+f); player.onended=()=>{ if(on) next(); }; player.play().catch(()=>{ player=null; speakS(e); }); return; }
      speakS(e); };
    const speakS=e=>{ if(!synth){ next(); return; } const u=new SpeechSynthesisUtterance(e.innerText); u.onend=()=>{ if(on) next(); }; u.onerror=()=>{ if(on) next(); }; synth.cancel(); setTimeout(()=>synth.speak(u),60); window.__opU=u; };
    listen.addEventListener('click',()=>{ if(on){ stop(); return; } on=true; listen.textContent='❚❚ Pause'; listen.setAttribute('aria-pressed','true');
      q=paras(); qi=Math.max(0,q.findIndex(x=>x.e.getBoundingClientRect().bottom>innerHeight*0.2)); next(); });
  };
})();
