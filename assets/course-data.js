/* GED 102 course system data. Edit the SETTINGS block when details change: every page updates.
   Leave a value as '' until you have it: buttons then show "coming soon" instead of a broken link. */
window.COURSE = {
  /* ---------- SETTINGS (fill these in) ---------- */
  code: 'GED 102', title: 'AI in Modern Life', term: 'Fall 2026',
  instructor: 'Nadia',
  /* email, office, office hours, form and portal links come from assets/professor.js (same file in every course) */
  email: (window.PROF||{}).email||'',
  office: (window.PROF||{}).office||'',
  hours: (window.PROF||{}).officeHours||'',
  booking: '',        // link to book office hours (Microsoft Bookings / Calendly / Teams); empty = students email to book
  helpForm: ((window.PROF||{}).links||{}).form||'',
  portal: ((window.PROF||{}).links||{}).portal||'',
  ask: ()=>window.CourseAssistant&&CourseAssistant.open(),
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
    [8,'Applications of AI: AI in Art, Entertainment and Creativity',2,'RB d Chapters 2, 7, 8','week-08.html'],
    [9,'Applications of AI: AI in Architecture and Design',2,'AI Concepts in Architectural Design, WEI Likai','week-09.html'],
    [10,'What AI Can\'t Do (Yet): Limits, Bias, and the "Black Box"',3,'RB e Chapters 2 and 6 · von Eschenbach','week-10.html'],
    [11,'AI Ethics and Responsible AI',3,'TB Chapter 13','week-11.html'],
    [12,'AI and Privacy – Data, Surveillance, and Security',3,'RB f Chapter 7','week-12.html'],
    [13,'AI and Autonomous Systems',4,'RB b Chapters 6 and 7','week-13.html'],
    [14,'AI and Human Collaboration',4,'TB Chapter 14','week-14.html'],
    [15,'Tomorrow\'s AI: Hopes, Fears, and Human Identity',4,'RB b Chapter 8','week-15.html'],
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
    [7,'Google Sheets','Make your first forecast','https://sheets.new',7],
    [8,'Real or Not? quiz','Can you beat 62% at spotting AI images?','https://www.realornotquiz.com/',1],
    [8,'Prompt builder + Copilot or Craiyon','Build a prompt, make an image, six prompt challenges','https://www.craiyon.com/',7],
    [8,'Which Face Is Real?','Spot the real face next to a GAN face','https://www.whichfaceisreal.com/',9],
    [9,'Google Earth','Visit the Museum of the Future in 3D','https://earth.google.com/web/',5],
    [9,'Microsoft Copilot (images)','Make a concept image, then critique it','https://copilot.microsoft.com/',6],
    [10,'AI Incident Database','Investigate real AI failures','https://incidentdatabase.ai/',6],
    [10,'Teachable Machine','Build a biased model on purpose','https://teachablemachine.withgoogle.com/train/image',7],
    [11,'Moral Machine','Judge like a self-driving car','https://www.moralmachine.net/',5],
    [11,'PAIR Explorables','Explore what “fair” means with numbers','https://pair.withgoogle.com/explorables/measuring-fairness/',6],
    [12,'Have I Been Pwned','Has your email been in a data breach?','https://haveibeenpwned.com/',5],
    [12,'Am I Unique?','How unique is your browser fingerprint?','https://amiunique.org/',6],
    [13,'Will Robots Take My Job?','Check the automation risk of a job','https://willrobotstakemyjob.com/',5],
    [13,'Microsoft Copilot','Audit your future job, task by task','https://copilot.microsoft.com/',6],
    [14,'Microsoft Copilot','Race: human, AI, or both?','https://copilot.microsoft.com/',5],
    [14,'NotebookLM','Use AI to study, not to skip studying','https://notebooklm.google.com/',6],
    [15,'AI Index Report','Read the data on AI’s progress','https://aiindex.stanford.edu/',5],
    [15,'Microsoft Copilot','Write a letter from your future self','https://copilot.microsoft.com/',6]
  ],

  /* ---------- assessments (syllabus); add submit links and deadlines when ready ---------- */
  assess: [
    { id:'quiz1', short:'Quiz 1', name:'Quiz 1', weight:10, week:'', clo:'1, 2', type:'Quiz · in class', covers:'Topics taught before the quiz', submit:'', due:'', done:true, inclass:true,
      brief:'An in-class quiz out of 10. It has already been taken; grades are on the student portal.' },
    { id:'mid', short:'Midterm', name:'Midterm Examination', weight:30, week:8, clo:'1, 2', type:'Exam · lecture', covers:'Weeks 1–7',
      submit:'', due:'', exam:true,
      brief:'The midterm will cover the topics taught during the first seven weeks. It helps you and your instructor see what you have mastered and where you need more support.' },
    { id:'proj', short:'Project', name:'Course Project · AI Reality Check', weight:10, week:10, clo:'2, 3', type:'Course project · individual, in class', covers:'Weeks 1–10: applications, limits, bias and the black box',
      submit:'', due:'', inclass:true, page:'project-10.html',
      brief:'An individual 50-minute project in class. You test Copilot in one context with three tests (accuracy, bias, black box), analyse the results with a course concept and give a trust verdict. Save it as a PDF and upload it to Moodle before you leave.',
      rubric:[['Three tests: what happened, verdict, evidence (4 marks)','Fewer than two tests','Two tests, or answers without checking','Three tests with verdicts','Three tests with clear evidence and checks'],
              ['Analysis with a course concept (3 marks)','No concept used','A concept named but not explained','A concept used correctly','A concept used precisely and linked to the tests'],
              ['Verdict and safeguard (3 marks)','No verdict','Verdict without a safeguard','Clear verdict with one safeguard','Convincing verdict with a practical, specific safeguard']] },
    { id:'quiz2', short:'Quiz 2', name:'Quiz 2', weight:10, week:'', clo:'3, 4', type:'Quiz · in class', covers:'Topics taught after the midterm', submit:'', due:'', inclass:true,
      brief:'An in-class quiz out of 10 on the topics taught after the midterm. The date will be announced in class.' },
    { id:'final', short:'Final', name:'Final Examination', weight:40, week:16, clo:'1–4', type:'Exam · lecture', covers:'All weeks (1–15)',
      submit:'', due:'', exam:true,
      brief:'A comprehensive exam on the whole course. It evaluates your understanding of everything covered during the term.' }
  ],

  /* ---------- syllabus details (verbatim where the syllabus gives wording) ---------- */
  description: 'This course provides a broad, interdisciplinary introduction to Artificial Intelligence (AI) for students from all academic backgrounds. It explores the origins, principles, and societal implications of AI technologies, examining how they affect our everyday lives, from healthcare and education to entertainment and communication. Emphasis is placed on ethical questions, privacy concerns, creativity, and the future of work and human identity in an AI-driven world. No technical background is required.',
  books: [
    ['TB','Moutinho, L., Cavique, L., & Bigné, E. (2023). Philosophy of artificial intelligence and its place in society. IGI Global.'],
    ['RB a','Mitchell, M. (2020). Artificial intelligence: A guide for thinking humans. Penguin Books.'],
    ['RB b','Kaplan, J. (2016). Artificial intelligence: What everyone needs to know. Oxford University Press.'],
    ['RB c','Dunis, C. L., Middleton, P. W., Karathanasopolous, A., & Theofilatos, K. (2017). Artificial intelligence in financial markets: Cutting-edge applications for risk management, portfolio optimization and economics. Palgrave Macmillan.'],
    ['RB d','Du Sautoy, M. (2019). The creativity code: Art and innovation in the age of AI. Harvard University Press.'],
    ['RB e','Cebral-Loureda, M., Rincón-Flores, E. G., & Sanchez-Ante, G. (2023). What AI can do: Strengths and limitations of artificial intelligence. CRC Press.'],
    ['RB f','Santos, O., & Radanliev, P. (2024). Beyond the algorithm: AI, security, privacy, and ethics. Pearson.']
  ],
  subs: {
    1:['What is AI?','The Foundations of Artificial Intelligence','Is AI a real science?','Can a computer ever really be smarter than a human being?'],
    2:['The History of Artificial Intelligence','The Roots of Artificial Intelligence','Neural Networks and the Ascent of Machine Learning','AI Spring'],
    3:['The State of the Art','What Are the Leading AI and ML Technologies and Algorithms?','ChatGPT and the Leading AI and ML Technologies: Exploring Capabilities and Applications'],
    4:['Ask Me Anything','The Impact of AI on Social Equity','Who’s going to benefit from this technological revolution?','Are the disruptive effects inevitable?'],
    5:['The Incorporation of Large Language Models (LLMs) in the Field of Education: Ethical Possibilities, Threats, and Opportunities'],
    6:['Artificial Intelligence in Healthcare'],
    7:['Artificial Intelligence in Financial Markets Cutting Edge Applications for Risk Management, Portfolio Optimization and Economics'],
    8:['Three Types of Creativity','Painting by Numbers','Learning from the Masters'],
    9:['AI Concepts in Architectural Design'],
    10:['Going through the Challenges of Artificial Intelligence: Gray Eminences, Algocracy, Automated Unconsciousness','The Neurocomputational Becoming of Intelligence: Philosophical Challenges','Transparency and the Black Box Problem: Why We Do Not Trust AI'],
    11:['Ethical Issues of Artificial Intelligence (AI): Strategic Solutions','Risks and Benefits of AI'],
    12:['Privacy and Ethics: Navigating Privacy and Ethics in an AI-Infused World','The Dark Side of AI and ChatGPT: Privacy Concerns and Ethical Implications','Data Collection and Data Storage in AI Algorithms: Potential Risks and Ethical Privacy Concerns','The Moral Tapestry of AI and ChatGPT'],
    13:['The Impact of Artificial Intelligence on Human Labor','Are there alternatives to a labor-based society?','Why should people go to work if they could live comfortably without doing so?'],
    14:['Intelligence Augmentation via Human-AI Symbiosis: Formulating Wise Systems for a Metasociety'],
    15:['Possible Future Impacts of Artificial Intelligence']
  },
  policies: [
    ['Attendance','Attending classes is compulsory. An email reminder is sent at 10% and at 20% absence. At 25% absence the grade is “FA” (Grade Point 0.0) and you cannot take the final exam.'],
    ['Academic integrity','Cheating and plagiarism are recorded in your file and sanctioned under the Academic Integrity Policy. Assignments go through Turnitin; the maximum similarity index is 20%.'],
    ['Incomplete work','An “I” grade may be granted for verifiable reasons beyond your control. You have 12 calendar months to complete the work; after that it becomes “F”.'],
    ['Grading scale','A+ 90–100 · A 80–89 · B+ 75–79 · B 70–74 · C+ 65–69 · C 60–64 · D+ 55–59 · D 50–54 · F 0–49']
  ],

  /* ---------- FAQ (edit freely) ---------- */
  faq: [
    ['How do I contact the professor?', 'Email {email}. Write your name, student ID and “GED 102” in the subject line. You can also use “General help” above.'],
    ['When are office hours?', '{hours} in {office}. You are welcome to drop in during these times.'],
    ['How do I book an office-hour meeting?', 'Press “Meet the professor” at the top of this page and choose a time. If no slot fits, email the professor with two times that suit you.'],
    ['I missed a class. What should I do?', 'Open that week’s lecture on this site: every scene can be read or listened to. Then press “I was / will be absent” for future absences, and keep any official excuse (for example a medical certificate).'],
    ['I missed an exam or a deadline. What happens now?', 'Contact the professor by email the same day, with your reason and any official evidence. A make-up or extension is possible only with an excuse accepted under university policy.'],
    ['How many classes can I miss?', 'The university sends a reminder at 10% and 20% absence. At 25% absence you receive “FA” (Failure for Non-Attendance) and cannot sit the final exam.'],
    ['What are the exams?', 'Two exams: the Midterm (30%) in Week 8 covers Weeks 1–7, and the Final (40%) in Week 16 covers the whole course. Open “Exams” at the top for details and the review page.'],
    ['How is my grade calculated?', 'Coursework 30% (Quiz 1: 10%, Course project: 10%, Quiz 2: 10%), Midterm 30%, Final exam 40%.'],
    ['Where do I submit my assignments?', 'Use the Submit buttons under “Upcoming submissions”. Each one opens the right Moodle submission page. Assignments go through Turnitin; the maximum similarity index is 20%.'],
    ['Can I use AI tools like ChatGPT for my assignments?', 'You can use AI to learn, brainstorm and check your understanding. The work you submit must be your own, and you must say how you used AI. Submitting AI-written text as your own is plagiarism.'],
    ['Where do I see my grades?', 'Press “Check my grades” to open the student faculty portal.'],
    ['What is the AI Nerd bonus?', 'Each lecture ends Part 3 with a free unit from IBM, Google or Microsoft. Finish it and submit proof for a class-activity bonus. Track your progress on “My Credentials”.'],
    ['What happens in each 3-hour lecture?', 'Part 1 is the lecture (60 minutes), Part 2 is a tools lab where you try real AI tools (60 minutes), and Part 3 is case studies and the AI Nerd session (50 minutes). Each lecture ends with “Practise & remember”.'],
    ['The narration does not play. What can I do?', 'Press Listen again, check your volume, or use another browser (Chrome or Edge work best). You can always read the scene instead.']
  ]
};
