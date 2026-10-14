Lecture.mount({
  id:'w1', week:1, clo:1, short:'Week 1 · Introduction to AI',
  title:'Introduction to AI',
  meta:'RB b Chapter 1 · 3 hours',
  scenes:[
  { part:1, nav:'What is AI?', title:'What is AI?',
    narration:[`Artificial intelligence is the field of building computer systems that do tasks which normally need human intelligence: understanding language, recognising images, making decisions and learning from experience. It is a goal, a field of study and a family of very different tools, from your spam filter to ChatGPT.`],
    fig:{label:`Watch`, build:el=>W.video(el,V['What is AI?'])} },

  { part:1, nav:'Is it AI?', title:'Is it AI or not?',
    narration:[`Sort each item, then reveal the answers. Notice the pattern: the items that count as AI learn from data or adapt, while the others follow one fixed rule.`],
    fig:FIG['Is it AI?'] },

  { part:1, nav:'Four definitions', title:'Four ways to define AI',
    narration:[`Russell and Norvig sort definitions of AI by two questions: should a machine think or act, and should it copy humans or be ideally rational? That gives four views. Most modern AI follows the fourth, acting rationally: choosing the best action to reach a goal.`],
    fig:FIG['Four definitions'] },

  { part:1, nav:'AI vs software', title:'AI vs ordinary software', wide:true,
    narration:[`Ordinary software follows rules a programmer wrote: rules plus data give answers. Machine learning turns this around: data plus answers give the rules. Change the rule filter on the right and try to catch every spam email without blocking the free pizza announcement.`],
    fig:FIG['AI vs software'] },

  { part:1, nav:'Foundations', title:'Which fields built AI?',
    narration:[`AI did not come from computer science alone. Philosophy, mathematics, statistics, neuroscience, linguistics, psychology and economics each gave it a key idea, which is why AI is called interdisciplinary.`],
    fig:FIG['Foundations'] },

  { part:1, nav:'A real science?', title:'Is AI a real science?',
    narration:[`AI is both a science and an engineering discipline. It tests hypotheses and measures results on shared benchmarks, but much of it is building tools that work before we fully understand why, and black-box models make some results hard to explain or reproduce.`],
    fig:FIG['A real science?'] },

  { part:1, nav:'Smarter than us?', title:'Can a computer be smarter than a human?',
    narration:[`All AI today is narrow: superhuman at one task and helpless at everything else. General AI does not exist yet, and super AI is theoretical. Moravec's paradox explains the gap: what is hard for us, like chess, is easy for machines, and what is easy for a child, like recognising a friend, is hard for them.`],
    fig:FIG['Machine or human?'] },

  { part:2, nav:'Teachable Machine', title:'Train your own AI in five minutes',
    narration:[`Teachable Machine lets you train an image model in the browser with your webcam. Teach it two objects, test it with a third it has never seen, and watch it still pick one of the two with confidence: it only knows what its data showed it.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Teachable Machine',by:'Google',url:'https://teachablemachine.withgoogle.com/',steps:[
      {t:'Start',s:'Image project',d:'Open the tool, choose Get Started, then Image Project and Standard image model.'},
      {t:'Collect',s:'two classes',d:'Rename the classes (for example Pen and Phone). Hold each object to the webcam and record about 50 images per class.'},
      {t:'Train',s:'one click',d:'Press Train Model and wait. Keep the tab open.'},
      {t:'Test',s:'new objects',d:'Show each object from new angles and watch the confidence bars in Preview.'},
      {t:'Trick it',s:'something else',d:'Show an object from neither class. The model still picks one: it cannot say “I don\'t know”.'}]})} },

  { part:2, nav:'Quick, Draw!', title:'Can a neural network guess your doodle?',
    narration:[`Quick, Draw! asks you to sketch six objects in 20 seconds each while a neural network guesses what you are drawing. It learned from millions of doodles drawn by players around the world. At the end, open a drawing it missed and compare yours with the examples it learned from.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Quick, Draw!',by:'Google Creative Lab',url:'https://quickdraw.withgoogle.com/',steps:[
      {t:'Play',s:'six doodles',d:'Press Let\'s Draw and sketch each word before the 20 seconds run out.'},
      {t:'Listen',s:'live guesses',d:'The model says its guesses aloud as your lines appear.'},
      {t:'Inspect',s:'what it saw',d:'On the results page, click a doodle it missed to see what it thought instead.'},
      {t:'Compare',s:'the training data',d:'Look at how other people drew the same word. Is your style different from the data?'}]})} },

  { part:3, nav:'Alan Turing', title:'Case: Alan Turing asks “Can machines think?”',
    narration:[`In 1950 the British mathematician Alan Turing published “Computing Machinery and Intelligence”. Instead of defining thinking, he proposed a test: if a judge chatting by text cannot tell the machine from a human, the machine passes. The question still drives debates about ChatGPT today.`],
    fig:{label:`Alan Turing, aged 16`, build:el=>W.photo(el,{src:'https://commons.wikimedia.org/wiki/Special:FilePath/Alan_Turing_Aged_16.jpg?width=640',alt:'Black-and-white portrait of Alan Turing as a teenager',credit:'Alan Turing aged 16 (c. 1928). Public domain, via Wikimedia Commons.',href:'https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg'})} },

  { part:3, nav:'Turing vs Searle', title:'Behaviour or understanding?',
    narration:[`In 1980 the philosopher John Searle replied with the Chinese Room: a person who knows no Chinese follows a rule book and gives perfect Chinese answers, yet understands nothing. Turing judges behaviour; Searle says behaviour is not understanding. Vote, then defend your answer with one of the two.`],
    fig:FIG['Turing vs Searle'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`This week's ideas continue in IBM's free Introduction to Artificial Intelligence course, the first step towards the AI Fundamentals badge. Finish it, keep your proof, and send it for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Before Week 2, read RB a, Chapters 1–3 (Mitchell), and pick one moment in AI history that interests you: it could become Assignment 1.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
