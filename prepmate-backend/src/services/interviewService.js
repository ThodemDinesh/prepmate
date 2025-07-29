// const Groq = require('groq-sdk');

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// class InterviewService {
//   constructor() {
//     this.topicPrompts = {
//       algorithms: {
//         basic: "Generate a basic data structures and algorithms interview question suitable for junior developers. Focus on fundamental concepts like arrays, strings, or simple sorting.",
//         intermediate: "Create an intermediate algorithms question involving hash maps, trees, or graph traversal. Include time complexity analysis.",
//         advanced: "Design an advanced algorithms question about dynamic programming, advanced tree structures, or complex graph algorithms."
//       },
//       'system-design': {
//         basic: "Generate a basic system design question about simple web applications, basic database design, or client-server architecture.",
//         intermediate: "Create an intermediate system design question about caching, load balancing, or microservices architecture.",
//         advanced: "Design an advanced system design question about distributed systems, scalability challenges, or complex architectural patterns."
//       },
//       javascript: {
//         basic: "Generate a basic JavaScript question about variables, functions, or basic ES6 features like let/const and arrow functions.",
//         intermediate: "Create an intermediate JavaScript question about closures, prototypes, async/await, or event handling.",
//         advanced: "Design an advanced JavaScript question about performance optimization, memory management, or complex design patterns."
//       },
//       react: {
//         basic: "Generate a basic React question about JSX, props, state, or basic hooks like useState and useEffect.",
//         intermediate: "Create an intermediate React question about custom hooks, context API, or component optimization techniques.",
//         advanced: "Design an advanced React question about performance optimization, concurrent features, or complex state management patterns."
//       },
//       database: {
//         basic: "Generate a basic database question about SQL queries, table relationships, or basic normalization.",
//         intermediate: "Create an intermediate database question about indexing, query optimization, or transaction management.",
//         advanced: "Design an advanced database question about database scaling, replication, or complex query optimization."
//       },
//       resume: {
//         basic: "Generate a behavioral question about a specific project experience, focusing on problem-solving approach.",
//         intermediate: "Create a question about leadership, team collaboration, or handling technical challenges under pressure.",
//         advanced: "Design a strategic question about technical decision-making, architecture choices, or mentoring others."
//       },
//       behavioral: {
//         basic: "Generate a behavioral question about teamwork, communication, or learning new technologies.",
//         intermediate: "Create a behavioral question about conflict resolution, time management, or adapting to change.",
//         advanced: "Design a behavioral question about leadership, strategic thinking, or driving technical initiatives."
//       },
//       networking: {
//         basic: "Generate a basic networking question about OSI model, TCP/UDP, or basic HTTP concepts.",
//         intermediate: "Create an intermediate networking question about DNS, routing, or network security basics.",
//         advanced: "Design an advanced networking question about network protocols, performance optimization, or distributed network architectures."
//       }
//     };
//   }

//   getDifficultyLevel(questionNumber) {
//     if (questionNumber === 1) return 'basic';
//     if (questionNumber <= 2) return 'intermediate';
//     return 'advanced';
//   }

//   async generateQuestion(topic, questionNumber, previousQuestions = []) {
//     try {
//       const difficulty = this.getDifficultyLevel(questionNumber);
//       const basePrompt = this.topicPrompts[topic]?.[difficulty] || this.topicPrompts.algorithms.basic;
      
//       const previousQuestionsText = previousQuestions.length > 0 
//         ? `\n\nPrevious questions already asked:\n${previousQuestions.map((q, i) => `${i+1}. ${q}`).join('\n')}\n`
//         : '';

//       const fullPrompt = `${basePrompt}

// ${previousQuestionsText}

// Requirements:
// 1. Make the question COMPLETELY DIFFERENT from any previous questions listed above
// 2. Ensure it's appropriate for ${difficulty} level
// 3. Make it engaging and encourage detailed explanations
// 4. Keep it realistic for a technical interview
// 5. Return ONLY the question text, no additional formatting or explanations
// 6. Do NOT repeat or rephrase any of the previous questions

// Generate a NEW, UNIQUE interview question:`;

//       console.log(`🤖 Generating ${difficulty} question for ${topic}, question #${questionNumber}`);
      
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: "You are an experienced technical interviewer who creates challenging but fair interview questions. NEVER repeat questions that have been asked before. Generate completely unique, diverse questions that test different aspects of the topic."
//           },
//           {
//             role: "user",
//             content: fullPrompt
//           }
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.9,
//         max_tokens: 300,
//         top_p: 1,
//         stream: false,
//       });

//       const question = completion.choices[0]?.message?.content?.trim();
      
//       if (!question) {
//         throw new Error('No question generated');
//       }

//       console.log(`✅ Generated question: "${question.substring(0, 100)}..."`);

//       return {
//         success: true,
//         question: question,
//         difficulty: difficulty,
//         topic: topic
//       };

//     } catch (error) {
//       console.error('❌ Groq API Error:', error);
//       return {
//         success: false,
//         error: error.message,
//         fallback: this.getFallbackQuestion(topic, questionNumber)
//       };
//     }
//   }

//   getFallbackQuestion(topic, questionNumber) {
//     const fallbackQuestions = {
//       algorithms: [
//         "Explain how binary search works and analyze its time complexity.",
//         "How would you implement a hash table and handle collisions?",
//         "Describe the difference between BFS and DFS traversal algorithms.",
//         "Explain dynamic programming with the fibonacci sequence example."
//       ],
//       'system-design': [
//         "How would you design a URL shortening service like bit.ly?",
//         "Design a chat application that can handle thousands of concurrent users.",
//         "How would you implement a caching layer for a high-traffic web application?",
//         "Design a distributed file storage system similar to Dropbox."
//       ],
//       javascript: [
//         "Explain the difference between var, let, and const in JavaScript.",
//         "How do closures work in JavaScript? Provide a practical example.",
//         "What is the event loop and how does it handle asynchronous operations?",
//         "Explain prototypal inheritance and how it differs from classical inheritance."
//       ],
//       react: [
//         "What are React Hooks and why were they introduced?",
//         "Explain the difference between controlled and uncontrolled components.",
//         "How would you optimize a React application for better performance?",
//         "Describe how you would implement global state management in React."
//       ],
//       database: [
//         "What's the difference between SQL and NoSQL databases?",
//         "Explain database indexing and how it improves query performance.",
//         "How would you design a database schema for an e-commerce platform?",
//         "Describe ACID properties and their importance in database transactions."
//       ],
//       resume: [
//         "Tell me about a challenging technical problem you solved recently.",
//         "Describe a time when you had to learn a new technology quickly.",
//         "How do you approach debugging complex issues in production?",
//         "Tell me about a project where you had to make important architectural decisions."
//       ],
//       behavioral: [
//         "Describe a situation where you had to work with a difficult team member.",
//         "How do you handle tight deadlines and competing priorities?",
//         "Tell me about a time when you had to give constructive feedback to a colleague.",
//         "Describe a project where you took initiative beyond your assigned responsibilities."
//       ],
//       networking: [
//         "Explain what happens when you type a URL in your browser.",
//         "What's the difference between TCP and UDP protocols?",
//         "How does DNS resolution work in detail?",
//         "Explain how HTTPS ensures secure communication between client and server."
//       ]
//     };

//     const questions = fallbackQuestions[topic] || fallbackQuestions.algorithms;
//     const index = Math.min(questionNumber - 1, questions.length - 1);
//     return questions[index];
//   }
// }

// module.exports = new InterviewService();

//second draft
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

class InterviewService {
  constructor() {
    this.topicPrompts = {
      algorithms: {
        basic: "Generate a basic data structures and algorithms interview question suitable for junior developers. Focus on fundamental concepts like arrays, strings, or simple sorting.",
        intermediate: "Create an intermediate algorithms question involving hash maps, trees, or graph traversal. Include time complexity analysis.",
        advanced: "Design an advanced algorithms question about dynamic programming, advanced tree structures, or complex graph algorithms."
      },
      'system-design': {
        basic: "Generate a basic system design question about simple web applications, basic database design, or client-server architecture.",
        intermediate: "Create an intermediate system design question about caching, load balancing, or microservices architecture.",
        advanced: "Design an advanced system design question about distributed systems, scalability challenges, or complex architectural patterns."
      },
      javascript: {
        basic: "Generate a basic JavaScript question about variables, functions, or basic ES6 features like let/const and arrow functions.",
        intermediate: "Create an intermediate JavaScript question about closures, prototypes, async/await, or event handling.",
        advanced: "Design an advanced JavaScript question about performance optimization, memory management, or complex design patterns."
      },
      react: {
        basic: "Generate a basic React question about JSX, props, state, or basic hooks like useState and useEffect.",
        intermediate: "Create an intermediate React question about custom hooks, context API, or component optimization techniques.",
        advanced: "Design an advanced React question about performance optimization, concurrent features, or complex state management patterns."
      },
      database: {
        basic: "Generate a basic database question about SQL queries, table relationships, or basic normalization.",
        intermediate: "Create an intermediate database question about indexing, query optimization, or transaction management.",
        advanced: "Design an advanced database question about database scaling, replication, or complex query optimization."
      },
      resume: {
        basic: "Generate a behavioral question about a specific project experience, focusing on problem-solving approach.",
        intermediate: "Create a question about leadership, team collaboration, or handling technical challenges under pressure.",
        advanced: "Design a strategic question about technical decision-making, architecture choices, or mentoring others."
      },
      behavioral: {
        basic: "Generate a behavioral question about teamwork, communication, or learning new technologies.",
        intermediate: "Create a behavioral question about conflict resolution, time management, or adapting to change.",
        advanced: "Design a behavioral question about leadership, strategic thinking, or driving technical initiatives."
      },
      networking: {
        basic: "Generate a basic networking question about OSI model, TCP/UDP, or basic HTTP concepts.",
        intermediate: "Create an intermediate networking question about DNS, routing, or network security basics.",
        advanced: "Design an advanced networking question about network protocols, performance optimization, or distributed network architectures."
      }
    };
  }

  getDifficultyLevel(questionNumber) {
    if (questionNumber === 1) return 'basic';
    if (questionNumber <= 2) return 'intermediate';
    return 'advanced';
  }

  async generateQuestion(topic, questionNumber, previousQuestions = []) {
    try {
      const difficulty = this.getDifficultyLevel(questionNumber);
      const basePrompt = this.topicPrompts[topic]?.[difficulty] || this.topicPrompts.algorithms.basic;
      
      const previousQuestionsText = previousQuestions.length > 0 
        ? `\n\nPrevious questions already asked:\n${previousQuestions.map((q, i) => `${i+1}. ${q}`).join('\n')}\n`
        : '';

      const fullPrompt = `${basePrompt}\n\n${previousQuestionsText}\n\nRequirements:\n1. Make the question COMPLETELY DIFFERENT from any previous questions listed above.\n2. Ensure it's appropriate for ${difficulty} level.\n3. Make it engaging and encourage detailed explanations.\n4. Keep it realistic for a technical interview.\n5. Return ONLY the question text, no additional formatting or explanations.\n6. Do NOT repeat or rephrase any of the previous questions.\n\nGenerate a NEW, UNIQUE interview question:`;

      console.log(`🤖 Generating ${difficulty} question for ${topic}, question #${questionNumber}`);
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an experienced technical interviewer who creates challenging but fair interview questions. NEVER repeat questions that have been asked before. Generate completely unique, diverse questions that test different aspects of the topic."
          },
          {
            role: "user",
            content: fullPrompt
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.9,
        max_tokens: 300,
        top_p: 1,
        stream: false,
      });

      const question = completion.choices[0]?.message?.content?.trim();
      
      if (!question) {
        throw new Error('No question generated');
      }

      console.log(`✅ Generated question: "${question.substring(0, 100)}..."`);

      return {
        success: true,
        question: question,
        difficulty: difficulty,
        topic: topic
      };

    } catch (error) {
      console.error('❌ Groq API Error during question generation:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.getFallbackQuestion(topic, questionNumber)
      };
    }
  }

  async generateReport(transcript, topic) {
    try {
        console.log(`🤖 Generating report for ${topic} interview...`);

        const systemPrompt = `You are a world-class technical interviewer and career coach. Your name is "PrepMate AI Coach". You analyze interview transcripts with empathy and expertise. Your goal is to provide a detailed, constructive, and encouraging report card that helps the user improve.

        Analyze the provided transcript (questions and answers) for a technical interview on the topic of "${topic}".

        Your response MUST be a single, valid JSON object. Do not include any text or markdown before or after the JSON object.

        The JSON structure must be as follows:
        {
          "overallScore": <A number between 0 and 10, representing overall performance.>,
          "overallSummary": "<A concise, encouraging paragraph summarizing the performance, highlighting one key strength and one key area for growth.>",
          "skillRatings": [
            { "skill": "Technical Accuracy", "rating": <A number 1-5>, "feedback": "<Brief feedback on technical correctness.>" },
            { "skill": "Problem-Solving", "rating": <A number 1-5>, "feedback": "<Brief feedback on the approach to solving problems.>" },
            { "skill": "Communication", "rating": <A number 1-5>, "feedback": "<Brief feedback on clarity, structure, and confidence.>" },
            { "skill": "Completeness", "rating": <A number 1-5>, "feedback": "<Brief feedback on how thorough the answers were.>" }
          ],
          "strengths": [
            "<A string describing a specific strength observed during the interview.>",
            "<Another string describing a strength.>"
          ],
          "areasForImprovement": [
            "<A string describing a specific, actionable area for improvement.>",
            "<Another string describing an area for improvement.>"
          ],
          "questionAnalysis": [
            {
              "question": "<The exact question text from the transcript.>",
              "userAnswer": "<The user's exact answer from the transcript.>",
              "suggestedAnswer": "<A well-structured, ideal answer to the question. Explain the 'why' behind the concepts.>",
              "feedback": "<Specific, constructive feedback on the user's answer to this question.>"
            }
          ],
          "actionableNextSteps": [
            { "step": "Focus on...", "reason": "To improve your..." },
            { "step": "Practice...", "reason": "To build confidence in..." }
          ]
        }
        `;

        const userPrompt = `Here is the interview transcript on the topic "${topic}":\n\n${JSON.stringify(transcript, null, 2)}\n\nPlease generate the detailed report card in the specified JSON format.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "llama3-70b-8192",
            temperature: 0.6,
            max_tokens: 4096,
            top_p: 1,
            stream: false,
            response_format: { type: "json_object" },
        });

        const reportContent = completion.choices[0]?.message?.content;
        if (!reportContent) {
            throw new Error('No report content generated by the AI.');
        }

        console.log('✅ AI Report Generated Successfully.');
        return { success: true, report: JSON.parse(reportContent) };

    } catch (error) {
        console.error('❌ Groq API Error during report generation:', error);
        return {
            success: false,
            error: 'Failed to generate AI-powered report. Please try again later.'
        };
    }
}


  getFallbackQuestion(topic, questionNumber) {
    const fallbackQuestions = {
      algorithms: [
        "Explain how binary search works and analyze its time complexity.",
        "How would you implement a hash table and handle collisions?",
        "Describe the difference between BFS and DFS traversal algorithms.",
        "Explain dynamic programming with the fibonacci sequence example."
      ],
      'system-design': [
        "How would you design a URL shortening service like bit.ly?",
        "Design a chat application that can handle thousands of concurrent users.",
        "How would you implement a caching layer for a high-traffic web application?",
        "Design a distributed file storage system similar to Dropbox."
      ],
      javascript: [
        "Explain the difference between var, let, and const in JavaScript.",
        "How do closures work in JavaScript? Provide a practical example.",
        "What is the event loop and how does it handle asynchronous operations?",
        "Explain prototypal inheritance and how it differs from classical inheritance."
      ],
      react: [
        "What are React Hooks and why were they introduced?",
        "Explain the difference between controlled and uncontrolled components.",
        "How would you optimize a React application for better performance?",
        "Describe how you would implement global state management in React."
      ],
      database: [
        "What's the difference between SQL and NoSQL databases?",
        "Explain database indexing and how it improves query performance.",
        "How would you design a database schema for an e-commerce platform?",
        "Describe ACID properties and their importance in database transactions."
      ],
      resume: [
        "Tell me about a challenging technical problem you solved recently.",
        "Describe a time when you had to learn a new technology quickly.",
        "How do you approach debugging complex issues in production?",
        "Tell me about a project where you had to make important architectural decisions."
      ],
      behavioral: [
        "Describe a situation where you had to work with a difficult team member.",
        "How do you handle tight deadlines and competing priorities?",
        "Tell me about a time when you had to give constructive feedback to a colleague.",
        "Describe a project where you took initiative beyond your assigned responsibilities."
      ],
      networking: [
        "Explain what happens when you type a URL in your browser.",
        "What's the difference between TCP and UDP protocols?",
        "How does DNS resolution work in detail?",
        "Explain how HTTPS ensures secure communication between client and server."
      ]
    };

    const questions = fallbackQuestions[topic] || fallbackQuestions.algorithms;
    const index = Math.min(questionNumber - 1, questions.length - 1);
    return questions[index];
  }
}

module.exports = new InterviewService();