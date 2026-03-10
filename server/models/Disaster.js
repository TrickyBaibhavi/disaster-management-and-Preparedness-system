const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            unique: true,
            enum: ['earthquake', 'flood', 'fire', 'cyclone', 'pandemic', 'chemical'],
        },
        title: { type: String, required: true },
        icon: { type: String, default: '⚠️' },
        color: { type: String, default: '#e74c3c' },
        description: { type: String, required: true },
        causes: [{ type: String }],
        safetyMeasures: [{ type: String }],
        beforeDisaster: [{ type: String }],
        duringDisaster: [{ type: String }],
        afterDisaster: [{ type: String }],
        emergencyKit: [{ type: String }],
        severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'high' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Disaster', disasterSchema);
