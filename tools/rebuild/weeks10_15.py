"""Generate week-10.html … week-15.html from the specs below (same engine as Weeks 1–9)."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V = '202611161310'
HEAD = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Schibsted+Grotesk:wght@400;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
<link rel="stylesheet" href="assets/course.css?v={v}">
<style>:root{{--wk:{c};--wk-soft:{cs};--wk-d:{cd};--wk-soft-d:{csd}}}</style>
</head>
<body>
''' + ''.join(f'<script src="assets/{a}.js?v={{v}}"></script>\n' for a in ['professor','course-data','credentials','supports','course','kb','search-index','assistant','onepage','w-extra']) + '<script>\nconst {{W}} = Lecture;\n'
TAIL = '</script>\n</body>\n</html>\n'

def tool(name, by, url, steps, account=None):
    st = ','.join("{t:%s,s:%s,d:%s}" % tuple(js(x) for x in s) for s in steps)
    acc = f",account:{js(account)}" if account else ''
    return f"{{label:`Tools lab`, build:el=>W.tool(el,{{name:{js(name)},by:{js(by)},url:{js(url)}{acc},steps:[{st}]}})}}"
def news(outlet, date, head, dek, url):
    return f"{{label:`Real case`, build:el=>W.news(el,{{outlet:{js(outlet)},date:{js(date)},head:{js(head)},dek:{js(dek)},url:{js(url)}}})}}"
def js(s): return '`' + s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') + '`'
def poll(q, opts, reveals, label='Vote'):
    return f"{{label:`{label}`, build:el=>W.poll(el,{{q:{js(q)},opts:[{','.join(js(o) for o in opts)}],reveal:i=>[{','.join(js(r) for r in reveals)}][i]}})}}"
def flow(label, steps):
    return f"{{label:{js(label)}, flow:[{','.join('{t:%s,s:%s,d:%s}' % tuple(js(x) for x in s) for s in steps)}]}}"
def acc(label, items):
    return f"{{label:{js(label)}, build:el=>W.accordion(el,[{','.join('{t:%s,d:%s}' % (js(t), js(d)) for t, d in items)}])}}"
def stack(label, items, start=0):
    return f"{{label:{js(label)}, build:el=>WX.stack(el,[{','.join('{n:%s,t:%s,d:%s%s%s}' % (js(n), js(t), js(d), (',ex:'+js(ex)) if ex else '', (',c:'+js(c)) if c else '') for n, t, d, ex, c in items)}],{{start:{start}}})}}"
def bars(label, rows, note='', fmt=None):
    r = ','.join('[%s,%s,%s]' % (js(t), v, js(c) if c else 'null') for t, v, c in rows)
    f = f",fmt:{fmt}" if fmt else ''
    return f"{{label:{js(label)}, build:el=>WX.bars(el,[{r}],{{label:{js(label)},note:{js(note)}{f}}})}}"
def compare(label, a, b):
    side = lambda x: "{h:%s,items:[%s]}" % (js(x[0]), ','.join(js(i) for i in x[1]))
    return f"{{label:{js(label)}, build:el=>WX.compare(el,{side(a)},{side(b)})}}"
def ticks(label, items, verdicts):
    return f"{{label:{js(label)}, build:el=>WX.ticks(el,[{','.join(js(i) for i in items)}],[{','.join('[%d,%s]' % (m, js(t)) for m, t in verdicts)}])}}"
def order(label, items):
    return f"{{label:{js(label)}, build:el=>W.order(el,[{','.join('{y:%d,t:%s}' % (y, js(t)) for y, t in items)}])}}"
def practise(narr, center, branches, qs):
    br = ','.join("{t:%s,items:[%s]}" % (js(t), ','.join(js(i) for i in its)) for t, its in branches)
    qq = ','.join("{q:%s,o:[%s],a:%d,why:%s}" % (js(q), ','.join(js(o) for o in os_), a, js(w)) for q, os_, a, w in qs)
    return ("{ part:4, nav:'Practise & remember', title:'Practise & remember', full:true,\n    narration:[%s],\n"
            "    fig:{label:`The week in one map · then six questions`, mindmap:{center:%s,branches:[%s]}, build:el=>W.quiz(el,[%s])} }") % (js(narr), js(center), br, qq)
def scene(part, nav, title, narr, fig=None, src=None, extra=''):
    s = f"{{ part:{part}, nav:{js(nav)}, title:{js(title)},{extra}\n    narration:[{js(narr)}]"
    if src: s += f",\n    src:{js(src)}"
    if fig: s += f",\n    fig:{fig}"
    return s + ' }'
def nerd(narr):
    return f"{{ part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',\n    narration:[{js(narr)}] }}"

COP = 'https://copilot.microsoft.com/'
W = {}

# ---------------------------------------------------------------- Week 10
W[10] = dict(c='#9F1239', cs='rgba(159,18,57,.10)', cd='#FDA4AF', csd='rgba(253,164,175,.14)',
 title='Week 10 · What AI Can’t Do (Yet)', short='Week 10 · Limits, Bias and the Black Box', clo=3,
 full='What AI Can’t Do (Yet): Limits, Bias, and the "Black Box"', meta='RB e Chapters 2 and 6 · von Eschenbach (2021) · 3 hours · Course project today',
 scenes=[
  scene(1,'Today’s project','Today’s course project: AI Reality Check',
   'Today you complete the individual course project in class: 50 minutes, 10 marks. You test a real AI tool in one context and judge whether it can be trusted. Use the scenes below as your toolkit while you work.',
   "{label:`Individual · 50 minutes · 10 marks`, build:el=>{ el.innerHTML=`<div style=\"display:grid;gap:12px;font-family:var(--f-display)\"><div style=\"display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px\">${[['5 min','Name and context'],['25 min','Four tests with Copilot'],['15 min','Four analysis questions'],['5 min','Save PDF, upload to Moodle']].map(([a,b])=>`<div style=\"border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:var(--bg)\"><b style=\"color:var(--wk)\">${a}</b><br>${b}</div>`).join('')}</div><a class=\"btn\" href=\"project-10.html\" style=\"justify-self:start;font-size:1.05rem;padding:12px 20px\">Open the course project →</a></div>`; }}",
   extra=" type:'activity',"),
  scene(1,'Narrow, not general','What AI still cannot do',
   'Every system we have studied is narrow: excellent at one task and lost outside it. Today’s AI has no common sense, no understanding of cause and effect, and no awareness of what it does not know. Tick what you think AI can already do well, then compare with a classmate.',
   ticks('Can AI do this reliably today?',['Recognise faces in photos','Write a fluent essay','Know when its own answer is wrong','Explain why it made a decision','Understand a joke the way you do','Drive in any city, in any weather'],[[0,'Be careful: most of these are still hard.'],[3,'Look again: only the first two are reliable today.']])),
  scene(1,'Three challenges','Gray eminences, algocracy, automated unconsciousness',
   'RB e, Chapter 2 names three risks of handing decisions to algorithms. Gray eminences are hidden systems that steer choices behind the scenes. Algocracy is rule by algorithms instead of people. Automated unconsciousness is when we stop thinking because the system decides for us. Open each one.',
   acc('Three challenges · RB e, Chapter 2',[('Gray eminences','Hidden systems that influence decisions without being seen, such as ranking and recommendation engines that decide what news, jobs or prices you see.'),('Algocracy','Governance by algorithm: when scores and automated rules replace human judgement in schools, courts, banks or welfare offices.'),('Automated unconsciousness','When people trust the output so much that they stop questioning it, like following a GPS into a lake.')]),
   src='Cebral-Loureda, Rincón-Flores & Sanchez-Ante (2023). <em>What AI can do</em>, Chapter 2.'),
  scene(1,'Where bias comes from','Bias enters at every stage',
   'Bias is not a bug added at the end. It can enter through the data that was collected, the labels people gave it, the goal the designers chose, and the way the output is used. Play the flow and find the stage behind each case from Week 4.',
   flow('Where bias enters',[('Data','who is missing?','Groups under-represented in the training data, like darker-skinned faces in Gender Shades.'),('Labels','who decided?','Human labels carry human judgement, for example past hiring decisions.'),('Goal','what is optimised?','Optimising for clicks or cost can harm fairness.'),('Model','what is learned?','The model copies patterns, including unfair ones.'),('Use','who is affected?','A score used for a new purpose, on new people, can do new harm.')])),
  scene(1,'The black box','Why we do not trust what we cannot see',
   'A deep network can be accurate yet impossible to explain: millions of weights, no reasons. Von Eschenbach argues that trust needs transparency we can question, not only accuracy. Compare a glass-box model with a black-box model.',
   compare('Glass box or black box?',('Glass box (for example a decision tree)',['You can read the rule that decided','Easier to challenge and correct','Often less accurate on complex data']),('Black box (for example a deep network)',['Very accurate on images, speech and text','No human-readable reason','Hard to appeal, audit or fix'])),
   src='von Eschenbach, W. J. (2021). Transparency and the black box problem: Why we do not trust AI. <em>Philosophy & Technology</em>, 34, 1607–1622.'),
  scene(1,'Explainable AI','Can we open the black box?',
   'Explainable AI adds tools that show which inputs mattered most, such as heat maps on images or the top factors behind a loan decision. These help, but they explain the model only approximately. In high-stakes uses, a human must still be able to question the result.',
   flow('Making a decision explainable',[('Decision','score or label','The model outputs “loan rejected”.'),('Explain','top factors','A tool lists the inputs that pushed the score most.'),('Check','does it make sense?','A human checks if the reasons are fair and lawful.'),('Appeal','right to contest','The person affected can ask for a human review.')])),
  scene(2,'AI Incident Database','Investigate real AI failures',
   'The AI Incident Database collects thousands of real cases where AI caused harm. Search a sector you care about, open one incident, and identify the stage where the problem began: data, labels, goal, model or use.',
   tool('AI Incident Database','Responsible AI Collaborative','https://incidentdatabase.ai/',[('Search','a sector','Try “hiring”, “facial recognition”, “chatbot” or “school”.'),('Open','one incident','Read the summary and one news report.'),('Diagnose','which stage?','Data, labels, goal, model or use?'),('Share','one sentence','Tell your neighbour what should have been done differently.')])),
  scene(2,'Build a biased model','Train a model with biased data on purpose',
   'Use Teachable Machine to see bias appear in five minutes. Train “thumbs up” only with one hand position and lighting, then test it with different hands, angles and light. The model fails where the data was missing.',
   tool('Teachable Machine','Google','https://teachablemachine.withgoogle.com/train/image',[('Biased data','one condition only','Record class 1 (thumbs up) with one hand, one angle, bright light.'),('Class 2','anything else','Record “no thumb” with the same setup.'),('Test','new conditions','Use another person’s hand, a dark room, a different angle.'),('Fix','add variety','Add more varied examples and retrain. What changed?')])),
  scene(3,'Case: Dutch benefits','Case: an algorithm that flagged families unfairly',
   'In the Netherlands, a risk-scoring system used by the tax authority wrongly treated thousands of families as fraudsters when they claimed childcare benefits, and nationality was used as a risk factor. The scandal led the government to resign in 2021. It is a clear case of algocracy without human checks.',
   news('Amnesty International','25 October 2021','Dutch childcare benefit scandal an urgent wake-up call to ban racist algorithms','Amnesty’s report “Xenophobic Machines” describes how a risk-classification algorithm discriminated in the Dutch childcare benefits system.','https://www.amnesty.org/en/latest/news/2021/10/xenophobic-machines-dutch-child-benefit-scandal/')),
  scene(3,'Case: A-level grades','Case: when an algorithm graded students',
   'In 2020, exams in England were cancelled, and an algorithm estimated A-level grades from schools’ past results. Almost 40% of predicted grades were lowered, hitting students at historically weaker schools hardest. After protests, the government switched to teacher-assessed grades.',
   news('Engadget','August 2020','How the UK’s algorithm-based grading fell apart','The model adjusted teachers’ predicted grades using each school’s history, and was abandoned after a public outcry.','https://www.engadget.com/uk-algorithm-a-levels-gcse-results-143503870.html')),
  scene(3,'Debate','Debate: should a black box ever decide about people?',
   'Some say accuracy is what matters, even without explanations. Others say any decision about a person must be explainable and open to appeal. Take a side, use one case from today, then vote.',
   poll('Should an unexplainable AI be allowed to decide on loans, grades or benefits?',['Yes, if it is more accurate than humans','Only with a human who can overrule it','No, never for decisions about people'],['Then who answers when it is wrong? Think of the Dutch families.','This is the “human in the loop” position, close to most AI regulations today.','A strong position. What about medical scans, where AI can be more accurate?'])),
  nerd('Google’s Introduction to Responsible AI course explains how companies test for bias and build fairer systems, and it completes the Generative AI Fundamentals skill badge. Finish it and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. Before Week 11, read TB Chapter 13 on the ethical issues of AI.','Limits of AI',
   [('Narrow AI',['Good at one task','No common sense','Does not know what it does not know']),('Three challenges',['Gray eminences','Algocracy','Automated unconsciousness']),('Bias',['Data · labels · goal · model · use']),('Black box',['Accurate but unexplainable','Trust needs transparency','Explainable AI helps, partly']),('Cases',['Dutch childcare benefits','A-level algorithm, 2020'])],
   [('“Algocracy” means…',['AI that writes code','rule by algorithms instead of human judgement','a type of neural network','a privacy law'],1,'Decisions are handed to automated rules and scores.'),
    ('A model fails on dark-skinned faces because few were in the training set. Bias entered at the…',['data stage','use stage','appeal stage','explanation stage'],0,'Missing groups in the data is data bias.'),
    ('Why is a deep network called a black box?',['It is stored on black servers','Its decisions cannot be traced to human-readable reasons','It only works at night','It has no data'],1,'Millions of weights, no readable rule.'),
    ('“Automated unconsciousness” describes…',['a computer that sleeps','people who stop questioning automated outputs','an AI that dreams','robots replacing doctors'],1,'Over-trust leads people to stop thinking.'),
    ('Which safeguard best answers the black-box problem in high-stakes decisions?',['More data only','A human who can review and overrule, plus a right to appeal','Hiding the model','Faster computers'],1,'Human oversight and contestability.'),
    ('In the 2020 A-level case, grades were lowered mainly because…',['students cheated','the algorithm used each school’s past results','teachers refused to grade','the exams were too hard'],1,'School history pulled individual grades down.')])],
)

# ---------------------------------------------------------------- Week 11
W[11] = dict(c='#0F766E', cs='rgba(15,118,110,.10)', cd='#5EEAD4', csd='rgba(94,234,212,.14)',
 title='Week 11 · AI Ethics and Responsible AI', short='Week 11 · AI Ethics and Responsible AI', clo=3,
 full='AI Ethics and Responsible AI', meta='TB Chapter 13 · 3 hours',
 scenes=[
  scene(1,'Your rules','If you wrote the rules for AI…',
   'Before any theory, decide for yourself. Which single rule would you make every AI system in the UAE follow? Vote, then compare your choice with the principles that governments and companies actually use.',
   poll('Pick the one rule every AI must follow',['Never discriminate between people','Always explain its decisions','Always keep personal data private','A human is always responsible'],['That is fairness, the most common principle worldwide.','That is transparency, the answer to last week’s black box.','That is privacy, our topic next week.','That is accountability: someone must answer when AI causes harm.'])),
  scene(1,'Risks and benefits','Every AI brings risks and benefits together',
   'TB Chapter 13 frames AI ethics as weighing risks against benefits. The same face recognition that finds a missing child can track a protester; the same chatbot that tutors can mislead. Ethics asks who benefits, who is harmed, and who decides.',
   compare('One technology, two sides',('Benefits',['Faster diagnosis and drug discovery','Personal tutoring at scale','Safer roads and fraud detection']),('Risks',['Bias and unfair decisions','Loss of privacy and surveillance','Misinformation, deepfakes and job disruption'])),
   src='Moutinho, Cavique & Bigné (2023). <em>Philosophy of artificial intelligence and its place in society</em>, Chapter 13.'),
  scene(1,'Six principles','Six principles of responsible AI',
   'Most frameworks share the same core. Microsoft, for example, names six principles: fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability. Click each principle to see what it means in practice.',
   stack('Six principles · click each',[('1','Fairness','Treat similar people similarly; test results across groups.','A hiring model checked for equal outcomes for men and women.',None),('2','Reliability and safety','Work as intended, even in unusual situations, and fail safely.','A self-driving car that stops when it cannot see clearly.',None),('3','Privacy and security','Protect personal data and resist attacks.','A chatbot that does not store your conversations by default.',None),('4','Inclusiveness','Work for people of all abilities, languages and backgrounds.','Arabic and English support, screen-reader friendly design.',None),('5','Transparency','People know when AI is used and how it reaches decisions.','A label saying “This answer was written by AI”.',None),('6','Accountability','Named people are responsible for the system and its effects.','A bank officer who signs off on AI loan decisions.',None)])),
  scene(1,'Regulation by risk','The EU AI Act: rules by level of risk',
   'The European Union’s AI Act, in force since 2024, sorts AI by risk. Some uses are banned, high-risk uses need strict checks, limited-risk uses need transparency, and minimal-risk uses are free. Click each level.',
   stack('Four risk levels · click each',[('Banned','Unacceptable risk','Practices judged too harmful are prohibited.','Social scoring of citizens by governments.','#9F1239'),('Strict','High risk','Allowed only with risk management, data quality, human oversight and registration.','AI used in hiring, credit, education or medical devices.','#B45309'),('Label','Limited risk','Users must be told they are dealing with AI.','Chatbots and deepfakes must be disclosed.','#0E7490'),('Free','Minimal risk','No extra obligations.','Spam filters and AI in video games.','#15803D')],start=1)),
  scene(1,'UAE approach','The UAE’s charter for AI',
   'The UAE published its Charter for the Development and Use of Artificial Intelligence in 2024. It sets principles such as human wellbeing, safety, fairness, privacy, transparency and human oversight, building on the UAE’s National AI Strategy 2031.',
   news('UAE Government portal','2024','The UAE Charter for the Development and Use of Artificial Intelligence','The official summary of the UAE’s AI principles.','https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/policies/Ai/The-UAE-Charter-for-the-Development-and-Use-of-Artificial-Intelligence')),
  scene(2,'Moral Machine','Judge like a self-driving car',
   'MIT’s Moral Machine asks you to decide what a self-driving car should do when a crash cannot be avoided. Judge thirteen scenarios, then compare your results with millions of people around the world.',
   tool('Moral Machine','MIT Media Lab','https://www.moralmachine.net/',[('Start','Judge','Press “Start Judging”.'),('Decide','13 dilemmas','Choose one outcome in each scenario.'),('Results','your profile','Look at which factors mattered most to you.'),('Discuss','who should decide?','Should engineers, governments or users set these rules?')])),
  scene(2,'Measuring fairness','Explore what “fair” means with numbers',
   'Google’s PAIR Explorables show, with interactive diagrams, why a model cannot satisfy every definition of fairness at once. Move the threshold and watch how accuracy for two groups changes.',
   tool('PAIR Explorables: Measuring Fairness','Google People + AI Research','https://pair.withgoogle.com/explorables/measuring-fairness/',[('Read','the scenario','A model screens for a medical condition.'),('Move','the threshold','Watch errors for each group change.'),('Compare','two definitions','Equal accuracy or equal false alarms?'),('Conclude','one sentence','Why must people, not models, choose the fairness rule?')])),
  scene(3,'Case: Tay','Case: a chatbot that learned the worst from its users',
   'In 2016 Microsoft launched Tay, a chatbot that learned from conversations on Twitter. Within a day, users taught it to post racist and offensive messages, and Microsoft took it offline. Which principle failed: reliability and safety, or accountability?',
   news('TechCrunch','24 March 2016','Microsoft silences its new A.I. bot Tay, after Twitter users teach it racism','Tay learned from public conversations without enough safeguards.','https://techcrunch.com/2016/03/24/microsoft-silences-its-new-a-i-bot-tay-after-twitter-users-teach-it-racism')),
  scene(3,'Case: who is responsible?','Case: the first pedestrian killed by a self-driving car',
   'In 2018 an Uber test vehicle in Arizona struck and killed a pedestrian. Investigators found the system did not recognise a person crossing outside a crosswalk, and the safety driver was distracted. Who was responsible: the software, the company, or the driver?',
   news('NBC News','November 2019','Self-driving Uber car that hit and killed woman did not recognize that pedestrians jaywalk','The US safety board’s findings on the 2018 crash in Tempe, Arizona.','https://www.nbcnews.com/news/amp/ncna1079281')),
  scene(3,'Debate','Debate: should AI ethics be law or choice?',
   'Should responsible AI be enforced by law, like the EU AI Act, or left to companies’ own principles, which can move faster? Debate in two groups, then vote.',
   poll('Responsible AI should be…',['Required by law, with fines','Voluntary company principles','Both: laws for high risk, principles for the rest'],['Strong protection, but laws can be slow and may limit innovation.','Fast and flexible, but who checks the companies?','This is close to the EU’s risk-based approach.'])),
  nerd('IBM’s AI Ethics course explains fairness, explainability and governance with real business cases. It is course 5 of the AI Fundamentals badge. Finish it and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. Before Week 12, read RB f, Chapter 7 on privacy and ethics.','Responsible AI',
   [('Ethics',['Weigh risks and benefits','Who benefits? Who is harmed?']),('Six principles',['Fairness · reliability and safety','Privacy and security · inclusiveness','Transparency · accountability']),('EU AI Act',['Banned · high · limited · minimal risk']),('UAE',['AI Charter, 2024','National AI Strategy 2031']),('Cases',['Tay, 2016','Uber crash, 2018'])],
   [('Under the EU AI Act, AI used to screen job applicants is…',['banned','high risk','limited risk','minimal risk'],1,'Hiring is a high-risk use with strict obligations.'),
    ('A chatbot must tell users they are talking to AI. Which principle is this?',['Transparency','Inclusiveness','Reliability','Fairness'],0,'People should know when AI is used.'),
    ('Accountability means…',['the AI is never wrong','named humans answer for the system and its effects','the code is open source','data is deleted'],1,'Someone must be responsible.'),
    ('Microsoft’s Tay failed mainly because…',['it was too slow','it learned from users without enough safeguards','it had no internet','it was too expensive'],1,'Unfiltered learning from trolls.'),
    ('Social scoring of citizens by governments is, under the EU AI Act,…',['minimal risk','limited risk','high risk','unacceptable and banned'],3,'It is a prohibited practice.'),
    ('Which pair is a benefit and a risk of the same technology?',['Face recognition: finding a missing child / tracking people without consent','Spam filter: fast / cheap','Calculator: accurate / small','Robot vacuum: quiet / round'],0,'One technology, two sides.')])],
)

# ---------------------------------------------------------------- Week 12
W[12] = dict(c='#4338CA', cs='rgba(67,56,202,.10)', cd='#A5B4FC', csd='rgba(165,180,252,.14)',
 title='Week 12 · AI and Privacy', short='Week 12 · AI and Privacy', clo=3,
 full='AI and Privacy – Data, Surveillance, and Security', meta='RB f Chapter 7 · 3 hours',
 scenes=[
  scene(1,'Your data trail','What did you share today?',
   'AI runs on data, and much of it is yours. Tick everything you did in the last 24 hours. Each tick leaves a trace that a company could store, combine and use to train or target.',
   ticks('Tick what you did today',['Unlocked your phone with your face','Used maps or ride-hailing','Liked or watched social media videos','Paid by card or phone','Asked a chatbot a question','Walked past CCTV cameras','Used a loyalty card or delivery app'],[[0,'A light trail.'],[3,'A clear profile of your day.'],[5,'Enough to predict your routine, interests and location.']])),
  scene(1,'Privacy and ethics','Why privacy matters in an AI world',
   'RB f, Chapter 7 explains that AI raises privacy stakes because it can collect at scale, combine separate data sets, and infer things you never shared, such as health, mood or beliefs. Privacy protects your freedom to choose what others know about you.',
   flow('From data to inference',[('Collect','at scale','Apps, cameras, sensors and chats gather data constantly.'),('Combine','link sources','Location + purchases + likes form one profile.'),('Infer','beyond what you said','Models predict age, health, mood or beliefs.'),('Act','decide about you','Ads, prices, credit or access are adjusted.')]),
   src='Santos & Radanliev (2024). <em>Beyond the algorithm</em>, Chapter 7.'),
  scene(1,'Chatbots and privacy','The dark side of chatbots: what happens to your prompts?',
   'Whatever you type into a chatbot may be stored, reviewed by people, or used to improve the model, depending on the service and your settings. Never paste passwords, ID numbers, health details, or confidential work data into a public chatbot.',
   compare('Safe or risky to type into a public chatbot?',('Usually safe',['General questions about a topic','Text you wrote and are happy to share','Public information']),('Risky',['Passwords, ID or card numbers','Health or family details','Confidential company or university data']))),
  scene(1,'Data storage risks','Where your data can leak',
   'Stored data can leak through hacks, insider misuse, sharing with third parties, or the model itself repeating training data. Click each risk and the protection against it.',
   stack('Risks and protections · click each',[('1','Breaches','Attackers steal stored data.','Protection: encryption and limited storage.',None),('2','Third-party sharing','Data sold or shared with partners.','Protection: read permissions; refuse unnecessary sharing.',None),('3','Re-identification','“Anonymous” data matched back to you.','Protection: minimise data; aggregate before sharing.',None),('4','Model memorisation','A model repeats personal data it was trained on.','Protection: filter training data; test for leaks.',None),('5','Surveillance','Cameras and tracking used without consent.','Protection: laws, transparency and oversight.',None)])),
  scene(1,'The law in the UAE','Your rights under UAE data protection law',
   'The UAE’s Personal Data Protection Law, Federal Decree-Law No. 45 of 2021, requires consent and clear purposes for processing personal data and gives people rights such as access, correction and objection. Dubai’s DIFC and Abu Dhabi’s ADGM have their own data protection laws.',
   stack('Your data rights · click each',[('1','Know','Be told what data is collected and why.',None,None),('2','Access','Ask for a copy of your personal data.',None,None),('3','Correct','Ask for wrong data to be fixed.',None,None),('4','Object','Object to some uses, such as direct marketing.',None,None),('5','Delete','Ask for data to be erased in certain cases.',None,None)])),
  scene(2,'Have I Been Pwned','Has your email been in a data breach?',
   'Have I Been Pwned checks whether an email address appears in known data breaches. Check your own email only, read which breaches it appears in, and decide what to change.',
   tool('Have I Been Pwned','Troy Hunt','https://haveibeenpwned.com/',[('Check','your own email','Type your personal email address.'),('Read','the breaches','Which sites leaked it, and which data?'),('Act','secure it','Change reused passwords; turn on two-factor sign-in.'),('Reflect','one sentence','Which data about you is now out of your control?')])),
  scene(2,'Am I Unique?','How unique is your browser fingerprint?',
   'Websites can recognise you without cookies by reading details of your browser and device. Am I Unique? shows how identifiable your browser is. Run the test, then try it in a private window and compare.',
   tool('Am I Unique?','Research project · Inria','https://amiunique.org/',[('Test','your browser','Press “View my browser fingerprint”.'),('Read','the result','Is your fingerprint unique among visitors?'),('Compare','private window','Run it again in a private window.'),('Protect','one setting','Find one browser privacy setting you can turn on.')])),
  scene(3,'Case: Samsung','Case: engineers pasted secret code into ChatGPT',
   'In 2023 Samsung restricted staff use of generative AI after employees pasted confidential source code into ChatGPT. Once typed, the data was stored on outside servers. It shows how everyday prompts can become data leaks.',
   news('The Japan Times','2 May 2023','Samsung bans ChatGPT and other generative AI use by staff after leak','Samsung restricted generative AI tools after sensitive data was entered into ChatGPT.','https://www.japantimes.co.jp/news/2023/05/02/business/tech/samsung-bans-chatgpt-workplace-use')),
  scene(3,'Case: Italy','Case: a country paused ChatGPT over privacy',
   'In March 2023 Italy’s data protection authority temporarily blocked ChatGPT, questioning the legal basis for collecting personal data to train it and the lack of age checks. Service returned after OpenAI added privacy controls.',
   news('VOA News','31 March 2023','Italy temporarily blocks ChatGPT over privacy concerns','Italy’s privacy regulator ordered a temporary limit on processing Italian users’ data.','https://www.voanews.com/a/italy-temporarily-blocks-chatgpt-over-privacy-concerns-/7031654.html')),
  scene(3,'Debate','Debate: safety or privacy?',
   'Smart cameras with face recognition can find missing people and reduce crime, but they also record everyone. Where should the line be? Debate in two groups, then vote.',
   poll('Face recognition in public places should be…',['Allowed everywhere for safety','Allowed only with a court order or for serious crimes','Banned in public places'],['Safer streets, but everyone becomes a suspect.','This is close to the EU AI Act’s approach to real-time biometric identification.','Strong privacy, but police lose a powerful tool.'])),
  nerd('Microsoft Learn’s Embrace responsible AI principles and practices module shows how organisations protect privacy and security in AI projects. Finish it, keep the trophy, and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. Before Week 13, read RB b, Chapters 6 and 7 on AI and work.','AI and privacy',
   [('Why it matters',['AI collects at scale','Combines sources','Infers what you never shared']),('Chatbots',['Prompts may be stored','Never share passwords, IDs, health data']),('Leaks',['Breaches · sharing','Re-identification · memorisation']),('UAE law',['PDPL: Decree-Law 45 of 2021','Rights: know, access, correct, object']),('Cases',['Samsung, 2023','Italy pauses ChatGPT, 2023'])],
   [('Which is the safest to type into a public chatbot?',['Your passport number','A general question about photosynthesis','Your bank password','A colleague’s medical record'],1,'General, non-personal questions carry little risk.'),
    ('“Re-identification” means…',['logging in again','matching anonymous data back to a person','deleting data','encrypting data'],1,'Combining data sets can reveal who someone is.'),
    ('An AI predicts your mood from your typing speed. This is an example of…',['inference beyond what you shared','encryption','a data breach','consent'],0,'You never shared your mood; it was inferred.'),
    ('The UAE’s main personal data protection law is…',['the EU AI Act','Federal Decree-Law No. 45 of 2021','the Bletchley Declaration','the GDPR'],1,'The UAE PDPL.'),
    ('Why did Samsung restrict ChatGPT in 2023?',['It was too slow','Staff pasted confidential code into it','It was banned in Korea','It cost too much'],1,'Prompts became a data leak.'),
    ('Browser fingerprinting can identify you…',['only with cookies','without cookies, from device and browser details','only on phones','never'],1,'Details of your setup can be unique.')])],
)

# ---------------------------------------------------------------- Week 13
W[13] = dict(c='#B45309', cs='rgba(180,83,9,.10)', cd='#FCD34D', csd='rgba(252,211,77,.14)',
 title='Week 13 · AI and Autonomous Systems', short='Week 13 · AI and Autonomous Systems', clo=4,
 full='AI and Autonomous Systems', meta='RB b Chapters 6 and 7 · 3 hours',
 scenes=[
  scene(1,'Your future job','Will AI change the job you want?',
   'Think of the job you want after graduation. Vote on how much AI will change it in the next ten years, then we look at the evidence.',
   poll('How will AI affect the job you want?',['It will mostly replace it','It will change many of its tasks','It will barely change it','It will create my job: it does not exist yet'],['Few jobs disappear completely; tasks change first.','This is what most studies predict: tasks shift, roles adapt.','Check again after the lab: most jobs include tasks AI can do.','Possible: many future jobs do not have names yet.'])),
  scene(1,'Levels of autonomy','How autonomous is a self-driving car?',
   'Autonomous systems act without a human for some time. For cars, the SAE scale runs from level 0, no automation, to level 5, full automation anywhere. Most cars on the road today are at level 2: the driver must watch at all times. Click each level.',
   stack('SAE levels of driving automation · click each',[('L0','No automation','The human does all the driving; warnings only.',None,None),('L1','Driver assistance','One function helps, such as adaptive cruise control.',None,None),('L2','Partial automation','Steering and speed together, but the driver must watch constantly.','Most driver-assist systems sold today.',None),('L3','Conditional automation','The car drives in some conditions; the human must take over when asked.',None,None),('L4','High automation','No driver needed in a defined area and conditions.','Robotaxi services in limited zones.',None),('L5','Full automation','Drives anywhere, in any conditions, with no human.','Not yet available.',None)],start=2)),
  scene(1,'AI and labour','Machines replace tasks, not whole jobs',
   'Kaplan, Chapter 6, argues that automation has always changed work: it removes some tasks, makes workers more productive at others, and creates new jobs. The question is how fast the change comes and who pays the cost of adjusting.',
   flow('How automation changes a job',[('Tasks','break the job down','Every job is a bundle of tasks.'),('Automate','routine tasks','Predictable, repetitive tasks are automated first.'),('Augment','the rest','People do more of the creative, social and complex work.'),('New jobs','appear','New roles grow around the new technology.'),('Transition','the hard part','Workers need time, training and support to move.')]),
   src='Kaplan, J. (2016). <em>Artificial intelligence: What everyone needs to know</em>, Chapter 6.'),
  scene(1,'The numbers','Jobs created and jobs lost by 2030',
   'The World Economic Forum’s Future of Jobs Report 2025 expects 170 million jobs to be created and 92 million to be displaced worldwide by 2030, a net gain of 78 million. The gain is real, but the people who lose jobs are not always the ones who get the new ones.',
   bars('Future of Jobs Report 2025 · millions of jobs by 2030',[('Created',170,'var(--good)'),('Displaced',92,'var(--bad)'),('Net change',78,'var(--wk)')],note='Source: World Economic Forum (2025)', fmt="v=>v+' M'")),
  scene(1,'Without work?','If machines do the work, what do people do?',
   'Kaplan, Chapter 7, asks two questions from the syllabus: are there alternatives to a labour-based society, and why would people work if they could live comfortably without doing so? One proposal is a universal basic income: regular money for everyone, with no conditions.',
   compare('Universal basic income',('Arguments for',['A safety net if automation removes jobs','Freedom to study, care or start a business','Simpler than many separate benefits']),('Arguments against',['Very expensive to fund','May reduce the incentive to work','Work also gives purpose, status and community'])),
   src='Kaplan, J. (2016), Chapter 7.'),
  scene(2,'Will robots take my job?','Check the automation risk of a job',
   'This site estimates the automation risk of hundreds of jobs from research data. Look up your future job and one of your parents’ jobs, then question the number: which tasks does it miss?',
   tool('Will Robots Take My Job?','willrobotstakemyjob.com','https://willrobotstakemyjob.com/',[('Search','your future job','Type the job title.'),('Read','the risk score','Note the automation percentage and the trend.'),('Compare','a second job','Try a family member’s job.'),('Question','the number','Which human tasks might the score ignore?')])),
  scene(2,'Task audit','Audit your future job, task by task',
   'Use Copilot to break your future job into ten tasks. For each task, decide whether AI will automate it, help with it, or leave it to humans. Then write the one skill you must build now.',
   tool('Microsoft Copilot','Microsoft','https://copilot.microsoft.com/',[('Prompt','list the tasks','Ask: “List the 10 main tasks of a [your job] in the UAE.”'),('Classify','three groups','Mark each task: automate, augment, or human.'),('Check','with a person','Is the list realistic? Ask someone who does the job.'),('Plan','one skill','Which skill keeps you in the “human” and “augment” groups?')],account='Microsoft account')),
  scene(3,'Case: basic income trial','Case: Finland gave 2,000 people free money',
   'From 2017 to 2018 Finland paid 2,000 unemployed people 560 euros a month with no conditions. In the first year, employment did not change much, but participants reported better wellbeing and less stress. A real test of Kaplan’s question.',
   news('Kela (Social Insurance Institution of Finland)','2019','The basic income experiment 2017–2018 in Finland: preliminary results','The official preliminary results of Finland’s two-year basic income experiment.','https://tietotarjotin.fi/en/publication/123942/the-basic-income-experiment-2017-2018-in-finland-preliminary-results')),
  scene(3,'Case: the jobs report','Case: which jobs grow fastest?',
   'The same WEF report lists technology roles, such as big data specialists and AI and machine learning specialists, among the fastest-growing jobs, along with care and education roles. Clerical jobs like cashiers and data entry decline fastest.',
   news('World Economic Forum','January 2025','Future of Jobs Report 2025: 78 million new job opportunities by 2030 but urgent upskilling needed','The press release summarising the report’s main findings.','https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/')),
  scene(3,'Debate','Debate: should governments slow automation?',
   'Should governments slow automation to protect jobs, or speed it up and help workers retrain? Debate in two groups, then vote.',
   poll('What should governments do?',['Slow automation to protect jobs','Speed it up and fund retraining','Tax automation to pay for a basic income'],['Protects workers today, but may make the country less competitive.','Faster growth, but retraining is slow and not everyone can switch.','Kaplan discusses such ideas; the hard part is designing them fairly.'])),
  nerd('IBM’s Your Future in AI: The Job Landscape completes the AI Fundamentals badge. It maps the jobs and skills that grow with AI. Finish it, claim your Credly badge, and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. Before Week 14, read TB Chapter 14 on human–AI collaboration.','AI, autonomy and work',
   [('Autonomy',['SAE levels 0–5','Most cars today: level 2']),('Labour',['Tasks change before jobs','Automate · augment · create']),('Numbers',['170 M created, 92 M displaced by 2030','Net +78 M (WEF 2025)']),('Without work',['Universal basic income','Finland trial 2017–2018']),('Skills',['Creative, social, complex tasks','Lifelong learning'])],
   [('A car that steers and brakes by itself but needs the driver to watch at all times is at SAE level…',['0','2','4','5'],1,'Level 2: partial automation.'),
    ('According to Kaplan, automation usually replaces…',['whole professions overnight','specific tasks first','only manual jobs','nothing'],1,'Tasks change before jobs disappear.'),
    ('The WEF 2025 report expects, by 2030, a net change of about…',['−92 million jobs','+78 million jobs','+170 million jobs','zero'],1,'170 created minus 92 displaced.'),
    ('In Finland’s basic income trial, the first-year results showed…',['a big rise in employment','little change in employment but better wellbeing','everyone stopped working','the trial was cancelled'],1,'Wellbeing improved; employment barely moved.'),
    ('Which task is most likely to be automated first?',['Comforting a patient','Entering invoice data into a system','Negotiating a contract','Designing a new product'],1,'Routine, predictable tasks go first.'),
    ('A level 4 robotaxi…',['needs no driver within a defined area and conditions','drives anywhere in any weather','needs a driver watching constantly','is only a warning system'],0,'High automation in a limited zone.')])],
)

# ---------------------------------------------------------------- Week 14
W[14] = dict(c='#0E7490', cs='rgba(14,116,144,.10)', cd='#67E8F9', csd='rgba(103,232,249,.14)',
 title='Week 14 · AI and Human Collaboration', short='Week 14 · AI and Human Collaboration', clo=4,
 full='AI and Human Collaboration', meta='TB Chapter 14 · 3 hours',
 scenes=[
  scene(1,'Human, AI or both?','Who does it best?',
   'For each task, decide whether a human, an AI, or a human working with AI would do it best. Then compare your answers with the research in this lecture.',
   poll('Writing a first draft of a marketing email: who does it best?',['A human alone','AI alone','A human working with AI'],['Slower, but full control of tone and facts.','Fast, but it may be generic or wrong.','Most studies find the best results here, if the human checks the output.'])),
  scene(1,'Augmentation','Intelligence augmentation: AI as a partner',
   'TB Chapter 14 describes intelligence augmentation: using AI to extend human thinking rather than replace it. The aim is a human–AI symbiosis, where each does what it does best, and “wise systems” that serve society, not only efficiency.',
   compare('Who is good at what?',('Humans',['Goals, values and judgement','Common sense and context','Empathy, trust and responsibility']),('AI',['Speed and scale','Finding patterns in huge data','Tireless, consistent repetition'])),
   src='Moutinho, Cavique & Bigné (2023), Chapter 14: Intelligence augmentation via human–AI symbiosis.'),
  scene(1,'The centaur','Centaurs: humans and machines on one team',
   'After losing to Deep Blue, Garry Kasparov promoted “advanced chess”, where a human plays together with a computer. Teams that combined human strategy with machine calculation could beat both strong players and strong computers alone. These teams are called centaurs.',
   flow('How a centaur team works',[('Human','sets the goal','Chooses the strategy and the questions.'),('AI','calculates','Searches options and checks for mistakes.'),('Human','judges','Decides which suggestion fits the goal.'),('Together','learn','Each round, the human learns how to use the AI better.')])),
  scene(1,'The jagged frontier','AI helps a lot, until it suddenly does not',
   'In a 2023 study with Boston Consulting Group, consultants using GPT-4 finished 12.2% more tasks, 25.1% faster, with over 40% higher quality on tasks inside AI’s abilities. On a task just outside those abilities, they were less likely to reach the right answer than those without AI. The researchers call this the jagged frontier.',
   bars('Consultants using GPT-4 vs without (tasks inside the frontier)',[('More tasks done',12.2,None),('Faster',25.1,None),('Higher quality',40,'var(--good)')],note='Source: Dell’Acqua et al. (2023), Harvard Business School working paper 24-013', fmt="v=>'+'+v+'%'")),
  scene(1,'Rules for collaboration','Five rules for working with AI',
   'Good collaboration needs habits. Click each rule; they apply to your studies now and to your work later.',
   stack('Five rules · click each',[('1','You own the goal','Decide what you want before you ask the AI.',None,None),('2','Check every fact','Verify claims, numbers and sources.',None,None),('3','Know the frontier','Learn where the AI is strong and where it fails.',None,None),('4','Keep your skills','Do some work without AI so you do not lose the skill.',None,None),('5','Say how you used it','Be transparent about AI help, as academic integrity requires.',None,None)])),
  scene(2,'Co-writing race','Race: human, AI, or both?',
   'In teams of three, write the same 100-word product description for a new campus café. One person writes alone, one uses only Copilot, one writes with Copilot and edits. Time each one, then the class votes for the best text without knowing who wrote which.',
   tool('Microsoft Copilot','Microsoft','https://copilot.microsoft.com/',[('Split','three roles','Human alone, AI alone, human + AI.'),('Write','100 words','Same brief: a description for a new campus café.'),('Time','each one','Record the minutes taken.'),('Vote','blind','The class picks the best text without knowing the author.')],account='Microsoft account')),
  scene(2,'NotebookLM study partner','Use AI to study, not to skip studying',
   'Upload your notes from this course to NotebookLM and ask it to quiz you, not to summarise for you. Answer in your own words first, then check its sources. This is augmentation, not replacement.',
   tool('NotebookLM','Google','https://notebooklm.google.com/',[('Upload','your notes','Add one lecture’s slides or your own notes.'),('Ask','to be quizzed','“Ask me five questions about this, one at a time.”'),('Answer','first','Write your answer before reading the AI’s.'),('Check','the sources','Click the citations to verify.')],account='Google account')),
  scene(3,'Case: programmers','Case: developers finished a task 55.8% faster',
   'In a controlled experiment, developers using GitHub Copilot completed a programming task 55.8% faster than those without it. The study measured one well-defined task: a good example of AI inside its frontier.',
   news('arXiv · Microsoft Research and MIT','February 2023','The impact of AI on developer productivity: Evidence from GitHub Copilot','Peng, Kalliamvakou, Cihon & Demirer ran a randomised experiment with professional developers.','https://arxiv.org/abs/2302.06590')),
  scene(3,'Case: consultants','Case: the jagged frontier study',
   'The Harvard and BCG study with 758 consultants is one of the largest tests of AI at work. It shows both sides: big gains inside AI’s abilities, and worse results when people trusted it outside them.',
   news('The Harvard Crimson','October 2023','Harvard study finds AI boosts consultants’ performance, with limits','Coverage of “Navigating the Jagged Technological Frontier”.','https://www.thecrimson.com/article/2023/10/13/jagged-edge-ai-bcg/')),
  scene(3,'Debate','Debate: should universities require AI skills?',
   'Should every student learn to work with AI as a core skill, or should some courses ban AI to protect basic skills? Debate in two groups, then vote.',
   poll('Universities should…',['Teach AI collaboration in every course','Ban AI in some courses to protect basic skills','Do both: AI-free foundations, then AI-assisted work'],['Prepares you for work, but you may lose basic skills.','Protects skills, but ignores the tools you will use at work.','This mirrors rule 4: keep your skills while you learn the tools.'])),
  nerd('Microsoft Learn’s Introduction to natural language processing module explains the language technology behind AI assistants you collaborate with. Finish it, keep the trophy, and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. Before Week 15, read RB b, Chapter 8 on the possible future impacts of AI.','Human–AI collaboration',
   [('Augmentation',['Extend humans, not replace them','Human–AI symbiosis']),('Strengths',['Humans: goals, judgement, empathy','AI: speed, scale, patterns']),('Centaurs',['Advanced chess: human + computer']),('Jagged frontier',['+12.2% tasks, 25.1% faster, 40% better','Worse outside AI’s abilities']),('Rules',['Own the goal · check facts','Keep your skills · disclose use'])],
   [('Intelligence augmentation means…',['AI replacing workers','AI extending human thinking','AI with no human input','a faster computer'],1,'The human stays in charge, with AI as a partner.'),
    ('A “centaur” in advanced chess is…',['a chess engine','a human and a computer playing as one team','a type of opening','a grandmaster without help'],1,'Human strategy plus machine calculation.'),
    ('The “jagged frontier” means…',['AI is good at everything','AI’s abilities are uneven: strong on some tasks, weak on similar-looking ones','AI only works in consulting','AI is always worse than humans'],1,'Gains inside, losses outside.'),
    ('In the GitHub Copilot experiment, developers with AI finished the task about…',['10% faster','25% faster','56% faster','twice as slow'],2,'55.8% faster.'),
    ('Which task should stay mainly with the human?',['Spell-checking','Sorting 10,000 records','Deciding whether to fire an employee','Translating a menu draft'],2,'Judgement and responsibility for people.'),
    ('Why keep doing some work without AI?',['AI is illegal','To keep your own skills strong','Because AI is always wrong','To save electricity'],1,'Rule 4: keep your skills.')])],
)

# ---------------------------------------------------------------- Week 15
W[15] = dict(c='#7E22CE', cs='rgba(126,34,206,.10)', cd='#D8B4FE', csd='rgba(216,180,254,.14)',
 title='Week 15 · Tomorrow’s AI', short='Week 15 · Tomorrow’s AI', clo=4,
 full='Tomorrow’s AI: Hopes, Fears, and Human Identity', meta='RB b Chapter 8 · 3 hours · Final exam next week',
 scenes=[
  scene(1,'Hope or fear?','When you think of AI in 2040, you feel…',
   'Start with your gut feeling. Vote, then we look at what the evidence and the experts say about AI’s possible futures.',
   poll('When you think of AI in 2040, you feel…',['Excited','Worried','Both','Not sure yet'],['Many researchers share your hope: medicine, science, education.','Many researchers share your worry: misuse, jobs, control.','The most common answer, and probably the most realistic.','A fair position: the future depends on choices still being made.'])),
  scene(1,'Possible futures','Kaplan’s possible future impacts',
   'Kaplan, Chapter 8, separates realistic near-term impacts, such as changes to work, law and warfare, from speculative ideas like superintelligence. He argues that machines need not be conscious to change society deeply.',
   acc('Possible futures · RB b, Chapter 8',[('Near-term','Smarter assistants, automation of many tasks, AI in medicine, law and transport, new questions about responsibility.'),('Medium-term','Large shifts in jobs and education, AI in government services, autonomous systems in cities.'),('Speculative','Artificial general intelligence or superintelligence that matches or exceeds humans in most tasks: possible, but with no agreed timeline.'),('What stays human','Choosing goals and values, taking responsibility, and the meaning we find in work and relationships.')]),
   src='Kaplan, J. (2016). <em>Artificial intelligence: What everyone needs to know</em>, Chapter 8.'),
  scene(1,'Hopes','The hopes: what AI could solve',
   'AI is already speeding up science: AlphaFold predicted the structures of over 200 million proteins. The hopes include faster cures, personal tutoring for every child, cleaner energy, and safer roads.',
   compare('Hopes and fears',('Hopes',['Faster science and medicine','Education for everyone','Climate and energy solutions','Safer transport']),('Fears',['Misinformation and deepfakes','Mass surveillance','Loss of jobs and skills','Losing control of powerful systems']))),
  scene(1,'Governing the future','How the world is trying to steer AI',
   'Governments are starting to cooperate on AI safety. Put these milestones in order, from oldest to newest.',
   order('Put the milestones in order',[(2017,'The UAE appoints the world’s first Minister of State for AI'),(2019,'Dubai publishes its AI ethics principles'),(2021,'UNESCO adopts its Recommendation on the Ethics of AI'),(2023,'28 countries and the EU sign the Bletchley Declaration on AI safety'),(2024,'The EU AI Act enters into force')])),
  scene(1,'Human identity','What makes us human when machines can think?',
   'If AI can write, draw, diagnose and drive, what is uniquely human? Many argue it is not intelligence alone, but consciousness, values, relationships, and the responsibility we take for our choices.',
   ticks('Which of these do you think only humans can truly have?',['Consciousness: being aware of yourself','Emotions that you really feel','Values you choose and defend','Creativity that changes a culture','Responsibility for your actions','Friendship and love'],[[0,'You think machines could have all of these.'],[3,'You see a clear human core.'],[5,'You see most of what matters as uniquely human.']])),
  scene(2,'AI Index','Read the data on AI’s progress',
   'Stanford’s AI Index publishes the main data on AI each year: investment, performance, jobs, policy and public opinion. Open the latest report, choose one chart, and explain what it tells us about the future.',
   tool('AI Index Report','Stanford Institute for Human-Centered AI','https://aiindex.stanford.edu/',[('Open','the latest report','Read the top takeaways.'),('Choose','one chart','Pick a chart on jobs, policy, or public opinion.'),('Explain','in two sentences','What does it show? What surprised you?'),('Predict','2030','What will that chart look like in 2030?')])),
  scene(2,'Letter from 2040','Write a letter from your future self',
   'Use Copilot as a brainstorming partner, not a ghost-writer. Ask it for three possible futures for your career in 2040, then write, in your own words, a 150-word letter from your future self describing one of them.',
   tool('Microsoft Copilot','Microsoft','https://copilot.microsoft.com/',[('Brainstorm','three futures','Ask: “Describe three possible futures in 2040 for a [your field] graduate in the UAE.”'),('Choose','one future','Pick the most realistic or most hopeful one.'),('Write','your letter','150 words, in your own words.'),('Disclose','AI use','Add one line: how did you use AI?')],account='Microsoft account')),
  scene(3,'Case: Bletchley','Case: the first global agreement on frontier AI',
   'In November 2023, 28 countries including the US, China and the UAE, plus the European Union, signed the Bletchley Declaration, agreeing that the most powerful AI models carry serious risks and need international cooperation on safety.',
   news('GOV.UK','1 November 2023','Countries agree to safe and responsible development of frontier AI in landmark Bletchley Declaration','The UK government’s announcement of the Bletchley Declaration.','https://www.gov.uk/government/news/countries-agree-to-safe-and-responsible-development-of-frontier-ai-in-landmark-bletchley-declaration')),
  scene(3,'Case: the UAE strategy','Case: a country that planned for AI',
   'In 2017 the UAE became the first country to appoint a Minister of State for Artificial Intelligence and launched its National AI Strategy 2031, aiming to make the UAE a global AI leader in sectors such as transport, health, education and energy.',
   news('UAE Government portal','2017–2031','UAE National Strategy for Artificial Intelligence 2031','The official overview of the UAE’s national AI strategy.','https://u.ae/-/media/AI-publications/UAE-National-Strategy-for-Artificial-Intelligence-2031.pdf')),
  scene(3,'Final debate','Final debate: will AI make humanity better?',
   'For the last debate of the course, use everything you have learned: history, applications, limits, ethics, privacy, work and collaboration. Will AI make humanity better or worse by 2040?',
   poll('By 2040, AI will make humanity…',['Better','Worse','Better for some, worse for others','It depends on the choices we make now'],['Then which safeguards will make that happen?','Then which risks can still be prevented?','The most evidence-based answer: who gains depends on access and policy.','The key message of this course: AI’s future is a human choice.'])),
  nerd('Claim and share your three badges: IBM AI Fundamentals, Google Generative AI Fundamentals, and your Microsoft Learn trophies. Add them to LinkedIn and send your proof for a class-activity bonus.'),
  practise('Open the revision map, then try the MCQ. The final exam is next week and covers Weeks 1 to 15: revise each lecture’s “Practise & remember”.','Tomorrow’s AI',
   [('Futures',['Near-term: tasks, medicine, law','Speculative: AGI, no agreed timeline']),('Hopes',['Science, health, education']),('Fears',['Deepfakes, surveillance, control']),('Governance',['UAE AI minister, 2017','UNESCO, 2021 · Bletchley, 2023 · EU AI Act, 2024']),('Being human',['Values, responsibility','Relationships and meaning'])],
   [('Which country appointed the world’s first Minister of State for AI in 2017?',['Singapore','The UAE','The UK','China'],1,'The UAE, alongside its National AI Strategy 2031.'),
    ('The Bletchley Declaration (2023) is about…',['AI copyright','safety of the most powerful AI models','banning chatbots','data protection in Europe'],1,'International cooperation on frontier AI safety.'),
    ('Kaplan argues that machines…',['must be conscious to change society','can change society deeply without being conscious','will never affect jobs','are already superintelligent'],1,'Impact does not require consciousness.'),
    ('Artificial general intelligence is…',['already common','AI that matches humans in most tasks, with no agreed timeline','another name for a chatbot','a law'],1,'Speculative, with expert disagreement on timing.'),
    ('Which is the strongest example of AI speeding up science?',['A spam filter','AlphaFold predicting protein structures','A music playlist','Autocorrect'],1,'Over 200 million predicted structures.'),
    ('The main message of this course about AI’s future is that…',['it is already decided','it depends on human choices, laws and values','only engineers matter','AI will stop progressing'],1,'The future of AI is a human choice.')])],
)

def build(n, w):
    nxt = ''
    body = HEAD.format(title=w['title'], v=V, c=w['c'], cs=w['cs'], cd=w['cd'], csd=w['csd']).replace('{v}', V)
    body += "Lecture.mount({\n  id:'w%d', week:%d, clo:%d, short:%s,\n  title:%s,\n  meta:%s,\n  scenes:[\n  %s\n  ]\n});\n" % (
        n, n, w['clo'], js(w['short']), js(w['full']), js(w['meta']), ',\n\n  '.join(w['scenes']))
    open(os.path.join(ROOT, f'week-{n:02d}.html'), 'w').write(body + TAIL)
    print('wrote week', n, len(w['scenes']), 'scenes')

for n, w in W.items(): build(n, w)
