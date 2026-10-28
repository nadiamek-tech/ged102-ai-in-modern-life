/* Shared helpers for the course system pages (home, lectures, labs, exams). Needs course-data.js and course.js. */
(function(){
  const C = window.COURSE;
  const esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fill = s => String(s)
    .replace('{email}', C.email ? `<a href="mailto:${C.email}">${C.email}</a>` : 'the professor (email address coming soon)')
    .replace('{hours}', C.hours || 'Office hours will be posted soon')
    .replace('{office}', C.office || 'the professor’s office');
  const btn = (url, label, cls='btn', soon='coming soon') => url
    ? `<a class="${cls}" href="${url}"${/^https?:|^mailto:/.test(url)?' target="_blank" rel="noopener"':''}>${label}</a>`
    : `<span class="${cls} soon" aria-disabled="true" title="Link ${soon}">${label}<small>${soon}</small></span>`;
  const DAY = 864e5;
  const weekStart = n => { if(!C.start) return null; const d=new Date(C.start+'T00:00:00'); return new Date(d.getTime()+(n-1)*7*DAY); };
  const fmt = (d, o={day:'numeric',month:'short'}) => d.toLocaleDateString('en-GB', o);
  const weekDates = n => { const s=weekStart(n); if(!s) return ''; return fmt(s)+' – '+fmt(new Date(s.getTime()+4*DAY)); };
  const dueText = a => a.due ? new Date(a.due.replace(' ','T')).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : `Week ${a.week}${C.start?' · '+weekDates(a.week):''} · date to be announced`;

  /* Stanford-style header band + flat tab menu, shared by every course-system page */
  const TABS=[['index.html','Home'],['lectures.html','Lectures'],['labs.html','Labs'],['syllabus.html','Syllabus'],['schedule.html','Schedule'],['assignments.html','Assignments'],['exams.html','Exams'],['credentials.html','Credentials'],['staff.html','Staff &amp; help']];
  function top(active){
    const el=document.createElement('header'); el.className='sx-head';
    el.innerHTML=`<div class="sx-band"><div class="sx-in"><div><a class="sx-title" href="index.html">${esc(C.code)}: ${esc(C.title)}</a><p>Instructor: ${esc(C.instructor)}</p></div>
      <div class="sx-term"><span>${esc(C.term)} · 3 credit hours</span><button type="button" class="sx-theme" id="theme" title="Switch light or dark">◐ Theme</button></div></div></div>
      <nav class="sx-tabs" aria-label="Course"><div class="sx-in">${TABS.map(([h,t])=>`<a href="${h}"${h===active?' aria-current="page"':''}>${t}</a>`).join('')}</div></nav>`;
    document.body.prepend(el);
    el.querySelector('#theme').addEventListener('click',()=>window.GED102Theme&&GED102Theme.toggle());
    const cur=el.querySelector('[aria-current="page"]'); if(cur&&cur.scrollIntoView&&innerWidth<760) cur.scrollIntoView({block:'nearest',inline:'center'});
  }

  function rubric(a){
    if(!a.rubric) return '';
    return `<div class="scroll"><table class="rubric"><thead><tr><th>Performance indicator</th><th>Unsatisfactory<br>&lt; 40</th><th>Needs improvement<br>40–60</th><th>Meets expectations<br>60–80</th><th>Exceeds expectations<br>80–100</th></tr></thead><tbody>${a.rubric.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function detail(a){
    return `<span class="eyebrow">${esc(a.type)} · ${a.weight}% · CLO ${a.clo}</span><h3>${esc(a.name)}</h3>
      <dl class="facts"><div><dt>When</dt><dd>${esc(dueText(a))}</dd></div><div><dt>Covers</dt><dd>${esc(a.covers)}</dd></div><div><dt>Type</dt><dd>${esc(a.type)}</dd></div><div><dt>Weight</dt><dd>${a.weight}% of the course grade</dd></div></dl>
      <p>${esc(a.brief)}</p>${rubric(a)}
      ${a.exam?`<div class="row"><a class="btn" href="exams.html#${a.id}">Exam details →</a>${a.id==='mid'?'<a class="btn ghost" href="review.html">Midterm review →</a>':''}</div>`
        :`<p class="mono note">Submitted through Turnitin on Moodle · maximum similarity index 20%.</p><div class="row">${btn(a.submit,'Submit on Moodle ↗','btn','link coming soon')}</div>`}`;
  }

  let dlg=null;
  function open(id){
    const a=C.assess.find(x=>x.id===id); if(!a) return;
    if(!dlg){ dlg=document.createElement('dialog'); dlg.className='hub-dlg'; document.body.appendChild(dlg);
      dlg.addEventListener('click',e=>{ if(e.target===dlg) dlg.close(); }); }
    dlg.innerHTML=`<button type="button" class="pill dlg-x" aria-label="Close">✕ Close</button>${detail(a)}`;
    dlg.querySelector('.dlg-x').addEventListener('click',()=>dlg.close());
    dlg.showModal();
  }

  window.Hub = { C, esc, fill, btn, weekDates, dueText, top, detail, rubric, open };
})();
