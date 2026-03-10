const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: Number, required: true }, // index of correct option
    explanation: { type: String, default: '' },
});

const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        disasterType: {
            type: String,
            enum: ['earthquake', 'flood', 'fire', 'cyclone', 'pandemic', 'chemical', 'general'],
            default: 'general',
        },
        description: { type: String, trim: true },
        questions: [questionSchema],
        timeLimit: { type: Number, default: 15 }, // minutes
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPublished: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
