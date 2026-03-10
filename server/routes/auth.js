const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post(
    '/register',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').isIn(['student', 'teacher', 'admin']).withMessage('Invalid role'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { name, email, password, role, institution, grade } = req.body;
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ message: 'Email already in use' });

            const user = await User.create({ name, email, password, role, institution, grade });
            res.status(201).json({ token: generateToken(user._id), user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// POST /api/auth/login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            // compare using the schema method only (User schema has pre-save hook)
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const userObj = user.toJSON();
            res.json({ token: generateToken(user._id), user: userObj });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// GET /api/auth/me
const verifyToken = require('../middleware/auth');
router.get('/me', verifyToken, (req, res) => res.json(req.user));

module.exports = router;
