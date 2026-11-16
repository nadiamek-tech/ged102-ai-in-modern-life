/* Extra figure helpers for Weeks 10–15 (clickable stacks, bar charts, two-column compare). Uses Lecture.W styles. */
(function(){
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const css=document.createElement('style');
  css.textContent=`
  .stk{display:grid;gap:6px;font-family:var(--f-display)}
  .stk button{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center;text-align:left;border:1.5px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);padding:10px 14px;cursor:pointer;font:inherit;font-family:var(--f-display);margin-inline:var(--in,0)}
  .stk button b.n{font-family:var(--f-mono);font-size:.8rem;color:#fff;background:var(--c,var(--wk));border-radius:6px;padding:3px 8px;white-space:nowrap}
  .stk button[aria-pressed="true"]{border-color:var(--c,var(--wk));background:color-mix(in srgb,var(--c,var(--wk)) 10%,var(--bg))}
  .stk .det{border-left:4px solid var(--wk);background:var(--wk-soft);border-radius:0 10px 10px 0;padding:10px 14px;margin-top:6px;font-family:var(--f-display)}
  .stk .det p{margin:4px 0}
  .cmp{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;font-family:var(--f-display)}
  .cmp>div{border:1.5px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg)}
  .cmp>div:first-child{border-color:var(--good)} .cmp>div:last-child{border-color:var(--bad)}
  .cmp h4{margin:0 0 6px;font-size:1rem} .cmp ul{margin:0;padding-left:1.1em} .cmp li{margin:4px 0;font-size:.92rem}
  .tally2{display:grid;gap:8px;font-family:var(--f-display)}
  .tally2 label{display:flex;gap:10px;align-items:center;border:1px solid var(--line);border-radius:10px;padding:8px 12px;background:var(--bg);cursor:pointer}
  .tally2 input{accent-color:var(--wk);width:18px;height:18px}
  .tally2 .out{font-weight:700;font-size:1.05rem;margin-top:4px}
  @media (max-width:620px){.cmp{grid-template-columns:minmax(0,1fr)}}`;
  document.head.appendChild(css);
  const X={
    /* clickable stack: items [{n,t,d,ex,c}] ; widen:true makes a pyramid */
    stack(el,items,o={}){
      el.innerHTML=`<div class="stk">${items.map((it,i)=>`<button type="button" data-i="${i}" aria-pressed="false" style="${it.c?`--c:${it.c};`:''}${o.pyramid?`--in:${(items.length-1-i)*0}px`:''}"><b class="n">${esc(it.n)}</b><span><b>${esc(it.t)}</b></span></button>`).join('')}<div class="det" aria-live="polite"></div></div>`;
      const bs=el.querySelectorAll('button'), d=el.querySelector('.det');
      bs.forEach(b=>b.addEventListener('click',()=>{ bs.forEach(x=>x.setAttribute('aria-pressed',x===b)); const it=items[+b.dataset.i]; d.innerHTML=`<p><b>${esc(it.t)}</b></p><p>${it.d}</p>${it.ex?`<p><span class="tag">Example</span> ${it.ex}</p>`:''}`; }));
      bs[o.start||0].click();
    },
    /* horizontal bar chart: rows [[label,value,colourVar?]], unit text */
    bars(el,rows,o={}){
      const max=o.max||Math.max(...rows.map(r=>Math.abs(r[1]))), W=560, rh=40, L=170, H=rows.length*rh+30;
      el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label||'Bar chart')}">${rows.map(([t,v,c],i)=>{ const w=Math.abs(v)/max*(W-L-70), y=10+i*rh;
        return `<text x="${L-10}" y="${y+22}" text-anchor="end" font-size="13" style="fill:var(--ink)">${esc(t)}</text><rect x="${L}" y="${y+6}" width="${w.toFixed(1)}" height="24" rx="5" style="fill:${c||'var(--wk)'}"/><text x="${L+w+8}" y="${y+23}" font-size="13" font-weight="700" style="fill:var(--ink)">${esc(o.fmt?o.fmt(v):v)}</text>`; }).join('')}
        ${o.note?`<text x="${L}" y="${H-4}" font-size="11" style="fill:var(--muted)">${esc(o.note)}</text>`:''}</svg>`;
    },
    /* two-column compare: [{h,items}, {h,items}] */
    compare(el,a,b){ el.innerHTML=`<div class="cmp">${[a,b].map(x=>`<div><h4>${esc(x.h)}</h4><ul>${x.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`; },
    /* tick list that counts: items [text], verdicts [[min, text]] */
    ticks(el,items,verdicts){
      el.innerHTML=`<div class="tally2">${items.map((t,i)=>`<label><input type="checkbox" data-i="${i}">${esc(t)}</label>`).join('')}<div class="out" aria-live="polite"></div></div>`;
      const out=el.querySelector('.out'), upd=()=>{ const n=el.querySelectorAll('input:checked').length; const v=[...verdicts].reverse().find(([m])=>n>=m); out.textContent=`${n} of ${items.length} · ${v?v[1]:''}`; };
      el.querySelectorAll('input').forEach(i=>i.addEventListener('change',upd)); upd();
    }
  };
  window.WX=X;
})();
