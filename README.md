
<!-- PREPAMATE
This is a resource which helps people who are students ,who aer working professionals trying to shift jobs to test their skills by the ai interviews ,which gives a detailed report which makes the user understand the strenghts and their weeknesses ans also suggests users on which they have to improve .
In total we have 4 modules 
1.AI Interview
2.Quiz 
3.Resume analysis
4.Resources

1.AI Interview 
    Here we are supposed to select the subject and then select the number of questions and the difficulty level (also included a test mode which will have 1 question asked) ,and the LLM will be asking the question and the user can answer it throught the keyboard and also the speech (the speech is converted internally into text to evaluate),after the interview the report for the interview is give whic  gives the detailed analysis if the interview like the score out of 10 ,what are the questions asked and what is the supposed answer which will increase the chances of selection .
2.Quiz
    Here we are supposed to select the subject and the number of questions(~10 questions are min),and then llm asks the questions(MCQ type) and the user is suppose to select the 1 out of 4 options ,and when the answer is selcted then the correct option is shown if the user answers it incorrectly and also shows the explaination why the answer is the crct .And at the end of the quiz it will show the score .
3.Resume Analysis 
    Here we are asked to upload the resume and the copy paste the jd (max ~5 MB) and click on the analysis button ,which when will go to the llm which checks the resume to the jd and gives a detailed report.
    The report will contain the following things 
        i.ATS score
        ii.the key words which are present and the missing key words which are missing
        iii.the question which are likely to be asked based on the resume 
        iv.checks for the format which should be present (like the correct contact info and etc )
        v.supposed corrections and add ons which should be included 
4.Resources 
    Here we made the resources in a way which is fun to learn .we got insipred from the duolingo like style ,so each subject is splitted into subtopics and each has its own youtube vedio and a web material which is best of it's category .if the user feels like he should be revising it later then we have dedicated button which makes users know these are the topics which are to revised .Each subtopic opens a road to the next ones ,and if the user directly wants to access the middle topics wthey can by using the unlock button 


Technology Stack :
The tech stack used here is MERN Stack .
LLM model used is llma versatile model which is quick and almost accurate ,we chose it beciase we sdont want the user to face lags which will distur the flow of the interviews and it stops the feel that the user is in the interview



Future Enhancements :
1.Adding more subjects
2.Adding api for speech to text and text to speech to increase the relatability to the user and increase the feel .
3.Add more resources and make it dynamically update based on the users feedback 
4.Add features like search jobs related to the uploaded resume and also exclusive contact of the poeple in the companies to contact for referals -->


# 🧠 PrepMate

**PrepMate** is an AI-powered preparation assistant designed for **students** and **working professionals** aiming to test, enhance, and track their skills through **AI Interviews, Quizzes, Resume Analysis, and Resource Learning** — all in one place.  

The platform helps users understand their **strengths**, **weaknesses**, and areas of **improvement** with detailed, data-driven feedback.

---

## 🚀 Features Overview

PrepMate consists of **4 key modules**:

### 1️⃣ AI Interview
- Choose your **subject**, **difficulty level**, and **number of questions** (or try **Test Mode** for a single question).
- The **LLM** (Large Language Model) asks interview questions.
- Users can **answer by typing** or **speaking** (speech is converted internally to text for evaluation).
- After completion, the system provides a **detailed report**:
  - Score out of 10  
  - Questions asked and their correct/ideal answers  
  - Personalized feedback for improvement  

---

### 2️⃣ Quiz
- Select your **subject** and **number of questions** (minimum of 10).
- The LLM presents **MCQs (Multiple Choice Questions)**.
- After each response:
  - Correct answers are revealed.
  - Explanations for each answer are displayed.
- A **final score** is shown at the end of the quiz.

---

### 3️⃣ Resume Analysis
- Upload your **resume (max ~5MB)** and **paste the Job Description (JD)**.
- The LLM analyzes and generates a detailed report that includes:
  1. **ATS Score**
  2. **Keywords present** and **missing**
  3. **Potential interview questions** based on the resume
  4. **Resume format validation** (contact info, layout, etc.)
  5. **Suggested improvements and add-ons**

---

### 4️⃣ Resources
- Designed in a **fun, gamified style** inspired by **Duolingo**.
- Each subject is split into **subtopics**.
- Every subtopic includes:
  - A **YouTube video**  
  - A **web article or material** carefully curated for quality  
- Users can:
  - Mark topics for **revision** later.
  - **Unlock** later topics manually to skip ahead if desired.

---

## 🧩 Technology Stack

**Frontend:** React.js (MERN Stack)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**LLM Model Used:** *LLaMA Versatile Model*  
- Chosen for its **speed** and **accuracy** to maintain a smooth, real-time interview experience.

---

## 🛠️ Folder Structure

```bash
PrepMate/
│
├── prepmate/              # Frontend (React App)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── prepmate-backend/      # Backend (Node + Express + MongoDB)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
>>>>>>> 44f723b (Fixed README formatting and structure):Readme.md
