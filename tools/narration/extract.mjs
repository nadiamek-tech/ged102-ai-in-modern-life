import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const b=await chromium.launch(); const out={};
for (const p of ['week-01','week-02','week-03','week-04','week-05','week-06','week-07','review']){
  const pg=await b.newPage({viewport:{width:1280,height:900}}); await pg.goto('http://localhost:8765/'+p+'.html'); await pg.waitForTimeout(300);
  const n=await pg.evaluate(()=>document.querySelectorAll('.toc li.sc').length); out[p]=[];
  for(let i=0;i<n;i++){ await pg.evaluate(i=>document.querySelectorAll('.toc li.sc button')[i].click(),i); await pg.waitForTimeout(40);
    out[p].push(await pg.evaluate(()=>[...document.querySelectorAll('.narr .para, .narr .think')].filter(e=>!e.querySelector('table')).map(e=>e.innerText))); }
  await pg.close(); }
fs.writeFileSync(new URL('./narration.json', import.meta.url),JSON.stringify(out,null,1)); await b.close();
let words=0,clips=0; for(const p in out) for(const s of out[p]) for(const t of s){ clips++; words+=t.split(/\s+/).length; }
console.log('clips',clips,'words',words,'≈ minutes of audio',Math.round(words/150));
