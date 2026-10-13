import re
def norm(t):
    t=re.sub(r'^Pause and think\s*','Pause and think. ',t)
    t=re.sub(r'^(In plain words|Simple example|Remember for the exam|Risks and ethics)\s*\n',r'\1. ',t)
    t=re.sub(r'AED\s?([\d,]+)(?:\s?[–-]\s?([\d,]+))?',lambda m:(m.group(1)+(' to '+m.group(2) if m.group(2) else ''))+' dirhams',t)
    t=re.sub(r'US\$\s?([\d,.]+)\s?million',r'\1 million US dollars',t)
    for a,b in [('→',' to '),('⊂',' is part of '),('≈','about '),('×',' times '),('·',', '),('σ',' sigma'),('e.g.','for example'),('i.e.','that is'),(' vs ',' versus '),(' vs. ',' versus '),('…','.'),('%',' percent'),('10^',' ten to the power ')]:
        t=t.replace(a,b)
    t=re.sub(r'\s*\n+\s*','. ',t); t=re.sub(r'\.\s*\.',' .',t); t=re.sub(r'\s{2,}',' ',t)
    return t.strip()
