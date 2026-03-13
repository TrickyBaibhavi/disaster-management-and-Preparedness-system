const express = require('express');
const router = express.Router();
const QuizSubmission = require('../models/QuizSubmission');
const Drill = require('../models/Drill');
const verifyToken = require('../middleware/auth');

// GET /api/dashboard/student - Get student metrics
router.get('/student', verifyToken, async (req, res) => {
    try {
        const studentId = req.user._id;

        // 1. Quiz Metrics
        const submissions = await QuizSubmission.find({ student: studentId });
        const completedQuizzes = submissions.length;
        const averageScore = completedQuizzes 
            ? Math.round(submissions.reduce((acc, curr) => acc + curr.percentage, 0) / completedQuizzes)
            : 0;

        // 2. Drill Metrics
        // Find drills where the student is in the participants array
        const upcomingDrillsList = await Drill.find({
            'participants.user': studentId,
            scheduledDate: { $gte: new Date() },
            status: 'upcoming'
        }).populate('createdBy', 'name');

        res.json({
            stats: {
                completedQuizzes,
                averageScore,
                upcomingDrillsCount: upcomingDrillsList.length
            },
            upcomingDrills: upcomingDrillsList
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
