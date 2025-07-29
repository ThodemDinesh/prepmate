
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt =require('jsonwebtoken');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json({ limit: '10mb' })); // Increase payload size limit for transcripts
// app.use(cors({
//   origin: 'http://localhost:3000', // Your React app URL
//   credentials: true
// }));

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/prepmate';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected successfully');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// // User Schema
// const UserSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   passwordHash: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model('User', UserSchema);

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     // Validation
//     if (!firstName || !lastName || !email || !password) {
//       return res.status(400).json({ 
//         message: 'All fields are required' 
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         message: 'Email already registered' 
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(12);
//     const passwordHash = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       passwordHash
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email },
//       process.env.JWT_SECRET || 'your_jwt_secret_key',
//       { expiresIn: '7d' }
//     );

//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: newUser._id,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         name: `${newUser.firstName} ${newUser.lastName}`
//       }
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ 
//       message: 'Server error during signup' 
//     });
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({ 
//         message: 'Email and password are required' 
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ 
//         message: 'Invalid credentials' 
//       });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ 
//         message: 'Invalid credentials' 
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || 'your_jwt_secret_key',
//       { expiresIn: '7d' }
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         name: `${user.firstName} ${user.lastName}`
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       message: 'Server error during login' 
//     });
//   }
// });

// // Auth middleware for protected routes
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// // Protected route example
// app.get('/api/user/profile', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-passwordHash');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Import interview service
// const interviewService = require('./src/services/interviewService');

// // Interview Routes
// app.post('/api/interview/generate-question', async (req, res) => {
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

// // NEW: Report Generation Route
// app.post('/api/interview/generate-report', async (req, res) => {
//     try {
//         const { transcript, topic } = req.body;

//         if (!transcript || !topic || transcript.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Transcript and topic are required to generate a report.'
//             });
//         }

//         const result = await interviewService.generateReport(transcript, topic);

//         if (result.success) {
//             res.json({
//                 success: true,
//                 report: result.report
//             });
//         } else {
//             res.status(500).json({
//                 success: false,
//                 error: result.error || 'An unknown error occurred while generating the report.'
//             });
//         }
//     } catch (error) {
//         console.error('Report generation route error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Internal server error during report generation.'
//         });
//     }
// });


// // Get interview topics
// app.get('/api/interview/topics', (req, res) => {
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

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     error: 'Something went wrong!'
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase payload size limit for transcripts
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/prepmate';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Session Schema for tracking user activities
const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Interview', 'Quiz', 'Study'],
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  duration: {
    type: Number, // Duration in minutes
    default: 0
  },
  transcript: {
    type: String,
    default: ''
  },
  report: {
    type: Object,
    default: null
  },
  metadata: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Goals Schema for daily tracking
const UserGoalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  dailyTarget: {
    type: Number,
    default: 3
  },
  completed: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Achievement Schema
const AchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  }
});

// Create models
const User = mongoose.model('User', UserSchema);
const Session = mongoose.model('Session', SessionSchema);
const UserGoals = mongoose.model('UserGoals', UserGoalsSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error during signup' 
    });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login' 
    });
  }
});

// Auth middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protected route example
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Import services
const interviewService = require('./src/services/interviewService');
const quizService = require('./src/services/quizService');

// Interview Routes
app.post('/api/interview/generate-question', async (req, res) => {
  try {
    const { topic, questionNumber, previousQuestions } = req.body;

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

    // Generate question using Groq
    const result = await interviewService.generateQuestion(
      topic, 
      parseInt(questionNumber), 
      previousQuestions || []
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

// Report Generation Route with Session Saving
app.post('/api/interview/generate-report', authMiddleware, async (req, res) => {
  try {
    const { transcript, topic } = req.body;

    if (!transcript || !topic || transcript.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Transcript and topic are required to generate a report.'
      });
    }

    const result = await interviewService.generateReport(transcript, topic);

    if (result.success) {
      // Save the session automatically
      const averageScore = result.report.overallScore * 10; // Convert to percentage
      
      const session = new Session({
        userId: req.user.id,
        type: 'Interview',
        topic: topic,
        score: averageScore,
        transcript: JSON.stringify(transcript),
        report: result.report
      });
      
      await session.save();
      
      // Update today's goals
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateString = today.toISOString().split('T')[0];
      const todayActivities = await getTodayActivities(req.user.id, today);
      
      await UserGoals.findOneAndUpdate(
        { userId: req.user.id, date: dateString },
        { 
          completed: todayActivities.length + 1,
          $setOnInsert: { dailyTarget: 3 }
        },
        { upsert: true }
      );

      res.json({
        success: true,
        report: result.report
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'An unknown error occurred while generating the report.'
      });
    }
  } catch (error) {
    console.error('Report generation route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during report generation.'
    });
  }
});

// ==================== QUIZ ROUTES ====================

// Quiz generation endpoint
app.post('/api/quiz/generate', authMiddleware, async (req, res) => {
  try {
    const { subject, numQuestions, difficulty } = req.body;

    if (!subject || !numQuestions || !difficulty) {
      return res.status(400).json({
        success: false,
        error: 'Subject, number of questions, and difficulty are required'
      });
    }

    const validSubjects = ['os', 'cn', 'oops', 'dbms', 'system-design', 'algorithms', 'javascript', 'react'];
    if (!validSubjects.includes(subject)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid subject selected'
      });
    }

    const result = await quizService.generateQuizQuestions(subject, numQuestions, difficulty);

    if (result.success) {
      res.json({
        success: true,
        questions: result.questions
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get quiz subjects
app.get('/api/quiz/subjects', (req, res) => {
  const subjects = [
    { id: 'os', name: 'Operating Systems', icon: '💻' },
    { id: 'cn', name: 'Computer Networks', icon: '🌐' },
    { id: 'oops', name: 'Object Oriented Programming', icon: '🎯' },
    { id: 'dbms', name: 'Database Management', icon: '🗃️' },
    { id: 'system-design', name: 'System Design', icon: '🏗️' },
    { id: 'algorithms', name: 'Data Structures & Algorithms', icon: '🧮' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'react', name: 'React', icon: '⚛️' }
  ];
  
  res.json({
    success: true,
    subjects: subjects
  });
});

// ==================== SESSION MANAGEMENT ====================

// Session save endpoint
app.post('/api/session/save', authMiddleware, async (req, res) => {
  try {
    const { type, topic, score, duration, transcript, report, metadata } = req.body;
    const userId = req.user.id;

    const session = new Session({
      userId,
      type,
      topic,
      score: score || 0,
      duration: duration || 0,
      transcript: transcript || '',
      report: report || null,
      metadata: metadata || {}
    });

    await session.save();
    
    // Update today's goals
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateString = today.toISOString().split('T')[0];
    const todayActivities = await getTodayActivities(userId, today);
    
    await UserGoals.findOneAndUpdate(
      { userId, date: dateString },
      { 
        completed: todayActivities.length,
        $setOnInsert: { dailyTarget: 3 }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      sessionId: session._id,
      message: 'Session saved successfully'
    });
  } catch (error) {
    console.error('Session save error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save session'
    });
  }
});

// ==================== DASHBOARD ENDPOINTS ====================

// Helper functions for dashboard data
const getUserSessions = async (userId) => {
  try {
    const sessions = await Session.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    
    return sessions.map(session => ({
      id: session._id,
      type: session.type,
      topic: session.topic,
      score: session.score,
      timeAgo: getTimeAgo(session.createdAt),
      createdAt: session.createdAt
    }));
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    return [];
  }
};

const getTodayActivities = async (userId, today) => {
  try {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const activities = await Session.find({
      userId,
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    }).lean();
    
    return activities;
  } catch (error) {
    console.error('Error fetching today activities:', error);
    return [];
  }
};

const getUserGoals = async (userId, today) => {
  try {
    const dateString = today.toISOString().split('T')[0];
    
    let goals = await UserGoals.findOne({
      userId,
      date: dateString
    }).lean();
    
    if (!goals) {
      goals = new UserGoals({
        userId,
        date: dateString,
        dailyTarget: 3,
        completed: 0
      });
      await goals.save();
      return { dailyTarget: 3, completed: 0 };
    }
    
    return goals;
  } catch (error) {
    console.error('Error fetching user goals:', error);
    return { dailyTarget: 3, completed: 0 };
  }
};

const calculateStreak = async (userId) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sessions = await Session.find({
      userId,
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 }).lean();
    
    if (sessions.length === 0) return 0;
    
    // Get unique activity dates
    const activityDates = new Set();
    sessions.forEach(session => {
      const date = new Date(session.createdAt);
      date.setHours(0, 0, 0, 0);
      activityDates.add(date.getTime());
    });
    
    const uniqueDates = Array.from(activityDates).sort((a, b) => b - a);
    
    // Calculate consecutive days from today
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (uniqueDates[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    return 0;
  }
};

const calculateAverageScore = async (userId) => {
  try {
    const sessions = await Session.find({
      userId,
      score: { $gt: 0 }
    }).lean();
    
    if (sessions.length === 0) return 0;
    
    const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
    const average = totalScore / sessions.length;
    
    return Math.round(average * 100) / 100;
  } catch (error) {
    console.error('Error calculating average score:', error);
    return 0;
  }
};

const generateRecommendations = async (userId) => {
  try {
    const sessions = await getUserSessions(userId);
    const averageScore = await calculateAverageScore(userId);
    
    const recommendations = [];
    
    if (sessions.length === 0) {
      recommendations.push({
        title: "Take Your First Interview",
        description: "Start with a beginner-friendly topic to get familiar with the AI interview process",
        action: "interview",
        params: { difficulty: "beginner" },
        buttonText: "Start Interview"
      });
    } else if (averageScore < 60) {
      // Find weakest topic
      const topicScores = {};
      sessions.forEach(session => {
        if (!topicScores[session.topic]) {
          topicScores[session.topic] = [];
        }
        topicScores[session.topic].push(session.score);
      });
      
      let weakestTopic = null;
      let lowestAverage = 100;
      
      Object.keys(topicScores).forEach(topic => {
        const avg = topicScores[topic].reduce((sum, score) => sum + score, 0) / topicScores[topic].length;
        if (avg < lowestAverage) {
          lowestAverage = avg;
          weakestTopic = topic;
        }
      });
      
      if (weakestTopic) {
        recommendations.push({
          title: `Improve Your ${weakestTopic} Skills`,
          description: `Your average score in ${weakestTopic} is ${Math.round(lowestAverage)}%. Focus on this area for better results.`,
          action: "study",
          params: { topic: weakestTopic },
          buttonText: "Study Materials"
        });
      }
    } else if (averageScore > 80) {
      recommendations.push({
        title: "Challenge Advanced Topics",
        description: "You're doing great! Try more advanced topics to further enhance your skills.",
        action: "interview",
        params: { difficulty: "advanced" },
        buttonText: "Advanced Interview"
      });
    }
    
    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

// Dashboard stats endpoint
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Fetch all dashboard data
    const sessions = await getUserSessions(userId);
    const todayActivities = await getTodayActivities(userId, today);
    const userGoals = await getUserGoals(userId, today);
    const streak = await calculateStreak(userId);
    const averageScore = await calculateAverageScore(userId);
    const recommendations = await generateRecommendations(userId);
    
    const dashboardData = {
      todayGoals: {
        completed: todayActivities.length,
        total: userGoals.dailyTarget || 3
      },
      streak: streak,
      averageScore: averageScore,
      recentSessions: sessions.slice(0, 1),
      recentActivities: sessions.slice(0, 5),
      totalSessions: sessions.length,
      weeklyProgress: [],
      recommendations: recommendations,
      achievements: []
    };
    
    res.json({
      success: true,
      dashboardData
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get interview topics
app.get('/api/interview/topics', (req, res) => {
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
