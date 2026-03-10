const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        answers: [{ type: Number }], // indices of selected options
        score: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
        timeTaken: { type: Number, default: 0 }, // seconds
        passed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('QuizSubmission', submissionSchema);
