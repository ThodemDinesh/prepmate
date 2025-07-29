const mongoose = require('mongoose');

const interviewReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'mixed'],
    default: 'mixed'
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  transcript: [{
    type: {
      type: String,
      enum: ['question', 'answer'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  report: {
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    overallSummary: String,
    skillRatings: [{
      skill: String,
      rating: {
        type: Number,
        min: 0,
        max: 5
      }
    }],
    strengths: [String],
    areasForImprovement: [String],
    questionAnalysis: [{
      question: String,
      userAnswer: String,
      suggestedAnswer: String,
      feedback: String,
      score: {
        type: Number,
        min: 0,
        max: 10
      }
    }],
    actionableNextSteps: [{
      step: String,
      reason: String,
      priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
      }
    }]
  },
  metadata: {
    duration: Number, // in minutes
    browserInfo: String,
    deviceType: String
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
interviewReportSchema.index({ userId: 1, completedAt: -1 });
interviewReportSchema.index({ topic: 1 });
interviewReportSchema.index({ 'report.overallScore': -1 });

module.exports = mongoose.model('InterviewReport', interviewReportSchema);
