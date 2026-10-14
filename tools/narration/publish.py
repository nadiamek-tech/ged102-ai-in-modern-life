import json, os, hashlib, shutil, subprocess, sys
HERE=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,HERE); from normtext import norm
REPO=os.path.dirname(os.path.dirname(HERE)); SRC=REPO  # clips are generated straight into the repo
data=json.load(open(os.path.join(HERE,'narration.json')))
pages={}; ready=[]
for page,scenes in data.items():
    sc=[]; ok=True
    for si,paras in enumerate(scenes):
        files=[]
        for pi,t in enumerate(paras):
            name=f'{page}/s{si:02d}-p{pi}-{hashlib.sha1(norm(t).encode()).hexdigest()[:10]}.mp3'
            if not os.path.exists(f'{SRC}/audio/{name}'): ok=False
            files.append(name)
        sc.append(files)
    if ok: pages[page]=sc; ready.append(page)
json.dump({'voice':'af_heart','engine':'Kokoro v1.0','pages':pages},open(f'{SRC}/audio/manifest.json','w'))
# remove clips no longer used by any ready page
keep={f for p in ready for s in pages[p] for f in s}
for p in ready:
    for f in os.listdir(f'{REPO}/audio/{p}'):
        if f'{p}/{f}' not in keep: os.remove(f'{REPO}/audio/{p}/{f}')
print('ready:',ready)
if len(sys.argv)>1 and sys.argv[1]=='push':
    g=lambda *a: subprocess.run(['git','-C',REPO,*a],capture_output=True,text=True)
    g('add','-A')
    if g('diff','--cached','--quiet').returncode:
        msg=f"Add natural Kokoro narration ({', '.join(ready)})\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_018oASRCnf534NfRmZexCRKn"
        print(g('-c','user.name=Nadia Mekhfi','-c','user.email=mkf.nadia@gmail.com','commit','-q','-m',msg).stderr)
        r=g('push','-q','origin','main'); print('push rc',r.returncode,r.stderr[-300:])
    else: print('nothing new')
