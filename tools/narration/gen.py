import json, os, re, sys, subprocess, hashlib, time
import soundfile as sf
from kokoro_onnx import Kokoro
SRC=sys.argv[1]; OUT=sys.argv[2]; VOICE='af_heart'
data=json.load(open(SRC)); k=Kokoro('/home/claude/kokoro/kokoro-v1.0.int8.onnx','/home/claude/kokoro/voices-v1.0.bin')
def norm(t):
    t=re.sub(r'^Pause and think\s*','Pause and think. ',t)
    t=re.sub(r'^(In plain words|Simple example|Remember for the exam|Risks and ethics)\s*\n',r'\1. ',t)
    t=re.sub(r'AED\s?([\d,]+)(?:\s?[–-]\s?([\d,]+))?',lambda m:(m.group(1)+(' to '+m.group(2) if m.group(2) else ''))+' dirhams',t)
    t=re.sub(r'US\$\s?([\d,.]+)\s?million',r'\1 million US dollars',t)
    for a,b in [('→',' to '),('⊂',' is part of '),('≈','about '),('×',' times '),('·',', '),('σ',' sigma'),('e.g.','for example'),('i.e.','that is'),(' vs ',' versus '),(' vs. ',' versus '),('…','.'),('%',' percent'),('10^',' ten to the power ')]:
        t=t.replace(a,b)
    t=re.sub(r'\s*\n+\s*','. ',t); t=re.sub(r'\.\s*\.',' .',t); t=re.sub(r'\s{2,}',' ',t)
    return t.strip()
manifest={}; done=0; total=sum(len(s) for p in data.values() for s in p); t0=time.time()
for page,scenes in data.items():
    manifest[page]=[]
    os.makedirs(f'{OUT}/{page}',exist_ok=True)
    for si,paras in enumerate(scenes):
        files=[]
        for pi,text in enumerate(paras):
            n=norm(text); h=hashlib.sha1(n.encode()).hexdigest()[:10]
            name=f'{page}/s{si:02d}-p{pi}-{h}.mp3'; path=f'{OUT}/{name}'
            if not os.path.exists(path):
                s,sr=k.create(n,voice=VOICE,speed=1.0,lang='en-us')
                sf.write('/tmp/clip.wav',s,sr)
                subprocess.run(['ffmpeg','-y','-loglevel','error','-i','/tmp/clip.wav','-ac','1','-b:a','48k',path],check=True)
            files.append(name); done+=1
            print(f'{done}/{total} {name} {time.time()-t0:.0f}s',flush=True)
        manifest[page].append(files)
json.dump({'voice':VOICE,'pages':manifest},open(f'{OUT}/manifest.json','w'))
print('DONE',flush=True)
