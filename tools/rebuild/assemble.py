"""Rebuild a week page: keep head + helper code, replace the old Lecture.mount with tools/rebuild/wN.js.
Old figures/videos referenced as FIG['nav'] / V['nav'] are copied verbatim into const FIG / const V."""
import re, sys, os
sys.path.insert(0, os.path.dirname(__file__)); import jsscan
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for w in sys.argv[1:]:
    page = os.path.join(root, f'week-0{w}.html'); src = open(page).read()
    orig = os.path.join(os.path.dirname(__file__), 'orig', f'week-0{w}.html')
    if not os.path.exists(orig): os.makedirs(os.path.dirname(orig), exist_ok=True); open(orig, 'w').write(src)
    src = open(orig).read()  # always rebuild from the pre-rebuild original
    old = {d['nav']: d for d in jsscan.scenes(src)}
    spec = open(os.path.join(os.path.dirname(__file__), f'w{w}.js')).read()
    figs = sorted(set(re.findall(r"FIG\['([^']+)'\]", spec)), key=lambda k: list(old).index(k))
    vids = sorted(set(re.findall(r"V\['([^']+)'\]", spec)), key=lambda k: list(old).index(k))
    for k in figs: assert old[k].get('fig'), (w, k)
    for k in vids: assert old[k].get('video'), (w, k)
    block = '/* ---------- figures and videos kept from the original lecture ---------- */\n'
    block += 'const FIG={\n' + ',\n'.join(f" {k!r}:{old[k]['fig']}" for k in figs) + '\n};\n'
    if vids: block += 'const V={\n' + ',\n'.join(f" {k!r}:{old[k]['video']}" for k in vids) + '\n};\n'
    a = src.index('Lecture.mount({'); b = src.index('</script>', a)
    out = src[:a] + block + '\n' + spec.strip() + '\n' + src[b:]
    open(page, 'w').write(out); print('rebuilt', page, 'figs', len(figs), 'videos', len(vids))
