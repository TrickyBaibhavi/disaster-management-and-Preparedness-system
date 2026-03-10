const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Drill = require('../models/Drill');
const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');
const Disaster = require('../models/Disaster');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/role');

// All admin routes require auth + admin role
router.use(verifyToken, requireRole('admin'));

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
    try {
        const [users, drills, quizzes, submissions] = await Promise.all([
            User.countDocuments(),
            Drill.countDocuments(),
            Quiz.countDocuments(),
            QuizSubmission.countDocuments(),
        ]);
        const students = await User.countDocuments({ role: 'student' });
        const teachers = await User.countDocuments({ role: 'teacher' });
        const admins = await User.countDocuments({ role: 'admin' });
        const upcomingDrills = await Drill.countDocuments({ status: 'upcoming' });
        res.json({ users, students, teachers, admins, drills, upcomingDrills, quizzes, submissions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/admin/users/:id
router.put('/users/:id', async (req, res) => {
    try {
        const { name, email, role, institution, isActive } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, institution, isActive },
            { new: true }
        ).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/admin/reports/drills
router.get('/reports/drills', async (req, res) => {
    try {
        const drills = await Drill.find()
            .populate('createdBy', 'name')
            .populate('participants.user', 'name email')
            .sort({ scheduledDate: -1 });
        res.json(drills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/admin/reports/quizzes
router.get('/reports/quizzes', async (req, res) => {
    try {
        const submissions = await QuizSubmission.find()
            .populate('quiz', 'title disasterType')
            .populate('student', 'name email')
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
