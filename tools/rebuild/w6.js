Lecture.mount({
  id:'w6', week:6, clo:2, short:'Week 6 · AI in Healthcare',
  title:'Applications of AI: AI in Healthcare',
  meta:'TB Chapter 3 · 3 hours',
  scenes:[
  { part:1, nav:'Who reads your scan?', title:'Who should read your scan?',
    narration:[`Imagine your chest X-ray is waiting to be read. Vote: a doctor alone, the AI alone, or both together? Keep your answer; we test it against real evidence later today.`],
    fig:FIG['Who reads your scan?'] },

  { part:1, nav:'Where AI is used', title:'AI along the patient journey',
    narration:[`AI appears at every stage of care: triage, diagnosis, treatment planning, drug discovery, monitoring at home and hospital operations. Click each stage to see a real example.`],
    fig:FIG['Where AI is used'] },

  { part:1, nav:'Diagnostics', title:'Diagnosis is image classification', full:true,
    narration:[`A diagnostic model is the image classifier from Week 3, trained on thousands of labelled scans. It gives each new image a score, a threshold turns the score into a flag, and a clinician reviews the flagged cases and decides.`],
    fig:FIG['Diagnostics'] },

  { part:1, nav:'Set the threshold', title:'Missed cases or false alarms?', wide:true,
    narration:[`Every screening model needs a threshold. Set it low and you catch more disease but raise many false alarms. Set it high and alarms fall but you miss sick patients. Move the slider and decide which mistake is worse.`],
    fig:FIG['Set the threshold'] },

  { part:1, nav:'Drugs and personalised care', title:'From target to medicine',
    narration:[`Developing a new medicine usually takes many years. AI speeds up the early steps by predicting protein structures and which molecules might fit a target, so only the best candidates go to the lab and to clinical trials.`],
    fig:FIG['Drugs and personalised care'] },

  { part:2, nav:'AlphaFold DB', title:'Explore a protein structure predicted by AI',
    narration:[`The AlphaFold Protein Structure Database holds over 200 million structures predicted by DeepMind's AlphaFold. Search for haemoglobin or insulin, rotate the 3D model, and read the colour code that shows how confident the prediction is.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'AlphaFold Protein Structure Database',by:'Google DeepMind · EMBL-EBI',url:'https://alphafold.ebi.ac.uk/',steps:[
      {t:'Search',s:'a protein',d:'Type “human haemoglobin” or “insulin” in the search box.'},
      {t:'Open',s:'the 3D model',d:'Open an entry and rotate the structure with your mouse.'},
      {t:'Confidence',s:'blue vs orange',d:'Dark blue parts are predicted with high confidence; orange parts with low confidence.'},
      {t:'Discuss',s:'why it matters',d:'Why would a drug designer want to know the shape before testing molecules?'}]})} },

  { part:2, nav:'Model confidence', title:'Watch a model\'s confidence drop',
    narration:[`Open Teachable Machine again and train two classes: an open hand and a fist. Then show a half-open hand. The confidence falls, which is exactly the case a medical threshold must handle.`],
    fig:{label:`Tools lab`, build:el=>W.tool(el,{name:'Teachable Machine',by:'Google',url:'https://teachablemachine.withgoogle.com/train/image',steps:[
      {t:'Two classes',s:'open hand · fist',d:'Record about 50 webcam images of each.'},
      {t:'Train',s:'one click',d:'Press Train Model.'},
      {t:'Edge case',s:'half-open hand',d:'Watch the two confidence bars. Where would you set the threshold?'},
      {t:'Link',s:'to medicine',d:'In a hospital, who should look at the unclear cases?'}]})} },

  { part:3, nav:'Watch: AlphaFold', title:'Watch: solving a 50-year-old puzzle',
    narration:[`Predicting how a protein folds was a grand challenge in biology for fifty years. Watch how the AlphaFold team approached it; its creators shared the 2024 Nobel Prize in Chemistry.`],
    fig:{label:`Watch`, build:el=>W.video(el,V['Drugs and personalised care'])} },

  { part:3, nav:'Case: sepsis model', title:'Case: the sepsis alert that missed most patients',
    narration:[`Epic's sepsis model was used in hundreds of US hospitals. When Michigan Medicine tested it independently in 2021, it caught only about a third of sepsis patients and alerted on almost one in five of all patients. Vendor claims need independent testing.`],
    src:`Wong, A. et al. (2021). External validation of a widely implemented proprietary sepsis prediction model. <em>JAMA Internal Medicine</em>. <a href="https://ihpi.umich.edu/news/popular-sepsis-prediction-tool-less-accurate-claimed" target="_blank" rel="noopener">Summary, University of Michigan</a>.`,
    fig:FIG['Case: sepsis model'] },

  { part:3, nav:'Who is responsible?', title:'When AI is wrong, who is responsible?',
    narration:[`If an AI misses a cancer, who is to blame: the developer, the hospital, the doctor who trusted it, or the regulator who approved it? Divide the responsibility on the right and defend your split.`],
    fig:FIG['Who is responsible?'] },

  { part:3, kind:'bonus', nav:'AI Nerd', title:'AI Nerd · take it further',
    narration:[`Microsoft Learn's Introduction to computer vision module explains how models read images like the scans we studied today. Finish it, keep the trophy, and send your proof for a class-activity bonus.`] },

  { part:4, nav:'Practise & remember', title:'Practise & remember', full:true,
    narration:[`Open each branch of the mind map, then answer the six questions. Before Week 7, read RB c, Chapter 1, and choose your field for Assignment 2.`],
    fig:{label:`The week in one map · then six questions`, mindmap:FIG['Exam takeaways'].mindmap, build:FIG['Exit check'].build} }
  ]
});
