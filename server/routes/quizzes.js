const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/role');

// GET /api/quizzes
router.get('/', verifyToken, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ isPublished: true })
            .populate('createdBy', 'name')
            .select('-questions.correctAnswer');
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/quizzes/:id (with questions, answers hidden for students)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        let quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        // Hide correct answers for students
        if (req.user.role === 'student') {
            const quizObj = quiz.toObject();
            quizObj.questions = quizObj.questions.map(({ correctAnswer, ...rest }) => rest);
            return res.json(quizObj);
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/quizzes - create quiz (teacher/admin)
router.post('/', verifyToken, requireRole('teacher', 'admin'), async (req, res) => {
    try {
        const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/quizzes/:id
router.delete('/:id', verifyToken, requireRole('teacher', 'admin'), async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: 'Quiz deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/quizzes/:id/submit - submit answers
router.post('/:id/submit', verifyToken, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const { answers, timeTaken } = req.body;
        let score = 0;
        const results = quiz.questions.map((q, i) => {
            const isCorrect = answers[i] === q.correctAnswer;
            if (isCorrect) score++;
            return { question: q.question, selected: answers[i], correct: q.correctAnswer, explanation: q.explanation, isCorrect };
        });

        const percentage = Math.round((score / quiz.questions.length) * 100);
        const submission = await QuizSubmission.create({
            quiz: quiz._id,
            student: req.user._id,
            answers,
            score,
            totalQuestions: quiz.questions.length,
            percentage,
            timeTaken,
            passed: percentage >= 60,
        });

        res.json({ submission, results, score, percentage, passed: percentage >= 60 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/quizzes/:id/submissions - teacher/admin see all submissions
router.get('/:id/submissions', verifyToken, requireRole('teacher', 'admin'), async (req, res) => {
    try {
        const submissions = await QuizSubmission.find({ quiz: req.params.id })
            .populate('student', 'name email')
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/quizzes/my/submissions - student sees their own
router.get('/my/submissions', verifyToken, async (req, res) => {
    try {
        const submissions = await QuizSubmission.find({ student: req.user._id })
            .populate('quiz', 'title disasterType')
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
