Lecture.mount({
  id:'w2', week:2, clo:1, short:'Week 2 · The History of AI',
  title:'The History of AI',
  meta:'RB a Chapters 1–3 · 3 hours',
  scenes:[
  { part:1, nav:'When did AI begin?', title:'When did AI begin?',
    narration:[`ChatGPT looks new, but it is the latest chapter of an 80-year story. Vote for the year you think AI began as a named field, then see the answer.`],
    fig:FIG['When did AI begin?'] },

  { part:1, nav:'The roots', title:'The roots: from ideas to a named field', wide:true,
    narration:[`A mathematical neuron in 1943, Turing's question in 1950, and the 1956 Dartmouth workshop, where John McCarthy's proposal named the field “artificial intelligence”. Click the dots: the line shows how excitement and funding rose and fell for eighty years.`],
    fig:FIG['The roots'] },

  { part:1, nav:'Rules and symbols', title:'Early AI: rules and symbols',
    narration:[`Early AI was symbolic: experts wrote IF-THEN rules and the computer followed them, with no learning from data. Try the expert system on the right with an unusual patient, and watch it fall silent or fire two rules that disagree.`],
    fig:FIG['Rules and symbols'] },

  { part:1, nav:'AI winters', title:'AI winters: when hype met reality',
    narration:[`Researchers promised human-level AI within a generation. When slow computers, scarce data and brittle rules could not deliver, funding collapsed twice: in the 1970s and again in the late 1980s. These periods are called AI winters.`],
    fig:FIG['AI winters'] },

  { part:1, nav:'Neural networks', title:'Why deep learning took off in 2012',
    narration:[`Neural networks existed since the perceptron in 1958, and backpropagation showed how to train them in 1986. They only took off around 2012, when three ingredients finally met: big data, fast graphics chips and better algorithms.`],
    fig:FIG['Neural networks'] },

  { part:1, nav:'Timeline game', title:'Put AI history in order',
    narration:[`Click the milestones from oldest to newest. Wrong clicks shake and are counted, so try for zero mistakes.`],
    fig:FIG['Timeline game'] },

  { part:2, nav:'Talk to ELIZA', title:'Talk to the first chatbot (1966)',
    narration:[`ELIZA, written by Joseph Weizenbaum at MIT, matched keywords and turned your sentences back into questions. Some users still believed it understood them. Chat with it for five minutes and find the rules behind its replies.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'ELIZA (web version)',by:'masswerk.at · Norbert Landsteiner',url:'https://masswerk.at/elizabot/',steps:[
      {t:'Chat',s:'tell it a problem',d:'Type a few sentences about your day or a worry.'},
      {t:'Spot the rule',s:'keywords',d:'Use words like “mother”, “always” or “I feel”. Note how each reply is built from your words.'},
      {t:'Break it',s:'nonsense',d:'Type something with no keyword. What does it fall back on?'},
      {t:'Compare',s:'with ChatGPT',d:'Ask a chatbot the same thing. What has changed in 60 years: the rules, or how it learned?'}]})} },

  { part:2, nav:'Play the engine', title:'See how a chess engine thinks',
    narration:[`Deep Blue won by searching millions of positions per second. Lichess lets you run Stockfish, a modern engine, in your browser. Make a few moves, switch on computer analysis, and watch it score the position and list the lines it is searching.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Lichess analysis board',by:'Lichess · Stockfish engine',url:'https://lichess.org/analysis',steps:[
      {t:'Move',s:'any opening',d:'Play a few moves for both sides on the board.'},
      {t:'Analyse',s:'engine on',d:'Turn on the computer analysis switch.'},
      {t:'Read the score',s:'+ or −',d:'A plus number favours White, minus favours Black.'},
      {t:'Blunder',s:'on purpose',d:'Give away your queen and watch the score jump. That number is the result of search.'}]})} },

  { part:3, nav:'Deep Blue vs AlphaGo', title:'Case: Deep Blue (1997) vs AlphaGo (2016)',
    narration:[`Deep Blue beat Kasparov at chess with expert-written scoring and brute-force search. Go has more possible positions than there are atoms in the observable universe, so search alone cannot win it. AlphaGo learned from human games and then from playing itself, and beat Lee Sedol in 2016.`],
    fig:FIG['Deep Blue vs AlphaGo'] },

  { part:3, nav:'Watch: AlphaGo', title:'Watch: the match that surprised experts',
    narration:[`Watch the opening of the AlphaGo film in class. Note the moment experts called a move “creative”, and ask yourself: can a learned move be creative if no human taught it?`],
    fig:{label:`Watch`, build:el=>W.video(el,V['Deep Blue vs AlphaGo'])} },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`Microsoft Learn's Introduction to AI concepts module turns this history into today's vocabulary. Finish it, keep the trophy, and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Assignment 1, “Where it all began”, uses today's timeline: the brief, rubric and submission button are on the course page. Before Week 3, read RB f, Chapter 2.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
