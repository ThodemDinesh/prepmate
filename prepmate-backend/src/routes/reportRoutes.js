const express = require('express');
const router = express.Router();
const InterviewReport = require('../models/InterviewReport');
const authMiddleware = require('../middleware/auth'); // Assuming you have auth middleware

// Save interview report
router.post('/save-report', authMiddleware, async (req, res) => {
  try {
    const {
      topic,
      difficulty,
      totalQuestions,
      transcript,
      report,
      metadata
    } = req.body;

    const newReport = new InterviewReport({
      userId: req.user.id, // From auth middleware
      topic,
      difficulty,
      totalQuestions,
      transcript,
      report,
      metadata,
      completedAt: new Date()
    });

    const savedReport = await newReport.save();
    
    res.json({
      success: true,
      message: 'Report saved successfully',
      reportId: savedReport._id,
      report: savedReport
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save report'
    });
  }
});

// Get user's interview history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, topic, sortBy = 'completedAt' } = req.query;
    
    const query = { userId: req.user.id };
    if (topic && topic !== 'all') {
      query.topic = topic;
    }

    const reports = await InterviewReport.find(query)
      .sort({ [sortBy]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('topic difficulty totalQuestions completedAt report.overallScore metadata.duration')
      .lean();

    const total = await InterviewReport.countDocuments(query);

    res.json({
      success: true,
      reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching report history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report history'
    });
  }
});

// Get specific report by ID
router.get('/:reportId', authMiddleware, async (req, res) => {
  try {
    const report = await InterviewReport.findOne({
      _id: req.params.reportId,
      userId: req.user.id
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report'
    });
  }
});

// Get user statistics
router.get('/stats/overview', authMiddleware, async (req, res) => {
  try {
    const stats = await InterviewReport.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalInterviews: { $sum: 1 },
          averageScore: { $avg: '$report.overallScore' },
          totalQuestions: { $sum: '$totalQuestions' },
          topicDistribution: {
            $push: '$topic'
          }
        }
      }
    ]);

    // Get topic-wise performance
    const topicStats = await InterviewReport.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 },
          averageScore: { $avg: '$report.overallScore' },
          bestScore: { $max: '$report.overallScore' }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalInterviews: 0,
        averageScore: 0,
        totalQuestions: 0,
        topicDistribution: []
      },
      topicStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// Delete a specific report
router.delete('/:reportId', authMiddleware, async (req, res) => {
  try {
    const deletedReport = await InterviewReport.findOneAndDelete({
      _id: req.params.reportId,
      userId: req.user.id
    });

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete report'
    });
  }
});

module.exports = router;
