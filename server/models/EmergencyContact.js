const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    category: {
        type: String,
        enum: ['fire', 'police', 'medical', 'disaster', 'school', 'other'],
        default: 'other',
    },
    description: { type: String, default: '' },
    isNational: { type: Boolean, default: true },
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
