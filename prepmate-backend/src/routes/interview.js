// const express = require('express');
// const router = express.Router();
// const interviewService = require('../services/interviewService');

// // Generate interview question
// router.post('/generate-question', async (req, res) => {
//   try {
//     const { topic, questionNumber, previousQuestions } = req.body;

//     // Validation
//     if (!topic || !questionNumber) {
//       return res.status(400).json({
//         success: false,
//         error: 'Topic and question number are required'
//       });
//     }

//     const validTopics = ['algorithms', 'system-design', 'javascript', 'react', 'database', 'resume', 'behavioral', 'networking'];
//     if (!validTopics.includes(topic)) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid topic selected'
//       });
//     }

//     // Generate question using Groq
//     const result = await interviewService.generateQuestion(
//       topic, 
//       parseInt(questionNumber), 
//       previousQuestions || []
//     );

//     if (result.success) {
//       res.json({
//         success: true,
//         question: result.question,
//         difficulty: result.difficulty,
//         topic: result.topic,
//         questionNumber: questionNumber
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         error: result.error,
//         fallback: result.fallback
//       });
//     }

//   } catch (error) {
//     console.error('Interview route error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Internal server error',
//       fallback: interviewService.getFallbackQuestion(req.body.topic || 'algorithms', req.body.questionNumber || 1)
//     });
//   }
// });

// // Get interview topics
// router.get('/topics', (req, res) => {
//   const topics = [
//     { id: 'algorithms', name: '🧮 Data Structures & Algorithms', icon: '🧮' },
//     { id: 'system-design', name: '🏗️ System Design', icon: '🏗️' },
//     { id: 'javascript', name: '🟨 JavaScript', icon: '🟨' },
//     { id: 'react', name: '⚛️ React', icon: '⚛️' },
//     { id: 'database', name: '🗃️ Database Design', icon: '🗃️' },
//     { id: 'resume', name: '📄 Resume Based', icon: '📄' },
//     { id: 'behavioral', name: '🤝 Behavioral Questions', icon: '🤝' },
//     { id: 'networking', name: '🌐 Computer Networks', icon: '🌐' }
//   ];
  
//   res.json({
//     success: true,
//     topics: topics
//   });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const interviewService = require('../services/interviewService');

// Generate interview question
router.post('/generate-question', async (req, res) => {
  try {
    const { topic, questionNumber, previousQuestions, difficulty } = req.body;

    // Validation
    if (!topic || !questionNumber) {
      return res.status(400).json({
        success: false,
        error: 'Topic and question number are required'
      });
    }

    const validTopics = ['algorithms', 'system-design', 'javascript', 'react', 'database', 'resume', 'behavioral', 'networking'];
    if (!validTopics.includes(topic)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid topic selected'
      });
    }

    // Generate question using the service
    const result = await interviewService.generateQuestion(
      topic,
      parseInt(questionNumber),
      previousQuestions || [],
      difficulty // Pass the difficulty to the service
    );

    if (result.success) {
      res.json({
        success: true,
        question: result.question,
        difficulty: result.difficulty,
        topic: result.topic,
        questionNumber: questionNumber
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        fallback: result.fallback
      });
    }

  } catch (error) {
    console.error('Interview route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      fallback: interviewService.getFallbackQuestion(req.body.topic || 'algorithms', req.body.questionNumber || 1)
    });
  }
});

// Get interview topics
router.get('/topics', (req, res) => {
  const topics = [
    { id: 'algorithms', name: '🧮 Data Structures & Algorithms', icon: '🧮' },
    { id: 'system-design', name: '🏗️ System Design', icon: '🏗️' },
    { id: 'javascript', name: '🟨 JavaScript', icon: '🟨' },
    { id: 'react', name: '⚛️ React', icon: '⚛️' },
    { id: 'database', name: '🗃️ Database Design', icon: '🗃️' },
    { id: 'resume', name: '📄 Resume Based', icon: '📄' },
    { id: 'behavioral', name: '🤝 Behavioral Questions', icon: '🤝' },
    { id: 'networking', name: '🌐 Computer Networks', icon: '🌐' }
  ];

  res.json({
    success: true,
    topics: topics
  });
});

module.exports = router;