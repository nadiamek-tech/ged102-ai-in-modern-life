/* GED 102 course assistant · knowledge base. Built from assets/course-data.js (FAQ, assessments, weeks) plus a few extras.
   q = question, k = extra words students may use, a = short answer, l = link. Never add exam questions here.
   Glossary terms and lecture scenes come from assets/search-index.js. */
(function(){
  const C=window.COURSE||{}, P=window.PROF||{};
  const strip=s=>String(s||'').replace(/<[^>]+>/g,'');
  const fill=s=>String(s).replace('{email}',C.email||P.email||'the professor').replace('{hours}',C.hours||P.officeHours||'Office hours').replace('{office}',C.office||P.office||'the professor’s office');
  const KB=(C.faq||[]).map(([q,a])=>({q,k:'',a:strip(fill(a)),l:'index.html'}));
  (C.assess||[]).forEach(a=>KB.push({q:'What is '+a.name+'?',k:[a.short,a.exam?'exam date covers':'assignment submit deadline brief rubric turnitin'].join(' '),
    a:`${a.name}: ${a.weight}% · Week ${a.week}. ${strip(a.brief)}`,l:a.exam?'exams.html':'index.html'}));
  (C.weeks||[]).forEach(w=>{ const [n,t,,ref,href]=w; if(href) KB.push({q:'Week '+n+': '+t,k:'week '+n+' lecture',a:'Week '+n+': '+t+(ref?'. Reading: '+ref:'')+'.',l:href}); });
  KB.push(
    {q:'How do I earn credentials?',k:'credential badge certificate cv bonus credly ibm google microsoft nerd',a:'Optional: one free unit a week from IBM, Google or Microsoft. Three badges by Week 14, and a class-activity bonus for every proof you submit.',l:'credentials.html'},
    {q:'Do I have to pay for the credentials?',k:'pay cost free price exam paid',a:'No. All units are free. Paid certification exams are not required.',l:'credentials.html'},
    {q:'When is the class?',k:'class time schedule lecture day',a:'On campus. This website supports the class; it does not replace classes, attendance or class activities.',l:'index.html'}
  );
  window.COURSE_KB=KB;
  window.COURSE_SUGGEST={'index.html':['What are the exams?','How is my grade calculated?','How do I earn credentials?'],
    'lectures.html':['What is AI?','What is machine learning?','What is an AI winter?'],
    'labs.html':['Can I use AI tools like ChatGPT for my assignments?','What is the AI Nerd bonus?','Where do I submit my assignments?'],
    'exams.html':['What are the exams?','What is Midterm Examination?','How many classes can I miss?'],
    'credentials.html':['How do I earn credentials?','Do I have to pay for the credentials?','What is the AI Nerd bonus?'],
    'review.html':['What are the exams?','What is machine learning?','What is an AI winter?']};
  window.COURSE_TOPICS=['Exams','Grades','Absence','Submissions','Machine learning','AI history','AI ethics','Credentials'];
})();
