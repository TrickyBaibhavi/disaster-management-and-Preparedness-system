const express = require('express');
const router = express.Router();
const Drill = require('../models/Drill');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/role');

// GET /api/drills - list all drills
router.get('/', verifyToken, async (req, res) => {
    try {
        const drills = await Drill.find()
            .populate('createdBy', 'name email')
            .sort({ scheduledDate: 1 });
        res.json(drills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/drills - create drill (teacher/admin)
router.post('/', verifyToken, requireRole('teacher', 'admin'), async (req, res) => {
    try {
        const drill = await Drill.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json(drill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/drills/:id
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const drill = await Drill.findById(req.params.id).populate('createdBy', 'name email').populate('participants.user', 'name email');
        if (!drill) return res.status(404).json({ message: 'Drill not found' });
        res.json(drill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/drills/:id - update (teacher/admin)
router.put('/:id', verifyToken, requireRole('teacher', 'admin'), async (req, res) => {
    try {
        const drill = await Drill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!drill) return res.status(404).json({ message: 'Drill not found' });
        res.json(drill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/drills/:id - delete (admin only)
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        await Drill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Drill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/drills/:id/join - student joins a drill
router.post('/:id/join', verifyToken, async (req, res) => {
    try {
        const drill = await Drill.findById(req.params.id);
        if (!drill) return res.status(404).json({ message: 'Drill not found' });
        const alreadyJoined = drill.participants.some((p) => p.user.toString() === req.user._id.toString());
        if (alreadyJoined) return res.status(400).json({ message: 'Already joined this drill' });
        drill.participants.push({ user: req.user._id });
        await drill.save();
        res.json({ message: 'Joined drill successfully', drill });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/drills/:id/complete - mark participation complete
router.post('/:id/complete', verifyToken, async (req, res) => {
    try {
        const drill = await Drill.findById(req.params.id);
        if (!drill) return res.status(404).json({ message: 'Drill not found' });
        const participant = drill.participants.find((p) => p.user.toString() === req.user._id.toString());
        if (!participant) return res.status(400).json({ message: 'Not registered for this drill' });
        participant.completed = true;
        await drill.save();
        res.json({ message: 'Marked as completed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
