const Disaster = require('../models/Disaster');
const Quiz = require('../models/Quiz');
const EmergencyContact = require('../models/EmergencyContact');
const Drill = require('../models/Drill');
const User = require('../models/User');

const seedData = {
    disasters: [
        {
            type: 'earthquake',
            title: 'Earthquake',
            icon: '🌍',
            color: '#8e44ad',
            severity: 'critical',
            description: 'A sudden and violent shaking of the ground, sometimes causing great destruction, as a result of movements within the earth\'s crust or volcanic action.',
            causes: ['Tectonic plate movements', 'Volcanic eruptions', 'Mining activities', 'Nuclear tests'],
            safetyMeasures: ['Identify safe spots in every room', 'Practice Drop, Cover, and Hold on', 'Keep an emergency kit ready'],
            beforeDisaster: [
                'Secure heavy furniture to walls',
                'Identify safe spots (under sturdy tables)',
                'Keep a first aid kit and emergency supplies ready',
                'Learn how to turn off gas, water, and electricity'
            ],
            duringDisaster: [
                'Drop, Cover, and Hold on',
                'Stay away from windows and heavy furniture',
                'If outdoors, move to an open area away from buildings and poles',
                'If in a vehicle, stop in a safe place and stay inside'
            ],
            afterDisaster: [
                'Check yourself and others for injuries',
                'Expect aftershocks',
                'Check for gas leaks and fire hazards',
                'Listen to local news for emergency info'
            ],
            emergencyKit: ['Water (3 days)', 'Non-perishable food', 'Flashlight', 'First Aid Kit', 'Whistle']
        },
        {
            type: 'flood',
            title: 'Flood',
            icon: '🌊',
            color: '#2980b9',
            severity: 'high',
            description: 'An overflow of water that submerges land that is usually dry.',
            causes: ['Heavy rainfall', 'Rapid snowmelt', 'Dam failure', 'Storm surges'],
            safetyMeasures: ['Avoid building in flood-prone areas', 'Keep electrical components elevated'],
            beforeDisaster: [
                'Know your flood risk',
                'Store valuables in higher spots',
                'Prepare an emergency kit',
                'Keep gutters and drains clear'
            ],
            duringDisaster: [
                'Move to higher ground immediately',
                'Avoid walking or driving through floodwaters',
                'Turn off utilities if instructed',
                'Stay away from power lines'
            ],
            afterDisaster: [
                'Avoid moving water',
                'Stay away from damaged areas',
                'Clean and disinfect everything that got wet',
                'Be aware of contaminated water'
            ],
            emergencyKit: ['Rain gear', 'Water purification tablets', 'Rubber boots', 'Waterproof bags']
        },
        {
            type: 'fire',
            title: 'Fire',
            icon: '🔥',
            color: '#e67e22',
            severity: 'critical',
            description: 'Uncontrolled combustion that can spread rapidly through buildings or vegetation.',
            causes: ['Electrical short circuits', 'Cooking accidents', 'Arson', 'Natural causes (lightening)'],
            safetyMeasures: ['Install smoke alarms', 'Keep fire extinguishers accessible'],
            beforeDisaster: [
                'Install smoke detectors on every floor',
                'Plan and practice escape routes',
                'Identify assembly points',
                'Store flammable materials safely'
            ],
            duringDisaster: [
                'Get out, stay out, and call for help',
                'Crawl low under smoke',
                'Stop, Drop, and Roll if clothes catch fire',
                'Use stairs, not elevators'
            ],
            afterDisaster: [
                'Do not enter a burnt building until cleared',
                'Check for structural damage',
                'Follow advice from fire officials',
                'Discard food exposed to heat or smoke'
            ],
            emergencyKit: ['Fire extinguisher', 'Smoke mask', 'Fire blanket', 'Heavy gloves']
        },
        {
            type: 'cyclone',
            title: 'Cyclone',
            icon: '🌀',
            color: '#16a085',
            severity: 'high',
            description: 'Large scale air mass that rotates around a strong center of low atmospheric pressure.',
            causes: ['Warm ocean temperatures', 'Atmospheric instability', 'Coriolis force'],
            safetyMeasures: ['Board up windows', 'Secure outdoor items'],
            beforeDisaster: [
                'Monitor weather reports',
                'Reinforce doors and windows',
                'Prune tree branches near house',
                'Fuel your vehicle'
            ],
            duringDisaster: [
                'Stay indoors away from windows',
                'Take shelter in the strongest part of the house',
                'If the eye passes, do not go outside',
                'Stay low to the floor'
            ],
            afterDisaster: [
                'Check for structural damage',
                'Beware of fallen power lines',
                'Avoid wading through water',
                'Listen for official updates'
            ],
            emergencyKit: ['Radio with batteries', 'Tarp/Plastic sheets', 'Rope', 'Tool kit']
        },
        {
            type: 'pandemic',
            title: 'Pandemic',
            icon: '🦠',
            color: '#27ae60',
            severity: 'critical',
            description: 'An epidemic of an infectious disease that has spread across a large region or worldwide.',
            causes: ['New virus/bacteria strains', 'Lack of immunity', 'Global travel'],
            safetyMeasures: ['Practice good hygiene', 'Maintain social distancing'],
            beforeDisaster: [
                'Maintain a healthy lifestyle',
                'Keep essential medicines and food',
                'Understand local health protocols',
                'Ensure vaccinations are up to date'
            ],
            duringDisaster: [
                'Follow official health guidelines',
                'Practice social distancing',
                'Wear masks in public',
                'Sanitize regularly'
            ],
            afterDisaster: [
                'Continue monitoring health',
                'Maintain hygiene habits',
                'Follow gradual reopening plans',
                'Report any symptoms to authorities'
            ],
            emergencyKit: ['Face masks', 'Hand sanitizer', 'Thermometer', 'Disinfectant wipes']
        },
        {
            type: 'chemical',
            title: 'Chemical Hazard',
            icon: '☢️',
            color: '#f1c40f',
            severity: 'high',
            description: 'Release of hazardous chemicals into the environment.',
            causes: ['Industrial accidents', 'Transportation spills', 'Improper storage'],
            safetyMeasures: ['Know the warning signals', 'Have a shelter-in-place plan'],
            beforeDisaster: [
                'Learn about local hazard sites',
                'Identify a safe room to seal',
                'Keep plastic sheeting and tape ready',
                'Know evacuation routes'
            ],
            duringDisaster: [
                'Stay upwind/uphill from the spill',
                'Seal yourself in a safe room (Shelter-in-place)',
                'Turn off HVAC systems',
                'Cover nose and mouth with cloth'
            ],
            afterDisaster: [
                'Wait for official "all clear"',
                'Ventilate the area once safe',
                'Follow decontamination instructions',
                'Seek medical help if exposed'
            ],
            emergencyKit: ['Duct tape', 'Plastic sheeting', 'N95 masks', 'Bottled water']
        }
    ],
    quizzes: [
        {
            title: 'Earthquake Preparedness Quiz',
            disasterType: 'earthquake',
            description: 'Test your knowledge on what to do during an earthquake.',
            isPublished: true,
            timeLimit: 10,
            questions: [
                {
                    question: 'What is the recommended action during an earthquake?',
                    options: ['Run outside', 'Drop, Cover, and Hold on', 'Stand under a doorway', 'Hide in the kitchen'],
                    correctAnswer: 1,
                    explanation: 'Drop, Cover, and Hold on is the safest action during shaking.'
                },
                {
                    question: 'Where is the safest place to be if you are indoors?',
                    options: ['Near a window', 'Under a sturdy table', 'Near heavy furniture', 'In the elevator'],
                    correctAnswer: 1,
                    explanation: 'Sturdy tables protect you from falling debris.'
                }
            ]
        },
        {
            title: 'Fire Safety Quiz',
            disasterType: 'fire',
            description: 'Test your fire evacuation knowledge.',
            isPublished: true,
            timeLimit: 10,
            questions: [
                {
                    question: 'If you encounter smoke while escaping, you should:',
                    options: ['Run as fast as possible', 'Crawl low under the smoke', 'Cover your face with a dry cloth', 'Open all windows'],
                    correctAnswer: 1,
                    explanation: 'Air is cleaner near the floor during a fire.'
                }
            ]
        }
    ],
    emergencyContacts: [
        { name: 'Police', number: '100', category: 'police', description: 'National Police Helpline' },
        { name: 'Fire Brigade', number: '101', category: 'fire', description: 'Fire Emergency Service' },
        { name: 'Ambulance', number: '102', category: 'medical', description: 'Medical Emergency Service' },
        { name: 'National Disaster Helpline', number: '1078', category: 'disaster', description: 'NDRF Response Center' },
        { name: 'Women Helpline', number: '1091', category: 'other', description: 'Emergency Assistance for Women' }
    ],
    drills: [
        {
            title: 'Annual Fire Drill',
            disasterType: 'fire',
            description: 'School-wide fire evacuation simulation.',
            scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            instructions: ['Hear the alarm', 'Walk to nearest exit', 'Assemble in main playground'],
            assemblyPoint: 'Main Playground',
            status: 'upcoming'
        },
        {
            title: 'Earthquake Safety Drill',
            disasterType: 'earthquake',
            description: 'Practice Drop, Cover, and Hold on procedure.',
            scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
            instructions: ['Listen for signal', 'Take cover', 'Wait for all clear'],
            assemblyPoint: 'School Courtyard',
            status: 'upcoming'
        }
    ]
};

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // 1. Disaster Content
        if (await Disaster.countDocuments() === 0) {
            await Disaster.insertMany(seedData.disasters);
            console.log('✅ Disaster content seeded');
        }

        // 2. Emergency Contacts
        if (await EmergencyContact.countDocuments() === 0) {
            await EmergencyContact.insertMany(seedData.emergencyContacts);
            console.log('✅ Emergency contacts seeded');
        }

        // 3. Admin User (for authorship)
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email: 'admin@school.edu',
                password: 'Admin@123', // Will be hashed by model pre-save
                role: 'admin',
                institution: 'Central School'
            });
            console.log('✅ Admin user created');
        }

        // 4. Seeding Quizzes linked to Admin
        if (await Quiz.countDocuments() === 0) {
            const quizzesWithAdmin = seedData.quizzes.map(q => ({ ...q, createdBy: admin._id }));
            await Quiz.insertMany(quizzesWithAdmin);
            console.log('✅ Quizzes seeded');
        }

        // 5. Seeding Drills linked to Admin
        if (await Drill.countDocuments() === 0) {
            const drillsWithAdmin = seedData.drills.map(d => ({ ...d, createdBy: admin._id }));
            await Drill.insertMany(drillsWithAdmin);
            console.log('✅ Drills seeded');
        }

        console.log('🏁 Database seeding completed successfully.');
    } catch (err) {
        console.error('❌ Error during database seeding:', err);
    }
};

module.exports = seedDatabase;
