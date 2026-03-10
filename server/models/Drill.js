const mongoose = require('mongoose');

const drillSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        disasterType: {
            type: String,
            enum: ['earthquake', 'flood', 'fire', 'cyclone', 'pandemic', 'chemical'],
            required: true,
        },
        description: { type: String, trim: true },
        scheduledDate: { type: Date, required: true },
        duration: { type: Number, default: 30 }, // minutes
        instructions: [{ type: String }],
        assemblyPoint: { type: String, default: '' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        institution: { type: String, default: '' },
        status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
        participants: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                joinedAt: { type: Date, default: Date.now },
                completed: { type: Boolean, default: false },
            },
        ],
        maxParticipants: { type: Number, default: 100 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Drill', drillSchema);
