/* Trial password for the lecture pages. Change the password: set PASS_HASH to gate.hash('new password')
   (run it in the browser console on any page that loads this file). A student who enters it once stays
   unlocked on that device. Note: this keeps casual visitors out; it is not real security on a public repo. */
(function(){
  const PASS_HASH = '1ba05a9a';
  const KEY = 'ged102-trial-pass';
  const hash = s => { let h = 0x811c9dc5; for (const c of String(s).trim()) { h ^= c.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
  window.gate = { hash };
  let ok = false; try { ok = localStorage.getItem(KEY) === PASS_HASH; } catch (e) {}
  if (ok) return;
  const st = document.createElement('style');
  st.textContent = `html.gated body>*:not(#gate){display:none!important}
#gate{position:fixed;inset:0;display:grid;place-items:center;padding:24px max(16px,env(safe-area-inset-left,0px));background:var(--bg,#F4F5F7);z-index:9999;font-family:"Schibsted Grotesk",system-ui,sans-serif;color:var(--ink,#1B1F24)}
#gate form{width:min(420px,100%);display:grid;gap:12px;background:var(--surface,#fff);border:1px solid var(--line,#DDE0E3);border-radius:14px;padding:24px}
#gate h1{margin:0;font-size:1.4rem}#gate p{margin:0;color:var(--muted,#5E6670);font-size:.95rem}
#gate input{font:inherit;padding:10px 12px;border:1px solid var(--line,#DDE0E3);border-radius:8px;background:transparent;color:inherit}
#gate button{font:inherit;font-weight:700;padding:10px 14px;border:0;border-radius:8px;background:#8C2B2B;color:#fff;cursor:pointer}
#gate .err{color:#B4362F;min-height:1.2em}#gate a{color:inherit;font-size:.9rem}`;
  document.documentElement.classList.add('gated');
  document.head.appendChild(st);
  const show = () => {
    const g = document.createElement('div'); g.id = 'gate';
    g.innerHTML = `<form><h1>GED 102 lectures</h1><p>The lectures are in a trial. Enter the class password your professor gave you.</p>
      <input type="password" id="gate-pw" autocomplete="current-password" aria-label="Class password" placeholder="Class password" required>
      <button type="submit">Open lectures</button><span class="err" aria-live="polite"></span><a href="index.html">← Back to the course page</a></form>`;
    document.body.prepend(g);
    const f = g.querySelector('form'), pw = g.querySelector('#gate-pw'), err = g.querySelector('.err');
    pw.focus();
    f.addEventListener('submit', e => { e.preventDefault();
      if (hash(pw.value) === PASS_HASH) { try { localStorage.setItem(KEY, PASS_HASH); } catch (x) {} g.remove(); document.documentElement.classList.remove('gated'); window.dispatchEvent(new Event('resize')); }
      else { err.textContent = 'That password is not right. Check with your professor.'; pw.select(); } });
  };
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
