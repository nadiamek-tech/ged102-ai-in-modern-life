/* GED 102 course system data. Edit the SETTINGS block when details change: every page updates.
   Leave a value as '' until you have it: buttons then show "coming soon" instead of a broken link. */
window.COURSE = {
  /* ---------- SETTINGS (fill these in) ---------- */
  code: 'GED 102', title: 'AI in Modern Life', term: 'Fall 2026',
  instructor: 'Eng. Nadia Mek',
  email: '',          // e.g. 'nadia.mek@cud.ac.ae'
  office: '',         // e.g. 'Room 2.14, Building A'
  hours: '',          // e.g. 'Mon and Wed, 12:00–13:30'
  booking: '',        // link to book office hours (Microsoft Bookings / Calendly / Teams)
  helpForm: '',       // one Microsoft Form for "I need help", "I will be absent", "Meet the professor"
  portal: '',         // student faculty portal (grades)
  moodle: '',         // Moodle course page
  start: '',          // Monday of Week 1 as YYYY-MM-DD; week dates are then calculated automatically

  /* ---------- course learning outcomes (syllabus, verbatim) ---------- */
  clos: [
    'Explain the fundamental concepts, history, and development of artificial intelligence',
    'Identify how AI technologies are applied in different aspects of daily life.',
    'Discuss the ethical, legal, and social issues surrounding the use of AI.',
    'Assess the potential future of AI and its implications for humanity.'
  ],

  /* ---------- weekly plan (syllabus, verbatim) ---------- */
  weeks: [
    [1,'Introduction to AI',1,'RB b Chapter 1','week-01.html'],
    [2,'The History of AI',1,'RB a Chapters 1-3','week-02.html'],
    [3,'How AI Thinks – Smart Tools, Not Magic',1,'RB f Chapter 2','week-03.html'],
    [4,'AI in Everyday Life',2,'RB a Chapter 13 · RB b Chapter 7','week-04.html'],
    [5,'Applications of AI: Education and Learning',2,'TB Chapter 5','week-05.html'],
    [6,'Applications of AI: AI in Healthcare',2,'TB Chapter 3','week-06.html'],
    [7,'Applications of AI: AI in Finances and Business',2,'RB c Chapter 1','week-07.html'],
    [8,'Applications of AI: AI in Art, Entertainment and Creativity',2,'RB d Chapters 2, 7, 8',''],
    [9,'Applications of AI: AI in Architecture and Design',2,'AI Concepts in Architectural Design, WEI Likai',''],
    [10,'What AI Can\'t Do (Yet): Limits, Bias, and the "Black Box"',3,'RB e Chapters 2 and 6 · von Eschenbach',''],
    [11,'AI Ethics and Responsible AI',3,'TB Chapter 13',''],
    [12,'AI and Privacy – Data, Surveillance, and Security',3,'RB f Chapter 7',''],
    [13,'AI and Autonomous Systems',4,'RB b Chapters 6 and 7',''],
    [14,'AI and Human Collaboration',4,'TB Chapter 14',''],
    [15,'Tomorrow\'s AI: Hopes, Fears, and Human Identity',4,'RB b Chapter 8',''],
    [16,'Final Exam',0,'','']
  ],

  /* ---------- tools lab (Part 2 of each lecture); s = scene number in the week page ---------- */
  labs: [
    [1,'Teachable Machine','Train an image model with your webcam','https://teachablemachine.withgoogle.com/',7],
    [1,'Quick, Draw!','A neural network guesses your doodles','https://quickdraw.withgoogle.com/',8],
    [2,'ELIZA','Chat with the first chatbot (1966)','https://masswerk.at/elizabot/',6],
    [2,'Lichess analysis board','Watch a chess engine search','https://lichess.org/analysis',7],
    [3,'TensorFlow Playground','Train a neural network in the browser','https://playground.tensorflow.org/',6],
    [3,'Transformer Explainer','Look inside a real GPT-2 model','https://poloclub.github.io/transformer-explainer/',7],
    [4,'My Ad Center','See what Google thinks you like','https://myadcenter.google.com/',4],
    [4,'Survival of the Best Fit','Build a hiring algorithm and watch it go wrong','https://www.survivalofthebestfit.com/',5],
    [5,'Microsoft Copilot','Use AI as a tutor, not a ghost-writer','https://copilot.microsoft.com/',5],
    [5,'NotebookLM','An AI that answers only from your sources','https://notebooklm.google.com/',6],
    [6,'AlphaFold Protein Structure Database','Explore AI-predicted protein structures','https://alphafold.ebi.ac.uk/',5],
    [6,'Teachable Machine','Watch a model\'s confidence drop','https://teachablemachine.withgoogle.com/train/image',6],
    [7,'Google Trends','Read seasonal demand in the UAE','https://trends.google.com/trends/',6],
    [7,'Google Sheets','Make your first forecast','https://sheets.new',7]
  ],

  /* ---------- assessments (syllabus); add submit links and deadlines when ready ---------- */
  assess: [
    { id:'a1', short:'A1', name:'Assignment 1 · Where it all began', weight:5, week:3, clo:1, type:'Assignment', covers:'Weeks 1–2: history of AI',
      submit:'', due:'',
      brief:'Choose one important moment, person, or invention in the history of AI and explain why it matters. You may write a short essay, create a timeline, or prepare a brief presentation to show how this milestone helped shape today’s AI.',
      rubric:[['Historical Understanding','No clear explanation; major facts missing or incorrect','Basic info provided, but lacks clarity or depth','Accurate description of a key event, person, or idea in AI history','Clear, engaging, and accurate explanation with thoughtful connections'],
              ['Clarity and Communication','Disorganized or hard to follow','Some structure but difficult to follow at times','Mostly clear and structured','Very clear, well-organized, and engaging'],
              ['Creativity/ Presentation','No effort to present visually or creatively','Minimal creativity or visual support','Some creativity shown through format or design','Highly creative format or presentation, adds depth and engagement']] },
    { id:'a2', short:'A2', name:'Assignment 2 · AI in my world', weight:5, week:7, clo:2, type:'Assignment', covers:'Weeks 4–7: AI applications',
      submit:'', due:'',
      brief:'Pick a field you’re interested in—like art, business, healthcare, or education—and explore how AI is being used there. Describe its benefits, challenges, and give real examples that show how it’s changing the way people work or live.',
      rubric:[['Relevance to Topic','Off-topic or unclear focus','Somewhat related but vague or limited','Clearly connects AI to a chosen field','Strong, relevant focus with personal insight or unique connection'],
              ['Explanation and Examples','Little or no detail; lacks real examples','Provides few or shallow examples','Gives good real-world examples with basic explanation','Provides thoughtful, well-explained examples showing strong understanding'],
              ['Critical Reflection','No reflection or critical thinking','Some opinion stated but without depth','Reflects on benefits and challenges of AI in the field','Strong insight with balanced view and thoughtful reflection']] },
    { id:'mid', short:'Midterm', name:'Midterm Examination', weight:30, week:8, clo:'1, 2', type:'Exam · lecture', covers:'Weeks 1–7',
      submit:'', due:'', exam:true,
      brief:'The midterm will cover the topics taught during the first seven weeks. It helps you and your instructor see what you have mastered and where you need more support.' },
    { id:'a3', short:'A3', name:'Assignment 3 · Can we trust AI?', weight:10, week:12, clo:3, type:'Assignment', covers:'Weeks 10–12: limits, ethics, privacy',
      submit:'', due:'',
      brief:'Write a short reflection or essay discussing a major ethical concern about AI, such as privacy, bias, or job loss. Use examples from real life or the news, and explain your own opinion on how we should deal with the issue.',
      rubric:[['Ethical Awareness','Shows little understanding of ethical concerns','Mentions basic issues but lacks explanation','Describes key ethical concerns like bias, privacy, or surveillance','Demonstrates deep understanding and personal insight into ethical issues'],
              ['Use of Examples','No examples or irrelevant ones','Includes limited or general examples','Uses relevant real-life or news-based examples to support ideas','Excellent examples with meaningful connection to the topic'],
              ['Argument and Balance','One-sided or unclear viewpoint','Basic opinion with weak support','Balanced argument with logical reasoning','Well-supported, nuanced argument with clear ethical reasoning']] },
    { id:'a4', short:'A4', name:'Assignment 4 · AI Tomorrow', weight:10, week:14, clo:4, type:'Assignment', covers:'Weeks 13–15: the future of AI',
      submit:'', due:'',
      brief:'Imagine how AI might shape the future of society, your profession, or your daily life. Present your ideas in a short essay, creative story, vision board, or short video, supported with current trends or expert opinions.',
      rubric:[['Imagination and Vision','Vague or unrealistic future ideas','Some future ideas, lacks clarity or depth','Thoughtful and realistic predictions about AI’s future','Inspiring, creative, and well-grounded vision for AI’s future'],
              ['Personal or Societal Link','No connection to self or society','Basic connection, but not well explained','Clear relevance to student’s life, career, or society','Strong personal reflection or social insight with supporting context'],
              ['Format and Presentation','Disorganized or hard to understand','Acceptable format but needs polish','Clear and structured delivery (essay, video, etc.)','Very polished, engaging, and creative in form and content']] },
    { id:'final', short:'Final', name:'Final Examination', weight:40, week:16, clo:'1–4', type:'Exam · lecture', covers:'All weeks (1–15)',
      submit:'', due:'', exam:true,
      brief:'A comprehensive exam on the whole course. It evaluates your understanding of everything covered during the term.' }
  ],

  /* ---------- FAQ (edit freely) ---------- */
  faq: [
    ['How do I contact the professor?', 'Email {email}. Write your name, student ID and “GED 102” in the subject line. You can also use the “I need help” button above.'],
    ['When are office hours?', '{hours} in {office}. You are welcome to drop in during these times.'],
    ['How do I book an office-hour meeting?', 'Press “Meet the professor” at the top of this page and choose a time. If no slot fits, email the professor with two times that suit you.'],
    ['I missed a class. What should I do?', 'Open that week’s lecture on this site: every scene can be read or listened to. Then press “I will be absent” for future absences, and keep any official excuse (for example a medical certificate).'],
    ['I missed an exam or a deadline. What happens now?', 'Contact the professor by email the same day, with your reason and any official evidence. A make-up or extension is possible only with an excuse accepted under CUD policy.'],
    ['How many classes can I miss?', 'CUD sends a reminder at 10% and 20% absence. At 25% absence you receive “FA” (Failure for Non-Attendance) and cannot sit the final exam.'],
    ['What are the exams?', 'Two exams: the Midterm (30%) in Week 8 covers Weeks 1–7, and the Final (40%) in Week 16 covers the whole course. Open “Exams” at the top for details and the review page.'],
    ['How is my grade calculated?', 'Assignment 1 (5%), Assignment 2 (5%), Assignment 3 (10%), Assignment 4 (10%), Midterm (30%), Final (40%).'],
    ['Where do I submit my assignments?', 'Use the Submit buttons under “Upcoming submissions”. Each one opens the right Moodle submission page. Assignments go through Turnitin; the maximum similarity index is 20%.'],
    ['Can I use AI tools like ChatGPT for my assignments?', 'You can use AI to learn, brainstorm and check your understanding. The work you submit must be your own, and you must say how you used AI. Submitting AI-written text as your own is plagiarism.'],
    ['Where do I see my grades?', 'Press “Check my grades” to open the student faculty portal.'],
    ['What is the AI Nerd bonus?', 'Each lecture ends Part 3 with a free unit from IBM, Google or Microsoft. Finish it and submit proof for a class-activity bonus. Track your progress on “My Credentials”.'],
    ['What happens in each 3-hour lecture?', 'Part 1 is the lecture (60 minutes), Part 2 is a tools lab where you try real AI tools (60 minutes), and Part 3 is case studies and the AI Nerd session (50 minutes). Each lecture ends with “Practise & remember”.'],
    ['The narration does not play. What can I do?', 'Press Listen again, check your volume, or use another browser (Chrome or Edge work best). You can always read the scene instead.']
  ]
};
