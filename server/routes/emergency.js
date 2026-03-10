const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/EmergencyContact');

// GET /api/emergency/contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await EmergencyContact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/emergency/firstaid - static first aid guides
router.get('/firstaid', (req, res) => {
    const guides = [
        {
            id: 1,
            title: 'CPR (Cardiopulmonary Resuscitation)',
            steps: [
                'Check the scene for safety',
                'Check the person for responsiveness',
                'Call 108 (Emergency Services)',
                'Position hands on center of chest',
                'Give 30 chest compressions (hard and fast)',
                'Give 2 rescue breaths',
                'Continue until help arrives',
            ],
            icon: '❤️',
        },
        {
            id: 2,
            title: 'Treating Burns',
            steps: [
                'Cool the burn with cold running water for 10–20 minutes',
                'Do NOT use ice or butter',
                'Cover with sterile gauze bandage',
                'Do not break blisters',
                'Seek medical attention for severe burns',
            ],
            icon: '🔥',
        },
        {
            id: 3,
            title: 'Controlling Bleeding',
            steps: [
                'Apply direct pressure with a clean cloth',
                'Maintain pressure for at least 15 minutes',
                'Elevate the injured area above heart level',
                'Apply a bandage firmly',
                'Call for medical help if bleeding does not stop',
            ],
            icon: '🩹',
        },
        {
            id: 4,
            title: 'Choking Response',
            steps: [
                'Ask "Are you choking?" – if yes, act immediately',
                'Give 5 firm back blows between shoulder blades',
                'Give 5 abdominal thrusts (Heimlich maneuver)',
                'Alternate back blows and abdominal thrusts',
                'Call 108 if obstruction cannot be cleared',
            ],
            icon: '🫁',
        },
        {
            id: 5,
            title: 'Fracture / Broken Bone',
            steps: [
                'Immobilize the injured area',
                'Apply splint if available and trained to do so',
                'Do NOT try to straighten the bone',
                'Apply ice packs wrapped in cloth',
                'Seek medical attention immediately',
            ],
            icon: '🦴',
        },
    ];
    res.json(guides);
});

// GET /api/emergency/evacuation
router.get('/evacuation', (req, res) => {
    const steps = [
        { step: 1, title: 'Stay Calm', description: 'Remain calm and alert. Panic can make the situation worse.' },
        { step: 2, title: 'Sound the Alarm', description: 'Activate the nearest fire alarm or alert others nearby.' },
        { step: 3, title: 'Stop What You Are Doing', description: 'Immediately stop all activities and prepare to evacuate.' },
        { step: 4, title: 'Use Marked Exits', description: 'Follow illuminated exit signs. Do NOT use elevators during emergencies.' },
        { step: 5, title: 'Help Others', description: 'Assist students with disabilities or those who need help evacuating.' },
        { step: 6, title: 'Proceed to Assembly Point', description: 'Move quickly but safely to the designated assembly point.' },
        { step: 7, title: 'Report to Roll-Call', description: 'Report to your teacher or supervisor for attendance check.' },
        { step: 8, title: 'Do Not Re-enter', description: 'Never re-enter the building until authorities declare it safe.' },
    ];
    res.json(steps);
});

module.exports = router;
