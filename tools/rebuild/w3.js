Lecture.mount({
  id:'w3', week:3, clo:1, short:'Week 3 · How AI Thinks',
  title:'How AI Thinks – Smart Tools, Not Magic',
  meta:'RB f Chapter 2 · 3 hours',
  scenes:[
  { part:1, nav:'Be the model', title:'Be the language model',
    narration:[`Before any theory, play the machine. Guess the missing word in each sentence, then open the answer. You just did what a language model does: predict the most likely next word from patterns you have seen before.`],
    fig:FIG['Be the model'] },

  { part:1, nav:'AI ⊃ ML ⊃ DL', title:'AI, machine learning and deep learning',
    narration:[`The three terms nest inside each other. AI is the whole field. Machine learning is the part of AI that learns from data. Deep learning is the part of machine learning that uses neural networks with many layers.`],
    fig:FIG['AI ⊃ ML ⊃ DL'] },

  { part:1, nav:'Types of ML', title:'Three ways a machine learns',
    narration:[`Supervised learning learns from labelled examples, like emails marked spam. Unsupervised learning finds groups with no labels, like customer types. Reinforcement learning learns by trial and error with rewards, like AlphaGo. Sort the examples on the right.`],
    fig:FIG['Types of ML'] },

  { part:1, nav:'A network learns', title:'Watch one neuron learn',
    narration:[`A neural network is built from simple units. Each one multiplies its inputs by weights, adds them up, and fires if the total passes a threshold. Training means nudging the weights after every mistake. Press “Train 1 round” a few times and watch the dividing line move until it separates the two groups.`],
    fig:FIG['A network learns'] },

  { part:1, nav:'How ChatGPT works', title:'How ChatGPT writes a reply', full:true,
    narration:[`ChatGPT cuts your text into tokens, uses attention to decide which earlier tokens matter, predicts a likely next token, adds it, and repeats until the reply is done. Play the flow, then try the tokeniser and attention demo below it.`],
    fig:FIG['How ChatGPT works'] },

  { part:1, nav:'How it was trained', title:'Three stages of training',
    narration:[`First, pre-training on a huge amount of text teaches the model to predict the next word. Then fine-tuning on example conversations teaches it to follow instructions. Finally, human feedback rewards the answers people prefer.`],
    fig:FIG['How it was trained'] },

  { part:2, nav:'TensorFlow Playground', title:'Train a neural network in your browser',
    narration:[`TensorFlow Playground shows a real neural network learning live. Pick a dataset, press play, and watch the coloured background change as the weights update. Then remove neurons and layers until it can no longer learn the spiral.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'TensorFlow Playground',by:'Google · TensorFlow team',url:'https://playground.tensorflow.org/',steps:[
      {t:'Choose data',s:'circle dataset',d:'Pick the circle dataset on the left.'},
      {t:'Play',s:'watch it learn',d:'Press play. The test loss falls as the network learns the boundary.'},
      {t:'Shrink',s:'fewer neurons',d:'Remove hidden layers and neurons. When does it stop working?'},
      {t:'Spiral',s:'the hard one',d:'Switch to the spiral dataset. Add layers and features until it succeeds.'}]})} },

  { part:2, nav:'Transformer Explainer', title:'Look inside a real transformer',
    narration:[`Transformer Explainer runs a small GPT-2 model in your browser. Type a sentence and follow it through tokens, attention and the final probabilities for the next word. Move the temperature slider and watch the choices become safer or more surprising.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Transformer Explainer',by:'Georgia Tech · Polo Club',url:'https://poloclub.github.io/transformer-explainer/',steps:[
      {t:'Type',s:'your sentence',d:'Enter a short sentence and press Generate.'},
      {t:'Tokens',s:'the pieces',d:'See how your words are cut into tokens.'},
      {t:'Attention',s:'what it looks at',d:'Hover over the attention view to see which tokens influence each other.'},
      {t:'Temperature',s:'safe or surprising',d:'Raise and lower the temperature and compare the next-word probabilities.'}]})} },

  { part:3, nav:'Case: fake citations', title:'Case: when the model invents facts',
    narration:[`In 2023 a New York judge fined two lawyers who had filed a legal brief citing court cases that did not exist: ChatGPT had invented them. A language model predicts likely text, not true text. This is called hallucination, and the fix is human checking.`],
    fig:{label:`Real case`, build:el=>W.news(el,{outlet:'Reuters',date:'22 June 2023',head:'New York lawyers sanctioned for using fake ChatGPT cases in legal brief',dek:'A federal judge fined two lawyers and their firm $5,000 after their brief cited six cases invented by ChatGPT.',url:'https://dubaieye1038.com/news/business/new-york-lawyers-sanctioned-for-using-fake-chatgpt-cases-in-legal-brief'})} },

  { part:3, nav:'Pick the model', title:'Which model fits the job?',
    narration:[`Different problems need different algorithms: regression predicts numbers, clustering finds groups, convolutional networks read images and transformers handle language. Choose the right tool for each real case.`],
    fig:FIG['Leading algorithms'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`IBM's free Natural Language Processing and Computer Vision course goes deeper into how machines read text and see images. It is course 2 of the AI Fundamentals badge. Finish it and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Assignment 1 is due this week: the brief and submission button are on the course page. Before Week 4, read RB a, Chapter 13 and RB b, Chapter 7.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
