/* GED 102 micro-credential pathway. One free module per week, in each provider's own order.
   Verified Oct 2026: IBM SkillsBuild (free, Credly badge), Google Skills / Cloud Skills Boost (free skill badge),
   Microsoft Learn (free modules, trophies on Learn profile). */
window.COURSE_CREDS = {
  badges: [
    { id:'ibm', prov:'IBM SkillsBuild', name:'Artificial Intelligence Fundamentals', proof:'Credly digital badge', done:13, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals', account:'Free IBM SkillsBuild + Credly accounts' },
    { id:'google', prov:'Google', name:'Generative AI Fundamentals', proof:'Google skill badge', done:10, url:'https://www.cloudskillsboost.google/course_templates/556', account:'Free Google account' },
    { id:'ms', prov:'Microsoft Learn', name:'AI concepts modules', proof:'Trophies on your Learn profile', done:14, url:'https://learn.microsoft.com/training/', account:'Free Microsoft account' }
  ],
  weeks: {
    1: { b:'ibm', mod:'Introduction to Artificial Intelligence', part:'Course 1 of 6', min:75, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    2: { b:'ms', mod:'Introduction to AI concepts', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/get-started-ai-fundamentals/' },
    3: { b:'ibm', mod:'Natural Language Processing and Computer Vision', part:'Course 2 of 6', min:90, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    4: { b:'ibm', mod:'Machine Learning and Deep Learning', part:'Course 3 of 6', min:105, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    5: { b:'google', mod:'Introduction to Generative AI + Introduction to Large Language Models', part:'Courses 1–2 of 3', min:null, url:'https://www.cloudskillsboost.google/course_templates/536' },
    6: { b:'ms', mod:'Introduction to computer vision', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/introduction-computer-vision/' },
    7: { b:'ms', mod:'Fundamentals of machine learning', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/fundamentals-machine-learning/' },
    8: { b:'ms', mod:'Fundamentals of generative AI', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/fundamentals-generative-ai/' },
    9: { b:'ibm', mod:'Run AI Models with IBM Watson Studio', part:'Course 4 of 6', min:105, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    10:{ b:'google', mod:'Introduction to Responsible AI + final quiz', part:'Course 3 of 3 · badge', min:null, url:'https://www.cloudskillsboost.google/course_templates/554' },
    11:{ b:'ibm', mod:'AI Ethics', part:'Course 5 of 6', min:105, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    12:{ b:'ms', mod:'Embrace responsible AI principles and practices', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/embrace-responsible-ai-principles-practices' },
    13:{ b:'ibm', mod:'Your Future in AI: The Job Landscape', part:'Course 6 of 6 · badge', min:50, url:'https://skillsbuild.org/college-students/course-catalog/artificial-intelligence-fundamentals' },
    14:{ b:'ms', mod:'Introduction to natural language processing', part:'Module', min:null, url:'https://learn.microsoft.com/training/modules/introduction-language/' },
    15:{ b:'all', mod:'Claim and share your three badges', part:'Portfolio', min:null, url:'credentials.html' }
  }
};
