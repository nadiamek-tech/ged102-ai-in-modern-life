Lecture.mount({
  id:'w4', week:4, clo:2, short:'Week 4 · AI in Everyday Life',
  title:'AI in Everyday Life',
  meta:'RB a Chapter 13 · RB b Chapter 7 · 3 hours',
  scenes:[
  { part:1, nav:'AI in your pocket', title:'AI is already in your pocket',
    narration:[`Take out your phone and tick every AI feature you used today. Face unlock, autocorrect, photo search, maps and your feeds are all narrow AI making predictions from data, most of the time without you noticing.`],
    fig:FIG['AI in your pocket'] },

  { part:1, nav:'Recommendations', title:'How your feed decides what you see', full:true,
    narration:[`A recommender collects what you watch, like and skip, compares you with similar users, predicts your next click and fills your feed with it. Your clicks then feed the next round, so the loop can narrow what you see into a filter bubble. Click a few videos below and watch your feed change.`],
    fig:FIG['Recommendations'] },

  { part:1, nav:'Social equity', title:'Social equity: four lenses',
    narration:[`Social equity asks whether AI's benefits and harms are shared fairly. Four lenses help: who has access, who is represented in the data, who is affected by decisions, and who has a voice in how systems are built.`],
    fig:FIG['Social equity'] },

  { part:1, nav:'Who benefits?', title:'Who benefits from the AI revolution?',
    narration:[`AI creates winners and losers at the same time. People with skills, data and capital tend to gain first, while routine jobs and groups missing from the data carry more of the risk. Where do you expect to stand?`],
    fig:FIG['Who benefits?'] },

  { part:2, nav:'My Ad Center', title:'See what Google thinks you like',
    narration:[`Google's My Ad Center shows the topics, brands and personal details it uses to choose your ads. Sign in with your own account, compare its guesses with reality, and switch off one topic you do not want to be targeted by.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'My Ad Center',by:'Google',account:'Google account',url:'https://myadcenter.google.com/',steps:[
      {t:'Sign in',s:'your account',d:'Open My Ad Center with your own Google account.'},
      {t:'Read',s:'topics and brands',d:'List three guesses that are right and one that is wrong.'},
      {t:'Explain',s:'why that guess?',d:'Which of your searches or videos could have produced each guess?'},
      {t:'Control',s:'switch one off',d:'Turn off one topic, or turn personalised ads off completely.'}]})} },

  { part:2, nav:'Survival of the Best Fit', title:'Build a hiring algorithm, then watch it go wrong',
    narration:[`Survival of the Best Fit is a short game made by students at NYU Abu Dhabi. You hire people by hand, then hand the job to a machine that learns from your past choices. Play it to the end and explain where the bias came from.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Survival of the Best Fit',by:'NYU Abu Dhabi students · 10 minutes',url:'https://www.survivalofthebestfit.com/',steps:[
      {t:'Hire',s:'by hand',d:'Choose candidates for your company as fast as you can.'},
      {t:'Automate',s:'train the model',d:'The game trains a model on your past decisions.'},
      {t:'Watch',s:'who gets rejected',d:'Notice which group the model starts to reject, and why.'},
      {t:'Explain',s:'one sentence',d:'Write down where the bias came from: the model, or the data you gave it?'}]})} },

  { part:3, nav:'Case: COMPAS', title:'Case: a risk score in court',
    narration:[`COMPAS scores defendants in some US courts on how likely they are to reoffend. In 2016 ProPublica found that Black defendants who did not reoffend were almost twice as likely as white defendants to be wrongly labelled high risk. The data reflected past policing, and the model learned it.`],
    src:`Source: Angwin, J. et al. (2016). <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing" target="_blank" rel="noopener">Machine Bias</a>. ProPublica.`,
    fig:FIG['Biased algorithms'] },

  { part:3, nav:'Case: Amazon hiring', title:'Case: the hiring tool that learned to prefer men',
    narration:[`Amazon built a tool to rate job applicants, trained on ten years of CVs that came mostly from men. It learned to mark down CVs that included the word “women's”, and Amazon dropped the project. It is the real version of the game you just played.`],
    fig:{label:`Real case`, build:el=>W.news(el,{outlet:'Reuters via CNBC',date:'10 October 2018',head:'Amazon scraps a secret AI recruiting tool that showed bias against women',dek:'The model was trained on a decade of CVs, most of them from men, and penalised CVs that included the word “women’s”.',url:'https://www.cnbc.com/2018/10/10/amazon-scraps-a-secret-ai-recruiting-tool-that-showed-bias-against-women.html'})} },

  { part:3, nav:'Watch: Buolamwini', title:'Watch: “the coded gaze”',
    narration:[`Joy Buolamwini found that face-analysis software failed to see her face until she wore a white mask. Watch her talk and note the three steps she proposes for fairer code.`],
    fig:{label:`Watch`, build:el=>W.video(el,V['Biased algorithms'])} },

  { part:3, nav:'Inevitable?', title:'Debate: are the disruptive effects inevitable?',
    narration:[`One side says technology decides and the disruption is coming whatever we do. The other says people decide, through laws, companies and choices. Debate in two groups, then vote.`],
    fig:FIG['Inevitable?'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`IBM's free Machine Learning and Deep Learning course shows how the models behind your feed are trained. It is course 3 of the AI Fundamentals badge. Finish it and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Before Week 5, read TB Chapter 5 on large language models in education.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
