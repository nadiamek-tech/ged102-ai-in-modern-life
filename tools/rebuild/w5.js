Lecture.mount({
  id:'w5', week:5, clo:2, short:'Week 5 · Education and Learning',
  title:'Applications of AI: Education and Learning',
  meta:'TB Chapter 5 · 3 hours',
  scenes:[
  { part:1, nav:'Human or machine?', title:'Can you tell who wrote it?',
    narration:[`Read the two answers on the right and vote: which one did a chatbot write? If it is hard to tell, that is exactly why large language models are changing how students learn and how teachers assess.`],
    fig:FIG['Human or machine?'] },

  { part:1, nav:'An LLM in one minute', title:'An LLM in one minute',
    narration:[`A large language model predicts the next word, again and again, from patterns in huge amounts of text. It sounds fluent because it has seen so much language, but it does not check facts, so it can be confidently wrong.`],
    fig:FIG['An LLM in one minute'] },

  { part:1, nav:'Where LLMs show up', title:'Where LLMs enter education',
    narration:[`Students use LLMs as tutors, writing helpers and study planners. Teachers use them to draft materials and feedback. Institutions use them for support chatbots and admissions. Each use brings its own benefit and its own risk.`],
    fig:FIG['Where LLMs show up'] },

  { part:1, nav:'Opportunities', title:'The big promise: a tutor for everyone',
    narration:[`In 1984 Benjamin Bloom found that students with a one-to-one tutor performed about two standard deviations better than students in a normal class. AI tutors promise that advantage at scale, if they guide students to think instead of giving them answers.`],
    fig:FIG['Opportunities'] },

  { part:1, nav:'Threats', title:'Threats: what can go wrong',
    narration:[`The same tools can harm learning: answers you did not think through, invented facts and sources, unfair detectors, privacy leaks, unequal access, and over-reliance that weakens your own skills. Open each threat on the right.`],
    fig:FIG['Threats'] },

  { part:2, nav:'Copilot: learn, not outsource', title:'Microsoft Copilot as a tutor, not a ghost-writer',
    narration:[`Copilot is free with a Microsoft account. Ask it to explain this week's idea, then ask it to quiz you instead of giving answers. Compare the two chats: one outsources your thinking, the other trains it.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Microsoft Copilot',by:'Microsoft',account:'Microsoft account',url:'https://copilot.microsoft.com/',steps:[
      {t:'Explain',s:'one concept',d:'Ask: “Explain next-word prediction to a first-year student in five sentences.”'},
      {t:'Tutor me',s:'no answers',d:'Ask: “Quiz me on it with three questions, one at a time, and do not give me the answers.”'},
      {t:'Check',s:'one claim',d:'Pick one claim it made and verify it in the textbook or a reliable source.'},
      {t:'Reflect',s:'learn or outsource?',d:'Which chat made you think harder? Write one sentence.'}]})} },

  { part:2, nav:'NotebookLM', title:'NotebookLM: an AI that only reads your sources',
    narration:[`NotebookLM answers only from the documents you upload and shows a citation for every claim. Upload this week's slides or chapter, ask three questions, and click the citations to check where each answer came from.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'NotebookLM',by:'Google',account:'Google account',url:'https://notebooklm.google.com/',steps:[
      {t:'New notebook',s:'add a source',d:'Create a notebook and upload the week\'s slides or chapter as a PDF.'},
      {t:'Ask',s:'three questions',d:'Ask questions you would expect in the midterm.'},
      {t:'Verify',s:'click citations',d:'Click each numbered citation and read the original passage.'},
      {t:'Compare',s:'with a chatbot',d:'Ask a general chatbot the same question. Which answer can you trust, and why?'}]})} },

  { part:3, nav:'Watch: Sal Khan', title:'Watch: the case for AI tutors',
    narration:[`Sal Khan, founder of Khan Academy, argues that AI tutors could give every student the benefit of personal tutoring. Watch critically: which of today's threats does he address, and which does he skip?`],
    fig:{label:`Watch`, build:el=>W.video(el,V['Opportunities'])} },

  { part:3, nav:'Case: AI detectors', title:'Case: even OpenAI gave up on its detector',
    narration:[`In 2023 OpenAI withdrew its own tool for spotting AI-written text because of its low accuracy. A Stanford study found that seven popular detectors wrongly flagged over half of essays written by non-native English speakers. A detector score alone is not proof.`],
    src:`Liang, W. et al. (2023). GPT detectors are biased against non-native English writers. <em>Patterns</em>, 4(7).`,
    fig:{label:`Real case`, build:el=>W.news(el,{outlet:'OpenAI',date:'updated 20 July 2023',head:'“The AI classifier is no longer available due to its low rate of accuracy”',dek:'OpenAI added this note to the page announcing its AI-text classifier, six months after launch.',url:'https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text'})} },

  { part:3, nav:'Fact-check the tutor', title:'Fact-check the AI tutor',
    narration:[`This answer was written in the style of an AI tutor, and some sentences are false. Click the ones you think are wrong, then check your score.`],
    fig:FIG['Fact-check the tutor'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`Google's free Introduction to Generative AI and Introduction to Large Language Models courses explain the tools from today's lab. They lead to the Generative AI Fundamentals skill badge. Finish them and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Before Week 6, read TB Chapter 3, Artificial Intelligence in Healthcare, and start choosing your field for Assignment 2.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
