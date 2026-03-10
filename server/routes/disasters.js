const express = require('express');
const router = express.Router();
const Disaster = require('../models/Disaster');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/role');

// GET /api/disasters - get all disasters
router.get('/', async (req, res) => {
    try {
        const disasters = await Disaster.find().select('type title icon color description severity');
        res.json(disasters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/disasters/:type - get specific disaster
router.get('/:type', async (req, res) => {
    try {
        const disaster = await Disaster.findOne({ type: req.params.type });
        if (!disaster) return res.status(404).json({ message: 'Disaster not found' });
        res.json(disaster);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/disasters/:type - update (admin only)
router.put('/:type', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const disaster = await Disaster.findOneAndUpdate(
            { type: req.params.type },
            req.body,
            { new: true }
        );
        if (!disaster) return res.status(404).json({ message: 'Disaster not found' });
        res.json(disaster);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
