Lecture.mount({
  id:'w7', week:7, clo:2, short:'Week 7 · Finance and Business',
  title:'Applications of AI: AI in Finances and Business',
  meta:'RB c Chapter 1 · 3 hours',
  scenes:[
  { part:1, nav:'Card blocked', title:'2:47 a.m. Your card has been blocked',
    narration:[`Your bank has just blocked your card and sent you a message. No person looked at it: a model did. Vote on what triggered the block.`],
    fig:FIG['Card blocked'] },

  { part:1, nav:'Where AI is used', title:'Where AI works in finance and business',
    narration:[`Banks use AI to detect fraud, score credit and manage risk. Investors use it to build portfolios and trade. Businesses use it to forecast demand, set prices and answer customers. Click each use for an example.`],
    fig:FIG['Where AI is used'] },

  { part:1, nav:'Fraud detection', title:'Fraud detection is anomaly detection', wide:true,
    narration:[`A fraud model learns your normal pattern: usual amounts, places, times and shops. A payment that breaks several patterns at once gets a high score and is blocked. Change the signals on the right and watch the score.`],
    fig:FIG['Fraud detection'] },

  { part:1, nav:'Credit scoring', title:'Credit scoring and the bias loop',
    narration:[`Credit models predict who will repay a loan from past data. If past lending was unfair, the model learns that unfairness, approves fewer people from the same groups, and creates new data that confirms it. That is the bias loop.`],
    fig:FIG['Credit scoring'] },

  { part:1, nav:'Portfolio optimisation', title:'Don\'t put all your eggs in one basket', wide:true,
    narration:[`Portfolio optimisation chooses a mix of investments that balances return and risk. Mixing assets that do not move together lowers risk without giving up much return. Move the slider between the two funds and find the safest mix.`],
    fig:FIG['Portfolio optimisation'] },

  { part:1, nav:'Robo-advisors', title:'How a robo-advisor works',
    narration:[`A robo-advisor asks about your goals and comfort with risk, proposes a portfolio, and rebalances it automatically when markets move. It is cheap and consistent, but special situations still need a human adviser.`],
    fig:FIG['Robo-advisors and trading'] },

  { part:2, nav:'Google Trends', title:'Read demand like a data analyst',
    narration:[`Businesses forecast demand from search data. In Google Trends, compare searches for “umbrella” and “sunscreen” in the United Arab Emirates over five years, and describe the seasonal pattern a shop could plan for.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Google Trends',by:'Google',url:'https://trends.google.com/trends/',steps:[
      {t:'Search',s:'two terms',d:'Compare “umbrella” and “sunscreen”.'},
      {t:'Filter',s:'UAE · 5 years',d:'Set the region to United Arab Emirates and the time to the past five years.'},
      {t:'Read',s:'the seasons',d:'When does each term peak every year?'},
      {t:'Decide',s:'as a shop owner',d:'When would you order stock for each product? Write one sentence.'}]})} },

  { part:2, nav:'Forecast in Sheets', title:'Make your first forecast',
    narration:[`Open a new Google Sheet, enter twelve months of sales, and let the FORECAST.LINEAR function predict month thirteen. Then add one unusual month and see how much a single outlier moves the prediction.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Google Sheets',by:'Google',account:'Google account',url:'https://sheets.new',steps:[
      {t:'Data',s:'12 months',d:'In A2:A13 type 1 to 12; in B2:B13 type monthly sales, for example 100, 104, 110…'},
      {t:'Forecast',s:'month 13',d:'In B14 type =FORECAST.LINEAR(13, B2:B13, A2:A13).'},
      {t:'Chart',s:'see the trend',d:'Select the data and insert a line chart.'},
      {t:'Outlier',s:'one bad month',d:'Change one month to 400. How far does the forecast move? What should an analyst do?'}]})} },

  { part:3, nav:'Case: Flash Crash', title:'Case: the Flash Crash of 6 May 2010',
    narration:[`On 6 May 2010 US stock prices plunged and recovered within about half an hour. The official SEC and CFTC report found that one large automated sell order, executed fast and without regard to price, triggered a chain reaction among trading algorithms.`],
    src:`Source: SEC & CFTC (2010). <a href="https://www.sec.gov/news/studies/2010/marketevents-report.pdf" target="_blank" rel="noopener">Findings regarding the market events of May 6, 2010</a>.`,
    fig:FIG['When algorithms go wrong'] },

  { part:3, nav:'Watch: Slavin', title:'Watch: how algorithms shape our world',
    narration:[`Kevin Slavin shows how trading and pricing algorithms already run much of the economy, sometimes in ways nobody fully understands. Watch and note one example that surprised you.`],
    fig:{label:`Watch`, build:el=>W.video(el,V['When algorithms go wrong'])} },

  { part:3, nav:'Risks and limits', title:'Risks and limits of AI in finance',
    narration:[`Finance AI can be biased, opaque, fooled by situations missing from its data, and dangerous when many firms use similar models at once. Open each risk and name one way to reduce it.`],
    fig:FIG['Risks and limits'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`Microsoft Learn's Fundamentals of machine learning module explains regression, classification and clustering, the models behind today's fraud, credit and forecasting examples. Finish it and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Assignment 2, “AI in my world”, is set this week: the brief, rubric and submission button are on the course page. The midterm is next week and covers Weeks 1 to 7.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
